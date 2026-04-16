import {
  assembleSecretaryHandoffStagingProjection,
} from "../../projection/assembly/secretary-handoff-staging.ts";
import type {
  PortfolioSecretaryShell,
} from "./portfolio-secretary-shell-contract.ts";
import type {
  SecretaryHandoffStagingShell,
} from "./secretary-handoff-staging-contract.ts";

export const SECRETARY_HANDOFF_ROUTE_PREFIX = "/portfolio/handoff";

export function buildSecretaryHandoffRoute(cell_id?: string): string {
  return cell_id
    ? `${SECRETARY_HANDOFF_ROUTE_PREFIX}/${cell_id}`
    : SECRETARY_HANDOFF_ROUTE_PREFIX;
}

function resolve_target_cell_id(
  portfolio_shell: PortfolioSecretaryShell,
  target_cell_id?: string
): string | undefined {
  if (target_cell_id) {
    return portfolio_shell.navigation.cell_links.find(
      (link) => link.cell_id === target_cell_id
    )
      ? target_cell_id
      : undefined;
  }

  return portfolio_shell.portfolio_secretary_projection.selection.selected_cell_id;
}

export function composeSecretaryHandoffStagingShell(
  portfolio_shell: PortfolioSecretaryShell,
  target_cell_id?: string
): SecretaryHandoffStagingShell {
  const resolved_target_cell_id = resolve_target_cell_id(
    portfolio_shell,
    target_cell_id
  );
  const handoff_staging_projection = assembleSecretaryHandoffStagingProjection(
    portfolio_shell.portfolio_secretary_projection,
    resolved_target_cell_id
  );
  const cell_links = portfolio_shell.navigation.cell_links.map((link) => ({
    ...link,
    selected: resolved_target_cell_id
      ? link.cell_id === resolved_target_cell_id
      : link.selected,
  }));
  const selected_cell_link = resolved_target_cell_id
    ? cell_links.find(
        (link) => link.cell_id === resolved_target_cell_id
      )
    : undefined;

  return {
    staging_shell_id: `${
      portfolio_shell.portfolio_shell_id
    }-${resolved_target_cell_id ?? "unselected"}-handoff-staging-shell`,
    staging_scope: "portfolio_secretary_handoff_staging_only",
    operator_surface: "portfolio_secretary_handoff_staging",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "handoff_staging_only_non_executing",
    navigation_mode: "staging_only_non_executing",
    actual_ui_pages_present: false,
    secretary_behavior_available: true,
    portfolio_dispatch_behavior_available: false,
    direct_approve_control_available: false,
    direct_reject_control_available: false,
    direct_dispatch_control_available: false,
    direct_execute_control_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    workflow_engine_behavior_available: false,
    runtime_complete_orchestration_available: false,
    handoff_creation_available: true,
    handoff_staging_projection,
    navigation: {
      portfolio_route: portfolio_shell.navigation.portfolio_route,
      foundation_overview_route: portfolio_shell.navigation.foundation_overview_route,
      handoff_route: buildSecretaryHandoffRoute(resolved_target_cell_id),
      read_mode: "staging_only_non_executing",
      cell_links,
      selected_cell_routes: selected_cell_link
        ? {
            detail_route: selected_cell_link.detail_route,
            management_route: selected_cell_link.management_route,
            continuity_route: selected_cell_link.continuity_route,
            handoff_route: selected_cell_link.handoff_route,
          }
        : undefined,
    },
    truth_boundary: {
      product_projection_only: true,
      staging_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [...handoff_staging_projection.non_claims],
    },
    projection_notes: [
      "Secretary handoff staging reuses the existing portfolio shell rather than introducing a parallel Secretary model.",
      "The shell stays handoff-first, posture-first, and non-executing over the current v0.4 surface family.",
    ],
    deferred_items: [...handoff_staging_projection.deferred_items],
  };
}
