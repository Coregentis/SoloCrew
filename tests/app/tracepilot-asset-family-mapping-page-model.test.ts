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
  createTracePilotAssetFamilyMappingPageModel,
} from "../../app/shell/create-tracepilot-asset-family-mapping-page-model.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_page_model(founder_request: string) {
  const proposal = createSecretaryRoutingProposal({
    request_id: "request-tracepilot-page-001",
    founder_request,
    created_at: "2026-04-27T00:00:00.000Z",
    requested_by: "founder",
    available_cell_ids: V2_STARTER_CELL_IDS,
  });
  const directive = createManagementDirective({
    directive_id: "directive-tracepilot-page-001",
    source_proposal: proposal,
    accepted_target_kind: "existing_cell",
    accepted_by: "founder",
    created_at: "2026-04-27T00:05:00.000Z",
  });

  return createTracePilotAssetFamilyMappingPageModel({
    mapping_id: "tracepilot-page-mapping-001",
    source_preview: createCellCEOAssemblyPlanPreview({
      preview_id: "assembly-preview-tracepilot-page-001",
      source_directive: directive,
      prepared_by: "cell-ceo-preview",
      created_at: "2026-04-27T00:10:00.000Z",
    }),
    prepared_by: "secretary-planning",
    created_at: "2026-04-27T00:15:00.000Z",
  });
}

test("[tracepilot mapping page model] wraps mapping as review-only surface", () => {
  const page_model = create_page_model(
    "Review TracePilot repo architecture and release drift."
  );

  assert.equal(page_model.page_title, "TracePilot Asset-Family Mapping");
  assert.equal(page_model.status, "review_required");
  assert.equal(
    page_model.v2_1_implementation_scope,
    "impl_04_tracepilot_asset_family_mapping_only"
  );
  assert.equal(page_model.mapping.target_cell_id, "development_company");
  assert.equal(page_model.mapping.cell_kind, V2_STARTER_CELL_KIND);
  assert.equal(
    page_model.mapping.asset_family_id,
    "tracepilot_project_governance_asset_family"
  );
  assert.ok(page_model.asset_family_summary.length > 0);
  assert.equal(page_model.boundary_summary.product_projection_only, true);
  assert.equal(page_model.boundary_summary.runtime_private_fields_omitted, true);
  assert.equal(page_model.boundary_summary.non_executing, true);
  assert.equal(page_model.boundary_summary.no_dispatch, true);
  assert.equal(page_model.boundary_summary.no_autonomous_execution, true);
  assert.equal(page_model.boundary_summary.no_approval_execution, true);
  assert.equal(page_model.boundary_summary.marketplace_not_involved, true);
  assert.equal(page_model.boundary_summary.asset_installation_started, false);
  assert.equal(page_model.boundary_summary.asset_resolver_started, false);
  assert.equal(
    page_model.boundary_summary.tool_adapter_execution_started,
    false
  );
  assert.equal(page_model.boundary_summary.project_import_started, false);
  assert.equal(page_model.boundary_summary.codebase_analysis_started, false);
  assert.equal(page_model.boundary_summary.drift_detection_started, false);
  assert.equal(
    page_model.boundary_summary.evidence_pack_generation_started,
    false
  );
  assert.equal(page_model.boundary_summary.mplp_object, false);
  assert.equal(page_model.boundary_summary.cognitive_os_runtime_law, false);
});

test("[tracepilot mapping page model] exposes allowed review actions and forbidden controls", () => {
  const page_model = create_page_model(
    "Review TracePilot repo architecture and release drift."
  );

  assert.deepEqual(page_model.next_allowed_user_actions, [
    "review TracePilot asset-family mapping",
    "return to Cell CEO Assembly Plan Preview",
    "reject mapping",
    "authorize future TracePilot integration planning wave",
  ]);
  assert.ok(
    page_model.forbidden_actions.includes("create TracePilot Cell")
  );
  assert.ok(
    page_model.forbidden_actions.includes("run TracePilot integration")
  );
  assert.ok(page_model.forbidden_actions.includes("import project"));
  assert.ok(page_model.forbidden_actions.includes("analyze codebase"));
  assert.ok(page_model.forbidden_actions.includes("run drift detection"));
  assert.ok(page_model.forbidden_actions.includes("generate evidence pack"));
  assert.ok(
    page_model.forbidden_actions.includes("install marketplace asset")
  );
  assert.ok(page_model.forbidden_actions.includes("run tool adapter"));
  assert.ok(page_model.forbidden_actions.includes("dispatch externally"));
  assert.ok(
    page_model.forbidden_actions.includes(
      "approve external business action"
    )
  );
});

test("[tracepilot mapping page model] non-development Cell stays not applicable", () => {
  const page_model = create_page_model(
    "Prepare a product listing campaign for customer offers."
  );

  assert.equal(page_model.mapping.target_cell_id, "ecommerce");
  assert.equal(
    page_model.mapping.status,
    "not_applicable_to_selected_cell"
  );
  assert.equal(page_model.mapping.member_references.length, 0);
  assert.equal(page_model.mapping.tracepilot_modeled_as_cell, false);
  assert.equal(page_model.mapping.tracepilot_integration_implemented, false);
  assert.equal(page_model.mapping.project_import_started, false);
  assert.equal(page_model.mapping.drift_detection_started, false);
});

test("[tracepilot mapping page model] serialized output does not create TracePilot execution", () => {
  const page_model = create_page_model(
    "Review TracePilot repo architecture and release drift."
  );
  const serialized = JSON.stringify(page_model);

  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.doesNotMatch(
    serialized,
    /TracePilot integration is available|project import executed|drift detection executed|evidence pack generated|codebase analysis executed/i
  );
  assert.equal(page_model.mapping.project_import_started, false);
  assert.equal(page_model.mapping.codebase_analysis_started, false);
  assert.equal(page_model.mapping.drift_detection_started, false);
  assert.equal(page_model.mapping.evidence_pack_generation_started, false);
});
