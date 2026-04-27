import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  createCellCEOAssemblyPlanPreview,
} from "../../projection/assembly/cell-ceo-assembly-plan-preview.ts";
import {
  createManagementDirective,
} from "../../projection/assembly/management-directive.ts";
import {
  createProjectGovernanceAssetFamilyMapping,
} from "../../projection/assembly/project-governance-asset-family-mapping.ts";
import {
  createSecretaryRoutingProposal,
} from "../../projection/assembly/secretary-routing-proposal.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

const V2_1_SOURCE_FILES = [
  "projection/contracts/secretary-routing-proposal-contract.ts",
  "projection/assembly/secretary-routing-proposal.ts",
  "app/shell/create-secretary-routing-proposal-page-model.ts",
  "projection/contracts/management-directive-contract.ts",
  "projection/assembly/management-directive.ts",
  "app/shell/create-management-directive-preview-page-model.ts",
  "projection/contracts/asset-type-vocabulary.ts",
  "projection/contracts/cell-ceo-assembly-plan-preview-contract.ts",
  "projection/assembly/cell-ceo-assembly-plan-preview.ts",
  "app/shell/create-cell-ceo-assembly-plan-preview-page-model.ts",
  "projection/contracts/project-governance-asset-family-mapping-contract.ts",
  "projection/assembly/project-governance-asset-family-mapping.ts",
  "app/shell/create-project-governance-asset-family-mapping-page-model.ts",
] as const;

function read_text(path: string): string {
  return readFileSync(path, "utf8");
}

function create_review_only_chain() {
  const proposal = createSecretaryRoutingProposal({
    request_id: "request-v2-1-hardening-001",
    founder_request:
      "Review repo architecture and project governance before release.",
    created_at: "2026-04-27T00:00:00.000Z",
    requested_by: "founder",
    available_cell_ids: V2_STARTER_CELL_IDS,
  });

  const directive = createManagementDirective({
    directive_id: "directive-v2-1-hardening-001",
    source_proposal: proposal,
    accepted_target_kind: "existing_cell",
    accepted_by: "founder",
    created_at: "2026-04-27T00:05:00.000Z",
  });

  const assembly_preview = createCellCEOAssemblyPlanPreview({
    preview_id: "assembly-preview-v2-1-hardening-001",
    source_directive: directive,
    prepared_by: "hardening-test",
    created_at: "2026-04-27T00:10:00.000Z",
  });

  const project_governance_mapping =
    createProjectGovernanceAssetFamilyMapping({
      mapping_id: "project-governance-mapping-v2-1-hardening-001",
      source_preview: assembly_preview,
      prepared_by: "hardening-test",
      created_at: "2026-04-27T00:15:00.000Z",
    });

  return {
    proposal,
    directive,
    assembly_preview,
    project_governance_mapping,
  };
}

function assert_common_review_flags(object: Record<string, unknown>): void {
  assert.equal(object.product_projection_only, true);
  assert.equal(object.non_executing, true);
  assert.equal(object.no_dispatch, true);
  assert.equal(object.no_autonomous_execution, true);
  assert.equal(object.marketplace_not_involved, true);

  if ("runtime_private_fields_omitted" in object) {
    assert.equal(object.runtime_private_fields_omitted, true);
  }

  if ("no_approval_execution" in object) {
    assert.equal(object.no_approval_execution, true);
  }

  if ("asset_installation_started" in object) {
    assert.equal(object.asset_installation_started, false);
  }

  if ("asset_resolver_started" in object) {
    assert.equal(object.asset_resolver_started, false);
  }

  if ("tool_adapter_execution_started" in object) {
    assert.equal(object.tool_adapter_execution_started, false);
  }

  if ("provider_channel_dispatch_started" in object) {
    assert.equal(object.provider_channel_dispatch_started, false);
  }

  if ("external_business_action_started" in object) {
    assert.equal(object.external_business_action_started, false);
  }

  if ("mplp_object" in object) {
    assert.equal(object.mplp_object, false);
  }

  if ("cognitive_os_runtime_law" in object) {
    assert.equal(object.cognitive_os_runtime_law, false);
  }
}

