import {
  V2_3_STABLE_SOURCE_REFS,
} from "./pilot-onboarding-packet-contract.ts";
import type {
  CaseStudyConversionEvidenceSignal,
  CaseStudyConversionGateDecision,
  CaseStudyConversionGateStatus,
  CaseStudyConversionGateSummary,
  CaseStudyConversionSourceRefs,
  CaseStudyPermissionReadinessBand,
  ManualConversionReadinessBand,
  V2_4CaseStudyConversionGate,
} from "./case-study-conversion-gate-contract.ts";
import {
  V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS,
  V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES,
  V2_4_CASE_STUDY_CONVERSION_FINAL_STATUSES,
} from "./case-study-conversion-gate-contract.ts";
import type {
  PilotFeedbackEvidenceSummary,
  PilotFeedbackEvidenceStrengthBand,
} from "./pilot-feedback-evidence-contract.ts";
import type {
  V2_3CaseStudyPermissionRecord,
} from "../pilots/feedback-capture-contract.ts";
import {
  classify_case_study_permission,
} from "../pilots/feedback-capture-rules.ts";

export type CreateCaseStudyConversionGateInput = {
  gate_id: string;
  created_at: string;
  status?: CaseStudyConversionGateStatus;
  title?: string;
  permission?: V2_3CaseStudyPermissionRecord;
  feedback_evidence_summary?: PilotFeedbackEvidenceSummary;
  source_refs?: Partial<CaseStudyConversionSourceRefs>;
  permission_readiness_band?: CaseStudyPermissionReadinessBand;
  manual_conversion_readiness_band?: ManualConversionReadinessBand;
  evidence_signals?: CaseStudyConversionEvidenceSignal[];
  manual_review_notes?: string[];
  source_blockers?: string[];
};

export type CaseStudyPermissionReadinessBandInput = {
  permission?: V2_3CaseStudyPermissionRecord;
  source_blockers?: string[];
};

export type ManualConversionReadinessBandInput = {
  feedback_evidence_summary?: PilotFeedbackEvidenceSummary;
  feedback_evidence_strength_band?: PilotFeedbackEvidenceStrengthBand;
  permission_readiness_band?: CaseStudyPermissionReadinessBand;
  source_blockers?: string[];
};

export type CaseStudyConversionGateDecisionInput = {
  permission_readiness_band: CaseStudyPermissionReadinessBand;
  manual_conversion_readiness_band: ManualConversionReadinessBand;
  source_blockers: string[];
};

function clone_gate(
  gate: V2_4CaseStudyConversionGate
): V2_4CaseStudyConversionGate {
  return JSON.parse(JSON.stringify(gate)) as V2_4CaseStudyConversionGate;
}

function sort_unique<T extends string>(values: T[]): T[] {
  return [...new Set(values)].sort();
}

function has_source_blockers(source_blockers: string[] | undefined): boolean {
  return Boolean(source_blockers && source_blockers.length > 0);
}

export function calculate_case_study_permission_readiness_band(
  input: CaseStudyPermissionReadinessBandInput
): CaseStudyPermissionReadinessBand {
  if (has_source_blockers(input.source_blockers)) {
    return "blocked";
  }

  if (!input.permission) {
    return "permission_absent";
  }

  const classification = classify_case_study_permission(input.permission);

  if (classification === "private_reference_only") {
    return "private_reference_only";
  }

  if (classification === "anonymized_public_quote_allowed") {
    return "anonymized_quote_candidate";
  }

  if (classification === "needs_legal_review") {
    return "needs_legal_review";
  }

  if (classification === "denied") {
    return "denied";
  }

  return "permission_absent";
}

export function calculate_manual_conversion_readiness_band(
  input: ManualConversionReadinessBandInput
): ManualConversionReadinessBand {
  if (
    has_source_blockers(input.source_blockers) ||
    input.permission_readiness_band === "blocked"
  ) {
    return "blocked";
  }

  const strength_band =
    input.feedback_evidence_strength_band ??
    input.feedback_evidence_summary?.strength_band;

  if (!strength_band || input.permission_readiness_band === "permission_absent") {
    return "insufficient_evidence";
  }

  const bands: Record<PilotFeedbackEvidenceStrengthBand, ManualConversionReadinessBand> = {
    insufficient_evidence: "insufficient_evidence",
    weak_signal: "weak_manual_signal",
    useful_manual_signal: "useful_manual_signal",
    strong_manual_signal: "strong_manual_signal",
    needs_operator_review: "needs_operator_review",
    blocked: "blocked",
  };

  return bands[strength_band];
}

