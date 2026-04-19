# SOLOCREW-PACKET-LEVEL-STATE-DERIVATION-CLOSURE-AUDIT-v0.1

## A. Purpose

This document closes the current packet-level state derivation implementation
before any expansion into reducer integration or broader end-to-end
business-loop closure.

It is:

- audit only
- no new behavior
- no reducer changes in this wave
- no adapter changes
- no assembly changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This audit exists to freeze what the current packet-level state derivation
truthfully does, what it explicitly does not do, and which next-wave expansion
remains lawful.

## B. Scope

This closure covers exactly these slices:

- packet-level derivation utility
- initial state derivation rules
- transition intent derivation rules
- priority ordering
- reducer-compatible output shape
- non-executing boundary
- derivation tests
- upstream regression tests
- forbidden label / forbidden import boundaries

No reducer integration, adapter consumption, assembly consumption, or app/page
consumption is closed by this document.

## C. Closure Matrix

### 1. Packet-level derivation utility

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - derives deterministic packet-level `initial_state` from bounded packet
    posture and marker truth
  - derives deterministic packet-level `transition_event` from the same bounded
    packet-safe truth
  - emits `reducer_target_state`, `reducer_compatible`, `source_posture`,
    `source_markers`, and explanatory `notes`
  - preserves `non_executing: true` in all derivation output
  - supports explicit close-without-execution intent without widening into
    reducer execution or queue behavior
- what it explicitly does not do:
  - no reducer invocation
  - no reducer wiring
  - no adapter consumption
  - no assembly consumption
  - no app/page consumption
- forbidden boundary:
  - no raw runtime/private input
  - no approve/reject/dispatch/execute
  - no provider/channel execution
- open follow-ups:
  - later reducer integration may consume this utility only through a separate
    bounded planning and implementation sequence

### 2. Initial state derivation rules

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - freezes packet posture and marker mappings into bounded lifecycle states
  - preserves contract-blocked, stale, and insufficiency as dominant packet
    truths
  - preserves `state_observed` as the no-exception fallback intake state
  - preserves explicit non-executing terminal targeting through
    `state_closed_without_execution`
- what it explicitly does not do:
  - no reducer acceptance check
  - no lifecycle replay
  - no queue-state ownership
  - no direct-control semantics
- forbidden boundary:
  - no ad hoc downstream state invention
  - no authority upgrade from packet state
- open follow-ups:
  - later reducer integration planning must decide how derived initial state and
    transition intent should be composed lawfully

### 3. Transition intent derivation rules

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - freezes bounded marker/posture to transition-event mapping
  - preserves explicit close-without-execution intent
  - preserves contract boundary, stale, and insufficiency as dominant
    transition-intent sources
  - keeps no-exception fallback on `observe_signal`
- what it explicitly does not do:
  - no reducer transition attempt
  - no silent coercion through invalid transition paths
  - no provider/channel behavior
  - no execution behavior
- forbidden boundary:
  - no approve/reject/dispatch/execute transition labels
  - no provider/channel transition labels
- open follow-ups:
  - later reducer integration planning must define how blocked derived
    transitions are surfaced without widening semantics

### 4. Priority ordering

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
  - `governance/plans/SOLOCREW-PACKET-LEVEL-STATE-DERIVATION-PLAN-v0.1.md`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - freezes deterministic packet-level derivation priority
  - ensures contract-blocked dominates stale, insufficiency, and weaker packet
    posture
  - ensures stale dominates insufficiency and weaker review/monitor posture
  - ensures insufficiency dominates review-only posture
- what it explicitly does not do:
  - no reducer transition priority
  - no aggregate posture priority replacement
  - no decision authority
- forbidden boundary:
  - no collapsing high-severity bounded truth into monitor/observed by default
  - no treating derivation priority as action authority
- open follow-ups:
  - later reducer integration planning may reference this order as derivation
    priority only, not as decision authority

