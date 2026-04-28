import assert from "node:assert/strict";
import test from "node:test";

import {
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /(?<!no_)payment_processor/i,
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
  /autonomous_execution_enabled/i,
  /executable_action_instruction/i,
  /task_runner_payload/i,
  /tool_runner_payload/i,
  /llm_execution_prompt/i,
  /model_call_payload/i,
  /agent_dispatch_payload/i,
  /public_publishing_payload/i,
  /testimonial_page_url/i,
  /crm_object_id/i,
  /email_dispatch_payload/i,
  /autonomous_follow_up_payload/i,
  /external_analytics_payload/i,
  /paid product ready/i,
  /public beta ready/i,
  /commercial ready/i,
  /production-ready/i,
  /V3\.0 released/i,
  /MPLP certification/i,
  /MPLP endorsement/i,
  /raw_runtime_private_payload/i,
  /Context law/i,
  /Plan law/i,
  /Confirm law/i,
  /Trace law/i,
  /Core law/i,
  /State Sync law/i,
  /Transaction law/i,
  /Security omission law/i,
  /Observability evidence law/i,
  /Protocol Versioning posture/i,
  /Object\/export binding semantics/i,
] as const;

const REQUIRED_BOUNDARY_FLAGS = [
  "no_payment_processor",
  "no_checkout",
  "no_subscription_management",
  "no_provider_dispatch",
  "no_channel_dispatch",
  "no_marketplace_implementation",
  "no_autonomous_execution",
  "no_saas_sharing",
  "no_public_publishing",
  "no_crm_integration",
  "no_email_dispatch",
  "no_llm_call",
  "no_agent_dispatch",
  "no_mplp_certification",
  "no_mplp_endorsement",
] as const;

test("[v2.3 e2e] paid pilot loop serialized output preserves no-claim and no-boundary leakage posture", () => {
  const fixture = createV23PaidPilotLoopFixture();
  const payload = JSON.stringify({
    intake: fixture.main_loop.intake,
    qualification: fixture.main_loop.qualification_summary,
    payment: fixture.main_loop.manual_payment_path,
    next_action_proposal: fixture.main_loop.next_action_proposal,
    feedback: fixture.main_loop.feedback,
    case_study_permission: fixture.main_loop.case_study_permission,
    fixture,
    final_loop_summary: fixture.final_loop_summary,
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  for (const flag of REQUIRED_BOUNDARY_FLAGS) {
    assert.match(payload, new RegExp(flag));
  }
});
