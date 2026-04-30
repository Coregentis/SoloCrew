import assert from "node:assert/strict";
import test from "node:test";

import {
  create_solocrew_cgos_review_loop_adapter_result,
} from "../../app/engagement/cgos-projection-safe-adapter-workflow.ts";
import {
  createCgosBackedEngagementLoopFixture,
} from "../../projection/fixtures/cgos-backed-engagement-loop-fixture.ts";
import {
  createDeliverableEngagementLoopFixture,
} from "../../projection/fixtures/v3-0-deliverable-engagement-loop-fixture.ts";

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

function assert_core_boundaries(flags: Record<string, unknown>) {
  assert.equal(flags.local_only, true);
  assert.equal(flags.manual_first, true);
  assert.equal(flags.review_only, true);
  assert.equal(flags.deterministic, true);
  assert.equal(flags.non_executing, true);
}

test("[cgos adapter] local V3.0 path and CGOS-backed adapter path both work", () => {
  const local = createDeliverableEngagementLoopFixture();
  const cgos_backed = createCgosBackedEngagementLoopFixture();

  assert.equal(local.history_result.export_package.status, "ready_for_local_review");
  assert.equal(cgos_backed.adapter_result.status, "adapter_ready");
  assert.notEqual(
    local.fixture_id,
    cgos_backed.fixture_id,
    "CGOS-backed fixture is additive and separate"
  );
  assert.equal(
    cgos_backed.adapter_result.source_metadata.cgos_import_posture,
    "structural_projection_safe_input"
  );
});

test("[cgos adapter] dual paths preserve no-claim and no-execution boundaries", () => {
  const local = createDeliverableEngagementLoopFixture();
  const cgos_backed = createCgosBackedEngagementLoopFixture();

  assert_core_boundaries(local.boundary_flags);
  assert_core_boundaries(cgos_backed.adapter_result.boundary_flags);
  assert.equal(cgos_backed.adapter_result.boundary_flags.projection_safe, true);
  assert.equal(
    cgos_backed.adapter_result.boundary_flags.runtime_private_fields_omitted,
    true
  );
  assert.equal(cgos_backed.adapter_result.boundary_flags.no_package_publish, true);
  assert.equal(
    cgos_backed.adapter_result.boundary_flags
      .no_mplp_certification_or_endorsement,
    true
  );
});

test("[cgos adapter] dual paths avoid forbidden positive fields", () => {
  const local = createDeliverableEngagementLoopFixture();
  const cgos_backed = createCgosBackedEngagementLoopFixture();
  const local_keys = collect_keys(local);
  const cgos_keys = collect_keys(cgos_backed);

  for (const forbidden_field of FORBIDDEN_POSITIVE_FIELDS) {
    assert.equal(local_keys.has(forbidden_field), false, `local:${forbidden_field}`);
    assert.equal(cgos_keys.has(forbidden_field), false, `cgos:${forbidden_field}`);
  }

  assert.doesNotMatch(JSON.stringify(local), /raw_runtime_private_payload/u);
  assert.doesNotMatch(JSON.stringify(cgos_backed), /raw_runtime_private_payload/u);
});

test("[cgos adapter] blocked CGOS input remains blocked without MPLP implication", () => {
  const blocked = create_solocrew_cgos_review_loop_adapter_result({
    cgos_loop_state: {
      status: "blocked",
      blocked_step_refs: ["blocked-ref-01"],
    },
    cgos_runner: {
      step_refs: [
        {
          step_ref: "blocked-ref-01",
          status: "blocked",
        },
      ],
    },
  });

  assert.equal(blocked.status, "blocked");
  assert.equal(blocked.boundary_flags.non_executing, true);
  assert.equal(
    blocked.boundary_flags.no_mplp_certification_or_endorsement,
    true
  );
  assert.equal(
    blocked.source_metadata.cgos_import_posture,
    "structural_projection_safe_input"
  );
});
