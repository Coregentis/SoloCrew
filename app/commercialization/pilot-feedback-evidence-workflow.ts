import {
  V2_3_STABLE_SOURCE_REFS,
} from "./pilot-onboarding-packet-contract.ts";
import type {
  CommercializationReadinessDashboardSummary,
} from "./commercialization-readiness-dashboard-contract.ts";
import type {
  PilotFeedbackEvidenceSourceRefs,
  PilotFeedbackEvidenceStatus,
  PilotFeedbackEvidenceStrengthBand,
  PilotFeedbackEvidenceSummary,
  PilotFeedbackPermissionSignal,
  PilotFeedbackContinuationSignal,
  PilotFeedbackSupportSignal,
  PilotFeedbackUsefulnessSignal,
  V2_4PilotFeedbackEvidenceRecord,
} from "./pilot-feedback-evidence-contract.ts";
import {
  V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS,
  V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES,
  V2_4_FEEDBACK_EVIDENCE_FINAL_STATUSES,
} from "./pilot-feedback-evidence-contract.ts";
import type {
  V2_3CaseStudyPermissionRecord,
  V2_3PilotFeedbackRecord,
} from "../pilots/feedback-capture-contract.ts";
import {
  classify_case_study_permission,
  classify_feedback_quality,
} from "../pilots/feedback-capture-rules.ts";

export type CreatePilotFeedbackEvidenceRecordInput = {
  evidence_id: string;
  created_at: string;
  status?: PilotFeedbackEvidenceStatus;
  title?: string;
  feedback?: V2_3PilotFeedbackRecord;
  permission?: V2_3CaseStudyPermissionRecord;
  dashboard_summary?: CommercializationReadinessDashboardSummary;
  source_refs?: Partial<PilotFeedbackEvidenceSourceRefs>;
  usefulness_signals?: PilotFeedbackUsefulnessSignal[];
  support_signals?: PilotFeedbackSupportSignal[];
  continuation_signals?: PilotFeedbackContinuationSignal[];
  permission_signals?: PilotFeedbackPermissionSignal[];
  evidence_notes?: string[];
  source_blockers?: string[];
};

export type FeedbackEvidenceStrengthBandInput = {
  usefulness_signals: PilotFeedbackUsefulnessSignal[];
  support_signals: PilotFeedbackSupportSignal[];
  continuation_signals: PilotFeedbackContinuationSignal[];
  permission_signals: PilotFeedbackPermissionSignal[];
  source_blockers: string[];
};

function clone_evidence(
  evidence: V2_4PilotFeedbackEvidenceRecord
): V2_4PilotFeedbackEvidenceRecord {
  return JSON.parse(JSON.stringify(evidence)) as V2_4PilotFeedbackEvidenceRecord;
}

function sort_unique<T extends string>(values: T[]): T[] {
  return [...new Set(values)].sort();
}

function has_text(value: string | undefined): boolean {
  return Boolean(value && value.trim().length > 0);
}

function derive_usefulness_signals(
  feedback?: V2_3PilotFeedbackRecord
): PilotFeedbackUsefulnessSignal[] {
  if (!feedback) {
    return ["feedback_absent"];
  }

  const signals: PilotFeedbackUsefulnessSignal[] = [];

  if (has_text(feedback.usefulness_summary)) {
    signals.push("usefulness_summary_present");
  }

  if (has_text(feedback.artifact_quality_summary)) {
    signals.push("artifact_quality_summary_present");
  }

  if (feedback.signals.includes("useful")) {
    signals.push("useful_signal_present");
  }

  if (feedback.signals.includes("time_saving")) {
    signals.push("time_saving_signal_present");
  }

  if (
    !has_text(feedback.usefulness_summary) ||
    feedback.signals.includes("unclear")
  ) {
    signals.push("usefulness_unclear");
  }

  return signals.length > 0 ? signals : ["usefulness_unclear"];
}

function derive_support_signals(
  feedback?: V2_3PilotFeedbackRecord
): PilotFeedbackSupportSignal[] {
  if (!feedback) {
    return ["support_burden_unclear"];
  }

  const signals: PilotFeedbackSupportSignal[] = [];

  if (has_text(feedback.support_burden_summary)) {
    signals.push("support_burden_summary_present");
  }

  if (
    /bounded|low|short|guided/i.test(feedback.support_burden_summary) ||
    feedback.signals.includes("time_saving")
  ) {
    signals.push("bounded_support_signal");
  }

  if (
    !has_text(feedback.support_burden_summary) ||
    feedback.signals.includes("needs_more_guidance")
  ) {
    signals.push("support_burden_unclear");
  }

  if (feedback.status === "blocked" || feedback.signals.includes("too_complex")) {
    signals.push("support_burden_high_or_blocked");
  }

  return signals.length > 0 ? signals : ["support_burden_unclear"];
}

