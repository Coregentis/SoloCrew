import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
  V3_0_WORKSPACE_SOURCE_METADATA,
} from "../../app/engagement/engagement-workspace-contract.ts";
import {
  ENGAGEMENT_ENTRY_SURFACE_ACTION_VALUES,
  ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAG_NAMES,
  ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAGS,
  ENGAGEMENT_ENTRY_SURFACE_FIELD_NAMES,
  ENGAGEMENT_ENTRY_SURFACE_MODE_VALUES,
  ENGAGEMENT_ENTRY_SURFACE_RESULT_FIELD_NAMES,
  ENGAGEMENT_ENTRY_SURFACE_STATUS_VALUES,
} from "../../app/engagement/engagement-entry-surface-contract.ts";

test("[v3.0] workspace source metadata canonical constant preserves compatibility alias", () => {
  assert.equal(
    ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
    V3_0_WORKSPACE_SOURCE_METADATA
  );
});

test("[v3.0] engagement entry surface contract exports required modes statuses and actions", () => {
  assert.deepEqual(ENGAGEMENT_ENTRY_SURFACE_MODE_VALUES, [
    "create_local_engagement",
    "load_local_engagement",
    "review_existing_workspace",
  ]);
  assert.deepEqual(ENGAGEMENT_ENTRY_SURFACE_STATUS_VALUES, [
    "draft",
    "ready_for_review",
    "loaded",
    "blocked",
  ]);
  assert.deepEqual(ENGAGEMENT_ENTRY_SURFACE_ACTION_VALUES, [
    "create_workspace_locally",
    "load_workspace_locally",
    "review_workspace_locally",
    "return_to_operator",
  ]);
});

test("[v3.0] engagement entry surface contract exports stable model fields", () => {
  assert.deepEqual(ENGAGEMENT_ENTRY_SURFACE_FIELD_NAMES, [
    "surface_id",
    "mode",
    "status",
    "workspace_ref",
    "session_ref",
    "current_stage",
    "commercial_mode",
    "available_actions",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_ENTRY_SURFACE_RESULT_FIELD_NAMES, [
    "result_id",
    "status",
    "surface_model",
    "workspace_ref",
    "session_ref",
    "result_summary",
    "boundary_flags",
  ]);
});

test("[v3.0] engagement entry surface contract preserves required boundary flags", () => {
  assert.deepEqual(ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAG_NAMES, [
    "local_only",
    "manual_first",
    "review_only",
    "deterministic",
    "non_executing",
    "no_external_service",
    "no_persistence_infrastructure",
    "no_payment",
    "no_crm",
    "no_publishing",
    "no_llm_or_tool_invocation",
    "no_autonomy",
    "no_package_publish",
    "no_public_beta",
    "no_commercial_readiness_claim",
    "no_production_readiness_claim",
    "no_mplp_certification_or_endorsement",
  ]);

  for (const flag of ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAG_NAMES) {
    assert.equal(ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAGS[flag], true);
  }
});
