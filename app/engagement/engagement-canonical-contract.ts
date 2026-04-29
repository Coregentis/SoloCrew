import type {
  V2_4CaseStudyConversionGate,
  CaseStudyConversionGateId,
  CaseStudyConversionGateSummary,
} from "../commercialization/case-study-conversion-gate-contract.ts";
import type {
  V2_4CommercializationReadinessDashboard,
  CommercializationReadinessDashboardId,
  CommercializationReadinessDashboardSummary,
} from "../commercialization/commercialization-readiness-dashboard-contract.ts";
import type {
  V2_4PilotFeedbackEvidenceRecord,
  PilotFeedbackEvidenceId,
  PilotFeedbackEvidenceSummary,
} from "../commercialization/pilot-feedback-evidence-contract.ts";
import type {
  V2_4PilotOnboardingPacket,
  PilotOnboardingPacketId,
  PilotOnboardingPacketSummary,
} from "../commercialization/pilot-onboarding-packet-contract.ts";
import type {
  V2_3CaseStudyPermissionRecord,
  V2_3PilotFeedbackRecord,
} from "../pilots/feedback-capture-contract.ts";
import type {
  V2_3ManualPaymentRecord,
} from "../pilots/manual-payment-status-contract.ts";
import type {
  V2_3NextActionProposal,
} from "../pilots/next-action-proposal-contract.ts";
import type {
  V2_3PilotIntakeRecord,
} from "../pilots/pilot-intake-contract.ts";
import type {
  BaselineCommitRef,
  BaselineReleaseRef,
  EngagementSourceMetadata,
  SourceCommitRef,
  SourceReleaseRef,
} from "./engagement-metadata-contract.ts";

export type EngagementId = string;
export type EngagementParticipantId = string;

export const ENGAGEMENT_STAGE_VALUES = [
  "candidate",
  "qualified",
  "onboarding",
  "paid_pilot",
  "active_pilot",
  "post_pilot_review",
  "conversion_review",
  "closed_won",
  "closed_lost",
  "archived",
] as const;

export type EngagementStage = typeof ENGAGEMENT_STAGE_VALUES[number];

export const COMMERCIAL_MODE_VALUES = [
  "free_discovery",
  "manual_paid_pilot",
  "manual_service",
  "subscription_candidate",
  "enterprise_candidate",
] as const;

export type CommercialMode = typeof COMMERCIAL_MODE_VALUES[number];

export type EngagementParticipant = {
  participant_id: EngagementParticipantId;
  display_name: string;
  role: "founder" | "operator" | "design_partner" | "reviewer";
};

export type Engagement = {
  engagement_id: EngagementId;
  stage: EngagementStage;
  commercial_mode: CommercialMode;
  participant_ids: EngagementParticipantId[];
  metadata: EngagementSourceMetadata;
};

export type EngagementOnboardingPacket = V2_4PilotOnboardingPacket;
export type EngagementOnboardingPacketSummary = PilotOnboardingPacketSummary;

export type EngagementReadinessView = V2_4CommercializationReadinessDashboard;
export type EngagementReadinessViewSummary =
  CommercializationReadinessDashboardSummary;

export type EngagementEvidenceRecord = V2_4PilotFeedbackEvidenceRecord;
export type EngagementEvidenceSummary = PilotFeedbackEvidenceSummary;

export type EngagementReviewGate = V2_4CaseStudyConversionGate;
export type EngagementReviewGateSummary = CaseStudyConversionGateSummary;
export type EngagementOutcomeReview = V2_4CaseStudyConversionGate;
export type ReferencePermissionReview = V2_4CaseStudyConversionGate;
export type ConversionReview = V2_4CaseStudyConversionGate;
export type SupportBurdenReview = V2_4CommercializationReadinessDashboard;

export type FounderReviewQueue = {
  queue_id: string;
  engagement_ref: EngagementId;
  review_gate_refs: CaseStudyConversionGateId[];
  readiness_view_refs: CommercializationReadinessDashboardId[];
  evidence_record_refs: PilotFeedbackEvidenceId[];
};

export type EngagementCandidateIntake = V2_3PilotIntakeRecord;
export type EngagementCommercialRecord = V2_3ManualPaymentRecord;
export type ManualPaymentStatusRecord = V2_3ManualPaymentRecord;
export type EngagementNextActionProposal = V2_3NextActionProposal;
export type EngagementFeedbackRecord = V2_3PilotFeedbackRecord;
export type EngagementCaseStudyPermissionRecord = V2_3CaseStudyPermissionRecord;

export type EngagementBaselineRefs = {
  baseline_release_ref: BaselineReleaseRef;
  baseline_commit_ref: BaselineCommitRef;
};

export type EngagementSourceRefs = {
  source_release_ref?: SourceReleaseRef;
  source_commit_ref?: SourceCommitRef;
  participant_ref?: EngagementParticipantId;
  engagement_ref?: EngagementId;
};

export type EngagementEvidenceRefs =
  & EngagementBaselineRefs
  & EngagementSourceRefs
  & {
    onboarding_packet_ref?: PilotOnboardingPacketId;
    readiness_view_ref?: CommercializationReadinessDashboardId;
    evidence_record_ref?: PilotFeedbackEvidenceId;
    review_gate_ref?: CaseStudyConversionGateId;
  };

export type EngagementReadinessRefs =
  & EngagementBaselineRefs
  & EngagementSourceRefs
  & {
    onboarding_packet_ref?: PilotOnboardingPacketId;
    readiness_view_ref?: CommercializationReadinessDashboardId;
    evidence_record_ref?: PilotFeedbackEvidenceId;
    review_gate_ref?: CaseStudyConversionGateId;
  };

export const ENGAGEMENT_SOURCE_REF_FIELD_NAMES = [
  "baseline_release_ref",
  "baseline_commit_ref",
  "source_release_ref",
  "source_commit_ref",
  "onboarding_packet_ref",
  "readiness_view_ref",
  "evidence_record_ref",
  "review_gate_ref",
  "participant_ref",
  "engagement_ref",
] as const;
