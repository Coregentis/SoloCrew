# SOLOCREW-EXCEPTION-STATE-MACHINE-IMPLEMENTATION-PLAN-v0.1

## A. Purpose

This document plans future implementation of a bounded founder-request
exception state-machine in SoloCrew.

It is:

- plan only
- no implementation in this wave
- no TypeScript state-machine code
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan freezes future state-machine scope, state vocabulary, transition
families, forbidden transitions, test gates, and first-wave code duties before
any implementation begins.

## B. Current Readiness Basis

The completed readiness chain now includes:

- projection contract
  - `governance/contracts/SOLOCREW-CGOS-EXCEPTION-PROJECTION-CONTRACT-v0.1.md`
- state-machine semantic baseline
  - `governance/baselines/SOLOCREW-EXCEPTION-STATE-MACHINE-BASELINE-v0.1.md`
- selected founder-request loop
  - `governance/audits/SOLOCREW-FIRST-BUSINESS-LOOP-SELECTION-AUDIT-v0.1.md`
- contract skeleton / guards
  - `projection/contracts/founder-request-exception-packet-contract.ts`
- projection adapter
  - `projection/adapters/founder-request-exception-packet-adapter.ts`
- posture derivation
  - `projection/contracts/founder-request-exception-posture-derivation.ts`
- review packet enrichment
  - `projection/assembly/secretary-handoff-review-packet.ts`
- staging enrichment
  - `projection/assembly/secretary-handoff-staging.ts`
- display hardening
  - `app/pages/secretary-handoff-review-page.ts`
  - `app/pages/secretary-handoff-page.ts`
- portfolio aggregate posture
  - `projection/assembly/portfolio-secretary-shell.ts`
  - `projection/contracts/portfolio-secretary-shell-contract.ts`
- portfolio aggregate closure audit
  - `governance/audits/SOLOCREW-PORTFOLIO-AGGREGATE-CLOSURE-AUDIT-v0.1.md`

Why this permits implementation planning now:

- bounded founder-request exception posture is already contract-frozen
- review/staging assembly already carries lawful bounded summaries
- display layer already preserves evidence summary, omission, insufficiency,
  stale, suggestion-only learning, and non-executing recommendation semantics
- portfolio layer already compresses bounded summaries into a deterministic
  non-executing aggregate posture
- closure audits already document the current truth surface and regression
  evidence

Why this does not permit implementation in this wave:

- no state vocabulary has yet been frozen as TypeScript contract truth
- no transition event vocabulary has yet been frozen
- no allowed transition matrix or forbidden transition guard exists in code
- no state reducer or packet-level state derivation exists
- this wave is planning-only by explicit boundary

## C. State-Machine Purpose

The future state-machine exists to:

- organize bounded exception postures into predictable lifecycle states
- preserve review / return / blocked / stale / insufficiency semantics
- keep founder-facing work exception-driven
- prevent posture drift across packet, staging, display, and aggregate layers
- prepare for a later end-to-end business-loop closure audit

The future state-machine is not for:

- approval authority
- execution authority
- provider/channel dispatch
- policy mutation
- protocol certification
- autonomous completion

The state-machine must remain a bounded visibility and consistency mechanism
above current contract-safe inputs, not a new authority layer.

## D. Proposed State Vocabulary

### 1. `state_observed`

- meaning:
  - a lawful founder-request exception signal has entered bounded downstream
    product space but has not yet risen above initial observation
- allowed source postures:
  - `no_exception`
  - `monitor`
- allowed downstream interpretation:
  - initial bounded intake visibility only
- forbidden interpretation:
  - not queue ownership
  - not action authority
- required evidence / omission / stale handling:
  - omission, insufficiency, and stale markers must remain visible if present

### 2. `state_monitoring`

- meaning:
  - a low-severity bounded signal remains active and visible
- allowed source postures:
  - `monitor`
  - `portfolio_monitor`
