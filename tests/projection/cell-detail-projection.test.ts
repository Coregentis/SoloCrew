import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCellDetailProjectionFromRuntimeInput,
} from "../../projection/assembly/cell-detail-projection.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE,
} from "../../projection/contracts/runtime-backed-management-projection-contract.ts";
import {
  createWorkforceCellProjectionInputWithManagement,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";

test("[projection] cell detail projection stays product-projected when derived from upstream runtime-backed inputs", () => {
  const detail_projection = assembleCellDetailProjectionFromRuntimeInput(
    createWorkforceCellProjectionInputWithManagement({
      delivery_posture: "blocked",
    })
  );

  assert.equal(detail_projection.detail_scope, "cell_detail_projection");
  assert.equal(detail_projection.authority_boundary, "product_projection_only");
  assert.equal(detail_projection.phase_boundary, "runtime_adjacent_detail");
  assert.equal(detail_projection.source_mode, "upstream_projection_safe_envelope");
  assert.equal(detail_projection.detail_projection_is_runtime_law, false);
  assert.equal(detail_projection.secretary_behavior_available, false);
  assert.equal(detail_projection.provider_execution_available, false);
  assert.equal(detail_projection.channel_entry_available, false);
  assert.equal(detail_projection.executable_management_actions_available, false);
  assert.equal(detail_projection.summary_projection.summary_projection_is_runtime_law, false);
  assert.equal(detail_projection.cell_identity.scope_status, "active");
  assert.equal(
    detail_projection.objective_and_work_status.blocked_signal,
    "blocked_attention_visible"
  );
  assert.equal(
    detail_projection.management_object_family.management_directive_status,
    "present_non_executable"
  );
  assert.equal(
    detail_projection.management_object_family.management_directive
      ?.projection_object_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE
  );
  assert.equal(
    detail_projection.management_object_family.management_directive
      ?.phase_boundary,
    "runtime_adjacent_detail"
  );
  assert.equal(
    detail_projection.management_object_family.management_directive
      ?.upstream_origin,
    "runtime_private_record_projection"
  );
  assert.equal(
    detail_projection.management_object_family.management_directive
      ?.upstream_record_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_UPSTREAM_RECORD_TYPE
  );
  assert.equal(
    detail_projection.management_object_family.management_directive
      ?.executable_actions_available,
    false
  );
  assert.equal(
    detail_projection.management_object_family.delivery_return_status,
    "present_non_executable"
  );
  assert.equal(
    detail_projection.management_object_family.approval_request_status,
    "present_non_executable"
  );
  assert.equal(
    detail_projection.management_object_family.approval_request
      ?.affected_objective_id,
    "objective-01"
  );
  assert.equal(detail_projection.upstream_refs.length, 4);
  assert.ok(
    detail_projection.truth_sources.includes("upstream_projection_safe_envelope")
  );
  assert.ok(
    detail_projection.non_claims.includes(
      "no_shared_object_identity_with_runtime_private_record"
    )
  );
  assert.ok(
    detail_projection.management_object_family.management_directive?.projection_notes.some(
      (note) =>
        note.includes(
          "does not reuse compile-phase directive identity"
        )
    )
  );

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in detail_projection, false);
  }
});
