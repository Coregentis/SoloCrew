import type {
  CommercialMode,
  EngagementId,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementEntrySurfaceId,
} from "./engagement-entry-surface-contract.ts";
import type {
  EngagementLoopRunId,
  EngagementLoopStepId,
} from "./engagement-loop-runner-contract.ts";
import {
  ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA,
} from "./engagement-loop-runner-contract.ts";
import type {
  EngagementSessionId,
  EngagementWorkspaceId,
  EngagementWorkspaceSourceMetadata,
} from "./engagement-workspace-contract.ts";

export type FounderReviewPacketId = string;

export type FounderReviewPacketSectionId =
  | "engagement_context"
  | "workspace_summary"
  | "loop_review_summary"
  | "reviewed_steps"
  | "blocked_items"
  | "pending_items"
  | "founder_decision_options"
  | "boundary_notice";

export type FounderReviewPacketSectionStatus =
  | "ready"
  | "pending"
  | "blocked"
  | "notice";

export type FounderReviewPacketStatus =
  | "draft"
  | "ready_for_founder_review"
  | "blocked"
  | "archived";

export type FounderReviewPacketDecisionKind =
  | "continue_review"
  | "request_more_evidence"
  | "hold_for_operator_review"
  | "block_until_refs_fixed"
  | "archive_without_action";

export type FounderReviewPacketBoundaryFlags = {
  local_only: true;
  manual_first: true;
  review_only: true;
  deterministic: true;
  non_executing: true;
  no_external_service: true;
  no_persistence_infrastructure: true;
  no_file_export: true;
  no_public_publishing: true;
  no_email_dispatch: true;
  no_crm: true;
  no_payment: true;
  no_llm_or_tool_invocation: true;
  no_autonomy: true;
  no_package_publish: true;
  no_public_beta: true;
  no_commercial_readiness_claim: true;
  no_production_readiness_claim: true;
  no_mplp_certification_or_endorsement: true;
};

export type FounderReviewPacketSourceRefs = {
  entry_surface_ref?: EngagementEntrySurfaceId | null;
  workspace_ref?: EngagementWorkspaceId | null;
  session_ref?: EngagementSessionId | null;
  loop_run_ref: EngagementLoopRunId;
  loop_step_refs: EngagementLoopStepId[];
  engagement_ref?: EngagementId | null;
};

export type FounderReviewPacketSection = {
  section_id: FounderReviewPacketSectionId;
  title: string;
  summary: string;
  item_refs: string[];
  status: FounderReviewPacketSectionStatus;
  boundary_flags: FounderReviewPacketBoundaryFlags;
};

export type FounderReviewPacket = {
  packet_id: FounderReviewPacketId;
  status: FounderReviewPacketStatus;
  engagement_ref: EngagementId | null;
  workspace_ref: EngagementWorkspaceId | null;
  session_ref: EngagementSessionId | null;
  loop_run_ref: EngagementLoopRunId;
  current_stage: EngagementStage;
  commercial_mode: CommercialMode;
  sections: FounderReviewPacketSection[];
  decision_options: FounderReviewPacketDecisionKind[];
  source_refs: FounderReviewPacketSourceRefs;
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: FounderReviewPacketBoundaryFlags;
};

export type FounderReviewPacketSummary = {
  packet_ref: FounderReviewPacketId;
  status: FounderReviewPacketStatus;
  engagement_ref: EngagementId | null;
  workspace_ref: EngagementWorkspaceId | null;
  loop_run_ref: EngagementLoopRunId;
  section_count: number;
  decision_options: FounderReviewPacketDecisionKind[];
  blocked_item_count: number;
  pending_item_count: number;
  boundary_flags: FounderReviewPacketBoundaryFlags;
};

export type FounderReviewPacketResult = {
  result_id: string;
  packet: FounderReviewPacket;
  result_summary: string;
  boundary_flags: FounderReviewPacketBoundaryFlags;
};

