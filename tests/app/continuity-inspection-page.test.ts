import assert from "node:assert/strict";
import test from "node:test";

import {
  renderContinuityInspectionPage,
} from "../../app/pages/continuity-inspection-page.ts";
import {
  buildContinuityInspectionRoute,
  composeContinuityInspectionViewShellFromRuntimeInput,
} from "../../app/shell/continuity-inspection-view.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createWorkforceCellProjectionInputWithManagement,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";


test("[app] continuity inspection page stays inspect-only and below secretary beta", () => {
  const inspection_shell =
    composeContinuityInspectionViewShellFromRuntimeInput(
      createWorkforceCellProjectionInputWithManagement()
    );
  const page = renderContinuityInspectionPage(inspection_shell);

  assert.equal(
    page.route_path,
    buildContinuityInspectionRoute("cell-scope-01")
  );
  assert.equal(page.page_kind, "continuity_inspection_page");
  assert.equal(
    page.page_scope,
    "multi_cell_foundation_continuity_inspection_only"
  );
  assert.equal(
    page.operator_surface,
    "multi_cell_foundation_continuity_inspection"
  );
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_orchestration_available, false);
  assert.equal(page.executable_continuity_actions_present, false);

  assert.match(page.html, /Continuity Inspection/);
  assert.match(page.html, /Read mode: inspect_only/);
  assert.match(page.html, /Continuity inspection remains read-only and non-executable/);
  assert.match(page.html, /Continuity projection is runtime law: false/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.continuity_snapshot,
    page.sections.bounded_knowledge,
    page.sections.truth_boundary,
    inspection_shell.continuity_inspection_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[app] continuity inspection page exposes no executable continuity actions", () => {
  const inspection_shell =
    composeContinuityInspectionViewShellFromRuntimeInput(
      createWorkforceCellProjectionInputWithManagement()
    );
  const page = renderContinuityInspectionPage(inspection_shell);

  assert.equal(page.executable_continuity_actions_present, false);
  assert.equal(
    page.sections.continuity_snapshot.continuity_visibility,
    "runtime_backed_visible"
  );
  assert.equal(
    page.sections.continuity_snapshot.blocked_signal,
    "blocked_attention_visible"
  );
  assert.match(page.html, /Continuity state: blocked_visible/);
  assert.match(page.html, /Known input: projection_safe_workforce_envelope_presence/);
  assert.match(page.html, /Unknown input: recovery_workflow_execution/);
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);
  assert.doesNotMatch(page.html, /restore now/i);
  assert.doesNotMatch(page.html, /retry now/i);
  assert.doesNotMatch(page.html, /dispatch action/i);
});
