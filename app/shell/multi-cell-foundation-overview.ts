import {
  assembleCellSummaryProjection,
} from "../../projection/assembly/cell-summary-projection.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";
import type {
  SingleCellStructuralAssemblyPackage,
} from "../../projection/contracts/single-cell-assembly-contract.ts";
import type {
  MultiCellFoundationOverviewShell,
} from "./multi-cell-foundation-overview-contract.ts";

const MULTI_CELL_FOUNDATION_NON_CLAIMS = [
  "no_secretary_behavior_truth",
  "no_portfolio_dispatch_truth",
  "no_provider_execution_truth",
  "no_channel_entry_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_orchestration",
  "no_upward_runtime_or_protocol_authority",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function composeMultiCellFoundationOverviewShell(
  assemblies: readonly SingleCellStructuralAssemblyPackage[]
): MultiCellFoundationOverviewShell {
  const cell_summary_units = assemblies.map((assembly) =>
    assembleCellSummaryProjection(composeSingleCellShellScaffold(assembly))
  );
  const deferred_items = unique_items(
    cell_summary_units.flatMap((summary) => summary.deferred_items)
  );
  const non_claims = unique_items([
    ...cell_summary_units.flatMap((summary) => summary.non_claims),
    ...MULTI_CELL_FOUNDATION_NON_CLAIMS,
  ]);

  return {
    overview_shell_id: `multi-cell-foundation-${cell_summary_units.length}-overview`,
    overview_scope: "multi_cell_foundation_only",
    operator_surface: "multi_cell_foundation_overview",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "read_inspect_overview",
    actual_ui_pages_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    cell_summary_units,
    management_object_family_status: {
      management_directive: "contract_frozen_non_executable",
      delivery_return: "contract_frozen_non_executable",
      approval_request: "contract_frozen_non_executable",
    },
    truth_boundary: {
      product_projection_only: true,
      summary_projection_is_runtime_law: false,
      upward_runtime_authority: "forbidden",
      upward_protocol_authority: "forbidden",
      non_claims,
    },
    projection_notes: [
      "Multi-cell foundation overview is read/inspect-oriented only.",
      "Overview shell allows lawful multi-cell coexistence without introducing Secretary behavior or dispatch control.",
    ],
    deferred_items,
  };
}