test("[v2.1 hardening] full review-only chain preserves boundary flags", () => {
  const {
    proposal,
    directive,
    assembly_preview,
    project_governance_mapping,
  } = create_review_only_chain();

  assert_common_review_flags(proposal as unknown as Record<string, unknown>);
  assert_common_review_flags(directive as unknown as Record<string, unknown>);
  assert_common_review_flags(
    assembly_preview as unknown as Record<string, unknown>
  );
  assert_common_review_flags(
    project_governance_mapping as unknown as Record<string, unknown>
  );

  assert.equal(proposal.management_directive_created, false);
  assert.equal(directive.cell_ceo_assembly_started, false);
  assert.equal(
    assembly_preview.management_directive_remains_review_only,
    true
  );
  assert.equal(project_governance_mapping.project_import_started, false);
  assert.equal(project_governance_mapping.codebase_analysis_started, false);
  assert.equal(project_governance_mapping.drift_detection_started, false);
  assert.equal(
    project_governance_mapping.evidence_pack_generation_started,
    false
  );
});

test("[v2.1 hardening] project governance mapping does not regress to TracePilot canonical naming", () => {
  const { project_governance_mapping } = create_review_only_chain();
  const serialized = JSON.stringify(project_governance_mapping);

  assert.equal(
    project_governance_mapping.mapping_scope,
    "project_governance_asset_family_mapping"
  );
  assert.equal(
    project_governance_mapping.asset_family_id,
    "developer_project_governance_asset_family"
  );
  assert.doesNotMatch(serialized, /tracepilot_asset_family_mapping/i);
  assert.doesNotMatch(
    serialized,
    /tracepilot_project_governance_asset_family/i
  );
  assert.doesNotMatch(
    serialized,
    /TracePilot Project Governance Asset Family/
  );
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
});

test("[v2.1 hardening] README and CHANGELOG contain no positive release or capability claims", () => {
  const text = `${read_text("README.md")}\n${read_text("CHANGELOG.md")}`;

  const forbidden_positive_phrases = [
    /V2\.1 delivered/i,
    /V2\.1 released/i,
    /V2\.1 stable/i,
    /V2_1_ALLOWED/i,
    /marketplace implemented/i,
    /asset resolver implemented/i,
    /asset installation implemented/i,
    /provider\/channel dispatch available/i,
    /autonomous execution available/i,
    /TracePilot integration available/i,
    /project import available/i,
    /drift detection executed/i,
    /evidence pack generated/i,
  ];

  for (const forbidden_phrase of forbidden_positive_phrases) {
    assert.doesNotMatch(text, forbidden_phrase);
  }
});

test("[v2.1 hardening] Cell kind remains generic and never becomes a domain or project-governance kind", () => {
  const {
    proposal,
    directive,
    assembly_preview,
    project_governance_mapping,
  } = create_review_only_chain();

  assert.equal(proposal.recommended_target.cell_kind, V2_STARTER_CELL_KIND);
  assert.equal(directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert.equal(assembly_preview.cell_kind, V2_STARTER_CELL_KIND);
  assert.equal(project_governance_mapping.cell_kind, V2_STARTER_CELL_KIND);

  for (const cell_kind of [
    proposal.recommended_target.cell_kind,
    directive.target.cell_kind,
    assembly_preview.cell_kind,
    project_governance_mapping.cell_kind,
  ]) {
    assert.notEqual(cell_kind, "development_company");
    assert.notEqual(cell_kind, "ecommerce");
    assert.notEqual(cell_kind, "personal_media");
    assert.notEqual(cell_kind, "tracepilot_cell");
    assert.notEqual(cell_kind, "project_governance_cell");
  }
});

test("[v2.1 hardening] V2.1 surfaces do not import the runtime bridge or raw runtime-private product API", () => {
  const forbidden_source_patterns = [
    /runtime-imports\/cognitive-runtime/,
    /RuntimeObjectRecord/,
    /authority_class/,
    /primary_layer/,
    /memory_layer/,
    /protocol_binding_ref/,
    /coregentis_private_runtime/,
  ];

  for (const file of V2_1_SOURCE_FILES) {
    const text = read_text(file);

    for (const forbidden_pattern of forbidden_source_patterns) {
      assert.doesNotMatch(
        text,
        forbidden_pattern,
        `${file} must not expose ${forbidden_pattern}`
      );
    }
  }
});
