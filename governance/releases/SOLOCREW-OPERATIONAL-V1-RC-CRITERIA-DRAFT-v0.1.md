# SOLOCREW-OPERATIONAL-V1-RC-CRITERIA-DRAFT-v0.1

## A. Purpose

This document defines the criteria for deciding whether SoloCrew may enter
Operational V1 RC planning.

It is:

- criteria draft only
- no RC planning in this wave
- no release claim
- no release seal
- no Operational V1 completion claim
- no implementation
- no code changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution

This draft freezes the RC entry bar for the current bounded founder-request
product as it exists today.
It does not begin RC planning, seal a release, or upgrade bounded product truth
into execution authority.

## B. Operational V1 Candidate Boundary

The Operational V1 candidate under these criteria is:

- a bounded, non-executing founder-request operating loop with Founder-facing
  intake, App/page state rendering, review/staging visibility,
  evidence/stale/insufficiency semantics, reducer-backed state truth, and safe
  page rendering below approval, dispatch, execution, provider/channel, and
  autonomous operation semantics

This candidate is not:

- provider/channel automation
- approval workflow
- dispatch workflow
- external business execution
- autonomous company operation
- founder queue execution
- protocol certification

## C. RC Entry Gates

### 1. `gate_founder_intake_closed`

- gate statement:
  - Founder-facing intake exists and is closed.
- required evidence:
  - `governance/audits/SOLOCREW-FOUNDER-FACING-REQUEST-INTAKE-CLOSURE-AUDIT-v0.1.md`
  - `app/pages/founder-request-intake-page.ts`
  - `tests/app/founder-request-intake-page.test.ts`
- pass condition:
  - a founder-visible intake surface exists, remains intake-only by default,
    and keeps `non_executing` explicit or inferable
- fail condition:
  - founder intake is missing, broken, or widened into queue, command, or
    execution semantics
- owner artifact / source docs:
  - founder intake closure audit
- whether blocking:
  - yes

### 2. `gate_app_page_rendering_closed`

- gate statement:
  - App/page state rendering exists and is closed.
- required evidence:
  - `governance/audits/SOLOCREW-APP-PAGE-STATE-RENDERING-CLOSURE-AUDIT-v0.1.md`
  - `app/pages/founder-request-intake-page.ts`
  - `app/pages/secretary-handoff-page.ts`
  - `app/pages/secretary-handoff-review-page.ts`
  - app rendering tests
- pass condition:
  - founder intake, staging, and review pages render bounded state truth using
    safe compact-vs-detailed boundaries
- fail condition:
  - page-level state truth remains absent, broken, or semantically widened
- owner artifact / source docs:
  - app/page state rendering closure audit
- whether blocking:
  - yes

### 3. `gate_e2e_loop_closed`

- gate statement:
  - End-to-end bounded founder-request loop is closed.
- required evidence:
  - `governance/audits/SOLOCREW-END-TO-END-BUSINESS-LOOP-CLOSURE-AUDIT-v0.1.md`
- pass condition:
  - the founder-request loop is frozen as a closed end-to-end non-executing
    loop from bounded projection through page-facing exposure
- fail condition:
  - any required loop segment remains partial or blocked
- owner artifact / source docs:
  - end-to-end business-loop closure audit
- whether blocking:
  - yes

### 4. `gate_evidence_semantics_visible`

- gate statement:
  - Evidence / stale / insufficiency semantics are visible and tested.
- required evidence:
  - `governance/audits/SOLOCREW-DISPLAY-HARDENING-CLOSURE-AUDIT-v0.1.md`
  - `governance/audits/SOLOCREW-APP-PAGE-STATE-RENDERING-CLOSURE-AUDIT-v0.1.md`
  - app rendering tests
- pass condition:
  - evidence summary, stale, omission, and insufficiency remain visible through
    bounded page wording and regression tests
- fail condition:
  - evidence posture is hidden, widened into proof, or no longer regression
    covered
- owner artifact / source docs:
  - display hardening and rendering closure audits
- whether blocking:
  - yes

### 5. `gate_reducer_backed_truth_safe`

- gate statement:
  - Reducer-backed state truth is available and rendered safely.
- required evidence:
  - `governance/audits/SOLOCREW-STATE-EXPOSURE-CLOSURE-AUDIT-v0.1.md`
  - `governance/audits/SOLOCREW-REDUCER-INTEGRATION-CLOSURE-AUDIT-v0.1.md`
  - `governance/audits/SOLOCREW-PACKET-LEVEL-STATE-DERIVATION-CLOSURE-AUDIT-v0.1.md`
  - state-evaluation and page-rendering tests
