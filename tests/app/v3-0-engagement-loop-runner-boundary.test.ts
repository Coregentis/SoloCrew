import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAG_NAMES,
} from "../../app/engagement/engagement-loop-runner-contract.ts";
import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  createEngagementLoopRunnerFixture,
} from "../../projection/fixtures/v3-0-engagement-loop-runner-fixture.ts";

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
  "review_packet",
  "review_packet_output",
  "persistence_adapter",
  "database_ref",
  "file_export_path",
  "route_url",
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

test("[v3.0] engagement loop runner keeps every boundary flag true", () => {
  const fixture = createEngagementLoopRunnerFixture();

  for (const bounded of [
    fixture.loop_result,
    fixture.run,
    ...fixture.steps,
  ]) {
    for (const flag of ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAG_NAMES) {
      assert.equal(bounded.boundary_flags[flag], true);
    }
  }
});

test("[v3.0] engagement loop runner exposes no forbidden positive fields", () => {
  const entry_result = create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-loop-boundary",
    workspace_id: "engagement-workspace-loop-boundary",
    session_id: "engagement-session-loop-boundary",
    loop_state_id: "engagement-loop-state-loop-boundary",
    history_record_id: "engagement-history-loop-boundary",
    engagement_ref: "engagement-loop-boundary",
    participant_refs: ["participant-founder"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T13:40:00.000Z",
    current_stage: "candidate",
    commercial_mode: "free_discovery",
  });
  const result = run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-boundary",
    run_id: "engagement-loop-run-boundary",
    reviewed_at: "2026-04-30T13:45:00.000Z",
    entry_workspace_result: entry_result,
  });
  const keys = collect_keys(result);

  for (const forbidden_field of FORBIDDEN_FIELD_NAMES) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  assert.equal(keys.has("no_review_packet_output"), true);
  assert.equal(keys.has("no_persistence_infrastructure"), true);
  assert.equal(keys.has("no_external_service"), true);
});

test("[v3.0] engagement loop runner payload has no route persistence export or execution payload", () => {
  const fixture = createEngagementLoopRunnerFixture();
  const payload = JSON.stringify(fixture);

  assert.doesNotMatch(payload, /route_url/i);
  assert.doesNotMatch(payload, /persistence_adapter/i);
  assert.doesNotMatch(payload, /database_ref/i);
  assert.doesNotMatch(payload, /file_export_path/i);
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
