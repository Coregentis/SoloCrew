# SoloCrew V1.4 Planning Baseline v0.1

`doc_id: SOLOCREW-V1.4-PLANNING-BASELINE-v0.1`

## A. Purpose

Define SoloCrew V1.4 planning baseline after V1.3 RC release, post-release
verification, and product hardening.

## B. Documentation Budget

This wave uses one canonical V1.4 planning baseline rather than separate
audit/gate/dependency documents.

| Artifact type | Decision | Reason |
|---|---|---|
| V1.4 planning baseline | allowed | one canonical baseline |
| Separate audit | not created | avoid governance sprawl |
| Separate gate | not created | embedded readiness gate in baseline |
| Separate dependency assessment | not created | included in baseline |
| Separate release doc | not created | not a release wave |

## C. V1.3 Current Baseline

- V1.3 RC released as GitHub prerelease.
- V1.3 post-release verification passed.
- V1.3 product hardening completed.
- V1.3 remains bounded, review-only, and non-executing.

## D. V1.4 Product Options

| Option | User value | Implementation pressure | Cognitive_OS dependency | Decision |
|---|---|---|---|---|
| Session continuity / local packet history | high | medium-high | likely yes | leading candidate; upstream-first |
| Multi-step lifecycle dashboard | high | medium | likely yes if it must show durable multi-packet state | candidate tied to continuity/history |
| Review list / pending packet candidates, explicitly not founder queue unless separately scoped | high | medium-high | likely yes | candidate tied to continuity/history |
| Bounded action-preparation draft, explicitly not execution | medium-high | high | yes | defer behind upstream planning |
| Better demo onboarding / tutorial path | medium | low | no | downstream-only fallback |
| Exportable packet summary / evidence pack | medium | medium | no | downstream-only fallback |
| Provider/channel execution | out of scope | unacceptable | not applicable | rejected |
| Approve/reject/dispatch/execute | out of scope | unacceptable | not applicable | rejected |

## E. Upstream Dependency Assessment

| V1.4 option | Requires new Cognitive_OS Runtime capability? | Requires new Projection contract? | Requires MPLP candidate/backlog? | Decision |
|---|---|---|---|---|
| Session continuity / local packet history | yes | yes | no immediate protocol change; candidate/backlog only if lifecycle history semantics need later upstream generalization | requires Cognitive_OS dependency planning |
| Multi-step lifecycle dashboard | likely yes if it depends on durable packet lifecycle state | likely yes | candidate/backlog only if lifecycle dashboard semantics later generalize upward | requires Cognitive_OS dependency planning if selected as primary direction |
| Review list / pending packet candidates below founder queue semantics | yes | yes | candidate/backlog only if generic lifecycle backlog semantics later need MPLP review | requires Cognitive_OS dependency planning |
| Bounded action-preparation draft | yes | yes | yes, candidate/backlog only | requires Cognitive_OS dependency planning before implementation |
| Better demo onboarding / tutorial path | no | no | no | remains downstream-only |
| Exportable packet summary / evidence pack | no | no or minimal downstream-only shaping | no immediate protocol change | remains downstream-only |

MPLP posture for V1.4 remains candidate/backlog only where needed. This wave
does not imply MPLP protocol change.

## F. Recommended V1.4 Direction

`SOLOCREW_V1_4_DIRECTION_REQUIRES_COGNITIVE_OS_DEPENDENCY_PLANNING`

The highest-value next SoloCrew improvement is durable packet lifecycle
continuity: session continuity / local packet history plus a bounded pending
review list below founder queue semantics. That direction would materially
improve product usefulness, but it should not be implemented downstream first
because it needs upstream runtime and projection planning.

## G. V1.4 Scope / Non-Scope

### Scope

- evaluate durable packet lifecycle continuity as the next meaningful product
  improvement
- prioritize session continuity / packet history / pending review list below
  founder queue semantics
- keep downstream-only fallback candidates visible:
  - better demo onboarding / tutorial path
  - exportable packet summary / evidence pack
- block direct SoloCrew implementation until Cognitive_OS dependency planning
  clarifies the durable state surface

### Non-Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue unless separately scoped
- no autonomous company operation
- no direct Cognitive_OS runtime-private import
- no MPLP protocol change
- no protocol certification
- no GA/stable claim

## H. Embedded Readiness Gate