- allowed downstream interpretation:
  - watch posture only
- forbidden interpretation:
  - not approval readiness
  - not execution readiness
- required evidence / omission / stale handling:
  - evidence posture remains summary-only
  - omission must not be hidden

### 3. `state_review_needed`

- meaning:
  - bounded posture requires review visibility across packet/staging/display
    layers
- allowed source postures:
  - `review_needed`
  - `portfolio_review_needed`
  - `impact_detected` when review framing remains the truthful next state
- allowed downstream interpretation:
  - review framing only
- forbidden interpretation:
  - not approve/reject semantics
  - not execution preparation
- required evidence / omission / stale handling:
  - evidence summary stays summary-only
  - omission and insufficiency remain explicit

### 4. `state_evidence_insufficient`

- meaning:
  - bounded interpretation remains too weak for confident review or impact
    framing
- allowed source postures:
  - `evidence_insufficient`
  - `portfolio_evidence_insufficient`
- allowed downstream interpretation:
  - explicit uncertainty posture only
- forbidden interpretation:
  - not confident review readiness
  - not false clarity
- required evidence / omission / stale handling:
  - insufficiency must remain explicit
  - evidence summary must not be rendered as proof

### 5. `state_stale_context`

- meaning:
  - bounded context is no longer fresh enough for confident use
- allowed source postures:
  - `stale_context`
  - `portfolio_stale_context`
- allowed downstream interpretation:
  - explicit freshness warning only
- forbidden interpretation:
  - not current-state confidence
  - not resolved posture
- required evidence / omission / stale handling:
  - stale must remain stale
  - stale must not be downgraded into generic monitoring silently

### 6. `state_impact_detected`

- meaning:
  - bounded drift/impact posture remains material and visible
- allowed source postures:
  - `impact_detected`
  - `portfolio_impact_detected`
- allowed downstream interpretation:
  - bounded impact attention only
- forbidden interpretation:
  - not compensation authority
  - not execution failure authority
- required evidence / omission / stale handling:
  - supporting evidence posture remains summary-only
  - insufficiency must override false impact confidence

### 7. `state_activation_blocked`

- meaning:
  - bounded activation posture is blocked and remains visible
- allowed source postures:
  - `activation_blocked`
  - `portfolio_activation_blocked`
- allowed downstream interpretation:
  - blocked activation visibility only
- forbidden interpretation:
  - not dispatched
  - not executed
- required evidence / omission / stale handling:
  - causal omission or insufficiency must remain visible

### 8. `state_confirm_required`

- meaning:
  - bounded confirm posture remains outstanding
- allowed source postures:
  - `confirm_required`
  - `portfolio_confirm_required`
- allowed downstream interpretation:
  - confirm-needed visibility only
- forbidden interpretation:
  - not approval queue
  - not authorization workflow
- required evidence / omission / stale handling:
  - evidence summary must remain bounded
  - omission detail must remain explicit

### 9. `state_escalation_required`

- meaning:
  - bounded escalation posture remains active
- allowed source postures:
  - `escalation_required`
  - `portfolio_escalation_required`
- allowed downstream interpretation:
  - escalation attention only
- forbidden interpretation:
  - not execution escalation
  - not provider/channel handoff
- required evidence / omission / stale handling:
  - stale or insufficiency must remain visible alongside escalation posture

### 10. `state_revision_needed`

- meaning:
  - bounded revision-return posture remains the truthful loop state
- allowed source postures:
  - `return_for_revision`
  - `portfolio_revision_needed`
- allowed downstream interpretation:
  - revision-loop visibility only
- forbidden interpretation:
  - not rejected
  - not send-back authority
- required evidence / omission / stale handling:
  - review, omission, insufficiency, and stale posture must remain explicit

### 11. `state_contract_blocked`

- meaning:
  - current bounded state is materially blocked by contract or upstream
    availability boundary
