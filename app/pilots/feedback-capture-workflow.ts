import type {
  CaseStudyPermissionSummary,
  PilotFeedbackRating,
  PilotFeedbackSignal,
  PilotFeedbackSummary,
  V2_3CaseStudyPermissionRecord,
  V2_3PilotFeedbackRecord,
} from "./feedback-capture-contract.ts";
import {
  V2_3_FEEDBACK_BOUNDARY_FLAGS,
  V2_3_FEEDBACK_BOUNDARY_NOTICES,
} from "./feedback-capture-contract.ts";
import {
  calculate_feedback_completeness_score,
  classify_case_study_permission,
  classify_feedback_quality,
  recommend_feedback_manual_next_step,
  summarize_feedback_signals,
} from "./feedback-capture-rules.ts";
import type {
  V2_3ManualPaymentRecord,
} from "./manual-payment-status-contract.ts";
import type {
  V2_3NextActionProposal,
} from "./next-action-proposal-contract.ts";
import type {
  V2_3PilotIntakeRecord,
} from "./pilot-intake-contract.ts";

const DEFAULT_CREATED_AT = "2026-04-28T00:00:00.000Z";

function clone_feedback(
  feedback: V2_3PilotFeedbackRecord
): V2_3PilotFeedbackRecord {
  return JSON.parse(JSON.stringify(feedback)) as V2_3PilotFeedbackRecord;
}

function clone_permission(
  permission: V2_3CaseStudyPermissionRecord
): V2_3CaseStudyPermissionRecord {
  return JSON.parse(JSON.stringify(permission)) as V2_3CaseStudyPermissionRecord;
}

export type CreatePilotFeedbackRecordInput = {
  feedback_id: string;
  intake: V2_3PilotIntakeRecord;
  payment_record?: V2_3ManualPaymentRecord;
  proposal?: V2_3NextActionProposal;
  workspace_id?: string;
  review_packet_export_id?: string;
  dashboard_page_id?: string;
  created_at?: string;
  rating: PilotFeedbackRating;
  signals: PilotFeedbackSignal[];
  usefulness_summary: string;
  artifact_quality_summary: string;
  continuation_value_summary: string;
  confusion_or_risk_summary: string;
  support_burden_summary: string;
  willingness_to_continue: boolean;
  willingness_to_pay_again: boolean;
  operator_notes?: string;
};

export function create_pilot_feedback_record(
  input: CreatePilotFeedbackRecordInput
): V2_3PilotFeedbackRecord {
  const created_at = input.created_at ?? DEFAULT_CREATED_AT;

  return {
    feedback_id: input.feedback_id,
    intake_id: input.intake.intake_id,
    design_partner_id: input.intake.design_partner_id,
    payment_record_id: input.payment_record?.payment_record_id,
    proposal_id: input.proposal?.proposal_id,
    workspace_id: input.workspace_id ?? input.proposal?.source_refs.workspace_id,
    review_packet_export_id:
      input.review_packet_export_id ??
      input.proposal?.source_refs.review_packet_export_id,
    dashboard_page_id:
      input.dashboard_page_id ?? input.proposal?.source_refs.dashboard_page_id,
    created_at,
    updated_at: created_at,
    status: "draft",
    rating: input.rating,
    signals: summarize_feedback_signals(input.signals),
    usefulness_summary: input.usefulness_summary,
    artifact_quality_summary: input.artifact_quality_summary,
    continuation_value_summary: input.continuation_value_summary,
    confusion_or_risk_summary: input.confusion_or_risk_summary,
    support_burden_summary: input.support_burden_summary,
    willingness_to_continue: input.willingness_to_continue,
    willingness_to_pay_again: input.willingness_to_pay_again,
    operator_notes: input.operator_notes ?? "",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
    boundary_notices: [...V2_3_FEEDBACK_BOUNDARY_NOTICES],
  };
}

