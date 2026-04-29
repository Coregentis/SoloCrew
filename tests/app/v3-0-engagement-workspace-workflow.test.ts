import assert from "node:assert/strict";
import test from "node:test";

import {
  create_engagement_history_record,
  create_engagement_loop_state,
  create_engagement_session,
  create_engagement_workspace,
  create_engagement_workspace_bundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";

function create_workspace_input() {
  return {
    workspace_id: "workspace-v3-0-workflow",
    engagement_ref: "engagement-v3-0-workflow",
    participant_refs: ["participant-operator", "participant-founder"],
    current_stage: "candidate",
    commercial_mode: "free_discovery",
    loop_state_ref: "loop-state-v3-0-workflow",
    history_refs: ["history-v3-0-workspace-created"],
    source_metadata: {
      source_release_ref: "source-release-ref",
      source_commit_ref: "source-commit-ref",
      compatibility_profile: "v2.5-canonical-engagement-compatible",
    },
  };
}

test("[v3.0] deterministic constructors create valid workspace/session/loop/history shapes", () => {
  const workspace = create_engagement_workspace(create_workspace_input());
  const session = create_engagement_session({
    session_id: "session-v3-0-workflow",
    workspace_ref: workspace.workspace_id,
    operator_ref: "participant-operator",
    started_at: "2026-04-30T10:00:00.000Z",
    status: "active",
    current_stage: workspace.current_stage,
    source_metadata: workspace.source_metadata,
  });
  const loop_state = create_engagement_loop_state({
    loop_state_id: workspace.loop_state_ref,
    engagement_ref: workspace.engagement_ref,
    stage: workspace.current_stage,
    onboarding_packet_ref: "onboarding-packet-ref",
    evidence_refs: ["evidence-b", "evidence-a"],
    review_gate_refs: ["review-gate-b", "review-gate-a"],
  });
  const history_record = create_engagement_history_record({
    history_record_id: "history-v3-0-workflow",
    workspace_ref: workspace.workspace_id,
    session_ref: session.session_id,
    event_kind: "session_started",
    event_summary: "Local review-only session started.",
    source_refs: {
      engagement_ref: workspace.engagement_ref,
      workspace_ref: workspace.workspace_id,
      onboarding_packet_ref: "onboarding-packet-ref",
    },
    created_at: session.started_at,
  });

  assert.equal(workspace.current_stage, "candidate");
  assert.equal(session.status, "active");
  assert.deepEqual(loop_state.evidence_refs, ["evidence-a", "evidence-b"]);
  assert.deepEqual(loop_state.review_gate_refs, ["review-gate-a", "review-gate-b"]);
  assert.equal(history_record.source_refs.engagement_ref, workspace.engagement_ref);
  assert.equal(history_record.source_refs.workspace_ref, workspace.workspace_id);
});

test("[v3.0] bundle constructor creates coherent refs across workspace session loop and history", () => {
  const bundle = create_engagement_workspace_bundle({
    workspace_id: "workspace-v3-0-bundle",
    session_id: "session-v3-0-bundle",
    loop_state_id: "loop-state-v3-0-bundle",
    history_record_id: "history-v3-0-bundle",
    engagement_ref: "engagement-v3-0-bundle",
    participant_refs: ["participant-founder", "participant-reviewer"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T10:05:00.000Z",
    current_stage: "qualified",
    commercial_mode: "manual_paid_pilot",
    onboarding_packet_ref: "onboarding-packet-v3-0-bundle",
  });

  assert.equal(bundle.workspace.loop_state_ref, bundle.loop_state.loop_state_id);
  assert.equal(bundle.session.workspace_ref, bundle.workspace.workspace_id);
  assert.equal(bundle.history_records[0]?.workspace_ref, bundle.workspace.workspace_id);
  assert.equal(bundle.history_records[0]?.session_ref, bundle.session.session_id);
  assert.equal(bundle.loop_state.engagement_ref, bundle.workspace.engagement_ref);
  assert.deepEqual(bundle.workspace.history_refs, ["history-v3-0-bundle"]);
});

test("[v3.0] constructors do not mutate input objects", () => {
  const input = create_workspace_input();
  const before = JSON.stringify(input);

  create_engagement_workspace(input);

  assert.equal(JSON.stringify(input), before);
});

test("[v3.0] constructors reject invalid stage mode status and event kind", () => {
  assert.throws(
    () =>
      create_engagement_workspace({
        ...create_workspace_input(),
        current_stage: "dispatch_ready",
      }),
    /Unsupported engagement stage/
  );
  assert.throws(
    () =>
      create_engagement_workspace({
        ...create_workspace_input(),
        commercial_mode: "automated_subscription",
      }),
    /Unsupported commercial mode/
  );
  assert.throws(
    () =>
      create_engagement_session({
        session_id: "session-invalid",
        workspace_ref: "workspace-invalid",
        operator_ref: "operator-invalid",
        started_at: "2026-04-30T10:10:00.000Z",
        status: "executing",
        current_stage: "candidate",
      }),
    /Unsupported engagement session status/
  );
  assert.throws(
    () =>
      create_engagement_history_record({
        history_record_id: "history-invalid",
        workspace_ref: "workspace-invalid",
        session_ref: "session-invalid",
        event_kind: "autonomous_execution_started",
        event_summary: "Invalid event.",
        created_at: "2026-04-30T10:10:00.000Z",
      }),
    /Unsupported engagement history event kind/
  );
});
