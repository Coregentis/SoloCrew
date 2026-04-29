import assert from "node:assert/strict";
import test from "node:test";

import {
  createFounderReviewPacketPageModel,
} from "../../app/shell/create-founder-review-packet-page-model.ts";
import {
  FOUNDER_REVIEW_PACKET_BOUNDARY_FLAG_NAMES,
} from "../../app/engagement/founder-review-packet-contract.ts";
import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  createEngagementLoopRunnerFixture,
} from "../../projection/fixtures/v3-0-engagement-loop-runner-fixture.ts";
import {
  createFounderReviewPacketFixture,
} from "../../projection/fixtures/v3-0-founder-review-packet-fixture.ts";

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

test("[v3.0] founder review packet keeps every boundary flag true", () => {
  const fixture = createFounderReviewPacketFixture();

  for (const bounded of [
    fixture.packet_result,
    fixture.packet,
    ...fixture.packet.sections,
    fixture.page_model.packet_summary,
  ]) {
    for (const flag of FOUNDER_REVIEW_PACKET_BOUNDARY_FLAG_NAMES) {
      assert.equal(bounded.boundary_flags[flag], true);
    }
  }
});

test("[v3.0] founder review packet exposes no forbidden positive fields", () => {
  const loop_fixture = createEngagementLoopRunnerFixture();
  const result = create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-boundary",
    loop_result: loop_fixture.loop_result,
  });
  const page_model = createFounderReviewPacketPageModel({
    result,
    generated_at: "2026-04-30T14:50:00.000Z",
  });
  const keys = collect_keys({ result, page_model });

  for (const forbidden_field of FORBIDDEN_FIELD_NAMES) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  assert.equal(keys.has("no_file_export"), true);
  assert.equal(keys.has("no_public_publishing"), true);
  assert.equal(keys.has("no_email_dispatch"), true);
  assert.equal(keys.has("no_persistence_infrastructure"), true);
});

test("[v3.0] founder review packet payload has no export persistence route or execution payload", () => {
  const fixture = createFounderReviewPacketFixture();
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
