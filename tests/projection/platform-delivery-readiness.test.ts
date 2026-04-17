import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCrossPlanePlatformCoherenceState,
} from "../../projection/assembly/platform-coherence.ts";
import {
  assemblePlatformDeliveryReadinessState,
} from "../../projection/assembly/platform-delivery-readiness.ts";
import {
  assemblePackMountModelState,
} from "../../projection/assembly/pack-mount-model.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] platform delivery readiness stays product-projected and non-executing", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "platform-delivery-readiness-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Shape one bounded platform summary read.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline:
      "Explain current readiness without execution drift.",
    delivery_target:
      "Return one bounded platform summary and delivery-readiness state.",
    active_work_count: 3,
    blocked_work_count: 1,
    business_pack_mount_keys: ["growth-pack"],
    metrics_pack_mount_keys: ["delivery-metrics"],
  });
  const optional_mount_state = assemblePackMountModelState({
    business_pack_mounts: assembly.constitution_state.business_pack_mounts,
    metrics_pack_mounts: assembly.constitution_state.metrics_pack_mounts,
  });
  const platform_coherence_state = assembleCrossPlanePlatformCoherenceState({
    assembly,
    optional_mount_state,
    continuity_note:
      assembly.initial_cell_summary_seed.cell_summary_card.continuity_note,
  });
  const delivery_readiness_state = assemblePlatformDeliveryReadinessState({
    assembly,
    optional_mount_state,
    platform_coherence_state,
    continuity_note:
      assembly.initial_cell_summary_seed.cell_summary_card.continuity_note,
  });

  assert.equal(
    delivery_readiness_state.authority_boundary,
    "product_projection_only"
  );
  assert.equal(
    delivery_readiness_state.summary_mode,
    "platform_summary_and_delivery_readiness"
  );
  assert.equal(
    delivery_readiness_state.execution_boundary,
    "non_executing"
  );
  assert.equal(
    delivery_readiness_state.platform_posture,
    "bounded_platform_baseline_only"
  );
  assert.equal(
    delivery_readiness_state.delivery_readiness_status,
    "planning_ready_not_delivery_ready"
  );
  assert.equal(delivery_readiness_state.formal_delivery_ready_now, false);
  assert.equal(
    delivery_readiness_state.current_readiness_blocker,
    "runtime_dependent_downstream_truth_hardening"
  );
  assert.ok(
    delivery_readiness_state.present_capabilities.some(
      (capability) =>
        capability.capability_key === "bounded_pack_mount_model"
    )
  );
  assert.ok(
    delivery_readiness_state.present_capabilities.some(
      (capability) =>
        capability.capability_key === "bounded_explanatory_beta_lane"
    )
  );
  assert.ok(
    delivery_readiness_state.deferred_capabilities.some(
      (capability) =>
        capability.capability_key === "formal_v1_delivery_gate"
    )
  );
  assert.ok(
    delivery_readiness_state.deferred_items.includes(
      "runtime_dependent_downstream_truth_hardening"
    )
  );
  assert.ok(
    delivery_readiness_state.non_claims.includes(
      "no_readiness_triggered_actions"
    )
  );
  assert.ok(
    delivery_readiness_state.non_claims.includes(
      "no_formal_v1_delivery_claim"
    )
  );
  assert.match(
    delivery_readiness_state.summary_text,
    /bounded pre-delivery read/
  );
  assert.match(
    delivery_readiness_state.omission_summary,
    /runtime-dependent downstream truth hardening/
  );
});
