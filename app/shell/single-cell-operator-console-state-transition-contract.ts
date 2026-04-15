import type {
  SingleCellCorrectionReviewTargetScope,
  SingleCellReviewIntent,
} from "./single-cell-correction-review-interaction-contract.ts";

export type SingleCellOperatorConsoleStateTransitionAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorConsoleStateTransitionPhaseBoundary =
  "operator_console_state_transition";
export type SingleCellOperatorConsoleStateTransitionExecutionBoundary =
  "state_transition_scaffold_only";
export type SingleCellOperatorConsoleTransitionKind =
  | "objective_focus_change"
  | "work_item_focus_change"
  | "correction_target_scope_change"
  | "review_intent_change";
export type SingleCellOperatorConsoleTransitionSupportLevel =
  | "bounded_reseed_now"
  | "current_truth_only";

export interface SingleCellOperatorConsoleCurrentStateSeed {
  objective_focus_id: string;
  objective_focus_label: string;
  work_item_focus_id: string;
  work_item_focus_label: string;
  correction_target_scope: SingleCellCorrectionReviewTargetScope;
  correction_target_ref_id: string;
  review_intent: SingleCellReviewIntent;
}

export interface SingleCellOperatorConsoleNextStateOverrides {
  objective_focus_id?: string;
  objective_focus_label?: string;
  work_item_focus_id?: string;
  work_item_focus_label?: string;
  correction_target_scope?: SingleCellCorrectionReviewTargetScope;
  correction_target_ref_id?: string;
  review_intent?: SingleCellReviewIntent;
}

export interface SingleCellOperatorConsoleTransitionOption {
  transition_kind: SingleCellOperatorConsoleTransitionKind;
  option_id: string;
  display_label: string;
  from_value: string;
  to_value: string;
  support_level: SingleCellOperatorConsoleTransitionSupportLevel;
  next_state_overrides: SingleCellOperatorConsoleNextStateOverrides;
  notes: string[];
}

export interface SingleCellOperatorConsoleNextStateSeedPreview
  extends SingleCellOperatorConsoleCurrentStateSeed {
  preview_id: string;
  transition_kind: SingleCellOperatorConsoleTransitionKind;
  option_id: string;
  support_level: SingleCellOperatorConsoleTransitionSupportLevel;
  preview_notes: string[];
}

export interface SingleCellOperatorConsoleStateTransitionScaffold {
  transition_scaffold_id: string;
  transition_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorConsoleStateTransitionAuthorityBoundary;
  phase_boundary: SingleCellOperatorConsoleStateTransitionPhaseBoundary;
  execution_boundary: SingleCellOperatorConsoleStateTransitionExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  current_state_seed: SingleCellOperatorConsoleCurrentStateSeed;
  transition_options: SingleCellOperatorConsoleTransitionOption[];
  suggested_next_state_previews:
    SingleCellOperatorConsoleNextStateSeedPreview[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
