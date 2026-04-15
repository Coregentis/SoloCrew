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

test("[projection] single-cell shell composition assembles all required layers coherently", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-shell-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused operator-native cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Prepare one shell-entry scaffold.",
    delivery_target: "Return one coherent shell composition package.",
    active_work_count: 2,
    blocked_work_count: 1,
  });
  const shell = composeSingleCellShellScaffold(assembly);

  assert.equal(shell.shell_scope, "single_cell_only");
  assert.equal(shell.authority_boundary, "product_projection_only");
  assert.equal(shell.phase_boundary, "shell_entry_ready");
  assert.equal(shell.actual_ui_pages_present, false);
  assert.equal(shell.broad_kpi_cockpit_available, false);
  assert.equal(shell.multi_cell_portfolio_behavior_available, false);
  assert.equal(shell.secretary_behavior_available, false);
  assert.equal(shell.runtime_complete_product_state_available, false);

  assert.ok(shell.constitution_state);
  assert.ok(shell.initial_management_directive_seed);
  assert.ok(shell.initial_cell_summary_seed);
  assert.ok(shell.compile_input_seed);
  assert.ok(shell.single_cell_console_state);
  assert.ok(shell.single_cell_view_model);

  assert.equal(
    shell.constitution_state.cell_charter.cell_id,
    shell.single_cell_console_state.cell_identity_state.persisted_structural_truth.cell_id
  );
  assert.equal(
    shell.constitution_state.cell_charter.cell_name,
    shell.single_cell_view_model.header_view.cell_name
  );
  assert.equal(
    shell.compile_input_seed.objective_context.current_objective_id,
    shell.single_cell_view_model.objective_overview_view.current_objective_id
  );
  assert.equal(
    shell.single_cell_console_state.console_state_id,
    "single-cell-shell-01-console-state"
  );
  assert.equal(
    shell.single_cell_view_model.view_model_id,
    "single-cell-shell-01-console-state-view-model"
  );

  assert.ok(shell.deferred_items.includes("provider_execution"));
  assert.ok(shell.deferred_items.includes("secretary_behavior"));
  assert.ok(
    shell.entry_surface_non_claims.includes("no_actual_ui_page_implementation")
  );
  assert.ok(
    shell.entry_surface_non_claims.includes("no_runtime_complete_product_state")
  );

  const boundary_targets = [
    shell,
    shell.single_cell_console_state,
    shell.single_cell_view_model,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
