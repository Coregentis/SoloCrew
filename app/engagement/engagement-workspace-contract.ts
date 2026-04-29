import type {
  CommercialMode,
  EngagementId,
  EngagementOperationalRefs,
  EngagementParticipantId,
  EngagementReadinessRefs,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementCompatibilityMetadata,
  EngagementSourceMetadata,
} from "./engagement-metadata-contract.ts";

export type EngagementWorkspaceId = string;
export type EngagementSessionId = string;
export type EngagementLoopStateId = string;
export type EngagementHistoryRecordId = string;

export type EngagementSessionStatus =
  | "draft"
  | "active"
  | "review_ready"
  | "closed"
  | "blocked";

export type EngagementHistoryEventKind =
  | "workspace_created"
  | "session_started"
  | "stage_changed"
  | "onboarding_attached"
  | "evidence_attached"
  | "readiness_view_attached"
  | "review_gate_attached"
  | "outcome_review_attached"
  | "support_burden_attached"
  | "founder_review_requested"
  | "session_closed"
  | "blocked";

export type EngagementWorkspaceBoundaryFlags = {
  local_only: true;
  manual_first: true;
  review_only: true;
  deterministic: true;
  non_executing: true;
  no_external_service: true;
  no_payment: true;
  no_crm: true;
  no_publishing: true;
  no_llm_or_tool_invocation: true;
  no_autonomy: true;
  no_package_publish: true;
  no_public_beta: true;
  no_commercial_readiness_claim: true;
  no_production_readiness_claim: true;
  no_mplp_certification_or_endorsement: true;
};

export type EngagementWorkspaceSourceMetadata =
  & EngagementSourceMetadata
  & Partial<
    Pick<
      EngagementCompatibilityMetadata,
      "compatibility_profile" | "migration_from" | "migration_to"
    >
  >;

export type EngagementHistorySourceRefs =
  Partial<EngagementReadinessRefs & EngagementOperationalRefs>;

export type EngagementWorkspace = {
  workspace_id: EngagementWorkspaceId;
  engagement_ref: EngagementId;
  participant_refs: EngagementParticipantId[];
  current_stage: EngagementStage;
  commercial_mode: CommercialMode;
  loop_state_ref: EngagementLoopStateId;
  history_refs: EngagementHistoryRecordId[];
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: EngagementWorkspaceBoundaryFlags;
};

export type EngagementSession = {
  session_id: EngagementSessionId;
  workspace_ref: EngagementWorkspaceId;
  operator_ref: EngagementParticipantId;
  started_at: string;
  status: EngagementSessionStatus;
  current_stage: EngagementStage;
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: EngagementWorkspaceBoundaryFlags;
};

export type EngagementLoopState = {
  loop_state_id: EngagementLoopStateId;
  engagement_ref: EngagementId;
  stage: EngagementStage;
  readiness_ref?: string;
  onboarding_packet_ref?: string;
  evidence_refs: string[];
  review_gate_refs: string[];
  outcome_review_ref?: string;
  support_burden_ref?: string;
  boundary_flags: EngagementWorkspaceBoundaryFlags;
};

export type EngagementHistoryRecord = {
  history_record_id: EngagementHistoryRecordId;
  workspace_ref: EngagementWorkspaceId;
  session_ref: EngagementSessionId;
  event_kind: EngagementHistoryEventKind;
  event_summary: string;
  source_refs: EngagementHistorySourceRefs;
  created_at: string;
  boundary_flags: EngagementWorkspaceBoundaryFlags;
};

export const ENGAGEMENT_SESSION_STATUS_VALUES = [
  "draft",
  "active",
  "review_ready",
  "closed",
  "blocked",
] as const satisfies EngagementSessionStatus[];

export const ENGAGEMENT_HISTORY_EVENT_KIND_VALUES = [
  "workspace_created",
  "session_started",
  "stage_changed",
  "onboarding_attached",
  "evidence_attached",
  "readiness_view_attached",
  "review_gate_attached",
  "outcome_review_attached",
  "support_burden_attached",
  "founder_review_requested",
  "session_closed",
  "blocked",
] as const satisfies EngagementHistoryEventKind[];

export const ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  no_external_service: true,
  no_payment: true,
  no_crm: true,
  no_publishing: true,
  no_llm_or_tool_invocation: true,
  no_autonomy: true,
  no_package_publish: true,
  no_public_beta: true,
  no_commercial_readiness_claim: true,
  no_production_readiness_claim: true,
  no_mplp_certification_or_endorsement: true,
} as const satisfies EngagementWorkspaceBoundaryFlags;

export const ENGAGEMENT_WORKSPACE_BOUNDARY_FLAG_NAMES = [
  "local_only",
  "manual_first",
  "review_only",
  "deterministic",
  "non_executing",
  "no_external_service",
  "no_payment",
  "no_crm",
  "no_publishing",
  "no_llm_or_tool_invocation",
  "no_autonomy",
  "no_package_publish",
  "no_public_beta",
  "no_commercial_readiness_claim",
  "no_production_readiness_claim",
  "no_mplp_certification_or_endorsement",
] as const satisfies (keyof EngagementWorkspaceBoundaryFlags)[];

export const ENGAGEMENT_WORKSPACE_FIELD_NAMES = [
  "workspace_id",
  "engagement_ref",
  "participant_refs",
  "current_stage",
  "commercial_mode",
  "loop_state_ref",
  "history_refs",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof EngagementWorkspace)[];

export const ENGAGEMENT_SESSION_FIELD_NAMES = [
  "session_id",
  "workspace_ref",
  "operator_ref",
  "started_at",
  "status",
  "current_stage",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof EngagementSession)[];

export const ENGAGEMENT_LOOP_STATE_FIELD_NAMES = [
  "loop_state_id",
  "engagement_ref",
  "stage",
  "readiness_ref",
  "onboarding_packet_ref",
  "evidence_refs",
  "review_gate_refs",
  "outcome_review_ref",
  "support_burden_ref",
  "boundary_flags",
] as const satisfies (keyof EngagementLoopState)[];

export const ENGAGEMENT_HISTORY_RECORD_FIELD_NAMES = [
  "history_record_id",
  "workspace_ref",
  "session_ref",
  "event_kind",
  "event_summary",
  "source_refs",
  "created_at",
  "boundary_flags",
] as const satisfies (keyof EngagementHistoryRecord)[];

export const V3_0_WORKSPACE_SOURCE_METADATA = {
  contract_version: "engagement-workspace-contract-v0.1",
  schema_version: "engagement-workspace-v3.0-impl-01",
  release_line: "v3.0-impl-01-engagement-workspace-contract",
  baseline_release_ref: "solocrew-v2.5-stable-semantic-stabilization-20260429",
  baseline_commit_ref: "4061f0df0cf6e5f151563c11ac94e27dabbd23b8",
  compatibility_profile: "v2.5-canonical-engagement-compatible",
} as const satisfies EngagementWorkspaceSourceMetadata;
