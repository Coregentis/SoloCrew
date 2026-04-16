import {
  assemblePortfolioSecretaryShellProjection,
} from "../../projection/assembly/portfolio-secretary-shell.ts";
import {
  buildCellDetailRoute,
} from "./cell-detail-view.ts";
import {
  buildContinuityInspectionRoute,
} from "./continuity-inspection-view.ts";
import {
  buildManagementObjectInspectionRoute,
} from "./management-object-inspection-view.ts";
import {
  composeMultiCellFoundationOverviewShellFromRuntimeInputs,
} from "./multi-cell-foundation-overview.ts";
import {
  buildSecretaryHandoffRoute,
} from "./secretary-handoff-staging.ts";
import {
  buildSecretaryHandoffReviewPacketRoute,
} from "./secretary-handoff-review-packet.ts";
import type {
  MultiCellFoundationOverviewShell,
  MultiCellFoundationRuntimeCellInput,
} from "./multi-cell-foundation-overview-contract.ts";
import type {
  PortfolioSecretaryNavigationLink,
  PortfolioSecretaryShell,
} from "./portfolio-secretary-shell-contract.ts";

export const PORTFOLIO_SECRETARY_ROUTE = "/portfolio";

function build_navigation_links(
  overview_shell: MultiCellFoundationOverviewShell
): PortfolioSecretaryNavigationLink[] {
  return overview_shell.cell_summary_units.map((summary, index) => ({
    cell_id: summary.cell_summary_card.cell_id,
    cell_name: summary.cell_summary_card.cell_name,
    selected: index === 0,
    detail_route: buildCellDetailRoute(summary.cell_summary_card.cell_id),
    management_route: buildManagementObjectInspectionRoute(
      summary.cell_summary_card.cell_id
    ),
    continuity_route: buildContinuityInspectionRoute(
      summary.cell_summary_card.cell_id
    ),
    handoff_route: buildSecretaryHandoffRoute(
      summary.cell_summary_card.cell_id
    ),
    review_packet_route: buildSecretaryHandoffReviewPacketRoute(
      summary.cell_summary_card.cell_id
    ),
  }));
}

export function composePortfolioSecretaryShell(
  overview_shell: MultiCellFoundationOverviewShell
): PortfolioSecretaryShell {
  const portfolio_secretary_projection =
    assemblePortfolioSecretaryShellProjection({
      source_overview_shell_id: overview_shell.overview_shell_id,
      cell_summary_units: overview_shell.cell_summary_units,
      management_object_family_status:
        overview_shell.management_object_family_status,
      deferred_items: overview_shell.deferred_items,
      non_claims: overview_shell.truth_boundary.non_claims,
      projection_notes: overview_shell.projection_notes,
    });
  const cell_links = build_navigation_links(overview_shell);
  const selected_cell_routes = cell_links[0]
      ? {
          detail_route: cell_links[0].detail_route,
          management_route: cell_links[0].management_route,
          continuity_route: cell_links[0].continuity_route,
          handoff_route: cell_links[0].handoff_route,
          review_packet_route: cell_links[0].review_packet_route,
        }
    : undefined;

  return {
    portfolio_shell_id:
      `${overview_shell.overview_shell_id}-portfolio-secretary-shell`,
    shell_scope: "portfolio_secretary_beta_shell",
    operator_surface: "portfolio_secretary_beta",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "shell_first_navigation",
    navigation_mode: "top_level_product_navigation_only",
    actual_ui_pages_present: false,
    secretary_behavior_available: true,
    portfolio_dispatch_behavior_available: false,
    direct_approve_control_available: false,
    direct_reject_control_available: false,
    direct_dispatch_control_available: false,
    direct_execute_control_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    workflow_engine_behavior_available: false,
    handoff_creation_available: true,
    portfolio_secretary_projection,
    navigation: {
      portfolio_route: PORTFOLIO_SECRETARY_ROUTE,
      foundation_overview_route: "/cells",
      read_mode: "non_executing",
      cell_links,
      selected_cell_routes,
    },
    truth_boundary: {
      product_projection_only: true,
      shell_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [...portfolio_secretary_projection.non_claims],
    },
    projection_notes: [
      "Portfolio Secretary shell reuses the existing v0.4 multi-cell overview family underneath.",
      "Wave 1 shell remains the top-level navigation frame over the existing v0.4 surfaces.",
      "Wave 2 adds bounded handoff staging routes only and keeps the portfolio shell non-executing.",
      "Wave 3 adds bounded handoff review-packet routes only and keeps packet states product-projected and non-executing.",
    ],
    deferred_items: [...portfolio_secretary_projection.deferred_items],
  };
}

export function composePortfolioSecretaryShellFromRuntimeInputs(
  runtime_inputs: readonly MultiCellFoundationRuntimeCellInput[]
): PortfolioSecretaryShell {
  const overview_shell =
    composeMultiCellFoundationOverviewShellFromRuntimeInputs(runtime_inputs);

  return composePortfolioSecretaryShell(overview_shell);
}
