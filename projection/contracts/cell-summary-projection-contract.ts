import type { CellSummaryCard } from "../objects/management-interface.ts";
import type {
  SingleCellViewTruthSource,
} from "./single-cell-view-model-contract.ts";

export type CellSummaryProjectionAuthorityBoundary =
  "product_projection_only";
export type CellSummaryProjectionPhaseBoundary = "runtime_adjacent_summary";
export type CellSummaryProjectionScope = "cell_summary_projection";
export type CellSummaryProjectionReadiness =
  | "steady"
  | "attention_required";

export interface CellSummaryProjection {
  summary_projection_id: string;
  summary_scope: CellSummaryProjectionScope;
  authority_boundary: CellSummaryProjectionAuthorityBoundary;
  phase_boundary: CellSummaryProjectionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  multi_cell_foundation_scope: "read_inspect_only";
  summary_projection_is_runtime_law: false;
  secretary_behavior_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  truth_sources: SingleCellViewTruthSource[];
  cell_summary_card: CellSummaryCard;
  objective_status_summary: string;
  readiness_signal: CellSummaryProjectionReadiness;
  continuity_status: "bounded_and_honest";
  continuity_hint: string;
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
