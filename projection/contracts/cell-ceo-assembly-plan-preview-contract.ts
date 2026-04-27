import type {
  ManagementDirective,
} from "./management-directive-contract.ts";
import type {
  AssetTypeReference,
  SoloCrewAssetTypeKind,
} from "./asset-type-vocabulary.ts";
import type {
  V2OfficialStarterBlueprintId,
  V2StarterCellId,
  V2StarterCellKind,
} from "../fixtures/starter-cell-fixtures.ts";

export type CellCEOAssemblyPlanPreviewStatus =
  "draft_review_required";
export type CellCEOAssemblyReviewPosture = "review_required";
export type CellCEOAssemblyPlanPreviewScope =
  "cell_ceo_assembly_plan_preview";

export interface CellCEOAssemblyPlanPreviewInput {
  preview_id: string;
  source_directive: ManagementDirective;
  created_at: string;
  prepared_by?: string;
}

export interface CellCEOAssemblyAssetCategoryPreview {
  asset_type_kind: SoloCrewAssetTypeKind;
  label: string;
  reason: string;
  installation_started: false;
  resolver_started: false;
  marketplace_required: false;
}

export interface CellCEOAssemblyBoundaryFlags {
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
  management_directive_remains_review_only: true;
  runtime_private_fields_omitted: true;
  product_projection_only: true;
  mplp_object: false;
  cognitive_os_runtime_law: false;
}

export interface CellCEOAssemblyPlanPreview
  extends CellCEOAssemblyBoundaryFlags {
  preview_id: string;
  preview_scope: CellCEOAssemblyPlanPreviewScope;
  source_directive_id: string;
  source_proposal_id: string;
  source_request_id: string;
  founder_request: string;
  prepared_by?: string;
  target_cell_id: V2StarterCellId;
  target_cell_label: string;
  starter_blueprint_id: V2OfficialStarterBlueprintId;
  cell_kind: V2StarterCellKind;
  status: CellCEOAssemblyPlanPreviewStatus;
  review_posture: CellCEOAssemblyReviewPosture;
  recommended_asset_categories: readonly CellCEOAssemblyAssetCategoryPreview[];
  asset_type_references: readonly AssetTypeReference[];
  crew_topology_notes: readonly string[];
  role_projection_notes: readonly string[];
  workflow_posture_notes: readonly string[];
  memory_and_evidence_notes: readonly string[];
  review_gate_notes: readonly string[];
  next_review_step: string;
  created_at: string;
}
