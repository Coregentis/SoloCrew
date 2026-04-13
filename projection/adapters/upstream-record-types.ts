import type { WorkforceStateRecord } from "../../../Cognitive_OS/runtime/state/state-store-port.ts";
import type { AgentWorkerRecord } from "../../../Cognitive_OS/runtime/state/worker-store.ts";
import type { ObjectiveRecord } from "../../../Cognitive_OS/runtime/state/objective-store.ts";
import type { MemoryProfileRecord } from "../../../Cognitive_OS/runtime/state/memory-store.ts";
import type { PreferenceProfileRecord } from "../../../Cognitive_OS/runtime/state/preference-store.ts";

export type {
  AgentWorkerRecord,
  ObjectiveRecord,
  MemoryProfileRecord,
  PreferenceProfileRecord,
};

export interface AgentGroupRecord extends WorkforceStateRecord {
  object_type: "agent-group";
  status: "forming" | "active" | "paused" | "archived";
  group_name: string;
  group_summary?: string;
  worker_ids?: string[];
  role_profile_ids?: string[];
  objective_ids?: string[];
  review_cycle_id?: string;
  continuity_mode?: "single_operator" | "scheduled_runtime" | "continuous_runtime";
}

export interface RoleProfileRecord extends WorkforceStateRecord {
  object_type: "role-profile";
  status: "draft" | "active" | "deprecated" | "archived";
  profile_name: string;
  responsibility_summary: string;
  instruction_brief: string;
  capability_tags?: string[];
  operating_constraints?: string[];
}

export type WorkItemKind =
  | "analysis"
  | "build"
  | "review"
  | "coordination"
  | "operations";

export interface WorkItemRecord extends WorkforceStateRecord {
  object_type: "work-item";
  status: "queued" | "active" | "blocked" | "completed" | "cancelled";
  objective_id: string;
  assigned_worker_id?: string;
  work_summary: string;
  work_kind: WorkItemKind;
  instruction_brief?: string;
  dependency_ids?: string[];
  deliverable_refs?: string[];
}

export interface ReviewCycleRecord extends WorkforceStateRecord {
  object_type: "review-cycle";
  status: "scheduled" | "active" | "closed" | "archived";
  group_id?: string;
  cadence_kind: "daily" | "weekly" | "milestone" | "on_demand";
  review_scope_summary: string;
  objective_ids?: string[];
  participant_worker_ids?: string[];
  next_review_at: string;
  last_review_at?: string;
}

export function is_agent_group_record(
  record: WorkforceStateRecord
): record is AgentGroupRecord {
  return record.object_type === "agent-group";
}

export function is_role_profile_record(
  record: WorkforceStateRecord
): record is RoleProfileRecord {
  return record.object_type === "role-profile";
}

export function is_work_item_record(
  record: WorkforceStateRecord
): record is WorkItemRecord {
  return record.object_type === "work-item";
}

export function is_review_cycle_record(
  record: WorkforceStateRecord
): record is ReviewCycleRecord {
  return record.object_type === "review-cycle";
}

export function list_unique_strings(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value && value.length > 0)))];
}
