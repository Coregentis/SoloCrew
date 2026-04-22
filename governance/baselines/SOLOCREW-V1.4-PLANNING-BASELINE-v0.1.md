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
