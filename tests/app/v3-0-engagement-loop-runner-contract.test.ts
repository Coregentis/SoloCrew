import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAG_NAMES,
  ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS,
  ENGAGEMENT_LOOP_RUNNER_RESULT_FIELD_NAMES,
  ENGAGEMENT_LOOP_RUN_FIELD_NAMES,
  ENGAGEMENT_LOOP_RUN_STATUS_VALUES,
  ENGAGEMENT_LOOP_STEP_FIELD_NAMES,
  ENGAGEMENT_LOOP_STEP_KIND_VALUES,
  ENGAGEMENT_LOOP_STEP_STATUS_VALUES,
} from "../../app/engagement/engagement-loop-runner-contract.ts";

test("[v3.0] engagement loop runner contract exports required run and step values", () => {
  assert.deepEqual(ENGAGEMENT_LOOP_RUN_STATUS_VALUES, [
    "draft",
    "review_running",
    "review_ready",
    "blocked",
    "closed",
  ]);
  assert.deepEqual(ENGAGEMENT_LOOP_STEP_KIND_VALUES, [
    "entry_surface_loaded",
    "workspace_loaded",
    "session_checked",
    "loop_state_checked",
    "onboarding_reviewed",
    "evidence_reviewed",
    "readiness_reviewed",
    "review_gate_reviewed",
    "outcome_review_pending",
    "founder_review_requested",
    "blocked",
  ]);
  assert.deepEqual(ENGAGEMENT_LOOP_STEP_STATUS_VALUES, [
    "pending",
    "reviewed",
    "skipped",
    "blocked",
  ]);
});

test("[v3.0] engagement loop runner contract exports stable field sets", () => {
  assert.deepEqual(ENGAGEMENT_LOOP_RUN_FIELD_NAMES, [
    "run_id",
    "runner_id",
    "status",
    "workspace_ref",
    "session_ref",
    "engagement_ref",
    "current_stage",
    "commercial_mode",
    "step_refs",
    "reviewed_step_count",
    "blocked_step_count",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_LOOP_STEP_FIELD_NAMES, [
    "step_id",
    "run_ref",
    "step_kind",
    "status",
    "step_summary",
    "source_refs",
    "reviewed_at",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_LOOP_RUNNER_RESULT_FIELD_NAMES, [
    "result_id",
    "run",
    "steps",
    "workspace_bundle_ref",
    "entry_surface_ref",
    "result_summary",
    "boundary_flags",
  ]);
});

test("[v3.0] engagement loop runner contract preserves required boundary flags", () => {
  assert.deepEqual(ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAG_NAMES, [
    "local_only",
    "manual_first",
    "review_only",
    "deterministic",
    "non_executing",
    "no_external_service",
    "no_persistence_infrastructure",
    "no_review_packet_output",
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

  for (const flag of ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAG_NAMES) {
    assert.equal(ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS[flag], true);
  }
});
