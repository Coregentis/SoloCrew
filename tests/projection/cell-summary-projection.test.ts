import assert from "node:assert/strict";
import test from "node:test";

import {
  adaptRuntimePrivateCellSummaryToProjection,
} from "../../projection/adapters/cell-summary-runtime-adapter.ts";
import {
  assembleCellSummaryProjection,
} from "../../projection/assembly/cell-summary-projection.ts";
import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";

test("[projection] cell summary projection stays product-projected and bounded for multi-cell foundation", () => {
  const assembly = initializeSingleCellStructuralAssembly({
    assembly_id: "multi-cell-summary-01",
    cell_id: "cell-01",
    cell_name: "Delivery Cell",
    operator_id: "operator-01",
    mission: "Run one delivery-focused cell.",
    business_scope: "solo-core",
    current_objective_id: "objective-01",
    current_objective_headline: "Ship one bounded delivery review.",
    delivery_target: "Return one bounded operator-reviewable delivery.",
    active_work_count: 3,
    blocked_work_count: 1,
  });

  const shell_composition = composeSingleCellShellScaffold(assembly);
  const summary_projection =
    assembleCellSummaryProjection(shell_composition);

  assert.equal(summary_projection.summary_scope, "cell_summary_projection");
  assert.equal(summary_projection.authority_boundary, "product_projection_only");
  assert.equal(summary_projection.phase_boundary, "runtime_adjacent_summary");
  assert.equal(summary_projection.multi_cell_foundation_scope, "read_inspect_only");
  assert.equal(summary_projection.summary_projection_is_runtime_law, false);
  assert.equal(summary_projection.secretary_behavior_available, false);
  assert.equal(summary_projection.provider_execution_available, false);
  assert.equal(summary_projection.channel_entry_available, false);
  assert.equal(summary_projection.broad_kpi_cockpit_available, false);
  assert.equal(summary_projection.runtime_complete_orchestration_available, false);

  assert.equal(summary_projection.cell_summary_card.cell_name, "Delivery Cell");
  assert.equal(summary_projection.cell_summary_card.blocked_work_count, 1);
  assert.equal(summary_projection.readiness_signal, "attention_required");
  assert.equal(summary_projection.continuity_status, "bounded_and_honest");
  assert.match(
    summary_projection.objective_status_summary,
    /Ship one bounded delivery review\./
  );
  assert.ok(
    summary_projection.non_claims.includes("no_secretary_behavior_truth")
  );
  assert.ok(summary_projection.deferred_items.includes("provider_execution"));

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in summary_projection, false);
  }
});

test("[projection] runtime-private workforce records are transformed into product summary projection rather than runtime law", () => {
  const summary_projection = adaptRuntimePrivateCellSummaryToProjection({
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

  assert.equal(summary_projection.source_mode, "upstream_runtime_private_records");
  assert.equal(summary_projection.summary_scope, "cell_summary_projection");
  assert.equal(summary_projection.authority_boundary, "product_projection_only");
  assert.equal(summary_projection.summary_projection_is_runtime_law, false);
  assert.equal(summary_projection.secretary_behavior_available, false);
  assert.equal(summary_projection.provider_execution_available, false);
  assert.equal(summary_projection.channel_entry_available, false);
  assert.equal(summary_projection.readiness_signal, "attention_required");
  assert.equal(summary_projection.cell_summary_card.cell_name, "Runtime Delivery Cell");
  assert.equal(summary_projection.cell_summary_card.delivery_posture, "blocked");
  assert.equal(summary_projection.upstream_refs.length, 5);
  assert.deepEqual(
    summary_projection.upstream_refs.map((ref) => ref.upstream_object_type),
    [
      "cell-runtime-scope",
      "cell-summary-runtime-record",
      "management-directive-record",
      "delivery-return-record",
      "approval-request-record",
    ]
  );
  assert.ok(
    summary_projection.truth_sources.includes("upstream_runtime_private_truth")
  );
  assert.ok(
    summary_projection.non_claims.includes(
      "no_shared_object_identity_with_runtime_private_record"
    )
  );

  for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
    assert.equal(field_name in summary_projection, false);
  }
});
