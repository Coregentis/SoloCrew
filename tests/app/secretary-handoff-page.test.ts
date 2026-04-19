import assert from "node:assert/strict";
import test from "node:test";

import {
  renderSecretaryHandoffPage,
} from "../../app/pages/secretary-handoff-page.ts";
import {
  composePortfolioSecretaryShellFromRuntimeInputs,
} from "../../app/shell/portfolio-secretary-shell.ts";
import {
  buildSecretaryHandoffRoute,
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

test("[app] secretary handoff page stays staged-only and below direct-control semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-01"
  );
  const page = renderSecretaryHandoffPage(staging_shell);

  assert.equal(
    page.route_path,
    buildSecretaryHandoffRoute("cell-scope-01")
  );
  assert.equal(page.page_kind, "secretary_handoff_page");
  assert.equal(page.page_scope, "portfolio_secretary_handoff_staging_only");
  assert.equal(
    page.operator_surface,
    "portfolio_secretary_handoff_staging"
  );
  assert.equal(page.navigation_mode, "staging_only_non_executing");
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
  assert.equal(page.sections.target_selection.target_blocked_work_count, 1);
  assert.equal(page.sections.staging_states.length, 4);
  assert.match(
    page.sections.framing.packet_state_summary,
    /returned_for_revision for Runtime Delivery Cell/
  );
  assert.match(
    page.sections.framing.revision_loop_summary,
    /Revision visibility is active for Runtime Delivery Cell/
  );
  assert.equal(
    page.sections.rationale_evidence.rationale_scope,
    "secretary_handoff_staging_rationale"
  );
  assert.equal(page.sections.navigation.cell_links.length, 2);
  assert.equal(
    page.sections.navigation.selected_cell_routes?.handoff_route,
    "/portfolio/handoff/cell-scope-01"
  );
  assert.equal(
    page.sections.navigation.selected_cell_routes?.review_packet_route,
    "/portfolio/handoff/cell-scope-01/review"
  );

  assert.match(page.html, /Secretary Handoff Staging/);
  assert.match(page.html, /Handoff staging is product-level staging, review-packet framing, and revision-return visibility only\./);
  assert.match(page.html, /No approve, reject, dispatch, execute, provider, or runtime mutation controls are present here\./);
  assert.match(page.html, /Target cell id: cell-scope-01/);
  assert.match(page.html, /Target readiness: attention_required/);
  assert.match(page.html, /Packet state: returned_for_revision/);
  assert.match(page.html, /Packet state summary: The handoff packet is returned_for_revision for Runtime Delivery Cell and stays bounded to revision posture only\./);
  assert.match(page.html, /Revision loop summary: Revision visibility is active for Runtime Delivery Cell, but return remains a product state and not a reject, dispatch, or execution command\./);
  assert.match(page.html, /Rationale summary: The handoff exists to give Runtime Delivery Cell a bounded product-facing rationale and evidence frame before any downstream cell review occurs\./);
  assert.match(page.html, /State reason: The packet is returned_for_revision because Runtime Delivery Cell currently needs bounded revision visibility, not rejection, dispatch, or execution authority\./);
  assert.match(page.html, /Evidence summary: Evidence is bounded to Runtime Delivery Cell readiness, delivery posture, work counts, and visible management posture already projected into SoloCrew\./);
  assert.match(page.html, /Provenance summary: Provenance remains downstream: runtime-private records stay upstream in Cognitive_OS while SoloCrew stages explanatory handoff framing and omission-aware notes only\./);
  assert.match(page.html, /Omission note: Handoff staging explains bounded intent and evidence only; it does not submit, send, or execute the handoff\./);
  assert.match(page.html, /Review packet route: \/portfolio\/handoff\/cell-scope-01\/review/);
  assert.match(page.html, /Selected handoff route: \/portfolio\/handoff\/cell-scope-01/);
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.target_selection,
    page.sections.staging_states[0],
    page.sections.framing,
    page.sections.rationale_evidence,
    page.sections.truth_boundary,
    staging_shell.handoff_staging_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[app] secretary handoff page exposes no dispatch or execute controls", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-02"
  );
  const page = renderSecretaryHandoffPage(staging_shell);

  assert.equal(page.sections.target_selection.target_cell_id, "cell-scope-02");
  assert.equal(page.sections.target_selection.target_readiness_signal, "attention_required");
  assert.equal(page.sections.framing.packet_state, "ready_for_cell_review");
  assert.match(
    page.sections.framing.packet_state_summary,
    /ready_for_cell_review for Runtime Review Cell/
  );
  assert.equal(page.sections.navigation.cell_links[1]?.selected, true);
  assert.equal(page.direct_approve_control_available, false);
  assert.equal(page.direct_reject_control_available, false);
  assert.equal(page.direct_dispatch_control_available, false);
  assert.equal(page.direct_execute_control_available, false);
  assert.ok(
    page.sections.truth_boundary.non_claims.includes("no_handoff_execution")
  );
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);
  assert.doesNotMatch(page.html, /dispatch button/i);
  assert.doesNotMatch(page.html, /run provider/i);
  assert.doesNotMatch(page.html, /publish\/send/i);
});

