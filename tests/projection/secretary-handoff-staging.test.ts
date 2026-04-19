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
  adapt_founder_request_exception_packet,
} from "../../projection/adapters/founder-request-exception-packet-adapter.ts";
import {
  derive_founder_request_exception_packet_state,
} from "../../projection/contracts/founder-request-exception-packet-state-derivation.ts";
import {
  evaluate_founder_request_exception_state,
} from "../../projection/contracts/founder-request-exception-state-evaluation.ts";
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
  assert.match(
    projection.packet_state_summary,
    /returned_for_revision for Runtime Delivery Cell/
  );
  assert.match(
    projection.revision_loop_summary,
    /Revision visibility is active for Runtime Delivery Cell/
  );
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
  assert.equal(
    projection.rationale_evidence.rationale_scope,
    "secretary_handoff_staging_rationale"
  );
  assert.equal(
    projection.rationale_evidence.packet_state,
    "returned_for_revision"
  );
  assert.equal(projection.rationale_evidence.control_mode, "non_executing");
  assert.match(
    projection.rationale_evidence.state_reason_summary,
    /returned_for_revision because Runtime Delivery Cell currently needs bounded revision visibility/
  );
  assert.ok(
    projection.rationale_evidence.omission_notes.includes(
      "Handoff staging explains bounded intent and evidence only; it does not submit, send, or execute the handoff."
    )
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
  assert.ok(
    projection.projection_notes.includes(
      "Wave 4 hardens revision/return loop consistency across shell, staging, and review packet surfaces without introducing execution semantics."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 5 hardens rationale, evidence, provenance, and omission visibility without promoting packet posture into runtime workflow truth."
    )
  );

  const boundary_targets = [
    projection,
    projection.target_selection,
    projection.management_and_review_posture,
    projection.rationale_evidence,
    ...projection.staging_states,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[projection] secretary handoff staging can carry compact founder-request exception posture preview without widening control semantics", () => {
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
  const founder_packet_result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-02",
    request_label: "Preview the bounded revision posture before review packet assembly.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available",
        summary_label: "Continuation remains visible for the selected lane.",
      },
      semantic_relation_projection_summary: {
        availability: "omitted_by_contract",
        summary_label: "Relation details stay omitted in this staging preview.",
      },
      drift_impact_projection_summary: {
        availability: "stale",
        summary_label: "Impact preview is stale and needs refresh later.",
      },
      activation_projection_summary: {
        availability: "available",
        summary_label: "Activation posture remains observe-only.",
        activation_posture: "observe_only",
      },
      confirm_trace_decision_projection_summary: {
        availability: "insufficient_evidence",
        summary_label: "Confirm trace remains evidence-thin at staging time.",
      },
      learning_suggestion_projection_summary: {
        availability: "available",
        summary_label: "Learning hint remains available for staging preview.",
        suggestion_summary_label:
          "Capture the revision-return pattern as a suggestion-only note.",
      },
    },
    evidence_summary_text:
      "Evidence remains compact and bounded across omission, insufficiency, and stale posture.",
    learning_suggestion_text:
      "Keep the learning note suggestion-only while the staging packet remains non-executing.",
  });

  assert.equal(founder_packet_result.ok, true);

  if (!founder_packet_result.ok) {
    assert.fail("Expected a contract-safe founder request packet.");
  }

  const projection = assembleSecretaryHandoffStagingProjection(
    portfolio_projection,
    "cell-scope-01",
    founder_packet_result.packet
  );

  assert.equal(
    projection.founder_request_exception_preview?.preview_scope,
    "founder_request_exception_staging_preview"
  );
  assert.equal(
    projection.founder_request_exception_preview?.request_ref,
    "founder-request-02"
  );
  assert.equal(
    projection.founder_request_exception_preview?.request_label,
    "Preview the bounded revision posture before review packet assembly."
  );
  assert.equal(
    projection.founder_request_exception_preview?.derived_exception_posture,
    "stale_context"
  );
  assert.equal(
    projection.founder_request_exception_preview?.review_return_posture,
    "stale_context"
  );
  assert.equal(
    projection.founder_request_exception_preview?.evidence_posture_summary.evidence_summary_label,
    "Evidence remains compact and bounded across omission, insufficiency, and stale posture."
  );
  assert.equal(
    projection.founder_request_exception_preview?.evidence_posture_summary.evidence_status,
    "stale"
  );
  assert.equal(
    "evidence_refs" in
      (projection.founder_request_exception_preview?.evidence_posture_summary ??
        {}),
    false
  );
  assert.equal(
    projection.founder_request_exception_preview?.learning_suggestion_hint?.suggestion_posture,
    "suggestion_only"
  );
  assert.ok(
    projection.founder_request_exception_preview?.status_markers.includes(
      "omitted_by_contract"
    )
  );
  assert.ok(
    projection.founder_request_exception_preview?.status_markers.includes(
      "insufficient_evidence"
    )
  );
  assert.ok(
    projection.founder_request_exception_preview?.status_markers.includes(
      "stale"
    )
  );
  assert.deepEqual(
    projection.founder_request_exception_preview?.family_status_summaries.map(
      (summary) => summary.family
    ),
    [
      "continuity_projection_summary",
      "semantic_relation_projection_summary",
      "drift_impact_projection_summary",
      "activation_projection_summary",
      "confirm_trace_decision_projection_summary",
      "learning_suggestion_projection_summary",
    ]
  );
  assert.ok(
    projection.projection_notes.includes(
      "Founder-request staging enrichment stays compact, summary-only, bounded exception posture preview only, and non-executing inside the staging lane."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Founder-request staging preview preserves omission, insufficiency, stale, evidence, and learning posture without duplicating the full review packet enrichment."
    )
  );
  assert.equal(projection.direct_approve_control_available, false);
  assert.equal(projection.direct_reject_control_available, false);
  assert.equal(projection.direct_dispatch_control_available, false);
  assert.equal(projection.direct_execute_control_available, false);
  assert.equal(projection.provider_execution_available, false);
  assert.equal(projection.channel_entry_available, false);
});

