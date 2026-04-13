# SOLOCREW-UPSTREAM-CONSUMPTION-SURFACE-INVENTORY-v0.1

## Purpose

This inventory records which `Cognitive_OS` surfaces SoloCrew can consume now, which surfaces are only advisory, which capabilities are still absent, and whether any of those absences block the current baseline round.

## 1. Reusable Upstream Truth

| Surface | Evidence In `Cognitive_OS` | Why It Is Reusable |
| --- | --- | --- |
| Neutral workforce schemas | `schemas/coregentis/v0/workforce/*.schema.json` | These are the current mother-runtime truth for group, worker, role, objective, work-item, review, memory, and preference objects. |
| Registry classifications | `registry/coregentis-object-registry.v0.yaml` | Gives authoritative object family, layer, temporal class, mutation class, and allowed relationships for the workforce family. |
| Binding and export constraints | `bindings/mplp-coregentis-binding-matrix.v0.yaml`, `bindings/coregentis-export-rules.v0.yaml` | Confirms all workforce objects remain runtime-private and non-exportable, which protects SoloCrew from overstating protocol equivalence. |
| Runtime type unions | `runtime/core/runtime-types.ts` | Supplies the authoritative union of Coregentis object types, layers, binding classes, export classes, and loop result surfaces. |
| Minimal orchestrator skeleton | `runtime/core/runtime-orchestrator.ts`, `runtime/harness/minimal-loop-harness.ts` | Confirms a real minimal mother-runtime loop and exposes bounded orchestration facades without promoting product workflow upstream. |
| Worker lifecycle runtime | `runtime/lifecycle/worker-state-machine.ts`, `runtime/lifecycle/worker-lifecycle.ts` | Provides legal worker states and tested transition behavior that SoloCrew can wrap but must not redefine. |
| Workforce state persistence ports and adapters | `runtime/state/state-store-port.ts`, `runtime/state/in-memory-state-store.ts`, `runtime/state/sqlite-state-store.ts`, typed stores | Provides reusable persistence surfaces for worker, objective, memory, and preference records. |
| Execution contract surfaces | `runtime/execution/execution-envelope.ts`, `runtime/execution/execution-events.ts`, `runtime/execution/execution-bridge.ts` | Supplies provider-neutral request, result, and event contracts without pretending provider logic exists upstream. |
| Bounded action and learning glue | `runtime/execution/action-dispatcher.ts`, `runtime/learning/objective-anchor.ts`, `runtime/learning/correction-capture.ts`, `runtime/learning/preference-writeback.ts` | These are real bounded implementation surfaces SoloCrew can consume as contract-first downstream glue. |
| Downstream readiness and boundary notes | `governance/guides/CGOS-RUNTIME-CONSUMPTION-GUIDE-v0.1.md`, `governance/research/CGOS-PROJECTION-HANDOFF-SURFACE-INVENTORY-v0.1.md`, `governance/audits/CGOS-PROJECTION-INTEGRATION-BOUNDARY-v0.1.md` | Explicitly define safe downstream consumption behavior and confirm projection-readiness for bounded work. |

## 2. Reusable But Not Authoritative

| Surface | Why SoloCrew May Read It | Why It Is Not SoloCrew Authority |
| --- | --- | --- |
| `governance/research/SCHEMA-CROSSWALK-SOLOCREW-v0.1.md` | Useful for mapping neutral workforce names to product nouns like `Crew` and `CrewMember`. | It is a research note, not a product DTO contract. SoloCrew must still freeze its own downstream DTO layer. |
| Runtime tests and fixtures under `tests/runtime/` and `tests/fixtures/min-loop/` | Helpful for understanding which mother-runtime behavior is already verified. | Tests show coverage and intended use, but they do not become product law or projection naming authority. |
| `runtime/export/` surfaces | Helpful to understand what upstream may or may not export at the protocol layer. | SoloCrew projection DTOs are not protocol artifacts and must not inherit export semantics as product vocabulary. |
| Broader object schemas under `schemas/coregentis/v0/objects/` | Useful to understand the minimal cognitive loop, evidence, drift, and confirm families. | SoloCrew should not present these raw mother-runtime objects directly as final product DTOs. |

## 3. Explicitly Absent

| Capability | Evidence Of Absence | SoloCrew Baseline Interpretation |
| --- | --- | --- |
| Full AEL | `runtime/README.md` and `runtime/core/README.md` both state full AEL is not implemented. | Do not claim real provider execution or production action orchestration. |
| Full VSL | `runtime/README.md`, `runtime/in-memory/README.md` | Use existing workforce persistence ports only; do not pretend the whole runtime state substrate exists. |
| Full PSG | `runtime/README.md`, `CGOS-PROJECTION-HANDOFF-SURFACE-INVENTORY-v0.1.md` | Keep projection graph semantics as downstream read-model packaging only. |
| Full correction runtime or autonomous learning | `runtime/README.md`, `CGOS-RUNTIME-CONSUMPTION-GUIDE-v0.1.md` | Treat correction capture and preference write-back as bounded glue only. |
| Budget runtime | `CGOS-PROJECTION-HANDOFF-SURFACE-INVENTORY-v0.1.md`, `CGOS-PROJECTION-INTEGRATION-BOUNDARY-v0.1.md` | Freeze `budget-snapshot` as deferred/reserved in SoloCrew. |
| Channel runtime | Same governance notes above | Freeze `channel-thread` as reserved and do not fake Web or Telegram state unification. |
| Provider bridge implementation | `runtime/execution/execution-bridge.ts` is contract-only and tests explicitly enforce provider neutrality. | SoloCrew must not pretend any live provider bridge already exists upstream. |
| Product projection logic, DTOs, app workflow assembly | `Cognitive_OS/README.md` and projection boundary notes | These remain downstream responsibilities and must live in SoloCrew. |

## 4. Blockers

Current blockers for this round:

- none

Why there is no blocker:

- the requested work is a product baseline, not a live provider/runtime rollout
- existing upstream workforce, lifecycle, persistence, and bounded glue surfaces are sufficient to freeze SoloCrew contracts
- the absent surfaces can be represented truthfully as deferred or reserved without backwriting new runtime law into `Cognitive_OS`

Why downstream can proceed without bypassing authority:

- SoloCrew can map neutral upstream objects into product DTO contracts
- SoloCrew can define reserved placeholders for budget and channel objects without claiming they are implemented
- SoloCrew can stop at app shell boundary files instead of shipping fake workflows
