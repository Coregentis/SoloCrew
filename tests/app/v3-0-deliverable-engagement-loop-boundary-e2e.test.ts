import assert from "node:assert/strict";
import test from "node:test";

import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  create_engagement_session_history_from_packet,
} from "../../app/engagement/engagement-session-history-workflow.ts";
import {
  createDeliverableEngagementLoopFixture,
} from "../../projection/fixtures/v3-0-deliverable-engagement-loop-fixture.ts";

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
  "file_system_write",
  "database_storage",
  "cloud_sync",
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

function collect_boundary_flag_maps(value: unknown, maps: unknown[] = []) {
  if (Array.isArray(value)) {
    for (const item of value) {
      collect_boundary_flag_maps(item, maps);
    }

    return maps;
  }

  if (value !== null && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (
      record.boundary_flags !== null &&
      typeof record.boundary_flags === "object"
    ) {
      maps.push(record.boundary_flags);
    }

    for (const nested of Object.values(record)) {
      collect_boundary_flag_maps(nested, maps);
    }
  }

  return maps;
}

test("[v3.0] deliverable E2E loop keeps every boundary flag true across IMPL-01..05", () => {
  const fixture = createDeliverableEngagementLoopFixture();
  const boundary_flag_maps = collect_boundary_flag_maps(fixture);

  assert.ok(boundary_flag_maps.length >= 20);

  for (const flags of boundary_flag_maps) {
    for (const [flag, value] of Object.entries(flags as Record<string, unknown>)) {
      assert.equal(value, true, flag);
    }
  }
});

test("[v3.0] deliverable E2E loop exposes no forbidden positive fields", () => {
  const fixture = createDeliverableEngagementLoopFixture();
  const keys = collect_keys(fixture);

  for (const forbidden_field of FORBIDDEN_FIELD_NAMES) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  assert.equal(keys.has("no_file_system_write"), true);
  assert.equal(keys.has("no_database_storage"), true);
  assert.equal(keys.has("no_persistence_adapter"), true);
  assert.equal(keys.has("no_file_export_path"), true);
  assert.equal(keys.has("no_cloud_sync"), true);
});

test("[v3.0] deliverable E2E loop payload avoids storage route publishing and execution payloads", () => {
  const payload = JSON.stringify(createDeliverableEngagementLoopFixture());

  assert.doesNotMatch(payload, /route_url/i);
  assert.doesNotMatch(payload, /file_system_write_payload/i);
  assert.doesNotMatch(payload, /database_storage_payload/i);
  assert.doesNotMatch(payload, /persistence_adapter_payload/i);
  assert.doesNotMatch(payload, /database_ref/i);
  assert.doesNotMatch(payload, /file_export_path_payload/i);
  assert.doesNotMatch(payload, /cloud_sync_payload/i);
  assert.doesNotMatch(payload, /public_publishing_payload/i);
  assert.doesNotMatch(payload, /email_dispatch_payload/i);
  assert.doesNotMatch(payload, /crm_object_id/i);
  assert.doesNotMatch(payload, /payment_processor/i);
  assert.doesNotMatch(payload, /checkout_url/i);
  assert.doesNotMatch(payload, /subscription_id/i);
  assert.doesNotMatch(payload, /llm_execution_prompt/i);
  assert.doesNotMatch(payload, /model_call_payload/i);
  assert.doesNotMatch(payload, /agent_dispatch_payload/i);
  assert.doesNotMatch(payload, /tool_invocation_payload/i);
  assert.doesNotMatch(payload, /saas_share_url/i);
  assert.doesNotMatch(payload, /customer_account_ref/i);
  assert.doesNotMatch(payload, /automatic_conversion_payload/i);
  assert.doesNotMatch(payload, /provider_dispatch_payload/i);
  assert.doesNotMatch(payload, /channel_dispatch_payload/i);
  assert.doesNotMatch(payload, /marketplace_listing/i);
  assert.doesNotMatch(payload, /autonomous_execution_enabled/i);
  assert.doesNotMatch(payload, /raw_runtime_private_payload/i);
});

test("[v3.0] deliverable E2E missing-ref path blocks without execution", () => {
  const fixture = createDeliverableEngagementLoopFixture();
  const blocked_bundle = JSON.parse(
    JSON.stringify(fixture.workspace_bundle)
  ) as typeof fixture.workspace_bundle;
  blocked_bundle.session.workspace_ref = "mismatched-workspace-ref";

  const loop_result = run_local_engagement_loop_review({
    runner_id: "deliverable-engagement-loop-runner-v3-0-blocked",
    run_id: "deliverable-engagement-loop-run-v3-0-blocked",
    reviewed_at: "2026-04-30T16:40:00.000Z",
    workspace_bundle: blocked_bundle,
  });
  const packet_result = create_founder_review_packet_from_loop_result({
    packet_id: "deliverable-engagement-founder-packet-v3-0-blocked",
    loop_result,
  });
  const history_result = create_engagement_session_history_from_packet({
    ledger_id: "deliverable-engagement-history-ledger-v3-0-blocked",
    export_id: "deliverable-engagement-session-export-v3-0-blocked",
    created_at: "2026-04-30T16:45:00.000Z",
    packet_result,
  });

  assert.equal(loop_result.run.status, "blocked");
  assert.ok(loop_result.steps.some((step) => step.status === "blocked"));
  assert.equal(packet_result.packet.status, "blocked");
  assert.equal(history_result.ledger.status, "blocked");
  assert.equal(history_result.export_package.status, "blocked");
  assert.equal(loop_result.boundary_flags.non_executing, true);
  assert.equal(packet_result.boundary_flags.non_executing, true);
  assert.equal(history_result.boundary_flags.non_executing, true);
});
