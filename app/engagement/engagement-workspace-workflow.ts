import type {
  CommercialMode,
  Engagement,
  EngagementId,
  EngagementParticipantId,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_STAGE_VALUES,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementSourceMetadata,
  MigrationRef,
} from "./engagement-metadata-contract.ts";
import {
  normalize_engagement_evidence_refs,
  normalize_engagement_operational_refs,
  normalize_engagement_release_metadata,
} from "./engagement-source-ref-normalizer.ts";
import type {
  EngagementHistoryEventKind,
  EngagementHistoryRecord,
  EngagementHistoryRecordId,
  EngagementHistorySourceRefs,
  EngagementLoopState,
  EngagementLoopStateId,
  EngagementSession,
  EngagementSessionId,
  EngagementSessionStatus,
  EngagementWorkspace,
  EngagementWorkspaceId,
  EngagementWorkspaceSourceMetadata,
} from "./engagement-workspace-contract.ts";
import {
  ENGAGEMENT_HISTORY_EVENT_KIND_VALUES,
  ENGAGEMENT_SESSION_STATUS_VALUES,
  ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS,
  ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
} from "./engagement-workspace-contract.ts";

type RefRecord = Record<string, unknown>;

export type EngagementWorkspaceSourceMetadataInput =
  Partial<EngagementWorkspaceSourceMetadata> & RefRecord;

