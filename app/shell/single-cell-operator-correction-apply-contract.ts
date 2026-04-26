import type {
  SoloCrewCorrectionCaptureTarget,
  SoloCrewPreferenceWritebackDisposition,
} from "./runtime-session-facade.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";
import type {
  SingleCellCorrectionReviewSupportLevel,
  SingleCellCorrectionReviewTargetScope,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorActionIntentKind,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellOperatorRequestSubmitPreviewStatus,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";

export type SingleCellOperatorCorrectionApplyAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorCorrectionApplyPhaseBoundary =
  "operator_correction_apply_path";
export type SingleCellOperatorCorrectionApplyExecutionBoundary =
  "console_apply_path_only";
export type SingleCellOperatorCorrectionApplyStatus =
  | "available_now"
  | "blocked_missing_operator_input"
  | "applied_in_session";
export type SingleCellOperatorCorrectionApplySummarySource =
  | "correction_text_draft"
  | "review_request_draft"
  | "absent";
export type SingleCellOperatorCorrectionApplyCorrectedValueSource =
  | "selected_action_intent_draft"
  | "request_package_selected_action_intent"
  | "review_intent_default";

export interface SingleCellOperatorCorrectionApplyRequest {
  apply_now?: boolean;
  target_scope?: SingleCellCorrectionReviewTargetScope;
}

export interface SingleCellOperatorCorrectionApplyTarget {
  target_scope: SingleCellCorrectionReviewTargetScope;
  display_label: string;
  target_ref_id: string;
  support_level: SingleCellCorrectionReviewSupportLevel;
  runtime_mapping_target: SoloCrewCorrectionCaptureTarget;
  notes: string[];
}

export interface SingleCellOperatorCorrectionApplyInput {
  correction_summary?: string;
  correction_summary_source: SingleCellOperatorCorrectionApplySummarySource;
  corrected_value: string;
  corrected_value_source:
    SingleCellOperatorCorrectionApplyCorrectedValueSource;
  operator_input_ready: boolean;
  current_review_intent: string;
  request_submit_preview_status:
    SingleCellOperatorRequestSubmitPreviewStatus;
  selected_action_intent_kind?: SingleCellOperatorActionIntentKind;
  notes: string[];
}

export interface SingleCellOperatorCorrectionApplyCurrentTruth {
  current_memory_summary_count: number;
  current_preference_continuity_visible: boolean;
  current_recent_correction_visible: boolean;
  current_review_strip_changed_preferences_count: number;
  current_review_strip_needs_decision_count: number;
  current_continuity_notes: string[];
}

export interface SingleCellOperatorCorrectionApplyUpdatedTruth {
  correction_id: string;
  correction_target: SoloCrewCorrectionCaptureTarget;
  correction_summary: string;
  corrected_value: string;
  writeback_disposition: SoloCrewPreferenceWritebackDisposition;
  updated_memory_summary_count: number;
  updated_preference_continuity_visible: boolean;
  updated_recent_correction_visible_in_session: boolean;
  updated_review_strip_changed_preferences_count: number;
  updated_review_strip_needs_decision_count: number;
  updated_preference_summary?: string;
  updated_recent_correction_summary?: string;
  updated_anchor_present: boolean;
  updated_continuity_notes: string[];
}

export interface SingleCellOperatorCorrectionApplyUnavailableSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorCorrectionApplyScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorCorrectionApplyAuthorityBoundary;
  phase_boundary: SingleCellOperatorCorrectionApplyPhaseBoundary;
  execution_boundary: SingleCellOperatorCorrectionApplyExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_apply_status: SingleCellOperatorCorrectionApplyStatus;
  current_apply_target: SingleCellOperatorCorrectionApplyTarget;
  current_apply_input: SingleCellOperatorCorrectionApplyInput;
  current_visible_truth: SingleCellOperatorCorrectionApplyCurrentTruth;
  applied_update_result?: SingleCellOperatorCorrectionApplyUpdatedTruth;
  unavailable_apply_surfaces:
    SingleCellOperatorCorrectionApplyUnavailableSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
