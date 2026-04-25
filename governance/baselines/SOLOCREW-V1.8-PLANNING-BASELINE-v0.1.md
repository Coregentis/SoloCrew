# SoloCrew V1.8 Planning Baseline v0.1

`doc_id: SOLOCREW-V1.8-PLANNING-BASELINE-v0.1`

## A. Purpose

Define SoloCrew V1.8 planning baseline after V1.7 Stable release closure.

## B. Version Semantics

- V1.7 = bounded action-preparation stable line, closed.
- V1.8 is a feature-line version.
- V1.8 targets Human-Confirmed Execution Boundary.
- V1.8 does not reopen V1.7.
- V1.8 does not introduce autonomous execution.
- V1.8 does not introduce provider/channel send.
- V1.8 does not introduce queue implementation or founder queue.
- V1.8 does not introduce approval automation.

## C. Documentation Budget

This wave uses one canonical V1.8 planning baseline rather than separate
audit/gate/dependency/implementation documents.

| Artifact type | Decision | Reason |
|---|---|---|
| V1.8 planning baseline | allowed | one canonical baseline |
| Separate audit | not created | avoid governance sprawl |
| Separate gate | not created | embedded readiness gate in baseline |
| Separate dependency assessment | not created | included in baseline |
| Separate implementation plan | not created | not an implementation wave |
| Release doc | not created | not a release wave |

## D. Current State Closure

- V1.7 Stable released and post-verified.
- V1.7 RC prerelease preserved.
- V1.7 remains bounded, draft-only, non-executing, non-approving,
  non-dispatching, non-provider, and non-queueing.
- No open V1.7 correction is known from repo truth.

## E. V1.8 Product Options Matrix

| Option | User value | Implementation pressure | Cognitive_OS dependency | Decision |
|---|---|---|---|---|
| Human-confirmed execution boundary card | high | medium-high | maybe for display-only; yes for authoritative boundary state | candidate |
| Confirmation-required transition view | high | high | yes if it expresses a real state transition | candidate with dependency risk |
| Pre-execution checklist / confirmation packet | high | high | yes if checklist becomes authoritative or reusable | candidate with dependency risk |
| Side-effect boundary warning | high | medium | maybe if kept warning-only | candidate |
| Execution eligibility explanation view | medium-high | high | yes if it explains real eligibility rather than absence of eligibility | candidate with dependency risk |
| Human confirmation acknowledgment capture | high | high | yes if acknowledgment becomes authoritative boundary state | candidate with dependency risk |
| Dry-run / preview boundary panel | medium | medium-high | maybe if it stays explanatory only | deferred |
| Provider/channel execution | none for bounded V1.8 | unacceptable | not applicable | rejected |
| Approve/reject/dispatch/execute if automated | none for bounded V1.8 | unacceptable | not applicable | rejected |
| Founder queue | none for bounded V1.8 | unacceptable | not applicable | rejected |
| Queue implementation | none for bounded V1.8 | unacceptable | not applicable | rejected |
| Autonomous company operation | none for bounded V1.8 | unacceptable | not applicable | rejected |

## F. User Value / Risk Matrix

| Capability | User value | Risk if mis-scoped | Required boundary |
|---|---|---|---|
| confirmation boundary | high | can be mistaken for actual execution release | display-only unless upstream authority exists |
| pre-execution checklist | high | can become an implicit gate or approval workflow | checklist copy only unless runtime law exists |
| human acknowledgment | high | can be mistaken for authoritative confirmation state | local display only or upstream-owned state |
| execution eligibility explanation | medium-high | can imply execution is granted or imminent | explanatory only unless upstream eligibility contract exists |
| side-effect warning | high | can be mistaken for policy verdict or blocker state | warning-only, explanatory only |
| dry-run / preview | medium | can drift into simulation or execution preview promise | explanatory preview only or deferred |
| automated execution | none for bounded V1.8 | violates product/runtime boundary immediately | out of scope |
| provider/channel send | none for bounded V1.8 | violates execution boundary immediately | out of scope |
| queue semantics | none for bounded V1.8 | widens into founder queue or queue implementation | out of scope |

