import assert from "node:assert/strict";
import test from "node:test";

import {
  renderSecretaryHandoffReviewPage,
} from "../../app/pages/secretary-handoff-review-page.ts";
import {
  composePortfolioSecretaryShellFromRuntimeInputs,
} from "../../app/shell/portfolio-secretary-shell.ts";
import {
  composeSecretaryHandoffReviewPacketShell,
  buildSecretaryHandoffReviewPacketRoute,
} from "../../app/shell/secretary-handoff-review-packet.ts";
import {
  composeSecretaryHandoffStagingShell,
} from "../../app/shell/secretary-handoff-staging.ts";
import {
  createV11IntakeToPacketPageModel,
} from "../../app/shell/create-v1-1-intake-to-packet-page-model.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createWorkforceCellProjectionInputs,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";


function create_v11_request() {
  return {
    project_id: "project-01",
    founder_request_id: "founder-request-01",
    request_label: "Product update planning request",
    request_text:
      "Help me turn the upcoming product update into a review-ready packet before we do anything externally.",
    request_intent_hint: "product_update_planning",
    requested_context_summary: "Keep this bounded to review and staging only.",
    risk_hint: "avoid external action",
    evidence_hint: "use only summary-safe evidence",
    created_at: "2026-04-20T00:00:00.000Z",
    non_executing: true as const,
  };
}

function create_v11_projection_summary(overrides = {}) {
  return {
    projection_summary_id: "projection-summary-01",
    project_id: "project-01",
    state_exposure: {
      projection_id: "projection-state-01",
      project_id: "project-01",
      source_runtime_ref: "runtime-ref-01",
      state_summary: {
        initial_state: "state_observed",
        transition_event: "raise_review",
        requested_next_state: "state_review_needed",
        evaluated_next_state: "state_review_needed",
        transition_accepted: true,
        final_state: "state_review_needed",
        terminal: true,
      },
      non_executing: true as const,
    },
    evidence_posture: {
      evidence_summary_id: "evidence-summary-01",
      project_id: "project-01",
      evidence_available: true,
      evidence_refs: ["evidence-ref-01"],
      evidence_summary:
        "Bounded evidence summary remains available for review and staging.",
      stale: false,
      insufficient: true,
    },
    recommendation: {
      recommendation_id: "recommendation-01",
      project_id: "project-01",
      recommendation_summary:
        "Prepare the next review step without executing any external action.",
      recommended_next_posture: "review_needed",
      allowed_next_step: "bounded_review_step",
      blocked_actions: [
        "approve",
        "reject",
        "dispatch",
        "execute",
        "provider_channel_send",
      ],
      non_executing: true as const,
      requires_later_authorization: true as const,
    },
    source_refs: ["source-ref-01"],
    non_executing: true as const,
    runtime_private_fields_omitted: true as const,
    ...overrides,
  };
}

