import type {
  EngagementId,
} from "./engagement-canonical-contract.ts";
import type {
  FounderReviewPacketId,
} from "./founder-review-packet-contract.ts";
import {
  FOUNDER_REVIEW_PACKET_SOURCE_METADATA,
} from "./founder-review-packet-contract.ts";
import type {
  EngagementEntrySurfaceId,
} from "./engagement-entry-surface-contract.ts";
import type {
  EngagementLoopRunId,
  EngagementLoopStepId,
} from "./engagement-loop-runner-contract.ts";
import type {
  EngagementSessionId,
  EngagementWorkspaceId,
  EngagementWorkspaceSourceMetadata,
} from "./engagement-workspace-contract.ts";

export type EngagementHistoryLedgerId = string;
export type EngagementSessionExportId = string;
export type EngagementHistoryEntryId = string;

export type EngagementSessionHistoryStatus =
  | "draft"
  | "assembled"
  | "export_ready"
  | "blocked"
  | "archived";

export type EngagementSessionExportStatus =
  | "draft"
  | "ready_for_local_review"
  | "blocked"
  | "archived";

export type EngagementSessionExportKind =
  | "in_memory_export_object"
  | "deterministic_summary_object"
  | "audit_snapshot_object";

export type EngagementHistoryEntryKind =
  | "workspace_created"
  | "entry_surface_created"
  | "loop_run_completed"
  | "founder_review_packet_created"
  | "export_package_created"
  | "blocked";

export type EngagementSessionHistoryBoundaryFlags = {
  local_only: true;
  manual_first: true;
  review_only: true;
  deterministic: true;
  non_executing: true;
  no_external_service: true;
  no_file_system_write: true;
  no_database_storage: true;
  no_persistence_adapter: true;
  no_file_export_path: true;
  no_cloud_sync: true;
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

export type EngagementSessionHistorySourceRefs = {
  entry_surface_ref?: EngagementEntrySurfaceId | null;
  workspace_ref?: EngagementWorkspaceId | null;
  session_ref?: EngagementSessionId | null;
  engagement_ref?: EngagementId | null;
  packet_ref?: FounderReviewPacketId | null;
  loop_run_ref?: EngagementLoopRunId | null;
  loop_step_refs?: EngagementLoopStepId[];
};

export type EngagementHistoryLedger = {
  ledger_id: EngagementHistoryLedgerId;
  status: EngagementSessionHistoryStatus;
  workspace_ref: EngagementWorkspaceId | null;
  session_ref: EngagementSessionId | null;
  engagement_ref: EngagementId | null;
  entry_refs: EngagementHistoryEntryId[];
  latest_packet_ref: FounderReviewPacketId | null;
  latest_loop_run_ref: EngagementLoopRunId | null;
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: EngagementSessionHistoryBoundaryFlags;
};

export type EngagementHistoryEntry = {
  entry_id: EngagementHistoryEntryId;
  entry_kind: EngagementHistoryEntryKind;
  event_summary: string;
  source_refs: EngagementSessionHistorySourceRefs;
  created_at: string;
  boundary_flags: EngagementSessionHistoryBoundaryFlags;
};

export type EngagementSessionExportPackage = {
  export_id: EngagementSessionExportId;
  export_kind: EngagementSessionExportKind;
  status: EngagementSessionExportStatus;
  ledger_ref: EngagementHistoryLedgerId;
  workspace_ref: EngagementWorkspaceId | null;
  session_ref: EngagementSessionId | null;
  engagement_ref: EngagementId | null;
  packet_ref: FounderReviewPacketId | null;
  loop_run_ref: EngagementLoopRunId | null;
  history_entry_refs: EngagementHistoryEntryId[];
  export_summary: string;
  source_refs: EngagementSessionHistorySourceRefs;
  source_metadata: EngagementWorkspaceSourceMetadata;
  boundary_flags: EngagementSessionHistoryBoundaryFlags;
};

export type EngagementSessionHistoryResult = {
  result_id: string;
  ledger: EngagementHistoryLedger;
  entries: EngagementHistoryEntry[];
  export_package: EngagementSessionExportPackage;
  result_summary: string;
  boundary_flags: EngagementSessionHistoryBoundaryFlags;
};

export const ENGAGEMENT_SESSION_HISTORY_STATUS_VALUES = [
  "draft",
  "assembled",
  "export_ready",
  "blocked",
  "archived",
] as const satisfies EngagementSessionHistoryStatus[];

export const ENGAGEMENT_SESSION_EXPORT_STATUS_VALUES = [
  "draft",
  "ready_for_local_review",
  "blocked",
  "archived",
] as const satisfies EngagementSessionExportStatus[];

export const ENGAGEMENT_SESSION_EXPORT_KIND_VALUES = [
  "in_memory_export_object",
  "deterministic_summary_object",
  "audit_snapshot_object",
] as const satisfies EngagementSessionExportKind[];

export const ENGAGEMENT_HISTORY_ENTRY_KIND_VALUES = [
  "workspace_created",
  "entry_surface_created",
  "loop_run_completed",
  "founder_review_packet_created",
  "export_package_created",
  "blocked",
] as const satisfies EngagementHistoryEntryKind[];

export const ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAGS = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  no_external_service: true,
  no_file_system_write: true,
  no_database_storage: true,
  no_persistence_adapter: true,
  no_file_export_path: true,
  no_cloud_sync: true,
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
} as const satisfies EngagementSessionHistoryBoundaryFlags;

