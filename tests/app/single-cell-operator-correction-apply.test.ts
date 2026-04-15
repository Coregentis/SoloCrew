import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator correction/apply path reuses sealed v0.1 truth and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    session_draft_state: {
      correction_text_draft_value:
        "Tighten the current objective phrasing into one reviewable delivery sentence.",
      review_request_draft_value:
        "Request one bounded recheck of the current delivery framing.",
      selected_action_intent_draft_value: "apply_correction",
    },
    correction_apply: {
      apply_now: true,
      target_scope: "objective",
    },
  });

  try {
    const scaffold = bootstrap.correction_apply_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_correction_apply_path"
    );
    assert.equal(scaffold.execution_boundary, "console_apply_path_only");
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
    assert.equal(scaffold.current_apply_status, "applied_in_session");
    assert.equal(scaffold.current_apply_target.target_scope, "objective");
    assert.equal(
      scaffold.current_apply_target.runtime_mapping_target,
      "objective"
    );
    assert.equal(
      scaffold.current_apply_input.correction_summary_source,
      "correction_text_draft"
    );
    assert.equal(
      scaffold.current_apply_input.corrected_value_source,
      "selected_action_intent_draft"
    );
    assert.equal(scaffold.current_apply_input.operator_input_ready, true);
    assert.equal(
      scaffold.current_apply_input.selected_action_intent_kind,
      "apply_correction"
    );
    assert.equal(
      scaffold.applied_update_result?.writeback_disposition,
      "applied"
    );
    assert.equal(
      scaffold.applied_update_result?.correction_target,
      "objective"
    );
    assert.equal(
      scaffold.applied_update_result?.updated_recent_correction_visible_in_session,
      true
    );
    assert.equal(
      scaffold.applied_update_result?.updated_preference_continuity_visible,
      true
    );
    assert.ok(
      (scaffold.applied_update_result?.updated_review_strip_changed_preferences_count ??
        0) > 0
    );
    assert.ok(
      scaffold.unavailable_apply_surfaces.some(
        (surface) =>
          surface.surface_id === "provider_backed_correction_apply"
      )
    );
    assert.ok(
      scaffold.unavailable_apply_surfaces.some(
        (surface) =>
          surface.surface_id === "persistent_correction_apply_timeline"
      )
    );
    assert.ok(
      scaffold.deferred_items.includes("persistent_review_timeline")
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_runtime_complete_correction_apply_workflow"
      )
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_apply_target,
      scaffold.current_apply_input,
      scaffold.current_visible_truth,
      ...(scaffold.applied_update_result
        ? [scaffold.applied_update_result]
        : []),
      ...scaffold.unavailable_apply_surfaces,
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
