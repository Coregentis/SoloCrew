# SOLOCREW-STATE-EXPOSURE-CLOSURE-AUDIT-v0.1

## A. Purpose

This document closes the current packet / review / staging state exposure
implementation before broader business-loop closure or any downstream
expansion.

It is:

- audit only
- no new behavior
- no reducer changes
- no derivation changes
- no state-evaluation logic changes
- no adapter changes
- no assembly behavior changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This audit freezes what the current bounded state exposure truthfully does, how
its packet/review/staging lanes differ, which semantics remain forbidden, and
whether the current exposure baseline is ready for broader end-to-end business
loop closure assessment.

## B. Scope

This closure covers exactly these slices:

- packet state exposure contract
- review packet state exposure contract
- review packet state exposure assembly
- staging state exposure contract
- staging state exposure assembly
- exposure field interpretation
- compact-vs-detailed lane boundary
- forbidden label / forbidden import boundaries
- projection regression tests
- upstream reducer / derivation / state-evaluation regression tests
- app/page regression tests

This document does not close app/page state rendering, portfolio shell state
exposure, founder queue semantics, or end-to-end business-loop closure itself.

## C. Closure Matrix

### 1. Packet state exposure contract

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-contract.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
- what it now does:
  - allows optional `state_evaluation_exposure`
  - freezes `packet_state_exposure` as contract-level summary only
  - accepts bounded reducer-backed evaluation fields only
- what it explicitly does not do:
  - no UI semantics
  - no command semantics
  - no queue semantics
  - no approval or execution semantics
- forbidden boundary:
  - no `queue_item`
  - no `command`
  - no `completed_by_execution`
  - no `delivery_status`
- open follow-ups:
  - later downstream consumers may read this field, but may not widen its
    meaning

### 2. Review packet state exposure contract

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/contracts/secretary-handoff-review-packet-contract.ts`
- owning tests:
  - `tests/projection/secretary-handoff-review-packet.test.ts`
- what it now does:
  - freezes `review_packet_state_exposure` inside
    `founder_request_exception_enrichment.state_evaluation_exposure`
  - allows full bounded evaluation field visibility in the review lane
- what it explicitly does not do:
  - no approval semantics
  - no execution semantics
  - no provider/channel semantics
- forbidden boundary:
  - review visibility does not create founder approval authority
- open follow-ups:
  - later page-level rendering may choose how to display this safely without
    mutating the contract

### 3. Review packet state exposure assembly

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/assembly/secretary-handoff-review-packet.ts`
- owning tests:
  - `tests/projection/secretary-handoff-review-packet.test.ts`
- what it now does:
  - maps a reducer-backed state evaluation result into full
    `review_packet_state_exposure`
  - falls back to packet-carried `state_evaluation_exposure` when explicit
    state evaluation input is absent
  - preserves `transition_accepted`, `blocked_reason`, `terminal`,
    `non_executing`, `source_markers`, and `notes`
- what it explicitly does not do:
  - no reducer recomputation
  - no derivation recomputation
  - no app/page rendering behavior
- forbidden boundary:
  - review assembly may expose evaluation truth, but not reinterpret it as
    command or approval
- open follow-ups:
  - later downstream rendering may present this review exposure, but must keep
    it non-executing and summary-safe

### 4. Staging state exposure contract

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/contracts/secretary-handoff-staging-contract.ts`
- owning tests:
  - `tests/projection/secretary-handoff-staging.test.ts`
- what it now does:
  - freezes `staging_state_exposure` inside
    `founder_request_exception_preview.state_evaluation_exposure`
  - allows compact preview fields only
- what it explicitly does not do:
  - no full review detail duplication
  - no execution-complete semantics
  - no raw runtime / raw trace detail
- forbidden boundary:
  - compact preview must remain bounded preview only
- open follow-ups:
  - later downstream surfaces may consume this preview, but may not widen it
    into full review detail

### 5. Staging state exposure assembly

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/assembly/secretary-handoff-staging.ts`
- owning tests:
  - `tests/projection/secretary-handoff-staging.test.ts`
