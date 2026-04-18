# SOLOCREW-HANDOFF-PACKET-ENRICHMENT-PLAN-v0.1

## A. Purpose

This document is the planning baseline for future founder-request exception
packet enrichment across the existing SoloCrew handoff surfaces.

It is:

- plan only
- no implementation in this wave
- no assembly changes in this wave
- no UI changes
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan freezes how current contract-safe packet outputs may later enrich the
existing handoff staging, review packet, rationale/evidence, packet-state, and
portfolio Secretary surfaces without inventing new product law.

## B. Current Code Readiness

Current implemented preconditions already present in the repo:

- founder-request exception packet contract skeleton and type guards exist in
  `projection/contracts/founder-request-exception-packet-contract.ts`
- projection adapter over bounded summaries exists in
  `projection/adapters/founder-request-exception-packet-adapter.ts`
- pure posture derivation utility exists in
  `projection/contracts/founder-request-exception-posture-derivation.ts`
- standalone tests already freeze:
  - six projection summary families
  - omission/insufficiency/stale vocabulary
  - bounded exception posture vocabulary
  - forbidden raw/runtime-key rejection
  - forbidden authority/execution label rejection
  - bounded non-executing recommendation posture
  - suggestion-only learning posture
- current adapter already produces one contract-safe packet object without raw
  runtime imports or direct `Cognitive_OS` imports

What this means for the next assembly-facing planning step:

- SoloCrew already has one lawful bounded packet lane to enrich
- the next future wave may focus on assembly reuse rather than inventing a new
  DTO family
- the next future wave must still stay below approve/reject/dispatch/execute
  and below provider/channel execution

## C. Existing Handoff Asset Reuse Map

### 1. Staging surface

