import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellOperatorReadinessSummaryAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorReadinessSummaryPhaseBoundary =
  "operator_readiness_summary_scaffold";
export type SingleCellOperatorReadinessSummaryExecutionBoundary =
  "summary_only";
export type SingleCellOperatorReadinessLevel =
  | "ready_now"
  | "ready_with_known_gaps"
  | "waiting_for_operator_input"
  | "blocked_by_deferred_surfaces";
export type SingleCellOperatorReadinessSourceSurface =
  | "task_focus"
  | "request_package"
  | "request_review_submit_preview"
  | "delivery_acceptance"
  | "in_session_draft_state"
  | "session_draft_controls"
  | "truth_boundary";
export type SingleCellOperatorReadinessFacetId =
  | "current_focus_readiness"
  | "request_package_readiness"
  | "review_preview_readiness"
  | "delivery_acceptance_readiness"
  | "in_session_draft_readiness";
export type SingleCellOperatorReadinessBlockerKind =
  | "missing_input"
  | "deferred_surface"
  | "unavailable_surface";

export interface SingleCellOperatorReadinessFacetSummary {
  facet_id: SingleCellOperatorReadinessFacetId;
  display_label: string;
  readiness_level: SingleCellOperatorReadinessLevel;
  source_surface: SingleCellOperatorReadinessSourceSurface;
  notes: string[];
}

export interface SingleCellOperatorReadinessBlocker {
  blocker_id: string;
  display_label: string;
  blocker_kind: SingleCellOperatorReadinessBlockerKind;
  source_surface: SingleCellOperatorReadinessSourceSurface;
  notes: string[];
}

export interface SingleCellOperatorReadinessSummaryScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorReadinessSummaryAuthorityBoundary;
  phase_boundary: SingleCellOperatorReadinessSummaryPhaseBoundary;
  execution_boundary: SingleCellOperatorReadinessSummaryExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  overall_readiness_level: SingleCellOperatorReadinessLevel;
  ready_facet_count: number;
  incomplete_or_blocked_facet_count: number;
  current_focus_readiness: SingleCellOperatorReadinessFacetSummary;
  request_package_readiness: SingleCellOperatorReadinessFacetSummary;
  review_preview_readiness: SingleCellOperatorReadinessFacetSummary;
  delivery_acceptance_readiness: SingleCellOperatorReadinessFacetSummary;
  in_session_draft_readiness: SingleCellOperatorReadinessFacetSummary;
  deferred_or_unavailable_readiness_blockers:
    SingleCellOperatorReadinessBlocker[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
