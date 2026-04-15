import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] single-cell structural initializer assembles one coherent constitutional package", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-init-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one focused solo-operator business cell.",
    business_scope: "solo-operator-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Ship the bounded structural assembly scaffold.",
    delivery_target: "Return one coherent structural initialization package.",
    projection_notes: ["structure-first only"],
  });

  assert.equal(assembly.assembly_scope, "single_cell_only");
  assert.equal(
    assembly.constitution_state.cell_charter.cell_id,
    assembly.initial_management_directive_seed.cell_id
  );
  assert.equal(
    assembly.constitution_state.cell_charter.cell_id,
    assembly.initial_cell_summary_seed.cell_summary_card.cell_id
  );

  assert.ok(assembly.constitution_state.cell_charter);
  assert.ok(assembly.constitution_state.delivery_contract);
  assert.ok(assembly.constitution_state.cell_policy_profile);
  assert.ok(assembly.constitution_state.ceo_orchestrator_contract);
  assert.ok(assembly.constitution_state.crew_blueprint);
  assert.ok(assembly.constitution_state.objective_portfolio);
  assert.ok(assembly.constitution_state.execution_ledger);
  assert.ok(assembly.constitution_state.memory_evidence_anchor);

  assert.equal(assembly.constitution_state.business_pack_mounts.length, 0);
  assert.equal(assembly.constitution_state.metrics_pack_mounts.length, 0);

  assert.equal(assembly.initial_cell_summary_seed.phase_boundary, "runtime_adjacent_summary");
  assert.equal(
    assembly.initial_cell_summary_seed.broad_kpi_cockpit_available,
    false
  );
  assert.equal(
    assembly.initial_cell_summary_seed.runtime_summary_claim,
    "bounded_seed_only"
  );

  assert.ok(
    assembly.deferred_items.includes("provider_execution")
  );
  assert.ok(
    assembly.deferred_items.includes("multi_cell_portfolio_behavior")
  );

  const structural_objects = [
    assembly.constitution_state.cell_charter,
    assembly.constitution_state.delivery_contract,
    assembly.constitution_state.cell_policy_profile,
    assembly.constitution_state.ceo_orchestrator_contract,
    assembly.constitution_state.crew_blueprint,
    assembly.constitution_state.objective_portfolio,
    assembly.constitution_state.execution_ledger,
    assembly.constitution_state.memory_evidence_anchor,
    assembly.initial_management_directive_seed,
    assembly.initial_cell_summary_seed.cell_summary_card,
  ];

  for (const object of structural_objects) {
    assert.equal(object.upward_runtime_authority, "forbidden");
    assert.equal(object.upward_protocol_authority, "forbidden");

    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in object, false);
    }
  }
});
