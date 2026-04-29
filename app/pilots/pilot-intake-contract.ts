export type PilotIntakeId = string;
export type DesignPartnerId = string;

export type PilotIntakeStatus =
  | "draft"
  | "submitted"
  | "qualified"
  | "not_qualified"
  | "needs_manual_review"
  | "blocked";

export type PilotPrimaryUseCase =
  | "repo_governance_review"
  | "release_readiness_review"
  | "architecture_governance_review"
  | "project_continuation_review"
  | "other_manual_review";

export type PilotApplicantProfile = {
  applicant_name: string;
  role: string;
  organization_or_project: string;
  contact_ref: string;
  technical_context_summary: string;
  project_stage: string;
  repo_or_project_ref: string;
};

export type PilotPainProfile = {
  governance_pain_summary: string;
  current_ai_workflow_pain: string;
  release_or_project_risk: string;
  continuity_need: string;
  review_packet_need: string;
};

export type PilotExpectationProfile = {
  desired_outcome: string;
  urgency: "low" | "medium" | "high";
  willingness_to_use_local_review_only_flow: boolean;
  accepts_manual_onboarding: boolean;
  accepts_manual_payment: boolean;
  understands_not_public_beta: boolean;
  understands_non_executing_boundary: boolean;
};

export type PilotBoundaryFlags = {
  manual_first: true;
  design_partner_only: true;
  review_only: true;
  non_executing: true;
  no_payment_processor: true;
  no_checkout: true;
  no_subscription_management: true;
  no_saas_sharing: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_execution: true;
  no_public_beta_claim: true;
  no_paid_product_readiness_claim: true;
  no_mplp_certification: true;
  no_mplp_endorsement: true;
};

export type PilotQualificationClassification =
  | "strong_fit"
  | "fit_with_manual_review"
  | "weak_fit"
  | "disqualified";

export type V2_3PilotIntakeRecord = {
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  created_at: string;
  updated_at: string;
  status: PilotIntakeStatus;
  primary_use_case: PilotPrimaryUseCase;
  applicant_profile: PilotApplicantProfile;
  pain_profile: PilotPainProfile;
  expectation_profile: PilotExpectationProfile;
  qualification_summary: string;
  qualification_score: number;
  qualification_reasons: string[];
  disqualification_reasons: string[];
  recommended_next_manual_step: string;
  workspace_ref?: string;
  review_packet_export_ref?: string;
  related_v2_2_workspace_id?: string;
  related_v2_2_review_packet_export_id?: string;
  boundary_flags: PilotBoundaryFlags;
};

export type DesignPartnerQualificationSummary = {
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  qualification_score: number;
  classification: PilotQualificationClassification;
  status: PilotIntakeStatus;
  qualification_reasons: string[];
  disqualification_reasons: string[];
  recommended_next_manual_step: string;
  boundary_notices: string[];
  manual_first: true;
  review_only: true;
  non_executing: true;
};

export const V2_3_PILOT_BOUNDARY_FLAGS = {
  manual_first: true,
  design_partner_only: true,
  review_only: true,
  non_executing: true,
  no_payment_processor: true,
  no_checkout: true,
  no_subscription_management: true,
  no_saas_sharing: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace_implementation: true,
  no_autonomous_execution: true,
  no_public_beta_claim: true,
  no_paid_product_readiness_claim: true,
  no_mplp_certification: true,
  no_mplp_endorsement: true,
} as const satisfies PilotBoundaryFlags;

export const V2_3_PILOT_BOUNDARY_NOTICES = [
  "V2.3 pilot intake is manual-first and design-partner-only.",
  "V2.3 pilot intake is local, review-only, and non-executing.",
  "V2.3 pilot intake keeps no_payment_processor, no_checkout, no_subscription_management, and no_automated_billing boundaries.",
  "V2.3 pilot intake keeps no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, no_saas_sharing, and no_autonomous_execution boundaries.",
  "V2.3 pilot intake keeps no_paid_product_readiness_claim, no_public_beta_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
] as const;
