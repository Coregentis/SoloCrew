# SOLOCREW-OPERATIONAL-V1-RC-PLAN-v0.1

## A. Purpose

This document plans an Operational V1 RC candidate based on the frozen RC
criteria.

It is:

- RC planning only
- no release seal
- no Operational V1 completion claim
- no implementation
- no code changes
- no app/page changes
- no UI changes
- no founder queue
- no approve/reject/dispatch/execute
- no provider/channel execution

This plan sequences how a bounded RC candidate should be verified.
It does not seal a release, claim Operational V1 completion, or authorize any
new implementation.

## B. RC Candidate Scope

The RC candidate is:

- a bounded, non-executing founder-request operating loop with founder-facing
  intake, handoff staging/review visibility, evidence/stale/insufficiency
  semantics, reducer-backed state truth, and safe page rendering below
  approval, dispatch, execution, provider/channel, queue, and
  autonomous-operation semantics

RC includes:

- founder-facing request intake
- bounded founder request object
- handoff staging preview
- handoff review explanation
- evidence summary / stale / insufficiency visibility
- portfolio aggregate posture
- reducer-backed state evaluation
- page-level bounded state rendering
- regression-backed non-executing boundary

RC excludes:

- provider/channel execution
- approve/reject/dispatch/execute
- founder queue execution
- external business action execution
- autonomous company operation
- protocol certification
- release seal
- Operational V1 completion claim

## C. RC Gate Checklist

### 1. `gate_founder_intake_closed`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - `governance/audits/SOLOCREW-FOUNDER-FACING-REQUEST-INTAKE-CLOSURE-AUDIT-v0.1.md`
  - `app/pages/founder-request-intake-page.ts`
  - `tests/app/founder-request-intake-page.test.ts`
- validation command or artifact:
  - founder intake closure audit
  - `node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`
- pass condition:
  - founder-facing intake exists, remains intake-only by default, and keeps
    `non_executing` explicit or inferable
- fail condition:
  - intake is missing, broken, or widened into queue, command, or execution
    semantics
- blocking status:
  - yes

### 2. `gate_app_page_rendering_closed`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - `governance/audits/SOLOCREW-APP-PAGE-STATE-RENDERING-CLOSURE-AUDIT-v0.1.md`
  - page renderers
  - page rendering tests
- validation command or artifact:
  - app/page rendering closure audit
  - app rendering tests
- pass condition:
  - intake, staging, and review pages render bounded state truth with safe
    compact-vs-detailed boundaries
- fail condition:
  - page-level state truth is absent, broken, or widened semantically
- blocking status:
  - yes

### 3. `gate_e2e_loop_closed`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - `governance/audits/SOLOCREW-END-TO-END-BUSINESS-LOOP-CLOSURE-AUDIT-v0.1.md`
- validation command or artifact:
  - end-to-end business-loop closure audit
- pass condition:
  - the bounded founder-request loop remains closed end to end as a
    non-executing review/explanation/visibility loop
- fail condition:
  - any core loop segment is still partial or blocked
- blocking status:
  - yes

### 4. `gate_evidence_semantics_visible`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - display hardening closure audit
  - app/page rendering closure audit
  - staging/review page tests
- validation command or artifact:
  - app tests
  - rendering closure artifacts
- pass condition:
  - evidence summary, stale, omission, and insufficiency remain visible and
    safely worded
- fail condition:
  - evidence semantics disappear, drift into proof language, or lose test
    coverage
- blocking status:
  - yes

### 5. `gate_reducer_backed_truth_safe`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - state exposure closure audit
  - reducer integration closure audit
  - packet-level derivation closure audit
  - state-evaluation and page tests
- validation command or artifact:
  - projection tests
  - grep checks for `transition_accepted`, `not approval`, `terminal`, `not execution complete`
- pass condition:
  - reducer-backed truth exists and current pages render it below approval and
    execution semantics
- fail condition:
  - state truth is missing or rendered as approval, completion, or task
    control
- blocking status:
  - yes

### 6. `gate_non_executing_boundary_visible`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - founder intake closure audit
  - app/page rendering closure audit
  - page tests
- validation command or artifact:
  - app tests
  - grep checks for `non_executing`
- pass condition:
  - intake, staging, and review keep the non-executing boundary visible or
    inferable
- fail condition:
  - any core surface implies hidden execution, dispatch, queue, or workflow
    start
- blocking status:
  - yes

### 7. `gate_forbidden_semantics_blocked`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - app tests
  - projection tests
  - forbidden-token grep results
- validation command or artifact:
  - targeted tests
  - grep checks for approve/reject/dispatch/execute and provider/channel
    wording
- pass condition:
  - forbidden labels and forbidden behaviors stay blocked by code shape and
    regression coverage
- fail condition:
  - any forbidden label, control workflow, or runtime-private widening appears
- blocking status:
  - yes

### 8. `gate_regression_suite_green`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - targeted test runs
  - full `npm test`
  - `git diff --check`
- validation command or artifact:
  - frozen validation command set in section D
- pass condition:
  - all frozen targeted tests and full suite pass
- fail condition:
  - any targeted or full-suite regression fails
