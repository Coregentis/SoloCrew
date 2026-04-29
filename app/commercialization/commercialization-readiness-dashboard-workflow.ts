import {
  V2_3_STABLE_SOURCE_REFS,
  type PilotOnboardingPacketSummary,
} from "./pilot-onboarding-packet-contract.ts";
import type {
  CommercializationBoundaryPosture,
  CommercializationCaseStudySignal,
  CommercializationEvidenceSignal,
  CommercializationFeedbackSignal,
  CommercializationReadinessDashboardStatus,
  CommercializationReadinessDashboardSummary,
  CommercializationReadinessScoreBand,
  CommercializationReadinessSourceRefs,
  CommercializationSupportBurdenSignal,
  V2_4CommercializationReadinessDashboard,
} from "./commercialization-readiness-dashboard-contract.ts";
import {
  V2_4_DASHBOARD_BOUNDARY_FLAGS,
  V2_4_DASHBOARD_BOUNDARY_NOTICES,
  V2_4_DASHBOARD_FINAL_STATUSES,
} from "./commercialization-readiness-dashboard-contract.ts";

export type CreateCommercializationReadinessDashboardInput = {
  dashboard_id: string;
  created_at: string;
  status?: CommercializationReadinessDashboardStatus;
  title?: string;
  onboarding_packet_summary?: PilotOnboardingPacketSummary;
  source_refs?: Partial<CommercializationReadinessSourceRefs>;
  evidence_signals?: CommercializationEvidenceSignal[];
  support_burden_signals?: CommercializationSupportBurdenSignal[];
  feedback_signals?: CommercializationFeedbackSignal[];
  case_study_signals?: CommercializationCaseStudySignal[];
  boundary_posture?: CommercializationBoundaryPosture;
  manual_review_notes?: string[];
};

export type ReadinessScoreBandInput = {
  source_refs: Partial<CommercializationReadinessSourceRefs>;
  evidence_signals: CommercializationEvidenceSignal[];
  support_burden_signals: CommercializationSupportBurdenSignal[];
  feedback_signals: CommercializationFeedbackSignal[];
  case_study_signals: CommercializationCaseStudySignal[];
  boundary_posture: CommercializationBoundaryPosture;
};

function clone_dashboard(
  dashboard: V2_4CommercializationReadinessDashboard
): V2_4CommercializationReadinessDashboard {
  return JSON.parse(
    JSON.stringify(dashboard)
  ) as V2_4CommercializationReadinessDashboard;
}

function sort_unique<T extends string>(values: T[]): T[] {
  return [...new Set(values)].sort();
}

function create_default_boundary_posture(): CommercializationBoundaryPosture {
  return {
    posture_id: "v2-4-commercialization-dashboard-boundary-posture",
    boundary_clear: true,
    source_blockers: [],
    notes: [
      "dashboard_is_local_review_only",
      "dashboard_uses_source_refs_and_manual_signals_only",
    ],
  };
}

function has_source_refs(
  source_refs: Partial<CommercializationReadinessSourceRefs>
): boolean {
  return Boolean(
    source_refs.onboarding_packet_id &&
      source_refs.intake_id &&
      source_refs.design_partner_id
  );
}

function has_promising_manual_pilot(input: ReadinessScoreBandInput): boolean {
  return (
    input.source_refs.onboarding_packet_status === "acknowledged_manually" &&
    input.source_refs.manual_payment_status === "payment_confirmed" &&
    input.evidence_signals.includes("onboarding_acknowledged") &&
    input.evidence_signals.includes("manual_payment_confirmed") &&
    input.feedback_signals.includes("feedback_accepted_for_learning") &&
    input.feedback_signals.includes("willingness_to_continue") &&
    input.case_study_signals.includes("private_reference_permission")
  );
}