## G. Downstream-Only vs Cognitive_OS Dependency Assessment

| V1.8 option | Can be downstream-only? | Requires new Cognitive_OS Runtime capability? | Requires new Projection contract? | Decision |
|---|---|---|---|---|
| human-confirmed execution boundary card | yes, if it is a display-only boundary card over existing prepared-action truth | yes, if it represents authoritative boundary state | yes, product-local either way | thin downstream-only candidate |
| confirmation-required transition view | no, if it implies a real transition state | yes | yes | Cognitive_OS dependency required |
| pre-execution checklist / confirmation packet | maybe, if reduced to static checklist copy | yes, if it becomes reusable or authoritative | yes | Cognitive_OS dependency required for authoritative implementation |
| side-effect boundary warning | yes, if it remains warning-only | no | yes, product-local | downstream-only candidate |
| execution eligibility explanation view | maybe, if it only explains that eligibility is not granted here | yes, if it explains authoritative eligibility | yes | Cognitive_OS dependency required |
| human confirmation acknowledgment capture | no, if it records acknowledgment as state or event | yes | yes | Cognitive_OS dependency required |
| dry-run / preview boundary panel | yes, if it remains explanatory and non-simulative | yes, if it becomes execution preview semantics | yes | downstream-only candidate if kept explanatory |
| provider/channel execution | no | yes | yes | out of scope |
| approve/reject/dispatch/execute automation | no | yes | yes | out of scope |
| founder queue | no | yes | yes | out of scope |
| queue implementation | no | yes | yes | out of scope |
| autonomous company operation | no | yes | yes | out of scope |

Expected conclusion:

- A thin display-only confirmation boundary panel may be downstream-only.
- Authoritative human-confirmed execution-boundary state likely requires
  Cognitive_OS dependency planning before implementation.

## H. MPLP Posture Assessment

| Concern | MPLP posture | Decision |
|---|---|---|
| confirmation boundary display | downstream presentation only | no MPLP change |
| pre-execution checklist | candidate/backlog only if promoted beyond display | no MPLP schema or binding change |
| execution eligibility explanation | candidate/backlog only if it becomes authoritative | no MPLP change |
| human acknowledgment | candidate/backlog only if it becomes authoritative state | no MPLP change |
| provider/channel execution | out of scope | no MPLP change |
| approve/reject/dispatch/execute automation | out of scope | no MPLP change |
| queue semantics | out of scope | no MPLP change |
| side-effect transition record | candidate/backlog only and requires MPGC review if promoted | no MPLP change |

Required conclusion:

- No MPLP protocol change.
- No MPLP schema change.
- No MPLP binding change.
- Any promotion of execution-boundary semantics into MPLP requires
  candidate/backlog handling and MPGC review.

## I. Recommended V1.8 Direction

`SOLOCREW_V1_8_DIRECTION_REQUIRES_COGNITIVE_OS_DEPENDENCY_PLANNING`

Reason:

Once V1.8 crosses from explanatory UI into authoritative human-confirmed
execution-boundary state, it is no longer just product display. Current
Cognitive_OS prepared-action truth is still explicitly draft-only,
non-executing, non-approving, non-dispatching, non-provider, and
non-queueing, so authoritative V1.8 boundary state should not be invented
downstream.

## J. V1.8 Scope / Non-Scope

### Scope

- lock V1.8 as Human-Confirmed Execution Boundary
- separate thin downstream display-only boundary surfaces from authoritative
  execution-boundary state
- record when V1.8 can stay downstream-only and when it must wait for
  Cognitive_OS dependency planning
- preserve V1.7 closure truth while opening the next feature-line

### Non-Scope

- no provider/channel execution
- no automated approve/reject/dispatch/execute
- no founder queue
- no queue implementation
- no autonomous company operation
- no direct Cognitive_OS runtime-private import
- no MPLP protocol change
- no protocol certification
- no GA claim
- no V1.7 reopening

