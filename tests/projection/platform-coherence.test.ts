import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCrossPlanePlatformCoherenceState,
} from "../../projection/assembly/platform-coherence.ts";
import {
  assemblePackMountModelState,
} from "../../projection/assembly/pack-mount-model.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] cross-plane platform coherence stays product-projected and non-executing", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "platform-coherence-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Run one bounded cross-plane platform baseline.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline:
      "Align current platform planes without execution drift.",
    delivery_target:
      "Return one cross-plane coherence state for operator truth.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const optional_mount_state = assemblePackMountModelState({
    business_pack_mounts: assembly.constitution_state.business_pack_mounts,
    metrics_pack_mounts: assembly.constitution_state.metrics_pack_mounts,
  });
  const coherence_state = assembleCrossPlanePlatformCoherenceState({
    assembly,
    optional_mount_state,
    continuity_note:
      assembly.initial_cell_summary_seed.cell_summary_card.continuity_note,
  });

  assert.equal(
    coherence_state.authority_boundary,
    "product_projection_only"
  );
  assert.equal(coherence_state.coherence_mode, "cross_plane_platform_summary");
  assert.equal(coherence_state.execution_boundary, "non_executing");
  assert.equal(
    coherence_state.platform_readiness_posture,
    "bounded_platform_baseline_only"
  );
  assert.equal(coherence_state.runtime_authority_claimed, false);
  assert.equal(coherence_state.protocol_authority_claimed, false);
  assert.equal(coherence_state.present_plane_keys.length, 4);
  assert.equal(
    coherence_state.organization_plane.optional_mounts_present,
    true
  );
  assert.equal(
    coherence_state.organization_plane.structural_availability,
    "bounded_structural_availability"
  );
  assert.equal(
    coherence_state.organization_plane.mount_execution_boundary,
    "non_executing_mount_only"
  );
  assert.equal(
    coherence_state.execution_plane.work_item_timeline_available,
    false
  );
  assert.equal(
    coherence_state.memory_evidence_plane.full_evidence_graph_available,
    false
  );
  assert.ok(
    coherence_state.deferred_cross_plane_items.includes(
      "platform_delivery_readiness_surface"
    )
  );
  assert.ok(
    coherence_state.deferred_cross_plane_items.includes("provider_execution")
  );
  assert.ok(
    coherence_state.non_claims.includes("no_cross_plane_execution_ownership")
  );
  assert.match(
    coherence_state.cross_plane_summary,
    /bounded solo-operator baseline/
  );
  assert.match(
    coherence_state.omission_summary,
    /direct control semantics/
  );
});
