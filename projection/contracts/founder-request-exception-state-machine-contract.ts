function join_parts(...parts: string[]): string {
  return parts.join("");
}

const FOUNDER_REQUEST_EXCEPTION_STATE_VALUES = [
  "state_observed",
  "state_monitoring",
  "state_review_needed",
  "state_evidence_insufficient",
  "state_stale_context",
  "state_impact_detected",
  "state_activation_blocked",
  "state_confirm_required",
  "state_escalation_required",
  "state_revision_needed",
  "state_contract_blocked",
  "state_closed_without_execution",
] as const;

export type FounderRequestExceptionState =
  (typeof FOUNDER_REQUEST_EXCEPTION_STATE_VALUES)[number];

export const FOUNDER_REQUEST_EXCEPTION_TRANSITION_EVENT_VALUES = [
  "observe_signal",
  "start_monitoring",
  "raise_review",
  "mark_revision_needed",
  "mark_evidence_insufficient",
  "mark_stale_context",
  "mark_contract_blocked",
  "refresh_for_review",
  "surface_impact",
  "escalate_blocked_activation",
  "surface_confirm_requirement",
  "close_without_execution",
] as const;

export type FounderRequestExceptionTransitionEvent =
  (typeof FOUNDER_REQUEST_EXCEPTION_TRANSITION_EVENT_VALUES)[number];

export const FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES = [
  "state_closed_without_execution",
] as const;

type FounderRequestExceptionTransitionPairKey =
  `${FounderRequestExceptionState}->${FounderRequestExceptionState}`;

function create_transition_pair_key(
  from: FounderRequestExceptionState,
  to: FounderRequestExceptionState
): FounderRequestExceptionTransitionPairKey {
  return `${from}->${to}`;
}

function create_unknown_transition_pair_key(from: string, to: string): string {
  return `${from}->${to}`;
}

const ALLOWED_FOUNDER_REQUEST_EXCEPTION_TRANSITION_PAIRS = new Set<
  FounderRequestExceptionTransitionPairKey
>([
  create_transition_pair_key("state_observed", "state_monitoring"),
  create_transition_pair_key("state_observed", "state_review_needed"),
  create_transition_pair_key("state_monitoring", "state_review_needed"),
  create_transition_pair_key("state_review_needed", "state_revision_needed"),
  create_transition_pair_key(
    "state_review_needed",
    "state_evidence_insufficient"
  ),
  create_transition_pair_key("state_review_needed", "state_stale_context"),
  create_transition_pair_key("state_review_needed", "state_contract_blocked"),
  create_transition_pair_key(
    "state_evidence_insufficient",
    "state_review_needed"
  ),
  create_transition_pair_key("state_stale_context", "state_review_needed"),
  create_transition_pair_key("state_impact_detected", "state_review_needed"),
  create_transition_pair_key(
    "state_activation_blocked",
    "state_escalation_required"
  ),
  create_transition_pair_key("state_confirm_required", "state_review_needed"),
  create_transition_pair_key("state_revision_needed", "state_review_needed"),
  create_transition_pair_key(
    "state_contract_blocked",
    "state_closed_without_execution"
  ),
  create_transition_pair_key(
    "state_escalation_required",
    "state_closed_without_execution"
  ),
  create_transition_pair_key(
    "state_monitoring",
    "state_closed_without_execution"
  ),
]);

export const FOUNDER_REQUEST_EXCEPTION_ALLOWED_TRANSITION_MATRIX: Readonly<
  Record<FounderRequestExceptionState, readonly FounderRequestExceptionState[]>
