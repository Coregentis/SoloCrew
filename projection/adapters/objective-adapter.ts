import { createObjective, type Objective } from "../objects/objective.ts";
import type {
  ObjectiveRecord,
  WorkItemRecord,
} from "./upstream-record-types.ts";
import { list_unique_strings } from "./upstream-record-types.ts";

export interface ObjectiveAdapterInput {
  crew_id: string;
  objective: ObjectiveRecord;
  related_work_items: WorkItemRecord[];
}

export function adaptObjectiveToProjection(
  input: ObjectiveAdapterInput
): Objective {
  const assigned_member_ids = list_unique_strings(
    input.related_work_items.map((record) => record.assigned_worker_id)
  );
  const active_work_item_ids = input.related_work_items
    .filter(
      (record) =>
        record.status !== "completed" && record.status !== "cancelled"
    )
    .map((record) => record.object_id);
  const blocked_decision_refs = input.related_work_items
    .filter((record) => record.status === "blocked")
    .map((record) => record.object_id);

  return createObjective({
    projection_id: `objective:${input.objective.object_id}`,
    objective_id: input.objective.object_id,
    crew_id: input.crew_id,
    title: input.objective.objective_summary,
    status: input.objective.status,
    upstream_refs: [
      {
        source_repo: "Cognitive_OS",
        upstream_object_type: input.objective.object_type,
        upstream_object_id: input.objective.object_id,
      },
      ...input.related_work_items.map((record) => ({
        source_repo: "Cognitive_OS" as const,
        upstream_object_type: record.object_type,
        upstream_object_id: record.object_id,
      })),
    ],
    progress_summary: input.objective.progress_summary,
    success_hints: Array.isArray(input.objective.success_signals)
      ? input.objective.success_signals
      : [],
    assigned_member_ids,
    active_work_item_ids,
    blocked_decision_refs,
    target_due_at: input.objective.target_due_at,
  });
}
