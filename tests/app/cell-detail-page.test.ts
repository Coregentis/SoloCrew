import assert from "node:assert/strict";
import test from "node:test";

import {
  renderCellDetailPage,
} from "../../app/pages/cell-detail-page.ts";
import {
  buildCellDetailRoute,
  composeCellDetailViewShellFromRuntimeInput,
} from "../../app/shell/cell-detail-view.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
} from "../../projection/contracts/runtime-backed-management-projection-contract.ts";
import {
  createWorkforceCellProjectionInputWithManagement,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";


test("[app] cell detail page stays read-only and below secretary beta", () => {
  const detail_shell =
    composeCellDetailViewShellFromRuntimeInput(createWorkforceCellProjectionInputWithManagement());
  const page = renderCellDetailPage(detail_shell);

  assert.equal(page.route_path, buildCellDetailRoute("cell-scope-01"));
  assert.equal(page.page_kind, "cell_detail_page");
  assert.equal(page.page_scope, "multi_cell_foundation_cell_detail_only");
  assert.equal(
    page.operator_surface,
    "multi_cell_foundation_cell_detail_inspection"
  );
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_orchestration_available, false);
  assert.equal(page.executable_management_actions_present, false);
  assert.equal(page.sections.header.read_mode, "inspect_only");
  assert.equal(page.sections.truth_boundary.detail_projection_is_runtime_law, false);

  assert.match(page.html, /Cell Detail Inspection/);
  assert.match(page.html, /Runtime Delivery Cell/);
  assert.match(page.html, /Read mode: inspect_only/);
  assert.match(page.html, /Management object family remains inspection-only and non-executable/);
  assert.match(page.html, /Detail projection is runtime law: false/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.cell_identity,
    page.sections.objective_and_work_status,
    page.sections.continuity_and_recency,
    page.sections.management_object_family,
    page.sections.truth_boundary,
    detail_shell.cell_detail_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[app] cell detail page exposes no executable management actions", () => {
  const detail_shell =
    composeCellDetailViewShellFromRuntimeInput(createWorkforceCellProjectionInputWithManagement());
  const page = renderCellDetailPage(detail_shell);

  assert.equal(page.executable_management_actions_present, false);
  assert.equal(
    page.sections.management_object_family.management_directive_status,
    "present_non_executable"
  );
  assert.equal(
    page.sections.management_object_family.management_directive
      ?.projection_object_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE
  );
  assert.equal(
    page.sections.management_object_family.management_directive
      ?.phase_boundary,
    "runtime_adjacent_detail"
  );
  assert.equal(
    page.sections.management_object_family.delivery_return_status,
    "present_non_executable"
  );
  assert.equal(
    page.sections.management_object_family.approval_request_status,
    "present_non_executable"
  );
  assert.equal(
    page.sections.management_object_family.approval_request
      ?.affected_objective_id,
    "objective-01"
  );

  assert.match(page.html, /Directive summary: Keep delivery visible and bounded\./);
  assert.match(page.html, /Delivery return status detail: ready_for_review/);
  assert.match(page.html, /Approval request reason: Operator review requested\./);
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);
  assert.doesNotMatch(page.html, /dispatch action/i);
  assert.doesNotMatch(page.html, /submit directive/i);
});
