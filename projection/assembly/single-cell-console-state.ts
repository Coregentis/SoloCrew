import type { SingleCellStructuralAssemblyPackage } from "../contracts/single-cell-assembly-contract.ts";
import type { SingleCellConsoleState } from "../contracts/single-cell-console-state-contract.ts";
import {
  assemblePackMountModelState,
} from "./pack-mount-model.ts";

const CONSOLE_NON_CLAIMS = [
  "no_event_timeline_truth",
  "no_provider_execution_truth",
  "no_multi_cell_portfolio_truth",
  "no_secretary_behavior_truth",
  "no_broad_kpi_projection",
] as const;

const DELIVERY_CONTRACT_DEFERRED_SURFACES = [
  "delivery_acceptance_workflow_runtime",
  "delivery_return_runtime_automation",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function assembleSingleCellConsoleState(
  assembly: SingleCellStructuralAssemblyPackage
): SingleCellConsoleState {
  const { constitution_state, initial_management_directive_seed, initial_cell_summary_seed } =
    assembly;

  const continuity_note = initial_cell_summary_seed.cell_summary_card.continuity_note;
  const deferred_surfaces = unique_items([
    ...assembly.deferred_items,
    "secretary_behavior",
  ]);

  return {
    console_state_id: `${assembly.assembly_id}-console-state`,
    console_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_summary",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    broad_kpi_cockpit_available: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    truth_boundary_state: {
      persisted_structural_truth_sections: [
        "cell_identity_state",
        "delivery_contract_state",
        "crew_state",
        "objective_state",
        "execution_ledger_state",
        "memory_and_evidence_state",
        "optional_mount_state",
        "continuity_truth_state",
      ],
      seeded_summary_truth_sections: [
        "cell_identity_state",
        "crew_state",
        "objective_state",
        "memory_and_evidence_state",
        "continuity_truth_state",
      ],
      deferred_unavailable_surfaces: [...deferred_surfaces],
      non_claims: [...CONSOLE_NON_CLAIMS],
    },
    cell_identity_state: {
      persisted_structural_truth: {
        cell_id: constitution_state.cell_charter.cell_id,
        cell_name: constitution_state.cell_charter.cell_name,
        mission: constitution_state.cell_charter.mission,
        business_scope: constitution_state.cell_charter.business_scope,
        operator_id: constitution_state.cell_charter.operator_id,
        operator_role: constitution_state.cell_charter.operator_role,
      },
      seeded_summary_truth: {
        current_objective_headline:
          initial_cell_summary_seed.cell_summary_card.current_objective_headline,
        delivery_posture:
          initial_cell_summary_seed.cell_summary_card.delivery_posture,
        continuity_note,
      },
    },
    delivery_contract_state: {
      persisted_structural_truth: {
        delivery_contract_id:
          constitution_state.delivery_contract.delivery_contract_id,
        delivery_target: constitution_state.delivery_contract.delivery_target,
        done_definition: constitution_state.delivery_contract.done_definition,
        return_shape: constitution_state.delivery_contract.return_shape,
        review_posture: constitution_state.delivery_contract.review_posture,
      },
      deferred_unavailable_surfaces: [
        ...DELIVERY_CONTRACT_DEFERRED_SURFACES,
      ],
    },
    crew_state: {
      persisted_structural_truth: {
        compiler_role:
          constitution_state.ceo_orchestrator_contract.compiler_role,
        topology_mode: constitution_state.crew_blueprint.topology_mode,
        coordination_pattern:
          constitution_state.crew_blueprint.coordination_pattern,
        required_role_keys: [
          ...constitution_state.crew_blueprint.required_role_keys,
        ],
        role_policy_binding_mode:
          constitution_state.crew_blueprint.role_policy_binding_mode,
      },
      seeded_summary_truth: {
        management_priority: initial_management_directive_seed.priority,
        compile_seed_status: "ready_for_future_compile",
        runtime_worker_state_available: false,
      },
    },
    objective_state: {
      persisted_structural_truth: {
        current_objective_id:
          constitution_state.objective_portfolio.current_objective_id,
        queued_objective_ids: [
          ...constitution_state.objective_portfolio.queued_objective_ids,
        ],
        portfolio_mode: constitution_state.objective_portfolio.portfolio_mode,
      },
      seeded_summary_truth: {
        current_objective_headline:
          assembly.compile_input_seed.objective_context.current_objective_headline,
        active_work_count:
          assembly.compile_input_seed.objective_context.active_work_count,
        blocked_work_count:
          assembly.compile_input_seed.objective_context.blocked_work_count,
        near_term_execution_pressure:
          assembly.compile_input_seed.objective_context.near_term_execution_pressure,
      },
    },
    execution_ledger_state: {
      persisted_structural_truth: {
        execution_ledger_id:
          constitution_state.execution_ledger.execution_ledger_id,
        ledger_mode: constitution_state.execution_ledger.ledger_mode,
        durable_surfaces: [
          ...constitution_state.execution_ledger.durable_surfaces,
        ],
        event_timeline_persisted:
          constitution_state.execution_ledger.event_timeline_persisted,
      },
      non_claims: [
        "no_event_timeline_truth",
        "no_provider_execution_truth",
      ],
    },
    memory_and_evidence_state: {
      persisted_structural_truth: {
        memory_evidence_anchor_id:
          constitution_state.memory_evidence_anchor.memory_evidence_anchor_id,
        continuity_sources: [
          ...constitution_state.memory_evidence_anchor.continuity_sources,
        ],
        evidence_mode: constitution_state.memory_evidence_anchor.evidence_mode,
        full_evidence_graph_available:
          constitution_state.memory_evidence_anchor.full_evidence_graph_available,
      },
      seeded_summary_truth: {
        continuity_note,
      },
      known_absences: [
        ...assembly.compile_input_seed.memory_evidence_state.known_absences,
      ],
    },
    optional_mount_state: assemblePackMountModelState({
      business_pack_mounts: constitution_state.business_pack_mounts,
      metrics_pack_mounts: constitution_state.metrics_pack_mounts,
    }),
    continuity_truth_state: {
      persisted_structural_truth: {
        anchor_ref_id:
          assembly.compile_input_seed.memory_evidence_state.anchor_ref_id,
        continuity_sources: [
          ...assembly.compile_input_seed.memory_evidence_state.continuity_sources,
        ],
        continuity_status: "bounded_and_honest",
      },
      seeded_summary_truth: {
        management_surface_scope:
          initial_cell_summary_seed.management_surface_scope,
        runtime_summary_claim:
          initial_cell_summary_seed.runtime_summary_claim,
        continuity_note,
      },
      non_claims: [...CONSOLE_NON_CLAIMS],
    },
    deferred_surfaces: [...deferred_surfaces],
  };
}