export function submit_pilot_feedback_record(input: {
  feedback: V2_3PilotFeedbackRecord;
  submitted_at?: string;
}): V2_3PilotFeedbackRecord {
  const feedback = clone_feedback(input.feedback);

  return {
    ...feedback,
    status: "submitted",
    updated_at: input.submitted_at ?? feedback.updated_at,
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function accept_feedback_for_learning(input: {
  feedback: V2_3PilotFeedbackRecord;
  accepted_at?: string;
}): V2_3PilotFeedbackRecord {
  const feedback = clone_feedback(input.feedback);
  const quality = classify_feedback_quality(feedback);

  if (quality === "blocked_or_withdrawn" || quality === "incomplete") {
    return {
      ...feedback,
      status: quality === "incomplete" ? "incomplete" : feedback.status,
      boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
    };
  }

  return {
    ...feedback,
    status: "accepted_for_learning",
    updated_at: input.accepted_at ?? feedback.updated_at,
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function mark_feedback_incomplete(input: {
  feedback: V2_3PilotFeedbackRecord;
  marked_at?: string;
}): V2_3PilotFeedbackRecord {
  const feedback = clone_feedback(input.feedback);

  return {
    ...feedback,
    status: "incomplete",
    updated_at: input.marked_at ?? feedback.updated_at,
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function withdraw_pilot_feedback(input: {
  feedback: V2_3PilotFeedbackRecord;
  withdrawn_at?: string;
}): V2_3PilotFeedbackRecord {
  const feedback = clone_feedback(input.feedback);

  return {
    ...feedback,
    status: "withdrawn",
    updated_at: input.withdrawn_at ?? feedback.updated_at,
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function block_pilot_feedback(input: {
  feedback: V2_3PilotFeedbackRecord;
  blocked_at?: string;
}): V2_3PilotFeedbackRecord {
  const feedback = clone_feedback(input.feedback);

  return {
    ...feedback,
    status: "blocked",
    updated_at: input.blocked_at ?? feedback.updated_at,
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function create_case_study_permission_record(input: {
  permission_id: string;
  feedback: V2_3PilotFeedbackRecord;
  created_at?: string;
}): V2_3CaseStudyPermissionRecord {
  const created_at = input.created_at ?? DEFAULT_CREATED_AT;

  return {
    permission_id: input.permission_id,
    feedback_id: input.feedback.feedback_id,
    intake_id: input.feedback.intake_id,
    design_partner_id: input.feedback.design_partner_id,
    created_at,
    updated_at: created_at,
    status: "not_requested",
    permission_scope: "not_requested",
    anonymization_required: true,
    allowed_quote_refs: [],
    manual_next_step: "request_case_study_permission_manually",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
    boundary_notices: [...V2_3_FEEDBACK_BOUNDARY_NOTICES],
  };
}

export function request_case_study_permission_manually(input: {
  permission: V2_3CaseStudyPermissionRecord;
  requested_at?: string;
}): V2_3CaseStudyPermissionRecord {
  const permission = clone_permission(input.permission);

  return {
    ...permission,
    status: "requested_manually",
    permission_scope: "manual_request_pending",
    updated_at: input.requested_at ?? permission.updated_at,
    manual_next_step: "wait_for_manual_permission_reply",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function grant_private_reference_permission(input: {
  permission: V2_3CaseStudyPermissionRecord;
  granted_at?: string;
  allowed_quote_refs?: string[];
}): V2_3CaseStudyPermissionRecord {
  const permission = clone_permission(input.permission);

  return {
    ...permission,
    status: "granted_private_reference_only",
    permission_scope: "private_reference_only",
    anonymization_required: true,
    allowed_quote_refs: [...(input.allowed_quote_refs ?? [])].sort(),
    updated_at: input.granted_at ?? permission.updated_at,
    manual_next_step: "keep_case_study_reference_private",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function grant_anonymized_public_quote_permission(input: {
  permission: V2_3CaseStudyPermissionRecord;
  granted_at?: string;
  allowed_quote_refs: string[];
}): V2_3CaseStudyPermissionRecord {
  const permission = clone_permission(input.permission);

  return {
    ...permission,
    status: "granted_anonymized_public_quote",
    permission_scope: "anonymized_quote_permission_only",
    anonymization_required: true,
    allowed_quote_refs: [...input.allowed_quote_refs].sort(),
    updated_at: input.granted_at ?? permission.updated_at,
    manual_next_step: "store_permission_for_future_manual_review",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function deny_case_study_permission(input: {
  permission: V2_3CaseStudyPermissionRecord;
  denied_at?: string;
  denied_reason?: string;
}): V2_3CaseStudyPermissionRecord {
  const permission = clone_permission(input.permission);

  return {
    ...permission,
    status: "denied",
    permission_scope: "denied",
    allowed_quote_refs: [],
    denied_reason: input.denied_reason ?? "permission_denied_manually",
    updated_at: input.denied_at ?? permission.updated_at,
    manual_next_step: "do_not_use_case_study_material",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function mark_case_study_permission_needs_legal_review(input: {
  permission: V2_3CaseStudyPermissionRecord;
  marked_at?: string;
  legal_review_note?: string;
}): V2_3CaseStudyPermissionRecord {
  const permission = clone_permission(input.permission);

  return {
    ...permission,
    status: "needs_legal_review",
    permission_scope: "manual_legal_review_required",
    legal_review_note: input.legal_review_note,
    updated_at: input.marked_at ?? permission.updated_at,
    manual_next_step: "complete_manual_legal_review",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function withdraw_case_study_permission(input: {
  permission: V2_3CaseStudyPermissionRecord;
  withdrawn_at?: string;
}): V2_3CaseStudyPermissionRecord {
  const permission = clone_permission(input.permission);

  return {
    ...permission,
    status: "withdrawn",
    permission_scope: "withdrawn",
    allowed_quote_refs: [],
    updated_at: input.withdrawn_at ?? permission.updated_at,
    manual_next_step: "remove_case_study_material_from_manual_review",
    boundary_flags: V2_3_FEEDBACK_BOUNDARY_FLAGS,
  };
}

export function create_feedback_summary(input: {
  feedback: V2_3PilotFeedbackRecord;
  permission?: V2_3CaseStudyPermissionRecord;
}): PilotFeedbackSummary & {
  case_study_permission?: CaseStudyPermissionSummary;
} {
  const feedback_summary: PilotFeedbackSummary = {
    feedback_id: input.feedback.feedback_id,
    intake_id: input.feedback.intake_id,
    design_partner_id: input.feedback.design_partner_id,
    status: input.feedback.status,
    rating: input.feedback.rating,
    quality_classification: classify_feedback_quality(input.feedback),
    completeness_score: calculate_feedback_completeness_score(input.feedback),
    signal_summary: summarize_feedback_signals(input.feedback.signals),
    manual_next_step: recommend_feedback_manual_next_step(input),
    boundary_notices: [...input.feedback.boundary_notices],
    local_only: true,
    review_only: true,
    non_executing: true,
  };

  if (!input.permission) {
    return feedback_summary;
  }

  return {
    ...feedback_summary,
    case_study_permission: {
      permission_id: input.permission.permission_id,
      feedback_id: input.permission.feedback_id,
      intake_id: input.permission.intake_id,
      design_partner_id: input.permission.design_partner_id,
      status: input.permission.status,
      classification: classify_case_study_permission(input.permission),
      manual_next_step: input.permission.manual_next_step,
      allowed_quote_refs: [...input.permission.allowed_quote_refs],
      boundary_notices: [...input.permission.boundary_notices],
      local_only: true,
      review_only: true,
      non_executing: true,
    },
  };
}
