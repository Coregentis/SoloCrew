import assert from "node:assert/strict";
import test from "node:test";

import {
  create_engagement_workspace_bundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";
import {
  createEngagementWorkspaceFixture,
  createV30EngagementWorkspaceFixture,
} from "../../projection/fixtures/v3-0-engagement-workspace-fixture.ts";

test("[v3.0] workspace bundle constructor is deterministic", () => {
  const input = {
    workspace_id: "workspace-v3-0-deterministic",
    session_id: "session-v3-0-deterministic",
    loop_state_id: "loop-state-v3-0-deterministic",
    history_record_id: "history-v3-0-deterministic",
    engagement_ref: "engagement-v3-0-deterministic",
    participant_refs: ["participant-b", "participant-a", "participant-b"],
    operator_ref: "participant-a",
    started_at: "2026-04-30T10:20:00.000Z",
    current_stage: "active_pilot",
    commercial_mode: "manual_service",
    evidence_refs: ["evidence-b", "evidence-a", "evidence-b"],
    review_gate_refs: ["gate-b", "gate-a"],
  };

  const first = create_engagement_workspace_bundle(input);
  const second = create_engagement_workspace_bundle(input);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(first.workspace.participant_refs, [
    "participant-a",
    "participant-b",
  ]);
  assert.deepEqual(first.loop_state.evidence_refs, ["evidence-a", "evidence-b"]);
  assert.deepEqual(first.loop_state.review_gate_refs, ["gate-a", "gate-b"]);
});

test("[v3.0] fixture helper is deterministic", () => {
  const first = createEngagementWorkspaceFixture();
  const second = createEngagementWorkspaceFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("[v3.0] V3.0 fixture wrapper preserves canonical fixture shape", () => {
  const canonical = createEngagementWorkspaceFixture();
  const release_wrapper = createV30EngagementWorkspaceFixture();

  assert.deepEqual(Object.keys(release_wrapper).sort(), Object.keys(canonical).sort());
  assert.equal(release_wrapper.workspace.workspace_id, canonical.workspace.workspace_id);
  assert.equal(release_wrapper.session.session_id, canonical.session.session_id);
  assert.equal(
    release_wrapper.history_records[0]?.history_record_id,
    canonical.history_records[0]?.history_record_id
  );
});

test("[v3.0] fixture and non-fixture paths use the same workspace shape", () => {
  const fixture = createEngagementWorkspaceFixture();
  const non_fixture = create_engagement_workspace_bundle({
    workspace_id: "workspace-v3-0-non-fixture",
    session_id: "session-v3-0-non-fixture",
    loop_state_id: "loop-state-v3-0-non-fixture",
    history_record_id: "history-v3-0-non-fixture",
    engagement_ref: "engagement-v3-0-non-fixture",
    participant_refs: ["participant-founder"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T10:25:00.000Z",
    current_stage: "candidate",
    commercial_mode: "free_discovery",
  });

  assert.deepEqual(
    Object.keys(non_fixture.workspace).sort(),
    Object.keys(fixture.workspace).sort()
  );
  assert.deepEqual(
    Object.keys(non_fixture.session).sort(),
    Object.keys(fixture.session).sort()
  );
  assert.deepEqual(
    Object.keys(non_fixture.loop_state).sort(),
    Object.keys(fixture.loop_state).sort()
  );
  assert.deepEqual(
    Object.keys(non_fixture.history_records[0] ?? {}).sort(),
    Object.keys(fixture.history_records[0] ?? {}).sort()
  );
});
