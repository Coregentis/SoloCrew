import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  composeFounderRequestIntakeShell,
  FOUNDER_REQUEST_INTAKE_ROUTE,
} from "../../app/shell/founder-request-intake.ts";
import {
  createV11IntakeToPacketPageModel,
} from "../../app/shell/create-v1-1-intake-to-packet-page-model.ts";
import {
  renderFounderRequestIntakePage,
} from "../../app/pages/founder-request-intake-page.ts";
import type {
  FounderRequestStateEvaluationExposure,
} from "../../projection/contracts/founder-request-exception-packet-contract.ts";

function join_parts(...parts: string[]): string {
  return parts.join("");
}

function create_founder_request_intake() {
  return {
    founder_request_id: "founder-request-01",
    request_label: "Clarify delivery risk on the current founder loop",
    request_text:
      "I need a bounded explanation of where the current founder loop is blocked and what evidence is still missing.",
    request_intent_hint: "clarify_loop_status",
    requested_context_summary:
      "Focus on the existing founder-request packet and current review/staging visibility.",
    risk_hint: "possible release-story ambiguity",
    evidence_hint: "handoff review and staging surfaces already carry bounded evidence posture",
    created_at: "2026-04-19T12:00:00Z",
    non_executing: true as const,
  };
}

function create_v11_projection_summary() {
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
  };
}

test("[app] founder request intake page exposes a bounded intake entry and stays non-executing", () => {
  const intake_shell =
    composeFounderRequestIntakeShell(create_founder_request_intake());
  const page = renderFounderRequestIntakePage(intake_shell);

  assert.equal(page.route_path, FOUNDER_REQUEST_INTAKE_ROUTE);
  assert.equal(page.page_kind, "founder_request_intake_page");
  assert.equal(page.page_scope, "founder_request_intake_only");
  assert.equal(page.operator_surface, "founder_request_intake");
  assert.equal(page.navigation_mode, "intake_only_non_executing");
  assert.equal(page.intake_available, true);
  assert.equal(
    page.sections.request_identity.founder_request_id,
    "founder-request-01"
  );
  assert.equal(
    page.sections.request_identity.request_label,
    "Clarify delivery risk on the current founder loop"
  );
  assert.equal(
    page.sections.request_identity.created_at,
    "2026-04-19T12:00:00Z"
  );
  assert.equal(
    page.sections.request_content.request_text,
    "I need a bounded explanation of where the current founder loop is blocked and what evidence is still missing."
  );
  assert.equal(
    page.sections.request_content.request_intent_hint,
    "clarify_loop_status"
  );
  assert.equal(
    page.sections.truth_boundary.product_intake_only,
    true
  );
  assert.equal(
    page.sections.truth_boundary.intake_object_is_runtime_law,
    false
  );

  assert.match(page.html, /Founder Request Intake/);
  assert.match(
    page.html,
    /This page captures bounded founder request meaning for the current product loop\./
  );
  assert.match(
    page.html,
    /This surface is intake-only and records request meaning without starting downstream work\./
  );
  assert.match(
    page.html,
    /This intake remains non-executing and keeps review-first product boundaries visible\./
  );
  assert.match(
    page.html,
    /Founder request id: founder-request-01/
  );
  assert.match(
    page.html,
    /Request label: Clarify delivery risk on the current founder loop/
  );
  assert.match(
    page.html,
    /Request text: I need a bounded explanation of where the current founder loop is blocked and what evidence is still missing\./
  );
  assert.match(
    page.html,
    /Request intent hint: clarify_loop_status/
  );
  assert.match(
    page.html,
    /Requested context summary: Focus on the existing founder-request packet and current review\/staging visibility\./
  );
  assert.match(
    page.html,
    /Risk hint: possible release-story ambiguity/
  );
  assert.match(
    page.html,
    /Evidence hint: handoff review and staging surfaces already carry bounded evidence posture/
  );
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);
});

