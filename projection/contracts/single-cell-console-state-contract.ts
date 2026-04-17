import type {
  CellDeliveryPosture,
  ManagementPriority,
} from "../objects/management-interface.ts";
import type {
  NearTermExecutionPressure,
  SingleCellAssemblyScope,
  SingleCellSummaryClaim,
} from "./single-cell-assembly-contract.ts";
import type {
  SoloCrewPackMountModelState,
} from "./pack-mount-model-contract.ts";
import type {
  SoloCrewCrossPlanePlatformCoherenceState,
} from "./platform-coherence-contract.ts";
import type {
  SoloCrewPlatformDeliveryReadinessState,
} from "./platform-delivery-readiness-contract.ts";

export type SingleCellConsolePhaseBoundary = "runtime_adjacent_summary";
export type SingleCellConsoleAuthorityBoundary = "product_projection_only";
export type SingleCellConsoleContinuityStatus = "bounded_and_honest";

export interface SingleCellConsoleTruthBoundaryState {
  persisted_structural_truth_sections: readonly string[];
  seeded_summary_truth_sections: readonly string[];
  deferred_unavailable_surfaces: string[];
  non_claims: string[];
}

export interface SingleCellCellIdentityState {
  persisted_structural_truth: {
    cell_id: string;
    cell_name: string;
    mission: string;
    business_scope: string;
    operator_id: string;
    operator_role: "owner_operator";
  };
  seeded_summary_truth: {
    current_objective_headline: string;
    delivery_posture: CellDeliveryPosture;
    continuity_note: string;
  };
}

export interface SingleCellDeliveryContractState {
  persisted_structural_truth: {
    delivery_contract_id: string;
    delivery_target: string;
    done_definition: string;
    return_shape: string;
    review_posture: string;
  };
  deferred_unavailable_surfaces: string[];
}

export interface SingleCellCrewState {
  persisted_structural_truth: {
    compiler_role: "crew_compiler";
    topology_mode: "native_multi_agent_crew";
    coordination_pattern: string;
    required_role_keys: string[];
    role_policy_binding_mode: "compile_time";
  };
  seeded_summary_truth: {
    management_priority: ManagementPriority;
    compile_seed_status: "ready_for_future_compile";
    runtime_worker_state_available: false;
  };
}

export interface SingleCellObjectiveState {
  persisted_structural_truth: {
    current_objective_id: string;
    queued_objective_ids: string[];
    portfolio_mode: "single_cell";
  };
  seeded_summary_truth: {
    current_objective_headline: string;
    active_work_count: number;
    blocked_work_count: number;
    near_term_execution_pressure: NearTermExecutionPressure;
  };
}

export interface SingleCellExecutionLedgerState {
  persisted_structural_truth: {
    execution_ledger_id: string;
    ledger_mode: "bounded_state_ledger";
    durable_surfaces: string[];
    event_timeline_persisted: false;
  };
  non_claims: string[];
}

export interface SingleCellMemoryAndEvidenceState {
  persisted_structural_truth: {
    memory_evidence_anchor_id: string;
    continuity_sources: string[];
    evidence_mode: "bounded_continuity_only";
    full_evidence_graph_available: false;
  };
  seeded_summary_truth: {
    continuity_note: string;
  };
  known_absences: string[];
}

export interface SingleCellOptionalMountState
  extends SoloCrewPackMountModelState {}

export interface SingleCellContinuityTruthState {
  persisted_structural_truth: {
    anchor_ref_id: string;
    continuity_sources: string[];
    continuity_status: SingleCellConsoleContinuityStatus;
  };
  seeded_summary_truth: {
    management_surface_scope: SingleCellAssemblyScope;
    runtime_summary_claim: SingleCellSummaryClaim;
    continuity_note: string;
  };
  non_claims: string[];
}

export interface SingleCellConsoleState {
  console_state_id: string;
  console_scope: SingleCellAssemblyScope;
  authority_boundary: SingleCellConsoleAuthorityBoundary;
  phase_boundary: SingleCellConsolePhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  truth_boundary_state: SingleCellConsoleTruthBoundaryState;
  cell_identity_state: SingleCellCellIdentityState;
  delivery_contract_state: SingleCellDeliveryContractState;
  crew_state: SingleCellCrewState;
  objective_state: SingleCellObjectiveState;
  execution_ledger_state: SingleCellExecutionLedgerState;
  memory_and_evidence_state: SingleCellMemoryAndEvidenceState;
  optional_mount_state: SingleCellOptionalMountState;
  continuity_truth_state: SingleCellContinuityTruthState;
  platform_coherence_state: SoloCrewCrossPlanePlatformCoherenceState;
  platform_delivery_readiness_state: SoloCrewPlatformDeliveryReadinessState;
  deferred_surfaces: string[];
}