export function decide_case_study_conversion_gate(
  input: CaseStudyConversionGateDecisionInput
): CaseStudyConversionGateDecision {
  if (
    has_source_blockers(input.source_blockers) ||
    input.permission_readiness_band === "blocked" ||
    input.manual_conversion_readiness_band === "blocked"
  ) {
    return "blocked";
  }

  if (input.permission_readiness_band === "denied") {
    return "deny_public_use";
  }

  if (input.permission_readiness_band === "needs_legal_review") {
    return "require_legal_review";
  }

  if (
    input.permission_readiness_band === "permission_absent" ||
    input.manual_conversion_readiness_band === "insufficient_evidence" ||
    input.manual_conversion_readiness_band === "weak_manual_signal" ||
    input.manual_conversion_readiness_band === "needs_operator_review"
  ) {
    return "hold_for_more_evidence";
  }

  if (
    input.manual_conversion_readiness_band === "strong_manual_signal" &&
    (input.permission_readiness_band === "private_reference_only" ||
      input.permission_readiness_band === "anonymized_quote_candidate")
  ) {
    return "prepare_manual_conversion_review";
  }

  if (
    input.permission_readiness_band === "private_reference_only" &&
    input.manual_conversion_readiness_band === "useful_manual_signal"
  ) {
    return "prepare_private_reference_review";
  }

  if (
    input.permission_readiness_band === "anonymized_quote_candidate" &&
    input.manual_conversion_readiness_band === "useful_manual_signal"
  ) {
    return "prepare_anonymized_quote_review";
  }

  return "hold_for_more_evidence";
}

function recommended_step_for_decision(
  decision: CaseStudyConversionGateDecision
): string {
  const steps: Record<CaseStudyConversionGateDecision, string> = {
    hold_for_more_evidence: "collect_more_manual_permission_or_feedback_evidence",
    prepare_private_reference_review:
      "prepare_private_reference_material_for_manual_founder_review",
    prepare_anonymized_quote_review:
      "prepare_anonymized_quote_candidate_for_manual_founder_review",
    prepare_manual_conversion_review:
      "prepare_manual_conversion_review_without_automatic_conversion",
    require_legal_review: "complete_manual_legal_review_before_any_public_use",
    deny_public_use: "keep_feedback_private_and_do_not_prepare_public_use",
    blocked: "resolve_case_study_conversion_gate_blocker_before_review",
  };

  return steps[decision];
}

function derive_source_refs(input: {
  permission?: V2_3CaseStudyPermissionRecord;
  feedback_evidence_summary?: PilotFeedbackEvidenceSummary;
  source_refs?: Partial<CaseStudyConversionSourceRefs>;
}): CaseStudyConversionSourceRefs {
  const evidence_refs = input.feedback_evidence_summary?.source_refs;

  const source_refs = {
    ...V2_3_STABLE_SOURCE_REFS,
    feedback_evidence_id: input.feedback_evidence_summary?.evidence_id,
    feedback_evidence_strength_band:
      input.feedback_evidence_summary?.strength_band,
    dashboard_id: evidence_refs?.dashboard_id,
    dashboard_score_band: evidence_refs?.dashboard_score_band,
    onboarding_packet_id: evidence_refs?.onboarding_packet_id,
    feedback_id:
      input.permission?.feedback_id ?? evidence_refs?.feedback_id,
    case_study_permission_id:
      input.permission?.permission_id ?? evidence_refs?.case_study_permission_id,
    intake_id: input.permission?.intake_id ?? evidence_refs?.intake_id,
    design_partner_id:
      input.permission?.design_partner_id ?? evidence_refs?.design_partner_id,
    qualification_classification: evidence_refs?.qualification_classification,
    manual_payment_status: evidence_refs?.manual_payment_status,
    payment_record_id: evidence_refs?.payment_record_id,
    next_action_proposal_id: evidence_refs?.next_action_proposal_id,
    v2_4_feedback_evidence_ref: input.feedback_evidence_summary?.evidence_id
      ? `summary:${input.feedback_evidence_summary.evidence_id}`
      : undefined,
    evidence_record_ref: input.feedback_evidence_summary?.evidence_id
      ? `summary:${input.feedback_evidence_summary.evidence_id}`
      : undefined,
    v2_4_dashboard_ref: evidence_refs?.v2_4_dashboard_ref,
    readiness_view_ref:
      evidence_refs?.readiness_view_ref ?? evidence_refs?.v2_4_dashboard_ref,
    v2_4_onboarding_packet_ref: evidence_refs?.v2_4_onboarding_packet_ref,
    onboarding_packet_ref:
      evidence_refs?.onboarding_packet_ref ??
      evidence_refs?.v2_4_onboarding_packet_ref,
    ...input.source_refs,
  };

  return {
    ...source_refs,
    evidence_record_ref:
      source_refs.v2_4_feedback_evidence_ref ?? source_refs.evidence_record_ref,
    readiness_view_ref:
      source_refs.v2_4_dashboard_ref ?? source_refs.readiness_view_ref,
    onboarding_packet_ref:
      source_refs.v2_4_onboarding_packet_ref ??
      source_refs.onboarding_packet_ref,
  };
}

