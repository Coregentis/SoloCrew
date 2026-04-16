import type {
  PortfolioSecretaryShellProjection,
} from "../../projection/contracts/portfolio-secretary-shell-contract.ts";

export interface PortfolioSecretaryNavigationLink {
  cell_id: string;
  cell_name: string;
  selected: boolean;
  detail_route: string;
  management_route: string;
  continuity_route: string;
  handoff_route: string;
  review_packet_route: string;
}

export interface PortfolioSecretaryShell {
  portfolio_shell_id: string;
  shell_scope: "portfolio_secretary_beta_shell";
  operator_surface: "portfolio_secretary_beta";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "shell_first_navigation";
  navigation_mode: "top_level_product_navigation_only";
  actual_ui_pages_present: false;
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  workflow_engine_behavior_available: false;
  handoff_creation_available: true;
  portfolio_secretary_projection: PortfolioSecretaryShellProjection;
  navigation: {
    portfolio_route: "/portfolio";
    foundation_overview_route: "/cells";
    read_mode: "non_executing";
    cell_links: PortfolioSecretaryNavigationLink[];
    selected_cell_routes?: {
      detail_route: string;
      management_route: string;
      continuity_route: string;
      handoff_route: string;
      review_packet_route: string;
    };
  };
  truth_boundary: {
    product_projection_only: true;
    shell_projection_is_runtime_law: false;
    upward_runtime_authority: "forbidden";
    upward_protocol_authority: "forbidden";
    non_claims: string[];
  };
  projection_notes: string[];
  deferred_items: string[];
}
