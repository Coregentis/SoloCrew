import type {
  CellCEOAssemblyPlanPreview,
} from "../contracts/cell-ceo-assembly-plan-preview-contract.ts";
import type {
  SoloCrewAssetTypeKind,
} from "../contracts/asset-type-vocabulary.ts";
import type {
  ProjectGovernanceAssetFamilyMapping,
  ProjectGovernanceAssetFamilyMappingInput,
  ProjectGovernanceAssetFamilyMemberKind,
  ProjectGovernanceAssetFamilyMemberReference,
} from "../contracts/project-governance-asset-family-mapping-contract.ts";

const PROJECT_GOVERNANCE_MEMBER_ASSET_TYPE_MAP: Record<
  ProjectGovernanceAssetFamilyMemberKind,
  SoloCrewAssetTypeKind
> = {
  project_import_capability: "capability_plugin",
  drift_detection_capability: "capability_plugin",
  architecture_review_workflow: "workflow_pattern",
  release_governance_pack: "business_pack_mount",
  evidence_template_family: "evidence_template",
  developerops_role_projection_template: "role_projection_template",
};

const PROJECT_GOVERNANCE_MEMBER_LABELS: Record<
  ProjectGovernanceAssetFamilyMemberKind,
  string
> = {
  project_import_capability: "Project Import Capability",
  drift_detection_capability: "Drift Detection Capability",
  architecture_review_workflow: "Architecture Review Workflow",
  release_governance_pack: "Release Governance Pack",
  evidence_template_family: "Evidence Template Family",
  developerops_role_projection_template:
    "DeveloperOps Role Projection Template",
};

const PROJECT_GOVERNANCE_MEMBER_PLANNING_USE: Record<
  ProjectGovernanceAssetFamilyMemberKind,
  string
> = {
  project_import_capability:
    "Plan how a future developer/project governance capability family could describe project intake without importing a repository.",
  drift_detection_capability:
    "Plan how a future capability family could describe drift review intent without running drift detection.",
  architecture_review_workflow:
    "Plan how a future workflow family could describe architecture review posture without executing review.",
  release_governance_pack:
    "Plan how a future governance pack could frame release review without opening release execution.",
  evidence_template_family:
    "Plan how a future evidence family could describe expected evidence shape without generating an evidence pack.",
  developerops_role_projection_template:
    "Plan how a future role template family could describe DeveloperOps review posture without creating roles.",
};

const PROJECT_GOVERNANCE_MEMBER_KINDS:
  readonly ProjectGovernanceAssetFamilyMemberKind[] = [
  "project_import_capability",
  "drift_detection_capability",
  "architecture_review_workflow",
  "release_governance_pack",
  "evidence_template_family",
  "developerops_role_projection_template",
] as const;

function assert_review_only_preview(
  preview: CellCEOAssemblyPlanPreview
): void {
  if (
    preview.product_projection_only !== true ||
    preview.non_executing !== true ||
    preview.asset_installation_started !== false ||
    preview.asset_resolver_started !== false ||
    preview.tool_adapter_execution_started !== false ||
    preview.no_dispatch !== true ||
    preview.no_autonomous_execution !== true ||
    preview.management_directive_remains_review_only !== true
  ) {
    throw new Error(
      "Project Governance Asset-Family Mapping requires a review-only Cell CEO Assembly Plan Preview."
    );
  }
}

export function canCreateProjectGovernanceAssetFamilyMappingFromPreview(
  preview: CellCEOAssemblyPlanPreview
): boolean {
  return preview.starter_blueprint_id === "development_company";
}

export function createProjectGovernanceMemberReference(
  member_kind: ProjectGovernanceAssetFamilyMemberKind
): ProjectGovernanceAssetFamilyMemberReference {
  return {
    member_kind,
    label: PROJECT_GOVERNANCE_MEMBER_LABELS[member_kind],
    maps_to_asset_type_kind:
      PROJECT_GOVERNANCE_MEMBER_ASSET_TYPE_MAP[member_kind],
    planning_use: PROJECT_GOVERNANCE_MEMBER_PLANNING_USE[member_kind],
    implementation_status: "mapping_only",
    integration_implemented: false,
    execution_available: false,
    project_import_available: false,
    drift_detection_available: false,
    tool_adapter_execution_available: false,
    concrete_asset_instance_created: false,
  };
}

export function listProjectGovernanceAssetFamilyMemberReferences():
  ProjectGovernanceAssetFamilyMemberReference[] {
  return PROJECT_GOVERNANCE_MEMBER_KINDS.map((member_kind) =>
    createProjectGovernanceMemberReference(member_kind)
  );
}

function development_company_rationale(
  preview: CellCEOAssemblyPlanPreview
): string[] {
  return [
    `${preview.target_cell_label} is the only current starter blueprint eligible for developer project-governance asset-family mapping.`,
    "The mapping is product projection vocabulary only; it does not run project import, codebase analysis, drift detection, or evidence generation.",
    "TracePilot may remain a future optional Coregentis product integration/provider candidate, not a SoloCrew Cell or canonical SoloCrew internal object.",
  ];
}

function non_applicability_notes(
  preview: CellCEOAssemblyPlanPreview
): string[] {
  if (preview.starter_blueprint_id === "development_company") {
    return [];
  }

  return [
    `project-governance mapping is not applicable to ${preview.target_cell_label} in this implementation wave.`,
    "No TracePilot integration, project import, drift detection, architecture review execution, or evidence generation is started.",
  ];
}

export function createProjectGovernanceAssetFamilyMapping(
  input: ProjectGovernanceAssetFamilyMappingInput
): ProjectGovernanceAssetFamilyMapping {
  assert_review_only_preview(input.source_preview);

  const preview = input.source_preview;
  const applicable =
    canCreateProjectGovernanceAssetFamilyMappingFromPreview(preview);

  return {
    mapping_id: input.mapping_id,
    mapping_scope: "project_governance_asset_family_mapping",
    source_preview_id: preview.preview_id,
    source_directive_id: preview.source_directive_id,
    source_proposal_id: preview.source_proposal_id,
    source_request_id: preview.source_request_id,
    founder_request: preview.founder_request,
    prepared_by: input.prepared_by,
    target_cell_id: preview.target_cell_id,
    target_cell_label: preview.target_cell_label,
    starter_blueprint_id: preview.starter_blueprint_id,
    cell_kind: preview.cell_kind,
    status: applicable
      ? "draft_review_required"
      : "not_applicable_to_selected_cell",
    review_posture: "review_required",
    asset_family_id: "developer_project_governance_asset_family",
    asset_family_label: "Developer Project Governance Asset Family",
    applies_to_development_company_only: true,
    external_product_modeled_as_cell: false,
    external_product_integration_implemented: false,
    member_references: applicable
      ? listProjectGovernanceAssetFamilyMemberReferences()
      : [],
    rationale: applicable ? development_company_rationale(preview) : [],
    non_applicability_notes: non_applicability_notes(preview),
    next_review_step: applicable
      ? "Human reviews this mapping before any future project-governance integration planning wave is authorized."
      : "Return to the selected Cell's assembly preview; project governance mapping is not applicable to this Cell.",
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
    created_at: input.created_at,
  };
}