- pass condition:
  - reducer-backed evaluation fields remain available below the page layer and
    current pages render them with wording such as `transition_accepted` is
    not approval and `terminal` is not execution complete
- fail condition:
  - state truth is missing, misrendered, or widened into approval/execution
    semantics
- owner artifact / source docs:
  - state exposure, reducer integration, and packet-level derivation closure
    audits
- whether blocking:
  - yes

### 6. `gate_non_executing_boundary_visible`

- gate statement:
  - Non-executing boundary is visible or inferable across surfaces.
- required evidence:
  - founder intake closure audit
  - app/page rendering closure audit
  - app page tests
- pass condition:
  - intake, staging, and review surfaces keep `non_executing` visible or
    inferable and do not imply direct-control workflow authority
- fail condition:
  - any core surface implies hidden execution, dispatch, or workflow start
- owner artifact / source docs:
  - intake and rendering closure audits
- whether blocking:
  - yes

### 7. `gate_forbidden_semantics_blocked`

- gate statement:
  - Forbidden labels / behaviors are blocked by tests.
- required evidence:
  - app tests
  - projection tests
  - forbidden-token grep checks from the most recent closure waves
- pass condition:
  - tests and grep checks keep approve/reject/dispatch/execute,
    provider/channel, queue/command, and runtime-private widening out of the
    SoloCrew product surface
- fail condition:
  - forbidden tokens or behaviors appear in current bounded surfaces without
    explicit negative-test context
- owner artifact / source docs:
  - app tests, projection tests, latest closure audits
- whether blocking:
  - yes

### 8. `gate_regression_suite_green`

- gate statement:
  - Projection / assembly / app regression suite is green.
- required evidence:
  - targeted app and projection test commands
  - full `npm test`
- pass condition:
  - latest targeted suites and full repo suite pass on `main`
- fail condition:
  - any targeted suite or full suite fails
- owner artifact / source docs:
  - repo test suite and validation logs
- whether blocking:
  - yes

### 9. `gate_version_boundary_honest`

- gate statement:
  - Version boundary is honest.
- required evidence:
  - `README.md`
  - `governance/baselines/SOLOCREW-REPO-V1-VS-OPERATIONAL-V1-BOUNDARY-v0.1.md`
  - `governance/releases/SOLOCREW-v1.0-DELIVERY-CLOSURE-RECORD.md`
- pass condition:
  - repo/platform `v1.0` remains distinct from Operational V1 and current docs
    do not over-read product closure as runtime or protocol authority
- fail condition:
  - current docs collapse repo/platform closure into Operational V1 completion
- owner artifact / source docs:
  - README and version-boundary baseline
- whether blocking:
  - yes

### 10. `gate_release_story_honest`

- gate statement:
  - Release story does not overclaim execution, provider/channel automation, or
    direct-control behavior.
- required evidence:
  - readiness audit
  - gap remediation plan
  - this criteria draft
  - changelog / release docs
- pass condition:
  - release narrative stays inside bounded, non-executing founder-request
    product language
- fail condition:
  - any RC-facing narrative implies approval workflow, dispatch workflow,
    provider/channel automation, or autonomous operation
- owner artifact / source docs:
  - readiness audit, gap remediation plan, criteria draft
- whether blocking:
  - yes

## D. Allowed Disclosed Gaps for RC

### 1. No provider/channel execution

- why allowed:
  - the Operational V1 candidate is explicitly bounded and non-executing
- required disclosure wording:
  - "No provider/channel execution is included in this RC candidate."
- what must not be implied:
  - no provider send, channel publish, or downstream delivery automation

### 2. No approve/reject/dispatch/execute

- why allowed:
  - direct-control workflow is explicitly outside the current product boundary
- required disclosure wording:
  - "No approve/reject/dispatch/execute behavior is included in this RC
    candidate."
- what must not be implied:
  - no approval workflow, dispatch workflow, or execution workflow exists

### 3. No founder queue execution

- why allowed:
  - founder queue execution is not part of the bounded founder-request product
    now being evaluated
- required disclosure wording:
  - "No founder queue execution is included in this RC candidate."
- what must not be implied:
  - no queued work processor or automatic workflow runner exists

### 4. No external business action execution

- why allowed:
  - the current loop ends in review/explanation/visibility rather than business
    action execution
