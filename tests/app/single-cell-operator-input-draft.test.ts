import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator input-draft scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.input_draft_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_input_draft_scaffold"
    );
    assert.equal(
      scaffold.execution_boundary,
      "draft_scaffold_only"
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
      scaffold.current_draft_context.objective_focus_id,
      bootstrap.baseline_shell_session.shell.objective.objective_id
    );
    assert.ok(
      scaffold.draftable_input_slots.some(
        (slot) => slot.draft_kind === "objective_note_draft"
      )
    );
    assert.ok(
      scaffold.draftable_input_slots.some(
        (slot) => slot.draft_kind === "work_item_note_draft"
      )
    );
    assert.ok(
      scaffold.draftable_input_slots.some(
        (slot) => slot.draft_kind === "correction_text_draft"
      )
    );
    assert.ok(
      scaffold.draftable_input_slots.some(
        (slot) => slot.draft_kind === "review_request_draft"
      )
    );
    assert.ok(
      scaffold.draftable_input_slots.some(
        (slot) => slot.draft_kind === "selected_action_intent_draft"
      )
    );
    assert.ok(
      scaffold.action_intent_draft_options.some(
        (option) => option.intent_kind === "shift_task_focus"
      )
    );
    assert.ok(
      scaffold.action_intent_draft_options.some(
        (option) => option.intent_kind === "apply_correction"
      )
    );
    assert.ok(
      scaffold.unavailable_input_surfaces.some(
        (surface) => surface.surface_id === "provider_backed_input_submission"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_provider_backed_input_submission"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("persistent_input_draft_history")
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_draft_context,
      ...scaffold.draftable_input_slots,
      ...scaffold.action_intent_draft_options,
      ...scaffold.unavailable_input_surfaces,
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
