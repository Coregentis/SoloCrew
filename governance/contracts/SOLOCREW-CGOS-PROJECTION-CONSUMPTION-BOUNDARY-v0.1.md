# SOLOCREW-CGOS-PROJECTION-CONSUMPTION-BOUNDARY-v0.1

## A. Purpose

SoloCrew may only consume `Cognitive_OS` runtime outputs through an explicit
projection contract.

This document freezes the boundary for contract drafting only.
It is not implementation.
It does not define final DTOs.
It does not authorize direct runtime-private dependency.

## B. Allowed Candidate Upstream Input Families

The following are allowed candidate upstream input families only.
They are not final DTOs.

- continuity summary / continuation anchor summary
- semantic relation / affected object summary
- drift-impact summary
- activation outcome summary
- confirm / trace / decision evidence summary
- learning suggestion summary

These families may later be narrowed through a projection contract, but they
must remain:

- bounded
- omission-aware
- non-authoritative in product space
- below direct-control semantics

## C. Forbidden Direct Dependencies

Forbidden direct dependencies:

- `runtime/core/*`
- `runtime/in-memory/*`
- raw VSL store layout
- raw PSG graph state
- raw `MinimalLoopRunResult`
- raw `learning-candidate`
- raw `drift-record`
- raw `conflict-case`
- raw `activation-signal`
- raw `action-unit`
- raw `memory-promotion-record`

SoloCrew must also not depend directly on:

- raw runtime-private binding or store internals as if they were stable product
  APIs
- runtime-private object identity as if it were already user-facing product
  vocabulary
- bounded `Confirm` / `Trace` export as if it implied full protocol
  reconstruction

## D. Required Projection Contract Before Use

Before any SoloCrew implementation consumes upstream runtime outputs, a later
projection contract must define:

- field subset
- omission semantics
- confidence / insufficiency semantics
- evidence refs
- allowed user-facing labels
- forbidden user-facing labels
- update / stale-state behavior
- non-exportable runtime fields
- test requirements

That later projection contract must also preserve:

- no runtime law invention in product space
- no product-law backwriting into `Cognitive_OS`
- no approve/reject/dispatch/execute
- no provider/channel execution

## E. Explicit Non-Goals

This document must not define:

- final DTOs
- exception-plane UI
- approval workflow
- dispatch/execute behavior
- provider/channel behavior
- Operational V1.0 closure
- full runtime dependency

This boundary is therefore for contract drafting only.
It is not implementation.

## F. Boundary Conclusion

This wave enables projection contract drafting only.
It does not authorize product implementation.

The correct next move after this boundary is:

- define one bounded projection contract over allowed candidate input families
- preserve forbidden direct dependencies
- keep current SoloCrew exception-plane work below direct-control and execution
  claims