- what it now does:
  - maps a reducer-backed state evaluation result into compact
    `staging_state_exposure`
  - falls back to packet-carried `state_evaluation_exposure` when explicit
    state evaluation input is absent
  - trims `source_markers` and `notes` to compact staging-safe subsets
  - omits `requested_next_state` and `reducer_target_state`
- what it explicitly does not do:
  - no full review explanation
  - no reducer recomputation
  - no app/page behavior changes
- forbidden boundary:
  - staging preview may not become terminal-as-completion or a workflow signal
- open follow-ups:
  - later page-level rendering may surface this compact preview, but must keep
    the compact boundary intact

### 6. Exposure field interpretation

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-contract.ts`
  - `projection/contracts/secretary-handoff-review-packet-contract.ts`
  - `projection/contracts/secretary-handoff-staging-contract.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
- what it now does:
  - preserves `evaluation_id`, `initial_state`, `transition_event`,
    `requested_next_state`, `reducer_target_state`, `transition_accepted`,
    `final_state`, `blocked_reason`, `terminal`, `non_executing`,
    `source_posture`, `source_markers`, and `notes` inside bounded projection
    semantics
  - keeps `transition_accepted` as reducer transition truth, not founder
    approval
  - keeps `blocked_reason` as state-transition blocked reason, not task failure
    verdict
  - keeps `terminal` as bounded state-line terminality, not execution complete
- what it explicitly does not do:
  - no raw trace dump
  - no raw runtime detail
  - no delivery or execution authority
- forbidden boundary:
  - notes remain bounded explanation only
- open follow-ups:
  - later end-to-end closure can assess whether these meanings stay stable
    across the whole business loop

### 7. Compact-vs-detailed lane boundary

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-contract.ts`
  - `projection/contracts/secretary-handoff-review-packet-contract.ts`
  - `projection/contracts/secretary-handoff-staging-contract.ts`
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
- owning tests:
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
- what it now does:
  - keeps `packet_state_exposure` contract-level only
  - keeps `review_packet_state_exposure` as the detailed review explanation
    lane
  - keeps `staging_state_exposure` as the compact preview lane
- what it explicitly does not do:
  - no packet-to-UI semantics
  - no staging duplication of full review detail
  - no review-to-command widening
- forbidden boundary:
  - lane boundaries may not collapse into one undifferentiated exposure surface
- open follow-ups:
  - later downstream expansion can decide whether more surfaces are necessary,
    but must keep lane-specific boundaries

### 8. Forbidden label / forbidden import boundaries

- status:
  - `closed-exposure-first-pass`
- owning files:
  - `projection/contracts/founder-request-exception-packet-contract.ts`
  - `projection/contracts/secretary-handoff-review-packet-contract.ts`
  - `projection/contracts/secretary-handoff-staging-contract.ts`
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
- owning tests:
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
- what it now does:
  - blocks queue/command/delivery wording in packet-level state exposure
  - keeps review/staging exposure below approve/reject/dispatch/execute and
    provider/channel language
  - stays inside contract-safe projection imports only
- what it explicitly does not do:
  - no runtime/private import expansion
  - no Cognitive_OS import expansion
- forbidden boundary:
  - no approve/reject/dispatch/execute
  - no provider/channel execution
  - no `queue_item`
  - no `command`
- open follow-ups:
  - later downstream rendering tests must keep these forbidden boundaries
    intact

## D. Exposure Chain Assessment

The current chain now reads as follows:

- reducer-backed state evaluation produces a bounded evaluation result
- packet contract may carry packet-level `state_evaluation_exposure`
- review packet may carry full review-level `review_packet_state_exposure`
- staging may carry compact `staging_state_exposure`
- packet exposure remains contract-level
- review exposure remains explanation-level
- staging exposure remains compact preview-level
- output remains `non_executing` and summary-safe
- output is not consumed by app/page yet
- output is not consumed by portfolio shell yet

This means the current closure is truthful for projection/assembly exposure
lanes, but still stops short of page rendering, portfolio-shell reuse, or
broader business-loop completion claims.

## E. Field Boundary Assessment

The currently allowed exposed fields are:

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

Their frozen safe interpretation is:

- `transition_accepted` means reducer transition accepted, not founder approval
- `terminal` means bounded state-line terminality, not execution complete
- `blocked_reason` means state-transition blocked reason, not task failure
  verdict
- `non_executing` must remain visible or inferable
- `notes` are bounded explanation, not raw trace

## F. Lane Boundary Assessment

The lane-specific boundaries are now:

### 1. `packet_state_exposure`

- contract-level summary only
- no UI semantics
- no command semantics
- no queue semantics

### 2. `review_packet_state_exposure`

- detailed review-level explanation
- can carry full bounded fields
- no approval semantics
- no execution semantics

### 3. `staging_state_exposure`

- compact preview only
- no full review detail duplication
- no terminal-as-completion semantics
- no raw runtime / raw trace detail

## G. Forbidden Semantics Assessment

The following meanings remain explicitly blocked:

- `approved`
- `rejected`
- `dispatched`
- `executed`
- `provider_sent`
- `channel_published`
- `policy_mutated`
- `protocol_certified`
- `autonomous_decision_complete`
- `queue_item`
- `command`
- `completed_by_execution`
- `delivery_status`

These labels and meanings remain out of bounds for current packet/review/
staging exposure. Exposure is bounded visibility only, not workflow authority.

## H. Test Evidence

Current test evidence includes:

- state evaluation tests
  - `tests/projection/founder-request-exception-state-evaluation.test.ts`
- packet-state derivation tests
  - `tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- state-machine contract tests
  - `tests/projection/founder-request-exception-state-machine-contract.test.ts`
