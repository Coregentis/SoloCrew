import assert from "node:assert/strict";
import test from "node:test";

import {
  qualify_design_partner_intake,
} from "../../app/pilots/design-partner-qualification.ts";
import {
  create_manual_payment_summary,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  create_next_action_proposal,
} from "../../app/pilots/next-action-proposal-workflow.ts";
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
  V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

function proposal_for(args: {
  intake: typeof V2_3_STRONG_FIT_PILOT_INTAKE;
  payment_key?: keyof ReturnType<typeof createV23ManualPaymentStatusFixture>["records"];
  with_review_packet?: boolean;
  with_dashboard?: boolean;
}) {
  const payment_fixture = createV23ManualPaymentStatusFixture();
  const payment = args.payment_key
    ? payment_fixture.records[args.payment_key]
    : undefined;

  return create_next_action_proposal({
    proposal_id: `next-action-rules-${args.intake.intake_id}-${args.payment_key ?? "none"}`,
    created_at: "2026-04-28T11:10:00.000Z",
    intake: args.intake,
    qualification_summary: qualify_design_partner_intake(args.intake),
    manual_payment_record: payment,
    manual_payment_summary: payment
      ? create_manual_payment_summary(payment)
      : undefined,
    review_packet_export: args.with_review_packet
      ? createV22PrivateAlphaReviewPacketFixture()
      : undefined,
    dashboard_page_model: args.with_dashboard
      ? createV22FounderDashboardContinuationFixture()
      : undefined,
  });
}

test("[v2.3] next-action rules cover candidate and payment status branches", () => {
  const blocked = proposal_for({
    intake: { ...V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE, status: "blocked" },
  });
  const manual_review = proposal_for({
    intake: { ...V2_3_MANUAL_REVIEW_PILOT_INTAKE, status: "needs_manual_review" },
  });
  const no_payment = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
  });
  const invoice_sent = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "invoice_sent",
  });
  const payment_pending = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "payment_pending",
  });
  const payment_blocked = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "payment_blocked",
  });
  const payment_confirmed = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "payment_confirmed",
    with_review_packet: true,
    with_dashboard: true,
  });

  assert.equal(blocked.kind, "decline_or_hold_candidate");
  assert.equal(manual_review.kind, "request_manual_clarification");
  assert.equal(no_payment.kind, "prepare_manual_invoice");
  assert.equal(invoice_sent.kind, "wait_for_manual_payment_signal");
  assert.equal(payment_pending.kind, "confirm_payment_manually");
  assert.equal(payment_blocked.kind, "resolve_manual_exception");
  assert.equal(payment_confirmed.kind, "prepare_feedback_request");
});

test("[v2.3] next-action rules produce deterministic priority, rationale, and manual inputs", () => {
  const first = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "payment_pending",
  });
  const second = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "payment_pending",
  });

  assert.equal(first.priority, "high");
  assert.equal(first.rationale, second.rationale);
  assert.deepEqual(first.required_manual_inputs, second.required_manual_inputs);
  assert.deepEqual(
    first.required_manual_inputs,
    [...first.required_manual_inputs].sort()
  );
  assert.equal(first.manual_next_step, "confirm_payment_manually");
});

test("[v2.3] payment confirmed without V2.2 refs proposes manual workspace review", () => {
  const proposal = proposal_for({
    intake: { ...V2_3_STRONG_FIT_PILOT_INTAKE, status: "qualified" },
    payment_key: "payment_confirmed",
  });

  assert.equal(proposal.kind, "prepare_pilot_workspace_review");
  assert.equal(proposal.source_refs.review_packet_export_id, undefined);
  assert.equal(proposal.source_refs.dashboard_page_id, undefined);
});
