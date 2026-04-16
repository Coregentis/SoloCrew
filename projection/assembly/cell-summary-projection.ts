import type {
  CellSummaryProjection,
  CellSummaryProjectionReadiness,
} from "../contracts/cell-summary-projection-contract.ts";
import type {
  SingleCellShellComposition,
} from "../contracts/single-cell-shell-composition-contract.ts";

const CELL_SUMMARY_PROJECTION_NON_CLAIMS = [
  "no_secretary_behavior_truth",
  "no_portfolio_dispatch_truth",
  "no_provider_execution_truth",
  "no_channel_entry_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_orchestration",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function derive_readiness_signal(
  shell_composition: SingleCellShellComposition
): CellSummaryProjectionReadiness {
  const { objective_overview_view } = shell_composition.single_cell_view_model;

  if (
    objective_overview_view.blocked_work_count > 0 ||
    objective_overview_view.near_term_execution_pressure ===
      "stabilize_and_review"
  ) {
    return "attention_required";
  }

  return "steady";
}

export function assembleCellSummaryProjection(
  shell_composition: SingleCellShellComposition
): CellSummaryProjection {
  const summary_card = shell_composition.initial_cell_summary_seed.cell_summary_card;
  const objective_overview =
    shell_composition.single_cell_view_model.objective_overview_view;
  const memory_and_continuity =
    shell_composition.single_cell_view_model.memory_and_continuity_view;
  const deferred_surface_view =
    shell_composition.single_cell_view_model.deferred_surface_view;
  const truth_boundary_view =
    shell_composition.single_cell_view_model.truth_boundary_view;

  return {
    summary_projection_id:
      `${shell_composition.shell_composition_id}-cell-summary-projection`,
    summary_scope: "cell_summary_projection",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_summary",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    multi_cell_foundation_scope: "read_inspect_only",
    source_mode: "single_cell_shell_composition",
    summary_projection_is_runtime_law: false,
    secretary_behavior_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    truth_sources: unique_items([
      ...objective_overview.truth_sources,
      ...memory_and_continuity.truth_sources,
      ...truth_boundary_view.truth_sources,
    ]),
    upstream_refs: [],
    cell_summary_card: summary_card,
    objective_status_summary:
      `${summary_card.current_objective_headline} (${summary_card.active_work_count} active / ${summary_card.blocked_work_count} blocked)`,
    readiness_signal: derive_readiness_signal(shell_composition),
    continuity_status: memory_and_continuity.continuity_status,
    continuity_hint: memory_and_continuity.continuity_note,
    deferred_items: unique_items([
      ...shell_composition.deferred_items,
      ...deferred_surface_view.deferred_surfaces,
    ]),
    non_claims: unique_items([
      ...shell_composition.entry_surface_non_claims,
      ...truth_boundary_view.non_claims,
      ...CELL_SUMMARY_PROJECTION_NON_CLAIMS,
    ]),
    projection_notes: [
      ...shell_composition.projection_notes,
      "Cell summary projection is a read/inspect-only product summary unit.",
      "Cell summary projection does not imply Secretary behavior or runtime summary authority.",
    ],
  };
}
