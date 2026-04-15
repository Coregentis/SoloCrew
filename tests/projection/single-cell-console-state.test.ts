import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  assembleSingleCellConsoleState,
} from "../../projection/assembly/single-cell-console-state.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] single-cell console state assembles all required sections with bounded truth", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-console-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused operator-native cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Prepare one console-ready structural state.",
    delivery_target: "Return one bounded console scaffold package.",
    active_work_count: 2,
    blocked_work_count: 0,
  });
  const console_state = assembleSingleCellConsoleState(assembly);

  assert.equal(console_state.console_scope, "single_cell_only");
  assert.equal(console_state.authority_boundary, "product_projection_only");
  assert.equal(console_state.phase_boundary, "runtime_adjacent_summary");
  assert.equal(console_state.broad_kpi_cockpit_available, false);
  assert.equal(console_state.multi_cell_portfolio_behavior_available, false);
  assert.equal(console_state.secretary_behavior_available, false);

  assert.ok(console_state.cell_identity_state);
  assert.ok(console_state.delivery_contract_state);
  assert.ok(console_state.crew_state);
  assert.ok(console_state.objective_state);
  assert.ok(console_state.execution_ledger_state);
  assert.ok(console_state.memory_and_evidence_state);
  assert.ok(console_state.optional_mount_state);
  assert.ok(console_state.continuity_truth_state);

  assert.equal(
    console_state.cell_identity_state.persisted_structural_truth.cell_id,
    "cell-01"
  );
  assert.equal(
    console_state.objective_state.persisted_structural_truth.current_objective_id,
    "objective-01"
  );
  assert.equal(
    console_state.crew_state.seeded_summary_truth.runtime_worker_state_available,
    false
  );
  assert.equal(
    console_state.execution_ledger_state.persisted_structural_truth.event_timeline_persisted,
    false
  );
  assert.equal(
    console_state.continuity_truth_state.persisted_structural_truth.continuity_status,
    "bounded_and_honest"
  );

  assert.equal(
    console_state.optional_mount_state.optional_mounts_present,
    false
  );
  assert.equal(console_state.optional_mount_state.all_mounts_deferred, true);
  assert.ok(
    console_state.deferred_surfaces.includes("provider_execution")
  );
  assert.ok(
    console_state.deferred_surfaces.includes("multi_cell_portfolio_behavior")
  );
  assert.ok(
    console_state.deferred_surfaces.includes("secretary_behavior")
  );
  assert.ok(
    console_state.truth_boundary_state.non_claims.includes(
      "no_broad_kpi_projection"
    )
  );

  const boundary_targets = [
    console_state,
    console_state.cell_identity_state,
    console_state.delivery_contract_state,
    console_state.crew_state,
    console_state.objective_state,
    console_state.execution_ledger_state,
    console_state.memory_and_evidence_state,
    console_state.optional_mount_state,
    console_state.continuity_truth_state,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
