import type {
  SingleCellShellEntryPackage,
} from "./single-cell-shell-entry-contract.ts";
import type {
  SingleCellViewTruthSource,
} from "../../projection/contracts/single-cell-view-model-contract.ts";
import type {
  SoloCrewPlatformPlaneKey,
  SoloCrewPlatformReadinessPosture,
} from "../../projection/contracts/platform-coherence-contract.ts";
import type {
  SoloCrewPlatformDeliveryReadinessBlocker,
  SoloCrewPlatformDeliveryReadinessStatus,
} from "../../projection/contracts/platform-delivery-readiness-contract.ts";
import type {
  SoloCrewRuntimeDependentDownstreamTruthStatus,
  SoloCrewRuntimeDependentEvidenceStatus,
  SoloCrewRuntimeDependentUnavailableTruthStatus,
  SoloCrewRuntimeDependentUpstreamWorkflowTruthStatus,
  SoloCrewRuntimeDependentVisibilityStatus,
} from "../../projection/contracts/runtime-dependent-downstream-truth-contract.ts";

export type SingleCellOperatorConsoleShellPhaseBoundary =
  "operator_console_shell";
export type SingleCellOperatorConsoleShellAuthorityBoundary =
  "app_shell_projection_consumer";

export interface SingleCellOperatorConsoleHeaderSection {
  truth_sources: SingleCellViewTruthSource[];
  cell_name: string;
  current_objective_headline: string;
  delivery_posture: string;
  continuity_note: string;
}

export interface SingleCellOperatorConsoleDeliverySection {
  truth_sources: SingleCellViewTruthSource[];
  delivery_target: string;
  done_definition: string;
  review_posture: string;
  deferred_surfaces: string[];
}

export interface SingleCellOperatorConsoleCrewOverviewSection {
  truth_sources: SingleCellViewTruthSource[];
  compiler_role: "crew_compiler";
  required_role_keys: string[];
  management_priority: string;
  compile_seed_status: "ready_for_future_compile";
  runtime_worker_state_available: false;
}

export interface SingleCellOperatorConsoleObjectiveOverviewSection {
  truth_sources: SingleCellViewTruthSource[];
  current_objective_id: string;
  current_objective_headline: string;
  active_work_count: number;
  blocked_work_count: number;
  near_term_execution_pressure: string;
}

export interface SingleCellOperatorConsoleWorkItemExecutionSection {
  truth_sources: SingleCellViewTruthSource[];
  workstream_mode: "seeded_counts_only";
  active_work_count: number;
  blocked_work_count: number;
  actual_runtime_work_item_projection_available: false;
  work_item_timeline_available: false;
  non_claims: string[];
}

export interface SingleCellOperatorConsoleMemoryContinuitySection {
  truth_sources: SingleCellViewTruthSource[];
  anchor_ref_id: string;
  continuity_sources: string[];
  continuity_status: "bounded_and_honest";
  continuity_note: string;
  known_absences: string[];
}

export interface SingleCellOperatorConsolePlatformCoherenceSection {
  truth_sources: SingleCellViewTruthSource[];
  platform_readiness_posture: SoloCrewPlatformReadinessPosture;
  cross_plane_summary: string;
  omission_summary: string;
  present_plane_keys: SoloCrewPlatformPlaneKey[];
  deferred_cross_plane_items: string[];
  management_plane_summary: string;
  organization_plane_summary: string;
  execution_plane_summary: string;
  memory_evidence_plane_summary: string;
  non_claims: string[];
}

export interface SingleCellOperatorConsolePlatformDeliveryReadinessSection {
  truth_sources: SingleCellViewTruthSource[];
  platform_posture: SoloCrewPlatformReadinessPosture;
  delivery_readiness_status: SoloCrewPlatformDeliveryReadinessStatus;
  formal_delivery_ready_now: false;
  current_readiness_blocker: SoloCrewPlatformDeliveryReadinessBlocker;
  current_blocker_summary: string;
  summary_text: string;
  omission_summary: string;
  present_capability_summaries: string[];
  deferred_capability_summaries: string[];
  deferred_items: string[];
  non_claims: string[];
}

export interface SingleCellOperatorConsoleRuntimeDependentDownstreamTruthSection {
  truth_sources: SingleCellViewTruthSource[];
  truth_status: SoloCrewRuntimeDependentDownstreamTruthStatus;
  confirm_visibility_status: SoloCrewRuntimeDependentVisibilityStatus;
  trace_visibility_status: SoloCrewRuntimeDependentVisibilityStatus;
  evidence_visibility_status: SoloCrewRuntimeDependentEvidenceStatus;
  context_export_status:
    SoloCrewRuntimeDependentUnavailableTruthStatus;
  plan_export_status:
    SoloCrewRuntimeDependentUnavailableTruthStatus;
  upstream_workflow_truth_status:
    SoloCrewRuntimeDependentUpstreamWorkflowTruthStatus;
  summary_text: string;
  confirm_linked_summary: string;
  trace_linked_summary: string;
  evidence_linked_summary: string;
  delivery_interpretation_summary: string;
  supported_upstream_truths: string[];
  bounded_truths: string[];
  unavailable_truths: string[];
  omission_notes: string[];
  non_claims: string[];
}

export interface SingleCellOperatorConsoleDeferredSurfacesSection {
  truth_sources: SingleCellViewTruthSource[];
  deferred_items: string[];
  optional_mounts_present: boolean;
  business_pack_mount_keys: string[];
  metrics_pack_mount_keys: string[];
  all_mounts_deferred: boolean;
}

export interface SingleCellOperatorConsoleTruthBoundarySection {
  truth_sources: SingleCellViewTruthSource[];
  persisted_structural_truth_sections: readonly string[];
  seeded_summary_truth_sections: readonly string[];
  deferred_items: string[];
  non_claims: string[];
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  runtime_complete_product_state_available: false;
}

export interface SingleCellOperatorConsoleShell {
  console_shell_id: string;
  console_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorConsoleShellAuthorityBoundary;
  phase_boundary: SingleCellOperatorConsoleShellPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_ui_pages_present: false;
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  runtime_complete_product_state_available: false;
  entry_package: SingleCellShellEntryPackage;
  header: SingleCellOperatorConsoleHeaderSection;
  delivery: SingleCellOperatorConsoleDeliverySection;
  crew_overview: SingleCellOperatorConsoleCrewOverviewSection;
  objective_overview: SingleCellOperatorConsoleObjectiveOverviewSection;
  work_item_execution_overview:
    SingleCellOperatorConsoleWorkItemExecutionSection;
  memory_continuity_overview:
    SingleCellOperatorConsoleMemoryContinuitySection;
  runtime_dependent_downstream_truth_overview:
    SingleCellOperatorConsoleRuntimeDependentDownstreamTruthSection;
  platform_coherence_overview:
    SingleCellOperatorConsolePlatformCoherenceSection;
  platform_delivery_readiness_overview:
    SingleCellOperatorConsolePlatformDeliveryReadinessSection;
  deferred_surfaces: SingleCellOperatorConsoleDeferredSurfacesSection;
  truth_boundary: SingleCellOperatorConsoleTruthBoundarySection;
  projection_notes: string[];
  deferred_items: string[];
}
