import {
  type FounderRequestExceptionPacketContract,
  type FounderRequestExceptionPosture,
  type FounderRequestProjectionSummaryAvailability,
  is_founder_request_exception_packet_contract,
} from "./founder-request-exception-packet-contract.ts";
import {
  type FounderRequestExceptionState,
  type FounderRequestExceptionTransitionEvent,
  is_founder_request_exception_state,
  is_founder_request_exception_transition_event,
} from "./founder-request-exception-state-machine-contract.ts";
import {
  FOUNDER_REQUEST_EXCEPTION_EVENT_TARGET_MAP,
} from "./founder-request-exception-state-machine-reducer.ts";

const ORDERED_MARKER_VALUES: FounderRequestProjectionSummaryAvailability[] = [
  "omitted_by_contract",
  "not_available_upstream",
  "stale",
  "insufficient_evidence",
  "available",
  "not_applicable",
];

const ORDERED_INITIAL_STATE_RULES: ReadonlyArray<{
  state: FounderRequestExceptionState;
  source_posture: string;
  note: string;
  matches: (
    packet: FounderRequestExceptionPacketContract,
    markers: FounderRequestProjectionSummaryAvailability[]
  ) => boolean;
}> = [
  {
    state: "state_contract_blocked",
    source_posture: "blocked_by_contract",
    note: "Contract-blocked posture dominates packet-level state derivation.",
    matches: (packet, markers) =>
      has_contract_boundary(packet, markers) ||
      has_packet_posture(packet, "blocked_by_contract"),
  },
  {
    state: "state_stale_context",
    source_posture: "stale_context",
    note: "Stale posture dominates insufficiency and lower-confidence posture.",
    matches: (packet, markers) =>
      markers.includes("stale") || has_packet_posture(packet, "stale_context"),
  },
  {
    state: "state_evidence_insufficient",
    source_posture: "evidence_insufficient",
    note: "Insufficient evidence dominates review-only posture.",
    matches: (packet, markers) =>
      markers.includes("insufficient_evidence") ||
      has_packet_posture(packet, "evidence_insufficient"),
  },
  {
    state: "state_activation_blocked",
    source_posture: "activation_blocked",
    note: "Blocked activation remains explicit before escalation handling.",
    matches: (packet) => has_packet_posture(packet, "activation_blocked"),
  },
  {
    state: "state_escalation_required",
    source_posture: "escalation_required",
    note: "Escalation-required posture remains visible and non-executing.",
    matches: (packet) => has_packet_posture(packet, "escalation_required"),
  },
  {
    state: "state_confirm_required",
    source_posture: "confirm_required",
    note: "Confirm-required posture remains explicit before review fallback.",
    matches: (packet) => has_packet_posture(packet, "confirm_required"),
  },
  {
    state: "state_revision_needed",
    source_posture: "return_for_revision",
    note: "Revision posture remains truthful before impact or review posture.",
    matches: (packet) => has_packet_posture(packet, "return_for_revision"),
  },
  {
    state: "state_impact_detected",
    source_posture: "impact_detected",
    note: "Impact-detected posture remains visible before review-only posture.",
    matches: (packet) => has_packet_posture(packet, "impact_detected"),
  },
  {
    state: "state_review_needed",
    source_posture: "review_needed",
    note: "Review-needed posture remains the bounded review fallback.",
    matches: (packet) => has_packet_posture(packet, "review_needed"),
  },
  {
    state: "state_monitoring",
    source_posture: "monitor",
    note: "Monitor posture remains visible when no stronger packet signal exists.",
    matches: (packet) => has_packet_posture(packet, "monitor"),
  },
];

export interface FounderRequestPacketStateDerivationInput {
  packet: FounderRequestExceptionPacketContract;
  requested_closure_without_execution?: boolean;
}

export interface FounderRequestPacketStateDerivationResult {
  initial_state: FounderRequestExceptionState;
  transition_event: FounderRequestExceptionTransitionEvent;
  reducer_target_state: FounderRequestExceptionState;
  reducer_compatible: boolean;
  non_executing: true;
  source_posture: string;
  source_markers: FounderRequestProjectionSummaryAvailability[];
  notes: string[];
}

function collect_packet_markers(
  packet: FounderRequestExceptionPacketContract
): FounderRequestProjectionSummaryAvailability[] {
  const marker_set = new Set<FounderRequestProjectionSummaryAvailability>([
    ...packet.status_markers,
    packet.review_return_posture.marker_status,
    packet.evidence_summary.evidence_status,
  ].filter(Boolean) as FounderRequestProjectionSummaryAvailability[]);

  if (packet.learning_suggestion_summary !== undefined) {
    marker_set.add(packet.learning_suggestion_summary.marker_status);
  }

  if (packet.bounded_action_recommendation !== undefined) {
    marker_set.add(packet.bounded_action_recommendation.marker_status);
  }

  marker_set.add(packet.projection_summaries.continuity_projection_summary.availability);
  marker_set.add(
    packet.projection_summaries.semantic_relation_projection_summary.availability
  );
  marker_set.add(
    packet.projection_summaries.drift_impact_projection_summary.availability
  );
  marker_set.add(
    packet.projection_summaries.activation_projection_summary.availability
  );
  marker_set.add(
    packet.projection_summaries.confirm_trace_decision_projection_summary.availability
  );
  marker_set.add(
    packet.projection_summaries.learning_suggestion_projection_summary.availability
  );

  return ORDERED_MARKER_VALUES.filter((marker) => marker_set.has(marker));
}