### 5. Reducer-compatible output shape

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
  - `projection/contracts/founder-request-exception-state-machine-reducer.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
  - `tests/projection/founder-request-exception-state-machine-reducer.test.ts`
- what it now does:
  - exposes `initial_state`, `transition_event`, and `reducer_target_state`
    inside bounded contract vocabulary
  - exposes `reducer_compatible: true` only as shape-level compatibility
  - keeps output aligned with the frozen reducer event-to-target map
  - keeps closure intent aligned with `state_closed_without_execution`
- what it explicitly does not do:
  - no reducer call
  - no accepted/blocked reducer result
  - no transition-matrix validation inside derivation output
  - no state replay
- forbidden boundary:
  - no silent claim that derived transitions are already accepted
  - no reducer side effects
- open follow-ups:
  - later reducer integration planning must keep shape compatibility distinct
    from accepted transition truth

### 6. Non-executing boundary

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - freezes `non_executing: true` in derivation output
  - freezes close-without-execution semantics as bounded terminal targeting
  - keeps packet-level state derivation below execution, queue, and delivery
    semantics
- what it explicitly does not do:
  - no founder queue behavior
  - no provider/channel handoff
  - no autonomous completion
  - no protocol certification
- forbidden boundary:
  - no approve/reject/dispatch/execute
  - no provider/channel execution
  - no policy mutation
- open follow-ups:
  - later reducer integration must preserve the same non-executing boundary

### 7. Derivation tests

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - proves contract-blocked, stale, insufficiency, activation-blocked,
    escalation, confirm, revision, impact, review, monitor, and no-exception
    mappings
  - proves explicit close-without-execution behavior
  - proves deterministic priority ordering
  - proves `reducer_compatible` and `non_executing` output shape
  - proves contract-only import boundaries
- what it explicitly does not do:
  - no reducer integration proof
  - no adapter/assembly/app consumption proof
  - no end-to-end business-loop proof
- forbidden boundary:
  - no weakening of bounded mapping assertions
  - no removal of forbidden-import checks
- open follow-ups:
  - later reducer integration work should extend these tests instead of
    replacing them

### 8. Upstream regression tests

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `tests/projection/founder-request-exception-state-machine-contract.test.ts`
  - `tests/projection/founder-request-exception-state-machine-reducer.test.ts`
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
  - `tests/projection/founder-request-exception-packet-adapter.test.ts`
  - `tests/projection/founder-request-exception-posture-derivation.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
  - `tests/projection/portfolio-secretary-shell.test.ts`
  - `tests/app/secretary-handoff-review-page.test.ts`
  - `tests/app/secretary-handoff-page.test.ts`
- owning tests:
  - the same files listed above
- what it now does:
  - proves the new derivation utility does not regress state-machine contract
    truth
  - proves the new derivation utility does not regress reducer truth
  - proves packet, adapter, posture, review, staging, display, and portfolio
    lanes remain green after derivation lands downstream
  - proves current downstream pages remain bounded and non-executing
- what it explicitly does not do:
  - no reducer integration proof
  - no end-to-end business-loop closure proof
  - no queue behavior proof
- forbidden boundary:
  - no regression into runtime/private imports
  - no regression into provider/channel or direct-control behavior
- open follow-ups:
  - future reducer integration should keep these tests as upstream safety gates

### 9. Forbidden label / forbidden import boundaries