- blocking status:
  - yes

### 9. `gate_version_boundary_honest`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - `README.md`
  - `governance/baselines/SOLOCREW-REPO-V1-VS-OPERATIONAL-V1-BOUNDARY-v0.1.md`
  - `governance/releases/SOLOCREW-v1.0-DELIVERY-CLOSURE-RECORD.md`
- validation command or artifact:
  - version boundary docs
  - changelog / RC docs review
- pass condition:
  - repo/platform `v1.0` remains distinct from Operational V1 and no current
    doc collapses the two
- fail condition:
  - any release doc implies Operational V1 is already complete or sealed
- blocking status:
  - yes

### 10. `gate_release_story_honest`

- current status:
  - `READY_TO_VERIFY`
- required evidence:
  - RC criteria draft
  - this RC plan
  - readiness audit
  - changelog / README / release docs
- validation command or artifact:
  - manual doc review
  - grep checks for forbidden claims
- pass condition:
  - RC story remains bounded, non-executing, and below provider/channel and
    direct-control semantics
- fail condition:
  - RC story implies execution automation, approval workflow, dispatch
    workflow, founder queue, or autonomous operation
- blocking status:
  - yes

## D. RC Validation Command Set

The later RC audit must run at minimum:

- `node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`
- `node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts`
- `node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-state-evaluation.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-packet-state-derivation.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-state-machine-contract.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-state-machine-reducer.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-packet-contract.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-packet-adapter.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-exception-posture-derivation.test.ts`
- `node --experimental-strip-types --test tests/projection/secretary-handoff-review-packet.test.ts`
- `node --experimental-strip-types --test tests/projection/secretary-handoff-staging.test.ts`
- `node --experimental-strip-types --test tests/projection/portfolio-secretary-shell.test.ts`
- `npm test`
- `git diff --check`

The later RC audit must also require grep/self-check coverage for:

- `transition_accepted`
- `not approval`
- `terminal`
- `not execution complete`
- `evidence summary`
- `not proof`
- `non_executing`
- `no approve/reject/dispatch/execute`
- `no provider/channel execution`
- `no Operational V1 completion claim`

## E. Required RC Evidence Pack

The following evidence artifacts must exist before any RC closure judgment:

- RC plan
- RC criteria draft
- latest closure audits
- validation command output
- changelog entry
- version boundary reference
- disclosed gap statement
- forbidden-claim grep results
- RC readiness / closure audit

## F. Allowed RC Disclosed Gaps

### 1. No provider/channel execution

- required wording:
  - `No provider/channel execution is included in this RC candidate.`

### 2. No approve/reject/dispatch/execute

- required wording:
  - `No approve/reject/dispatch/execute behavior is included in this RC candidate.`

### 3. No founder queue execution

- required wording:
  - `No founder queue execution is included in this RC candidate.`

### 4. No external business action execution

- required wording:
  - `This RC candidate does not execute external business actions.`

### 5. No autonomous company operation

- required wording:
  - `This RC candidate is not autonomous company operation.`

### 6. No protocol certification

- required wording:
  - `This RC candidate does not certify protocol compliance or protocol state.`

### 7. No live founder scenario validation

- required wording:
  - `Live founder scenario validation remains an RC validation gap and is not yet closed.`

## G. RC Narrative Draft Constraints

Allowed narrative:

- bounded founder-request operating loop
- non-executing operational visibility
- review/staging evidence visibility
- reducer-backed state evaluation
- safe founder-facing intake
- RC candidate for bounded Operational V1

Forbidden narrative:

- autonomous company
- execution automation
- provider/channel automation
- approval workflow
- dispatch workflow
- founder queue
- production-ready execution system
- certified protocol compliance

## H. Stop Conditions

RC planning must stop or fail if:

- any blocking gate cannot be verified
- full regression suite fails
- docs imply execution/provider/channel/direct-control behavior
- page wording implies approval or execution completion
- release docs imply Operational V1 completion before seal
- raw runtime / Cognitive_OS dependency leaks into SoloCrew product surface
- changed file list includes implementation changes in this wave

## I. Next RC Audit Requirement

After this RC planning wave, the next valid wave must be one of:

- `SoloCrew Operational V1 RC readiness audit`
- `SoloCrew RC planning correction patch`

This plan does not permit a direct release seal.

## J. Boundary Conclusion

Selected readiness value:

- `RC_PLAN_READY_FOR_RC_READINESS_AUDIT`

Reasoning:

- the RC criteria draft is now frozen
- founder intake and app/page state rendering are already closed
- the end-to-end bounded founder-request loop is already closed
- current blocking gates are ready to verify rather than awaiting more design
  work
- the remaining path is now an evidence-verification problem, not a planning
  ambiguity

## K. Next Wave Recommendation

Recommended next wave:

- `SoloCrew Operational V1 RC readiness audit`

Why:

- the repo now has frozen RC scope, gate checklist, validation command set,
  evidence pack requirements, allowed disclosed gaps, narrative constraints,
  and stop conditions
- the next smallest truthful step is therefore to audit whether the current
  RC candidate actually satisfies those frozen gates
