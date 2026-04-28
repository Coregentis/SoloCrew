import assert from "node:assert/strict";
import test from "node:test";

import {
  createV24CommercializationReadinessLoopFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-loop-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
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
  /crm_object_id/i,
  /email_dispatch_payload/i,
  /public_publishing_payload/i,
  /testimonial_page_url/i,
  /public_case_study_url/i,
  /case_study_publish_payload/i,
  /external_analytics_payload/i,
  /llm_execution_prompt/i,
  /model_call_payload/i,
  /agent_dispatch_payload/i,
  /tool_runner_payload/i,
  /tool_invocation_payload/i,
  /saas_share_url/i,
  /autonomous_execution_enabled/i,
  /customer_account_id/i,
  /customer_account_payload/i,
  /automatic_conversion_payload/i,
  /auto_convert/i,
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
  "no_public_case_study_generation",
  "no_external_analytics",
  "no_customer_account_provisioning",
  "no_automatic_conversion",
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
] as const;

test("[v2.4 e2e] commercialization readiness loop serialization preserves hard boundaries", () => {
  const payload = JSON.stringify(createV24CommercializationReadinessLoopFixture());

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  for (const flag of REQUIRED_BOUNDARY_FLAGS) {
    assert.match(payload, new RegExp(flag));
  }
});

test("[v2.4 e2e] commercialization readiness loop exposes only local manual review posture", () => {
  const loop = createV24CommercializationReadinessLoopFixture();

  assert.equal(loop.boundary_flags.manual_first, true);
  assert.equal(loop.boundary_flags.local_only, true);
  assert.equal(loop.boundary_flags.review_only, true);
  assert.equal(loop.boundary_flags.non_executing, true);
  assert.equal(loop.boundary_flags.no_public_publishing, true);
  assert.equal(loop.boundary_flags.no_testimonial_publishing, true);
  assert.equal(loop.boundary_flags.no_public_case_study_generation, true);
  assert.equal(loop.boundary_flags.no_customer_account_provisioning, true);
  assert.equal(loop.boundary_flags.no_automatic_conversion, true);
});
