import type {
  SingleCellStructuralAssemblyPackage,
} from "../../projection/contracts/single-cell-assembly-contract.ts";
import type {
  SingleCellOperatorConsolePage,
} from "../pages/single-cell-operator-console-page.ts";
import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type { RuntimeSessionMode } from "./create-runtime-session.ts";
import type {
  SingleCellOperatorConsoleShell,
} from "./single-cell-operator-console-shell-contract.ts";
import type {
  SingleCellShellEntryPackage,
} from "./single-cell-shell-entry-contract.ts";

export const SINGLE_CELL_OPERATOR_CONSOLE_BOOTSTRAP_TRUTH_SOURCES = [
  "baseline_shell_runtime_truth",
  "single_cell_structural_seed",
  "app_shell_projection",
  "bounded_operator_page",
] as const;

export type SingleCellOperatorConsoleBootstrapTruthSource =
  (typeof SINGLE_CELL_OPERATOR_CONSOLE_BOOTSTRAP_TRUTH_SOURCES)[number];

export type SingleCellOperatorConsoleBootstrapAuthorityBoundary =
  "app_shell_projection_consumer";
export type SingleCellOperatorConsoleBootstrapPhaseBoundary =
  "operator_console_bootstrap";

export interface SingleCellOperatorConsoleBootstrap {
  bootstrap_id: string;
  bootstrap_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  truth_sources: readonly SingleCellOperatorConsoleBootstrapTruthSource[];
  authority_boundary: SingleCellOperatorConsoleBootstrapAuthorityBoundary;
  phase_boundary: SingleCellOperatorConsoleBootstrapPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  runtime_mode: RuntimeSessionMode;
  baseline_shell_session: BaselineShellSession;
  structural_assembly: SingleCellStructuralAssemblyPackage;
  shell_entry_package: SingleCellShellEntryPackage;
  console_shell: SingleCellOperatorConsoleShell;
  page: SingleCellOperatorConsolePage;
  projection_notes: string[];
  deferred_items: string[];
  close(): void;
}
