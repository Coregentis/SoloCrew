import type {
  SingleCellShellComposition,
} from "../../projection/contracts/single-cell-shell-composition-contract.ts";
import type {
  SingleCellViewTruthSource,
} from "../../projection/contracts/single-cell-view-model-contract.ts";
import type {
  SoloCrewAppShellBoundary,
  SoloCrewAppShellRole,
} from "./app-boundary.ts";

export const SINGLE_CELL_SHELL_ENTRY_SECTION_KEYS = [
  "header_view",
  "delivery_view",
  "crew_overview_view",
  "objective_overview_view",
  "workstream_or_workitem_overview_view",
  "memory_and_continuity_view",
  "deferred_surface_view",
  "truth_boundary_view",
] as const;

export type SingleCellShellEntrySectionKey =
  (typeof SINGLE_CELL_SHELL_ENTRY_SECTION_KEYS)[number];

export type SingleCellShellEntryPhaseBoundary = "app_shell_adapter";
export type SingleCellShellEntryAuthorityBoundary =
  "app_shell_projection_consumer";

export interface SingleCellShellEntryHeaderSeed {
  truth_sources: SingleCellViewTruthSource[];
  cell_name: string;
  current_objective_headline: string;
  delivery_posture: string;
  continuity_note: string;
}

export interface SingleCellShellEntrySectionSeed {
  truth_sources: SingleCellViewTruthSource[];
  available_section_keys: readonly SingleCellShellEntrySectionKey[];
  default_section_key: SingleCellShellEntrySectionKey;
  actual_routing_present: false;
}

export interface SingleCellShellEntryTruthBoundarySeed {
  truth_sources: SingleCellViewTruthSource[];
  persisted_structural_truth_sections: readonly string[];
  seeded_summary_truth_sections: readonly string[];
  deferred_items: string[];
  non_claims: string[];
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  runtime_complete_product_entry_available: false;
}

export interface SingleCellShellEntryPackage {
  entry_package_id: string;
  entry_scope: "single_cell_only";
  app_shell_role: SoloCrewAppShellRole;
  authority_boundary: SingleCellShellEntryAuthorityBoundary;
  phase_boundary: SingleCellShellEntryPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_ui_pages_present: false;
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  runtime_complete_product_entry_available: false;
  app_shell_boundary: SoloCrewAppShellBoundary;
  shell_composition: SingleCellShellComposition;
  entry_header_seed: SingleCellShellEntryHeaderSeed;
  entry_section_seed: SingleCellShellEntrySectionSeed;
  entry_truth_boundary_seed: SingleCellShellEntryTruthBoundarySeed;
  projection_notes: string[];
  deferred_items: string[];
}
