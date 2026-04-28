import type {
  DesignPartnerQualificationSummary,
  PilotQualificationClassification,
  V2_3PilotIntakeRecord,
} from "./pilot-intake-contract.ts";
import {
  V2_3_PILOT_BOUNDARY_NOTICES,
} from "./pilot-intake-contract.ts";

const FORBIDDEN_REQUEST_PATTERNS = [
  /provider[\s_-]+dispatch/i,
  /channel[\s_-]+dispatch/i,
  /marketplace/i,
  /autonomous[\s_-]+execution/i,
  /public[\s_-]+beta/i,
  /production[-\s]?ready/i,
  /paid[\s_-]+product[\s_-]+ready/i,
  /saas/i,
  /mplp[\s_-]+certification/i,
  /mplp[\s_-]+endorsement/i,
] as const;

function combined_intake_text(intake: V2_3PilotIntakeRecord): string {
  return [
    intake.primary_use_case,
    intake.applicant_profile.role,
    intake.applicant_profile.organization_or_project,
    intake.applicant_profile.technical_context_summary,
    intake.applicant_profile.project_stage,
    intake.applicant_profile.repo_or_project_ref,
    intake.pain_profile.governance_pain_summary,
    intake.pain_profile.current_ai_workflow_pain,
    intake.pain_profile.release_or_project_risk,
    intake.pain_profile.continuity_need,
    intake.pain_profile.review_packet_need,
    intake.expectation_profile.desired_outcome,
  ].join("\n");
}

function has_text(value: string): boolean {
  return value.trim().length > 0;
}

function has_concrete_project_or_repo(intake: V2_3PilotIntakeRecord): boolean {
  return (
    has_text(intake.applicant_profile.repo_or_project_ref) &&
    has_text(intake.applicant_profile.technical_context_summary) &&
    has_text(intake.pain_profile.governance_pain_summary)
  );
}

function has_review_packet_or_continuation_need(
  intake: V2_3PilotIntakeRecord
): boolean {
  return (
    has_text(intake.pain_profile.review_packet_need) ||
    has_text(intake.pain_profile.continuity_need)
  );
}

function find_forbidden_requests(intake: V2_3PilotIntakeRecord): string[] {
  const text = combined_intake_text(intake);
  return FORBIDDEN_REQUEST_PATTERNS
    .filter((pattern) => pattern.test(text))
    .map((pattern) => `forbidden_request:${pattern.source}`)
    .sort();
}

export function calculate_design_partner_fit_score(
  intake: V2_3PilotIntakeRecord
): number {
  let score = 0;

  if (has_concrete_project_or_repo(intake)) {
    score += 25;
  }

  if (has_review_packet_or_continuation_need(intake)) {
    score += 20;
  }

  if (intake.expectation_profile.accepts_manual_onboarding) {
    score += 15;
  }

  if (intake.expectation_profile.accepts_manual_payment) {
    score += 15;
  }

  if (intake.expectation_profile.willingness_to_use_local_review_only_flow) {
    score += 10;
  }

  if (intake.expectation_profile.understands_not_public_beta) {
    score += 5;
  }

  if (intake.expectation_profile.understands_non_executing_boundary) {
    score += 10;
  }

  const forbidden_requests = find_forbidden_requests(intake);
  return Math.max(0, score - forbidden_requests.length * 35);
}

export function classify_design_partner_fit(
  intake: V2_3PilotIntakeRecord
): PilotQualificationClassification {
  const forbidden_requests = find_forbidden_requests(intake);

  if (forbidden_requests.length > 0) {
    return "disqualified";
  }

  const score = calculate_design_partner_fit_score(intake);

  if (score >= 85) {
    return "strong_fit";
  }

  if (score >= 60) {
    return "fit_with_manual_review";
  }

  return "weak_fit";
}

export function qualify_design_partner_intake(
  intake: V2_3PilotIntakeRecord
): DesignPartnerQualificationSummary {
  const qualification_score = calculate_design_partner_fit_score(intake);
  const classification = classify_design_partner_fit(intake);
  const disqualification_reasons = find_forbidden_requests(intake);
  const qualification_reasons = [
    has_concrete_project_or_repo(intake)
      ? "concrete_project_or_repo_governance_burden"
      : "",
    has_review_packet_or_continuation_need(intake)
      ? "review_packet_or_continuation_need_present"
      : "",
    intake.expectation_profile.accepts_manual_onboarding
      ? "accepts_manual_onboarding"
      : "",
    intake.expectation_profile.accepts_manual_payment
      ? "accepts_manual_payment"
      : "",
    intake.expectation_profile.willingness_to_use_local_review_only_flow
      ? "accepts_local_review_only_flow"
      : "",
    intake.expectation_profile.understands_not_public_beta
      ? "understands_not_public_beta"
      : "",
    intake.expectation_profile.understands_non_executing_boundary
      ? "understands_non_executing_boundary"
      : "",
  ].filter(Boolean).sort();

  const status =
    classification === "strong_fit"
      ? "qualified"
      : classification === "fit_with_manual_review"
        ? "needs_manual_review"
        : classification === "disqualified"
          ? "blocked"
          : "not_qualified";

  const recommended_next_manual_step =
    classification === "strong_fit"
      ? "schedule_manual_design_partner_review"
      : classification === "fit_with_manual_review"
        ? "request_manual_clarification_before_pilot_decision"
        : classification === "weak_fit"
          ? "decline_or_hold_until_project_governance_need_is_clearer"
          : "decline_due_to_forbidden_capability_request";

  return {
    intake_id: intake.intake_id,
    design_partner_id: intake.design_partner_id,
    qualification_score,
    classification,
    status,
    qualification_reasons,
    disqualification_reasons,
    recommended_next_manual_step,
    boundary_notices: [...V2_3_PILOT_BOUNDARY_NOTICES],
    manual_first: true,
    review_only: true,
    non_executing: true,
  };
}
