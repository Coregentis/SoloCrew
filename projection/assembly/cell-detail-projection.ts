import {
  adaptRuntimePrivateCellSummaryToProjection,
  asProjectionSafeWorkforceCellInput,
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
  status: RuntimePrivateCellSummaryAdapterInput["delivery_return"] extends infer T
    ? T extends { delivery_status: infer TStatus }
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
  if (input.workforce_envelope.summary_headline) {
    return `Projection-safe workforce envelope status: ${input.workforce_envelope.scope_status}.`;
  }

  return `Projection-safe workforce envelope has no summary headline; detail inspection falls back to bounded scope truth only.`;
}

export function assembleCellDetailProjectionFromRuntimeInput(
  input: RuntimePrivateCellSummaryAdapterInput
): CellDetailProjection {
  const projection_input = asProjectionSafeWorkforceCellInput(input);
  const summary_projection =
    adaptRuntimePrivateCellSummaryToProjection(projection_input);
  const management_directive = projection_input.management_directive
    ? createRuntimeBackedManagementDirectiveProjection({
        projection_id:
          `${projection_input.workforce_envelope.scope_ref}:detail-management-directive`,
        cell_id: projection_input.workforce_envelope.scope_ref,
        upstream_record_id: projection_input.management_directive.directive_ref,
        priority: projection_input.management_directive.directive_priority,
        delivery_target: projection_input.management_directive.directive_summary,
        approval_posture: projection_input.management_directive.approval_posture,
        constraint_emphasis: projection_input.management_directive.constraint_tags,
      })
    : undefined;
  const delivery_return = projection_input.delivery_return
    ? createDeliveryReturn({
        projection_id: `${projection_input.workforce_envelope.scope_ref}:detail-delivery-return`,
        delivery_return_id: projection_input.delivery_return.delivery_return_ref,
        cell_id: projection_input.workforce_envelope.scope_ref,
        delivery_status: map_delivery_return_status(
          projection_input.delivery_return.delivery_status
        ),
        completed_summary: projection_input.delivery_return.completed_summary,
        blocked_summary: projection_input.delivery_return.blocked_summary,
        next_directive_needed: projection_input.delivery_return.next_directive_needed,
        requested_follow_up: projection_input.delivery_return.requested_follow_up,
        projection_notes: [
          "Delivery return detail is inspection-only downstream projection over projection-safe workforce input.",
          "No mutation or workflow-return action is exposed here.",
        ],
      })
    : undefined;
  const approval_request = projection_input.approval_request
    ? createEscalationApprovalRequest({
        projection_id: `${projection_input.workforce_envelope.scope_ref}:detail-approval-request`,
        escalation_approval_request_id: projection_input.approval_request.approval_request_ref,
        cell_id: projection_input.workforce_envelope.scope_ref,
        request_kind: projection_input.approval_request.request_kind,
        reason: projection_input.approval_request.request_summary,
        affected_objective_id: projection_input.approval_request.objective_ref,
        requested_decision: projection_input.approval_request.requested_decision,
        urgency: projection_input.approval_request.urgency,
        projection_notes: [
          "Approval request detail is inspection-only downstream projection over projection-safe workforce input.",
          "No approval action button or escalation workflow is exposed here.",
        ],
      })
    : undefined;

  return {
    detail_projection_id:
      `${projection_input.workforce_envelope.scope_ref}-cell-detail-projection`,
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
      cell_id: projection_input.workforce_envelope.scope_ref,
      cell_name: projection_input.workforce_envelope.scope_label,
      scope_status: projection_input.workforce_envelope.scope_status,
      scope_mode: projection_input.workforce_envelope.scope_mode,
      scope_summary:
        projection_input.workforce_envelope.summary_headline ??
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
      recency_hint: derive_recency_hint(projection_input),
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
      "Cell detail projection is a downstream product inspection surface over upstream projection-safe workforce input.",
      "Management-object-family visibility remains non-executable and read-only.",
      "SoloCrew renders product projections here and does not take ownership of mother-runtime law.",
    ],
  };
}