- allowed source postures:
  - `blocked_by_contract`
  - `portfolio_contract_blocked`
- allowed downstream interpretation:
  - contract-blocked visibility only
- forbidden interpretation:
  - not complete
  - not portfolio clear
- required evidence / omission / stale handling:
  - omission and not-available posture must remain explicit

### 12. `state_closed_without_execution`

- meaning:
  - the bounded exception line is closed in product space without any execution
    or provider/channel behavior
- allowed source postures:
  - terminal closure after `state_contract_blocked`
  - terminal closure after `state_escalation_required`
  - terminal closure after `state_monitoring`
- allowed downstream interpretation:
  - bounded non-executing closure only
- forbidden interpretation:
  - not approved
  - not rejected
  - not dispatched
  - not executed
- required evidence / omission / stale handling:
  - closure must preserve the last truthful evidence/omission/stale posture in
    summary-safe form

## E. Proposed Transition Model

Allowed transition families at planning level only:

- `state_observed -> state_monitoring`
- `state_observed -> state_review_needed`
- `state_monitoring -> state_review_needed`
- `state_review_needed -> state_revision_needed`
- `state_review_needed -> state_evidence_insufficient`
- `state_review_needed -> state_stale_context`
- `state_review_needed -> state_contract_blocked`
- `state_evidence_insufficient -> state_review_needed`
- `state_stale_context -> state_review_needed`
- `state_impact_detected -> state_review_needed`
- `state_activation_blocked -> state_escalation_required`
- `state_confirm_required -> state_review_needed`
- `state_revision_needed -> state_review_needed`
- `state_contract_blocked -> state_closed_without_execution`
- `state_escalation_required -> state_closed_without_execution`
- `state_monitoring -> state_closed_without_execution`

Planning interpretation rules:

- allowed transitions preserve bounded visibility semantics only
- no transition may imply action authority
- stale and insufficiency may move back into review-needed only when bounded
  refreshed evidence or posture exists in current lawful inputs
- closure transitions terminate only in `state_closed_without_execution`

## F. Forbidden Transitions

The following transitions are explicitly forbidden:

- any state -> `approved`
- any state -> `rejected`
- any state -> `dispatched`
- any state -> `executed`
- any state -> `provider_sent`
- any state -> `channel_published`
- any state -> `policy_mutated`
- any state -> `protocol_certified`
- any state -> `autonomous_decision_complete`
- `state_confirm_required -> approved`
- `state_activation_blocked -> dispatched`
- `state_escalation_required -> executed`
- `state_revision_needed -> provider_sent`

These are forbidden transitions because SoloCrew does not own those authority
classes in current product space.

## G. Inputs Allowed For Future State-Machine Implementation

Future implementation may consume only:

- bounded exception posture from packet contract
- derived posture from posture derivation utility
- review packet enrichment
- staging preview enrichment
- display-safe marker summaries
- portfolio aggregate posture
- evidence summary status
- omission / insufficiency / stale markers
- learning suggestion posture

Future implementation must not consume:

- raw runtime internals
- raw CGOS outputs
- raw trace dump
- raw VSL / PSG / drift / AEL / learning objects
- provider/channel results
- approve/reject/dispatch/execute state
- direct runtime-private identity

## H. Future Implementation Waves

### 1. State-machine contract / type guards

- scope:
  - freeze state vocabulary type
  - freeze transition event vocabulary type
  - freeze allowed transition matrix
  - freeze forbidden transition guard
- likely files:
  - `projection/contracts/founder-request-exception-state-machine-contract.ts`
  - `tests/projection/founder-request-exception-state-machine-contract.test.ts`
- tests required:
  - valid state vocabulary
  - valid transition vocabulary
  - allowed transition matrix checks
  - forbidden transition negative tests
- non-goals:
  - no reducer
  - no assembly changes
  - no UI changes
- rollback condition:
  - stop if implementation needs raw runtime or direct-control labels

### 2. Pure transition reducer

