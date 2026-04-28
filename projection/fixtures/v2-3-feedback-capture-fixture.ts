import {
  accept_feedback_for_learning,
  block_pilot_feedback,
  create_case_study_permission_record,
  create_feedback_summary,
  create_pilot_feedback_record,
  deny_case_study_permission,
  grant_anonymized_public_quote_permission,
  grant_private_reference_permission,
  mark_case_study_permission_needs_legal_review,
  mark_feedback_incomplete,
  submit_pilot_feedback_record,
  withdraw_pilot_feedback,
} from "../../app/pilots/feedback-capture-workflow.ts";
import {
  V2_3_FEEDBACK_BOUNDARY_NOTICES,
} from "../../app/pilots/feedback-capture-contract.ts";
import {
  createV23ManualPaymentStatusFixture,
} from "./v2-3-manual-payment-status-fixture.ts";
import {
  createV23NextActionProposalFixture,
} from "./v2-3-next-action-proposal-fixture.ts";
import {
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "./v2-3-pilot-intake-fixture.ts";

const V2_2_STABLE_BASELINE = {
  tag: "solocrew-v2.2-stable-private-alpha-journey-20260428",
  target_commit: "aaef0147290848c35e68d8eb4e84616f904454e3",
  journey:
    "workspace/session continuity -> local review packet export -> founder dashboard continuation -> private-alpha journey E2E",
} as const;

const payment_fixture = createV23ManualPaymentStatusFixture();
const proposal_fixture = createV23NextActionProposalFixture();

const STRONG_PRIVATE_FEEDBACK = accept_feedback_for_learning({
  feedback: submit_pilot_feedback_record({
    feedback: create_pilot_feedback_record({
      feedback_id: "v2-3-feedback-strong-private-reference",
      intake: V2_3_STRONG_FIT_PILOT_INTAKE,
      payment_record: payment_fixture.records.payment_confirmed,
      proposal: proposal_fixture.proposals.payment_confirmed_with_v2_2_refs,
      created_at: "2026-04-28T12:00:00.000Z",
      rating: 5,
      signals: [
        "continuation_value",
        "time_saving",
        "useful",
        "would_pay_again",
      ],
      usefulness_summary:
        "The local review packet made the repo governance review easier to inspect manually.",
      artifact_quality_summary:
        "The packet and dashboard summary were structured enough for manual release review.",
      continuation_value_summary:
        "The saved continuation made the next review session faster and less repetitive.",
      confusion_or_risk_summary:
        "Boundary language was clear and did not imply execution.",
      support_burden_summary:
        "One short manual walkthrough was enough for the pilot user.",
      willingness_to_continue: true,
      willingness_to_pay_again: true,
      operator_notes: "Strong private-reference candidate.",
    }),
    submitted_at: "2026-04-28T12:05:00.000Z",
  }),
  accepted_at: "2026-04-28T12:10:00.000Z",
});

const STRONG_PUBLIC_QUOTE_FEEDBACK = accept_feedback_for_learning({
  feedback: submit_pilot_feedback_record({
    feedback: create_pilot_feedback_record({
      feedback_id: "v2-3-feedback-anonymized-quote",
      intake: V2_3_STRONG_FIT_PILOT_INTAKE,
      payment_record: payment_fixture.records.payment_confirmed,
      proposal: proposal_fixture.proposals.payment_confirmed_with_v2_2_refs,
      created_at: "2026-04-28T12:15:00.000Z",
      rating: 4,
      signals: ["continuation_value", "time_saving", "useful"],
      usefulness_summary:
        "The review-only journey produced a useful governance packet for manual review.",
      artifact_quality_summary:
        "The artifacts were easy to compare against the project release checklist.",
      continuation_value_summary:
        "The dashboard continuation preserved the next review action clearly.",
      confusion_or_risk_summary:
        "No confusion about non-executing boundaries was reported.",
      support_burden_summary:
        "Support burden stayed low after the initial guided session.",
      willingness_to_continue: true,
      willingness_to_pay_again: true,
      operator_notes: "Anonymized quote permission can be stored for future manual review.",
    }),
    submitted_at: "2026-04-28T12:20:00.000Z",
  }),
  accepted_at: "2026-04-28T12:25:00.000Z",
});

const INCOMPLETE_FEEDBACK = mark_feedback_incomplete({
  feedback: submit_pilot_feedback_record({
    feedback: create_pilot_feedback_record({
      feedback_id: "v2-3-feedback-incomplete",
      intake: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
      payment_record: payment_fixture.records.payment_blocked,
      proposal: proposal_fixture.proposals.manual_exception,
      created_at: "2026-04-28T12:30:00.000Z",
      rating: 3,
      signals: ["needs_more_guidance", "unclear"],
      usefulness_summary: "Needs a second manual conversation.",
      artifact_quality_summary: "",
      continuation_value_summary: "",
      confusion_or_risk_summary:
        "Candidate was unsure which manual step should happen next.",
      support_burden_summary: "",
      willingness_to_continue: true,
      willingness_to_pay_again: false,
      operator_notes: "Incomplete until manual clarification is captured.",
    }),
    submitted_at: "2026-04-28T12:35:00.000Z",
  }),
  marked_at: "2026-04-28T12:40:00.000Z",
});

const WITHDRAWN_FEEDBACK = withdraw_pilot_feedback({
  feedback: submit_pilot_feedback_record({
    feedback: create_pilot_feedback_record({
      feedback_id: "v2-3-feedback-withdrawn",
      intake: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
      created_at: "2026-04-28T12:45:00.000Z",
      rating: 2,
      signals: ["too_manual"],
      usefulness_summary: "Withdrawn before learning review.",
      artifact_quality_summary: "Withdrawn before artifact assessment.",
      continuation_value_summary: "Withdrawn before continuation assessment.",
      confusion_or_risk_summary: "Candidate withdrew feedback.",
      support_burden_summary: "No support assessment.",
      willingness_to_continue: false,
      willingness_to_pay_again: false,
      operator_notes: "Withdrawn feedback is excluded from learning acceptance.",
    }),
    submitted_at: "2026-04-28T12:50:00.000Z",
  }),
  withdrawn_at: "2026-04-28T12:55:00.000Z",
});

const BLOCKED_FEEDBACK = block_pilot_feedback({
  feedback: create_pilot_feedback_record({
    feedback_id: "v2-3-feedback-blocked",
    intake: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
    created_at: "2026-04-28T13:00:00.000Z",
    rating: 1,
    signals: ["boundary_confusion"],
    usefulness_summary: "Blocked because the candidate expected automation.",
    artifact_quality_summary: "Blocked before artifact review.",
    continuation_value_summary: "Blocked before continuation review.",
    confusion_or_risk_summary:
      "Candidate asked for public automation outside the V2.3 boundary.",
    support_burden_summary: "Manual support would exceed pilot limits.",
    willingness_to_continue: false,
    willingness_to_pay_again: false,
  }),
  blocked_at: "2026-04-28T13:05:00.000Z",
});

const PRIVATE_PERMISSION = grant_private_reference_permission({
  permission: create_case_study_permission_record({
    permission_id: "v2-3-case-study-private-reference",
    feedback: STRONG_PRIVATE_FEEDBACK,
    created_at: "2026-04-28T13:10:00.000Z",
  }),
  granted_at: "2026-04-28T13:15:00.000Z",
  allowed_quote_refs: ["feedback:v2-3-feedback-strong-private-reference"],
});

const ANONYMIZED_QUOTE_PERMISSION = grant_anonymized_public_quote_permission({
  permission: create_case_study_permission_record({
    permission_id: "v2-3-case-study-anonymized-quote",
    feedback: STRONG_PUBLIC_QUOTE_FEEDBACK,
    created_at: "2026-04-28T13:20:00.000Z",
  }),
  granted_at: "2026-04-28T13:25:00.000Z",
  allowed_quote_refs: ["feedback:v2-3-feedback-anonymized-quote"],
});

const DENIED_PERMISSION = deny_case_study_permission({
  permission: create_case_study_permission_record({
    permission_id: "v2-3-case-study-denied",
    feedback: INCOMPLETE_FEEDBACK,
    created_at: "2026-04-28T13:30:00.000Z",
  }),
  denied_at: "2026-04-28T13:35:00.000Z",
  denied_reason: "Candidate declined case-study use.",
});

const NEEDS_LEGAL_REVIEW_PERMISSION =
  mark_case_study_permission_needs_legal_review({
    permission: create_case_study_permission_record({
      permission_id: "v2-3-case-study-needs-legal-review",
      feedback: STRONG_PUBLIC_QUOTE_FEEDBACK,
      created_at: "2026-04-28T13:40:00.000Z",
    }),
    marked_at: "2026-04-28T13:45:00.000Z",
    legal_review_note: "Operator must verify anonymized quote scope manually.",
  });

export function createV23FeedbackCaptureFixture() {
  const feedback_records = {
    strong_private_reference: STRONG_PRIVATE_FEEDBACK,
    strong_anonymized_quote: STRONG_PUBLIC_QUOTE_FEEDBACK,
    incomplete_feedback: INCOMPLETE_FEEDBACK,
    withdrawn_feedback: WITHDRAWN_FEEDBACK,
    blocked_feedback: BLOCKED_FEEDBACK,
  };

  const permission_records = {
    private_reference: PRIVATE_PERMISSION,
    anonymized_quote: ANONYMIZED_QUOTE_PERMISSION,
    denied: DENIED_PERMISSION,
    needs_legal_review: NEEDS_LEGAL_REVIEW_PERMISSION,
  };

  return {
    fixture_id: "v2-3-feedback-capture-fixture",
    fixture_kind: "local_feedback_and_case_study_permission_path",
    v2_2_stable_baseline: V2_2_STABLE_BASELINE,
    boundary_notices: [...V2_3_FEEDBACK_BOUNDARY_NOTICES],
    feedback_records,
    permission_records,
    summaries: {
      strong_private_reference: create_feedback_summary({
        feedback: feedback_records.strong_private_reference,
        permission: permission_records.private_reference,
      }),
      strong_anonymized_quote: create_feedback_summary({
        feedback: feedback_records.strong_anonymized_quote,
        permission: permission_records.anonymized_quote,
      }),
      incomplete_feedback: create_feedback_summary({
        feedback: feedback_records.incomplete_feedback,
        permission: permission_records.denied,
      }),
      withdrawn_feedback: create_feedback_summary({
        feedback: feedback_records.withdrawn_feedback,
      }),
      blocked_feedback: create_feedback_summary({
        feedback: feedback_records.blocked_feedback,
        permission: permission_records.needs_legal_review,
      }),
    },
  } as const;
}
