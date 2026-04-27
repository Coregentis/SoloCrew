import type {
  CellCEOAssemblyPlanPreview,
} from "./cell-ceo-assembly-plan-preview-contract.ts";
import type {
  SoloCrewAssetTypeKind,
} from "./asset-type-vocabulary.ts";
import type {
  V2OfficialStarterBlueprintId,
  V2StarterCellId,
  V2StarterCellKind,
} from "../fixtures/starter-cell-fixtures.ts";

export type ProjectGovernanceAssetFamilyMappingStatus =
  | "draft_review_required"
  | "not_applicable_to_selected_cell";
export type ProjectGovernanceAssetFamilyReviewPosture = "review_required";
export type ProjectGovernanceAssetFamilyMappingScope =
  "project_governance_asset_family_mapping";
export type ProjectGovernanceAssetFamilyId =
  "developer_project_governance_asset_family";
export type ProjectGovernanceAssetFamilyLabel =
  "Developer Project Governance Asset Family";

export type ProjectGovernanceAssetFamilyMemberKind =
  | "project_import_capability"
  | "drift_detection_capability"
  | "architecture_review_workflow"
  | "release_governance_pack"
  | "evidence_template_family"
  | "developerops_role_projection_template";

export interface ProjectGovernanceAssetFamilyMappingInput {
  mapping_id: string;
  source_preview: CellCEOAssemblyPlanPreview;
  created_at: string;
  prepared_by?: string;
}

export interface ProjectGovernanceAssetFamilyMemberReference {
  member_kind: ProjectGovernanceAssetFamilyMemberKind;
  label: string;
  maps_to_asset_type_kind: SoloCrewAssetTypeKind;
  planning_use: string;
  implementation_status: "mapping_only";
  integration_implemented: false;
  execution_available: false;
  project_import_available: false;
  drift_detection_available: false;
  tool_adapter_execution_available: false;
  concrete_asset_instance_created: false;
}

export interface ProjectGovernanceAssetFamilyBoundaryFlags {
  non_executing: true;
  no_dispatch: true;
  no_autonomous_execution: true;
  no_approval_execution: true;
  marketplace_not_involved: true;
  asset_installation_started: false;
  asset_resolver_started: false;
  tool_adapter_execution_started: false;
  provider_channel_dispatch_started: false;
  external_business_action_started: false;
  project_import_started: false;
  codebase_analysis_started: false;
  drift_detection_started: false;
  architecture_review_started: false;
  release_governance_started: false;
  evidence_pack_generation_started: false;
  cell_ceo_assembly_preview_remains_review_only: true;
  runtime_private_fields_omitted: true;
  product_projection_only: true;
  mplp_object: false;
  cognitive_os_runtime_law: false;
}

export interface ProjectGovernanceAssetFamilyMapping
  extends ProjectGovernanceAssetFamilyBoundaryFlags {
  mapping_id: string;
  mapping_scope: ProjectGovernanceAssetFamilyMappingScope;
  source_preview_id: string;
  source_directive_id: string;
  source_proposal_id: string;
  source_request_id: string;
  founder_request: string;
  prepared_by?: string;
  target_cell_id: V2StarterCellId;
  target_cell_label: string;
  starter_blueprint_id: V2OfficialStarterBlueprintId;
  cell_kind: V2StarterCellKind;
  status: ProjectGovernanceAssetFamilyMappingStatus;
  review_posture: ProjectGovernanceAssetFamilyReviewPosture;
  asset_family_id: ProjectGovernanceAssetFamilyId;
  asset_family_label: ProjectGovernanceAssetFamilyLabel;
  applies_to_development_company_only: true;
  external_product_modeled_as_cell: false;
  external_product_integration_implemented: false;
  member_references: readonly ProjectGovernanceAssetFamilyMemberReference[];
  rationale: readonly string[];
  non_applicability_notes: readonly string[];
  next_review_step: string;
  created_at: string;
}
