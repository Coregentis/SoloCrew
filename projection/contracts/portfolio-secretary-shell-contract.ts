import type {
  CellSummaryProjection,
  CellSummaryProjectionTruthSource,
} from "./cell-summary-projection-contract.ts";
import type {
  FounderRequestExceptionPacketSummaryFamily,
  FounderRequestExceptionPosture,
  FounderRequestProjectionSummaryAvailability,
} from "./founder-request-exception-packet-contract.ts";
import type {
  SecretaryHandoffPacketStateCounts,
} from "./secretary-handoff-packet-contract.ts";
import type {
  SecretaryHandoffRationaleEvidenceProjection,
} from "./secretary-handoff-rationale-contract.ts";

export type PortfolioSecretaryShellScope = "portfolio_secretary_beta_shell";
export type PortfolioSecretaryShellAuthorityBoundary =
  "product_projection_only";
export type PortfolioSecretaryShellPhaseBoundary = "beta_shell_navigation";
export type PortfolioSecretaryShellSourceMode =
  "multi_cell_foundation_overview_shell";
export type PortfolioSecretarySelectionMode = "bounded_navigation_only";
export type PortfolioSecretaryQueueShelfVisibility =
  "bounded_queue_posture_only";
export type PortfolioSecretaryReviewShelfVisibility =
  "bounded_review_posture_only";
export const PORTFOLIO_FOUNDER_REQUEST_AGGREGATE_POSTURE_VALUES = [
  "portfolio_clear",
  "portfolio_monitor",
  "portfolio_review_needed",
  "portfolio_evidence_insufficient",
  "portfolio_stale_context",
  "portfolio_impact_detected",
  "portfolio_activation_blocked",
  "portfolio_confirm_required",
  "portfolio_escalation_required",
  "portfolio_revision_needed",
  "portfolio_contract_blocked",
] as const;
export type PortfolioFounderRequestAggregatePosture =
  (typeof PORTFOLIO_FOUNDER_REQUEST_AGGREGATE_POSTURE_VALUES)[number];
export type PortfolioSecretaryManagementObjectStatus =
  | "contract_frozen_non_executable"
  | "runtime_record_present_non_executable"
  | "runtime_record_absent_non_executable";
export type PortfolioSecretaryTruthSource =
  | CellSummaryProjectionTruthSource
  | "multi_cell_foundation_projection";
export type PortfolioFounderRequestAggregateSourceScope =
  | "review_packet_exception_summary"
  | "staging_exception_preview_summary";

export interface PortfolioSecretaryNavigationUnit {
  cell_id: string;
  cell_name: string;
  summary_projection_id: string;
  readiness_signal: CellSummaryProjection["readiness_signal"];
  source_mode: CellSummaryProjection["source_mode"];
  selected: boolean;
}

export interface PortfolioSecretaryStatusShelf {
  shelf_scope: "bounded_status_shelf";
  total_cells: number;
  attention_required_cells: number;
  steady_cells: number;
  packet_state_counts: SecretaryHandoffPacketStateCounts;
  packet_state_summary: string;
  direct_controls_available: false;
}

export interface PortfolioSecretaryQueueShelf {
  shelf_scope: "bounded_queue_shelf";
  queue_visibility: PortfolioSecretaryQueueShelfVisibility;
  queued_attention_cells: number;
  staged_packet_cells: number;
  ready_for_cell_review_cells: number;
  returned_for_revision_cells: number;
  packet_queue_summary: string;
  direct_controls_available: false;
  shelf_note: string;
}

export interface PortfolioSecretaryReviewShelf {
  shelf_scope: "bounded_review_shelf";
  review_visibility: PortfolioSecretaryReviewShelfVisibility;
  approval_request_visibility: PortfolioSecretaryManagementObjectStatus;
  delivery_return_visibility: PortfolioSecretaryManagementObjectStatus;
  ready_for_cell_review_cells: number;
  returned_for_revision_cells: number;
  review_packet_summary: string;
  direct_controls_available: false;
  shelf_note: string;
}

export interface PortfolioFounderRequestAggregateFamilyStatusSummary {
  family: FounderRequestExceptionPacketSummaryFamily;
  availability: FounderRequestProjectionSummaryAvailability;
  summary_label: string;
}

export interface PortfolioFounderRequestAggregateSourceSummary {
  source_summary_scope: PortfolioFounderRequestAggregateSourceScope;
  request_ref: string;
  request_label: string;
  derived_exception_posture: FounderRequestExceptionPosture;
  review_return_posture: FounderRequestExceptionPosture;
  marker_status: FounderRequestProjectionSummaryAvailability;
  evidence_status: FounderRequestProjectionSummaryAvailability;
  learning_signal_visible: boolean;
  status_markers: FounderRequestProjectionSummaryAvailability[];
  family_status_summaries: PortfolioFounderRequestAggregateFamilyStatusSummary[];
}

export interface PortfolioFounderRequestAggregatePostureSummary {
  summary_scope: "founder_request_exception_portfolio_aggregate";
  aggregate_posture: PortfolioFounderRequestAggregatePosture;
  aggregate_summary: string;
  source_summary_count: number;
  review_packet_summary_count: number;
  staging_preview_summary_count: number;
  learning_signal_count: number;
  status_markers: FounderRequestProjectionSummaryAvailability[];
  non_executing: true;
  summary_only: true;
  omission_aware: true;
  insufficiency_aware: true;
  stale_aware: true;
}

export interface PortfolioSecretaryPostureShelf {
  shelf_scope: "bounded_posture_shelf";
  management_directive_visibility: PortfolioSecretaryManagementObjectStatus;
  delivery_return_visibility: PortfolioSecretaryManagementObjectStatus;
  approval_request_visibility: PortfolioSecretaryManagementObjectStatus;
  secretary_posture:
    "handoff_first_review_packet_first_revision_loop_non_executing";
  direct_controls_available: false;
  founder_request_aggregate_posture?: PortfolioFounderRequestAggregatePostureSummary;
}

export interface PortfolioSecretaryShellProjection {
  portfolio_secretary_projection_id: string;
  source_overview_shell_id: string;
  projection_scope: PortfolioSecretaryShellScope;
  authority_boundary: PortfolioSecretaryShellAuthorityBoundary;
  phase_boundary: PortfolioSecretaryShellPhaseBoundary;
  source_mode: PortfolioSecretaryShellSourceMode;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  workflow_engine_behavior_available: false;
  runtime_complete_orchestration_available: false;
  handoff_creation_available: true;
  selection: {
    selection_mode: PortfolioSecretarySelectionMode;
    selected_cell_id?: string;
    selected_cell_name?: string;
    selected_summary_projection_id?: string;
  };
  view_separation: {
    secretary_view: "portfolio_level_beta_shell";
    cell_view: "existing_v0_4_cell_surfaces";
    secretary_view_distinct_from_cell_view: true;
  };
  navigation_units: PortfolioSecretaryNavigationUnit[];
  summary_projections: CellSummaryProjection[];
  status_shelf: PortfolioSecretaryStatusShelf;
  queue_shelf: PortfolioSecretaryQueueShelf;
  review_shelf: PortfolioSecretaryReviewShelf;
  posture_shelf: PortfolioSecretaryPostureShelf;
  rationale_evidence: SecretaryHandoffRationaleEvidenceProjection;
  truth_sources: PortfolioSecretaryTruthSource[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
