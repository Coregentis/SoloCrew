import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_ONBOARDING_BOUNDARY_FLAGS,
} from "../../app/commercialization/pilot-onboarding-packet-contract.ts";
import {
  cancel_pilot_onboarding_packet,
  create_pilot_onboarding_packet,
  create_pilot_onboarding_packet_summary,
  mark_pilot_onboarding_packet_acknowledged_manually,
  mark_pilot_onboarding_packet_ready_for_manual_review,
} from "../../app/commercialization/pilot-onboarding-packet-workflow.ts";

function create_packet(status?: "draft" | "blocked") {
  return create_pilot_onboarding_packet({
    packet_id: `v2-4-workflow-packet-${status ?? "draft"}`,
    created_at: "2026-04-28T17:10:00.000Z",
    audience: "operator",
    status,
    expectation_profile: {
      pilot_goal: "Prepare a deterministic onboarding packet.",
      desired_business_learning: "Check whether manual pilot context is complete.",
      expected_operator_support: "Manual packet review.",
      expected_design_partner_action: "Manual acknowledgement.",
      acknowledged_manual_first: true,
      acknowledged_bounded_pilot_only: true,
      acknowledged_local_review_only: true,
      acknowledged_non_executing: true,
      acknowledged_no_public_beta: true,
      acknowledged_no_readiness_claims: true,
    },
    required_inputs: [
      {
        input_id: "desired_outcome",
        label: "Desired outcome",
        description: "Manual target outcome.",
        required: true,
        source_ref_hint: "intake.expectation_profile.desired_outcome",
      },
    ],
    support_boundaries: [
      {
        boundary_id: "bounded_manual_support",
        summary: "Bounded manual support.",
        operator_responsibility: "Hold a manual review.",
        design_partner_responsibility: "Bring context.",
        escalation_path: "manual_boundary_review",
        non_scope: ["autonomous_execution", "provider_dispatch"],
      },
    ],
    source_refs: {
      intake_id: "v2-3-workflow-intake",
      design_partner_id: "v2-3-workflow-design-partner",
    },
    blocking_reasons:
      status === "blocked" ? ["manual_blocker_requires_review"] : [],
  });
}

test("[v2.4] pilot onboarding packet workflow reaches manual acknowledgement", () => {
  const draft = create_packet();
  const ready = mark_pilot_onboarding_packet_ready_for_manual_review({
    packet: draft,
    reviewed_at: "2026-04-28T17:15:00.000Z",
  });
  const acknowledged = mark_pilot_onboarding_packet_acknowledged_manually({
    packet: ready,
    acknowledged_at: "2026-04-28T17:20:00.000Z",
    manual_acknowledgement_ref: "manual-ack:v2-4-workflow",
  });

  assert.equal(draft.status, "draft");
  assert.equal(ready.status, "ready_for_manual_review");
  assert.equal(acknowledged.status, "acknowledged_manually");
  assert.equal(acknowledged.updated_at, "2026-04-28T17:20:00.000Z");
  assert.equal(acknowledged.manual_acknowledgement_ref, "manual-ack:v2-4-workflow");
  assert.deepEqual(acknowledged.boundary_flags, V2_4_ONBOARDING_BOUNDARY_FLAGS);
});

test("[v2.4] pilot onboarding packet workflow cancels non-final packets", () => {
  const ready = mark_pilot_onboarding_packet_ready_for_manual_review({
    packet: create_packet(),
    reviewed_at: "2026-04-28T17:25:00.000Z",
  });
  const cancelled = cancel_pilot_onboarding_packet({
    packet: ready,
    cancelled_at: "2026-04-28T17:30:00.000Z",
  });
  const after_cancelled = mark_pilot_onboarding_packet_acknowledged_manually({
    packet: cancelled,
    acknowledged_at: "2026-04-28T17:35:00.000Z",
    manual_acknowledgement_ref: "manual-ack:should-not-apply",
  });

  assert.equal(cancelled.status, "cancelled");
  assert.equal(after_cancelled.status, "cancelled");
  assert.equal(after_cancelled.manual_acknowledgement_ref, undefined);
});

test("[v2.4] pilot onboarding packet workflow enforces blocked and final transitions", () => {
  const blocked = create_packet("blocked");
  const after_blocked_ready = mark_pilot_onboarding_packet_ready_for_manual_review({
    packet: blocked,
    reviewed_at: "2026-04-28T17:40:00.000Z",
  });
  const direct_acknowledged_from_draft =
    mark_pilot_onboarding_packet_acknowledged_manually({
      packet: create_packet(),
      acknowledged_at: "2026-04-28T17:42:00.000Z",
      manual_acknowledgement_ref: "manual-ack:invalid-direct",
    });
  const acknowledged = mark_pilot_onboarding_packet_acknowledged_manually({
    packet: mark_pilot_onboarding_packet_ready_for_manual_review({
      packet: create_packet(),
      reviewed_at: "2026-04-28T17:45:00.000Z",
    }),
    acknowledged_at: "2026-04-28T17:50:00.000Z",
    manual_acknowledgement_ref: "manual-ack:final",
  });
  const after_acknowledged_cancel = cancel_pilot_onboarding_packet({
    packet: acknowledged,
    cancelled_at: "2026-04-28T17:55:00.000Z",
  });
  const cancelled = cancel_pilot_onboarding_packet({
    packet: create_packet(),
    cancelled_at: "2026-04-28T17:56:00.000Z",
  });
  const after_cancelled_ready = mark_pilot_onboarding_packet_ready_for_manual_review({
    packet: cancelled,
    reviewed_at: "2026-04-28T17:57:00.000Z",
  });

  assert.equal(blocked.status, "blocked");
  assert.equal(after_blocked_ready.status, "blocked");
  assert.equal(direct_acknowledged_from_draft.status, "draft");
  assert.equal(direct_acknowledged_from_draft.manual_acknowledgement_ref, undefined);
  assert.equal(acknowledged.status, "acknowledged_manually");
  assert.equal(after_acknowledged_cancel.status, "acknowledged_manually");
  assert.equal(cancelled.status, "cancelled");
  assert.equal(after_cancelled_ready.status, "cancelled");
});

test("[v2.4] pilot onboarding packet summaries are deterministic", () => {
  const packet = mark_pilot_onboarding_packet_ready_for_manual_review({
    packet: create_packet(),
    reviewed_at: "2026-04-28T18:00:00.000Z",
  });
  const first = create_pilot_onboarding_packet_summary(packet);
  const second = create_pilot_onboarding_packet_summary(packet);

  assert.deepEqual(first, second);
  assert.equal(first.recommended_manual_step, "perform_manual_onboarding_packet_review");
  assert.equal(first.manual_first, true);
  assert.equal(first.local_only, true);
  assert.equal(first.review_only, true);
  assert.equal(first.non_executing, true);
});