| Gate | Requirement | Status |
|---|---|---|
| V1.3 state reviewed | released, post-verified, and hardened baseline is known | PASS |
| V1.4 product options evaluated | option matrix completed | PASS |
| Cognitive_OS dependency assessed | upstream runtime/projection dependency matrix completed | PASS |
| MPLP mapping posture assessed | MPLP remains candidate/backlog only and non-normative | PASS |
| selected direction recorded | upstream-first V1.4 direction selected | PASS |
| documentation budget respected | one canonical new baseline plus minimal alignment updates only | PASS |
| delivery ROI respected | product options, dependency assessment, and next-direction decision landed together | PASS |
| no implementation in this wave | governance-only planning update | PASS |
| no tag/release/seal | no tag, GitHub Release, or seal record created in this wave | PASS |

Decision enum:

`SOLOCREW_V1_4_PLANNING_BLOCKED_PENDING_COGNITIVE_OS`

## I. V1.4 Downstream Consumption Planning and Scaffold

### I1. Consumption Objective

V1.4 will consume Cognitive_OS neutral durable lifecycle continuity
projections as downstream-safe summaries for session continuity, local
lifecycle history, pending review visibility below queue semantics, and
continuity snapshots. This does not grant access to runtime-private internals
and does not introduce execution, approval, dispatch, provider/channel send,
or founder queue behavior.

### I2. Upstream Surface Mapping

| Cognitive_OS neutral surface | SoloCrew downstream value | Consumption boundary |
|---|---|---|
| `RuntimeLifecycleContinuityProjection` | session continuity and local lifecycle history display | projection-safe summary only |
| `RuntimePendingReviewProjection` | pending review visibility below queue semantics | not a queue, dispatch unit, approval, or execution task |
| `RuntimeContinuitySnapshotProjection` | continuity snapshot display/export | no raw runtime-private state |
| `RuntimeLifecycleHistoryEntry` | lifecycle history row | read-only lifecycle context |
| `RuntimePendingReviewItemSummary` | review item summary | visibility only |
| `safe_evidence_refs` | evidence reference display | references only, not proof/certification |
| `runtime_private_fields_omitted` | boundary marker | must be true |

### I3. Local Scaffold Decision

| Local scaffold | Purpose | Boundary |
|---|---|---|
| `projection/contracts/lifecycle-continuity-consumption-contract.ts` | local downstream-safe view types | no runtime-private fields |
| `projection/adapters/lifecycle-continuity-consumption-adapter.ts` | adapt projection-safe input into SoloCrew views | reject raw/private/execution/queue fields |
| `tests/projection/lifecycle-continuity-consumption-adapter.test.ts` | verify safe consumption and boundary rejection | no execution/approval/queue semantics |

### I4. DoR / DoD

#### DoR

- upstream neutral scaffold exists
- V1.4 baseline selects upstream dependency path
- local consumption boundary defined
- no runtime-private import
- no execution/queue/approval semantics

#### DoD

- local contract scaffold exists
- adapter scaffold validates safe fields
- tests reject runtime-private / execution / queue fields
- README / CHANGELOG updated
- `npm test` passes

### I5. Decision

`SOLOCREW_V1_4_CONSUMPTION_PLANNING_AND_SCAFFOLD_READY`

## J. V1.4 Consumption Verification and Implementation Planning

### J1. Verification Result

| Surface | Expected boundary | Verification result |
|---|---|---|
| `lifecycle-continuity-consumption-contract.ts` | exposes downstream-safe fields only | PASS |
| `lifecycle-continuity-consumption-adapter.ts` | rejects runtime-private, execution, and queue fields while preserving safe evidence refs | PASS |
| `lifecycle-continuity-consumption-adapter.test.ts` | covers safe adaptation, boundary rejection, project consistency, and non-queue posture | PASS |
| `README.md` | states downstream-safe continuity consumption without runtime-private access or execution widening | PASS |
| `CHANGELOG.md` | records continuity consumption scaffold without overclaiming capability or release status | PASS |

### J2. Boundary Verification

| Boundary | Result | Evidence |
|---|---|---|
| no direct Cognitive_OS import | PASS | local contract and adapter use local structural types only; no direct upstream source import exists |
| no runtime-private field exposure | PASS | local contract fields remain projection-safe and adapter rejects forbidden raw/private fields recursively |
| no provider/channel execution | PASS | adapter rejects execution/provider fields and README/CHANGELOG remain exclusion-only |
| no approve/reject/dispatch/execute | PASS | adapter rejects execution wording and tests keep direct-control wording out of output copy |
| no founder queue | PASS | pending review remains visibility-only and tests reject founder-queue claims |
| no queue implementation | PASS | pending review is explicitly below queue semantics and no queue state/model is added |
| no autonomous company operation | PASS | no autonomy semantics or product overclaim were added in this wave |
| no tag/release/seal | PASS | planning/verification only; no tag, GitHub Release, or seal record created |