function derive_evidence_signals(input: {
  permission_readiness_band: CaseStudyPermissionReadinessBand;
  manual_conversion_readiness_band: ManualConversionReadinessBand;
  feedback_evidence_summary?: PilotFeedbackEvidenceSummary;
  source_refs: CaseStudyConversionSourceRefs;
  source_blockers: string[];
}): CaseStudyConversionEvidenceSignal[] {
  const signals: CaseStudyConversionEvidenceSignal[] = [];

  if (input.permission_readiness_band === "permission_absent") {
    signals.push("permission_absent");
  } else if (input.permission_readiness_band === "private_reference_only") {
    signals.push("permission_present", "private_reference_permission");
  } else if (input.permission_readiness_band === "anonymized_quote_candidate") {
    signals.push("permission_present", "anonymized_quote_permission");
  } else if (input.permission_readiness_band === "needs_legal_review") {
    signals.push("permission_present", "permission_needs_legal_review");
  } else if (input.permission_readiness_band === "denied") {
    signals.push("permission_present", "permission_denied");
  }

  if (input.feedback_evidence_summary) {
    signals.push("feedback_evidence_present");
  }

  if (input.manual_conversion_readiness_band === "strong_manual_signal") {
    signals.push("strong_feedback_evidence");
  } else if (input.manual_conversion_readiness_band === "useful_manual_signal") {
    signals.push("useful_feedback_evidence");
  } else if (input.manual_conversion_readiness_band === "weak_manual_signal") {
    signals.push("weak_feedback_evidence");
  } else if (
    input.manual_conversion_readiness_band === "insufficient_evidence"
  ) {
    signals.push("feedback_evidence_insufficient");
  }

  if (input.source_refs.dashboard_id) {
    signals.push("dashboard_evidence_present");
  }

  if (input.source_refs.onboarding_packet_id) {
    signals.push("onboarding_packet_present");
  }

  if (input.source_refs.manual_payment_status === "payment_confirmed") {
    signals.push("manual_payment_confirmed");
  }

  if (input.source_blockers.length > 0) {
    signals.push("source_blocker_present");
  }

  return sort_unique(signals);
}

function is_final_status(status: CaseStudyConversionGateStatus): boolean {
  return V2_4_CASE_STUDY_CONVERSION_FINAL_STATUSES.includes(
    status as (typeof V2_4_CASE_STUDY_CONVERSION_FINAL_STATUSES)[number]
  );
}

function transition_gate(input: {
  gate: V2_4CaseStudyConversionGate;
  next_status: CaseStudyConversionGateStatus;
  allowed_from: CaseStudyConversionGateStatus[];
  updated_at: string;
  manual_review_note?: string;
}): V2_4CaseStudyConversionGate {
  const gate = clone_gate(input.gate);

  if (is_final_status(gate.status)) {
    return gate;
  }

  if (!input.allowed_from.includes(gate.status)) {
    return gate;
  }

  return {
    ...gate,
    updated_at: input.updated_at,
    status: input.next_status,
    manual_review_notes: input.manual_review_note
      ? [...gate.manual_review_notes, input.manual_review_note].sort()
      : [...gate.manual_review_notes],
    boundary_flags: V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES],
  };
}

