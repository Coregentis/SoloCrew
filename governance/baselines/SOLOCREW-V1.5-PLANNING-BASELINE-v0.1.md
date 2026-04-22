# SoloCrew V1.5 Planning Baseline v0.1

`doc_id: SOLOCREW-V1.5-PLANNING-BASELINE-v0.1`

## A. Purpose

Define SoloCrew V1.5 planning baseline after V1.4 RC release, post-release
verification, final record closure, and product hardening.

## B. Documentation Budget

This wave uses one canonical V1.5 planning baseline rather than separate
audit/gate/dependency/stable-readiness documents.

| Artifact type | Decision | Reason |
|---|---|---|
| V1.5 planning baseline | allowed | one canonical baseline |
| Separate audit | not created | avoid governance sprawl |
| Separate gate | not created | embedded readiness gate in baseline |
| Separate dependency assessment | not created | included in baseline |
| Separate stable-readiness doc | not created | included in baseline |
| Separate release doc | not created | not a release wave |

## C. V1.4 Current Baseline

- V1.4 RC released as GitHub prerelease and remains preserved as historical
  release truth.
- V1.4 stable released as a bounded GitHub release.
- V1.4 post-release verification passed.
- V1.4 final combined record closed.
- V1.4 post-release product hardening completed.
- V1.4 is stable but not GA.
- V1.4 remains review-only and non-executing.

## D. V1.5 Strategic Question

Should V1.5 expand product capability, prepare V1.4 for stable readiness, or
first require new Cognitive_OS upstream capability?

## E. V1.5 Product Options Matrix

| Option | User value | Implementation pressure | Cognitive_OS dependency | Decision |
|---|---|---|---|---|
| V1.4 stable-readiness / hardening line | high | medium | no | leading candidate |
| Continuity snapshot display/export | medium-high | medium | no if it consumes the existing local continuity scaffold only | downstream-only candidate |
| Packet lifecycle + continuity combined view | high | medium | no if it remains on current local continuity and packet surfaces | downstream-only candidate |
| Lightweight local session continuity UX | medium | medium | no if it remains UX-only over existing continuity summaries | downstream-only candidate |
| Better onboarding / demo tutorial path | medium | low | no | supporting candidate |
| Bounded action-preparation draft, explicitly not execution | medium-high | high | yes | defer; upstream-first if selected later |
| Provider/channel execution | out of scope | unacceptable | not applicable | rejected |
| Approve/reject/dispatch/execute | out of scope | unacceptable | not applicable | rejected |
| Founder queue, out of scope unless separately scoped | low for current line | high and boundary-widening | likely yes if ever pursued | rejected for current planning wave |

## F. Stable-Readiness vs Feature-Line Strategy

| Strategy | Meaning | Pros | Risks | Decision |
|---|---|---|---|---|
| V1.4 stable readiness | use the next governed line to assess whether the released V1.4 RC can later graduate from prerelease without widening scope | consolidates current release truth, reduces release ambiguity, and keeps the current slice coherent | slows immediate feature expansion | SELECTED |
| V1.5 feature expansion | start a new downstream feature line immediately above the released V1.4 RC | adds visible new surface area faster | can blur V1.4 closure and widen scope before stable-readiness judgment | DEFERRED |
| Cognitive_OS dependency first | reopen upstream planning before any new downstream scope | useful if the next feature requires new runtime semantics | not required for the current highest-ROI next step | DEFERRED |
| V1.5 hold / correction line | pause expansion and only address latent corrections | lowest scope risk if a regression appears | low momentum without current blocker evidence | REJECTED_FOR_NOW |

## G. Upstream Dependency Assessment

| V1.5 option | Requires new Cognitive_OS Runtime capability? | Requires new Projection contract? | Requires MPLP candidate/backlog? | Decision |
|---|---|---|---|---|
| V1.4 stable-readiness / hardening line | no | no | no | downstream-only |
| Continuity snapshot display/export | no if limited to the existing local continuity scaffold | no | no | downstream-only candidate |
| Packet lifecycle + continuity combined view | no if limited to current local continuity and packet surfaces | no | no | downstream-only candidate |
| Lightweight local session continuity UX | no if limited to current continuity summaries and local UX shaping | no | no | downstream-only candidate |
| Better onboarding / demo tutorial path | no | no | no | downstream-only |
| Bounded action-preparation draft | yes | yes | yes, candidate/backlog only | requires new upstream planning before implementation |

MPLP posture remains candidate/backlog only where relevant.
This wave does not imply MPLP protocol change, schema change, or binding
change.

## H. Recommended V1.5 Direction

`SOLOCREW_V1_5_DIRECTION_V1_4_STABLE_READINESS`

The highest-ROI next line is to treat V1.5 planning as a V1.4 stable-readiness
strategy line rather than immediately widening product scope. Current repo
truth already includes a released V1.4 RC, post-release verification, final
record closure, and post-release hardening, so the next decision should be
whether the bounded V1.4 surface is ready for later stable-readiness planning
instead of opening a broader feature wave first.

V1.4 stable-readiness baseline has been opened as the selected V1.5
direction.
V1.4 stable release planning has been opened under the V1.5 stable-readiness
line.
V1.4 stable release has now been executed as the bounded stable line while
V1.5 remains the planning line for the next direction choice.

## I. V1.5 Scope / Non-Scope

### Scope

- assess whether V1.4 should next move toward stable-readiness rather than
  immediate feature expansion
- keep downstream-only follow-on candidates visible:
  - continuity snapshot display/export
  - packet lifecycle + continuity combined view
  - lightweight local session continuity UX
  - better onboarding / demo tutorial path
- defer any new upstream-dependent feature until separately planned

### Non-Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue unless separately scoped
- no queue implementation
- no autonomous company operation
- no direct Cognitive_OS runtime-private import
- no MPLP protocol change
- no protocol certification
- no GA/stable claim in this planning wave

## J. Embedded Readiness Gate

| Gate | Requirement | Status |
|---|---|---|
| V1.4 state reviewed | RC release, post-verification, final record closure, and post-release hardening are known inputs | PASS |
| V1.5 product options evaluated | option matrix completed | PASS |
| stable-readiness strategy assessed | V1.4 stable-readiness versus feature expansion tradeoff is explicitly evaluated | PASS |
| Cognitive_OS dependency assessed | upstream dependency table completed | PASS |
| MPLP mapping posture assessed | MPLP remains candidate/backlog only and non-normative | PASS |
| selected direction recorded | V1.4 stable-readiness direction recorded | PASS |
| documentation budget respected | one canonical new baseline plus minimal alignment docs only | PASS |
| delivery ROI respected | release-line strategy, dependency assessment, and selected direction landed together | PASS |
| no implementation in this wave | planning-only update | PASS |
| no tag/release/seal | no tag, GitHub Release, or seal record created in this wave | PASS |

Decision enum:

`SOLOCREW_V1_5_PLANNING_BASELINE_READY`
