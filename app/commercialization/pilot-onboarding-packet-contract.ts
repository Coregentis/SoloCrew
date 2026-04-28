import type {
  DesignPartnerId,
  PilotIntakeId,
  PilotQualificationClassification,
} from "../pilots/pilot-intake-contract.ts";
import type {
  ManualPaymentRecordId,
  ManualPaymentStatus,
} from "../pilots/manual-payment-status-contract.ts";
import type {
  NextActionProposalId,
} from "../pilots/next-action-proposal-contract.ts";
import type {
  PilotFeedbackId,
  CaseStudyPermissionId,
} from "../pilots/feedback-capture-contract.ts";

export type PilotOnboardingPacketId = string;
export type PilotOnboardingSectionId = string;

export type PilotOnboardingPacketStatus =
  | "draft"
  | "ready_for_manual_review"
  | "acknowledged_manually"
  | "cancelled"
  | "blocked";

export type PilotOnboardingAudience = "design_partner" | "operator";

export type PilotOnboardingExpectationProfile = {
  pilot_goal: string;
  desired_business_learning: string;
  expected_operator_support: string;
  expected_design_partner_action: string;
  acknowledged_manual_first: boolean;
  acknowledged_bounded_pilot_only: boolean;
  acknowledged_local_review_only: boolean;
  acknowledged_non_executing: boolean;
  acknowledged_no_public_beta: boolean;
  acknowledged_no_readiness_claims: boolean;
};

export type PilotOnboardingRequiredInput = {
  input_id: PilotOnboardingSectionId;
  label: string;
  description: string;
  required: boolean;
  source_ref_hint: string;
};

export type PilotOnboardingSupportBoundary = {
  boundary_id: PilotOnboardingSectionId;
  summary: string;
  operator_responsibility: string;
  design_partner_responsibility: string;
  escalation_path: string;
  non_scope: string[];
};

export type PilotOnboardingSection = {
  section_id: PilotOnboardingSectionId;
  audience: PilotOnboardingAudience;
  title: string;
  summary: string;
  required_input_ids: PilotOnboardingSectionId[];
};

export type PilotOnboardingSourceRefs = {
  intake_id?: PilotIntakeId;
  design_partner_id?: DesignPartnerId;
  qualification_classification?: PilotQualificationClassification;
  manual_payment_status?: ManualPaymentStatus;
  payment_record_id?: ManualPaymentRecordId;
  next_action_proposal_id?: NextActionProposalId;
  feedback_id?: PilotFeedbackId;
  case_study_permission_id?: CaseStudyPermissionId;
  v2_3_stable_tag: string;
  v2_3_stable_commit: string;
};

export type PilotOnboardingBoundaryFlags = {
  manual_first: true;
  bounded_pilot_only: true;
  design_partner_only: true;
  local_only: true;
  review_only: true;
  non_executing: true;
  no_payment_processor: true;
  no_checkout: true;
  no_subscription_management: true;
  no_automated_billing: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_crm_integration: true;
  no_email_dispatch: true;
  no_public_publishing: true;
  no_llm_call: true;
  no_model_call: true;
  no_agent_dispatch: true;
  no_tool_invocation: true;
  no_saas_sharing: true;
  no_autonomous_execution: true;
  no_public_beta_claim: true;
  no_paid_product_readiness_claim: true;
  no_commercial_readiness_claim: true;
  no_production_ready_claim: true;
  no_v3_claim: true;
  no_mplp_certification: true;
  no_mplp_endorsement: true;
  no_cognitive_os_law_redefinition: true;
  no_mplp_law_redefinition: true;
};

export type V2_4PilotOnboardingPacket = {
  packet_id: PilotOnboardingPacketId;
  created_at: string;
  updated_at: string;
  status: PilotOnboardingPacketStatus;
  audience: PilotOnboardingAudience;
  title: string;
  expectation_profile: PilotOnboardingExpectationProfile;
  required_inputs: PilotOnboardingRequiredInput[];
  support_boundaries: PilotOnboardingSupportBoundary[];
  sections: PilotOnboardingSection[];
  source_refs: PilotOnboardingSourceRefs;
  blocking_reasons: string[];
  recommended_manual_step: string;
  manual_acknowledgement_required: true;
  manual_acknowledgement_ref?: string;
  boundary_flags: PilotOnboardingBoundaryFlags;
  boundary_notices: string[];
};

export type PilotOnboardingPacketSummary = {
  packet_id: PilotOnboardingPacketId;
  status: PilotOnboardingPacketStatus;
  audience: PilotOnboardingAudience;
  title: string;
  source_refs: PilotOnboardingSourceRefs;
  required_input_count: number;
  support_boundary_count: number;
  recommended_manual_step: string;
  blocking_reasons: string[];
  boundary_notices: string[];
  manual_first: true;
  local_only: true;
  review_only: true;
  non_executing: true;
};

export const V2_3_STABLE_SOURCE_REFS = {
  v2_3_stable_tag: "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
  v2_3_stable_commit: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
} as const;

export const V2_4_ONBOARDING_BOUNDARY_FLAGS = {
  manual_first: true,
  bounded_pilot_only: true,
  design_partner_only: true,
  local_only: true,
  review_only: true,
  non_executing: true,
  no_payment_processor: true,
  no_checkout: true,
  no_subscription_management: true,
  no_automated_billing: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace_implementation: true,
  no_crm_integration: true,
  no_email_dispatch: true,
  no_public_publishing: true,
  no_llm_call: true,
  no_model_call: true,
  no_agent_dispatch: true,
  no_tool_invocation: true,
  no_saas_sharing: true,
  no_autonomous_execution: true,
  no_public_beta_claim: true,
  no_paid_product_readiness_claim: true,
  no_commercial_readiness_claim: true,
  no_production_ready_claim: true,
  no_v3_claim: true,
  no_mplp_certification: true,
  no_mplp_endorsement: true,
  no_cognitive_os_law_redefinition: true,
  no_mplp_law_redefinition: true,
} as const satisfies PilotOnboardingBoundaryFlags;

export const V2_4_ONBOARDING_BOUNDARY_NOTICES = [
  "V2.4 pilot onboarding packets are manual_first, bounded_pilot_only, design_partner_only, local_only, review_only, and non_executing.",
  "V2.4 pilot onboarding packets preserve no_payment_processor, no_checkout, no_subscription_management, and no_automated_billing boundaries.",
  "V2.4 pilot onboarding packets preserve no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, no_crm_integration, and no_email_dispatch boundaries.",
  "V2.4 pilot onboarding packets preserve no_public_publishing, no_llm_call, no_model_call, no_agent_dispatch, no_tool_invocation, no_saas_sharing, and no_autonomous_execution boundaries.",
  "V2.4 pilot onboarding packets preserve no_public_beta_claim, no_paid_product_readiness_claim, no_commercial_readiness_claim, no_production_ready_claim, no_v3_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
  "V2.4 pilot onboarding packets preserve no_cognitive_os_law_redefinition and no_mplp_law_redefinition boundaries.",
] as const;

export const V2_4_ONBOARDING_FINAL_STATUSES = [
  "acknowledged_manually",
  "cancelled",
  "blocked",
] as const satisfies PilotOnboardingPacketStatus[];
