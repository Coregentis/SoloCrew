import type {
  SingleCellAssemblyScope,
} from "./single-cell-assembly-contract.ts";
import type {
  SoloCrewPlatformReadinessPosture,
} from "./platform-coherence-contract.ts";

export type SoloCrewPlatformDeliveryReadinessAuthorityBoundary =
  "product_projection_only";
export type SoloCrewPlatformDeliveryReadinessMode =
  "platform_summary_and_delivery_readiness";
export type SoloCrewPlatformDeliveryReadinessExecutionBoundary =
  "non_executing";
export type SoloCrewPlatformDeliveryReadinessStatus =
  "planning_ready_not_delivery_ready";
export type SoloCrewPlatformDeliveryReadinessBlocker =
  | "runtime_dependent_downstream_truth_hardening"
  | "formal_v1_delivery_gate";
export type SoloCrewPlatformDeliveryReadinessCapabilityStatus =
  | "present_in_bounded_form"
  | "deferred_for_later_gate";
export type SoloCrewPlatformDeliveryReadinessCapabilityKey =
  | "single_cell_operating_core"
  | "bounded_pack_mount_model"
  | "cross_plane_platform_coherence"
  | "bounded_explanatory_beta_lane"
  | "memory_evidence_continuity_posture"
  | "runtime_dependent_downstream_truth_hardening"
  | "formal_v1_delivery_gate";

export interface SoloCrewPlatformDeliveryReadinessCapabilitySummary {
  capability_key: SoloCrewPlatformDeliveryReadinessCapabilityKey;
  capability_status: SoloCrewPlatformDeliveryReadinessCapabilityStatus;
  summary: string;
  supporting_signals: string[];
  non_claims: string[];
}

export interface SoloCrewPlatformDeliveryReadinessState {
  readiness_state_id: string;
  readiness_scope: SingleCellAssemblyScope;
  authority_boundary: SoloCrewPlatformDeliveryReadinessAuthorityBoundary;
  summary_mode: SoloCrewPlatformDeliveryReadinessMode;
  execution_boundary: SoloCrewPlatformDeliveryReadinessExecutionBoundary;
  platform_posture: SoloCrewPlatformReadinessPosture;
  delivery_readiness_status: SoloCrewPlatformDeliveryReadinessStatus;
  formal_delivery_ready_now: false;
  current_readiness_blocker: SoloCrewPlatformDeliveryReadinessBlocker;
  current_blocker_summary: string;
  summary_text: string;
  omission_summary: string;
  present_capabilities:
    SoloCrewPlatformDeliveryReadinessCapabilitySummary[];
  deferred_capabilities:
    SoloCrewPlatformDeliveryReadinessCapabilitySummary[];
  deferred_items: string[];
  non_claims: string[];
}
