import {
  adaptRuntimePrivateCellSummaryToProjection,
  type RuntimePrivateCellSummaryAdapterInput,
} from "../adapters/cell-summary-runtime-adapter.ts";
import {
  createDeliveryReturn,
  createEscalationApprovalRequest,
  type DeliveryReturnStatus,
} from "../objects/management-interface.ts";
import {
  createRuntimeBackedManagementDirectiveProjection,
} from "../objects/runtime-backed-management-projection.ts";
import type {
  CellDetailProjection,
  CellDetailManagementObjectStatus,
} from "../contracts/cell-detail-projection-contract.ts";

const CELL_DETAIL_NON_CLAIMS = [
  "no_secretary_behavior_truth",
  "no_portfolio_dispatch_truth",
  "no_provider_execution_truth",
  "no_channel_entry_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_orchestration",
  "no_shared_object_identity_with_runtime_private_record",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function map_delivery_return_status(
  status: RuntimePrivateCellSummaryAdapterInput["delivery_return_record"] extends infer T
    ? T extends { status: infer TStatus }
      ? TStatus
      : never
    : never
): DeliveryReturnStatus {
  switch (status) {
    case "in_progress":
    case "ready_for_review":
    case "blocked":
    case "returned":
      return status;
    case "archived":
      return "returned";
    default:
      return "in_progress";
  }
}

function derive_management_status(
  present: boolean
): CellDetailManagementObjectStatus {
  return present ? "present_non_executable" : "absent_non_executable";
}

function derive_recency_hint(
  input: RuntimePrivateCellSummaryAdapterInput
): string {
  if (input.cell_summary_runtime_record) {
    return `Runtime summary record status: ${input.cell_summary_runtime_record.status}.`;
  }

  return `Runtime summary record is absent; detail inspection falls back to bounded scope truth only.`;
}

export function assembleCellDetailProjectionFromRuntimeInput(
  input: RuntimePrivateCellSummaryAdapterInput
): CellDetailProjection {
  const summary_projection = adaptRuntimePrivateCellSummaryToProjection(input);
  const management_directive = input.management_directive_record
    ? createRuntimeBackedManagementDirectiveProjection({
        projection_id:
          `${input.cell_runtime_scope.object_id}:detail-management-directive`,
        cell_id: input.cell_runtime_scope.object_id,
        upstream_record_id: input.management_directive_record.object_id,
        priority: input.management_directive_record.directive_priority,
        delivery_target: input.management_directive_record.directive_summary,
        approval_posture: input.management_directive_record.approval_posture,
        constraint_emphasis: input.management_directive_record.constraint_tags,
      })
    : undefined;
  const delivery_return = input.delivery_return_record
    ? createDeliveryReturn({
        projection_id: `${input.cell_runtime_scope.object_id}:detail-delivery-return`,
        delivery_return_id: input.delivery_return_record.object_id,
        cell_id: input.cell_runtime_scope.object_id,
        delivery_status: map_delivery_return_status(
          input.delivery_return_record.status
        ),
        completed_summary: input.delivery_return_record.completed_summary,
        blocked_summary: input.delivery_return_record.blocked_summary,
        next_directive_needed: input.delivery_return_record.next_directive_needed,
        requested_follow_up: input.delivery_return_record.requested_follow_up,
        projection_notes: [
          "Delivery return detail is inspection-only downstream projection over a runtime-private record.",
          "No mutation or workflow-return action is exposed here.",
        ],
      })
    : undefined;
  const approval_request = input.approval_request_record
    ? createEscalationApprovalRequest({
        projection_id: `${input.cell_runtime_scope.object_id}:detail-approval-request`,
        escalation_approval_request_id: input.approval_request_record.object_id,
        cell_id: input.cell_runtime_scope.object_id,
        request_kind: input.approval_request_record.request_kind,
        reason: input.approval_request_record.request_summary,
        affected_objective_id: input.approval_request_record.target_objective_id,
        requested_decision: input.approval_request_record.requested_decision,
        urgency: input.approval_request_record.urgency,
        projection_notes: [
          "Approval request detail is inspection-only downstream projection over a runtime-private record.",
          "No approval action button or escalation workflow is exposed here.",
        ],
      })
    : undefined;

  return {
    detail_projection_id:
      `${input.cell_runtime_scope.object_id}-cell-detail-projection`,
    detail_scope: "cell_detail_projection",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_detail",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    multi_cell_foundation_scope: "read_inspect_only",
    source_mode: summary_projection.source_mode,
    detail_projection_is_runtime_law: false,
    secretary_behavior_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_management_actions_available: false,
    truth_sources: [...summary_projection.truth_sources],
    upstream_refs: [...summary_projection.upstream_refs],
    summary_projection,
    cell_identity: {
      cell_id: input.cell_runtime_scope.object_id,
      cell_name: input.cell_runtime_scope.scope_name,
      scope_status: input.cell_runtime_scope.status,
      scope_mode:
        input.cell_runtime_scope.scope_mode ?? "unspecified_bounded_scope",
      scope_summary:
        input.cell_runtime_scope.scope_summary ??
        "No additional runtime scope summary is currently projected.",
    },
    objective_and_work_status: {
      current_objective_headline:
        summary_projection.cell_summary_card.current_objective_headline,
      active_work_item_count:
        summary_projection.cell_summary_card.active_work_count,
      blocked_work_item_count:
        summary_projection.cell_summary_card.blocked_work_count,
      readiness_signal: summary_projection.readiness_signal,
      blocked_signal:
        summary_projection.cell_summary_card.blocked_work_count > 0
          ? "blocked_attention_visible"
          : "no_blocked_attention",
    },
    continuity_and_recency: {
      continuity_status: "bounded_and_honest",
      continuity_hint: summary_projection.continuity_hint,
      recency_hint: derive_recency_hint(input),
    },
    management_object_family: {
      management_directive_status: derive_management_status(
        Boolean(management_directive)
      ),
      delivery_return_status: derive_management_status(Boolean(delivery_return)),
      approval_request_status: derive_management_status(Boolean(approval_request)),
      management_directive,
      delivery_return,
      approval_request,
    },
    deferred_items: unique_items([
      ...summary_projection.deferred_items,
      "secretary_behavior",
      "portfolio_dispatch_behavior",
      "provider_execution",
      "channel_entry",
      "broad_kpi_cockpit",
      "runtime_complete_orchestration",
    ]),
    non_claims: unique_items([
      ...summary_projection.non_claims,
      ...CELL_DETAIL_NON_CLAIMS,
    ]),
    projection_notes: [
      "Cell detail projection is a downstream product inspection surface over upstream runtime-private inputs.",
      "Management-object-family visibility remains non-executable and read-only.",
      "SoloCrew renders product projections here and does not take ownership of mother-runtime law.",
    ],
  };
}