function derive_continuation_signals(
  feedback?: V2_3PilotFeedbackRecord
): PilotFeedbackContinuationSignal[] {
  if (!feedback) {
    return ["continuation_unclear"];
  }

  const signals: PilotFeedbackContinuationSignal[] = [];

  if (
    has_text(feedback.continuation_value_summary) ||
    feedback.signals.includes("continuation_value")
  ) {
    signals.push("continuation_value_present");
  }

  if (feedback.willingness_to_continue) {
    signals.push("willingness_to_continue");
  }

  if (feedback.willingness_to_pay_again) {
    signals.push("willingness_to_pay_again");
  }

  if (!has_text(feedback.continuation_value_summary)) {
    signals.push("continuation_unclear");
  }

  return signals.length > 0 ? signals : ["continuation_unclear"];
}

function derive_permission_signals(
  permission?: V2_3CaseStudyPermissionRecord
): PilotFeedbackPermissionSignal[] {
  if (!permission) {
    return ["permission_absent"];
  }

  const classification = classify_case_study_permission(permission);

  if (classification === "private_reference_only") {
    return ["private_reference_permission"];
  }

  if (classification === "anonymized_public_quote_allowed") {
    return ["anonymized_quote_permission_only"];
  }

  if (classification === "denied") {
    return ["permission_denied"];
  }

  if (classification === "needs_legal_review") {
    return ["needs_legal_review"];
  }

  return ["permission_absent"];
}

function derive_source_refs(input: {
  feedback?: V2_3PilotFeedbackRecord;
  permission?: V2_3CaseStudyPermissionRecord;
  dashboard_summary?: CommercializationReadinessDashboardSummary;
  source_refs?: Partial<PilotFeedbackEvidenceSourceRefs>;
}): PilotFeedbackEvidenceSourceRefs {
  return {
    ...V2_3_STABLE_SOURCE_REFS,
    feedback_id: input.feedback?.feedback_id,
    case_study_permission_id: input.permission?.permission_id,
    dashboard_id: input.dashboard_summary?.dashboard_id,
    dashboard_score_band: input.dashboard_summary?.score_band,
    onboarding_packet_id:
      input.dashboard_summary?.source_refs.onboarding_packet_id,
    intake_id:
      input.feedback?.intake_id ?? input.dashboard_summary?.source_refs.intake_id,
    design_partner_id:
      input.feedback?.design_partner_id ??
      input.dashboard_summary?.source_refs.design_partner_id,
    qualification_classification:
      input.dashboard_summary?.source_refs.qualification_classification,
    manual_payment_status:
      input.dashboard_summary?.source_refs.manual_payment_status,
    payment_record_id:
      input.feedback?.payment_record_id ??
      input.dashboard_summary?.source_refs.payment_record_id,
    next_action_proposal_id:
      input.feedback?.proposal_id ??
      input.dashboard_summary?.source_refs.next_action_proposal_id,
    v2_4_dashboard_ref: input.dashboard_summary?.dashboard_id
      ? `summary:${input.dashboard_summary.dashboard_id}`
      : undefined,
    v2_4_onboarding_packet_ref:
      input.dashboard_summary?.source_refs.v2_4_onboarding_packet_ref,
    ...input.source_refs,
  };
}

export function calculate_feedback_evidence_strength_band(
  input: FeedbackEvidenceStrengthBandInput
): PilotFeedbackEvidenceStrengthBand {
  if (input.source_blockers.length > 0) {
    return "blocked";
  }

  if (
    input.usefulness_signals.includes("feedback_absent") ||
    input.permission_signals.includes("permission_absent")
  ) {
    return "insufficient_evidence";
  }

  if (
    input.permission_signals.includes("needs_legal_review") ||
    input.support_signals.includes("support_burden_unclear")
  ) {
    return "needs_operator_review";
  }

  if (
    input.usefulness_signals.includes("usefulness_unclear") ||
    input.support_signals.includes("support_burden_high_or_blocked")
  ) {
    return "weak_signal";
  }

  if (
    input.usefulness_signals.includes("useful_signal_present") &&
    input.continuation_signals.includes("willingness_to_continue") &&
    input.continuation_signals.includes("willingness_to_pay_again") &&
    input.permission_signals.includes("private_reference_permission")
  ) {
    return "strong_manual_signal";
  }

  if (
    input.usefulness_signals.includes("useful_signal_present") &&
    input.continuation_signals.includes("willingness_to_continue")
  ) {
    return "useful_manual_signal";
  }

  return "weak_signal";
}

function recommended_step_for_strength_band(
  strength_band: PilotFeedbackEvidenceStrengthBand
): string {
  const steps: Record<PilotFeedbackEvidenceStrengthBand, string> = {
    insufficient_evidence: "collect_missing_feedback_or_permission_evidence",
    weak_signal: "request_manual_feedback_clarification",
    useful_manual_signal: "preserve_feedback_for_founder_review",
    strong_manual_signal: "prepare_manual_evidence_review_for_founder",
    needs_operator_review: "resolve_mixed_feedback_or_permission_evidence",
    blocked: "resolve_feedback_evidence_blocker_before_review",
  };

  return steps[strength_band];
}

