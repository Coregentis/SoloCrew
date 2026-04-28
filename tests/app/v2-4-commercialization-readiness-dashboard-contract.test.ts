import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_DASHBOARD_BOUNDARY_FLAGS,
  type CommercializationReadinessScoreBand,
} from "../../app/commercialization/commercialization-readiness-dashboard-contract.ts";
import {
  create_commercialization_readiness_dashboard,
  create_commercialization_readiness_dashboard_summary,
} from "../../app/commercialization/commercialization-readiness-dashboard-workflow.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "../../projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-dashboard-fixture.ts";

function create_dashboard() {
  const onboarding =
    createV24PilotOnboardingPacketFixture().summaries.qualified_design_partner;

  return create_commercialization_readiness_dashboard({
    dashboard_id: "v2-4-dashboard-contract",
    created_at: "2026-04-28T19:00:00.000Z",
    onboarding_packet_summary: onboarding,
    source_refs: {
      manual_payment_status: "payment_confirmed",
      payment_record_id: "v2-3-payment-contract",
      next_action_proposal_id: "v2-3-proposal-contract",
      feedback_id: "v2-3-feedback-contract",
      case_study_permission_id: "v2-3-permission-contract",
      v2_4_onboarding_packet_ref: "fixture:v2-4-contract",
    },
    evidence_signals: [
      "case_study_permission_present",
      "feedback_evidence_present",
      "manual_payment_confirmed",
      "onboarding_acknowledged",
      "onboarding_packet_present",
      "v2_3_paid_pilot_loop_refs_present",
    ],
    support_burden_signals: [
      "bounded_manual_support",
      "low_manual_support_burden",
    ],
    feedback_signals: [
      "feedback_accepted_for_learning",
      "willingness_to_continue",
      "willingness_to_pay_again",
    ],
    case_study_signals: ["private_reference_permission"],
  });
}

test("[v2.4] commercialization readiness dashboard contract creates a valid local dashboard", () => {
  const dashboard = create_dashboard();
  const summary = create_commercialization_readiness_dashboard_summary(dashboard);

  assert.equal(dashboard.status, "draft");
  assert.equal(dashboard.score_band, "promising_manual_pilot");
  assert.deepEqual(dashboard.boundary_flags, V2_4_DASHBOARD_BOUNDARY_FLAGS);
  assert.equal(summary.manual_first, true);
  assert.equal(summary.local_only, true);
  assert.equal(summary.review_only, true);
  assert.equal(summary.non_executing, true);
});

test("[v2.4] commercialization readiness dashboard contract exposes required source refs", () => {
  const dashboard = create_dashboard();

  assert.equal(
    dashboard.source_refs.onboarding_packet_id,
    "v2-4-pilot-onboarding-qualified"
  );
  assert.equal(
    dashboard.source_refs.onboarding_packet_status,
    "acknowledged_manually"
  );
  assert.equal(
    dashboard.source_refs.onboarding_packet_summary_ref,
    "summary:v2-4-pilot-onboarding-qualified"
  );
  assert.equal(dashboard.source_refs.intake_id, "v2-3-pilot-intake-strong-fit");
  assert.equal(dashboard.source_refs.design_partner_id, "design-partner-strong-fit");
  assert.equal(dashboard.source_refs.qualification_classification, "strong_fit");
  assert.equal(dashboard.source_refs.manual_payment_status, "payment_confirmed");
  assert.equal(
    dashboard.source_refs.v2_3_stable_tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
});

test("[v2.4] commercialization readiness dashboard score bands avoid readiness labels", () => {
  const allowed: CommercializationReadinessScoreBand[] = [
    "insufficient_evidence",
    "early_signal",
    "promising_manual_pilot",
    "needs_operator_review",
    "blocked",
  ];

  for (const band of allowed) {
    assert.doesNotMatch(band, /commercial_ready/i);
    assert.doesNotMatch(band, /public_beta_ready/i);
    assert.doesNotMatch(band, /production_ready/i);
    assert.doesNotMatch(band, /paid_product_ready/i);
  }
});

test("[v2.4] commercialization readiness dashboard exposes no forbidden implementation fields", () => {
  const fixture = createV24CommercializationReadinessDashboardFixture();
  const payload = JSON.stringify({
    dashboard: create_dashboard(),
    fixture,
  });

  assert.doesNotMatch(payload, /customer_account_id/i);
  assert.doesNotMatch(payload, /signup_url/i);
  assert.doesNotMatch(payload, /payment_processor_id/i);
  assert.doesNotMatch(payload, /checkout_url/i);
  assert.doesNotMatch(payload, /subscription_id/i);
  assert.doesNotMatch(payload, /card_token/i);
  assert.doesNotMatch(payload, /bank_execution_payload/i);
  assert.doesNotMatch(payload, /crypto_execution_payload/i);
  assert.doesNotMatch(payload, /provider_dispatch_payload/i);
  assert.doesNotMatch(payload, /channel_dispatch_payload/i);
  assert.doesNotMatch(payload, /marketplace_install/i);
  assert.doesNotMatch(payload, /crm_object_id/i);
  assert.doesNotMatch(payload, /email_dispatch_payload/i);
  assert.doesNotMatch(payload, /public_publishing_payload/i);
  assert.doesNotMatch(payload, /llm_execution_prompt/i);
  assert.doesNotMatch(payload, /model_call_payload/i);
  assert.doesNotMatch(payload, /agent_dispatch_payload/i);
  assert.doesNotMatch(payload, /tool_runner_payload/i);
  assert.doesNotMatch(payload, /saas_share_url/i);
  assert.doesNotMatch(payload, /autonomous_execution_enabled/i);
  assert.doesNotMatch(payload, /raw_runtime_private_payload/i);
});
