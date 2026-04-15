import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator in-session draft-state scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    session_draft_state: {
      objective_note_draft_value: "Tighten the objective scope around delivery proof.",
      work_item_note_draft_value: "Clarify the current work-item owner note.",
      correction_text_draft_value: "Prefer concise evidence-backed summaries.",
      review_request_draft_value: "Please recheck sequencing before submit preview.",
      selected_action_intent_draft_value: "apply_correction",
    },
  });

  try {
    const scaffold = bootstrap.in_session_draft_state_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_in_session_draft_state_scaffold"
    );
    assert.equal(scaffold.execution_boundary, "session_state_only");
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
      scaffold.current_session_draft_values.objective_note_draft_value.current_value,
      "Tighten the objective scope around delivery proof."
    );
    assert.equal(
      scaffold.current_session_draft_values.objective_note_draft_value.value_source,
      "bootstrap_session_override"
    );
    assert.equal(
      scaffold.current_session_draft_values.work_item_note_draft_value.value_presence,
      "present_in_session"
    );
    assert.equal(
      scaffold.current_session_draft_values.correction_text_draft_value.is_operator_authored,
      true
    );
    assert.equal(
      scaffold.current_session_draft_values.review_request_draft_value.value_presence,
      "present_in_session"
    );
    assert.equal(
      scaffold.current_session_draft_values.selected_action_intent_draft_value.current_value,
      "apply_correction"
    );
    assert.equal(
      scaffold.current_session_draft_values.selected_action_intent_draft_value.value_source,
      "bootstrap_session_override"
    );

    assert.equal(
      scaffold.draft_completeness_state.draft_emptiness_state,
      "some_operator_input_present"
    );
    assert.equal(
      scaffold.draft_completeness_state.draft_completeness_status,
      "session_drafts_have_operator_input"
    );
    assert.equal(
      scaffold.draft_completeness_state.present_draft_value_count,
      5
    );
    assert.equal(
      scaffold.draft_completeness_state.empty_draft_value_count,
      0
    );
    assert.equal(
      scaffold.draft_completeness_state.request_reviewability_status,
      "review_ready_now"
    );
    assert.equal(
      scaffold.draft_completeness_state.request_previewability_status,
      "preview_ready_now"
    );
    assert.ok(
      scaffold.draft_completeness_state.future_submit_dependencies.includes(
        "Operator confirmation of selected action intent"
      )
    );
    assert.ok(
      scaffold.unavailable_draft_surfaces.some(
        (surface) =>
          surface.surface_id === "fresh_reload_session_draft_restore"
      )
    );
    assert.ok(
      scaffold.non_claims.includes("no_actual_session_draft_submission")
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_runtime_complete_session_draft_workflow"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("fresh_reload_session_draft_restore")
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_session_draft_values.objective_note_draft_value,
      scaffold.current_session_draft_values.work_item_note_draft_value,
      scaffold.current_session_draft_values.correction_text_draft_value,
      scaffold.current_session_draft_values.review_request_draft_value,
      scaffold.current_session_draft_values.selected_action_intent_draft_value,
      scaffold.draft_completeness_state,
      ...scaffold.unavailable_draft_surfaces,
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
