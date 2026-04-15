import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell correction/review interaction scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const interaction = bootstrap.correction_review_interaction;

    assert.equal(interaction.interaction_scope, "single_cell_only");
    assert.equal(interaction.operator_surface, "single_cell_console");
    assert.equal(
      interaction.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      interaction.phase_boundary,
      "correction_review_scaffold"
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
      interaction.correction_input_seed.supported_capture_source,
      "user"
    );
    assert.equal(
      interaction.correction_input_seed.suggested_target_scope,
      "objective"
    );
    assert.ok(
      interaction.target_scope_hints.some(
        (hint) => hint.target_scope === "objective"
      )
    );
    assert.ok(
      interaction.target_scope_hints.some(
        (hint) => hint.target_scope === "work-item"
      )
    );
    assert.ok(
      interaction.target_scope_hints.some(
        (hint) => hint.target_scope === "crew"
      )
    );
    assert.ok(
      interaction.target_scope_hints.some(
        (hint) => hint.target_scope === "continuity-note"
      )
    );
    assert.ok(
      interaction.expected_outcome_hints.supported_writeback_hints.some(
        (hint) => /Preference writeback/u.test(hint)
      )
    );
    assert.ok(
      interaction.expected_outcome_hints.deferred_outcome_hints.includes(
        "persistent_review_timeline"
      )
    );
    assert.ok(
      interaction.non_claims.includes(
        "no_execution_complete_correction_workflow"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("persistent_review_timeline")
    );

    const boundary_targets = [
      interaction,
      interaction.correction_input_seed,
      interaction.review_intent_seed,
      interaction.expected_outcome_hints,
      ...interaction.target_scope_hints,
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