Decision:

`SOLOCREW_V1_4_CONSUMPTION_VERIFICATION_PASS`

### J3. Implementation Slice Selection

| Slice | User value | Files likely touched | Risk | Decision |
|---|---|---|---|---|
| continuity summary page-model integration | high | page model, page-model tests, README | medium | selected |
| pending review visibility panel below queue semantics | high | page model, page-model tests, continuity adapter/tests | medium | selected |
| continuity snapshot display/export | medium | page model, page-model tests, README | medium | defer behind summary/visibility slice |
| packet lifecycle + continuity combined view | high | page model, flow, flow tests, app tests | medium-high | candidate follow-on after selected slice |
| provider/channel execution | none for bounded V1.4 | not applicable | unacceptable | rejected |
| approve/reject/dispatch/execute | none for bounded V1.4 | not applicable | unacceptable | rejected |
| founder queue | none for bounded V1.4 | not applicable | unacceptable | rejected |

Selected slice: `continuity summary page-model integration + pending review visibility below queue semantics`

### J4. File-Level Implementation Task Map

| Area | File | Planned change | Boundary |
|---|---|---|---|
| app shell page model | `app/shell/create-v1-2-packet-revision-page-model.ts` | optionally consume local continuity views and expose continuity summary / pending review visibility fields | summary-only, review-only, non-executing |
| app tests | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | verify continuity summary, pending review visibility, and no forbidden execution/queue wording | no runtime-private fields, no control semantics |
| flow assembly | `projection/assembly/packet-revision-flow.ts`, only if needed | optionally thread continuity summary into existing page-model input shape without widening packet revision law | no provider/channel, no queue semantics |
| flow tests | `tests/projection/packet-revision-flow.test.ts`, only if needed | verify combined packet-lifecycle plus continuity summary stays non-executing | exclusion-only for execution/queue terms |
| continuity adapter | `projection/adapters/lifecycle-continuity-consumption-adapter.ts`, only if needed | tighten shaping helpers only if page-model integration reveals a missing safe field or derived label | keep rejection rules and local-only typing |
| continuity adapter tests | `tests/projection/lifecycle-continuity-consumption-adapter.test.ts`, only if needed | add regression coverage only if shaping changes are required | preserve downstream-safe boundary rejection |
| product docs | `README.md` | explain the bounded implementation slice once landed | no capability overclaim |

### J5. Test Plan

| Test area | Test file | Required assertion |
|---|---|---|
| page model can display continuity summary | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | continuity summary renders as bounded read-only context |
| page model can display pending review visibility below queue semantics | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | pending review is visible and explicitly not a queue/dispatch surface |
| page model can display continuity snapshot summary if available | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | snapshot summary is displayable without runtime-private detail |
| no provider/channel execution claim | `tests/app/create-v1-2-packet-revision-page-model.test.ts` and `tests/projection/lifecycle-continuity-consumption-adapter.test.ts` | copy/output remain below provider/channel semantics |
| no approve/reject/dispatch/execute claim | `tests/app/create-v1-2-packet-revision-page-model.test.ts` and `tests/projection/lifecycle-continuity-consumption-adapter.test.ts` | copy/output remain below direct-control semantics |
| no founder queue claim | `tests/app/create-v1-2-packet-revision-page-model.test.ts` and `tests/projection/lifecycle-continuity-consumption-adapter.test.ts` | visibility remains below founder queue semantics |
| no runtime-private fields exposed | `tests/projection/lifecycle-continuity-consumption-adapter.test.ts` | adapter/page-model boundary exposes projection-safe fields only |

### J6. DoR / DoD

#### DoR

- consumption scaffold exists
- consumption verification passes
- implementation slice selected
- file-level task map defined
- test plan defined
- no upstream change needed

#### DoD

- page model consumes local continuity views
- pending review is displayed as visibility-only
- tests pass
- README updated
- no execution/approval/dispatch/queue semantics

Decision:

`SOLOCREW_V1_4_IMPLEMENTATION_PLANNING_READY`

## K. V1.4 Continuity Page-Model Implementation

### K1. Implementation Summary

Implemented continuity summary page-model integration and pending review
visibility below queue semantics.

