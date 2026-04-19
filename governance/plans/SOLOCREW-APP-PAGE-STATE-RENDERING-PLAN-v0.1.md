# SOLOCREW-APP-PAGE-STATE-RENDERING-PLAN-v0.1

## A. Purpose

This document plans safe app/page rendering of bounded reducer-backed state
truth across the current founder-facing intake, handoff staging, and handoff
review surfaces.

It is:

- plan only
- no implementation in this wave
- no app/page changes
- no UI changes
- no reducer changes
- no derivation changes
- no state-evaluation logic changes
- no adapter changes
- no assembly behavior changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution
- no RC planning claim
- no Operational V1 completion claim

This plan freezes rendering scope, wording, page-to-page boundaries, and test
gates only.
It does not authorize state rendering implementation by itself.

## B. Current Blocker Being Addressed

Current blocker:

- `gap_app_page_state_truth_visibility`

Current classification:

- `RC_BLOCKER`

Why this blocker exists:

- reducer-backed state truth already exists below the page layer
- packet/review/staging state exposure already exists
- founder-facing intake now exists
- current app/pages do not yet fully render the available reducer-backed state
  truth
- rendering planning is therefore required before implementation or RC
  planning can proceed honestly

## C. Current Reusable Page Surfaces

### 1. Founder request intake page

- current file:
  - `app/pages/founder-request-intake-page.ts`
- current role:
  - founder-visible intake entry for bounded request identity, request text,
    hints, chronology, and explicit non-executing framing
- may render state truth:
  - yes, but only if a bounded evaluation summary becomes available later
- what state truth it may render:
  - non-executing posture first
  - optional bounded evaluation summary only
- what it must not render:
  - implied packet construction
  - execution state
  - queue or command semantics
- what must remain unchanged in this planning wave:
  - no page behavior changes
  - no UI changes

### 2. Handoff staging page

- current file:
  - `app/pages/secretary-handoff-page.ts`
- current role:
  - compact staging-only downstream visibility lane with rationale/evidence
    posture, revision framing, and founder-request exception preview
- may render state truth:
  - yes
- what state truth it may render:
  - compact preview only
  - blocked/stale/insufficiency summaries
  - explicit or inferable `non_executing`
- what it must not render:
  - full review-detail duplication
  - approval or execution semantics
- what must remain unchanged in this planning wave:
  - no page behavior changes
  - no staging-lane semantic widening

### 3. Handoff review page

- current file:
  - `app/pages/secretary-handoff-review-page.ts`
- current role:
  - detailed review-only explanation lane with rationale/evidence visibility,
    bounded recommendation framing, and review-return posture
- may render state truth:
  - yes
- what state truth it may render:
  - detailed reducer-backed state explanation
  - accepted / blocked / terminal semantics as state evaluation only
  - summary-safe notes and markers
- what it must not render:
  - founder approval meaning
  - execution-complete meaning
  - provider/channel or direct-control labels
- what must remain unchanged in this planning wave:
  - no page behavior changes
  - no UI changes

### 4. Founder intake shell

- current files:
  - `app/shell/founder-request-intake-contract.ts`
  - `app/shell/founder-request-intake.ts`
- current role:
  - bounded intake shell and compose helper for founder-visible request truth
- may render state truth:
  - yes, as a future intake-side rendering input if a bounded evaluation
    summary is later supplied
- what state truth it may render:
  - non-executing framing and limited state summary only
- what it must not render:
  - packet assembly law
  - queue or workflow semantics
- what must remain unchanged in this planning wave:
  - no shell behavior changes

### 5. Staging shell

- current file:
  - `app/shell/secretary-handoff-staging.ts`
- current role:
  - compose staging shell over existing portfolio/handoff projection truth
- may render state truth:
  - yes, by carrying compact `staging_state_exposure` downstream to the page
- what state truth it may render:
  - compact preview fields only
- what it must not render:
  - review-only detail
  - recomputed reducer/derivation truth
- what must remain unchanged in this planning wave:
  - no shell behavior changes

### 6. Review packet shell

- current file:
  - `app/shell/secretary-handoff-review-packet.ts`
- current role:
  - compose review packet shell over staged handoff truth
- may render state truth:
  - yes, by carrying detailed `review_packet_state_exposure` downstream to
    the page
- what state truth it may render:
  - full bounded evaluation explanation
- what it must not render:
  - direct-control, provider/channel, or queue semantics
- what must remain unchanged in this planning wave:
  - no shell behavior changes

## D. Rendering Purpose

State rendering is for:

- make reducer-backed state truth understandable to the founder
- show accepted / blocked / terminal as state evaluation semantics only
- show evidence / stale / insufficiency safely
- show `non_executing` boundary clearly
- connect intake -> staging -> review as an understandable user story
- support later RC criteria drafting

State rendering is not for:

- approval workflow
- execution workflow
- dispatch workflow
- provider/channel automation
- founder queue
- command surface
- Operational V1 completion claim

## E. Renderable State Fields

### 1. `evaluation_id`

- user-facing meaning:
  - bounded reference for one state evaluation summary
- forbidden interpretation:
  - workflow id
  - queue id
- founder intake page:
  - optional only if bounded evaluation summary becomes available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 2. `initial_state`

- user-facing meaning:
  - bounded starting state for the evaluated state line
- forbidden interpretation:
  - execution start
- founder intake page:
  - optional only if later summary is available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 3. `transition_event`

- user-facing meaning:
  - bounded state-event label describing what kind of transition was evaluated
- forbidden interpretation:
  - command
  - execution trigger
- founder intake page:
  - optional only if later summary is available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 4. `requested_next_state`

- user-facing meaning:
  - requested bounded next-state intent
- forbidden interpretation:
  - promised outcome
  - approval result
