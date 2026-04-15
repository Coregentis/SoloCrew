import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator request review / submit-preview scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.request_review_submit_preview_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "operator_request_review_submit_preview_scaffold"
    );
    assert.equal(scaffold.execution_boundary, "submit_preview_only");
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
      scaffold.current_request_package_summary.request_package_id,
      bootstrap.request_package_scaffold.current_request_package
        .request_package_id
    );
    assert.equal(
      scaffold.review_preview_state.reviewability_status,
      "review_ready_now"
    );
    assert.equal(
      scaffold.review_preview_state.previewability_status,
      "preview_ready_now"
    );
    assert.equal(
      scaffold.review_preview_state.incomplete_request,
      true
    );
    assert.equal(
      scaffold.submit_preview_status,
      "preview_ready_submit_unavailable"
    );
    assert.ok(
      scaffold.completeness_signals.some(
        (signal) =>
          signal.signal_id === "selected_action_intent_packaged" &&
          signal.signal_status === "satisfied_now"
      )
    );
    assert.ok(
      scaffold.completeness_signals.some(
        (signal) =>
          signal.signal_id === "selected_action_intent_confirmation" &&
          signal.signal_status === "missing_now"
      )
    );
    assert.ok(
      scaffold.completeness_signals.some(
        (signal) =>
          signal.signal_id === "operator_input_payload_present" &&
          signal.signal_status === "missing_now"
      )
    );
    assert.ok(
      scaffold.missing_or_deferred_fields.some(
        (field) =>
          field.field_id === "selected_action_intent_confirmation" &&
          field.field_status === "missing_now"
      )
    );
    assert.ok(
      scaffold.missing_or_deferred_fields.some(
        (field) =>
          field.field_id === "operator_input_payload" &&
          field.field_status === "missing_now"
      )
    );
    assert.ok(
      scaffold.future_submit_dependencies.includes(
        "Operator confirmation of selected action intent"
      )
    );
    assert.ok(
      scaffold.unavailable_submit_surfaces.some(
        (surface) =>
          surface.surface_id === "provider_backed_request_submission"
      )
    );
    assert.ok(
      scaffold.non_claims.includes("no_actual_request_submission")
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_runtime_complete_request_submit_workflow"
      )
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_request_package_summary,
      scaffold.review_preview_state,
      ...scaffold.completeness_signals,
      ...scaffold.missing_or_deferred_fields,
      ...scaffold.unavailable_submit_surfaces,
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
