import type {
  SingleCellStructuralAssemblyPackage,
} from "./single-cell-assembly-contract.ts";
import type {
  SingleCellConsoleState,
} from "./single-cell-console-state-contract.ts";
import type {
  SingleCellViewModel,
} from "./single-cell-view-model-contract.ts";

export type SingleCellShellCompositionPhaseBoundary = "shell_entry_ready";
export type SingleCellShellCompositionAuthorityBoundary =
  "product_projection_only";

export interface SingleCellShellComposition {
  shell_composition_id: string;
  shell_scope: "single_cell_only";
  authority_boundary: SingleCellShellCompositionAuthorityBoundary;
  phase_boundary: SingleCellShellCompositionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_ui_pages_present: false;
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  runtime_complete_product_state_available: false;
  entry_surface_non_claims: string[];
  constitution_state: SingleCellStructuralAssemblyPackage["constitution_state"];
  initial_management_directive_seed:
    SingleCellStructuralAssemblyPackage["initial_management_directive_seed"];
  initial_cell_summary_seed:
    SingleCellStructuralAssemblyPackage["initial_cell_summary_seed"];
  compile_input_seed:
    SingleCellStructuralAssemblyPackage["compile_input_seed"];
  single_cell_console_state: SingleCellConsoleState;
  single_cell_view_model: SingleCellViewModel;
  projection_notes: string[];
  deferred_items: string[];
}
