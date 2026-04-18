# SOLOCREW-CGOS-EXCEPTION-PROJECTION-CONTRACT-v0.1

## A. Purpose

This is the first bounded projection contract for future SoloCrew
exception-plane preparation.

It is:

- contract only
- no implementation
- no final DTOs
- no UI
- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime authority
- no protocol authority

This document freezes projection-safe semantic constraints only.

## B. Authority And Dependency Chain

The governing chain is:

`MPLP Protocol -> Cognitive_OS Runtime -> SoloCrew Projection Contract -> SoloCrew Product Surface`

Under this chain:

- MPLP remains protocol/schema/invariant authority
- `Cognitive_OS` remains runtime authority
- SoloCrew may only consume projection-safe summaries
- SoloCrew cannot directly depend on runtime-private internals

Practical boundary rule:

- SoloCrew may package bounded upstream summary truth for downstream product use
- SoloCrew may not convert runtime-private objects into product law
- SoloCrew may not convert product labels into runtime authority
- SoloCrew may not convert product labels into protocol authority

## C. Candidate Projection Input Families

The following are the only bounded candidate input families covered by this
draft contract.

These are contract families only.
They are not final DTOs.

### 1. `continuity_projection_summary`

- purpose:
  - expose bounded continuity posture for later exception-plane framing without
    surfacing raw VSL internals
- allowed source category:
  - contracted summary over `RuntimeVslContinuityState`
- allowed field classes:
  - project-scoped continuity status class
  - continuation-anchor summary class
  - replay/rollback/retention horizon summary class
  - last-completed-step class
  - revision/update posture class
  - bounded notes class
- required evidence refs if applicable:
  - none required by default
  - if evidence linkage exists later, only summary-safe evidence refs may
    surface
- omission semantics:
  - must explicitly mark omitted continuity details rather than silently
    dropping them
- insufficiency semantics:
  - must explicitly mark when upstream continuity truth is too weak for product
    interpretation
- forbidden raw fields:
  - raw VSL store layout
  - raw store snapshot layout
  - raw runtime-private anchor internals beyond contracted summary posture
- intended downstream use:
  - continuity posture framing
  - resume-context framing
  - stale or missing continuity warning posture
- explicit non-goals:
  - continuity execution
  - replay execution
  - rollback execution
  - full VSL exposure

### 2. `semantic_relation_projection_summary`

- purpose:
  - expose bounded relation and affected-object posture without surfacing raw
    PSG graph state
- allowed source category:
  - contracted summary over `RuntimePsgGraphUpdateSummary`
- allowed field classes:
  - graph update kind class
  - changed-node summary class
  - changed-relation summary class
  - affected-object summary class
  - bounded notes class
- required evidence refs if applicable:
  - evidence-ref summary class may surface only if relation summary is
    explicitly evidence-linked
- omission semantics:
  - omitted graph detail must be marked as omitted_by_contract
- insufficiency semantics:
  - weak relation certainty must be marked as insufficient_evidence
- forbidden raw fields:
  - raw `RuntimePsgGraphState`
  - raw node records
  - raw relation edges
  - raw runtime-private graph identity as product vocabulary
- intended downstream use:
  - affected-object awareness
  - relation-aware posture
  - bounded semantic-impact framing
- explicit non-goals:
  - full graph inspection
  - graph database semantics
  - graph export
  - product graph DTO law

### 3. `drift_impact_projection_summary`

- purpose:
  - expose bounded requirement-change, drift, impact, and review posture
    without surfacing raw reconcile internals
- allowed source category:
  - contracted summary over:
    - `RuntimeDeltaDriftImpactAssessment`
    - `RuntimeReconciliationSnapshot`
- allowed field classes:
  - drift kind class
  - severity class
  - baseline-object summary class
  - affected-object summary class
  - continuation-anchor summary class
  - impact-summary class
  - conflict-presence class
  - bounded notes class
- required evidence refs if applicable:
  - supporting-evidence-ref summary class where upstream evidence exists
- omission semantics:
  - hidden baseline, affected, or evidence detail must be explicit