## K. Embedded Readiness Gate

| Gate | Requirement | Status |
|---|---|---|
| V1.7 stable state reviewed | stable tag/release and preserved RC prerelease verified | PASS |
| V1.8 version semantics locked | V1.8 feature-line meaning is explicit in this baseline | PASS |
| V1.8 product options evaluated | options matrix completed | PASS |
| user-value / risk matrix completed | value/risk table exists in this baseline | PASS |
| Cognitive_OS dependency assessed | downstream-only versus upstream-dependent assessment completed | PASS |
| MPLP posture assessed | MPLP remains unchanged and candidate/backlog only for future promotion | PASS |
| selected direction recorded | direction enum and rationale recorded | PASS |
| documentation budget respected | one canonical new baseline plus minimal alignment docs only | PASS |
| delivery ROI respected | semantics, options, risk, dependency posture, and direction landed together | PASS |
| no implementation in this wave | planning-only update | PASS |
| no tag/release/seal | no tag, GitHub Release, or seal record created in this wave | PASS |

Decision enum:

`SOLOCREW_V1_8_PLANNING_BLOCKED_PENDING_COGNITIVE_OS`

## L. V1.8 Implementation Planning

### L1. Implementation Objective

Implement the smallest bounded product-facing human-confirmed
execution-boundary slice over the neutral Cognitive_OS execution-boundary
scaffold, while remaining display-oriented, non-executing,
non-approving, non-dispatching, non-provider, and non-queueing.

Upstream blocker status:

- `SOLOCREW_V1_8_PLANNING_BLOCKED_PENDING_COGNITIVE_OS` is now cleared.
- Cognitive_OS now exposes a minimal execution-boundary scaffold through
  neutral constructors, validation helpers, and contract tests.

### L2. Minimal Product Slice Selection

| Candidate slice | User value | Boundary risk | Decision |
|---|---|---|---|
| execution-boundary card | high | medium if mistaken for executable release state | selected |
| requirement summary panel | high | medium if mistaken for authoritative execution grant | selected |
| risk warning panel | high | medium if mistaken for policy verdict | selected |
| preflight checklist panel | high | medium if mistaken for mandatory gate state | selected |
| acknowledgment requirement display | high | medium-high if mistaken for authoritative acknowledgment capture | selected |
| transition posture display | high | medium if mistaken for transition execution readiness | selected |
| safe evidence refs display | medium-high | low if kept reference-only | selected |
| authoritative acknowledgment capture | none for bounded V1.8 | unacceptable | not selected |
| authoritative confirmation transition state | none for bounded V1.8 | unacceptable | not selected |
| provider/channel execution | none for bounded V1.8 | unacceptable | not selected |
| approve/reject/dispatch/execute | none for bounded V1.8 | unacceptable | not selected |
| founder queue | none for bounded V1.8 | unacceptable | not selected |
| queue implementation | none for bounded V1.8 | unacceptable | not selected |

Selected minimal slice:

- execution-boundary card
- requirement summary panel
- risk warning panel
- preflight checklist panel
- acknowledgment requirement display
- transition posture display
- safe evidence refs display

### L3. Upstream-to-Downstream Field Mapping

| Cognitive_OS neutral surface | SoloCrew product surface | Boundary note |
|---|---|---|
| `ExecutionBoundaryRequirementSummary` | product-facing requirement summary | requirement-only and not execution permission |
| `ExecutionBoundaryRiskWarning` | product-facing risk warning | explanatory only and not policy verdict |
| `ExecutionBoundaryPreflightChecklist` | product-facing preflight checklist panel | human-visible checklist only and not authoritative gate state |
| `ExecutionBoundaryAcknowledgmentRequirement` | product-facing acknowledgment requirement display | display-only and not authoritative acknowledgment capture |
| `ExecutionBoundaryTransitionPosture` | product-facing transition posture / boundary copy | explicit non-executing / non-provider / non-queueing posture only |
| `ExecutionBoundarySafeEvidenceRef` | product-facing safe evidence refs | references only and not raw runtime detail |
| `ExecutionBoundaryProjection` | bounded execution-boundary page/card envelope | projection-safe container only |

