import type {
  BusinessPackMount,
  MetricsPackMount,
} from "../objects/cell-constitution.ts";
import type {
  SoloCrewBusinessPackMountModel,
  SoloCrewMetricsPackMountModel,
  SoloCrewPackMountExecutionBoundary,
  SoloCrewPackMountModelState,
  SoloCrewPackMountPosture,
  SoloCrewPackMountStructuralAvailability,
} from "../contracts/pack-mount-model-contract.ts";

const PACK_MOUNT_STRUCTURAL_AVAILABILITY: SoloCrewPackMountStructuralAvailability =
  "bounded_structural_availability";
const PACK_MOUNT_EXECUTION_BOUNDARY: SoloCrewPackMountExecutionBoundary =
  "non_executing_mount_only";

function posture_for_mount_status(
  mount_status: BusinessPackMount["mount_status"] | MetricsPackMount["mount_status"]
): SoloCrewPackMountPosture {
  return mount_status === "mounted"
    ? "deferred_mounted_structural_mount"
    : "deferred_unmounted_structural_mount";
}

export function assembleBusinessPackMountModel(
  mount: BusinessPackMount
): SoloCrewBusinessPackMountModel {
  return {
    mount_model_id: `${mount.business_pack_mount_id}-model`,
    mount_family: "business_pack",
    source_object_type: mount.object_type,
    mount_key: mount.mount_key,
    mount_scope: mount.mount_scope,
    mount_status: mount.mount_status,
    implementation_status: mount.implementation_status,
    structural_availability: PACK_MOUNT_STRUCTURAL_AVAILABILITY,
    execution_boundary: PACK_MOUNT_EXECUTION_BOUNDARY,
    posture_summary: posture_for_mount_status(mount.mount_status),
    direct_controls_available: false,
    provider_or_channel_execution_available: false,
    runtime_authority_claimed: false,
    protocol_authority_claimed: false,
    model_notes: [
      "Business-pack mount remains structural product truth only.",
      "Mounted or unmounted posture does not imply pack execution, provider execution, or dispatch authority.",
    ],
  };
}

export function assembleMetricsPackMountModel(
  mount: MetricsPackMount
): SoloCrewMetricsPackMountModel {
  return {
    mount_model_id: `${mount.metrics_pack_mount_id}-model`,
    mount_family: "metrics_pack",
    source_object_type: mount.object_type,
    mount_key: mount.mount_key,
    mount_scope: mount.mount_scope,
    mount_status: mount.mount_status,
    implementation_status: mount.implementation_status,
    structural_availability: PACK_MOUNT_STRUCTURAL_AVAILABILITY,
    execution_boundary: PACK_MOUNT_EXECUTION_BOUNDARY,
    posture_summary: posture_for_mount_status(mount.mount_status),
    direct_controls_available: false,
    provider_or_channel_execution_available: false,
    runtime_authority_claimed: false,
    protocol_authority_claimed: false,
    model_notes: [
      "Metrics-pack mount remains structural product truth only.",
      "Mounted or unmounted posture does not imply KPI runtime ownership, provider execution, or protocol authority.",
    ],
  };
}

export function assemblePackMountModelState(input: {
  business_pack_mounts: readonly BusinessPackMount[];
  metrics_pack_mounts: readonly MetricsPackMount[];
}): SoloCrewPackMountModelState {
  const business_pack_mounts = input.business_pack_mounts.map(
    assembleBusinessPackMountModel
  );
  const metrics_pack_mounts = input.metrics_pack_mounts.map(
    assembleMetricsPackMountModel
  );
  const combined_mounts = [
    ...business_pack_mounts,
    ...metrics_pack_mounts,
  ];

  return {
    business_pack_mounts,
    metrics_pack_mounts,
    optional_mounts_present: combined_mounts.length > 0,
    all_mounts_deferred: combined_mounts.every(
      (mount) => mount.implementation_status === "deferred_mount"
    ),
    any_mounted_mounts: combined_mounts.some(
      (mount) => mount.mount_status === "mounted"
    ),
    structural_availability: PACK_MOUNT_STRUCTURAL_AVAILABILITY,
    execution_boundary: PACK_MOUNT_EXECUTION_BOUNDARY,
  };
}
