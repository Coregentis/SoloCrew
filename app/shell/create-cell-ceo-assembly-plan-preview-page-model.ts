import {
  createCellCEOAssemblyPlanPreview,
} from "../../projection/assembly/cell-ceo-assembly-plan-preview.ts";
import type {
  CellCEOAssemblyBoundaryFlags,
  CellCEOAssemblyPlanPreview,
  CellCEOAssemblyPlanPreviewInput,
} from "../../projection/contracts/cell-ceo-assembly-plan-preview-contract.ts";

export interface CellCEOAssemblyPlanPreviewPageModel {
  surface_id: string;
  page_title: "Cell CEO Assembly Plan Preview";
  status: "review_required";
  preview: CellCEOAssemblyPlanPreview;
  review_banner: string;
  target_cell_summary: string;
  boundary_summary: CellCEOAssemblyBoundaryFlags;
  asset_type_summary: readonly string[];
  next_allowed_user_actions: readonly string[];
  forbidden_actions: readonly string[];
  v2_1_implementation_scope:
    "impl_03_cell_ceo_assembly_preview_only";
}

export function createCellCEOAssemblyPlanPreviewPageModel(
  input: CellCEOAssemblyPlanPreviewInput
): CellCEOAssemblyPlanPreviewPageModel {
  const preview = createCellCEOAssemblyPlanPreview(input);

  return {
    surface_id: `${preview.preview_id}-page-model`,
    page_title: "Cell CEO Assembly Plan Preview",
    status: "review_required",
    preview,
    review_banner:
      "Review this Cell CEO Assembly Plan Preview before any future implementation wave.",
    target_cell_summary: `${preview.target_cell_label} will review asset type categories only; no asset is installed.`,
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
      management_directive_remains_review_only: true,
      runtime_private_fields_omitted: true,
      product_projection_only: true,
      mplp_object: false,
      cognitive_os_runtime_law: false,
    },
    asset_type_summary: preview.recommended_asset_categories.map(
      (asset_category) =>
        `${asset_category.label}: ${asset_category.reason}`
    ),
    next_allowed_user_actions: [
      "review assembly plan preview",
      "return to Management Directive",
      "reject preview",
      "authorize future implementation wave",
    ],
    forbidden_actions: [
      "execute automatically",
      "dispatch externally",
      "install marketplace asset",
      "run tool adapter",
      "create TracePilot Cell",
      "create new Cell kind",
      "approve external business action",
    ],
    v2_1_implementation_scope:
      "impl_03_cell_ceo_assembly_preview_only",
  };
}
