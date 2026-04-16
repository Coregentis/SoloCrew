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

test("[projection] secretary handoff staging stays product-projected and non-executing", () => {
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
  const projection = assembleSecretaryHandoffStagingProjection(
    portfolio_projection,
    "cell-scope-01"
  );

  assert.equal(projection.projection_scope, "secretary_handoff_staging");
  assert.equal(projection.authority_boundary, "product_projection_only");
  assert.equal(projection.phase_boundary, "beta_handoff_staging");
  assert.equal(
    projection.source_mode,
    "portfolio_secretary_shell_projection"
  );
  assert.equal(projection.secretary_behavior_available, true);
  assert.equal(projection.portfolio_dispatch_behavior_available, false);
  assert.equal(projection.direct_approve_control_available, false);
  assert.equal(projection.direct_reject_control_available, false);
  assert.equal(projection.direct_dispatch_control_available, false);
  assert.equal(projection.direct_execute_control_available, false);
  assert.equal(projection.provider_execution_available, false);
  assert.equal(projection.channel_entry_available, false);
  assert.equal(projection.workflow_engine_behavior_available, false);
  assert.equal(projection.runtime_complete_orchestration_available, false);
  assert.equal(projection.handoff_creation_available, true);
  assert.equal(projection.handoff_payload_kind, "product_staging_only");
  assert.equal(projection.handoff_staging_is_runtime_law, false);
  assert.equal(projection.staging_status, "returned_for_revision");
  assert.equal(projection.target_selection.target_cell_id, "cell-scope-01");
  assert.equal(
    projection.target_selection.target_source_mode,
    "upstream_runtime_private_records"
  );
  assert.equal(projection.target_selection.target_blocked_work_count, 1);
  assert.equal(projection.staging_states.length, 4);
  assert.equal(projection.staging_states[3]?.stage, "returned_for_revision");
  assert.equal(projection.staging_states[3]?.active, true);
  assert.ok(projection.upstream_refs.length >= 2);
  assert.ok(
    projection.upstream_refs.some(
      (ref) => ref.upstream_object_type === "management-directive-record"
    )
  );
  assert.ok(
    projection.truth_sources.includes("portfolio_secretary_shell_projection")
  );
  assert.ok(
    projection.non_claims.includes("no_handoff_execution")
  );
  assert.ok(
    projection.deferred_items.includes("direct_execute_control")
  );
  assert.ok(
    projection.projection_notes.includes(
      "Secretary handoff staging is a downstream product projection over the portfolio shell, not a runtime command object."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Shared handoff packet states remain posture semantics only and do not become runtime commands."
    )
  );

  const boundary_targets = [
    projection,
    projection.target_selection,
    projection.management_and_review_posture,
    ...projection.staging_states,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
