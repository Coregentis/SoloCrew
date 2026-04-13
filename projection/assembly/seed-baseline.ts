import { InMemoryStateStore } from "../../../Cognitive_OS/runtime/state/in-memory-state-store.ts";
import { WorkerStore } from "../../../Cognitive_OS/runtime/state/worker-store.ts";
import { ObjectiveStore } from "../../../Cognitive_OS/runtime/state/objective-store.ts";
import { MemoryStore } from "../../../Cognitive_OS/runtime/state/memory-store.ts";
import { PreferenceStore } from "../../../Cognitive_OS/runtime/state/preference-store.ts";
import type {
  StateStorePort,
  WorkforceStateRecord,
} from "../../../Cognitive_OS/runtime/state/state-store-port.ts";
import { WorkerLifecycleRuntime } from "../../../Cognitive_OS/runtime/lifecycle/worker-lifecycle.ts";
import { InMemoryObjectiveAnchor } from "../../../Cognitive_OS/runtime/learning/objective-anchor.ts";
import { InMemoryCorrectionCapture } from "../../../Cognitive_OS/runtime/learning/correction-capture.ts";
import { PreferenceWritebackService } from "../../../Cognitive_OS/runtime/learning/preference-writeback.ts";
import { ActionDispatcher } from "../../../Cognitive_OS/runtime/execution/action-dispatcher.ts";
import type { AgentWorkerRecord } from "../../../Cognitive_OS/runtime/state/worker-store.ts";
import type { ObjectiveRecord } from "../../../Cognitive_OS/runtime/state/objective-store.ts";
import type { MemoryProfileRecord } from "../../../Cognitive_OS/runtime/state/memory-store.ts";
import type { PreferenceProfileRecord } from "../../../Cognitive_OS/runtime/state/preference-store.ts";
import type {
  AgentGroupRecord,
  ReviewCycleRecord,
  RoleProfileRecord,
  WorkItemRecord,
} from "../adapters/upstream-record-types.ts";
import {
  is_agent_group_record,
  is_review_cycle_record,
  is_role_profile_record,
  is_work_item_record,
} from "../adapters/upstream-record-types.ts";

const BASELINE_TIMESTAMPS = {
  created: "2026-04-14T00:00:00.000Z",
  review_due: "2026-04-15T09:00:00.000Z",
};

export interface BaselineSeedIds {
  project_id: string;
  group_id: string;
  role_profile_ids: {
    builder: string;
    growth: string;
    content: string;
    ops: string;
  };
  worker_ids: {
    builder: string;
    growth: string;
    content: string;
    ops: string;
  };
  objective_id: string;
  work_item_ids: string[];
  memory_profile_ids: string[];
  preference_profile_id: string;
  review_cycle_id: string;
}

export interface BaselineRuntimeContext {
  project_id: string;
  state_store: StateStorePort;
  worker_store: WorkerStore;
  objective_store: ObjectiveStore;
  memory_store: MemoryStore;
  preference_store: PreferenceStore;
  worker_lifecycle: WorkerLifecycleRuntime;
  objective_anchor: InMemoryObjectiveAnchor;
  correction_capture: InMemoryCorrectionCapture;
  preference_writeback: PreferenceWritebackService;
  action_dispatcher: ActionDispatcher;
  seeded_ids: BaselineSeedIds;
}

export interface BaselineSeedOptions {
  include_memory_profile?: boolean;
  include_preference_profile?: boolean;
  include_review_cycle?: boolean;
}

