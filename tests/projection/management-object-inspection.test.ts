import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCellDetailProjectionFromRuntimeInput,
} from "../../projection/assembly/cell-detail-projection.ts";
import {
  assembleManagementObjectInspectionProjection,
} from "../../projection/assembly/management-object-inspection.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE,
  RUNTIME_BACKED_MANAGEMENT_PROJECTION_OBJECT_TYPES,
} from "../../projection/contracts/runtime-backed-management-projection-contract.ts";
import {
  createWorkforceCellProjectionInputWithManagement,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";

test("[projection] management-object inspection stays product-projected when derived from runtime-backed detail truth", () => {
  const detail_projection = assembleCellDetailProjectionFromRuntimeInput(
    createWorkforceCellProjectionInputWithManagement({
      management_directive: {
        directive_ref: "directive-01",
        objective_ref: "objective-01",
        directive_summary: "Keep delivery visible and bounded.",
        directive_priority: "focus_now",
        approval_posture: "operator_required",
      },
      delivery_return: {
        delivery_return_ref: "delivery-return-01",
        objective_ref: "objective-01",
        delivery_status: "ready_for_review",
        completed_summary: "Review package assembled.",
        blocked_summary: "One follow-up item remains.",
        next_directive_needed: false,
      },
      approval_request: {
        approval_request_ref: "approval-request-01",
        objective_ref: "objective-01",
        request_kind: "approval",
        request_status: "pending",
        request_summary: "Operator review requested.",
        requested_decision: "Approve bounded release.",
        urgency: "normal",
      },
    })
  );
  const inspection_projection =
    assembleManagementObjectInspectionProjection(detail_projection);

  assert.equal(
    inspection_projection.inspection_scope,
    "management_object_inspection"
  );
  assert.equal(inspection_projection.authority_boundary, "product_projection_only");
  assert.equal(inspection_projection.phase_boundary, "runtime_adjacent_detail");
  assert.equal(inspection_projection.inspection_projection_is_runtime_law, false);
  assert.equal(inspection_projection.secretary_behavior_available, false);
  assert.equal(inspection_projection.provider_execution_available, false);
  assert.equal(inspection_projection.channel_entry_available, false);
  assert.equal(inspection_projection.executable_management_actions_available, false);
  assert.equal(
    inspection_projection.source_detail_projection_id,
    detail_projection.detail_projection_id
  );
  assert.equal(inspection_projection.inspection_units.length, 3);
  assert.deepEqual(
    inspection_projection.inspection_units.map((unit) => unit.object_kind),
    ["management_directive", "delivery_return", "approval_request"]
  );
  assert.equal(
    inspection_projection.inspection_units[0]?.product_object_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE
  );
  assert.equal(
    inspection_projection.inspection_units[0]?.phase_boundary,
    "runtime_adjacent_detail"
  );
  assert.equal(
    inspection_projection.inspection_units[0]?.product_projection?.projection_object_type,
    RUNTIME_BACKED_MANAGEMENT_DIRECTIVE_PROJECTION_OBJECT_TYPE
  );
  assert.equal(
    inspection_projection.inspection_units[2]?.product_projection
      ?.affected_objective_id,
    "objective-01"
  );
  assert.ok(
    inspection_projection.inspection_units.every((unit) =>
      RUNTIME_BACKED_MANAGEMENT_PROJECTION_OBJECT_TYPES.includes(
        unit.product_object_type
      )
    )
  );
  assert.ok(
    inspection_projection.inspection_units.every(
      (unit) => unit.inspection_status === "present_non_executable"
    )
  );
  assert.ok(
    inspection_projection.inspection_units.every(
      (unit) => unit.executable_actions_available === false
    )
  );
  assert.ok(
    inspection_projection.non_claims.includes(
      "no_shared_object_identity_with_runtime_private_record"
    )
  );
  assert.ok(
    inspection_projection.projection_notes.includes(
      "Both inspection units and detail projections reuse the same shared runtime-backed management projection taxonomy."
    )
  );
  assert.ok(
    inspection_projection.projection_notes.includes(
      "Runtime-backed directive inspection stays distinct from compile-phase management directive objects."
    )
  );

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in inspection_projection, false);
  }
});
