import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_CREW_COMPILER_INPUT_FAMILIES,
} from "../../projection/contracts/single-cell-assembly-contract.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] single-cell compile-input and summary seeds stay bounded and structure-first", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "single-cell-init-02",
    cell_id: "cell-02",
    cell_name: "Growth Cell",
    operator_id: "operator-01",
    mission: "Operate one bounded delivery cell.",
    business_scope: "growth-ops",
    current_objective_id: "objective-02",
    current_objective_headline: "Stabilize the next structural delivery path.",
    delivery_target: "Produce one operator-reviewable delivery package.",
    blocked_work_count: 1,
    active_work_count: 3,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });

  assert.equal(assembly.compile_input_seed.phase_boundary, "compile_phase_only");
  assert.deepEqual(
    assembly.compile_input_seed.input_families,
    SOLOCREW_CREW_COMPILER_INPUT_FAMILIES
  );
  assert.equal(
    assembly.compile_input_seed.compiler_role,
    "crew_compiler"
  );

  assert.equal(
    assembly.compile_input_seed.management_directive.object_type,
    "management-directive"
  );
  assert.equal(
    assembly.compile_input_seed.cell_constitutional_state.cell_charter.object_type,
    "cell-charter"
  );
  assert.equal(
    assembly.compile_input_seed.objective_context.current_objective_id,
    "objective-02"
  );
  assert.equal(
    assembly.compile_input_seed.objective_context.near_term_execution_pressure,
    "stabilize_and_review"
  );

  assert.ok(
    assembly.compile_input_seed.capability_supply.available_runtime_surfaces.includes(
      "bounded_action_dispatch_contract"
    )
  );
  assert.ok(
    assembly.compile_input_seed.capability_supply.explicitly_absent_capabilities.includes(
      "provider_execution"
    )
  );
  assert.ok(
    assembly.compile_input_seed.constraint_set.runtime_non_claims.includes(
      "no_live_provider_execution"
    )
  );
  assert.ok(
    assembly.compile_input_seed.constraint_set.product_boundary_rules.includes(
      "management_is_not_broad_kpi_cockpit"
    )
  );

  assert.equal(
    assembly.initial_cell_summary_seed.management_surface_scope,
    "single_cell_only"
  );
  assert.equal(
    assembly.initial_cell_summary_seed.cell_summary_card.delivery_posture,
    "attention"
  );
  assert.ok(
    assembly.initial_cell_summary_seed.deferred_items.includes(
      "runtime_complete_summary_projection"
    )
  );

  assert.equal(
    assembly.constitution_state.business_pack_mounts.length,
    1
  );
  assert.equal(
    assembly.constitution_state.metrics_pack_mounts.length,
    1
  );
  assert.equal(
    assembly.constitution_state.business_pack_mounts[0]?.implementation_status,
    "deferred_mount"
  );
  assert.equal(
    assembly.constitution_state.metrics_pack_mounts[0]?.phase_boundary,
    "optional_mount"
  );
});