test("[app] secretary handoff page hardens compact evidence and stale preview semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-01"
  );

  staging_shell.handoff_staging_projection.founder_request_exception_preview = {
    preview_scope: "founder_request_exception_staging_preview",
    request_ref: "founder-request-02",
    request_label: "Founder request compact preview",
    derived_exception_posture: "blocked_by_contract",
    review_return_posture: "return_for_revision",
    review_return_summary:
      "Compact staging preview shows stale and omitted posture without full review-packet detail.",
    marker_status: "omitted_by_contract",
    evidence_posture_summary: {
      evidence_summary_label:
        "Evidence summary stays compact and bounded at staging level.",
      evidence_status: "stale",
    },
    learning_suggestion_hint: {
      suggestion_posture: "suggestion_only",
      suggestion_summary:
        "Suggestion only: revisit the stale continuity summary before deeper review.",
      marker_status: "insufficient_evidence",
    },
    state_evaluation_exposure: {
      exposure_scope: "staging_state_exposure",
      evaluation_id: "staging-eval-01",
      initial_state: "state_observed",
      transition_event: "raise_review",
      transition_accepted: false,
      final_state: "state_review_needed",
      blocked_reason: "review posture still depends on stale continuity context.",
      terminal: false,
      non_executing: true,
      source_posture: "review_needed",
      source_markers: [
        "omitted_by_contract",
        "insufficient_evidence",
        "stale",
      ],
      notes: [
        "Compact staging note one.",
        "Compact staging note two.",
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
        family: "learning_suggestion_projection_summary",
        availability: "insufficient_evidence",
        summary_label: "learning insufficient",
      },
    ],
  };

  const page = renderSecretaryHandoffPage(staging_shell);
  const preview = page.sections.founder_request_exception_preview;

  assert.ok(preview);
  assert.equal(preview.request_ref, "founder-request-02");
  assert.equal(preview.derived_exception_posture, "blocked_by_contract");
  assert.equal(preview.marker_status_summary, "omission visible");
  assert.equal(preview.evidence_status_summary, "stale visible");
  assert.deepEqual(preview.status_marker_summaries, [
    "omission visible",
    "insufficiency visible",
    "stale visible",
  ]);
  assert.equal(
    preview.learning_suggestion_hint?.suggestion_posture_notice,
    "suggestion_only"
  );
  assert.ok(preview.state_evaluation_summary);
  assert.equal(
    preview.state_evaluation_summary?.transition_accepted,
    false
  );
  assert.equal(preview.state_evaluation_summary?.non_executing, true);
  assert.deepEqual(preview.state_evaluation_summary?.source_markers, [
    "omitted_by_contract",
    "insufficient_evidence",
    "stale",
  ]);
  assert.doesNotMatch(
    preview.learning_suggestion_hint?.suggestion_summary ?? "",
    /approve|reject|dispatch|execute|provider|channel/
  );
  assert.match(page.html, /Founder Request Exception Preview/);
  assert.match(page.html, /Evidence summary only: Evidence summary stays compact and bounded at staging level\./);
  assert.match(page.html, /Evidence display posture: stale visible/);
  assert.match(page.html, /Display marker: omission visible/);
  assert.match(page.html, /Display marker: insufficiency visible/);
  assert.match(page.html, /Learning suggestion only: Suggestion only: revisit the stale continuity summary before deeper review\./);
  assert.match(page.html, /Learning posture notice: suggestion_only/);
  assert.match(page.html, /Compact State Preview/);
  assert.match(page.html, /State evaluation id: staging-eval-01/);
  assert.match(page.html, /State evaluation accepted: blocked state transition/);
  assert.match(page.html, /Blocked state transition: review posture still depends on stale continuity context\./);
  assert.match(page.html, /State line terminal: state line remains open/);
  assert.match(page.html, /Non-executing: true/);
  assert.match(page.html, /Source posture: review_needed/);
  assert.match(page.html, /Source markers: omission visible, insufficiency visible, stale visible/);
  assert.match(page.html, /Bounded notes: Compact staging note one\. \| Compact staging note two\./);
  assert.match(page.html, /Compact state preview keeps state evaluation truth below approval meaning and below execution complete meaning\./);
  assert.match(page.html, /Staging keeps evidence compact, omission-aware, insufficiency-aware, and stale-aware without exposing a raw trace dump or raw runtime detail\./);
  assert.doesNotMatch(page.html, /Requested next state:/);
  assert.doesNotMatch(page.html, /Reducer target state:/);
  assert.doesNotMatch(page.html, /Bounded recommendation summary/);
});