function create_base_record<TRecord extends WorkforceStateRecord>(
  project_id: string,
  overrides: Omit<
    TRecord,
    | "schema_version"
    | "authority_class"
    | "primary_layer"
    | "project_id"
    | "temporal"
    | "mutation"
    | "lineage"
    | "governance"
  > &
    Partial<
      Pick<
        TRecord,
        | "schema_version"
        | "authority_class"
        | "primary_layer"
        | "temporal"
        | "mutation"
        | "lineage"
        | "governance"
      >
    >
): TRecord {
  return {
    schema_version: "0.1.0",
    authority_class: "coregentis_private_runtime",
    primary_layer: "organization_runtime_layer",
    project_id,
    temporal: {
      temporal_class: "durable",
      cognition_time: BASELINE_TIMESTAMPS.created,
      event_time: BASELINE_TIMESTAMPS.created,
      ...(overrides.temporal ?? {}),
    },
    mutation: {
      mutation_class: "stateful_mutable",
      current_revision: 1,
      last_mutated_at: BASELINE_TIMESTAMPS.created,
      ...(overrides.mutation ?? {}),
    },
    lineage: {
      creation_source: "user_entry",
      derivation_mode: "origin",
      ...(overrides.lineage ?? {}),
    },
    governance: {
      governance_scope: "project",
      approval_state: "not_required",
      ...(overrides.governance ?? {}),
    },
    ...overrides,
  } as TRecord;
}

function save_generic_record(
  state_store: StateStorePort,
  record:
    | AgentGroupRecord
    | RoleProfileRecord
    | WorkItemRecord
    | ReviewCycleRecord
): void {
  state_store.save(record);
}

export function list_agent_groups(
  state_store: StateStorePort,
  project_id: string
): AgentGroupRecord[] {
  return state_store
    .list({
      object_type: "agent-group",
      project_id,
    })
    .filter(is_agent_group_record);
}

export function list_role_profiles(
  state_store: StateStorePort,
  project_id: string
): RoleProfileRecord[] {
  return state_store
    .list({
      object_type: "role-profile",
      project_id,
    })
    .filter(is_role_profile_record);
}

export function list_work_items(
  state_store: StateStorePort,
  project_id: string,
  objective_id?: string
): WorkItemRecord[] {
  return state_store
    .list({
      object_type: "work-item",
      project_id,
    })
    .filter(is_work_item_record)
    .filter((record) => !objective_id || record.objective_id === objective_id);
}

export function list_review_cycles(
  state_store: StateStorePort,
  project_id: string
): ReviewCycleRecord[] {
  return state_store
    .list({
      object_type: "review-cycle",
      project_id,
    })
    .filter(is_review_cycle_record);
}

export function load_work_item(
  state_store: StateStorePort,
  work_item_id: string
): WorkItemRecord | undefined {
  const record = state_store.load(work_item_id);
  if (!record || !is_work_item_record(record)) {
    return undefined;
  }

  return record;
}

export function load_agent_group(
  state_store: StateStorePort,
  group_id: string
): AgentGroupRecord | undefined {
  const record = state_store.load(group_id);
  if (!record || !is_agent_group_record(record)) {
    return undefined;
  }

  return record;
}

export function load_role_profile(
  state_store: StateStorePort,
  role_profile_id: string
): RoleProfileRecord | undefined {
  const record = state_store.load(role_profile_id);
  if (!record || !is_role_profile_record(record)) {
    return undefined;
  }

  return record;
}

export function load_review_cycle(
  state_store: StateStorePort,
  review_cycle_id: string
): ReviewCycleRecord | undefined {
  const record = state_store.load(review_cycle_id);
  if (!record || !is_review_cycle_record(record)) {
    return undefined;
  }

  return record;
}

function seed_role_profiles(
  state_store: StateStorePort,
  project_id: string,
  ids: BaselineSeedIds["role_profile_ids"]
): RoleProfileRecord[] {
  const records: RoleProfileRecord[] = [
    create_base_record(project_id, {
      object_id: ids.builder,
      object_type: "role-profile",
      status: "active",
      profile_name: "Builder",
      responsibility_summary: "Owns build and shipping momentum.",
      instruction_brief: "Keep scope crisp and ship bounded progress.",
      capability_tags: ["build", "delivery"],
    }),
    create_base_record(project_id, {
      object_id: ids.growth,
      object_type: "role-profile",
      status: "active",
      profile_name: "Growth",
      responsibility_summary: "Owns demand generation and outreach framing.",
      instruction_brief: "Prefer evidence-backed acquisition moves.",
      capability_tags: ["growth", "research"],
    }),
    create_base_record(project_id, {
      object_id: ids.content,
      object_type: "role-profile",
      status: "active",
      profile_name: "Content",
      responsibility_summary: "Owns content packaging and distribution assets.",
      instruction_brief: "Keep outputs reusable across channels.",
      capability_tags: ["content", "copy"],
    }),
    create_base_record(project_id, {
      object_id: ids.ops,
      object_type: "role-profile",
      status: "active",
      profile_name: "Ops",
      responsibility_summary: "Owns coordination and review visibility.",
      instruction_brief: "Surface blockers and decisions early.",
      capability_tags: ["ops", "coordination"],
    }),
  ];

  for (const record of records) {
    save_generic_record(state_store, record);
  }

  return records;
}