function has_packet_posture(
  packet: FounderRequestExceptionPacketContract,
  posture: FounderRequestExceptionPosture
): boolean {
  return (
    packet.derived_exception_posture === posture ||
    packet.review_return_posture.posture === posture
  );
}

function has_contract_boundary(
  packet: FounderRequestExceptionPacketContract,
  markers: FounderRequestProjectionSummaryAvailability[]
): boolean {
  return (
    markers.includes("omitted_by_contract") ||
    markers.includes("not_available_upstream") ||
    packet.review_return_posture.marker_status === "omitted_by_contract" ||
    packet.review_return_posture.marker_status === "not_available_upstream" ||
    packet.evidence_summary.evidence_status === "omitted_by_contract" ||
    packet.evidence_summary.evidence_status === "not_available_upstream"
  );
}

function derive_initial_state(
  packet: FounderRequestExceptionPacketContract,
  markers: FounderRequestProjectionSummaryAvailability[]
): Pick<
  FounderRequestPacketStateDerivationResult,
  "initial_state" | "source_posture" | "notes"
> {
  for (const rule of ORDERED_INITIAL_STATE_RULES) {
    if (rule.matches(packet, markers)) {
      return {
        initial_state: rule.state,
        source_posture: rule.source_posture,
        notes: [rule.note],
      };
    }
  }

  return {
    initial_state: "state_observed",
    source_posture: "no_exception",
    notes: [
      "No stronger bounded posture was present, so packet-level derivation stays at observed intake.",
    ],
  };
}

function derive_transition_event(
  packet: FounderRequestExceptionPacketContract,
  markers: FounderRequestProjectionSummaryAvailability[],
  requested_closure_without_execution: boolean
): Pick<
  FounderRequestPacketStateDerivationResult,
  "transition_event" | "notes"
> {
  if (requested_closure_without_execution) {
    return {
      transition_event: "close_without_execution",
      notes: [
        "Explicit closure without execution overrides other packet-level transition intent.",
      ],
    };
  }

  if (has_contract_boundary(packet, markers)) {
    return {
      transition_event: "mark_contract_blocked",
      notes: [
        "Contract boundary markers dominate packet-level transition intent.",
      ],
    };
  }

  if (markers.includes("stale") || has_packet_posture(packet, "stale_context")) {
    return {
      transition_event: "mark_stale_context",
      notes: [
        "Stale packet context remains explicit before insufficiency or review posture.",
      ],
    };
  }

  if (
    markers.includes("insufficient_evidence") ||
    has_packet_posture(packet, "evidence_insufficient")
  ) {
    return {
      transition_event: "mark_evidence_insufficient",
      notes: [
        "Insufficient evidence remains explicit before lower-confidence review posture.",
      ],
    };
  }

  if (
    has_packet_posture(packet, "activation_blocked") ||
    has_packet_posture(packet, "escalation_required")
  ) {
    return {
      transition_event: "escalate_blocked_activation",
      notes: [
        "Blocked activation and escalation posture share the bounded escalation transition intent.",
      ],
    };
  }

  if (has_packet_posture(packet, "confirm_required")) {
    return {
      transition_event: "surface_confirm_requirement",
      notes: [
        "Confirm-required posture remains visible as bounded confirmation intent.",
      ],
    };
  }

  if (has_packet_posture(packet, "return_for_revision")) {
    return {
      transition_event: "mark_revision_needed",
      notes: [
        "Revision posture remains explicit as return-for-revision transition intent.",
      ],
    };
  }

  if (has_packet_posture(packet, "impact_detected")) {
    return {
      transition_event: "surface_impact",
      notes: [
        "Impact posture remains visible as bounded impact transition intent.",
      ],
    };
  }

  if (has_packet_posture(packet, "review_needed")) {
    return {
      transition_event: "raise_review",
      notes: [
        "Review-needed posture remains the bounded review transition intent.",
      ],
    };
  }

  if (has_packet_posture(packet, "monitor")) {
    return {
      transition_event: "start_monitoring",
      notes: [
        "Monitor posture remains the bounded low-severity transition intent.",
      ],
    };
  }

  return {
    transition_event: "observe_signal",
    notes: [
      "No stronger bounded transition intent was present, so packet-level derivation stays at observation intake.",
    ],
  };
}

export function derive_founder_request_exception_packet_state(
  input: FounderRequestPacketStateDerivationInput
): FounderRequestPacketStateDerivationResult {
  if (!is_founder_request_exception_packet_contract(input.packet)) {
    throw new Error(
      "Founder-request packet falls outside the bounded packet contract."
    );
  }

  const source_markers = collect_packet_markers(input.packet);
  const initial_state_result = derive_initial_state(input.packet, source_markers);
  const transition_event_result = derive_transition_event(
    input.packet,
    source_markers,
    input.requested_closure_without_execution === true
  );
  const reducer_target_state =
    FOUNDER_REQUEST_EXCEPTION_EVENT_TARGET_MAP[
      transition_event_result.transition_event
    ];

  return {
    initial_state: initial_state_result.initial_state,
    transition_event: transition_event_result.transition_event,
    reducer_target_state,
    reducer_compatible:
      is_founder_request_exception_state(initial_state_result.initial_state) &&
      is_founder_request_exception_transition_event(
        transition_event_result.transition_event
      ) &&
      is_founder_request_exception_state(reducer_target_state),
    non_executing: true,
    source_posture: initial_state_result.source_posture,
    source_markers,
    notes: [
      ...initial_state_result.notes,
      ...transition_event_result.notes,
      "Reducer compatibility remains shape-level only; later integration must still validate transition acceptance.",
    ],
  };
}
