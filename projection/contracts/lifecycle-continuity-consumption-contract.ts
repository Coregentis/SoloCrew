export type SoloCrewLifecycleHistoryView = {
  project_id: string;
  continuity_id: string;
  lifecycle_stage: string;
  lifecycle_label: string;
  history_summary: string;
  evidence_gap_summary?: string;
  review_posture: string;
  non_executing_posture: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
};

export type SoloCrewPendingReviewItemView = {
  project_id: string;
  continuity_id: string;
  lifecycle_stage: string;
  lifecycle_label: string;
  history_summary: string;
  evidence_gap_summary?: string;
  review_posture: string;
  non_executing_posture: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
};

export type SoloCrewLifecycleContinuityView = {
  project_id: string;
  continuity_id: string;
  lifecycle_stage: string;
  lifecycle_label: string;
  history_summary: string;
  evidence_gap_summary?: string;
  review_posture: string;
  non_executing_posture: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
};

export type SoloCrewPendingReviewView = {
  project_id: string;
  continuity_id: string;
  lifecycle_stage: string;
  lifecycle_label: string;
  history_summary: string;
  pending_review_count: number;
  pending_review_items: SoloCrewPendingReviewItemView[];
  evidence_gap_summary?: string;
  review_posture: string;
  non_executing_posture: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
};

export type SoloCrewContinuitySnapshotView = {
  project_id: string;
  continuity_id: string;
  lifecycle_stage: string;
  lifecycle_label: string;
  history_summary: string;
  pending_review_count: number;
  pending_review_items: SoloCrewPendingReviewItemView[];
  evidence_gap_summary?: string;
  review_posture: string;
  non_executing_posture: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
};

export const LIFECYCLE_CONTINUITY_CONSUMPTION_BOUNDARY_LINES = [
  "Continuity consumption is summary-only.",
  "Pending review visibility is not a queue, dispatch unit, approval, or execution task.",
  "Continuity snapshots remain non-executing.",
  "No provider/channel execution.",
  "No approve/reject/dispatch/execute behavior.",
  "No founder queue behavior.",
  "Safe evidence references are references only, not proof/certification.",
  "Runtime-private fields remain omitted.",
] as const;

export const LIFECYCLE_CONTINUITY_CONSUMPTION_BOUNDARY_SUMMARY =
  LIFECYCLE_CONTINUITY_CONSUMPTION_BOUNDARY_LINES.join(" ");
