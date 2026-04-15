import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator readiness summary scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.readiness_summary_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_readiness_summary_scaffold"
    );
    assert.equal(scaffold.execution_boundary, "summary_only");
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

    assert.equal(scaffold.overall_readiness_level, "ready_with_known_gaps");
    assert.equal(scaffold.ready_facet_count, 2);
    assert.equal(scaffold.incomplete_or_blocked_facet_count, 3);
    assert.equal(
      scaffold.current_focus_readiness.readiness_level,
      "ready_now"
    );
    assert.equal(
      scaffold.request_package_readiness.readiness_level,
      "ready_with_known_gaps"
    );
    assert.equal(
      scaffold.review_preview_readiness.readiness_level,
      "ready_with_known_gaps"
    );
    assert.equal(
      scaffold.delivery_acceptance_readiness.readiness_level,
      "ready_now"
    );
    assert.equal(
      scaffold.in_session_draft_readiness.readiness_level,
      "waiting_for_operator_input"
    );
    assert.ok(
      scaffold.deferred_or_unavailable_readiness_blockers.some(
        (blocker) =>
          blocker.blocker_id === "selected_action_intent_confirmation" &&
          blocker.blocker_kind === "missing_input"
      )
    );
    assert.ok(
      scaffold.deferred_or_unavailable_readiness_blockers.some(
        (blocker) =>
          blocker.blocker_id === "provider_backed_request_submission" &&
          blocker.blocker_kind === "deferred_surface"
      )
    );
    assert.ok(
      scaffold.deferred_or_unavailable_readiness_blockers.some(
        (blocker) =>
          blocker.blocker_id === "one_click_request_preview_promotion" &&
          blocker.blocker_kind === "unavailable_surface"
      )
    );
    assert.ok(
      scaffold.non_claims.includes("no_runtime_complete_readiness_summary")
    );
    assert.ok(
      bootstrap.deferred_items.includes("one_click_request_preview_promotion")
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_focus_readiness,
      scaffold.request_package_readiness,
      scaffold.review_preview_readiness,
      scaffold.delivery_acceptance_readiness,
      scaffold.in_session_draft_readiness,
      ...scaffold.deferred_or_unavailable_readiness_blockers,
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
