import type {
  CellSummaryProjection,
} from "../../projection/contracts/cell-summary-projection-contract.ts";
import type {
  ApprovalRequestRuntimeRecord,
  CellRuntimeScopeRecord,
  CellSummaryRuntimeRecord,
  DeliveryReturnRuntimeRecord,
  ManagementDirectiveRuntimeRecord,
} from "../../projection/adapters/upstream-record-types.ts";

export type MultiCellFoundationManagementObjectStatus =
  | "contract_frozen_non_executable"
  | "runtime_record_present_non_executable"
  | "runtime_record_absent_non_executable";

export interface MultiCellFoundationManagementObjectFamilyStatus {
  management_directive: MultiCellFoundationManagementObjectStatus;
  delivery_return: MultiCellFoundationManagementObjectStatus;
  approval_request: MultiCellFoundationManagementObjectStatus;
}

export interface MultiCellFoundationRuntimeCellInput {
  cell_runtime_scope: CellRuntimeScopeRecord;
  cell_summary_runtime_record?: CellSummaryRuntimeRecord;
  management_directive_record?: ManagementDirectiveRuntimeRecord;
  delivery_return_record?: DeliveryReturnRuntimeRecord;
  approval_request_record?: ApprovalRequestRuntimeRecord;
}

export interface MultiCellFoundationTruthBoundary {
  product_projection_only: true;
  summary_projection_is_runtime_law: false;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  non_claims: string[];
}

export interface MultiCellFoundationOverviewShell {
  overview_shell_id: string;
  overview_scope: "multi_cell_foundation_only";
  operator_surface: "multi_cell_foundation_overview";
  authority_boundary: "app_shell_projection_consumer";
  phase_boundary: "read_inspect_overview";
  actual_ui_pages_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  cell_summary_units: CellSummaryProjection[];
  management_object_family_status:
    MultiCellFoundationManagementObjectFamilyStatus;
  truth_boundary: MultiCellFoundationTruthBoundary;
  projection_notes: string[];
  deferred_items: string[];
}
