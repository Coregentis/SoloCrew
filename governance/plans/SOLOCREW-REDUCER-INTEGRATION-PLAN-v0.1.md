# SOLOCREW-REDUCER-INTEGRATION-PLAN-v0.1

## A. Purpose

This document plans future integration between packet-level state derivation
and the pure transition reducer in SoloCrew.

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

This plan freezes how future code may combine derivation truth with reducer
truth before any reducer integration implementation begins.

## B. Current Readiness Basis

The completed readiness chain now includes:

- state-machine contract / guards
  - `projection/contracts/founder-request-exception-state-machine-contract.ts`
- pure transition reducer
  - `projection/contracts/founder-request-exception-state-machine-reducer.ts`
- packet-level state derivation utility
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
- packet-level state derivation closure audit
  - `governance/audits/SOLOCREW-PACKET-LEVEL-STATE-DERIVATION-CLOSURE-AUDIT-v0.1.md`
- packet contract / adapter / posture derivation
  - `projection/contracts/founder-request-exception-packet-contract.ts`
  - `projection/adapters/founder-request-exception-packet-adapter.ts`
  - `projection/contracts/founder-request-exception-posture-derivation.ts`
- review/staging assembly enrichment
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
- display hardening
  - `app/pages/secretary-handoff-review-page.ts`
  - `app/pages/secretary-handoff-page.ts`
- portfolio aggregate posture
  - `projection/assembly/portfolio-secretary-shell.ts`
  - `projection/contracts/portfolio-secretary-shell-contract.ts`

Why this permits reducer integration planning now:

- reducer vocabulary, allowed matrix, forbidden targets, and terminal state are
  already frozen
- packet-level derivation already emits bounded `initial_state`,
  `transition_event`, `reducer_target_state`, marker reasoning, and
  `reducer_compatible`
- derivation closure audit already documents true scope, mappings, priority,
  and remaining gaps
- current packet, review/staging, display, and portfolio lanes are already
  regression-covered and can serve as read-only downstream context

Why this does not permit implementation in this wave:

- no combined reducer-backed evaluation result exists yet
- no pure integration utility exists yet
- no accepted / blocked / forbidden / terminal integration truth exists yet
- this wave is planning-only by explicit boundary

## C. Integration Purpose

Future reducer integration exists to:

- combine derived initial state and transition intent with reducer truth
- produce a bounded state evaluation result
- distinguish accepted transition, blocked transition, forbidden transition,
  and terminal non-executing closure
- preserve packet-level derivation reasoning
- prepare future packet/review/staging/portfolio consumption without wiring it
  yet

Future reducer integration is not for:

- approval authority
- execution authority
- provider/channel dispatch
- policy mutation
- protocol certification
- autonomous completion
- founder queue behavior

## D. Allowed Integration Inputs

Future implementation may consume only:

- packet-level state derivation result
- state-machine contract vocabulary
- reducer transition result
- packet contract identity / safe packet summary
- reducer event-target map
- bounded source markers / notes

Future implementation must not consume:

- raw runtime internals
- raw CGOS outputs
- raw trace dump
- raw VSL / PSG / drift / AEL / learning objects
- provider/channel results
- approve/reject/dispatch/execute state
- adapter internals
- assembly internals
- app/page view models
- founder queue state

## E. Planned Integration Output

Future reducer integration should emit a bounded state evaluation result with
fields such as:

- `evaluation_id`
- `initial_state`
- `transition_event`
- `requested_next_state`
- `reducer_target_state`
- `transition_accepted`
- `final_state`
- `blocked_reason`
- `terminal`
- `non_executing`
- `source_posture`
- `source_markers`
- `notes`

This output must remain:

- reducer-backed
- derivation-traceable
- non-executing
- summary-safe
- not a workflow command
- not a queue item
- not a UI DTO yet

## F. Integration Rules

Planning-level reducer integration rules are:

- derivation result supplies the bounded `initial_state` and
  `transition_event`
- reducer remains source of truth for allowed versus blocked transition truth
- integration cannot override reducer rejection
- integration cannot coerce an invalid transition into an allowed transition
- terminal `state_closed_without_execution` cannot reopen
- blocked transition remains blocked and must not be silently downgraded
- forbidden transition remains forbidden
- accepted transition may produce a bounded `final_state` but not action
  authority
- integration output cannot imply approval, rejection, dispatch, execution,
  provider/channel behavior, policy mutation, or protocol certification

## G. Future Implementation Wave Boundaries

Expected next wave:

- `Reducer integration implementation`

That future code wave must:

- add pure integration utility only
- import derivation utility and reducer only
- not change derivation utility
- not change reducer
- not change adapter
- not change assembly
- not change app/page
- not change portfolio shell
- not introduce queue behavior
- not introduce direct-control semantics

## H. Required Tests For Future Implementation

Future implementation must test:

- accepted derived transition produces final state
- blocked derived transition remains blocked
- forbidden transition remains forbidden
- terminal state cannot reopen
- integration does not coerce invalid transition
- integration preserves source posture / marker notes
- integration output is non-executing
- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime/private imports
- no adapter/assembly/app/page imports
- existing contract / reducer / derivation / packet / adapter / assembly /
  display / portfolio tests remain green

## I. First Code Wave DoD

Expected first code wave:

- `Reducer integration implementation`

Definition of Done:

- pure integration utility exists
- reducer-backed final state evaluation exists
- accepted / blocked / forbidden / terminal result handling exists
- source marker preservation exists
- non-executing output exists
- negative tests cover forbidden labels and forbidden imports
- no reducer changes
- no derivation changes
- no adapter / assembly / app/page changes
- no founder queue
- no direct-control labels

## J. Boundary Conclusion

Selected readiness value:

`REDUCER_INTEGRATION_PLAN_READY_FOR_IMPLEMENTATION`

This choice is supported because:

- reducer contract truth is already frozen
- packet-level derivation truth is already implemented and closed
- current integration need is narrow and can remain pure
- the forbidden boundary is already regression-covered

This choice does not mean reducer integration is already implemented.
