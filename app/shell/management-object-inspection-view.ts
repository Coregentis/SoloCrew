import {
  assembleManagementObjectInspectionProjection,
} from "../../projection/assembly/management-object-inspection.ts";
import {
  composeCellDetailViewShellFromRuntimeInput,
  buildCellDetailRoute,
} from "./cell-detail-view.ts";
import type {
  MultiCellFoundationRuntimeCellInput,
} from "./multi-cell-foundation-overview-contract.ts";
import type {
  ManagementObjectInspectionViewShell,
} from "./management-object-inspection-view-contract.ts";

export function buildManagementObjectInspectionRoute(cell_id: string): string {
  return `${buildCellDetailRoute(cell_id)}/management`;
}

export function composeManagementObjectInspectionViewShellFromRuntimeInput(
  runtime_input: MultiCellFoundationRuntimeCellInput
): ManagementObjectInspectionViewShell {
  const detail_shell =
    composeCellDetailViewShellFromRuntimeInput(runtime_input);
  const management_object_inspection_projection =
    assembleManagementObjectInspectionProjection(
      detail_shell.cell_detail_projection
    );

  return {
    inspection_shell_id:
      `${runtime_input.cell_runtime_scope.object_id}-management-object-inspection-shell`,
    inspection_scope: "multi_cell_foundation_management_object_inspection_only",
    operator_surface: "multi_cell_foundation_management_object_inspection",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "read_inspect_management_objects",
    actual_ui_pages_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_management_actions_available: false,
    management_object_inspection_projection,
    navigation: {
      overview_route: "/cells",
      detail_route: buildCellDetailRoute(
        runtime_input.cell_runtime_scope.object_id
      ),
      inspection_route: buildManagementObjectInspectionRoute(
        runtime_input.cell_runtime_scope.object_id
      ),
      read_mode: "inspect_only",
    },
    truth_boundary: {
      product_projection_only: true,
      inspection_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [...management_object_inspection_projection.non_claims],
    },
    projection_notes: [
      "Management-object inspection view stays read-only and below Secretary beta.",
      "The shell reuses the existing runtime-private-to-detail projection path and adds no executable management control.",
    ],
    deferred_items: [...management_object_inspection_projection.deferred_items],
  };
}
