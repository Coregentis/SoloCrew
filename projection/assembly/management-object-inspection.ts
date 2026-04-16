import type {
  CellDetailProjection,
} from "../contracts/cell-detail-projection-contract.ts";
import type {
  ManagementObjectInspectionProjection,
  ManagementObjectInspectionStatus,
  ManagementObjectInspectionUnit,
  ManagementObjectInspectionUnitKind,
  ManagementObjectInspectionUnitPhaseBoundary,
} from "../contracts/management-object-inspection-contract.ts";
import type {
  ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

const MANAGEMENT_OBJECT_INSPECTION_NON_CLAIMS = [
  "no_secretary_behavior_truth",
  "no_portfolio_dispatch_truth",
  "no_provider_execution_truth",
  "no_channel_entry_truth",
  "no_runtime_complete_orchestration",
  "no_shared_object_identity_with_runtime_private_record",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function filter_upstream_refs(
  refs: readonly ProjectionUpstreamRef[],
  upstream_object_type: string
): ProjectionUpstreamRef[] {
  return refs.filter((ref) => ref.upstream_object_type === upstream_object_type);
}

function derive_absent_unit(
  detail_projection: CellDetailProjection,
  input: {
    object_kind: ManagementObjectInspectionUnitKind;
    product_object_type: ManagementObjectInspectionUnit["product_object_type"];
    summary_label: string;
    absent_note: string;
  }
): ManagementObjectInspectionUnit {
  return {
    inspection_unit_id:
      `${detail_projection.cell_identity.cell_id}:${input.object_kind}:inspection-unit`,
    object_kind: input.object_kind,
    product_object_type: input.product_object_type,
    related_cell_id: detail_projection.cell_identity.cell_id,
    inspection_status: "absent_non_executable",
    phase_boundary: "status_only_absent",
    executable_actions_available: false,
    summary_label: input.summary_label,
    summary_value: "No bounded product projection is currently available.",
    recency_hint: input.absent_note,
    upstream_refs: [],
    projection_notes: [
      "Inspection unit remains downstream product projection only.",
      "Absence here does not imply upstream runtime ownership by SoloCrew.",
    ],
  };
}

function derive_status(
  object_present: boolean
): ManagementObjectInspectionStatus {
  return object_present ? "present_non_executable" : "absent_non_executable";
}

function derive_phase_boundary(
  object_present: boolean,
  present_phase_boundary: "compile_phase_only" | "runtime_adjacent_summary"
): ManagementObjectInspectionUnitPhaseBoundary {
  return object_present ? present_phase_boundary : "status_only_absent";
}

export function assembleManagementObjectInspectionProjection(
  detail_projection: CellDetailProjection
): ManagementObjectInspectionProjection {
  const management_directive =
    detail_projection.management_object_family.management_directive;
  const delivery_return =
    detail_projection.management_object_family.delivery_return;
  const approval_request =
    detail_projection.management_object_family.approval_request;

  const inspection_units: ManagementObjectInspectionUnit[] = [
    management_directive
      ? {
          inspection_unit_id:
            `${detail_projection.cell_identity.cell_id}:management_directive:inspection-unit`,
          object_kind: "management_directive",
          product_object_type: "management-directive",
          related_cell_id: detail_projection.cell_identity.cell_id,
          inspection_status: derive_status(true),
          phase_boundary: derive_phase_boundary(
            true,
            management_directive.phase_boundary
          ),
          executable_actions_available: false,
          summary_label: "Directive summary",
          summary_value: management_directive.delivery_target,
          recency_hint:
            `Directive priority is ${management_directive.priority} with ${management_directive.approval_posture} posture.`,
          product_projection: management_directive,
          upstream_refs: filter_upstream_refs(
            detail_projection.upstream_refs,
            "management-directive-record"
          ),
          projection_notes: [
            "Management directive inspection remains read-only and non-executable.",
            "This unit is derived from a downstream product projection, not shared runtime law.",
          ],
        }
      : derive_absent_unit(detail_projection, {
          object_kind: "management_directive",
          product_object_type: "management-directive",
          summary_label: "Directive summary",
          absent_note:
            "No upstream management-directive-record is currently projected into this detail surface.",
        }),
    delivery_return
      ? {
          inspection_unit_id:
            `${detail_projection.cell_identity.cell_id}:delivery_return:inspection-unit`,
          object_kind: "delivery_return",
          product_object_type: "delivery-return",
          related_cell_id: detail_projection.cell_identity.cell_id,
          inspection_status: derive_status(true),
          phase_boundary: derive_phase_boundary(
            true,
            delivery_return.phase_boundary
          ),
          executable_actions_available: false,
          summary_label: "Delivery return",
          summary_value: delivery_return.completed_summary,
          recency_hint:
            `Delivery return posture is ${delivery_return.delivery_status}; next directive needed: ${delivery_return.next_directive_needed}.`,
          product_projection: delivery_return,
          upstream_refs: filter_upstream_refs(
            detail_projection.upstream_refs,
            "delivery-return-record"
          ),
          projection_notes: [
            "Delivery return inspection remains read-only and non-executable.",
            "This unit packages downstream product inspection context only.",
          ],
        }
      : derive_absent_unit(detail_projection, {
          object_kind: "delivery_return",
          product_object_type: "delivery-return",
          summary_label: "Delivery return",
          absent_note:
            "No upstream delivery-return-record is currently projected into this detail surface.",
        }),
    approval_request
      ? {
          inspection_unit_id:
            `${detail_projection.cell_identity.cell_id}:approval_request:inspection-unit`,
          object_kind: "approval_request",
          product_object_type: "escalation-approval-request",
          related_cell_id: detail_projection.cell_identity.cell_id,
          inspection_status: derive_status(true),
          phase_boundary: derive_phase_boundary(
            true,
            approval_request.phase_boundary
          ),
          executable_actions_available: false,
          summary_label: "Approval request",
          summary_value: approval_request.requested_decision,
          recency_hint:
            `Approval request posture is ${approval_request.request_kind} with ${approval_request.urgency} urgency.`,
          product_projection: approval_request,
          upstream_refs: filter_upstream_refs(
            detail_projection.upstream_refs,
            "approval-request-record"
          ),
          projection_notes: [
            "Approval request inspection remains read-only and non-executable.",
            "This unit exposes bounded context rather than any approval workflow control.",
          ],
        }
      : derive_absent_unit(detail_projection, {
          object_kind: "approval_request",
          product_object_type: "escalation-approval-request",
          summary_label: "Approval request",
          absent_note:
            "No upstream approval-request-record is currently projected into this detail surface.",
        }),
  ];

  return {
    management_object_inspection_id:
      `${detail_projection.cell_identity.cell_id}-management-object-inspection`,
    inspection_scope: "management_object_inspection",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_detail",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    multi_cell_foundation_scope: "read_inspect_only",
    source_detail_projection_id: detail_projection.detail_projection_id,
    source_mode: detail_projection.source_mode,
    inspection_projection_is_runtime_law: false,
    secretary_behavior_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_management_actions_available: false,
    truth_sources: [...detail_projection.truth_sources],
    upstream_refs: [...detail_projection.upstream_refs],
    cell_context: {
      cell_id: detail_projection.cell_identity.cell_id,
      cell_name: detail_projection.cell_identity.cell_name,
      scope_status: detail_projection.cell_identity.scope_status,
    },
    inspection_units,
    deferred_items: unique_items([
      ...detail_projection.deferred_items,
      "approval_workflow_execution",
      "directive_submission",
      "delivery_return_mutation",
    ]),
    non_claims: unique_items([
      ...detail_projection.non_claims,
      ...MANAGEMENT_OBJECT_INSPECTION_NON_CLAIMS,
    ]),
    projection_notes: [
      "Management-object inspection is a dedicated downstream product projection over the existing cell-detail projection path.",
      "Inspection units remain read-only, non-executable, and explicitly below Secretary beta.",
    ],
  };
}