test("[app] founder request intake page can render bounded evaluation summary when present", () => {
  const intake_shell =
    composeFounderRequestIntakeShell(create_founder_request_intake());
  const state_evaluation_summary: FounderRequestStateEvaluationExposure = {
    exposure_scope: "packet_state_exposure",
    evaluation_id: "intake-eval-01",
    initial_state: "state_observed",
    transition_event: "raise_review",
    requested_next_state: "state_review_needed",
    reducer_target_state: "state_review_needed",
    transition_accepted: true,
    final_state: "state_review_needed",
    terminal: false,
    non_executing: true,
    source_posture: "review_needed",
    source_markers: ["available", "stale"],
    notes: [
      "Review posture is visible.",
      "Stale handling remains bounded.",
    ],
  };
  const page = renderFounderRequestIntakePage(
    intake_shell,
    state_evaluation_summary
  );

  assert.ok(page.sections.state_evaluation_summary);
  assert.equal(
    page.sections.state_evaluation_summary?.evaluation_id,
    "intake-eval-01"
  );
  assert.equal(
    page.sections.state_evaluation_summary?.transition_accepted,
    true
  );
  assert.equal(
    page.sections.state_evaluation_summary?.non_executing,
    true
  );
  assert.deepEqual(
    page.sections.state_evaluation_summary?.source_markers,
    ["available", "stale"]
  );
  assert.match(page.html, /State Evaluation Summary/);
  assert.match(page.html, /State evaluation id: intake-eval-01/);
  assert.match(page.html, /State evaluation accepted: state evaluation accepted/);
  assert.match(page.html, /Blocked state transition: none visible/);
  assert.match(page.html, /State line terminal: state line remains open/);
  assert.match(page.html, /Non-executing: true/);
  assert.match(page.html, /Source posture: review_needed/);
  assert.match(page.html, /Source markers: summary available, stale visible/);
  assert.match(page.html, /Bounded notes: Review posture is visible\. \| Stale handling remains bounded\./);
  assert.match(page.html, /State evaluation accepted remains reducer-backed state truth and not approval\./);
  assert.match(page.html, /State line terminal remains bounded terminality and not execution complete\./);
  assert.match(page.html, /does not imply packet construction happened\./);
});

test("[app] founder request intake shell and page keep forbidden labels out of the bounded intake surface", () => {
  const intake_shell =
    composeFounderRequestIntakeShell(create_founder_request_intake());
  const page = renderFounderRequestIntakePage(intake_shell);
  const serialized = JSON.stringify({
    intake_shell,
    page,
  }).toLowerCase();

  const forbidden_tokens = [
    join_parts("appro", "ve"),
    join_parts("re", "ject"),
    join_parts("dis", "patch"),
    join_parts("exe", "cute"),
    join_parts("pro", "vider"),
    join_parts("chan", "nel"),
    join_parts("queue", "_item"),
    join_parts("com", "mand"),
    join_parts("delivery", "_status"),
  ];

  for (const token of forbidden_tokens) {
    assert.equal(
      serialized.includes(token),
      false,
      `bounded intake surface must not include forbidden token ${token}`
    );
  }
});

test("[app] founder request intake source stays inside local app lanes only", () => {
  const shell_source = readFileSync(
    new URL("../../app/shell/founder-request-intake.ts", import.meta.url),
    "utf8"
  );
  const shell_contract_source = readFileSync(
    new URL(
      "../../app/shell/founder-request-intake-contract.ts",
      import.meta.url
    ),
    "utf8"
  );
  const page_source = readFileSync(
    new URL("../../app/pages/founder-request-intake-page.ts", import.meta.url),
    "utf8"
  );
  const combined_source = [
    shell_source,
    shell_contract_source,
    page_source,
  ].join("\n");

  const forbidden_import_tokens = [
    join_parts("runtime", "/", "core"),
    join_parts("runtime", "/", "in-memory"),
    join_parts("Cognitive", "_OS"),
    join_parts("raw", "_runtime"),
    join_parts("raw", "_trace"),
    join_parts("policy", "_mutated"),
    join_parts("protocol", "_certified"),
  ];

  for (const token of forbidden_import_tokens) {
    assert.equal(
      combined_source.includes(token),
      false,
      `founder request intake source must not include forbidden token ${token}`
    );
  }
});

test("[app] founder request intake page exposes packet candidate planning status", () => {
  const request = {
    ...create_founder_request_intake(),
    project_id: "project-01",
  };
  const intake_shell = composeFounderRequestIntakeShell(request);
  const page_model = createV11IntakeToPacketPageModel({
    request,
    projection_summary: create_v11_projection_summary(),
  });
  const page = renderFounderRequestIntakePage(intake_shell, undefined, page_model);

  assert.ok(page.sections.v11_packet_candidate);
  assert.equal(page.sections.v11_packet_candidate?.review_posture, "review_needed");
  assert.equal(page.sections.v11_packet_candidate?.staging_posture, "packet_candidate");
  assert.equal(page.sections.v11_packet_candidate?.review_ready, true);
  assert.match(page.html, /V1\.1 Packet Candidate Planning/);
  assert.match(page.html, /Packet candidate label: packet candidate review-ready/);
  assert.match(page.html, /Evidence posture: evidence summary: Bounded evidence summary remains available for review and staging\./);
  assert.match(page.html, /Recommendation summary: non-executing recommendation:/);
  assert.match(page.html, /Transition accepted is approval: false/);
  assert.match(page.html, /Evidence summary is proof: false/);
  assert.match(page.html, /Review posture remains bounded product planning status and not approval\./);
  assert.doesNotMatch(page.html, /approval granted/i);
});
