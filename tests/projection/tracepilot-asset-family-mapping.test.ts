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
  canCreateTracePilotAssetFamilyMappingFromPreview,
  createTracePilotAssetFamilyMapping,
} from "../../projection/assembly/tracepilot-asset-family-mapping.ts";
import {
  SOLOCREW_ASSET_TYPE_KINDS,
} from "../../projection/contracts/asset-type-vocabulary.ts";
import type {
  CellCEOAssemblyPlanPreview,
} from "../../projection/contracts/cell-ceo-assembly-plan-preview-contract.ts";
import type {
  TracePilotAssetFamilyMapping,
} from "../../projection/contracts/tracepilot-asset-family-mapping-contract.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_preview(
  founder_request: string
): CellCEOAssemblyPlanPreview {
  const proposal = createSecretaryRoutingProposal({
    request_id: "request-tracepilot-mapping-001",
    founder_request,
    created_at: "2026-04-27T00:00:00.000Z",
    requested_by: "founder",
    available_cell_ids: V2_STARTER_CELL_IDS,
  });

  const directive = createManagementDirective({
    directive_id: "directive-tracepilot-mapping-001",
    source_proposal: proposal,
    accepted_target_kind: "existing_cell",
    accepted_by: "founder",
    created_at: "2026-04-27T00:05:00.000Z",
  });

  return createCellCEOAssemblyPlanPreview({
    preview_id: "assembly-preview-tracepilot-mapping-001",
    source_directive: directive,
    prepared_by: "cell-ceo-preview",
    created_at: "2026-04-27T00:10:00.000Z",
  });
}

function create_mapping(
  founder_request: string
): TracePilotAssetFamilyMapping {
  return createTracePilotAssetFamilyMapping({
    mapping_id: "tracepilot-mapping-001",
    source_preview: create_preview(founder_request),
    prepared_by: "secretary-planning",
    created_at: "2026-04-27T00:15:00.000Z",
  });
}

function assert_boundary_flags(
  mapping: TracePilotAssetFamilyMapping
): void {
  assert.equal(mapping.product_projection_only, true);
  assert.equal(mapping.runtime_private_fields_omitted, true);
  assert.equal(mapping.non_executing, true);
  assert.equal(mapping.no_dispatch, true);
  assert.equal(mapping.no_autonomous_execution, true);
  assert.equal(mapping.no_approval_execution, true);
  assert.equal(mapping.marketplace_not_involved, true);
  assert.equal(mapping.asset_installation_started, false);
  assert.equal(mapping.asset_resolver_started, false);
  assert.equal(mapping.tool_adapter_execution_started, false);
  assert.equal(mapping.provider_channel_dispatch_started, false);
  assert.equal(mapping.external_business_action_started, false);
  assert.equal(mapping.project_import_started, false);
  assert.equal(mapping.codebase_analysis_started, false);
  assert.equal(mapping.drift_detection_started, false);
  assert.equal(mapping.architecture_review_started, false);
  assert.equal(mapping.release_governance_started, false);
  assert.equal(mapping.evidence_pack_generation_started, false);
  assert.equal(mapping.cell_ceo_assembly_preview_remains_review_only, true);
  assert.equal(mapping.mplp_object, false);
  assert.equal(mapping.cognitive_os_runtime_law, false);
  assert.equal(mapping.tracepilot_modeled_as_cell, false);
  assert.equal(mapping.tracepilot_integration_implemented, false);
  assert.equal(mapping.review_posture, "review_required");

  for (const member_reference of mapping.member_references) {
    assert.equal(member_reference.implementation_status, "mapping_only");
    assert.equal(member_reference.integration_implemented, false);
    assert.equal(member_reference.execution_available, false);
    assert.equal(member_reference.project_import_available, false);
    assert.equal(member_reference.drift_detection_available, false);
    assert.equal(
      member_reference.tool_adapter_execution_available,
      false
    );
    assert.equal(
      member_reference.concrete_asset_instance_created,
      false
    );
    assert.ok(
      SOLOCREW_ASSET_TYPE_KINDS.includes(
        member_reference.maps_to_asset_type_kind
      )
    );
    assert.equal(Object.hasOwn(member_reference, "asset_id"), false);
  }
}