test("[projection] secretary handoff staging can carry compact reducer-backed state exposure without duplicating full review detail", () => {
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
  const founder_packet_result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-staging-state-01",
    request_label: "Keep staging state exposure compact and non-executing.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available",
        summary_label: "Continuation remains visible in staging preview.",
      },
      semantic_relation_projection_summary: {
        availability: "available",
        summary_label: "Relation summary remains visible in staging preview.",
      },
      drift_impact_projection_summary: {
        availability: "available",
        summary_label: "Impact summary remains visible in staging preview.",
      },
      activation_projection_summary: {
        availability: "available",
        summary_label: "Activation posture remains observe-only.",
        activation_posture: "observe_only",
      },
      confirm_trace_decision_projection_summary: {
        availability: "available",
        summary_label: "Confirm trace remains visible in staging preview.",
      },
      learning_suggestion_projection_summary: {
        availability: "available",
        summary_label: "Learning hint remains visible in staging preview.",
        suggestion_summary_label:
          "Keep the learning note suggestion-only while staging remains compact.",
      },
    },
    evidence_summary_text:
      "Evidence remains compact and summary-safe while staging preview stays bounded.",
  });

  assert.equal(founder_packet_result.ok, true);

  if (!founder_packet_result.ok) {
    assert.fail("Expected a contract-safe founder request packet.");
  }

  const founder_request_state_evaluation =
    evaluate_founder_request_exception_state({
      evaluation_id: "eval-staging-exposure-01",
      derivation_result: derive_founder_request_exception_packet_state({
        packet: founder_packet_result.packet,
      }),
    });

  const projection = assembleSecretaryHandoffStagingProjection(
    portfolio_projection,
    "cell-scope-01",
    founder_packet_result.packet,
    founder_request_state_evaluation
  );

  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.exposure_scope,
    "staging_state_exposure"
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.evaluation_id,
    "eval-staging-exposure-01"
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.transition_accepted,
    true
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.final_state,
    "state_review_needed"
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.non_executing,
    true
  );
  assert.equal(
    "requested_next_state" in
      (projection.founder_request_exception_preview?.state_evaluation_exposure ??
        {}),
    false
  );
  assert.equal(
    "reducer_target_state" in
      (projection.founder_request_exception_preview?.state_evaluation_exposure ??
        {}),
    false
  );
  assert.ok(
    (projection.founder_request_exception_preview?.state_evaluation_exposure?.notes
      .length ?? 0) <= 2
  );
  assert.ok(
    (projection.founder_request_exception_preview?.state_evaluation_exposure?.source_markers
      .length ?? 0) <= 3
  );
  assert.doesNotMatch(
    JSON.stringify(
      projection.founder_request_exception_preview?.state_evaluation_exposure
    ),
    /approve|dispatch|execute|provider|channel/u
  );
});

test("[projection] secretary handoff staging keeps terminal state exposure below completion semantics", () => {
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
  const founder_packet_result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-staging-state-02",
    request_label: "Keep terminal staging exposure below completion semantics.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available",
        summary_label: "Continuation remains visible.",
      },
      semantic_relation_projection_summary: {
        availability: "available",
        summary_label: "Relation summary remains visible.",
      },
      drift_impact_projection_summary: {
        availability: "available",
        summary_label: "Impact summary remains visible.",
      },
      activation_projection_summary: {
        availability: "available",
        summary_label: "Activation posture remains observe-only.",
        activation_posture: "observe_only",
      },
      confirm_trace_decision_projection_summary: {
        availability: "available",
        summary_label: "Confirm trace remains visible.",
      },
      learning_suggestion_projection_summary: {
        availability: "available",
        summary_label: "Learning hint remains visible.",
        suggestion_summary_label:
          "Keep the learning note suggestion-only for compact staging visibility.",
      },
    },
  });

  assert.equal(founder_packet_result.ok, true);

  if (!founder_packet_result.ok) {
    assert.fail("Expected a contract-safe founder request packet.");
  }

  const founder_request_state_evaluation =
    evaluate_founder_request_exception_state({
      evaluation_id: "eval-staging-terminal-01",
      derivation_result: derive_founder_request_exception_packet_state({
        packet: founder_packet_result.packet,
        requested_closure_without_execution: true,
      }),
      current_state: "state_closed_without_execution",
    });

  const projection = assembleSecretaryHandoffStagingProjection(
    portfolio_projection,
    "cell-scope-01",
    founder_packet_result.packet,
    founder_request_state_evaluation
  );

  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.terminal,
    true
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.transition_accepted,
    false
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.blocked_reason,
    "terminal_state"
  );
  assert.equal(
    projection.founder_request_exception_preview?.state_evaluation_exposure?.non_executing,
    true
  );
  assert.doesNotMatch(
    JSON.stringify(
      projection.founder_request_exception_preview?.state_evaluation_exposure
    ),
    /execution complete|completed by execution/u
  );
});
