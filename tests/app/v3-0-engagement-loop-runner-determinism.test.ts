import assert from "node:assert/strict";
import test from "node:test";

import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  createEngagementLoopRunnerFixture,
  createV30EngagementLoopRunnerFixture,
} from "../../projection/fixtures/v3-0-engagement-loop-runner-fixture.ts";

function create_entry_result() {
  return create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-loop-deterministic",
    workspace_id: "engagement-workspace-loop-deterministic",
    session_id: "engagement-session-loop-deterministic",
    loop_state_id: "engagement-loop-state-loop-deterministic",
    history_record_id: "engagement-history-loop-deterministic",
    engagement_ref: "engagement-loop-deterministic",
    participant_refs: ["participant-b", "participant-a", "participant-b"],
    operator_ref: "participant-a",
    started_at: "2026-04-30T13:50:00.000Z",
    current_stage: "qualified",
    commercial_mode: "free_discovery",
    evidence_refs: ["engagement-evidence-b", "engagement-evidence-a"],
    review_gate_refs: ["engagement-review-gate-b", "engagement-review-gate-a"],
  });
}

test("[v3.0] engagement loop runner review output is deterministic", () => {
  const entry_result = create_entry_result();
  const input = {
    runner_id: "engagement-loop-runner-deterministic",
    run_id: "engagement-loop-run-deterministic",
    reviewed_at: "2026-04-30T13:55:00.000Z",
    entry_workspace_result: entry_result,
  };
  const first = run_local_engagement_loop_review(input);
  const second = run_local_engagement_loop_review(input);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(
    first.steps.map((step) => step.step_id),
    first.run.step_refs
  );
});

test("[v3.0] engagement loop runner does not mutate entry input", () => {
  const entry_result = create_entry_result();
  const before = JSON.stringify(entry_result);

  run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-no-mutation",
    run_id: "engagement-loop-run-no-mutation",
    reviewed_at: "2026-04-30T14:00:00.000Z",
    entry_workspace_result: entry_result,
  });

  assert.equal(JSON.stringify(entry_result), before);
});

test("[v3.0] engagement loop runner fixture is deterministic", () => {
  const first = createEngagementLoopRunnerFixture();
  const second = createEngagementLoopRunnerFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("[v3.0] V3.0 loop runner fixture wrapper preserves canonical fixture shape", () => {
  const canonical = createEngagementLoopRunnerFixture();
  const release_wrapper = createV30EngagementLoopRunnerFixture();

  assert.deepEqual(Object.keys(release_wrapper).sort(), Object.keys(canonical).sort());
  assert.equal(release_wrapper.loop_result.result_id, canonical.loop_result.result_id);
  assert.equal(release_wrapper.run.run_id, canonical.run.run_id);
});
