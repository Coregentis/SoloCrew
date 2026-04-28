import type {
  CommercializationReadinessDashboardId,
  CommercializationReadinessScoreBand,
} from "./commercialization-readiness-dashboard-contract.ts";
import type {
  PilotOnboardingPacketId,
} from "./pilot-onboarding-packet-contract.ts";
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
  CaseStudyPermissionId,
  PilotFeedbackId,
} from "../pilots/feedback-capture-contract.ts";

export type PilotFeedbackEvidenceId = string;

export type PilotFeedbackEvidenceStatus =
  | "draft"
  | "ready_for_manual_review"
  | "reviewed_manually"
  | "blocked";

export type PilotFeedbackEvidenceStrengthBand =
  | "insufficient_evidence"
  | "weak_signal"
  | "useful_manual_signal"
  | "strong_manual_signal"
  | "needs_operator_review"
  | "blocked";

export type PilotFeedbackUsefulnessSignal =
  | "usefulness_summary_present"
  | "artifact_quality_summary_present"
  | "useful_signal_present"
  | "time_saving_signal_present"
  | "usefulness_unclear"
  | "feedback_absent";

export type PilotFeedbackSupportSignal =
  | "support_burden_summary_present"
  | "bounded_support_signal"
  | "support_burden_unclear"
  | "support_burden_high_or_blocked";

export type PilotFeedbackContinuationSignal =
  | "continuation_value_present"
  | "willingness_to_continue"
  | "willingness_to_pay_again"
  | "continuation_unclear";

export type PilotFeedbackPermissionSignal =
  | "private_reference_permission"
  | "anonymized_quote_permission_only"
  | "permission_denied"
  | "needs_legal_review"
  | "permission_absent";

export type PilotFeedbackEvidenceSourceRefs = {
  feedback_id?: PilotFeedbackId;
  case_study_permission_id?: CaseStudyPermissionId;
  dashboard_id?: CommercializationReadinessDashboardId;
  dashboard_score_band?: CommercializationReadinessScoreBand;
  onboarding_packet_id?: PilotOnboardingPacketId;
  intake_id?: PilotIntakeId;
  design_partner_id?: DesignPartnerId;
  qualification_classification?: PilotQualificationClassification;
  manual_payment_status?: ManualPaymentStatus;
  payment_record_id?: ManualPaymentRecordId;
  next_action_proposal_id?: NextActionProposalId;
  v2_3_stable_tag: string;
  v2_3_stable_commit: string;
  v2_4_dashboard_ref?: string;
  v2_4_onboarding_packet_ref?: string;
};

export type PilotFeedbackEvidenceBoundaryFlags = {
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
  no_external_analytics: true;
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

export type V2_4PilotFeedbackEvidenceRecord = {
  evidence_id: PilotFeedbackEvidenceId;
  created_at: string;
  updated_at: string;
  status: PilotFeedbackEvidenceStatus;
  strength_band: PilotFeedbackEvidenceStrengthBand;
  title: string;
  source_refs: PilotFeedbackEvidenceSourceRefs;
  usefulness_signals: PilotFeedbackUsefulnessSignal[];
  support_signals: PilotFeedbackSupportSignal[];
  continuation_signals: PilotFeedbackContinuationSignal[];
  permission_signals: PilotFeedbackPermissionSignal[];
  evidence_notes: string[];
  source_blockers: string[];
  recommended_manual_step: string;
  boundary_flags: PilotFeedbackEvidenceBoundaryFlags;
  boundary_notices: string[];
};

export type PilotFeedbackEvidenceSummary = {
  evidence_id: PilotFeedbackEvidenceId;
  status: PilotFeedbackEvidenceStatus;
  strength_band: PilotFeedbackEvidenceStrengthBand;
  title: string;
  source_refs: PilotFeedbackEvidenceSourceRefs;
  usefulness_signals: PilotFeedbackUsefulnessSignal[];
  support_signals: PilotFeedbackSupportSignal[];
  continuation_signals: PilotFeedbackContinuationSignal[];
  permission_signals: PilotFeedbackPermissionSignal[];
  recommended_manual_step: string;
  source_blockers: string[];
  boundary_notices: string[];
  manual_first: true;
  local_only: true;
  review_only: true;
  non_executing: true;
};

export const V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS = {
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
  no_external_analytics: true,
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
} as const satisfies PilotFeedbackEvidenceBoundaryFlags;

export const V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES = [
  "V2.4 pilot feedback evidence is manual_first, bounded_pilot_only, design_partner_only, local_only, review_only, and non_executing.",
  "V2.4 pilot feedback evidence strengthens local evidence only; it does not create CRM, email, public publishing, testimonial publishing, external analytics, model, agent, tool, SaaS, or autonomy behavior.",
  "V2.4 pilot feedback evidence preserves no_payment_processor, no_checkout, no_subscription_management, and no_automated_billing boundaries.",
  "V2.4 pilot feedback evidence preserves no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, no_crm_integration, no_email_dispatch, no_public_publishing, no_testimonial_publishing, and no_external_analytics boundaries.",
  "V2.4 pilot feedback evidence preserves no_llm_call, no_model_call, no_agent_dispatch, no_tool_invocation, no_saas_sharing, and no_autonomous_execution boundaries.",
  "V2.4 pilot feedback evidence preserves no_public_beta_claim, no_paid_product_readiness_claim, no_commercial_readiness_claim, no_production_ready_claim, no_v3_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
  "V2.4 pilot feedback evidence preserves no_cognitive_os_law_redefinition and no_mplp_law_redefinition boundaries.",
] as const;

export const V2_4_FEEDBACK_EVIDENCE_FINAL_STATUSES = [
  "reviewed_manually",
  "blocked",
] as const satisfies PilotFeedbackEvidenceStatus[];
