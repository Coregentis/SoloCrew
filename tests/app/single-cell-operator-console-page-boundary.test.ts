import assert from "node:assert/strict";
import test from "node:test";

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
  renderSingleCellOperatorConsolePage,
} from "../../app/pages/single-cell-operator-console-page.ts";

test("[app] single-cell operator console page keeps deferred and truth-boundary sections visible without portfolio or secretary drift", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-page-02",
    cell_id: "cell-02",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "delivery-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize one bounded operator console page.",
    delivery_target: "Return one narrow page scaffold with deferred mounts.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const shell_composition = composeSingleCellShellScaffold(assembly);
  const entry_package = adaptSingleCellShellEntry(shell_composition);
  const console_shell = composeSingleCellOperatorConsoleShell(entry_package);
  const page = renderSingleCellOperatorConsolePage(console_shell);

  assert.match(page.html, /Delivery Cell/);
  assert.match(page.html, /Blocked work count: 1/);
  assert.match(page.html, /Business pack mount: growth-pack/);
  assert.match(page.html, /Metrics pack mount: delivery-metrics/);
  assert.match(page.html, /Platform Coherence Overview/);
  assert.match(page.html, /Cross-plane summary: Current platform coherence aligns management, organization, execution-adjacent, and memory\/evidence product truths into one bounded solo-operator baseline without collapsing them into execution authority\./);
  assert.match(page.html, /Non-claim: no_cross_plane_execution_ownership/);
  assert.match(page.html, /Non-claim: no_multi_cell_portfolio_truth/);
  assert.match(page.html, /Non-claim: no_secretary_behavior_truth/);
  assert.match(page.html, /Non-claim: no_broad_kpi_projection/);

  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.multi_cell_portfolio_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_product_state_available, false);

  assert.ok(
    page.non_claims.includes("no_actual_ui_page_implementation")
  );
  assert.ok(
    page.non_claims.includes("no_multi_cell_portfolio_truth")
  );
  assert.ok(
    page.non_claims.includes("no_secretary_behavior_truth")
  );
  assert.ok(
    page.non_claims.includes("no_broad_kpi_projection")
  );
  assert.ok(
    page.non_claims.includes("no_plane_collapse_into_workflow_engine")
  );
});
