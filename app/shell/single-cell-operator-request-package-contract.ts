import type { RuntimeSessionMode } from "./create-runtime-session.ts";
import type {
  SingleCellDeliveryAcceptanceStatus,
} from "./single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorActionIntentKind,
  SingleCellOperatorActionIntentSupportLevel,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellCorrectionReviewTargetScope,
  SingleCellReviewIntent,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorInputDraftKind,
  SingleCellOperatorInputDraftMode,
  SingleCellOperatorInputDraftSupportLevel,
  SingleCellOperatorInputDraftSurface,
} from "./single-cell-operator-input-draft-contract.ts";

export type SingleCellOperatorRequestPackageAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorRequestPackagePhaseBoundary =
  "operator_request_package_scaffold";
export type SingleCellOperatorRequestPackageExecutionBoundary =
  "request_package_scaffold_only";
export type SingleCellOperatorRequestPackageField =
  | "current_focus"
  | "selected_action_intent"
  | "correction_review_target"
  | "input_drafts"
  | "delivery_acceptance_context";
export type SingleCellOperatorRequestPackageSelectionBasis =
  "derived_default_from_current_truth";

export interface SingleCellOperatorRequestPackageFocus {
  objective_focus_id: string;
  objective_focus_label: string;
  work_item_focus_id: string;
  work_item_focus_label: string;
}

export interface SingleCellOperatorRequestPackageSelectedActionIntent {
  selection_basis: SingleCellOperatorRequestPackageSelectionBasis;
  selection_confirmed: false;
  intent_kind: SingleCellOperatorActionIntentKind;
  display_label: string;
  support_level: SingleCellOperatorActionIntentSupportLevel;
  target_ref_id: string;
  target_label: string;
  notes: string[];
}

export interface SingleCellOperatorRequestPackageCorrectionReviewTarget {
  target_scope: SingleCellCorrectionReviewTargetScope;
  target_ref_id: string;
  review_intent: SingleCellReviewIntent;
  source_surface: "correction_review";
  notes: string[];
}

export interface SingleCellOperatorRequestPackageInputDraft {
  draft_kind: SingleCellOperatorInputDraftKind;
  draft_mode: SingleCellOperatorInputDraftMode;
  support_level: SingleCellOperatorInputDraftSupportLevel;
  target_ref_id: string;
  target_label: string;
  target_surface: SingleCellOperatorInputDraftSurface;
  current_text: string;
  has_text: boolean;
  placeholder_text: string;
  notes: string[];
}

export interface SingleCellOperatorRequestPackageDeliveryAcceptanceContext {
  delivery_contract_id: string;
  acceptance_status: SingleCellDeliveryAcceptanceStatus;
  delivery_target: string;
  review_posture: string;
  completed_signal_count: number;
  open_signal_count: number;
  notes: string[];
}

export interface SingleCellOperatorRequestPackage {
  request_package_id: string;
  package_fields_present: SingleCellOperatorRequestPackageField[];
  current_focus: SingleCellOperatorRequestPackageFocus;
  selected_action_intent?: SingleCellOperatorRequestPackageSelectedActionIntent;
  correction_review_target:
    SingleCellOperatorRequestPackageCorrectionReviewTarget;
  input_drafts: SingleCellOperatorRequestPackageInputDraft[];
  delivery_acceptance_context:
    SingleCellOperatorRequestPackageDeliveryAcceptanceContext;
}

export interface SingleCellOperatorRequestPackageUnavailableSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorRequestPackageScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorRequestPackageAuthorityBoundary;
  phase_boundary: SingleCellOperatorRequestPackagePhaseBoundary;
  execution_boundary: SingleCellOperatorRequestPackageExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_request_package: SingleCellOperatorRequestPackage;
  unavailable_request_surfaces:
    SingleCellOperatorRequestPackageUnavailableSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