test("[app] secretary handoff review page stays review-only and below direct-control semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-01"
  );
  const review_shell =
    composeSecretaryHandoffReviewPacketShell(staging_shell);
  const page = renderSecretaryHandoffReviewPage(review_shell);

  assert.equal(
    page.route_path,
    buildSecretaryHandoffReviewPacketRoute("cell-scope-01")
  );
  assert.equal(page.page_kind, "secretary_handoff_review_page");
  assert.equal(
    page.page_scope,
    "portfolio_secretary_handoff_review_packet_only"
  );
  assert.equal(
    page.operator_surface,
    "portfolio_secretary_handoff_review_packet"
  );
  assert.equal(page.navigation_mode, "review_packet_only_non_executing");
  assert.equal(page.secretary_behavior_available, true);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.direct_approve_control_available, false);
  assert.equal(page.direct_reject_control_available, false);
  assert.equal(page.direct_dispatch_control_available, false);
  assert.equal(page.direct_execute_control_available, false);
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.workflow_engine_behavior_available, false);
  assert.equal(page.runtime_complete_orchestration_available, false);
  assert.equal(page.handoff_creation_available, true);
  assert.equal(page.sections.target_selection.target_cell_id, "cell-scope-01");
  assert.equal(page.sections.packet_framing.packet_state, "returned_for_revision");
  assert.match(
    page.sections.packet_framing.packet_state_summary,
    /returned_for_revision for Runtime Delivery Cell/
  );
  assert.match(
    page.sections.packet_framing.revision_loop_summary,
    /Revision visibility is active for Runtime Delivery Cell/
  );
  assert.equal(
    page.sections.review_readiness.readiness_label,
    "revision_requested"
  );
  assert.equal(
    page.sections.rationale_evidence.rationale_scope,
    "secretary_handoff_review_packet_rationale"
  );
  assert.equal(
    page.sections.navigation.selected_cell_routes?.review_packet_route,
    "/portfolio/handoff/cell-scope-01/review"
  );

  assert.match(page.html, /Secretary Handoff Review Packet/);
  assert.match(page.html, /Handoff review packet is product-level review framing and revision-return visibility only\./);
  assert.match(page.html, /Packet state: returned_for_revision/);
  assert.match(page.html, /Readiness label: revision_requested/);
  assert.match(page.html, /Packet state summary: The handoff packet is returned_for_revision for Runtime Delivery Cell and stays bounded to revision posture only\./);
  assert.match(page.html, /Revision loop summary: Revision visibility is active for Runtime Delivery Cell, but return remains a product state and not a reject, dispatch, or execution command\./);
  assert.match(page.html, /Rationale summary: The review packet exists to explain why Runtime Delivery Cell is seeing this bounded handoff posture, what evidence is visible, and what remains omitted or upstream-owned\./);
  assert.match(page.html, /Evidence summary: Evidence is bounded to Runtime Delivery Cell review readiness, target delivery posture, work counts, and runtime-derived references already adapted into the current packet\./);
  assert.match(page.html, /Provenance summary: Provenance remains downstream and non-authoritative: SoloCrew renders a review packet over adapted upstream inputs without claiming runtime workflow ownership or protocol completeness\./);
  assert.match(page.html, /Omission note: Review packet framing explains bounded review posture only and does not become approval, rejection, or dispatch workflow authority\./);
  assert.match(page.html, /Review packet route: \/portfolio\/handoff\/cell-scope-01\/review/);
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.target_selection,
    page.sections.review_readiness,
    page.sections.packet_framing,
    page.sections.rationale_evidence,
    page.sections.truth_boundary,
    review_shell.handoff_review_packet_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[app] secretary handoff review page exposes no dispatch or execute controls", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-02"
  );
  const review_shell =
    composeSecretaryHandoffReviewPacketShell(staging_shell);
  const page = renderSecretaryHandoffReviewPage(review_shell);

  assert.equal(page.sections.target_selection.target_cell_id, "cell-scope-02");
  assert.equal(page.sections.packet_framing.packet_state, "ready_for_cell_review");
  assert.match(
    page.sections.packet_framing.packet_state_summary,
    /ready_for_cell_review for Runtime Review Cell/
  );
  assert.equal(page.sections.review_readiness.readiness_label, "cell_review_ready");
  assert.equal(page.direct_approve_control_available, false);
  assert.equal(page.direct_reject_control_available, false);
  assert.equal(page.direct_dispatch_control_available, false);
  assert.equal(page.direct_execute_control_available, false);
  assert.ok(
    page.sections.truth_boundary.non_claims.includes(
      "packet_states_are_posture_only_not_runtime_commands"
    )
  );
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);
  assert.doesNotMatch(page.html, /dispatch button/i);
  assert.doesNotMatch(page.html, /run provider/i);
});

