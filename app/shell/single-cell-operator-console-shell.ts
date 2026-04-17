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
    runtime_dependent_downstream_truth_overview: {
      truth_sources: [
        ...view_model.runtime_dependent_downstream_truth_view.truth_sources,
      ],
      truth_status:
        view_model.runtime_dependent_downstream_truth_view.truth_status,
      confirm_visibility_status:
        view_model.runtime_dependent_downstream_truth_view.confirm_visibility_status,
      trace_visibility_status:
        view_model.runtime_dependent_downstream_truth_view.trace_visibility_status,
      evidence_visibility_status:
        view_model.runtime_dependent_downstream_truth_view.evidence_visibility_status,
      context_export_status:
        view_model.runtime_dependent_downstream_truth_view.context_export_status,
      plan_export_status:
        view_model.runtime_dependent_downstream_truth_view.plan_export_status,
      upstream_workflow_truth_status:
        view_model.runtime_dependent_downstream_truth_view.upstream_workflow_truth_status,
      summary_text:
        view_model.runtime_dependent_downstream_truth_view.summary_text,
      confirm_linked_summary:
        view_model.runtime_dependent_downstream_truth_view.confirm_linked_summary,
      trace_linked_summary:
        view_model.runtime_dependent_downstream_truth_view.trace_linked_summary,
      evidence_linked_summary:
        view_model.runtime_dependent_downstream_truth_view.evidence_linked_summary,
      delivery_interpretation_summary:
        view_model.runtime_dependent_downstream_truth_view.delivery_interpretation_summary,
      supported_upstream_truths: [
        ...view_model.runtime_dependent_downstream_truth_view.supported_upstream_truths,
      ],
      bounded_truths: [
        ...view_model.runtime_dependent_downstream_truth_view.bounded_truths,
      ],
      unavailable_truths: [
        ...view_model.runtime_dependent_downstream_truth_view.unavailable_truths,
      ],
      omission_notes: [
        ...view_model.runtime_dependent_downstream_truth_view.omission_notes,
      ],
      non_claims: [
        ...view_model.runtime_dependent_downstream_truth_view.non_claims,
      ],
    },
    platform_coherence_overview: {
      truth_sources: [
        ...view_model.platform_coherence_view.truth_sources,
      ],
      platform_readiness_posture:
        view_model.platform_coherence_view.platform_readiness_posture,
      cross_plane_summary:
        view_model.platform_coherence_view.cross_plane_summary,
      omission_summary:
        view_model.platform_coherence_view.omission_summary,
      present_plane_keys: [
        ...view_model.platform_coherence_view.present_plane_keys,
      ],
      deferred_cross_plane_items: [
        ...view_model.platform_coherence_view.deferred_cross_plane_items,
      ],
      management_plane_summary:
        view_model.platform_coherence_view.management_plane.posture_summary,
      organization_plane_summary:
        view_model.platform_coherence_view.organization_plane.posture_summary,
      execution_plane_summary:
        view_model.platform_coherence_view.execution_plane.posture_summary,
      memory_evidence_plane_summary:
        view_model.platform_coherence_view.memory_evidence_plane.posture_summary,
      non_claims: [...view_model.platform_coherence_view.non_claims],
    },
    platform_delivery_readiness_overview: {
      truth_sources: [
        ...view_model.platform_delivery_readiness_view.truth_sources,
      ],
      platform_posture:
        view_model.platform_delivery_readiness_view.platform_posture,
      delivery_readiness_status:
        view_model.platform_delivery_readiness_view.delivery_readiness_status,
      formal_delivery_ready_now:
        view_model.platform_delivery_readiness_view.formal_delivery_ready_now,
      current_readiness_blocker:
        view_model.platform_delivery_readiness_view.current_readiness_blocker,
      current_blocker_summary:
        view_model.platform_delivery_readiness_view.current_blocker_summary,
      summary_text:
        view_model.platform_delivery_readiness_view.summary_text,
      omission_summary:
        view_model.platform_delivery_readiness_view.omission_summary,
      present_capability_summaries:
        view_model.platform_delivery_readiness_view.present_capabilities.map(
          (capability) =>
            `${capability.capability_key}: ${capability.summary}`
        ),
      deferred_capability_summaries:
        view_model.platform_delivery_readiness_view.deferred_capabilities.map(
          (capability) =>
            `${capability.capability_key}: ${capability.summary}`
        ),
      deferred_items: [
        ...view_model.platform_delivery_readiness_view.deferred_items,
      ],
      non_claims: [
        ...view_model.platform_delivery_readiness_view.non_claims,
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
        ...view_model.runtime_dependent_downstream_truth_view.non_claims,
        ...view_model.platform_coherence_view.non_claims,
        ...view_model.platform_delivery_readiness_view.non_claims,
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
      "Cross-plane platform coherence stays explanatory only and does not collapse management, organization, execution, or memory/evidence planes into execution authority.",
      "Runtime-dependent downstream truth overview stays confirm/trace/evidence-linked only and does not convert upstream bounded truth into local workflow law.",
      "Platform delivery-readiness overview stays explanatory only and does not upgrade planning legibility into execution or delivery authority.",
    ],
    deferred_items: [...deferred_items],
  };
}
