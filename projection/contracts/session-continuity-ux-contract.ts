export type SoloCrewLocalHistoryTimelineItem = {
  project_id: string;
  continuity_id: string;
  lifecycle_label: string;
  history_summary: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  non_executing_posture: string;
};

export type SoloCrewLocalHistoryTimelineView = {
  project_id: string;
  continuity_id: string;
  session_label: string;
  history_summary: string;
  local_history_items: SoloCrewLocalHistoryTimelineItem[];
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  non_executing_posture: string;
};

export type SoloCrewReviewTrailItem = {
  project_id: string;
  continuity_id: string;
  lifecycle_label: string;
  history_summary: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  non_executing_posture: string;
};

export type SoloCrewReviewTrailView = {
  project_id: string;
  continuity_id: string;
  session_label: string;
  history_summary: string;
  review_trail_items: SoloCrewReviewTrailItem[];
  pending_review_count?: number;
  pending_review_visibility?: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  non_executing_posture: string;
};

export type SoloCrewContinuityReplayStep = {
  project_id: string;
  continuity_id: string;
  session_label: string;
  lifecycle_label: string;
  history_summary: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  non_executing_posture: string;
};

export type SoloCrewSessionContinuityPanelView = {
  project_id: string;
  continuity_id: string;
  session_label: string;
  continuity_summary: string;
  lifecycle_label: string;
  history_summary: string;
  local_history_items: SoloCrewLocalHistoryTimelineItem[];
  review_trail_items: SoloCrewReviewTrailItem[];
  pending_review_count?: number;
  pending_review_visibility?: string;
  continuity_snapshot_summary?: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  non_executing_posture: string;
};

export const SESSION_CONTINUITY_UX_BOUNDARY_LINES = [
  "Local history is display-only.",
  "Review trail is display-only.",
  "Continuity replay is guided viewing, not execution replay.",
  "No durable multi-session persistence claim.",
  "No action-preparation surface.",
  "No provider/channel execution.",
  "No approve/reject/dispatch/execute behavior.",
  "No founder queue or queue implementation.",
  "Runtime-private fields remain omitted.",
] as const;

export const SESSION_CONTINUITY_UX_BOUNDARY_SUMMARY =
  SESSION_CONTINUITY_UX_BOUNDARY_LINES.join(" ");
