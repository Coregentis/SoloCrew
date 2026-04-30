import assert from "node:assert/strict";
import test from "node:test";

import {
  SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAG_NAMES,
  SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAGS,
  SOLOCREW_CGOS_REVIEW_LOOP_ADAPTER_STATUS_VALUES,
} from "../../app/engagement/cgos-projection-safe-adapter-contract.ts";

test("[cgos adapter] contract exports adapter statuses", () => {
  assert.deepEqual(SOLOCREW_CGOS_REVIEW_LOOP_ADAPTER_STATUS_VALUES, [
    "draft",
    "adapter_ready",
    "blocked",
    "archived",
  ]);
});

test("[cgos adapter] contract exports all required boundary flags as true", () => {
  const required_flags = [
    "local_only",
    "manual_first",
    "review_only",
    "deterministic",
    "non_executing",
    "projection_safe",
    "runtime_private_fields_omitted",
    "no_external_service",
    "no_file_system_write",
    "no_database_storage",
    "no_persistence_adapter",
    "no_file_export_path",
    "no_cloud_sync",
    "no_provider_dispatch",
    "no_channel_dispatch",
    "no_marketplace",
    "no_crm",
    "no_email_dispatch",
    "no_public_publishing",
    "no_payment",
    "no_llm_or_tool_invocation",
    "no_autonomy",
    "no_package_publish",
    "no_mplp_certification_or_endorsement",
    "no_public_beta",
    "no_private_beta",
    "no_paid_product_readiness",
    "no_commercial_readiness",
    "no_production_readiness",
  ];

  assert.deepEqual([...SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAG_NAMES], required_flags);

  for (const flag of required_flags) {
    assert.equal(
      SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAGS[
        flag as keyof typeof SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAGS
      ],
      true
    );
  }
});
