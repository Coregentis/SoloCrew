import {
  createTracePilotAssetFamilyMapping,
} from "../../projection/assembly/tracepilot-asset-family-mapping.ts";
import type {
  TracePilotAssetFamilyBoundaryFlags,
  TracePilotAssetFamilyMapping,
  TracePilotAssetFamilyMappingInput,
} from "../../projection/contracts/tracepilot-asset-family-mapping-contract.ts";

export interface TracePilotAssetFamilyMappingPageModel {
  surface_id: string;
  page_title: "TracePilot Asset-Family Mapping";
  status: "review_required";
  mapping: TracePilotAssetFamilyMapping;
  review_banner: string;
  target_cell_summary: string;
  asset_family_summary: readonly string[];
  boundary_summary: TracePilotAssetFamilyBoundaryFlags;
  next_allowed_user_actions: readonly string[];
  forbidden_actions: readonly string[];
  v2_1_implementation_scope:
    "impl_04_tracepilot_asset_family_mapping_only";
}

export function createTracePilotAssetFamilyMappingPageModel(
  input: TracePilotAssetFamilyMappingInput
): TracePilotAssetFamilyMappingPageModel {
  const mapping = createTracePilotAssetFamilyMapping(input);

  return {
    surface_id: `${mapping.mapping_id}-page-model`,
    page_title: "TracePilot Asset-Family Mapping",
    status: "review_required",
    mapping,
    review_banner:
      "Review this TracePilot asset-family mapping before any future integration planning wave.",
    target_cell_summary: `${mapping.target_cell_label} is evaluated for TracePilot-style asset-family mapping only; no Cell is created.`,
    asset_family_summary: mapping.member_references.map(
      (member_reference) =>
        `${member_reference.label}: ${member_reference.planning_use}`
    ),
    boundary_summary: {
      non_executing: true,
      no_dispatch: true,
      no_autonomous_execution: true,
      no_approval_execution: true,
      marketplace_not_involved: true,
      asset_installation_started: false,
      asset_resolver_started: false,
      tool_adapter_execution_started: false,
      provider_channel_dispatch_started: false,
      external_business_action_started: false,
      project_import_started: false,
      codebase_analysis_started: false,
      drift_detection_started: false,
      architecture_review_started: false,
      release_governance_started: false,
      evidence_pack_generation_started: false,
      cell_ceo_assembly_preview_remains_review_only: true,
      runtime_private_fields_omitted: true,
      product_projection_only: true,
      mplp_object: false,
      cognitive_os_runtime_law: false,
    },
    next_allowed_user_actions: [
      "review TracePilot asset-family mapping",
      "return to Cell CEO Assembly Plan Preview",
      "reject mapping",
      "authorize future TracePilot integration planning wave",
    ],
    forbidden_actions: [
      "create TracePilot Cell",
      "run TracePilot integration",
      "import project",
      "analyze codebase",
      "run drift detection",
      "generate evidence pack",
      "install marketplace asset",
      "run tool adapter",
      "dispatch externally",
      "approve external business action",
    ],
    v2_1_implementation_scope:
      "impl_04_tracepilot_asset_family_mapping_only",
  };
}
