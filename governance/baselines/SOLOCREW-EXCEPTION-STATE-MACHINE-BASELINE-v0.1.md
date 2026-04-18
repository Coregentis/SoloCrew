# SOLOCREW-EXCEPTION-STATE-MACHINE-BASELINE-v0.1

## A. Purpose

This is a semantic baseline for future exception-plane state-machine
implementation in SoloCrew.

It is:

- baseline only
- no implementation
- no final DTO
- no UI
- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime authority
- no protocol authority

This document freezes only semantic posture, transition, evidence, omission,
and stale/insufficient handling rules.

## B. Authority And Dependency Chain

The governing chain is:

`MPLP Protocol -> Cognitive_OS Runtime -> SoloCrew Projection Contract -> SoloCrew Exception State-Machine Baseline -> SoloCrew Product Surface`

Under this chain:

- this baseline consumes only contract-defined projection families
- this baseline cannot consume raw runtime internals
- this baseline cannot redefine `Cognitive_OS` runtime semantics
- this baseline cannot redefine MPLP protocol semantics

Practical boundary rule:

- upstream runtime summaries remain upstream truth
- SoloCrew may only compress those summaries into bounded downstream exception
  posture
- downstream posture must not be read as execution authority

## C. Input Family Dependencies

This baseline depends only on these six projection summary families:

- `continuity_projection_summary`
- `semantic_relation_projection_summary`
- `drift_impact_projection_summary`
- `activation_projection_summary`
- `confirm_trace_decision_projection_summary`
- `learning_suggestion_projection_summary`

### 1. `continuity_projection_summary`

- may influence:
  - `monitor`
  - `stale_context`
  - `evidence_insufficient`
- cannot decide alone:
  - `confirm_required`
  - `activation_blocked`
  - `return_for_revision`
  - `escalation_required`
- required omission / insufficiency handling:
  - omitted continuity detail must remain `omitted_by_contract`
  - weak continuity support must remain `insufficient_evidence`
  - stale continuity posture must remain explicitly `stale`
- required evidence posture:
  - continuity may be summary-only and may legitimately have no evidence refs

### 2. `semantic_relation_projection_summary`

- may influence:
  - `monitor`
  - `impact_detected`
  - `review_needed`
  - `evidence_insufficient`
- cannot decide alone:
  - `confirm_required`
  - `activation_blocked`
  - `return_for_revision`
- required omission / insufficiency handling:
  - omitted relation detail must remain `omitted_by_contract`
  - weak relation support must remain `insufficient_evidence`
- required evidence posture:
  - evidence refs may surface only as bounded summary-safe refs where allowed

### 3. `drift_impact_projection_summary`

- may influence:
  - `impact_detected`
  - `review_needed`
  - `return_for_revision`
  - `evidence_insufficient`
- cannot decide alone:
  - `confirm_required`
  - `activation_blocked`
  - `escalation_required`
  - any approval/execution posture
- required omission / insufficiency handling:
  - hidden affected/baseline/evidence detail must stay explicit
  - weak impact support must remain `insufficient_evidence`
  - stale impact input must remain `stale`
- required evidence posture:
  - bounded supporting evidence posture is required when impact is asserted

### 4. `activation_projection_summary`

- may influence:
  - `activation_blocked`
  - `confirm_required`
  - `escalation_required`
  - `review_needed`
- cannot decide alone:
  - `return_for_revision`
  - final business-loop choice
  - any approve/reject/dispatch/execute posture
- required omission / insufficiency handling:
  - hidden activation detail must remain `omitted_by_contract`
  - unresolved activation support must remain `insufficient_evidence` or
    `not_available_upstream`
- required evidence posture:
  - bounded activation evidence posture is required when suppression or
    escalation posture is surfaced

### 5. `confirm_trace_decision_projection_summary`

- may influence:
  - `confirm_required`
  - `review_needed`
  - `evidence_insufficient`
  - `blocked_by_contract`
- cannot decide alone:
  - `activation_blocked`
  - `return_for_revision`
  - any approval/execution posture
- required omission / insufficiency handling:
  - omitted confirm/trace/decision detail must remain explicit
  - thin evidence must remain `insufficient_evidence`
- required evidence posture:
  - evidence summary is required for confirm/evidence-driven posture
  - evidence summary is not a raw trace dump

### 6. `learning_suggestion_projection_summary`

- may influence:
  - `monitor`
  - `review_needed`
  - `evidence_insufficient`
- cannot decide alone:
  - `confirm_required`
  - `activation_blocked`
  - `return_for_revision`
  - any policy-mutation or execution posture
