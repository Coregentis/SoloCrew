import type {
  ProductArtifactCellId,
} from "../artifacts/artifact-contract.ts";

export type ProductFeedbackKind =
  | "style_preference"
  | "structure_preference"
  | "correction"
  | "quality_signal"
  | "failure_pattern";

export interface ProductLearningFeedbackRecord {
  feedback_id: string;
  cell_id: ProductArtifactCellId;
  artifact_id: string;
  artifact_version_id: string;
  feedback_kind: ProductFeedbackKind;
  feedback_text: string;
  created_at: string;
  source_evidence_refs: string[];
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  runtime_private_fields_omitted: true;
}

export type ProductLearningApplicationScope =
  | "scope_only"
  | "global_candidate";

export type ProductLearningStatus =
  | "candidate"
  | "accepted"
  | "rejected"
  | "deferred";

export interface ProductLearningCandidateRecord {
  candidate_id: string;
  cell_id: ProductArtifactCellId;
  source_feedback_id: string;
  source_artifact_id: string;
  candidate_kind: string;
  summary: string;
  application_scope: ProductLearningApplicationScope;
  status: ProductLearningStatus;
  created_at: string;
  updated_at: string;
  source_evidence_refs: string[];
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  runtime_private_fields_omitted: true;
}

export type ProductDriftKind =
  | "goal_change"
  | "requirement_change"
  | "audience_shift"
  | "catalog_change"
  | "scope_conflict"
  | "stale_artifact";

export interface ProductDriftSignalRecord {
  drift_signal_id: string;
  cell_id: ProductArtifactCellId;
  source_artifact_id?: string;
  drift_kind: ProductDriftKind;
  change_summary: string;
  created_at: string;
  source_evidence_refs: string[];
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  runtime_private_fields_omitted: true;
}

export type ProductDriftRecommendation =
  | "continue"
  | "clarify"
  | "revise"
  | "branch"
  | "block";

export type ProductDriftImpactStatus =
  | "open"
  | "acknowledged"
  | "closed";

export interface ProductDriftImpactRecord {
  drift_impact_id: string;
  cell_id: ProductArtifactCellId;
  source_drift_signal_id: string;
  affected_artifact_refs: string[];
  affected_task_refs: string[];
  impact_summary: string;
  recommendation: ProductDriftRecommendation;
  status: ProductDriftImpactStatus;
  created_at: string;
  updated_at: string;
  source_evidence_refs: string[];
  non_executing: true;
  provider_execution_available: false;
  channel_entry_available: false;
  runtime_private_fields_omitted: true;
}

export interface ProductLearningDriftStoreSnapshot {
  store_kind: "solocrew_learning_drift_store";
  schema_version: 1;
  feedback_records: ProductLearningFeedbackRecord[];
  learning_candidates: ProductLearningCandidateRecord[];
  drift_signals: ProductDriftSignalRecord[];
  drift_impacts: ProductDriftImpactRecord[];
}

export interface CaptureArtifactFeedbackInput {
  cell_id: ProductArtifactCellId;
  artifact_id: string;
  artifact_version_id: string;
  feedback_kind: ProductFeedbackKind;
  feedback_text: string;
  source_evidence_refs?: string[];
}

export interface CreateLearningCandidateFromFeedbackInput {
  feedback: ProductLearningFeedbackRecord;
  candidate_kind?: string;
  summary?: string;
}

export interface CaptureDriftSignalInput {
  cell_id: ProductArtifactCellId;
  source_artifact_id?: string;
  drift_kind: ProductDriftKind;
  change_summary: string;
  source_evidence_refs?: string[];
}

export interface CreateDriftImpactFromSignalInput {
  drift_signal: ProductDriftSignalRecord;
  affected_artifact_refs?: string[];
  affected_task_refs?: string[];
  source_evidence_refs?: string[];
}

export interface LearningSummaryForCell {
  accepted_scope_only_learning: string[];
  global_candidate_learning: string[];
  inactive_learning: string[];
}
