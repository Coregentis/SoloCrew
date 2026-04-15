import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator action-intent scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.action_intent_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_action_intent_scaffold"
    );
    assert.equal(
      scaffold.execution_boundary,
      "interaction_scaffold_only"
    );
    assert.equal(scaffold.actual_provider_actions_present, false);
    assert.equal(scaffold.actual_channel_entry_present, false);
    assert.equal(
      scaffold.multi_cell_portfolio_behavior_available,
      false
    );
    assert.equal(scaffold.secretary_behavior_available, false);
    assert.equal(scaffold.broad_kpi_cockpit_available, false);
    assert.equal(
      scaffold.runtime_complete_product_state_available,
      false
    );

    assert.equal(
      scaffold.current_action_context.objective_focus_id,
      bootstrap.baseline_shell_session.shell.objective.objective_id
    );
    assert.ok(
      scaffold.available_action_intent_seeds.some(
        (seed) => seed.intent_kind === "refine_objective"
      )
    );
    assert.ok(
      scaffold.available_action_intent_seeds.some(
        (seed) => seed.intent_kind === "reprioritize_work_item"
      )
    );
    assert.ok(
      scaffold.available_action_intent_seeds.some(
        (seed) => seed.intent_kind === "shift_task_focus"
      )
    );
    assert.ok(
      scaffold.available_action_intent_seeds.some(
        (seed) => seed.intent_kind === "request_review"
      )
    );
    assert.ok(
      scaffold.available_action_intent_seeds.some(
        (seed) => seed.intent_kind === "apply_correction"
      )
    );
    assert.ok(
      scaffold.available_action_intent_seeds.some(
        (seed) => seed.intent_kind === "resume_or_defer_hint"
      )
    );
    assert.ok(
      scaffold.current_constraint_hints.some(
        (hint) => hint.constraint_id === "no-provider-backed-execution"
      )
    );
    assert.ok(
      scaffold.unavailable_action_surfaces.some(
        (surface) => surface.surface_id === "provider-execution"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_provider_backed_action_intent_execution"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("provider_backed_action_execution")
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_action_context,
      ...scaffold.available_action_intent_seeds,
      ...scaffold.current_constraint_hints,
      ...scaffold.unavailable_action_surfaces,
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
