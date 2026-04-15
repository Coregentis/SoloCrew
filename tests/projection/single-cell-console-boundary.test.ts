import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleSingleCellConsoleState,
} from "../../projection/assembly/single-cell-console-state.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] single-cell console state keeps optional mounts deferred and avoids portfolio or secretary drift", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-console-02",
    cell_id: "cell-02",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "delivery-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize console-facing structural truth.",
    delivery_target: "Return one console state scaffold with deferred mounts.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const console_state = assembleSingleCellConsoleState(assembly);

  assert.equal(
    console_state.objective_state.seeded_summary_truth.near_term_execution_pressure,
    "stabilize_and_review"
  );
  assert.equal(
    console_state.optional_mount_state.optional_mounts_present,
    true
  );
  assert.equal(console_state.optional_mount_state.all_mounts_deferred, true);
  assert.equal(
    console_state.optional_mount_state.business_pack_mounts.length,
    1
  );
  assert.equal(
    console_state.optional_mount_state.metrics_pack_mounts.length,
    1
  );
  assert.equal(
    console_state.optional_mount_state.business_pack_mounts[0]?.implementation_status,
    "deferred_mount"
  );
  assert.equal(
    console_state.optional_mount_state.metrics_pack_mounts[0]?.implementation_status,
    "deferred_mount"
  );

  assert.equal(
    console_state.continuity_truth_state.seeded_summary_truth.runtime_summary_claim,
    "bounded_seed_only"
  );
  assert.equal(
    console_state.continuity_truth_state.seeded_summary_truth.management_surface_scope,
    "single_cell_only"
  );
  assert.ok(
    console_state.continuity_truth_state.non_claims.includes(
      "no_event_timeline_truth"
    )
  );
  assert.ok(
    console_state.continuity_truth_state.non_claims.includes(
      "no_secretary_behavior_truth"
    )
  );
  assert.ok(
    console_state.continuity_truth_state.non_claims.includes(
      "no_multi_cell_portfolio_truth"
    )
  );

  assert.ok(
    console_state.delivery_contract_state.deferred_unavailable_surfaces.includes(
      "delivery_acceptance_workflow_runtime"
    )
  );
  assert.ok(
    console_state.truth_boundary_state.persisted_structural_truth_sections.includes(
      "cell_identity_state"
    )
  );
  assert.ok(
    console_state.truth_boundary_state.seeded_summary_truth_sections.includes(
      "continuity_truth_state"
    )
  );
});
