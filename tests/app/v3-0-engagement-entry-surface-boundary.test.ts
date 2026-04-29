import assert from "node:assert/strict";
import test from "node:test";

import {
  createEngagementEntrySurfacePageModel,
} from "../../app/shell/create-engagement-entry-surface-page-model.ts";
import {
  ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAG_NAMES,
} from "../../app/engagement/engagement-entry-surface-contract.ts";
import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  createEngagementEntrySurfaceFixture,
} from "../../projection/fixtures/v3-0-engagement-entry-surface-fixture.ts";

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

const FORBIDDEN_INFRASTRUCTURE_FIELDS = [
  "route",
  "route_url",
  "url",
  "href",
  "file_path",
  "database",
  "database_ref",
  "db_ref",
  "store_ref",
  "storage_ref",
  "external_service",
  "api_key",
  "endpoint",
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

test("[v3.0] engagement entry surface keeps every boundary flag true", () => {
  const fixture = createEngagementEntrySurfaceFixture();

  for (const model of [
    fixture.create_result,
    fixture.create_result.surface_model,
    fixture.load_result,
    fixture.load_result.surface_model,
    fixture.review_model,
  ]) {
    for (const flag of ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAG_NAMES) {
      assert.equal(model.boundary_flags[flag], true);
    }
  }
});

test("[v3.0] engagement entry surface exposes no forbidden positive fields", () => {
  const result = create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-boundary",
    workspace_id: "engagement-workspace-boundary",
    session_id: "engagement-session-boundary",
    loop_state_id: "engagement-loop-state-boundary",
    history_record_id: "engagement-history-boundary",
    engagement_ref: "engagement-boundary",
    participant_refs: ["participant-founder"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T12:15:00.000Z",
    current_stage: "candidate",
    commercial_mode: "free_discovery",
  });
  const page_model = createEngagementEntrySurfacePageModel({
    result,
    generated_at: "2026-04-30T12:20:00.000Z",
  });
  const keys = collect_keys({ result, page_model });

  for (const forbidden_field of FORBIDDEN_FIELD_NAMES) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  for (const forbidden_field of FORBIDDEN_INFRASTRUCTURE_FIELDS) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  assert.equal(keys.has("no_persistence_infrastructure"), true);
  assert.equal(keys.has("no_external_service"), true);
});

test("[v3.0] engagement entry surface payload has no route persistence or execution payload", () => {
  const fixture = createEngagementEntrySurfaceFixture();
  const payload = JSON.stringify(fixture);

  assert.doesNotMatch(payload, /route_url/i);
  assert.doesNotMatch(payload, /file_path/i);
  assert.doesNotMatch(payload, /database_ref/i);
  assert.doesNotMatch(payload, /external_service_ref/i);
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
