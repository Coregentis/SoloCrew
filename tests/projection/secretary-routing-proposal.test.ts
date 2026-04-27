import assert from "node:assert/strict";
import test from "node:test";

import {
  createSecretaryRoutingProposal,
} from "../../projection/assembly/secretary-routing-proposal.ts";
import {
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import type {
  ExistingCellRoutingTarget,
  SecretaryRoutingInput,
} from "../../projection/contracts/secretary-routing-proposal-contract.ts";

function input_for(founder_request: string): SecretaryRoutingInput {
  return {
    request_id: "request-001",
    founder_request,
    created_at: "2026-04-27T00:00:00.000Z",
    requested_by: "founder",
    available_cell_ids: V2_STARTER_CELL_IDS,
  };
}

function assert_existing_cell_target(
  target: ReturnType<typeof createSecretaryRoutingProposal>["recommended_target"]
): asserts target is ExistingCellRoutingTarget {
  assert.equal(target.target_kind, "existing_cell");
}

function assert_boundary_flags(
  proposal: ReturnType<typeof createSecretaryRoutingProposal>
): void {
  assert.equal(proposal.product_projection_only, true);
  assert.equal(proposal.runtime_private_fields_omitted, true);
  assert.equal(proposal.non_executing, true);
  assert.equal(proposal.no_dispatch, true);
  assert.equal(proposal.no_autonomous_execution, true);
  assert.equal(proposal.marketplace_not_involved, true);
  assert.equal(proposal.management_directive_created, false);
  assert.equal(proposal.cell_ceo_assembly_started, false);
  assert.equal(proposal.review_posture, "review_required");
}

test("[secretary routing] routes software requests to Development Company existing Cell", () => {
  const proposal = createSecretaryRoutingProposal(
    input_for("Plan a repo release for a software feature and bug fix.")
  );

  assert_existing_cell_target(proposal.recommended_target);
  assert.equal(proposal.recommended_target.cell_id, "development_company");
  assert.equal(
    proposal.recommended_target.starter_blueprint_id,
    "development_company"
  );
  assert.equal(proposal.recommended_target.cell_kind, V2_STARTER_CELL_KIND);
  assert.notEqual(
    proposal.recommended_target.cell_kind,
    proposal.recommended_target.starter_blueprint_id
  );
  assert_boundary_flags(proposal);
});

test("[secretary routing] routes ecommerce requests to E-commerce existing Cell", () => {
  const proposal = createSecretaryRoutingProposal(
    input_for("Prepare a product listing campaign and customer offer.")
  );

  assert_existing_cell_target(proposal.recommended_target);
  assert.equal(proposal.recommended_target.cell_id, "ecommerce");
  assert.equal(proposal.recommended_target.starter_blueprint_id, "ecommerce");
  assert.equal(proposal.recommended_target.cell_kind, V2_STARTER_CELL_KIND);
  assert.notEqual(
    proposal.recommended_target.cell_kind,
    proposal.recommended_target.starter_blueprint_id
  );
  assert_boundary_flags(proposal);
});

test("[secretary routing] routes publishing requests to Personal Media existing Cell", () => {
  const proposal = createSecretaryRoutingProposal(
    input_for("Draft an article title and newsletter publishing plan.")
  );

  assert_existing_cell_target(proposal.recommended_target);
  assert.equal(proposal.recommended_target.cell_id, "personal_media");
  assert.equal(
    proposal.recommended_target.starter_blueprint_id,
    "personal_media"
  );
  assert.equal(proposal.recommended_target.cell_kind, V2_STARTER_CELL_KIND);
  assert.notEqual(
    proposal.recommended_target.cell_kind,
    proposal.recommended_target.starter_blueprint_id
  );
  assert_boundary_flags(proposal);
});

test("[secretary routing] proposes review-only new Cell path for insufficient signal", () => {
  const proposal = createSecretaryRoutingProposal(
    input_for("Coordinate a neighborhood gathering with volunteers.")
  );

  assert.equal(proposal.recommended_target.target_kind, "new_cell_proposal");
  assert.equal(proposal.recommended_target.cell_kind, V2_STARTER_CELL_KIND);
  assert.equal(proposal.recommended_target.requires_owner_confirmation, true);
  assert.equal(proposal.recommended_target.proposed_cell_created, false);
  assert.equal(proposal.recommended_target.proposed_cell_kind_created, false);
  assert.equal(proposal.recommended_target.starter_blueprint_id, null);
  assert.equal(proposal.alternative_targets.length, 0);
  assert.equal(proposal.ambiguity, "insufficient_domain_signal");
  assert_boundary_flags(proposal);
});

test("[secretary routing] records ambiguity and alternatives for cross-domain requests", () => {
  const proposal = createSecretaryRoutingProposal(
    input_for(
      "Plan a repo release while preparing a product listing campaign offer."
    )
  );

  assert_existing_cell_target(proposal.recommended_target);
  assert.equal(proposal.recommended_target.cell_id, "ecommerce");
  assert.equal(proposal.ambiguity, "multiple_domain_signals");
  assert.ok(proposal.ambiguity_notes.length > 0);
  assert.ok(proposal.alternative_targets.length >= 1);
  assert_boundary_flags(proposal);
});

test("[secretary routing] same input produces same deterministic proposal", () => {
  const input = input_for("Create repo architecture tests for a release.");

  assert.deepEqual(
    createSecretaryRoutingProposal(input),
    createSecretaryRoutingProposal(input)
  );
});

test("[secretary routing] TracePilot-like request never creates TracePilot Cell", () => {
  const proposal = createSecretaryRoutingProposal(
    input_for("Review TracePilot repo architecture release drift.")
  );
  const serialized = JSON.stringify(proposal);

  assert_existing_cell_target(proposal.recommended_target);
  assert.equal(proposal.recommended_target.cell_id, "development_company");
  assert.doesNotMatch(serialized, /tracepilot_cell/i);
  assert.doesNotMatch(serialized, /"cell_kind":"development_company"/);
  assert.doesNotMatch(serialized, /"cell_kind":"ecommerce"/);
  assert.doesNotMatch(serialized, /"cell_kind":"personal_media"/);
  assert_boundary_flags(proposal);
});
