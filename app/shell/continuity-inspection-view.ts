import {
  assembleContinuityInspectionProjection,
} from "../../projection/assembly/continuity-inspection.ts";
import {
  asProjectionSafeWorkforceCellInput,
} from "../../projection/adapters/cell-summary-runtime-adapter.ts";
import {
  buildCellDetailRoute,
  composeCellDetailViewShellFromRuntimeInput,
} from "./cell-detail-view.ts";
import type {
  MultiCellFoundationRuntimeCellInput,
} from "./multi-cell-foundation-overview-contract.ts";
import type {
  ContinuityInspectionViewShell,
} from "./continuity-inspection-view-contract.ts";

export function buildContinuityInspectionRoute(cell_id: string): string {
  return `${buildCellDetailRoute(cell_id)}/continuity`;
}

export function composeContinuityInspectionViewShellFromRuntimeInput(
  runtime_input: MultiCellFoundationRuntimeCellInput
): ContinuityInspectionViewShell {
  const projection_input = asProjectionSafeWorkforceCellInput(runtime_input);
  const scope_ref = projection_input.workforce_envelope.scope_ref;
  const detail_shell =
    composeCellDetailViewShellFromRuntimeInput(projection_input);
  const continuity_inspection_projection =
    assembleContinuityInspectionProjection(detail_shell.cell_detail_projection);

  return {
    inspection_shell_id:
      `${scope_ref}-continuity-inspection-shell`,
    inspection_scope: "multi_cell_foundation_continuity_inspection_only",
    operator_surface: "multi_cell_foundation_continuity_inspection",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "read_inspect_continuity",
    actual_ui_pages_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_continuity_actions_available: false,
    continuity_inspection_projection,
    navigation: {
      overview_route: "/cells",
      detail_route: buildCellDetailRoute(scope_ref),
      inspection_route: buildContinuityInspectionRoute(scope_ref),
      read_mode: "inspect_only",
    },
    truth_boundary: {
      product_projection_only: true,
      continuity_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [...continuity_inspection_projection.non_claims],
    },
    projection_notes: [
      "Continuity inspection view stays read-only and below Secretary beta.",
      "The shell reuses the projection-safe workforce envelope path and adds no executable continuity control.",
    ],
    deferred_items: [...continuity_inspection_projection.deferred_items],
  };
}
