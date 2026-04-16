import {
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE,
  type RuntimeBackedManagementDirectiveProjection,
} from "../contracts/runtime-backed-management-projection-contract.ts";

const DEFAULT_RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_NOTES = [
  "Runtime-backed management directive detail is a downstream inspection projection over a runtime-private record.",
  "This projection does not reuse compile-phase directive identity.",
  "No executable directive submission path is exposed here.",
] as const;

export interface CreateRuntimeBackedManagementDirectiveProjectionInput {
  projection_id: string;
  cell_id: string;
  upstream_record_id: string;
  priority: RuntimeBackedManagementDirectiveProjection["priority"];
  delivery_target: RuntimeBackedManagementDirectiveProjection["delivery_target"];
  approval_posture:
    RuntimeBackedManagementDirectiveProjection["approval_posture"];
  constraint_emphasis?: string[];
  projection_notes?: string[];
}

export function createRuntimeBackedManagementDirectiveProjection(
  input: CreateRuntimeBackedManagementDirectiveProjectionInput
): RuntimeBackedManagementDirectiveProjection {
  return {
    projection_id: input.projection_id,
    projection_object_type:
      RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_detail",
    upstream_origin: "runtime_private_record_projection",
    upstream_record_type: RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE,
    upstream_record_id: input.upstream_record_id,
    executable_actions_available: false,
    cell_id: input.cell_id,
    priority: input.priority,
    delivery_target: input.delivery_target,
    approval_posture: input.approval_posture,
    constraint_emphasis: [...(input.constraint_emphasis ?? [])],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : [...DEFAULT_RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_NOTES],
  };
}