- status:
  - `closed-derivation-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- what it now does:
  - keeps direct-control labels out of packet-level derivation output
  - keeps provider/channel labels out of packet-level derivation output
  - keeps runtime/private imports, adapter imports, assembly imports,
    app/page imports, and `Cognitive_OS` out of the derivation lane
  - keeps packet-level derivation below raw trace and raw runtime detail
- what it explicitly does not do:
  - no new enforcement framework beyond tests and source checks
  - no cross-repo import bridge
- forbidden boundary:
  - no approve/reject/dispatch/execute
  - no provider/channel execution
  - no `runtime/core`
  - no `runtime/in-memory`
  - no `Cognitive_OS`
- open follow-ups:
  - later reducer integration planning must preserve the same forbidden
    boundary

## D. Derivation Chain Assessment

The current derivation chain now works as follows:

- packet contract defines bounded packet shape
- packet adapter builds contract-safe packets
- posture derivation derives bounded exception posture
- state-machine contract defines bounded state/event vocabulary
- pure reducer defines deterministic transition semantics
- packet-level derivation maps packet posture and markers to initial state and
  transition intent
- output is reducer-compatible but not yet reducer-integrated
- output remains non-executing

This means the derivation lane is now a bounded, deterministic packet-to-state
visibility layer above current contract-safe packet truth.

It does not mean:

- reducer acceptance has been performed
- adapter or assembly now consumes packet-level derivation
- app/page now renders packet-level derivation
- founder queue semantics exist
- direct-control authority exists

## E. Initial State Mapping Assessment

The implemented packet-level initial state mappings are:

- `blocked_by_contract` or contract-boundary markers
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
- `return_for_revision`
  - `-> state_revision_needed`
- `impact_detected`
  - `-> state_impact_detected`
- `review_needed`
  - `-> state_review_needed`
- `monitor`
  - `-> state_monitoring`
- `no_exception`
  - `-> state_observed`
- explicit closure without execution
  - keeps reducer terminal targeting on `state_closed_without_execution`
    without changing initial-state derivation into execution semantics

## F. Transition Intent Mapping Assessment

The implemented packet-level transition intent mappings are:

- explicit closure without execution
  - `-> close_without_execution`
- contract boundary / omitted / not available upstream
  - `-> mark_contract_blocked`
- `stale`
  - `-> mark_stale_context`
- `insufficient_evidence`
  - `-> mark_evidence_insufficient`
- `activation_blocked` / `escalation_required`
  - `-> escalate_blocked_activation`
- `confirm_required`
  - `-> surface_confirm_requirement`
- `return_for_revision`
  - `-> mark_revision_needed`
- `impact_detected`
  - `-> surface_impact`
- `review_needed`
  - `-> raise_review`
- `monitor`
  - `-> start_monitoring`
- no-exception fallback
  - `-> observe_signal`

## G. Priority Order Assessment

The implemented derivation priority order is:

1. contract blocked
2. stale context
3. evidence insufficient
4. activation blocked
5. escalation required
6. confirm required
7. revision needed
8. impact detected
9. review needed
10. monitor
11. observed / no exception

This ordering is derivation priority only.

It is:

- bounded visibility ordering
- packet-level state derivation ordering
- not decision authority
- not reducer acceptance authority
- not queue authority

## H. Test Evidence

Current test evidence for this closure is:

- packet-state derivation tests:
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
  - verifies initial-state mapping, transition-intent mapping, priority
    ordering, reducer-compatible shape, non-executing posture, and source
    boundary checks
- state-machine contract tests:
  - `tests/projection/founder-request-exception-state-machine-contract.test.ts`
  - verifies bounded state/event vocabulary, allowed matrix, forbidden targets,
    and non-executing terminal state
- reducer tests:
  - `tests/projection/founder-request-exception-state-machine-reducer.test.ts`
  - verifies allowed transition handling, blocked handling, forbidden handling,
    event target mapping, and terminal-state behavior
- packet contract tests:
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
  - verifies bounded packet shape and forbidden-boundary rejection
- adapter tests:
  - `tests/projection/founder-request-exception-packet-adapter.test.ts`
  - verifies bounded adaptation and explicit omission/insufficiency/stale
    handling
- posture derivation tests:
  - `tests/projection/founder-request-exception-posture-derivation.test.ts`
  - verifies bounded posture derivation priority
- review packet tests:
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - verifies review-lane enrichment remains bounded
- staging tests:
  - `tests/projection/secretary-handoff-staging.test.ts`
  - verifies staging-lane preview remains bounded
- portfolio shell tests:
  - `tests/projection/portfolio-secretary-shell.test.ts`
  - verifies downstream aggregate posture remains bounded
- app page tests:
  - `tests/app/secretary-handoff-review-page.test.ts`
  - `tests/app/secretary-handoff-page.test.ts`
  - verifies current review/staging page-safe summaries remain bounded
- full npm test:
  - `npm test`
  - verifies the full projection and app test suite remains green with packet
    derivation landed

## I. Readiness Decision

Selected readiness value:

`READY_FOR_REDUCER_INTEGRATION_PLAN`

This choice is supported because:

- packet-level derivation is now implemented and regression-covered
- mapping and priority truth are now frozen in code and tests
- reducer compatibility shape is explicit
- forbidden boundaries remain green
- downstream adapter/assembly/app surfaces remain unaffected

This choice does not mean reducer integration is already implemented.

## J. Remaining Gaps

The following remain explicitly not implemented:

- no reducer integration wiring
- no adapter consumption
- no assembly consumption
- no app/page consumption
- no portfolio state summary consumption
- no founder queue
- no direct-control behavior
- no approve/reject/dispatch/execute
- no provider/channel execution
- no end-to-end business-loop closure audit
- no Operational V1 closure

## K. Next Wave Recommendation

Recommended next wave:

`SoloCrew reducer integration plan`

Reason:

- the derivation lane is now frozen, bounded, deterministic, and
  regression-covered
- the next lawful step is to plan how derived initial state and transition
  intent may be composed with reducer truth without widening semantics
- reducer integration still needs an explicit boundary before any adapter,
  assembly, portfolio, or app consumer can lawfully depend on it