function seed_agent_workers(
  worker_store: WorkerStore,
  project_id: string,
  group_id: string,
  role_ids: BaselineSeedIds["role_profile_ids"],
  worker_ids: BaselineSeedIds["worker_ids"],
  objective_id: string
): AgentWorkerRecord[] {
  const records: AgentWorkerRecord[] = [
    create_base_record(project_id, {
      object_id: worker_ids.builder,
      object_type: "agent-worker",
      status: "idle",
      group_id,
      role_profile_id: role_ids.builder,
      worker_name: "Builder",
      worker_summary: "Shipping the first bounded implementation slice.",
      worker_kind: "specialist",
      capability_tags: ["build", "typescript"],
      default_objective_ids: [objective_id],
    }),
    create_base_record(project_id, {
      object_id: worker_ids.growth,
      object_type: "agent-worker",
      status: "idle",
      group_id,
      role_profile_id: role_ids.growth,
      worker_name: "Growth",
      worker_summary: "Preparing outreach framing and launch hooks.",
      worker_kind: "specialist",
      capability_tags: ["growth", "research"],
      default_objective_ids: [objective_id],
    }),
    create_base_record(project_id, {
      object_id: worker_ids.content,
      object_type: "agent-worker",
      status: "idle",
      group_id,
      role_profile_id: role_ids.content,
      worker_name: "Content",
      worker_summary: "Drafting reusable launch assets.",
      worker_kind: "specialist",
      capability_tags: ["content", "copy"],
      default_objective_ids: [objective_id],
    }),
    create_base_record(project_id, {
      object_id: worker_ids.ops,
      object_type: "agent-worker",
      status: "idle",
      group_id,
      role_profile_id: role_ids.ops,
      worker_name: "Ops",
      worker_summary: "Tracking blockers and continuity notes.",
      worker_kind: "coordinator",
      capability_tags: ["ops", "review"],
      default_objective_ids: [objective_id],
    }),
  ];

  for (const record of records) {
    worker_store.save(record);
  }

  return records;
}

function seed_agent_group(
  state_store: StateStorePort,
  project_id: string,
  ids: BaselineSeedIds
): AgentGroupRecord {
  const record: AgentGroupRecord = create_base_record(project_id, {
    object_id: ids.group_id,
    object_type: "agent-group",
    status: "active",
    group_name: "SoloCrew Baseline",
    group_summary: "Bounded projection assembly over mother-runtime workforce records.",
    worker_ids: Object.values(ids.worker_ids),
    role_profile_ids: Object.values(ids.role_profile_ids),
    objective_ids: [ids.objective_id],
    review_cycle_id: ids.review_cycle_id,
    continuity_mode: "single_operator",
  });

  save_generic_record(state_store, record);
  return record;
}

function seed_objective(
  objective_store: ObjectiveStore,
  project_id: string,
  ids: BaselineSeedIds
): ObjectiveRecord {
  const record: ObjectiveRecord = create_base_record(project_id, {
    object_id: ids.objective_id,
    object_type: "objective",
    status: "active",
    group_id: ids.group_id,
    owner_worker_id: ids.worker_ids.builder,
    objective_summary: "Ship a bounded SoloCrew projection assembly baseline.",
    progress_summary: "Crew shell is seeded and ready for bounded motion.",
    success_signals: [
      "crew shell loads",
      "objective remains anchored",
      "corrections visibly change summaries",
    ],
    work_item_ids: ids.work_item_ids,
    target_due_at: "2026-04-18T18:00:00.000Z",
  });

  objective_store.save(record);
  return record;
}

