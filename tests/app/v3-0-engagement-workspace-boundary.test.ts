import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_WORKSPACE_BOUNDARY_FLAG_NAMES,
} from "../../app/engagement/engagement-workspace-contract.ts";
import {
  create_engagement_workspace_bundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";
import {
  createEngagementWorkspaceFixture,
} from "../../projection/fixtures/v3-0-engagement-workspace-fixture.ts";

const FORBIDDEN_FIELD_NAMES = [
  "payment_processor",
  "checkout",
  "subscription",
  "automated_billing",
  "crm",
  "email_dispatch",
  "public_publishing",
  "testimonial_publish",
  "external_analytics",
  "llm_call",
  "model_call",
  "agent_dispatch",
  "tool_invocation",
  "saas_sharing",
  "customer_account",
  "automatic_conversion",
  "provider_dispatch",
  "channel_dispatch",
  "marketplace",
  "autonomous_execution",
  "package_publish",
  "npm_publish",
  "mplp_certification",
  "mplp_endorsement",
] as const;

function collect_keys(value: unknown, keys = new Set<string>()): Set<string> {
  if (Array.isArray(value)) {
    for (const item of value) {
      collect_keys(item, keys);
    }

    return keys;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      keys.add(key);
      collect_keys(nested, keys);
    }
  }

  return keys;
}

test("[v3.0] workspace bundle keeps every required boundary flag true", () => {
  const fixture = createEngagementWorkspaceFixture();

  for (const model of [
    fixture.workspace,
    fixture.session,
    fixture.loop_state,
    ...fixture.history_records,
  ]) {
    for (const flag of ENGAGEMENT_WORKSPACE_BOUNDARY_FLAG_NAMES) {
      assert.equal(model.boundary_flags[flag], true);
    }
  }
});

test("[v3.0] workspace runtime contract exposes no forbidden positive fields", () => {
  const bundle = create_engagement_workspace_bundle({
    workspace_id: "workspace-v3-0-boundary",
    session_id: "session-v3-0-boundary",
    loop_state_id: "loop-state-v3-0-boundary",
    history_record_id: "history-v3-0-boundary",
    engagement_ref: "engagement-v3-0-boundary",
    participant_refs: ["participant-founder"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T10:15:00.000Z",
    current_stage: "onboarding",
    commercial_mode: "manual_paid_pilot",
  });
  const keys = collect_keys(bundle);

  for (const forbidden_field of FORBIDDEN_FIELD_NAMES) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  assert.equal(keys.has("no_package_publish"), true);
  assert.equal(keys.has("no_mplp_certification_or_endorsement"), true);
});

test("[v3.0] workspace fixture remains local review-only and non-executing", () => {
  const fixture = createEngagementWorkspaceFixture();
  const payload = JSON.stringify(fixture);

  assert.match(payload, /local_only/);
  assert.match(payload, /manual_first/);
  assert.match(payload, /review_only/);
  assert.match(payload, /non_executing/);
  assert.doesNotMatch(payload, /payment_processor/i);
  assert.doesNotMatch(payload, /checkout_url/i);
  assert.doesNotMatch(payload, /subscription_id/i);
  assert.doesNotMatch(payload, /crm_object_id/i);
  assert.doesNotMatch(payload, /email_dispatch_payload/i);
  assert.doesNotMatch(payload, /public_publishing_payload/i);
  assert.doesNotMatch(payload, /llm_execution_prompt/i);
  assert.doesNotMatch(payload, /model_call_payload/i);
  assert.doesNotMatch(payload, /agent_dispatch_payload/i);
  assert.doesNotMatch(payload, /tool_invocation_payload/i);
  assert.doesNotMatch(payload, /saas_share_url/i);
  assert.doesNotMatch(payload, /autonomous_execution_enabled/i);
  assert.doesNotMatch(payload, /raw_runtime_private_payload/i);
});
