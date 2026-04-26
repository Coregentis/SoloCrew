import type {
  OperationalUnitRuntimeProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import type {
  CellActionSummaryView,
  CellArtifactSummaryView,
  CellDriftSummaryView,
  CellHistorySummaryView,
  CellLearningSummaryView,
  CellMetricSummaryView,
  CellOperationsPanelProjection,
  CellOperationsPanelSuggestedNextActionView,
  CellReviewSummaryView,
  CellTaskSummaryView,
} from "../contracts/cell-operations-panel-projection-contract.ts";
import {
  CELL_OPERATIONS_PANEL_BOUNDARY_SUMMARY,
} from "../contracts/cell-operations-panel-projection-contract.ts";
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

export interface CellOperationsRuntimeAdapterInput {
  source_runtime_projection_ref?: string;
  operational_unit_projection: OperationalUnitRuntimeProjection;
}

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

function build_task_summaries(
  unit: OperationalUnitRuntimeProjection
): CellTaskSummaryView[] {
  return stable_sort_by_key(
    unit.task_summaries.map((task) => ({
      task_id: task.task_id,
      title: task.title,
      status: task.status,
      task_kind: task.task_kind,
      related_artifact_refs: [...task.related_artifact_refs],
      source_evidence_refs: [...(task.evidence_refs ?? [])],
      runtime_private_fields_omitted: true,
    })),
    "task_id"
  );
}

function build_artifact_summaries(
  unit: OperationalUnitRuntimeProjection
): CellArtifactSummaryView[] {
  return stable_sort_by_key(
    unit.recent_artifact_summaries.map((artifact) => ({
      artifact_id: artifact.artifact_id,
      title: artifact.title,
      artifact_kind: artifact.artifact_kind,
      artifact_class: artifact.artifact_class,
      status: artifact.status,
      source_refs: [...artifact.source_refs],
      source_evidence_refs: [...artifact.evidence_refs],
      runtime_private_fields_omitted: true,
    })),
    "artifact_id"
  );
}

function build_action_summaries(
  unit: OperationalUnitRuntimeProjection
): CellActionSummaryView[] {
  return stable_sort_by_key(
    unit.action_summaries.map((action) => ({
      action_id: action.action_id,
      title: action.title,
      action_class: action.action_class,
      readiness_status: action.readiness_status,
      requires_confirmation: action.requires_confirmation,
      blocked: action.blocked,
      reason: action.reason,
      related_task_refs: [...action.related_task_refs],
      related_artifact_refs: [...action.related_artifact_refs],
      risk_notes: [...action.risk_notes],
      source_evidence_refs: [...action.evidence_refs],
      runtime_private_fields_omitted: true,
    })),
    "action_id"
  );
}

function build_learning_summaries(
  unit: OperationalUnitRuntimeProjection
): CellLearningSummaryView[] {
  return stable_sort_by_key(
    unit.learning_summaries.map((summary) => ({
      learning_summary_id: summary.learning_summary_id,
      scope_kind: summary.scope_kind,
      active_candidate_count: summary.active_candidate_count,
      active_candidate_summaries: summary.active_candidates.map(
        (candidate) => candidate.candidate_summary
      ),
      global_candidate_summaries: summary.global_candidate_summaries.map(
        (candidate) => candidate.candidate_summary
      ),
      inactive_candidate_summaries: summary.inactive_candidates.map(
        (candidate) => candidate.candidate_summary
      ),
      preference_summaries: summary.preference_suggestions.map((suggestion) => ({
        preference_id: suggestion.preference_suggestion_id,
        summary: suggestion.summary,
        application_scope: suggestion.application_scope,
        status: suggestion.status,
      })),
      source_evidence_refs: normalize_string_array(
        [
          ...summary.active_candidates.flatMap((candidate) => candidate.evidence_refs),
          ...summary.global_candidate_summaries.flatMap(
            (candidate) => candidate.evidence_refs
          ),
          ...summary.preference_suggestions.flatMap(
            (suggestion) => suggestion.evidence_refs ?? []
          ),
        ],
        "learning_summary.source_evidence_refs",
        []
      ),
      runtime_private_fields_omitted: true,
    })),
    "learning_summary_id"
  );
}

function build_drift_summaries(
  unit: OperationalUnitRuntimeProjection
): CellDriftSummaryView[] {
  return stable_sort_by_key(
    unit.drift_summaries.map((drift) => ({
      drift_summary_id: drift.drift_summary_id,
      drift_kind: drift.drift_kind,
      impact_summary: drift.impact_summary,
      recommendation: drift.recommendation,
      confidence_posture: drift.confidence_posture,
      affected_scope_refs: [...drift.affected_scope_refs],
      affected_artifact_refs: [...drift.affected_artifact_refs],
      source_evidence_refs: [...drift.evidence_refs],
      runtime_private_fields_omitted: true,
    })),
    "drift_summary_id"
  );
}

function build_review_summaries(
  unit: OperationalUnitRuntimeProjection
): CellReviewSummaryView[] {
  return stable_sort_by_key(
    unit.pending_review_summaries.map((review) => ({
      review_id: review.review_id,
      title: review.title,
      status: review.status,
      review_kind: review.review_kind,
      review_summary: review.review_summary,
      evidence_gap_summary: review.evidence_gap_summary,
      source_evidence_refs: [...(review.evidence_refs ?? [])],
      runtime_private_fields_omitted: true,
    })),
    "review_id"
  );
}

function build_history_summaries(args: {
  action_summaries: CellActionSummaryView[];
  artifact_summaries: CellArtifactSummaryView[];
  drift_summaries: CellDriftSummaryView[];
  review_summaries: CellReviewSummaryView[];
}): CellHistorySummaryView[] {
  const actionHistory = args.action_summaries.map((action) => ({
    history_id: `action:${action.action_id}`,
    history_kind: "action" as const,
    title: action.title,
    summary: `${action.action_class} remains ${action.readiness_status}: ${action.reason}`,
    source_ref_id: action.action_id,
    source_evidence_refs: [...action.source_evidence_refs],
    runtime_private_fields_omitted: true,
  }));
  const artifactHistory = args.artifact_summaries.map((artifact) => ({
    history_id: `artifact:${artifact.artifact_id}`,
    history_kind: "artifact" as const,
    title: artifact.title,
    summary: `${artifact.artifact_class} artifact remains ${artifact.status}.`,
    source_ref_id: artifact.artifact_id,
    source_evidence_refs: [...artifact.source_evidence_refs],
    runtime_private_fields_omitted: true,
  }));
  const driftHistory = args.drift_summaries.map((drift) => ({
    history_id: `drift:${drift.drift_summary_id}`,
    history_kind: "drift" as const,
    title: drift.drift_kind,
    summary: `${drift.recommendation}: ${drift.impact_summary}`,
    source_ref_id: drift.drift_summary_id,
    source_evidence_refs: [...drift.source_evidence_refs],
    runtime_private_fields_omitted: true,
  }));
  const reviewHistory = args.review_summaries.map((review) => ({
    history_id: `review:${review.review_id}`,
    history_kind: "review" as const,
    title: review.title,
    summary:
      review.review_summary ??
      review.evidence_gap_summary ??
      `Review remains ${review.status}.`,
    source_ref_id: review.review_id,
    source_evidence_refs: [...review.source_evidence_refs],
    runtime_private_fields_omitted: true,
  }));

  return stable_sort_by_key(
    [...actionHistory, ...artifactHistory, ...driftHistory, ...reviewHistory],
    "history_id"
  );
}

function build_metric_summaries(args: {
  task_summaries: CellTaskSummaryView[];
  artifact_summaries: CellArtifactSummaryView[];
  action_summaries: CellActionSummaryView[];
  learning_summaries: CellLearningSummaryView[];
  drift_summaries: CellDriftSummaryView[];
  review_summaries: CellReviewSummaryView[];
}): CellMetricSummaryView[] {
  return [
    {
      metric_id: "task_count",
      metric_label: "task_count",
      metric_value: args.task_summaries.length,
      metric_summary: "Bounded task summaries currently visible.",
      runtime_private_fields_omitted: true,
    },
    {
      metric_id: "pending_review_count",
      metric_label: "pending_review_count",
      metric_value: args.review_summaries.length,
      metric_summary: "Pending review summaries currently visible.",
      runtime_private_fields_omitted: true,
    },
    {
      metric_id: "recent_artifact_count",
      metric_label: "recent_artifact_count",
      metric_value: args.artifact_summaries.length,
      metric_summary: "Recent artifact summaries currently visible.",
      runtime_private_fields_omitted: true,
    },
    {
      metric_id: "active_learning_count",
      metric_label: "active_learning_count",
      metric_value: args.learning_summaries.reduce(
        (total, summary) => total + summary.active_candidate_count,
        0
      ),
      metric_summary: "Accepted same-scope learning summaries currently visible.",
      runtime_private_fields_omitted: true,
    },
    {
      metric_id: "blocked_signal_count",
      metric_label: "blocked_signal_count",
      metric_value:
        args.task_summaries.filter((task) => task.status === "blocked").length +
        args.action_summaries.filter((action) => action.blocked).length +
        args.drift_summaries.filter((drift) => drift.recommendation === "block").length,
      metric_summary: "Blocked task, action, and drift summaries currently visible.",
      runtime_private_fields_omitted: true,
    },
  ];
}

function build_suggested_next_actions(
  unit: OperationalUnitRuntimeProjection
): CellOperationsPanelSuggestedNextActionView[] {
  return stable_sort_by_key(
    unit.suggested_next_actions.map((action) => ({
      action_id: action.action_id,
      title: action.title,
      rationale: action.rationale,
      action_class: action.action_class,
      readiness_status: action.readiness_status,
      source_evidence_refs: [...action.evidence_refs],
      related_task_refs: [...action.related_task_refs],
      related_artifact_refs: [...action.related_artifact_refs],
      runtime_private_fields_omitted: true,
    })),
    "action_id"
  );
}

export function adaptOperationalUnitRuntimeProjectionToCellOperationsPanel(
  input: CellOperationsRuntimeAdapterInput
): CellOperationsPanelProjection {
  const unit = input.operational_unit_projection;
  const errors = [
    ...collect_forbidden_field_errors(input),
    ...collect_forbidden_string_errors(input),
  ];

  if (unit.non_executing !== true) {
    errors.push("OperationalUnitRuntimeProjection.non_executing must be true");
  }

  ensure_runtime_private_fields_omitted(
    unit.runtime_private_fields_omitted,
    errors,
    "OperationalUnitRuntimeProjection.runtime_private_fields_omitted"
  );
  ensure_runtime_private_fields_omitted(
    unit.scope_summary.runtime_private_fields_omitted,
    errors,
    "OperationalUnitRuntimeProjection.scope_summary.runtime_private_fields_omitted"
  );

  unit.action_summaries.forEach((action, index) => {
    ensure_action_readiness_matches_class(
      action.action_class,
      action.readiness_status,
      action.blocked,
      errors,
      `action_summaries[${index}]`
    );
  });
  unit.suggested_next_actions.forEach((action, index) => {
    ensure_action_readiness_matches_class(
      action.action_class,
      action.readiness_status,
      action.action_class === "forbidden_irreversible" ||
        action.readiness_status === "blocked",
      errors,
      `suggested_next_actions[${index}]`
    );
  });

  assert_valid(errors);

  const taskSummaries = build_task_summaries(unit);
  const artifactSummaries = build_artifact_summaries(unit);
  const actionSummaries = build_action_summaries(unit);
  const learningSummaries = build_learning_summaries(unit);
  const driftSummaries = build_drift_summaries(unit);
  const reviewSummaries = build_review_summaries(unit);
  const historySummaries = build_history_summaries({
    action_summaries: actionSummaries,
    artifact_summaries: artifactSummaries,
    drift_summaries: driftSummaries,
    review_summaries: reviewSummaries,
  });
  const metricSummaries = build_metric_summaries({
    task_summaries: taskSummaries,
    artifact_summaries: artifactSummaries,
    action_summaries: actionSummaries,
    learning_summaries: learningSummaries,
    drift_summaries: driftSummaries,
    review_summaries: reviewSummaries,
  });
  const suggestedNextActions = build_suggested_next_actions(unit);
  const sourceEvidenceRefs = normalize_string_array(
    [
      ...unit.evidence_refs,
      ...taskSummaries.flatMap((task) => task.source_evidence_refs),
      ...artifactSummaries.flatMap((artifact) => artifact.source_evidence_refs),
      ...actionSummaries.flatMap((action) => action.source_evidence_refs),
      ...learningSummaries.flatMap((summary) => summary.source_evidence_refs),
      ...driftSummaries.flatMap((summary) => summary.source_evidence_refs),
      ...reviewSummaries.flatMap((summary) => summary.source_evidence_refs),
      ...historySummaries.flatMap((summary) => summary.source_evidence_refs),
      ...suggestedNextActions.flatMap((action) => action.source_evidence_refs),
    ],
    "source_evidence_refs",
    []
  );
  const sourceRuntimeProjectionRef =
    input.source_runtime_projection_ref ?? unit.operational_unit_id;

  return {
    panel_id: `${unit.scope_summary.scope_id}-cell-operations-panel`,
    projection_scope: "cell_operations_panel_projection",
    authority_boundary: "product_projection_only",
    phase_boundary: "v1_9_wave3_projection_contract",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    project_id: unit.project_id,
    cell_id: unit.scope_summary.scope_id,
    cell_label: unit.scope_summary.title,
    status: unit.status,
    objective_summary: derive_objective_summary(unit),
    task_summaries: taskSummaries,
    artifact_summaries: artifactSummaries,
    action_summaries: actionSummaries,
    learning_summaries: learningSummaries,
    drift_summaries: driftSummaries,
    review_summaries: reviewSummaries,
    history_summaries: historySummaries,
    metric_summaries: metricSummaries,
    metric_summary_status: "derived_bounded_counts",
    suggested_next_actions: suggestedNextActions,
    source_operational_unit_ref: unit.operational_unit_id,
    source_runtime_projection_ref: sourceRuntimeProjectionRef,
    source_evidence_refs: sourceEvidenceRefs,
    upstream_refs: [
      create_runtime_projection_ref({
        upstream_object_type: "OperationalUnitRuntimeProjection",
        upstream_object_id: unit.operational_unit_id,
        notes: ["projection_safe_runtime_input"],
      }),
      create_runtime_projection_ref({
        upstream_object_type: "RuntimeStateProjection",
        upstream_object_id: sourceRuntimeProjectionRef,
        notes: ["projection_safe_runtime_input"],
      }),
    ],
    deferred_items: [
      "cell_operations_panel_ui_not_implemented",
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
      CELL_OPERATIONS_PANEL_BOUNDARY_SUMMARY,
      "Action readiness classes remain preserved from the upstream runtime projection.",
      "Metrics remain bounded derived counts rather than runtime authority claims.",
    ],
  };
}
