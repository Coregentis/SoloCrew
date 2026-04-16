import type {
  PortfolioSecretaryShellProjection,
} from "../contracts/portfolio-secretary-shell-contract.ts";
import type {
  SecretaryHandoffStagingProjection,
  SecretaryHandoffStagingStatus,
} from "../contracts/secretary-handoff-staging-contract.ts";
import {
  buildSecretaryHandoffPacketStateSummary,
  buildSecretaryHandoffRevisionLoopSummary,
  buildSecretaryHandoffStageIndicators,
  deriveSecretaryHandoffPacketState,
} from "./secretary-handoff-packet-state.ts";

const SECRETARY_HANDOFF_STAGING_NON_CLAIMS = [
  "no_direct_approve_control",
  "no_direct_reject_control",
  "no_direct_dispatch_control",
  "no_direct_execute_control",
  "no_provider_or_channel_control",
  "no_workflow_engine_ownership",
  "no_runtime_authority_ownership",
  "no_protocol_authority_ownership",
  "no_handoff_execution",
  "no_direct_runtime_mutation",
  "no_shared_object_identity_with_runtime_private_record",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function select_summary_projection(
  portfolio_projection: PortfolioSecretaryShellProjection,
  target_cell_id?: string
): PortfolioSecretaryShellProjection["summary_projections"][number] | undefined {
  if (target_cell_id) {
    const matched_summary = portfolio_projection.summary_projections.find(
      (summary) => summary.cell_summary_card.cell_id === target_cell_id
    );

    if (matched_summary) {
      return matched_summary;
    }
  }

  return portfolio_projection.summary_projections.find(
    (summary) =>
      summary.summary_projection_id ===
      portfolio_projection.selection.selected_summary_projection_id
  ) ?? portfolio_projection.summary_projections[0];
}

export function assembleSecretaryHandoffStagingProjection(
  portfolio_projection: PortfolioSecretaryShellProjection,
  target_cell_id?: string
): SecretaryHandoffStagingProjection {
  const selected_summary = select_summary_projection(
    portfolio_projection,
    target_cell_id
  );
  const staging_status: SecretaryHandoffStagingStatus =
    deriveSecretaryHandoffPacketState(selected_summary);
  const target_cell_name = selected_summary?.cell_summary_card.cell_name;
  const target_cell_id_value = selected_summary?.cell_summary_card.cell_id;

  return {
    secretary_handoff_staging_id: `${
      portfolio_projection.portfolio_secretary_projection_id
    }-${target_cell_id_value ?? "unselected"}-handoff-staging`,
    source_portfolio_secretary_projection_id:
      portfolio_projection.portfolio_secretary_projection_id,
    projection_scope: "secretary_handoff_staging",
    authority_boundary: "product_projection_only",
    phase_boundary: "beta_handoff_staging",
    source_mode: "portfolio_secretary_shell_projection",
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
    handoff_payload_kind: "product_staging_only",
    handoff_staging_is_runtime_law: false,
    staging_status,
    staging_states: buildSecretaryHandoffStageIndicators(staging_status),
    target_selection: {
      selection_mode: "selected_cell_from_portfolio_shell",
      target_cell_id: target_cell_id_value,
      target_cell_name,
      target_summary_projection_id: selected_summary?.summary_projection_id,
      target_readiness_signal: selected_summary?.readiness_signal,
      target_source_mode: selected_summary?.source_mode,
      target_delivery_posture:
        selected_summary?.cell_summary_card.delivery_posture,
      target_active_work_count:
        selected_summary?.cell_summary_card.active_work_count,
      target_blocked_work_count:
        selected_summary?.cell_summary_card.blocked_work_count,
      target_objective_status_summary:
        selected_summary?.objective_status_summary,
      target_continuity_hint: selected_summary?.continuity_hint,
    },
    handoff_summary: target_cell_name
      ? `Stage bounded Secretary-to-cell handoff packet framing for ${target_cell_name}.`
      : "Stage bounded Secretary-to-cell handoff packet framing before a target cell is selected.",
    handoff_intent_framing: target_cell_name
      ? `Package bounded next-step context for ${target_cell_name} as staged handoff and review-packet posture only, without approving, dispatching, or executing anything.`
      : "No target cell is selected yet, so handoff framing remains draft-only.",
    packet_state_summary: buildSecretaryHandoffPacketStateSummary(
      staging_status,
      target_cell_name
    ),
    revision_loop_summary: buildSecretaryHandoffRevisionLoopSummary(
      staging_status,
      target_cell_name
    ),
    management_and_review_posture: {
      management_directive_visibility:
        portfolio_projection.posture_shelf.management_directive_visibility,
      delivery_return_visibility:
        portfolio_projection.posture_shelf.delivery_return_visibility,
      approval_request_visibility:
        portfolio_projection.posture_shelf.approval_request_visibility,
      management_posture_framing:
        "Management posture remains visible and stageable in product space only and stays distinct from runtime control.",
      review_posture_framing:
        "Review posture may be framed as a packet-ready downstream handoff surface, but no approval, rejection, or dispatch execution is authorized here.",
    },
    non_executing_notice:
      "Secretary handoff staging remains review-packet-first, revision-loop-aware, non-executing, non-dispatching, and non-authoritative over runtime behavior.",
    truth_sources: unique_items([
      "portfolio_secretary_shell_projection",
      ...portfolio_projection.truth_sources,
    ]),
    upstream_refs: selected_summary ? [...selected_summary.upstream_refs] : [],
    deferred_items: unique_items([
      ...portfolio_projection.deferred_items,
      "handoff_execution",
      "direct_approve_control",
      "direct_reject_control",
      "direct_dispatch_control",
      "direct_execute_control",
      "provider_execution",
      "channel_entry",
      "runtime_mutation",
    ]),
    non_claims: unique_items([
      ...portfolio_projection.non_claims,
      ...SECRETARY_HANDOFF_STAGING_NON_CLAIMS,
    ]),
    projection_notes: [
      "Secretary handoff staging is a downstream product projection over the portfolio shell, not a runtime command object.",
      "The staging surface frames target, intent, and posture only; execution semantics remain outside this wave.",
      "Shared handoff packet states remain posture semantics only and do not become runtime commands.",
      "Wave 4 hardens revision/return loop consistency across shell, staging, and review packet surfaces without introducing execution semantics.",
      "Runtime-private workforce truth remains upstream and is consumed only through existing product projection layers.",
      ...portfolio_projection.projection_notes,
    ],
  };
}
