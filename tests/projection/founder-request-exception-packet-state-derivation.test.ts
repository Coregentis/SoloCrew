import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  derive_founder_request_exception_packet_state,
} from "../../projection/contracts/founder-request-exception-packet-state-derivation.ts";
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
      request_ref: "founder-request-derivation-01",
      request_label: "Founder request: derive bounded packet state.",
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

test("[projection derivation] blocked_by_contract derives state_contract_blocked and mark_contract_blocked", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "blocked_by_contract",
      review_return_posture: "blocked_by_contract",
      status_markers: ["omitted_by_contract"],
      evidence_status: "not_available_upstream",
    }),
  });

  assert.equal(result.initial_state, "state_contract_blocked");
  assert.equal(result.transition_event, "mark_contract_blocked");
  assert.equal(result.source_posture, "blocked_by_contract");
  assert.deepEqual(result.source_markers, [
    "omitted_by_contract",
    "not_available_upstream",
    "available",
  ]);
});

test("[projection derivation] stale marker derives state_stale_context and mark_stale_context", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      status_markers: ["stale"],
      review_marker_status: "stale",
      evidence_status: "stale",
    }),
  });

  assert.equal(result.initial_state, "state_stale_context");
  assert.equal(result.transition_event, "mark_stale_context");
  assert.equal(result.source_posture, "stale_context");
});

test("[projection derivation] insufficient evidence marker derives state_evidence_insufficient and mark_evidence_insufficient", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      status_markers: ["insufficient_evidence"],
      review_marker_status: "insufficient_evidence",
      evidence_status: "insufficient_evidence",
    }),
  });

  assert.equal(result.initial_state, "state_evidence_insufficient");
  assert.equal(result.transition_event, "mark_evidence_insufficient");
  assert.equal(result.source_posture, "evidence_insufficient");
});

test("[projection derivation] activation blocked posture derives state_activation_blocked and escalate_blocked_activation", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "activation_blocked",
      review_return_posture: "activation_blocked",
    }),
  });

  assert.equal(result.initial_state, "state_activation_blocked");
  assert.equal(result.transition_event, "escalate_blocked_activation");
});

test("[projection derivation] escalation required posture derives state_escalation_required", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "escalation_required",
      review_return_posture: "escalation_required",
    }),
  });

  assert.equal(result.initial_state, "state_escalation_required");
  assert.equal(result.transition_event, "escalate_blocked_activation");
});

test("[projection derivation] confirm required posture derives state_confirm_required and surface_confirm_requirement", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "confirm_required",
      review_return_posture: "confirm_required",
    }),
  });

  assert.equal(result.initial_state, "state_confirm_required");
  assert.equal(result.transition_event, "surface_confirm_requirement");
});

test("[projection derivation] return revision posture derives state_revision_needed and mark_revision_needed", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "return_for_revision",
      review_return_posture: "return_for_revision",
    }),
  });

  assert.equal(result.initial_state, "state_revision_needed");
  assert.equal(result.transition_event, "mark_revision_needed");
});

test("[projection derivation] impact posture derives state_impact_detected and surface_impact", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "impact_detected",
      review_return_posture: "impact_detected",
    }),
  });

  assert.equal(result.initial_state, "state_impact_detected");
  assert.equal(result.transition_event, "surface_impact");
});

test("[projection derivation] review posture derives state_review_needed and raise_review", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
  });

  assert.equal(result.initial_state, "state_review_needed");
  assert.equal(result.transition_event, "raise_review");
});

test("[projection derivation] monitor posture derives state_monitoring and start_monitoring", () => {
  const result = derive_founder_request_exception_packet_state({
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

  assert.equal(result.initial_state, "state_monitoring");
  assert.equal(result.transition_event, "start_monitoring");
});

test("[projection derivation] no-exception posture derives state_observed", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "no_exception",
      review_return_posture: "no_exception",
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

  assert.equal(result.initial_state, "state_observed");
  assert.equal(result.transition_event, "observe_signal");
});

test("[projection derivation] explicit closure flag derives close_without_execution and remains non-executing", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
    requested_closure_without_execution: true,
  });

  assert.equal(result.initial_state, "state_review_needed");
  assert.equal(result.transition_event, "close_without_execution");
  assert.equal(result.reducer_target_state, "state_closed_without_execution");
  assert.equal(result.non_executing, true);
});

test("[projection derivation] priority ordering keeps contract blocked above stale, stale above insufficiency, and insufficiency above review", () => {
  const contract_blocked = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
      status_markers: ["omitted_by_contract", "stale", "insufficient_evidence"],
      review_marker_status: "omitted_by_contract",
      evidence_status: "stale",
    }),
  });
  assert.equal(contract_blocked.initial_state, "state_contract_blocked");
  assert.equal(contract_blocked.transition_event, "mark_contract_blocked");

  const stale = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
      status_markers: ["stale", "insufficient_evidence"],
      review_marker_status: "stale",
      evidence_status: "insufficient_evidence",
    }),
  });
  assert.equal(stale.initial_state, "state_stale_context");
  assert.equal(stale.transition_event, "mark_stale_context");

  const insufficient = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
      status_markers: ["insufficient_evidence"],
      review_marker_status: "insufficient_evidence",
    }),
  });
  assert.equal(insufficient.initial_state, "state_evidence_insufficient");
  assert.equal(insufficient.transition_event, "mark_evidence_insufficient");
});

test("[projection derivation] result remains reducer-compatible and non-executing", () => {
  const result = derive_founder_request_exception_packet_state({
    packet: create_packet({
      derived_exception_posture: "review_needed",
      review_return_posture: "review_needed",
    }),
  });

  assert.equal(result.reducer_compatible, true);
  assert.equal(result.non_executing, true);
  assert.equal(result.reducer_target_state, "state_review_needed");
  assert.match(result.notes.join(" "), /Reducer compatibility remains shape-level only/u);
});

test("[projection derivation] no forbidden labels are returned", () => {
  const results = [
    derive_founder_request_exception_packet_state({
      packet: create_packet({
        derived_exception_posture: "blocked_by_contract",
        review_return_posture: "blocked_by_contract",
        status_markers: ["omitted_by_contract"],
      }),
    }),
    derive_founder_request_exception_packet_state({
      packet: create_packet({
        derived_exception_posture: "review_needed",
        review_return_posture: "review_needed",
      }),
      requested_closure_without_execution: true,
    }),
  ];

  for (const result of results) {
    assert.doesNotMatch(
      `${result.initial_state} ${result.transition_event} ${result.reducer_target_state} ${result.source_posture}`,
      /approve|reject|dispatch|execute|provider|channel/u
    );
  }
});

test("[projection derivation] source stays inside contract-only lanes", () => {
  const source = readFileSync(
    new URL(
      "../../projection/contracts/founder-request-exception-packet-state-derivation.ts",
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