- scope:
  - implement a pure reducer over frozen states and transition events only
- likely files:
  - `projection/contracts/founder-request-exception-state-machine-reducer.ts`
  - reducer-focused tests
- tests required:
  - deterministic allowed transitions
  - deterministic forbidden-transition failures
  - closed-without-execution handling
- non-goals:
  - no adapter changes
  - no page rendering
  - no provider/channel behavior
- rollback condition:
  - stop if reducer needs founder queue semantics or runtime-private state

### 3. Packet-level state derivation

- scope:
  - derive state-machine state from packet posture, markers, and review/staging
    summaries
- likely files:
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
  - state-derivation helper files
- tests required:
  - packet-level state derivation
  - stale/insufficiency/blocked handling
  - backward compatibility checks
- non-goals:
  - no app/page behavior
  - no portfolio rendering changes
- rollback condition:
  - stop if derivation requires widening current assembly contracts

### 4. Portfolio aggregate state summary

- scope:
  - compress packet-level state into bounded portfolio state summary
- likely files:
  - `projection/assembly/portfolio-secretary-shell.ts`
  - `projection/contracts/portfolio-secretary-shell-contract.ts`
- tests required:
  - mixed-state priority ordering
  - non-executing aggregate summary checks
  - existing portfolio aggregate regression preservation
- non-goals:
  - no app/page portfolio rendering
  - no queue implementation
- rollback condition:
  - stop if aggregate summary begins implying completion or queue authority

### 5. Display-safe state exposure

- scope:
  - expose bounded state-machine state through existing review/staging display
    surfaces only
- likely files:
  - `app/pages/secretary-handoff-review-page.ts`
  - `app/pages/secretary-handoff-page.ts`
  - page tests
- tests required:
  - state visibility remains bounded
  - stale/insufficiency/blocked visibility remains explicit
  - forbidden labels absent
- non-goals:
  - no new page
  - no provider/channel messaging
- rollback condition:
  - stop if display requires raw trace/runtime detail or direct-control copy

### 6. State-machine closure audit

- scope:
  - freeze what the implemented state-machine truthfully does and does not do
- likely files:
  - governance closure audit doc
- tests required:
  - full suite green
  - source-boundary checks
- non-goals:
  - no Operational V1 claim
  - no end-to-end closure claim by default
- rollback condition:
  - stop if implementation evidence does not support closure language

## I. Required Tests For Future Implementation

Future implementation must test:

- allowed transitions
- forbidden transitions
- stale handling
- insufficiency handling
- contract-blocked handling
- escalation handling
- closed-without-execution handling
- no approve/reject/dispatch/execute
- no provider/channel execution
- no raw runtime imports
- no policy mutation
- no protocol certification
- existing packet / staging / review / display / portfolio tests remain green

## J. First Code Wave DoD

First implementation wave:

- `State-machine contract / type guards`

Definition of Done:

- state vocabulary type exists and matches the planned bounded state set
- transition event vocabulary type exists and stays below direct-control
  semantics
- allowed transition matrix exists as explicit contract truth
- forbidden transition guard exists and rejects forbidden transitions
- type guards exist for state values and transition values
- negative tests cover forbidden states and forbidden transitions
- tests prove no approve/reject/dispatch/execute labels
- tests prove no provider/channel execution labels
- no adapter changes
- no assembly changes
- no UI changes
- no runtime imports
- no direct-control labels

## K. Boundary Conclusion

Selected readiness value:

`STATE_MACHINE_PLAN_READY_FOR_CONTRACT_GUARDS`

Evidence supports this choice because:

- semantic baseline already froze bounded posture semantics and forbidden
  behaviors
- founder-request packet, review/staging assembly, display hardening, and
  portfolio aggregate posture are now implemented and closed as bounded
  visibility layers
- the next smallest coherent step is to freeze state and transition contract
  truth before any reducer or assembly wiring begins

