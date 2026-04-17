import assert from "node:assert/strict";
import test from "node:test";

import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  assembleSingleCellConsoleState,
} from "../../projection/assembly/single-cell-console-state.ts";
import {
  assembleSingleCellViewModel,
} from "../../projection/assembly/single-cell-view-model.ts";

test("[projection] single-cell view-model keeps deferred surfaces explicit and avoids multi-cell or secretary drift", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-view-model-02",
    cell_id: "cell-02",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "delivery-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize one console-derived view model.",
    delivery_target: "Return one view-model scaffold with deferred mounts.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const console_state = assembleSingleCellConsoleState(assembly);
  const view_model = assembleSingleCellViewModel(console_state);

  assert.equal(
    view_model.header_view.delivery_posture,
    "attention"
  );
  assert.equal(
    view_model.objective_overview_view.near_term_execution_pressure,
    "stabilize_and_review"
  );

  assert.equal(
    view_model.deferred_surface_view.optional_mounts_present,
    true
  );
  assert.equal(
    view_model.deferred_surface_view.business_pack_mount_keys.length,
    1
  );
  assert.equal(
    view_model.deferred_surface_view.metrics_pack_mount_keys.length,
    1
  );
  assert.equal(
    view_model.deferred_surface_view.all_mounts_deferred,
    true
  );
  assert.equal(
    view_model.deferred_surface_view.any_mounted_mounts,
    false
  );
  assert.equal(
    view_model.deferred_surface_view.structural_availability,
    "bounded_structural_availability"
  );
  assert.equal(
    view_model.deferred_surface_view.execution_boundary,
    "non_executing_mount_only"
  );
  assert.equal(
    view_model.deferred_surface_view.business_pack_mount_postures[0],
    "deferred_unmounted_structural_mount"
  );
  assert.equal(
    view_model.deferred_surface_view.metrics_pack_mount_postures[0],
    "deferred_unmounted_structural_mount"
  );
  assert.equal(
    view_model.platform_coherence_view.section_key,
    "platform_coherence_view"
  );
  assert.equal(
    view_model.platform_coherence_view.platform_readiness_posture,
    "bounded_platform_baseline_only"
  );
  assert.equal(
    view_model.platform_coherence_view.execution_plane.execution_boundary,
    "non_executing"
  );
  assert.ok(
    view_model.platform_coherence_view.present_plane_keys.includes(
      "management_plane"
    )
  );
  assert.ok(
    view_model.platform_coherence_view.non_claims.includes(
      "no_plane_collapse_into_workflow_engine"
    )
  );
  assert.equal(
    view_model.platform_delivery_readiness_view.delivery_readiness_status,
    "planning_ready_not_delivery_ready"
  );
  assert.equal(
    view_model.platform_delivery_readiness_view.formal_delivery_ready_now,
    false
  );
  assert.ok(
    view_model.platform_delivery_readiness_view.truth_sources.includes(
      "repo_baseline_truth"
    )
  );
  assert.ok(
    view_model.platform_delivery_readiness_view.non_claims.includes(
      "no_readiness_triggered_actions"
    )
  );
  assert.ok(
    view_model.platform_delivery_readiness_view.deferred_items.includes(
      "formal_v1_delivery_gate"
    )
  );

  assert.ok(
    view_model.truth_boundary_view.persisted_structural_truth_sections.includes(
      "crew_state"
    )
  );
  assert.ok(
    view_model.truth_boundary_view.seeded_summary_truth_sections.includes(
      "objective_state"
    )
  );
  assert.ok(
    view_model.truth_boundary_view.deferred_unavailable_surfaces.includes(
      "multi_cell_portfolio_behavior"
    )
  );
  assert.ok(
    view_model.truth_boundary_view.non_claims.includes(
      "no_multi_cell_portfolio_truth"
    )
  );
  assert.ok(
    view_model.truth_boundary_view.non_claims.includes(
      "no_broad_kpi_projection"
    )
  );

  assert.equal(
    view_model.crew_overview_view.runtime_worker_state_available,
    false
  );
  assert.equal(
    view_model.workstream_or_workitem_overview_view.section_key,
    "workstream_or_workitem_overview_view"
  );
});
