import type {
  CellDetailProjection,
} from "./cell-detail-projection-contract.ts";
import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";

export type ContinuityInspectionScope = "continuity_inspection";
export type ContinuityInspectionAuthorityBoundary =
  "product_projection_only";
export type ContinuityInspectionPhaseBoundary =
  "runtime_adjacent_detail";
export type ContinuityInspectionState =
  | "steady_visible"
  | "attention_visible"
  | "blocked_visible"
  | "bounded_scope_only";
export type ContinuityInspectionVisibility =
  | "runtime_backed_visible"
  | "bounded_scope_visible";

export interface ContinuityInspectionProjection {
  continuity_inspection_id: string;
  inspection_scope: ContinuityInspectionScope;
  authority_boundary: ContinuityInspectionAuthorityBoundary;
  phase_boundary: ContinuityInspectionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  multi_cell_foundation_scope: "read_inspect_only";
  source_detail_projection_id: string;
  source_mode: CellDetailProjection["source_mode"];
  continuity_projection_is_runtime_law: false;
  secretary_behavior_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_continuity_actions_available: false;
  truth_sources: CellDetailProjection["truth_sources"];
  upstream_refs: ProjectionUpstreamRef[];
  cell_context: {
    cell_id: string;
    cell_name: string;
    scope_status: CellDetailProjection["cell_identity"]["scope_status"];
  };
  continuity_snapshot: {
    continuity_status: CellDetailProjection["continuity_and_recency"]["continuity_status"];
    continuity_hint: string;
    recency_hint: string;
    readiness_signal: CellDetailProjection["objective_and_work_status"]["readiness_signal"];
    blocked_signal: CellDetailProjection["objective_and_work_status"]["blocked_signal"];
    active_work_item_count: number;
    blocked_work_item_count: number;
    continuity_state: ContinuityInspectionState;
    continuity_visibility: ContinuityInspectionVisibility;
  };
  bounded_knowledge: {
    known_inputs: string[];
    unknown_inputs: string[];
  };
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