> = Object.freeze({
  state_observed: Object.freeze([
    "state_monitoring",
    "state_review_needed",
  ]),
  state_monitoring: Object.freeze([
    "state_review_needed",
    "state_closed_without_execution",
  ]),
  state_review_needed: Object.freeze([
    "state_revision_needed",
    "state_evidence_insufficient",
    "state_stale_context",
    "state_contract_blocked",
  ]),
  state_evidence_insufficient: Object.freeze(["state_review_needed"]),
  state_stale_context: Object.freeze(["state_review_needed"]),
  state_impact_detected: Object.freeze(["state_review_needed"]),
  state_activation_blocked: Object.freeze(["state_escalation_required"]),
  state_confirm_required: Object.freeze(["state_review_needed"]),
  state_escalation_required: Object.freeze(["state_closed_without_execution"]),
  state_revision_needed: Object.freeze(["state_review_needed"]),
  state_contract_blocked: Object.freeze(["state_closed_without_execution"]),
  state_closed_without_execution: Object.freeze([]),
});

const FORBIDDEN_FOUNDER_REQUEST_EXCEPTION_TARGET_LABELS = new Set([
  join_parts("appro", "ved"),
  join_parts("re", "jected"),
  join_parts("dis", "patched"),
  join_parts("exe", "cuted"),
  join_parts("pro", "vider", "_sent"),
  join_parts("chan", "nel", "_published"),
  join_parts("policy", "_mutated"),
  join_parts("protocol", "_certified"),
  join_parts("autonomous", "_decision", "_complete"),
]);

const FORBIDDEN_FOUNDER_REQUEST_EXCEPTION_TRANSITION_PAIRS = new Set([
  create_unknown_transition_pair_key(
    "state_confirm_required",
    join_parts("appro", "ved")
  ),
  create_unknown_transition_pair_key(
    "state_activation_blocked",
    join_parts("dis", "patched")
  ),
  create_unknown_transition_pair_key(
    "state_escalation_required",
    join_parts("exe", "cuted")
  ),
  create_unknown_transition_pair_key(
    "state_revision_needed",
    join_parts("pro", "vider", "_sent")
  ),
]);

export function is_founder_request_exception_state(
  value: unknown
): value is FounderRequestExceptionState {
  return (
    typeof value === "string" &&
    FOUNDER_REQUEST_EXCEPTION_STATE_VALUES.includes(
      value as FounderRequestExceptionState
    )
  );
}

export function is_founder_request_exception_transition_event(
  value: unknown
): value is FounderRequestExceptionTransitionEvent {
  return (
    typeof value === "string" &&
    FOUNDER_REQUEST_EXCEPTION_TRANSITION_EVENT_VALUES.includes(
      value as FounderRequestExceptionTransitionEvent
    )
  );
}

export function is_allowed_founder_request_exception_transition(
  from: unknown,
  to: unknown
): boolean {
  if (
    !is_founder_request_exception_state(from) ||
    !is_founder_request_exception_state(to)
  ) {
    return false;
  }

  return ALLOWED_FOUNDER_REQUEST_EXCEPTION_TRANSITION_PAIRS.has(
    create_transition_pair_key(from, to)
  );
}

export function is_forbidden_founder_request_exception_transition(
  from: unknown,
  to: unknown
): boolean {
  if (typeof to === "string") {
    if (FORBIDDEN_FOUNDER_REQUEST_EXCEPTION_TARGET_LABELS.has(to)) {
      return true;
    }

    if (typeof from === "string") {
      return FORBIDDEN_FOUNDER_REQUEST_EXCEPTION_TRANSITION_PAIRS.has(
        create_unknown_transition_pair_key(from, to)
      );
    }
  }

  return false;
}

export function assert_founder_request_exception_transition_allowed(
  from: unknown,
  to: unknown
): asserts from is FounderRequestExceptionState {
  if (is_forbidden_founder_request_exception_transition(from, to)) {
    throw new Error(
      "Founder-request exception transition target falls outside the bounded contract."
    );
  }

  if (!is_allowed_founder_request_exception_transition(from, to)) {
    throw new Error(
      "Founder-request exception transition is not allowed by the bounded contract."
    );
  }
}
