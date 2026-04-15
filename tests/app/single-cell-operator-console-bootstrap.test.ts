import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  SINGLE_CELL_OPERATOR_CONSOLE_ROUTE,
} from "../../app/pages/single-cell-operator-console-page.ts";
import {
  SINGLE_CELL_OPERATOR_CONSOLE_BOOTSTRAP_TRUTH_SOURCES,
} from "../../app/shell/single-cell-operator-console-bootstrap-contract.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page bootstraps coherently from existing shell/runtime truth", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    assert.equal(bootstrap.bootstrap_scope, "single_cell_only");
    assert.equal(bootstrap.operator_surface, "single_cell_console");
    assert.equal(
      bootstrap.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(bootstrap.phase_boundary, "operator_console_bootstrap");
    assert.equal(bootstrap.runtime_mode, "memory");
    assert.deepEqual(
      bootstrap.truth_sources,
      SINGLE_CELL_OPERATOR_CONSOLE_BOOTSTRAP_TRUTH_SOURCES
    );
    assert.equal(bootstrap.actual_provider_actions_present, false);
    assert.equal(bootstrap.actual_channel_entry_present, false);
    assert.equal(bootstrap.multi_cell_portfolio_behavior_available, false);
    assert.equal(bootstrap.secretary_behavior_available, false);
    assert.equal(bootstrap.broad_kpi_cockpit_available, false);
    assert.equal(
      bootstrap.runtime_complete_product_state_available,
      false
    );

    assert.equal(
      bootstrap.page.route_path,
      SINGLE_CELL_OPERATOR_CONSOLE_ROUTE
    );
    assert.equal(
      bootstrap.page.console_shell.header.cell_name,
      bootstrap.baseline_shell_session.shell.crew.display_name
    );
    assert.equal(
      bootstrap.page.console_shell.objective_overview.current_objective_id,
      bootstrap.baseline_shell_session.shell.objective.objective_id
    );
    assert.match(
      bootstrap.page.console_shell.header.continuity_note,
      /in-memory runtime session/u
    );
    assert.match(
      bootstrap.page.html,
      new RegExp(bootstrap.baseline_shell_session.shell.objective.title)
    );
    assert.ok(bootstrap.deferred_items.includes("provider_execution"));
    assert.ok(
      bootstrap.deferred_items.includes("delivery_acceptance_workflow_runtime")
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_runtime_complete_product_state"
      )
    );

    const boundary_targets = [
      bootstrap,
      bootstrap.page,
      bootstrap.console_shell,
      bootstrap.page.sections.header,
      bootstrap.page.sections.delivery,
      bootstrap.page.sections.delivery_acceptance,
      bootstrap.page.sections.crew_overview,
      bootstrap.page.sections.objective_overview,
      bootstrap.page.sections.task_focus,
      bootstrap.page.sections.action_intents,
      bootstrap.page.sections.work_item_execution_overview,
      bootstrap.page.sections.memory_continuity_overview,
      bootstrap.page.sections.deferred_surfaces,
      bootstrap.page.sections.truth_boundary,
    ];

    for (const target of boundary_targets) {
      for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
        assert.equal(field_name in target, false);
      }
    }
  } finally {
    bootstrap.close();
  }
});
