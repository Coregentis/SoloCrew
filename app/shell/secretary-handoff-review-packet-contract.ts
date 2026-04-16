import type {
  SecretaryHandoffReviewPacketProjection,
} from "../../projection/contracts/secretary-handoff-review-packet-contract.ts";
import type {
  SecretaryHandoffStagingShell,
} from "./secretary-handoff-staging-contract.ts";

export interface SecretaryHandoffReviewPacketShell {
  review_packet_shell_id: string;
  review_packet_scope: "portfolio_secretary_handoff_review_packet_only";
  operator_surface: "portfolio_secretary_handoff_review_packet";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "review_packet_only_non_executing";
  navigation_mode: "review_packet_only_non_executing";
  actual_ui_pages_present: false;
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  workflow_engine_behavior_available: false;
  runtime_complete_orchestration_available: false;
  handoff_creation_available: true;
  handoff_review_packet_projection: SecretaryHandoffReviewPacketProjection;
  navigation: {
    portfolio_route: "/portfolio";
    foundation_overview_route: "/cells";
    handoff_route: string;
    review_packet_route: string;
    read_mode: "review_packet_only_non_executing";
    cell_links: SecretaryHandoffStagingShell["navigation"]["cell_links"];
    selected_cell_routes?: SecretaryHandoffStagingShell["navigation"]["selected_cell_routes"];
  };
  truth_boundary: {
    product_projection_only: true;
    review_packet_projection_is_runtime_law: false;
    upward_runtime_authority: "forbidden";
    upward_protocol_authority: "forbidden";
    non_claims: string[];
  };
  projection_notes: string[];
  deferred_items: string[];
}
