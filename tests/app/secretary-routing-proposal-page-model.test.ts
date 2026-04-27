import assert from "node:assert/strict";
import test from "node:test";

import {
  createSecretaryRoutingProposalPageModel,
} from "../../app/shell/create-secretary-routing-proposal-page-model.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_page_model(founder_request: string) {
  return createSecretaryRoutingProposalPageModel({
    request_id: "request-002",
    founder_request,
    created_at: "2026-04-27T00:00:00.000Z",
    requested_by: "founder",
    available_cell_ids: V2_STARTER_CELL_IDS,
  });
}

test("[secretary routing page model] wraps routing proposal as review-only surface", () => {
  const page_model = create_page_model(
    "Plan a repo implementation and release test."
  );

  assert.equal(page_model.page_title, "Secretary Routing Proposal");
  assert.equal(page_model.status, "review_required");
  assert.equal(
    page_model.v2_1_implementation_scope,
    "impl_01_secretary_routing_only"
  );
  assert.equal(page_model.boundary_summary.product_projection_only, true);
  assert.equal(page_model.boundary_summary.non_executing, true);
  assert.equal(page_model.boundary_summary.no_dispatch, true);
  assert.equal(page_model.boundary_summary.no_autonomous_execution, true);
  assert.equal(page_model.boundary_summary.marketplace_not_involved, true);
  assert.equal(page_model.boundary_summary.management_directive_created, false);
  assert.equal(page_model.boundary_summary.cell_ceo_assembly_started, false);
  assert.equal(
    page_model.boundary_summary.runtime_private_fields_omitted,
    true
  );
  assert.deepEqual(page_model.next_allowed_user_actions, [
    "review routing proposal",
    "choose existing Cell",
    "request clarification",
    "reject proposal",
  ]);
  assert.ok(page_model.forbidden_actions.includes("execute automatically"));
  assert.ok(page_model.forbidden_actions.includes("dispatch externally"));
  assert.ok(
    page_model.forbidden_actions.includes(
      "create Management Directive automatically"
    )
  );
  assert.ok(
    page_model.forbidden_actions.includes(
      "start Cell CEO Assembly automatically"
    )
  );
});

test("[secretary routing page model] preserves Cell semantic boundary", () => {
  const page_model = create_page_model("Write article content and titles.");

  assert.equal(
    page_model.proposal.recommended_target.target_kind,
    "existing_cell"
  );

  if (page_model.proposal.recommended_target.target_kind !== "existing_cell") {
    throw new Error("expected existing Cell target");
  }

  assert.equal(
    page_model.proposal.recommended_target.cell_id,
    "personal_media"
  );
  assert.equal(
    page_model.proposal.recommended_target.starter_blueprint_id,
    "personal_media"
  );
  assert.equal(
    page_model.proposal.recommended_target.cell_kind,
    V2_STARTER_CELL_KIND
  );
  assert.notEqual(
    page_model.proposal.recommended_target.cell_kind,
    page_model.proposal.recommended_target.starter_blueprint_id
  );
});

test("[secretary routing page model] unknown request stays proposal-only", () => {
  const page_model = create_page_model(
    "Help me evaluate a fuzzy new operating area."
  );
  const serialized = JSON.stringify(page_model);

  assert.equal(
    page_model.proposal.recommended_target.target_kind,
    "new_cell_proposal"
  );

  if (page_model.proposal.recommended_target.target_kind !== "new_cell_proposal") {
    throw new Error("expected new Cell proposal target");
  }

  assert.equal(
    page_model.proposal.recommended_target.requires_owner_confirmation,
    true
  );
  assert.equal(
    page_model.proposal.recommended_target.proposed_cell_created,
    false
  );
  assert.equal(
    page_model.proposal.recommended_target.proposed_cell_kind_created,
    false
  );
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.equal(page_model.proposal.management_directive_created, false);
  assert.equal(page_model.proposal.cell_ceo_assembly_started, false);
  assert.equal(page_model.proposal.marketplace_not_involved, true);
  assert.equal(page_model.proposal.no_dispatch, true);
  assert.equal(page_model.proposal.no_autonomous_execution, true);
});