- state-machine reducer tests
  - `tests/projection/founder-request-exception-state-machine-reducer.test.ts`
- packet contract tests
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
- adapter tests
  - `tests/projection/founder-request-exception-packet-adapter.test.ts`
- posture derivation tests
  - `tests/projection/founder-request-exception-posture-derivation.test.ts`
- review packet tests
  - `tests/projection/secretary-handoff-review-packet.test.ts`
- staging tests
  - `tests/projection/secretary-handoff-staging.test.ts`
- portfolio shell tests
  - `tests/projection/portfolio-secretary-shell.test.ts`
- app page tests
  - `tests/app/secretary-handoff-review-page.test.ts`
  - `tests/app/secretary-handoff-page.test.ts`
- full npm test

The exposure-specific test evidence now proves:

- packet exposure accepts bounded state evaluation fields
- packet exposure rejects queue/command/delivery wording
- review packet exposure preserves reducer-backed accepted/blocked/terminal
  state evaluation safely
- review packet exposure keeps `transition_accepted` below approval semantics
- staging exposure remains compact and omits full review target detail
- staging exposure keeps terminal exposure below completion semantics
- upstream reducer / derivation / state-evaluation tests remain green
- app/page regression tests remain green without yet consuming exposed state

## I. Readiness Decision

Selected readiness value: `READY_FOR_END_TO_END_BUSINESS_LOOP_CLOSURE_AUDIT`.

This selection is supported because:

- packet/review/staging exposure is now implemented, regression-covered, and
  truthfully closed as `closed-exposure-first-pass`
- lane-specific boundaries are frozen and tested
- forbidden semantics remain blocked
- app/page and portfolio shell do not yet consume exposure, but that absence is
  already explicit and can be audited as a remaining gap rather than blocking
  end-to-end closure assessment
- broader end-to-end closure can now inspect the full bounded chain and decide
  whether any additional downstream exposure remains necessary

## J. Remaining Gaps

The following remain explicitly not implemented:

- no app/page state rendering changes
- no portfolio shell state exposure wiring
- no founder queue
- no direct-control behavior
- no approve/reject/dispatch/execute
- no provider/channel execution
- no end-to-end business-loop closure audit
- no Operational V1 closure

## K. Next Wave Recommendation

Recommended next wave: `SoloCrew end-to-end business-loop closure audit`.

Why:

- the bounded state-machine contract, reducer, packet derivation, reducer-backed
  evaluation, and packet/review/staging exposure chain are now all implemented
  and individually closed
- the next smallest truthful step is to audit the whole bounded business loop
  as it now exists
- that audit can still record missing portfolio/app consumption as explicit
  gaps without first forcing more downstream implementation
