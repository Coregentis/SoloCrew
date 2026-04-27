import {
  createManagementDirective,
} from "../../projection/assembly/management-directive.ts";
import type {
  ManagementDirective,
  ManagementDirectiveBoundaryFlags,
  ManagementDirectiveInput,
} from "../../projection/contracts/management-directive-contract.ts";

export interface ManagementDirectivePreviewPageModel {
  surface_id: string;
  page_title: "Management Directive Preview";
  status: "review_required";
  directive: ManagementDirective;
  review_banner: string;
  selected_cell_summary: string;
  boundary_summary: ManagementDirectiveBoundaryFlags;
  next_allowed_user_actions: readonly string[];
  forbidden_actions: readonly string[];
  v2_1_implementation_scope: "impl_02_management_directive_only";
}

export function createManagementDirectivePreviewPageModel(
  input: ManagementDirectiveInput
): ManagementDirectivePreviewPageModel {
  const directive = createManagementDirective(input);

  return {
    surface_id: `${directive.directive_id}-preview-page-model`,
    page_title: "Management Directive Preview",
    status: "review_required",
    directive,
    review_banner:
      "Review this Management Directive before any selected Cell handoff advances.",
    selected_cell_summary: `${directive.target.cell_label} is selected for review-only handoff preview.`,
    boundary_summary: {
      non_executing: true,
      no_dispatch: true,
      no_autonomous_execution: true,
      no_approval_execution: true,
      marketplace_not_involved: true,
      asset_installation_started: false,
      cell_ceo_assembly_started: false,
      provider_channel_dispatch_started: false,
      external_business_action_started: false,
      runtime_private_fields_omitted: true,
      product_projection_only: true,
      mplp_object: false,
      cognitive_os_runtime_law: false,
    },
    next_allowed_user_actions: [
      "review directive",
      "return to Secretary routing",
      "reject directive",
      "authorize future Cell CEO Assembly preview",
    ],
    forbidden_actions: [
      "execute automatically",
      "dispatch externally",
      "install marketplace asset",
      "start Cell CEO Assembly automatically",
      "create TracePilot Cell",
      "create new Cell kind",
    ],
    v2_1_implementation_scope: "impl_02_management_directive_only",
  };
}
