import type {
  ActionDispatchHandler,
  ActionDispatchOutcome,
} from "../../../Cognitive_OS/runtime/execution/action-dispatcher.ts";
import type { ExecutionRequestEnvelope } from "../../../Cognitive_OS/runtime/execution/execution-envelope.ts";
import type { ExecutionEventContract } from "../../../Cognitive_OS/runtime/execution/execution-events.ts";
import type {
  CorrectionCaptureInput,
  CorrectionCaptureRecord,
} from "../../../Cognitive_OS/runtime/learning/correction-capture.ts";
import type { PreferenceWritebackResult } from "../../../Cognitive_OS/runtime/learning/preference-writeback.ts";
import type { ObjectiveAnchorComparison } from "../../../Cognitive_OS/runtime/learning/objective-anchor.ts";
import { adaptAgentGroupToCrew } from "../adapters/crew-adapter.ts";
import { adaptAgentWorkerToCrewMember } from "../adapters/crew-member-adapter.ts";
import { adaptMemorySummary } from "../adapters/memory-summary-adapter.ts";
import { adaptObjectiveToProjection } from "../adapters/objective-adapter.ts";
import { adaptReviewStrip } from "../adapters/review-strip-adapter.ts";
import { adaptWorkItemToProjection } from "../adapters/work-item-adapter.ts";
import {
  list_agent_groups,
  list_review_cycles,
  list_role_profiles,
  list_work_items,
  load_agent_group,
  load_review_cycle,
  load_role_profile,
  load_work_item,
  type BaselineRuntimeContext,
} from "./seed-baseline.ts";
import type {
  AgentWorkerRecord,
  ObjectiveRecord,
  ReviewCycleRecord,
  WorkItemRecord,
} from "../adapters/upstream-record-types.ts";
import type { Crew } from "../objects/crew.ts";
import type { CrewMember } from "../objects/crew-member.ts";
import type { MemorySummary } from "../objects/memory-summary.ts";
import type { Objective } from "../objects/objective.ts";
import type { ReviewStrip } from "../objects/review-strip.ts";
import type { WorkItem } from "../objects/work-item.ts";

export interface CreateCrewView {
  crew: Crew;
  crew_members: CrewMember[];
  review_strip: ReviewStrip;
}

export interface ObjectiveView extends CreateCrewView {
  objective: Objective;
  work_items: WorkItem[];
  memory_summaries: MemorySummary[];
}

export interface ReturnAndContinueView extends ObjectiveView {
  continuity: {
    objective_anchor_compare: ObjectiveAnchorComparison;
    notes: string[];
  };
}

export interface CorrectionAssemblyResult {
  correction: CorrectionCaptureRecord;
  writeback: PreferenceWritebackResult;
  memory_summaries: MemorySummary[];
  review_strip: ReviewStrip;
}

export interface BoundedMotionAssemblyResult {
  outcome: ActionDispatchOutcome;
  execution_events: ExecutionEventContract[];
  crew_member: CrewMember;
  work_item: WorkItem;
  review_strip: ReviewStrip;
}

function assert_exists<TValue>(
  value: TValue | undefined,
  message: string
): TValue {
  if (!value) {
    throw new Error(message);
  }

  return value;
}

function load_current_group(context: BaselineRuntimeContext) {
  return assert_exists(
    load_agent_group(context.state_store, context.seeded_ids.group_id) ??
      list_agent_groups(context.state_store, context.project_id)[0],
    "Baseline agent-group is required for projection assembly."
  );
}

function load_current_objective(context: BaselineRuntimeContext): ObjectiveRecord {
  return assert_exists(
    context.objective_store.load(context.seeded_ids.objective_id),
    "Baseline objective is required for projection assembly."
  );
}

function load_current_review_cycle(
  context: BaselineRuntimeContext
): ReviewCycleRecord | undefined {
  return (
    load_review_cycle(context.state_store, context.seeded_ids.review_cycle_id) ??
    list_review_cycles(context.state_store, context.project_id)[0]
  );
}

function load_worker_records(context: BaselineRuntimeContext): AgentWorkerRecord[] {
  return context.worker_store.list(context.project_id);
}