### K2. Implementation Surface

| Surface | Change | Boundary |
|---|---|---|
| `create-v1-2-packet-revision-page-model.ts` | added optional continuity input support and bounded continuity summary / pending review visibility fields | review-only, non-executing, visibility-only |
| `create-v1-2-packet-revision-page-model.test.ts` | added continuity page-model assertions and regression coverage for safe output boundaries | no runtime-private exposure, no queue or execution widening |
| `README.md` | updated V1.4 status to reflect bounded continuity summary / pending review page-model availability | no capability overclaim |

### K3. Boundary Confirmation

| Boundary | Status |
|---|---|
| no Cognitive_OS file change | PASS |
| no MPLP file change | PASS |
| no runtime-private import | PASS |
| no provider/channel execution | PASS |
| no approve/reject/dispatch/execute | PASS |
| no founder queue | PASS |
| no queue implementation | PASS |
| no autonomous company operation | PASS |
| no tag/release/seal | PASS |

### K4. Decision

`SOLOCREW_V1_4_CONTINUITY_PAGE_MODEL_IMPLEMENTED`

## L. V1.4 Implementation Verification and Release-Readiness Assessment

### L1. Verification Scope

This section verifies the landed V1.4 continuity page-model implementation and
assesses readiness for a later release-planning wave. It does not create a
tag, GitHub Release, seal record, stable/GA claim, provider/channel
execution, approve/reject/dispatch/execute, or founder queue behavior.

### L2. Implementation Surface Verification

| Surface | Expected behavior | Verification result |
|---|---|---|
| `create-v1-2-packet-revision-page-model.ts` | accepts optional continuity views, preserves existing callers, and exposes bounded continuity summary plus pending review visibility fields | PASS |
| `create-v1-2-packet-revision-page-model.test.ts` | verifies continuity summary display, pending review visibility posture, snapshot-safe merge behavior, old behavior preservation, and non-execution boundaries | PASS |
| `lifecycle-continuity-consumption-contract.ts` | keeps the local continuity contract projection-safe and summary-only | PASS |
| `lifecycle-continuity-consumption-adapter.ts` | rejects runtime-private, execution, and queue fields while preserving safe evidence refs | PASS |
| `lifecycle-continuity-consumption-adapter.test.ts` | verifies rejection logic, project consistency, safe evidence refs, and visibility-only posture | PASS |
| `README.md` | V1.4 status wording truthfully describes bounded continuity summary and pending review visibility in the page model | PASS |
| `CHANGELOG.md` | records implementation and verification posture without overclaiming release execution | PASS |

### L3. Boundary Verification

| Boundary | Result | Evidence |
|---|---|---|
| no Cognitive_OS file change | PASS | diff stays entirely inside SoloCrew |
| no MPLP file change | PASS | no MPLP files changed or imported |
| no runtime-private import | PASS | source-boundary grep found no direct upstream imports |
| no provider/channel execution | PASS | copy, tests, and grep remain exclusion-only |
| no approve/reject/dispatch/execute | PASS | page-model copy and tests stay below direct-control semantics |
| no founder queue | PASS | pending review remains visibility-only and explicitly below founder queue semantics |
| no queue implementation | PASS | no queue state, worker, or execution lane was added |
| no autonomous company operation | PASS | no autonomy semantics or claims were introduced |
| no tag/release/seal | PASS | this wave created no tag, GitHub Release, or seal record |

### L4. Regression Verification

| Regression area | Result | Evidence |
|---|---|---|
| existing page model behavior without continuity input | PASS | dedicated app test confirms existing callers still work and continuity fields remain absent without input |
| V1.3 packet revision lifecycle clarity | PASS | existing lifecycle-clarity app and projection tests remain passing |
| safe evidence refs merge behavior | PASS | continuity page-model test confirms refs are preserved across continuity and pending review inputs |
| snapshot refs merge behavior | PASS | continuity page-model test confirms snapshot refs are included in the merged safe evidence refs set |
| test suite count | PASS | `npm test` passed with 287 tests |

### L5. Release-Readiness Assessment

| Readiness item | Status | Notes |
|---|---|---|
| implementation complete | PASS | selected bounded page-model slice is implemented |
| verification passed | PASS | implementation surface and regression verification both passed |
| tests passed | PASS | full suite passed at 287 tests |
| boundary grep passed | PASS | matches remained exclusions, planning boundaries, warnings, or negative fixtures only |
| README/CHANGELOG aligned | PASS | both surfaces remain accurate for current V1.4 truth |
| no upstream change required | PASS | no new Cognitive_OS or MPLP work is required for the landed page-model slice |
| release planning may proceed | PASS | bounded implementation and verification are in place for the next planning wave |

