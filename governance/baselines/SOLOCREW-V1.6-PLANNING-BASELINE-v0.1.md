# SoloCrew V1.6 Planning Baseline v0.1

`doc_id: SOLOCREW-V1.6-PLANNING-BASELINE-v0.1`

## A. Purpose

Define SoloCrew V1.6 planning baseline after V1.4 Stable release and V1.5
release-line closure.

## B. Version Semantics

- V1.6 is a feature-line version.
- V1.6 targets Session Continuity / Local History Usable UX.
- V1.6 does not reopen V1.4.
- V1.6 does not redefine V1.5.
- V1.6 does not introduce execution, approval, dispatch, provider/channel
  send, founder queue, or queue implementation.
- V1.6 implementation must not begin until upstream dependency assessment is
  complete.

## C. Documentation Budget

This wave uses one canonical V1.6 planning baseline rather than separate
audit/gate/dependency/implementation documents.

| Artifact type | Decision | Reason |
|---|---|---|
| V1.6 planning baseline | allowed | one canonical baseline |
| Separate audit | not created | avoid governance sprawl |
| Separate gate | not created | embedded readiness gate in baseline |
| Separate dependency assessment | not created | included in baseline |
| Separate implementation plan | not created | not an implementation wave |
| Release doc | not created | not a release wave |

## D. Current State Closure

- V1.4 Stable released and post-verified.
- V1.4 RC prerelease preserved.
- V1.4 remains bounded, review-only, and non-executing.
- V1.5 release-line closure completed.
- No open V1.4 correction is known from current repo truth.

## E. V1.6 Product Options Matrix

| Option | User value | Implementation pressure | Cognitive_OS dependency | Decision |
|---|---|---|---|---|
| Local session continuity panel | high | medium | no if it only consumes existing local continuity views | downstream-only leading candidate |
| Packet / continuity local history timeline | high | medium | no if it stays on existing lifecycle/history summaries | downstream-only leading candidate |
| Review trail display | high | medium | no if it stays read-only over existing pending review visibility and history summaries | downstream-only candidate |
| Continuity snapshot display using existing local continuity scaffold | medium-high | low-medium | no if it only renders current snapshot summaries and safe evidence refs | downstream-only candidate |
| Demo onboarding path for continuity replay | medium | low | no | downstream-only support candidate |
| Multi-session durable persistence | high | high | yes | defer; upstream-dependent |
| Action-preparation draft | medium-high | high | yes | out of scope for V1.6 |
| Provider/channel execution | out of scope | unacceptable | not applicable | rejected |
| Approve/reject/dispatch/execute | out of scope | unacceptable | not applicable | rejected |
| Founder queue | out of scope | unacceptable | not applicable | rejected |

## F. Downstream-Only vs Cognitive_OS Dependency Assessment

| V1.6 option | Can be downstream-only? | Requires new Cognitive_OS Runtime capability? | Requires new Projection contract? | Decision |
|---|---|---|---|---|
| Local session continuity panel | yes | no | no | V1.6 downstream-only scope |
| Packet / continuity local history timeline | yes | no | no | V1.6 downstream-only scope |
| Review trail display | yes | no | no | V1.6 downstream-only scope |
| Continuity snapshot display | yes | no | no | V1.6 downstream-only scope |
| Demo onboarding path for continuity replay | yes | no | no | V1.6 downstream-only scope |
| Multi-session durable persistence | no | yes | yes | deferred pending Cognitive_OS planning |
| Action-preparation draft | no | yes | yes | out of scope for V1.6 and upstream-dependent |

Expected direction:

- V1.6 can start with downstream-only usable UX over the existing local
  continuity scaffold.
- Durable multi-session persistence remains deferred and requires separate
  Cognitive_OS planning before implementation.

## G. MPLP Posture Assessment

