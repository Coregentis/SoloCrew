import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  derive_founder_request_exception_packet_state,
} from "../../projection/contracts/founder-request-exception-packet-state-derivation.ts";
import {
  evaluate_founder_request_exception_state,
} from "../../projection/contracts/founder-request-exception-state-evaluation.ts";
import {
  is_founder_request_exception_packet_contract,
  type FounderRequestExceptionPacketContract,
  type FounderRequestExceptionPosture,
  type FounderRequestProjectionSummaryAvailability,
} from "../../projection/contracts/founder-request-exception-packet-contract.ts";

function create_packet(
  options: {
    derived_exception_posture?: FounderRequestExceptionPosture;
    review_return_posture?: FounderRequestExceptionPosture;
    status_markers?: FounderRequestProjectionSummaryAvailability[];
    review_marker_status?: FounderRequestProjectionSummaryAvailability;
    evidence_status?: FounderRequestProjectionSummaryAvailability;
    learning_marker_status?: FounderRequestProjectionSummaryAvailability;
    recommendation_marker_status?: FounderRequestProjectionSummaryAvailability;
    continuity_availability?: FounderRequestProjectionSummaryAvailability;
    semantic_availability?: FounderRequestProjectionSummaryAvailability;
    drift_availability?: FounderRequestProjectionSummaryAvailability;
    activation_availability?: FounderRequestProjectionSummaryAvailability;
    confirm_availability?: FounderRequestProjectionSummaryAvailability;
    learning_availability?: FounderRequestProjectionSummaryAvailability;
  } = {}
): FounderRequestExceptionPacketContract {
  const status_markers = options.status_markers ?? ["available"];
  const derived_exception_posture =
    options.derived_exception_posture ?? "no_exception";
  const review_return_posture =
    options.review_return_posture ?? derived_exception_posture;

  const packet: FounderRequestExceptionPacketContract = {
    contract_scope: "founder_request_exception_packet",
    authority_boundary: "product_projection_only",
    non_executing: true,
    request_identity: {
      request_ref: "founder-request-evaluation-01",
      request_label: "Founder request: evaluate bounded state integration.",
      request_origin: "founder_request",
    },
    projection_summaries: {
      continuity_projection_summary: {
        family: "continuity_projection_summary",
        availability: options.continuity_availability ?? "available",
        summary_label: "Bounded continuity summary remains visible.",
        summary_notes: ["Continuity stays summary-safe and non-executing."],
      },
      semantic_relation_projection_summary: {
        family: "semantic_relation_projection_summary",
        availability: options.semantic_availability ?? "available",
        summary_label: "Bounded semantic relation summary remains visible.",
        summary_notes: ["Semantic relation stays summary-safe and non-executing."],
      },
      drift_impact_projection_summary: {
        family: "drift_impact_projection_summary",
        availability: options.drift_availability ?? "available",
        summary_label: "Bounded drift and impact summary remains visible.",
        summary_notes: ["Impact posture stays summary-safe and non-executing."],
      },
      activation_projection_summary: {
        family: "activation_projection_summary",
        availability: options.activation_availability ?? "available",
        summary_label: "Bounded activation summary remains visible.",
        summary_notes: ["Activation posture stays summary-safe and non-executing."],
      },
      confirm_trace_decision_projection_summary: {
        family: "confirm_trace_decision_projection_summary",
        availability: options.confirm_availability ?? "available",
        summary_label: "Bounded confirm summary remains visible.",
        summary_notes: ["Confirm posture stays summary-safe and non-executing."],
      },
      learning_suggestion_projection_summary: {
        family: "learning_suggestion_projection_summary",
        availability: options.learning_availability ?? "available",
        summary_label: "Bounded learning suggestion summary remains visible.",
        summary_notes: ["Learning posture stays suggestion_only and non-executing."],
        suggestion_posture: "suggestion_only",
      },
    },
    derived_exception_posture,
    review_return_posture: {
      posture: review_return_posture,
      posture_summary: "Bounded review and return posture remains visible.",
      marker_status: options.review_marker_status ?? status_markers[0] ?? "available",
    },
    bounded_action_recommendation: {
      recommendation_kind: "bounded_action_recommendation",
      recommendation_posture: "prepare_for_review",
      recommendation_summary: "Keep the next step in bounded review posture only.",
      marker_status: options.recommendation_marker_status ?? "available",
      non_executing: true,
    },
    evidence_summary: {
      evidence_summary_label: "Bounded evidence summary remains visible.",
      evidence_status: options.evidence_status ?? "available",
    },
    learning_suggestion_summary: {
      suggestion_posture: "suggestion_only",
      suggestion_summary: "Bounded learning suggestion remains suggestion_only.",
      marker_status: options.learning_marker_status ?? "available",
    },
    status_markers,
  };

  assert.equal(is_founder_request_exception_packet_contract(packet), true);

  return packet;
}

test("[projection evaluation] accepted derived transition produces final state", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-accepted-review",
    derivation_result,
  });

  assert.equal(result.evaluation_id, "eval-accepted-review");
  assert.equal(result.initial_state, "state_review_needed");
  assert.equal(result.transition_event, "raise_review");
  assert.equal(result.transition_accepted, true);
  assert.equal(result.final_state, "state_review_needed");
  assert.equal(result.blocked_reason, undefined);
  assert.equal(result.non_executing, true);
  assert.equal(result.terminal, false);
});