test("[tracepilot mapping] creates Development Company mapping-only asset-family references", () => {
  const mapping = create_mapping(
    "Review TracePilot repo project governance and release drift."
  );
  const member_kinds = mapping.member_references.map(
    (member_reference) => member_reference.member_kind
  );

  assert.equal(mapping.mapping_scope, "tracepilot_asset_family_mapping");
  assert.equal(mapping.status, "draft_review_required");
  assert.equal(mapping.target_cell_id, "development_company");
  assert.equal(mapping.starter_blueprint_id, "development_company");
  assert.equal(mapping.cell_kind, V2_STARTER_CELL_KIND);
  assert.equal(
    mapping.asset_family_id,
    "tracepilot_project_governance_asset_family"
  );
  assert.equal(
    mapping.asset_family_label,
    "TracePilot Project Governance Asset Family"
  );
  assert.equal(mapping.applies_to_development_company_only, true);
  assert.ok(member_kinds.includes("project_import_capability"));
  assert.ok(member_kinds.includes("drift_detection_capability"));
  assert.ok(member_kinds.includes("architecture_review_workflow"));
  assert.ok(member_kinds.includes("release_governance_pack"));
  assert.ok(member_kinds.includes("evidence_template_family"));
  assert.ok(
    member_kinds.includes("developerops_role_projection_template")
  );
  assert_boundary_flags(mapping);
});

test("[tracepilot mapping] marks E-commerce and Personal Media previews not applicable", () => {
  const ecommerce_mapping = create_mapping(
    "Prepare a product listing campaign for customer offers."
  );
  const personal_media_mapping = create_mapping(
    "Draft a newsletter article and publishing calendar."
  );

  for (const mapping of [ecommerce_mapping, personal_media_mapping]) {
    assert.equal(mapping.status, "not_applicable_to_selected_cell");
    assert.notEqual(mapping.target_cell_id, "development_company");
    assert.equal(mapping.member_references.length, 0);
    assert.ok(mapping.non_applicability_notes.length > 0);
    assert.equal(mapping.tracepilot_modeled_as_cell, false);
    assert.equal(mapping.tracepilot_integration_implemented, false);
    assert.equal(mapping.project_import_started, false);
    assert.equal(mapping.drift_detection_started, false);
    assert_boundary_flags(mapping);
  }
});

test("[tracepilot mapping] exposes every execution boundary as unavailable", () => {
  const mapping = create_mapping(
    "Review TracePilot repo project governance and release drift."
  );

  assert_boundary_flags(mapping);
  assert.equal(mapping.status, "draft_review_required");
  assert.equal(mapping.next_review_step.includes("Human reviews"), true);
});

test("[tracepilot mapping] remains non-Cell and non-integrated in serialized output", () => {
  const mapping = create_mapping(
    "Review TracePilot repo architecture drift before a release."
  );
  const serialized = JSON.stringify(mapping);

  assert.equal(mapping.target_cell_id, "development_company");
  assert.equal(mapping.cell_kind, V2_STARTER_CELL_KIND);
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.doesNotMatch(
    serialized,
    /TracePilot integration is available|drift detection executed|project import executed|evidence pack generated/i
  );
  assert.notEqual(mapping.target_cell_id, "tracepilot_cell");
  assert.notEqual(mapping.cell_kind, "tracepilot_cell");
});

test("[tracepilot mapping] same preview and input produce same mapping", () => {
  const source_preview = create_preview(
    "Review TracePilot repo project governance and release drift."
  );
  const input = {
    mapping_id: "tracepilot-mapping-deterministic-001",
    source_preview,
    prepared_by: "secretary-planning",
    created_at: "2026-04-27T00:15:00.000Z",
  };

  assert.equal(
    canCreateTracePilotAssetFamilyMappingFromPreview(source_preview),
    true
  );
  assert.deepEqual(
    createTracePilotAssetFamilyMapping(input),
    createTracePilotAssetFamilyMapping(input)
  );
});
