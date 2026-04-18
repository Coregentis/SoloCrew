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

test("[app] secretary handoff review page stays review-only and below direct-control semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
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
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
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
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
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
  assert.match(page.html, /Bounded recommendation summary: Prepare a bounded revision summary for later operator review\./);
  assert.match(page.html, /Recommendation non_executing: true/);
  assert.match(page.html, /Evidence remains summary-only here and does not become a raw trace dump or raw runtime detail\./);
  assert.doesNotMatch(page.html, /trace-ref-01/);
});