| Concern | MPLP posture | Decision |
|---|---|---|
| session continuity display | no MPLP change | downstream product UX only |
| local history timeline | no MPLP change | downstream product UX only |
| review trail display | no MPLP change | downstream product UX only |
| continuity snapshot display | no MPLP change | downstream product UX only |
| multi-session persistence | candidate/backlog only if later generalized upward | no protocol/schema/binding change in this wave |
| action-preparation future line | candidate/backlog only | no protocol/schema/binding change in this wave |
| execution boundary future line | candidate/backlog only | no protocol/schema/binding change in this wave |

Required conclusion:

- No MPLP protocol change.
- No MPLP schema change.
- No MPLP binding change.
- Future action-preparation / execution boundary remains candidate/backlog
  only.

## H. Recommended V1.6 Direction

`SOLOCREW_V1_6_DIRECTION_DOWNSTREAM_ONLY_SESSION_CONTINUITY_UX`

Current repo truth already contains a downstream-safe continuity contract,
adapter, tests, and page-model continuity surface. That means V1.6 can open
as a new feature-line for usable Session Continuity / Local History UX without
waiting on new upstream runtime work, as long as the first slice remains
display-only over existing local continuity summaries, history summaries,
pending review visibility, continuity snapshots, and safe evidence refs.

Durable multi-session persistence remains explicitly deferred until separately
planned with Cognitive_OS.

## I. V1.6 Scope / Non-Scope

### Scope

- local session continuity panel over existing local continuity views
- packet / continuity local history timeline over existing lifecycle and
  history summaries
- review trail display below queue semantics
- continuity snapshot display over existing local continuity scaffold
- demo onboarding path for continuity replay

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
- no V1.4 reopening
- no V1.5 redefinition

## J. Embedded Readiness Gate

| Gate | Requirement | Status |
|---|---|---|
| V1.4 stable state reviewed | stable release, stable post-verification, and preserved RC truth verified | PASS |
| V1.5 release-line closure acknowledged | V1.5 is treated as the closed stable-readiness / release-line closure | PASS |
| V1.6 version semantics locked | V1.6 feature-line meaning is explicit in this baseline | PASS |
| V1.6 product options evaluated | option matrix completed | PASS |
| Cognitive_OS dependency assessed | downstream-only versus upstream-dependent table completed | PASS |
| MPLP posture assessed | MPLP remains candidate/backlog only and non-normative | PASS |
| selected direction recorded | downstream-only session continuity UX direction recorded | PASS |
| documentation budget respected | one canonical new baseline plus minimal alignment docs only | PASS |
| delivery ROI respected | version lock, options, dependency posture, and direction landed together | PASS |
| no implementation in this wave | planning-only update | PASS |
| no tag/release/seal | no tag, GitHub Release, or seal record created in this wave | PASS |

Decision enum:

`SOLOCREW_V1_6_PLANNING_BASELINE_READY`

## K. V1.6 Implementation Planning and Downstream UX Scaffold

### K1. Implementation Objective

V1.6 implements a downstream-only Session Continuity / Local History Usable
UX scaffold over existing local continuity views. It does not implement
durable multi-session persistence, action-preparation, provider/channel
execution, approve/reject/dispatch/execute, founder queue, queue
implementation, Cognitive_OS changes, or MPLP changes.

### K2. Implementation Slice

| Slice | User value | Files likely touched | Boundary | Decision |
|---|---|---|---|---|
| local session continuity panel | high | UX contract, UX adapter, V1.6 page model, tests | display-only, review-only, non-executing | selected |
| local history timeline | high | UX contract, UX adapter, V1.6 page model, tests | display-only and below durable persistence semantics | selected |
| review trail display | high | UX contract, UX adapter, V1.6 page model, tests | display-only and below queue semantics | selected |
| continuity snapshot display | medium-high | UX adapter, V1.6 page model, tests | display-only over existing safe snapshot summaries | selected as supporting scaffold output |
| demo continuity replay path | medium | UX adapter, V1.6 page model, tests | guided viewing only, not execution replay | selected as supporting scaffold output |
| multi-session durable persistence | high | not touched in this wave | requires upstream runtime authority | deferred |
| action-preparation draft | medium-high | not touched in this wave | upstream-dependent and out of scope | rejected |
| provider/channel execution | none for bounded V1.6 | not applicable | unacceptable | rejected |
| approve/reject/dispatch/execute | none for bounded V1.6 | not applicable | unacceptable | rejected |
| founder queue | none for bounded V1.6 | not applicable | unacceptable | rejected |

