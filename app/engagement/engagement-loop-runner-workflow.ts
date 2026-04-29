import type {
  CommercialMode,
  EngagementStage,
} from "./engagement-canonical-contract.ts";
import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_STAGE_VALUES,
} from "./engagement-canonical-contract.ts";
import type {
  EngagementEntryWorkspaceResult,
} from "./engagement-entry-surface-workflow.ts";
import type {
  EngagementWorkspaceBundle,
  EngagementWorkspaceSourceMetadataInput,
} from "./engagement-workspace-workflow.ts";
import type {
  EngagementLoopRun,
  EngagementLoopRunnerBoundaryFlags,
  EngagementLoopRunnerId,
  EngagementLoopRunnerResult,
  EngagementLoopRunId,
  EngagementLoopRunStatus,
  EngagementLoopStep,
  EngagementLoopStepId,
  EngagementLoopStepKind,
  EngagementLoopStepSourceRefs,
  EngagementLoopStepStatus,
} from "./engagement-loop-runner-contract.ts";
import {
  ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS,
  ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA,
  ENGAGEMENT_LOOP_RUN_STATUS_VALUES,
  ENGAGEMENT_LOOP_STEP_KIND_VALUES,
  ENGAGEMENT_LOOP_STEP_STATUS_VALUES,
} from "./engagement-loop-runner-contract.ts";

