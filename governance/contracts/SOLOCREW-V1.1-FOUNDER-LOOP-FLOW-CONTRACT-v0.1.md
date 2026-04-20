# SoloCrew V1.1 — Founder Loop Flow Contract v0.1

## A. Contract Purpose

This contract opens one coherent founder-loop usability contract above the
sealed Operational V1 boundary.

It does not replace the sealed Operational V1 packet contract, exception-state
machine, or review/staging packet semantics.
It defines the V1.1 loop in governance terms so existing assets can be aligned
without inventing a second execution-capable workflow engine.

## B. Flow Identity

- flow_name:
  - `SoloCrew V1.1 usable founder loop`
- flow_anchor_tag:
  - `solocrew-operational-v1-rc-seal-20260420`
- flow_anchor_commit:
  - `2dea8c96052c28cacdc89c80bb30ea35c6e62468`
- flow_authority_order:
  - `MPLP Protocol -> Cognitive_OS -> SoloCrew`
- flow_posture:
  - `bounded_non_executing_founder_loop`

The loop is:

- Founder Request Intake
- Founder Request Exception Packet
- Secretary Handoff
- Review Surface
- Founder Decision Preparation

## C. Input Contract

The V1.1 loop input is one bounded founder request intake object that reuses
the sealed intake field family:

- `founder_request_id`
- `request_label`
- `request_text`
- `request_intent_hint`
- `requested_context_summary`
- `risk_hint`
- `evidence_hint`
- `created_at`
- `non_executing`

Input constraints:

- input must remain bounded, product-facing, and summary-safe
- input must not be treated as a queue item, command string, or execution request
- input may route into packet derivation visibility only through existing sealed packet and staging/review assets

## D. Intermediate Packet Contract

The intermediate packet remains the founder-request exception packet already
sealed in Operational V1.

V1.1 requirements on that packet are:

- packet identity remains traceable to the intake object
- packet remains bounded, summary-safe, and non-executing
- packet may carry posture, evidence summary, omission markers, stale markers, insufficiency markers, and bounded recommendation posture
- packet must not become a provider job, channel message, approval object, or execution command

## E. Secretary Handoff Contract

The Secretary handoff stage reuses the existing staging and review-packet
surfaces.

The V1.1 handoff contract requires:

- handoff is staged, not executed
- handoff visibility is sufficient for the founder to understand why the packet moved into Secretary review space
- handoff retains packet-state and review-return posture without becoming approve/reject/dispatch/execute control
- handoff stays downstream of the sealed Operational V1 packet and rationale/evidence contract chain

## F. Review Surface Contract

The review surface is the first detailed explanation lane for V1.1.

It must:

- expose review-readiness
- show packet framing, rationale, and evidence-backed recommendation posture
- prepare the founder to make a decision externally to the product loop
- remain review-only and non-executing

It must not:

- perform the decision
- dispatch work
- publish to a provider or channel
- mutate protocol or runtime authority

## G. Decision Preparation Contract

The founder loop terminates at founder decision preparation.

That means:

- the system may recommend a next step
- the system may explain supporting evidence and visible omissions
- the system may indicate whether review or revision posture is active
- the system may prepare the founder for a later out-of-band decision

That does not mean:

- founder approval is executed here
- rejection is executed here
- dispatch is executed here
- external business action is executed here

## H. Evidence Contract

Evidence in V1.1 must remain:

- bounded
- summary-safe
- omission-aware
- insufficiency-aware
- stale-aware
- traceable to existing Operational V1 packet, rationale, and page-rendering assets

Evidence in V1.1 must not become:

- raw runtime-private export
- proof of execution
- protocol certification proof
- autonomous action authorization

## I. State Transition Contract

The minimum V1.1 usability-state flow is:

- `draft_intake`
- `intake_captured`
- `packet_derived`
- `secretary_handoff_staged`
- `review_ready`
- `founder_decision_prepared`

Allowed linear interpretation:

- `draft_intake -> intake_captured`
- `intake_captured -> packet_derived`
- `packet_derived -> secretary_handoff_staged`
- `secretary_handoff_staged -> review_ready`
- `review_ready -> founder_decision_prepared`

Boundary clarification:

- these V1.1 state labels are governance-layer flow labels for founder-loop usability
- they do not replace the sealed Operational V1 exception-state machine vocabulary
- any future code-level mapping must reuse the Operational V1 sealed reducer and packet-state truth rather than inventing a parallel execution workflow

## J. Non-Execution Contract

The V1.1 founder loop is non-executing end to end.

That means:

- no provider/channel execution
- no approve/reject/dispatch/execute behavior
- no founder queue execution
- no external business action execution
- no autonomous company operation
- no protocol certification

The loop stops at review and decision preparation only.

## K. Failure / Invalid State Contract

The following are invalid V1.1 states and must be treated as contract
violations:

- `execution_requested`
- `provider_dispatch_requested`
- `queue_execution_requested`
- `protocol_certification_claimed`
- `autonomous_operation_claimed`

Additional failure conditions:

- intake without bounded non-executing posture
- packet derivation that bypasses the sealed Operational V1 packet contract
- handoff that implies queue entry or dispatch control
- review readiness that implies action completion instead of decision preparation

## L. Test Coverage Expectations

V1.1 expects reuse of the sealed Operational V1 founder-loop tests plus later
extension through:

- founder intake page tests
- secretary handoff staging page tests
- secretary handoff review page tests
- founder-request packet contract, adapter, posture, derivation, evaluation, state-machine, and reducer tests
- portfolio Secretary shell tests
- `npm test`

V1.1 does not require a forced code patch in this opening wave because the
sealed Operational V1 reducer/state-machine vocabulary is not identical to the
new governance-layer flow labels.

## M. Decision

`V1_1_FOUNDER_LOOP_FLOW_CONTRACT_OPENED`
