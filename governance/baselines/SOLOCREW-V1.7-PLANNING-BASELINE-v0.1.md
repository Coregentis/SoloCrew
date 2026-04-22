# SoloCrew V1.7 Planning Baseline v0.1

`doc_id: SOLOCREW-V1.7-PLANNING-BASELINE-v0.1`

## A. Purpose

Define SoloCrew V1.7 planning baseline after V1.6 Stable release and closure.

## B. Version Semantics

- V1.7 is a feature-line version.
- V1.7 targets Bounded Action-Preparation.
- V1.7 does not reopen V1.6.
- V1.7 does not redefine earlier versions.
- V1.7 does not introduce autonomous execution, provider/channel send,
  approve/reject/dispatch/execute, founder queue, or queue implementation.

## C. Documentation Budget

This wave uses one canonical V1.7 planning baseline rather than separate
audit/gate/dependency/implementation documents.

| Artifact type | Decision | Reason |
|---|---|---|
| V1.7 planning baseline | allowed | one canonical baseline |
| Separate audit | not created | avoid governance sprawl |
| Separate gate | not created | embedded readiness gate in baseline |
| Separate dependency assessment | not created | included in baseline |
| Separate implementation plan | not created | not an implementation wave |
| Release doc | not created | not a release wave |

## D. Current State Closure

- V1.6 Stable released and post-verified.
- V1.6 RC prerelease preserved.
- V1.6 remains downstream-only, display-only, review-only, and non-executing.
- No open V1.6 correction is known from repo truth.

## E. V1.7 Product Options Matrix

| Option | User value | Implementation pressure | Cognitive_OS dependency | Decision |
|---|---|---|---|---|
| Prepared action draft card | high | medium-high | maybe for display-only; yes for authoritative semantics | candidate |
| Action intent summary | high | medium | maybe for display-only; yes for reusable action meaning | candidate |
| Evidence sufficiency checklist | high | medium | yes if it becomes reusable policy or eligibility input | candidate |
| Missing information checklist | high | medium | maybe for display-only; yes if it becomes authoritative gate state | candidate |
| Risk / boundary summary | high | medium-high | yes if it becomes reusable policy/risk contract | candidate |
| Human confirmation requirement display | high | medium-high | yes if it becomes authoritative confirmation boundary | candidate |
| Dry-run preparation view | medium-high | medium-high | yes if it implies reusable preparation state | candidate |
| Provider/channel execution | out of scope | unacceptable | not applicable | rejected |
| Approve/reject/dispatch/execute | out of scope | unacceptable | not applicable | rejected |
| Founder queue | out of scope | unacceptable | not applicable | rejected |
| Queue implementation | out of scope | unacceptable | not applicable | rejected |
| Autonomous company operation | out of scope | unacceptable | not applicable | rejected |

## F. User Value / Risk Matrix

| Capability | User value | Risk if mis-scoped | Required boundary |
|---|---|---|---|
| prepared action draft | high | can be mistaken for executable instruction or dispatchable task | draft-only and explicitly non-executing |
| risk summary | high | can be misread as policy engine or approval verdict | bounded explanatory summary only |
| evidence sufficiency | high | can become an authoritative gate or approval outcome | checklist/summary only unless upstream law exists |
| missing information | high | can imply queueing or mandatory workflow routing | read-only gap visibility only |
| human confirmation requirement | high | can be misread as actual approval control surface | display-only confirmation requirement, not approval |
| dry-run preparation | medium-high | can drift into execution simulation or provider send | guided preparation view only |
| execution eligibility | medium-high | can be misread as release to execute | must stay out of scope unless upstream contract exists |
| provider/channel send | none for bounded V1.7 | would violate current product boundary immediately | out of scope |
| queue semantics | none for bounded V1.7 | would widen into founder queue / queue implementation | out of scope |

## G. Downstream-Only vs Cognitive_OS Dependency Assessment

