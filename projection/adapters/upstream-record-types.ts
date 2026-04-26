export type WorkforceEnvelopeScopeStatus =
  | "forming"
  | "active"
  | "paused"
  | "archived";

export type WorkforceEnvelopeScopeMode =
  | "single_operator_bounded"
  | "multi_scope_bounded";

export type WorkforceEnvelopeDeliveryPosture =
  | "steady"
  | "attention"
  | "blocked"
  | "unknown";

export interface WorkforceProjectionSafeEnvelope {
  envelope_version: "0.1";
  envelope_kind: "workforce_projection_safe_envelope";
  source_runtime_family: "workforce";
  project_id: string;
  scope_ref: string;
  scope_label: string;
  scope_status: WorkforceEnvelopeScopeStatus;
  scope_mode: WorkforceEnvelopeScopeMode;
  summary_headline?: string;
  delivery_posture?: WorkforceEnvelopeDeliveryPosture;
  safe_evidence_refs: string[];
  projection_notes: string[];
  runtime_private_fields_omitted: true;
  non_executing: true;
  created_at?: string;
}

export interface WorkforceManagementDirectiveProjectionInput {
  directive_ref: string;
  objective_ref?: string;
  directive_summary: string;
  directive_priority: "focus_now" | "stabilize" | "review_first";
  approval_posture:
    | "operator_required"
    | "bounded_autonomy"
    | "escalate_on_stop";
  constraint_tags?: string[];
  safe_evidence_refs?: string[];
}

export interface WorkforceDeliveryReturnProjectionInput {
  delivery_return_ref: string;
  objective_ref?: string;
  delivery_status:
    | "in_progress"
    | "ready_for_review"
    | "blocked"
    | "returned"
    | "archived";
  completed_summary: string;
  blocked_summary: string;
  next_directive_needed: boolean;
  requested_follow_up?: string;
  safe_evidence_refs?: string[];
}

export interface WorkforceApprovalRequestProjectionInput {
  approval_request_ref: string;
  objective_ref?: string;
  request_kind: "approval" | "escalation";
  request_status: "pending" | "resolved" | "withdrawn" | "archived";
  request_summary: string;
  requested_decision: string;
  urgency: "normal" | "high" | "critical";
  safe_evidence_refs?: string[];
}

export interface WorkforceCellProjectionInput {
  workforce_envelope: WorkforceProjectionSafeEnvelope;
  active_work_item_count?: number;
  blocked_work_item_count?: number;
  continuity_hint?: string;
  management_directive?: WorkforceManagementDirectiveProjectionInput;
  delivery_return?: WorkforceDeliveryReturnProjectionInput;
  approval_request?: WorkforceApprovalRequestProjectionInput;
}

export type AgentGroupRecord = {
  object_type: "agent-group";
  status: "forming" | "active" | "paused" | "archived";
  group_name: string;
  group_summary?: string;
  worker_ids?: string[];
  role_profile_ids?: string[];
  objective_ids?: string[];
  review_cycle_id?: string;
  continuity_mode?: "single_operator" | "scheduled_runtime" | "continuous_runtime";
};

export type RoleProfileRecord = {
  object_type: "role-profile";
  status: "draft" | "active" | "deprecated" | "archived";
  profile_name: string;
  responsibility_summary: string;
  instruction_brief: string;
  capability_tags?: string[];
  operating_constraints?: string[];
};

export type WorkItemKind =
  | "analysis"
  | "build"
  | "review"
  | "coordination"
  | "operations";

export type WorkItemRecord = {
  object_type: "work-item";
  status: "queued" | "active" | "blocked" | "completed" | "cancelled";
  objective_id: string;
  assigned_worker_id?: string;
  work_summary: string;
  work_kind: WorkItemKind;
  instruction_brief?: string;
  dependency_ids?: string[];
  deliverable_refs?: string[];
};

export type ReviewCycleRecord = {
  object_type: "review-cycle";
  status: "scheduled" | "active" | "closed" | "archived";
  group_id?: string;
  cadence_kind: "daily" | "weekly" | "milestone" | "on_demand";
  review_scope_summary: string;
  objective_ids?: string[];
  participant_worker_ids?: string[];
  next_review_at: string;
  last_review_at?: string;
};

export function is_workforce_projection_safe_envelope(
  value: unknown
): value is WorkforceProjectionSafeEnvelope {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }

  const record = value as Partial<WorkforceProjectionSafeEnvelope>;
  return (
    record.envelope_version === "0.1" &&
    record.envelope_kind === "workforce_projection_safe_envelope" &&
    record.source_runtime_family === "workforce" &&
    record.runtime_private_fields_omitted === true &&
    record.non_executing === true &&
    typeof record.project_id === "string" &&
    typeof record.scope_ref === "string" &&
    typeof record.scope_label === "string" &&
    typeof record.scope_status === "string" &&
    typeof record.scope_mode === "string"
  );
}

export function is_agent_group_record(
  record: { object_type?: string }
): record is AgentGroupRecord {
  return record.object_type === "agent-group";
}

export function is_role_profile_record(
  record: { object_type?: string }
): record is RoleProfileRecord {
  return record.object_type === "role-profile";
}

export function is_work_item_record(
  record: { object_type?: string }
): record is WorkItemRecord {
  return record.object_type === "work-item";
}

export function is_review_cycle_record(
  record: { object_type?: string }
): record is ReviewCycleRecord {
  return record.object_type === "review-cycle";
}

export function list_unique_strings(values: Array<string | undefined>): string[] {
  return [...new Set(values.filter((value): value is string => Boolean(value && value.length > 0)))];
}