Selected slice: `local session continuity panel + local history timeline + review trail display`

### K3. File-Level Task Map

| Area | File | Planned change | Boundary |
|---|---|---|---|
| session continuity UX contract | `projection/contracts/session-continuity-ux-contract.ts` | define local display-only continuity panel, local history, review trail, and replay-step view types | no runtime-private fields, no execution semantics |
| session continuity UX adapter | `projection/adapters/session-continuity-ux-adapter.ts` | adapt existing safe continuity views into local session continuity UX views and derived replay steps | reject runtime-private / execution / queue fields recursively |
| session continuity page model | `app/shell/create-v1-6-session-continuity-page-model.ts` | expose founder-facing display-only session continuity panel, local history timeline, review trail, and replay steps | no execution, queue, provider/channel, or durable persistence claims |
| projection tests | `tests/projection/session-continuity-ux-adapter.test.ts` | verify safe adaptation, rejected fields, replay display-only posture, and no durable persistence claims | exclusion-only for runtime-private / execution / queue semantics |
| app/page-model tests | `tests/app/create-v1-6-session-continuity-page-model.test.ts` | verify V1.6 page-model fields and no forbidden wording | display-only, review-only, non-executing |
| product docs | `README.md`, `CHANGELOG.md` | align V1.6 line with downstream-only UX scaffold implementation | no V1.4 reopening, no V1.5 redefinition |

### K4. DoR / DoD

#### DoR

- V1.6 planning baseline ready
- selected direction is downstream-only
- existing continuity scaffold available
- no Cognitive_OS dependency required for first UX slice
- no MPLP change required

#### DoD

- local session continuity UX contract exists
- adapter builds local session continuity view from existing safe continuity inputs
- page model exposes session continuity panel / local history timeline / review trail
- tests pass
- no runtime-private fields exposed
- no durable multi-session persistence claim
- no execution / approval / dispatch / queue semantics

### K5. Decision

`SOLOCREW_V1_6_IMPLEMENTATION_SCAFFOLD_READY`

`SOLOCREW_V1_6_DOWNSTREAM_UX_SCAFFOLD_IMPLEMENTED`

## L. V1.6 Implementation Verification and RC Release Readiness

### L1. Verification Purpose

This section verifies the V1.6 downstream-only Session Continuity / Local
History UX scaffold and prepares RC release readiness. It does not create a
tag, GitHub Release, seal record, durable multi-session persistence,
action-preparation, execution, approval, dispatch, provider/channel send,
founder queue, Cognitive_OS change, or MPLP change.

### L2. Implementation Surface Verification

| Surface | Expected behavior | Verification result |
|---|---|---|
| `session-continuity-ux-contract.ts` | local history, review trail, and continuity replay are defined as display-only bounded UX views | PASS |
| `session-continuity-ux-adapter.ts` | adapts existing safe continuity inputs, preserves safe evidence refs, rejects runtime-private / execution / queue fields, and stays non-executing | PASS |
| `create-v1-6-session-continuity-page-model.ts` | exposes session continuity panel, local history timeline, review trail, replay steps, snapshot support, and boundary marker fields in display-only terms | PASS |
| `session-continuity-ux-adapter.test.ts` | covers valid adaptation, rejected fields, safe evidence refs, no durable persistence, and no execution / queue claims | PASS |
| `create-v1-6-session-continuity-page-model.test.ts` | covers V1.6 UX fields, display-only replay posture, safe evidence refs, and forbidden wording checks | PASS |
| `README.md` | describes the V1.6 downstream-only UX scaffold without widening capability claims | PASS |
| `CHANGELOG.md` | records the V1.6 scaffold implementation and verification/readiness posture without release execution overclaim | PASS |

### L3. Boundary Verification

