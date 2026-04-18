# SOLOCREW-FIRST-BUSINESS-LOOP-SELECTION-AUDIT-v0.1

## A. Purpose

This audit selects the first bounded business loop candidate for later
operational implementation planning in SoloCrew.

It is:

- selection only
- no implementation
- no DTO
- no UI
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This document freezes which loop should go first and why.
It does not authorize code implementation by itself.

## B. Selection Criteria

The first business loop should satisfy all of the following:

- reuse current SoloCrew assets rather than inventing a new product lane
- consume only contracted projection summaries
- exercise the bounded exception posture vocabulary already frozen in
  `SOLOCREW-EXCEPTION-STATE-MACHINE-BASELINE-v0.1.md`
- avoid direct runtime-private dependency
- avoid provider/channel execution
- avoid approve/reject/dispatch/execute behavior
- validate continuity, impact, activation, evidence, and learning posture in
  one bounded loop
- stay narrow enough for a first implementation wave
- stay meaningful enough for the Operational V1 path

Applied repository-truth guidance:

- current reusable downstream assets are strongest in Secretary shell, handoff
  staging, handoff review packet, rationale/evidence/provenance visibility, and
  revision / return consistency
- current upstream candidate projection inputs are strongest in continuity,
  semantic relation, drift / impact, activation, confirm / trace / decision,
  and learning suggestion summaries
- the first loop should therefore prefer packet/review/revision semantics over
  content publication semantics or provider/channel semantics

## C. Candidate Loops Compared

### 1. Founder request -> Delta intent -> Secretary handoff packet -> Review/return posture -> bounded action recommendation -> evidence summary -> learning suggestion

- description:
  - start from a Founder request, interpret it through Delta intent-sensitive
    upstream summaries, compress it into a Secretary handoff packet, surface a
    Review/return posture, keep the next step at bounded action recommendation
    only, preserve evidence summary, and retain learning suggestion posture
- reused current assets:
  - Secretary beta shell
  - Secretary handoff staging
  - Secretary handoff review packet
  - rationale/evidence/provenance visibility
  - revision / return consistency
  - portfolio queue/review/posture shelves
- required projection summaries:
  - `continuity_projection_summary`
  - `semantic_relation_projection_summary`
  - `drift_impact_projection_summary`
  - `activation_projection_summary`
  - `confirm_trace_decision_projection_summary`
  - `learning_suggestion_projection_summary`
- expected exception postures:
  - `review_needed`
  - `impact_detected`
  - `confirm_required`
  - `return_for_revision`
  - `evidence_insufficient`
  - `stale_context`
  - `blocked_by_contract`
  - `monitor`
- why it is useful:
  - reuses the strongest existing SoloCrew surfaces
  - exercises the broadest lawful subset of current CGOS projection families
  - maps directly onto the existing handoff-first and review/revision-loop-first
    beta lane
- why it is risky:
  - could drift into approval or execution language if action recommendation is
    not kept visibly bounded
  - could over-read delta/drift summaries as runtime authority if projection
    boundaries are not preserved
- why it should be first:
  - it is the narrowest loop that still tests continuity, impact, activation,
    evidence, and learning posture together

### 2. Content idea intake -> review packet -> channel-ready draft posture -> blocked_by_contract/no execution -> evidence summary

- description:
  - start from content idea intake, form a review packet, reach a
    channel-ready draft posture, then stop under blocked_by_contract/no
    execution and surface evidence summary
- reused current assets:
  - Secretary beta shell
  - handoff review packet
  - rationale/evidence/provenance visibility
- required projection summaries:
  - `continuity_projection_summary`
  - `activation_projection_summary`
  - `confirm_trace_decision_projection_summary`
- expected exception postures:
  - `review_needed`
  - `blocked_by_contract`
  - `evidence_insufficient`
  - `stale_context`
- why it is useful:
  - stays visibly bounded and demonstrates contract discipline around
    non-execution
- why it is risky:
  - channel-ready wording pulls the loop too close to provider/channel execution
    even if blocked
  - it underuses relation, impact, and learning posture compared with current
    upstream readiness
- why it should not be first:
  - too much of the loop is defined by what it cannot do rather than by useful
    exception-plane compression

### 3. Portfolio status change -> impact posture -> Secretary review shelf -> return_for_revision posture -> learning suggestion

- description:
  - start from a portfolio status change, compress it into impact posture,
    surface it in the Secretary review shelf, then use return_for_revision and
    learning suggestion posture
- reused current assets:
  - portfolio / Secretary shell
  - portfolio shelves
  - revision / return consistency
  - rationale/evidence/provenance visibility
- required projection summaries:
  - `continuity_projection_summary`
  - `semantic_relation_projection_summary`
  - `drift_impact_projection_summary`
  - `learning_suggestion_projection_summary`
- expected exception postures:
  - `monitor`
  - `impact_detected`
  - `review_needed`
  - `return_for_revision`
  - `evidence_insufficient`
- why it is useful:
  - exercises shelf-level portfolio posture and relation/impact awareness
- why it is risky:
  - starts from a weaker founder-visible entry condition than an explicit
    request
  - does not naturally exercise confirm/activation posture as cleanly as the
    handoff-packet path
- why it should not be first:
  - better as a second loop after the request-to-packet line is frozen

## D. Selected First Business Loop

Selected loop:

