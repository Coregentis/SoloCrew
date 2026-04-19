# SOLOCREW-PACKET-REVIEW-STAGING-STATE-EXPOSURE-PLAN-v0.1

## A. Purpose

This document plans future safe exposure of reducer-backed state evaluation
output into packet, review packet, and staging product lanes in SoloCrew.

It is:

- plan only
- no implementation in this wave
- no adapter changes
- no assembly changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan freezes how bounded state-evaluation truth may be exposed without
changing reducer semantics, derivation semantics, or downstream product
surfaces in this wave.

## B. Current Readiness Basis

The completed readiness chain now includes:

- state-machine contract / guards
  - `projection/contracts/founder-request-exception-state-machine-contract.ts`
- pure reducer
  - `projection/contracts/founder-request-exception-state-machine-reducer.ts`
- packet-level state derivation utility
  - `projection/contracts/founder-request-exception-packet-state-derivation.ts`
- reducer-backed state evaluation utility
  - `projection/contracts/founder-request-exception-state-evaluation.ts`
- reducer integration closure audit
  - `governance/audits/SOLOCREW-REDUCER-INTEGRATION-CLOSURE-AUDIT-v0.1.md`
- packet contract / adapter / posture derivation
  - `projection/contracts/founder-request-exception-packet-contract.ts`
  - `projection/adapters/founder-request-exception-packet-adapter.ts`
  - `projection/contracts/founder-request-exception-posture-derivation.ts`
- review/staging enrichment
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
- display hardening
  - `app/pages/secretary-handoff-review-page.ts`
  - `app/pages/secretary-handoff-page.ts`
- portfolio aggregate posture
  - `projection/assembly/portfolio-secretary-shell.ts`
  - `projection/contracts/portfolio-secretary-shell-contract.ts`

Why this permits exposure planning now:

- reducer-backed evaluation truth is already implemented and closed
- accepted / blocked / forbidden / terminal behavior is already regression
  covered
- packet, review, and staging lanes already carry bounded founder-request
  summaries and can be treated as read-only downstream targets
- current display hardening already enforces non-executing, summary-safe, and
  no-direct-control semantics

Why this does not permit implementation in this wave:

- no exposure fields have been wired into packet/review/staging lanes yet
- no downstream contract additions have been frozen yet
- this wave is planning-only by explicit boundary

## C. Exposure Purpose

Future state exposure exists to:

- make state evaluation visible in packet/review/staging product lanes
- preserve reducer-backed transition truth
- preserve derivation traceability
- distinguish accepted / blocked / forbidden / terminal state evaluation
- prevent `transition_accepted` from being read as founder approval
- prevent terminal state from being read as execution completion
- prepare future end-to-end business-loop closure audit

Future state exposure is not for:

- workflow command
- queue item
- UI DTO finalization
- approval authority
- execution authority
- provider/channel dispatch
- policy mutation
- protocol certification
- autonomous completion

## D. Allowed Exposure Fields

Future implementation may expose only these bounded fields:

### 1. `evaluation_id`

- allowed packet-level interpretation:
  - bounded evaluation reference only
- allowed review-level interpretation:
  - review-visible trace handle for state evaluation only
- allowed staging-level interpretation:
  - compact preview reference only when needed
- forbidden interpretation:
  - workflow id, queue id, or execution id

### 2. `initial_state`

- allowed packet-level interpretation:
  - bounded lifecycle intake state
- allowed review-level interpretation:
  - starting state used for state evaluation explanation
- allowed staging-level interpretation:
  - compact preview of bounded lifecycle start only
- forbidden interpretation:
  - execution status or approval status

### 3. `transition_event`

- allowed packet-level interpretation:
  - bounded transition intent label
- allowed review-level interpretation:
  - state-evaluation reasoning input
- allowed staging-level interpretation:
  - compact state-intent hint only
- forbidden interpretation:
  - command, dispatch action, or executable instruction

### 4. `requested_next_state`

- allowed packet-level interpretation:
  - bounded target requested by state evaluation input
- allowed review-level interpretation:
  - reducer-evaluation requested target for explanation
- allowed staging-level interpretation:
  - compact target hint only when needed
- forbidden interpretation:
  - promised final outcome or execution commitment

### 5. `reducer_target_state`

- allowed packet-level interpretation:
  - reducer-mapped target state inside bounded vocabulary
- allowed review-level interpretation:
  - reducer-backed target reference
- allowed staging-level interpretation:
  - compact reducer-target hint only
- forbidden interpretation:
  - direct-control destination or operational completion

### 6. `transition_accepted`

- allowed packet-level interpretation:
  - reducer transition accepted
- allowed review-level interpretation:
  - state evaluation accepted inside reducer truth
- allowed staging-level interpretation:
  - compact accepted/not-accepted state evaluation indicator
- forbidden interpretation:
  - founder approval, business approval, or execution approval

### 7. `final_state`

- allowed packet-level interpretation:
  - bounded final state returned by evaluation
- allowed review-level interpretation:
  - reducer-backed resulting state
- allowed staging-level interpretation:
  - compact resulting state preview only
