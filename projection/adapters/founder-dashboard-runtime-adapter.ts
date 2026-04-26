import type {
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import type {
  FounderDashboardBlockedItemSummary,
  FounderDashboardCellCard,
  FounderDashboardLearnedPreferenceSummary,
  FounderDashboardPendingReviewSummary,
  FounderDashboardProjection,
  FounderDashboardRecentArtifactSummary,
  FounderDashboardSuggestedNextActionSummary,
} from "../contracts/founder-dashboard-projection-contract.ts";
import {
  FOUNDER_DASHBOARD_BOUNDARY_SUMMARY,
} from "../contracts/founder-dashboard-projection-contract.ts";
import {
  assert_valid,
  collect_forbidden_field_errors,
  collect_forbidden_string_errors,
  create_runtime_projection_ref,
  ensure_action_readiness_matches_class,
  ensure_runtime_private_fields_omitted,
  normalize_string_array,
  stable_sort_by_key,
} from "./runtime-readiness-adapter-helpers.ts";

export type FounderDashboardRuntimeAdapterInput = RuntimeStateProjection;

function derive_objective_summary(
  unit: OperationalUnitRuntimeProjection
): string {
  return (
    unit.task_summaries[0]?.title ??
    unit.priority_summaries[0]?.title ??
    unit.scope_summary.summary ??
    unit.scope_summary.title
  );
}

function derive_priority_summary(
  unit: OperationalUnitRuntimeProjection
): string {
  const priority = unit.priority_summaries[0];

  if (!priority) {
    return "No current priority summary is projected.";
  }

  return `${priority.title}: ${priority.rationale}`;
}

function build_cell_card(unit: OperationalUnitRuntimeProjection): FounderDashboardCellCard {
  const source_scope_ref = unit.scope_summary.scope_id;
  const blocked_item_count =
    unit.task_summaries.filter((task) => task.status === "blocked").length +
    unit.action_summaries.filter(
      (action) => action.blocked || action.readiness_status === "blocked"
    ).length +
    unit.drift_summaries.filter((summary) => summary.recommendation === "block").length;

  return {
    cell_id: source_scope_ref,
    cell_label: unit.scope_summary.title,
    status: unit.status,
    objective_summary: derive_objective_summary(unit),
    current_priority_summary: derive_priority_summary(unit),
    pending_review_count: unit.pending_review_summaries.length,
    recent_artifact_count: unit.recent_artifact_summaries.length,
    active_learning_count: unit.learning_summaries.reduce(
      (total, summary) => total + summary.active_candidate_count,
      0
    ),
    blocked_item_count,
    next_action_summary: unit.suggested_next_actions[0]?.title,
    source_scope_ref,
    source_evidence_refs: [...unit.evidence_refs],
    runtime_private_fields_omitted: true,
  };
}

function build_pending_reviews(
  unit: OperationalUnitRuntimeProjection
): FounderDashboardPendingReviewSummary[] {
  return unit.pending_review_summaries.map((review) => ({
    review_id: review.review_id,
    cell_id: unit.scope_summary.scope_id,
    cell_label: unit.scope_summary.title,
    title: review.title,
    status: review.status,
    review_kind: review.review_kind,
    review_summary: review.review_summary,
    evidence_gap_summary: review.evidence_gap_summary,
    source_scope_ref: unit.scope_summary.scope_id,
    source_evidence_refs: [...(review.evidence_refs ?? [])],
    runtime_private_fields_omitted: true,
  }));
}

function build_recent_artifacts(
  unit: OperationalUnitRuntimeProjection
): FounderDashboardRecentArtifactSummary[] {
  return unit.recent_artifact_summaries.map((artifact) => ({
    artifact_id: artifact.artifact_id,
    cell_id: unit.scope_summary.scope_id,
    cell_label: unit.scope_summary.title,
    title: artifact.title,
    artifact_kind: artifact.artifact_kind,
    artifact_class: artifact.artifact_class,
    status: artifact.status,
    source_scope_ref: unit.scope_summary.scope_id,
    source_evidence_refs: [...artifact.evidence_refs],
    runtime_private_fields_omitted: true,
  }));
}

function build_learned_preferences(
  unit: OperationalUnitRuntimeProjection
): FounderDashboardLearnedPreferenceSummary[] {
  return unit.learning_summaries.flatMap((learningSummary) =>
    learningSummary.preference_suggestions.map((preference) => ({
      preference_id: preference.preference_suggestion_id,
      cell_id: unit.scope_summary.scope_id,
      cell_label: unit.scope_summary.title,
      summary: preference.summary,
      application_scope: preference.application_scope,
      status: preference.status,
      source_scope_ref: unit.scope_summary.scope_id,
      source_evidence_refs: [...(preference.evidence_refs ?? [])],
      runtime_private_fields_omitted: true,
    }))
  );
}

function build_suggested_next_actions(
  unit: OperationalUnitRuntimeProjection
): FounderDashboardSuggestedNextActionSummary[] {
  return unit.suggested_next_actions.map((action) => ({
    action_id: action.action_id,
    cell_id: unit.scope_summary.scope_id,
    cell_label: unit.scope_summary.title,
    title: action.title,
    rationale: action.rationale,
    action_class: action.action_class,
    readiness_status: action.readiness_status,
    source_scope_ref: unit.scope_summary.scope_id,
    source_evidence_refs: [...action.evidence_refs],
    runtime_private_fields_omitted: true,
  }));
}

function build_blocked_items(
  unit: OperationalUnitRuntimeProjection
): FounderDashboardBlockedItemSummary[] {
  const taskBlockedItems = unit.task_summaries
    .filter((task) => task.status === "blocked")
    .map((task) => ({
      blocked_item_id: task.task_id,
      cell_id: unit.scope_summary.scope_id,
      cell_label: unit.scope_summary.title,
      blocked_item_kind: "task" as const,
      title: task.title,
      blocked_reason: "Task status is blocked.",
      source_scope_ref: unit.scope_summary.scope_id,
      source_evidence_refs: [...(task.source_evidence_refs ?? [])],
      runtime_private_fields_omitted: true,
    }));
  const actionBlockedItems = unit.action_summaries
    .filter((action) => action.blocked || action.readiness_status === "blocked")
    .map((action) => ({
      blocked_item_id: action.action_id,
      cell_id: unit.scope_summary.scope_id,
      cell_label: unit.scope_summary.title,
      blocked_item_kind: "action" as const,
      title: action.title,
      blocked_reason: action.reason,
      source_scope_ref: unit.scope_summary.scope_id,
      source_evidence_refs: [...action.source_evidence_refs],
      runtime_private_fields_omitted: true,
    }));
  const driftBlockedItems = unit.drift_summaries
    .filter((drift) => drift.recommendation === "block")
    .map((drift) => ({
      blocked_item_id: drift.drift_summary_id,
      cell_id: unit.scope_summary.scope_id,
      cell_label: unit.scope_summary.title,
      blocked_item_kind: "drift" as const,
      title: drift.drift_kind,
      blocked_reason: drift.impact_summary,
      source_scope_ref: unit.scope_summary.scope_id,
      source_evidence_refs: [...drift.evidence_refs],
      runtime_private_fields_omitted: true,
    }));
  const reviewBlockedItems = unit.pending_review_summaries
    .filter((review) => review.evidence_gap_summary !== undefined)
    .map((review) => ({
      blocked_item_id: review.review_id,
      cell_id: unit.scope_summary.scope_id,
      cell_label: unit.scope_summary.title,
      blocked_item_kind: "review" as const,
      title: review.title,
      blocked_reason:
        review.evidence_gap_summary ??
        `Review ${review.review_id} remains pending.`,
      source_scope_ref: unit.scope_summary.scope_id,
      source_evidence_refs: [...(review.evidence_refs ?? [])],
      runtime_private_fields_omitted: true,
    }));

  return [
    ...taskBlockedItems,
    ...actionBlockedItems,
    ...driftBlockedItems,
    ...reviewBlockedItems,
  ];
}

export function adaptRuntimeStateProjectionToFounderDashboard(
  input: FounderDashboardRuntimeAdapterInput
): FounderDashboardProjection {
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];

  if (input.non_executing !== true) {
    errors.push("RuntimeStateProjection.non_executing must be true");
  }

  ensure_runtime_private_fields_omitted(
    input.runtime_private_fields_omitted,
    errors,
    "RuntimeStateProjection.runtime_private_fields_omitted"
  );

  for (const [index, unit] of input.operational_unit_projections.entries()) {
    if (unit.project_id !== input.project_id) {
      errors.push(
        `operational_unit_projections[${index}].project_id must match RuntimeStateProjection.project_id`
      );
    }

    if (unit.non_executing !== true) {
      errors.push(
        `operational_unit_projections[${index}].non_executing must be true`
      );
    }

    ensure_runtime_private_fields_omitted(
      unit.runtime_private_fields_omitted,
      errors,
      `operational_unit_projections[${index}].runtime_private_fields_omitted`
    );

    unit.action_summaries.forEach((action, actionIndex) => {
      ensure_action_readiness_matches_class(
        action.action_class,
        action.readiness_status,
        action.blocked,
        errors,
        `operational_unit_projections[${index}].action_summaries[${actionIndex}]`
      );
    });

    unit.suggested_next_actions.forEach((action, actionIndex) => {
      ensure_action_readiness_matches_class(
        action.action_class,
        action.readiness_status,
        action.action_class === "forbidden_irreversible" ||
          action.readiness_status === "blocked",
        errors,
        `operational_unit_projections[${index}].suggested_next_actions[${actionIndex}]`
      );
    });
  }

  assert_valid(errors);

  const cellCards = stable_sort_by_key(
    input.operational_unit_projections.map(build_cell_card),
    "cell_id"
  );
  const pendingReviews = stable_sort_by_key(
    input.operational_unit_projections.flatMap(build_pending_reviews),
    "review_id"
  );
  const recentArtifacts = stable_sort_by_key(
    input.operational_unit_projections.flatMap(build_recent_artifacts),
    "artifact_id"
  );
  const learnedPreferences = stable_sort_by_key(
    input.operational_unit_projections.flatMap(build_learned_preferences),
    "preference_id"
  );
  const suggestedNextActions = stable_sort_by_key(
    input.operational_unit_projections.flatMap(build_suggested_next_actions),
    "action_id"
  );
  const blockedItems = stable_sort_by_key(
    input.operational_unit_projections.flatMap(build_blocked_items),
    "blocked_item_id"
  );
  const sourceEvidenceRefs = normalize_string_array(
    [
      ...input.evidence_refs,
      ...cellCards.flatMap((card) => card.source_evidence_refs),
      ...pendingReviews.flatMap((review) => review.source_evidence_refs),
      ...recentArtifacts.flatMap((artifact) => artifact.source_evidence_refs),
      ...learnedPreferences.flatMap((preference) => preference.source_evidence_refs),
      ...suggestedNextActions.flatMap((action) => action.source_evidence_refs),
      ...blockedItems.flatMap((item) => item.source_evidence_refs),
    ],
    "source_evidence_refs",
    []
  );

  return {
    dashboard_id: `${input.state_projection_id}-founder-dashboard`,
    projection_scope: "founder_dashboard_projection",
    authority_boundary: "product_projection_only",
    phase_boundary: "v1_9_wave3_projection_contract",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    project_id: input.project_id,
    generated_at: input.created_at,
    cell_cards: cellCards,
    pending_reviews: pendingReviews,
    recent_artifacts: recentArtifacts,
    learned_preferences: learnedPreferences,
    suggested_next_actions: suggestedNextActions,
    blocked_items: blockedItems,
    source_runtime_projection_ref: input.state_projection_id,
    source_evidence_refs: sourceEvidenceRefs,
    upstream_refs: [
      create_runtime_projection_ref({
        upstream_object_type: "RuntimeStateProjection",
        upstream_object_id: input.state_projection_id,
        notes: ["projection_safe_runtime_input"],
      }),
      ...input.operational_unit_projections.map((unit) =>
        create_runtime_projection_ref({
          upstream_object_type: "OperationalUnitRuntimeProjection",
          upstream_object_id: unit.operational_unit_id,
          notes: ["projection_safe_runtime_input"],
        })
      ),
    ],
    deferred_items: [
      "founder_dashboard_ui_not_implemented",
      "provider_execution",
      "channel_entry",
      "autonomous_operation",
    ],
    non_claims: [
      "no_provider_execution_truth",
      "no_channel_entry_truth",
      "no_autonomous_operation_truth",
      "no_ui_surface_in_this_wave",
      "no_v2_0_readiness_claim",
    ],
    projection_notes: [
      FOUNDER_DASHBOARD_BOUNDARY_SUMMARY,
      `Founder Dashboard projection aggregates ${cellCards.length} bounded cell cards from one runtime state projection.`,
      "Suggested next actions remain recommendation-only and non-executing.",
    ],
  };
}
