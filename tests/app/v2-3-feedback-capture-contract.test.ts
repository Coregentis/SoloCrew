import assert from "node:assert/strict";
import test from "node:test";

import {
  create_case_study_permission_record,
  create_pilot_feedback_record,
} from "../../app/pilots/feedback-capture-workflow.ts";
import {
  createV23ManualPaymentStatusFixture,
} from "../../projection/fixtures/v2-3-manual-payment-status-fixture.ts";
import {
  createV23NextActionProposalFixture,
} from "../../projection/fixtures/v2-3-next-action-proposal-fixture.ts";
import {
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

test("[v2.3] feedback capture contract creates local feedback and permission records", () => {
  const payment = createV23ManualPaymentStatusFixture().records.payment_confirmed;
  const proposal =
    createV23NextActionProposalFixture().proposals
      .payment_confirmed_with_v2_2_refs;
  const feedback = create_pilot_feedback_record({
    feedback_id: "feedback-contract-test",
    intake: V2_3_STRONG_FIT_PILOT_INTAKE,
    payment_record: payment,
    proposal,
    created_at: "2026-04-28T14:00:00.000Z",
    rating: 5,
    signals: ["useful", "continuation_value", "would_pay_again"],
    usefulness_summary: "Useful local review summary.",
    artifact_quality_summary: "Artifact quality was inspectable.",
    continuation_value_summary: "Continuation value was clear.",
    confusion_or_risk_summary: "No confusion reported.",
    support_burden_summary: "Low manual support burden.",
    willingness_to_continue: true,
    willingness_to_pay_again: true,
  });
  const permission = create_case_study_permission_record({
    permission_id: "permission-contract-test",
    feedback,
    created_at: "2026-04-28T14:05:00.000Z",
  });

  assert.equal(feedback.intake_id, V2_3_STRONG_FIT_PILOT_INTAKE.intake_id);
  assert.equal(feedback.design_partner_id, V2_3_STRONG_FIT_PILOT_INTAKE.design_partner_id);
  assert.equal(feedback.payment_record_id, payment.payment_record_id);
  assert.equal(feedback.proposal_id, proposal.proposal_id);
  assert.equal(feedback.review_packet_export_id, proposal.source_refs.review_packet_export_id);
  assert.equal(feedback.dashboard_page_id, proposal.source_refs.dashboard_page_id);

  assert.equal(permission.feedback_id, feedback.feedback_id);
  assert.equal(permission.intake_id, feedback.intake_id);
  assert.equal(permission.design_partner_id, feedback.design_partner_id);
  assert.equal(permission.status, "not_requested");
});

test("[v2.3] feedback capture contract keeps all boundary flags true and exposes no integration fields", () => {
  const feedback = create_pilot_feedback_record({
    feedback_id: "feedback-boundary-contract-test",
    intake: V2_3_STRONG_FIT_PILOT_INTAKE,
    rating: 4,
    signals: ["useful"],
    usefulness_summary: "Useful.",
    artifact_quality_summary: "Good.",
    continuation_value_summary: "Clear.",
    confusion_or_risk_summary: "None.",
    support_burden_summary: "Low.",
    willingness_to_continue: true,
    willingness_to_pay_again: true,
  });
  const permission = create_case_study_permission_record({
    permission_id: "permission-boundary-contract-test",
    feedback,
  });
  const payload = JSON.stringify({ feedback, permission });

  for (const value of Object.values(feedback.boundary_flags)) {
    assert.equal(value, true);
  }

  assert.doesNotMatch(payload, /public_publishing_payload/i);
  assert.doesNotMatch(payload, /testimonial_page_url/i);
  assert.doesNotMatch(payload, /crm_object_id/i);
  assert.doesNotMatch(payload, /email_dispatch_payload/i);
  assert.doesNotMatch(payload, /channel_dispatch_payload/i);
  assert.doesNotMatch(payload, /provider_dispatch_payload/i);
  assert.doesNotMatch(payload, /external_analytics_payload/i);
  assert.doesNotMatch(payload, /llm_execution_prompt/i);
  assert.doesNotMatch(payload, /model_call_payload/i);
  assert.doesNotMatch(payload, /agent_dispatch_payload/i);
  assert.doesNotMatch(payload, /(?<!no_)payment_processor/i);
  assert.doesNotMatch(payload, /checkout_url/i);
  assert.doesNotMatch(payload, /subscription_id/i);
  assert.doesNotMatch(payload, /MPLP certification/i);
  assert.doesNotMatch(payload, /MPLP endorsement/i);
});
