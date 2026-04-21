export type PacketRevisionReason =
  | "insufficient_evidence"
  | "stale_context"
  | "operator_clarification"
  | "contract_blocked"
  | "other";

export type PacketEvidenceGapCategory =
  | "missing_required_context"
  | "stale_context"
  | "conflicting_evidence"
  | "runtime_private_omitted"
  | "other";

export type PacketEvidenceGap = {
  gap_id: string;
  project_id: string;
  evidence_available: boolean;
  insufficient: boolean;
  stale: boolean;
  gap_category?: PacketEvidenceGapCategory;
  user_visible_summary: string;
  safe_evidence_refs?: string[];
  not_proof: true;
};

export type PacketRevisionStatus =
  | "needs_clarification"
  | "revision_candidate_created"
  | "ready_for_review"
  | "return_for_revision"
  | "blocked_by_contract";

export const PACKET_REVISION_BOUNDARY_LINES = [
  "Review-only packet revision candidate.",
  "No provider/channel execution.",
  "No approve/reject/dispatch/execute behavior.",
  "No founder queue behavior.",
  "Evidence gap is not proof/certification.",
  "Safe clarification prompt is not provider/channel send.",
] as const;

export const PACKET_REVISION_BOUNDARY_SUMMARY =
  PACKET_REVISION_BOUNDARY_LINES.join(" ");

export type PacketRevisionCandidate = {
  revision_candidate_id: string;
  project_id: string;
  previous_packet_candidate_id: string;
  revised_packet_candidate_id?: string;
  revision_reason: PacketRevisionReason;
  revision_input_summary: string;
  evidence_gap?: PacketEvidenceGap;
  safe_clarification_prompt?: string;
  revision_status: PacketRevisionStatus;
  review_only: true;
  non_executing: true;
  boundary_summary: string;
  interpretation_guards: {
    revision_candidate_is_approval: false;
    return_for_revision_is_rejection: false;
    revised_packet_is_execution: false;
    evidence_gap_is_proof: false;
    safe_clarification_prompt_is_provider_channel_send: false;
  };
};
