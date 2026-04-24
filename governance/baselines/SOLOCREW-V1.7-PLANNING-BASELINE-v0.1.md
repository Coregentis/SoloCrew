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

## L. V1.7 Implementation Planning

### L1. Implementation Objective

Implement the smallest bounded product-facing action-preparation slice over
the neutral Cognitive_OS prepared-action scaffold, while remaining draft-only,
non-executing, non-approving, non-dispatching, non-provider, and
non-queueing.

Upstream blocker status:

- `SOLOCREW_V1_7_PLANNING_BLOCKED_PENDING_COGNITIVE_OS` is now cleared.
- Cognitive_OS now exposes a minimal prepared-action scaffold through neutral
  constructors and contract tests.

### L2. Minimal Product Slice Selection

| Candidate slice | User value | Boundary risk | Decision |
|---|---|---|---|
| prepared action draft card | high | medium if mistaken for executable task | selected |
| action intent summary | high | medium if mistaken for command intent | selected |
| evidence sufficiency panel | high | medium if mistaken for readiness gate | selected |
| missing information panel | high | medium if mistaken for workflow blocker state | selected |
| risk / boundary summary | high | medium-high if mistaken for policy verdict | selected |
| human confirmation requirement display | high | medium-high if mistaken for approval control | selected |
| dry-run preparation view | medium | medium-high if it drifts into execution simulation | deferred |
| provider/channel execution | none for bounded V1.7 | unacceptable | not selected |
| approve/reject/dispatch/execute | none for bounded V1.7 | unacceptable | not selected |
| founder queue | none for bounded V1.7 | unacceptable | not selected |
| queue implementation | none for bounded V1.7 | unacceptable | not selected |

Selected minimal slice:

- prepared action draft card
- action intent summary
- evidence sufficiency panel
- missing information panel
- risk / boundary summary
- human confirmation requirement display

Deferred:

- dry-run preparation view

### L3. Upstream-to-Downstream Field Mapping

| Cognitive_OS neutral surface | SoloCrew product surface | Boundary note |
|---|---|---|
| `PreparedActionIntentSummary` | product-facing action intent summary | summary-only, not an executable command |
| `PreparedActionRiskSummary` | product-facing risk / boundary summary | explanatory only, not policy verdict |
| `PreparedActionEvidenceSufficiency` | product-facing evidence sufficiency panel | visibility only, not execution eligibility |
| `PreparedActionMissingInformation` | product-facing missing information panel | gap visibility only, not queue or gate state |
| `PreparedActionConfirmationRequirement` | product-facing human confirmation requirement display | display-only, not approval control |
| `PreparedActionBoundaryPosture` | product-facing draft-only / non-executing posture copy | keep explicit non-executing and non-queueing wording |
| `PreparedActionSafeEvidenceRef` | product-facing safe evidence refs | references only, not proof or raw runtime detail |

Consumption boundary:

- No execution eligibility is consumed.
- No approval control is consumed.
- No dispatch/provider semantics are consumed.
- No queue semantics are consumed.
- No runtime-private internals are imported.

### L4. File-Level Implementation Task Map

| Area | File | Planned change | Boundary |
|---|---|---|---|
| prepared-action product contract | `projection/contracts/v1-7-prepared-action-contract.ts` | add product-local prepared-action card/panel view types mapped from neutral upstream fields | no runtime-private import; no execution controls |
| prepared-action adapter | `projection/adapters/v1-7-prepared-action-adapter.ts` | map upstream neutral prepared-action projection into SoloCrew product-facing draft card sections | no provider/channel, no approval, no queue semantics |
| projection adapter tests | `tests/projection/v1-7-prepared-action-adapter.test.ts` | verify mapping, forbidden-field rejection, wording boundaries, safe evidence refs | references-only evidence; no execution wording drift |
| app shell page model | `app/shell/create-v1-7-prepared-action-page-model.ts` | assemble product-facing view model for the bounded prepared-action slice | display-only and human-visible only |
| app page-model tests | `tests/app/create-v1-7-prepared-action-page-model.test.ts` | verify copy, field presence, omission boundaries, and non-capability wording | no approve/reject/dispatch/execute; no queue |
| existing continuity surfaces | `projection/contracts/session-continuity-ux-contract.ts` and `projection/adapters/session-continuity-ux-adapter.ts` | remain untouched unless shared safe evidence ref helpers are strictly needed | avoid widening V1.6 scope |
| repo status docs | `README.md`, `CHANGELOG.md`, `governance/baselines/SOLOCREW-VERSION-ROADMAP-v0.1.md` | reflect implementation-ready V1.7 planning status | no tag/release/seal language |

### L5. Test / Boundary / Copy Plan

| Surface | Required check |
|---|---|
| draft-only wording | output copy states the slice is draft-only |
| non-executing wording | output copy states the slice is non-executing |
| non-approval-control wording | confirmation requirement remains display-only, not approval control |
| no dispatch/provider wording | no provider/channel send or dispatch wording appears as capability |
| no queue wording | no founder queue or queue implementation wording appears as capability |
| safe evidence refs remain references only | evidence refs stay as bounded references and do not widen into proof/raw payload |
| `runtime_private_fields_omitted` boundary preserved if surfaced | any surfaced omission marker remains explicit and truthful |

### L6. Implementation Readiness Decision

`SOLOCREW_V1_7_IMPLEMENTATION_READY`

## M. V1.7 Bounded Action-Preparation Implementation

Implementation completion marker:

`SOLOCREW_V1_7_BOUNDED_ACTION_PREPARATION_IMPLEMENTED`

Delivered surfaces:

- product-local prepared-action contract
- product-local prepared-action adapter
- product-local prepared-action page model
- focused projection and app tests

Boundary confirmation:

- draft-only
- non-executing
- non-approving
- non-dispatching
- non-provider
- non-queueing
- no runtime-private import
