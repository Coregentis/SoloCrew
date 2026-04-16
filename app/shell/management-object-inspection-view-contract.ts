import type {
  ManagementObjectInspectionProjection,
} from "../../projection/contracts/management-object-inspection-contract.ts";

export interface ManagementObjectInspectionViewShell {
  inspection_shell_id: string;
  inspection_scope: "multi_cell_foundation_management_object_inspection_only";
  operator_surface: "multi_cell_foundation_management_object_inspection";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "read_inspect_management_objects";
  actual_ui_pages_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_management_actions_available: false;
  management_object_inspection_projection: ManagementObjectInspectionProjection;
  navigation: {
    overview_route: "/cells";
    detail_route: string;
    inspection_route: string;
    read_mode: "inspect_only";
  };
  truth_boundary: {
    product_projection_only: true;
    inspection_projection_is_runtime_law: false;
    upward_runtime_authority: "forbidden";
    upward_protocol_authority: "forbidden";
    non_claims: string[];
  };
  projection_notes: string[];
  deferred_items: string[];
}