- founder intake page:
  - no
- staging page:
  - no
- review page:
  - yes
- display shape:
  - detailed only

### 5. `reducer_target_state`

- user-facing meaning:
  - reducer-backed target state for the evaluated transition
- forbidden interpretation:
  - direct-control destination
  - execution result
- founder intake page:
  - no
- staging page:
  - no
- review page:
  - yes
- display shape:
  - detailed only

### 6. `transition_accepted`

- user-facing meaning:
  - state evaluation accepted
- forbidden interpretation:
  - founder approval
  - policy approval
- founder intake page:
  - optional only if bounded evaluation summary is later available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 7. `final_state`

- user-facing meaning:
  - resulting bounded state after evaluation
- forbidden interpretation:
  - delivery complete
  - execution complete
- founder intake page:
  - optional only if bounded evaluation summary is later available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 8. `blocked_reason`

- user-facing meaning:
  - blocked state transition reason
- forbidden interpretation:
  - task failure verdict
  - blame assignment
- founder intake page:
  - optional only if bounded evaluation summary is later available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 9. `terminal`

- user-facing meaning:
  - state line terminal
- forbidden interpretation:
  - execution complete
  - business loop complete
- founder intake page:
  - optional only if bounded evaluation summary is later available
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 10. `non_executing`

- user-facing meaning:
  - this rendered state truth remains non-executing
- forbidden interpretation:
  - ready for execution
  - latent command
- founder intake page:
  - yes
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - visible or strongly inferable on every surface

### 11. `source_posture`

- user-facing meaning:
  - bounded posture summary describing the evidence/source posture feeding the
    evaluation
- forbidden interpretation:
  - runtime authority
- founder intake page:
  - no
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 12. `source_markers`

- user-facing meaning:
  - summary-safe markers for omission, insufficiency, stale, or availability
- forbidden interpretation:
  - raw trace
  - raw proof
- founder intake page:
  - no
- staging page:
  - yes
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

### 13. `notes`

- user-facing meaning:
  - bounded explanation notes about the current state evaluation
- forbidden interpretation:
  - raw trace dump
  - runtime-private evidence export
- founder intake page:
  - no
- staging page:
  - yes, compact subset only
- review page:
  - yes
- display shape:
  - compact on staging
  - detailed on review

## F. Surface Mapping

### 1. `founder_request_intake_page`

- may show:
  - intake identity
  - request text
  - `non_executing` boundary
  - bounded evaluation summary only if such summary is later lawfully
    available
- must not imply:
  - packet construction
  - packet submission
  - execution

### 2. `secretary_handoff_staging_page`

- may show:
  - compact state preview
  - stale / insufficiency / blocked summary
  - summary-safe posture and marker framing
- must not:
  - duplicate full review detail
  - collapse review semantics into staging semantics

### 3. `secretary_handoff_review_page`

- may show:
  - detailed state explanation
  - accepted / blocked / terminal explanation
  - detailed summary-safe notes and marker framing
- must:
  - frame `transition_accepted` as reducer transition truth, not approval
  - frame `terminal` as state-line terminality, not execution complete
- must not:
  - introduce provider/channel or direct-control meaning

## G. Required Display Language Constraints

Future rendering must preserve these wording constraints:

- use `state evaluation accepted` or equivalent, not `approved`
- use `blocked state transition` or equivalent, not `failed task`
- use `state line terminal` or equivalent, not `execution complete`
- use `non_executing` visibly or inferably
- use `evidence summary`, not `proof`
- use `suggestion-only` for learning suggestions
- avoid queue, command, delivery, provider/channel terms

## H. Future Implementation Boundaries

Expected next wave:

- `App/page state rendering implementation`

That future implementation must:

- reuse existing page/shell conventions
- consume existing state exposure fields only
- not change reducer / derivation / state evaluation logic
- not change adapter behavior
- not change assembly semantics
- not create queue behavior
- not create provider/channel behavior
- not introduce approval / dispatch / execution labels
- keep rendering summary-safe

## I. Required Tests For Future Implementation

Future tests must cover:

- founder intake page remains non-executing
- staging page renders compact state truth safely
- review page renders detailed state truth safely
- `transition_accepted` is not approval
- `terminal` is not execution complete
- `blocked_reason` is not task failure verdict
- `evidence summary` is not proof
- forbidden labels remain absent
- no queue / command / provider / channel semantics
- existing projection tests remain green
- full `npm test` remains green

## J. Stop / Rollback Conditions

Stop future implementation if it requires:

- new queue semantics
- command semantics
- approval / dispatch / execution semantics
- provider/channel semantics
- raw runtime dependency
- changing reducer / derivation / state-evaluation logic
- raw trace / raw evidence dump
- Operational V1 completion claim

## K. Boundary Conclusion

Selected boundary conclusion:

- `APP_PAGE_STATE_RENDERING_PLAN_READY_FOR_IMPLEMENTATION`

Why this conclusion is supported:

- founder-facing intake is now closed and available as the upstream founder
  entry lane
- staging and review already expose bounded reducer-backed state truth below
  the page layer
- page/shell conventions already exist for intake, staging, and review
- field-level meanings and language constraints can now be frozen without new
  implementation
- no additional reducer, derivation, adapter, or assembly planning is required
  before a page-rendering code wave can start

## L. Next Wave Recommendation

Recommended next wave:

- `SoloCrew app/page state rendering implementation`

Why this is the next smallest lawful step:

- the remaining RC blocker at this layer is not planning ambiguity but the
  absence of page-level rendering of already-available bounded state truth
- the existing contracts, assemblies, shells, and pages already define the
  correct compact-vs-detailed lane split
- implementation can therefore focus on safe wording and bounded rendering
  rather than new state law