- insufficiency semantics:
  - missing comparison confidence must not be rendered as a confident impact
    conclusion
- forbidden raw fields:
  - raw `drift-record`
  - raw `conflict-case`
  - raw reconcile object IDs treated as user-facing objects
- intended downstream use:
  - impact posture framing
  - bounded review-readiness framing
  - explicit tension visibility
- explicit non-goals:
  - full drift engine behavior
  - full conflict resolution
  - compensation execution
  - rollback execution

### 4. `activation_projection_summary`

- purpose:
  - expose bounded activation posture without surfacing raw AEL internals or
    implying control authority
- allowed source category:
  - contracted summary over `RuntimeAelAssessment`
- allowed field classes:
  - activation outcome class
  - activation scope class
  - gating-basis class
  - priority posture class
  - confirm-required posture class
  - suppression/escalation reason summary class
  - bounded notes class
- required evidence refs if applicable:
  - evidence-ref summary class where upstream AEL evidence exists
- omission semantics:
  - hidden activation details must be marked as omitted_by_contract
- insufficiency semantics:
  - unresolved activation support must be marked as insufficient_evidence or
    not_available_upstream
- forbidden raw fields:
  - raw `activation-signal`
  - raw `action-unit`
  - raw matched-rule internals beyond contracted posture summary
- intended downstream use:
  - activation posture framing
  - confirm-required posture framing
  - suppression/escalation visibility
- explicit non-goals:
  - approve/reject/dispatch/execute
  - provider execution
  - channel execution
  - policy mutation

### 5. `confirm_trace_decision_projection_summary`

- purpose:
  - expose bounded confirm, trace, decision, and evidence posture without
    surfacing raw runtime or raw trace dumps
- allowed source category:
  - contracted summary over:
    - `RuntimeConfirmSummary`
    - `RuntimeEvidenceSummary`
    - lawful bounded `Confirm` / `Trace` export posture when present
- allowed field classes:
  - confirm-required class
  - confirm-status posture class
  - decision-evidence presence class
  - trace-evidence presence class
  - evidence-summary class
  - omission-reason class
  - bounded notes class
- required evidence refs if applicable:
  - summary-safe confirm refs
  - summary-safe trace refs
  - summary-safe decision/evidence refs
- omission semantics:
  - omitted confirm/trace/decision detail must remain explicit
- insufficiency semantics:
  - thin evidence must remain insufficient_evidence rather than being displayed
    as complete proof
- forbidden raw fields:
  - raw trace dumps
  - raw decision-record internals
  - raw protocol reconstruction details beyond lawful summary posture
- intended downstream use:
  - bounded evidence posture
  - bounded review support
  - omission-aware confidence framing
- explicit non-goals:
  - raw trace viewer
  - full protocol reconstruction
  - protocol-certified product labeling

### 6. `learning_suggestion_projection_summary`

- purpose:
  - expose bounded suggestion-only learning posture without surfacing raw
    governed-learning internals as product law
- allowed source category:
  - contracted summary over `RuntimeGovernedLearningAssessment`
- allowed field classes:
  - candidate-kind class
  - hint-type class
  - score-label class
  - suggestion-summary class
  - impacted-object summary class
  - continuity-anchor summary class
  - future-export-eligibility posture class
  - bounded notes class
- required evidence refs if applicable:
  - summary-safe source-evidence refs
  - summary-safe source-object refs
  - summary-safe source-relation refs if later approved
- omission semantics:
  - hidden evidence and source detail must remain explicit
- insufficiency semantics:
  - low-confidence or partial suggestion posture must remain insufficient and
    suggestion-only
- forbidden raw fields:
  - raw `learning-candidate`
  - raw `memory-promotion-record`
  - raw policy-mutation state
  - raw semantic-promotion state
- intended downstream use:
  - bounded learning suggestion posture
  - bounded reuse/failure/policy hint framing
  - bounded future review preparation
- explicit non-goals:
  - autonomous learning
  - policy mutation
  - semantic truth promotion
  - final product preference law

## D. Cross-Family Contract Invariants

All projection input families in this contract must obey:

- no raw runtime object dependency
- no direct store layout dependency
- no runtime-private identity as user-facing product vocabulary
- evidence refs preserved where available
- omission must be explicit, not silent
- insufficiency must be explicit, not converted into confidence
- stale-state must be representable
- non-exportable runtime fields remain hidden
- product labels must not claim runtime authority
- product labels must not claim protocol authority

They must also preserve:

- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime authority
- no protocol authority

## E. Omission / Insufficiency Semantics

Frozen minimum contract vocabulary:

- `available`
  - the contracted family has enough upstream support to surface its bounded
    summary posture
- `omitted_by_contract`
  - detail exists or may exist upstream, but this contract forbids exposing it
- `not_available_upstream`
  - upstream first-pass truth does not currently provide the required summary
    support
- `insufficient_evidence`
  - available evidence is not strong enough to justify a confident downstream
    interpretation
- `stale`
  - the summary exists, but update / freshness posture does not support current
    read confidence
- `not_applicable`
  - the family or sub-interpretation does not apply to the current downstream
    context

These values are semantic vocabulary only.
They are not code implementation.

## F. Evidence Reference Posture

Allowed evidence posture:

- summary-safe evidence refs may surface where upstream evidence exists and the
  family explicitly permits them
- evidence refs may identify bounded supporting evidence classes, not raw
  internal dumps
- evidence insufficiency must remain visible as insufficiency, not as silence

Not allowed:

- raw trace dump exposure
- raw decision-record internals as user-facing payload
- raw runtime-private object linkage beyond contracted summary-safe refs

Why this matters:

- evidence summary is not a raw trace dump
- evidence summary is a bounded product-facing posture over upstream evidence
- evidence summary must preserve omission and insufficiency semantics

## G. Allowed User-Facing Label Families

Allowed future label families:

- continuity labels
  - for continuity posture, anchor posture, resume posture, stale continuity
    posture
- impact labels
  - for affected-object posture, impact posture, drift posture, tension posture
- activation posture labels
  - for activate/confirm-required/suppressed/escalate posture only as bounded
    status framing
- evidence posture labels
  - for evidence available, evidence omitted, evidence insufficient,
    evidence stale posture
- learning suggestion labels
  - for suggestion-only, reuse hint, failure hint, policy hint, continuity hint
    posture

These are label families only.
They are not final UI text.

## H. Forbidden User-Facing Labels

Forbidden user-facing labels:

- `approved`
- `dispatched`
- `executed`
- `provider-sent`
- `channel-published`
- `policy-mutated`
- `protocol-certified`
- `fully-reconstructed`
- `autonomous-decision-complete`

Also forbidden by family:

- labels that imply current unavailable execution authority
- labels that imply current unavailable provider/channel behavior
- labels that imply current unavailable runtime authority
- labels that imply current unavailable protocol authority

These labels remain forbidden unless a later version separately implements,
tests, and gates them.

## I. Test Requirements For Future Implementation

Any future implementation claiming this contract must satisfy at minimum:

- no raw runtime imports
- omission semantics coverage
- insufficiency semantics coverage
- stale-state coverage
- forbidden-label negative tests
- evidence refs preserved where allowed
- no approve/reject/dispatch/execute behavior
- no provider/channel execution
- no product law backwriting into `Cognitive_OS`

Recommended minimum test families:

- contract-to-projection assembly tests
- omission/insufficiency boundary tests
- stale-summary presentation-boundary tests
- forbidden-label regression tests
- non-promotion and non-authority tests

## J. Readiness Conclusion

Selected readiness value:

- `CONTRACT_DRAFT_READY_FOR_STATE_MACHINE_BASELINE`

Why this is the correct current read:

- upstream `Cognitive_OS` first-pass closure and projection-readiness baseline
  already freeze the allowed candidate input families and forbidden
  dependencies
- SoloCrew now has a preparation audit, a projection-consumption boundary, and
  this first bounded exception projection contract
- the next lawful blocker is no longer projection-family definition
- the next lawful blocker is a bounded downstream state-machine baseline that
  still remains below implementation and direct-control behavior
