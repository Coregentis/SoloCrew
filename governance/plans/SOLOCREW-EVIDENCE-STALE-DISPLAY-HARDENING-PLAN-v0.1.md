# SOLOCREW-EVIDENCE-STALE-DISPLAY-HARDENING-PLAN-v0.1

## A. Purpose

This document freezes evidence / stale display-hardening rules before any
app/page or UI implementation wave begins.

It is:

- plan only
- no app/page changes in this wave
- no UI changes
- no new behavior
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan exists so future page-level rendering does not silently convert
bounded summary truth into raw runtime/evidence implication, false confidence,
or hidden omission.

## B. Current Assembly Truth

Current assembly inputs now available for future display are:

- review packet enrichment
  - review-level founder-request exception enrichment can now carry:
    - bounded exception posture
    - review / return posture
    - bounded action recommendation
    - evidence summary
    - learning suggestion summary
    - omission / insufficiency / stale markers
    - six-family status summaries
- staging enrichment
  - compact founder-request exception preview can now carry:
    - bounded exception posture preview
    - review / return posture preview
    - compact evidence posture summary
    - learning suggestion hint
    - omission / insufficiency / stale markers
    - six-family status summaries
- evidence summary
  - review packet carries bounded evidence summary and may include bounded
    evidence refs in assembly space
  - staging carries bounded evidence posture summary only
- omission markers
  - omission is explicit through `omitted_by_contract`
- insufficiency markers
  - insufficiency is explicit through `insufficient_evidence`
- stale markers
  - stale is explicit through `stale`
- learning suggestion summary
  - remains suggestion-only in both contract and assembly lanes
- bounded action recommendation
  - remains non-executing in contract and review packet assembly
- bounded exception posture
  - remains frozen to the bounded posture vocabulary derived from the contract
    lane
- six-family status summaries
  - remain available as explicit family-by-family availability/status rollups

## C. Display Hardening Goals

Future display hardening must satisfy all of the following:

- evidence summary must remain summary, not raw trace dump
- omission must be visible, not silent
- insufficiency must remain uncertainty, not confidence
- stale must remain stale, not current
- learning suggestion must remain suggestion-only
- bounded action recommendation must remain non-executing
- exception posture must not imply approval, dispatch, execution,
  provider/channel behavior, policy mutation, protocol certification, or
  autonomous completion
- review-level and staging-level display must preserve the difference between
  compact preview and fuller review summary
- current assembly summaries must not be reinterpreted as runtime-complete
  reconstruction

## D. Display Vocabulary

This plan freezes display vocabulary categories only.
It does not freeze final UI copy.

### 1. `evidence_available`

- meaning:
  - bounded evidence summary is present and may be shown as summary-only support

### 2. `evidence_omitted_by_contract`

- meaning:
  - evidence detail is intentionally hidden by contract and must be labeled as
    omitted rather than silently absent

### 3. `evidence_insufficient`

- meaning:
  - upstream support exists but is too weak for confident interpretation and
    must remain uncertainty

### 4. `evidence_stale`

- meaning:
  - evidence posture is no longer fresh enough to be rendered as current

### 5. `upstream_not_available`

- meaning:
  - required upstream summary or support is not currently available and must
    not be fabricated locally

### 6. `not_applicable`

- meaning:
  - the current surface or packet lane does not require that display element

### 7. `learning_suggestion_only`

- meaning:
  - learning output is suggestion-only and must not be rendered as policy,
    rule, or automatically promoted truth

### 8. `non_executing_recommendation`

- meaning:
  - bounded action recommendation may be visible but remains preview/review
    posture only and must not imply action authority

### 9. `contract_blocked`

- meaning:
  - display must make clear that the relevant detail or interpretation is
    blocked by current contract boundary

### 10. `review_required`

- meaning:
  - bounded exception posture requires review framing, not execution behavior

### 11. `return_for_revision`

- meaning:
  - bounded exception posture requires revision loop framing, not rejection,
    dispatch, or execution behavior

## E. Surface Mapping

### 1. Handoff review packet page

- what may be shown:
  - bounded exception posture
  - review / return posture
  - evidence summary
  - bounded action recommendation as non-executing
  - learning suggestion as suggestion-only
  - omission / insufficiency / stale markers
  - six-family status summaries
