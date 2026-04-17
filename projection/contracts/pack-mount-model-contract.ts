export type SoloCrewPackMountScope = "cell" | "portfolio";
export type SoloCrewPackMountStatus = "unmounted" | "mounted";
export type SoloCrewPackMountImplementationStatus = "deferred_mount";
export type SoloCrewPackMountStructuralAvailability =
  "bounded_structural_availability";
export type SoloCrewPackMountExecutionBoundary =
  "non_executing_mount_only";
export type SoloCrewPackMountFamily = "business_pack" | "metrics_pack";
export type SoloCrewPackMountObjectType =
  | "business-pack-mount"
  | "metrics-pack-mount";
export type SoloCrewPackMountPosture =
  | "deferred_unmounted_structural_mount"
  | "deferred_mounted_structural_mount";

export interface SoloCrewPackMountModel<
  TObjectType extends SoloCrewPackMountObjectType = SoloCrewPackMountObjectType,
  TFamily extends SoloCrewPackMountFamily = SoloCrewPackMountFamily,
> {
  mount_model_id: string;
  mount_family: TFamily;
  source_object_type: TObjectType;
  mount_key: string;
  mount_scope: SoloCrewPackMountScope;
  mount_status: SoloCrewPackMountStatus;
  implementation_status: SoloCrewPackMountImplementationStatus;
  structural_availability: SoloCrewPackMountStructuralAvailability;
  execution_boundary: SoloCrewPackMountExecutionBoundary;
  posture_summary: SoloCrewPackMountPosture;
  direct_controls_available: false;
  provider_or_channel_execution_available: false;
  runtime_authority_claimed: false;
  protocol_authority_claimed: false;
  model_notes: string[];
}

export type SoloCrewBusinessPackMountModel = SoloCrewPackMountModel<
  "business-pack-mount",
  "business_pack"
>;

export type SoloCrewMetricsPackMountModel = SoloCrewPackMountModel<
  "metrics-pack-mount",
  "metrics_pack"
>;

export interface SoloCrewPackMountModelState {
  business_pack_mounts: SoloCrewBusinessPackMountModel[];
  metrics_pack_mounts: SoloCrewMetricsPackMountModel[];
  optional_mounts_present: boolean;
  all_mounts_deferred: boolean;
  any_mounted_mounts: boolean;
  structural_availability: SoloCrewPackMountStructuralAvailability;
  execution_boundary: SoloCrewPackMountExecutionBoundary;
}