- `Founder request -> Delta intent -> Secretary handoff packet -> Review/return posture -> bounded action recommendation -> evidence summary -> learning suggestion`

Selected readiness value:

- `READY_FOR_BUSINESS_LOOP_IMPLEMENTATION_PLAN`

### Loop Name

- Founder-request exception packet loop

### Loop Purpose

- turn a Founder request into one bounded, evidence-aware, omission-aware,
  non-executing exception packet line that can be reviewed, returned for
  revision, or held in bounded action recommendation posture without claiming
  direct control

### Entry Condition

- a Founder request exists
- the request can be interpreted as fresh intent or Delta intent through
  contracted upstream summaries
- SoloCrew receives only projection-safe summaries, never raw runtime-private
  objects

### Exit Condition

- a Secretary handoff packet exists in bounded downstream product space
- the packet carries a Review/return posture or other bounded exception posture
- a bounded action recommendation may be visible
- an evidence summary may be visible
- a learning suggestion may be visible
- the loop exits before approve/reject/dispatch/execute or any provider/channel
  behavior

### Required Projection Summaries

- `continuity_projection_summary`
  - for continuation context, stale-state handling, and bounded resume posture
- `semantic_relation_projection_summary`
  - for affected-object awareness and relation-aware packet framing
- `drift_impact_projection_summary`
  - for Delta intent-sensitive impact posture and revision/return framing
- `activation_projection_summary`
  - for bounded action recommendation, confirm-required, suppression, or
    escalation posture without execution
- `confirm_trace_decision_projection_summary`
  - for evidence summary, omission posture, and confirm/evidence awareness
- `learning_suggestion_projection_summary`
  - for suggestion-only post-loop learning posture

### Expected Exception Postures

- `review_needed`
- `impact_detected`
- `confirm_required`
- `return_for_revision`
- `evidence_insufficient`
- `stale_context`
- `blocked_by_contract`
- `monitor`

Expected non-goal posture:

- never translate any of the above into approval, dispatch, execution,
  provider-send, or channel-publish semantics

### Required Evidence Posture

- evidence summary must remain bounded and omission-aware
- evidence summary must not become a raw trace dump
- evidence insufficiency must remain explicit rather than converted into
  confidence
- omission must remain explicit rather than silently dropped

### Omission / Insufficiency Handling

The selected loop must preserve the contract vocabulary:

- `available`
- `omitted_by_contract`
- `not_available_upstream`
- `insufficient_evidence`
- `stale`
- `not_applicable`

Required interpretation rule:

- omission, insufficiency, or stale posture must shape downstream packet
  posture explicitly
- omission, insufficiency, or stale posture must not be rewritten into a false
  completion read

### Stale-State Handling

- stale continuity or stale impact posture must surface as `stale_context`
- stale-state must block confident downstream interpretation
- stale-state may still permit bounded packet visibility, but only with explicit
  stale labeling

### Forbidden Behaviors

- no approve/reject/dispatch/execute
- no provider/channel execution
- no raw runtime-private dependency
- no direct use of raw VSL, PSG, drift-record, conflict-case, activation-signal,
  action-unit, or learning-candidate internals
- no product-law rewriting of runtime posture
- no protocol-law rewriting from downstream usage

### Minimum Future Tests

- founder-request path consumes only projection summaries
- fresh-intent vs Delta intent posture remains explicit and bounded
- Secretary handoff packet remains product-projected and non-executing
- Review/return posture remains below approval/execution semantics
- bounded action recommendation does not become dispatch or execute behavior
- evidence summary preserves omission / insufficiency / stale handling
- learning suggestion remains suggestion-only
- no raw runtime imports exist in SoloCrew implementation
- no forbidden labels or forbidden transitions appear

### Implementation Prerequisites

- keep the existing projection contract as the only allowed upstream dependency
  boundary
- keep the existing exception state-machine baseline as the only allowed posture
  vocabulary source
- define an implementation plan before code
- define exact projection-family-to-surface mapping before DTO or UI work

## E. Explicitly Rejected Loops

- Content idea intake -> review packet -> channel-ready draft posture -> blocked_by_contract/no execution -> evidence summary
  - rejected as the first loop because it pulls too early toward
    provider/channel semantics and does not exercise the full exception-plane
    posture set
- Portfolio status change -> impact posture -> Secretary review shelf -> return_for_revision posture -> learning suggestion
  - rejected as the first loop because it is a better second loop for shelf and
    monitoring expansion after the founder-request packet line is stabilized

## F. Boundary Conclusion

This audit permits:

- one later implementation-planning wave for the selected bounded business loop
- mapping the selected loop onto current Secretary shell, handoff staging,
  review packet, evidence, and revision/return surfaces
- narrowing the future implementation to projection-safe summaries and bounded
  postures only

This audit does not permit:

- implementation yet
- DTO definition yet
- UI behavior yet
- approve/reject/dispatch/execute
- provider/channel execution
- Operational V1 completion claims

Boundary judgment:

- `READY_FOR_BUSINESS_LOOP_IMPLEMENTATION_PLAN`

## G. Next Wave Recommendation

Recommended next wave:

- `SoloCrew business-loop implementation plan`

Reason:

- the selected loop is now narrow enough, asset-backed enough, and
  contract-bounded enough to justify an implementation-planning wave
- a code wave would still be premature until the implementation plan freezes
  exact surface scope, future test gates, and forbidden dependency checks
