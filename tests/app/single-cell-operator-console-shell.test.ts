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

test("[app] single-cell operator console shell assembles coherently from shell entry truth", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-operator-console-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused operator-native cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Prepare one operator console shell scaffold.",
    delivery_target: "Return one bounded operator-facing shell package.",
    active_work_count: 2,
    blocked_work_count: 1,
  });
  const shell_composition = composeSingleCellShellScaffold(assembly);
  const entry_package = adaptSingleCellShellEntry(shell_composition);
  const console_shell = composeSingleCellOperatorConsoleShell(entry_package);

  assert.equal(console_shell.console_scope, "single_cell_only");
  assert.equal(console_shell.operator_surface, "single_cell_console");
  assert.equal(
    console_shell.authority_boundary,
    "app_shell_projection_consumer"
  );
  assert.equal(console_shell.phase_boundary, "operator_console_shell");
  assert.equal(console_shell.actual_ui_pages_present, false);
  assert.equal(console_shell.broad_kpi_cockpit_available, false);
  assert.equal(
    console_shell.multi_cell_portfolio_behavior_available,
    false
  );
  assert.equal(console_shell.secretary_behavior_available, false);
  assert.equal(
    console_shell.runtime_complete_product_state_available,
    false
  );

  assert.ok(console_shell.header);
  assert.ok(console_shell.delivery);
  assert.ok(console_shell.crew_overview);
  assert.ok(console_shell.objective_overview);
  assert.ok(console_shell.work_item_execution_overview);
  assert.ok(console_shell.memory_continuity_overview);
  assert.ok(console_shell.deferred_surfaces);
  assert.ok(console_shell.truth_boundary);

  assert.equal(console_shell.header.cell_name, "Solo Operator Cell");
  assert.equal(
    console_shell.header.current_objective_headline,
    "Prepare one operator console shell scaffold."
  );
  assert.equal(
    console_shell.objective_overview.current_objective_id,
    "objective-01"
  );
  assert.equal(
    console_shell.work_item_execution_overview.actual_runtime_work_item_projection_available,
    false
  );
  assert.equal(
    console_shell.memory_continuity_overview.continuity_status,
    "bounded_and_honest"
  );

  assert.ok(console_shell.deferred_items.includes("provider_execution"));
  assert.ok(console_shell.deferred_items.includes("full-page-routing"));
  assert.ok(
    console_shell.truth_boundary.non_claims.includes(
      "no_actual_ui_page_implementation"
    )
  );
  assert.ok(
    console_shell.truth_boundary.non_claims.includes(
      "no_runtime_complete_product_state"
    )
  );

  const boundary_targets = [
    console_shell,
    console_shell.header,
    console_shell.delivery,
    console_shell.crew_overview,
    console_shell.objective_overview,
    console_shell.work_item_execution_overview,
    console_shell.memory_continuity_overview,
    console_shell.deferred_surfaces,
    console_shell.truth_boundary,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
