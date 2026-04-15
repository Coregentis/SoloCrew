import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellContinuityReloadPresentationAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellContinuityReloadPresentationPhaseBoundary =
  "continuity_reload_presentation";
export type SingleCellContinuityReloadPresentationExecutionBoundary =
  "presentation_scaffold_only";
export type SingleCellContinuityReloadPresentationState =
  | "first_load"
  | "same_session_continued"
  | "fresh_reload_resumed";
export type SingleCellContinuityReloadMode =
  | "memory_first_load"
  | "sqlite_first_load"
  | "same_session_continued"
  | "fresh_reload_resumed";

export interface SingleCellContinuityReference {
  project_id: string;
  crew_id: string;
  objective_id: string;
  work_item_ids: string[];
}

export interface SingleCellPersistedIdentityContinuity {
  previous_reference_available: boolean;
  current_project_id: string;
  current_crew_id: string;
  current_objective_id: string;
  project_id_stable: boolean;
  crew_id_stable: boolean;
  objective_id_stable: boolean;
  notes: string[];
}

export interface SingleCellPersistedWorkObjectiveContinuity {
  previous_reference_available: boolean;
  current_objective_id: string;
  current_work_item_ids: string[];
  objective_id_stable: boolean;
  work_item_identity_stable: boolean;
  memory_summary_count: number;
  preference_continuity_visible: boolean;
  objective_anchor_compare_available: boolean;
  objective_anchor_present: boolean;
  notes: string[];
}

export interface SingleCellSessionReloadDistinction {
  is_first_load: boolean;
  is_same_session_continued: boolean;
  is_fresh_reload_resumed: boolean;
  runtime_mode: RuntimeSessionMode;
  same_session_runtime_context: boolean;
  fresh_runtime_context: boolean;
  notes: string[];
}

export interface SingleCellContinuityReloadPresentation {
  presentation_id: string;
  presentation_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellContinuityReloadPresentationAuthorityBoundary;
  phase_boundary: SingleCellContinuityReloadPresentationPhaseBoundary;
  execution_boundary: SingleCellContinuityReloadPresentationExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  bootstrap_mode: SingleCellContinuityReloadPresentationState;
  continuity_mode: SingleCellContinuityReloadMode;
  persisted_identity_continuity: SingleCellPersistedIdentityContinuity;
  persisted_work_objective_continuity:
    SingleCellPersistedWorkObjectiveContinuity;
  session_reload_distinction: SingleCellSessionReloadDistinction;
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
