import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellDeliveryAcceptanceAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellDeliveryAcceptancePhaseBoundary =
  "delivery_acceptance_scaffold";
export type SingleCellDeliveryAcceptanceExecutionBoundary =
  "acceptance_scaffold_only";
export type SingleCellDeliveryAcceptanceStatus =
  | "criteria_visible_with_open_items"
  | "criteria_visible_ready_for_bounded_review";
export type SingleCellDeliveryAcceptanceSurface =
  | "delivery"
  | "delivery_acceptance"
  | "objective_overview"
  | "work_item_execution_overview"
  | "correction_review"
  | "action_intents"
  | "truth_boundary";
export type SingleCellAcceptanceCriterionVisibilityStatus =
  | "visible_now"
  | "derived_now";
export type SingleCellCompletedAcceptanceSupportLevel =
  | "visible_now"
  | "bounded_summary_only";
export type SingleCellOpenAcceptanceSignalStatus =
  | "unmet_now"
  | "deferred";

export interface SingleCellCurrentDeliveryContractSummary {
  delivery_contract_id: string;
  delivery_target: string;
  done_definition: string;
  return_shape: string;
  review_posture: string;
  delivery_posture: string;
  current_objective_headline: string;
  acceptance_status: SingleCellDeliveryAcceptanceStatus;
}

export interface SingleCellAcceptanceCriterionVisibility {
  criterion_id: string;
  display_label: string;
  visibility_status: SingleCellAcceptanceCriterionVisibilityStatus;
  source_surface: SingleCellDeliveryAcceptanceSurface;
  notes: string[];
}

export interface SingleCellCompletedAcceptanceSignal {
  signal_id: string;
  display_label: string;
  support_level: SingleCellCompletedAcceptanceSupportLevel;
  source_surface: SingleCellDeliveryAcceptanceSurface;
  notes: string[];
}

export interface SingleCellOpenAcceptanceSignal {
  signal_id: string;
  display_label: string;
  signal_status: SingleCellOpenAcceptanceSignalStatus;
  source_surface: SingleCellDeliveryAcceptanceSurface;
  notes: string[];
}

export interface SingleCellUnavailableAcceptanceSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellDeliveryAcceptanceScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellDeliveryAcceptanceAuthorityBoundary;
  phase_boundary: SingleCellDeliveryAcceptancePhaseBoundary;
  execution_boundary: SingleCellDeliveryAcceptanceExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_delivery_contract_summary: SingleCellCurrentDeliveryContractSummary;
  acceptance_criteria_visibility: SingleCellAcceptanceCriterionVisibility[];
  completed_acceptance_signals: SingleCellCompletedAcceptanceSignal[];
  unmet_or_deferred_acceptance_signals: SingleCellOpenAcceptanceSignal[];
  unavailable_acceptance_surfaces: SingleCellUnavailableAcceptanceSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