function seed_work_items(
  state_store: StateStorePort,
  project_id: string,
  ids: BaselineSeedIds
): WorkItemRecord[] {
  const records: WorkItemRecord[] = [
    create_base_record(project_id, {
      object_id: ids.work_item_ids[0],
      object_type: "work-item",
      status: "queued",
      objective_id: ids.objective_id,
      assigned_worker_id: ids.worker_ids.builder,
      work_summary: "Assemble projection adapters over bounded runtime records.",
      work_kind: "build",
      instruction_brief: "Map neutral workforce records to projection DTOs.",
      deliverable_refs: ["projection/adapters"],
    }),
    create_base_record(project_id, {
      object_id: ids.work_item_ids[1],
      object_type: "work-item",
      status: "queued",
      objective_id: ids.objective_id,
      assigned_worker_id: ids.worker_ids.growth,
      work_summary: "Draft crew-level narrative for the baseline shell.",
      work_kind: "analysis",
      instruction_brief: "Keep wow claims bounded to implemented surfaces.",
      deliverable_refs: ["README.md"],
    }),
    create_base_record(project_id, {
      object_id: ids.work_item_ids[2],
      object_type: "work-item",
      status: "queued",
      objective_id: ids.objective_id,
      assigned_worker_id: ids.worker_ids.content,
      work_summary: "Prepare concise projection-facing summaries for objective and memory state.",
      work_kind: "build",
      instruction_brief: "Prefer short summaries and explicit upstream traceability.",
      deliverable_refs: ["projection/assembly"],
    }),
    create_base_record(project_id, {
      object_id: ids.work_item_ids[3],
      object_type: "work-item",
      status: "queued",
      objective_id: ids.objective_id,
      assigned_worker_id: ids.worker_ids.ops,
      work_summary: "Maintain review cadence and return-and-continue continuity.",
      work_kind: "coordination",
      instruction_brief: "Track blockers, moved items, and decision asks.",
      deliverable_refs: ["app/shell"],
    }),
  ];

  for (const record of records) {
    save_generic_record(state_store, record);
  }

  return records;
}

function seed_memory_profiles(
  memory_store: MemoryStore,
  project_id: string,
  ids: BaselineSeedIds
): MemoryProfileRecord[] {
  const records: MemoryProfileRecord[] = [
    create_base_record(project_id, {
      object_id: ids.memory_profile_ids[0],
      object_type: "memory-profile",
      status: "active",
      scope_kind: "agent_group",
      scope_ref_id: ids.group_id,
      memory_summary: "Crew is expected to operate as a persistent four-role unit.",
      retained_notes: ["persistent-team", "bounded-runtime-only"],
      update_basis: "manual",
      last_revised_at: BASELINE_TIMESTAMPS.created,
    }),
    create_base_record(project_id, {
      object_id: ids.memory_profile_ids[1],
      object_type: "memory-profile",
      status: "active",
      scope_kind: "agent_worker",
      scope_ref_id: ids.worker_ids.builder,
      memory_summary: "Builder should bias toward thin vertical slices and visible progress.",
      retained_notes: ["thin-slice", "visible-progress"],
      update_basis: "manual",
      last_revised_at: BASELINE_TIMESTAMPS.created,
    }),
  ];

  for (const record of records) {
    memory_store.save(record);
  }

  return records;
}

function seed_preference_profile(
  preference_store: PreferenceStore,
  project_id: string,
  preference_profile_id: string
): PreferenceProfileRecord {
  const record: PreferenceProfileRecord = create_base_record(project_id, {
    object_id: preference_profile_id,
    object_type: "preference-profile",
    status: "active",
    scope_kind: "project",
    scope_ref_id: project_id,
    preference_summary: "Prefer bounded claims, continuity, and explicit authority discipline.",
    preference_signals: ["bounded-claims", "continuity", "authority-discipline"],
    correction_refs: [],
    last_revised_at: BASELINE_TIMESTAMPS.created,
  });

  preference_store.save(record);
  return record;
}