- current file:
  - `app/shell/secretary-handoff-staging.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
- current role:
  - builds and renders the staged-only downstream handoff lane
  - exposes target selection, packet-state framing, revision loop summary, and
    rationale/evidence framing
- future enrichment role:
  - may receive founder-request packet identity, bounded exception posture,
    marker visibility, and six-family status summaries as additional bounded
    staging context
- may be extended later:
  - yes, in a future assembly wave only
- must remain untouched in this wave:
  - yes
- forbidden semantic drift:
  - no staging lane may become approve/reject/dispatch/execute
  - no staging lane may imply provider/channel execution
  - no staging lane may bind to raw runtime-private internals

### 2. Review packet surface

- current file:
  - `app/shell/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-review-packet.ts`
- current role:
  - builds and renders the review-only downstream packet lane
  - exposes packet summary, packet rationale, packet state, review readiness,
    and bounded rationale/evidence framing
- future enrichment role:
  - primary carrier for founder-request exception packet enrichment
  - likely target for bounded exception posture, review/return posture, bounded
    action recommendation, evidence summary, learning suggestion, and explicit
    omission/insufficiency/stale markers
- may be extended later:
  - yes, in a future assembly wave only
- must remain untouched in this wave:
  - yes
- forbidden semantic drift:
  - review packet must remain review-only and non-executing
  - no review packet enrichment may imply approval authority, dispatch
    authority, or execution authority

### 3. Rationale / evidence / provenance surface

- current file:
  - `projection/assembly/secretary-handoff-rationale.ts`
- current role:
  - central bounded rationale/evidence/provenance assembler shared across
    portfolio, staging, and review packet surfaces
  - already carries omission notes, known facts, evidence summary, provenance
    summary, and source hints
- future enrichment role:
  - likely home for bounded explanation of founder-request packet evidence,
    omission, insufficiency, stale posture, and learning suggestion posture
- may be extended later:
  - yes, but only through bounded summary-safe evidence classes
- must remain untouched in this wave:
  - yes
- forbidden semantic drift:
  - no raw trace dump posture
  - no raw runtime-private object identity
  - no runtime authority claim
  - no protocol authority claim

### 4. Packet-state / revision-return semantics

- current file:
  - `projection/assembly/secretary-handoff-packet-state.ts`
- current role:
  - freezes shared packet state vocabulary:
    - `draft`
    - `staged`
    - `ready_for_cell_review`
    - `returned_for_revision`
  - provides packet-state summary and revision-loop summary reused by staging,
    review packet, and portfolio shelves
- future enrichment role:
  - remains the existing packet-state carrier under founder-request enrichment
  - may later be paired with bounded exception posture, but not replaced by it
- may be extended later:
  - only if a future wave proves a bounded mapping between packet state and
    founder-request posture without changing the frozen state-machine baseline
- must remain untouched in this wave:
  - yes
- forbidden semantic drift:
  - no packet-state-to-execution upgrade
  - no state-machine implementation in this wave
  - no implicit approval, dispatch, execution, or provider/channel result

### 5. Portfolio Secretary shell shelves

- current file:
  - `projection/assembly/portfolio-secretary-shell.ts`
- current role:
  - aggregates status shelf, queue shelf, review shelf, posture shelf, and
    portfolio-level rationale/evidence
- future enrichment role:
  - later may surface bounded counts or presence indicators for enriched
    founder-request packets
  - later may host high-level visibility for enriched packet posture without
    becoming a founder queue implementation
- may be extended later:
  - yes, carefully and only after handoff review packet enrichment is stable
- must remain untouched in this wave:
  - yes
- forbidden semantic drift:
  - no founder queue implementation
  - no direct-control semantics
  - no upward law promotion

### 6. Existing tests that anchor these assets

- current file:
  - `tests/projection/secretary-handoff-staging.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/projection/portfolio-secretary-shell.test.ts`
  - `tests/app/secretary-handoff-page.test.ts`
  - `tests/app/secretary-handoff-review-page.test.ts`
  - related rationale / packet-state assertions embedded in the above suites
- current role:
  - prove current staging, review packet, rationale/evidence, revision-return,
    and shelf semantics remain downstream, non-executing, and non-authoritative
- future enrichment role:
  - serve as regression gates for any future assembly wave
- must remain untouched in this wave:
  - yes
- forbidden semantic drift:
  - no green tests gained by silently weakening non-executing assertions

## D. Enrichment Input Mapping

Future enrichment may consume only contract-safe packet fields already frozen by
the founder-request exception packet contract and adapter.

### 1. request identity / label

- target future surface:
  - handoff staging framing
  - handoff review packet summary/rationale area
- display posture:
  - identify the founder-request source of the enriched packet
  - remain product-facing label class only
- evidence posture:
  - none required by default
- omission/stale behavior:
  - if omitted by contract, remain explicit rather than silently dropped
- forbidden labels:
  - no authority labels implying approval, dispatch, execution, provider, or
    channel outcome

### 2. derived bounded exception posture

- target future surface:
  - handoff review packet framing
  - staging framing
  - possibly portfolio review shelf summary later
- display posture:
  - bounded posture only:
    - `review_needed`
    - `evidence_insufficient`
    - `stale_context`
    - `impact_detected`
    - `activation_blocked`
    - `confirm_required`
    - `escalation_required`
    - `return_for_revision`
    - `blocked_by_contract`
    - `monitor`
    - `no_exception`
- evidence posture:
  - must remain summary-safe and omission-aware
- omission/stale behavior:
  - omission, insufficiency, and stale must remain visible
- forbidden labels:
  - no approve/reject/dispatch/execute
  - no provider/channel execution

### 3. review / return posture

- target future surface:
  - handoff review packet packet-framing area
  - staging framing area
- display posture:
  - remain downstream review/return interpretation only
- evidence posture:
  - may be paired with evidence summary, not raw evidence dump
- omission/stale behavior:
  - marker_status must remain explicit
- forbidden labels:
  - no approval workflow law
  - no execution workflow law

### 4. bounded action recommendation

- target future surface:
  - handoff review packet recommendation area
  - possibly staging summary area
- display posture:
  - bounded action recommendation only
  - must remain non-executing
- evidence posture:
  - recommendation may be accompanied by bounded evidence summary
- omission/stale behavior:
  - absence must remain explicit rather than fabricated
  - stale or insufficient markers must remain visible
- forbidden labels:
  - no approve/reject/dispatch/execute
  - no provider/channel execution
  - no implicit execution wording

### 5. evidence summary

- target future surface:
  - handoff review packet rationale/evidence block
  - staging rationale/evidence block
- display posture:
  - evidence summary only
  - not raw trace dump
- evidence posture:
  - bounded evidence refs may surface only where already lawful
- omission/stale behavior:
  - omission must remain omission
  - insufficiency must remain insufficiency
  - stale must remain stale
- forbidden labels:
  - no protocol-certified posture
  - no fully reconstructed posture

### 6. learning suggestion summary

- target future surface:
  - handoff review packet rationale/evidence block
  - possibly compact staging note later
- display posture:
  - learning suggestion only
  - suggestion-only posture only
- evidence posture:
  - may carry bounded evidence refs where already allowed
- omission/stale behavior:
  - suggestion absence or insufficiency must remain explicit
- forbidden labels:
  - no policy mutation
  - no autonomous completion

### 7. omission / insufficiency / stale markers

- target future surface:
  - staging framing
  - review packet framing
  - rationale/evidence surface
- display posture:
  - visible bounded markers, never silent omission
- evidence posture:
  - insufficiency and stale must shape the displayed confidence posture
- omission/stale behavior:
  - all of the following must remain explicit:
    - omission
    - insufficiency
    - stale
- forbidden labels:
  - no silent completion read
  - no false confidence upgrade

### 8. six projection summary family statuses

- target future surface:
  - handoff review packet packet-framing area first
  - staging framing area second
  - portfolio shell only later and only in reduced aggregate form
- display posture:
  - bounded family-status visibility only
- evidence posture:
  - evidence refs remain bounded and optional
- omission/stale behavior:
  - each family status must remain explicit and contract-safe
- forbidden labels:
  - no raw runtime family exposure
  - no raw store layout language

## E. Future Assembly Wave Boundaries

The next possible implementation wave after this plan is:

- Handoff packet enrichment assembly

That future wave must stay narrow:

- adapter output in
- existing handoff review packet surface out
- existing handoff staging and rationale surfaces reused rather than replaced
- no raw runtime imports
- no new page
- no provider/channel execution
- no approve/reject/dispatch/execute
- no final Operational V1 claim

Recommended future assembly order:

1. enrich `projection/assembly/secretary-handoff-review-packet.ts` first
2. enrich `projection/assembly/secretary-handoff-rationale.ts` second if needed
3. enrich `projection/assembly/secretary-handoff-staging.ts` third only if the
   packet-framing baseline proves stable
4. defer `projection/assembly/portfolio-secretary-shell.ts` until enriched
   packet semantics are already stable and testable

## F. Tests Required For Future Assembly Wave

Any future handoff packet enrichment assembly wave must prove:

- existing handoff review packet tests still pass
- existing handoff staging tests still pass
- existing app shell tests for handoff staging/review still pass
- enriched packet includes bounded posture visibility
- omission / insufficiency / stale are visible
- bounded action recommendation remains non-executing
- learning suggestion remains suggestion-only
- forbidden labels do not appear
- no approve/reject/dispatch/execute
- no provider/channel execution
- no raw runtime imports
- no state-machine execution mechanics

Recommended future test targets:

- `tests/projection/secretary-handoff-review-packet.test.ts`
- `tests/projection/secretary-handoff-staging.test.ts`
- `tests/app/secretary-handoff-review-page.test.ts`
- `tests/app/secretary-handoff-page.test.ts`
- packet-specific contract/adapter regression tests remain green

## G. Rollback / Stop Conditions

The future implementation wave must stop or rollback if:

- it needs raw runtime internals
- it needs provider/channel semantics
- it needs approval/dispatch/execution semantics
- it requires changing the state-machine baseline just to land packet
  enrichment
- it changes app/page behavior before assembly tests are green
- it weakens forbidden label protections
- it requires direct `Cognitive_OS` imports or raw runtime-private dependency
- it converts omission, insufficiency, or stale markers into silent confidence

## H. Boundary Conclusion

Selected readiness value:

- `HANDOFF_ENRICHMENT_PLAN_READY_FOR_ASSEMBLY_WAVE`

Reason for this readiness:

- contract-safe packet structure already exists
- bounded posture derivation already exists
- adapter output already exists and is tested
- existing handoff staging/review/rationale surfaces already expose bounded,
  non-executing, omission-aware semantics
- the repo already has stable tests that can guard the future assembly wave

This readiness means:

- SoloCrew may plan and later execute one bounded assembly enrichment wave

This readiness does not mean:

- any assembly changes in this wave
- any UI changes
- any approve/reject/dispatch/execute
- any provider/channel execution
- any direct runtime-private dependency