function load_memory_summaries(
  context: BaselineRuntimeContext
): MemorySummary[] {
  const corrections = context.correction_capture.list({
    project_id: context.project_id,
  });
  const project_preference = context.preference_store.load(
    context.seeded_ids.preference_profile_id
  );

  return context.memory_store.list(context.project_id).map((memory_profile) =>
    adaptMemorySummary({
      memory_profile,
      preference_profile: project_preference,
      corrections: corrections.filter(
        (record) =>
          record.worker_id === memory_profile.scope_ref_id ||
          record.target_ref_id === memory_profile.scope_ref_id ||
          record.objective_id === memory_profile.scope_ref_id ||
          memory_profile.scope_kind === "agent_group"
      ),
    })
  );
}

function build_crew_members(
  context: BaselineRuntimeContext,
  params: {
    recent_action_summary_by_worker_id?: Map<string, string>;
  } = {}
): CrewMember[] {
  const group = load_current_group(context);
  const memory_summaries = load_memory_summaries(context);

  return load_worker_records(context).map((agent_worker) => {
    const role_profile = load_role_profile(
      context.state_store,
      agent_worker.role_profile_id
    );
    const memory_signal = memory_summaries.find(
      (summary) => summary.source_ref_id === agent_worker.object_id
    );

    return adaptAgentWorkerToCrewMember({
      crew_id: group.object_id,
      agent_worker,
      role_profile,
      memory_signals: memory_signal
        ? {
            memory_summary_id: memory_signal.memory_summary_id,
            current_focus: memory_signal.summary,
          }
        : undefined,
      recent_action_summary:
        params.recent_action_summary_by_worker_id?.get(agent_worker.object_id),
    });
  });
}

function build_review_strip(
  context: BaselineRuntimeContext,
  params: {
    work_items?: WorkItemRecord[];
    action_outcomes?: ActionDispatchOutcome[];
    execution_events?: ExecutionEventContract[];
    correction_writeback_signal?: PreferenceWritebackResult;
  } = {}
): ReviewStrip {
  const objective = load_current_objective(context);
  const group = load_current_group(context);
  const review_cycle = load_current_review_cycle(context);
  const work_items =
    params.work_items ?? list_work_items(context.state_store, context.project_id, objective.object_id);

  return adaptReviewStrip({
    crew_id: group.object_id,
    review_cycle,
    objective,
    work_items,
    action_outcomes: params.action_outcomes,
    execution_events: params.execution_events,
    correction_writeback_signal: params.correction_writeback_signal,
  });
}

export function assembleCreateCrewView(
  context: BaselineRuntimeContext
): CreateCrewView {
  const group = load_current_group(context);
  const crew = adaptAgentGroupToCrew({
    agent_group: group,
  });
  const crew_members = build_crew_members(context);
  const review_strip = build_review_strip(context);

  return {
    crew,
    crew_members,
    review_strip,
  };
}

export function assembleObjectiveView(
  context: BaselineRuntimeContext
): ObjectiveView {
  const create_view = assembleCreateCrewView(context);
  const objective_record = load_current_objective(context);
  const work_item_records = list_work_items(
    context.state_store,
    context.project_id,
    objective_record.object_id
  );

  return {
    ...create_view,
    objective: adaptObjectiveToProjection({
      crew_id: create_view.crew.crew_id,
      objective: objective_record,
      related_work_items: work_item_records,
    }),
    work_items: work_item_records.map((record) =>
      adaptWorkItemToProjection({
        work_item: record,
      })
    ),
    memory_summaries: load_memory_summaries(context),
  };
}

export function assembleReturnAndContinueView(
  context: BaselineRuntimeContext
): ReturnAndContinueView {
  const objective_view = assembleObjectiveView(context);
  const objective_anchor_compare = context.objective_anchor.compare_to_anchor(
    objective_view.objective.objective_id
  );

  return {
    ...objective_view,
    continuity: {
      objective_anchor_compare,
      notes: [
        objective_anchor_compare.anchor_present
          ? "Objective anchor is available for return-and-continue comparison."
          : "Objective anchor was not captured in this runtime context.",
      ],
    },
  };
}

