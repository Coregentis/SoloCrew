import type {
  DesignPartnerId,
  PilotIntakeId,
} from "./pilot-intake-contract.ts";
import type {
  ManualPaymentRecordId,
} from "./manual-payment-status-contract.ts";
import type {
  NextActionProposalId,
} from "./next-action-proposal-contract.ts";
import type {
  ReviewPacketExportId,
} from "../review-packets/review-packet-export-contract.ts";
import type {
  WorkspaceId,
} from "../workspaces/workspace-contract.ts";

export type PilotFeedbackId = string;
export type CaseStudyPermissionId = string;

export type PilotFeedbackStatus =
  | "draft"
  | "submitted"
  | "needs_manual_review"
  | "accepted_for_learning"
  | "incomplete"
  | "withdrawn"
  | "blocked";

export type CaseStudyPermissionStatus =
  | "not_requested"
  | "requested_manually"
  | "granted_private_reference_only"
  | "granted_anonymized_public_quote"
  | "denied"
  | "withdrawn"
  | "needs_legal_review"
  | "blocked";

export type PilotFeedbackRating = 1 | 2 | 3 | 4 | 5;

export type PilotFeedbackSignal =
  | "useful"
  | "unclear"
  | "too_manual"
  | "too_complex"
  | "time_saving"
  | "would_pay_again"
  | "would_not_pay_again"
  | "needs_more_guidance"
  | "boundary_confusion"
  | "artifact_quality_issue"
  | "continuation_value";

export type PilotFeedbackBoundaryFlags = {
  local_only: true;
  review_only: true;
  non_executing: true;
  manual_permission_required: true;
  no_public_publishing: true;
  no_auto_testimonial: true;
  no_crm_integration: true;
  no_email_dispatch: true;
  no_channel_dispatch: true;
  no_provider_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_follow_up: true;
  no_saas_sharing: true;
  no_external_analytics: true;
  no_llm_call: true;
  no_agent_dispatch: true;
  no_payment_processor: true;
  no_checkout: true;
  no_subscription_management: true;
  no_paid_product_readiness_claim: true;
  no_public_beta_claim: true;
  no_mplp_certification: true;
  no_mplp_endorsement: true;
};

export type V2_3PilotFeedbackRecord = {
  feedback_id: PilotFeedbackId;
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  payment_record_id?: ManualPaymentRecordId;
  proposal_id?: NextActionProposalId;
  workspace_id?: WorkspaceId;
  review_packet_export_id?: ReviewPacketExportId;
  dashboard_page_id?: string;
  created_at: string;
  updated_at: string;
  status: PilotFeedbackStatus;
  rating: PilotFeedbackRating;
  signals: PilotFeedbackSignal[];
  usefulness_summary: string;
  artifact_quality_summary: string;
  continuation_value_summary: string;
  confusion_or_risk_summary: string;
  support_burden_summary: string;
  willingness_to_continue: boolean;
  willingness_to_pay_again: boolean;
  operator_notes: string;
  boundary_flags: PilotFeedbackBoundaryFlags;
  boundary_notices: string[];
};

export type V2_3CaseStudyPermissionRecord = {
  permission_id: CaseStudyPermissionId;
  feedback_id: PilotFeedbackId;
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  created_at: string;
  updated_at: string;
  status: CaseStudyPermissionStatus;
  permission_scope: string;
  anonymization_required: boolean;
  allowed_quote_refs: string[];
  denied_reason?: string;
  legal_review_note?: string;
  manual_next_step: string;
  boundary_flags: PilotFeedbackBoundaryFlags;
  boundary_notices: string[];
};

export type FeedbackQualityClassification =
  | "strong_signal"
  | "useful_but_incomplete"
  | "incomplete"
  | "blocked_or_withdrawn";

export type CaseStudyPermissionClassification =
  | "private_reference_only"
  | "anonymized_public_quote_allowed"
  | "denied"
  | "needs_legal_review"
  | "not_requested";

export type PilotFeedbackSummary = {
  feedback_id: PilotFeedbackId;
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  status: PilotFeedbackStatus;
  rating: PilotFeedbackRating;
  quality_classification: FeedbackQualityClassification;
  completeness_score: number;
  signal_summary: string[];
  manual_next_step: string;
  boundary_notices: string[];
  local_only: true;
  review_only: true;
  non_executing: true;
};

export type CaseStudyPermissionSummary = {
  permission_id: CaseStudyPermissionId;
  feedback_id: PilotFeedbackId;
  intake_id: PilotIntakeId;
  design_partner_id: DesignPartnerId;
  status: CaseStudyPermissionStatus;
  classification: CaseStudyPermissionClassification;
  manual_next_step: string;
  allowed_quote_refs: string[];
  boundary_notices: string[];
  local_only: true;
  review_only: true;
  non_executing: true;
};

export const V2_3_FEEDBACK_BOUNDARY_FLAGS = {
  local_only: true,
  review_only: true,
  non_executing: true,
  manual_permission_required: true,
  no_public_publishing: true,
  no_auto_testimonial: true,
  no_crm_integration: true,
  no_email_dispatch: true,
  no_channel_dispatch: true,
  no_provider_dispatch: true,
  no_marketplace_implementation: true,
  no_autonomous_follow_up: true,
  no_saas_sharing: true,
  no_external_analytics: true,
  no_llm_call: true,
  no_agent_dispatch: true,
  no_payment_processor: true,
  no_checkout: true,
  no_subscription_management: true,
  no_paid_product_readiness_claim: true,
  no_public_beta_claim: true,
  no_mplp_certification: true,
  no_mplp_endorsement: true,
} as const satisfies PilotFeedbackBoundaryFlags;

export const V2_3_FEEDBACK_BOUNDARY_NOTICES = [
  "V2.3 feedback capture is local-only, review-only, and non-executing.",
  "V2.3 case-study permission is manual and permission-gated.",
  "V2.3 feedback capture keeps no_public_publishing, no_auto_testimonial, no_crm_integration, no_email_dispatch, and no_external_analytics boundaries.",
  "V2.3 feedback capture keeps no_channel_dispatch, no_provider_dispatch, no_marketplace_implementation, no_autonomous_follow_up, and no_saas_sharing boundaries.",
  "V2.3 feedback capture keeps no_llm_call, no_agent_dispatch, no_payment_processor, no_checkout, and no_subscription_management boundaries.",
  "V2.3 feedback capture keeps no_paid_product_readiness_claim, no_public_beta_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
] as const;
