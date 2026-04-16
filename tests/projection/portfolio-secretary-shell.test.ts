import assert from "node:assert/strict";
import test from "node:test";

import {
  composeMultiCellFoundationOverviewShellFromRuntimeInputs,
} from "../../app/shell/multi-cell-foundation-overview.ts";
import {
  assemblePortfolioSecretaryShellProjection,
} from "../../projection/assembly/portfolio-secretary-shell.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";

function create_runtime_inputs() {
  return [
    {
      cell_runtime_scope: {
        object_id: "cell-scope-01",
        object_type: "cell-runtime-scope" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "active" as const,
        project_id: "project-01",
        scope_name: "Runtime Delivery Cell",
        scope_mode: "multi_scope_bounded" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      cell_summary_runtime_record: {
        object_id: "cell-summary-01",
        object_type: "cell-summary-runtime-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "current" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-01",
        summary_headline: "Ship one bounded runtime-backed review.",
        summary_delivery_posture: "attention" as const,
        active_work_item_count: 2,
        blocked_work_item_count: 1,
        continuity_hint: "Continuity remains bounded to runtime-private summary truth.",
        summary_mode: "bounded_runtime_private" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      management_directive_record: {
        object_id: "directive-01",
        object_type: "management-directive-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "active" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-01",
        objective_id: "objective-01",
        management_record_kind: "directive" as const,
        directive_summary: "Keep delivery visible and bounded.",
        directive_priority: "focus_now" as const,
        approval_posture: "operator_required" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
    },
    {
      cell_runtime_scope: {
        object_id: "cell-scope-02",
        object_type: "cell-runtime-scope" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "active" as const,
        project_id: "project-01",
        scope_name: "Runtime Review Cell",
        scope_mode: "multi_scope_bounded" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      cell_summary_runtime_record: {
        object_id: "cell-summary-02",
        object_type: "cell-summary-runtime-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "current" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        summary_headline: "Review one bounded release package.",
        summary_delivery_posture: "steady" as const,
        active_work_item_count: 1,
        blocked_work_item_count: 0,
        continuity_hint: "Review continuity is current and bounded.",
        summary_mode: "bounded_runtime_private" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      delivery_return_record: {
        object_id: "delivery-return-02",
        object_type: "delivery-return-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "ready_for_review" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        objective_id: "objective-02",
        management_record_kind: "delivery_return" as const,
        completed_summary: "Review summary ready.",
        blocked_summary: "",
        next_directive_needed: false,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      approval_request_record: {
        object_id: "approval-request-02",
        object_type: "approval-request-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "pending" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        objective_id: "objective-02",
        management_record_kind: "approval_request" as const,
        request_kind: "approval" as const,
        request_summary: "Operator review requested.",
        requested_decision: "Approve bounded release.",
        urgency: "normal" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
    },
  ];
}

test("[projection] portfolio secretary shell stays top-level product projection and non-executing", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    create_runtime_inputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
  });

  assert.equal(
    projection.projection_scope,
    "portfolio_secretary_beta_shell"
  );
  assert.equal(projection.authority_boundary, "product_projection_only");
  assert.equal(projection.phase_boundary, "beta_shell_navigation");
  assert.equal(projection.source_mode, "multi_cell_foundation_overview_shell");
  assert.equal(projection.secretary_behavior_available, true);
  assert.equal(projection.portfolio_dispatch_behavior_available, false);
  assert.equal(projection.direct_approve_control_available, false);
  assert.equal(projection.direct_reject_control_available, false);
  assert.equal(projection.direct_dispatch_control_available, false);
  assert.equal(projection.direct_execute_control_available, false);
  assert.equal(projection.provider_execution_available, false);
  assert.equal(projection.channel_entry_available, false);
  assert.equal(projection.workflow_engine_behavior_available, false);
  assert.equal(projection.handoff_creation_available, true);
  assert.equal(
    projection.selection.selection_mode,
    "bounded_navigation_only"
  );
  assert.equal(projection.view_separation.secretary_view_distinct_from_cell_view, true);
  assert.equal(projection.navigation_units.length, 2);
  assert.equal(projection.navigation_units[0]?.selected, true);
  assert.equal(projection.navigation_units[1]?.selected, false);
  assert.equal(projection.status_shelf.total_cells, 2);
  assert.equal(projection.status_shelf.attention_required_cells, 2);
  assert.equal(projection.status_shelf.steady_cells, 0);
  assert.equal(projection.status_shelf.packet_state_counts.draft, 0);
  assert.equal(projection.status_shelf.packet_state_counts.staged, 0);
  assert.equal(
    projection.status_shelf.packet_state_counts.ready_for_cell_review,
    1
  );
  assert.equal(
    projection.status_shelf.packet_state_counts.returned_for_revision,
    1
  );
  assert.match(
    projection.status_shelf.packet_state_summary,
    /returned_for_revision cells/
  );
  assert.equal(
    projection.queue_shelf.queue_visibility,
    "bounded_queue_posture_only"
  );
  assert.equal(projection.queue_shelf.queued_attention_cells, 2);
  assert.equal(projection.queue_shelf.staged_packet_cells, 0);
  assert.equal(projection.queue_shelf.ready_for_cell_review_cells, 1);
  assert.equal(projection.queue_shelf.returned_for_revision_cells, 1);
  assert.match(
    projection.queue_shelf.packet_queue_summary,
    /review-ready packets and 1 revision-return packets/
  );
  assert.equal(projection.review_shelf.direct_controls_available, false);
  assert.equal(
    projection.review_shelf.approval_request_visibility,
    "runtime_record_present_non_executable"
  );
  assert.equal(projection.review_shelf.ready_for_cell_review_cells, 1);
  assert.equal(projection.review_shelf.returned_for_revision_cells, 1);
  assert.match(
    projection.review_shelf.review_packet_summary,
    /ready_for_cell_review packets and 1 returned_for_revision packets/
  );
  assert.equal(
    projection.posture_shelf.secretary_posture,
    "handoff_first_review_packet_first_revision_loop_non_executing"
  );
  assert.equal(
    projection.summary_projections[0]?.source_mode,
    "upstream_runtime_private_records"
  );
  assert.ok(
    projection.truth_sources.includes("multi_cell_foundation_projection")
  );
  assert.ok(
    projection.non_claims.includes("no_direct_dispatch_control")
  );
  assert.ok(
    projection.deferred_items.includes("handoff_execution")
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 2 adds bounded handoff staging visibility only; direct control and handoff execution remain deferred."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 3 adds bounded handoff review-packet visibility only and keeps packet states product-projected and non-executing."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 4 hardens revision/return loop consistency so portfolio shelves, staging, and review packet surfaces reuse the same non-executing packet-state semantics."
    )
  );

  const boundary_targets = [
    projection,
    projection.selection,
    projection.view_separation,
    projection.status_shelf,
    projection.queue_shelf,
    projection.review_shelf,
    projection.posture_shelf,
    ...projection.summary_projections,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
