import type {
  CommercialMode,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_STAGE_VALUES,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementWorkspaceBundle,
  EngagementWorkspaceSourceMetadataInput,
} from "./engagement-workspace-workflow.ts";
import {
  create_engagement_workspace_bundle,
} from "./engagement-workspace-workflow.ts";
import type {
  EngagementEntryCreateInput,
  EngagementEntryLoadInput,
  EngagementEntrySurfaceAction,
  EngagementEntrySurfaceBoundaryFlags,
  EngagementEntrySurfaceMode,
  EngagementEntrySurfaceModel,
  EngagementEntrySurfaceResult,
  EngagementEntrySurfaceStatus,
} from "./engagement-entry-surface-contract.ts";
import {
  ENGAGEMENT_ENTRY_SURFACE_ACTION_VALUES,
  ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAGS,
  ENGAGEMENT_ENTRY_SURFACE_MODE_VALUES,
  ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA,
  ENGAGEMENT_ENTRY_SURFACE_STATUS_VALUES,
} from "./engagement-entry-surface-contract.ts";
import type {
  EngagementWorkspaceId,
  EngagementSessionId,
} from "./engagement-workspace-contract.ts";

export type CreateEngagementEntrySurfaceModelInput = {
  surface_id: string;
  mode: EngagementEntrySurfaceMode | string;
  status?: EngagementEntrySurfaceStatus | string;
  workspace_ref?: EngagementWorkspaceId | null;
  session_ref?: EngagementSessionId | null;
  current_stage: EngagementStage | string;
  commercial_mode: CommercialMode | string;
  available_actions?: (EngagementEntrySurfaceAction | string)[];
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateLocalEngagementWorkspaceFromEntryInput =
  & EngagementEntryCreateInput
  & {
    readiness_ref?: string;
    onboarding_packet_ref?: string;
    evidence_refs?: string[];
    review_gate_refs?: string[];
    outcome_review_ref?: string;
    support_burden_ref?: string;
    event_summary?: string;
  };

export type LoadLocalEngagementWorkspaceFromEntryInput =
  & EngagementEntryLoadInput
  & {
    workspace_bundle: EngagementWorkspaceBundle;
  };

export type CreateEngagementEntrySurfaceResultInput = {
  result_id: string;
  status: EngagementEntrySurfaceStatus | string;
  surface_model: EngagementEntrySurfaceModel;
  result_summary: string;
};

export type EngagementEntryWorkspaceResult =
  & EngagementEntrySurfaceResult
  & {
    workspace_bundle: EngagementWorkspaceBundle | null;
  };

function assert_non_empty_string(value: string | undefined, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new RangeError(`${field} must be a non-empty string`);
  }

  return value;
}

function assert_entry_mode(value: string | undefined): EngagementEntrySurfaceMode {
  const mode = assert_non_empty_string(value, "engagement entry surface mode");

  if (ENGAGEMENT_ENTRY_SURFACE_MODE_VALUES.includes(mode as EngagementEntrySurfaceMode)) {
    return mode as EngagementEntrySurfaceMode;
  }

  throw new RangeError(`Unsupported engagement entry surface mode: ${mode}`);
}

function assert_entry_status(
  value: string | undefined
): EngagementEntrySurfaceStatus {
  const status = assert_non_empty_string(value, "engagement entry surface status");

  if (
    ENGAGEMENT_ENTRY_SURFACE_STATUS_VALUES.includes(
      status as EngagementEntrySurfaceStatus
    )
  ) {
    return status as EngagementEntrySurfaceStatus;
  }

  throw new RangeError(`Unsupported engagement entry surface status: ${status}`);
}

function assert_stage(value: string | undefined): EngagementStage {
  const stage = assert_non_empty_string(value, "engagement entry stage");

  if (ENGAGEMENT_STAGE_VALUES.includes(stage as EngagementStage)) {
    return stage as EngagementStage;
  }

  throw new RangeError(`Unsupported engagement entry stage: ${stage}`);
}

function assert_commercial_mode(value: string | undefined): CommercialMode {
  const mode = assert_non_empty_string(value, "engagement entry commercial mode");

  if (COMMERCIAL_MODE_VALUES.includes(mode as CommercialMode)) {
    return mode as CommercialMode;
  }

  throw new RangeError(`Unsupported engagement entry commercial mode: ${mode}`);
}

function assert_entry_action(value: string): EngagementEntrySurfaceAction {
  if (
    ENGAGEMENT_ENTRY_SURFACE_ACTION_VALUES.includes(
      value as EngagementEntrySurfaceAction
    )
  ) {
    return value as EngagementEntrySurfaceAction;
  }

  throw new RangeError(`Unsupported engagement entry action: ${value}`);
}

function sort_actions(
  actions: (EngagementEntrySurfaceAction | string)[] | undefined
): EngagementEntrySurfaceAction[] {
  const resolved_actions = actions ?? ENGAGEMENT_ENTRY_SURFACE_ACTION_VALUES;

  return [...new Set(resolved_actions.map((action) => assert_entry_action(action)))]
    .sort();
}

function clone_boundary_flags(): EngagementEntrySurfaceBoundaryFlags {
  return { ...ENGAGEMENT_ENTRY_SURFACE_BOUNDARY_FLAGS };
}

