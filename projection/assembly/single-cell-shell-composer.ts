import type {
  SingleCellStructuralAssemblyPackage,
} from "../contracts/single-cell-assembly-contract.ts";
import type {
  SingleCellShellComposition,
} from "../contracts/single-cell-shell-composition-contract.ts";
import { assembleSingleCellConsoleState } from "./single-cell-console-state.ts";
import { assembleSingleCellViewModel } from "./single-cell-view-model.ts";

const SHELL_ENTRY_NON_CLAIMS = [
  "no_actual_ui_page_implementation",
  "no_provider_execution_truth",
  "no_channel_integration_truth",
  "no_multi_cell_portfolio_truth",
  "no_secretary_behavior_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_product_state",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function composeSingleCellShellScaffold(
  assembly: SingleCellStructuralAssemblyPackage
): SingleCellShellComposition {
  const single_cell_console_state = assembleSingleCellConsoleState(assembly);
  const single_cell_view_model =
    assembleSingleCellViewModel(single_cell_console_state);
  const deferred_items = unique_items([
    ...assembly.deferred_items,
    ...single_cell_console_state.deferred_surfaces,
    ...single_cell_view_model.deferred_surface_view.deferred_surfaces,
  ]);

  return {
    shell_composition_id: `${assembly.assembly_id}-shell-composition`,
    shell_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    phase_boundary: "shell_entry_ready",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_ui_pages_present: false,
    broad_kpi_cockpit_available: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    runtime_complete_product_state_available: false,
    entry_surface_non_claims: [
      ...SHELL_ENTRY_NON_CLAIMS,
    ],
    constitution_state: assembly.constitution_state,
    initial_management_directive_seed: assembly.initial_management_directive_seed,
    initial_cell_summary_seed: assembly.initial_cell_summary_seed,
    compile_input_seed: assembly.compile_input_seed,
    single_cell_console_state,
    single_cell_view_model,
    projection_notes: [
      ...assembly.projection_notes,
      "Single-cell shell composition is shell-entry-ready only.",
      "Shell composition does not imply actual UI pages or runtime-complete product state.",
    ],
    deferred_items,
  };
}