test("[app] secretary handoff review page hardens founder-request evidence and stale display semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-01"
  );
  const review_shell =
    composeSecretaryHandoffReviewPacketShell(staging_shell);

  review_shell.handoff_review_packet_projection.founder_request_exception_enrichment =
    {
      enrichment_scope: "founder_request_exception_packet_summary",
      request_ref: "founder-request-01",
      request_label: "Founder request delta summary",
      derived_exception_posture: "stale_context",
      review_return_posture: "review_needed",
      review_return_summary:
        "Review remains required because the bounded summary is stale and partially omitted.",
      marker_status: "stale",
      bounded_action_recommendation: {
        recommendation_kind: "bounded_action_recommendation",
        recommendation_summary:
          "Prepare a bounded revision summary for later operator review.",
        non_executing: true,
      },
      evidence_summary: {
        evidence_summary_label:
          "Evidence summary remains bounded to contract-safe review packet support.",
        evidence_status: "insufficient_evidence",
        evidence_refs: [
          {
            evidence_ref: "trace-ref-01",
            evidence_kind: "trace_evidence_summary",
          },
        ],
      },
      learning_suggestion_summary: {
        suggestion_posture: "suggestion_only",
        suggestion_summary:
          "Suggestion only: capture the stale-handling pattern for later review.",
        marker_status: "omitted_by_contract",
      },
      state_evaluation_exposure: {
        exposure_scope: "review_packet_state_exposure",
        evaluation_id: "review-eval-01",
        initial_state: "state_observed",
        transition_event: "raise_review",
        requested_next_state: "state_review_needed",
        reducer_target_state: "state_review_needed",
        transition_accepted: false,
        final_state: "state_review_needed",
        blocked_reason:
          "review posture remains blocked until stale context is clarified.",
        terminal: true,
        non_executing: true,
        source_posture: "stale_context",
        source_markers: [
          "omitted_by_contract",
          "insufficient_evidence",
          "stale",
        ],
        notes: [
          "Detailed review note one.",
          "Detailed review note two.",
        ],
      },
      status_markers: [
        "omitted_by_contract",
        "insufficient_evidence",
        "stale",
      ],
      family_status_summaries: [
        {
          family: "continuity_projection_summary",
          availability: "stale",
          summary_label: "continuity stale",
        },
        {
          family: "confirm_trace_decision_projection_summary",
          availability: "insufficient_evidence",
          summary_label: "evidence insufficient",
        },
      ],
    };

  const page = renderSecretaryHandoffReviewPage(review_shell);
  const display = page.sections.founder_request_exception_display;

  assert.ok(display);
  assert.equal(display.request_ref, "founder-request-01");
  assert.equal(display.derived_exception_posture, "stale_context");
  assert.equal(display.marker_status_summary, "stale visible");
  assert.equal(display.evidence_status_summary, "insufficiency visible");
  assert.deepEqual(display.status_marker_summaries, [
    "omission visible",
    "insufficiency visible",
    "stale visible",
  ]);
  assert.equal(
    display.learning_suggestion_display?.suggestion_posture_notice,
    "suggestion_only"
  );
  assert.equal(
    display.bounded_recommendation_display?.non_executing,
    true
  );
  assert.ok(display.state_evaluation_summary);
  assert.equal(
    display.state_evaluation_summary?.transition_accepted,
    false
  );
  assert.equal(display.state_evaluation_summary?.terminal, true);
  assert.equal(display.state_evaluation_summary?.non_executing, true);
  assert.deepEqual(display.state_evaluation_summary?.source_markers, [
    "omitted_by_contract",
    "insufficient_evidence",
    "stale",
  ]);
  assert.doesNotMatch(
    display.bounded_recommendation_display?.recommendation_notice ?? "",
    /approve|reject|dispatch|execute|provider|channel/
  );
  assert.match(page.html, /Founder Request Exception Display/);
  assert.match(page.html, /Evidence summary only: Evidence summary remains bounded to contract-safe review packet support\./);
  assert.match(page.html, /Evidence display posture: insufficiency visible/);
  assert.match(page.html, /Display marker: omission visible/);
  assert.match(page.html, /Display marker: stale visible/);
  assert.match(page.html, /Learning suggestion only: Suggestion only: capture the stale-handling pattern for later review\./);
  assert.match(page.html, /Learning posture notice: suggestion_only/);
  assert.match(page.html, /Detailed State Explanation/);
  assert.match(page.html, /State evaluation id: review-eval-01/);
  assert.match(page.html, /Requested next state: state_review_needed/);
  assert.match(page.html, /Reducer target state: state_review_needed/);
  assert.match(page.html, /State evaluation accepted: blocked state transition/);
  assert.match(page.html, /Blocked state transition: review posture remains blocked until stale context is clarified\./);
  assert.match(page.html, /State line terminal: state line terminal/);
  assert.match(page.html, /Non-executing: true/);
  assert.match(page.html, /Source posture: stale_context/);
  assert.match(page.html, /Source markers: omission visible, insufficiency visible, stale visible/);
  assert.match(page.html, /Bounded notes: Detailed review note one\. \| Detailed review note two\./);
  assert.match(page.html, /State evaluation accepted remains reducer-backed state truth and not approval\./);
  assert.match(page.html, /Blocked state transition remains state-transition reasoning and not a task failure verdict\./);
  assert.match(page.html, /State line terminal remains bounded terminality and not execution complete\./);
  assert.match(page.html, /Evidence summary remains summary-only and not proof\./);
  assert.match(page.html, /Bounded recommendation summary: Prepare a bounded revision summary for later operator review\./);
  assert.match(page.html, /Recommendation non_executing: true/);
  assert.match(page.html, /Evidence remains summary-only here and does not become a raw trace dump or raw runtime detail\./);
  assert.doesNotMatch(page.html, /trace-ref-01/);
});

test("[app] secretary handoff review page displays V1.1 review posture and blocked fallback boundary", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-01"
  );
  const review_shell =
    composeSecretaryHandoffReviewPacketShell(staging_shell);
  const page_model = createV11IntakeToPacketPageModel({
    request: create_v11_request(),
    projection_summary: create_v11_projection_summary({
      runtime_private_fields_omitted: false,
    }),
  });
  const page = renderSecretaryHandoffReviewPage(review_shell, page_model);

  assert.ok(page.sections.v11_packet_candidate);
  assert.equal(page.sections.v11_packet_candidate?.blocked_by_contract, true);
  assert.match(page.html, /V1\.1 Packet Candidate Review/);
  assert.match(page.html, /Blocked by contract: true/);
  assert.match(page.html, /Blocked by contract reason:/);
  assert.match(page.html, /Transition accepted is approval: false/);
  assert.match(page.html, /Terminal is execution complete: false/);
  assert.match(page.html, /Evidence summary is proof: false/);
  assert.match(page.html, /Recommendation is execution: false/);
  assert.match(page.html, /Blocked actions remain negative boundary only and not enabled controls\./);
  assert.doesNotMatch(page.html, /approval granted/i);
  assert.doesNotMatch(page.html, /execution completed/i);
  assert.doesNotMatch(page.html, /proof of correctness/i);
});
