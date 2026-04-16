import type {
  CellSummaryProjection,
  CellSummaryProjectionTruthSource,
} from "./cell-summary-projection-contract.ts";

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
export type PortfolioSecretaryManagementObjectStatus =
  | "contract_frozen_non_executable"
  | "runtime_record_present_non_executable"
  | "runtime_record_absent_non_executable";
export type PortfolioSecretaryTruthSource =
  | CellSummaryProjectionTruthSource
  | "multi_cell_foundation_projection";

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
  direct_controls_available: false;
}

export interface PortfolioSecretaryQueueShelf {
  shelf_scope: "bounded_queue_shelf";
  queue_visibility: PortfolioSecretaryQueueShelfVisibility;
  queued_attention_cells: number;
  direct_controls_available: false;
  shelf_note: string;
}

export interface PortfolioSecretaryReviewShelf {
  shelf_scope: "bounded_review_shelf";
  review_visibility: PortfolioSecretaryReviewShelfVisibility;
  approval_request_visibility: PortfolioSecretaryManagementObjectStatus;
  delivery_return_visibility: PortfolioSecretaryManagementObjectStatus;
  direct_controls_available: false;
  shelf_note: string;
}

export interface PortfolioSecretaryPostureShelf {
  shelf_scope: "bounded_posture_shelf";
  management_directive_visibility: PortfolioSecretaryManagementObjectStatus;
  delivery_return_visibility: PortfolioSecretaryManagementObjectStatus;
  approval_request_visibility: PortfolioSecretaryManagementObjectStatus;
  secretary_posture: "handoff_first_non_executing";
  direct_controls_available: false;
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
  handoff_creation_available: false;
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
  truth_sources: PortfolioSecretaryTruthSource[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
