import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export type ObjectiveStatus =
  | "draft"
  | "active"
  | "blocked"
  | "completed"
  | "archived";

export interface Objective extends ProjectionEnvelope<"objective"> {
  objective_id: string;
  crew_id: string;
  title: string;
  status: ObjectiveStatus;
  progress_summary?: string;
  success_hints: string[];
  assigned_member_ids: string[];
  active_work_item_ids: string[];
  blocked_decision_refs: string[];
  target_due_at?: string;
}

export interface CreateObjectiveInput {
  projection_id: string;
  objective_id: string;
  crew_id: string;
  title: string;
  status: ObjectiveStatus;
  upstream_refs: ProjectionUpstreamRef[];
  progress_summary?: string;
  success_hints?: string[];
  assigned_member_ids?: string[];
  active_work_item_ids?: string[];
  blocked_decision_refs?: string[];
  target_due_at?: string;
  projection_notes?: string[];
}

export function createObjective(
  input: CreateObjectiveInput
): Objective {
  return {
    projection_id: input.projection_id,
    object_type: "objective",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "implemented",
    upstream_refs: [...input.upstream_refs],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    objective_id: input.objective_id,
    crew_id: input.crew_id,
    title: input.title,
    status: input.status,
    progress_summary: input.progress_summary,
    success_hints: [...(input.success_hints ?? [])],
    assigned_member_ids: [...(input.assigned_member_ids ?? [])],
    active_work_item_ids: [...(input.active_work_item_ids ?? [])],
    blocked_decision_refs: [...(input.blocked_decision_refs ?? [])],
    target_due_at: input.target_due_at,
  };
}
