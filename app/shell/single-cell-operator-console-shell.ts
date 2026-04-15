import type {
  SingleCellOperatorConsoleShell,
} from "./single-cell-operator-console-shell-contract.ts";
import type {
  SingleCellShellEntryPackage,
} from "./single-cell-shell-entry-contract.ts";

const OPERATOR_CONSOLE_NON_CLAIMS = [
  "no_actual_ui_page_implementation",
  "no_multi_cell_portfolio_truth",
  "no_secretary_behavior_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_product_state",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function composeSingleCellOperatorConsoleShell(
  entry_package: SingleCellShellEntryPackage
): SingleCellOperatorConsoleShell {
  const view_model = entry_package.shell_composition.single_cell_view_model;
  const console_state = entry_package.shell_composition.single_cell_console_state;
  const deferred_items = unique_items([
    ...entry_package.deferred_items,
    ...view_model.deferred_surface_view.deferred_surfaces,
  ]);

  return {
    console_shell_id: `${entry_package.entry_package_id}-operator-console-shell`,
    console_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_console_shell",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_ui_pages_present: false,
    broad_kpi_cockpit_available: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    runtime_complete_product_state_available: false,
    entry_package,
    header: {
      truth_sources: [...view_model.header_view.truth_sources],
      cell_name: view_model.header_view.cell_name,
      current_objective_headline:
        view_model.header_view.current_objective_headline,
      delivery_posture: view_model.header_view.delivery_posture,
      continuity_note: view_model.header_view.continuity_note,
    },
    delivery: {
      truth_sources: [...view_model.delivery_view.truth_sources],
      delivery_target: view_model.delivery_view.delivery_target,
      done_definition: view_model.delivery_view.done_definition,
      review_posture: view_model.delivery_view.review_posture,
      deferred_surfaces: [...view_model.delivery_view.deferred_surfaces],
    },
    crew_overview: {
      truth_sources: [...view_model.crew_overview_view.truth_sources],
      compiler_role: view_model.crew_overview_view.compiler_role,
      required_role_keys: [
        ...view_model.crew_overview_view.required_role_keys,
      ],
      management_priority: view_model.crew_overview_view.management_priority,
      compile_seed_status: view_model.crew_overview_view.compile_seed_status,
      runtime_worker_state_available:
        view_model.crew_overview_view.runtime_worker_state_available,
    },
    objective_overview: {
      truth_sources: [...view_model.objective_overview_view.truth_sources],
      current_objective_id: view_model.objective_overview_view.current_objective_id,
      current_objective_headline:
        view_model.objective_overview_view.current_objective_headline,
      active_work_count:
        view_model.objective_overview_view.active_work_count,
      blocked_work_count:
        view_model.objective_overview_view.blocked_work_count,
      near_term_execution_pressure:
        view_model.objective_overview_view.near_term_execution_pressure,
    },
    work_item_execution_overview: {
      truth_sources: [
        ...view_model.workstream_or_workitem_overview_view.truth_sources,
      ],
      workstream_mode:
        view_model.workstream_or_workitem_overview_view.workstream_mode,
      active_work_count:
        view_model.workstream_or_workitem_overview_view.active_work_count,
      blocked_work_count:
        view_model.workstream_or_workitem_overview_view.blocked_work_count,
      actual_runtime_work_item_projection_available:
        view_model.workstream_or_workitem_overview_view.actual_runtime_work_item_projection_available,
      work_item_timeline_available:
        view_model.workstream_or_workitem_overview_view.work_item_timeline_available,
      non_claims: [
        ...view_model.workstream_or_workitem_overview_view.non_claims,
      ],
    },
    memory_continuity_overview: {
      truth_sources: [...view_model.memory_and_continuity_view.truth_sources],
      anchor_ref_id: view_model.memory_and_continuity_view.anchor_ref_id,
      continuity_sources: [
        ...view_model.memory_and_continuity_view.continuity_sources,
      ],
      continuity_status:
        view_model.memory_and_continuity_view.continuity_status,
      continuity_note:
        view_model.memory_and_continuity_view.continuity_note,
      known_absences: [
        ...view_model.memory_and_continuity_view.known_absences,
      ],
    },
    deferred_surfaces: {
      truth_sources: [...view_model.deferred_surface_view.truth_sources],
      deferred_items: [...deferred_items],
      optional_mounts_present:
        view_model.deferred_surface_view.optional_mounts_present,
      business_pack_mount_keys: [
        ...view_model.deferred_surface_view.business_pack_mount_keys,
      ],
      metrics_pack_mount_keys: [
        ...view_model.deferred_surface_view.metrics_pack_mount_keys,
      ],
      all_mounts_deferred:
        view_model.deferred_surface_view.all_mounts_deferred,
    },
    truth_boundary: {
      truth_sources: [...view_model.truth_boundary_view.truth_sources],
      persisted_structural_truth_sections: [
        ...view_model.truth_boundary_view.persisted_structural_truth_sections,
      ],
      seeded_summary_truth_sections: [
        ...view_model.truth_boundary_view.seeded_summary_truth_sections,
      ],
      deferred_items: [...deferred_items],
      non_claims: unique_items([
        ...view_model.truth_boundary_view.non_claims,
        ...entry_package.entry_truth_boundary_seed.non_claims,
        ...OPERATOR_CONSOLE_NON_CLAIMS,
      ]),
      broad_kpi_cockpit_available: false,
      multi_cell_portfolio_behavior_available: false,
      secretary_behavior_available: false,
      runtime_complete_product_state_available: false,
    },
    projection_notes: [
      ...entry_package.projection_notes,
      "Single-cell operator console shell is operator-facing only.",
      "Operator console shell does not imply page rendering, provider execution, or multi-cell behavior.",
    ],
    deferred_items: [...deferred_items],
  };
}
