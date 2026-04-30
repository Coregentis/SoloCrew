import assert from "node:assert/strict";
import test from "node:test";

import {
  create_local_engagement_workspace_from_entry,
  load_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  create_engagement_session_history_from_packet,
} from "../../app/engagement/engagement-session-history-workflow.ts";
import {
  createDeliverableEngagementLoopFixture,
} from "../../projection/fixtures/v3-0-deliverable-engagement-loop-fixture.ts";

function create_non_fixture_loop() {
  const create_result = create_local_engagement_workspace_from_entry({
    surface_id: "deliverable-engagement-entry-surface-v3-0-create",
    workspace_id: "deliverable-engagement-workspace-v3-0-e2e",
    session_id: "deliverable-engagement-session-v3-0-e2e",
    loop_state_id: "deliverable-engagement-loop-state-v3-0-e2e",
    history_record_id: "deliverable-engagement-history-record-v3-0-e2e",
    engagement_ref: "deliverable-engagement-v3-0-e2e",
    participant_refs: [
      "engagement-participant-founder",
      "engagement-participant-design-partner",
    ],
    operator_ref: "engagement-participant-founder",
    started_at: "2026-04-30T16:10:00.000Z",
    current_stage: "onboarding",
    commercial_mode: "manual_paid_pilot",
    onboarding_packet_ref: "deliverable-engagement-onboarding-packet-v3-0",
    readiness_ref: "deliverable-engagement-readiness-v3-0",
    evidence_refs: ["deliverable-engagement-evidence-v3-0-feedback"],
    review_gate_refs: ["deliverable-engagement-review-gate-v3-0-manual"],
    outcome_review_ref: "deliverable-engagement-outcome-review-v3-0",
    support_burden_ref: "deliverable-engagement-support-burden-v3-0",
    event_summary:
      "Deliverable engagement loop local workspace created for E2E review.",
  });
  const load_result = load_local_engagement_workspace_from_entry({
    surface_id: "deliverable-engagement-entry-surface-v3-0-load",
    loaded_at: "2026-04-30T16:15:00.000Z",
    operator_ref: "engagement-participant-founder",
    workspace_bundle: create_result.workspace_bundle!,
  });
  const loop_result = run_local_engagement_loop_review({
    runner_id: "deliverable-engagement-loop-runner-v3-0-review",
    run_id: "deliverable-engagement-loop-run-v3-0-review",
    result_id: "deliverable-engagement-loop-run-v3-0-review:result",
    reviewed_at: "2026-04-30T16:20:00.000Z",
    entry_workspace_result: load_result,
  });
  const packet_result = create_founder_review_packet_from_loop_result({
    packet_id: "deliverable-engagement-founder-packet-v3-0",
    result_id: "deliverable-engagement-founder-packet-v3-0:result",
    loop_result,
  });
  const history_result = create_engagement_session_history_from_packet({
    ledger_id: "deliverable-engagement-history-ledger-v3-0",
    export_id: "deliverable-engagement-session-export-v3-0",
    result_id: "deliverable-engagement-history-ledger-v3-0:result",
    created_at: "2026-04-30T16:30:00.000Z",
    packet_result,
  });

  return {
    create_result,
    load_result,
    loop_result,
    packet_result,
    history_result,
  };
}

test("[v3.0] full non-fixture local deliverable engagement loop works end to end", () => {
  const loop = create_non_fixture_loop();
  const bundle = loop.create_result.workspace_bundle!;

  assert.equal(loop.create_result.status, "ready_for_review");
  assert.equal(loop.load_result.status, "loaded");
  assert.equal(bundle.session.workspace_ref, bundle.workspace.workspace_id);
  assert.equal(bundle.workspace.loop_state_ref, bundle.loop_state.loop_state_id);
  assert.equal(bundle.loop_state.engagement_ref, bundle.workspace.engagement_ref);
  assert.equal(loop.loop_result.run.status, "review_ready");
  assert.equal(loop.packet_result.packet.status, "ready_for_founder_review");
  assert.equal(loop.history_result.ledger.status, "export_ready");
  assert.equal(
    loop.history_result.export_package.status,
    "ready_for_local_review"
  );
  assert.equal(
    loop.history_result.export_package.export_kind,
    "in_memory_export_object"
  );
});

test("[v3.0] refs remain coherent across entry loop packet history and export", () => {
  const loop = create_non_fixture_loop();
  const workspace_ref = loop.create_result.workspace_ref;
  const session_ref = loop.create_result.session_ref;
  const engagement_ref = loop.create_result.workspace_bundle!.workspace
    .engagement_ref;

  assert.equal(loop.load_result.workspace_ref, workspace_ref);
  assert.equal(loop.load_result.session_ref, session_ref);
  assert.equal(loop.loop_result.run.workspace_ref, workspace_ref);
  assert.equal(loop.loop_result.run.session_ref, session_ref);
  assert.equal(loop.loop_result.run.engagement_ref, engagement_ref);
  assert.equal(loop.packet_result.packet.workspace_ref, workspace_ref);
  assert.equal(loop.packet_result.packet.session_ref, session_ref);
  assert.equal(loop.packet_result.packet.loop_run_ref, loop.loop_result.run.run_id);
  assert.equal(loop.history_result.ledger.workspace_ref, workspace_ref);
  assert.equal(loop.history_result.ledger.session_ref, session_ref);
  assert.equal(loop.history_result.ledger.latest_packet_ref, loop.packet_result.packet.packet_id);
  assert.equal(loop.history_result.export_package.packet_ref, loop.packet_result.packet.packet_id);
  assert.equal(loop.history_result.export_package.loop_run_ref, loop.loop_result.run.run_id);
});

test("[v3.0] deliverable loop produces deterministic review steps sections and history entries", () => {
  const loop = create_non_fixture_loop();

  assert.deepEqual(
    loop.loop_result.steps.map((step) => step.step_kind),
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
  assert.deepEqual(
    loop.packet_result.packet.sections.map((section) => section.section_id),
    [
      "engagement_context",
      "workspace_summary",
      "loop_review_summary",
      "reviewed_steps",
      "blocked_items",
      "pending_items",
      "founder_decision_options",
      "boundary_notice",
    ]
  );
  assert.deepEqual(
    loop.history_result.entries.map((entry) => entry.entry_kind),
    [
      "workspace_created",
      "entry_surface_created",
      "loop_run_completed",
      "founder_review_packet_created",
      "export_package_created",
    ]
  );
});

test("[v3.0] E2E fixture uses the same workflow helper shape as non-fixture path", () => {
  const direct = create_non_fixture_loop();
  const fixture = createDeliverableEngagementLoopFixture();

  assert.deepEqual(fixture.create_result, direct.create_result);
  assert.deepEqual(fixture.load_result, direct.load_result);
  assert.deepEqual(fixture.loop_result, direct.loop_result);
  assert.deepEqual(fixture.packet_result, direct.packet_result);
  assert.deepEqual(fixture.history_result, direct.history_result);
  assert.deepEqual(fixture.create_result.workspace_bundle, fixture.workspace_bundle);
});
