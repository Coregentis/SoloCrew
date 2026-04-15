import test from "node:test";
import assert from "node:assert/strict";

import {
  SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT,
} from "../../projection/contracts/management-interface-contract.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createCellSummaryCard,
  createDeliveryReturn,
  createEscalationApprovalRequest,
  createManagementDirective,
} from "../../projection/objects/management-interface.ts";

test("[projection] management interface skeleton keeps boundary shape and no upward law leakage", () => {
  assert.equal(
    SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT.broad_kpi_cockpit_available,
    false
  );
  assert.deepEqual(
    SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT.cross_layer_object_types,
    [
      "management-directive",
      "cell-summary-card",
      "escalation-approval-request",
      "delivery-return",
    ]
  );
  assert.ok(
    SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT.management_allowed_actions.includes(
      "issue_management_directive"
    )
  );
  assert.ok(
    SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT.management_forbidden_actions.includes(
      "act_as_broad_kpi_cockpit"
    )
  );
  assert.ok(
    SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT.cell_console_allowed_actions.includes(
      "emit_escalation_or_approval_request"
    )
  );
  assert.ok(
    SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT.cell_console_forbidden_actions.includes(
      "claim_organization_wide_portfolio_control"
    )
  );

  const objects = [
    createManagementDirective({
      projection_id: "management-directive-proj",
      management_directive_id: "management-directive-01",
      cell_id: "cell-01",
      priority: "focus_now",
      delivery_target: "Ship the current objective.",
      approval_posture: "operator_required",
    }),
    createCellSummaryCard({
      projection_id: "cell-summary-card-proj",
      cell_summary_card_id: "cell-summary-card-01",
      cell_id: "cell-01",
      cell_name: "Solo Operator Cell",
      current_objective_headline: "Stabilize the current release path.",
      delivery_posture: "attention",
      active_work_count: 3,
      blocked_work_count: 1,
      continuity_note: "Continuity remains bounded and honest.",
    }),
    createEscalationApprovalRequest({
      projection_id: "escalation-request-proj",
      escalation_approval_request_id: "escalation-request-01",
      cell_id: "cell-01",
      request_kind: "approval",
      reason: "Policy boundary reached.",
      affected_objective_id: "objective-01",
      requested_decision: "Approve the narrowed delivery path.",
      urgency: "high",
    }),
    createDeliveryReturn({
      projection_id: "delivery-return-proj",
      delivery_return_id: "delivery-return-01",
      cell_id: "cell-01",
      delivery_status: "ready_for_review",
      completed_summary: "Core structural skeleton is assembled.",
      blocked_summary: "Provider and channel work remains deferred.",
      next_directive_needed: true,
      requested_follow_up: "Prioritize the next structural implementation wave.",
    }),
  ];

  assert.equal(objects[0]?.phase_boundary, "compile_phase_only");
  assert.equal(objects[1]?.phase_boundary, "runtime_adjacent_summary");
  assert.equal(objects[2]?.phase_boundary, "runtime_adjacent_summary");
  assert.equal(objects[3]?.phase_boundary, "runtime_adjacent_summary");

  for (const object of objects) {
    assert.equal(object.authority_boundary, "management_interface_only");
    assert.equal(object.upward_runtime_authority, "forbidden");
    assert.equal(object.upward_protocol_authority, "forbidden");

    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in object, false);
    }
  }
});
