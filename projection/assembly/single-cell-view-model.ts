import type { SingleCellConsoleState } from "../contracts/single-cell-console-state-contract.ts";
import type { SingleCellViewModel } from "../contracts/single-cell-view-model-contract.ts";

const VIEW_MODEL_NON_CLAIMS = [
  "no_event_timeline_truth",
  "no_provider_execution_truth",
  "no_multi_cell_portfolio_truth",
  "no_secretary_behavior_truth",
  "no_broad_kpi_projection",
  "no_actual_ui_page_implementation",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function assembleSingleCellViewModel(
  console_state: SingleCellConsoleState
): SingleCellViewModel {
  const deferred_surfaces = unique_items([
    ...console_state.deferred_surfaces,
    ...console_state.truth_boundary_state.deferred_unavailable_surfaces,
  ]);

  return {
    view_model_id: `${console_state.console_state_id}-view-model`,
    view_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    phase_boundary: "ui_adjacent_projection",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_ui_pages_present: false,
    broad_kpi_cockpit_available: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    header_view: {
      section_key: "header_view",
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
      ],
      cell_name: console_state.cell_identity_state.persisted_structural_truth.cell_name,
      mission: console_state.cell_identity_state.persisted_structural_truth.mission,
      current_objective_headline:
        console_state.cell_identity_state.seeded_summary_truth.current_objective_headline,
      delivery_posture:
        console_state.cell_identity_state.seeded_summary_truth.delivery_posture,
      continuity_note:
        console_state.cell_identity_state.seeded_summary_truth.continuity_note,
    },
    delivery_view: {
      section_key: "delivery_view",
      truth_sources: [
        "persisted_structural_truth",
        "deferred_unavailable_surface",
      ],
      delivery_target:
        console_state.delivery_contract_state.persisted_structural_truth.delivery_target,
      done_definition:
        console_state.delivery_contract_state.persisted_structural_truth.done_definition,
      return_shape:
        console_state.delivery_contract_state.persisted_structural_truth.return_shape,
      review_posture:
        console_state.delivery_contract_state.persisted_structural_truth.review_posture,
      deferred_surfaces: [
        ...console_state.delivery_contract_state.deferred_unavailable_surfaces,
      ],
    },
    crew_overview_view: {
      section_key: "crew_overview_view",
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
      ],
      compiler_role:
        console_state.crew_state.persisted_structural_truth.compiler_role,
      topology_mode:
        console_state.crew_state.persisted_structural_truth.topology_mode,
      coordination_pattern:
        console_state.crew_state.persisted_structural_truth.coordination_pattern,
      required_role_keys: [
        ...console_state.crew_state.persisted_structural_truth.required_role_keys,
      ],
      management_priority:
        console_state.crew_state.seeded_summary_truth.management_priority,
      compile_seed_status:
        console_state.crew_state.seeded_summary_truth.compile_seed_status,
      runtime_worker_state_available:
        console_state.crew_state.seeded_summary_truth.runtime_worker_state_available,
    },
    objective_overview_view: {
      section_key: "objective_overview_view",
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
      ],
      current_objective_id:
        console_state.objective_state.persisted_structural_truth.current_objective_id,
      current_objective_headline:
        console_state.objective_state.seeded_summary_truth.current_objective_headline,
      queued_objective_ids: [
        ...console_state.objective_state.persisted_structural_truth.queued_objective_ids,
      ],
      active_work_count:
        console_state.objective_state.seeded_summary_truth.active_work_count,
      blocked_work_count:
        console_state.objective_state.seeded_summary_truth.blocked_work_count,
      near_term_execution_pressure:
        console_state.objective_state.seeded_summary_truth.near_term_execution_pressure,
    },
    workstream_or_workitem_overview_view: {
      section_key: "workstream_or_workitem_overview_view",
      truth_sources: [
        "seeded_summary_truth",
        "non_claim",
      ],
      workstream_mode: "seeded_counts_only",
      actual_runtime_work_item_projection_available: false,
      active_work_count:
        console_state.objective_state.seeded_summary_truth.active_work_count,
      blocked_work_count:
        console_state.objective_state.seeded_summary_truth.blocked_work_count,
      work_item_timeline_available: false,
      non_claims: [
        "no_event_timeline_truth",
        "no_runtime_complete_work_item_projection",
      ],
    },
    memory_and_continuity_view: {
      section_key: "memory_and_continuity_view",
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
        "non_claim",
      ],
      anchor_ref_id:
        console_state.continuity_truth_state.persisted_structural_truth.anchor_ref_id,
      continuity_sources: [
        ...console_state.continuity_truth_state.persisted_structural_truth.continuity_sources,
      ],
      continuity_status:
        console_state.continuity_truth_state.persisted_structural_truth.continuity_status,
      continuity_note:
        console_state.continuity_truth_state.seeded_summary_truth.continuity_note,
      known_absences: [
        ...console_state.memory_and_evidence_state.known_absences,
      ],
    },
    deferred_surface_view: {
      section_key: "deferred_surface_view",
      truth_sources: ["deferred_unavailable_surface"],
      deferred_surfaces: [...deferred_surfaces],
      optional_mounts_present:
        console_state.optional_mount_state.optional_mounts_present,
      business_pack_mount_keys:
        console_state.optional_mount_state.business_pack_mounts.map(
          (mount) => mount.mount_key
        ),
      metrics_pack_mount_keys:
        console_state.optional_mount_state.metrics_pack_mounts.map(
          (mount) => mount.mount_key
        ),
      all_mounts_deferred:
        console_state.optional_mount_state.all_mounts_deferred,
      any_mounted_mounts:
        console_state.optional_mount_state.any_mounted_mounts,
      structural_availability:
        console_state.optional_mount_state.structural_availability,
      execution_boundary:
        console_state.optional_mount_state.execution_boundary,
      business_pack_mount_postures:
        console_state.optional_mount_state.business_pack_mounts.map(
          (mount) => mount.posture_summary
        ),
      metrics_pack_mount_postures:
        console_state.optional_mount_state.metrics_pack_mounts.map(
          (mount) => mount.posture_summary
        ),
    },
    truth_boundary_view: {
      section_key: "truth_boundary_view",
      truth_sources: [
        "persisted_structural_truth",
        "seeded_summary_truth",
        "deferred_unavailable_surface",
        "non_claim",
      ],
      persisted_structural_truth_sections: [
        ...console_state.truth_boundary_state.persisted_structural_truth_sections,
      ],
      seeded_summary_truth_sections: [
        ...console_state.truth_boundary_state.seeded_summary_truth_sections,
      ],
      deferred_unavailable_surfaces: [...deferred_surfaces],
      non_claims: unique_items([
        ...console_state.truth_boundary_state.non_claims,
        ...VIEW_MODEL_NON_CLAIMS,
      ]),
      broad_kpi_cockpit_available: false,
      multi_cell_portfolio_behavior_available: false,
      secretary_behavior_available: false,
    },
  };
}