export function createLocalFakeActionHandler(): ActionDispatchHandler {
  return {
    handler_id: "solocrew-local-fake-motion",
    can_handle() {
      return true;
    },
    handle(request) {
      const completed_at = new Date(
        Date.parse(request.created_at) + 1000
      ).toISOString();

      return {
        request_id: request.request_id,
        execution_id: `${request.request_id}:local-fake`,
        bridge_kind: request.bridge_kind,
        worker_id: request.worker_ref.worker_id,
        status: "completed",
        started_at: request.created_at,
        completed_at,
        output: {
          summary: `Local fake motion completed: ${request.instruction_set.task_brief}`,
          artifacts: [
            {
              kind: "bounded-motion-note",
              objective_id: request.context_ref.objective_id,
              work_item_id: request.context_ref.work_item_id,
            },
          ],
        },
        notes: [
          "Local fake handler executed bounded motion only.",
          "No provider-specific execution bridge was used.",
        ],
      };
    },
  };
}

function ensure_local_fake_handler(context: BaselineRuntimeContext): void {
  if (
    context.action_dispatcher
      .list_handler_ids()
      .includes("solocrew-local-fake-motion")
  ) {
    return;
  }

  context.action_dispatcher.register_handler(createLocalFakeActionHandler());
}

function mutate_stateful_record<TRecord extends { mutation?: Record<string, unknown>; temporal: Record<string, unknown>; status: string }>(
  record: TRecord,
  params: {
    next_status?: TRecord["status"];
    event_time: string;
  }
): TRecord {
  const current_revision =
    typeof record.mutation?.current_revision === "number"
      ? record.mutation.current_revision
      : 1;

  return {
    ...record,
    status: params.next_status ?? record.status,
    temporal: {
      ...record.temporal,
      event_time: params.event_time,
    },
    mutation: {
      ...record.mutation,
      mutation_class: "stateful_mutable",
      current_revision: current_revision + 1,
      last_mutated_at: params.event_time,
    },
  };
}

export async function assembleBoundedMotionView(
  context: BaselineRuntimeContext,
  request: ExecutionRequestEnvelope
): Promise<BoundedMotionAssemblyResult> {
  ensure_local_fake_handler(context);

  const outcome = await context.action_dispatcher.dispatch(request);
  const work_item_record = assert_exists(
    load_work_item(
      context.state_store,
      assert_exists(
        request.context_ref.work_item_id,
        "Bounded motion requires work_item_id."
      )
    ),
    "Work item for bounded motion was not found."
  );

  if (outcome.disposition === "failure") {
    context.worker_lifecycle.block_worker(request.worker_ref.worker_id);
  } else {
    context.worker_lifecycle.activate_worker(request.worker_ref.worker_id);
  }

  const mutated_work_item = mutate_stateful_record(work_item_record, {
    next_status: outcome.disposition === "failure" ? "blocked" : "active",
    event_time:
      outcome.result.completed_at ??
      outcome.result.started_at ??
      request.created_at,
  });
  context.state_store.save(mutated_work_item);

  const objective_record = load_current_objective(context);
  const mutated_objective = mutate_stateful_record(objective_record, {
    event_time:
      outcome.result.completed_at ??
      outcome.result.started_at ??
      request.created_at,
  }) as ObjectiveRecord;
  context.objective_store.save(mutated_objective);

  const recent_action_summary =
    outcome.result.output?.summary ?? outcome.result.error?.message ?? outcome.notes[0];
  const recent_action_summary_by_worker_id = new Map<string, string>([
    [request.worker_ref.worker_id, recent_action_summary],
  ]);
  const crew_member = assert_exists(
    build_crew_members(context, {
      recent_action_summary_by_worker_id,
    }).find((member) => member.crew_member_id === request.worker_ref.worker_id),
    "Crew member projection for bounded motion was not found."
  );
  const work_item = adaptWorkItemToProjection({
    work_item: mutated_work_item,
    last_update_summary: recent_action_summary,
  });
  const review_strip = build_review_strip(context, {
    work_items: list_work_items(
      context.state_store,
      context.project_id,
      objective_record.object_id
    ),
    action_outcomes: [outcome],
    execution_events: outcome.events,
  });

  return {
    outcome,
    execution_events: outcome.events,
    crew_member,
    work_item,
    review_strip,
  };
}

export function applyUserCorrectionAndAssemble(
  context: BaselineRuntimeContext,
  input: CorrectionCaptureInput
): CorrectionAssemblyResult {
  const correction = context.correction_capture.capture(input);
  const writeback = context.preference_writeback.writeback({
    correction,
  });

  return {
    correction,
    writeback,
    memory_summaries: load_memory_summaries(context),
    review_strip: build_review_strip(context, {
      correction_writeback_signal: writeback,
    }),
  };
}
