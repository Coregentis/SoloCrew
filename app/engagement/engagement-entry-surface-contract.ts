import type {
  CommercialMode,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementWorkspaceBoundaryFlags,
  EngagementWorkspaceId,
  EngagementWorkspaceSourceMetadata,
  EngagementSessionId,
} from "./engagement-workspace-contract.ts";
import {
  ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
} from "./engagement-workspace-contract.ts";

export type EngagementEntrySurfaceId = string;

export type EngagementEntrySurfaceMode =
  | "create_local_engagement"
  | "load_local_engagement"
  | "review_existing_workspace";

export type EngagementEntrySurfaceStatus =
  | "draft"
  | "ready_for_review"
  | "loaded"
  | "blocked";

export type EngagementEntrySurfaceAction =
  | "create_workspace_locally"
  | "load_workspace_locally"
  | "review_workspace_locally"
  | "return_to_operator";

export type EngagementEntrySurfaceBoundaryFlags =
  & EngagementWorkspaceBoundaryFlags
  & {
    no_persistence_infrastructure: true;
  };

export type EngagementEntryCreateInput = {
  surface_id: EngagementEntrySurfaceId;
  workspace_id: EngagementWorkspaceId;
  session_id: EngagementSessionId;
  loop_state_id: string;
  history_record_id: string;
  engagement_ref: string;
  participant_refs: string[];
  operator_ref: string;
  started_at: string;
  current_stage: EngagementStage | string;
  commercial_mode: CommercialMode | string;
  source_metadata?: Partial<EngagementWorkspaceSourceMetadata>;
};

export type EngagementEntryLoadInput = {
  surface_id: EngagementEntrySurfaceId;
  loaded_at: string;
  operator_ref: string;
};

export type EngagementEntrySurfaceModel = {
  surface_id: EngagementEntrySurfaceId;
  mode: EngagementEntrySurfaceMode;
  status: EngagementEntrySurfaceStatus;
  workspace_ref: EngagementWorkspaceId | null;
  session_ref: EngagementSessionId | null;
  current_stage: EngagementStage;
  commercial_mode: CommercialMode;
  available_actions: EngagementEntrySurfaceAction[];
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: EngagementEntrySurfaceBoundaryFlags;
};

export type EngagementEntrySurfaceResult = {
  result_id: string;
  status: EngagementEntrySurfaceStatus;
  surface_model: EngagementEntrySurfaceModel;
  workspace_ref: EngagementWorkspaceId | null;
  session_ref: EngagementSessionId | null;
  result_summary: string;
  boundary_flags: EngagementEntrySurfaceBoundaryFlags;
};

export const ENGAGEMENT_ENTRY_SURFACE_MODE_VALUES = [
  "create_local_engagement",
  "load_local_engagement",
  "review_existing_workspace",
] as const satisfies EngagementEntrySurfaceMode[];

export const ENGAGEMENT_ENTRY_SURFACE_STATUS_VALUES = [
  "draft",
  "ready_for_review",
  "loaded",
  "blocked",
] as const satisfies EngagementEntrySurfaceStatus[];

export const ENGAGEMENT_ENTRY_SURFACE_ACTION_VALUES = [
  "create_workspace_locally",
  "load_workspace_locally",
  "review_workspace_locally",
  "return_to_operator",
] as const satisfies EngagementEntrySurfaceAction[];

export const ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAGS = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  no_external_service: true,
  no_persistence_infrastructure: true,
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
} as const satisfies EngagementEntrySurfaceBoundaryFlags;

export const ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAG_NAMES = [
  "local_only",
  "manual_first",
  "review_only",
  "deterministic",
  "non_executing",
  "no_external_service",
  "no_persistence_infrastructure",
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
] as const satisfies (keyof EngagementEntrySurfaceBoundaryFlags)[];

export const ENGAGEMENT_ENTRY_SURFACE_FIELD_NAMES = [
  "surface_id",
  "mode",
  "status",
  "workspace_ref",
  "session_ref",
  "current_stage",
  "commercial_mode",
  "available_actions",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof EngagementEntrySurfaceModel)[];

export const ENGAGEMENT_ENTRY_SURFACE_RESULT_FIELD_NAMES = [
  "result_id",
  "status",
  "surface_model",
  "workspace_ref",
  "session_ref",
  "result_summary",
  "boundary_flags",
] as const satisfies (keyof EngagementEntrySurfaceResult)[];

export const ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA = {
  ...ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
  contract_version: "engagement-entry-surface-contract-v0.1",
  schema_version: "engagement-entry-surface-v3.0-impl-02",
  release_line: "v3.0-impl-02-engagement-entry-surface",
} as const satisfies EngagementWorkspaceSourceMetadata;
