import {
  type PacketRevisionFlowResult,
} from "../../projection/assembly/packet-revision-flow.ts";

export type V12PacketRevisionPageModel = {
  revision_candidate_id: string;
  previous_packet_candidate_id: string;
  revised_packet_candidate_id?: string;
  lifecycle_stage:
    | "evidence_gap"
    | "revision_candidate"
    | "review_posture"
    | "contract_blocked";
  lifecycle_label: string;
  packet_lifecycle_summary: string;
  revision_reason_label: string;
  evidence_gap_summary?: string;
  revision_relationship_label: string;
  safe_clarification_prompt?: string;
  revision_status:
    | "needs_clarification"
    | "revision_candidate_created"
    | "ready_for_review"
    | "return_for_revision"
    | "blocked_by_contract";
  review_posture: "review_only" | "return_for_revision" | "blocked_by_contract";
  review_posture_label: string;
  staging_posture: "not_sent" | "not_dispatchable" | "blocked_by_contract";
  staging_posture_label: string;
  non_executing_posture: string;
  boundary_summary: string;
  interpretation_guards: {
    revision_is_approval: false;
    return_for_revision_is_rejection: false;
    revised_packet_is_execution: false;
    evidence_gap_is_proof: false;
    safe_clarification_prompt_is_provider_channel_send: false;
  };
};

function format_revision_reason_label(reason: string): string {
  if (reason === "contract_blocked") {
    return "blocked by contract";
  }

  if (reason === "operator_clarification") {
    return "operator clarification";
  }

  return reason.replaceAll("_", " ");
}

function format_boundary_summary(result: PacketRevisionFlowResult): string {
  return `${result.boundary_summary} ${result.non_executing_posture}`;
}

export function createV12PacketRevisionPageModel(
  result: PacketRevisionFlowResult
): V12PacketRevisionPageModel {
  return {
    revision_candidate_id: result.revision_candidate.revision_candidate_id,
    previous_packet_candidate_id:
      result.revision_candidate.previous_packet_candidate_id,
    revised_packet_candidate_id:
      result.revision_candidate.revised_packet_candidate_id,
    lifecycle_stage: result.lifecycle_stage,
    lifecycle_label: result.lifecycle_label,
    packet_lifecycle_summary: result.packet_lifecycle_summary,
    revision_reason_label: format_revision_reason_label(
      result.revision_candidate.revision_reason
    ),
    evidence_gap_summary:
      result.evidence_gap_summary ??
      result.revision_candidate.evidence_gap?.user_visible_summary,
    revision_relationship_label: result.revision_relationship.relationship_label,
    safe_clarification_prompt: result.revision_candidate.safe_clarification_prompt,
    revision_status: result.revision_candidate.revision_status,
    review_posture: result.review_posture,
    review_posture_label: result.review_posture_label,
    staging_posture: result.staging_posture,
    staging_posture_label: result.staging_posture_label,
    non_executing_posture: result.non_executing_posture,
    boundary_summary: format_boundary_summary(result),
    interpretation_guards: {
      revision_is_approval: false,
      return_for_revision_is_rejection: false,
      revised_packet_is_execution: false,
      evidence_gap_is_proof: false,
      safe_clarification_prompt_is_provider_channel_send: false,
    },
  };
}