test("[projection evaluation] blocked derived transition remains blocked", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      status_markers: ["stale"],
      review_marker_status: "stale",
      evidence_status: "stale",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-blocked-stale",
    derivation_result,
  });

  assert.equal(result.transition_event, "mark_stale_context");
  assert.equal(result.transition_accepted, false);
  assert.equal(result.final_state, "state_observed");
  assert.equal(result.blocked_reason, "blocked_bounded_transition");
  assert.equal(result.terminal, false);
});

test("[projection evaluation] forbidden transition remains forbidden or blocked according to reducer truth", () => {
  const derivation_result = {
    ...derive_founder_request_exception_packet_state({
      packet: create_packet({
        derived_exception_posture: "review_needed",
        review_return_posture: "review_needed",
      }),
    }),
    reducer_target_state: "executed",
  } as unknown as ReturnType<typeof derive_founder_request_exception_packet_state>;

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-forbidden-target",
    derivation_result,
  });

  assert.equal(result.transition_accepted, false);
  assert.equal(result.blocked_reason, "invalid_derivation_result");
  assert.equal(result.final_state, "state_observed");
  assert.equal(result.non_executing, true);
});

test("[projection evaluation] terminal state_closed_without_execution cannot reopen", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-terminal-reopen",
    derivation_result,
    current_state: "state_closed_without_execution",
  });

  assert.equal(result.transition_accepted, false);
  assert.equal(result.final_state, "state_closed_without_execution");
  assert.equal(result.blocked_reason, "terminal_state");
  assert.equal(result.terminal, true);
  assert.equal(result.non_executing, true);
});

test("[projection evaluation] integration does not coerce invalid transition", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "impact_detected",
      review_return_posture: "impact_detected",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-no-coercion",
    derivation_result,
  });

  assert.equal(result.transition_event, "surface_impact");
  assert.equal(result.requested_next_state, "state_impact_detected");
  assert.equal(result.transition_accepted, false);
  assert.equal(result.blocked_reason, "blocked_bounded_transition");
  assert.equal(result.final_state, "state_observed");
});

test("[projection evaluation] integration preserves source_posture and source_markers", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      status_markers: ["omitted_by_contract"],
      review_marker_status: "omitted_by_contract",
      evidence_status: "not_available_upstream",
      derived_exception_posture: "blocked_by_contract",
      review_return_posture: "blocked_by_contract",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-preserve-source",
    derivation_result,
  });

  assert.equal(result.source_posture, "blocked_by_contract");
  assert.deepEqual(result.source_markers, [
    "omitted_by_contract",
    "not_available_upstream",
    "available",
  ]);
  assert.match(result.notes.join(" "), /derivation traceability/u);
});

test("[projection evaluation] integration output is always non_executing true", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "monitor",
      review_return_posture: "monitor",
      status_markers: ["not_applicable"],
      review_marker_status: "not_applicable",
      evidence_status: "not_applicable",
      learning_marker_status: "not_applicable",
      recommendation_marker_status: "not_applicable",
      continuity_availability: "not_applicable",
      semantic_availability: "not_applicable",
      drift_availability: "not_applicable",
      activation_availability: "not_applicable",
      confirm_availability: "not_applicable",
      learning_availability: "not_applicable",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-non-executing",
    derivation_result,
  });

  assert.equal(result.non_executing, true);
});

test("[projection evaluation] integration output is not a queue item or UI DTO", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-shape-boundary",
    derivation_result,
  });

  assert.equal("queue_item_id" in result, false);
  assert.equal("ui_section" in result, false);
  assert.equal("component_kind" in result, false);
});

test("[projection evaluation] explicit current_state is respected when provided", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "return_for_revision",
      review_return_posture: "return_for_revision",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-explicit-current-state",
    derivation_result,
    current_state: "state_review_needed",
  });

  assert.equal(result.transition_accepted, true);
  assert.equal(result.final_state, "state_revision_needed");
});

test("[projection evaluation] safe baseline state is used when current_state is absent", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "monitor",
      review_return_posture: "monitor",
      status_markers: ["not_applicable"],
      review_marker_status: "not_applicable",
      evidence_status: "not_applicable",
      learning_marker_status: "not_applicable",
      recommendation_marker_status: "not_applicable",
      continuity_availability: "not_applicable",
      semantic_availability: "not_applicable",
      drift_availability: "not_applicable",
      activation_availability: "not_applicable",
      confirm_availability: "not_applicable",
      learning_availability: "not_applicable",
    }),
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-safe-baseline",
    derivation_result,
  });

  assert.equal(result.transition_accepted, true);
  assert.equal(result.final_state, "state_monitoring");
});

test("[projection evaluation] no forbidden labels are returned", () => {
  const derivation_result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
    requested_closure_without_execution: true,
  });

  const result = evaluate_founder_request_exception_state({
    evaluation_id: "eval-no-forbidden-labels",
    derivation_result,
  });

  assert.doesNotMatch(
    `${result.transition_event} ${result.final_state} ${result.source_posture}`,
    /approve|reject|dispatch|execute|provider|channel/u
  );
});

test("[projection evaluation] source stays inside contract-only lanes", () => {
  const source = readFileSync(
    new URL(
      "../../projection/contracts/founder-request-exception-state-evaluation.ts",
      import.meta.url
    ),
    "utf8"
  );

  assert.doesNotMatch(source, /projection\/adapters/u);
  assert.doesNotMatch(source, /projection\/assembly/u);
  assert.doesNotMatch(source, /app\/pages/u);
  assert.doesNotMatch(source, /runtime\/core/u);
  assert.doesNotMatch(source, /runtime\/in-memory/u);
  assert.doesNotMatch(source, /Cognitive_OS/u);
});
