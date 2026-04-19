# SOLOCREW-OPERATIONAL-V1-GAP-REMEDIATION-PLAN-v0.1

## A. Purpose

This document converts the Operational V1 readiness audit's disclosed gaps
into a bounded remediation plan.

It is:

- plan only
- no implementation in this wave
- no RC planning in this wave
- no release claim
- no Operational V1 completion claim
- no code changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution

This plan does not reopen the current closed founder-request loop.
It only sequences the remaining remediation work needed before any lawful
Operational V1 RC planning can begin.

## B. Current Readiness Judgment

Current readiness judgment:

- `OPERATIONAL_V1_READY_WITH_DISCLOSED_GAPS`

This means:

- the current founder-request loop exists end to end as bounded,
  non-executing product space
- the current loop is test-backed and boundary-disciplined
- the current loop is not yet a clean founder-facing RC story
- remediation is needed before RC planning

## C. Gap Inventory

### 1. `gap_founder_facing_request_intake`

- source evidence:
  - `governance/audits/SOLOCREW-OPERATIONAL-V1-READINESS-AUDIT-v0.1.md`
  - current app/page surfaces under `app/pages/`
- user impact:
  - founders do not have a visible app/page place to enter a request into the
    current bounded loop
- risk if ignored:
  - the loop remains partly internal substrate rather than founder-usable
- current mitigation:
  - bounded packet/adapter/state chain already exists below the app/page layer
- recommended remediation class:
  - founder-facing request intake

### 2. `gap_app_page_state_truth_visibility`

- source evidence:
  - `governance/audits/SOLOCREW-OPERATIONAL-V1-READINESS-AUDIT-v0.1.md`
  - `governance/audits/SOLOCREW-STATE-EXPOSURE-CLOSURE-AUDIT-v0.1.md`
  - current `app/pages/secretary-handoff-review-page.ts`
  - current `app/pages/secretary-handoff-page.ts`
- user impact:
  - founders cannot see the full reducer-backed state truth now present in
    packet/review/staging exposure
- risk if ignored:
  - accepted/blocked/terminal semantics stay hidden or partly legible only in
    lower projection lanes
- current mitigation:
  - review/staging pages already show evidence/stale/omission posture safely
- recommended remediation class:
  - app/page state rendering

### 3. `gap_rc_story_and_release_narrative`

- source evidence:
  - `governance/audits/SOLOCREW-OPERATIONAL-V1-READINESS-AUDIT-v0.1.md`
  - `README.md`
  - `governance/baselines/SOLOCREW-REPO-V1-VS-OPERATIONAL-V1-BOUNDARY-v0.1.md`
- user impact:
  - current product story is still partly "bounded operating substrate" rather
    than an explicit founder-facing RC story
- risk if ignored:
  - RC planning could overclaim or leave the founder promise ambiguous
- current mitigation:
  - repo/platform `v1.0` and Operational V1 remain explicitly separated
- recommended remediation class:
  - RC story / release narrative

### 4. `gap_live_scenario_validation`

- source evidence:
  - readiness audit evidence posture and risk sections
  - current regression tests under `tests/projection/` and `tests/app/`
- user impact:
  - founder usefulness is inferred from tests rather than validated through a
    realistic scenario narrative
- risk if ignored:
  - RC could rest on green tests without a concrete operating walkthrough
- current mitigation:
  - strong targeted and full-suite regression coverage
- recommended remediation class:
  - live scenario validation

### 5. `gap_portfolio_state_exposure_rendering`

- source evidence:
  - readiness audit and state exposure closure audit
  - current `projection/assembly/portfolio-secretary-shell.ts`
- user impact:
  - portfolio shell aggregates bounded posture but does not render
    reducer-backed state truth directly
- risk if ignored:
  - aggregate posture may remain useful but less explanatory than the lower
    review/staging lanes
- current mitigation:
  - bounded non-executing aggregate posture already exists
- recommended remediation class:
  - portfolio state exposure rendering

### 6. `gap_operational_v1_rc_criteria_draft`

- source evidence:
  - readiness audit boundary conclusion and release boundary recommendation
- user impact:
  - there is no formal RC bar telling the founder or team when the gap set is
    sufficiently remediated
- risk if ignored:
  - RC planning may start without explicit entry gates
- current mitigation:
  - current readiness audit already names the key gaps and blockers
- recommended remediation class:
  - Operational V1 RC criteria draft

## D. Gap Classification

### 1. `gap_founder_facing_request_intake`

- classification:
  - `RC_BLOCKER`
- reason:
  - current app/page surfaces do not yet provide a visible founder-facing entry
    path into the bounded loop

### 2. `gap_app_page_state_truth_visibility`

- classification:
  - `RC_BLOCKER`
- reason:
  - current app/page surfaces do not expose the full reducer-backed state truth
    that now materially defines the loop's bounded outcome and review posture

### 3. `gap_rc_story_and_release_narrative`

- classification:
  - `RC_BLOCKER`
- reason:
  - the release candidate story remains ambiguous without a founder-facing
    explanation of what the loop is and is not

### 4. `gap_live_scenario_validation`

- classification:
  - `RC_DISCLOSURE_REQUIRED`
- reason:
  - current tests are strong enough to keep this from being a hard blocker, but
    lack of real scenario validation must remain explicit in any RC discussion

### 5. `gap_portfolio_state_exposure_rendering`

- classification:
  - `POST_RC_ENHANCEMENT`
- reason:
  - current portfolio aggregate posture already provides bounded portfolio-level
    visibility, so direct reducer-backed rendering in portfolio shell is useful
    but not clearly required before first RC planning

### 6. `gap_operational_v1_rc_criteria_draft`

