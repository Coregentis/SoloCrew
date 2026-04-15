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

test("[app] single-cell shell entry adapter assembles an app-shell-facing entry package from shell composition", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-entry-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused operator-native cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Prepare one shell-entry adapter package.",
    delivery_target: "Return one bounded app-shell-facing entry package.",
    active_work_count: 2,
    blocked_work_count: 1,
  });
  const shell_composition = composeSingleCellShellScaffold(assembly);
  const entry_package = adaptSingleCellShellEntry(shell_composition);

  assert.equal(entry_package.entry_scope, "single_cell_only");
  assert.equal(
    entry_package.authority_boundary,
    "app_shell_projection_consumer"
  );
  assert.equal(entry_package.phase_boundary, "app_shell_adapter");
  assert.equal(entry_package.app_shell_role, "projection-consumer");
  assert.equal(entry_package.actual_ui_pages_present, false);
  assert.equal(entry_package.broad_kpi_cockpit_available, false);
  assert.equal(entry_package.multi_cell_portfolio_behavior_available, false);
  assert.equal(entry_package.secretary_behavior_available, false);
  assert.equal(
    entry_package.runtime_complete_product_entry_available,
    false
  );

  assert.ok(entry_package.shell_composition);
  assert.ok(entry_package.entry_header_seed);
  assert.ok(entry_package.entry_section_seed);
  assert.ok(entry_package.entry_truth_boundary_seed);

  assert.equal(
    entry_package.entry_header_seed.cell_name,
    "Solo Operator Cell"
  );
  assert.equal(
    entry_package.entry_header_seed.current_objective_headline,
    "Prepare one shell-entry adapter package."
  );
  assert.equal(
    entry_package.shell_composition.constitution_state.cell_charter.cell_id,
    "cell-01"
  );
  assert.equal(
    entry_package.shell_composition.single_cell_view_model.header_view.cell_name,
    entry_package.entry_header_seed.cell_name
  );

  assert.ok(entry_package.deferred_items.includes("provider_execution"));
  assert.ok(entry_package.deferred_items.includes("full-page-routing"));
  assert.ok(
    entry_package.entry_truth_boundary_seed.non_claims.includes(
      "no_actual_ui_page_implementation"
    )
  );
  assert.ok(
    entry_package.entry_truth_boundary_seed.non_claims.includes(
      "no_runtime_complete_product_entry"
    )
  );

  const boundary_targets = [
    entry_package,
    entry_package.entry_header_seed,
    entry_package.entry_section_seed,
    entry_package.entry_truth_boundary_seed,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