| Boundary | Result | Evidence |
|---|---|---|
| no V1.4 reopening | PASS | V1.4 remains the closed stable continuity page-model line in README and current version semantics |
| no V1.5 redefinition | PASS | V1.5 remains the closed release-line closure in README and V1.6 baseline |
| no Cognitive_OS file change | PASS | changed files remain inside SoloCrew docs, app shell, projection, and tests only |
| no MPLP file change | PASS | no MPLP repo or protocol/schema/binding file changed |
| no runtime-private import | PASS | source boundary grep found no direct Cognitive_OS source import or runtime-private import |
| no durable multi-session persistence | PASS | V1.6 scaffold and tests remain below durable persistence claims |
| no action-preparation | PASS | V1.6 scaffold and docs keep action-preparation out of scope |
| no provider/channel execution | PASS | UX scaffold remains display-only and grep matches stayed exclusion-only |
| no approve/reject/dispatch/execute | PASS | no direct-control semantics were introduced in UX contract, adapter, page model, or docs |
| no founder queue | PASS | review trail stays below queue semantics and tests keep founder queue claims out |
| no queue implementation | PASS | no queue state/model/worker surface was introduced |
| no tag/release/seal | PASS | this wave prepares RC readiness only; no tag, GitHub Release, or seal record created |

### L4. V1.6 RC Release Type Decision

| Option | Meaning | Decision | Reason |
|---|---|---|---|
| V1.6 RC | Release candidate for downstream-only session continuity UX scaffold | SELECTED | implementation and tests passed; execution still requires explicit authorization |
| V1.6 stable | Stable release | REJECTED_FOR_NOW | RC must release and verify first |
| V1.7 planning | next feature line | DEFERRED | V1.6 RC should close first |

Decision:

`SOLOCREW_V1_6_RC_RELEASE_TYPE_SELECTED_FOR_PLANNING`

### L5. Proposed V1.6 RC Tag / Release Identity

- `tag`: `solocrew-v1.6-rc-session-continuity-ux-20260422`
- `release_title`: `SoloCrew V1.6 RC — Session Continuity UX`
- `release_type`: `GitHub prerelease`

This is proposed only. No tag or GitHub Release is created in this wave.

### L6. V1.6 RC Scope

- downstream-only session continuity panel
- local history timeline display
- review trail display
- continuity replay guided display
- continuity snapshot display support
- safe evidence refs
- `runtime_private_fields_omitted` boundary marker
- 313-test suite passing

### L7. V1.6 RC Non-Scope

- no durable multi-session persistence
- no action-preparation
- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no queue implementation
- no autonomous company operation
- no Cognitive_OS change
- no MPLP change
- no runtime-private import
- no protocol certification
- no GA claim

### L8. RC Execution Readiness Matrix

| Requirement | Required evidence | Status |
|---|---|---|
| repo clean and local/remote aligned | `git status --short` clean and local/remote HEAD match | PASS |
| implementation verification passed | V1.6 implementation surface and boundary verification completed in this baseline | PASS |
| `npm test` passes | full suite passes at 313 tests | PASS |
| focused V1.6 adapter and page-model tests pass | focused `npm test -- ...` commands completed successfully | PASS |
| boundary grep passes | boundary grep remained explicit exclusions, non-scope statements, warnings, or negative fixtures only | PASS |
| no existing V1.6 RC tag | `git tag --list "solocrew-v1.6-rc-session-continuity-ux-20260422"` returned no tag | PASS |
| no existing V1.6 RC GitHub Release | `gh release view solocrew-v1.6-rc-session-continuity-ux-20260422` returned release not found | PASS |
| release notes draft created | V1.6 RC GitHub release notes draft exists in `governance/releases` | PASS |
| README / CHANGELOG aligned | both surfaces describe verification and RC readiness truth | PASS |
| explicit user authorization required for execution | RC execution remains blocked until a later explicit authorization wave | PASS |

Decision:

`SOLOCREW_V1_6_RC_RELEASE_EXECUTION_READINESS_PASS`
