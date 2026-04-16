import type {
  CellSummaryProjection,
} from "../contracts/cell-summary-projection-contract.ts";
import type {
  PortfolioSecretaryManagementObjectStatus,
  PortfolioSecretaryShellProjection,
} from "../contracts/portfolio-secretary-shell-contract.ts";

export interface PortfolioSecretaryShellAssemblyInput {
  source_overview_shell_id: string;
  cell_summary_units: CellSummaryProjection[];
  management_object_family_status: {
    management_directive: PortfolioSecretaryManagementObjectStatus;
    delivery_return: PortfolioSecretaryManagementObjectStatus;
    approval_request: PortfolioSecretaryManagementObjectStatus;
  };
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}

const PORTFOLIO_SECRETARY_NON_CLAIMS = [
  "no_direct_approve_control",
  "no_direct_reject_control",
  "no_direct_dispatch_control",
  "no_direct_execute_control",
  "no_provider_or_channel_control",
  "no_workflow_engine_ownership",
  "no_upward_runtime_or_protocol_authority",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function count_attention_required(
  cell_summary_units: readonly CellSummaryProjection[]
): number {
  return cell_summary_units.filter(
    (summary) => summary.readiness_signal === "attention_required"
  ).length;
}

export function assemblePortfolioSecretaryShellProjection(
  input: PortfolioSecretaryShellAssemblyInput
): PortfolioSecretaryShellProjection {
  const selected_summary = input.cell_summary_units[0];
  const attention_required_cells = count_attention_required(
    input.cell_summary_units
  );
  const steady_cells =
    input.cell_summary_units.length - attention_required_cells;

  return {
    portfolio_secretary_projection_id:
      `${input.source_overview_shell_id}-portfolio-secretary-projection`,
    source_overview_shell_id: input.source_overview_shell_id,
    projection_scope: "portfolio_secretary_beta_shell",
    authority_boundary: "product_projection_only",
    phase_boundary: "beta_shell_navigation",
    source_mode: "multi_cell_foundation_overview_shell",
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
    selection: {
      selection_mode: "bounded_navigation_only",
      selected_cell_id: selected_summary?.cell_summary_card.cell_id,
      selected_cell_name: selected_summary?.cell_summary_card.cell_name,
      selected_summary_projection_id: selected_summary?.summary_projection_id,
    },
    view_separation: {
      secretary_view: "portfolio_level_beta_shell",
      cell_view: "existing_v0_4_cell_surfaces",
      secretary_view_distinct_from_cell_view: true,
    },
    navigation_units: input.cell_summary_units.map((summary, index) => ({
      cell_id: summary.cell_summary_card.cell_id,
      cell_name: summary.cell_summary_card.cell_name,
      summary_projection_id: summary.summary_projection_id,
      readiness_signal: summary.readiness_signal,
      source_mode: summary.source_mode,
      selected: index === 0,
    })),
    summary_projections: [...input.cell_summary_units],
    status_shelf: {
      shelf_scope: "bounded_status_shelf",
      total_cells: input.cell_summary_units.length,
      attention_required_cells,
      steady_cells,
      direct_controls_available: false,
    },
    queue_shelf: {
      shelf_scope: "bounded_queue_shelf",
      queue_visibility: "bounded_queue_posture_only",
      queued_attention_cells: attention_required_cells,
      direct_controls_available: false,
      shelf_note:
        "Queue shelf is derived from bounded readiness posture only and remains non-executing.",
    },
    review_shelf: {
      shelf_scope: "bounded_review_shelf",
      review_visibility: "bounded_review_posture_only",
      approval_request_visibility:
        input.management_object_family_status.approval_request,
      delivery_return_visibility:
        input.management_object_family_status.delivery_return,
      direct_controls_available: false,
      shelf_note:
        "Review shelf reflects bounded visibility and staging posture only.",
    },
    posture_shelf: {
      shelf_scope: "bounded_posture_shelf",
      management_directive_visibility:
        input.management_object_family_status.management_directive,
      delivery_return_visibility:
        input.management_object_family_status.delivery_return,
      approval_request_visibility:
        input.management_object_family_status.approval_request,
      secretary_posture: "handoff_first_non_executing",
      direct_controls_available: false,
    },
    truth_sources: unique_items([
      "multi_cell_foundation_projection",
      ...input.cell_summary_units.flatMap((summary) => summary.truth_sources),
    ]),
    deferred_items: unique_items([
      ...input.deferred_items,
      "handoff_execution",
      "direct_control_semantics",
      "provider_execution",
      "channel_entry",
    ]),
    non_claims: unique_items([
      ...input.non_claims,
      ...PORTFOLIO_SECRETARY_NON_CLAIMS,
    ]),
    projection_notes: [
      "Portfolio Secretary shell projection wraps the existing v0.4 multi-cell foundation rather than replacing it.",
      "Secretary beta remains handoff-first, posture-first, and non-executing in this wave.",
      "Wave 2 adds bounded handoff staging visibility only; direct control and handoff execution remain deferred.",
      ...input.projection_notes,
    ],
  };
}
