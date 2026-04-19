import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  is_founder_request_bounded_action_recommendation,
  is_founder_request_exception_packet_contract,
  is_founder_request_exception_posture,
  is_founder_request_projection_summary_availability,
  is_founder_request_projection_summary_set,
  is_founder_request_state_evaluation_exposure,
} from "../../projection/contracts/founder-request-exception-packet-contract.ts";

function create_valid_summary_set() {
  return {
    continuity_projection_summary: {
      family: "continuity_projection_summary" as const,
      availability: "available" as const,
      summary_label: "Continuation context is available for the current founder request.",
      summary_notes: ["Continuation remains bounded and omission-aware."],
      continuation_label: "resume current request",
      continuation_anchor_label: "anchor summary only",
      freshness_posture: "fresh" as const,
    },
    semantic_relation_projection_summary: {
      family: "semantic_relation_projection_summary" as const,
      availability: "available" as const,
      summary_label: "Affected objects remain bounded to relation-aware packet framing.",
      summary_notes: ["Affected object visibility remains summary-safe."],
      affected_object_labels: ["Runtime Delivery Cell"],
      relation_change_summary: "One affected delivery lane is visible.",
    },
    drift_impact_projection_summary: {
      family: "drift_impact_projection_summary" as const,
      availability: "available" as const,
      summary_label: "Delta intent changed the current review context.",
      summary_notes: ["Impact remains bounded and evidence-aware."],
      drift_kind_label: "delta_intent_update",
      impact_summary_label: "Review context changed for one selected cell.",
      has_conflict_signal: false,
      evidence_refs: [
        {
          ref_scope: "bounded_evidence_ref" as const,
          ref_family: "drift_impact_projection_summary" as const,
          ref_label: "impact summary ref",
        },
      ],
    },
    activation_projection_summary: {
      family: "activation_projection_summary" as const,
      availability: "available" as const,
      summary_label: "A bounded action recommendation is visible for review only.",
      summary_notes: ["Action posture remains non-executing."],
      activation_posture: "confirm_gate" as const,
      recommendation_visibility: "visible" as const,
    },
    confirm_trace_decision_projection_summary: {
      family: "confirm_trace_decision_projection_summary" as const,
      availability: "insufficient_evidence" as const,
      summary_label: "Evidence summary is bounded and omission-aware.",
      summary_notes: ["Thin evidence remains explicit rather than upgraded."],
      confirm_posture: "required" as const,
      evidence_summary_label: "bounded evidence summary only",
      evidence_refs: [
        {
          ref_scope: "bounded_evidence_ref" as const,
          ref_family: "confirm_trace_decision_projection_summary" as const,
          ref_label: "confirm summary ref",
        },
      ],
    },
    learning_suggestion_projection_summary: {
      family: "learning_suggestion_projection_summary" as const,
      availability: "stale" as const,
      summary_label: "Learning posture remains suggestion-only.",
      summary_notes: ["Suggestion remains bounded and non-promoting."],
      suggestion_posture: "suggestion_only" as const,
      suggestion_summary_label: "suggestion_only continuity hint",
    },
  };
}

function create_valid_contract() {
  return {
    contract_scope: "founder_request_exception_packet" as const,
    authority_boundary: "product_projection_only" as const,
    non_executing: true as const,
    request_identity: {
      request_ref: "founder-request-01",
      request_label: "Founder request: tighten review packet continuity wording.",
      request_origin: "founder_request" as const,
    },
    projection_summaries: create_valid_summary_set(),
    derived_exception_posture: "blocked_by_contract" as const,
    review_return_posture: {
      posture: "review_needed" as const,
      posture_summary: "Review posture remains bounded and visible.",
      marker_status: "available" as const,
    },
    bounded_action_recommendation: {
      recommendation_kind: "bounded_action_recommendation" as const,
      recommendation_posture: "prepare_for_review" as const,
      recommendation_summary:
        "Keep the recommendation in bounded review posture only.",
      marker_status: "available" as const,
      non_executing: true as const,
    },
    evidence_summary: {
      evidence_summary_label: "Bounded evidence summary remains available.",
      evidence_status: "available" as const,
      evidence_refs: [
        {
          ref_scope: "bounded_evidence_ref" as const,
          ref_family: "confirm_trace_decision_projection_summary" as const,
          ref_label: "summary-safe evidence ref",
        },
      ],
    },
    learning_suggestion_summary: {
      suggestion_posture: "suggestion_only" as const,
      suggestion_summary: "suggestion_only learning hint remains bounded.",
      marker_status: "not_applicable" as const,
    },
    state_evaluation_exposure: {
      exposure_scope: "packet_state_exposure" as const,
      evaluation_id: "eval-founder-request-01",
      initial_state: "state_review_needed" as const,
      transition_event: "raise_review" as const,
      requested_next_state: "state_review_needed" as const,
      reducer_target_state: "state_review_needed" as const,
      transition_accepted: true,
      final_state: "state_review_needed" as const,
      terminal: false,
      non_executing: true as const,
      source_posture: "review_needed",
      source_markers: ["available", "stale"] as const,
      notes: [
        "Reducer-backed state evaluation remains bounded and summary-safe.",
      ],
    },
    status_markers: [
      "available",
      "omitted_by_contract",
      "insufficient_evidence",
      "stale",
    ] as const,
  };
}

