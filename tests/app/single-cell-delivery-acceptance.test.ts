import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell delivery acceptance scaffold assembles coherently and stays bounded", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    const scaffold = bootstrap.delivery_acceptance_scaffold;

    assert.equal(scaffold.scaffold_scope, "single_cell_only");
    assert.equal(scaffold.operator_surface, "single_cell_console");
    assert.equal(
      scaffold.authority_boundary,
      "app_shell_projection_consumer"
    );
    assert.equal(
      scaffold.phase_boundary,
      "delivery_acceptance_scaffold"
    );
    assert.equal(
      scaffold.execution_boundary,
      "acceptance_scaffold_only"
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
      scaffold.current_delivery_contract_summary.delivery_contract_id,
      bootstrap.structural_assembly.constitution_state.delivery_contract.delivery_contract_id
    );
    assert.equal(
      scaffold.current_delivery_contract_summary.return_shape,
      bootstrap.structural_assembly.constitution_state.delivery_contract.return_shape
    );
    assert.ok(
      scaffold.acceptance_criteria_visibility.some(
        (criterion) => criterion.criterion_id === "delivery_target_visible"
      )
    );
    assert.ok(
      scaffold.acceptance_criteria_visibility.some(
        (criterion) => criterion.criterion_id === "return_shape_visible"
      )
    );
    assert.ok(
      scaffold.completed_acceptance_signals.some(
        (signal) => signal.signal_id === "delivery_contract_summary_visible"
      )
    );
    assert.equal(
      scaffold.current_delivery_contract_summary.acceptance_status,
      "criteria_visible_ready_for_bounded_review"
    );
    assert.equal(
      scaffold.unmet_or_deferred_acceptance_signals.some(
        (signal) => signal.signal_id === "blocked_work_visible"
      ),
      false
    );
    assert.ok(
      scaffold.unmet_or_deferred_acceptance_signals.some(
        (signal) =>
          signal.signal_id === "delivery_acceptance_workflow_runtime" &&
          signal.signal_status === "deferred"
      )
    );
    assert.ok(
      scaffold.unavailable_acceptance_surfaces.some(
        (surface) => surface.surface_id === "provider_acceptance_verification"
      )
    );
    assert.ok(
      scaffold.non_claims.includes(
        "no_provider_backed_acceptance_verification"
      )
    );
    assert.ok(
      bootstrap.deferred_items.includes("delivery_acceptance_workflow_runtime")
    );

    const boundary_targets = [
      scaffold,
      scaffold.current_delivery_contract_summary,
      ...scaffold.acceptance_criteria_visibility,
      ...scaffold.completed_acceptance_signals,
      ...scaffold.unmet_or_deferred_acceptance_signals,
      ...scaffold.unavailable_acceptance_surfaces,
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
