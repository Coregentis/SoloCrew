import type {
  PilotOnboardingPacketId,
  PilotOnboardingPacketStatus,
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

export type CommercializationReadinessDashboardId = string;

export type CommercializationReadinessDashboardStatus =
  | "draft"
  | "ready_for_manual_review"
  | "reviewed_manually"
  | "blocked";

export type CommercializationReadinessScoreBand =
  | "insufficient_evidence"
  | "early_signal"
  | "promising_manual_pilot"
  | "needs_operator_review"
  | "blocked";

export type CommercializationEvidenceSignal =
  | "onboarding_packet_present"
  | "onboarding_acknowledged"
  | "v2_3_paid_pilot_loop_refs_present"
  | "manual_payment_confirmed"
  | "feedback_evidence_present"
  | "case_study_permission_present";

export type CommercializationSupportBurdenSignal =
  | "low_manual_support_burden"
  | "bounded_manual_support"
  | "support_burden_unclear"
  | "needs_operator_review"
  | "support_burden_blocked";

export type CommercializationFeedbackSignal =
  | "feedback_accepted_for_learning"
  | "feedback_incomplete"
  | "feedback_withdrawn_or_blocked"
  | "willingness_to_continue"
  | "willingness_to_pay_again"
  | "feedback_absent";

export type CommercializationCaseStudySignal =
  | "private_reference_permission"
  | "anonymized_quote_permission_only"
  | "permission_denied"
  | "needs_legal_review"
  | "case_study_absent";

export type CommercializationBoundaryPosture = {
  posture_id: string;
  boundary_clear: boolean;
  source_blockers: string[];
  notes: string[];
};

export type CommercializationReadinessSourceRefs = {
  onboarding_packet_id?: PilotOnboardingPacketId;
  onboarding_packet_status?: PilotOnboardingPacketStatus;
  onboarding_packet_summary_ref?: string;
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
  v2_4_onboarding_packet_ref?: string;
};

export type CommercializationReadinessDashboardBoundaryFlags = {
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

export type V2_4CommercializationReadinessDashboard = {
  dashboard_id: CommercializationReadinessDashboardId;
  created_at: string;
  updated_at: string;
  status: CommercializationReadinessDashboardStatus;
  score_band: CommercializationReadinessScoreBand;
  title: string;
  source_refs: CommercializationReadinessSourceRefs;
  evidence_signals: CommercializationEvidenceSignal[];
  support_burden_signals: CommercializationSupportBurdenSignal[];
  feedback_signals: CommercializationFeedbackSignal[];
  case_study_signals: CommercializationCaseStudySignal[];
  boundary_posture: CommercializationBoundaryPosture;
  manual_review_notes: string[];
  recommended_manual_step: string;
  boundary_flags: CommercializationReadinessDashboardBoundaryFlags;
  boundary_notices: string[];
};

export type CommercializationReadinessDashboardSummary = {
  dashboard_id: CommercializationReadinessDashboardId;
  status: CommercializationReadinessDashboardStatus;
  score_band: CommercializationReadinessScoreBand;
  title: string;
  source_refs: CommercializationReadinessSourceRefs;
  evidence_signals: CommercializationEvidenceSignal[];
  support_burden_signals: CommercializationSupportBurdenSignal[];
  feedback_signals: CommercializationFeedbackSignal[];
  case_study_signals: CommercializationCaseStudySignal[];
  recommended_manual_step: string;
  blocking_reasons: string[];
  boundary_notices: string[];
  manual_first: true;
  local_only: true;
  review_only: true;
  non_executing: true;
};

export const V2_4_DASHBOARD_BOUNDARY_FLAGS = {
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
} as const satisfies CommercializationReadinessDashboardBoundaryFlags;

export const V2_4_DASHBOARD_BOUNDARY_NOTICES = [
  "V2.4 commercialization readiness dashboards are manual_first, bounded_pilot_only, design_partner_only, local_only, review_only, and non_executing.",
  "V2.4 commercialization readiness dashboards summarize evidence only and do not create payment, dispatch, marketplace, CRM, email, publishing, model, agent, tool, SaaS, or autonomy behavior.",
  "V2.4 commercialization readiness dashboards preserve no_payment_processor, no_checkout, no_subscription_management, and no_automated_billing boundaries.",
  "V2.4 commercialization readiness dashboards preserve no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, no_crm_integration, no_email_dispatch, and no_public_publishing boundaries.",
  "V2.4 commercialization readiness dashboards preserve no_llm_call, no_model_call, no_agent_dispatch, no_tool_invocation, no_saas_sharing, and no_autonomous_execution boundaries.",
  "V2.4 commercialization readiness dashboards preserve no_public_beta_claim, no_paid_product_readiness_claim, no_commercial_readiness_claim, no_production_ready_claim, no_v3_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
  "V2.4 commercialization readiness dashboards preserve no_cognitive_os_law_redefinition and no_mplp_law_redefinition boundaries.",
] as const;

export const V2_4_DASHBOARD_FINAL_STATUSES = [
  "reviewed_manually",
  "blocked",
] as const satisfies CommercializationReadinessDashboardStatus[];
