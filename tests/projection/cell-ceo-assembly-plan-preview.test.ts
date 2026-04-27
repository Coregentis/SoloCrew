import assert from "node:assert/strict";
import test from "node:test";

import {
  createCellCEOAssemblyPlanPreview,
} from "../../projection/assembly/cell-ceo-assembly-plan-preview.ts";
import {
  createManagementDirective,
} from "../../projection/assembly/management-directive.ts";
import {
  createSecretaryRoutingProposal,
} from "../../projection/assembly/secretary-routing-proposal.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import type {
  ManagementDirective,
} from "../../projection/contracts/management-directive-contract.ts";
import type {
  CellCEOAssemblyPlanPreview,
} from "../../projection/contracts/cell-ceo-assembly-plan-preview-contract.ts";

function create_directive(founder_request: string): ManagementDirective {
  return createManagementDirective({
    directive_id: "directive-assembly-001",
    source_proposal: createSecretaryRoutingProposal({
      request_id: "request-assembly-001",
      founder_request,
      created_at: "2026-04-27T00:00:00.000Z",
      requested_by: "founder",
      available_cell_ids: V2_STARTER_CELL_IDS,
    }),
    accepted_target_kind: "existing_cell",
    accepted_by: "founder",
    created_at: "2026-04-27T00:05:00.000Z",
  });
}

function create_preview(founder_request: string): CellCEOAssemblyPlanPreview {
  return createCellCEOAssemblyPlanPreview({
    preview_id: "assembly-preview-001",
    source_directive: create_directive(founder_request),
    prepared_by: "cell-ceo-preview",
    created_at: "2026-04-27T00:10:00.000Z",
  });
}

function assert_boundary_flags(
  preview: CellCEOAssemblyPlanPreview
): void {
  assert.equal(preview.product_projection_only, true);
  assert.equal(preview.runtime_private_fields_omitted, true);
  assert.equal(preview.non_executing, true);
  assert.equal(preview.no_dispatch, true);
  assert.equal(preview.no_autonomous_execution, true);
  assert.equal(preview.no_approval_execution, true);
  assert.equal(preview.marketplace_not_involved, true);
  assert.equal(preview.asset_installation_started, false);
  assert.equal(preview.asset_resolver_started, false);
  assert.equal(preview.tool_adapter_execution_started, false);
  assert.equal(preview.provider_channel_dispatch_started, false);
  assert.equal(preview.external_business_action_started, false);
  assert.equal(preview.management_directive_remains_review_only, true);
  assert.equal(preview.mplp_object, false);
  assert.equal(preview.cognitive_os_runtime_law, false);
  assert.equal(preview.review_posture, "review_required");

  for (const asset_category of preview.recommended_asset_categories) {
    assert.equal(asset_category.installation_started, false);
    assert.equal(asset_category.resolver_started, false);
    assert.equal(asset_category.marketplace_required, false);
    assert.equal(Object.hasOwn(asset_category, "asset_id"), false);
  }
}

test("[cell ceo assembly preview] creates Development Company review-only preview", () => {
  const preview = create_preview(
    "Plan a repo release for a software feature and bug fix."
  );
  const asset_type_kinds = preview.recommended_asset_categories.map(
    (asset_category) => asset_category.asset_type_kind
  );

  assert.equal(preview.preview_scope, "cell_ceo_assembly_plan_preview");
  assert.equal(preview.target_cell_id, "development_company");
  assert.equal(preview.starter_blueprint_id, "development_company");
  assert.equal(preview.cell_kind, V2_STARTER_CELL_KIND);
  assert.ok(asset_type_kinds.includes("crew_blueprint"));
  assert.ok(asset_type_kinds.includes("role_projection_template"));
  assert.ok(asset_type_kinds.includes("workflow_pattern"));
  assert.ok(asset_type_kinds.includes("review_gate"));
  assert.ok(asset_type_kinds.includes("evidence_template"));
  assert.ok(asset_type_kinds.includes("capability_plugin"));
  assert_boundary_flags(preview);
});

test("[cell ceo assembly preview] creates E-commerce review-only preview", () => {
  const preview = create_preview(
    "Prepare a product listing campaign and customer offer."
  );
  const asset_type_kinds = preview.recommended_asset_categories.map(
    (asset_category) => asset_category.asset_type_kind
  );

  assert.equal(preview.target_cell_id, "ecommerce");
  assert.equal(preview.starter_blueprint_id, "ecommerce");
  assert.ok(asset_type_kinds.includes("business_pack_mount"));
  assert.ok(asset_type_kinds.includes("metrics_pack_mount"));
  assert.ok(asset_type_kinds.includes("role_projection_template"));
  assert.ok(asset_type_kinds.includes("workflow_pattern"));
  assert.ok(asset_type_kinds.includes("review_gate"));
  assert.ok(asset_type_kinds.includes("memory_template"));
  assert_boundary_flags(preview);
});

test("[cell ceo assembly preview] creates Personal Media review-only preview", () => {
  const preview = create_preview(
    "Draft an article title and newsletter publishing plan."
  );
  const asset_type_kinds = preview.recommended_asset_categories.map(
    (asset_category) => asset_category.asset_type_kind
  );

  assert.equal(preview.target_cell_id, "personal_media");
  assert.equal(preview.starter_blueprint_id, "personal_media");
  assert.ok(asset_type_kinds.includes("workflow_pattern"));
  assert.ok(asset_type_kinds.includes("role_projection_template"));
  assert.ok(asset_type_kinds.includes("memory_template"));
  assert.ok(asset_type_kinds.includes("learning_template"));
  assert.ok(asset_type_kinds.includes("review_gate"));
  assert.ok(asset_type_kinds.includes("evidence_template"));
  assert_boundary_flags(preview);
});

test("[cell ceo assembly preview] TracePilot-like request stays generic and non-integrated", () => {
  const preview = create_preview(
    "Review TracePilot repo architecture release drift."
  );
  const serialized = JSON.stringify(preview);

  assert.equal(preview.target_cell_id, "development_company");
  assert.equal(preview.cell_kind, V2_STARTER_CELL_KIND);
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.doesNotMatch(
    serialized,
    /TracePilot integration|TracePilot asset instance|TracePilot plugin/i
  );
  assert_boundary_flags(preview);
});

test("[cell ceo assembly preview] same directive and input produce same preview", () => {
  const source_directive = create_directive(
    "Create repo architecture tests for a release."
  );
  const input = {
    preview_id: "assembly-preview-deterministic-001",
    source_directive,
    prepared_by: "cell-ceo-preview",
    created_at: "2026-04-27T00:10:00.000Z",
  };

  assert.deepEqual(
    createCellCEOAssemblyPlanPreview(input),
    createCellCEOAssemblyPlanPreview(input)
  );
});
