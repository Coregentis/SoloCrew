import assert from "node:assert/strict";
import test from "node:test";

import {
  calculate_case_study_permission_readiness_band,
  calculate_manual_conversion_readiness_band,
  create_case_study_conversion_gate_summary,
  decide_case_study_conversion_gate,
} from "../../app/commercialization/case-study-conversion-gate-workflow.ts";
import {
  createV23FeedbackCaptureFixture,
} from "../../projection/fixtures/v2-3-feedback-capture-fixture.ts";
import {
  createV24CaseStudyConversionGateFixture,
} from "../../projection/fixtures/v2-4-case-study-conversion-gate-fixture.ts";

test("[v2.4] case-study conversion gate fixture is deterministic", () => {
  const first = JSON.stringify(createV24CaseStudyConversionGateFixture());
  const second = JSON.stringify(createV24CaseStudyConversionGateFixture());

  assert.equal(first, second);
});

test("[v2.4] case-study conversion gate summaries are stable", () => {
  const gate =
    createV24CaseStudyConversionGateFixture().gates
      .manual_conversion_review_candidate;
  const first = create_case_study_conversion_gate_summary(gate);
  const second = create_case_study_conversion_gate_summary(gate);

  assert.deepEqual(first, second);
  assert.equal(first.decision, "prepare_manual_conversion_review");
});

test("[v2.4] case-study conversion evidence signals are ordered deterministically", () => {
  const gate =
    createV24CaseStudyConversionGateFixture().gates
      .manual_conversion_review_candidate;

  assert.deepEqual(gate.evidence_signals, [
    "dashboard_evidence_present",
    "feedback_evidence_present",
    "manual_payment_confirmed",
    "onboarding_packet_present",
    "permission_present",
    "private_reference_permission",
    "strong_feedback_evidence",
  ]);
});

test("[v2.4] case-study conversion calculations are deterministic", () => {
  const feedback_fixture = createV23FeedbackCaptureFixture();
  const permission_input = {
    permission: feedback_fixture.permission_records.private_reference,
  };
  const readiness_input = {
    feedback_evidence_strength_band: "strong_manual_signal",
    permission_readiness_band: "private_reference_only",
    source_blockers: [],
  } as const;
  const decision_input = {
    permission_readiness_band: "private_reference_only",
    manual_conversion_readiness_band: "strong_manual_signal",
    source_blockers: [],
  } as const;

  assert.equal(
    calculate_case_study_permission_readiness_band(permission_input),
    calculate_case_study_permission_readiness_band(permission_input)
  );
  assert.equal(
    calculate_manual_conversion_readiness_band(readiness_input),
    calculate_manual_conversion_readiness_band(readiness_input)
  );
  assert.equal(
    decide_case_study_conversion_gate(decision_input),
    decide_case_study_conversion_gate(decision_input)
  );
  assert.equal(
    decide_case_study_conversion_gate(decision_input),
    "prepare_manual_conversion_review"
  );
});