function seed_review_cycle(
  state_store: StateStorePort,
  project_id: string,
  ids: BaselineSeedIds
): ReviewCycleRecord {
  const record: ReviewCycleRecord = create_base_record(project_id, {
    object_id: ids.review_cycle_id,
    object_type: "review-cycle",
    status: "active",
    group_id: ids.group_id,
    cadence_kind: "daily",
    review_scope_summary: "Daily baseline projection review.",
    objective_ids: [ids.objective_id],
    participant_worker_ids: Object.values(ids.worker_ids),
    next_review_at: BASELINE_TIMESTAMPS.review_due,
    last_review_at: BASELINE_TIMESTAMPS.created,
  });

  save_generic_record(state_store, record);
  return record;
}

export function create_seed_ids(): BaselineSeedIds {
  return {
    project_id: "00000000-0000-4000-8000-510000000000",
    group_id: "00000000-0000-4000-8000-510000000010",
    role_profile_ids: {
      builder: "00000000-0000-4000-8000-510000000020",
      growth: "00000000-0000-4000-8000-510000000021",
      content: "00000000-0000-4000-8000-510000000022",
      ops: "00000000-0000-4000-8000-510000000023",
    },
    worker_ids: {
      builder: "00000000-0000-4000-8000-510000000120",
      growth: "00000000-0000-4000-8000-510000000121",
      content: "00000000-0000-4000-8000-510000000122",
      ops: "00000000-0000-4000-8000-510000000123",
    },
    objective_id: "00000000-0000-4000-8000-510000000220",
    work_item_ids: [
      "00000000-0000-4000-8000-510000000320",
      "00000000-0000-4000-8000-510000000321",
      "00000000-0000-4000-8000-510000000322",
      "00000000-0000-4000-8000-510000000323",
    ],
    memory_profile_ids: [
      "00000000-0000-4000-8000-510000000420",
      "00000000-0000-4000-8000-510000000421",
    ],
    preference_profile_id: "00000000-0000-4000-8000-510000000520",
    review_cycle_id: "00000000-0000-4000-8000-510000000620",
  };
}

export function seedBaselineState(
  options: BaselineSeedOptions = {}
): BaselineRuntimeContext {
  const ids = create_seed_ids();
  const state_store = new InMemoryStateStore();
  const worker_store = new WorkerStore(state_store);
  const objective_store = new ObjectiveStore(state_store);
  const memory_store = new MemoryStore(state_store);
  const preference_store = new PreferenceStore(state_store);
  const worker_lifecycle = new WorkerLifecycleRuntime({
    worker_store,
  });
  const correction_capture = new InMemoryCorrectionCapture();
  const preference_writeback = new PreferenceWritebackService({
    preference_store,
    correction_capture,
  });
  const objective_anchor = new InMemoryObjectiveAnchor({
    objective_store,
  });
  const action_dispatcher = new ActionDispatcher();

  seed_role_profiles(state_store, ids.project_id, ids.role_profile_ids);
  seed_agent_workers(
    worker_store,
    ids.project_id,
    ids.group_id,
    ids.role_profile_ids,
    ids.worker_ids,
    ids.objective_id
  );
  seed_work_items(state_store, ids.project_id, ids);
  seed_objective(objective_store, ids.project_id, ids);
  seed_agent_group(state_store, ids.project_id, ids);

  if (options.include_memory_profile !== false) {
    seed_memory_profiles(memory_store, ids.project_id, ids);
  }

  if (options.include_preference_profile !== false) {
    seed_preference_profile(
      preference_store,
      ids.project_id,
      ids.preference_profile_id
    );
  }

  if (options.include_review_cycle !== false) {
    seed_review_cycle(state_store, ids.project_id, ids);
  }

  return {
    project_id: ids.project_id,
    state_store,
    worker_store,
    objective_store,
    memory_store,
    preference_store,
    worker_lifecycle,
    objective_anchor,
    correction_capture,
    preference_writeback,
    action_dispatcher,
    seeded_ids: ids,
  };
}
