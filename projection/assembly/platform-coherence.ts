import type {
  SoloCrewCrossPlanePlatformCoherenceState,
  SoloCrewPlatformPlaneKey,
} from "../contracts/platform-coherence-contract.ts";
import type {
  SoloCrewPackMountModelState,
} from "../contracts/pack-mount-model-contract.ts";
import type {
  SingleCellStructuralAssemblyPackage,
} from "../contracts/single-cell-assembly-contract.ts";

const PRESENT_PLANE_KEYS: readonly SoloCrewPlatformPlaneKey[] = [
  "management_plane",
  "organization_plane",
  "execution_plane",
  "memory_evidence_plane",
] as const;

const CROSS_PLANE_NON_CLAIMS = [
  "no_cross_plane_execution_ownership",
  "no_runtime_authority_claim",
  "no_protocol_authority_claim",
  "no_plane_collapse_into_workflow_engine",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function assembleCrossPlanePlatformCoherenceState(input: {
  assembly: SingleCellStructuralAssemblyPackage;
  optional_mount_state: SoloCrewPackMountModelState;
  continuity_note: string;
}): SoloCrewCrossPlanePlatformCoherenceState {
  const { assembly, optional_mount_state, continuity_note } = input;
  const { constitution_state, initial_management_directive_seed, initial_cell_summary_seed } =
    assembly;

  return {
    coherence_state_id: `${assembly.assembly_id}-platform-coherence`,
    coherence_scope: "single_cell_only",
    authority_boundary: "product_projection_only",
    coherence_mode: "cross_plane_platform_summary",
    execution_boundary: "non_executing",
    platform_readiness_posture: "bounded_platform_baseline_only",
    runtime_authority_claimed: false,
    protocol_authority_claimed: false,
    present_plane_keys: [...PRESENT_PLANE_KEYS],
    bounded_plane_keys: [...PRESENT_PLANE_KEYS],
    management_plane: {
      plane_key: "management_plane",
      plane_presence: "present",
      boundary_status: "bounded_product_projection",
      execution_boundary: "non_executing",
      management_priority: initial_management_directive_seed.priority,
      delivery_review_posture:
        constitution_state.delivery_contract.review_posture,
      delivery_posture:
        initial_cell_summary_seed.cell_summary_card.delivery_posture,
      management_surface_scope:
        initial_cell_summary_seed.management_surface_scope,
      available_truths: [
        "management_directive_seed",
        "delivery_contract_review_posture",
        "cell_summary_delivery_posture",
        "bounded_management_surface_scope",
      ],
      deferred_truths: [
        "direct_management_execution",
        "direct_approval_or_dispatch_control",
        "organization_wide_management_cockpit",
      ],
      posture_summary:
        "Management plane is present through directive seed, delivery review posture, and bounded single-cell management scope without becoming directive execution authority.",
      non_claims: [
        "no_direct_management_execution",
        "no_approval_dispatch_controls",
        "no_runtime_management_authority",
      ],
    },
    organization_plane: {
      plane_key: "organization_plane",
      plane_presence: "present",
      boundary_status: "bounded_product_projection",
      execution_boundary: "non_executing",
      topology_mode: constitution_state.crew_blueprint.topology_mode,
      portfolio_mode: constitution_state.objective_portfolio.portfolio_mode,
      optional_mounts_present:
        optional_mount_state.optional_mounts_present,
      structural_availability:
        optional_mount_state.structural_availability,
      mount_execution_boundary:
        optional_mount_state.execution_boundary,
      business_pack_mount_postures:
        optional_mount_state.business_pack_mounts.map(
          (mount) => mount.posture_summary
        ),
      metrics_pack_mount_postures:
        optional_mount_state.metrics_pack_mounts.map(
          (mount) => mount.posture_summary
        ),
      available_truths: [
        "cell_charter",
        "crew_blueprint",
        "objective_portfolio",
        "optional_pack_mount_model",
      ],
      deferred_truths: [
        "multi_cell_platform_merge",
        "business_pack_execution",
        "metrics_pack_execution",
      ],
      posture_summary:
        "Organization plane is present through cell charter, crew topology, objective portfolio, and optional pack mounts as structural platform truth only.",
      non_claims: [
        "no_pack_execution_behavior",
        "no_organization_runtime_authority",
        "no_mount_to_execution_upgrade",
      ],
    },
    execution_plane: {
      plane_key: "execution_plane",
      plane_presence: "present",
      boundary_status: "bounded_product_projection",
      execution_boundary: "non_executing",
      ledger_mode: constitution_state.execution_ledger.ledger_mode,
      near_term_execution_pressure:
        assembly.compile_input_seed.objective_context.near_term_execution_pressure,
      active_work_count:
        assembly.compile_input_seed.objective_context.active_work_count,
      blocked_work_count:
        assembly.compile_input_seed.objective_context.blocked_work_count,
      work_item_timeline_available: false,
      available_truths: [
        "execution_ledger",
        "bounded_work_counts",
        "near_term_execution_pressure",
      ],
      deferred_truths: [
        "work_item_event_timeline",
        "provider_execution",
        "dispatch_execution",
      ],
      posture_summary:
        "Execution-adjacent plane is present through the bounded execution ledger and seeded work-pressure read without becoming runtime execution ownership.",
      non_claims: [
        "no_provider_execution",
        "no_dispatch_execution",
        "no_workflow_engine_authority",
      ],
    },
    memory_evidence_plane: {
      plane_key: "memory_evidence_plane",
      plane_presence: "present",
      boundary_status: "bounded_product_projection",
      execution_boundary: "non_executing",
      continuity_status: "bounded_and_honest",
      continuity_sources: [
        ...constitution_state.memory_evidence_anchor.continuity_sources,
      ],
      continuity_note,
      known_absences: [
        ...assembly.compile_input_seed.memory_evidence_state.known_absences,
      ],
      full_evidence_graph_available: false,
      available_truths: [
        "memory_evidence_anchor",
        "continuity_sources",
        "continuity_note",
        "known_absences",
      ],
      deferred_truths: [
        "full_evidence_graph",
        "memory_reconstruction_runtime",
        "cross_cell_memory_fabric",
      ],
      posture_summary:
        "Memory/evidence plane is present through continuity anchors, continuity notes, and known absences without claiming a full evidence graph.",
      non_claims: [
        "no_full_evidence_graph",
        "no_runtime_memory_authority",
      ],
    },
    deferred_cross_plane_items: unique_items([
      ...assembly.deferred_items,
      "broad_kpi_cockpit",
      "platform_delivery_readiness_surface",
      "direct_control_semantics",
      "runtime_complete_product_state",
    ]),
    cross_plane_summary:
      "Current platform coherence aligns management, organization, execution-adjacent, and memory/evidence product truths into one bounded solo-operator baseline without collapsing them into execution authority.",
    omission_summary:
      "Cross-plane coherence remains bounded: broad KPI cockpit, platform delivery-readiness surface, direct control semantics, runtime-complete product state, and protocol-facing execution law remain deferred.",
    non_claims: [...CROSS_PLANE_NON_CLAIMS],
  };
}
