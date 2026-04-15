import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell task-focus interaction scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const interaction = bootstrap.task_focus_interaction;

    assert.equal(interaction.interaction_scope, "single_cell_only");
    assert.equal(interaction.operator_surface, "single_cell_console");
    assert.equal(
      interaction.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      interaction.phase_boundary,
      "task_focus_interaction_scaffold"
    );
    assert.equal(
      interaction.execution_boundary,
      "interaction_scaffold_only"
    );
    assert.equal(interaction.actual_provider_actions_present, false);
    assert.equal(interaction.actual_channel_entry_present, false);
    assert.equal(
      interaction.multi_cell_portfolio_behavior_available,
      false
    );
    assert.equal(interaction.secretary_behavior_available, false);
    assert.equal(interaction.broad_kpi_cockpit_available, false);
    assert.equal(
      interaction.runtime_complete_product_state_available,
      false
    );

    assert.equal(
      interaction.current_objective_focus.objective_id,
      bootstrap.baseline_shell_session.shell.objective.objective_id
    );
    assert.ok(
      interaction.available_focus_targets.some(
        (target) =>
          target.target_kind === "objective" && target.is_current
      )
    );
    assert.ok(
      interaction.available_focus_targets.some(
        (target) => target.target_kind === "work-item"
      )
    );
    assert.ok(
      interaction.focus_switch_intent_seeds.some(
        (seed) => seed.target_kind === "objective"
      )
    );
    assert.ok(
      interaction.focus_switch_intent_seeds.some(
        (seed) => seed.target_kind === "work-item"
      )
    );
    assert.ok(
      interaction.next_focus_preview_seeds.some(
        (preview) => preview.target_kind === "objective"
      )
    );
    assert.ok(
      interaction.next_focus_preview_seeds.some(
        (preview) => preview.target_kind === "work-item"
      )
    );
    assert.ok(
      interaction.non_claims.includes(
        "no_task_focus_execution_dispatch"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("persistent_focus_switch_timeline")
    );

    const boundary_targets = [
      interaction,
      interaction.current_objective_focus,
      interaction.current_work_item_focus,
      ...interaction.available_focus_targets,
      ...interaction.focus_switch_intent_seeds,
      ...interaction.next_focus_preview_seeds,
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
