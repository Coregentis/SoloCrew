import type {
  CellSummaryProjection,
  CellSummaryProjectionSourceMode,
  CellSummaryProjectionTruthSource,
} from "./cell-summary-projection-contract.ts";
import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  ManagementApprovalPosture,
  ManagementPriority,
  DeliveryReturn,
  EscalationApprovalRequest,
} from "../objects/management-interface.ts";

export type CellDetailProjectionAuthorityBoundary =
  "product_projection_only";
export type CellDetailProjectionPhaseBoundary = "runtime_adjacent_detail";
export type CellDetailProjectionScope = "cell_detail_projection";
export type CellDetailManagementObjectStatus =
  | "present_non_executable"
  | "absent_non_executable";

export interface RuntimeBackedManagementDirectiveProjection {
  projection_id: string;
  projection_object_type: "runtime-backed-management-directive-projection";
  authority_boundary: "product_projection_only";
  phase_boundary: "runtime_adjacent_detail";
  upstream_origin: "runtime_private_record_projection";
  upstream_record_type: "management-directive-record";
  upstream_record_id: string;
  executable_actions_available: false;
  cell_id: string;
  priority: ManagementPriority;
  delivery_target: string;
  approval_posture: ManagementApprovalPosture;
  constraint_emphasis: string[];
  projection_notes: string[];
}

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
    management_directive?: RuntimeBackedManagementDirectiveProjection;
    delivery_return?: DeliveryReturn;
    approval_request?: EscalationApprovalRequest;
  };
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
