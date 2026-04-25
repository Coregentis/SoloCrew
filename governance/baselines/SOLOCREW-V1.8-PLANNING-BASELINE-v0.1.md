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

## L. File-Level Follow-Up Direction

| Lane | Area | File direction | Boundary |
|---|---|---|---|
| downstream display-only candidate | product-local contract | `projection/contracts/v1-8-human-confirmed-execution-boundary-contract.ts` if a thin display-only slice is later selected | no runtime-private import; no authoritative boundary state |
| downstream display-only candidate | adapter | `projection/adapters/v1-8-human-confirmed-execution-boundary-adapter.ts` for warning/checklist/acknowledgment copy-only mapping | no provider/channel, no approval automation, no queue semantics |
| downstream display-only candidate | app shell | `app/shell/create-v1-8-human-confirmed-execution-boundary-page-model.ts` for human-visible boundary panels | non-executing and human-visible only |
| downstream display-only candidate | tests | `tests/projection/v1-8-human-confirmed-execution-boundary-adapter.test.ts` and `tests/app/create-v1-8-human-confirmed-execution-boundary-page-model.test.ts` | prove no execution/dispatch/provider/queue drift |
| upstream dependency planning target | neutral runtime contract | `Cognitive_OS/runtime/core/prepared-action-types.ts` and `Cognitive_OS/runtime/core/prepared-action-contract.ts` if authoritative boundary state is required | planning target only, not modified in this wave |
| upstream dependency planning target | neutral runtime tests | `Cognitive_OS/tests/runtime/prepared-action-contract.test.mjs` or successor execution-boundary test surface | planning target only, not modified in this wave |
| protocol layer | MPLP | no file direction in this wave | no MPLP protocol/schema/binding change |
