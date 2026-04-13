# SOLOCREW-RUNTIME-CONSUMPTION-CONTRACT-v0.1

## Authority Order

SoloCrew consumes runtime truth under this authority order:

`MPLP Protocol -> Cognitive_OS -> SoloCrew`

## Read-Only Contract Surfaces

SoloCrew must treat the following `Cognitive_OS` surfaces as read-only contract truth:

- workforce schemas under `schemas/coregentis/v0/workforce/`
- registry truth under `registry/`
- binding truth under `bindings/`
- export truth under `bindings/coregentis-export-rules.v0.yaml`
- runtime type unions under `runtime/core/runtime-types.ts`

SoloCrew may map these surfaces into product vocabulary, but it may not rename them upward as runtime authority.

## Reusable Runtime Service Surfaces

SoloCrew may consume or wrap the following bounded runtime services:

- worker lifecycle
  - `runtime/lifecycle/worker-state-machine.ts`
  - `runtime/lifecycle/worker-lifecycle.ts`
- workforce persistence
  - `runtime/state/state-store-port.ts`
  - `runtime/state/in-memory-state-store.ts`
  - `runtime/state/sqlite-state-store.ts`
  - typed stores for worker, objective, memory, and preference
- execution contracts
  - `runtime/execution/execution-envelope.ts`
  - `runtime/execution/execution-events.ts`
  - `runtime/execution/execution-bridge.ts`
- bounded P0-B glue
  - `runtime/execution/action-dispatcher.ts`
  - `runtime/learning/objective-anchor.ts`
  - `runtime/learning/correction-capture.ts`
  - `runtime/learning/preference-writeback.ts`
- orchestrator bounded facades
  - `dispatch_bounded_action()`
  - `anchor_objective()`
  - `compare_objective_to_anchor()`
  - `capture_correction()`
  - `writeback_preference()`

## Explicitly Absent Surfaces

SoloCrew must treat these capabilities as absent today:

- full AEL
- full VSL
- full PSG
- full correction runtime and autonomous learning
- budget runtime
- channel runtime
- provider-specific execution bridges
- product workflow ownership inside `Cognitive_OS`

## Downstream Non-Claims

SoloCrew must not pretend the current stack already provides:

- full AEL, VSL, PSG, or learning
- live Telegram or other channel synchronization
- live provider execution backends
- full budget accounting

## Downstream Ownership

SoloCrew owns:

- product vocabulary
- projection DTOs
- projection-owned read models
- app workflow assembly
- provider configuration and selection when those phases open
- UI and app-only state