- classification:
  - `RC_BLOCKER`
- reason:
  - RC planning without explicit criteria would blur readiness, remediation,
    and release judgment

### 7. Provider/channel execution absence

- classification:
  - `NOT_IN_SCOPE_FOR_OPERATIONAL_V1`
- reason:
  - current Operational V1 candidate is explicitly bounded and non-executing

### 8. Approve/reject/dispatch/execute absence

- classification:
  - `NOT_IN_SCOPE_FOR_OPERATIONAL_V1`
- reason:
  - current Operational V1 candidate explicitly excludes direct-control
    workflow

## E. Remediation Waves

### 1. Founder-facing request intake plan

- objective:
  - define the smallest lawful founder-facing intake surface over the existing
    bounded founder-request loop
- allowed files / likely surfaces:
  - governance docs
  - `app/pages/`
  - `app/shell/`
  - existing founder-request projection contracts for reference only
- explicit non-goals:
  - no founder queue
  - no approve/reject/dispatch/execute
  - no provider/channel execution
- required tests / evidence:
  - current handoff/app regression surfaces reviewed
  - intake boundary and no-direct-control semantics frozen
- stop conditions:
  - a bounded intake wave can be implemented without widening semantics
- required before RC planning:
  - yes

### 2. Founder-facing request intake implementation

- objective:
  - add the smallest bounded founder-facing request intake path into current
    SoloCrew app/shell space
- allowed files / likely surfaces:
  - `app/pages/`
  - `app/shell/`
  - supporting app/projection tests
- explicit non-goals:
  - no queue execution
  - no execution workflow
  - no provider/channel behavior
- required tests / evidence:
  - app regression coverage for intake visibility and boundary discipline
- stop conditions:
  - founders can see where to enter a request without widening semantics
- required before RC planning:
  - yes

### 3. App/page state rendering plan

- objective:
  - define how reducer-backed state truth should surface on current pages
- allowed files / likely surfaces:
  - governance docs
  - current review/staging pages and shells as reference
- explicit non-goals:
  - no UI redesign beyond bounded rendering semantics
  - no execution affordances
- required tests / evidence:
  - state exposure fields and page test inventory reviewed
- stop conditions:
  - page-safe rendering semantics are frozen
- required before RC planning:
  - yes

### 4. App/page state rendering implementation

- objective:
  - expose the bounded reducer-backed state truth on current founder-facing
    review/staging surfaces
- allowed files / likely surfaces:
  - `app/pages/`
  - `app/shell/`
  - supporting tests
- explicit non-goals:
  - no direct-control semantics
  - no queue semantics
  - no provider/channel semantics
- required tests / evidence:
  - app tests proving `transition_accepted`, blocked, terminal, and
    non-executing meaning stay honest
- stop conditions:
  - founders can see what the system understood and what remains blocked or
    non-executing
- required before RC planning:
  - yes

### 5. RC story / release narrative plan

- objective:
  - freeze the founder-facing release story and non-claims for Operational V1
- allowed files / likely surfaces:
  - governance docs
  - README/release-adjacent docs for reference
- explicit non-goals:
  - no release seal
  - no Operational V1 completion claim
- required tests / evidence:
  - readiness audit and repo/platform boundary remain aligned
- stop conditions:
  - one honest founder-facing narrative exists for the bounded loop
- required before RC planning:
  - yes

### 6. Live scenario validation plan

- objective:
  - define one or more realistic bounded founder scenarios to validate later
- allowed files / likely surfaces:
  - governance docs
  - existing test surfaces for reference
- explicit non-goals:
  - no live external execution
  - no provider/channel integration
- required tests / evidence:
  - scenario success criteria and disclosure rules frozen
- stop conditions:
  - later validation can occur without redefining loop semantics
- required before RC planning:
  - no, but disclosure remains required

### 7. Operational V1 RC criteria draft

- objective:
  - draft explicit entry criteria for later RC planning
- allowed files / likely surfaces:
  - governance docs
  - readiness and remediation docs
- explicit non-goals:
  - no RC planning
  - no release seal
- required tests / evidence:
  - blocker gaps reviewed against completed remediation waves
- stop conditions:
  - RC planning can start against a truthful criteria set
- required before RC planning:
  - yes

## F. Non-Goals

Remediation must not implement:

- provider/channel execution
- approve/reject/dispatch/execute
- autonomous company operation
- direct-control workflow
- external business action execution
- founder queue execution
- Operational V1 completion claim

## G. User-View Remediation Target

After remediation, the founder must be able to understand:

- where to enter a request
- what the system understood
- what evidence is available / stale / insufficient
- what state evaluation says
- what is blocked or requires review
- what is only a recommendation
- what is not executed
- what remains out of scope

## H. Readiness After Remediation

Expected post-remediation target:

- `OPERATIONAL_V1_READY_FOR_RC_PLANNING`

This target must be proven by a later audit.
It is not claimed by this document.

## I. Boundary Conclusion

Selected boundary conclusion:

- `GAP_REMEDIATION_PLAN_READY_FOR_FOUNDER_INTAKE_PLANNING`

Why:

- founder-facing request intake is the clearest first RC-blocking gap
- current readiness evidence already shows the underlying bounded loop is
  present below the page layer
- intake planning should come before page-level state rendering because it
  defines how the founder enters the loop at all

## J. Next Wave Recommendation

Recommended next wave:

- `SoloCrew founder-facing request intake plan`

Why:

- the current bounded founder-request loop lacks a visible founder entry point
- that gap is an explicit `RC_BLOCKER`
- founder-facing intake planning is the smallest lawful next step before any
  RC story or page-state rendering implementation can be judged complete
