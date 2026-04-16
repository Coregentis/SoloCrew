import assert from "node:assert/strict";
import test from "node:test";

import {
  assembleCellDetailProjectionFromRuntimeInput,
} from "../../projection/assembly/cell-detail-projection.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";

test("[projection] cell detail projection stays product-projected when derived from upstream runtime-backed inputs", () => {
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
    management_directive_record: {
      object_id: "directive-01",
      object_type: "management-directive-record",
      authority_class: "coregentis_private_runtime",
      primary_layer: "organization_runtime_layer",
      status: "active",
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      directive_summary: "Keep review work bounded and operator-visible.",
      directive_priority: "review_first",
      approval_posture: "operator_required",
      constraint_tags: ["bounded-review", "operator-visible"],
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    delivery_return_record: {
      object_id: "delivery-return-01",
      object_type: "delivery-return-record",
      authority_class: "coregentis_private_runtime",
      primary_layer: "organization_runtime_layer",
      status: "blocked",
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      completed_summary: "One work item completed.",
      blocked_summary: "One work item blocked.",
      next_directive_needed: true,
      requested_follow_up: "Operator review before resuming.",
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
    approval_request_record: {
      object_id: "approval-request-01",
      object_type: "approval-request-record",
      authority_class: "coregentis_private_runtime",
      primary_layer: "organization_runtime_layer",
      status: "pending",
      project_id: "project-01",
      cell_runtime_scope_id: "cell-scope-01",
      request_kind: "approval",
      request_summary: "Operator review needed before resuming.",
      requested_decision: "Approve next bounded step.",
      urgency: "high",
      temporal: {},
      mutation: {},
      lineage: {},
      governance: {},
    },
  });

  assert.equal(detail_projection.detail_scope, "cell_detail_projection");
  assert.equal(detail_projection.authority_boundary, "product_projection_only");
  assert.equal(detail_projection.phase_boundary, "runtime_adjacent_detail");
  assert.equal(detail_projection.source_mode, "upstream_runtime_private_records");
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
    "runtime-backed-management-directive-projection"
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
    "management-directive-record"
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
  assert.equal(detail_projection.upstream_refs.length, 5);
  assert.ok(
    detail_projection.truth_sources.includes("upstream_runtime_private_truth")
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
