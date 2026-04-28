import type {
  CaseStudyPermissionClassification,
  FeedbackQualityClassification,
  PilotFeedbackSignal,
  V2_3CaseStudyPermissionRecord,
  V2_3PilotFeedbackRecord,
} from "./feedback-capture-contract.ts";

function has_text(value: string): boolean {
  return value.trim().length > 0;
}

function has_required_feedback_summaries(
  feedback: V2_3PilotFeedbackRecord
): boolean {
  return (
    has_text(feedback.usefulness_summary) &&
    has_text(feedback.artifact_quality_summary) &&
    has_text(feedback.continuation_value_summary)
  );
}

export function calculate_feedback_completeness_score(
  feedback: V2_3PilotFeedbackRecord
): number {
  const checks = [
    has_text(feedback.usefulness_summary),
    has_text(feedback.artifact_quality_summary),
    has_text(feedback.continuation_value_summary),
    has_text(feedback.confusion_or_risk_summary),
    has_text(feedback.support_burden_summary),
    feedback.signals.length > 0,
    feedback.rating >= 1 && feedback.rating <= 5,
  ];

  const passed = checks.filter(Boolean).length;
  return Math.round((passed / checks.length) * 100);
}

export function classify_feedback_quality(
  feedback: V2_3PilotFeedbackRecord
): FeedbackQualityClassification {
  if (feedback.status === "withdrawn" || feedback.status === "blocked") {
    return "blocked_or_withdrawn";
  }

  const completeness_score = calculate_feedback_completeness_score(feedback);

  if (
    feedback.rating >= 4 &&
    has_required_feedback_summaries(feedback) &&
    feedback.signals.includes("useful") &&
    feedback.signals.includes("continuation_value")
  ) {
    return "strong_signal";
  }

  if (completeness_score >= 60 && feedback.rating >= 3) {
    return "useful_but_incomplete";
  }

  return "incomplete";
}

export function summarize_feedback_signals(
  signals: PilotFeedbackSignal[]
): string[] {
  return [...new Set(signals)].sort();
}

export function classify_case_study_permission(
  permission: V2_3CaseStudyPermissionRecord
): CaseStudyPermissionClassification {
  if (permission.status === "granted_private_reference_only") {
    return "private_reference_only";
  }

  if (permission.status === "granted_anonymized_public_quote") {
    return "anonymized_public_quote_allowed";
  }

  if (permission.status === "denied" || permission.status === "withdrawn") {
    return "denied";
  }

  if (permission.status === "needs_legal_review") {
    return "needs_legal_review";
  }

  return "not_requested";
}

export function recommend_feedback_manual_next_step(input: {
  feedback: V2_3PilotFeedbackRecord;
  permission?: V2_3CaseStudyPermissionRecord;
}): string {
  const quality = classify_feedback_quality(input.feedback);
  const permission_classification = input.permission
    ? classify_case_study_permission(input.permission)
    : "not_requested";

  if (quality === "blocked_or_withdrawn") {
    return "hold_feedback_out_of_learning";
  }

  if (quality === "incomplete") {
    return "request_manual_feedback_completion";
  }

  if (
    input.permission?.status === "needs_legal_review" &&
    !has_text(input.permission.legal_review_note ?? "")
  ) {
    return "add_manual_legal_review_note";
  }

  if (permission_classification === "not_requested") {
    return "request_case_study_permission_manually";
  }

  if (permission_classification === "denied") {
    return "keep_feedback_private_for_learning_review";
  }

  if (permission_classification === "needs_legal_review") {
    return "complete_manual_legal_review";
  }

  return "prepare_manual_learning_review";
}