export type CreateEngagementWorkspaceInput = {
  workspace_id: EngagementWorkspaceId;
  engagement?: Engagement;
  engagement_ref?: EngagementId;
  participant_refs?: EngagementParticipantId[];
  current_stage?: EngagementStage | string;
  commercial_mode?: CommercialMode | string;
  loop_state_ref: EngagementLoopStateId;
  history_refs?: EngagementHistoryRecordId[];
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateEngagementSessionInput = {
  session_id: EngagementSessionId;
  workspace_ref: EngagementWorkspaceId;
  operator_ref: EngagementParticipantId;
  started_at: string;
  status?: EngagementSessionStatus | string;
  current_stage: EngagementStage | string;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateEngagementLoopStateInput = {
  loop_state_id: EngagementLoopStateId;
  engagement_ref: EngagementId;
  stage: EngagementStage | string;
  readiness_ref?: string;
  onboarding_packet_ref?: string;
  evidence_refs?: string[];
  review_gate_refs?: string[];
  outcome_review_ref?: string;
  support_burden_ref?: string;
};

export type CreateEngagementHistoryRecordInput = {
  history_record_id: EngagementHistoryRecordId;
  workspace_ref: EngagementWorkspaceId;
  session_ref: EngagementSessionId;
  event_kind: EngagementHistoryEventKind | string;
  event_summary: string;
  source_refs?: EngagementHistorySourceRefs & RefRecord;
  created_at: string;
};

export type CreateEngagementWorkspaceBundleInput = {
  workspace_id: EngagementWorkspaceId;
  session_id: EngagementSessionId;
  loop_state_id: EngagementLoopStateId;
  history_record_id: EngagementHistoryRecordId;
  engagement?: Engagement;
  engagement_ref?: EngagementId;
  participant_refs?: EngagementParticipantId[];
  operator_ref: EngagementParticipantId;
  started_at: string;
  current_stage?: EngagementStage | string;
  commercial_mode?: CommercialMode | string;
  session_status?: EngagementSessionStatus | string;
  readiness_ref?: string;
  onboarding_packet_ref?: string;
  evidence_refs?: string[];
  review_gate_refs?: string[];
  outcome_review_ref?: string;
  support_burden_ref?: string;
  event_summary?: string;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type EngagementWorkspaceBundle = {
  workspace: EngagementWorkspace;
  session: EngagementSession;
  loop_state: EngagementLoopState;
  history_records: EngagementHistoryRecord[];
};

function assert_non_empty_string(value: string | undefined, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new RangeError(`${field} must be a non-empty string`);
  }

  return value;
}

function clone_migration_ref(
  migration_ref: MigrationRef | undefined
): MigrationRef | undefined {
  if (migration_ref === undefined) {
    return undefined;
  }

  return { ...migration_ref };
}

function read_string(input: RefRecord, field: string): string | undefined {
  const value = input[field];

  if (typeof value === "string" && value.length > 0) {
    return value;
  }

  return undefined;
}

function assert_engagement_stage(value: string | undefined): EngagementStage {
  const stage = assert_non_empty_string(value, "engagement stage");

  if (ENGAGEMENT_STAGE_VALUES.includes(stage as EngagementStage)) {
    return stage as EngagementStage;
  }

  throw new RangeError(`Unsupported engagement stage: ${stage}`);
}

function assert_commercial_mode(value: string | undefined): CommercialMode {
  const mode = assert_non_empty_string(value, "commercial mode");

  if (COMMERCIAL_MODE_VALUES.includes(mode as CommercialMode)) {
    return mode as CommercialMode;
  }

  throw new RangeError(`Unsupported commercial mode: ${mode}`);
}

function assert_session_status(
  value: string | undefined
): EngagementSessionStatus {
  const status = assert_non_empty_string(value, "engagement session status");

  if (ENGAGEMENT_SESSION_STATUS_VALUES.includes(status as EngagementSessionStatus)) {
    return status as EngagementSessionStatus;
  }

  throw new RangeError(`Unsupported engagement session status: ${status}`);
}

function assert_history_event_kind(
  value: string | undefined
): EngagementHistoryEventKind {
  const event_kind = assert_non_empty_string(value, "engagement history event kind");

  if (
    ENGAGEMENT_HISTORY_EVENT_KIND_VALUES.includes(
      event_kind as EngagementHistoryEventKind
    )
  ) {
    return event_kind as EngagementHistoryEventKind;
  }

  throw new RangeError(`Unsupported engagement history event kind: ${event_kind}`);
}

function sort_unique_strings(values: string[] | undefined): string[] {
  return [...new Set(values ?? [])].sort();
}

function create_source_metadata(
  input: EngagementWorkspaceSourceMetadataInput = {}
): EngagementWorkspaceSourceMetadata {
  const release_metadata = normalize_engagement_release_metadata(input, {
    ...ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
  } satisfies EngagementSourceMetadata);

  return {
    ...release_metadata,
    compatibility_profile:
      read_string(input, "compatibility_profile") ??
      ENGAGEMENT_WORKSPACE_SOURCE_METADATA.compatibility_profile,
    migration_from: clone_migration_ref(input.migration_from),
    migration_to: clone_migration_ref(input.migration_to),
  };
}

function create_boundary_flags() {
  return { ...ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS };
}

function derive_engagement_ref(input: {
  engagement?: Engagement;
  engagement_ref?: EngagementId;
}): EngagementId {
  return assert_non_empty_string(
    input.engagement_ref ?? input.engagement?.engagement_id,
    "engagement_ref"
  );
}

function derive_participant_refs(input: {
  engagement?: Engagement;
  participant_refs?: EngagementParticipantId[];
}): EngagementParticipantId[] {
  return sort_unique_strings(input.participant_refs ?? input.engagement?.participant_ids);
}

function derive_source_metadata_input(input: {
  engagement?: Engagement;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
}): EngagementWorkspaceSourceMetadataInput {
  return input.source_metadata ?? input.engagement?.metadata ?? {};
}

export function create_engagement_workspace(
  input: CreateEngagementWorkspaceInput
): EngagementWorkspace {
  const engagement_ref = derive_engagement_ref(input);
  const current_stage = assert_engagement_stage(
    input.current_stage ?? input.engagement?.stage
  );
  const commercial_mode = assert_commercial_mode(
    input.commercial_mode ?? input.engagement?.commercial_mode
  );

  return {
    workspace_id: assert_non_empty_string(input.workspace_id, "workspace_id"),
    engagement_ref,
    participant_refs: derive_participant_refs(input),
    current_stage,
    commercial_mode,
    loop_state_ref: assert_non_empty_string(input.loop_state_ref, "loop_state_ref"),
    history_refs: sort_unique_strings(input.history_refs),
    source_metadata: create_source_metadata(derive_source_metadata_input(input)),
    boundary_flags: create_boundary_flags(),
  };
}

export function create_engagement_session(
  input: CreateEngagementSessionInput
): EngagementSession {
  return {
    session_id: assert_non_empty_string(input.session_id, "session_id"),
    workspace_ref: assert_non_empty_string(input.workspace_ref, "workspace_ref"),
    operator_ref: assert_non_empty_string(input.operator_ref, "operator_ref"),
    started_at: assert_non_empty_string(input.started_at, "started_at"),
    status: assert_session_status(input.status ?? "draft"),
    current_stage: assert_engagement_stage(input.current_stage),
    source_metadata: create_source_metadata(input.source_metadata),
    boundary_flags: create_boundary_flags(),
  };
}

export function create_engagement_loop_state(
  input: CreateEngagementLoopStateInput
): EngagementLoopState {
  return {
    loop_state_id: assert_non_empty_string(input.loop_state_id, "loop_state_id"),
    engagement_ref: assert_non_empty_string(input.engagement_ref, "engagement_ref"),
    stage: assert_engagement_stage(input.stage),
    readiness_ref: input.readiness_ref,
    onboarding_packet_ref: input.onboarding_packet_ref,
    evidence_refs: sort_unique_strings(input.evidence_refs),
    review_gate_refs: sort_unique_strings(input.review_gate_refs),
    outcome_review_ref: input.outcome_review_ref,
    support_burden_ref: input.support_burden_ref,
    boundary_flags: create_boundary_flags(),
  };
}

export function create_engagement_history_record(
  input: CreateEngagementHistoryRecordInput
): EngagementHistoryRecord {
  const source_refs = input.source_refs ?? {};

  return {
    history_record_id: assert_non_empty_string(
      input.history_record_id,
      "history_record_id"
    ),
    workspace_ref: assert_non_empty_string(input.workspace_ref, "workspace_ref"),
    session_ref: assert_non_empty_string(input.session_ref, "session_ref"),
    event_kind: assert_history_event_kind(input.event_kind),
    event_summary: assert_non_empty_string(input.event_summary, "event_summary"),
    source_refs: {
      ...normalize_engagement_evidence_refs(source_refs),
      ...normalize_engagement_operational_refs(source_refs),
    },
    created_at: assert_non_empty_string(input.created_at, "created_at"),
    boundary_flags: create_boundary_flags(),
  };
}

export function create_engagement_workspace_bundle(
  input: CreateEngagementWorkspaceBundleInput
): EngagementWorkspaceBundle {
  const engagement_ref = derive_engagement_ref(input);
  const current_stage = assert_engagement_stage(
    input.current_stage ?? input.engagement?.stage
  );
  const commercial_mode = assert_commercial_mode(
    input.commercial_mode ?? input.engagement?.commercial_mode
  );
  const participant_refs = derive_participant_refs(input);
  const source_metadata = derive_source_metadata_input(input);

  const loop_state = create_engagement_loop_state({
    loop_state_id: input.loop_state_id,
    engagement_ref,
    stage: current_stage,
    readiness_ref: input.readiness_ref,
    onboarding_packet_ref: input.onboarding_packet_ref,
    evidence_refs: input.evidence_refs,
    review_gate_refs: input.review_gate_refs,
    outcome_review_ref: input.outcome_review_ref,
    support_burden_ref: input.support_burden_ref,
  });
  const workspace = create_engagement_workspace({
    workspace_id: input.workspace_id,
    engagement_ref,
    participant_refs,
    current_stage,
    commercial_mode,
    loop_state_ref: loop_state.loop_state_id,
    history_refs: [input.history_record_id],
    source_metadata,
  });
  const session = create_engagement_session({
    session_id: input.session_id,
    workspace_ref: workspace.workspace_id,
    operator_ref: input.operator_ref,
    started_at: input.started_at,
    status: input.session_status ?? "active",
    current_stage,
    source_metadata,
  });
  const history_record = create_engagement_history_record({
    history_record_id: input.history_record_id,
    workspace_ref: workspace.workspace_id,
    session_ref: session.session_id,
    event_kind: "workspace_created",
    event_summary:
      input.event_summary ??
      "Workspace contract bundle created for local review-only engagement.",
    source_refs: {
      engagement_ref,
      workspace_ref: workspace.workspace_id,
      participant_ref: input.operator_ref,
      ...source_metadata,
    },
    created_at: input.started_at,
  });

  return {
    workspace,
    session,
    loop_state,
    history_records: [history_record],
  };
}