export const FOUNDER_REVIEW_PACKET_STATUS_VALUES = [
  "draft",
  "ready_for_founder_review",
  "blocked",
  "archived",
] as const satisfies FounderReviewPacketStatus[];

export const FOUNDER_REVIEW_PACKET_DECISION_KIND_VALUES = [
  "continue_review",
  "request_more_evidence",
  "hold_for_operator_review",
  "block_until_refs_fixed",
  "archive_without_action",
] as const satisfies FounderReviewPacketDecisionKind[];

export const FOUNDER_REVIEW_PACKET_SECTION_ID_VALUES = [
  "engagement_context",
  "workspace_summary",
  "loop_review_summary",
  "reviewed_steps",
  "blocked_items",
  "pending_items",
  "founder_decision_options",
  "boundary_notice",
] as const satisfies FounderReviewPacketSectionId[];

export const FOUNDER_REVIEW_PACKET_SECTION_STATUS_VALUES = [
  "ready",
  "pending",
  "blocked",
  "notice",
] as const satisfies FounderReviewPacketSectionStatus[];

export const FOUNDER_REVIEW_PACKET_BOUNDARY_FLAGS = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  no_external_service: true,
  no_persistence_infrastructure: true,
  no_file_export: true,
  no_public_publishing: true,
  no_email_dispatch: true,
  no_crm: true,
  no_payment: true,
  no_llm_or_tool_invocation: true,
  no_autonomy: true,
  no_package_publish: true,
  no_public_beta: true,
  no_commercial_readiness_claim: true,
  no_production_readiness_claim: true,
  no_mplp_certification_or_endorsement: true,
} as const satisfies FounderReviewPacketBoundaryFlags;

export const FOUNDER_REVIEW_PACKET_BOUNDARY_FLAG_NAMES = [
  "local_only",
  "manual_first",
  "review_only",
  "deterministic",
  "non_executing",
  "no_external_service",
  "no_persistence_infrastructure",
  "no_file_export",
  "no_public_publishing",
  "no_email_dispatch",
  "no_crm",
  "no_payment",
  "no_llm_or_tool_invocation",
  "no_autonomy",
  "no_package_publish",
  "no_public_beta",
  "no_commercial_readiness_claim",
  "no_production_readiness_claim",
  "no_mplp_certification_or_endorsement",
] as const satisfies (keyof FounderReviewPacketBoundaryFlags)[];

export const FOUNDER_REVIEW_PACKET_FIELD_NAMES = [
  "packet_id",
  "status",
  "engagement_ref",
  "workspace_ref",
  "session_ref",
  "loop_run_ref",
  "current_stage",
  "commercial_mode",
  "sections",
  "decision_options",
  "source_refs",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof FounderReviewPacket)[];

export const FOUNDER_REVIEW_PACKET_SECTION_FIELD_NAMES = [
  "section_id",
  "title",
  "summary",
  "item_refs",
  "status",
  "boundary_flags",
] as const satisfies (keyof FounderReviewPacketSection)[];

export const FOUNDER_REVIEW_PACKET_SUMMARY_FIELD_NAMES = [
  "packet_ref",
  "status",
  "engagement_ref",
  "workspace_ref",
  "loop_run_ref",
  "section_count",
  "decision_options",
  "blocked_item_count",
  "pending_item_count",
  "boundary_flags",
] as const satisfies (keyof FounderReviewPacketSummary)[];

export const FOUNDER_REVIEW_PACKET_RESULT_FIELD_NAMES = [
  "result_id",
  "packet",
  "result_summary",
  "boundary_flags",
] as const satisfies (keyof FounderReviewPacketResult)[];

export const FOUNDER_REVIEW_PACKET_SOURCE_METADATA = {
  ...ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA,
  contract_version: "founder-review-packet-contract-v0.1",
  schema_version: "founder-review-packet-v3.0-impl-04",
  release_line: "v3.0-impl-04-founder-review-packet-output",
} as const satisfies EngagementWorkspaceSourceMetadata;