function has_ambiguous_manual_evidence(
  input: ReadinessScoreBandInput
): boolean {
  return (
    input.source_refs.onboarding_packet_status === "ready_for_manual_review" ||
    input.source_refs.manual_payment_status === "payment_blocked" ||
    input.support_burden_signals.includes("needs_operator_review") ||
    input.support_burden_signals.includes("support_burden_unclear") ||
    input.feedback_signals.includes("feedback_incomplete") ||
    input.case_study_signals.includes("needs_legal_review")
  );
}

export function calculate_readiness_score_band(
  input: ReadinessScoreBandInput
): CommercializationReadinessScoreBand {
  if (
    !input.boundary_posture.boundary_clear ||
    input.boundary_posture.source_blockers.length > 0
  ) {
    return "blocked";
  }

  if (
    !has_source_refs(input.source_refs) ||
    input.feedback_signals.includes("feedback_absent") ||
    input.case_study_signals.includes("case_study_absent")
  ) {
    return "insufficient_evidence";
  }

  if (has_promising_manual_pilot(input)) {
    return "promising_manual_pilot";
  }

  if (has_ambiguous_manual_evidence(input)) {
    return "needs_operator_review";
  }

  return "early_signal";
}

function recommended_step_for_score_band(
  score_band: CommercializationReadinessScoreBand
): string {
  const steps: Record<CommercializationReadinessScoreBand, string> = {
    insufficient_evidence: "collect_missing_manual_pilot_evidence",
    early_signal: "continue_manual_pilot_evidence_collection",
    promising_manual_pilot: "prepare_founder_manual_commercialization_review",
    needs_operator_review: "resolve_ambiguous_manual_evidence",
    blocked: "resolve_boundary_or_source_blocker_before_review",
  };

  return steps[score_band];
}

function is_final_status(
  status: CommercializationReadinessDashboardStatus
): boolean {
  return V2_4_DASHBOARD_FINAL_STATUSES.includes(
    status as (typeof V2_4_DASHBOARD_FINAL_STATUSES)[number]
  );
}

function transition_dashboard(input: {
  dashboard: V2_4CommercializationReadinessDashboard;
  next_status: CommercializationReadinessDashboardStatus;
  allowed_from: CommercializationReadinessDashboardStatus[];
  updated_at: string;
  manual_review_note?: string;
}): V2_4CommercializationReadinessDashboard {
  const dashboard = clone_dashboard(input.dashboard);

  if (is_final_status(dashboard.status)) {
    return dashboard;
  }

  if (!input.allowed_from.includes(dashboard.status)) {
    return dashboard;
  }

  return {
    ...dashboard,
    updated_at: input.updated_at,
    status: input.next_status,
    manual_review_notes: input.manual_review_note
      ? [...dashboard.manual_review_notes, input.manual_review_note].sort()
      : [...dashboard.manual_review_notes],
    boundary_flags: V2_4_DASHBOARD_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_DASHBOARD_BOUNDARY_NOTICES],
  };
}

export function create_commercialization_readiness_dashboard(
  input: CreateCommercializationReadinessDashboardInput
): V2_4CommercializationReadinessDashboard {
  const boundary_posture =
    input.boundary_posture ?? create_default_boundary_posture();
  const source_refs = {
    ...V2_3_STABLE_SOURCE_REFS,
    onboarding_packet_id: input.onboarding_packet_summary?.packet_id,
    onboarding_packet_status: input.onboarding_packet_summary?.status,
    onboarding_packet_summary_ref: input.onboarding_packet_summary?.packet_id
      ? `summary:${input.onboarding_packet_summary.packet_id}`
      : undefined,
    onboarding_packet_ref: input.onboarding_packet_summary?.packet_id
      ? `summary:${input.onboarding_packet_summary.packet_id}`
      : undefined,
    ...input.onboarding_packet_summary?.source_refs,
    ...input.source_refs,
  };
  source_refs.onboarding_packet_ref =
    source_refs.v2_4_onboarding_packet_ref ?? source_refs.onboarding_packet_ref;
  const evidence_signals = sort_unique(input.evidence_signals ?? []);
  const support_burden_signals = sort_unique(
    input.support_burden_signals ?? []
  );
  const feedback_signals = sort_unique(
    input.feedback_signals ?? ["feedback_absent"]
  );
  const case_study_signals = sort_unique(
    input.case_study_signals ?? ["case_study_absent"]
  );
  const score_band = calculate_readiness_score_band({
    source_refs,
    evidence_signals,
    support_burden_signals,
    feedback_signals,
    case_study_signals,
    boundary_posture,
  });

  return {
    dashboard_id: input.dashboard_id,
    created_at: input.created_at,
    updated_at: input.created_at,
    status: input.status ?? "draft",
    score_band,
    title: input.title ?? "V2.4 commercialization readiness dashboard",
    source_refs,
    evidence_signals,
    support_burden_signals,
    feedback_signals,
    case_study_signals,
    boundary_posture: {
      ...boundary_posture,
      source_blockers: [...boundary_posture.source_blockers].sort(),
      notes: [...boundary_posture.notes].sort(),
    },
    manual_review_notes: [...(input.manual_review_notes ?? [])].sort(),
    recommended_manual_step: recommended_step_for_score_band(score_band),
    boundary_flags: V2_4_DASHBOARD_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_DASHBOARD_BOUNDARY_NOTICES],
  };
}