- what must remain hidden:
  - raw trace dump
  - raw runtime/private identity
  - raw evidence ref internals beyond lawful bounded summary if later allowed
- what must be marked omitted / insufficient / stale:
  - any hidden evidence detail
  - any thin support posture
  - any stale support posture
- forbidden labels that must never appear:
  - approved
  - rejected
  - dispatched
  - executed
  - provider-sent
  - channel-published
  - policy-mutated
  - protocol-certified
  - autonomous-completion

### 2. Handoff staging page

- what may be shown:
  - bounded exception posture preview
  - review / return posture preview
  - compact evidence posture summary
  - learning suggestion hint
  - omission / insufficiency / stale markers
  - six-family status rollup
- what must remain hidden:
  - full review packet enrichment detail
  - raw evidence refs
  - raw runtime/private identity
- what must be marked omitted / insufficient / stale:
  - any missing family support
  - any evidence-thin posture
  - any stale preview support
- forbidden labels that must never appear:
  - approval, dispatch, execution, provider/channel result, policy mutation,
    protocol certification, autonomous completion

### 3. Rationale / evidence block

- what may be shown:
  - evidence summary
  - omission posture
  - insufficiency posture
  - stale posture
  - provenance posture
  - learning suggestion posture when explicitly present
- what must remain hidden:
  - raw trace dump
  - raw decision dump
  - raw runtime/private evidence internals
- what must be marked omitted / insufficient / stale:
  - every missing or weakened evidence support category
- forbidden labels that must never appear:
  - execution-complete, provider-sent, protocol-certified, policy-mutated,
    autonomous-decision-complete

### 4. Compact preview block

- what may be shown:
  - compact posture summary
  - compact evidence posture
  - compact marker state
  - suggestion-only learning hint
- what must remain hidden:
  - detailed evidence refs
  - raw graph/runtime detail
  - full review packet action recommendation detail if the surface is only
    preview-level
- what must be marked omitted / insufficient / stale:
  - all hidden or weak support categories
- forbidden labels that must never appear:
  - approval, dispatch, execution, provider/channel result

### 5. Future portfolio aggregate posture, if later allowed

- what may be shown:
  - only later aggregate counts or bounded aggregate posture indicators if a
    separate planning wave authorizes it
- what must remain hidden:
  - raw founder-request packet detail
  - raw evidence detail
  - raw runtime/private detail
- what must be marked omitted / insufficient / stale:
  - aggregate uncertainty and missing support must remain explicit
- forbidden labels that must never appear:
  - founder queue semantics, direct-control semantics, execution/posting
    authority

## F. Future Implementation Wave Boundaries

Expected future implementation wave:

- `Evidence / stale display hardening implementation`

That future wave must stay narrow:

- app/page rendering may only consume existing assembly output
- no raw runtime imports
- no raw evidence dumps
- no new state-machine behavior
- no direct-control labels
- no provider/channel labels
- no portfolio aggregate posture unless separately planned
- no silent reinterpretation of summary as raw truth

## G. Required Tests For Future Implementation

Future implementation must test all of the following:

- omission visible
- insufficiency visible
- stale visible
- evidence summary rendered without raw trace dump
- learning suggestion shown as suggestion-only
- bounded action recommendation shown as non-executing
- forbidden labels absent
- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime/private imports
- existing app/page regressions remain green

## H. Stop / Rollback Conditions

Future implementation must stop or rollback if:

- it needs raw runtime internals
- it needs raw trace dump
- it needs approval/dispatch/execution labels
- it needs provider/channel labels
- it hides omission / insufficiency / stale
- it turns learning suggestion into policy mutation
- it turns bounded recommendation into action authority
- it requires widening current contract or assembly truth without a separate
  governance wave

## I. Boundary Conclusion

Selected readiness value:

- `DISPLAY_HARDENING_PLAN_READY_FOR_IMPLEMENTATION`

Reasoning:

- current assembly truth already carries the required evidence / omission /
  insufficiency / stale / learning / non-executing recommendation posture
- the missing work is now display discipline, not upstream semantics
- review packet and staging assembly are both closed first-pass
- app/page regressions remain green and can act as bounded guard rails for the
  next implementation wave
