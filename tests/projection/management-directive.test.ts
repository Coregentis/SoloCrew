import assert from "node:assert/strict";
import test from "node:test";

import {
  canCreateManagementDirectiveFromProposal,
  createManagementDirective,
} from "../../projection/assembly/management-directive.ts";
import {
  createSecretaryRoutingProposal,
} from "../../projection/assembly/secretary-routing-proposal.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_proposal(founder_request: string) {
  return createSecretaryRoutingProposal({
    request_id: "request-management-001",
    founder_request,
    created_at: "2026-04-27T00:00:00.000Z",
    requested_by: "founder",
    available_cell_ids: V2_STARTER_CELL_IDS,
  });
}

function create_directive(founder_request: string) {
  return createManagementDirective({
    directive_id: "directive-001",
    source_proposal: create_proposal(founder_request),
    accepted_target_kind: "existing_cell",
    accepted_by: "founder",
    created_at: "2026-04-27T00:05:00.000Z",
  });
}

function assert_boundary_flags(
  directive: ReturnType<typeof createManagementDirective>
): void {
  assert.equal(directive.product_projection_only, true);
  assert.equal(directive.runtime_private_fields_omitted, true);
  assert.equal(directive.non_executing, true);
  assert.equal(directive.no_dispatch, true);
  assert.equal(directive.no_autonomous_execution, true);
  assert.equal(directive.no_approval_execution, true);
  assert.equal(directive.marketplace_not_involved, true);
  assert.equal(directive.asset_installation_started, false);
  assert.equal(directive.cell_ceo_assembly_started, false);
  assert.equal(directive.provider_channel_dispatch_started, false);
  assert.equal(directive.external_business_action_started, false);
  assert.equal(directive.mplp_object, false);
  assert.equal(directive.cognitive_os_runtime_law, false);
  assert.equal(directive.review_posture, "review_required");
}

test("[management directive] creates review-only directive for Development Company Cell", () => {
  const directive = create_directive(
    "Plan a repo release for a software feature and bug fix."
  );

  assert.equal(directive.directive_scope, "management_directive_product_projection");
  assert.equal(directive.status, "draft_review_required");
  assert.equal(directive.target.target_kind, "existing_cell");
  assert.equal(directive.target.cell_id, "development_company");
  assert.equal(directive.target.starter_blueprint_id, "development_company");
  assert.equal(directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert.notEqual(
    directive.target.cell_kind,
    directive.target.starter_blueprint_id
  );
  assert.equal(
    directive.handoff_preview.target_cell_id,
    directive.target.cell_id
  );
  assert.equal(directive.handoff_preview.cell_ceo_assembly_not_started, true);
  assert_boundary_flags(directive);
});

test("[management directive] creates directive for E-commerce Cell", () => {
  const directive = create_directive(
    "Prepare a product listing campaign and customer offer."
  );

  assert.equal(directive.target.cell_id, "ecommerce");
  assert.equal(directive.target.starter_blueprint_id, "ecommerce");
  assert.equal(directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert_boundary_flags(directive);
});

test("[management directive] creates directive for Personal Media Cell", () => {
  const directive = create_directive(
    "Draft an article title and newsletter publishing plan."
  );

  assert.equal(directive.target.cell_id, "personal_media");
  assert.equal(directive.target.starter_blueprint_id, "personal_media");
  assert.equal(directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert_boundary_flags(directive);
});

test("[management directive] rejects new Cell proposals before directive creation", () => {
  const proposal = create_proposal(
    "Coordinate a neighborhood gathering with volunteers."
  );

  assert.equal(proposal.recommended_target.target_kind, "new_cell_proposal");
  assert.equal(canCreateManagementDirectiveFromProposal(proposal), false);
  assert.throws(
    () =>
      createManagementDirective({
        directive_id: "directive-blocked-001",
        source_proposal: proposal,
        accepted_target_kind: "existing_cell",
        accepted_by: "founder",
        created_at: "2026-04-27T00:05:00.000Z",
      }),
    /Management Directive requires an accepted existing Cell target/
  );

  if (proposal.recommended_target.target_kind !== "new_cell_proposal") {
    throw new Error("expected new Cell proposal target");
  }

  assert.equal(proposal.recommended_target.proposed_cell_created, false);
  assert.equal(proposal.recommended_target.proposed_cell_kind_created, false);
});

test("[management directive] TracePilot-like request routes only to Development Company", () => {
  const directive = create_directive(
    "Review TracePilot repo architecture release drift."
  );
  const serialized = JSON.stringify(directive);

  assert.equal(directive.target.cell_id, "development_company");
  assert.equal(directive.target.cell_kind, V2_STARTER_CELL_KIND);
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.notEqual(directive.target.cell_id, "tracepilot_cell");
  assert.notEqual(directive.target.cell_kind, "tracepilot_cell");
  assert_boundary_flags(directive);
});

test("[management directive] same proposal and input produce same directive", () => {
  const source_proposal = create_proposal(
    "Create repo architecture tests for a release."
  );
  const input = {
    directive_id: "directive-deterministic-001",
    source_proposal,
    accepted_target_kind: "existing_cell" as const,
    accepted_by: "founder",
    created_at: "2026-04-27T00:05:00.000Z",
  };

  assert.deepEqual(
    createManagementDirective(input),
    createManagementDirective(input)
  );
});
