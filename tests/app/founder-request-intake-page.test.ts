import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  composeFounderRequestIntakeShell,
  FOUNDER_REQUEST_INTAKE_ROUTE,
} from "../../app/shell/founder-request-intake.ts";
import {
  renderFounderRequestIntakePage,
} from "../../app/pages/founder-request-intake-page.ts";

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
