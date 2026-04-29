import assert from "node:assert/strict";
import test from "node:test";

import {
  createFounderReviewPacketPageModel,
} from "../../app/shell/create-founder-review-packet-page-model.ts";
import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  create_founder_review_packet_from_loop_result,
  create_founder_review_packet_section,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  createFounderReviewPacketFixture,
} from "../../projection/fixtures/v3-0-founder-review-packet-fixture.ts";
import {
  createEngagementLoopRunnerFixture,
} from "../../projection/fixtures/v3-0-engagement-loop-runner-fixture.ts";

function create_loop_result() {
  const entry_result = create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-packet-workflow",
    workspace_id: "engagement-workspace-packet-workflow",
    session_id: "engagement-session-packet-workflow",
    loop_state_id: "engagement-loop-state-packet-workflow",
    history_record_id: "engagement-history-packet-workflow",
    engagement_ref: "engagement-packet-workflow",
    participant_refs: ["participant-founder", "participant-reviewer"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T14:35:00.000Z",
    current_stage: "onboarding",
    commercial_mode: "manual_paid_pilot",
    onboarding_packet_ref: "engagement-onboarding-packet-workflow",
    readiness_ref: "engagement-readiness-packet-workflow",
    evidence_refs: ["engagement-evidence-packet-workflow"],
    review_gate_refs: ["engagement-review-gate-packet-workflow"],
    outcome_review_ref: "engagement-outcome-review-packet-workflow",
    support_burden_ref: "engagement-support-burden-packet-workflow",
  });

  return run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-packet-workflow",
    run_id: "engagement-loop-run-packet-workflow",
    reviewed_at: "2026-04-30T14:40:00.000Z",
    entry_workspace_result: entry_result,
  });
}

test("[v3.0] founder review packet is created from non-fixture loop result", () => {
  const loop_result = create_loop_result();
  const result = create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-workflow",
    loop_result,
  });

  assert.equal(result.packet.status, "ready_for_founder_review");
  assert.equal(result.packet.engagement_ref, loop_result.run.engagement_ref);
  assert.equal(result.packet.workspace_ref, loop_result.workspace_bundle_ref);
  assert.equal(result.packet.session_ref, loop_result.run.session_ref);
  assert.equal(result.packet.loop_run_ref, loop_result.run.run_id);
  assert.deepEqual(
    result.packet.sections.map((section) => section.section_id),
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
  assert.deepEqual(result.packet.decision_options, [
    "continue_review",
    "request_more_evidence",
    "hold_for_operator_review",
    "archive_without_action",
  ]);
});

test("[v3.0] founder review packet fixture uses the same workflow helper shape", () => {
  const loop_fixture = createEngagementLoopRunnerFixture();
  const fixture = createFounderReviewPacketFixture();
  const direct = create_founder_review_packet_from_loop_result({
    packet_id: fixture.packet.packet_id,
    result_id: fixture.packet_result.result_id,
    loop_result: loop_fixture.loop_result,
  });

  assert.equal(fixture.packet_result.packet.packet_id, fixture.packet.packet_id);
  assert.equal(fixture.packet.sections.length, 8);
  assert.deepEqual(direct.packet, fixture.packet);
});

test("[v3.0] founder review packet blocked loop creates blocked packet status", () => {
  const loop_result = create_loop_result();
  const mismatched_loop_result = JSON.parse(JSON.stringify(loop_result));
  mismatched_loop_result.run.status = "blocked";
  mismatched_loop_result.steps = [
    ...mismatched_loop_result.steps,
    {
      ...mismatched_loop_result.steps[0],
      step_id: "engagement-loop-run-packet-workflow:99:blocked",
      step_kind: "blocked",
      status: "blocked",
      step_summary: "Blocked reference path for founder review packet test.",
    },
  ];

  const result = create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-blocked",
    loop_result: mismatched_loop_result,
  });

  assert.equal(result.packet.status, "blocked");
  assert.equal(result.packet.decision_options.includes("block_until_refs_fixed"), true);
  assert.equal(result.packet.decision_options.includes("continue_review"), false);
  assert.equal(
    result.packet.sections.find((section) => section.section_id === "blocked_items")
      ?.status,
    "blocked"
  );
});

test("[v3.0] founder review packet rejects invalid section values", () => {
  assert.throws(
    () =>
      create_founder_review_packet_section({
        section_id: "publish_packet",
        title: "Invalid",
        summary: "Invalid section.",
        status: "ready",
      }),
    /Unsupported founder review packet section id/
  );
  assert.throws(
    () =>
      create_founder_review_packet_section({
        section_id: "engagement_context",
        title: "Invalid",
        summary: "Invalid status.",
        status: "sent",
      }),
    /Unsupported founder review packet section status/
  );
});

test("[v3.0] founder review packet page model is pure and local", () => {
  const result = create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-page",
    loop_result: create_loop_result(),
  });
  const page_model = createFounderReviewPacketPageModel({
    result,
    generated_at: "2026-04-30T14:45:00.000Z",
  });

  assert.equal(page_model.page_kind, "founder_review_packet");
  assert.equal(page_model.packet_ref, result.packet.packet_id);
  assert.equal(Object.hasOwn(page_model, "route_url"), false);
  assert.equal(Object.hasOwn(page_model, "file_export_path"), false);
});