Consumption boundary:

- No authoritative confirmation-required transition state is consumed.
- No authoritative acknowledgment capture is consumed.
- No execution, dispatch, provider/channel, or queue semantics are consumed.
- No runtime-private internals are imported.

### L4. File-Level Implementation Task Map

| Area | File | Planned change | Boundary |
|---|---|---|---|
| product-local execution-boundary contract | `projection/contracts/v1-8-execution-boundary-contract.ts` | add product-local execution-boundary card/panel view types mapped from neutral upstream fields | no runtime-private import; no authoritative state |
| execution-boundary adapter | `projection/adapters/v1-8-execution-boundary-adapter.ts` | map upstream neutral execution-boundary projection into SoloCrew display-oriented sections | no execution, no provider/channel, no queue semantics |
| adapter tests | `tests/projection/v1-8-execution-boundary-adapter.test.ts` | verify mapping, forbidden-field rejection, wording boundaries, and reference-only evidence refs | no authoritative acknowledgment or transition-state language |
| app shell page model | `app/shell/create-v1-8-execution-boundary-page-model.ts` | assemble human-visible page model for the bounded V1.8 slice | display-only and non-executing |
| app page-model tests | `tests/app/create-v1-8-execution-boundary-page-model.test.ts` | verify copy, field presence, omission markers, and non-capability wording | no dispatch/provider/queue/authoritative language drift |
| repo status docs | `README.md`, `CHANGELOG.md`, `governance/baselines/SOLOCREW-VERSION-ROADMAP-v0.1.md` | reflect implementation-planning completion and next bounded product implementation wave | no tag/release/seal language |

### L5. Test / Boundary / Copy Plan

| Surface | Required check |
|---|---|
| display-only wording | copy states the slice is display-oriented and review-oriented |
| non-executing wording | copy states the slice is non-executing |
| non-approval-automation wording | copy states acknowledgment/requirement remains below approval automation |
| no dispatch/provider wording | no provider/channel send or dispatch wording appears as capability |
| no queue wording | no founder queue or queue implementation wording appears as capability |
| safe evidence refs remain references only | evidence refs stay reference-only and do not widen into proof/raw payload |
| `runtime_private_fields_omitted` boundary preserved if surfaced | omission marker remains explicit and truthful |
| no authoritative acknowledgment language | UI copy must not imply acknowledgment was captured or recorded as state |
| no authoritative transition-state language | UI copy must not imply confirmation-required transition state exists as runtime truth |

### L6. Implementation Readiness Decision

`SOLOCREW_V1_8_IMPLEMENTATION_READY`

Implementation markers:

- `SOLOCREW_V1_8_BOUNDED_EXECUTION_BOUNDARY_IMPLEMENTED`

## M. V1.8 Implementation Verification and RC Readiness

### M1. Verification Purpose

This section verifies the bounded V1.8 execution-boundary implementation and
prepares RC release readiness. It does not create a tag, GitHub Release, or
seal record.

### M2. Implementation Surface Verification

Implementation markers:

- `SOLOCREW_V1_8_BOUNDED_EXECUTION_BOUNDARY_IMPLEMENTED`
- `SOLOCREW_V1_8_IMPLEMENTATION_VERIFICATION_PASS`

| Surface | Expected behavior | Verification result |
|---|---|---|
| `projection/contracts/v1-8-execution-boundary-contract.ts` | bounded product-local execution-boundary view types only | PASS |
| `projection/adapters/v1-8-execution-boundary-adapter.ts` | bounded mapping only; reject raw/runtime-private, authoritative, execution, provider, and queue fields | PASS |
| `app/shell/create-v1-8-execution-boundary-page-model.ts` | expose human-visible display-only page sections only | PASS |
| `tests/projection/v1-8-execution-boundary-adapter.test.ts` | verify mapping, guardrails, and wording boundaries | PASS |
| `tests/app/create-v1-8-execution-boundary-page-model.test.ts` | verify page sections, copy, and non-capability boundaries | PASS |
| `README.md` | implementation status remains bounded and non-authoritative | PASS |
| `CHANGELOG.md` | implementation and verification history remain aligned | PASS |

