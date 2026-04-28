import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_3_PILOT_BOUNDARY_FLAGS,
} from "../../app/pilots/pilot-intake-contract.ts";
import {
  create_pilot_intake_record,
} from "../../app/pilots/pilot-intake-workflow.ts";
import {
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

test("[v2.3] pilot intake contract creates a bounded local record", () => {
  const intake = create_pilot_intake_record({
    intake_id: "contract-intake-001",
    design_partner_id: "contract-partner-001",
    created_at: "2026-04-28T07:00:00.000Z",
    primary_use_case: "repo_governance_review",
    applicant_profile: V2_3_STRONG_FIT_PILOT_INTAKE.applicant_profile,
    pain_profile: V2_3_STRONG_FIT_PILOT_INTAKE.pain_profile,
    expectation_profile: V2_3_STRONG_FIT_PILOT_INTAKE.expectation_profile,
  });

  assert.equal(intake.status, "draft");
  assert.equal(intake.boundary_flags.manual_first, true);
  assert.deepEqual(intake.boundary_flags, V2_3_PILOT_BOUNDARY_FLAGS);
  assert.equal(intake.applicant_profile.applicant_name.length > 0, true);
  assert.equal(intake.pain_profile.governance_pain_summary.length > 0, true);
  assert.equal(intake.expectation_profile.accepts_manual_onboarding, true);
});

test("[v2.3] pilot intake contract has required boundary flags and no commercial implementation fields", () => {
  const serialized = JSON.stringify(V2_3_STRONG_FIT_PILOT_INTAKE);

  assert.equal(V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.manual_first, true);
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.design_partner_only,
    true
  );
  assert.equal(V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.review_only, true);
  assert.equal(V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.non_executing, true);
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_payment_processor,
    true
  );
  assert.equal(V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_checkout, true);
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_subscription_management,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_saas_sharing,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_provider_dispatch,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_channel_dispatch,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_marketplace_implementation,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_autonomous_execution,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_public_beta_claim,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_paid_product_readiness_claim,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_mplp_certification,
    true
  );
  assert.equal(
    V2_3_STRONG_FIT_PILOT_INTAKE.boundary_flags.no_mplp_endorsement,
    true
  );

  assert.doesNotMatch(serialized, /checkout_url/i);
  assert.doesNotMatch(serialized, /subscription_id/i);
  assert.doesNotMatch(serialized, /card_number/i);
  assert.doesNotMatch(serialized, /provider_dispatch_payload/i);
  assert.doesNotMatch(serialized, /channel_dispatch_payload/i);
  assert.doesNotMatch(serialized, /marketplace_install/i);
  assert.doesNotMatch(serialized, /executable_action_instruction/i);
  assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
  assert.doesNotMatch(serialized, /MPLP certification/i);
  assert.doesNotMatch(serialized, /MPLP endorsement/i);
});
