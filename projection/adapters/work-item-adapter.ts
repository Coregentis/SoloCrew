import { createWorkItem, type WorkItem } from "../objects/work-item.ts";
import type { WorkItemRecord } from "./upstream-record-types.ts";

export interface WorkItemAdapterInput {
  work_item: WorkItemRecord;
  last_update_summary?: string;
}

export function adaptWorkItemToProjection(
  input: WorkItemAdapterInput
): WorkItem {
  return createWorkItem({
    projection_id: `work-item:${input.work_item.object_id}`,
    work_item_id: input.work_item.object_id,
    objective_id: input.work_item.objective_id,
    title: input.work_item.work_summary,
    kind: input.work_item.work_kind,
    status: input.work_item.status,
    upstream_refs: [
      {
        source_repo: "Cognitive_OS",
        upstream_object_type: input.work_item.object_type,
        upstream_object_id: input.work_item.object_id,
      },
    ],
    owner_member_id: input.work_item.assigned_worker_id,
    next_step:
      input.work_item.status === "completed"
        ? undefined
        : input.work_item.instruction_brief,
    last_update_summary: input.last_update_summary,
    deliverable_refs: Array.isArray(input.work_item.deliverable_refs)
      ? input.work_item.deliverable_refs
      : [],
  });
}
