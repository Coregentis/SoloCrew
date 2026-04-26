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
import {
  createWorkforceCellProjectionInputs,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";


test("[projection] secretary handoff review packet stays review-only and product-projected", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
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
  assert.match(
    review_packet.packet_state_summary,
    /returned_for_revision for Runtime Delivery Cell/
  );
  assert.match(
    review_packet.revision_loop_summary,
    /Revision visibility is active for Runtime Delivery Cell/
  );
  assert.equal(
    review_packet.review_readiness.target_blocked_work_count,
    1
  );
  assert.equal(
    review_packet.rationale_evidence.rationale_scope,
    "secretary_handoff_review_packet_rationale"
  );
  assert.equal(
    review_packet.rationale_evidence.packet_state,
    "returned_for_revision"
  );
  assert.equal(review_packet.rationale_evidence.control_mode, "non_executing");
  assert.match(
    review_packet.rationale_evidence.provenance_summary,
    /Provenance remains downstream and non-authoritative/
  );
  assert.ok(
    review_packet.rationale_evidence.omission_notes.includes(
      "Review packet framing explains bounded review posture only and does not become approval, rejection, or dispatch workflow authority."
    )
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
  assert.ok(
    review_packet.projection_notes.includes(
      "Wave 4 hardens revision/return loop consistency so packet summaries and returned-for-revision posture stay aligned with the staging lane."
    )
  );
  assert.ok(
    review_packet.projection_notes.includes(
      "Wave 5 hardens rationale, evidence, provenance, and omission-aware narration without introducing direct-control semantics."
    )
  );

  const boundary_targets = [
    review_packet,
    review_packet.target_selection,
    review_packet.management_and_review_posture,
    review_packet.review_readiness,
    review_packet.rationale_evidence,
    ...review_packet.packet_states,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[projection] secretary handoff review packet can carry founder-request exception posture enrichment without widening control semantics", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
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
  const founder_packet_result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-01",
    request_label: "Clarify the returned handoff packet before next review.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available",
        summary_label: "Continuation anchor remains visible.",
        continuation_label: "Resume from the current review lane.",
      },
      semantic_relation_projection_summary: {
        availability: "insufficient_evidence",
        summary_label: "Affected relation set remains incomplete.",
      },
      drift_impact_projection_summary: {
        availability: "stale",
        summary_label: "Drift summary needs refresh before deeper reuse.",
        impact_summary_label: "Current impact read is stale but still bounded.",
      },
      activation_projection_summary: {
        availability: "available",
        summary_label: "Activation posture remains observe-only.",
        activation_posture: "observe_only",
      },
      confirm_trace_decision_projection_summary: {
        availability: "omitted_by_contract",
        summary_label: "Confirm trace stays omitted in this bounded packet.",
      },
      learning_suggestion_projection_summary: {
        availability: "available",
        summary_label: "Learning suggestion remains bounded.",
        suggestion_summary_label:
          "Capture the revision-return pattern for later review only.",
      },
    },
    bounded_action_recommendation_text:
      "Prepare a bounded revision note for the next review pass.",
    evidence_summary_text:
      "Evidence remains summary-only across continuity, impact, and review posture.",
    learning_suggestion_text:
      "Keep the learning note suggestion-only while the packet stays non-executing.",
  });

  assert.equal(founder_packet_result.ok, true);

  if (!founder_packet_result.ok) {
    assert.fail("Expected a contract-safe founder request packet.");
  }

  const review_packet = assembleSecretaryHandoffReviewPacketProjection(
    staging_projection,
    founder_packet_result.packet
  );

  assert.equal(
    review_packet.founder_request_exception_enrichment?.enrichment_scope,
    "founder_request_exception_packet_summary"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.request_ref,
    "founder-request-01"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.request_label,
    "Clarify the returned handoff packet before next review."
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.derived_exception_posture,
    "stale_context"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.review_return_posture,
    "stale_context"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.bounded_action_recommendation?.recommendation_kind,
    "bounded_action_recommendation"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.bounded_action_recommendation?.non_executing,
    true
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.learning_suggestion_summary?.suggestion_posture,
    "suggestion_only"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.evidence_summary.evidence_summary_label,
    "Evidence remains summary-only across continuity, impact, and review posture."
  );
  assert.ok(
    review_packet.founder_request_exception_enrichment?.status_markers.includes(
      "stale"
    )
  );
  assert.ok(
    review_packet.founder_request_exception_enrichment?.status_markers.includes(
      "insufficient_evidence"
    )
  );
  assert.ok(
    review_packet.founder_request_exception_enrichment?.status_markers.includes(
      "omitted_by_contract"
    )
  );
  assert.deepEqual(
    review_packet.founder_request_exception_enrichment?.family_status_summaries.map(
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
  assert.match(
    review_packet.founder_request_exception_enrichment?.review_return_summary ?? "",
    /stale/i
  );
  assert.ok(
    review_packet.projection_notes.includes(
      "Founder-request exception packet enrichment stays contract-safe, summary-only, bounded exception posture only, and non-executing inside the review packet lane."
    )
  );
  assert.ok(
    review_packet.projection_notes.includes(
      "Founder-request evidence remains summary-level only, with omission, insufficiency, and stale markers preserved rather than hidden."
    )
  );
  assert.equal(review_packet.direct_approve_control_available, false);
  assert.equal(review_packet.direct_reject_control_available, false);
  assert.equal(review_packet.direct_dispatch_control_available, false);
  assert.equal(review_packet.direct_execute_control_available, false);
  assert.equal(review_packet.provider_execution_available, false);
  assert.equal(review_packet.channel_entry_available, false);
});