export function create_case_study_conversion_gate(
  input: CreateCaseStudyConversionGateInput
): V2_4CaseStudyConversionGate {
  const source_blockers = [...(input.source_blockers ?? [])].sort();
  const permission_readiness_band =
    input.permission_readiness_band ??
    calculate_case_study_permission_readiness_band({
      permission: input.permission,
      source_blockers,
    });
  const manual_conversion_readiness_band =
    input.manual_conversion_readiness_band ??
    calculate_manual_conversion_readiness_band({
      feedback_evidence_summary: input.feedback_evidence_summary,
      permission_readiness_band,
      source_blockers,
    });
  const decision = decide_case_study_conversion_gate({
    permission_readiness_band,
    manual_conversion_readiness_band,
    source_blockers,
  });
  const source_refs = derive_source_refs(input);
  const evidence_signals = sort_unique(
    input.evidence_signals ??
      derive_evidence_signals({
        permission_readiness_band,
        manual_conversion_readiness_band,
        feedback_evidence_summary: input.feedback_evidence_summary,
        source_refs,
        source_blockers,
      })
  );

  return {
    gate_id: input.gate_id,
    created_at: input.created_at,
    updated_at: input.created_at,
    status: input.status ?? "draft",
    permission_readiness_band,
    manual_conversion_readiness_band,
    decision,
    title: input.title ?? "V2.4 case-study conversion gate",
    source_refs,
    evidence_signals,
    manual_review_notes: [...(input.manual_review_notes ?? [])].sort(),
    source_blockers,
    recommended_manual_step: recommended_step_for_decision(decision),
    boundary_flags: V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES],
  };
}

export function create_case_study_conversion_gate_summary(
  gate: V2_4CaseStudyConversionGate
): CaseStudyConversionGateSummary {
  return {
    gate_id: gate.gate_id,
    status: gate.status,
    permission_readiness_band: gate.permission_readiness_band,
    manual_conversion_readiness_band: gate.manual_conversion_readiness_band,
    decision: gate.decision,
    title: gate.title,
    source_refs: { ...gate.source_refs },
    evidence_signals: [...gate.evidence_signals],
    recommended_manual_step: gate.recommended_manual_step,
    source_blockers: [...gate.source_blockers],
    boundary_notices: [...gate.boundary_notices],
    manual_first: true,
    local_only: true,
    review_only: true,
    non_executing: true,
  };
}

export function mark_case_study_conversion_gate_ready_for_manual_review(input: {
  gate: V2_4CaseStudyConversionGate;
  reviewed_at: string;
}): V2_4CaseStudyConversionGate {
  return transition_gate({
    gate: input.gate,
    next_status: "ready_for_manual_review",
    allowed_from: ["draft"],
    updated_at: input.reviewed_at,
  });
}

export function mark_case_study_conversion_gate_reviewed_manually(input: {
  gate: V2_4CaseStudyConversionGate;
  reviewed_at: string;
  manual_review_note: string;
}): V2_4CaseStudyConversionGate {
  return transition_gate({
    gate: input.gate,
    next_status: "reviewed_manually",
    allowed_from: ["ready_for_manual_review"],
    updated_at: input.reviewed_at,
    manual_review_note: input.manual_review_note,
  });
}

export function block_case_study_conversion_gate(input: {
  gate: V2_4CaseStudyConversionGate;
  blocked_at: string;
  source_blocker: string;
}): V2_4CaseStudyConversionGate {
  const gate = clone_gate(input.gate);

  if (is_final_status(gate.status)) {
    return gate;
  }

  const source_blockers = [
    ...gate.source_blockers,
    input.source_blocker,
  ].sort();
  const decision = decide_case_study_conversion_gate({
    permission_readiness_band: "blocked",
    manual_conversion_readiness_band: "blocked",
    source_blockers,
  });

  return {
    ...gate,
    updated_at: input.blocked_at,
    status: "blocked",
    permission_readiness_band: "blocked",
    manual_conversion_readiness_band: "blocked",
    decision,
    evidence_signals: sort_unique([
      ...gate.evidence_signals,
      "source_blocker_present",
    ]),
    source_blockers,
    recommended_manual_step: recommended_step_for_decision(decision),
    boundary_flags: V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES],
  };
}
