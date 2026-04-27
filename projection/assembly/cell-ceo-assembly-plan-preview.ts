import type {
  ManagementDirective,
} from "../contracts/management-directive-contract.ts";
import {
  SOLOCREW_ASSET_TYPE_REFERENCES,
  type SoloCrewAssetTypeKind,
} from "../contracts/asset-type-vocabulary.ts";
import type {
  CellCEOAssemblyAssetCategoryPreview,
  CellCEOAssemblyPlanPreview,
  CellCEOAssemblyPlanPreviewInput,
} from "../contracts/cell-ceo-assembly-plan-preview-contract.ts";
import type {
  V2OfficialStarterBlueprintId,
} from "../fixtures/starter-cell-fixtures.ts";

const ASSET_CATEGORY_PLAN: Record<
  V2OfficialStarterBlueprintId,
  readonly SoloCrewAssetTypeKind[]
> = {
  development_company: [
    "crew_blueprint",
    "role_projection_template",
    "workflow_pattern",
    "review_gate",
    "evidence_template",
    "capability_plugin",
  ],
  ecommerce: [
    "business_pack_mount",
    "metrics_pack_mount",
    "role_projection_template",
    "workflow_pattern",
    "review_gate",
    "memory_template",
  ],
  personal_media: [
    "workflow_pattern",
    "role_projection_template",
    "memory_template",
    "learning_template",
    "review_gate",
    "evidence_template",
  ],
};

function assert_review_only_directive(
  directive: ManagementDirective
): void {
  if (
    directive.product_projection_only !== true ||
    directive.non_executing !== true ||
    directive.cell_ceo_assembly_started !== false ||
    directive.asset_installation_started !== false ||
    directive.no_dispatch !== true ||
    directive.no_autonomous_execution !== true
  ) {
    throw new Error(
      "Cell CEO Assembly Plan Preview requires a review-only Management Directive."
    );
  }
}

function asset_reference_for(asset_type_kind: SoloCrewAssetTypeKind) {
  const reference = SOLOCREW_ASSET_TYPE_REFERENCES.find(
    (asset_reference) =>
      asset_reference.asset_type_kind === asset_type_kind
  );

  if (!reference) {
    throw new Error(`Unknown SoloCrew asset type: ${asset_type_kind}`);
  }

  return reference;
}

export function createAssetCategoryPreview(
  asset_type_kind: SoloCrewAssetTypeKind,
  reason: string
): CellCEOAssemblyAssetCategoryPreview {
  const reference = asset_reference_for(asset_type_kind);

  return {
    asset_type_kind,
    label: reference.label,
    reason,
    installation_started: false,
    resolver_started: false,
    marketplace_required: false,
  };
}

export function listRecommendedAssetCategoriesForDirective(
  directive: ManagementDirective
): CellCEOAssemblyAssetCategoryPreview[] {
  const asset_type_kinds =
    ASSET_CATEGORY_PLAN[directive.target.starter_blueprint_id];

  return asset_type_kinds.map((asset_type_kind) =>
    createAssetCategoryPreview(
      asset_type_kind,
      `Review ${asset_reference_for(asset_type_kind).label} category for ${directive.target.cell_label}.`
    )
  );
}

function create_default_crew_topology_notes(
  directive: ManagementDirective
): string[] {
  return [
    `${directive.target.cell_label} should review Cell-local crew topology before any work is started.`,
    "This preview does not create workers, roles, queues, or runtime execution.",
  ];
}

export function createCellCEOAssemblyPlanPreview(
  input: CellCEOAssemblyPlanPreviewInput
): CellCEOAssemblyPlanPreview {
  assert_review_only_directive(input.source_directive);

  const directive = input.source_directive;
  const recommended_asset_categories =
    listRecommendedAssetCategoriesForDirective(directive);
  const asset_type_references = recommended_asset_categories.map(
    (asset_category) => asset_reference_for(asset_category.asset_type_kind)
  );

  return {
    preview_id: input.preview_id,
    preview_scope: "cell_ceo_assembly_plan_preview",
    source_directive_id: directive.directive_id,
    source_proposal_id: directive.source_proposal_id,
    source_request_id: directive.source_request_id,
    founder_request: directive.founder_request,
    prepared_by: input.prepared_by,
    target_cell_id: directive.target.cell_id,
    target_cell_label: directive.target.cell_label,
    starter_blueprint_id: directive.target.starter_blueprint_id,
    cell_kind: directive.target.cell_kind,
    status: "draft_review_required",
    review_posture: "review_required",
    recommended_asset_categories,
    asset_type_references,
    crew_topology_notes: create_default_crew_topology_notes(directive),
    role_projection_notes: [
      "Review role projection categories only; no role is instantiated.",
      "Role projection remains below runtime law and protocol law.",
    ],
    workflow_posture_notes: [
      "Workflow posture is a review plan shape only.",
      "No task, tool adapter, provider, or channel is invoked.",
    ],
    memory_and_evidence_notes: [
      "Review memory and evidence needs before future Cell-local planning.",
      "No runtime memory write, learning update, or evidence object creation occurs.",
    ],
    review_gate_notes: [
      "Human review remains required before any later implementation wave.",
      "Approval execution and external business action remain unavailable.",
    ],
    next_review_step:
      "Human reviews the assembly plan preview before any future implementation wave is authorized.",
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
    management_directive_remains_review_only: true,
    runtime_private_fields_omitted: true,
    product_projection_only: true,
    mplp_object: false,
    cognitive_os_runtime_law: false,
    created_at: input.created_at,
  };
}
