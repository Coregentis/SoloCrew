import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS,
} from "../../app/commercialization/case-study-conversion-gate-contract.ts";
import {
  block_case_study_conversion_gate,
  calculate_case_study_permission_readiness_band,
  calculate_manual_conversion_readiness_band,
  create_case_study_conversion_gate,
  create_case_study_conversion_gate_summary,
  decide_case_study_conversion_gate,
  mark_case_study_conversion_gate_ready_for_manual_review,
  mark_case_study_conversion_gate_reviewed_manually,
} from "../../app/commercialization/case-study-conversion-gate-workflow.ts";
import {
  createV23FeedbackCaptureFixture,
} from "../../projection/fixtures/v2-3-feedback-capture-fixture.ts";
import {
  createV24CaseStudyConversionGateFixture,
} from "../../projection/fixtures/v2-4-case-study-conversion-gate-fixture.ts";

test("[v2.4] case-study permission readiness bands cover expected states", () => {
  const feedback_fixture = createV23FeedbackCaptureFixture();

  assert.equal(
    calculate_case_study_permission_readiness_band({
      permission: feedback_fixture.permission_records.private_reference,
    }),
    "private_reference_only"
  );
  assert.equal(
    calculate_case_study_permission_readiness_band({
      permission: feedback_fixture.permission_records.anonymized_quote,
    }),
    "anonymized_quote_candidate"
  );
  assert.equal(
    calculate_case_study_permission_readiness_band({
      permission: feedback_fixture.permission_records.needs_legal_review,
    }),
    "needs_legal_review"
  );
  assert.equal(
    calculate_case_study_permission_readiness_band({
      permission: feedback_fixture.permission_records.denied,
    }),
    "denied"
  );
  assert.equal(
    calculate_case_study_permission_readiness_band({}),
    "permission_absent"
  );
  assert.equal(
    calculate_case_study_permission_readiness_band({
      permission: feedback_fixture.permission_records.private_reference,
      source_blockers: ["permission_source_blocker"],
    }),
    "blocked"
  );
});

test("[v2.4] manual conversion readiness bands cover expected evidence states", () => {
  assert.equal(
    calculate_manual_conversion_readiness_band({
      feedback_evidence_strength_band: "strong_manual_signal",
      permission_readiness_band: "private_reference_only",
    }),
    "strong_manual_signal"
  );
  assert.equal(
    calculate_manual_conversion_readiness_band({
      feedback_evidence_strength_band: "useful_manual_signal",
      permission_readiness_band: "anonymized_quote_candidate",
    }),
    "useful_manual_signal"
  );
  assert.equal(
    calculate_manual_conversion_readiness_band({
      feedback_evidence_strength_band: "weak_signal",
      permission_readiness_band: "private_reference_only",
    }),
    "weak_manual_signal"
  );
  assert.equal(
    calculate_manual_conversion_readiness_band({
      feedback_evidence_strength_band: "needs_operator_review",
      permission_readiness_band: "needs_legal_review",
    }),
    "needs_operator_review"
  );
  assert.equal(
    calculate_manual_conversion_readiness_band({
      feedback_evidence_strength_band: "blocked",
      permission_readiness_band: "private_reference_only",
    }),
    "blocked"
  );
  assert.equal(
    calculate_manual_conversion_readiness_band({
      permission_readiness_band: "permission_absent",
    }),
    "insufficient_evidence"
  );
});

test("[v2.4] case-study conversion decisions stay manual and deterministic", () => {
  const cases = [
    {
      permission_readiness_band: "private_reference_only",
      manual_conversion_readiness_band: "useful_manual_signal",
      source_blockers: [],
      decision: "prepare_private_reference_review",
    },
    {
      permission_readiness_band: "anonymized_quote_candidate",
      manual_conversion_readiness_band: "useful_manual_signal",
      source_blockers: [],
      decision: "prepare_anonymized_quote_review",
    },
    {
      permission_readiness_band: "private_reference_only",
      manual_conversion_readiness_band: "strong_manual_signal",
      source_blockers: [],
      decision: "prepare_manual_conversion_review",
    },
    {
      permission_readiness_band: "needs_legal_review",
      manual_conversion_readiness_band: "needs_operator_review",
      source_blockers: [],
      decision: "require_legal_review",
    },
    {
      permission_readiness_band: "denied",
      manual_conversion_readiness_band: "weak_manual_signal",
      source_blockers: [],
      decision: "deny_public_use",
    },
    {
      permission_readiness_band: "permission_absent",
      manual_conversion_readiness_band: "insufficient_evidence",
      source_blockers: [],
      decision: "hold_for_more_evidence",
    },
    {
      permission_readiness_band: "private_reference_only",
      manual_conversion_readiness_band: "strong_manual_signal",
      source_blockers: ["blocked_boundary"],
      decision: "blocked",
    },
  ] as const;

  for (const entry of cases) {
    assert.equal(decide_case_study_conversion_gate(entry), entry.decision);
  }
});

