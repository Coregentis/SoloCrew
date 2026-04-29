import assert from "node:assert/strict";
import test from "node:test";

import {
  createEngagementEntrySurfacePageModel,
} from "../../app/shell/create-engagement-entry-surface-page-model.ts";
import {
  create_engagement_entry_surface_model,
  create_local_engagement_workspace_from_entry,
  load_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";

function create_entry_input() {
  return {
    surface_id: "engagement-entry-surface-workflow",
    workspace_id: "engagement-workspace-entry-workflow",
    session_id: "engagement-session-entry-workflow",
    loop_state_id: "engagement-loop-state-entry-workflow",
    history_record_id: "engagement-history-entry-workflow",
    engagement_ref: "engagement-entry-workflow",
    participant_refs: ["participant-reviewer", "participant-founder"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T12:00:00.000Z",
    current_stage: "candidate",
    commercial_mode: "free_discovery",
  };
}

test("[v3.0] entry surface creates a non-fixture workspace bundle", () => {
  const result = create_local_engagement_workspace_from_entry(create_entry_input());

  assert.equal(result.status, "ready_for_review");
  assert.equal(result.workspace_ref, "engagement-workspace-entry-workflow");
  assert.equal(result.session_ref, "engagement-session-entry-workflow");
  assert.equal(result.workspace_bundle?.workspace.engagement_ref, "engagement-entry-workflow");
  assert.equal(result.workspace_bundle?.session.workspace_ref, result.workspace_ref);
  assert.equal(result.surface_model.mode, "create_local_engagement");
});

test("[v3.0] entry surface loads an in-memory workspace bundle deterministically", () => {
  const created = create_local_engagement_workspace_from_entry(create_entry_input());
  const first = load_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-load",
    loaded_at: "2026-04-30T12:05:00.000Z",
    operator_ref: "participant-founder",
    workspace_bundle: created.workspace_bundle!,
  });
  const second = load_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-load",
    loaded_at: "2026-04-30T12:05:00.000Z",
    operator_ref: "participant-founder",
    workspace_bundle: created.workspace_bundle!,
  });

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(first.status, "loaded");
  assert.equal(first.surface_model.mode, "load_local_engagement");
  assert.equal(first.workspace_bundle?.workspace.workspace_id, created.workspace_ref);
});

test("[v3.0] entry surface and page model do not mutate inputs", () => {
  const input = create_entry_input();
  const before = JSON.stringify(input);
  const result = create_local_engagement_workspace_from_entry(input);

  createEngagementEntrySurfacePageModel({
    result,
    generated_at: "2026-04-30T12:10:00.000Z",
  });

  assert.equal(JSON.stringify(input), before);
});

test("[v3.0] entry surface rejects invalid mode status stage and commercial mode", () => {
  assert.throws(
    () =>
      create_engagement_entry_surface_model({
        surface_id: "invalid-mode",
        mode: "dispatch_workspace",
        current_stage: "candidate",
        commercial_mode: "free_discovery",
      }),
    /Unsupported engagement entry surface mode/
  );
  assert.throws(
    () =>
      create_engagement_entry_surface_model({
        surface_id: "invalid-status",
        mode: "create_local_engagement",
        status: "published",
        current_stage: "candidate",
        commercial_mode: "free_discovery",
      }),
    /Unsupported engagement entry surface status/
  );
  assert.throws(
    () =>
      create_engagement_entry_surface_model({
        surface_id: "invalid-stage",
        mode: "create_local_engagement",
        current_stage: "execution_ready",
        commercial_mode: "free_discovery",
      }),
    /Unsupported engagement entry stage/
  );
  assert.throws(
    () =>
      create_engagement_entry_surface_model({
        surface_id: "invalid-commercial-mode",
        mode: "create_local_engagement",
        current_stage: "candidate",
        commercial_mode: "automated_subscription",
      }),
    /Unsupported engagement entry commercial mode/
  );
});
