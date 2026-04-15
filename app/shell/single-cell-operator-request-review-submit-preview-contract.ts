import type { RuntimeSessionMode } from "./create-runtime-session.ts";
import type {
  SingleCellDeliveryAcceptanceStatus,
} from "./single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorActionIntentKind,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellCorrectionReviewTargetScope,
  SingleCellReviewIntent,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorRequestPackageField,
} from "./single-cell-operator-request-package-contract.ts";

export type SingleCellOperatorRequestReviewSubmitPreviewAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorRequestReviewSubmitPreviewPhaseBoundary =
  "operator_request_review_submit_preview_scaffold";
export type SingleCellOperatorRequestReviewSubmitPreviewExecutionBoundary =
  "submit_preview_only";
export type SingleCellOperatorRequestReviewabilityStatus =
  | "review_ready_now"
  | "review_blocked_missing_core_fields";
export type SingleCellOperatorRequestPreviewabilityStatus =
  | "preview_ready_now"
  | "preview_blocked_missing_core_fields";
export type SingleCellOperatorRequestCompletenessSignalStatus =
  | "satisfied_now"
  | "missing_now"
  | "deferred";
export type SingleCellOperatorRequestCompletenessSignalSource =
  | "request_package"
  | "input_drafts"
  | "action_intents"
  | "delivery_acceptance"
  | "truth_boundary";
export type SingleCellOperatorRequestSubmitPreviewStatus =
  | "preview_ready_submit_unavailable"
  | "preview_blocked_missing_core_fields";

export interface SingleCellCurrentRequestPackageSummary {
  request_package_id: string;
  packaged_fields_present: SingleCellOperatorRequestPackageField[];
  objective_focus_label: string;
  work_item_focus_label: string;
  selected_action_intent_kind?: SingleCellOperatorActionIntentKind;
  selected_action_intent_confirmed: boolean;
  correction_target_scope: SingleCellCorrectionReviewTargetScope;
  review_intent: SingleCellReviewIntent;
  acceptance_status: SingleCellDeliveryAcceptanceStatus;
  packaged_draft_count: number;
  populated_draft_count: number;
}

export interface SingleCellOperatorRequestReviewPreviewState {
  reviewability_status: SingleCellOperatorRequestReviewabilityStatus;
  previewability_status: SingleCellOperatorRequestPreviewabilityStatus;
  incomplete_request: boolean;
  notes: string[];
}

export interface SingleCellOperatorRequestCompletenessSignal {
  signal_id: string;
  display_label: string;
  signal_status: SingleCellOperatorRequestCompletenessSignalStatus;
  source_surface: SingleCellOperatorRequestCompletenessSignalSource;
  notes: string[];
}

export interface SingleCellOperatorRequestMissingOrDeferredField {
  field_id: string;
  display_label: string;
  field_status: Exclude<
    SingleCellOperatorRequestCompletenessSignalStatus,
    "satisfied_now"
  >;
  reason: string;
  notes: string[];
}

export interface SingleCellOperatorRequestUnavailableSubmitSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorRequestReviewSubmitPreviewScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary:
    SingleCellOperatorRequestReviewSubmitPreviewAuthorityBoundary;
  phase_boundary:
    SingleCellOperatorRequestReviewSubmitPreviewPhaseBoundary;
  execution_boundary:
    SingleCellOperatorRequestReviewSubmitPreviewExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_request_package_summary: SingleCellCurrentRequestPackageSummary;
  review_preview_state: SingleCellOperatorRequestReviewPreviewState;
  completeness_signals: SingleCellOperatorRequestCompletenessSignal[];
  missing_or_deferred_fields:
    SingleCellOperatorRequestMissingOrDeferredField[];
  future_submit_dependencies: string[];
  submit_preview_status: SingleCellOperatorRequestSubmitPreviewStatus;
  unavailable_submit_surfaces:
    SingleCellOperatorRequestUnavailableSubmitSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
