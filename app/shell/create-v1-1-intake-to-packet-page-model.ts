import {
  buildFounderRequestIntakeToPacketFlow,
} from "../../projection/assembly/founder-request-intake-to-packet-flow.ts";
import type {
  FounderRequestIntakeProjectScopedObject,
  SoloCrewProjectionSummaryEnvelope,
} from "../../projection/adapters/founder-request-intake-to-packet-adapter.ts";

export type V11IntakeToPacketPageModel = {
  flow_id: string;
  project_id: string;
  packet_candidate_id: string;
  review_posture: string;
  staging_posture: string;
  review_ready: boolean;
  return_for_revision: boolean;
  blocked_by_contract: boolean;
  packet_posture_label: string;
  evidence_posture_label: string;
  recommendation_label: string;
  blocked_reason?: string;
  boundary_summary: string[];
  interpretation_guards: {
    transition_accepted_is_approval: false;
    terminal_is_execution_complete: false;
    evidence_summary_is_proof: false;
    recommendation_is_execution: false;
  };
  non_executing: true;
};

function format_packet_posture_label(args: {
  review_ready: boolean;
  return_for_revision: boolean;
  blocked_by_contract: boolean;
  staging_posture: string;
}): string {
  if (args.blocked_by_contract) {
    return "blocked by contract";
  }

  if (args.review_ready) {
    return "packet candidate review-ready";
  }

  if (args.return_for_revision) {
    return "packet candidate return for revision";
  }

  return args.staging_posture.replaceAll("_", " ");
}

function format_evidence_posture_label(args: {
  stale: boolean;
  insufficient: boolean;
  evidence_available: boolean;
  evidence_summary: string;
}): string {
  if (args.insufficient) {
    return `evidence insufficient: ${args.evidence_summary}`;
  }

  if (args.stale) {
    return `stale context: ${args.evidence_summary}`;
  }

  if (args.evidence_available) {
    return `evidence summary: ${args.evidence_summary}`;
  }

  return `evidence summary unavailable: ${args.evidence_summary}`;
}

export function createV11IntakeToPacketPageModel(input: {
  request: FounderRequestIntakeProjectScopedObject;
  projection_summary: SoloCrewProjectionSummaryEnvelope;
}): V11IntakeToPacketPageModel {
  const flow = buildFounderRequestIntakeToPacketFlow(input);

  return {
    flow_id: flow.flow_id,
    project_id: flow.project_id,
    packet_candidate_id: flow.packet_candidate.packet_candidate_id,
    review_posture: flow.packet_candidate.review_posture,
    staging_posture: flow.packet_candidate.staging_posture,
    review_ready: flow.review_ready,
    return_for_revision: flow.return_for_revision,
    blocked_by_contract: flow.blocked_by_contract,
    packet_posture_label: format_packet_posture_label({
      review_ready: flow.review_ready,
      return_for_revision: flow.return_for_revision,
      blocked_by_contract: flow.blocked_by_contract,
      staging_posture: flow.packet_candidate.staging_posture,
    }),
    evidence_posture_label: format_evidence_posture_label({
      stale: flow.packet_candidate.evidence_posture.stale,
      insufficient: flow.packet_candidate.evidence_posture.insufficient,
      evidence_available: flow.packet_candidate.evidence_posture.evidence_available,
      evidence_summary: flow.packet_candidate.evidence_posture.evidence_summary,
    }),
    recommendation_label:
      `non-executing recommendation: ${flow.packet_candidate.recommendation.summary}`,
    blocked_reason:
      flow.blocked_by_contract
        ? flow.packet_candidate.evidence_posture.omission_reason ??
          flow.packet_candidate.evidence_posture.evidence_summary
        : undefined,
    boundary_summary: [...flow.visible_summary.boundary_summary],
    interpretation_guards: {
      transition_accepted_is_approval: false,
      terminal_is_execution_complete: false,
      evidence_summary_is_proof: false,
      recommendation_is_execution: false,
    },
    non_executing: true,
  };
}

export type IntakeToPacketPageModel = V11IntakeToPacketPageModel;

export const createIntakeToPacketPageModel =
  createV11IntakeToPacketPageModel;
