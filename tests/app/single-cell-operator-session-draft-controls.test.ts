import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator session-draft controls scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.session_draft_controls_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_session_draft_controls_scaffold"
    );
    assert.equal(scaffold.execution_boundary, "control_scaffold_only");
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
      scaffold.keep_draft_hint.availability_status,
      "available_now"
    );
    assert.equal(
      scaffold.clear_draft_hint.availability_status,
      "available_now"
    );
    assert.equal(
      scaffold.promote_to_request_preview_hint.availability_status,
      "blocked_missing_operator_input"
    );
    assert.equal(
      scaffold.draft_completeness_hint.draft_emptiness_state,
      "all_empty_except_derived_selection"
    );
    assert.equal(
      scaffold.draft_completeness_hint.draft_completeness_status,
      "session_drafts_incomplete"
    );
    assert.equal(
      scaffold.draft_completeness_hint.any_draft_value_present,
      true
    );
    assert.equal(
      scaffold.draft_completeness_hint.operator_authored_draft_present,
      false
    );
    assert.equal(
      scaffold.draft_completeness_hint.request_reviewability_status,
      "review_ready_now"
    );
    assert.equal(
      scaffold.draft_completeness_hint.request_previewability_status,
      "preview_ready_now"
    );
    assert.ok(
      scaffold.draft_completeness_hint.future_submit_dependencies.includes(
        "Operator confirmation of selected action intent"
      )
    );
    assert.ok(
      scaffold.unavailable_control_surfaces.some(
        (surface) =>
          surface.surface_id === "one_click_request_preview_promotion"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_actual_request_preview_seed_promotion"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_runtime_complete_session_draft_control_workflow"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("one_click_request_preview_promotion")
    );

    const boundary_targets = [
      scaffold,
      scaffold.keep_draft_hint,
      scaffold.clear_draft_hint,
      scaffold.promote_to_request_preview_hint,
      scaffold.draft_completeness_hint,
      ...scaffold.unavailable_control_surfaces,
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
