import assert from "node:assert/strict";
import test from "node:test";

import {
  createV11IntakeToPacketPageModel,
} from "../../app/shell/create-v1-1-intake-to-packet-page-model.ts";
import type {
  FounderRequestIntakeProjectScopedObject,
  SoloCrewProjectionSummaryEnvelope,
} from "../../projection/adapters/founder-request-intake-to-packet-adapter.ts";

function create_request(
  overrides: Partial<FounderRequestIntakeProjectScopedObject> = {}
): FounderRequestIntakeProjectScopedObject {
  return {
    project_id: "project-01",
    founder_request_id: "founder-request-01",
    request_label: "Product update planning request",
    request_text:
      "Help me turn the upcoming product update into a review-ready packet before we do anything externally.",
    request_intent_hint: "product_update_planning",
    requested_context_summary: "Keep this bounded to review and staging only.",
    risk_hint: "avoid external action",
    evidence_hint: "use only summary-safe evidence",
    created_at: "2026-04-20T00:00:00.000Z",
    non_executing: true,
    ...overrides,
  };
}

function create_projection_summary(
  overrides: Partial<SoloCrewProjectionSummaryEnvelope> = {}
): SoloCrewProjectionSummaryEnvelope {
  return {
    projection_summary_id: "projection-summary-01",
    project_id: "project-01",
    state_exposure: {
      projection_id: "projection-state-01",
      project_id: "project-01",
      source_runtime_ref: "runtime-ref-01",
      state_summary: {
        initial_state: "state_observed",
        transition_event: "raise_review",
        requested_next_state: "state_review_needed",
        evaluated_next_state: "state_review_needed",
        transition_accepted: true,
        final_state: "state_review_needed",
        terminal: false,
      },
      non_executing: true,
    },
    evidence_posture: {
      evidence_summary_id: "evidence-summary-01",
      project_id: "project-01",
      evidence_available: true,
      evidence_refs: ["evidence-ref-01"],
      evidence_summary:
        "Bounded evidence summary remains available for review and staging.",
      stale: false,
      insufficient: false,
    },
    recommendation: {
      recommendation_id: "recommendation-01",
      project_id: "project-01",
      recommendation_summary:
        "Prepare the next review step without executing any external action.",
      recommended_next_posture: "review_needed",
      allowed_next_step: "bounded_review_step",
      blocked_actions: [
        "approve",
        "reject",
        "dispatch",
        "execute",
        "provider_channel_send",
      ],
      non_executing: true,
      requires_later_authorization: true,
    },
    source_refs: ["source-ref-01"],
    non_executing: true,
    runtime_private_fields_omitted: true,
    ...overrides,
  };
}

test("[app] V1.1 page model converts clean flow result into packet candidate display model", () => {
  const model = createV11IntakeToPacketPageModel({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(model.project_id, "project-01");
  assert.equal(model.review_posture, "review_needed");
  assert.equal(model.staging_posture, "packet_candidate");
  assert.equal(model.review_ready, true);
  assert.equal(model.return_for_revision, false);
  assert.equal(model.blocked_by_contract, false);
  assert.equal(model.packet_posture_label, "packet candidate review-ready");
  assert.match(model.evidence_posture_label, /evidence summary:/);
  assert.match(model.recommendation_label, /non-executing recommendation:/);
  assert.equal(model.non_executing, true);
});

test("[app] V1.1 page model preserves blocked fallback reason", () => {
  const model = createV11IntakeToPacketPageModel({
    request: create_request({
      request_label: "approved",
    }),
    projection_summary: create_projection_summary(),
  });

  assert.equal(model.blocked_by_contract, true);
  assert.equal(model.review_ready, false);
  assert.equal(model.packet_posture_label, "blocked by contract");
  assert.match(model.blocked_reason ?? "", /forbidden execution label/);
});

test("[app] V1.1 page model keeps interpretation guards and boundary summary explicit", () => {
  const model = createV11IntakeToPacketPageModel({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.deepEqual(model.interpretation_guards, {
    transition_accepted_is_approval: false,
    terminal_is_execution_complete: false,
    evidence_summary_is_proof: false,
    recommendation_is_execution: false,
  });
  assert.deepEqual(model.boundary_summary, [
    "No provider/channel execution.",
    "No approve/reject/dispatch/execute behavior.",
    "No founder queue behavior.",
    "No raw runtime-private dependency.",
  ]);
});
