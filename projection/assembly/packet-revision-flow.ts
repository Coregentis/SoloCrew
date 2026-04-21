import { createHash } from "node:crypto";

import {
  createPacketRevisionCandidate,
  type CreatePacketRevisionCandidateInput,
} from "../adapters/packet-revision-adapter.ts";
import {
  PACKET_REVISION_BOUNDARY_SUMMARY,
  type PacketRevisionCandidate,
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
  review_posture: "review_only" | "return_for_revision" | "blocked_by_contract";
  staging_posture: "not_sent" | "not_dispatchable" | "blocked_by_contract";
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

  const review_posture =
    revision_candidate.revision_status === "blocked_by_contract"
      ? "blocked_by_contract"
      : revision_candidate.revision_status === "needs_clarification" ||
          revision_candidate.revision_status === "return_for_revision"
        ? "return_for_revision"
        : "review_only";

  const staging_posture =
    revision_candidate.revision_status === "blocked_by_contract"
      ? "blocked_by_contract"
      : review_posture === "return_for_revision"
        ? "not_dispatchable"
        : "not_sent";

  return {
    project_id: input.project_id,
    previous_packet_candidate_id: input.previous_packet_candidate_id,
    revision_candidate,
    review_posture,
    staging_posture,
    boundary_summary: PACKET_REVISION_BOUNDARY_SUMMARY,
  };
}
