import assert from "node:assert/strict";
import test from "node:test";

import {
  calculate_feedback_evidence_strength_band,
  create_pilot_feedback_evidence_summary,
} from "../../app/commercialization/pilot-feedback-evidence-workflow.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";

test("[v2.4] pilot feedback evidence fixture is deterministic", () => {
  const first = JSON.stringify(createV24PilotFeedbackEvidenceFixture());
  const second = JSON.stringify(createV24PilotFeedbackEvidenceFixture());

  assert.equal(first, second);
});

test("[v2.4] pilot feedback evidence signal ordering is deterministic", () => {
  const evidence =
    createV24PilotFeedbackEvidenceFixture().evidence_records
      .strong_manual_feedback_evidence;

  assert.deepEqual(evidence.usefulness_signals, [
    "artifact_quality_summary_present",
    "time_saving_signal_present",
    "useful_signal_present",
    "usefulness_summary_present",
  ]);
  assert.deepEqual(evidence.support_signals, [
    "bounded_support_signal",
    "support_burden_summary_present",
  ]);
  assert.deepEqual(evidence.continuation_signals, [
    "continuation_value_present",
    "willingness_to_continue",
    "willingness_to_pay_again",
  ]);
  assert.deepEqual(evidence.permission_signals, [
    "private_reference_permission",
  ]);
});

test("[v2.4] pilot feedback evidence summaries are stable", () => {
  const evidence =
    createV24PilotFeedbackEvidenceFixture().evidence_records
      .useful_manual_feedback_evidence;
  const first = create_pilot_feedback_evidence_summary(evidence);
  const second = create_pilot_feedback_evidence_summary(evidence);

  assert.deepEqual(first, second);
  assert.equal(first.strength_band, "useful_manual_signal");
});

test("[v2.4] pilot feedback evidence strength calculation is deterministic", () => {
  const input = {
    usefulness_signals: [
      "artifact_quality_summary_present",
      "useful_signal_present",
      "usefulness_summary_present",
    ],
    support_signals: [
      "bounded_support_signal",
      "support_burden_summary_present",
    ],
    continuation_signals: [
      "continuation_value_present",
      "willingness_to_continue",
      "willingness_to_pay_again",
    ],
    permission_signals: ["private_reference_permission"],
    source_blockers: [],
  } as const;

  assert.equal(
    calculate_feedback_evidence_strength_band(input),
    calculate_feedback_evidence_strength_band(input)
  );
  assert.equal(
    calculate_feedback_evidence_strength_band(input),
    "strong_manual_signal"
  );
});
