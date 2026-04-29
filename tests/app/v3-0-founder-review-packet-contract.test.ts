import assert from "node:assert/strict";
import test from "node:test";

import {
  FOUNDER_REVIEW_PACKET_BOUNDARY_FLAG_NAMES,
  FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS,
  FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES,
  FOUNDER_REVIEW_PACKET_FIELD_NAMES,
  FOUNDER_REVIEW_PACKET_RESULT_FIELD_NAMES,
  FOUNDER_REVIEW_PACKET_SECTION_FIELD_NAMES,
  FOUNDER_REVIEW_PACKET_SECTION_ID_VALUES,
  FOUNDER_REVIEW_PACKET_SECTION_STATUS_VALUES,
  FOUNDER_REVIEW_PACKET_STATUS_VALUES,
  FOUNDER_REVIEW_PACKET_SUMMARY_FIELD_NAMES,
} from "../../app/engagement/founder-review-packet-contract.ts";

test("[v3.0] founder review packet contract exports required statuses decisions and sections", () => {
  assert.deepEqual(FOUNDER_REVIEW_PACKET_STATUS_VALUES, [
    "draft",
    "ready_for_founder_review",
    "blocked",
    "archived",
  ]);
  assert.deepEqual(FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES, [
    "continue_review",
    "request_more_evidence",
    "hold_for_operator_review",
    "block_until_refs_fixed",
    "archive_without_action",
  ]);
  assert.deepEqual(FOUNDER_REVIEW_PACKET_SECTION_ID_VALUES, [
    "engagement_context",
    "workspace_summary",
    "loop_review_summary",
    "reviewed_steps",
    "blocked_items",
    "pending_items",
    "founder_decision_options",
    "boundary_notice",
  ]);
  assert.deepEqual(FOUNDER_REVIEW_PACKET_SECTION_STATUS_VALUES, [
    "ready",
    "pending",
    "blocked",
    "notice",
  ]);
});

test("[v3.0] founder review packet contract exports stable field sets", () => {
  assert.deepEqual(FOUNDER_REVIEW_PACKET_FIELD_NAMES, [
    "packet_id",
    "status",
    "engagement_ref",
    "workspace_ref",
    "session_ref",
    "loop_run_ref",
    "current_stage",
    "commercial_mode",
    "sections",
    "decision_options",
    "source_refs",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(FOUNDER_REVIEW_PACKET_SECTION_FIELD_NAMES, [
    "section_id",
    "title",
    "summary",
    "item_refs",
    "status",
    "boundary_flags",
  ]);
  assert.deepEqual(FOUNDER_REVIEW_PACKET_SUMMARY_FIELD_NAMES, [
    "packet_ref",
    "status",
    "engagement_ref",
    "workspace_ref",
    "loop_run_ref",
    "section_count",
    "decision_options",
    "blocked_item_count",
    "pending_item_count",
    "boundary_flags",
  ]);
  assert.deepEqual(FOUNDER_REVIEW_PACKET_RESULT_FIELD_NAMES, [
    "result_id",
    "packet",
    "result_summary",
    "boundary_flags",
  ]);
});

test("[v3.0] founder review packet contract preserves required boundary flags", () => {
  assert.deepEqual(FOUNDER_REVIEW_PACKET_BOUNDARY_FLAG_NAMES, [
    "local_only",
    "manual_first",
    "review_only",
    "deterministic",
    "non_executing",
    "no_external_service",
    "no_persistence_infrastructure",
    "no_file_export",
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

  for (const flag of FOUNDER_REVIEW_PACKET_BOUNDARY_FLAG_NAMES) {
    assert.equal(FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS[flag], true);
  }
});
