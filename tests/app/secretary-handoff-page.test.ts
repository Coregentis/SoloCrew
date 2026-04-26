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
        terminal: false,
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
      insufficient: false,
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

test("[app] secretary handoff page stays staged-only and below direct-control semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
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
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
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
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
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

test("[app] secretary handoff page displays V1.1 staging posture without dispatch semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
  const staging_shell = composeSecretaryHandoffStagingShell(
    portfolio_shell,
    "cell-scope-01"
  );
  const page_model = createV11IntakeToPacketPageModel({
    request: create_v11_request(),
    projection_summary: create_v11_projection_summary({
      evidence_posture: {
        ...create_v11_projection_summary().evidence_posture,
        stale: true,
      },
    }),
  });
  const page = renderSecretaryHandoffPage(staging_shell, page_model);

  assert.ok(page.sections.v11_packet_candidate);
  assert.equal(page.sections.v11_packet_candidate?.staging_posture, "stale_context");
  assert.match(page.html, /V1\.1 Packet Candidate Staging/);
  assert.match(page.html, /Staging posture: stale_context/);
  assert.match(page.html, /Evidence posture: stale context:/);
  assert.match(page.html, /Boundary summary: No provider\/channel execution\./);
  assert.match(page.html, /Staging remains non-executing and does not become dispatch-ready\./);
  assert.doesNotMatch(page.html, /dispatch-ready button/i);
});
