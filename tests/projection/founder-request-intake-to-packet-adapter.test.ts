import assert from "node:assert/strict";
import test from "node:test";

import {
  adaptFounderRequestIntakeToPacketCandidate,
  type FounderRequestIntakeProjectScopedObject,
  type SoloCrewProjectionSummaryEnvelope,
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

test("[projection] founder request maps to packet candidate", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(result.project_id, "project-01");
  assert.equal(result.request_ref, "founder-request-01");
  assert.equal(result.projection_summary_ref, "projection-summary-01");
  assert.equal(result.review_posture, "review_needed");
  assert.equal(result.staging_posture, "packet_candidate");
});

test("[projection] projection-safe state exposure maps without approval semantics", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(result.state_interpretation.transition_accepted_is_approval, false);
  assert.equal(result.state_interpretation.blocked_reason_is_rejection, false);
});

test("[projection] terminal maps without execution-complete semantics", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary({
      state_exposure: {
        ...create_projection_summary().state_exposure!,
        state_summary: {
          ...create_projection_summary().state_exposure!.state_summary,
          terminal: true,
        },
      },
    }),
  });

  assert.equal(result.state_interpretation.terminal_is_execution_complete, false);
  assert.equal(result.staging_posture, "packet_candidate");
});

test("[projection] evidence summary maps without proof/certification semantics", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.match(result.evidence_posture.evidence_summary, /Bounded evidence summary/);
  assert.equal(result.evidence_posture.evidence_available, true);
});

test("[projection] stale and insufficient evidence stay distinct", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary({
      evidence_posture: {
        ...create_projection_summary().evidence_posture!,
        stale: true,
        insufficient: false,
      },
    }),
  });

  assert.equal(result.evidence_posture.stale, true);
  assert.equal(result.evidence_posture.insufficient, false);
  assert.equal(result.staging_posture, "stale_context");
});

test("[projection] insufficient evidence takes precedence over stale if both true", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary({
      evidence_posture: {
        ...create_projection_summary().evidence_posture!,
        stale: true,
        insufficient: true,
      },
    }),
  });

  assert.equal(result.evidence_posture.stale, true);
  assert.equal(result.evidence_posture.insufficient, true);
  assert.equal(result.staging_posture, "evidence_insufficient");
  assert.equal(result.review_posture, "return_for_revision");
});

test("[projection] non-executing recommendation remains non-executing", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(result.recommendation.non_executing, true);
  assert.equal(result.recommendation.requires_later_authorization, true);
  assert.deepEqual(result.recommendation.blocked_actions, [
    "approve",
    "dispatch",
    "execute",
    "provider_channel_send",
    "reject",
  ]);
});

test("[projection] forbidden execution labels are rejected as positive/action labels", () => {
  assert.throws(() =>
    adaptFounderRequestIntakeToPacketCandidate({
      request: create_request(),
      projection_summary: create_projection_summary({
        recommendation: {
          ...create_projection_summary().recommendation!,
          allowed_next_step: "approve",
        },
      }),
    })
  );
});

test("[projection] raw runtime-like keys are rejected", () => {
  assert.throws(() =>
    adaptFounderRequestIntakeToPacketCandidate({
      request: create_request(),
      projection_summary: {
        ...create_projection_summary(),
        raw_vsl: "forbidden",
      } as SoloCrewProjectionSummaryEnvelope,
    })
  );
});

test("[projection] project mismatch between request and projection summary is rejected", () => {
  assert.throws(() =>
    adaptFounderRequestIntakeToPacketCandidate({
      request: create_request({
        project_id: "project-02",
      }),
      projection_summary: create_projection_summary(),
    })
  );
});

test("[projection] nested project mismatch is rejected", () => {
  assert.throws(() =>
    adaptFounderRequestIntakeToPacketCandidate({
      request: create_request(),
      projection_summary: create_projection_summary({
        evidence_posture: {
          ...create_projection_summary().evidence_posture!,
          project_id: "project-02",
        },
      }),
    })
  );
});

test("[projection] packet candidate remains review/staging only", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(result.boundaries.provider_channel_execution, false);
  assert.equal(result.boundaries.approve_reject_dispatch_execute, false);
  assert.equal(result.boundaries.founder_queue, false);
  assert.equal(result.boundaries.raw_runtime_private_dependency, false);
});

test("[projection] chosen product update scenario fixture produces expected packet posture", () => {
  const result = adaptFounderRequestIntakeToPacketCandidate({
    request: create_request(),
    projection_summary: create_projection_summary(),
  });

  assert.equal(result.review_posture, "review_needed");
  assert.equal(result.staging_posture, "packet_candidate");
  assert.match(result.recommendation.summary, /review step/i);
});
