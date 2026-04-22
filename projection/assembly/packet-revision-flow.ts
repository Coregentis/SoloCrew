import { createHash } from "node:crypto";

import {
  createPacketRevisionCandidate,
  type CreatePacketRevisionCandidateInput,
} from "../adapters/packet-revision-adapter.ts";
import {
  PACKET_REVISION_BOUNDARY_SUMMARY,
  type PacketRevisionLifecycleStage,
  type PacketRevisionCandidate,
  type PacketRevisionRelationship,
  type PacketRevisionReviewPosture,
  type PacketRevisionStagingPosture,
} from "../contracts/packet-revision-contract.ts";

function stable_stringify(value: unknown): string {
  if (Array.isArray(value)) {
    return `[${value.map((item) => stable_stringify(item)).join(",")}]`;
  }

  if (value && typeof value === "object") {
    const entries = Object.entries(value).sort(([left], [right]) =>
      left.localeCompare(right)
    );
    return `{${entries
      .map(([key, nested]) => `${JSON.stringify(key)}:${stable_stringify(nested)}`)
      .join(",")}}`;
  }

  return JSON.stringify(value);
}

function deterministic_id(prefix: string, seed: string): string {
  return `${prefix}_${createHash("sha1").update(seed).digest("hex").slice(0, 16)}`;
}

export type PacketRevisionFlowInput = {
  project_id: string;
  previous_packet_candidate_id: string;
  revision_input: CreatePacketRevisionCandidateInput;
};

export type PacketRevisionFlowResult = {
  project_id: string;
  previous_packet_candidate_id: string;
  revision_candidate: PacketRevisionCandidate;
  lifecycle_stage: PacketRevisionLifecycleStage;
  lifecycle_label: string;
  evidence_gap_summary?: string;
  revision_relationship: PacketRevisionRelationship;
  review_posture: PacketRevisionReviewPosture;
  review_posture_label: string;
  staging_posture: PacketRevisionStagingPosture;
  staging_posture_label: string;
  non_executing_posture: string;
  packet_lifecycle_summary: string;
  boundary_summary: string;
};

function create_blocked_candidate(args: {
  project_id: string;
  previous_packet_candidate_id: string;
  reason: string;
}): PacketRevisionCandidate {
  return {
    revision_candidate_id: deterministic_id(
      "packet_revision_blocked",
      stable_stringify(args)
    ),
    project_id: args.project_id,
    previous_packet_candidate_id: args.previous_packet_candidate_id,
    revision_reason: "contract_blocked",
    revision_input_summary: args.reason,
    evidence_gap: {
      gap_id: deterministic_id("packet_gap_blocked", stable_stringify(args)),
      project_id: args.project_id,
      evidence_available: false,
      insufficient: true,
      stale: false,
      gap_category: "other",
      user_visible_summary: args.reason,
      safe_evidence_refs: [],
      not_proof: true,
    },
    revision_status: "blocked_by_contract",
    lifecycle_stage: "contract_blocked",
    lifecycle_label: "contract blocked before review posture",
    evidence_gap_summary: args.reason,
    revision_relationship: {
      previous_packet_candidate_id: args.previous_packet_candidate_id,
      relationship_label:
        `Packet candidate ${args.previous_packet_candidate_id} remains the visible ` +
        "anchor because the revision is blocked before a revised packet candidate is available.",
    },
    review_posture: "blocked_by_contract",
    non_executing_posture: "Review-only, blocked by contract, and non-executing.",
    review_only: true,
    non_executing: true,
    boundary_summary: PACKET_REVISION_BOUNDARY_SUMMARY,
    interpretation_guards: {
      revision_candidate_is_approval: false,
      return_for_revision_is_rejection: false,
      revised_packet_is_execution: false,
      evidence_gap_is_proof: false,
      safe_clarification_prompt_is_provider_channel_send: false,
    },
  };
}

function format_review_posture_label(
  review_posture: PacketRevisionReviewPosture
): string {
  if (review_posture === "blocked_by_contract") {
    return "blocked-by-contract posture";
  }

  if (review_posture === "return_for_revision") {
    return "return-for-revision posture";
  }

  return "review-only posture";
}

function format_staging_posture_label(
  staging_posture: PacketRevisionStagingPosture
): string {
  if (staging_posture === "blocked_by_contract") {
    return "blocked-by-contract staging posture";
  }

  if (staging_posture === "not_dispatchable") {
    return "not-dispatchable staging posture";
  }

  return "not-sent staging posture";
}

function format_packet_lifecycle_summary(
  revision_candidate: PacketRevisionCandidate
): string {
  if (revision_candidate.review_posture === "blocked_by_contract") {
    return "Packet lifecycle: previous packet candidate -> contract blocked -> blocked-by-contract posture.";
  }

  if (revision_candidate.review_posture === "return_for_revision") {
    if (revision_candidate.evidence_gap_summary) {
      return "Packet lifecycle: previous packet candidate -> evidence gap -> return-for-revision posture.";
    }

    return "Packet lifecycle: previous packet candidate -> revision candidate -> return-for-revision posture.";
  }

  if (revision_candidate.revised_packet_candidate_id) {
    if (revision_candidate.evidence_gap_summary) {
      return "Packet lifecycle: previous packet candidate -> evidence gap -> revised packet candidate -> review-only posture.";
    }

    return "Packet lifecycle: previous packet candidate -> revised packet candidate -> review-only posture.";
  }

  return "Packet lifecycle: previous packet candidate -> revision candidate -> review-only posture.";
}

export function createPacketRevisionFlowResult(
  input: PacketRevisionFlowInput
): PacketRevisionFlowResult {
  let revision_candidate: PacketRevisionCandidate;

  try {
    if (input.project_id !== input.revision_input.project_id) {
      throw new Error("flow.project_id must match revision_input.project_id");
    }

    if (
      input.previous_packet_candidate_id !==
      input.revision_input.previous_packet_candidate_id
    ) {
      throw new Error(
        "flow.previous_packet_candidate_id must match revision_input.previous_packet_candidate_id"
      );
    }

    revision_candidate = createPacketRevisionCandidate(input.revision_input);
  } catch (error) {
    revision_candidate = create_blocked_candidate({
      project_id: input.project_id,
      previous_packet_candidate_id: input.previous_packet_candidate_id,
      reason:
        error instanceof Error ? error.message : "packet revision blocked by contract",
    });
  }

  const review_posture = revision_candidate.review_posture;

  const staging_posture =
    review_posture === "blocked_by_contract"
      ? "blocked_by_contract"
      : review_posture === "return_for_revision"
        ? "not_dispatchable"
        : "not_sent";
  const review_posture_label = format_review_posture_label(review_posture);
  const staging_posture_label = format_staging_posture_label(staging_posture);

  return {
    project_id: input.project_id,
    previous_packet_candidate_id: input.previous_packet_candidate_id,
    revision_candidate,
    lifecycle_stage: revision_candidate.lifecycle_stage,
    lifecycle_label: revision_candidate.lifecycle_label,
    evidence_gap_summary: revision_candidate.evidence_gap_summary,
    revision_relationship: revision_candidate.revision_relationship,
    review_posture,
    review_posture_label,
    staging_posture,
    staging_posture_label,
    non_executing_posture: revision_candidate.non_executing_posture,
    packet_lifecycle_summary: format_packet_lifecycle_summary(
      revision_candidate
    ),
    boundary_summary: revision_candidate.boundary_summary,
  };
}
