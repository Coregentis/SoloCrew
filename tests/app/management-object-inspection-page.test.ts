import assert from "node:assert/strict";
import test from "node:test";

import {
  renderManagementObjectInspectionPage,
} from "../../app/pages/management-object-inspection-page.ts";
import {
  buildManagementObjectInspectionRoute,
  composeManagementObjectInspectionViewShellFromRuntimeInput,
} from "../../app/shell/management-object-inspection-view.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";

function create_runtime_input() {
  return {
    cell_runtime_scope: {
      object_id: "cell-scope-01",
      object_type: "cell-runtime-scope" as const,
      authority_class: "coregentis_private_runtime" as const,
      primary_layer: "organization_runtime_layer" as const,
      status: "active" as const,
      project_id: "project-01",
      scope_name: "Runtime Delivery Cell",
      scope_summary: "Bounded runtime scope for delivery work.",
      scope_mode: "multi_scope_bounded" as const,
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    cell_summary_runtime_record: {
      object_id: "cell-summary-01",
      object_type: "cell-summary-runtime-record" as const,
      authority_class: "coregentis_private_runtime" as const,
      primary_layer: "organization_runtime_layer" as const,
      status: "current" as const,
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      summary_headline: "Ship one bounded runtime-backed review.",
      summary_delivery_posture: "attention" as const,
      active_work_item_count: 2,
      blocked_work_item_count: 1,
      continuity_hint: "Continuity remains bounded to runtime-private summary truth.",
      summary_mode: "bounded_runtime_private" as const,
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    management_directive_record: {
      object_id: "directive-01",
      object_type: "management-directive-record" as const,
      authority_class: "coregentis_private_runtime" as const,
      primary_layer: "organization_runtime_layer" as const,
      status: "active" as const,
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      directive_summary: "Keep delivery visible and bounded.",
      directive_priority: "focus_now" as const,
      approval_posture: "operator_required" as const,
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    delivery_return_record: {
      object_id: "delivery-return-01",
      object_type: "delivery-return-record" as const,
      authority_class: "coregentis_private_runtime" as const,
      primary_layer: "organization_runtime_layer" as const,
      status: "ready_for_review" as const,
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      completed_summary: "Review package assembled.",
      blocked_summary: "One follow-up item remains.",
      next_directive_needed: false,
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    approval_request_record: {
      object_id: "approval-request-01",
      object_type: "approval-request-record" as const,
      authority_class: "coregentis_private_runtime" as const,
      primary_layer: "organization_runtime_layer" as const,
      status: "pending" as const,
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      request_kind: "approval" as const,
      request_summary: "Operator review requested." ,
      requested_decision: "Approve bounded release.",
      urgency: "normal" as const,
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
  };
}

test("[app] management-object inspection page stays inspect-only and below secretary beta", () => {
  const inspection_shell =
    composeManagementObjectInspectionViewShellFromRuntimeInput(
      create_runtime_input()
    );
  const page = renderManagementObjectInspectionPage(inspection_shell);

  assert.equal(
    page.route_path,
    buildManagementObjectInspectionRoute("cell-scope-01")
  );
  assert.equal(page.page_kind, "management_object_inspection_page");
  assert.equal(
    page.page_scope,
    "multi_cell_foundation_management_object_inspection_only"
  );
  assert.equal(
    page.operator_surface,
    "multi_cell_foundation_management_object_inspection"
  );
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_orchestration_available, false);
  assert.equal(page.executable_management_actions_present, false);

  assert.match(page.html, /Management Object Inspection/);
  assert.match(page.html, /Read mode: inspect_only/);
  assert.match(page.html, /Management-object inspection remains read-only and non-executable/);
  assert.match(page.html, /Inspection projection is runtime law: false/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.inspection_units[0],
    page.sections.truth_boundary,
    inspection_shell.management_object_inspection_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[app] management-object inspection page exposes no executable actions", () => {
  const inspection_shell =
    composeManagementObjectInspectionViewShellFromRuntimeInput(
      create_runtime_input()
    );
  const page = renderManagementObjectInspectionPage(inspection_shell);

  assert.equal(page.executable_management_actions_present, false);
  assert.equal(page.sections.inspection_units.length, 3);
  assert.ok(
    page.sections.inspection_units.every(
      (unit) => unit.executable_actions_available === false
    )
  );
  assert.match(page.html, /management_directive/);
  assert.match(page.html, /delivery_return/);
  assert.match(page.html, /approval_request/);
  assert.match(page.html, /Upstream refs: 1/);
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);
  assert.doesNotMatch(page.html, /approve now/i);
  assert.doesNotMatch(page.html, /submit directive/i);
  assert.doesNotMatch(page.html, /dispatch action/i);
});