Decision:

`SOLOCREW_V1_4_IMPLEMENTATION_VERIFICATION_PASS`

`SOLOCREW_V1_4_RELEASE_PLANNING_READY`

## M. V1.4 RC Release Planning and Execution Readiness

### M1. Release Planning Purpose

This section prepares SoloCrew V1.4 continuity page-model implementation for
a later explicit user-authorized RC release execution wave. It does not create
a tag, GitHub Release, seal record, stable/GA claim, provider/channel
execution, approve/reject/dispatch/execute, or founder queue behavior.

### M2. Release Type Decision

| Option | Meaning | Decision | Reason |
|---|---|---|---|
| V1.4 RC | Release candidate for bounded continuity page-model slice | SELECTED | implementation and verification passed, but release execution still needs explicit authorization |
| V1.4 stable / GA | Stable public release | REJECTED_FOR_NOW | no stable/GA claim in this wave |
| V1.5 planning | next product planning line | DEFERRED | V1.4 RC release must close first |

Decision:

`SOLOCREW_V1_4_RELEASE_TYPE_RC_SELECTED`

### M3. Proposed Tag / Release Identity

- `tag`: `solocrew-v1.4-rc-continuity-page-model-20260422`
- `release_title`: `SoloCrew V1.4 RC — Continuity Page Model`
- `release_type`: `GitHub prerelease`

This is proposed only. No tag or GitHub Release is created in this wave.

### M4. Release Scope

- bounded continuity summary page-model integration
- pending review visibility below queue semantics
- continuity lifecycle label
- continuity history summary
- pending review count and summaries
- continuity review posture
- continuity non-executing posture
- safe evidence refs
- `runtime_private_fields_omitted` boundary marker
- 287-test suite passing

### M5. Release Non-Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no queue implementation
- no autonomous company operation
- no Cognitive_OS change
- no MPLP change
- no runtime-private import
- no protocol certification
- no GA/stable release claim

### M6. Release Execution Readiness Matrix

| Requirement | Required evidence | Status |
|---|---|---|
| repo clean and local/remote aligned | `git status --short` clean and local/remote HEAD match | PASS |
| implementation verification passed | baseline decision `SOLOCREW_V1_4_IMPLEMENTATION_VERIFICATION_PASS` recorded | PASS |
| `npm test` passes | full suite passes at 287 tests | PASS |
| focused page-model and continuity adapter tests pass | focused `npm test -- ...` commands complete successfully | PASS |
| boundary grep passes | boundary grep remains exclusion-only, planning-only, warning-only, or negative-fixture only | PASS |
| no existing V1.4 tag | `git tag --list "solocrew-v1.4*"` returns no tag | PASS |
| no existing V1.4 GitHub Release | `gh release view solocrew-v1.4-rc-continuity-page-model-20260422` returns release not found | PASS |
| release notes draft created | V1.4 RC GitHub release notes draft exists in `governance/releases` | PASS |
| README / CHANGELOG aligned | README and CHANGELOG describe current bounded V1.4 RC planning truth | PASS |
| explicit user authorization required for execution | this wave is planning/readiness only and does not authorize tag/release/seal creation by itself | PASS |

Decision:

`SOLOCREW_V1_4_RELEASE_EXECUTION_READINESS_PASS`

## N. V1.4 RC Release Execution and Post-Release Verification

- `release_decision`: `SOLOCREW_V1_4_RC_RELEASE_EXECUTED_AND_POST_VERIFIED`
- `tag`: `solocrew-v1.4-rc-continuity-page-model-20260422`
- `github_prerelease_status`: `CREATED`
- `post_release_verification_result`: `PASS`
- `boundary_confirmation`: bounded RC only; no provider/channel execution, no approve/reject/dispatch/execute, no founder queue, no queue implementation, no autonomous company operation, no runtime-private import, no protocol certification, and no GA/stable claim

## O. V1.4 Post-Release Product Hardening

- release surface reviewed
- README aligned
- walkthrough aligned
- known limitations aligned
- demo guide aligned
- optional page-model copy reviewed; no source correction was required
- tests passed
- boundary preserved

Decision:

`SOLOCREW_V1_4_POST_RELEASE_PRODUCT_HARDENING_PASS`
