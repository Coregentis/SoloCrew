import assert from "node:assert/strict";
import test from "node:test";

import {
  createManagementDirectivePreviewPageModel,
} from "../../app/shell/create-management-directive-preview-page-model.ts";
import {
  createSecretaryRoutingProposal,
} from "../../projection/assembly/secretary-routing-proposal.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_page_model(founder_request: string) {
  return createManagementDirectivePreviewPageModel({
    directive_id: "directive-page-001",
    source_proposal: createSecretaryRoutingProposal({
      request_id: "request-page-001",
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

test("[management directive page model] wraps directive as review-only surface", () => {
  const page_model = create_page_model(
    "Plan a repo implementation and release test."
  );

  assert.equal(page_model.page_title, "Management Directive Preview");
  assert.equal(page_model.status, "review_required");
  assert.equal(
    page_model.v2_1_implementation_scope,
    "impl_02_management_directive_only"
  );
  assert.equal(page_model.directive.target.cell_id, "development_company");
  assert.equal(page_model.directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert.ok(page_model.selected_cell_summary.includes("Development Company"));
  assert.equal(page_model.boundary_summary.product_projection_only, true);
  assert.equal(page_model.boundary_summary.runtime_private_fields_omitted, true);
  assert.equal(page_model.boundary_summary.non_executing, true);
  assert.equal(page_model.boundary_summary.no_dispatch, true);
  assert.equal(page_model.boundary_summary.no_autonomous_execution, true);
  assert.equal(page_model.boundary_summary.no_approval_execution, true);
  assert.equal(page_model.boundary_summary.marketplace_not_involved, true);
  assert.equal(page_model.boundary_summary.asset_installation_started, false);
  assert.equal(page_model.boundary_summary.cell_ceo_assembly_started, false);
  assert.equal(
    page_model.boundary_summary.provider_channel_dispatch_started,
    false
  );
  assert.equal(
    page_model.boundary_summary.external_business_action_started,
    false
  );
  assert.equal(page_model.boundary_summary.mplp_object, false);
  assert.equal(page_model.boundary_summary.cognitive_os_runtime_law, false);
});

test("[management directive page model] exposes allowed review actions and forbidden controls", () => {
  const page_model = create_page_model(
    "Prepare a product listing campaign and customer offer."
  );

  assert.deepEqual(page_model.next_allowed_user_actions, [
    "review directive",
    "return to Secretary routing",
    "reject directive",
    "authorize future Cell CEO Assembly preview",
  ]);
  assert.ok(page_model.forbidden_actions.includes("execute automatically"));
  assert.ok(page_model.forbidden_actions.includes("dispatch externally"));
  assert.ok(
    page_model.forbidden_actions.includes("install marketplace asset")
  );
  assert.ok(
    page_model.forbidden_actions.includes(
      "start Cell CEO Assembly automatically"
    )
  );
  assert.ok(page_model.forbidden_actions.includes("create TracePilot Cell"));
  assert.ok(page_model.forbidden_actions.includes("create new Cell kind"));
  assert.equal(page_model.directive.cell_ceo_assembly_started, false);
  assert.equal(page_model.directive.asset_installation_started, false);
});

test("[management directive page model] TracePilot-like request stays non-Cell and non-executing", () => {
  const page_model = create_page_model(
    "Review TracePilot repo architecture release drift."
  );
  const serialized = JSON.stringify(page_model);

  assert.equal(page_model.directive.target.cell_id, "development_company");
  assert.equal(page_model.directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.equal(page_model.directive.product_projection_only, true);
  assert.equal(page_model.directive.no_dispatch, true);
  assert.equal(page_model.directive.no_autonomous_execution, true);
  assert.equal(page_model.directive.no_approval_execution, true);
  assert.equal(page_model.directive.external_business_action_started, false);
});
