import type {
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  assembleFounderDashboardProjection,
} from "../../projection/assembly/founder-dashboard-projection.ts";
import {
  STARTER_CELL_DEFINITIONS,
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import {
  createV19FounderDashboardPageModel,
} from "./create-v1-9-founder-dashboard-page-model.ts";
import {
  assert_valid,
  collect_forbidden_field_errors,
  collect_forbidden_positive_claim_errors,
  ensure_runtime_private_fields_omitted,
  stable_sort_by_key,
  unique_strings,
} from "../../projection/adapters/runtime-readiness-adapter-helpers.ts";

export const V2_FOUNDER_DASHBOARD_SOURCE_FIXTURE_REF =
  "projection/fixtures/starter-cell-fixtures.ts#createStarterCellsRuntimeStateProjection";

export type V2FounderDashboardReadinessState =
  | "ready_for_review"
  | "needs_attention"
  | "blocked"
  | "deferred"
  | "fixture_only";

export interface V2FounderDashboardCellOverviewItem {
  cell_id: string;
  cell_label: string;
  cell_kind: string;
  status: string;
  purpose_summary: string;
  current_priority_summary: string;
  pending_review_summary: string;
  recent_artifact_summary: string;
  learned_preference_summary: string;
  drift_summary: string;
  suggested_next_action_summary: string;
  readiness_state: V2FounderDashboardReadinessState;
  source_scope_ref: string;
  source_evidence_refs: string[];
  non_executing: true;
}

export interface V2FounderDashboardActivePriorityItem {
  cell_id: string;
  cell_label: string;
  summary: string;
  readiness_state: V2FounderDashboardReadinessState;
  source_evidence_refs: string[];
  non_executing: true;
}

export interface V2FounderDashboardDriftAndBlockedItemSummary {
  cell_id: string;
  cell_label: string;
  drift_summary: string;
  blocked_item_summary: string;
  readiness_state: V2FounderDashboardReadinessState;
  source_evidence_refs: string[];
  non_executing: true;
}

export interface V2FounderDashboardPageModel {
  page_id: string;
  page_kind: "v2_founder_dashboard_productized";
  phase_boundary: "v2_0_wave3_founder_dashboard_productization";
  product_line: "v2_0";
  product_surface: "founder_dashboard";
  source_fixture_ref: string;
  source_projection_ref: string;
  source_evidence_refs: string[];
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_delivered: false;
  v2_0_ready: false;
  ga_available: false;
  dashboard_title: string;
  dashboard_summary: string;
  cells_overview: V2FounderDashboardCellOverviewItem[];
  active_priorities: V2FounderDashboardActivePriorityItem[];
  pending_reviews: ReturnType<
    typeof createV19FounderDashboardPageModel
  >["dashboard_surface"]["pending_reviews"];
  recent_artifacts: ReturnType<
    typeof createV19FounderDashboardPageModel
  >["dashboard_surface"]["recent_artifacts"];
  learned_preferences: ReturnType<
    typeof createV19FounderDashboardPageModel
  >["dashboard_surface"]["learned_preferences"];
  drift_and_blocked_items: V2FounderDashboardDriftAndBlockedItemSummary[];
  suggested_next_actions: ReturnType<
    typeof createV19FounderDashboardPageModel
  >["dashboard_surface"]["suggested_next_actions"];
  readiness_notices: string[];
  boundary_notices: string[];
  next_wave_hint: string;
}

function find_definition(cell_id: string) {
  return STARTER_CELL_DEFINITIONS.find((definition) => definition.cell_id === cell_id);
}

function derive_readiness_state(
  operational_unit_projection: OperationalUnitRuntimeProjection
): V2FounderDashboardReadinessState {
  const has_blocking_drift = operational_unit_projection.drift_summaries.some(
    (summary) => summary.recommendation === "block"
  );
  const has_review_gap = operational_unit_projection.pending_review_summaries.some(
    (review) => review.evidence_gap_summary !== undefined
  );
  const has_blocked_task = operational_unit_projection.task_summaries.some(
    (task) => task.status === "blocked"
  );
  const has_deferred_posture =
    operational_unit_projection.status === "paused" ||
    operational_unit_projection.suggested_next_actions.some(
      (action) => action.readiness_status === "deferred"
    );
  const has_reviewable_surface =
    operational_unit_projection.pending_review_summaries.length > 0 ||
    operational_unit_projection.recent_artifact_summaries.length > 0;

  if (has_deferred_posture) {
    return "deferred";
  }

  if (has_blocking_drift || operational_unit_projection.status === "blocked") {
    return "blocked";
  }

  if (has_review_gap || has_blocked_task) {
    return "needs_attention";
  }

  if (has_reviewable_surface) {
    return "ready_for_review";
  }

  return "fixture_only";
}

function summary_or_fallback(
  value: string | undefined,
  fallback: string
): string {
  if (!value || value.trim().length === 0) {
    return fallback;
  }

  return value.trim();
}

function build_cell_overview_item(
  operational_unit_projection: OperationalUnitRuntimeProjection
): V2FounderDashboardCellOverviewItem {
  const definition = find_definition(operational_unit_projection.scope_summary.scope_id);
  const first_review = operational_unit_projection.pending_review_summaries[0];
  const first_artifact = operational_unit_projection.recent_artifact_summaries[0];
  const first_learning = operational_unit_projection.learning_summaries[0];
  const first_preference = first_learning?.preference_suggestions[0];
  const first_drift = operational_unit_projection.drift_summaries[0];
  const first_next_action = operational_unit_projection.suggested_next_actions[0];
  const readiness_state = derive_readiness_state(operational_unit_projection);

  return {
    cell_id: operational_unit_projection.scope_summary.scope_id,
    cell_label: operational_unit_projection.scope_summary.title,
    cell_kind: definition?.cell_kind ?? "unknown_cell_kind",
    status: operational_unit_projection.status,
    purpose_summary:
      definition?.purpose ??
      "Starter-cell purpose is not available in this fixture.",
    current_priority_summary:
      operational_unit_projection.priority_summaries[0] !== undefined
        ? `${operational_unit_projection.priority_summaries[0].title}: ${operational_unit_projection.priority_summaries[0].rationale}`
        : "No current priority summary is visible in this fixture.",
    pending_review_summary:
      first_review !== undefined
        ? `${first_review.title} (${operational_unit_projection.pending_review_summaries.length} pending)`
        : "No pending review summary is visible in this fixture.",
    recent_artifact_summary:
      first_artifact !== undefined
        ? `${first_artifact.title} (${first_artifact.artifact_kind})`
        : "No recent artifact summary is visible in this fixture.",
    learned_preference_summary:
      first_preference !== undefined
        ? first_preference.summary
        : "No learned preference summary is visible in this fixture.",
    drift_summary:
      first_drift !== undefined
        ? `${first_drift.drift_kind}: ${first_drift.impact_summary}`
        : "No drift summary is visible in this fixture.",
    suggested_next_action_summary:
      first_next_action !== undefined
        ? `${first_next_action.title} (${first_next_action.readiness_status})`
        : "No suggested next action is visible in this fixture.",
    readiness_state,
    source_scope_ref: operational_unit_projection.scope_summary.scope_id,
    source_evidence_refs: unique_strings([
      ...operational_unit_projection.evidence_refs,
      ...(operational_unit_projection.scope_summary.evidence_refs ?? []),
      ...operational_unit_projection.priority_summaries.flatMap(
        (priority) => priority.evidence_refs ?? []
      ),
      ...operational_unit_projection.pending_review_summaries.flatMap(
        (review) => review.evidence_refs ?? []
      ),
      ...operational_unit_projection.recent_artifact_summaries.flatMap(
        (artifact) => artifact.evidence_refs
      ),
      ...operational_unit_projection.drift_summaries.flatMap(
        (drift) => drift.evidence_refs
      ),
      ...operational_unit_projection.suggested_next_actions.flatMap(
        (action) => action.evidence_refs
      ),
    ]),
    non_executing: true,
  };
}

function build_drift_and_blocked_summary(
  operational_unit_projection: OperationalUnitRuntimeProjection
): V2FounderDashboardDriftAndBlockedItemSummary {
  const readiness_state = derive_readiness_state(operational_unit_projection);
  const first_drift = operational_unit_projection.drift_summaries[0];
  const first_review_gap = operational_unit_projection.pending_review_summaries.find(
    (review) => review.evidence_gap_summary !== undefined
  );
  const first_blocked_task = operational_unit_projection.task_summaries.find(
    (task) => task.status === "blocked"
  );

  return {
    cell_id: operational_unit_projection.scope_summary.scope_id,
    cell_label: operational_unit_projection.scope_summary.title,
    drift_summary:
      first_drift !== undefined
        ? `${first_drift.recommendation}: ${first_drift.impact_summary}`
        : "No drift summary is visible in this fixture.",
    blocked_item_summary: summary_or_fallback(
      first_review_gap?.evidence_gap_summary ??
        (first_blocked_task !== undefined
          ? `Task attention item: ${first_blocked_task.title}.`
          : undefined),
      "No blocking attention item is visible beyond bounded fixture controls."
    ),
    readiness_state,
    source_evidence_refs: unique_strings([
      ...operational_unit_projection.evidence_refs,
      ...operational_unit_projection.drift_summaries.flatMap(
        (drift) => drift.evidence_refs
      ),
      ...operational_unit_projection.pending_review_summaries.flatMap(
        (review) => review.evidence_refs ?? []
      ),
      ...operational_unit_projection.task_summaries.flatMap(
        (task) => (task as { source_evidence_refs?: string[] }).source_evidence_refs ??
          task.evidence_refs ??
          []
      ),
    ]),
    non_executing: true,
  };
}

export function createV2FounderDashboardPageModel(
  runtime_state_projection: RuntimeStateProjection =
    createStarterCellsRuntimeStateProjection()
): V2FounderDashboardPageModel {
  const founder_dashboard_projection =
    assembleFounderDashboardProjection(runtime_state_projection);
  const thin_page_model =
    createV19FounderDashboardPageModel(runtime_state_projection);
  const errors = [
    ...collect_forbidden_field_errors(founder_dashboard_projection),
    ...collect_forbidden_positive_claim_errors(founder_dashboard_projection),
  ];

  ensure_runtime_private_fields_omitted(
    founder_dashboard_projection.runtime_private_fields_omitted,
    errors,
    "FounderDashboardProjection.runtime_private_fields_omitted"
  );

  if (founder_dashboard_projection.non_executing !== true) {
    errors.push("FounderDashboardProjection.non_executing must be true");
  }

  assert_valid(errors);

  const cells_overview = stable_sort_by_key(
    runtime_state_projection.operational_unit_projections.map(build_cell_overview_item),
    "cell_id"
  );
  const active_priorities = stable_sort_by_key(
    cells_overview.map((item) => ({
      cell_id: item.cell_id,
      cell_label: item.cell_label,
      summary: item.current_priority_summary,
      readiness_state: item.readiness_state,
      source_evidence_refs: [...item.source_evidence_refs],
      non_executing: true as const,
    })),
    "cell_id"
  );
  const drift_and_blocked_items = stable_sort_by_key(
    runtime_state_projection.operational_unit_projections.map(
      build_drift_and_blocked_summary
    ),
    "cell_id"
  );
  const source_evidence_refs = unique_strings([
    ...thin_page_model.source_evidence_refs,
    ...cells_overview.flatMap((item) => item.source_evidence_refs),
    ...drift_and_blocked_items.flatMap((item) => item.source_evidence_refs),
  ]);
  const pending_review_count = thin_page_model.dashboard_surface.pending_reviews.length;
  const recent_artifact_count = thin_page_model.dashboard_surface.recent_artifacts.length;
  const learned_preference_count =
    thin_page_model.dashboard_surface.learned_preferences.length;
  const next_action_count =
    thin_page_model.dashboard_surface.suggested_next_actions.length;

  return {
    page_id: `${founder_dashboard_projection.dashboard_id}-v2-product-page-model`,
    page_kind: "v2_founder_dashboard_productized",
    phase_boundary: "v2_0_wave3_founder_dashboard_productization",
    product_line: "v2_0",
    product_surface: "founder_dashboard",
    source_fixture_ref: V2_FOUNDER_DASHBOARD_SOURCE_FIXTURE_REF,
    source_projection_ref: founder_dashboard_projection.dashboard_id,
    source_evidence_refs,
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_delivered: false,
    v2_0_ready: false,
    ga_available: false,
    dashboard_title: "V2.0 Founder Dashboard productization",
    dashboard_summary:
      "Starter-cell fixtures now drive a product-facing founder overview across Development Company, E-commerce, and Personal Media work lanes.",
    cells_overview,
    active_priorities,
    pending_reviews: thin_page_model.dashboard_surface.pending_reviews,
    recent_artifacts: thin_page_model.dashboard_surface.recent_artifacts,
    learned_preferences: thin_page_model.dashboard_surface.learned_preferences,
    drift_and_blocked_items,
    suggested_next_actions:
      thin_page_model.dashboard_surface.suggested_next_actions,
    readiness_notices: [
      "V2.0 Founder Dashboard productization is backed by starter-cell fixtures.",
      `${cells_overview.length} starter Cells are visible in one founder surface.`,
      `${pending_review_count} pending review summaries, ${recent_artifact_count} recent artifacts, ${learned_preference_count} learned preferences, and ${next_action_count} suggested next actions are surfaced in this wave.`,
      "This dashboard is non-executing and not V2.0 delivery.",
    ],
    boundary_notices: [
      "No provider/channel execution.",
      "No autonomous operation.",
      "No real artifact-generation runtime in this wave.",
      "This dashboard remains bounded to fixture-backed founder visibility.",
    ],
    next_wave_hint: "Next wave: Cell Operations Panel Productization.",
  };
}