test("[projection contract] founder-request exception packet skeleton accepts all six projection families", () => {
  const summary_set = create_valid_summary_set();
  const contract = create_valid_contract();

  assert.equal(is_founder_request_projection_summary_set(summary_set), true);
  assert.equal(is_founder_request_exception_packet_contract(contract), true);
});

test("[projection contract] packet exposure accepts bounded state evaluation fields", () => {
  const exposure = create_valid_contract().state_evaluation_exposure;

  assert.notEqual(exposure, undefined);
  assert.equal(is_founder_request_state_evaluation_exposure(exposure), true);
});

test("[projection contract] omission and stale vocabulary stays inside the frozen contract set", () => {
  assert.equal(
    is_founder_request_projection_summary_availability("available"),
    true
  );
  assert.equal(
    is_founder_request_projection_summary_availability("omitted_by_contract"),
    true
  );
  assert.equal(
    is_founder_request_projection_summary_availability("not_available_upstream"),
    true
  );
  assert.equal(
    is_founder_request_projection_summary_availability("insufficient_evidence"),
    true
  );
  assert.equal(is_founder_request_projection_summary_availability("stale"), true);
  assert.equal(
    is_founder_request_projection_summary_availability("not_applicable"),
    true
  );
  assert.equal(
    is_founder_request_projection_summary_availability("missing_now"),
    false
  );
});

test("[projection contract] bounded exception posture stays inside the frozen baseline set", () => {
  assert.equal(is_founder_request_exception_posture("no_exception"), true);
  assert.equal(is_founder_request_exception_posture("review_needed"), true);
  assert.equal(is_founder_request_exception_posture("blocked_by_contract"), true);
  assert.equal(is_founder_request_exception_posture("stale_context"), true);
  assert.equal(is_founder_request_exception_posture("open_loop"), false);
});

test("[projection contract] blocks runtime-like raw field keys", () => {
  const invalid_contract = {
    ...create_valid_contract(),
    projection_summaries: {
      ...create_valid_summary_set(),
      // forbidden-label negative fixture: runtime-like raw field
      raw_vsl: {
        summary_label: "should not be present",
      },
    },
  };

  assert.equal(
    is_founder_request_exception_packet_contract(invalid_contract),
    false
  );
});

test("[projection contract] blocks forbidden authority wording in packet fields", () => {
  const invalid_contract = {
    ...create_valid_contract(),
    request_identity: {
      ...create_valid_contract().request_identity,
      // forbidden-label negative fixture
      request_label: "approved",
    },
  };

  assert.equal(
    is_founder_request_exception_packet_contract(invalid_contract),
    false
  );
});

test("[projection contract] bounded action recommendation blocks forbidden authority wording", () => {
  const invalid_recommendation = {
    recommendation_kind: "bounded_action_recommendation" as const,
    recommendation_posture: "prepare_for_review" as const,
    // forbidden-label negative fixture
    recommendation_summary: "dispatch now",
    marker_status: "available" as const,
    non_executing: true as const,
  };

  assert.equal(
    is_founder_request_bounded_action_recommendation(invalid_recommendation),
    false
  );
});

test("[projection contract] blocks external delivery markers in bounded packet text", () => {
  const invalid_contract = {
    ...create_valid_contract(),
    evidence_summary: {
      ...create_valid_contract().evidence_summary,
      // forbidden-label negative fixture
      evidence_summary_label: "provider_sent",
    },
  };

  assert.equal(
    is_founder_request_exception_packet_contract(invalid_contract),
    false
  );
});

test("[projection contract] packet exposure blocks queue command delivery wording", () => {
  const invalid_contract = {
    ...create_valid_contract(),
    state_evaluation_exposure: {
      ...create_valid_contract().state_evaluation_exposure,
      // forbidden-label negative fixture
      notes: ["queue_item command completed_by_execution delivery_status"],
    },
  };

  assert.equal(
    is_founder_request_exception_packet_contract(invalid_contract),
    false
  );
});

test("[projection contract] learning summary stays suggestion-only", () => {
  const invalid_contract = {
    ...create_valid_contract(),
    learning_suggestion_summary: {
      ...create_valid_contract().learning_suggestion_summary,
      suggestion_posture: "promoted_now",
    },
  };

  assert.equal(
    is_founder_request_exception_packet_contract(invalid_contract),
    false
  );
});

test("[projection contract] source stays inside the local contract lane only", () => {
  const source = readFileSync(
    new URL(
      "../../projection/contracts/founder-request-exception-packet-contract.ts",
      import.meta.url
    ),
    "utf8"
  );

  assert.equal(source.includes(["runtime", "/core"].join("")), false);
  assert.equal(source.includes(["runtime", "/in-memory"].join("")), false);
  assert.equal(
    source.includes(["Minimal", "Loop", "Run", "Result"].join("")),
    false
  );
});
