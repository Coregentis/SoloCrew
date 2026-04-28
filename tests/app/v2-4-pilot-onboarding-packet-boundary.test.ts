import assert from "node:assert/strict";
import test from "node:test";

import {
  create_pilot_onboarding_packet_summary,
} from "../../app/commercialization/pilot-onboarding-packet-workflow.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "../../projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /customer_account_id/i,
  /signup_url/i,
  /payment_processor_id/i,
  /processor_customer_id/i,
  /checkout_url/i,
  /subscription_id/i,
  /card_token/i,
  /bank_execution_payload/i,
  /crypto_execution_payload/i,
  /provider_dispatch_payload/i,
  /channel_dispatch_payload/i,
  /marketplace_install/i,
  /marketplace_resolver/i,
  /crm_object_id/i,
  /email_dispatch_payload/i,
  /public_publishing_payload/i,
  /testimonial_page_url/i,
  /llm_execution_prompt/i,
  /model_call_payload/i,
  /agent_dispatch_payload/i,
  /tool_runner_payload/i,
  /tool_invocation_payload/i,
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

test("[v2.4] pilot onboarding packet fixture preserves no-claim boundaries", () => {
  const fixture = createV24PilotOnboardingPacketFixture();
  const payload = JSON.stringify({
    fixture,
    summaries: Object.values(fixture.packets).map(
      create_pilot_onboarding_packet_summary
    ),
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  for (const flag of REQUIRED_BOUNDARY_FLAGS) {
    assert.match(payload, new RegExp(flag));
  }
});

test("[v2.4] pilot onboarding packet fixture includes required onboarding branches", () => {
  const fixture = createV24PilotOnboardingPacketFixture();

  assert.equal(
    fixture.packets.qualified_design_partner.status,
    "acknowledged_manually"
  );
  assert.equal(fixture.packets.manual_review.status, "ready_for_manual_review");
  assert.equal(fixture.packets.blocked_candidate_hold.status, "blocked");
  assert.equal(
    fixture.packets.paid_pilot_loop_source_refs.source_refs.v2_3_stable_tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
  assert.equal(
    fixture.summaries.blocked_candidate_hold.blocking_reasons[0],
    "candidate_requested_forbidden_capabilities"
  );
});
