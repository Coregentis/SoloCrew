import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_ONBOARDING_BOUNDARY_FLAGS,
} from "../../app/commercialization/pilot-onboarding-packet-contract.ts";
import {
  create_pilot_onboarding_packet,
  create_pilot_onboarding_packet_summary,
} from "../../app/commercialization/pilot-onboarding-packet-workflow.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "../../projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts";

function create_packet() {
  return create_pilot_onboarding_packet({
    packet_id: "v2-4-contract-packet",
    created_at: "2026-04-28T17:00:00.000Z",
    audience: "design_partner",
    expectation_profile: {
      pilot_goal: "Clarify manual pilot expectations.",
      desired_business_learning: "Learn whether onboarding context is clear.",
      expected_operator_support: "Manual local review support.",
      expected_design_partner_action: "Review and acknowledge the packet.",
      acknowledged_manual_first: true,
      acknowledged_bounded_pilot_only: true,
      acknowledged_local_review_only: true,
      acknowledged_non_executing: true,
      acknowledged_no_public_beta: true,
      acknowledged_no_readiness_claims: true,
    },
    required_inputs: [
      {
        input_id: "project_context",
        label: "Project context",
        description: "Manual project context for local review.",
        required: true,
        source_ref_hint: "intake.technical_context_summary",
      },
    ],
    support_boundaries: [
      {
        boundary_id: "manual_support",
        summary: "Manual support only.",
        operator_responsibility: "Review local artifacts manually.",
        design_partner_responsibility: "Provide context manually.",
        escalation_path: "manual_operator_review",
        non_scope: ["payment_execution", "public_publishing"],
      },
    ],
    source_refs: {
      intake_id: "v2-3-intake-contract",
      design_partner_id: "v2-3-design-partner-contract",
      qualification_classification: "strong_fit",
      manual_payment_status: "payment_confirmed",
      payment_record_id: "v2-3-payment-contract",
      next_action_proposal_id: "v2-3-proposal-contract",
      feedback_id: "v2-3-feedback-contract",
      case_study_permission_id: "v2-3-permission-contract",
    },
  });
}

test("[v2.4] pilot onboarding packet contract creates a valid bounded packet", () => {
  const packet = create_packet();
  const summary = create_pilot_onboarding_packet_summary(packet);

  assert.equal(packet.status, "draft");
  assert.equal(packet.audience, "design_partner");
  assert.equal(packet.manual_acknowledgement_required, true);
  assert.deepEqual(packet.boundary_flags, V2_4_ONBOARDING_BOUNDARY_FLAGS);
  assert.equal(summary.manual_first, true);
  assert.equal(summary.local_only, true);
  assert.equal(summary.review_only, true);
  assert.equal(summary.non_executing, true);
});

test("[v2.4] pilot onboarding packet contract exposes required sections and source refs", () => {
  const packet = create_packet();
  const section_ids = packet.sections.map((section) => section.section_id);

  assert.deepEqual(section_ids, [
    "expectations",
    "required_project_inputs",
    "source_refs",
    "support_boundaries",
  ]);
  assert.equal(packet.required_inputs[0]?.input_id, "project_context");
  assert.equal(packet.support_boundaries[0]?.boundary_id, "manual_support");
  assert.equal(packet.source_refs.intake_id, "v2-3-intake-contract");
  assert.equal(packet.source_refs.design_partner_id, "v2-3-design-partner-contract");
  assert.equal(packet.source_refs.qualification_classification, "strong_fit");
  assert.equal(packet.source_refs.manual_payment_status, "payment_confirmed");
  assert.equal(
    packet.source_refs.v2_3_stable_tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
});

test("[v2.4] pilot onboarding packet contract keeps every boundary flag true", () => {
  const packet = create_packet();

  for (const value of Object.values(packet.boundary_flags)) {
    assert.equal(value, true);
  }
});

test("[v2.4] pilot onboarding packet contract exposes no forbidden implementation fields", () => {
  const fixture = createV24PilotOnboardingPacketFixture();
  const payload = JSON.stringify({
    packet: create_packet(),
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
