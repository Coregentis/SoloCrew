import { createHash } from "node:crypto";

import {
  adaptFounderRequestIntakeToPacketCandidate,
  type FounderRequestIntakeProjectScopedObject,
  type FounderRequestIntakeToPacketCandidate,
  type SoloCrewProjectionSummaryEnvelope,
} from "../adapters/founder-request-intake-to-packet-adapter.ts";

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

export type FounderRequestIntakeToPacketFlowResult = {
  flow_id: string;
  project_id: string;
  packet_candidate: FounderRequestIntakeToPacketCandidate;
  review_ready: boolean;
  return_for_revision: boolean;
  blocked_by_contract: boolean;
  visible_summary: {
    request_label: string;
    packet_posture: string;
    evidence_posture: string;
    recommendation_summary: string;
    boundary_summary: string[];
  };
  non_executing: true;
};

function create_blocked_packet_candidate(args: {
  request: FounderRequestIntakeProjectScopedObject;
  projection_summary: SoloCrewProjectionSummaryEnvelope;
  reason: string;
}): FounderRequestIntakeToPacketCandidate {
  return {
    packet_candidate_id: deterministic_id(
      "packet_candidate_blocked",
      stable_stringify({
        project_id: args.request.project_id,
        founder_request_id: args.request.founder_request_id,
        projection_summary_id: args.projection_summary.projection_summary_id,
        reason: args.reason,
      })
    ),
    project_id: args.request.project_id,
    request_ref: args.request.founder_request_id,
    projection_summary_ref: args.projection_summary.projection_summary_id,
    review_posture: "blocked_by_contract",
    staging_posture: "blocked_by_contract",
    evidence_posture: {
      evidence_available:
        args.projection_summary.evidence_posture?.evidence_available ?? false,
      stale: args.projection_summary.evidence_posture?.stale ?? false,
      insufficient:
        args.projection_summary.evidence_posture?.insufficient ?? false,
      evidence_summary: args.reason,
      omission_reason: args.reason,
    },
    state_interpretation: {
      transition_accepted_is_approval: false,
      terminal_is_execution_complete: false,
      blocked_reason_is_rejection: false,
    },
    recommendation: {
      summary: args.reason,
      non_executing: true,
      blocked_actions:
        args.projection_summary.recommendation?.blocked_actions ?? [
          "approve",
          "reject",
          "dispatch",
          "execute",
          "provider_channel_send",
        ],
      requires_later_authorization: true,
    },
    boundaries: {
      provider_channel_execution: false,
      approve_reject_dispatch_execute: false,
      founder_queue: false,
      raw_runtime_private_dependency: false,
    },
  };
}

export function buildFounderRequestIntakeToPacketFlow(input: {
  request: FounderRequestIntakeProjectScopedObject;
  projection_summary: SoloCrewProjectionSummaryEnvelope;
}): FounderRequestIntakeToPacketFlowResult {
  let packet_candidate: FounderRequestIntakeToPacketCandidate;
  let blocked_by_contract = false;

  try {
    packet_candidate = adaptFounderRequestIntakeToPacketCandidate(input);
  } catch (error) {
    blocked_by_contract = true;
    packet_candidate = create_blocked_packet_candidate({
      request: input.request,
      projection_summary: input.projection_summary,
      reason: error instanceof Error ? error.message : "packet candidate blocked",
    });
  }

  const return_for_revision =
    !blocked_by_contract &&
    packet_candidate.review_posture === "return_for_revision";
  const review_ready =
    !blocked_by_contract &&
    packet_candidate.review_posture === "review_needed" &&
    packet_candidate.staging_posture === "packet_candidate";
  const flow_id = deterministic_id(
    "intake_packet_flow",
    stable_stringify({
      project_id: input.request.project_id,
      founder_request_id: input.request.founder_request_id,
      packet_candidate_id: packet_candidate.packet_candidate_id,
      blocked_by_contract,
      review_ready,
      return_for_revision,
    })
  );

  return {
    flow_id,
    project_id: input.request.project_id,
    packet_candidate,
    review_ready,
    return_for_revision,
    blocked_by_contract,
    visible_summary: {
      request_label: input.request.request_label,
      packet_posture: packet_candidate.staging_posture,
      evidence_posture: packet_candidate.evidence_posture.evidence_summary,
      recommendation_summary: packet_candidate.recommendation.summary,
      boundary_summary: [
        "No provider/channel execution.",
        "No approve/reject/dispatch/execute behavior.",
        "No founder queue behavior.",
        "No raw runtime-private dependency.",
      ],
    },
    non_executing: true,
  };
}
