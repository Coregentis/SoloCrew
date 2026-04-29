import assert from "node:assert/strict";
import test from "node:test";

import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  create_engagement_workspace_bundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";
import {
  create_engagement_loop_run,
  create_engagement_loop_step,
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";

function create_entry_result() {
  return create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-loop-runner",
    workspace_id: "engagement-workspace-loop-runner",
    session_id: "engagement-session-loop-runner",
    loop_state_id: "engagement-loop-state-loop-runner",
    history_record_id: "engagement-history-loop-runner",
    engagement_ref: "engagement-loop-runner",
    participant_refs: ["participant-founder", "participant-reviewer"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T13:05:00.000Z",
    current_stage: "onboarding",
    commercial_mode: "manual_paid_pilot",
    onboarding_packet_ref: "engagement-onboarding-loop-runner",
    readiness_ref: "engagement-readiness-loop-runner",
    evidence_refs: ["engagement-evidence-loop-runner"],
    review_gate_refs: ["engagement-review-gate-loop-runner"],
    outcome_review_ref: "engagement-outcome-review-loop-runner",
    support_burden_ref: "engagement-support-burden-loop-runner",
  });
}

test("[v3.0] review-only loop runner accepts non-fixture entry surface result", () => {
  const entry_result = create_entry_result();
  const result = run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-workflow",
    run_id: "engagement-loop-run-workflow",
    reviewed_at: "2026-04-30T13:10:00.000Z",
    entry_workspace_result: entry_result,
  });

  assert.equal(result.run.status, "review_ready");
  assert.equal(result.workspace_bundle_ref, entry_result.workspace_ref);
  assert.equal(result.entry_surface_ref, entry_result.surface_model.surface_id);
  assert.equal(result.run.workspace_ref, entry_result.workspace_ref);
  assert.equal(result.run.session_ref, entry_result.session_ref);
  assert.equal(result.run.current_stage, "onboarding");
  assert.equal(result.run.commercial_mode, "manual_paid_pilot");
  assert.deepEqual(
    result.steps.map((step) => step.step_kind),
    [
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
    ]
  );
  assert.equal(result.run.step_refs.length, result.steps.length);
  assert.equal(result.run.blocked_step_count, 0);
});

test("[v3.0] review-only loop runner accepts direct IMPL-01 workspace bundle", () => {
  const workspace_bundle = create_engagement_workspace_bundle({
    workspace_id: "engagement-workspace-direct-loop-runner",
    session_id: "engagement-session-direct-loop-runner",
    loop_state_id: "engagement-loop-state-direct-loop-runner",
    history_record_id: "engagement-history-direct-loop-runner",
    engagement_ref: "engagement-direct-loop-runner",
    participant_refs: ["participant-founder"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T13:15:00.000Z",
    current_stage: "qualified",
    commercial_mode: "free_discovery",
  });
  const result = run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-direct",
    run_id: "engagement-loop-run-direct",
    reviewed_at: "2026-04-30T13:20:00.000Z",
    workspace_bundle,
  });

  assert.equal(result.run.status, "review_ready");
  assert.equal(result.entry_surface_ref, null);
  assert.equal(result.steps[0].step_kind, "entry_surface_loaded");
  assert.equal(result.steps[0].status, "skipped");
  assert.equal(result.workspace_bundle_ref, workspace_bundle.workspace.workspace_id);
});

test("[v3.0] loop runner blocks missing or mismatched required refs", () => {
  const entry_result = create_entry_result();
  const mismatched_bundle = JSON.parse(
    JSON.stringify(entry_result.workspace_bundle)
  );
  mismatched_bundle.session.workspace_ref = "engagement-workspace-mismatch";

  const result = run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-blocked",
    run_id: "engagement-loop-run-blocked",
    reviewed_at: "2026-04-30T13:25:00.000Z",
    workspace_bundle: mismatched_bundle,
  });

  assert.equal(result.run.status, "blocked");
  assert.equal(result.run.blocked_step_count > 0, true);
  assert.equal(
    result.steps.some(
      (step) => step.step_kind === "session_checked" && step.status === "blocked"
    ),
    true
  );
  assert.equal(result.steps.at(-1)?.step_kind, "blocked");
});

test("[v3.0] loop runner rejects invalid run status step kind and step status", () => {
  assert.throws(
    () =>
      create_engagement_loop_run({
        run_id: "invalid-run-status",
        runner_id: "engagement-loop-runner-invalid",
        status: "released",
        current_stage: "candidate",
        commercial_mode: "free_discovery",
      }),
    /Unsupported engagement loop run status/
  );
  assert.throws(
    () =>
      create_engagement_loop_step({
        step_id: "invalid-step-kind",
        run_ref: "engagement-loop-run-invalid",
        step_kind: "agent_dispatched",
        status: "reviewed",
        step_summary: "Invalid step kind.",
        reviewed_at: "2026-04-30T13:30:00.000Z",
      }),
    /Unsupported engagement loop step kind/
  );
  assert.throws(
    () =>
      create_engagement_loop_step({
        step_id: "invalid-step-status",
        run_ref: "engagement-loop-run-invalid",
        step_kind: "workspace_loaded",
        status: "executed",
        step_summary: "Invalid step status.",
        reviewed_at: "2026-04-30T13:35:00.000Z",
      }),
    /Unsupported engagement loop step status/
  );
});