- forbidden interpretation:
  - completed execution, delivered work, or dispatched work

### 8. `blocked_reason`

- allowed packet-level interpretation:
  - bounded transition blocked reason
- allowed review-level interpretation:
  - review-visible explanation of why state transition was blocked
- allowed staging-level interpretation:
  - compact blocked hint only when materially needed
- forbidden interpretation:
  - task failure, human blame, or runtime failure root cause

### 9. `terminal`

- allowed packet-level interpretation:
  - bounded state line is terminal
- allowed review-level interpretation:
  - state evaluation reached non-reopenable bounded terminality
- allowed staging-level interpretation:
  - compact terminal flag only
- forbidden interpretation:
  - execution complete, delivery complete, or business-loop complete

### 10. `non_executing`

- allowed packet-level interpretation:
  - explicit non-executing boundary
- allowed review-level interpretation:
  - visible reminder that evaluation is not authority or execution
- allowed staging-level interpretation:
  - compact non-executing hint or inferable non-executing notice
- forbidden interpretation:
  - optional metadata that can be dropped when convenient

### 11. `source_posture`

- allowed packet-level interpretation:
  - bounded derivation source posture
- allowed review-level interpretation:
  - review-visible derivation trace anchor
- allowed staging-level interpretation:
  - compact posture provenance hint only
- forbidden interpretation:
  - raw runtime posture or execution authority

### 12. `source_markers`

- allowed packet-level interpretation:
  - bounded summary-safe markers behind evaluation
- allowed review-level interpretation:
  - review-visible evidence/omission/stale trace markers
- allowed staging-level interpretation:
  - compact marker subset only
- forbidden interpretation:
  - raw trace dump or raw runtime payload

### 13. `notes`

- allowed packet-level interpretation:
  - bounded summary-safe explanation notes
- allowed review-level interpretation:
  - review-visible explanation of reducer-backed evaluation
- allowed staging-level interpretation:
  - compact note subset only
- forbidden interpretation:
  - raw trace dump, raw runtime detail, or hidden command channel

## E. Forbidden Exposure Fields / Labels

Future implementation must not expose or imply:

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

## F. Exposure Target Lanes

### 1. `packet_state_exposure`

- contract-level summary exposure only
- no UI semantics
- no command semantics
- may carry bounded evaluation fields inside packet-safe vocabulary only

### 2. `review_packet_state_exposure`

- review-level explanation lane
- accepted / blocked / terminal must be framed as state evaluation only
- may be more detailed than staging
- no approval semantics

### 3. `staging_state_exposure`

- compact preview only
- no duplication of full review detail
- no terminal-as-completion semantics
- must stay concise and summary-safe

## G. Exposure Rules

Planning-level exposure rules are:

- `transition_accepted` means reducer transition accepted, not founder approval
- `blocked_reason` means state transition blocked, not task failure
- `terminal` means bounded state line terminal, not execution complete
- `non_executing` must always remain visible or inferable
- `source_markers` must remain summary-safe
- `notes` must not become raw trace dump
- review exposure may be more detailed than staging exposure
- staging exposure must remain compact
- packet exposure must remain contract-safe
- exposure must not backwrite into reducer, derivation, adapter, or assembly
  semantics

## H. Future Implementation Wave Boundaries

Expected next wave:

- `Packet/review/staging state exposure implementation`

That future code wave must:

- add bounded exposure fields to packet/review/staging contracts or assembly
  only where necessary
- not change reducer
- not change derivation
- not change state evaluation logic
- not change app/page behavior
- not introduce queue behavior
- not introduce direct-control semantics
- keep all exposure non-executing and summary-safe

## I. Required Tests For Future Implementation

Future implementation must test:

- packet exposure includes reducer-backed evaluation fields
- review packet exposure explains accepted / blocked / terminal safely
- staging exposure remains compact
- `transition_accepted` is not rendered or labeled as founder approval
- terminal is not rendered or labeled as execution completion
- forbidden labels remain absent
- `non_executing` remains present or inferable
- no raw trace / raw runtime
- no provider/channel
- no approve/reject/dispatch/execute
- existing reducer / derivation / packet / adapter / assembly / display /
  portfolio tests remain green

## J. First Code Wave DoD

Expected first code wave:

- `Packet/review/staging state exposure implementation`

Definition of Done:

- bounded exposure contract fields exist
- no reducer changes
- no derivation changes
- no adapter changes unless strictly necessary and justified
- no app/page changes
- no queue item shape
- no command shape
- negative tests for forbidden labels exist
- regression tests for review/staging behavior remain green

## K. Boundary Conclusion

Selected readiness value:

`STATE_EXPOSURE_PLAN_READY_FOR_IMPLEMENTATION`

This choice is supported because:

- reducer-backed evaluation truth is already implemented and closed
- exposure needs are now narrow and bounded to existing packet/review/staging
  lanes
- allowed fields, forbidden labels, and lane-specific interpretation rules can
  now be frozen without widening semantics
- the main remaining work is bounded exposure wiring, not contract or reducer
  repair

This choice does not mean packet/review/staging state exposure is already
implemented.
