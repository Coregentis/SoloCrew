import type {
  ContinuityInspectionProjection,
} from "../../projection/contracts/continuity-inspection-contract.ts";

export interface ContinuityInspectionViewShell {
  inspection_shell_id: string;
  inspection_scope: "multi_cell_foundation_continuity_inspection_only";
  operator_surface: "multi_cell_foundation_continuity_inspection";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "read_inspect_continuity";
  actual_ui_pages_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_continuity_actions_available: false;
  continuity_inspection_projection: ContinuityInspectionProjection;
  navigation: {
    overview_route: "/cells";
    detail_route: string;
    inspection_route: string;
    read_mode: "inspect_only";
  };
  truth_boundary: {
    product_projection_only: true;
    continuity_projection_is_runtime_law: false;
    upward_runtime_authority: "forbidden";
    upward_protocol_authority: "forbidden";
    non_claims: string[];
  };
  projection_notes: string[];
  deferred_items: string[];
}
