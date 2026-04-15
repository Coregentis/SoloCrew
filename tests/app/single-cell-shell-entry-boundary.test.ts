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
  SINGLE_CELL_SHELL_ENTRY_SECTION_KEYS,
} from "../../app/shell/single-cell-shell-entry-contract.ts";
import {
  SOLOCREW_APP_SHELL_BOUNDARY,
} from "../../app/shell/app-boundary.ts";

test("[app] single-cell shell entry adapter stays aligned with app-shell boundary and avoids UI, portfolio, or secretary drift", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-entry-02",
    cell_id: "cell-02",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "delivery-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize one app-shell entry scaffold.",
    delivery_target: "Return one aligned entry adapter with deferred mounts.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const shell_composition = composeSingleCellShellScaffold(assembly);
  const entry_package = adaptSingleCellShellEntry(shell_composition);

  assert.equal(
    entry_package.app_shell_boundary.role,
    SOLOCREW_APP_SHELL_BOUNDARY.role
  );
  assert.deepEqual(
    entry_package.app_shell_boundary.does_not_own,
    SOLOCREW_APP_SHELL_BOUNDARY.does_not_own
  );
  assert.deepEqual(
    entry_package.app_shell_boundary.deferred,
    SOLOCREW_APP_SHELL_BOUNDARY.deferred
  );

  assert.deepEqual(
    entry_package.entry_section_seed.available_section_keys,
    SINGLE_CELL_SHELL_ENTRY_SECTION_KEYS
  );
  assert.equal(entry_package.entry_section_seed.default_section_key, "header_view");
  assert.equal(entry_package.entry_section_seed.actual_routing_present, false);

  assert.equal(entry_package.actual_ui_pages_present, false);
  assert.equal(entry_package.secretary_behavior_available, false);
  assert.equal(entry_package.multi_cell_portfolio_behavior_available, false);
  assert.equal(entry_package.broad_kpi_cockpit_available, false);
  assert.equal(
    entry_package.runtime_complete_product_entry_available,
    false
  );

  assert.ok(entry_package.deferred_items.includes("interactive-cockpit"));
  assert.ok(entry_package.deferred_items.includes("live-data-fetching"));
  assert.ok(
    entry_package.entry_truth_boundary_seed.non_claims.includes(
      "no_multi_cell_portfolio_truth"
    )
  );
  assert.ok(
    entry_package.entry_truth_boundary_seed.non_claims.includes(
      "no_secretary_behavior_truth"
    )
  );
  assert.ok(
    entry_package.entry_truth_boundary_seed.non_claims.includes(
      "no_broad_kpi_projection"
    )
  );
  assert.ok(
    entry_package.shell_composition.single_cell_view_model.deferred_surface_view.optional_mounts_present
  );
});
