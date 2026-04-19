# SOLOCREW-FOUNDER-FACING-REQUEST-INTAKE-PLAN-v0.1

## A. Purpose

This document plans the smallest lawful founder-facing intake surface for the
existing bounded founder-request loop.

It is:

- plan only
- no implementation in this wave
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim
- no RC planning claim

This plan freezes future intake scope only.
It does not authorize intake implementation by itself.

## B. Current Blocker Being Addressed

Current blocker:

- `gap_founder_facing_request_intake`

Current classification:

- `RC_BLOCKER`

Why this blocker exists:

- the current bounded founder-request loop already exists below app/page
  surfaces
- the founder currently lacks a visible place to enter a request into that
  loop
- intake planning is therefore required before RC planning can start honestly

## C. Current Reusable Surfaces

### 1. Handoff staging page

- current file:
  - `app/pages/secretary-handoff-page.ts`
- current role:
  - bounded staging-only page for handoff framing, rationale/evidence preview,
    revision visibility, and compact founder-request exception preview
- may participate in intake:
  - yes, as a downstream destination after intake
- why / why not:
  - it already carries bounded founder-request preview semantics
  - it is not currently an entry surface and should not be overread as request
    capture
- what must remain unchanged in this planning wave:
  - no page behavior changes
  - no handoff-first semantics changes
  - no direct-control or queue semantics

### 2. Handoff review page

- current file:
  - `app/pages/secretary-handoff-review-page.ts`
- current role:
  - review-only page for packet framing, rationale/evidence visibility,
    bounded recommendation framing, and review-return posture
- may participate in intake:
  - yes, as a later read-only destination after intake
- why / why not:
  - it is already the detailed explanation lane
  - it is not appropriate as the first founder entry because it assumes a
    packet already exists
- what must remain unchanged in this planning wave:
  - no page behavior changes
  - no approval or execution semantics

### 3. Handoff staging shell

- current file:
  - `app/shell/secretary-handoff-staging.ts`
- current role:
  - composes the staging shell over existing portfolio shell and handoff
    staging projection
- may participate in intake:
  - yes, as a reuse target for routing and downstream visibility
- why / why not:
  - it already expresses the non-executing handoff lane cleanly
  - it should not be forced to invent founder intake semantics internally
- what must remain unchanged in this planning wave:
  - no shell behavior changes
  - no queue semantics
  - no reducer/derivation/state-evaluation recomputation in shell

### 4. Handoff review packet shell

- current file:
  - `app/shell/secretary-handoff-review-packet.ts`
- current role:
  - composes the review-only shell over staged handoff truth
- may participate in intake:
  - yes, as a downstream explanation target only
- why / why not:
  - it preserves the current review packet lane and route conventions
  - it is not an intake candidate because it presumes staged packet context
- what must remain unchanged in this planning wave:
  - no shell behavior changes
  - no review packet semantic widening

### 5. Existing projection assembly lanes

- current files:
  - `projection/assembly/secretary-handoff-staging.ts`
  - `projection/assembly/secretary-handoff-review-packet.ts`
- current role:
  - assemble bounded downstream packet/review/staging truth
- may participate in intake:
  - yes, only as downstream reuse after a future intake object exists
- why / why not:
  - they already consume lawful founder-request packet/evaluation truth
  - they should not become raw intake parsers or direct founder-input handlers
- what must remain unchanged in this planning wave:
  - no assembly behavior changes
  - no packet/review/staging semantic drift

### 6. Existing tests

- current files:
  - `tests/app/secretary-handoff-page.test.ts`
  - `tests/app/secretary-handoff-review-page.test.ts`
  - `tests/projection/founder-request-exception-packet-contract.test.ts`
  - `tests/projection/founder-request-exception-packet-adapter.test.ts`
  - `tests/projection/founder-request-exception-posture-derivation.test.ts`
  - `tests/projection/founder-request-exception-state-evaluation.test.ts`
  - related regression suites under `tests/app/` and `tests/projection/`
- current role:
  - freeze the current loop as non-executing, bounded, and contract-safe
- may participate in intake:
  - yes, as regression anchors and future intake test extension points
- why / why not:
  - they already prove current downstream truth remains bounded
  - they do not yet prove founder-visible intake behavior
- what must remain unchanged in this planning wave:
  - no weakening of current tests
  - no restatement of current boundaries as queue or command behavior

## D. Intake Purpose

Founder-facing intake is for:

- capture a founder request into a bounded product-side shape
- make clear what the founder asked
- connect request meaning to the existing bounded packet/review/staging loop
- preserve non-executing semantics
- enable later state rendering and RC story

Founder-facing intake is not for:

- creating a founder queue
- approval workflow
- dispatch workflow
- provider/channel execution
- autonomous company operation
- policy mutation
- protocol certification

## E. Intake Input Model Planning

Future intake fields are planning-level only.
They are not implementation commitments yet.

### 1. `founder_request_id`

- allowed meaning:
  - stable bounded identifier for one founder-visible request intake object
- forbidden meaning:
  - queue id
  - workflow id
  - execution id
- required for first implementation:
  - yes
- user-visible:
  - optional

### 2. `request_label`

- allowed meaning:
  - short summary-safe label for the founder request
- forbidden meaning:
  - approval label
  - dispatch label
  - delivery status label
- required for first implementation:
  - yes
