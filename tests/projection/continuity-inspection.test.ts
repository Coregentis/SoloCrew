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

test("[projection] continuity inspection stays product-projected when derived from runtime-backed detail truth", () => {
  const detail_projection = assembleCellDetailProjectionFromRuntimeInput({
    cell_runtime_scope: {
      object_id: "cell-scope-01",
      object_type: "cell-runtime-scope",
      authority_class: "coregentis_private_runtime",
      primary_layer: "organization_runtime_layer",
      status: "active",
      project_id: "project-01",
      scope_name: "Runtime Delivery Cell",
      scope_summary: "Bounded runtime scope for delivery work.",
      scope_mode: "multi_scope_bounded",
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    cell_summary_runtime_record: {
      object_id: "cell-summary-01",
      object_type: "cell-summary-runtime-record",
      authority_class: "coregentis_private_runtime",
      primary_layer: "organization_runtime_layer",
      status: "current",
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      summary_headline: "Ship one bounded runtime-backed review.",
      summary_delivery_posture: "blocked",
      active_work_item_count: 2,
      blocked_work_item_count: 1,
      continuity_hint: "Upstream runtime summary remains bounded and current.",
      summary_mode: "bounded_runtime_private",
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
  });
  const continuity_projection =
    assembleContinuityInspectionProjection(detail_projection);

  assert.equal(continuity_projection.inspection_scope, "continuity_inspection");
  assert.equal(continuity_projection.authority_boundary, "product_projection_only");
  assert.equal(continuity_projection.phase_boundary, "runtime_adjacent_detail");
  assert.equal(continuity_projection.source_mode, "upstream_runtime_private_records");
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
  assert.equal(continuity_projection.upstream_refs.length, 2);
  assert.deepEqual(
    continuity_projection.upstream_refs.map((ref) => ref.upstream_object_type),
    ["cell-runtime-scope", "cell-summary-runtime-record"]
  );
  assert.ok(
    continuity_projection.bounded_knowledge.known_inputs.includes(
      "runtime_private_summary_record_presence"
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
