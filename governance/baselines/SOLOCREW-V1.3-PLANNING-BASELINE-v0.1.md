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

## J. V1.3 Implementation Planning

### J1. Implementation Objective

V1.3 implementation should make the packet lifecycle more visible and usable
from intake -> packet candidate -> evidence gap -> revision candidate -> review
posture, without crossing into execution, approval, provider/channel send, or
founder queue.

### J2. Implementation Slice Decision

| Slice | User value | Files likely touched | Test surface | Decision |
|---|---|---|---|---|
| lifecycle status model / labels | high | contract, flow, page model | projection + app tests | selected inside V1.3 lifecycle clarity slice |
| evidence gap visibility | high | adapter, page model | adapter + app tests | selected inside V1.3 lifecycle clarity slice |
| revision relationship display | high | contract, adapter, page model | adapter + app tests | selected inside V1.3 lifecycle clarity slice |
| review posture explanation | high | flow, page model, README | flow + app tests | selected inside V1.3 lifecycle clarity slice |
| demo scenario path | medium | README / walkthrough follow-up | future guide/readme validation | defer to implementation-adjacent copy follow-up |
| README / walkthrough alignment | medium | README and existing guide alignment | README grep + npm test | selected as minimal alignment work |
| provider/channel execution | none for bounded V1.3 | not applicable | not applicable | out of scope |
| founder queue | none for bounded V1.3 | not applicable | not applicable | out of scope |

Selected slice: `V1.3 lifecycle clarity slice`

### J3. File-Level Task Map

| Area | Current file | Expected V1.3 change | Implementation risk |
|---|---|---|---|
| contract | `projection/contracts/packet-revision-contract.ts` | extend bounded packet revision product vocabulary for clearer lifecycle labels and revision relationship visibility without widening semantics | medium |
| adapter | `projection/adapters/packet-revision-adapter.ts` | derive clearer lifecycle-facing packet revision fields from existing bounded revision input and evidence gap posture | medium |
| flow | `projection/assembly/packet-revision-flow.ts` | normalize lifecycle-facing review/staging interpretation so packet lifecycle states read coherently from one flow result | low |
| app shell page model | `app/shell/create-v1-2-packet-revision-page-model.ts` | expose lifecycle clarity fields and clearer relationship copy for founder-facing rendering without adding control semantics | medium |
| projection tests | `tests/projection/packet-revision-adapter.test.ts` | add/update assertions for lifecycle labels, evidence gap visibility, revision relationship fields, and non-executing guards | low |
| projection tests | `tests/projection/packet-revision-flow.test.ts` | add/update assertions for lifecycle posture mapping, review-only posture, and non-dispatchable language | low |
| app tests | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | add/update assertions for founder-facing lifecycle clarity, evidence gap visibility, revision relationship display, and boundary copy | low |
| product docs | `README.md` | minimally explain the V1.3 lifecycle-clarity improvement once implemented | low |

### J4. Test Planning

| Test area | Existing test file | New/updated assertions |
|---|---|---|
| lifecycle state labels | `tests/projection/packet-revision-flow.test.ts` | review posture and staging posture read as one coherent packet lifecycle story |
| evidence gap visibility | `tests/projection/packet-revision-adapter.test.ts` | evidence gap summaries remain explicit, bounded, and user-visible |
| revision candidate relationship | `tests/projection/packet-revision-adapter.test.ts` | previous/revised packet candidate references remain explicit and correctly mapped |
| review-only posture | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | page model keeps review-only posture visible across clean and blocked paths |
| non-execution boundary | `tests/projection/packet-revision-flow.test.ts` | lifecycle clarity copy still stays below execution-ready semantics |
| no approve/reject/dispatch/execute claim | `tests/projection/packet-revision-flow.test.ts` and `tests/app/create-v1-2-packet-revision-page-model.test.ts` | boundary copy and visible fields do not widen into direct-control wording |
| no founder queue claim | `tests/projection/packet-revision-adapter.test.ts` and `tests/projection/packet-revision-flow.test.ts` | lifecycle clarity additions do not introduce queue wording or queue semantics |

