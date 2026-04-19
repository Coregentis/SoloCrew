import {
  FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES,
  type FounderRequestExceptionState,
  type FounderRequestExceptionTransitionEvent,
  is_allowed_founder_request_exception_transition,
  is_forbidden_founder_request_exception_transition,
  is_founder_request_exception_state,
  is_founder_request_exception_transition_event,
} from "./founder-request-exception-state-machine-contract.ts";

export interface FounderRequestExceptionTransitionInput {
  current_state: FounderRequestExceptionState;
  transition_event: FounderRequestExceptionTransitionEvent;
  requested_next_state?: FounderRequestExceptionState;
}

export interface FounderRequestExceptionTransitionResult {
  accepted: boolean;
  current_state: FounderRequestExceptionState | null;
  next_state: FounderRequestExceptionState | null;
  transition_event: FounderRequestExceptionTransitionEvent | null;
  requested_next_state?: FounderRequestExceptionState | null;
  blocked_reason?: string;
  notes: string[];
  non_executing: true;
  terminal: boolean;
}

export const FOUNDER_REQUEST_EXCEPTION_EVENT_TARGET_MAP: Readonly<
  Record<FounderRequestExceptionTransitionEvent, FounderRequestExceptionState>
> = Object.freeze({
  observe_signal: "state_observed",
  start_monitoring: "state_monitoring",
  raise_review: "state_review_needed",
  mark_revision_needed: "state_revision_needed",
  mark_evidence_insufficient: "state_evidence_insufficient",
  mark_stale_context: "state_stale_context",
  mark_contract_blocked: "state_contract_blocked",
  refresh_for_review: "state_review_needed",
  surface_impact: "state_impact_detected",
  escalate_blocked_activation: "state_escalation_required",
  surface_confirm_requirement: "state_confirm_required",
  close_without_execution: "state_closed_without_execution",
});

function create_blocked_result(
  input: Partial<FounderRequestExceptionTransitionInput>,
  blocked_reason: string,
  notes: string[]
): FounderRequestExceptionTransitionResult {
  const current_state = is_founder_request_exception_state(input.current_state)
    ? input.current_state
    : null;
  const transition_event = is_founder_request_exception_transition_event(
    input.transition_event
  )
    ? input.transition_event
    : null;
  const requested_next_state = is_founder_request_exception_state(
    input.requested_next_state
  )
    ? input.requested_next_state
    : input.requested_next_state === undefined
      ? undefined
      : null;

  return {
    accepted: false,
    current_state,
    next_state: current_state,
    transition_event,
    requested_next_state,
    blocked_reason,
    notes,
    non_executing: true,
    terminal: current_state
      ? FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES.includes(current_state)
      : false,
  };
}

function create_accepted_result(
  input: FounderRequestExceptionTransitionInput,
  next_state: FounderRequestExceptionState,
  notes: string[]
): FounderRequestExceptionTransitionResult {
  return {
    accepted: true,
    current_state: input.current_state,
    next_state,
    transition_event: input.transition_event,
    requested_next_state: input.requested_next_state ?? null,
    notes,
    non_executing: true,
    terminal: FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES.includes(
      next_state
    ),
  };
}

export function reduce_founder_request_exception_transition(
  input: FounderRequestExceptionTransitionInput
): FounderRequestExceptionTransitionResult {
  if (!is_founder_request_exception_state(input.current_state)) {
    return create_blocked_result(input, "invalid_current_state", [
      "Current state falls outside the bounded exception-state contract.",
    ]);
  }

  if (!is_founder_request_exception_transition_event(input.transition_event)) {
    return create_blocked_result(input, "invalid_transition_event", [
      "Transition event falls outside the bounded exception-state contract.",
    ]);
  }

  if (
    input.requested_next_state !== undefined &&
    !is_founder_request_exception_state(input.requested_next_state)
  ) {
    return create_blocked_result(input, "invalid_requested_next_state", [
      "Requested next state falls outside the bounded exception-state contract.",
    ]);
  }

  if (
    FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES.includes(input.current_state)
  ) {
    return create_blocked_result(input, "terminal_state", [
      "Closed-without-execution remains a non-executing terminal state.",
    ]);
  }

  const derived_next_state =
    FOUNDER_REQUEST_EXCEPTION_EVENT_TARGET_MAP[input.transition_event];
  const requested_next_state = input.requested_next_state ?? derived_next_state;

  if (
    input.requested_next_state !== undefined &&
    input.requested_next_state !== derived_next_state
  ) {
    return create_blocked_result(input, "requested_next_state_mismatch", [
      "Requested next state does not match the bounded event-to-target mapping.",
    ]);
  }

  if (
    is_forbidden_founder_request_exception_transition(
      input.current_state,
      requested_next_state
    )
  ) {
    return create_blocked_result(input, "forbidden_transition", [
      "Transition target falls outside the bounded state-machine contract.",
    ]);
  }

  if (
    !is_allowed_founder_request_exception_transition(
      input.current_state,
      requested_next_state
    )
  ) {
    return create_blocked_result(input, "blocked_bounded_transition", [
      "Transition pair is not allowed by the bounded state-machine matrix.",
    ]);
  }

  return create_accepted_result(input, requested_next_state, [
    "Transition accepted inside the bounded state-machine contract.",
  ]);
}
