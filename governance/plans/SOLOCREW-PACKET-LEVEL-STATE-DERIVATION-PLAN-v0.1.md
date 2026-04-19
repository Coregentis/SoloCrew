# SOLOCREW-PACKET-LEVEL-STATE-DERIVATION-PLAN-v0.1

## A. Purpose

This document plans future packet-level state derivation for founder-request
exception lifecycle handling in SoloCrew.

It is:

- plan only
- no implementation in this wave
- no reducer changes
- no adapter changes
- no assembly changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan freezes how future code may derive initial lifecycle state and
transition intent from current bounded founder-request packet and summary-safe
signals before any implementation begins.

## B. Current Readiness Basis

The completed chain now includes:

- packet contract / guards
  - `projection/contracts/founder-request-exception-packet-contract.ts`
- projection adapter
  - `projection/adapters/founder-request-exception-packet-adapter.ts`
- posture derivation utility
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
- state-machine contract / guards
  - `projection/contracts/founder-request-exception-state-machine-contract.ts`
- pure transition reducer
  - `projection/contracts/founder-request-exception-state-machine-reducer.ts`

Why this permits derivation planning now:

- bounded packet posture is already contract-safe and regression-covered
- review/staging enrichments already surface lawful review-level and compact
  preview-level founder-request exception summaries
- display-safe evidence, omission, insufficiency, stale, learning, and
  non-executing recommendation semantics are already frozen
- aggregate posture already compresses bounded portfolio-level visibility
- state-machine contract and reducer already freeze downstream lifecycle shape
  and transition validation

Why this does not permit implementation in this wave:

- no packet-level derivation utility exists yet
- no initial-state derivation logic exists yet
- no transition-intent derivation logic exists yet
- this wave is planning-only by explicit boundary

## C. Derivation Purpose

Future packet-level state derivation exists to:

- convert bounded packet posture into initial lifecycle state
- convert evidence / omission / insufficiency / stale markers into state hints
- convert review / return posture into transition intent
- preserve non-executing lifecycle semantics
- prepare a future end-to-end business-loop closure audit

Future packet-level state derivation is not for:

- approval authority
- execution authority
- provider/channel dispatch
- policy mutation
- protocol certification
- autonomous completion

## D. Allowed Derivation Inputs

Future implementation may consume only:

- `FounderRequestExceptionPacketContract`
- derived bounded exception posture
- review / return posture class
- bounded action recommendation class
- evidence summary posture
- learning suggestion posture
- omission / insufficiency / stale markers
- six projection summary family statuses
- review packet enrichment summary
- staging preview enrichment summary
- portfolio aggregate posture
- state-machine contract / reducer outputs

Future implementation must not consume:

- raw runtime internals
- raw CGOS outputs
- raw trace dump
- raw VSL / PSG / drift / AEL / learning objects
- provider/channel results
- approve/reject/dispatch/execute state
- direct runtime-private identity

## E. Initial State Derivation Rules

Planning-level initial state derivation rules are:

- `blocked_by_contract` or explicit contract boundary posture
  - `-> state_contract_blocked`
- `stale_context` or explicit `stale` marker
  - `-> state_stale_context`
- `evidence_insufficient` or explicit `insufficient_evidence` marker
  - `-> state_evidence_insufficient`
- `activation_blocked`
  - `-> state_activation_blocked`
- `escalation_required`
  - `-> state_escalation_required`
- `confirm_required`
  - `-> state_confirm_required`
- `return_for_revision` or revision posture
  - `-> state_revision_needed`
- `impact_detected`
  - `-> state_impact_detected`
- `review_needed`
  - `-> state_review_needed`
- `monitor`
  - `-> state_monitoring`
- `no_exception`
  - `-> state_observed`

Chosen fallback rule:

- `no_exception` maps to `state_observed`, not `state_monitoring`, because the
  current lifecycle plan treats observation as the cleanest bounded intake
  state before any monitor-only elevation occurs

## F. Transition Intent Derivation Rules

Future implementation may derive bounded transition intent as follows:

- `stale` marker
  - `-> mark_stale_context`
- `insufficient_evidence` marker
  - `-> mark_evidence_insufficient`
- contract boundary / omitted-by-contract / not-available-upstream posture
  - `-> mark_contract_blocked`
- revision / return posture
  - `-> mark_revision_needed`
- review posture
  - `-> raise_review`
- impact posture
  - `-> surface_impact`
- activation blocked posture
  - `-> escalate_blocked_activation`
- confirm required posture
  - `-> surface_confirm_requirement`
- low-severity monitor posture
  - `-> start_monitoring`
- explicit closure without execution
  - `-> close_without_execution`
  - reducer-compatible terminal target remains `state_closed_without_execution`

Required rule:

- derived transition intent must still pass reducer validation and the allowed
  transition matrix
- derivation may not silently force an invalid transition through the reducer

## G. Derivation Priority

Deterministic derivation priority is:

1. `state_contract_blocked`
2. `state_stale_context`
3. `state_evidence_insufficient`
4. `state_activation_blocked`
5. `state_escalation_required`
6. `state_confirm_required`
7. `state_revision_needed`
8. `state_impact_detected`
9. `state_review_needed`
10. `state_monitoring`
11. `state_observed`

Relationship to existing priorities:

- this is a packet-level derivation priority, not a portfolio aggregate
  priority
- it stays aligned with existing posture and aggregate ordering by preserving
  contract-blocked, stale, and insufficiency as dominant bounded truths
- it differs intentionally from reducer transition order because derivation
  decides initial state and transition hint, while the reducer decides whether
  a requested transition is lawful

## H. Future Implementation Wave Boundaries

Expected next wave:

- `Packet-level state derivation implementation`

That future code wave must:

- add pure derivation utility only
- import packet contract, posture contract, state-machine contract, and reducer
  only if needed
- not change adapter
- not change assembly
- not change app/page
- not change portfolio shell
- not introduce queue behavior
- not introduce direct-control semantics

## I. Required Tests For Future Implementation

Future implementation must test:

- packet posture to initial state
- marker to initial state
- transition intent derivation
- priority ordering
- stale beats fresh
- insufficiency beats confidence
- contract-blocked remains blocked
- reducer rejects invalid derived transitions
- close-without-execution intent reaches `state_closed_without_execution` without execution semantics
- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime/private imports
- existing contract / reducer / packet / adapter / assembly / display /
  portfolio tests remain green

## J. First Code Wave DoD

Expected first code wave:

- `Packet-level state derivation implementation`

Definition of Done:

- pure derivation utility exists
- deterministic initial state derivation exists
- deterministic transition intent derivation exists
- reducer-compatible output exists
- negative tests cover forbidden labels and forbidden imports
- no adapter changes
- no assembly changes
- no app/page changes
- no founder queue
- no direct-control labels

## K. Boundary Conclusion

Selected readiness value:

`PACKET_STATE_DERIVATION_PLAN_READY_FOR_IMPLEMENTATION`

Evidence supports this choice because:

- packet posture, review/staging summaries, display-safe markers, aggregate
  posture, state-machine contract, and reducer are all already frozen and
  tested
- the next smallest coherent step is a pure derivation utility above those
  bounded inputs and below any assembly integration