- required omission / insufficiency handling:
  - hidden source detail must remain `omitted_by_contract`
  - low-confidence suggestion posture must remain `insufficient_evidence`
- required evidence posture:
  - bounded source evidence posture is required when learning suggestion
    posture is shown

## D. Exception Posture Vocabulary

### `no_exception`

- meaning:
  - no contracted summary currently justifies exception posture
- allowed upstream causes:
  - available bounded summary families with no meaningful issue surfaced
- allowed downstream interpretation:
  - continue bounded observation only
- forbidden interpretation:
  - no hidden approval or execution authority
- required evidence/omission condition:
  - omission or insufficiency must not be hidden inside this posture

### `monitor`

- meaning:
  - a bounded signal exists but does not yet justify review or blocking
- allowed upstream causes:
  - low-severity continuity, relation, or learning posture
- allowed downstream interpretation:
  - keep visible observation posture
- forbidden interpretation:
  - do not treat as decision-ready or execution-ready
- required evidence/omission condition:
  - must preserve omission and insufficiency markers if present

### `review_needed`

- meaning:
  - bounded summary posture indicates downstream review is required
- allowed upstream causes:
  - meaningful impact posture
  - explicit confirm/evidence posture
  - mixed posture from multiple families
- allowed downstream interpretation:
  - bounded review framing only
- forbidden interpretation:
  - not approval, not dispatch, not execution
- required evidence/omission condition:
  - must preserve evidence posture and omission posture

### `evidence_insufficient`

- meaning:
  - upstream summaries do not justify confident downstream interpretation
- allowed upstream causes:
  - `insufficient_evidence`
  - weak relation support
  - thin confirm/trace support
  - low-confidence learning posture
- allowed downstream interpretation:
  - explicit insufficiency warning posture
- forbidden interpretation:
  - do not silently upgrade to confident review or impact claims
- required evidence/omission condition:
  - must explicitly carry insufficiency posture

### `stale_context`

- meaning:
  - the current downstream read is no longer fresh enough for confident use
- allowed upstream causes:
  - `stale` continuity, impact, or evidence posture
- allowed downstream interpretation:
  - explicit stale-context warning posture
- forbidden interpretation:
  - do not treat stale context as fresh decision support
- required evidence/omission condition:
  - freshness/staleness posture must be explicit

### `impact_detected`

- meaning:
  - bounded drift/impact posture indicates affected-object or changed-context
    significance
- allowed upstream causes:
  - `drift_impact_projection_summary`
  - relation-aware posture paired with impact support
- allowed downstream interpretation:
  - impact framing and potential review preparation
- forbidden interpretation:
  - not conflict resolution, not rollback, not compensation
- required evidence/omission condition:
  - impact must preserve evidence posture or insufficiency posture

### `activation_blocked`

- meaning:
  - bounded activation posture indicates suppression or blocked action posture
- allowed upstream causes:
  - activation suppression posture
  - bounded contract block posture
- allowed downstream interpretation:
  - activation cannot proceed inside current bounded posture
- forbidden interpretation:
  - not dispatch failed, not execution failed
- required evidence/omission condition:
  - activation block reason must be explicit or remain omitted_by_contract

### `confirm_required`

- meaning:
  - bounded summary posture indicates confirm gating is present
- allowed upstream causes:
  - `activation_projection_summary`
  - `confirm_trace_decision_projection_summary`
- allowed downstream interpretation:
  - review framing may be needed before any later action
- forbidden interpretation:
  - not approved, not rejected
- required evidence/omission condition:
  - confirm posture must carry confirm/evidence posture explicitly

### `escalation_required`

- meaning:
  - bounded summary posture indicates tension or suppression that should be
    elevated in downstream review framing
- allowed upstream causes:
  - activation escalation posture
  - explicit tension paired with blocked activation posture
- allowed downstream interpretation:
  - escalation framing only
- forbidden interpretation:
  - not routed, not executed, not provider-sent
- required evidence/omission condition:
  - escalation reason posture must be explicit

### `return_for_revision`

- meaning:
  - bounded summary posture indicates revision-return framing is appropriate
- allowed upstream causes:
  - impact-detected plus review posture
  - current downstream packet-state family where revision visibility is already
    lawful
- allowed downstream interpretation:
  - revision-return posture only
- forbidden interpretation:
  - not rejection execution
  - not workflow command
- required evidence/omission condition:
  - revision-return framing must keep rationale/evidence/omission posture
    explicit

### `blocked_by_contract`

- meaning:
  - the contract itself forbids further downstream interpretation or widening
