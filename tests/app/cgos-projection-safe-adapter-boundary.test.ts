import assert from "node:assert/strict";
import test from "node:test";

import {
  create_solocrew_cgos_review_loop_adapter_result,
} from "../../app/engagement/cgos-projection-safe-adapter-workflow.ts";

const FORBIDDEN_POSITIVE_FIELDS = [
  "raw_runtime_private_payload",
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

  if (value && typeof value === "object") {
    for (const [key, nested] of Object.entries(value)) {
      keys.add(key);
      collect_keys(nested, keys);
    }
  }

  return keys;
}

function collect_boundary_maps(value: unknown, maps: unknown[] = []): unknown[] {
  if (Array.isArray(value)) {
    for (const item of value) {
      collect_boundary_maps(item, maps);
    }

    return maps;
  }

  if (value && typeof value === "object") {
    const record = value as Record<string, unknown>;

    if (
      record.boundary_flags &&
      typeof record.boundary_flags === "object" &&
      !Array.isArray(record.boundary_flags)
    ) {
      maps.push(record.boundary_flags);
    }

    for (const nested of Object.values(record)) {
      collect_boundary_maps(nested, maps);
    }
  }

  return maps;
}

test("[cgos adapter] result and candidates preserve boundary flags", () => {
  const result = create_solocrew_cgos_review_loop_adapter_result();
  const boundary_maps = collect_boundary_maps(result);

  assert.ok(boundary_maps.length >= 8);

  for (const boundary_map of boundary_maps) {
    for (const value of Object.values(boundary_map as Record<string, unknown>)) {
      assert.equal(value, true);
    }
  }

  assert.equal(result.boundary_flags.projection_safe, true);
  assert.equal(result.boundary_flags.runtime_private_fields_omitted, true);
  assert.equal(result.boundary_flags.no_provider_dispatch, true);
  assert.equal(result.boundary_flags.no_channel_dispatch, true);
});

test("[cgos adapter] forbidden positive output fields are absent", () => {
  const result = create_solocrew_cgos_review_loop_adapter_result();
  const keys = collect_keys(result);

  for (const forbidden_field of FORBIDDEN_POSITIVE_FIELDS) {
    assert.equal(keys.has(forbidden_field), false, forbidden_field);
  }

  assert.equal(keys.has("no_file_export_path"), true);
  assert.equal(keys.has("no_database_storage"), true);
  assert.equal(keys.has("no_cloud_sync"), true);
});

test("[cgos adapter] serialized output avoids runtime-private payload exposure", () => {
  const result = create_solocrew_cgos_review_loop_adapter_result();
  const payload = JSON.stringify(result);

  assert.doesNotMatch(payload, /raw_runtime_private_payload/u);
  assert.doesNotMatch(payload, /runtime_private_payload":/u);
  assert.match(payload, /runtime_private_fields_omitted/u);
  assert.match(payload, /projection_safe/u);
});
