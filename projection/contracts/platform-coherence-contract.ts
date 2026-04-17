import type {
  DeliveryReviewPosture,
} from "../objects/cell-constitution.ts";
import type {
  CellDeliveryPosture,
  ManagementPriority,
} from "../objects/management-interface.ts";
import type {
  SoloCrewPackMountExecutionBoundary,
  SoloCrewPackMountPosture,
  SoloCrewPackMountStructuralAvailability,
} from "./pack-mount-model-contract.ts";
import type {
  NearTermExecutionPressure,
  SingleCellAssemblyScope,
} from "./single-cell-assembly-contract.ts";

export type SoloCrewPlatformPlaneKey =
  | "management_plane"
  | "organization_plane"
  | "execution_plane"
  | "memory_evidence_plane";

export type SoloCrewPlatformPlanePresence = "present";
export type SoloCrewPlatformCoherenceBoundary = "product_projection_only";
export type SoloCrewPlatformCoherenceMode =
  "cross_plane_platform_summary";
export type SoloCrewPlatformCoherenceExecutionBoundary =
  "non_executing";
export type SoloCrewPlatformCoherenceBoundaryStatus =
  "bounded_product_projection";
export type SoloCrewPlatformReadinessPosture =
  "bounded_platform_baseline_only";

export interface SoloCrewPlatformPlaneCoherenceStateBase {
  plane_key: SoloCrewPlatformPlaneKey;
  plane_presence: SoloCrewPlatformPlanePresence;
  boundary_status: SoloCrewPlatformCoherenceBoundaryStatus;
  execution_boundary: SoloCrewPlatformCoherenceExecutionBoundary;
  available_truths: string[];
  deferred_truths: string[];
  posture_summary: string;
  non_claims: string[];
}

export interface SoloCrewManagementPlaneCoherenceState
  extends SoloCrewPlatformPlaneCoherenceStateBase {
  plane_key: "management_plane";
  management_priority: ManagementPriority;
  delivery_review_posture: DeliveryReviewPosture;
  delivery_posture: CellDeliveryPosture;
  management_surface_scope: SingleCellAssemblyScope;
}

export interface SoloCrewOrganizationPlaneCoherenceState
  extends SoloCrewPlatformPlaneCoherenceStateBase {
  plane_key: "organization_plane";
  topology_mode: "native_multi_agent_crew";
  portfolio_mode: "single_cell";
  optional_mounts_present: boolean;
  structural_availability: SoloCrewPackMountStructuralAvailability;
  mount_execution_boundary: SoloCrewPackMountExecutionBoundary;
  business_pack_mount_postures: SoloCrewPackMountPosture[];
  metrics_pack_mount_postures: SoloCrewPackMountPosture[];
}

export interface SoloCrewExecutionPlaneCoherenceState
  extends SoloCrewPlatformPlaneCoherenceStateBase {
  plane_key: "execution_plane";
  ledger_mode: "bounded_state_ledger";
  near_term_execution_pressure: NearTermExecutionPressure;
  active_work_count: number;
  blocked_work_count: number;
  work_item_timeline_available: false;
}

export interface SoloCrewMemoryEvidencePlaneCoherenceState
  extends SoloCrewPlatformPlaneCoherenceStateBase {
  plane_key: "memory_evidence_plane";
  continuity_status: "bounded_and_honest";
  continuity_sources: string[];
  continuity_note: string;
  known_absences: string[];
  full_evidence_graph_available: false;
}

export interface SoloCrewCrossPlanePlatformCoherenceState {
  coherence_state_id: string;
  coherence_scope: SingleCellAssemblyScope;
  authority_boundary: SoloCrewPlatformCoherenceBoundary;
  coherence_mode: SoloCrewPlatformCoherenceMode;
  execution_boundary: SoloCrewPlatformCoherenceExecutionBoundary;
  platform_readiness_posture: SoloCrewPlatformReadinessPosture;
  runtime_authority_claimed: false;
  protocol_authority_claimed: false;
  present_plane_keys: SoloCrewPlatformPlaneKey[];
  bounded_plane_keys: SoloCrewPlatformPlaneKey[];
  management_plane: SoloCrewManagementPlaneCoherenceState;
  organization_plane: SoloCrewOrganizationPlaneCoherenceState;
  execution_plane: SoloCrewExecutionPlaneCoherenceState;
  memory_evidence_plane: SoloCrewMemoryEvidencePlaneCoherenceState;
  deferred_cross_plane_items: string[];
  cross_plane_summary: string;
  omission_summary: string;
  non_claims: string[];
}