export const ENGAGEMENT_SESSION_HISTORY_BOUNDARY_FLAG_NAMES = [
  "local_only",
  "manual_first",
  "review_only",
  "deterministic",
  "non_executing",
  "no_external_service",
  "no_file_system_write",
  "no_database_storage",
  "no_persistence_adapter",
  "no_file_export_path",
  "no_cloud_sync",
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
] as const satisfies (keyof EngagementSessionHistoryBoundaryFlags)[];

export const ENGAGEMENT_HISTORY_LEDGER_FIELD_NAMES = [
  "ledger_id",
  "status",
  "workspace_ref",
  "session_ref",
  "engagement_ref",
  "entry_refs",
  "latest_packet_ref",
  "latest_loop_run_ref",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof EngagementHistoryLedger)[];

export const ENGAGEMENT_HISTORY_ENTRY_FIELD_NAMES = [
  "entry_id",
  "entry_kind",
  "event_summary",
  "source_refs",
  "created_at",
  "boundary_flags",
] as const satisfies (keyof EngagementHistoryEntry)[];

export const ENGAGEMENT_SESSION_EXPORT_PACKAGE_FIELD_NAMES = [
  "export_id",
  "export_kind",
  "status",
  "ledger_ref",
  "workspace_ref",
  "session_ref",
  "engagement_ref",
  "packet_ref",
  "loop_run_ref",
  "history_entry_refs",
  "export_summary",
  "source_refs",
  "source_metadata",
  "boundary_flags",
] as const satisfies (keyof EngagementSessionExportPackage)[];

export const ENGAGEMENT_SESSION_HISTORY_RESULT_FIELD_NAMES = [
  "result_id",
  "ledger",
  "entries",
  "export_package",
  "result_summary",
  "boundary_flags",
] as const satisfies (keyof EngagementSessionHistoryResult)[];

export const ENGAGEMENT_SESSION_HISTORY_SOURCE_METADATA = {
  ...FOUNDER_REVIEW_PACKET_SOURCE_METADATA,
  contract_version: "engagement-session-history-contract-v0.1",
  schema_version: "engagement-session-history-v3.0-impl-05",
  release_line: "v3.0-impl-05-session-history-in-memory-export",
} as const satisfies EngagementWorkspaceSourceMetadata;
