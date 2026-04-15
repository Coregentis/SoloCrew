import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator request-package scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.request_package_scaffold;
    const request_package = scaffold.current_request_package;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_request_package_scaffold"
    );
    assert.equal(
      scaffold.execution_boundary,
      "request_package_scaffold_only"
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

    assert.ok(
      request_package.package_fields_present.includes("current_focus")
    );
    assert.ok(
      request_package.package_fields_present.includes(
        "selected_action_intent"
      )
    );
    assert.ok(
      request_package.package_fields_present.includes(
        "correction_review_target"
      )
    );
    assert.ok(
      request_package.package_fields_present.includes("input_drafts")
    );
    assert.ok(
      request_package.package_fields_present.includes(
        "delivery_acceptance_context"
      )
    );
    assert.equal(
      request_package.current_focus.objective_focus_id,
      bootstrap.baseline_shell_session.shell.objective.objective_id
    );
    assert.ok(request_package.selected_action_intent);
    assert.equal(
      request_package.selected_action_intent?.intent_kind,
      "request_review"
    );
    assert.equal(
      request_package.selected_action_intent?.selection_confirmed,
      false
    );
    assert.equal(
      request_package.selected_action_intent?.selection_basis,
      "derived_default_from_current_truth"
    );
    assert.equal(
      request_package.correction_review_target.target_scope,
      "objective"
    );
    assert.ok(
      request_package.input_drafts.some(
        (draft) => draft.draft_kind === "objective_note_draft"
      )
    );
    assert.ok(
      request_package.input_drafts.some(
        (draft) => draft.draft_kind === "selected_action_intent_draft"
      )
    );
    assert.equal(
      request_package.delivery_acceptance_context.acceptance_status,
      bootstrap.delivery_acceptance_scaffold.current_delivery_contract_summary
        .acceptance_status
    );
    assert.ok(
      scaffold.unavailable_request_surfaces.some(
        (surface) =>
          surface.surface_id === "provider_backed_request_submission"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_provider_backed_request_submission"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("persistent_request_package_history")
    );

    const boundary_targets = [
      scaffold,
      request_package,
      request_package.current_focus,
      ...(request_package.selected_action_intent
        ? [request_package.selected_action_intent]
        : []),
      request_package.correction_review_target,
      ...request_package.input_drafts,
      request_package.delivery_acceptance_context,
      ...scaffold.unavailable_request_surfaces,
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
