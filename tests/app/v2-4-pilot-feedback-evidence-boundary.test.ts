import assert from "node:assert/strict";
import test from "node:test";

import {
  create_pilot_feedback_evidence_summary,
} from "../../app/commercialization/pilot-feedback-evidence-workflow.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /customer_account_id/i,
  /signup_url/i,
  /crm_object_id/i,
  /email_dispatch_payload/i,
  /public_publishing_payload/i,
  /testimonial_page_url/i,
  /external_analytics_payload/i,
  /llm_execution_prompt/i,
  /model_call_payload/i,
  /agent_dispatch_payload/i,
  /tool_runner_payload/i,
  /tool_invocation_payload/i,
  /payment_processor_id/i,
  /processor_customer_id/i,
  /checkout_url/i,
  /subscription_id/i,
  /(?<!no_)automated_billing/i,
  /card_token/i,
  /bank_execution_payload/i,
  /crypto_execution_payload/i,
  /provider_dispatch_payload/i,
  /channel_dispatch_payload/i,
  /marketplace_install/i,
  /marketplace_resolver/i,
  /saas_share_url/i,
  /autonomous_execution_enabled/i,
  /package_asset/i,
  /paid product ready/i,
  /public beta ready/i,
  /commercial ready/i,
  /production-ready/i,
  /V3\.0 released/i,
  /MPLP certification/i,
  /MPLP endorsement/i,
  /raw_runtime_private_payload/i,
] as const;

const REQUIRED_BOUNDARY_FLAGS = [
  "manual_first",
  "bounded_pilot_only",
  "design_partner_only",
  "local_only",
  "review_only",
  "non_executing",
  "no_payment_processor",
  "no_checkout",
  "no_subscription_management",
  "no_automated_billing",
  "no_provider_dispatch",
  "no_channel_dispatch",
  "no_marketplace_implementation",
  "no_crm_integration",
  "no_email_dispatch",
  "no_public_publishing",
  "no_testimonial_publishing",
  "no_external_analytics",
  "no_llm_call",
  "no_model_call",
  "no_agent_dispatch",
  "no_tool_invocation",
  "no_saas_sharing",
  "no_autonomous_execution",
  "no_public_beta_claim",
  "no_paid_product_readiness_claim",
  "no_commercial_readiness_claim",
  "no_production_ready_claim",
  "no_v3_claim",
  "no_mplp_certification",
  "no_mplp_endorsement",
  "no_cognitive_os_law_redefinition",
  "no_mplp_law_redefinition",
] as const;

test("[v2.4] pilot feedback evidence fixture preserves no-claim boundaries", () => {
  const fixture = createV24PilotFeedbackEvidenceFixture();
  const payload = JSON.stringify({
    fixture,
    summaries: Object.values(fixture.evidence_records).map(
      create_pilot_feedback_evidence_summary
    ),
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  for (const flag of REQUIRED_BOUNDARY_FLAGS) {
    assert.match(payload, new RegExp(flag));
  }
});

test("[v2.4] pilot feedback evidence fixture covers required evidence states", () => {
  const fixture = createV24PilotFeedbackEvidenceFixture();

  assert.equal(
    fixture.evidence_records.strong_manual_feedback_evidence.strength_band,
    "strong_manual_signal"
  );
  assert.equal(
    fixture.evidence_records.useful_manual_feedback_evidence.strength_band,
    "useful_manual_signal"
  );
  assert.equal(
    fixture.evidence_records.weak_incomplete_feedback_evidence.strength_band,
    "weak_signal"
  );
  assert.equal(
    fixture.evidence_records.needs_operator_review_feedback_evidence
      .strength_band,
    "needs_operator_review"
  );
  assert.equal(
    fixture.evidence_records.blocked_feedback_evidence.strength_band,
    "blocked"
  );
  assert.equal(
    fixture.source_refs.dashboard_fixture_id,
    "v2-4-commercialization-readiness-dashboard-fixture"
  );
  assert.equal(
    fixture.source_refs.onboarding_packet_fixture_id,
    "v2-4-pilot-onboarding-packet-fixture"
  );
  assert.equal(
    fixture.source_refs.paid_pilot_loop_fixture_id,
    "v2-3-paid-pilot-loop-fixture"
  );
});
