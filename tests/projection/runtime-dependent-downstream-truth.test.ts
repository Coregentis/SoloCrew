import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCrossPlanePlatformCoherenceState,
} from "../../projection/assembly/platform-coherence.ts";
import {
  assembleRuntimeDependentDownstreamTruthState,
} from "../../projection/assembly/runtime-dependent-downstream-truth.ts";
import {
  assemblePackMountModelState,
} from "../../projection/assembly/pack-mount-model.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";

test("[projection] runtime-dependent downstream truth stays product-projected and non-executing", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "runtime-dependent-downstream-truth-01",
    cell_id: "cell-01",
    cell_name: "Solo Operator Cell",
    operator_id: "operator-01",
    mission: "Harden bounded downstream truth without authority drift.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline:
      "Explain current confirm and trace posture downstream.",
    delivery_target:
      "Return one bounded runtime-dependent downstream truth state.",
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
  const truth_state = assembleRuntimeDependentDownstreamTruthState({
    assembly,
    platform_coherence_state,
    continuity_note:
      assembly.initial_cell_summary_seed.cell_summary_card.continuity_note,
  });

  assert.equal(truth_state.truth_scope, "single_cell_only");
  assert.equal(truth_state.authority_boundary, "product_projection_only");
  assert.equal(
    truth_state.interpretation_mode,
    "runtime_dependent_downstream_truth_hardening"
  );
  assert.equal(truth_state.execution_boundary, "non_executing");
  assert.equal(
    truth_state.truth_status,
    "bounded_upstream_supported_interpretation"
  );
  assert.equal(
    truth_state.confirm_visibility_status,
    "supported_in_current_upstream_truth"
  );
  assert.equal(
    truth_state.trace_visibility_status,
    "supported_in_current_upstream_truth"
  );
  assert.equal(
    truth_state.evidence_visibility_status,
    "bounded_and_omission_aware"
  );
  assert.equal(
    truth_state.context_export_status,
    "explicitly_unavailable_in_current_upstream_truth"
  );
  assert.equal(
    truth_state.plan_export_status,
    "explicitly_unavailable_in_current_upstream_truth"
  );
  assert.equal(
    truth_state.upstream_workflow_truth_status,
    "not_adopted_upstream"
  );
  assert.ok(
    truth_state.supported_upstream_truths.some((item) =>
      item.includes("bounded Confirm export")
    )
  );
  assert.ok(
    truth_state.unavailable_truths.some((item) =>
      item.includes("Context reconstruction")
    )
  );
  assert.ok(
    truth_state.non_claims.includes("no_local_workflow_law_invention")
  );
  assert.ok(
    truth_state.non_claims.includes("no_trace_as_execution_authorization")
  );
  assert.match(truth_state.summary_text, /Confirm and Trace posture/);
  assert.match(
    truth_state.delivery_interpretation_summary,
    /review posture is/
  );
});
