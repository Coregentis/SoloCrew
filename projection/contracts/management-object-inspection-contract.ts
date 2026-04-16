import type {
  CellDetailProjection,
} from "./cell-detail-projection-contract.ts";
import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  DeliveryReturn,
  EscalationApprovalRequest,
  ManagementDirective,
} from "../objects/management-interface.ts";

export type ManagementObjectInspectionScope =
  "management_object_inspection";
export type ManagementObjectInspectionAuthorityBoundary =
  "product_projection_only";
export type ManagementObjectInspectionPhaseBoundary =
  "runtime_adjacent_detail";
export type ManagementObjectInspectionUnitKind =
  | "management_directive"
  | "delivery_return"
  | "approval_request";
export type ManagementObjectInspectionStatus =
  | "present_non_executable"
  | "absent_non_executable";
export type ManagementObjectInspectionUnitPhaseBoundary =
  | "compile_phase_only"
  | "runtime_adjacent_summary"
  | "status_only_absent";

export interface ManagementObjectInspectionUnit {
  inspection_unit_id: string;
  object_kind: ManagementObjectInspectionUnitKind;
  product_object_type:
    | "management-directive"
    | "delivery-return"
    | "escalation-approval-request";
  related_cell_id: string;
  inspection_status: ManagementObjectInspectionStatus;
  phase_boundary: ManagementObjectInspectionUnitPhaseBoundary;
  executable_actions_available: false;
  summary_label: string;
  summary_value: string;
  recency_hint: string;
  product_projection?:
    | ManagementDirective
    | DeliveryReturn
    | EscalationApprovalRequest;
  upstream_refs: ProjectionUpstreamRef[];
  projection_notes: string[];
}

export interface ManagementObjectInspectionProjection {
  management_object_inspection_id: string;
  inspection_scope: ManagementObjectInspectionScope;
  authority_boundary: ManagementObjectInspectionAuthorityBoundary;
  phase_boundary: ManagementObjectInspectionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  multi_cell_foundation_scope: "read_inspect_only";
  source_detail_projection_id: string;
  source_mode: CellDetailProjection["source_mode"];
  inspection_projection_is_runtime_law: false;
  secretary_behavior_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_management_actions_available: false;
  truth_sources: CellDetailProjection["truth_sources"];
  upstream_refs: ProjectionUpstreamRef[];
  cell_context: {
    cell_id: string;
    cell_name: string;
    scope_status: CellDetailProjection["cell_identity"]["scope_status"];
  };
  inspection_units: ManagementObjectInspectionUnit[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
