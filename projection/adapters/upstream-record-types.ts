import type {
  WorkforceStateRecord,
  AgentWorkerRecord,
  ObjectiveRecord,
  MemoryProfileRecord,
  PreferenceProfileRecord,
  RuntimeObjectRecord,
} from "../../runtime-imports/cognitive-runtime.ts";

export type {
  AgentWorkerRecord,
  ObjectiveRecord,
  MemoryProfileRecord,
  PreferenceProfileRecord,
};

export interface CellRuntimeScopeRecord extends RuntimeObjectRecord {
  object_type: "cell-runtime-scope";
  authority_class: "coregentis_private_runtime";
  primary_layer: "organization_runtime_layer";
  status: "forming" | "active" | "paused" | "archived";
  project_id: string;
  group_id?: string;
  scope_name: string;
  scope_summary?: string;
  worker_ids?: string[];
  objective_ids?: string[];
  summary_record_id?: string;
  scope_mode?: "single_operator_bounded" | "multi_scope_bounded";
}

export interface CellSummaryRuntimeRecord extends RuntimeObjectRecord {
  object_type: "cell-summary-runtime-record";
  authority_class: "coregentis_private_runtime";
  primary_layer: "organization_runtime_layer";
  status: "draft" | "current" | "stale" | "archived";
  project_id: string;
  cell_runtime_scope_id: string;
  source_object_ids?: string[];
  summary_headline: string;
  summary_delivery_posture: "steady" | "attention" | "blocked";
  active_work_item_count: number;
  blocked_work_item_count: number;
  continuity_hint: string;
  summary_mode: "bounded_runtime_private";
}

export interface ManagementDirectiveRuntimeRecord extends RuntimeObjectRecord {
  object_type: "management-directive-record";
  authority_class: "coregentis_private_runtime";
  primary_layer: "organization_runtime_layer";
  status: "draft" | "active" | "superseded" | "closed";
  project_id: string;
  cell_runtime_scope_id: string;
  target_objective_id?: string;
  directive_summary: string;
  directive_priority: "focus_now" | "stabilize" | "review_first";
  approval_posture:
    | "operator_required"
    | "bounded_autonomy"
    | "escalate_on_stop";
  constraint_tags?: string[];
}

export interface DeliveryReturnRuntimeRecord extends RuntimeObjectRecord {
  object_type: "delivery-return-record";
  authority_class: "coregentis_private_runtime";
  primary_layer: "organization_runtime_layer";
  status: "in_progress" | "ready_for_review" | "blocked" | "returned" | "archived";
  project_id: string;
  cell_runtime_scope_id: string;
  source_objective_id?: string;
  completed_summary: string;
  blocked_summary: string;
  next_directive_needed: boolean;
  requested_follow_up?: string;
}

export interface ApprovalRequestRuntimeRecord extends RuntimeObjectRecord {
  object_type: "approval-request-record";
  authority_class: "coregentis_private_runtime";
  primary_layer: "organization_runtime_layer";
  status: "pending" | "resolved" | "withdrawn" | "archived";
  project_id: string;
  cell_runtime_scope_id: string;
  target_objective_id?: string;
  request_kind: "approval" | "escalation";
  request_summary: string;
  requested_decision: string;
  urgency: "normal" | "high" | "critical";
}

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

export function is_cell_runtime_scope_record(
  record: RuntimeObjectRecord
): record is CellRuntimeScopeRecord {
  return record.object_type === "cell-runtime-scope";
}

export function is_cell_summary_runtime_record(
  record: RuntimeObjectRecord
): record is CellSummaryRuntimeRecord {
  return record.object_type === "cell-summary-runtime-record";
}

export function is_management_directive_runtime_record(
  record: RuntimeObjectRecord
): record is ManagementDirectiveRuntimeRecord {
  return record.object_type === "management-directive-record";
}

export function is_delivery_return_runtime_record(
  record: RuntimeObjectRecord
): record is DeliveryReturnRuntimeRecord {
  return record.object_type === "delivery-return-record";
}

export function is_approval_request_runtime_record(
  record: RuntimeObjectRecord
): record is ApprovalRequestRuntimeRecord {
  return record.object_type === "approval-request-record";
}

export function list_unique_strings(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value && value.length > 0)))];
}