### M3. Boundary Verification

| Boundary | Result | Evidence |
|---|---|---|
| no Cognitive_OS change | PASS | changed files remain product-local in SoloCrew only |
| no MPLP change | PASS | no MPLP files changed |
| no runtime-private import | PASS | implementation maps bounded fields only and keeps `runtime_private_fields_omitted` as marker |
| no provider/channel execution | PASS | adapter/page-model/tests remain exclusion-only and fail closed on provider/channel fields |
| no automated approve/reject/dispatch/execute | PASS | no automation fields surfaced and wording stays non-capability-only |
| no founder queue | PASS | queue/founder wording remains exclusion-only or negative-test-only |
| no queue implementation | PASS | no queue state/model/control was added |
| no autonomous operation | PASS | no autonomy claim or behavior was added |
| no authoritative acknowledgment capture | PASS | acknowledgment remains display-only and non-authoritative |
| no authoritative transition state | PASS | transition posture remains explanatory and rejects authoritative fields |

### M4. V1.8 RC Scope / Non-Scope

Scope:

- execution-boundary card
- requirement summary panel
- risk warning panel
- preflight checklist panel
- acknowledgment requirement display
- transition posture display
- safe evidence refs display

Non-scope:

- no authoritative acknowledgment capture
- no authoritative confirmation transition state
- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no queue implementation
- no autonomous company operation
- no Cognitive_OS change
- no MPLP change
- no protocol certification
- no GA claim

### M5. Proposed RC Tag / Release Identity

- `tag: solocrew-v1.8-rc-bounded-execution-boundary-20260425`
- `release_title: SoloCrew V1.8 RC — Bounded Execution Boundary`
- `release_type: GitHub prerelease`

This is proposed only. No tag or GitHub Release is created in this wave.

### M6. RC Execution Readiness Matrix

| Requirement | Required evidence | Status |
|---|---|---|
| repo clean and local/remote aligned | `HEAD == origin/main` and clean worktree before edits | PASS |
| implementation verification passed | bounded V1.8 surfaces and tests verified | PASS |
| `npm test` passes | full suite remains green | PASS |
| focused V1.8 adapter/page-model tests pass | focused reruns complete under current test script behavior | PASS |
| boundary grep passes | matches remain exclusion-only, warning-only, or negative-test-only | PASS |
| no existing V1.8 RC tag | tag precheck returns empty | PASS |
| no existing V1.8 RC GitHub Release | `gh release view ... || true` returns `release not found` | PASS |
| release notes draft created | V1.8 RC notes draft exists | PASS |
| README / CHANGELOG aligned | repo status copy reflects verification + RC readiness | PASS |
| explicit user authorization required for RC execution | execution still deferred to a later authorized wave | PASS |

Decision enum:

`SOLOCREW_V1_8_RC_RELEASE_EXECUTION_READINESS_PASS`

## N. V1.8 RC Release Execution and Post-Release Verification

- `release_decision`: `SOLOCREW_V1_8_RC_RELEASE_EXECUTION_PENDING_TAG_RELEASE`
- `tag`: `solocrew-v1.8-rc-bounded-execution-boundary-20260425`
- `github_prerelease_status`: `PENDING_THIS_WAVE`
- `post_release_verification_result`: `PENDING_THIS_WAVE`
- `boundary_confirmation`: bounded RC only; no provider/channel execution, no automated approve/reject/dispatch/execute, no founder queue, no queue implementation, no autonomous company operation, no protocol certification claim, no authoritative acknowledgment capture, and no authoritative confirmation transition state
