import type {
  EngagementLoopRunnerResult,
} from "./engagement-loop-runner-contract.ts";
import type {
  EngagementSessionExportPackage,
  EngagementHistoryLedger,
} from "./engagement-session-history-contract.ts";
import type {
  EngagementLoopState,
  EngagementSession,
  EngagementWorkspace,
  EngagementWorkspaceSourceMetadata,
} from "./engagement-workspace-contract.ts";
import type {
  FounderReviewPacket,
} from "./founder-review-packet-contract.ts";

export type SoloCrewCgosReviewLoopAdapterStatus =
  | "draft"
  | "adapter_ready"
  | "blocked"
  | "archived";

export type SoloCrewCgosReviewStepStatus =
  | "pending"
  | "reviewed"
  | "skipped"
  | "blocked";

export type SoloCrewCgosEvidenceBundleKind =
  | "in_memory_evidence_bundle"
  | "deterministic_summary_bundle"
  | "audit_snapshot_bundle";

export type SoloCrewCgosRuntimeBoundaryProfile =
  & Record<string, unknown>
  & Partial<{
    local_only: true;
    manual_first: true;
    review_only: true;
    deterministic: true;
    non_executing: true;
    runtime_private_payload_omitted: true;
    projection_safe: true;
    no_external_service: true;
    no_filesystem_write: true;
    no_database_storage: true;
    no_persistence_adapter: true;
    no_file_export_path: true;
    no_cloud_sync: true;
    no_provider_dispatch: true;
    no_channel_dispatch: true;
    no_marketplace: true;
    no_crm: true;
    no_email_dispatch: true;
    no_public_publishing: true;
    no_payment: true;
    no_llm_or_tool_invocation: true;
    no_autonomy: true;
    no_package_publish: true;
    no_certification_or_endorsement: true;
  }>;

export type SoloCrewCgosProjectionSafeRef = {
  marker: string;
  reason?: string;
};

export type SoloCrewCgosVersionRefs = {
  protocol_version_ref?: string;
  binding_version_ref?: string;
  runtime_version_ref?: string;
};

