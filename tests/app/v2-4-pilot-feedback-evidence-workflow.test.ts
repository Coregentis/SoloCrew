import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS,
} from "../../app/commercialization/pilot-feedback-evidence-contract.ts";
import {
  block_pilot_feedback_evidence,
  calculate_feedback_evidence_strength_band,
  create_pilot_feedback_evidence_record,
  create_pilot_feedback_evidence_summary,
  mark_pilot_feedback_evidence_ready_for_manual_review,
  mark_pilot_feedback_evidence_reviewed_manually,
} from "../../app/commercialization/pilot-feedback-evidence-workflow.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";

test("[v2.4] pilot feedback evidence scoring covers expected bands", () => {
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
    calculate_feedback_evidence_strength_band({
      usefulness_signals: ["feedback_absent"],
      support_signals: ["support_burden_unclear"],
      continuation_signals: ["continuation_unclear"],
      permission_signals: ["permission_absent"],
      source_blockers: [],
    }),
    "insufficient_evidence"
  );
});

test("[v2.4] pilot feedback evidence workflow reaches manual review", () => {
  const evidence =
    createV24PilotFeedbackEvidenceFixture().evidence_records
      .strong_manual_feedback_evidence;
  const ready = mark_pilot_feedback_evidence_ready_for_manual_review({
    evidence,
    reviewed_at: "2026-04-28T21:10:00.000Z",
  });
  const reviewed = mark_pilot_feedback_evidence_reviewed_manually({
    evidence: ready,
    reviewed_at: "2026-04-28T21:15:00.000Z",
    evidence_note: "Founder reviewed strengthened feedback evidence manually.",
  });

  assert.equal(ready.status, "ready_for_manual_review");
  assert.equal(reviewed.status, "reviewed_manually");
  assert.equal(reviewed.updated_at, "2026-04-28T21:15:00.000Z");
  assert.match(
    JSON.stringify(reviewed.evidence_notes),
    /Founder reviewed strengthened feedback evidence manually/
  );
  assert.deepEqual(reviewed.boundary_flags, V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS);
});

test("[v2.4] pilot feedback evidence block transition is deterministic", () => {
  const evidence = create_pilot_feedback_evidence_record({
    evidence_id: "v2-4-feedback-evidence-block-workflow",
    created_at: "2026-04-28T21:20:00.000Z",
    usefulness_signals: ["usefulness_unclear"],
    support_signals: ["support_burden_high_or_blocked"],
    continuation_signals: ["continuation_unclear"],
    permission_signals: ["needs_legal_review"],
  });
  const blocked = block_pilot_feedback_evidence({
    evidence,
    blocked_at: "2026-04-28T21:25:00.000Z",
    source_blocker: "feedback_permission_boundary_requires_operator_review",
  });
  const after_blocked = mark_pilot_feedback_evidence_ready_for_manual_review({
    evidence: blocked,
    reviewed_at: "2026-04-28T21:30:00.000Z",
  });

  assert.equal(blocked.status, "blocked");
  assert.equal(blocked.strength_band, "blocked");
  assert.deepEqual(blocked.source_blockers, [
    "feedback_permission_boundary_requires_operator_review",
  ]);
  assert.equal(after_blocked.status, "blocked");
  assert.equal(after_blocked.updated_at, "2026-04-28T21:25:00.000Z");
});

test("[v2.4] pilot feedback evidence invalid and final transitions are no-ops", () => {
  const evidence =
    createV24PilotFeedbackEvidenceFixture().evidence_records
      .useful_manual_feedback_evidence;
  const invalid_review = mark_pilot_feedback_evidence_reviewed_manually({
    evidence,
    reviewed_at: "2026-04-28T21:35:00.000Z",
    evidence_note: "This direct transition must not apply.",
  });
  const ready = mark_pilot_feedback_evidence_ready_for_manual_review({
    evidence,
    reviewed_at: "2026-04-28T21:40:00.000Z",
  });
  const reviewed = mark_pilot_feedback_evidence_reviewed_manually({
    evidence: ready,
    reviewed_at: "2026-04-28T21:45:00.000Z",
    evidence_note: "Final manual review note.",
  });
  const after_final_block = block_pilot_feedback_evidence({
    evidence: reviewed,
    blocked_at: "2026-04-28T21:50:00.000Z",
    source_blocker: "late_blocker_must_not_mutate_final_record",
  });

  assert.equal(invalid_review.status, "draft");
  assert.equal(invalid_review.updated_at, evidence.updated_at);
  assert.equal(reviewed.status, "reviewed_manually");
  assert.deepEqual(after_final_block, reviewed);
});

test("[v2.4] pilot feedback evidence summaries are deterministic", () => {
  const evidence =
    createV24PilotFeedbackEvidenceFixture().evidence_records
      .needs_operator_review_feedback_evidence;
  const first = create_pilot_feedback_evidence_summary(evidence);
  const second = create_pilot_feedback_evidence_summary(evidence);

  assert.deepEqual(first, second);
  assert.equal(first.strength_band, "needs_operator_review");
  assert.equal(
    first.recommended_manual_step,
    "resolve_mixed_feedback_or_permission_evidence"
  );
  assert.equal(first.manual_first, true);
  assert.equal(first.local_only, true);
  assert.equal(first.review_only, true);
  assert.equal(first.non_executing, true);
});
