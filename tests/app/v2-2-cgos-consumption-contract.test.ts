import assert from "node:assert/strict";
import test from "node:test";

import {
  CGOS_CONSUMPTION_SOURCE_OF_TRUTH,
  REQUIRED_V2_2_KERNEL_DUTY_IDS,
  REQUIRED_V2_2_MODULE_POSTURE_NAMES,
  assert_cgos_projection_safe_consumption,
  create_default_cgos_projection_safe_consumption,
} from "../../app/cgos/cgos-projection-safe-consumption-contract.ts";

test("[v2.2] CGOS consumption contract stores posture refs and bounded summaries", () => {
  const consumption =
    create_default_cgos_projection_safe_consumption("workspace-contract-test");

  assert.equal(
    consumption.source_of_truth,
    CGOS_CONSUMPTION_SOURCE_OF_TRUTH
  );
  assert.equal(consumption.non_executing, true);
  assert.equal(consumption.runtime_private_fields_omitted, true);
  assert.equal(
    consumption.projection_safe_runtime_envelope_ref.source_repo,
    "Cognitive_OS"
  );
  assert.equal(
    consumption.state_snapshot_posture_ref.posture_kind,
    "state_snapshot"
  );
  assert.equal(
    consumption.transaction_export_posture_ref.posture_kind,
    "transaction_export"
  );
  assert.equal(
    consumption.error_insufficiency_posture_ref.posture_kind,
    "error_insufficiency"
  );

  assert.deepEqual(
    [...consumption.required_module_posture_names].sort(),
    [...REQUIRED_V2_2_MODULE_POSTURE_NAMES].sort()
  );
  assert.deepEqual(
    [...consumption.required_kernel_duty_ids].sort(),
    [...REQUIRED_V2_2_KERNEL_DUTY_IDS].sort()
  );

  assert.ok(consumption.module_posture_summary.length >= 5);
  assert.ok(consumption.kernel_duty_posture_summary.length >= 6);
  assert.ok(consumption.object_export_binding_posture_refs.length >= 1);
  assert.ok(consumption.safe_evidence_refs.length >= 1);
  assert.ok(consumption.omission_markers.length >= 1);
  assert.ok(consumption.protocol_version_refs.length >= 1);
  assert.ok(consumption.binding_version_refs.length >= 1);

  assert_cgos_projection_safe_consumption(consumption);
});

test("[v2.2] CGOS consumption contract does not expose raw runtime-private payload fields", () => {
  const consumption =
    create_default_cgos_projection_safe_consumption("workspace-boundary-test");
  const serialized = JSON.stringify(consumption);

  assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
  assert.doesNotMatch(serialized, /raw_state_store_payload/i);
  assert.doesNotMatch(serialized, /raw_transaction_store_payload/i);
  assert.doesNotMatch(serialized, /raw_error_payload/i);
  assert.doesNotMatch(serialized, /MPLP certification/i);
  assert.doesNotMatch(serialized, /MPLP endorsement/i);
});
