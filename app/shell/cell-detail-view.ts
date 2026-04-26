import {
  assembleCellDetailProjectionFromRuntimeInput,
} from "../../projection/assembly/cell-detail-projection.ts";
import {
  asProjectionSafeWorkforceCellInput,
} from "../../projection/adapters/cell-summary-runtime-adapter.ts";
import type {
  MultiCellFoundationRuntimeCellInput,
} from "./multi-cell-foundation-overview-contract.ts";
import type {
  CellDetailViewShell,
} from "./cell-detail-view-contract.ts";

export const CELL_DETAIL_ROUTE_PREFIX = "/cells";

export function buildCellDetailRoute(cell_id: string): string {
  return `${CELL_DETAIL_ROUTE_PREFIX}/${cell_id}`;
}

export function composeCellDetailViewShellFromRuntimeInput(
  runtime_input: MultiCellFoundationRuntimeCellInput
): CellDetailViewShell {
  const projection_input = asProjectionSafeWorkforceCellInput(runtime_input);
  const scope_ref = projection_input.workforce_envelope.scope_ref;
  const cell_detail_projection =
    assembleCellDetailProjectionFromRuntimeInput(projection_input);

  return {
    detail_shell_id: `${scope_ref}-cell-detail-shell`,
    detail_scope: "multi_cell_foundation_cell_detail_only",
    operator_surface: "multi_cell_foundation_cell_detail_inspection",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "read_inspect_cell_detail",
    actual_ui_pages_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_management_actions_available: false,
    cell_detail_projection,
    navigation: {
      overview_route: "/cells",
      detail_route: buildCellDetailRoute(scope_ref),
      read_mode: "inspect_only",
    },
    truth_boundary: {
      product_projection_only: true,
      detail_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims: [...cell_detail_projection.non_claims],
    },
    projection_notes: [
      "Cell detail view shell is read/inspect-only and remains below Secretary beta.",
      "The shell consumes projection-safe workforce envelope input without collapsing product and runtime object identity.",
    ],
    deferred_items: [...cell_detail_projection.deferred_items],
  };
}