test("[projection] secretary handoff review packet can carry reducer-backed state evaluation exposure without widening control semantics", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
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
  const founder_packet_result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-review-state-01",
    request_label: "Carry reducer-backed state exposure into review packet only.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available",
        summary_label: "Continuation remains available for bounded review.",
      },
      semantic_relation_projection_summary: {
        availability: "available",
        summary_label: "Relation summary remains available for review framing.",
      },
      drift_impact_projection_summary: {
        availability: "available",
        summary_label: "Impact summary remains available for review framing.",
      },
      activation_projection_summary: {
        availability: "available",
        summary_label: "Activation summary remains observe-only.",
        activation_posture: "observe_only",
      },
      confirm_trace_decision_projection_summary: {
        availability: "available",
        summary_label: "Confirm trace remains available in bounded review.",
      },
      learning_suggestion_projection_summary: {
        availability: "available",
        summary_label: "Learning summary remains suggestion-only.",
        suggestion_summary_label:
          "Keep the learning note suggestion-only in the review lane.",
      },
    },
    evidence_summary_text:
      "Evidence remains summary-safe while reducer-backed review posture is visible.",
  });

  assert.equal(founder_packet_result.ok, true);

  if (!founder_packet_result.ok) {
    assert.fail("Expected a contract-safe founder request packet.");
  }

  const founder_request_state_evaluation =
    evaluate_founder_request_exception_state({
      evaluation_id: "eval-review-exposure-01",
      derivation_result: derive_founder_request_exception_packet_state({
        packet: founder_packet_result.packet,
      }),
    });

  const review_packet = assembleSecretaryHandoffReviewPacketProjection(
    staging_projection,
    founder_packet_result.packet,
    founder_request_state_evaluation
  );

  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.exposure_scope,
    "review_packet_state_exposure"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.evaluation_id,
    "eval-review-exposure-01"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.transition_accepted,
    true
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.final_state,
    "state_review_needed"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.blocked_reason,
    undefined
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.terminal,
    false
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.non_executing,
    true
  );
  assert.match(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.notes.join(" ") ?? "",
    /derivation traceability/u
  );
  assert.doesNotMatch(
    JSON.stringify(
      review_packet.founder_request_exception_enrichment?.state_evaluation_exposure
    ),
    /approval|approve|dispatch|execute|provider|channel/u
  );
});

test("[projection] secretary handoff review packet keeps terminal state exposure below completion semantics", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
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
  const founder_packet_result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-review-state-02",
    request_label: "Keep terminal state evaluation below completion semantics.",
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
        summary_label: "Learning summary remains visible.",
        suggestion_summary_label:
          "Keep the learning note suggestion-only for terminal visibility.",
      },
    },
  });

  assert.equal(founder_packet_result.ok, true);

  if (!founder_packet_result.ok) {
    assert.fail("Expected a contract-safe founder request packet.");
  }

  const founder_request_state_evaluation =
    evaluate_founder_request_exception_state({
      evaluation_id: "eval-review-terminal-01",
      derivation_result: derive_founder_request_exception_packet_state({
        packet: founder_packet_result.packet,
        requested_closure_without_execution: true,
      }),
      current_state: "state_closed_without_execution",
    });

  const review_packet = assembleSecretaryHandoffReviewPacketProjection(
    staging_projection,
    founder_packet_result.packet,
    founder_request_state_evaluation
  );

  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.terminal,
    true
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.transition_accepted,
    false
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.blocked_reason,
    "terminal_state"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.final_state,
    "state_closed_without_execution"
  );
  assert.equal(
    review_packet.founder_request_exception_enrichment?.state_evaluation_exposure?.non_executing,
    true
  );
  assert.doesNotMatch(
    JSON.stringify(
      review_packet.founder_request_exception_enrichment?.state_evaluation_exposure
    ),
    /execution complete|completed by execution/u
  );
});
