import type {
  ProductArtifactCellId,
} from "../artifacts/artifact-contract.ts";
import {
  ProductLearningDriftStore,
} from "./learning-drift-store.ts";
import type {
  CaptureArtifactFeedbackInput,
  CreateLearningCandidateFromFeedbackInput,
  LearningSummaryForCell,
  ProductLearningApplicationScope,
  ProductLearningCandidateRecord,
  ProductLearningFeedbackRecord,
  ProductLearningStatus,
} from "./learning-drift-contract.ts";

const DEFAULT_CREATED_AT = "2026-04-26T00:00:00.000Z";

function stable_hash(value: string): string {
  let hash = 0;
  for (const character of value) {
    hash = (hash * 31 + character.charCodeAt(0)) % 2147483647;
  }

  return hash.toString(36);
}

function clone_feedback(
  feedback: ProductLearningFeedbackRecord
): ProductLearningFeedbackRecord {
  return JSON.parse(JSON.stringify(feedback)) as ProductLearningFeedbackRecord;
}

function clone_candidate(
  candidate: ProductLearningCandidateRecord
): ProductLearningCandidateRecord {
  return JSON.parse(JSON.stringify(candidate)) as ProductLearningCandidateRecord;
}

function save_feedback(
  store: ProductLearningDriftStore,
  feedback: ProductLearningFeedbackRecord
): ProductLearningFeedbackRecord {
  const snapshot = store.load_snapshot();
  snapshot.feedback_records = [
    ...snapshot.feedback_records.filter(
      (existing) => existing.feedback_id !== feedback.feedback_id
    ),
    clone_feedback(feedback),
  ];
  store.save_snapshot(snapshot);
  return clone_feedback(feedback);
}

function save_candidate(
  store: ProductLearningDriftStore,
  candidate: ProductLearningCandidateRecord
): ProductLearningCandidateRecord {
  const snapshot = store.load_snapshot();
  snapshot.learning_candidates = [
    ...snapshot.learning_candidates.filter(
      (existing) => existing.candidate_id !== candidate.candidate_id
    ),
    clone_candidate(candidate),
  ];
  store.save_snapshot(snapshot);
  return clone_candidate(candidate);
}

function update_candidate_status(
  store: ProductLearningDriftStore,
  candidate_id: string,
  status: ProductLearningStatus
): ProductLearningCandidateRecord | null {
  const snapshot = store.load_snapshot();
  const candidate = snapshot.learning_candidates.find(
    (entry) => entry.candidate_id === candidate_id
  );

  if (!candidate) {
    return null;
  }

  const updated: ProductLearningCandidateRecord = {
    ...candidate,
    status,
    updated_at: `${candidate.created_at}:${status}`,
  };

  snapshot.learning_candidates = snapshot.learning_candidates.map((entry) =>
    entry.candidate_id === candidate_id ? updated : entry
  );
  store.save_snapshot(snapshot);
  return clone_candidate(updated);
}

function create_candidate_id(args: {
  feedback: ProductLearningFeedbackRecord;
  application_scope: ProductLearningApplicationScope;
  candidate_kind: string;
}): string {
  return [
    args.feedback.cell_id,
    args.feedback.artifact_id,
    args.application_scope,
    stable_hash(`${args.feedback.feedback_id}|${args.candidate_kind}`),
  ].join(":");
}

export function captureArtifactFeedback(
  store: ProductLearningDriftStore,
  input: CaptureArtifactFeedbackInput
): ProductLearningFeedbackRecord {
  const normalized_text = input.feedback_text.trim();
  const feedback_id = [
    input.cell_id,
    input.artifact_id,
    input.feedback_kind,
    stable_hash(normalized_text),
  ].join(":");
  const feedback: ProductLearningFeedbackRecord = {
    feedback_id,
    cell_id: input.cell_id,
    artifact_id: input.artifact_id,
    artifact_version_id: input.artifact_version_id,
    feedback_kind: input.feedback_kind,
    feedback_text: normalized_text,
    created_at: DEFAULT_CREATED_AT,
    source_evidence_refs: [...(input.source_evidence_refs ?? [])],
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    runtime_private_fields_omitted: true,
  };

  return save_feedback(store, feedback);
}

export function listFeedbackByCell(
  store: ProductLearningDriftStore,
  cell_id: ProductArtifactCellId
): ProductLearningFeedbackRecord[] {
  return store
    .load_snapshot()
    .feedback_records.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.feedback_id.localeCompare(right.feedback_id))
    .map(clone_feedback);
}

