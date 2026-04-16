import assert from "node:assert/strict";
import test from "node:test";

import {
  composeMultiCellFoundationOverviewShellFromRuntimeInputs,
} from "../../app/shell/multi-cell-foundation-overview.ts";
import {
  assemblePortfolioSecretaryShellProjection,
} from "../../projection/assembly/portfolio-secretary-shell.ts";
import {
  assembleSecretaryHandoffStagingProjection,
} from "../../projection/assembly/secretary-handoff-staging.ts";
import {
  assembleSecretaryHandoffReviewPacketProjection,
} from "../../projection/assembly/secretary-handoff-review-packet.ts";
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

test("[projection] secretary handoff review packet stays review-only and product-projected", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    create_runtime_inputs()
  );
  const portfolio_projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
  });
  const staging_projection = assembleSecretaryHandoffStagingProjection(
    portfolio_projection,
    "cell-scope-01"
  );
  const review_packet =
    assembleSecretaryHandoffReviewPacketProjection(staging_projection);

  assert.equal(
    review_packet.projection_scope,
    "secretary_handoff_review_packet"
  );
  assert.equal(review_packet.authority_boundary, "product_projection_only");
  assert.equal(review_packet.phase_boundary, "beta_review_packet");
  assert.equal(
    review_packet.source_mode,
    "secretary_handoff_staging_projection"
  );
  assert.equal(review_packet.secretary_behavior_available, true);
  assert.equal(review_packet.portfolio_dispatch_behavior_available, false);
  assert.equal(review_packet.direct_approve_control_available, false);
  assert.equal(review_packet.direct_reject_control_available, false);
  assert.equal(review_packet.direct_dispatch_control_available, false);
  assert.equal(review_packet.direct_execute_control_available, false);
  assert.equal(review_packet.provider_execution_available, false);
  assert.equal(review_packet.channel_entry_available, false);
  assert.equal(review_packet.workflow_engine_behavior_available, false);
  assert.equal(review_packet.runtime_complete_orchestration_available, false);
  assert.equal(review_packet.review_packet_kind, "product_review_packet_only");
  assert.equal(review_packet.review_packet_is_runtime_law, false);
  assert.equal(review_packet.packet_state, "returned_for_revision");
  assert.equal(review_packet.packet_states.length, 4);
  assert.equal(
    review_packet.review_readiness.readiness_label,
    "revision_requested"
  );
  assert.equal(
    review_packet.review_readiness.target_blocked_work_count,
    1
  );
  assert.ok(
    review_packet.truth_sources.includes("secretary_handoff_staging_projection")
  );
  assert.ok(
    review_packet.non_claims.includes(
      "packet_states_are_posture_only_not_runtime_commands"
    )
  );
  assert.ok(
    review_packet.projection_notes.includes(
      "Secretary handoff review packet is a downstream product projection over staged handoff truth, not a runtime review command."
    )
  );

  const boundary_targets = [
    review_packet,
    review_packet.target_selection,
    review_packet.management_and_review_posture,
    review_packet.review_readiness,
    ...review_packet.packet_states,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
