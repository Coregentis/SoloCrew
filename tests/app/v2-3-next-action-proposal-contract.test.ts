import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_3_NEXT_ACTION_BOUNDARY_FLAGS,
} from "../../app/pilots/next-action-proposal-contract.ts";
import {
  create_next_action_proposal,
  create_next_action_proposal_summary,
} from "../../app/pilots/next-action-proposal-workflow.ts";
import {
  qualify_design_partner_intake,
} from "../../app/pilots/design-partner-qualification.ts";
import {
  create_manual_payment_summary,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  createV22FounderDashboardContinuationFixture,
} from "../../projection/fixtures/v2-2-founder-dashboard-continuation-fixture.ts";
import {
  createV22PrivateAlphaReviewPacketFixture,
} from "../../projection/fixtures/v2-2-private-alpha-review-packet-fixture.ts";
import {
  createV23ManualPaymentStatusFixture,
} from "../../projection/fixtures/v2-3-manual-payment-status-fixture.ts";
import {
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

test("[v2.3] next-action proposal contract creates a bounded review-only proposal", () => {
  const payment = createV23ManualPaymentStatusFixture().records.payment_confirmed;
  const review_packet = createV22PrivateAlphaReviewPacketFixture();
  const dashboard = createV22FounderDashboardContinuationFixture();
  const proposal = create_next_action_proposal({
    proposal_id: "next-action-contract-001",
    created_at: "2026-04-28T11:00:00.000Z",
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    qualification_summary: qualify_design_partner_intake(
      V2_3_STRONG_FIT_PILOT_INTAKE
    ),
    manual_payment_record: payment,
    manual_payment_summary: create_manual_payment_summary(payment),
    review_packet_export: review_packet,
    dashboard_page_model: dashboard,
  });
  const summary = create_next_action_proposal_summary(proposal);

  assert.equal(proposal.kind, "prepare_feedback_request");
  assert.equal(proposal.status, "proposed");
  assert.deepEqual(proposal.boundary_flags, V2_3_NEXT_ACTION_BOUNDARY_FLAGS);
  assert.equal(proposal.source_refs.intake_id, V2_3_STRONG_FIT_PILOT_INTAKE.intake_id);
  assert.equal(proposal.source_refs.payment_record_id, payment.payment_record_id);
  assert.equal(proposal.source_refs.review_packet_export_id, review_packet.export_id);
  assert.equal(proposal.source_refs.dashboard_page_id, dashboard.page_id);
  assert.equal(summary.review_only, true);
  assert.equal(summary.non_executing, true);
});

test("[v2.3] next-action proposal contract exposes no execution, runner, agent, or payment fields", () => {
  const proposal = create_next_action_proposal({
    proposal_id: "next-action-contract-002",
    created_at: "2026-04-28T11:05:00.000Z",
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    qualification_summary: qualify_design_partner_intake(
      V2_3_STRONG_FIT_PILOT_INTAKE
    ),
  });
  const serialized = JSON.stringify(proposal);

  assert.doesNotMatch(serialized, /executable_action_instruction/i);
  assert.doesNotMatch(serialized, /provider_dispatch_payload/i);
  assert.doesNotMatch(serialized, /channel_dispatch_payload/i);
  assert.doesNotMatch(serialized, /marketplace_install/i);
  assert.doesNotMatch(serialized, /marketplace_resolver/i);
  assert.doesNotMatch(serialized, /task_runner_payload/i);
  assert.doesNotMatch(serialized, /tool_runner_payload/i);
  assert.doesNotMatch(serialized, /llm_execution_prompt/i);
  assert.doesNotMatch(serialized, /agent_dispatch_payload/i);
  assert.doesNotMatch(serialized, /(?<!no_)payment_processor/i);
  assert.doesNotMatch(serialized, /checkout_url/i);
  assert.doesNotMatch(serialized, /subscription_id/i);
  assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
});