- user-visible:
  - yes

### 3. `request_text`

- allowed meaning:
  - bounded founder-authored request text for downstream summary formation
- forbidden meaning:
  - raw runtime payload
  - command string
  - execution instruction
- required for first implementation:
  - yes
- user-visible:
  - yes

### 4. `request_intent_hint`

- allowed meaning:
  - optional bounded hint describing how the request should be read at a
    product-summary level
- forbidden meaning:
  - direct action authority
  - autonomous planner directive
- required for first implementation:
  - no
- user-visible:
  - yes

### 5. `requested_context_summary`

- allowed meaning:
  - optional bounded context note that helps explain scope, current situation,
    or affected object summary
- forbidden meaning:
  - raw trace dump
  - full runtime-private context export
- required for first implementation:
  - no
- user-visible:
  - yes

### 6. `risk_hint`

- allowed meaning:
  - optional bounded signal that the founder sees uncertainty, urgency, or
    possible impact worth surfacing downstream
- forbidden meaning:
  - policy mutation
  - final severity verdict
- required for first implementation:
  - no
- user-visible:
  - yes

### 7. `evidence_hint`

- allowed meaning:
  - optional bounded note about visible evidence, missing evidence, or where
    evidence might already live
- forbidden meaning:
  - proof claim
  - raw evidence dump
- required for first implementation:
  - no
- user-visible:
  - yes

### 8. `created_at`

- allowed meaning:
  - bounded creation timestamp for intake object chronology only
- forbidden meaning:
  - workflow scheduling or execution timing authority
- required for first implementation:
  - yes
- user-visible:
  - optional

### 9. `non_executing`

- allowed meaning:
  - explicit boundary that intake remains inside the non-executing founder loop
- forbidden meaning:
  - hidden runtime action flag
  - deferred execution toggle
- required for first implementation:
  - yes
- user-visible:
  - yes or inferable, but explicit is preferred

## F. Intake Output Boundary

Future intake may produce:

- a bounded founder request intake object
- optional link to founder-request exception packet construction
- summary-safe request label
- non-executing posture
- evidence / context hints

Future intake must not produce:

- queue item
- command
- approval request
- dispatch request
- execution request
- provider/channel payload
- Operational V1 completion claim

## G. Candidate Surface Options

### 1. Reuse existing handoff staging page as first intake entry

- user clarity:
  - medium-low
- implementation scope:
  - small
- risk of semantic widening:
  - high
- testability:
  - medium
- RC suitability:
  - weak
- assessment:
  - the current staging page is already a downstream handoff visibility lane
    and would likely blur entry semantics with staged review semantics

### 2. Add a minimal founder request intake shell/page

- user clarity:
  - high
- implementation scope:
  - medium
- risk of semantic widening:
  - medium-low
- testability:
  - high
- RC suitability:
  - strong
- assessment:
  - this is the cleanest way to give the founder a visible intake entry while
    preserving current handoff staging/review pages as downstream lanes

### 3. Keep intake governance-only and delay UI

- user clarity:
  - low
- implementation scope:
  - smallest
- risk of semantic widening:
  - lowest
- testability:
  - low
- RC suitability:
  - poor
- assessment:
  - this preserves safety but does not remediate the actual founder-facing RC
    blocker

### Recommended path

Recommended path:

- add a minimal founder request intake shell/page

Why this path is recommended:

- current staging/review surfaces are clearly downstream lanes rather than
  entry lanes
- a minimal dedicated intake surface gives the founder one visible place to
  enter a request without repurposing handoff review/staging semantics
- it best supports later app/page state rendering and RC story work while
  staying bounded and non-executing

## H. Future Implementation Boundaries

Expected next wave:

- Founder-facing request intake implementation

That future wave must:

- add the smallest bounded intake surface
- reuse existing app/page/shell conventions
- produce a non-executing founder request intake object
- not invoke provider/channel
- not create queue item semantics
- not call reducer/derivation directly unless strictly necessary and
  contract-safe
- not alter packet/review/staging semantics unexpectedly

## I. Required Tests For Future Implementation

Future tests must cover:

- founder can see intake entry
- founder request text / label can be represented
- intake output remains non-executing
- no queue/command labels
- no approve/reject/dispatch/execute
- no provider/channel execution
- no raw runtime imports
- existing handoff page tests remain green
- projection regression tests remain green

## J. Stop / Rollback Conditions

Stop future implementation if it requires:

- queue semantics
- command semantics
- provider/channel semantics
- approve/reject/dispatch/execute semantics
- direct runtime-private dependency
- widening Operational V1 beyond non-executing loop

## K. Boundary Conclusion

Selected boundary conclusion:

- `FOUNDER_INTAKE_PLAN_READY_FOR_IMPLEMENTATION`

Reason:

- current repo assets already define the downstream bounded loop, safe packet
  vocabulary, app/page non-executing conventions, and test baselines needed to
  implement one minimal founder-facing intake surface without first widening
  reducer, derivation, adapter, assembly, or provider/channel behavior

## L. Next Wave Recommendation

Recommended next wave:

- `SoloCrew founder-facing request intake implementation`

Why this is the next lawful step:

- founder-visible intake is the first named RC blocker
- a planning baseline now exists for the smallest dedicated intake surface
- implementation can now proceed without re-deciding input fields, boundary
  rules, stop conditions, or downstream lane semantics
