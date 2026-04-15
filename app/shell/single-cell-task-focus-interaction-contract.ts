import type { WorkItem } from "../../projection/objects/work-item.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";

export type SingleCellTaskFocusInteractionAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellTaskFocusInteractionPhaseBoundary =
  "task_focus_interaction_scaffold";
export type SingleCellTaskFocusInteractionExecutionBoundary =
  "interaction_scaffold_only";
export type SingleCellTaskFocusTargetKind = "objective" | "work-item";
export type SingleCellTaskFocusSupportLevel =
  | "bounded_reseed_now"
  | "current_truth_only";

export interface SingleCellTaskFocusCurrentObjectiveFocus {
  objective_id: string;
  objective_label: string;
}

export interface SingleCellTaskFocusCurrentWorkItemFocus {
  work_item_id: string;
  work_item_label: string;
  work_item_status: WorkItem["status"];
}

export interface SingleCellTaskFocusAvailableTarget {
  target_kind: SingleCellTaskFocusTargetKind;
  target_id: string;
  display_label: string;
  support_level: SingleCellTaskFocusSupportLevel;
  is_current: boolean;
  status_label?: WorkItem["status"];
  notes: string[];
}

export interface SingleCellTaskFocusSwitchIntentSeed {
  intent_id: string;
  target_kind: SingleCellTaskFocusTargetKind;
  target_id: string;
  display_label: string;
  support_level: SingleCellTaskFocusSupportLevel;
  next_focus_preview_id: string;
  notes: string[];
}

export interface SingleCellTaskFocusNextPreviewSeed {
  preview_id: string;
  target_kind: SingleCellTaskFocusTargetKind;
  objective_focus_id: string;
  objective_focus_label: string;
  work_item_focus_id: string;
  work_item_focus_label: string;
  notes: string[];
}

export interface SingleCellTaskFocusInteraction {
  interaction_id: string;
  interaction_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellTaskFocusInteractionAuthorityBoundary;
  phase_boundary: SingleCellTaskFocusInteractionPhaseBoundary;
  execution_boundary: SingleCellTaskFocusInteractionExecutionBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  current_objective_focus: SingleCellTaskFocusCurrentObjectiveFocus;
  current_work_item_focus: SingleCellTaskFocusCurrentWorkItemFocus;
  available_focus_targets: SingleCellTaskFocusAvailableTarget[];
  focus_switch_intent_seeds: SingleCellTaskFocusSwitchIntentSeed[];
  next_focus_preview_seeds: SingleCellTaskFocusNextPreviewSeed[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
