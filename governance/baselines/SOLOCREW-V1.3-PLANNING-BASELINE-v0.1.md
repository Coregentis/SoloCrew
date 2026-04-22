# SoloCrew V1.3 Planning Baseline v0.1

`doc_id: SOLOCREW-V1.3-PLANNING-BASELINE-v0.1`

## A. Purpose

Define SoloCrew V1.3 planning baseline after V1.2 RC release / verification /
hardening.

## B. Documentation Budget

This wave intentionally uses one canonical planning baseline rather than
separate audit/gate/plan documents.

| Artifact type | Decision | Reason |
|---|---|---|
| New baseline | allowed | one canonical V1.3 planning baseline |
| Separate audit | not created | avoid governance sprawl |
| Separate gate | not created | gate embedded in this baseline |
| Separate release doc | not created | this is not release wave |

## C. V1.2 Current Baseline

- V1.2 RC released.
- V1.2 post-RC verification complete.
- V1.2 product hardening complete.
- V1.2 backflow source recorded.
- V1.2 remains bounded and non-executing.

## D. V1.3 Product Question

What user-visible improvement should V1.3 deliver beyond packet revision?

| Option | User value | Implementation pressure | Cognitive_OS dependency | Decision |
|---|---|---|---|---|
| Better founder-facing intake-to-packet walkthrough | medium | low | none beyond existing projection-safe product consumption | fold into recommended V1.3 direction |
| Multi-step packet lifecycle dashboard | high | medium | none required for planning if built from current SoloCrew surfaces | candidate after lifecycle-baseline selection |
| Local persistence / session continuity improvement | medium | medium-high | not required for the selected V1.3 baseline | defer |
| Review-to-revision UX tightening | high | medium | none beyond current SoloCrew app/projection surfaces | recommended |
| First bounded action-preparation layer without execution | medium | high | potentially separate product-scope planning even if still non-executing | defer |
| Provider/channel execution | out of scope | unacceptable for this wave | not applicable | reject for V1.3 baseline |
| Founder queue | out of scope unless separately planned | high and boundary-widening | separate product planning required | reject for current V1.3 baseline |

## E. Recommended V1.3 Direction

V1.3 should improve the founder-facing packet lifecycle from intake -> packet
candidate -> evidence gap -> revision candidate -> review posture, without
crossing into execution, approval, provider/channel send, or founder queue.

The recommended product direction is lifecycle clarity rather than capability
expansion: tighten how current founder-facing intake, packet candidate,
revision candidate, and review posture surfaces connect so the user can follow
one coherent non-executing path.

## F. Scope

- user-facing lifecycle clarity
- review posture clarity
- evidence gap visibility
- revision history / candidate relationship clarity
- demo path improvement
- README / walkthrough alignment
- tests for selected product surface

## G. Non-Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no autonomous company operation
- no Cognitive_OS runtime-private import
- no MPLP change
- no protocol certification
- no GA/stable claim

## H. Cognitive_OS Dependency Assessment

| V1.3 need | Can use existing Cognitive_OS projection-safe surface? | New Cognitive_OS work needed? | Decision |
|---|---|---|---|
| intake -> packet candidate -> review posture lifecycle clarity | yes | no | use current SoloCrew app and projection surfaces |
| evidence gap and revision-candidate relationship clarity | yes | no | use current packet revision and intake-to-packet surfaces |
| founder-facing walkthrough / README / demo alignment | yes | no | product-layer only |
| local persistence / session continuity improvement | not needed for selected baseline | not now | defer outside current V1.3 baseline |

V1.3 planning is not blocked on new Cognitive_OS work. The selected baseline
can proceed using current SoloCrew product surfaces and current upstream
projection-safe boundaries.

## I. Embedded Readiness Gate

| Gate | Requirement | Status |
|---|---|---|
| V1.2 baseline read. | release, verification, hardening, and backflow source are known inputs | PASS |
| V1.3 user value selected. | lifecycle clarity is selected over capability expansion | PASS |
| V1.3 scope bounded. | scope stays on founder-facing lifecycle clarity | PASS |
| V1.3 non-scope explicit. | execution, queue, and protocol/runtime widening stay excluded | PASS |
| Cognitive_OS dependency assessed. | selected baseline uses current projection-safe surfaces | PASS |
| No upstream changes required for planning. | no new Cognitive_OS or MPLP work is required to open V1.3 planning | PASS |
| Documentation budget respected. | one canonical baseline only | PASS |
| No implementation in this wave. | governance-only planning update | PASS |
| Tests to be defined in next wave. | implementation planning will define selected test set | PASS |
| No tag/release/seal. | this is planning only | PASS |

## Decision

`SOLOCREW_V1_3_PLANNING_BASELINE_READY`
