import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  assembleSingleCellConsoleState,
} from "../../projection/assembly/single-cell-console-state.ts";
import {
  assembleSingleCellViewModel,
} from "../../projection/assembly/single-cell-view-model.ts";

test("[projection] single-cell view-model assembles all required UI-adjacent sections with bounded truth", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-view-model-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused operator-native cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Prepare one bounded view-model scaffold.",
    delivery_target: "Return one UI-adjacent structural package.",
    active_work_count: 2,
    blocked_work_count: 1,
  });
  const console_state = assembleSingleCellConsoleState(assembly);
  const view_model = assembleSingleCellViewModel(console_state);

  assert.equal(view_model.view_scope, "single_cell_only");
  assert.equal(view_model.authority_boundary, "product_projection_only");
  assert.equal(view_model.phase_boundary, "ui_adjacent_projection");
  assert.equal(view_model.actual_ui_pages_present, false);
  assert.equal(view_model.broad_kpi_cockpit_available, false);
  assert.equal(view_model.multi_cell_portfolio_behavior_available, false);
  assert.equal(view_model.secretary_behavior_available, false);

  assert.ok(view_model.header_view);
  assert.ok(view_model.delivery_view);
  assert.ok(view_model.crew_overview_view);
  assert.ok(view_model.objective_overview_view);
  assert.ok(view_model.workstream_or_workitem_overview_view);
  assert.ok(view_model.memory_and_continuity_view);
  assert.ok(view_model.deferred_surface_view);
  assert.ok(view_model.truth_boundary_view);

  assert.equal(view_model.header_view.cell_name, "Solo Operator Cell");
  assert.equal(view_model.objective_overview_view.current_objective_id, "objective-01");
  assert.equal(
    view_model.workstream_or_workitem_overview_view.actual_runtime_work_item_projection_available,
    false
  );
  assert.equal(
    view_model.workstream_or_workitem_overview_view.work_item_timeline_available,
    false
  );
  assert.equal(
    view_model.memory_and_continuity_view.continuity_status,
    "bounded_and_honest"
  );

  assert.ok(
    view_model.deferred_surface_view.deferred_surfaces.includes(
      "provider_execution"
    )
  );
  assert.ok(
    view_model.truth_boundary_view.non_claims.includes(
      "no_actual_ui_page_implementation"
    )
  );
  assert.ok(
    view_model.truth_boundary_view.non_claims.includes(
      "no_secretary_behavior_truth"
    )
  );

  const boundary_targets = [
    view_model,
    view_model.header_view,
    view_model.delivery_view,
    view_model.crew_overview_view,
    view_model.objective_overview_view,
    view_model.workstream_or_workitem_overview_view,
    view_model.memory_and_continuity_view,
    view_model.deferred_surface_view,
    view_model.truth_boundary_view,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