### J5. DoR

| Readiness item | Status |
|---|---|
| V1.3 baseline exists | PASS |
| implementation slice selected | PASS |
| file-level task map defined | PASS |
| tests planned | PASS |
| no Cognitive_OS dependency | PASS |
| no MPLP dependency | PASS |
| documentation budget respected | PASS |

### J6. DoD

| Done item | Required evidence |
|---|---|
| tests pass | `npm test` passes after the implementation wave |
| page model exposes lifecycle clarity | page-model tests prove lifecycle labels, evidence gap visibility, and revision relationship clarity |
| adapter/flow preserve non-executing boundary | adapter and flow tests keep review-only / not-sent / not-dispatchable semantics explicit |
| README explains V1.3 improvement | README reflects the lifecycle-clarity improvement without capability overclaim |
| no provider/channel execution | grep and tests remain exclusion-only for provider/channel semantics |
| no approve/reject/dispatch/execute | grep and tests remain exclusion-only for direct-control semantics |
| no founder queue | grep and tests remain exclusion-only for queue semantics |
| no new upstream dependency | implementation diff stays inside SoloCrew app/projection/test/docs surfaces |

### J7. Embedded Implementation Planning Decision

`SOLOCREW_V1_3_IMPLEMENTATION_PLANNING_READY`

## K. V1.3 Post-Implementation Verification

### K1. Verification Scope

This verification checks the implemented V1.3 lifecycle clarity slice against
the existing planning baseline. It does not create release readiness, tag,
GitHub Release, seal record, or new governance documents.

### K2. Implementation Surface Verification

| Surface | Expected V1.3 behavior | Verification result |
|---|---|---|
| `packet-revision-contract.ts` | lifecycle-facing bounded vocabulary exists for lifecycle label, lifecycle stage, revision relationship, and non-executing posture | PASS |
| `packet-revision-adapter.ts` | derives lifecycle clarity fields from bounded revision input while keeping evidence gaps explicit and review-only | PASS |
| `packet-revision-flow.ts` | normalizes one coherent packet lifecycle story with readable review/staging posture and blocked fallback | PASS |
| `create-v1-2-packet-revision-page-model.ts` | exposes founder-facing lifecycle clarity fields without widening into control semantics | PASS |
| `packet-revision-adapter.test.ts` | verifies lifecycle labels, evidence gap visibility, revision relationship, and non-executing boundary | PASS |
| `packet-revision-flow.test.ts` | verifies lifecycle posture mapping, review-only posture, blocked fallback, and non-executing story | PASS |
| `create-v1-2-packet-revision-page-model.test.ts` | verifies page-model lifecycle clarity, relationship visibility, and review-only posture | PASS |
| `README.md` | V1.3 wording matches the implemented lifecycle-clarity slice and keeps the product non-executing | PASS |

### K3. Boundary Verification

| Boundary | Result | Evidence |
|---|---|---|
| no provider/channel execution | PASS | full test suite passed; boundary grep matches remained exclusion-only, boundary-only, or negative-fixture usage |
| no approve/reject/dispatch/execute | PASS | lifecycle clarity fields stay below direct-control semantics; forbidden-claim grep found no positive enabled usage |
| no founder queue | PASS | queue wording remained exclusion-only or negative-fixture only |
| no autonomous company operation | PASS | no implementation or README wording widened into autonomy claims |
| no Cognitive_OS dependency | PASS | implementation stayed inside SoloCrew files and reused current downstream surfaces only |
| no MPLP dependency | PASS | no MPLP files or new MPLP requirements appeared in this wave |
| no runtime-private import | PASS | upstream-dependency grep found runtime-private wording only in forbidden raw-key checks, boundary statements, or legacy downstream-consumption references, not as new imports for this slice |
| no tag/release/seal | PASS | this verification wave changed no release artifacts and created no tag, GitHub Release, or seal record |

### K4. Test Verification

`npm test`: `267` tests passed

### K5. Decision

`SOLOCREW_V1_3_POST_IMPLEMENTATION_VERIFICATION_PASS`