export function create_commercialization_readiness_dashboard_summary(
  dashboard: V2_4CommercializationReadinessDashboard
): CommercializationReadinessDashboardSummary {
  return {
    dashboard_id: dashboard.dashboard_id,
    status: dashboard.status,
    score_band: dashboard.score_band,
    title: dashboard.title,
    source_refs: { ...dashboard.source_refs },
    evidence_signals: [...dashboard.evidence_signals],
    support_burden_signals: [...dashboard.support_burden_signals],
    feedback_signals: [...dashboard.feedback_signals],
    case_study_signals: [...dashboard.case_study_signals],
    recommended_manual_step: dashboard.recommended_manual_step,
    blocking_reasons: [...dashboard.boundary_posture.source_blockers],
    boundary_notices: [...dashboard.boundary_notices],
    manual_first: true,
    local_only: true,
    review_only: true,
    non_executing: true,
  };
}

export function mark_commercialization_dashboard_ready_for_manual_review(input: {
  dashboard: V2_4CommercializationReadinessDashboard;
  reviewed_at: string;
}): V2_4CommercializationReadinessDashboard {
  return transition_dashboard({
    dashboard: input.dashboard,
    next_status: "ready_for_manual_review",
    allowed_from: ["draft"],
    updated_at: input.reviewed_at,
  });
}

export function mark_commercialization_dashboard_reviewed_manually(input: {
  dashboard: V2_4CommercializationReadinessDashboard;
  reviewed_at: string;
  manual_review_note: string;
}): V2_4CommercializationReadinessDashboard {
  return transition_dashboard({
    dashboard: input.dashboard,
    next_status: "reviewed_manually",
    allowed_from: ["ready_for_manual_review"],
    updated_at: input.reviewed_at,
    manual_review_note: input.manual_review_note,
  });
}

export function block_commercialization_dashboard(input: {
  dashboard: V2_4CommercializationReadinessDashboard;
  blocked_at: string;
  source_blocker: string;
}): V2_4CommercializationReadinessDashboard {
  const dashboard = clone_dashboard(input.dashboard);

  if (is_final_status(dashboard.status)) {
    return dashboard;
  }

  const source_blockers = [
    ...dashboard.boundary_posture.source_blockers,
    input.source_blocker,
  ].sort();

  return {
    ...dashboard,
    updated_at: input.blocked_at,
    status: "blocked",
    score_band: "blocked",
    boundary_posture: {
      ...dashboard.boundary_posture,
      boundary_clear: false,
      source_blockers,
      notes: [...dashboard.boundary_posture.notes].sort(),
    },
    recommended_manual_step: recommended_step_for_score_band("blocked"),
    boundary_flags: V2_4_DASHBOARD_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_DASHBOARD_BOUNDARY_NOTICES],
  };
}
