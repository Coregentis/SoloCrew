import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";
import {
  adaptSingleCellShellEntry,
} from "../../app/shell/single-cell-shell-entry-adapter.ts";
import {
  composeSingleCellOperatorConsoleShell,
} from "../../app/shell/single-cell-operator-console-shell.ts";
import {
  SINGLE_CELL_OPERATOR_CONSOLE_ROUTE,
  renderSingleCellOperatorConsolePage,
} from "../../app/pages/single-cell-operator-console-page.ts";

test("[app] single-cell operator console page renders from current shell adapter truth", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-page-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused operator-native cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Prepare one bounded operator console page.",
    delivery_target: "Return one renderable operator-facing page scaffold.",
    active_work_count: 2,
    blocked_work_count: 1,
  });
  const shell_composition = composeSingleCellShellScaffold(assembly);
  const entry_package = adaptSingleCellShellEntry(shell_composition);
  const console_shell = composeSingleCellOperatorConsoleShell(entry_package);
  const page = renderSingleCellOperatorConsolePage(console_shell);

  assert.equal(page.route_path, SINGLE_CELL_OPERATOR_CONSOLE_ROUTE);
  assert.equal(page.page_kind, "single_cell_operator_console_page");
  assert.equal(page.page_scope, "single_cell_only");
  assert.equal(page.operator_surface, "single_cell_console");
  assert.equal(page.authority_boundary, "app_page_projection_consumer");
  assert.equal(page.phase_boundary, "bounded_operator_page");
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.multi_cell_portfolio_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_product_state_available, false);

  assert.ok(page.sections.header);
  assert.ok(page.sections.delivery);
  assert.ok(page.sections.delivery_acceptance);
  assert.ok(page.sections.crew_overview);
  assert.ok(page.sections.objective_overview);
  assert.ok(page.sections.task_focus);
  assert.ok(page.sections.action_intents);
  assert.ok(page.sections.input_drafts);
  assert.ok(page.sections.in_session_draft_state);
  assert.ok(page.sections.session_draft_controls);
  assert.ok(page.sections.correction_apply);
  assert.ok(page.sections.readiness_summary);
  assert.ok(page.sections.request_package);
  assert.ok(page.sections.request_review_submit_preview);
  assert.ok(page.sections.work_item_execution_overview);
  assert.ok(page.sections.memory_continuity_overview);
  assert.ok(page.sections.platform_delivery_readiness_overview);
  assert.ok(page.sections.platform_coherence_overview);
  assert.ok(page.sections.deferred_surfaces);
  assert.ok(page.sections.truth_boundary);

  assert.match(page.html, /<h1>Solo Operator Cell<\/h1>/);
  assert.match(page.html, /Header/);
  assert.match(page.html, /Delivery/);
  assert.match(page.html, /Delivery Acceptance/);
  assert.match(page.html, /Crew Overview/);
  assert.match(page.html, /Objective Overview/);
  assert.match(page.html, /Task Focus/);
  assert.match(page.html, /Action Intents/);
  assert.match(page.html, /Input Drafts/);
  assert.match(page.html, /In-Session Draft State/);
  assert.match(page.html, /Session Draft Controls/);
  assert.match(page.html, /Correction Apply/);
  assert.match(page.html, /Readiness Summary/);
  assert.match(page.html, /Request Package/);
  assert.match(page.html, /Request Review \/ Submit Preview/);
  assert.match(page.html, /Work Item \/ Execution Overview/);
  assert.match(page.html, /Memory \/ Continuity Overview/);
  assert.match(page.html, /Platform Summary \/ Delivery Readiness/);
  assert.match(page.html, /Platform Coherence Overview/);
  assert.match(page.html, /Deferred Surfaces/);
  assert.match(page.html, /Truth Boundary/);
  assert.match(page.html, /Prepare one bounded operator console page\./);
  assert.match(page.html, /Platform posture: bounded_platform_baseline_only/);
  assert.match(page.html, /Delivery readiness status: planning_ready_not_delivery_ready/);
  assert.match(page.html, /Formal delivery ready now: false/);
  assert.match(page.html, /Current readiness blocker: runtime_dependent_downstream_truth_hardening/);
  assert.match(page.html, /Present capability: single_cell_operating_core:/);
  assert.match(page.html, /Deferred capability: formal_v1_delivery_gate:/);
  assert.match(page.html, /Deferred readiness item: formal_v1_delivery_gate/);
  assert.match(page.html, /Non-claim: no_readiness_triggered_actions/);
  assert.match(page.html, /Present planes: management_plane, organization_plane, execution_plane, memory_evidence_plane/);
  assert.match(page.html, /Non-claim: no_cross_plane_execution_ownership/);
  assert.match(page.html, /Deferred item: provider_execution/);
  assert.match(page.html, /Non-claim: no_actual_ui_page_implementation/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.delivery,
    page.sections.delivery_acceptance,
    page.sections.crew_overview,
    page.sections.objective_overview,
    page.sections.task_focus,
    page.sections.action_intents,
    page.sections.input_drafts,
    page.sections.in_session_draft_state,
    page.sections.session_draft_controls,
    page.sections.correction_apply,
    page.sections.readiness_summary,
    page.sections.request_package,
    page.sections.request_review_submit_preview,
    page.sections.work_item_execution_overview,
    page.sections.memory_continuity_overview,
    page.sections.platform_delivery_readiness_overview,
    page.sections.platform_coherence_overview,
    page.sections.deferred_surfaces,
    page.sections.truth_boundary,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