test("[v2.4] case-study conversion gate workflow reaches manual review", () => {
  const gate =
    createV24CaseStudyConversionGateFixture().gates
      .manual_conversion_review_candidate;
  const ready = mark_case_study_conversion_gate_ready_for_manual_review({
    gate,
    reviewed_at: "2026-04-28T23:10:00.000Z",
  });
  const reviewed = mark_case_study_conversion_gate_reviewed_manually({
    gate: ready,
    reviewed_at: "2026-04-28T23:15:00.000Z",
    manual_review_note: "Founder reviewed manual conversion gate locally.",
  });

  assert.equal(ready.status, "ready_for_manual_review");
  assert.equal(reviewed.status, "reviewed_manually");
  assert.equal(reviewed.updated_at, "2026-04-28T23:15:00.000Z");
  assert.match(
    JSON.stringify(reviewed.manual_review_notes),
    /Founder reviewed manual conversion gate locally/
  );
  assert.deepEqual(
    reviewed.boundary_flags,
    V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS
  );
});

test("[v2.4] case-study conversion gate block transition is deterministic", () => {
  const gate = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-block-workflow",
    created_at: "2026-04-28T23:20:00.000Z",
  });
  const blocked = block_case_study_conversion_gate({
    gate,
    blocked_at: "2026-04-28T23:25:00.000Z",
    source_blocker: "case_study_permission_source_blocked",
  });
  const after_blocked = mark_case_study_conversion_gate_ready_for_manual_review({
    gate: blocked,
    reviewed_at: "2026-04-28T23:30:00.000Z",
  });

  assert.equal(blocked.status, "blocked");
  assert.equal(blocked.permission_readiness_band, "blocked");
  assert.equal(blocked.manual_conversion_readiness_band, "blocked");
  assert.equal(blocked.decision, "blocked");
  assert.deepEqual(blocked.source_blockers, [
    "case_study_permission_source_blocked",
  ]);
  assert.equal(after_blocked.status, "blocked");
  assert.equal(after_blocked.updated_at, "2026-04-28T23:25:00.000Z");
});

test("[v2.4] case-study conversion gate invalid and final transitions are no-ops", () => {
  const gate =
    createV24CaseStudyConversionGateFixture().gates
      .private_reference_review_candidate;
  const invalid_review = mark_case_study_conversion_gate_reviewed_manually({
    gate,
    reviewed_at: "2026-04-28T23:35:00.000Z",
    manual_review_note: "This direct transition must not apply.",
  });
  const ready = mark_case_study_conversion_gate_ready_for_manual_review({
    gate,
    reviewed_at: "2026-04-28T23:40:00.000Z",
  });
  const reviewed = mark_case_study_conversion_gate_reviewed_manually({
    gate: ready,
    reviewed_at: "2026-04-28T23:45:00.000Z",
    manual_review_note: "Final manual review note.",
  });
  const after_final_block = block_case_study_conversion_gate({
    gate: reviewed,
    blocked_at: "2026-04-28T23:50:00.000Z",
    source_blocker: "late_blocker_must_not_mutate_final_gate",
  });

  assert.equal(invalid_review.status, "draft");
  assert.equal(invalid_review.updated_at, gate.updated_at);
  assert.equal(reviewed.status, "reviewed_manually");
  assert.deepEqual(after_final_block, reviewed);
});

test("[v2.4] case-study conversion gate summaries are deterministic", () => {
  const gate =
    createV24CaseStudyConversionGateFixture().gates.legal_review_required;
  const first = create_case_study_conversion_gate_summary(gate);
  const second = create_case_study_conversion_gate_summary(gate);

  assert.deepEqual(first, second);
  assert.equal(first.decision, "require_legal_review");
  assert.equal(first.manual_first, true);
  assert.equal(first.local_only, true);
  assert.equal(first.review_only, true);
  assert.equal(first.non_executing, true);
});
