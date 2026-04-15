import type {
  SingleCellShellComposition,
} from "../../projection/contracts/single-cell-shell-composition-contract.ts";
import {
  SOLOCREW_APP_SHELL_BOUNDARY,
} from "./app-boundary.ts";
import {
  SINGLE_CELL_SHELL_ENTRY_SECTION_KEYS,
  type SingleCellShellEntryPackage,
} from "./single-cell-shell-entry-contract.ts";

const SHELL_ENTRY_ADAPTER_NON_CLAIMS = [
  "no_actual_ui_page_implementation",
  "no_multi_cell_portfolio_truth",
  "no_secretary_behavior_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_product_entry",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function adaptSingleCellShellEntry(
  shell_composition: SingleCellShellComposition
): SingleCellShellEntryPackage {
  const deferred_items = unique_items([
    ...shell_composition.deferred_items,
    ...SOLOCREW_APP_SHELL_BOUNDARY.deferred,
  ]);

  const non_claims = unique_items([
    ...shell_composition.entry_surface_non_claims,
    ...shell_composition.single_cell_view_model.truth_boundary_view.non_claims,
    ...SHELL_ENTRY_ADAPTER_NON_CLAIMS,
  ]);

  return {
    entry_package_id: `${shell_composition.shell_composition_id}-entry`,
    entry_scope: "single_cell_only",
    app_shell_role: SOLOCREW_APP_SHELL_BOUNDARY.role,
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "app_shell_adapter",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_ui_pages_present: false,
    broad_kpi_cockpit_available: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    runtime_complete_product_entry_available: false,
    app_shell_boundary: {
      role: SOLOCREW_APP_SHELL_BOUNDARY.role,
      owned_projection_objects: [
        ...SOLOCREW_APP_SHELL_BOUNDARY.owned_projection_objects,
      ],
      does_not_own: [...SOLOCREW_APP_SHELL_BOUNDARY.does_not_own],
      deferred: [...SOLOCREW_APP_SHELL_BOUNDARY.deferred],
    },
    shell_composition,
    entry_header_seed: {
      truth_sources: [
        ...shell_composition.single_cell_view_model.header_view.truth_sources,
      ],
      cell_name: shell_composition.single_cell_view_model.header_view.cell_name,
      current_objective_headline:
        shell_composition.single_cell_view_model.header_view.current_objective_headline,
      delivery_posture:
        shell_composition.single_cell_view_model.header_view.delivery_posture,
      continuity_note:
        shell_composition.single_cell_view_model.header_view.continuity_note,
    },
    entry_section_seed: {
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
        "deferred_unavailable_surface",
      ],
      available_section_keys: SINGLE_CELL_SHELL_ENTRY_SECTION_KEYS,
      default_section_key: "header_view",
      actual_routing_present: false,
    },
    entry_truth_boundary_seed: {
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
        "deferred_unavailable_surface",
        "non_claim",
      ],
      persisted_structural_truth_sections: [
        ...shell_composition.single_cell_view_model.truth_boundary_view.persisted_structural_truth_sections,
      ],
      seeded_summary_truth_sections: [
        ...shell_composition.single_cell_view_model.truth_boundary_view.seeded_summary_truth_sections,
      ],
      deferred_items: [...deferred_items],
      non_claims: [...non_claims],
      broad_kpi_cockpit_available: false,
      multi_cell_portfolio_behavior_available: false,
      secretary_behavior_available: false,
      runtime_complete_product_entry_available: false,
    },
    projection_notes: [
      ...shell_composition.projection_notes,
      "Single-cell shell entry adapter is app-shell-adjacent only.",
      "Shell entry adapter does not imply page rendering or runtime-complete entry behavior.",
    ],
    deferred_items: [...deferred_items],
  };
}
