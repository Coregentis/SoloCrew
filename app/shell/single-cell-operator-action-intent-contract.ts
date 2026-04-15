import type {
  SingleCellContinuityReloadMode,
} from "./single-cell-continuity-reload-presentation-contract.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellOperatorActionIntentAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorActionIntentPhaseBoundary =
  "operator_action_intent_scaffold";
export type SingleCellOperatorActionIntentExecutionBoundary =
  "interaction_scaffold_only";
export type SingleCellOperatorActionIntentKind =
  | "refine_objective"
  | "reprioritize_work_item"
  | "shift_task_focus"
  | "request_review"
  | "apply_correction"
  | "resume_or_defer_hint";
export type SingleCellOperatorActionIntentSupportLevel =
  | "scaffold_ready_now"
  | "bounded_mapping_only"
  | "current_truth_only";
export type SingleCellOperatorActionIntentSurface =
  | "objective_overview"
  | "work_item_execution_overview"
  | "task_focus"
  | "correction_review"
  | "continuity_reload"
  | "truth_boundary";

export interface SingleCellOperatorActionIntentCurrentContext {
  objective_focus_id: string;
  objective_focus_label: string;
  work_item_focus_id: string;
  work_item_focus_label: string;
  continuity_mode: SingleCellContinuityReloadMode;
  blocked_work_count: number;
}

export interface SingleCellOperatorActionIntentSeed {
  intent_id: string;
  intent_kind: SingleCellOperatorActionIntentKind;
  display_label: string;
  support_level: SingleCellOperatorActionIntentSupportLevel;
  suggested_surface: SingleCellOperatorActionIntentSurface;
  target_ref_id: string;
  target_label: string;
  notes: string[];
}

export interface SingleCellOperatorActionIntentConstraintHint {
  constraint_id: string;
  display_label: string;
  source_surface: SingleCellOperatorActionIntentSurface;
  notes: string[];
}

export interface SingleCellOperatorActionIntentUnavailableSurface {
  surface_id: string;
  display_label: string;
  reason: string;
}

export interface SingleCellOperatorActionIntentScaffold {
  scaffold_id: string;
  scaffold_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorActionIntentAuthorityBoundary;
  phase_boundary: SingleCellOperatorActionIntentPhaseBoundary;
  execution_boundary: SingleCellOperatorActionIntentExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_action_context: SingleCellOperatorActionIntentCurrentContext;
  available_action_intent_seeds: SingleCellOperatorActionIntentSeed[];
  current_constraint_hints: SingleCellOperatorActionIntentConstraintHint[];
  unavailable_action_surfaces: SingleCellOperatorActionIntentUnavailableSurface[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
