import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  assert_founder_request_exception_transition_allowed,
  FOUNDER_REQUEST_EXCEPTION_ALLOWED_TRANSITION_MATRIX,
  FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES,
  FOUNDER_REQUEST_EXCEPTION_TRANSITION_EVENT_VALUES,
  is_allowed_founder_request_exception_transition,
  is_forbidden_founder_request_exception_transition,
  is_founder_request_exception_state,
  is_founder_request_exception_transition_event,
} from "../../projection/contracts/founder-request-exception-state-machine-contract.ts";

const EXPECTED_STATES = [
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

const EXPECTED_EVENTS = [
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

const EXPECTED_ALLOWED_TRANSITIONS = [
  ["state_observed", "state_monitoring"],
  ["state_observed", "state_review_needed"],
  ["state_monitoring", "state_review_needed"],
  ["state_review_needed", "state_revision_needed"],
  ["state_review_needed", "state_evidence_insufficient"],
  ["state_review_needed", "state_stale_context"],
  ["state_review_needed", "state_contract_blocked"],
  ["state_evidence_insufficient", "state_review_needed"],
  ["state_stale_context", "state_review_needed"],
  ["state_impact_detected", "state_review_needed"],
  ["state_activation_blocked", "state_escalation_required"],
  ["state_confirm_required", "state_review_needed"],
  ["state_revision_needed", "state_review_needed"],
  ["state_contract_blocked", "state_closed_without_execution"],
  ["state_escalation_required", "state_closed_without_execution"],
  ["state_monitoring", "state_closed_without_execution"],
] as const;

test("[projection contract] founder-request exception state vocabulary accepts all planned bounded states", () => {
  for (const state of EXPECTED_STATES) {
    assert.equal(is_founder_request_exception_state(state), true);
  }
});

test("[projection contract] founder-request exception state vocabulary rejects unknown state", () => {
  assert.equal(is_founder_request_exception_state("state_open_loop"), false);
});

test("[projection contract] founder-request exception transition event vocabulary accepts all planned bounded events", () => {
  for (const event of EXPECTED_EVENTS) {
    assert.equal(is_founder_request_exception_transition_event(event), true);
  }

  assert.deepEqual(
    [...FOUNDER_REQUEST_EXCEPTION_TRANSITION_EVENT_VALUES],
    [...EXPECTED_EVENTS]
  );
});

test("[projection contract] founder-request exception transition event vocabulary rejects unknown event", () => {
  assert.equal(
    is_founder_request_exception_transition_event("send_for_execution"),
    false
  );
});

test("[projection contract] founder-request exception allowed transition matrix accepts all planned pairs", () => {
  for (const [from, to] of EXPECTED_ALLOWED_TRANSITIONS) {
    assert.equal(
      is_allowed_founder_request_exception_transition(from, to),
      true
    );
    assert.doesNotThrow(() =>
      assert_founder_request_exception_transition_allowed(from, to)
    );
  }

  assert.deepEqual(
    FOUNDER_REQUEST_EXCEPTION_ALLOWED_TRANSITION_MATRIX.state_review_needed,
    [
      "state_revision_needed",
      "state_evidence_insufficient",
      "state_stale_context",
      "state_contract_blocked",
    ]
  );
});

test("[projection contract] founder-request exception invalid bounded transition pair is rejected", () => {
  assert.equal(
    is_allowed_founder_request_exception_transition(
      "state_observed",
      "state_stale_context"
    ),
    false
  );
  assert.throws(
    () =>
      assert_founder_request_exception_transition_allowed(
        "state_observed",
        "state_stale_context"
      ),
    /bounded contract/u
  );
});

test("[projection contract] founder-request exception forbidden target labels are rejected", () => {
  const forbidden_targets = [
    // forbidden-label negative fixtures
    "approved",
    "rejected",
    "dispatched",
    "executed",
    "provider_sent",
    "channel_published",
    "policy_mutated",
    "protocol_certified",
    "autonomous_decision_complete",
  ];

  for (const forbidden_target of forbidden_targets) {
    assert.equal(
      is_forbidden_founder_request_exception_transition(
        "state_review_needed",
        forbidden_target
      ),
      true
    );
  }
});

test("[projection contract] founder-request exception explicit forbidden transition pairs are rejected", () => {
  assert.equal(
    is_forbidden_founder_request_exception_transition(
      "state_confirm_required",
      "approved"
    ),
    true
  );
  assert.equal(
    is_forbidden_founder_request_exception_transition(
      "state_activation_blocked",
      "dispatched"
    ),
    true
  );
  assert.equal(
    is_forbidden_founder_request_exception_transition(
      "state_escalation_required",
      "executed"
    ),
    true
  );
  assert.equal(
    is_forbidden_founder_request_exception_transition(
      "state_revision_needed",
      "provider_sent"
    ),
    true
  );
  assert.throws(
    () =>
      assert_founder_request_exception_transition_allowed(
        "state_revision_needed",
        "provider_sent"
      ),
    /bounded contract/u
  );
});

test("[projection contract] state_closed_without_execution is present and non-executing", () => {
  assert.equal(
    is_founder_request_exception_state("state_closed_without_execution"),
    true
  );
  assert.deepEqual([...FOUNDER_REQUEST_EXCEPTION_NON_EXECUTING_STATES], [
    "state_closed_without_execution",
  ]);
});

test("[projection contract] no approve reject dispatch execute labels are accepted as states or events", () => {
  assert.equal(is_founder_request_exception_state("approved"), false);
  assert.equal(is_founder_request_exception_state("rejected"), false);
  assert.equal(is_founder_request_exception_transition_event("dispatch"), false);
  assert.equal(is_founder_request_exception_transition_event("execute"), false);
});

test("[projection contract] no provider or channel labels are accepted as states or events", () => {
  assert.equal(
    is_founder_request_exception_state("channel_published"),
    false
  );
  assert.equal(is_founder_request_exception_transition_event("provider"), false);
  assert.equal(is_founder_request_exception_transition_event("channel"), false);
});

test("[projection contract] source stays inside local projection contract lanes only", () => {
  const contract_source = readFileSync(
    new URL(
      "../../projection/contracts/founder-request-exception-state-machine-contract.ts",
      import.meta.url
    ),
    "utf8"
  );

  assert.doesNotMatch(contract_source, /runtime\/core/u);
  assert.doesNotMatch(contract_source, /runtime\/in-memory/u);
  assert.doesNotMatch(contract_source, /Cognitive_OS/u);
  assert.doesNotMatch(contract_source, /app\/pages/u);
  assert.doesNotMatch(contract_source, /projection\/assembly/u);
});