| V1.7 option | Can be downstream-only? | Requires new Cognitive_OS Runtime capability? | Requires new Projection contract? | Decision |
|---|---|---|---|---|
| prepared action draft card | maybe, if limited to display of bounded draft summary over existing safe context/history | yes for authoritative action-preparation state | yes for reusable neutral prepared-action projection | blocked pending dependency planning |
| action intent summary | maybe, if reduced to explanatory local summary only | yes for reusable intent semantics | yes | blocked pending dependency planning |
| evidence sufficiency checklist | maybe, if reduced to local explanatory checklist only | yes for authoritative sufficiency / eligibility state | yes | blocked pending dependency planning |
| missing information checklist | maybe, if reduced to local explanatory checklist only | yes for authoritative requirement tracking | yes | blocked pending dependency planning |
| risk / boundary summary | maybe, if reduced to local explanatory copy only | yes for reusable risk policy / boundary contract | yes | blocked pending dependency planning |
| human confirmation requirement display | maybe, if reduced to explanatory label only | yes for authoritative confirmation boundary | yes | blocked pending dependency planning |
| dry-run preparation view | maybe, if reduced to guided display only | yes for reusable preparation state | yes | blocked pending dependency planning |
| provider/channel execution | no | yes | yes | out of scope |
| approve/reject/dispatch/execute | no | yes | yes | out of scope |

Expected conclusion:

- a very thin local draft-card display might be possible downstream-only
- authoritative action-preparation contract, risk policy, confirmation
  eligibility, or execution eligibility requires Cognitive_OS dependency
  planning before implementation

## H. MPLP Posture Assessment

| Concern | MPLP posture | Decision |
|---|---|---|
| prepared action draft | candidate/backlog only | no protocol/schema/binding change in this wave |
| evidence sufficiency | candidate/backlog only | no protocol/schema/binding change in this wave |
| risk / boundary summary | candidate/backlog only | no protocol/schema/binding change in this wave |
| human confirmation requirement | candidate/backlog only | no protocol/schema/binding change in this wave |
| execution eligibility | candidate/backlog only | no protocol/schema/binding change in this wave |
| provider/channel execution | out of scope | no MPLP change |
| approve/reject/dispatch/execute | out of scope | no MPLP change |
| queue semantics | out of scope | no MPLP change |

Required conclusion:

- No MPLP protocol change.
- No MPLP schema change.
- No MPLP binding change.
- Future action-preparation / execution boundary may become candidate/backlog only.
- Any MPLP promotion requires MPGC review.

## I. Recommended V1.7 Direction

`SOLOCREW_V1_7_DIRECTION_REQUIRES_COGNITIVE_OS_DEPENDENCY_PLANNING`

V1.7 is no longer pure continuity display. It approaches action-preparation,
confirmation boundary, risk posture, and possible execution-eligibility
interpretation. The safe path is to design the neutral Cognitive_OS
projection/runtime contract first, then let SoloCrew consume it downstream.

## J. V1.7 Scope / Non-Scope

### Scope

- define bounded V1.7 product options for action-preparation
- assess user value and mis-scoping risk
- determine which surfaces could remain display-only downstream and which need
  neutral upstream runtime/projection support first

### Non-Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no queue implementation
- no autonomous company operation
- no direct Cognitive_OS runtime-private import
- no MPLP protocol change
- no protocol certification
- no GA claim
- no V1.6 reopening

## K. Embedded Readiness Gate

| Gate | Requirement | Status |
|---|---|---|
| V1.6 stable state reviewed | stable release, post-verification, and preserved RC truth verified | PASS |
| V1.7 version semantics locked | V1.7 feature-line meaning is explicit in this baseline | PASS |
| V1.7 product options evaluated | option matrix completed | PASS |
| user-value / risk matrix completed | value/risk table exists in this baseline | PASS |
| Cognitive_OS dependency assessed | downstream-only versus upstream-dependent assessment completed | PASS |
| MPLP posture assessed | MPLP remains candidate/backlog/MPGC only | PASS |
| selected direction recorded | upstream dependency planning direction recorded | PASS |
| documentation budget respected | one canonical new baseline plus minimal alignment docs only | PASS |
| delivery ROI respected | version lock, options, risk, dependency posture, and direction landed together | PASS |
| no implementation in this wave | planning-only update | PASS |
| no tag/release/seal | no tag, GitHub Release, or seal record created in this wave | PASS |

Decision enum:

`SOLOCREW_V1_7_PLANNING_BLOCKED_PENDING_COGNITIVE_OS`