- required disclosure wording:
  - "This RC candidate does not execute external business actions."
- what must not be implied:
  - no external dispatch, delivery, or outcome completion occurs

### 5. No autonomous company operation

- why allowed:
  - current product surfaces remain explicitly below autonomous operation
    semantics
- required disclosure wording:
  - "This RC candidate is not autonomous company operation."
- what must not be implied:
  - no self-governing operating system authority exists here

### 6. No protocol certification

- why allowed:
  - SoloCrew remains downstream of `MPLP Protocol` and `Cognitive_OS`
- required disclosure wording:
  - "This RC candidate does not certify protocol compliance or protocol state."
- what must not be implied:
  - no protocol authority has moved into SoloCrew product space

### 7. No live user scenario validation

- why allowed:
  - current regression coverage is strong enough to keep this as a disclosure
    gap rather than an automatic RC blocker
- required disclosure wording:
  - "Live founder scenario validation remains an RC validation gap and is not
    yet closed."
- what must not be implied:
  - no claim that green tests equal live founder usability

## E. Non-Negotiable Blockers

- page-level founder intake missing
- App/page state rendering missing or materially incomplete
- `transition_accepted` rendered as approval
- `terminal` rendered as execution complete
- `evidence summary` rendered as proof
- provider/channel execution claim
- approve/reject/dispatch/execute claim
- Operational V1 completion claim before seal
- failing full regression tests
- raw runtime or `Cognitive_OS` dependency leaking into SoloCrew product
  surface

Any one of these blockers must stop RC planning immediately.

## F. Evidence Requirements

Required evidence before RC planning may begin:

- latest closure audits for intake, app/page rendering, end-to-end loop, state
  exposure, reducer integration, packet-level derivation, portfolio aggregate,
  display hardening, and assembly enrichment
- app/page rendering tests
- founder intake tests
- projection tests
- full `npm test`
- forbidden-token grep checks
- changelog consistency
- README / release-boundary consistency where current narrative touches version
  scope

This evidence proves:

- the bounded founder-request loop exists end to end in non-executing product
  space
- Founder-facing intake exists
- App/page state rendering exists
- reducer-backed state truth is available and safely rendered below approval
  and execution semantics
- `evidence summary` remains bounded explanation and not proof
- forbidden labels and runtime-private widening remain regression-guarded

This evidence does not prove:

- intake-to-packet connection
- live founder usability
- provider/channel execution
- external business action execution
- Operational V1 completion

## G. RC Narrative Constraints

Allowed language:

- bounded founder-request operating loop
- non-executing operational visibility
- review/staging evidence visibility
- reducer-backed state evaluation
- safe founder-facing intake
- RC candidate for bounded Operational V1

Forbidden language:

- autonomous company
- execution automation
- provider/channel automation
- approval workflow
- dispatch workflow
- founder queue
- production-ready execution system
- certified protocol compliance

## H. RC Planning Prerequisites

Before RC planning may begin, all of the following must exist:

- this criteria draft
- latest closure audits passed
- no blocking gap open
- RC disclosure text drafted
- release boundary checked against README and version docs
- validation command list frozen
- stop conditions frozen

## I. Stop Conditions

RC planning must stop if:

- any blocking gate fails
- tests fail
- docs overclaim execution
- product pages imply provider/channel or direct-control behavior
- raw runtime dependency leaks into product surface
- Operational V1 is described as complete before seal

## J. Readiness Decision

Selected readiness value:

- `RC_CRITERIA_DRAFT_READY_FOR_RC_PLANNING`

Reasoning:

- Founder-facing intake is now implemented and closed.
- App/page state rendering is now implemented and closed.
- The end-to-end bounded founder-request loop is already closed.
- Evidence, stale, and insufficiency semantics are visible and regression
  covered.
- Reducer-backed state truth is available and page-rendered with safe wording.
- Current remaining gaps are explicitly disclosable RC gaps or future feature
  lines, not unresolved RC entry blockers.
- The repo/version boundary remains honest: repo/platform `v1.0` is already
  delivered, while Operational V1 remains separately governed.

## K. Next Wave Recommendation

Recommended next wave:

- `SoloCrew Operational V1 RC planning`

Why:

- the current repo now has closed intake, closed page rendering, closed
  end-to-end founder-request loop, explicit RC entry gates, explicit allowed
  disclosures, explicit blockers, and frozen stop conditions
- the next smallest truthful step is therefore RC planning rather than more
  pre-RC criteria work or intake-to-packet connection planning
