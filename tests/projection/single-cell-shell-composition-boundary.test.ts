import assert from "node:assert/strict";
import test from "node:test";

import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";

test("[projection] single-cell shell composition keeps deferred items explicit and avoids UI, portfolio, or secretary drift", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-shell-02",
    cell_id: "cell-02",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "delivery-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize one shell-entry composition.",
    delivery_target: "Return one shell package with deferred mounts.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const shell = composeSingleCellShellScaffold(assembly);

  assert.equal(
    shell.single_cell_view_model.header_view.delivery_posture,
    "attention"
  );
  assert.equal(
    shell.single_cell_console_state.objective_state.seeded_summary_truth.near_term_execution_pressure,
    "stabilize_and_review"
  );
  assert.equal(
    shell.single_cell_view_model.deferred_surface_view.optional_mounts_present,
    true
  );
  assert.equal(
    shell.single_cell_view_model.deferred_surface_view.all_mounts_deferred,
    true
  );
  assert.equal(
    shell.single_cell_view_model.deferred_surface_view.business_pack_mount_keys.length,
    1
  );
  assert.equal(
    shell.single_cell_view_model.deferred_surface_view.metrics_pack_mount_keys.length,
    1
  );

  assert.equal(shell.actual_ui_pages_present, false);
  assert.equal(shell.secretary_behavior_available, false);
  assert.equal(shell.multi_cell_portfolio_behavior_available, false);
  assert.equal(shell.broad_kpi_cockpit_available, false);

  assert.ok(
    shell.deferred_items.includes("multi_cell_portfolio_behavior")
  );
  assert.ok(shell.deferred_items.includes("secretary_behavior"));
  assert.ok(
    shell.entry_surface_non_claims.includes("no_multi_cell_portfolio_truth")
  );
  assert.ok(
    shell.entry_surface_non_claims.includes("no_secretary_behavior_truth")
  );
  assert.ok(
    shell.entry_surface_non_claims.includes("no_broad_kpi_projection")
  );
  assert.ok(
    shell.single_cell_view_model.truth_boundary_view.non_claims.includes(
      "no_actual_ui_page_implementation"
    )
  );
});
