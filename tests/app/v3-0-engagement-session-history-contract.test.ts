import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_HISTORY_ENTRY_FIELD_NAMES,
  ENGAGEMENT_HISTORY_ENTRY_KIND_VALUES,
  ENGAGEMENT_HISTORY_LEDGER_FIELD_NAMES,
  ENGAGEMENT_SESSION_EXPORT_KIND_VALUES,
  ENGAGEMENT_SESSION_EXPORT_PACKAGE_FIELD_NAMES,
  ENGAGEMENT_SESSION_EXPORT_STATUS_VALUES,
  ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAG_NAMES,
  ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS,
  ENGAGEMENT_SESSION_HISTORY_RESULT_FIELD_NAMES,
  ENGAGEMENT_SESSION_HISTORY_STATUS_VALUES,
} from "../../app/engagement/engagement-session-history-contract.ts";

test("[v3.0] engagement session history contract exports required statuses kinds and entry kinds", () => {
  assert.deepEqual(ENGAGEMENT_SESSION_HISTORY_STATUS_VALUES, [
    "draft",
    "assembled",
    "export_ready",
    "blocked",
    "archived",
  ]);
  assert.deepEqual(ENGAGEMENT_SESSION_EXPORT_STATUS_VALUES, [
    "draft",
    "ready_for_local_review",
    "blocked",
    "archived",
  ]);
  assert.deepEqual(ENGAGEMENT_SESSION_EXPORT_KIND_VALUES, [
    "in_memory_export_object",
    "deterministic_summary_object",
    "audit_snapshot_object",
  ]);
  assert.deepEqual(ENGAGEMENT_HISTORY_ENTRY_KIND_VALUES, [
    "workspace_created",
    "entry_surface_created",
    "loop_run_completed",
    "founder_review_packet_created",
    "export_package_created",
    "blocked",
  ]);
});

test("[v3.0] engagement session history contract exports stable field sets", () => {
  assert.deepEqual(ENGAGEMENT_HISTORY_LEDGER_FIELD_NAMES, [
    "ledger_id",
    "status",
    "workspace_ref",
    "session_ref",
    "engagement_ref",
    "entry_refs",
    "latest_packet_ref",
    "latest_loop_run_ref",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_HISTORY_ENTRY_FIELD_NAMES, [
    "entry_id",
    "entry_kind",
    "event_summary",
    "source_refs",
    "created_at",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_SESSION_EXPORT_PACKAGE_FIELD_NAMES, [
    "export_id",
    "export_kind",
    "status",
    "ledger_ref",
    "workspace_ref",
    "session_ref",
    "engagement_ref",
    "packet_ref",
    "loop_run_ref",
    "history_entry_refs",
    "export_summary",
    "source_refs",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_SESSION_HISTORY_RESULT_FIELD_NAMES, [
    "result_id",
    "ledger",
    "entries",
    "export_package",
    "result_summary",
    "boundary_flags",
  ]);
});

test("[v3.0] engagement session history contract preserves required boundary flags", () => {
  assert.deepEqual(ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAG_NAMES, [
    "local_only",
    "manual_first",
    "review_only",
    "deterministic",
    "non_executing",
    "no_external_service",
    "no_file_system_write",
    "no_database_storage",
    "no_persistence_adapter",
    "no_file_export_path",
    "no_cloud_sync",
    "no_public_publishing",
    "no_email_dispatch",
    "no_crm",
    "no_payment",
    "no_llm_or_tool_invocation",
    "no_autonomy",
    "no_package_publish",
    "no_public_beta",
    "no_commercial_readiness_claim",
    "no_production_readiness_claim",
    "no_mplp_certification_or_endorsement",
  ]);

  for (const flag of ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAG_NAMES) {
    assert.equal(ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS[flag], true);
  }
});
