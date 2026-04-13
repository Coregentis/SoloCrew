import {
  SOLOCREW_CONTRACT_VERSION,
  type ProjectionEnvelope,
  type ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

export type WorkItemStatus =
  | "queued"
  | "active"
  | "blocked"
  | "completed"
  | "cancelled";

export type WorkItemKind =
  | "analysis"
  | "build"
  | "review"
  | "coordination"
  | "operations";

export interface WorkItem extends ProjectionEnvelope<"work-item"> {
  work_item_id: string;
  objective_id: string;
  title: string;
  kind: WorkItemKind;
  status: WorkItemStatus;
  owner_member_id?: string;
  next_step?: string;
  last_update_summary?: string;
  deliverable_refs: string[];
}

export interface CreateWorkItemInput {
  projection_id: string;
  work_item_id: string;
  objective_id: string;
  title: string;
  kind: WorkItemKind;
  status: WorkItemStatus;
  upstream_refs: ProjectionUpstreamRef[];
  owner_member_id?: string;
  next_step?: string;
  last_update_summary?: string;
  deliverable_refs?: string[];
  projection_notes?: string[];
}

export function createWorkItem(
  input: CreateWorkItemInput
): WorkItem {
  return {
    projection_id: input.projection_id,
    object_type: "work-item",
    contract_version: SOLOCREW_CONTRACT_VERSION,
    availability: "implemented",
    upstream_refs: [...input.upstream_refs],
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
    work_item_id: input.work_item_id,
    objective_id: input.objective_id,
    title: input.title,
    kind: input.kind,
    status: input.status,
    owner_member_id: input.owner_member_id,
    next_step: input.next_step,
    last_update_summary: input.last_update_summary,
    deliverable_refs: [...(input.deliverable_refs ?? [])],
  };
}
