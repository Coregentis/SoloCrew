import type {
  DeliveryReturn,
  EscalationApprovalRequest,
  ManagementApprovalPosture,
  ManagementPriority,
} from "../objects/management-interface.ts";

export const RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE =
  "runtime-backed-management-directive-projection" as const;

export const RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE =
  "management-directive-record" as const;

export const RUNTIME_BACKED_MANAGEMENT_PROJECTION_OBJECT_TYPES = [
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
  "delivery-return",
  "escalation-approval-request",
] as const;

export type RuntimeBackedManagementProjectionObjectType =
  (typeof RUNTIME_BACKED_MANAGEMENT_PROJECTION_OBJECT_TYPES)[number];

export type RuntimeBackedManagementProjectionPhaseBoundary =
  | "runtime_adjacent_detail"
  | "runtime_adjacent_summary";

export interface RuntimeBackedManagementDirectiveProjection {
  projection_id: string;
  projection_object_type:
    typeof RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE;
  authority_boundary: "product_projection_only";
  phase_boundary: "runtime_adjacent_detail";
  upstream_origin: "runtime_private_record_projection";
  upstream_record_type:
    typeof RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE;
  upstream_record_id: string;
  executable_actions_available: false;
  cell_id: string;
  priority: ManagementPriority;
  delivery_target: string;
  approval_posture: ManagementApprovalPosture;
  constraint_emphasis: string[];
  projection_notes: string[];
}

export type RuntimeBackedManagementProjection =
  | RuntimeBackedManagementDirectiveProjection
  | DeliveryReturn
  | EscalationApprovalRequest;
