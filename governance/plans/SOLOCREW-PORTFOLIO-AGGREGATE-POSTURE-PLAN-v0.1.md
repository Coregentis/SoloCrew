# SOLOCREW-PORTFOLIO-AGGREGATE-POSTURE-PLAN-v0.1

## A. Purpose

This document freezes planning rules for future portfolio aggregate posture over
founder-request exception packet signals.

It is:

- plan only
- no implementation in this wave
- no app/page changes
- no UI changes
- no portfolio aggregate implementation
- no state-machine implementation
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan exists so future portfolio / Secretary shell aggregation can stay
bounded, summary-safe, omission-aware, and non-executing.

## B. Current Readiness Basis

The completed upstream/downstream chain now includes:

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
- review/staging display hardening
  - `app/pages/secretary-handoff-review-page.ts`
  - `app/pages/secretary-handoff-page.ts`
- display hardening closure audit
  - `governance/audits/SOLOCREW-DISPLAY-HARDENING-CLOSURE-AUDIT-v0.1.md`

Why this permits aggregate posture planning now:

- the founder-request packet lane is already contract-safe
- the review and staging lanes already compress evidence, omission,
  insufficiency, stale posture, suggestion-only learning, and non-executing
  recommendation into bounded downstream display-safe summaries
- display closure already proves those packet-level surfaces are lawful and
  regression-covered
- current portfolio shell assets already have bounded shelves for status,
  queue, review, and posture

Why this does not yet permit aggregate implementation by itself:

- no aggregate posture vocabulary has been frozen yet
- no mixed-packet aggregation rule set has been frozen yet
- no portfolio aggregate tests have been written yet
- current portfolio shelves remain generic non-executing shelves rather than
  founder-request-exception-aware aggregate posture surfaces

## C. Aggregate Posture Purpose

Portfolio aggregate posture is needed to:

- give the Secretary shell bounded visibility over active founder-request
  exception posture
- avoid forcing the founder/operator to inspect every packet manually before
  seeing whether review, stale, or blocked posture is accumulating
- summarize review/stale/evidence/impact posture without implying execution
- preserve exception-driven governance at the portfolio shell level
- prepare for later state-machine planning without jumping directly into
  implementation semantics

Aggregate posture is not meant to:

- replace packet-level review packet or staging surfaces
- become a founder queue implementation
- invent direct-control semantics
- collapse omission or uncertainty into confident completion

## D. Candidate Aggregate Posture Vocabulary

### 1. `portfolio_clear`

- meaning:
  - no currently aggregated founder-request exception posture justifies a
    portfolio-level warning beyond bounded normal observation
- allowed source postures:
  - `no_exception`
  - `monitor` where no stronger posture is present
- allowed display interpretation:
  - bounded observation only
- forbidden interpretation:
  - not operational completion
  - not execution readiness
- evidence / omission / stale handling:
  - must not hide stale, insufficiency, or omission to force a clear posture

### 2. `portfolio_monitor`

- meaning:
  - low-severity bounded exception posture exists and should remain visible
- allowed source postures:
  - `monitor`
  - low-severity mixed summary posture
- allowed display interpretation:
  - watchlist posture only
- forbidden interpretation:
  - not approval-ready
  - not execution-ready
- evidence / omission / stale handling:
  - omission and insufficiency remain explicit if present

### 3. `portfolio_review_needed`

- meaning:
  - aggregated packet posture indicates review visibility should surface at the
    portfolio shell
- allowed source postures:
  - `review_needed`
  - `return_for_revision`
  - review-heavy mixed packet set
- allowed display interpretation:
  - bounded review attention
- forbidden interpretation:
  - not decision completion
  - not approve/reject semantics
- evidence / omission / stale handling:
  - missing support must remain visible; review posture cannot erase it

### 4. `portfolio_evidence_insufficient`

- meaning:
  - aggregate posture is dominated by insufficient evidence or too-thin support
- allowed source postures:
  - `evidence_insufficient`
  - mixed posture with insufficiency dominating confidence
- allowed display interpretation:
  - explicit uncertainty at portfolio scope
- forbidden interpretation:
  - not confident review readiness
  - not hidden uncertainty
- evidence / omission / stale handling:
  - insufficient evidence must stay explicit and must not become confidence

### 5. `portfolio_stale_context`

- meaning:
  - aggregate posture is materially shaped by stale packet or continuity
    context
- allowed source postures:
  - `stale_context`
  - mixed posture with stale context dominating confidence
- allowed display interpretation:
  - explicit freshness warning at portfolio scope
- forbidden interpretation:
  - not current-state confidence
  - not stable/complete posture
- evidence / omission / stale handling:
  - stale must remain stale and must beat current confidence

### 6. `portfolio_impact_detected`

- meaning:
  - aggregate posture reflects meaningful drift/impact visibility across active
    founder-request exception packets
- allowed source postures:
  - `impact_detected`
  - impact-heavy mixed posture
- allowed display interpretation:
  - bounded impact attention only
- forbidden interpretation:
  - not conflict resolution
  - not rollback/compensation posture
- evidence / omission / stale handling:
  - impact without support must degrade into insufficiency or blocked posture

### 7. `portfolio_activation_blocked`

- meaning:
  - bounded activation-blocked posture is visible at the aggregate shell level
- allowed source postures:
  - `activation_blocked`
- allowed display interpretation:
  - blocked activation visibility only
- forbidden interpretation:
  - not dispatch failed
  - not execution failed
- evidence / omission / stale handling:
  - blocked posture must keep causal omission/insufficiency explicit

### 8. `portfolio_confirm_required`

