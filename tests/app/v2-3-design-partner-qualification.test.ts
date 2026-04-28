import assert from "node:assert/strict";
import test from "node:test";

import {
  calculate_design_partner_fit_score,
  classify_design_partner_fit,
  qualify_design_partner_intake,
} from "../../app/pilots/design-partner-qualification.ts";
import {
  qualify_pilot_intake_record,
  submit_pilot_intake_record,
} from "../../app/pilots/pilot-intake-workflow.ts";
import {
  V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

test("[v2.3] strong-fit design partner candidate qualifies deterministically", () => {
  const score = calculate_design_partner_fit_score(
    V2_3_STRONG_FIT_PILOT_INTAKE
  );
  const classification = classify_design_partner_fit(
    V2_3_STRONG_FIT_PILOT_INTAKE
  );
  const summary = qualify_design_partner_intake(V2_3_STRONG_FIT_PILOT_INTAKE);

  assert.equal(score, 100);
  assert.equal(classification, "strong_fit");
  assert.equal(summary.status, "qualified");
  assert.equal(
    summary.recommended_next_manual_step,
    "schedule_manual_design_partner_review"
  );
  assert.deepEqual(summary.qualification_reasons, [
    "accepts_local_review_only_flow",
    "accepts_manual_onboarding",
    "accepts_manual_payment",
    "concrete_project_or_repo_governance_burden",
    "review_packet_or_continuation_need_present",
    "understands_non_executing_boundary",
    "understands_not_public_beta",
  ]);
});

test("[v2.3] forbidden-capability candidate is blocked without external calls", () => {
  const summary = qualify_design_partner_intake(
    V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE
  );

  assert.equal(summary.classification, "disqualified");
  assert.equal(summary.status, "blocked");
  assert.equal(summary.qualification_score, 0);
  assert.equal(
    summary.recommended_next_manual_step,
    "decline_due_to_forbidden_capability_request"
  );
  assert.equal(summary.disqualification_reasons.length > 0, true);
  assert.deepEqual(
    summary.disqualification_reasons,
    [...summary.disqualification_reasons].sort()
  );
});

test("[v2.3] manual-review candidate is routed to manual review deterministically", () => {
  const submitted = submit_pilot_intake_record({
    intake: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
    submitted_at: "2026-04-28T07:10:00.000Z",
  });
  const qualified = qualify_pilot_intake_record({
    intake: submitted,
    qualified_at: "2026-04-28T07:15:00.000Z",
  });
  const summary = qualify_design_partner_intake(submitted);

  assert.equal(summary.classification, "fit_with_manual_review");
  assert.equal(qualified.status, "needs_manual_review");
  assert.equal(qualified.qualification_score, 75);
  assert.equal(
    qualified.recommended_next_manual_step,
    "request_manual_clarification_before_pilot_decision"
  );
  assert.deepEqual(
    qualified.qualification_reasons,
    [...qualified.qualification_reasons].sort()
  );
});
