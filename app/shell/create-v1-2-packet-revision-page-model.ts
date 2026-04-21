import {
  type PacketRevisionFlowResult,
} from "../../projection/assembly/packet-revision-flow.ts";

export type V12PacketRevisionPageModel = {
  revision_candidate_id: string;
  previous_packet_candidate_id: string;
  revised_packet_candidate_id?: string;
  revision_reason_label: string;
  evidence_gap_summary?: string;
  safe_clarification_prompt?: string;
  revision_status:
    | "needs_clarification"
    | "revision_candidate_created"
    | "ready_for_review"
    | "return_for_revision"
    | "blocked_by_contract";
  review_posture: "review_only" | "return_for_revision" | "blocked_by_contract";
  staging_posture: "not_sent" | "not_dispatchable" | "blocked_by_contract";
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
  if (result.review_posture === "blocked_by_contract") {
    return `${result.boundary_summary} Blocked by contract remains review-only and not dispatchable.`;
  }

  if (result.review_posture === "return_for_revision") {
    return `${result.boundary_summary} Return for revision remains review-only and not dispatchable.`;
  }

  return `${result.boundary_summary} Ready for review remains review-only and not sent.`;
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
    revision_reason_label: format_revision_reason_label(
      result.revision_candidate.revision_reason
    ),
    evidence_gap_summary: result.revision_candidate.evidence_gap?.user_visible_summary,
    safe_clarification_prompt: result.revision_candidate.safe_clarification_prompt,
    revision_status: result.revision_candidate.revision_status,
    review_posture: result.review_posture,
    staging_posture: result.staging_posture,
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
