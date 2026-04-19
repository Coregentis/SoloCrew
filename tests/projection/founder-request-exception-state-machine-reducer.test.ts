import assert from "node:assert/strict";
import test from "node:test";
import { readFileSync } from "node:fs";

import {
  is_allowed_founder_request_exception_transition,
  is_forbidden_founder_request_exception_transition,
} from "../../projection/contracts/founder-request-exception-state-machine-contract.ts";
import {
  FOUNDER_REQUEST_EXCEPTION_EVENT_TARGET_MAP,
  reduce_founder_request_exception_transition,
} from "../../projection/contracts/founder-request-exception-state-machine-reducer.ts";

test("[projection reducer] allowed transition accepts and returns the correct next state", () => {
  const result = reduce_founder_request_exception_transition({
    current_state: "state_review_needed",
    transition_event: "mark_revision_needed",
    requested_next_state: "state_revision_needed",
  });

  assert.equal(result.accepted, true);
  assert.equal(result.current_state, "state_review_needed");
  assert.equal(result.next_state, "state_revision_needed");
  assert.equal(result.transition_event, "mark_revision_needed");
  assert.equal(result.requested_next_state, "state_revision_needed");
  assert.equal(result.blocked_reason, undefined);
  assert.equal(result.non_executing, true);
  assert.equal(result.terminal, false);
});

test("[projection reducer] invalid bounded transition blocks without uncontrolled error", () => {
  const result = reduce_founder_request_exception_transition({
    current_state: "state_observed",
    transition_event: "mark_stale_context",
    requested_next_state: "state_stale_context",
  });

  assert.equal(result.accepted, false);
  assert.equal(result.current_state, "state_observed");
  assert.equal(result.next_state, "state_observed");
  assert.equal(result.blocked_reason, "blocked_bounded_transition");
  assert.match(result.notes[0] ?? "", /bounded state-machine matrix/u);
});

test("[projection reducer] forbidden target label is rejected or blocked", () => {
  assert.equal(
    is_forbidden_founder_request_exception_transition(
      "state_review_needed",
      "approved"
    ),
    true
  );
});

test("[projection reducer] forbidden explicit pair is rejected or blocked", () => {
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
});

test("[projection reducer] event-derived transition works without requested_next_state", () => {
  const result = reduce_founder_request_exception_transition({
    current_state: "state_observed",
    transition_event: "start_monitoring",
  });

  assert.equal(result.accepted, true);
  assert.equal(result.current_state, "state_observed");
  assert.equal(result.next_state, "state_monitoring");
  assert.equal(result.transition_event, "start_monitoring");
  assert.equal(result.requested_next_state, null);
});

test("[projection reducer] requested_next_state must match the bounded event target mapping", () => {
  const result = reduce_founder_request_exception_transition({
    current_state: "state_observed",
    transition_event: "start_monitoring",
    requested_next_state: "state_review_needed",
  });

  assert.equal(result.accepted, false);
  assert.equal(result.blocked_reason, "requested_next_state_mismatch");
  assert.equal(result.current_state, "state_observed");
  assert.equal(result.next_state, "state_observed");
});

test("[projection reducer] state_closed_without_execution remains a non-executing terminal state", () => {
  const accepted = reduce_founder_request_exception_transition({
    current_state: "state_monitoring",
    transition_event: "close_without_execution",
  });
  assert.equal(accepted.accepted, true);
  assert.equal(accepted.next_state, "state_closed_without_execution");
  assert.equal(accepted.non_executing, true);
  assert.equal(accepted.terminal, true);

  const blocked = reduce_founder_request_exception_transition({
    current_state: "state_closed_without_execution",
    transition_event: "raise_review",
  });
  assert.equal(blocked.accepted, false);
  assert.equal(blocked.blocked_reason, "terminal_state");
  assert.equal(blocked.current_state, "state_closed_without_execution");
  assert.equal(blocked.next_state, "state_closed_without_execution");
  assert.equal(blocked.non_executing, true);
  assert.equal(blocked.terminal, true);
});

test("[projection reducer] reducer never returns forbidden labels", () => {
  for (const [event, mapped_state] of Object.entries(
    FOUNDER_REQUEST_EXCEPTION_EVENT_TARGET_MAP
  )) {
    assert.doesNotMatch(event, /approve|reject|dispatch|execute|provider|channel/u);
    assert.doesNotMatch(
      mapped_state,
      /approved|rejected|dispatched|executed|provider_sent|channel_published/u
    );
  }
});

test("[projection reducer] reducer keeps allowed transition checks aligned with contract truth", () => {
  assert.equal(
    is_allowed_founder_request_exception_transition(
      "state_review_needed",
      "state_revision_needed"
    ),
    true
  );
  assert.equal(
    is_allowed_founder_request_exception_transition(
      "state_observed",
      "state_closed_without_execution"
    ),
    false
  );
});

test("[projection reducer] reducer source stays inside contract-only lanes", () => {
  const reducer_source = readFileSync(
    new URL(
      "../../projection/contracts/founder-request-exception-state-machine-reducer.ts",
      import.meta.url
    ),
    "utf8"
  );

  assert.doesNotMatch(reducer_source, /projection\/adapters/u);
  assert.doesNotMatch(reducer_source, /projection\/assembly/u);
  assert.doesNotMatch(reducer_source, /app\/pages/u);
  assert.doesNotMatch(reducer_source, /runtime\/core/u);
  assert.doesNotMatch(reducer_source, /runtime\/in-memory/u);
  assert.doesNotMatch(reducer_source, /Cognitive_OS/u);
});
