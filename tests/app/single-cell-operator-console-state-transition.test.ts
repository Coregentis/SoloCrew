import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";
import {
  deriveSingleCellOperatorConsoleNextStateSeed,
} from "../../app/shell/single-cell-operator-console-state-transition.ts";

test("[app] single-cell operator console state transition scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.state_transition_scaffold;

    assert.equal(scaffold.transition_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_console_state_transition"
    );
    assert.equal(
      scaffold.execution_boundary,
      "state_transition_scaffold_only"
    );
    assert.equal(scaffold.actual_provider_actions_present, false);
    assert.equal(scaffold.actual_channel_entry_present, false);
    assert.equal(scaffold.multi_cell_portfolio_behavior_available, false);
    assert.equal(scaffold.secretary_behavior_available, false);
    assert.equal(scaffold.broad_kpi_cockpit_available, false);
    assert.equal(
      scaffold.runtime_complete_product_state_available,
      false
    );

    assert.equal(
      scaffold.current_state_seed.objective_focus_id,
      bootstrap.baseline_shell_session.shell.objective.objective_id
    );
    assert.ok(
      scaffold.transition_options.some(
        (option) => option.transition_kind === "objective_focus_change"
      )
    );
    assert.ok(
      scaffold.transition_options.some(
        (option) => option.transition_kind === "work_item_focus_change"
      )
    );
    assert.ok(
      scaffold.transition_options.some(
        (option) =>
          option.transition_kind === "correction_target_scope_change"
      )
    );
    assert.ok(
      scaffold.transition_options.some(
        (option) => option.transition_kind === "review_intent_change"
      )
    );
    assert.ok(
      scaffold.suggested_next_state_previews.some(
        (preview) => preview.transition_kind === "work_item_focus_change"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_execution_complete_state_transition"
      )
    );
    assert.ok(
      scaffold.deferred_items.includes(
        "state_transition_event_timeline_persistence"
      )
    );

    const work_item_option = scaffold.transition_options.find(
      (option) => option.transition_kind === "work_item_focus_change"
    );

    assert.ok(work_item_option);

    const work_item_preview =
      deriveSingleCellOperatorConsoleNextStateSeed({
        scaffold,
        option_id: work_item_option.option_id,
      });

    assert.equal(work_item_preview.transition_kind, "work_item_focus_change");
    assert.ok(work_item_preview.work_item_focus_id);
    assert.ok(work_item_preview.preview_notes.length > 0);

    const boundary_targets = [
      scaffold,
      scaffold.current_state_seed,
      ...scaffold.transition_options,
      ...scaffold.suggested_next_state_previews,
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
