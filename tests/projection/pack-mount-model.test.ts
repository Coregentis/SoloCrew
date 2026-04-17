import assert from "node:assert/strict";
import test from "node:test";

import {
  assemblePackMountModelState,
} from "../../projection/assembly/pack-mount-model.ts";
import {
  createBusinessPackMount,
  createMetricsPackMount,
} from "../../projection/objects/cell-constitution.ts";

test("[projection] pack mount model stays structural-only and non-executing", () => {
  const state = assemblePackMountModelState({
    business_pack_mounts: [
      createBusinessPackMount({
        projection_id: "business-pack-mount-proj",
        business_pack_mount_id: "business-pack-mount-01",
        cell_id: "cell-01",
        mount_key: "growth-pack",
        mount_scope: "cell",
        mount_status: "mounted",
      }),
    ],
    metrics_pack_mounts: [
      createMetricsPackMount({
        projection_id: "metrics-pack-mount-proj",
        metrics_pack_mount_id: "metrics-pack-mount-01",
        cell_id: "cell-01",
        mount_key: "delivery-metrics",
        mount_scope: "cell",
        mount_status: "unmounted",
      }),
    ],
  });

  assert.equal(state.optional_mounts_present, true);
  assert.equal(state.all_mounts_deferred, true);
  assert.equal(state.any_mounted_mounts, true);
  assert.equal(
    state.structural_availability,
    "bounded_structural_availability"
  );
  assert.equal(state.execution_boundary, "non_executing_mount_only");

  assert.equal(state.business_pack_mounts[0]?.mount_status, "mounted");
  assert.equal(
    state.business_pack_mounts[0]?.posture_summary,
    "deferred_mounted_structural_mount"
  );
  assert.equal(
    state.business_pack_mounts[0]?.direct_controls_available,
    false
  );
  assert.equal(
    state.business_pack_mounts[0]?.provider_or_channel_execution_available,
    false
  );
  assert.equal(
    state.business_pack_mounts[0]?.runtime_authority_claimed,
    false
  );
  assert.equal(
    state.business_pack_mounts[0]?.protocol_authority_claimed,
    false
  );

  assert.equal(state.metrics_pack_mounts[0]?.mount_status, "unmounted");
  assert.equal(
    state.metrics_pack_mounts[0]?.posture_summary,
    "deferred_unmounted_structural_mount"
  );
  assert.equal(
    state.metrics_pack_mounts[0]?.direct_controls_available,
    false
  );
  assert.equal(
    state.metrics_pack_mounts[0]?.provider_or_channel_execution_available,
    false
  );
  assert.equal(
    state.metrics_pack_mounts[0]?.runtime_authority_claimed,
    false
  );
  assert.equal(
    state.metrics_pack_mounts[0]?.protocol_authority_claimed,
    false
  );
});
