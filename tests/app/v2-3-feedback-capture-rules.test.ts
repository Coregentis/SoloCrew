import assert from "node:assert/strict";
import test from "node:test";

import {
  calculate_feedback_completeness_score,
  classify_case_study_permission,
  classify_feedback_quality,
  recommend_feedback_manual_next_step,
  summarize_feedback_signals,
} from "../../app/pilots/feedback-capture-rules.ts";
import {
  accept_feedback_for_learning,
  create_case_study_permission_record,
  create_pilot_feedback_record,
  deny_case_study_permission,
  grant_anonymized_public_quote_permission,
  grant_private_reference_permission,
  mark_case_study_permission_needs_legal_review,
  submit_pilot_feedback_record,
  withdraw_pilot_feedback,
} from "../../app/pilots/feedback-capture-workflow.ts";
import {
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

function createStrongFeedback() {
  return submit_pilot_feedback_record({
    feedback: create_pilot_feedback_record({
      feedback_id: "feedback-rules-strong",
      intake: V2_3_STRONG_FIT_PILOT_INTAKE,
      rating: 5,
      signals: [
        "would_pay_again",
        "useful",
        "continuation_value",
        "useful",
      ],
      usefulness_summary: "Useful local review.",
      artifact_quality_summary: "Artifacts were high quality.",
      continuation_value_summary: "Continuation was valuable.",
      confusion_or_risk_summary: "No confusion.",
      support_burden_summary: "Low support.",
      willingness_to_continue: true,
      willingness_to_pay_again: true,
    }),
  });
}

test("[v2.3] feedback rules classify strong and incomplete feedback deterministically", () => {
  const strong = createStrongFeedback();
  const incomplete = create_pilot_feedback_record({
    feedback_id: "feedback-rules-incomplete",
    intake: V2_3_STRONG_FIT_PILOT_INTAKE,
    rating: 3,
    signals: ["useful"],
    usefulness_summary: "Partly useful.",
    artifact_quality_summary: "",
    continuation_value_summary: "",
    confusion_or_risk_summary: "",
    support_burden_summary: "",
    willingness_to_continue: true,
    willingness_to_pay_again: false,
  });

  assert.equal(classify_feedback_quality(strong), "strong_signal");
  assert.equal(classify_feedback_quality(incomplete), "incomplete");
  assert.equal(calculate_feedback_completeness_score(strong), 100);
  assert.deepEqual(summarize_feedback_signals(strong.signals), [
    "continuation_value",
    "useful",
    "would_pay_again",
  ]);
});

test("[v2.3] withdrawn or blocked feedback is not accepted for learning", () => {
  const withdrawn = withdraw_pilot_feedback({
    feedback: createStrongFeedback(),
    withdrawn_at: "2026-04-28T15:00:00.000Z",
  });
  const accepted = accept_feedback_for_learning({
    feedback: withdrawn,
    accepted_at: "2026-04-28T15:05:00.000Z",
  });

  assert.equal(classify_feedback_quality(withdrawn), "blocked_or_withdrawn");
  assert.equal(accepted.status, "withdrawn");
});

test("[v2.3] case-study permission classifications remain permission-gated", () => {
  const feedback = createStrongFeedback();
  const base = create_case_study_permission_record({
    permission_id: "permission-rules-base",
    feedback,
  });
  const privateOnly = grant_private_reference_permission({
    permission: base,
    allowed_quote_refs: ["quote:b", "quote:a"],
  });
  const anonymizedQuote = grant_anonymized_public_quote_permission({
    permission: base,
    allowed_quote_refs: ["quote:c"],
  });
  const denied = deny_case_study_permission({ permission: base });
  const legal = mark_case_study_permission_needs_legal_review({
    permission: base,
  });

  assert.equal(
    classify_case_study_permission(privateOnly),
    "private_reference_only"
  );
  assert.deepEqual(privateOnly.allowed_quote_refs, ["quote:a", "quote:b"]);
  assert.equal(
    classify_case_study_permission(anonymizedQuote),
    "anonymized_public_quote_allowed"
  );
  assert.equal(classify_case_study_permission(denied), "denied");
  assert.equal(denied.allowed_quote_refs.length, 0);
  assert.equal(classify_case_study_permission(legal), "needs_legal_review");
  assert.equal(
    recommend_feedback_manual_next_step({ feedback, permission: legal }),
    "add_manual_legal_review_note"
  );
});