function create_candidate_from_feedback(args: {
  store: ProductLearningDriftStore;
  input: CreateLearningCandidateFromFeedbackInput;
  application_scope: ProductLearningApplicationScope;
}): ProductLearningCandidateRecord {
  const candidate_kind =
    args.input.candidate_kind ?? args.input.feedback.feedback_kind;
  const summary =
    args.input.summary ?? args.input.feedback.feedback_text.trim();
  const candidate: ProductLearningCandidateRecord = {
    candidate_id: create_candidate_id({
      feedback: args.input.feedback,
      application_scope: args.application_scope,
      candidate_kind,
    }),
    cell_id: args.input.feedback.cell_id,
    source_feedback_id: args.input.feedback.feedback_id,
    source_artifact_id: args.input.feedback.artifact_id,
    candidate_kind,
    summary,
    application_scope: args.application_scope,
    status: "candidate",
    created_at: DEFAULT_CREATED_AT,
    updated_at: DEFAULT_CREATED_AT,
    source_evidence_refs: [...args.input.feedback.source_evidence_refs],
    non_executing: true,
    provider_execution_available: false,
    channel_entry_available: false,
    runtime_private_fields_omitted: true,
  };

  return save_candidate(args.store, candidate);
}

export function createLearningCandidateFromFeedback(
  store: ProductLearningDriftStore,
  input: CreateLearningCandidateFromFeedbackInput
): ProductLearningCandidateRecord {
  return create_candidate_from_feedback({
    store,
    input,
    application_scope: "scope_only",
  });
}

export function createGlobalLearningCandidateFromFeedback(
  store: ProductLearningDriftStore,
  input: CreateLearningCandidateFromFeedbackInput
): ProductLearningCandidateRecord {
  return create_candidate_from_feedback({
    store,
    input,
    application_scope: "global_candidate",
  });
}

export function acceptLearningCandidate(
  store: ProductLearningDriftStore,
  candidate_id: string
): ProductLearningCandidateRecord | null {
  return update_candidate_status(store, candidate_id, "accepted");
}

export function rejectLearningCandidate(
  store: ProductLearningDriftStore,
  candidate_id: string
): ProductLearningCandidateRecord | null {
  return update_candidate_status(store, candidate_id, "rejected");
}

export function deferLearningCandidate(
  store: ProductLearningDriftStore,
  candidate_id: string
): ProductLearningCandidateRecord | null {
  return update_candidate_status(store, candidate_id, "deferred");
}

export function listLearningCandidatesByCell(
  store: ProductLearningDriftStore,
  cell_id: ProductArtifactCellId
): ProductLearningCandidateRecord[] {
  return store
    .load_snapshot()
    .learning_candidates.filter((entry) => entry.cell_id === cell_id)
    .sort((left, right) => left.candidate_id.localeCompare(right.candidate_id))
    .map(clone_candidate);
}

export function listAcceptedLearningByCell(
  store: ProductLearningDriftStore,
  cell_id: ProductArtifactCellId
): ProductLearningCandidateRecord[] {
  return listLearningCandidatesByCell(store, cell_id).filter(
    (entry) =>
      entry.status === "accepted" && entry.application_scope === "scope_only"
  );
}

export function listGlobalLearningCandidates(
  store: ProductLearningDriftStore
): ProductLearningCandidateRecord[] {
  return store
    .load_snapshot()
    .learning_candidates.filter(
      (entry) => entry.application_scope === "global_candidate"
    )
    .sort((left, right) => left.candidate_id.localeCompare(right.candidate_id))
    .map(clone_candidate);
}

export function summarizeLearningForCell(
  candidates: ProductLearningCandidateRecord[],
  cell_id: ProductArtifactCellId
): LearningSummaryForCell {
  const same_cell_candidates = candidates.filter((entry) => entry.cell_id === cell_id);
  return {
    accepted_scope_only_learning: same_cell_candidates
      .filter(
        (entry) =>
          entry.application_scope === "scope_only" &&
          entry.status === "accepted"
      )
      .map((entry) => entry.summary),
    global_candidate_learning: same_cell_candidates
      .filter((entry) => entry.application_scope === "global_candidate")
      .map((entry) => entry.summary),
    inactive_learning: same_cell_candidates
      .filter(
        (entry) =>
          entry.status === "rejected" || entry.status === "deferred"
      )
      .map((entry) => entry.summary),
  };
}
