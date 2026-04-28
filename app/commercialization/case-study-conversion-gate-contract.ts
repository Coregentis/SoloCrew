import type {
  CommercializationReadinessDashboardId,
  CommercializationReadinessScoreBand,
} from "./commercialization-readiness-dashboard-contract.ts";
import type {
  PilotFeedbackEvidenceId,
  PilotFeedbackEvidenceStrengthBand,
} from "./pilot-feedback-evidence-contract.ts";
import type {
  PilotOnboardingPacketId,
} from "./pilot-onboarding-packet-contract.ts";
import type {
  CaseStudyPermissionId,
  PilotFeedbackId,
} from "../pilots/feedback-capture-contract.ts";
import type {
  ManualPaymentRecordId,
  ManualPaymentStatus,
} from "../pilots/manual-payment-status-contract.ts";
import type {
  NextActionProposalId,
} from "../pilots/next-action-proposal-contract.ts";
import type {
  DesignPartnerId,
  PilotIntakeId,
  PilotQualificationClassification,
} from "../pilots/pilot-intake-contract.ts";

export type CaseStudyConversionGateId = string;

export type CaseStudyConversionGateStatus =
  | "draft"
  | "ready_for_manual_review"
  | "reviewed_manually"
  | "blocked";

export type CaseStudyPermissionReadinessBand =
  | "permission_absent"
  | "private_reference_only"
  | "anonymized_quote_candidate"
  | "needs_legal_review"
  | "denied"
  | "blocked";

export type ManualConversionReadinessBand =
  | "insufficient_evidence"
  | "weak_manual_signal"
  | "useful_manual_signal"
  | "strong_manual_signal"
  | "needs_operator_review"
  | "blocked";

export type CaseStudyConversionGateDecision =
  | "hold_for_more_evidence"
  | "prepare_private_reference_review"
  | "prepare_anonymized_quote_review"
  | "prepare_manual_conversion_review"
  | "require_legal_review"
  | "deny_public_use"
  | "blocked";

export type CaseStudyConversionEvidenceSignal =
  | "permission_present"
  | "private_reference_permission"
  | "anonymized_quote_permission"
  | "permission_denied"
  | "permission_needs_legal_review"
  | "permission_absent"
  | "feedback_evidence_present"
  | "strong_feedback_evidence"
  | "useful_feedback_evidence"
  | "weak_feedback_evidence"
  | "feedback_evidence_insufficient"
  | "dashboard_evidence_present"
  | "onboarding_packet_present"
  | "manual_payment_confirmed"
  | "source_blocker_present";

export type CaseStudyConversionSourceRefs = {
  feedback_evidence_id?: PilotFeedbackEvidenceId;
  feedback_evidence_strength_band?: PilotFeedbackEvidenceStrengthBand;
  dashboard_id?: CommercializationReadinessDashboardId;
  dashboard_score_band?: CommercializationReadinessScoreBand;
  onboarding_packet_id?: PilotOnboardingPacketId;
  feedback_id?: PilotFeedbackId;
  case_study_permission_id?: CaseStudyPermissionId;
  intake_id?: PilotIntakeId;
  design_partner_id?: DesignPartnerId;
  qualification_classification?: PilotQualificationClassification;
  manual_payment_status?: ManualPaymentStatus;
  payment_record_id?: ManualPaymentRecordId;
  next_action_proposal_id?: NextActionProposalId;
  v2_3_stable_tag: string;
  v2_3_stable_commit: string;
  v2_4_feedback_evidence_ref?: string;
  v2_4_dashboard_ref?: string;
  v2_4_onboarding_packet_ref?: string;
};

export type CaseStudyConversionBoundaryFlags = {
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
  no_testimonial_publishing: true;
  no_public_case_study_generation: true;
  no_external_analytics: true;
  no_customer_account_provisioning: true;
  no_automatic_conversion: true;
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

export type V2_4CaseStudyConversionGate = {
  gate_id: CaseStudyConversionGateId;
  created_at: string;
  updated_at: string;
  status: CaseStudyConversionGateStatus;
  permission_readiness_band: CaseStudyPermissionReadinessBand;
  manual_conversion_readiness_band: ManualConversionReadinessBand;
  decision: CaseStudyConversionGateDecision;
  title: string;
  source_refs: CaseStudyConversionSourceRefs;
  evidence_signals: CaseStudyConversionEvidenceSignal[];
  manual_review_notes: string[];
  source_blockers: string[];
  recommended_manual_step: string;
  boundary_flags: CaseStudyConversionBoundaryFlags;
  boundary_notices: string[];
};

export type CaseStudyConversionGateSummary = {
  gate_id: CaseStudyConversionGateId;
  status: CaseStudyConversionGateStatus;
  permission_readiness_band: CaseStudyPermissionReadinessBand;
  manual_conversion_readiness_band: ManualConversionReadinessBand;
  decision: CaseStudyConversionGateDecision;
  title: string;
  source_refs: CaseStudyConversionSourceRefs;
  evidence_signals: CaseStudyConversionEvidenceSignal[];
  recommended_manual_step: string;
  source_blockers: string[];
  boundary_notices: string[];
  manual_first: true;
  local_only: true;
  review_only: true;
  non_executing: true;
};

export const V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS = {
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
  no_testimonial_publishing: true,
  no_public_case_study_generation: true,
  no_external_analytics: true,
  no_customer_account_provisioning: true,
  no_automatic_conversion: true,
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
} as const satisfies CaseStudyConversionBoundaryFlags;

export const V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES = [
  "V2.4 case-study conversion gates are manual_first, bounded_pilot_only, design_partner_only, local_only, review_only, and non_executing.",
  "V2.4 case-study conversion gates produce local founder review decisions only; they do not publish testimonials, generate public case studies, provision customer accounts, or convert a design partner automatically.",
  "V2.4 case-study conversion gates preserve no_payment_processor, no_checkout, no_subscription_management, and no_automated_billing boundaries.",
  "V2.4 case-study conversion gates preserve no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, no_crm_integration, no_email_dispatch, no_public_publishing, no_testimonial_publishing, no_public_case_study_generation, and no_external_analytics boundaries.",
  "V2.4 case-study conversion gates preserve no_llm_call, no_model_call, no_agent_dispatch, no_tool_invocation, no_saas_sharing, and no_autonomous_execution boundaries.",
  "V2.4 case-study conversion gates preserve no_public_beta_claim, no_paid_product_readiness_claim, no_commercial_readiness_claim, no_production_ready_claim, no_v3_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
  "V2.4 case-study conversion gates preserve no_cognitive_os_law_redefinition and no_mplp_law_redefinition boundaries.",
] as const;

export const V2_4_CASE_STUDY_CONVERSION_FINAL_STATUSES = [
  "reviewed_manually",
  "blocked",
] as const satisfies CaseStudyConversionGateStatus[];