export type CreateEngagementLoopRunInput = {
  run_id: EngagementLoopRunId;
  runner_id: EngagementLoopRunnerId;
  status: EngagementLoopRunStatus | string;
  workspace_ref?: string | null;
  session_ref?: string | null;
  engagement_ref?: string | null;
  current_stage: EngagementStage | string;
  commercial_mode: CommercialMode | string;
  step_refs?: EngagementLoopStepId[];
  reviewed_step_count?: number;
  blocked_step_count?: number;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

export type CreateEngagementLoopStepInput = {
  step_id: EngagementLoopStepId;
  run_ref: EngagementLoopRunId;
  step_kind: EngagementLoopStepKind | string;
  status: EngagementLoopStepStatus | string;
  step_summary: string;
  source_refs?: EngagementLoopStepSourceRefs;
  reviewed_at: string;
};

export type RunLocalEngagementLoopReviewInput = {
  runner_id: EngagementLoopRunnerId;
  run_id: EngagementLoopRunId;
  result_id?: string;
  reviewed_at: string;
  entry_workspace_result?: EngagementEntryWorkspaceResult | null;
  workspace_bundle?: EngagementWorkspaceBundle | null;
  source_metadata?: EngagementWorkspaceSourceMetadataInput;
};

function assert_non_empty_string(value: string | undefined, field: string): string {
  if (typeof value !== "string" || value.length === 0) {
    throw new RangeError(`${field} must be a non-empty string`);
  }

  return value;
}

function optional_non_empty_string(value: unknown): string | undefined {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

function assert_run_status(value: string | undefined): EngagementLoopRunStatus {
  const status = assert_non_empty_string(value, "engagement loop run status");

  if (ENGAGEMENT_LOOP_RUN_STATUS_VALUES.includes(status as EngagementLoopRunStatus)) {
    return status as EngagementLoopRunStatus;
  }

  throw new RangeError(`Unsupported engagement loop run status: ${status}`);
}

function assert_step_kind(value: string | undefined): EngagementLoopStepKind {
  const step_kind = assert_non_empty_string(
    value,
    "engagement loop step kind"
  );

  if (ENGAGEMENT_LOOP_STEP_KIND_VALUES.includes(step_kind as EngagementLoopStepKind)) {
    return step_kind as EngagementLoopStepKind;
  }

  throw new RangeError(`Unsupported engagement loop step kind: ${step_kind}`);
}

function assert_step_status(value: string | undefined): EngagementLoopStepStatus {
  const status = assert_non_empty_string(value, "engagement loop step status");

  if (ENGAGEMENT_LOOP_STEP_STATUS_VALUES.includes(status as EngagementLoopStepStatus)) {
    return status as EngagementLoopStepStatus;
  }

  throw new RangeError(`Unsupported engagement loop step status: ${status}`);
}

function assert_stage(value: string | undefined): EngagementStage {
  const stage = assert_non_empty_string(value, "engagement loop stage");

  if (ENGAGEMENT_STAGE_VALUES.includes(stage as EngagementStage)) {
    return stage as EngagementStage;
  }

  throw new RangeError(`Unsupported engagement loop stage: ${stage}`);
}

function assert_commercial_mode(value: string | undefined): CommercialMode {
  const mode = assert_non_empty_string(
    value,
    "engagement loop commercial mode"
  );

  if (COMMERCIAL_MODE_VALUES.includes(mode as CommercialMode)) {
    return mode as CommercialMode;
  }

  throw new RangeError(`Unsupported engagement loop commercial mode: ${mode}`);
}

function clone_boundary_flags(): EngagementLoopRunnerBoundaryFlags {
  return { ...ENGAGEMENT_LOOP_RUNNER_BOUNDARY_FLAGS };
}

function sort_unique_strings(values: string[] | undefined): string[] {
  return [...new Set(values ?? [])].sort();
}

function clone_source_refs(
  refs: EngagementLoopStepSourceRefs = {}
): EngagementLoopStepSourceRefs {
  const cloned_refs: EngagementLoopStepSourceRefs = {};

  for (const [key, value] of Object.entries(refs)) {
    if (Array.isArray(value)) {
      const cloned_values = sort_unique_strings(value);

      if (cloned_values.length > 0) {
        cloned_refs[key as keyof EngagementLoopStepSourceRefs] = cloned_values as never;
      }

      continue;
    }

    if (typeof value === "string" && value.length > 0) {
      cloned_refs[key as keyof EngagementLoopStepSourceRefs] = value as never;
    }
  }

  return cloned_refs;
}

function create_source_metadata(
  input: EngagementWorkspaceSourceMetadataInput = {}
) {
  return {
    ...input,
    contract_version: ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA.contract_version,
    schema_version: ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA.schema_version,
    release_line: ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA.release_line,
    baseline_release_ref:
      input.baseline_release_ref ??
      ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA.baseline_release_ref,
    baseline_commit_ref:
      input.baseline_commit_ref ??
      ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA.baseline_commit_ref,
    compatibility_profile:
      input.compatibility_profile ??
      ENGAGEMENT_LOOP_RUNNER_SOURCE_METADATA.compatibility_profile,
    migration_from: input.migration_from ? { ...input.migration_from } : undefined,
    migration_to: input.migration_to ? { ...input.migration_to } : undefined,
  };
}

function clone_bundle(bundle: EngagementWorkspaceBundle): EngagementWorkspaceBundle {
  return JSON.parse(JSON.stringify(bundle)) as EngagementWorkspaceBundle;
}

function resolve_bundle(
  input: RunLocalEngagementLoopReviewInput
): EngagementWorkspaceBundle | null {
  if (input.entry_workspace_result?.workspace_bundle) {
    return clone_bundle(input.entry_workspace_result.workspace_bundle);
  }

  if (input.workspace_bundle) {
    return clone_bundle(input.workspace_bundle);
  }

  return null;
}

function resolve_entry_surface_ref(
  input: RunLocalEngagementLoopReviewInput
): string | null {
  return (
    optional_non_empty_string(
      input.entry_workspace_result?.surface_model?.surface_id
    ) ?? null
  );
}

function create_step_id(
  run_id: EngagementLoopRunId,
  index: number,
  step_kind: EngagementLoopStepKind
): EngagementLoopStepId {
  return `${run_id}:${String(index).padStart(2, "0")}:${step_kind}`;
}

export function create_engagement_loop_run(
  input: CreateEngagementLoopRunInput
): EngagementLoopRun {
  return {
    run_id: assert_non_empty_string(input.run_id, "run_id"),
    runner_id: assert_non_empty_string(input.runner_id, "runner_id"),
    status: assert_run_status(input.status),
    workspace_ref: input.workspace_ref ?? null,
    session_ref: input.session_ref ?? null,
    engagement_ref: input.engagement_ref ?? null,
    current_stage: assert_stage(input.current_stage),
    commercial_mode: assert_commercial_mode(input.commercial_mode),
    step_refs: [...(input.step_refs ?? [])],
    reviewed_step_count: input.reviewed_step_count ?? 0,
    blocked_step_count: input.blocked_step_count ?? 0,
    source_metadata: create_source_metadata(input.source_metadata),
    boundary_flags: clone_boundary_flags(),
  };
}

export function create_engagement_loop_step(
  input: CreateEngagementLoopStepInput
): EngagementLoopStep {
  return {
    step_id: assert_non_empty_string(input.step_id, "step_id"),
    run_ref: assert_non_empty_string(input.run_ref, "run_ref"),
    step_kind: assert_step_kind(input.step_kind),
    status: assert_step_status(input.status),
    step_summary: assert_non_empty_string(input.step_summary, "step_summary"),
    source_refs: clone_source_refs(input.source_refs),
    reviewed_at: assert_non_empty_string(input.reviewed_at, "reviewed_at"),
    boundary_flags: clone_boundary_flags(),
  };
}

export function summarize_engagement_loop_review(input: {
  run: EngagementLoopRun;
  steps: EngagementLoopStep[];
}): string {
  if (input.run.status === "blocked") {
    return `Review-only local engagement loop blocked with ${input.run.blocked_step_count} blocked step(s).`;
  }

  return `Review-only local engagement loop completed with ${input.run.reviewed_step_count} reviewed step(s) and ${input.steps.length} total step(s).`;
}

export function run_local_engagement_loop_review(
  input: RunLocalEngagementLoopReviewInput
): EngagementLoopRunnerResult {
  const runner_id = assert_non_empty_string(input.runner_id, "runner_id");
  const run_id = assert_non_empty_string(input.run_id, "run_id");
  const reviewed_at = assert_non_empty_string(input.reviewed_at, "reviewed_at");
  const entry_surface_ref = resolve_entry_surface_ref(input);
  const bundle = resolve_bundle(input);
  const workspace = bundle?.workspace;
  const session = bundle?.session;
  const loop_state = bundle?.loop_state;
  const history_record = bundle?.history_records?.[0];
  const workspace_ref = optional_non_empty_string(workspace?.workspace_id) ?? null;
  const session_ref = optional_non_empty_string(session?.session_id) ?? null;
  const engagement_ref =
    optional_non_empty_string(workspace?.engagement_ref) ??
    optional_non_empty_string(loop_state?.engagement_ref) ??
    null;
  const current_stage = assert_stage(
    optional_non_empty_string(workspace?.current_stage) ??
      optional_non_empty_string(input.entry_workspace_result?.surface_model.current_stage) ??
      "candidate"
  );
  const commercial_mode = assert_commercial_mode(
    optional_non_empty_string(workspace?.commercial_mode) ??
      optional_non_empty_string(
        input.entry_workspace_result?.surface_model.commercial_mode
      ) ??
      "free_discovery"
  );
  const common_refs = (): EngagementLoopStepSourceRefs => ({
    entry_surface_ref: entry_surface_ref ?? undefined,
    workspace_ref: workspace_ref ?? undefined,
    session_ref: session_ref ?? undefined,
    loop_state_ref: optional_non_empty_string(loop_state?.loop_state_id),
    history_record_ref: optional_non_empty_string(history_record?.history_record_id),
    engagement_ref: engagement_ref ?? undefined,
  });
  const steps: EngagementLoopStep[] = [];

  const add_step = (
    step_kind: EngagementLoopStepKind,
    status: EngagementLoopStepStatus,
    step_summary: string,
    source_refs: EngagementLoopStepSourceRefs = {}
  ) => {
    steps.push(
      create_engagement_loop_step({
        step_id: create_step_id(run_id, steps.length + 1, step_kind),
        run_ref: run_id,
        step_kind,
        status,
        step_summary,
        source_refs: {
          ...common_refs(),
          ...source_refs,
        },
        reviewed_at,
      })
    );
  };

  add_step(
    "entry_surface_loaded",
    entry_surface_ref ? "reviewed" : "skipped",
    entry_surface_ref
      ? "Entry surface result loaded for local review-only loop."
      : "No entry surface result supplied; direct workspace bundle review continues."
  );

  const workspace_loaded =
    workspace_ref !== null &&
    engagement_ref !== null &&
    optional_non_empty_string(workspace?.loop_state_ref) !== undefined;
  add_step(
    "workspace_loaded",
    workspace_loaded ? "reviewed" : "blocked",
    workspace_loaded
      ? "Workspace references are present for local review."
      : "Workspace references are missing; local review loop is blocked."
  );

  const session_checked =
    session_ref !== null &&
    workspace_ref !== null &&
    session?.workspace_ref === workspace_ref;
  add_step(
    "session_checked",
    session_checked ? "reviewed" : "blocked",
    session_checked
      ? "Session references the loaded workspace."
      : "Session reference is missing or mismatched; local review loop is blocked."
  );

  const loop_state_checked =
    workspace_ref !== null &&
    engagement_ref !== null &&
    loop_state?.loop_state_id === workspace?.loop_state_ref &&
    loop_state?.engagement_ref === engagement_ref;
  add_step(
    "loop_state_checked",
    loop_state_checked ? "reviewed" : "blocked",
    loop_state_checked
      ? "Loop state matches workspace and engagement references."
      : "Loop state reference is missing or mismatched; local review loop is blocked."
  );

  add_step(
    "onboarding_reviewed",
    loop_state?.onboarding_packet_ref ? "reviewed" : "skipped",
    loop_state?.onboarding_packet_ref
      ? "Onboarding packet reference reviewed locally."
      : "No onboarding packet reference supplied for this local review.",
    {
      onboarding_packet_ref: loop_state?.onboarding_packet_ref,
    }
  );

  add_step(
    "evidence_reviewed",
    loop_state?.evidence_refs?.length ? "reviewed" : "skipped",
    loop_state?.evidence_refs?.length
      ? "Evidence references reviewed locally."
      : "No evidence references supplied for this local review.",
    {
      evidence_refs: loop_state?.evidence_refs,
    }
  );

  add_step(
    "readiness_reviewed",
    loop_state?.readiness_ref ? "reviewed" : "skipped",
    loop_state?.readiness_ref
      ? "Readiness view reference reviewed locally."
      : "No readiness view reference supplied for this local review.",
    {
      readiness_ref: loop_state?.readiness_ref,
    }
  );

  add_step(
    "review_gate_reviewed",
    loop_state?.review_gate_refs?.length ? "reviewed" : "skipped",
    loop_state?.review_gate_refs?.length
      ? "Review gate references reviewed locally."
      : "No review gate references supplied for this local review.",
    {
      review_gate_refs: loop_state?.review_gate_refs,
    }
  );

  add_step(
    "outcome_review_pending",
    "pending",
    loop_state?.outcome_review_ref
      ? "Outcome review reference remains pending for the later output slice."
      : "Outcome review remains pending for founder review.",
    {
      outcome_review_ref: loop_state?.outcome_review_ref,
      support_burden_ref: loop_state?.support_burden_ref,
    }
  );

  const has_blocked_step = steps.some((step) => step.status === "blocked");
  add_step(
    "founder_review_requested",
    has_blocked_step ? "blocked" : "reviewed",
    has_blocked_step
      ? "Founder review request is blocked until local reference issues are corrected."
      : "Founder review requested locally without execution or dispatch."
  );

  if (steps.some((step) => step.status === "blocked")) {
    add_step(
      "blocked",
      "blocked",
      "Local review-only loop is blocked; no action was executed."
    );
  }

  const blocked_step_count = steps.filter((step) => step.status === "blocked")
    .length;
  const reviewed_step_count = steps.filter((step) => step.status === "reviewed")
    .length;
  const run = create_engagement_loop_run({
    run_id,
    runner_id,
    status: blocked_step_count > 0 ? "blocked" : "review_ready",
    workspace_ref,
    session_ref,
    engagement_ref,
    current_stage,
    commercial_mode,
    step_refs: steps.map((step) => step.step_id),
    reviewed_step_count,
    blocked_step_count,
    source_metadata:
      input.source_metadata ??
      workspace?.source_metadata ??
      input.entry_workspace_result?.surface_model.source_metadata,
  });
  const result = {
    result_id: input.result_id ?? `${run_id}:review`,
    run,
    steps,
    workspace_bundle_ref: workspace_ref,
    entry_surface_ref,
    result_summary: summarize_engagement_loop_review({ run, steps }),
    boundary_flags: clone_boundary_flags(),
  };

  return result;
}
