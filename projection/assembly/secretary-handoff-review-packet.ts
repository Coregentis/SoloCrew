import type {
  SecretaryHandoffFounderRequestExceptionEnrichment,
  SecretaryHandoffFounderRequestFamilyStatusSummary,
  SecretaryHandoffReviewPacketProjection,
  SecretaryHandoffReviewReadiness,
} from "../contracts/secretary-handoff-review-packet-contract.ts";
import {
  FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES,
  is_founder_request_exception_packet_contract,
  type FounderRequestExceptionPacketContract,
} from "../contracts/founder-request-exception-packet-contract.ts";
import type {
  SecretaryHandoffStagingProjection,
} from "../contracts/secretary-handoff-staging-contract.ts";
import {
  buildSecretaryHandoffPacketStateSummary,
  buildSecretaryHandoffRevisionLoopSummary,
} from "./secretary-handoff-packet-state.ts";
import {
  assembleSecretaryHandoffRationaleEvidence,
} from "./secretary-handoff-rationale.ts";

const SECRETARY_HANDOFF_REVIEW_PACKET_NON_CLAIMS = [
  "no_direct_approve_control",
  "no_direct_reject_control",
  "no_direct_dispatch_control",
  "no_direct_execute_control",
  "no_provider_or_channel_control",
  "no_workflow_engine_ownership",
  "no_runtime_authority_ownership",
  "no_protocol_authority_ownership",
  "no_packet_state_execution",
  "packet_states_are_posture_only_not_runtime_commands",
  "no_shared_object_identity_with_runtime_private_record",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function build_founder_request_family_status_summaries(
  founder_request_packet: FounderRequestExceptionPacketContract
): SecretaryHandoffFounderRequestFamilyStatusSummary[] {
  return FOUNDER_REQUEST_EXCEPTION_PACKET_SUMMARY_FAMILIES.map((family) => ({
    family,
    availability:
      founder_request_packet.projection_summaries[family].availability,
    summary_label:
      founder_request_packet.projection_summaries[family].summary_label,
  }));
}

function build_founder_request_exception_enrichment(
  founder_request_packet: FounderRequestExceptionPacketContract
): SecretaryHandoffFounderRequestExceptionEnrichment {
  return {
    enrichment_scope: "founder_request_exception_packet_summary",
    request_ref: founder_request_packet.request_identity.request_ref,
    request_label: founder_request_packet.request_identity.request_label,
    derived_exception_posture:
      founder_request_packet.derived_exception_posture,
    review_return_posture:
      founder_request_packet.review_return_posture.posture,
    review_return_summary:
      founder_request_packet.review_return_posture.posture_summary,
    marker_status:
      founder_request_packet.review_return_posture.marker_status,
    bounded_action_recommendation:
      founder_request_packet.bounded_action_recommendation,
    evidence_summary: {
      evidence_summary_label:
        founder_request_packet.evidence_summary.evidence_summary_label,
      evidence_status:
        founder_request_packet.evidence_summary.evidence_status,
      evidence_refs:
        founder_request_packet.evidence_summary.evidence_refs,
    },
    learning_suggestion_summary:
      founder_request_packet.learning_suggestion_summary,
    status_markers: [...founder_request_packet.status_markers],
    family_status_summaries:
      build_founder_request_family_status_summaries(
        founder_request_packet
      ),
  };
}

function derive_review_readiness(
  staging_projection: SecretaryHandoffStagingProjection
): SecretaryHandoffReviewReadiness {
  switch (staging_projection.staging_status) {
    case "draft":
      return {
        visualization_scope: "bounded_cell_review_readiness",
        readiness_label: "draft_only",
        readiness_summary:
          "The packet is still draft-only in product space and is not yet framed for downstream cell review.",
        target_delivery_posture:
          staging_projection.target_selection.target_delivery_posture,
        target_active_work_count:
          staging_projection.target_selection.target_active_work_count,
        target_blocked_work_count:
          staging_projection.target_selection.target_blocked_work_count,
      };
    case "staged":
      return {
        visualization_scope: "bounded_cell_review_readiness",
        readiness_label: "staged_context_only",
        readiness_summary:
          "The packet is staged as bounded context only and remains non-executing.",
        target_delivery_posture:
          staging_projection.target_selection.target_delivery_posture,
        target_active_work_count:
          staging_projection.target_selection.target_active_work_count,
        target_blocked_work_count:
          staging_projection.target_selection.target_blocked_work_count,
      };
    case "ready_for_cell_review":
      return {
        visualization_scope: "bounded_cell_review_readiness",
        readiness_label: "cell_review_ready",
        readiness_summary:
          "The packet is ready for bounded cell review, but that review remains downstream and non-executing here.",
        target_delivery_posture:
          staging_projection.target_selection.target_delivery_posture,
        target_active_work_count:
          staging_projection.target_selection.target_active_work_count,
        target_blocked_work_count:
          staging_projection.target_selection.target_blocked_work_count,
      };
    case "returned_for_revision":
      return {
        visualization_scope: "bounded_cell_review_readiness",
        readiness_label: "revision_requested",
        readiness_summary:
          "The packet reflects bounded revision posture only and does not become a reject, dispatch, or execution command.",
        target_delivery_posture:
          staging_projection.target_selection.target_delivery_posture,
        target_active_work_count:
          staging_projection.target_selection.target_active_work_count,
        target_blocked_work_count:
          staging_projection.target_selection.target_blocked_work_count,
      };
  }
}

export function assembleSecretaryHandoffReviewPacketProjection(
  staging_projection: SecretaryHandoffStagingProjection,
  founder_request_packet?: FounderRequestExceptionPacketContract
): SecretaryHandoffReviewPacketProjection {
  if (
    founder_request_packet !== undefined &&
    !is_founder_request_exception_packet_contract(founder_request_packet)
  ) {
    throw new Error(
      "Founder-request review packet enrichment requires a contract-safe founder-request exception packet."
    );
  }

  const target_cell_name =
    staging_projection.target_selection.target_cell_name ?? "selected cell";
  const founder_request_exception_enrichment =
    founder_request_packet === undefined
      ? undefined
      : build_founder_request_exception_enrichment(founder_request_packet);

  return {
    secretary_handoff_review_packet_id:
      `${staging_projection.secretary_handoff_staging_id}-review-packet`,
    source_handoff_staging_id: staging_projection.secretary_handoff_staging_id,
    source_portfolio_secretary_projection_id:
      staging_projection.source_portfolio_secretary_projection_id,
    projection_scope: "secretary_handoff_review_packet",
    authority_boundary: "product_projection_only",
    phase_boundary: "beta_review_packet",
    source_mode: "secretary_handoff_staging_projection",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    secretary_behavior_available: true,
    portfolio_dispatch_behavior_available: false,
    direct_approve_control_available: false,
    direct_reject_control_available: false,
    direct_dispatch_control_available: false,
    direct_execute_control_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    workflow_engine_behavior_available: false,
    runtime_complete_orchestration_available: false,
    handoff_creation_available: true,
    review_packet_kind: "product_review_packet_only",
    review_packet_is_runtime_law: false,
    packet_state: staging_projection.staging_status,
    packet_states: [...staging_projection.staging_states],
    target_selection: {
      ...staging_projection.target_selection,
    },
    packet_summary:
      `Review packet for ${target_cell_name} remains bounded to product-level handoff context only.`,
    packet_rationale:
      staging_projection.handoff_intent_framing,
    packet_context_framing:
      `Context stays bounded to ${target_cell_name} readiness, continuity, and management posture without becoming runtime workflow authority.`,
    packet_state_summary: buildSecretaryHandoffPacketStateSummary(
      staging_projection.staging_status,
      staging_projection.target_selection.target_cell_name
    ),
    revision_loop_summary: buildSecretaryHandoffRevisionLoopSummary(
      staging_projection.staging_status,
      staging_projection.target_selection.target_cell_name
    ),
    management_and_review_posture: {
      ...staging_projection.management_and_review_posture,
    },
    review_readiness: derive_review_readiness(staging_projection),
    rationale_evidence: assembleSecretaryHandoffRationaleEvidence({
      scope: "secretary_handoff_review_packet_rationale",
      packet_state: staging_projection.staging_status,
      target_cell_name:
        staging_projection.target_selection.target_cell_name,
      target_readiness_signal:
        staging_projection.target_selection.target_readiness_signal,
      target_delivery_posture:
        staging_projection.target_selection.target_delivery_posture,
      target_active_work_count:
        staging_projection.target_selection.target_active_work_count,
      target_blocked_work_count:
        staging_projection.target_selection.target_blocked_work_count,
      target_objective_status_summary:
        staging_projection.target_selection.target_objective_status_summary,
      truth_sources: unique_items([
        "secretary_handoff_staging_projection",
        ...staging_projection.truth_sources,
      ]),
      upstream_refs: [...staging_projection.upstream_refs],
      rationale_summary:
        `The review packet exists to explain why ${target_cell_name} is seeing this bounded handoff posture, what evidence is visible, and what remains omitted or upstream-owned.`,
      evidence_summary:
        `Evidence is bounded to ${target_cell_name} review readiness, target delivery posture, work counts, and runtime-derived references already adapted into the current packet.`,
      provenance_summary:
        "Provenance remains downstream and non-authoritative: SoloCrew renders a review packet over adapted upstream inputs without claiming runtime workflow ownership or protocol completeness.",
    }),
    founder_request_exception_enrichment,
    non_executing_notice:
      "Secretary handoff review packet remains review-only, handoff-only, non-dispatching, and non-authoritative over runtime behavior.",
    truth_sources: unique_items([
      "secretary_handoff_staging_projection",
      ...staging_projection.truth_sources,
    ]),
    upstream_refs: [...staging_projection.upstream_refs],
    deferred_items: unique_items([
      ...staging_projection.deferred_items,
      "approve_execution",
      "reject_execution",
      "dispatch_execution",
      "execute_control",
      "provider_execution",
      "channel_entry",
    ]),
    non_claims: unique_items([
      ...staging_projection.non_claims,
      ...SECRETARY_HANDOFF_REVIEW_PACKET_NON_CLAIMS,
    ]),
    projection_notes: [
      "Secretary handoff review packet is a downstream product projection over staged handoff truth, not a runtime review command.",
      "Packet states remain posture and review semantics only and do not become runtime commands or workflow edges.",
      "Review readiness visualization is bounded to product-level packet framing for downstream cell consumption.",
      "Wave 4 hardens revision/return loop consistency so packet summaries and returned-for-revision posture stay aligned with the staging lane.",
      "Wave 5 hardens rationale, evidence, provenance, and omission-aware narration without introducing direct-control semantics.",
      ...(founder_request_exception_enrichment === undefined
        ? []
        : [
            "Founder-request exception packet enrichment stays contract-safe, summary-only, bounded exception posture only, and non-executing inside the review packet lane.",
            "Founder-request evidence remains summary-level only, with omission, insufficiency, and stale markers preserved rather than hidden.",
          ]),
      ...staging_projection.projection_notes,
    ],
  };
}
