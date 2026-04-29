import assert from "node:assert/strict";
import test from "node:test";

import {
  createEngagementEntrySurfacePageModel,
} from "../../app/shell/create-engagement-entry-surface-page-model.ts";
import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  createEngagementEntrySurfaceFixture,
  createV30EngagementEntrySurfaceFixture,
} from "../../projection/fixtures/v3-0-engagement-entry-surface-fixture.ts";

test("[v3.0] engagement entry create workflow is deterministic", () => {
  const input = {
    surface_id: "engagement-entry-surface-deterministic",
    workspace_id: "engagement-workspace-deterministic",
    session_id: "engagement-session-deterministic",
    loop_state_id: "engagement-loop-state-deterministic",
    history_record_id: "engagement-history-deterministic",
    engagement_ref: "engagement-deterministic",
    participant_refs: ["participant-b", "participant-a", "participant-b"],
    operator_ref: "participant-a",
    started_at: "2026-04-30T12:25:00.000Z",
    current_stage: "qualified",
    commercial_mode: "manual_paid_pilot",
  };

  const first = create_local_engagement_workspace_from_entry(input);
  const second = create_local_engagement_workspace_from_entry(input);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(first.workspace_bundle?.workspace.participant_refs, [
    "participant-a",
    "participant-b",
  ]);
});

test("[v3.0] engagement entry fixture is deterministic", () => {
  const first = createEngagementEntrySurfaceFixture();
  const second = createEngagementEntrySurfaceFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("[v3.0] V3.0 engagement entry fixture wrapper preserves canonical fixture shape", () => {
  const canonical = createEngagementEntrySurfaceFixture();
  const release_wrapper = createV30EngagementEntrySurfaceFixture();

  assert.deepEqual(Object.keys(release_wrapper).sort(), Object.keys(canonical).sort());
  assert.equal(release_wrapper.create_result.result_id, canonical.create_result.result_id);
  assert.equal(release_wrapper.load_result.result_id, canonical.load_result.result_id);
});

test("[v3.0] engagement entry page model is deterministic and has no route field", () => {
  const fixture = createEngagementEntrySurfaceFixture();
  const first = createEngagementEntrySurfacePageModel({
    result: fixture.create_result,
    generated_at: "2026-04-30T12:30:00.000Z",
  });
  const second = createEngagementEntrySurfacePageModel({
    result: fixture.create_result,
    generated_at: "2026-04-30T12:30:00.000Z",
  });

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(Object.hasOwn(first, "route_url"), false);
  assert.equal(Object.hasOwn(first, "route"), false);
});
