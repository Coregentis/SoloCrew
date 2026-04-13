import type {
  ActionDispatchOutcome,
  ExecutionEventContract,
  PreferenceWritebackResult,
} from "../../runtime-imports/cognitive-runtime.ts";
import { createReviewStrip, type ReviewStrip } from "../objects/review-strip.ts";
import type {
  ObjectiveRecord,
  ReviewCycleRecord,
  WorkItemRecord,
} from "./upstream-record-types.ts";

export interface ReviewStripAdapterInput {
  crew_id: string;
  review_cycle?: ReviewCycleRecord;
  objective?: ObjectiveRecord;
  work_items: WorkItemRecord[];
  action_outcomes?: ActionDispatchOutcome[];
  execution_events?: ExecutionEventContract[];
  correction_writeback_signal?: PreferenceWritebackResult;
}

function derive_moved_items(
  work_items: WorkItemRecord[],
  action_outcomes: ActionDispatchOutcome[]
): string[] {
  if (action_outcomes.some((outcome) => outcome.disposition === "success")) {
    return work_items
      .filter((record) => record.status === "active" || record.status === "completed")
      .map((record) => record.object_id);
  }

  return [];
}

function derive_blocked_items(
  work_items: WorkItemRecord[],
  action_outcomes: ActionDispatchOutcome[]
): string[] {
  const blocked_ids = work_items
    .filter((record) => record.status === "blocked")
    .map((record) => record.object_id);

  if (blocked_ids.length > 0) {
    return blocked_ids;
  }

  if (action_outcomes.some((outcome) => outcome.disposition === "failure")) {
    return work_items.slice(0, 1).map((record) => record.object_id);
  }

  return [];
}

function derive_needs_decision(
  objective: ObjectiveRecord | undefined,
  execution_events: ExecutionEventContract[]
): string[] {
  if (!objective) {
    return [];
  }

  const requested_review = execution_events.some(
    (event) =>
      event.event_type === "execution_requested" &&
      event.payload?.request_kind === "review"
  );
  const failed = execution_events.some(
    (event) => event.event_type === "execution_failed"
  );

  if (requested_review || failed) {
    return [objective.object_id];
  }

  return [];
}

function derive_changed_preferences(
  correction_writeback_signal: PreferenceWritebackResult | undefined
): string[] {
  if (correction_writeback_signal?.disposition !== "applied") {
    return [];
  }

  return correction_writeback_signal.preference_profile
    ? [correction_writeback_signal.preference_profile.object_id]
    : correction_writeback_signal.notes;
}

export function adaptReviewStrip(
  input: ReviewStripAdapterInput
): ReviewStrip {
  const action_outcomes = input.action_outcomes ?? [];
  const execution_events = input.execution_events ?? [];

  return createReviewStrip({
    projection_id: `review-strip:${input.review_cycle?.object_id ?? input.crew_id}`,
    review_strip_id: input.review_cycle?.object_id ?? `${input.crew_id}:review-strip`,
    crew_id: input.crew_id,
    upstream_refs: [
      ...(input.review_cycle
        ? [
            {
              source_repo: "Cognitive_OS" as const,
              upstream_object_type: input.review_cycle.object_type,
              upstream_object_id: input.review_cycle.object_id,
            },
          ]
        : []),
      ...(input.objective
        ? [
            {
              source_repo: "Cognitive_OS" as const,
              upstream_object_type: input.objective.object_type,
              upstream_object_id: input.objective.object_id,
            },
          ]
        : []),
      ...input.work_items.map((record) => ({
        source_repo: "Cognitive_OS" as const,
        upstream_object_type: record.object_type,
        upstream_object_id: record.object_id,
      })),
      ...execution_events.map((event) => ({
        source_repo: "Cognitive_OS" as const,
        upstream_object_type: "execution-event",
        upstream_object_id: event.event_id,
      })),
    ],
    moved_items: derive_moved_items(input.work_items, action_outcomes),
    blocked_items: derive_blocked_items(input.work_items, action_outcomes),
    needs_decision: derive_needs_decision(input.objective, execution_events),
    changed_preferences: derive_changed_preferences(
      input.correction_writeback_signal
    ),
  });
}
