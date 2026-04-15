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

export type SingleCellOperatorInputDraftAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorInputDraftPhaseBoundary =
  "operator_input_draft_scaffold";
export type SingleCellOperatorInputDraftExecutionBoundary =
  "draft_scaffold_only";
export type SingleCellOperatorInputDraftKind =
  | "objective_note_draft"
  | "work_item_note_draft"
  | "correction_text_draft"
  | "review_request_draft"
  | "selected_action_intent_draft";
export type SingleCellOperatorInputDraftMode =
  | "text_entry"
  | "selection";
export type SingleCellOperatorInputDraftSupportLevel =
  | "draftable_now"
  | "bounded_selection_only";
export type SingleCellOperatorInputDraftSurface =
  | "objective_overview"
  | "task_focus"
  | "correction_review"
  | "action_intents"
  | "delivery_acceptance"
  | "truth_boundary";

export interface SingleCellOperatorInputDraftContext {
  objective_focus_id: string;
  objective_focus_label: string;
  work_item_focus_id: string;
  work_item_focus_label: string;
  correction_target_scope: SingleCellCorrectionReviewTargetScope;
  review_intent: SingleCellReviewIntent;
  acceptance_status: SingleCellDeliveryAcceptanceStatus;
}

export interface SingleCellOperatorInputDraftSlot {
  draft_slot_id: string;
  draft_kind: SingleCellOperatorInputDraftKind;
  display_label: string;
  draft_mode: SingleCellOperatorInputDraftMode;
  support_level: SingleCellOperatorInputDraftSupportLevel;
  target_ref_id: string;
  target_label: string;
  target_surface: SingleCellOperatorInputDraftSurface;
  placeholder_text: string;
  initial_text: string;
  notes: string[];
}

export interface SingleCellOperatorInputDraftActionIntentOption {
  option_id: string;
  intent_kind: SingleCellOperatorActionIntentKind;
  display_label: string;
  support_level: SingleCellOperatorActionIntentSupportLevel;
  target_ref_id: string;
  target_label: string;
  notes: string[];
}

export interface SingleCellOperatorInputDraftUnavailableSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorInputDraftScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorInputDraftAuthorityBoundary;
  phase_boundary: SingleCellOperatorInputDraftPhaseBoundary;
  execution_boundary: SingleCellOperatorInputDraftExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_draft_context: SingleCellOperatorInputDraftContext;
  draftable_input_slots: SingleCellOperatorInputDraftSlot[];
  action_intent_draft_options: SingleCellOperatorInputDraftActionIntentOption[];
  unavailable_input_surfaces: SingleCellOperatorInputDraftUnavailableSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
