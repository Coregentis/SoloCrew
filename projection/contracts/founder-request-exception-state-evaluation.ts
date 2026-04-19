import {
  type FounderRequestPacketStateDerivationResult,
} from "./founder-request-exception-packet-state-derivation.ts";
import {
  type FounderRequestExceptionState,
  type FounderRequestExceptionTransitionEvent,
  is_founder_request_exception_state,
  is_founder_request_exception_transition_event,
} from "./founder-request-exception-state-machine-contract.ts";
import {
  reduce_founder_request_exception_transition,
} from "./founder-request-exception-state-machine-reducer.ts";

const SAFE_BASELINE_STATE: FounderRequestExceptionState = "state_observed";

export interface FounderRequestExceptionStateEvaluationInput {
  evaluation_id: string;
  derivation_result: FounderRequestPacketStateDerivationResult;
  current_state?: FounderRequestExceptionState;
}

export interface FounderRequestExceptionStateEvaluationResult {
  evaluation_id: string;
  initial_state: FounderRequestExceptionState;
  transition_event: FounderRequestExceptionTransitionEvent;
  requested_next_state: FounderRequestExceptionState;
  reducer_target_state: FounderRequestExceptionState;
  transition_accepted: boolean;
  final_state: FounderRequestExceptionState;
  blocked_reason?: string;
  terminal: boolean;
  non_executing: true;
  source_posture: string;
  source_markers: string[];
  notes: string[];
}

function is_string_array(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === "string");
}

function is_founder_request_packet_state_derivation_result(
  value: unknown
): value is FounderRequestPacketStateDerivationResult {
  return (
    typeof value === "object" &&
    value !== null &&
    is_founder_request_exception_state(
      (value as FounderRequestPacketStateDerivationResult).initial_state
    ) &&
    is_founder_request_exception_transition_event(
      (value as FounderRequestPacketStateDerivationResult).transition_event
    ) &&
    is_founder_request_exception_state(
      (value as FounderRequestPacketStateDerivationResult).reducer_target_state
    ) &&
    typeof (value as FounderRequestPacketStateDerivationResult).reducer_compatible ===
      "boolean" &&
    (value as FounderRequestPacketStateDerivationResult).non_executing === true &&
    typeof (value as FounderRequestPacketStateDerivationResult).source_posture ===
      "string" &&
    is_string_array(
      (value as FounderRequestPacketStateDerivationResult).source_markers
    ) &&
    is_string_array((value as FounderRequestPacketStateDerivationResult).notes)
  );
}

function create_blocked_evaluation_result(
  input: FounderRequestExceptionStateEvaluationInput,
  current_state: FounderRequestExceptionState,
  blocked_reason: string,
  notes: string[]
): FounderRequestExceptionStateEvaluationResult {
  const derivation_result = is_founder_request_packet_state_derivation_result(
    input.derivation_result
  )
    ? input.derivation_result
    : null;

  return {
    evaluation_id: input.evaluation_id,
    initial_state: derivation_result?.initial_state ?? SAFE_BASELINE_STATE,
    transition_event: derivation_result?.transition_event ?? "observe_signal",
    requested_next_state:
      derivation_result?.reducer_target_state ?? SAFE_BASELINE_STATE,
    reducer_target_state:
      derivation_result?.reducer_target_state ?? SAFE_BASELINE_STATE,
    transition_accepted: false,
    final_state: current_state,
    blocked_reason,
    terminal: current_state === "state_closed_without_execution",
    non_executing: true,
    source_posture: derivation_result?.source_posture ?? "invalid_derivation_result",
    source_markers: derivation_result?.source_markers ?? [],
    notes: [...(derivation_result?.notes ?? []), ...notes],
  };
}

export function evaluate_founder_request_exception_state(
  input: FounderRequestExceptionStateEvaluationInput
): FounderRequestExceptionStateEvaluationResult {
  const current_state = input.current_state ?? SAFE_BASELINE_STATE;

  if (!is_founder_request_exception_state(current_state)) {
    throw new Error(
      "Reducer-backed state evaluation current_state falls outside the bounded contract."
    );
  }

  if (!is_founder_request_packet_state_derivation_result(input.derivation_result)) {
    return create_blocked_evaluation_result(
      input,
      current_state,
      "invalid_derivation_result",
      [
        "Packet-level derivation result falls outside the bounded state-evaluation contract.",
      ]
    );
  }

  const reducer_result = reduce_founder_request_exception_transition({
    current_state,
    transition_event: input.derivation_result.transition_event,
    requested_next_state: input.derivation_result.reducer_target_state,
  });

  const final_state = reducer_result.accepted
    ? (reducer_result.next_state ?? current_state)
    : (reducer_result.current_state ?? current_state);

  return {
    evaluation_id: input.evaluation_id,
    initial_state: input.derivation_result.initial_state,
    transition_event: input.derivation_result.transition_event,
    requested_next_state: input.derivation_result.reducer_target_state,
    reducer_target_state: input.derivation_result.reducer_target_state,
    transition_accepted: reducer_result.accepted,
    final_state,
    blocked_reason: reducer_result.blocked_reason,
    terminal: reducer_result.terminal,
    non_executing: true,
    source_posture: input.derivation_result.source_posture,
    source_markers: [...input.derivation_result.source_markers],
    notes: [
      ...input.derivation_result.notes,
      ...reducer_result.notes,
      "Reducer-backed state evaluation preserves derivation traceability without queue or execution semantics.",
    ],
  };
}