- meaning:
  - aggregate posture indicates confirm-gated visibility remains outstanding
- allowed source postures:
  - `confirm_required`
- allowed display interpretation:
  - confirm-needed visibility only
- forbidden interpretation:
  - not pending approval queue
  - not authorization workflow
- evidence / omission / stale handling:
  - evidence and omission posture must remain visible alongside this aggregate

### 9. `portfolio_escalation_required`

- meaning:
  - aggregate posture indicates bounded escalation visibility is needed
- allowed source postures:
  - `escalation_required`
  - mixed posture with escalation dominating review-only posture
- allowed display interpretation:
  - escalation attention only
- forbidden interpretation:
  - not execution escalation
  - not provider/channel handoff
- evidence / omission / stale handling:
  - stale or insufficient support must not be hidden under escalation posture

### 10. `portfolio_revision_needed`

- meaning:
  - aggregate posture is dominated by revision-return visibility
- allowed source postures:
  - `return_for_revision`
  - review + revision mixed posture where revision is still the truthful top
    posture
- allowed display interpretation:
  - revision-loop attention only
- forbidden interpretation:
  - not rejection
  - not send-back authority
- evidence / omission / stale handling:
  - supporting insufficiency/stale posture remains visible, not collapsed

### 11. `portfolio_contract_blocked`

- meaning:
  - current aggregate posture is materially blocked by contract boundary
- allowed source postures:
  - `blocked_by_contract`
  - omission-heavy mixed posture that cannot truthfully render as clear or
    review-ready
- allowed display interpretation:
  - explicit blocked-by-contract visibility
- forbidden interpretation:
  - not hidden missingness
  - not portfolio-clear
- evidence / omission / stale handling:
  - contract-blocked remains blocked and must keep omission explicit

## E. Aggregation Input Boundaries

Future aggregate posture may consume only display-safe / assembly-safe
summaries, such as:

- staging preview posture
- review packet bounded posture
- evidence summary status
- omission markers
- insufficiency markers
- stale markers
- learning suggestion hint
- six-family status rollup

It must not consume:

- raw runtime internals
- raw CGOS outputs
- raw trace dump
- raw VSL / PSG / drift / AEL / learning objects
- provider/channel results
- approve/reject/dispatch/execute state
- raw founder-request packet source internals beyond the current assembly-safe
  summaries

Current reusable repo assets for future implementation are:

- `projection/assembly/portfolio-secretary-shell.ts`
- `projection/contracts/portfolio-secretary-shell-contract.ts`
- `tests/projection/portfolio-secretary-shell.test.ts`
- `app/pages/portfolio-secretary-page.ts`
- `tests/app/portfolio-secretary-page.test.ts`

Those assets may later host aggregate posture only through bounded summary
classes and non-executing shelf semantics.

## F. Aggregation Rules

The future implementation must follow these high-level planning rules:

- stale beats current confidence
- insufficient evidence beats confident aggregate
- contract-blocked remains blocked
- escalation_required must not become approved
- activation_blocked must not become dispatched
- review_needed remains review posture, not decision
- learning suggestion remains suggestion-only
- aggregate posture cannot claim operational completion
- aggregate posture must never silently hide omission / insufficiency / stale
- mixed packet posture must preserve the difference between compact staging
  preview and fuller review-packet summary

## G. Future Implementation Wave Boundaries

Expected future implementation wave after this plan may be:

- `Portfolio aggregate posture implementation`

That future implementation must:

- reuse existing portfolio Secretary shell assets
- consume only safe assembly/display summaries
- add no direct runtime imports
- add no provider/channel labels
- add no approve/reject/dispatch/execute labels
- keep aggregate posture non-executing
- not replace packet-level review/staging surfaces
- not become a founder queue implementation
- not claim Operational V1 completion

Likely first landing zones, if a later code wave is approved:

- `projection/assembly/portfolio-secretary-shell.ts`
- `projection/contracts/portfolio-secretary-shell-contract.ts`
- `tests/projection/portfolio-secretary-shell.test.ts`
- `app/pages/portfolio-secretary-page.ts`
- `tests/app/portfolio-secretary-page.test.ts`

## H. Required Tests For Future Implementation

Future tests must cover:

- aggregate posture from review-needed packet
- aggregate posture from evidence-insufficient packet
- aggregate posture from stale-context packet
- aggregate posture from contract-blocked packet
- mixed packet priority ordering
- forbidden labels absent
- no raw runtime imports
- no provider/channel execution
- no approve/reject/dispatch/execute
- existing portfolio shell tests remain green
- existing staging/review page tests remain green

## I. Stop / Rollback Conditions

Future implementation must stop or rollback if:

- it needs raw runtime internals
- it needs direct-control labels
- it hides stale / insufficiency / omission
- it collapses multiple packets into false `portfolio_clear`
- it implies founder queue implementation
- it implies execution or provider/channel delivery
- it weakens packet-level boundaries

## J. Boundary Conclusion

Selected readiness value:

- `PORTFOLIO_AGGREGATE_PLAN_READY_FOR_IMPLEMENTATION`

Why this readiness is lawful:

- the packet contract, adapter, posture derivation, assembly enrichments, and
  display hardening are all already frozen and regression-covered
- current portfolio shell assets already provide lawful non-executing shelf
  lanes where aggregate posture could later be placed
- the remaining work is now bounded implementation work rather than missing
  semantic planning

What this readiness does not mean:

- it does not authorize aggregate implementation in this wave
- it does not authorize app/page/UI changes in this wave
- it does not authorize founder queue semantics
- it does not authorize state-machine implementation