function is_final_status(status: PilotFeedbackEvidenceStatus): boolean {
  return V2_4_FEEDBACK_EVIDENCE_FINAL_STATUSES.includes(
    status as (typeof V2_4_FEEDBACK_EVIDENCE_FINAL_STATUSES)[number]
  );
}

function transition_evidence(input: {
  evidence: V2_4PilotFeedbackEvidenceRecord;
  next_status: PilotFeedbackEvidenceStatus;
  allowed_from: PilotFeedbackEvidenceStatus[];
  updated_at: string;
  evidence_note?: string;
}): V2_4PilotFeedbackEvidenceRecord {
  const evidence = clone_evidence(input.evidence);

  if (is_final_status(evidence.status)) {
    return evidence;
  }

  if (!input.allowed_from.includes(evidence.status)) {
    return evidence;
  }

  return {
    ...evidence,
    updated_at: input.updated_at,
    status: input.next_status,
    evidence_notes: input.evidence_note
      ? [...evidence.evidence_notes, input.evidence_note].sort()
      : [...evidence.evidence_notes],
    boundary_flags: V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES],
  };
}

export function create_pilot_feedback_evidence_record(
  input: CreatePilotFeedbackEvidenceRecordInput
): V2_4PilotFeedbackEvidenceRecord {
  const usefulness_signals = sort_unique(
    input.usefulness_signals ?? derive_usefulness_signals(input.feedback)
  );
  const support_signals = sort_unique(
    input.support_signals ?? derive_support_signals(input.feedback)
  );
  const continuation_signals = sort_unique(
    input.continuation_signals ?? derive_continuation_signals(input.feedback)
  );
  const permission_signals = sort_unique(
    input.permission_signals ?? derive_permission_signals(input.permission)
  );
  const source_blockers = [...(input.source_blockers ?? [])].sort();
  const strength_band = calculate_feedback_evidence_strength_band({
    usefulness_signals,
    support_signals,
    continuation_signals,
    permission_signals,
    source_blockers,
  });
  const feedback_quality = input.feedback
    ? classify_feedback_quality(input.feedback)
    : "incomplete";

  return {
    evidence_id: input.evidence_id,
    created_at: input.created_at,
    updated_at: input.created_at,
    status: input.status ?? "draft",
    strength_band,
    title: input.title ?? "V2.4 pilot feedback evidence record",
    source_refs: derive_source_refs(input),
    usefulness_signals,
    support_signals,
    continuation_signals,
    permission_signals,
    evidence_notes: sort_unique([
      `feedback_quality:${feedback_quality}`,
      ...(input.evidence_notes ?? []),
    ]),
    source_blockers,
    recommended_manual_step: recommended_step_for_strength_band(strength_band),
    boundary_flags: V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES],
  };
}

export function create_pilot_feedback_evidence_summary(
  evidence: V2_4PilotFeedbackEvidenceRecord
): PilotFeedbackEvidenceSummary {
  return {
    evidence_id: evidence.evidence_id,
    status: evidence.status,
    strength_band: evidence.strength_band,
    title: evidence.title,
    source_refs: { ...evidence.source_refs },
    usefulness_signals: [...evidence.usefulness_signals],
    support_signals: [...evidence.support_signals],
    continuation_signals: [...evidence.continuation_signals],
    permission_signals: [...evidence.permission_signals],
    recommended_manual_step: evidence.recommended_manual_step,
    source_blockers: [...evidence.source_blockers],
    boundary_notices: [...evidence.boundary_notices],
    manual_first: true,
    local_only: true,
    review_only: true,
    non_executing: true,
  };
}

export function mark_pilot_feedback_evidence_ready_for_manual_review(input: {
  evidence: V2_4PilotFeedbackEvidenceRecord;
  reviewed_at: string;
}): V2_4PilotFeedbackEvidenceRecord {
  return transition_evidence({
    evidence: input.evidence,
    next_status: "ready_for_manual_review",
    allowed_from: ["draft"],
    updated_at: input.reviewed_at,
  });
}

export function mark_pilot_feedback_evidence_reviewed_manually(input: {
  evidence: V2_4PilotFeedbackEvidenceRecord;
  reviewed_at: string;
  evidence_note: string;
}): V2_4PilotFeedbackEvidenceRecord {
  return transition_evidence({
    evidence: input.evidence,
    next_status: "reviewed_manually",
    allowed_from: ["ready_for_manual_review"],
    updated_at: input.reviewed_at,
    evidence_note: input.evidence_note,
  });
}

export function block_pilot_feedback_evidence(input: {
  evidence: V2_4PilotFeedbackEvidenceRecord;
  blocked_at: string;
  source_blocker: string;
}): V2_4PilotFeedbackEvidenceRecord {
  const evidence = clone_evidence(input.evidence);

  if (is_final_status(evidence.status)) {
    return evidence;
  }

  const source_blockers = [
    ...evidence.source_blockers,
    input.source_blocker,
  ].sort();

  return {
    ...evidence,
    updated_at: input.blocked_at,
    status: "blocked",
    strength_band: "blocked",
    source_blockers,
    recommended_manual_step: recommended_step_for_strength_band("blocked"),
    boundary_flags: V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES],
  };
}
