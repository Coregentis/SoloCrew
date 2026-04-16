import type {
  CellDetailProjection,
} from "../../projection/contracts/cell-detail-projection-contract.ts";
export type CellDetailTruthBoundary = {
  product_projection_only: true;
  detail_projection_is_runtime_law: false;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  non_claims: string[];
};

export interface CellDetailViewShell {
  detail_shell_id: string;
  detail_scope: "multi_cell_foundation_cell_detail_only";
  operator_surface: "multi_cell_foundation_cell_detail_inspection";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "read_inspect_cell_detail";
  actual_ui_pages_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_management_actions_available: false;
  cell_detail_projection: CellDetailProjection;
  navigation: {
    overview_route: "/cells";
    detail_route: string;
    read_mode: "inspect_only";
  };
  truth_boundary: CellDetailTruthBoundary;
  projection_notes: string[];
  deferred_items: string[];
}