export type SoloCrewCgosWorkspaceSource = {
  workspace_id: string;
  status?: string;
  session_refs: readonly string[];
  state_snapshot_ref: string;
  evidence_refs: readonly string[];
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosSessionSource = {
  session_id: string;
  status?: string;
  workspace_ref: string;
  review_loop_ref: string;
  evidence_refs: readonly string[];
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosLoopStateSource = {
  loop_state_id: string;
  status?: string;
  workspace_ref: string;
  session_ref: string;
  reviewed_step_refs: readonly string[];
  blocked_step_refs: readonly string[];
  evidence_refs: readonly string[];
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosReviewStepRef = {
  step_ref: string;
  status: SoloCrewCgosReviewStepStatus;
};

export type SoloCrewCgosRunnerSource = {
  runner_id: string;
  status?: string;
  loop_state_ref: string;
  step_refs: readonly SoloCrewCgosReviewStepRef[];
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosReviewPacketSource = {
  packet_id: string;
  status?: string;
  loop_state_ref: string;
  reviewed_step_refs: readonly string[];
  blocked_step_refs: readonly string[];
  manual_decision_options: readonly string[];
  evidence_refs: readonly string[];
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosEvidenceLedgerSource = {
  ledger_id: string;
  status?: string;
  session_ref: string;
  entry_refs: readonly string[];
  latest_packet_ref: string;
  latest_bundle_ref: string;
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosEvidenceBundleSource = {
  bundle_id: string;
  bundle_kind: SoloCrewCgosEvidenceBundleKind;
  status?: string;
  ledger_ref: string;
  packet_ref: string;
  evidence_refs: readonly string[];
  summary: string;
  boundary_profile?: SoloCrewCgosRuntimeBoundaryProfile;
  projection_envelope_ref: string;
  runtime_private_fields_omitted?: true;
  non_executing?: true;
};

export type SoloCrewCgosReviewLoopAdapterInput = {
  cgos_result_ref: string;
  cgos_projection_handoff_ref: string;
  cgos_boundary_profile: SoloCrewCgosRuntimeBoundaryProfile;
  cgos_workspace: SoloCrewCgosWorkspaceSource;
  cgos_session: SoloCrewCgosSessionSource;
  cgos_loop_state: SoloCrewCgosLoopStateSource;
  cgos_runner: SoloCrewCgosRunnerSource;
  cgos_review_packet: SoloCrewCgosReviewPacketSource;
  cgos_evidence_ledger: SoloCrewCgosEvidenceLedgerSource;
  cgos_evidence_bundle: SoloCrewCgosEvidenceBundleSource;
  cgos_omission_markers: readonly SoloCrewCgosProjectionSafeRef[];
  cgos_evidence_refs: readonly string[];
  cgos_version_refs: SoloCrewCgosVersionRefs;
};

export type SoloCrewCgosReviewLoopAdapterBoundaryFlags = {
  local_only: true;
  manual_first: true;
  review_only: true;
  deterministic: true;
  non_executing: true;
  projection_safe: true;
  runtime_private_fields_omitted: true;
  no_external_service: true;
  no_file_system_write: true;
  no_database_storage: true;
  no_persistence_adapter: true;
  no_file_export_path: true;
  no_cloud_sync: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace: true;
  no_crm: true;
  no_email_dispatch: true;
  no_public_publishing: true;
  no_payment: true;
  no_llm_or_tool_invocation: true;
  no_autonomy: true;
  no_package_publish: true;
  no_mplp_certification_or_endorsement: true;
  no_public_beta: true;
  no_private_beta: true;
  no_paid_product_readiness: true;
  no_commercial_readiness: true;
  no_production_readiness: true;
};

export type SoloCrewCgosBoundaryFlagName =
  keyof SoloCrewCgosReviewLoopAdapterBoundaryFlags;

export type SoloCrewCgosBoundaryTranslation = {
  translated_flags: SoloCrewCgosReviewLoopAdapterBoundaryFlags;
  direct_mappings: readonly {
    cgos_flag: string;
    solocrew_flag: SoloCrewCgosBoundaryFlagName;
  }[];
  unmatched_cgos_flags: readonly string[];
  preserved_unmatched_cgos_flags: Readonly<Record<string, true>>;
  missing_or_non_true_cgos_flags: readonly string[];
  boundary_notes: readonly string[];
};

export type SoloCrewCgosProjectionSafeSource =
  & EngagementWorkspaceSourceMetadata
  & {
    adapter_source_kind: "cgos_projection_safe_operator_review_loop";
    cgos_result_ref: string;
    projection_safe_handoff_ref: string;
    cgos_omission_markers: readonly string[];
    cgos_evidence_refs: readonly string[];
    cgos_version_refs: SoloCrewCgosVersionRefs;
    cgos_import_posture: "structural_projection_safe_input";
    runtime_private_fields_omitted: true;
    non_executing: true;
  };

export type SoloCrewCgosAdapterCandidateSet = {
  engagement_workspace_candidate: EngagementWorkspace;
  engagement_session_candidate: EngagementSession;
  engagement_loop_state_candidate: EngagementLoopState;
  engagement_loop_runner_candidate: EngagementLoopRunnerResult;
  founder_review_packet_candidate: FounderReviewPacket;
  engagement_history_ledger_candidate: EngagementHistoryLedger;
  engagement_session_export_package_candidate: EngagementSessionExportPackage;
};

export type SoloCrewCgosReviewLoopAdapterResult =
  & SoloCrewCgosAdapterCandidateSet
  & {
    adapter_result_id: string;
    status: SoloCrewCgosReviewLoopAdapterStatus;
    cgos_result_ref: string;
    projection_safe_handoff_ref: string;
    boundary_flags: SoloCrewCgosReviewLoopAdapterBoundaryFlags;
    boundary_translation: SoloCrewCgosBoundaryTranslation;
    source_metadata: SoloCrewCgosProjectionSafeSource;
    adapter_summary: string;
  };

export const SOLOCREW_CGOS_REVIEW_LOOP_ADAPTER_STATUS_VALUES = [
  "draft",
  "adapter_ready",
  "blocked",
  "archived",
] as const satisfies SoloCrewCgosReviewLoopAdapterStatus[];

export const SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAGS = {
  local_only: true,
  manual_first: true,
  review_only: true,
  deterministic: true,
  non_executing: true,
  projection_safe: true,
  runtime_private_fields_omitted: true,
  no_external_service: true,
  no_file_system_write: true,
  no_database_storage: true,
  no_persistence_adapter: true,
  no_file_export_path: true,
  no_cloud_sync: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace: true,
  no_crm: true,
  no_email_dispatch: true,
  no_public_publishing: true,
  no_payment: true,
  no_llm_or_tool_invocation: true,
  no_autonomy: true,
  no_package_publish: true,
  no_mplp_certification_or_endorsement: true,
  no_public_beta: true,
  no_private_beta: true,
  no_paid_product_readiness: true,
  no_commercial_readiness: true,
  no_production_readiness: true,
} as const satisfies SoloCrewCgosReviewLoopAdapterBoundaryFlags;

export const SOLOCREW_CGOS_ADAPTER_BOUNDARY_FLAG_NAMES = [
  "local_only",
  "manual_first",
  "review_only",
  "deterministic",
  "non_executing",
  "projection_safe",
  "runtime_private_fields_omitted",
  "no_external_service",
  "no_file_system_write",
  "no_database_storage",
  "no_persistence_adapter",
  "no_file_export_path",
  "no_cloud_sync",
  "no_provider_dispatch",
  "no_channel_dispatch",
  "no_marketplace",
  "no_crm",
  "no_email_dispatch",
  "no_public_publishing",
  "no_payment",
  "no_llm_or_tool_invocation",
  "no_autonomy",
  "no_package_publish",
  "no_mplp_certification_or_endorsement",
  "no_public_beta",
  "no_private_beta",
  "no_paid_product_readiness",
  "no_commercial_readiness",
  "no_production_readiness",
] as const satisfies SoloCrewCgosBoundaryFlagName[];
