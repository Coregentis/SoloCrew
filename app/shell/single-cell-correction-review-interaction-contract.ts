import type {
  SoloCrewCorrectionCaptureTarget,
} from "./runtime-session-facade.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellCorrectionReviewInteractionAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellCorrectionReviewInteractionPhaseBoundary =
  "correction_review_scaffold";
export type SingleCellCorrectionReviewExecutionBoundary =
  "interaction_scaffold_only";
export type SingleCellCorrectionReviewTargetScope =
  | "objective"
  | "work-item"
  | "crew"
  | "continuity-note";
export type SingleCellCorrectionReviewSupportLevel =
  | "bounded_now"
  | "bounded_mapping_only";
export type SingleCellReviewIntent =
  | "tighten_scope"
  | "flag_blocker"
  | "clarify_preference"
  | "request_recheck";

export interface SingleCellCorrectionInputSeed {
  supported_capture_source: "user";
  summary_placeholder: string;
  corrected_value_placeholder: string;
  suggested_target_scope: SingleCellCorrectionReviewTargetScope;
  suggested_runtime_target: SoloCrewCorrectionCaptureTarget;
  suggested_target_ref_id: string;
  preference_profile_id: string;
}

export interface SingleCellReviewIntentSeed {
  review_posture: string;
  supported_review_intents: SingleCellReviewIntent[];
  default_review_intent: SingleCellReviewIntent;
  notes: string[];
}

export interface SingleCellCorrectionReviewTargetScopeHint {
  target_scope: SingleCellCorrectionReviewTargetScope;
  display_label: string;
  target_ref_id: string;
  support_level: SingleCellCorrectionReviewSupportLevel;
  runtime_mapping_target: SoloCrewCorrectionCaptureTarget;
  notes: string[];
}

export interface SingleCellCorrectionReviewExpectedOutcomeHints {
  supported_writeback_hints: string[];
  deferred_outcome_hints: string[];
}

export interface SingleCellCorrectionReviewInteraction {
  interaction_id: string;
  interaction_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellCorrectionReviewInteractionAuthorityBoundary;
  phase_boundary: SingleCellCorrectionReviewInteractionPhaseBoundary;
  execution_boundary: SingleCellCorrectionReviewExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  correction_input_seed: SingleCellCorrectionInputSeed;
  review_intent_seed: SingleCellReviewIntentSeed;
  target_scope_hints: SingleCellCorrectionReviewTargetScopeHint[];
  expected_outcome_hints: SingleCellCorrectionReviewExpectedOutcomeHints;
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
