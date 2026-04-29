import type {
  CommercialMode,
  EngagementId,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementEntrySurfaceBoundaryFlags,
  EngagementEntrySurfaceId,
} from "./engagement-entry-surface-contract.ts";
import {
  ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA,
} from "./engagement-entry-surface-contract.ts";
import type {
  EngagementHistoryRecordId,
  EngagementLoopStateId,
  EngagementSessionId,
  EngagementWorkspaceId,
  EngagementWorkspaceSourceMetadata,
} from "./engagement-workspace-contract.ts";

export type EngagementLoopRunnerId = string;
export type EngagementLoopRunId = string;
export type EngagementLoopStepId = string;

export type EngagementLoopRunStatus =
  | "draft"
  | "review_running"
  | "review_ready"
  | "blocked"
  | "closed";

export type EngagementLoopStepKind =
  | "entry_surface_loaded"
  | "workspace_loaded"
  | "session_checked"
  | "loop_state_checked"
  | "onboarding_reviewed"
  | "evidence_reviewed"
  | "readiness_reviewed"
  | "review_gate_reviewed"
  | "outcome_review_pending"
  | "founder_review_requested"
  | "blocked";

export type EngagementLoopStepStatus =
  | "pending"
  | "reviewed"
  | "skipped"
  | "blocked";

export type EngagementLoopRunnerBoundaryFlags =
  & EngagementEntrySurfaceBoundaryFlags
  & {
    no_review_packet_output: true;
  };

export type EngagementLoopStepSourceRefs = {
  entry_surface_ref?: EngagementEntrySurfaceId;
  workspace_ref?: EngagementWorkspaceId;
  session_ref?: EngagementSessionId;
  loop_state_ref?: EngagementLoopStateId;
  history_record_ref?: EngagementHistoryRecordId;
  engagement_ref?: EngagementId;
  onboarding_packet_ref?: string;
  readiness_ref?: string;
  evidence_refs?: string[];
  review_gate_refs?: string[];
  outcome_review_ref?: string;
  support_burden_ref?: string;
};

export type EngagementLoopRun = {
  run_id: EngagementLoopRunId;
  runner_id: EngagementLoopRunnerId;
  status: EngagementLoopRunStatus;
  workspace_ref: EngagementWorkspaceId | null;
  session_ref: EngagementSessionId | null;
  engagement_ref: EngagementId | null;
  current_stage: EngagementStage;
  commercial_mode: CommercialMode;
  step_refs: EngagementLoopStepId[];
  reviewed_step_count: number;
  blocked_step_count: number;
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: EngagementLoopRunnerBoundaryFlags;
};

export type EngagementLoopStep = {
  step_id: EngagementLoopStepId;
  run_ref: EngagementLoopRunId;
  step_kind: EngagementLoopStepKind;
  status: EngagementLoopStepStatus;
  step_summary: string;
  source_refs: EngagementLoopStepSourceRefs;
  reviewed_at: string;
  boundary_flags: EngagementLoopRunnerBoundaryFlags;
};

export type EngagementLoopRunnerInput = {
  runner_id: EngagementLoopRunnerId;
  run_id: EngagementLoopRunId;
  reviewed_at: string;
  workspace_bundle_ref?: EngagementWorkspaceId | null;
  entry_surface_ref?: EngagementEntrySurfaceId | null;
  source_metadata?: Partial<EngagementWorkspaceSourceMetadata>;
};

export type EngagementLoopRunnerResult = {
  result_id: string;
  run: EngagementLoopRun;
  steps: EngagementLoopStep[];
  workspace_bundle_ref: EngagementWorkspaceId | null;
  entry_surface_ref: EngagementEntrySurfaceId | null;
  result_summary: string;
  boundary_flags: EngagementLoopRunnerBoundaryFlags;
};

export const ENGAGEMENT_LOOP_RUN_STATUS_VALUES = [
  "draft",
  "review_running",
  "review_ready",
  "blocked",
  "closed",
] as const satisfies EngagementLoopRunStatus[];

export const ENGAGEMENT_LOOP_STEP_KIND_VALUES = [
  "entry_surface_loaded",
  "workspace_loaded",
  "session_checked",
  "loop_state_checked",
  "onboarding_reviewed",
  "evidence_reviewed",
  "readiness_reviewed",
  "review_gate_reviewed",
  "outcome_review_pending",
  "founder_review_requested",
  "blocked",
] as const satisfies EngagementLoopStepKind[];

export const ENGAGEMENT_LOOP_STEP_STATUS_VALUES = [
  "pending",
  "reviewed",
  "skipped",
  "blocked",
] as const satisfies EngagementLoopStepStatus[];

export const ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  no_external_service: true,
  no_persistence_infrastructure: true,
  no_review_packet_output: true,
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
} as const satisfies EngagementLoopRunnerBoundaryFlags;

export const ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAG_NAMES = [
  "local_only",
  "manual_first",
  "review_only",
  "deterministic",
  "non_executing",
  "no_external_service",
  "no_persistence_infrastructure",
  "no_review_packet_output",
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
] as const satisfies (keyof EngagementLoopRunnerBoundaryFlags)[];

export const ENGAGEMENT_LOOP_RUN_FIELD_NAMES = [
  "run_id",
  "runner_id",
  "status",
  "workspace_ref",
  "session_ref",
  "engagement_ref",
  "current_stage",
  "commercial_mode",
  "step_refs",
  "reviewed_step_count",
  "blocked_step_count",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof EngagementLoopRun)[];

export const ENGAGEMENT_LOOP_STEP_FIELD_NAMES = [
  "step_id",
  "run_ref",
  "step_kind",
  "status",
  "step_summary",
  "source_refs",
  "reviewed_at",
  "boundary_flags",
] as const satisfies (keyof EngagementLoopStep)[];

export const ENGAGEMENT_LOOP_RUNNER_RESULT_FIELD_NAMES = [
  "result_id",
  "run",
  "steps",
  "workspace_bundle_ref",
  "entry_surface_ref",
  "result_summary",
  "boundary_flags",
] as const satisfies (keyof EngagementLoopRunnerResult)[];

export const ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA = {
  ...ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA,
  contract_version: "engagement-loop-runner-contract-v0.1",
  schema_version: "engagement-loop-runner-v3.0-impl-03",
  release_line: "v3.0-impl-03-review-only-engagement-loop-runner",
} as const satisfies EngagementWorkspaceSourceMetadata;
