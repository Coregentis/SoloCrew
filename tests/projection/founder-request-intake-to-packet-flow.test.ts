import assert from "node:assert/strict";
import test from "node:test";

import {
  buildFounderRequestIntakeToPacketFlow,
} from "../../projection/assembly/founder-request-intake-to-packet-flow.ts";
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

test("[projection] flow result returns review_ready for clean bounded request", () => {
  const result = buildFounderRequestIntakeToPacketFlow({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(result.non_executing, true);
  assert.equal(result.review_ready, true);
  assert.equal(result.return_for_revision, false);
  assert.equal(result.blocked_by_contract, false);
  assert.equal(result.packet_candidate.review_posture, "review_needed");
});

test("[projection] flow result returns return_for_revision for stale evidence", () => {
  const result = buildFounderRequestIntakeToPacketFlow({
    request: create_request(),
    projection_summary: create_projection_summary({
      evidence_posture: {
        ...create_projection_summary().evidence_posture!,
        stale: true,
      },
    }),
  });

  assert.equal(result.review_ready, false);
  assert.equal(result.return_for_revision, true);
  assert.equal(result.blocked_by_contract, false);
  assert.equal(result.packet_candidate.staging_posture, "stale_context");
});

test("[projection] flow result returns return_for_revision for insufficient evidence", () => {
  const result = buildFounderRequestIntakeToPacketFlow({
    request: create_request(),
    projection_summary: create_projection_summary({
      evidence_posture: {
        ...create_projection_summary().evidence_posture!,
        insufficient: true,
      },
    }),
  });

  assert.equal(result.review_ready, false);
  assert.equal(result.return_for_revision, true);
  assert.equal(result.blocked_by_contract, false);
  assert.equal(result.packet_candidate.staging_posture, "evidence_insufficient");
});

test("[projection] flow returns blocked_by_contract for contract violation", () => {
  const result = buildFounderRequestIntakeToPacketFlow({
    request: create_request(),
    projection_summary: {
      ...create_projection_summary(),
      runtime_private_fields_omitted: false,
    },
  });

  assert.equal(result.blocked_by_contract, true);
  assert.equal(result.review_ready, false);
  assert.equal(result.return_for_revision, false);
  assert.equal(result.packet_candidate.review_posture, "blocked_by_contract");
  assert.equal(result.packet_candidate.staging_posture, "blocked_by_contract");
});
