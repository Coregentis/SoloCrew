import assert from "node:assert/strict";
import test from "node:test";

import {
  createDeliverableEngagementLoopFixture,
  createV30DeliverableEngagementLoopFixture,
} from "../../projection/fixtures/v3-0-deliverable-engagement-loop-fixture.ts";

test("[v3.0] deliverable engagement loop fixture is deterministic", () => {
  const first = createDeliverableEngagementLoopFixture();
  const second = createDeliverableEngagementLoopFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("[v3.0] V3.0 deliverable engagement loop wrapper preserves canonical fixture shape", () => {
  const canonical = createDeliverableEngagementLoopFixture();
  const release_wrapper = createV30DeliverableEngagementLoopFixture();

  assert.deepEqual(Object.keys(release_wrapper).sort(), Object.keys(canonical).sort());
  assert.equal(release_wrapper.fixture_id, canonical.fixture_id);
  assert.equal(
    release_wrapper.history_result.export_package.export_id,
    canonical.history_result.export_package.export_id
  );
});

test("[v3.0] deliverable engagement loop supports explicit non-fixture local input", () => {
  const explicit_input = {
    fixture_id: "explicit-deliverable-engagement-loop-fixture",
    workspace_id: "explicit-deliverable-engagement-workspace",
    session_id: "explicit-deliverable-engagement-session",
    loop_state_id: "explicit-deliverable-engagement-loop-state",
    history_record_id: "explicit-deliverable-engagement-history-record",
    engagement_ref: "explicit-deliverable-engagement",
    participant_refs: ["explicit-founder", "explicit-reviewer"],
    operator_ref: "explicit-founder",
    surface_create_id: "explicit-entry-create-surface",
    surface_load_id: "explicit-entry-load-surface",
    runner_id: "explicit-loop-runner",
    run_id: "explicit-loop-run",
    packet_id: "explicit-founder-review-packet",
    ledger_id: "explicit-history-ledger",
    export_id: "explicit-session-export",
    started_at: "2026-04-30T17:00:00.000Z",
    loaded_at: "2026-04-30T17:05:00.000Z",
    reviewed_at: "2026-04-30T17:10:00.000Z",
    history_created_at: "2026-04-30T17:15:00.000Z",
  };
  const before = JSON.stringify(explicit_input);
  const first = createDeliverableEngagementLoopFixture(explicit_input);
  const second = createDeliverableEngagementLoopFixture(explicit_input);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(JSON.stringify(explicit_input), before);
  assert.equal(first.workspace_bundle.workspace.workspace_id, explicit_input.workspace_id);
  assert.equal(first.load_result.surface_model.surface_id, explicit_input.surface_load_id);
  assert.equal(first.loop_result.run.run_id, explicit_input.run_id);
  assert.equal(first.packet_result.packet.packet_id, explicit_input.packet_id);
  assert.equal(first.history_result.export_package.export_id, explicit_input.export_id);
});
