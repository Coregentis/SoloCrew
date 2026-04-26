import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCellDetailProjectionFromRuntimeInput,
} from "../../projection/assembly/cell-detail-projection.ts";
import {
  assembleContinuityInspectionProjection,
} from "../../projection/assembly/continuity-inspection.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createWorkforceCellProjectionInput,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";

test("[projection] continuity inspection stays product-projected when derived from runtime-backed detail truth", () => {
  const detail_projection = assembleCellDetailProjectionFromRuntimeInput(
    createWorkforceCellProjectionInput({
      delivery_posture: "blocked",
    })
  );
  const continuity_projection =
    assembleContinuityInspectionProjection(detail_projection);

  assert.equal(continuity_projection.inspection_scope, "continuity_inspection");
  assert.equal(continuity_projection.authority_boundary, "product_projection_only");
  assert.equal(continuity_projection.phase_boundary, "runtime_adjacent_detail");
  assert.equal(continuity_projection.source_mode, "upstream_projection_safe_envelope");
  assert.equal(continuity_projection.continuity_projection_is_runtime_law, false);
  assert.equal(continuity_projection.secretary_behavior_available, false);
  assert.equal(continuity_projection.provider_execution_available, false);
  assert.equal(continuity_projection.channel_entry_available, false);
  assert.equal(continuity_projection.executable_continuity_actions_available, false);
  assert.equal(
    continuity_projection.source_detail_projection_id,
    detail_projection.detail_projection_id
  );
  assert.equal(
    continuity_projection.continuity_snapshot.continuity_visibility,
    "runtime_backed_visible"
  );
  assert.equal(
    continuity_projection.continuity_snapshot.continuity_state,
    "blocked_visible"
  );
  assert.equal(continuity_projection.upstream_refs.length, 1);
  assert.deepEqual(
    continuity_projection.upstream_refs.map((ref) => ref.upstream_object_type),
    ["workforce_projection_safe_envelope"]
  );
  assert.ok(
    continuity_projection.bounded_knowledge.known_inputs.includes(
      "projection_safe_workforce_envelope_presence"
    )
  );
  assert.ok(
    continuity_projection.non_claims.includes(
      "no_shared_object_identity_with_runtime_private_record"
    )
  );

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in continuity_projection, false);
  }
});
