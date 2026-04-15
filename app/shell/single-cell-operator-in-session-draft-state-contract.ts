import type {
  SingleCellOperatorActionIntentKind,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellOperatorRequestPreviewabilityStatus,
  SingleCellOperatorRequestReviewabilityStatus,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellOperatorInSessionDraftStateAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorInSessionDraftStatePhaseBoundary =
  "operator_in_session_draft_state_scaffold";
export type SingleCellOperatorInSessionDraftStateExecutionBoundary =
  "session_state_only";
export type SingleCellOperatorInSessionDraftValuePresence =
  | "empty_in_session"
  | "present_in_session";
export type SingleCellOperatorInSessionDraftValueSource =
  | "slot_initial_text"
  | "bootstrap_session_override"
  | "request_package_derived_default"
  | "empty_session_state";
export type SingleCellOperatorInSessionDraftEmptinessState =
  | "all_empty"
  | "all_empty_except_derived_selection"
  | "some_operator_input_present";
export type SingleCellOperatorInSessionDraftCompletenessStatus =
  | "session_drafts_incomplete"
  | "session_drafts_have_operator_input";

export interface SingleCellOperatorInSessionDraftStateSeedValues {
  objective_note_draft_value?: string;
  work_item_note_draft_value?: string;
  correction_text_draft_value?: string;
  review_request_draft_value?: string;
  selected_action_intent_draft_value?: SingleCellOperatorActionIntentKind;
}

export interface SingleCellOperatorInSessionTextDraftValue {
  current_value: string;
  value_presence: SingleCellOperatorInSessionDraftValuePresence;
  value_source: SingleCellOperatorInSessionDraftValueSource;
  is_operator_authored: boolean;
  notes: string[];
}

export interface SingleCellOperatorInSessionActionIntentDraftValue {
  current_value?: SingleCellOperatorActionIntentKind;
  display_label?: string;
  value_presence: SingleCellOperatorInSessionDraftValuePresence;
  value_source: SingleCellOperatorInSessionDraftValueSource;
  is_operator_authored: boolean;
  notes: string[];
}

export interface SingleCellOperatorInSessionDraftValues {
  objective_note_draft_value: SingleCellOperatorInSessionTextDraftValue;
  work_item_note_draft_value: SingleCellOperatorInSessionTextDraftValue;
  correction_text_draft_value: SingleCellOperatorInSessionTextDraftValue;
  review_request_draft_value: SingleCellOperatorInSessionTextDraftValue;
  selected_action_intent_draft_value:
    SingleCellOperatorInSessionActionIntentDraftValue;
}

export interface SingleCellOperatorInSessionDraftCompletenessState {
  draft_emptiness_state: SingleCellOperatorInSessionDraftEmptinessState;
  draft_completeness_status:
    SingleCellOperatorInSessionDraftCompletenessStatus;
  present_draft_value_count: number;
  empty_draft_value_count: number;
  request_reviewability_status:
    SingleCellOperatorRequestReviewabilityStatus;
  request_previewability_status:
    SingleCellOperatorRequestPreviewabilityStatus;
  future_submit_dependency_count: number;
  future_submit_dependencies: string[];
  notes: string[];
}

export interface SingleCellOperatorInSessionDraftUnavailableSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorInSessionDraftStateScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorInSessionDraftStateAuthorityBoundary;
  phase_boundary: SingleCellOperatorInSessionDraftStatePhaseBoundary;
  execution_boundary: SingleCellOperatorInSessionDraftStateExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_session_draft_values: SingleCellOperatorInSessionDraftValues;
  draft_completeness_state: SingleCellOperatorInSessionDraftCompletenessState;
  unavailable_draft_surfaces:
    SingleCellOperatorInSessionDraftUnavailableSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
