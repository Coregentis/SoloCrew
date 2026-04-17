import type { SingleCellAssemblyScope } from "./single-cell-assembly-contract.ts";
import type {
  SoloCrewPackMountExecutionBoundary,
  SoloCrewPackMountPosture,
  SoloCrewPackMountStructuralAvailability,
} from "./pack-mount-model-contract.ts";
import type {
  SoloCrewPlatformCoherenceExecutionBoundary,
  SoloCrewPlatformPlaneKey,
  SoloCrewPlatformReadinessPosture,
} from "./platform-coherence-contract.ts";
import type {
  SoloCrewPlatformDeliveryReadinessBlocker,
  SoloCrewPlatformDeliveryReadinessCapabilityKey,
  SoloCrewPlatformDeliveryReadinessCapabilityStatus,
  SoloCrewPlatformDeliveryReadinessStatus,
} from "./platform-delivery-readiness-contract.ts";

export type SingleCellViewModelPhaseBoundary = "ui_adjacent_projection";
export type SingleCellViewModelAuthorityBoundary = "product_projection_only";
export type SingleCellViewTruthSource =
  | "persisted_structural_truth"
  | "seeded_summary_truth"
  | "repo_baseline_truth"
  | "deferred_unavailable_surface"
  | "non_claim";

export interface SingleCellHeaderView {
  section_key: "header_view";
  truth_sources: SingleCellViewTruthSource[];
  cell_name: string;
  mission: string;
  current_objective_headline: string;
  delivery_posture: string;
  continuity_note: string;
}

export interface SingleCellDeliveryView {
  section_key: "delivery_view";
  truth_sources: SingleCellViewTruthSource[];
  delivery_target: string;
  done_definition: string;
  return_shape: string;
  review_posture: string;
  deferred_surfaces: string[];
}

export interface SingleCellCrewOverviewView {
  section_key: "crew_overview_view";
  truth_sources: SingleCellViewTruthSource[];
  compiler_role: "crew_compiler";
  topology_mode: "native_multi_agent_crew";
  coordination_pattern: string;
  required_role_keys: string[];
  management_priority: string;
  compile_seed_status: "ready_for_future_compile";
  runtime_worker_state_available: false;
}

export interface SingleCellObjectiveOverviewView {
  section_key: "objective_overview_view";
  truth_sources: SingleCellViewTruthSource[];
  current_objective_id: string;
  current_objective_headline: string;
  queued_objective_ids: string[];
  active_work_count: number;
  blocked_work_count: number;
  near_term_execution_pressure: string;
}

export interface SingleCellWorkstreamOverviewView {
  section_key: "workstream_or_workitem_overview_view";
  truth_sources: SingleCellViewTruthSource[];
  workstream_mode: "seeded_counts_only";
  actual_runtime_work_item_projection_available: false;
  active_work_count: number;
  blocked_work_count: number;
  work_item_timeline_available: false;
  non_claims: string[];
}

export interface SingleCellMemoryAndContinuityView {
  section_key: "memory_and_continuity_view";
  truth_sources: SingleCellViewTruthSource[];
  anchor_ref_id: string;
  continuity_sources: string[];
  continuity_status: "bounded_and_honest";
  continuity_note: string;
  known_absences: string[];
}

export interface SingleCellDeferredSurfaceView {
  section_key: "deferred_surface_view";
  truth_sources: SingleCellViewTruthSource[];
  deferred_surfaces: string[];
  optional_mounts_present: boolean;
  business_pack_mount_keys: string[];
  metrics_pack_mount_keys: string[];
  all_mounts_deferred: boolean;
  any_mounted_mounts: boolean;
  structural_availability: SoloCrewPackMountStructuralAvailability;
  execution_boundary: SoloCrewPackMountExecutionBoundary;
  business_pack_mount_postures: SoloCrewPackMountPosture[];
  metrics_pack_mount_postures: SoloCrewPackMountPosture[];
}

export interface SingleCellTruthBoundaryView {
  section_key: "truth_boundary_view";
  truth_sources: SingleCellViewTruthSource[];
  persisted_structural_truth_sections: readonly string[];
  seeded_summary_truth_sections: readonly string[];
  deferred_unavailable_surfaces: string[];
  non_claims: string[];
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
}

export interface SingleCellPlatformCoherencePlaneView {
  plane_key: SoloCrewPlatformPlaneKey;
  truth_sources: SingleCellViewTruthSource[];
  plane_presence: "present";
  boundary_status: "bounded_product_projection";
  execution_boundary: SoloCrewPlatformCoherenceExecutionBoundary;
  posture_summary: string;
  available_truths: string[];
  deferred_truths: string[];
  non_claims: string[];
}

export interface SingleCellPlatformCoherenceView {
  section_key: "platform_coherence_view";
  truth_sources: SingleCellViewTruthSource[];
  platform_readiness_posture: SoloCrewPlatformReadinessPosture;
  cross_plane_summary: string;
  omission_summary: string;
  present_plane_keys: SoloCrewPlatformPlaneKey[];
  deferred_cross_plane_items: string[];
  management_plane: SingleCellPlatformCoherencePlaneView;
  organization_plane: SingleCellPlatformCoherencePlaneView;
  execution_plane: SingleCellPlatformCoherencePlaneView;
  memory_evidence_plane: SingleCellPlatformCoherencePlaneView;
  non_claims: string[];
}

export interface SingleCellPlatformDeliveryReadinessCapabilityView {
  capability_key: SoloCrewPlatformDeliveryReadinessCapabilityKey;
  capability_status: SoloCrewPlatformDeliveryReadinessCapabilityStatus;
  summary: string;
  supporting_signals: string[];
  non_claims: string[];
}

export interface SingleCellPlatformDeliveryReadinessView {
  section_key: "platform_delivery_readiness_view";
  truth_sources: SingleCellViewTruthSource[];
  platform_posture: SoloCrewPlatformReadinessPosture;
  delivery_readiness_status: SoloCrewPlatformDeliveryReadinessStatus;
  formal_delivery_ready_now: false;
  current_readiness_blocker: SoloCrewPlatformDeliveryReadinessBlocker;
  current_blocker_summary: string;
  summary_text: string;
  omission_summary: string;
  present_capabilities:
    SingleCellPlatformDeliveryReadinessCapabilityView[];
  deferred_capabilities:
    SingleCellPlatformDeliveryReadinessCapabilityView[];
  deferred_items: string[];
  non_claims: string[];
}

export interface SingleCellViewModel {
  view_model_id: string;
  view_scope: SingleCellAssemblyScope;
  authority_boundary: SingleCellViewModelAuthorityBoundary;
  phase_boundary: SingleCellViewModelPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_ui_pages_present: false;
  broad_kpi_cockpit_available: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  header_view: SingleCellHeaderView;
  delivery_view: SingleCellDeliveryView;
  crew_overview_view: SingleCellCrewOverviewView;
  objective_overview_view: SingleCellObjectiveOverviewView;
  workstream_or_workitem_overview_view: SingleCellWorkstreamOverviewView;
  memory_and_continuity_view: SingleCellMemoryAndContinuityView;
  platform_coherence_view: SingleCellPlatformCoherenceView;
  platform_delivery_readiness_view: SingleCellPlatformDeliveryReadinessView;
  deferred_surface_view: SingleCellDeferredSurfaceView;
  truth_boundary_view: SingleCellTruthBoundaryView;
}
