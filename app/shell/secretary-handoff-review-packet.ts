import {
  assembleSecretaryHandoffReviewPacketProjection,
} from "../../projection/assembly/secretary-handoff-review-packet.ts";
import type {
  SecretaryHandoffStagingShell,
} from "./secretary-handoff-staging-contract.ts";
import type {
  SecretaryHandoffReviewPacketShell,
} from "./secretary-handoff-review-packet-contract.ts";

export const SECRETARY_HANDOFF_REVIEW_ROUTE_PREFIX = "/portfolio/handoff";

export function buildSecretaryHandoffReviewPacketRoute(cell_id?: string): string {
  return cell_id
    ? `${SECRETARY_HANDOFF_REVIEW_ROUTE_PREFIX}/${cell_id}/review`
    : `${SECRETARY_HANDOFF_REVIEW_ROUTE_PREFIX}/review`;
}

export function composeSecretaryHandoffReviewPacketShell(
  staging_shell: SecretaryHandoffStagingShell
): SecretaryHandoffReviewPacketShell {
  const handoff_review_packet_projection =
    assembleSecretaryHandoffReviewPacketProjection(
      staging_shell.handoff_staging_projection
    );
  const selected_cell_id =
    staging_shell.handoff_staging_projection.target_selection.target_cell_id;
  const cell_links = staging_shell.navigation.cell_links.map((link) => ({
    ...link,
    selected: selected_cell_id ? link.cell_id === selected_cell_id : link.selected,
  }));
  const selected_cell_link = selected_cell_id
    ? cell_links.find((link) => link.cell_id === selected_cell_id)
    : undefined;

  return {
    review_packet_shell_id:
      `${staging_shell.staging_shell_id}-review-packet-shell`,
    review_packet_scope: "portfolio_secretary_handoff_review_packet_only",
    operator_surface: "portfolio_secretary_handoff_review_packet",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "review_packet_only_non_executing",
    navigation_mode: "review_packet_only_non_executing",
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
    handoff_review_packet_projection,
    navigation: {
      portfolio_route: staging_shell.navigation.portfolio_route,
      foundation_overview_route: staging_shell.navigation.foundation_overview_route,
      handoff_route: staging_shell.navigation.handoff_route,
      review_packet_route:
        buildSecretaryHandoffReviewPacketRoute(selected_cell_id),
      read_mode: "review_packet_only_non_executing",
      cell_links,
      selected_cell_routes: selected_cell_link
        ? {
            detail_route: selected_cell_link.detail_route,
            management_route: selected_cell_link.management_route,
            continuity_route: selected_cell_link.continuity_route,
            handoff_route: selected_cell_link.handoff_route,
            review_packet_route: selected_cell_link.review_packet_route,
          }
        : undefined,
    },
    truth_boundary: {
      product_projection_only: true,
      review_packet_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [...handoff_review_packet_projection.non_claims],
    },
    projection_notes: [
      "Secretary handoff review packet reuses the staged handoff lane rather than introducing a parallel review system.",
      "The review-packet shell stays handoff-first, posture-first, review-packet-first, and non-executing.",
      "Wave 4 hardens revision-return visibility so review packets and staged handoff surfaces share one bounded non-executing loop vocabulary.",
    ],
    deferred_items: [...handoff_review_packet_projection.deferred_items],
  };
}
