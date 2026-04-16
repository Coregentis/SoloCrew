import type {
  PortfolioSecretaryShellProjection,
} from "../contracts/portfolio-secretary-shell-contract.ts";
import type {
  SecretaryHandoffStageIndicator,
  SecretaryHandoffStagingProjection,
  SecretaryHandoffStagingStatus,
} from "../contracts/secretary-handoff-staging-contract.ts";

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

function determine_staging_status(
  portfolio_projection: PortfolioSecretaryShellProjection,
  selected_summary:
    | PortfolioSecretaryShellProjection["summary_projections"][number]
    | undefined
): SecretaryHandoffStagingStatus {
  if (!selected_summary) {
    return "draft";
  }

  if (selected_summary.readiness_signal === "attention_required") {
    return "ready_for_cell_review";
  }

  const has_management_attention = [
    portfolio_projection.posture_shelf.management_directive_visibility,
    portfolio_projection.review_shelf.delivery_return_visibility,
    portfolio_projection.review_shelf.approval_request_visibility,
  ].some((status) => status === "runtime_record_present_non_executable");

  return has_management_attention ? "ready_for_cell_review" : "staged";
}

function build_stage_indicators(
  staging_status: SecretaryHandoffStagingStatus
): SecretaryHandoffStageIndicator[] {
  return [
    {
      stage: "draft",
      label: "draft",
      active: staging_status === "draft",
      note: "Draft frames handoff intent in product space only.",
    },
    {
      stage: "staged",
      label: "staged",
      active: staging_status === "staged",
      note: "Staged means the handoff package is visible but still non-executing.",
    },
    {
      stage: "ready_for_cell_review",
      label: "ready_for_cell_review",
      active: staging_status === "ready_for_cell_review",
      note: "Ready-for-cell-review signals bounded readiness for downstream cell review, not dispatch or execution.",
    },
  ];
}

export function assembleSecretaryHandoffStagingProjection(
  portfolio_projection: PortfolioSecretaryShellProjection,
  target_cell_id?: string
): SecretaryHandoffStagingProjection {
  const selected_summary = select_summary_projection(
    portfolio_projection,
    target_cell_id
  );
  const staging_status = determine_staging_status(
    portfolio_projection,
    selected_summary
  );
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
    staging_states: build_stage_indicators(staging_status),
    target_selection: {
      selection_mode: "selected_cell_from_portfolio_shell",
      target_cell_id: target_cell_id_value,
      target_cell_name,
      target_summary_projection_id: selected_summary?.summary_projection_id,
      target_readiness_signal: selected_summary?.readiness_signal,
      target_source_mode: selected_summary?.source_mode,
    },
    handoff_summary: target_cell_name
      ? `Stage bounded Secretary-to-cell handoff framing for ${target_cell_name}.`
      : "Stage bounded Secretary-to-cell handoff framing before a target cell is selected.",
    handoff_intent_framing: target_cell_name
      ? `Package bounded next-step context for ${target_cell_name} without approving, dispatching, or executing anything.`
      : "No target cell is selected yet, so handoff framing remains draft-only.",
    management_and_review_posture: {
      management_directive_visibility:
        portfolio_projection.posture_shelf.management_directive_visibility,
      delivery_return_visibility:
        portfolio_projection.posture_shelf.delivery_return_visibility,
      approval_request_visibility:
        portfolio_projection.posture_shelf.approval_request_visibility,
      management_posture_framing:
        "Management posture remains visible and stageable in product space only.",
      review_posture_framing:
        "Review posture may be framed for downstream cell review, but no approval, rejection, or dispatch execution is authorized here.",
    },
    non_executing_notice:
      "Secretary handoff staging remains non-executing, non-dispatching, and non-authoritative over runtime behavior.",
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
      "Runtime-private workforce truth remains upstream and is consumed only through existing product projection layers.",
      ...portfolio_projection.projection_notes,
    ],
  };
}
