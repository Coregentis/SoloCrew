import type {
  CellSummaryProjection,
  CellSummaryProjectionSourceMode,
  CellSummaryProjectionTruthSource,
} from "./cell-summary-projection-contract.ts";
import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  DeliveryReturn,
  EscalationApprovalRequest,
  ManagementDirective,
} from "../objects/management-interface.ts";

export type CellDetailProjectionAuthorityBoundary =
  "product_projection_only";
export type CellDetailProjectionPhaseBoundary = "runtime_adjacent_detail";
export type CellDetailProjectionScope = "cell_detail_projection";
export type CellDetailManagementObjectStatus =
  | "present_non_executable"
  | "absent_non_executable";

export interface CellDetailProjection {
  detail_projection_id: string;
  detail_scope: CellDetailProjectionScope;
  authority_boundary: CellDetailProjectionAuthorityBoundary;
  phase_boundary: CellDetailProjectionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  multi_cell_foundation_scope: "read_inspect_only";
  source_mode: CellSummaryProjectionSourceMode;
  detail_projection_is_runtime_law: false;
  secretary_behavior_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_management_actions_available: false;
  truth_sources: CellSummaryProjectionTruthSource[];
  upstream_refs: ProjectionUpstreamRef[];
  summary_projection: CellSummaryProjection;
  cell_identity: {
    cell_id: string;
    cell_name: string;
    scope_status: "forming" | "active" | "paused" | "archived";
    scope_mode:
      | "single_operator_bounded"
      | "multi_scope_bounded"
      | "unspecified_bounded_scope";
    scope_summary: string;
  };
  objective_and_work_status: {
    current_objective_headline: string;
    active_work_item_count: number;
    blocked_work_item_count: number;
    readiness_signal: CellSummaryProjection["readiness_signal"];
    blocked_signal: "blocked_attention_visible" | "no_blocked_attention";
  };
  continuity_and_recency: {
    continuity_status: "bounded_and_honest";
    continuity_hint: string;
    recency_hint: string;
  };
  management_object_family: {
    management_directive_status: CellDetailManagementObjectStatus;
    delivery_return_status: CellDetailManagementObjectStatus;
    approval_request_status: CellDetailManagementObjectStatus;
    management_directive?: ManagementDirective;
    delivery_return?: DeliveryReturn;
    approval_request?: EscalationApprovalRequest;
  };
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
