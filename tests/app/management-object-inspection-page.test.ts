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
import {
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
} from "../../projection/contracts/runtime-backed-management-projection-contract.ts";
import {
  createWorkforceCellProjectionInputWithManagement,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";


test("[app] management-object inspection page stays inspect-only and below secretary beta", () => {
  const inspection_shell =
    composeManagementObjectInspectionViewShellFromRuntimeInput(
      createWorkforceCellProjectionInputWithManagement()
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
      createWorkforceCellProjectionInputWithManagement()
    );
  const page = renderManagementObjectInspectionPage(inspection_shell);

  assert.equal(page.executable_management_actions_present, false);
  assert.equal(page.sections.inspection_units.length, 3);
  assert.equal(
    page.sections.inspection_units[0]?.product_object_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE
  );
  assert.equal(
    page.sections.inspection_units[0]?.phase_boundary,
    "runtime_adjacent_detail"
  );
  assert.equal(
    page.sections.inspection_units[2]?.product_projection?.affected_objective_id,
    "objective-01"
  );
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