function create_source_metadata(
  input: EngagementWorkspaceSourceMetadataInput = {}
) {
  return {
    ...input,
    contract_version: ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA.contract_version,
    schema_version: ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA.schema_version,
    release_line: ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA.release_line,
    baseline_release_ref:
      input.baseline_release_ref ??
      ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA.baseline_release_ref,
    baseline_commit_ref:
      input.baseline_commit_ref ??
      ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA.baseline_commit_ref,
    compatibility_profile:
      input.compatibility_profile ??
      ENGAGEMENT_ENTRY_SURFACE_SOURCE_METADATA.compatibility_profile,
    migration_from: input.migration_from ? { ...input.migration_from } : undefined,
    migration_to: input.migration_to ? { ...input.migration_to } : undefined,
  };
}

function clone_bundle(bundle: EngagementWorkspaceBundle): EngagementWorkspaceBundle {
  return JSON.parse(JSON.stringify(bundle)) as EngagementWorkspaceBundle;
}

function assert_loaded_bundle_refs(bundle: EngagementWorkspaceBundle): void {
  if (bundle.workspace.loop_state_ref !== bundle.loop_state.loop_state_id) {
    throw new RangeError("Loaded workspace bundle loop_state_ref mismatch");
  }

  if (bundle.session.workspace_ref !== bundle.workspace.workspace_id) {
    throw new RangeError("Loaded workspace bundle session workspace_ref mismatch");
  }

  for (const history_record of bundle.history_records) {
    if (history_record.workspace_ref !== bundle.workspace.workspace_id) {
      throw new RangeError("Loaded workspace bundle history workspace_ref mismatch");
    }
  }
}

export function create_engagement_entry_surface_model(
  input: CreateEngagementEntrySurfaceModelInput
): EngagementEntrySurfaceModel {
  return {
    surface_id: assert_non_empty_string(input.surface_id, "surface_id"),
    mode: assert_entry_mode(input.mode),
    status: assert_entry_status(input.status ?? "draft"),
    workspace_ref: input.workspace_ref ?? null,
    session_ref: input.session_ref ?? null,
    current_stage: assert_stage(input.current_stage),
    commercial_mode: assert_commercial_mode(input.commercial_mode),
    available_actions: sort_actions(input.available_actions),
    source_metadata: create_source_metadata(input.source_metadata),
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_engagement_entry_surface_result(
  input: CreateEngagementEntrySurfaceResultInput
): EngagementEntrySurfaceResult {
  const status = assert_entry_status(input.status);

  return {
    result_id: assert_non_empty_string(input.result_id, "result_id"),
    status,
    surface_model: input.surface_model,
    workspace_ref: input.surface_model.workspace_ref,
    session_ref: input.surface_model.session_ref,
    result_summary: assert_non_empty_string(input.result_summary, "result_summary"),
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_local_engagement_workspace_from_entry(
  input: CreateLocalEngagementWorkspaceFromEntryInput
): EngagementEntryWorkspaceResult {
  const bundle = create_engagement_workspace_bundle({
    workspace_id: input.workspace_id,
    session_id: input.session_id,
    loop_state_id: input.loop_state_id,
    history_record_id: input.history_record_id,
    engagement_ref: input.engagement_ref,
    participant_refs: [...input.participant_refs],
    operator_ref: input.operator_ref,
    started_at: input.started_at,
    current_stage: input.current_stage,
    commercial_mode: input.commercial_mode,
    session_status: "active",
    readiness_ref: input.readiness_ref,
    onboarding_packet_ref: input.onboarding_packet_ref,
    evidence_refs: input.evidence_refs ? [...input.evidence_refs] : undefined,
    review_gate_refs: input.review_gate_refs ? [...input.review_gate_refs] : undefined,
    outcome_review_ref: input.outcome_review_ref,
    support_burden_ref: input.support_burden_ref,
    event_summary:
      input.event_summary ??
      "Local engagement workspace created from entry surface input.",
    source_metadata: input.source_metadata,
  });
  const surface_model = create_engagement_entry_surface_model({
    surface_id: input.surface_id,
    mode: "create_local_engagement",
    status: "ready_for_review",
    workspace_ref: bundle.workspace.workspace_id,
    session_ref: bundle.session.session_id,
    current_stage: bundle.workspace.current_stage,
    commercial_mode: bundle.workspace.commercial_mode,
    source_metadata: bundle.workspace.source_metadata,
  });

  return {
    ...create_engagement_entry_surface_result({
      result_id: `${input.surface_id}:created`,
      status: "ready_for_review",
      surface_model,
      result_summary:
        "Local engagement workspace created for manual founder/operator review.",
    }),
    workspace_bundle: bundle,
  };
}

export function load_local_engagement_workspace_from_entry(
  input: LoadLocalEngagementWorkspaceFromEntryInput
): EngagementEntryWorkspaceResult {
  assert_non_empty_string(input.loaded_at, "loaded_at");
  assert_non_empty_string(input.operator_ref, "operator_ref");

  const loaded_bundle = clone_bundle(input.workspace_bundle);
  assert_loaded_bundle_refs(loaded_bundle);

  const surface_model = create_engagement_entry_surface_model({
    surface_id: input.surface_id,
    mode: "load_local_engagement",
    status: "loaded",
    workspace_ref: loaded_bundle.workspace.workspace_id,
    session_ref: loaded_bundle.session.session_id,
    current_stage: loaded_bundle.workspace.current_stage,
    commercial_mode: loaded_bundle.workspace.commercial_mode,
    source_metadata: loaded_bundle.workspace.source_metadata,
  });

  return {
    ...create_engagement_entry_surface_result({
      result_id: `${input.surface_id}:loaded`,
      status: "loaded",
      surface_model,
      result_summary:
        "Local engagement workspace loaded from an in-memory local record.",
    }),
    workspace_bundle: loaded_bundle,
  };
}