- allowed upstream causes:
  - omitted_by_contract
  - non-exportable runtime detail
  - forbidden direct dependency request
- allowed downstream interpretation:
  - stop at boundary and keep contract block visible
- forbidden interpretation:
  - no fallback invention
  - no silent substitution of product law for missing runtime truth
- required evidence/omission condition:
  - contract block reason must remain explicit

## E. Transition Model

Allowed semantic transitions:

- `no_exception -> monitor`
- `monitor -> review_needed`
- `monitor -> stale_context`
- `monitor -> evidence_insufficient`
- `review_needed -> return_for_revision`
- `review_needed -> blocked_by_contract`
- `evidence_insufficient -> review_needed`
- `stale_context -> review_needed`
- `impact_detected -> review_needed`
- `activation_blocked -> escalation_required`
- `confirm_required -> review_needed`
- `review_needed -> blocked_by_contract`
- `stale_context -> blocked_by_contract`
- `evidence_insufficient -> blocked_by_contract`

Transition reading rule:

- these are semantic baseline transitions only
- they do not define implementation mechanics
- they do not define approval or execution transitions

## F. Forbidden Transitions

Forbidden transitions:

- `review_needed -> approved`
- `confirm_required -> approved`
- `activation_blocked -> dispatched`
- `escalation_required -> executed`
- `return_for_revision -> provider-sent`
- any state -> provider/channel execution
- any state -> policy mutation
- any state -> protocol certification

Also forbidden by family:

- any transition that implies approve/reject/dispatch/execute
- any transition that implies runtime authority
- any transition that implies protocol authority
- any transition that implies autonomous completion authority

## G. Evidence / Omission / Insufficiency Rules

This baseline uses the contract vocabulary:

- `available`
- `omitted_by_contract`
- `not_available_upstream`
- `insufficient_evidence`
- `stale`
- `not_applicable`

State-machine effect rules:

- `available`
  - may support `monitor`, `review_needed`, `impact_detected`,
    `confirm_required`, `activation_blocked`, or `escalation_required`
    depending on family combination
- `omitted_by_contract`
  - may force `blocked_by_contract`
  - must never be silently treated as available
- `not_available_upstream`
  - may force `blocked_by_contract` or `evidence_insufficient`
  - must not be rendered as a complete posture
- `insufficient_evidence`
  - must force or preserve `evidence_insufficient`
  - must not be converted into confidence
- `stale`
  - must force or preserve `stale_context`
  - may later reopen into `review_needed` if downstream review still needs to
    see stale posture explicitly
- `not_applicable`
  - may preserve `no_exception` or `monitor`
  - must not be upgraded into review or block posture by itself

## H. Relation To Existing SoloCrew Assets

This baseline maps onto existing reusable SoloCrew assets:

- Secretary beta shell
  - future top-level projection surface for exception posture visibility
- handoff staging
  - future projection surface for `return_for_revision`,
    `review_needed`, and `blocked_by_contract` posture framing
- handoff review packet
  - future projection surface for `review_needed`,
    `confirm_required`, `evidence_insufficient`, and
    `return_for_revision` posture framing
- rationale/evidence/provenance visibility
  - future projection surface for evidence/omission/insufficiency expression
- revision / return consistency
  - future projection surface for stable revision-return posture
- portfolio shelves
  - future projection surface for bounded posture aggregation such as monitor,
    review_needed, or stale_context counts

These are not current implementation of this baseline.
They are only the nearest lawful downstream surfaces that could consume it
later.

## I. Test Requirements For Future Implementation

Any future implementation claiming this baseline must test:

- no raw runtime imports
- six input families are consumed only through projection summaries
- omission semantics
- insufficiency semantics
- stale-state semantics
- forbidden transition negative tests
- forbidden label negative tests
- no approve/reject/dispatch/execute
- no provider/channel execution
- no policy mutation
- no protocol authority claim

Recommended minimum test families:

- semantic posture derivation tests
- transition-boundary tests
- stale/insufficient downgrade tests
- contract-block tests
- cross-surface non-executing regression tests

## J. Readiness Conclusion

Selected readiness value:

- `STATE_MACHINE_BASELINE_READY_FOR_BUSINESS_LOOP_SELECTION`

Why this is the correct current read:

- SoloCrew now has a frozen projection contract and this semantic baseline over
  it
- current reusable Secretary shell, staging, review packet, rationale/evidence,
  and revision-return assets already provide lawful downstream surfaces for
  later consumption
- the next smallest lawful blocker is no longer state-machine vocabulary
- the next smallest lawful blocker is choosing the first bounded business loop
  to run through these postures without widening into execution behavior
