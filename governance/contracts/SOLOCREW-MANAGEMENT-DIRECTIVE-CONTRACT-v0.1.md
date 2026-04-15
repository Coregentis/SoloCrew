# SOLOCREW Management Directive Contract v0.1

## Purpose

This contract freezes the minimum `Management Directive` object for `v0.4-multi-cell-foundation`.

`Management Directive` is the bounded top-down management object that may later inform a `Cell` without becoming a raw runtime execution envelope.

## Current Purpose

Today `Management Directive` exists to carry bounded product-level guidance such as:

- priority emphasis
- delivery emphasis
- constraint emphasis
- approval posture
- a short management note for the target `Cell`

## Minimum Contract Shape

The minimum contract should include:

- `directive_id`
- `target_cell_ref`
- `directive_headline`
- `priority_emphasis`
- `delivery_emphasis`
- `constraint_emphasis`
- `approval_posture`
- `issued_by`
- `issued_at`
- `status`

## Authority Boundary

`Management Directive` is:

- a SoloCrew management-to-cell product object
- lawful product coordination input

`Management Directive` is not:

- a provider execution request
- a channel task packet
- a runtime-native orchestration envelope
- a protocol-level obligation

The directive may guide a `Cell`.
It may not silently micromanage mother-runtime state below lawful product boundaries.

## Current Owning Layer

Today this object is owned by:

- SoloCrew product layer

It remains product-owned while it is used as a bounded management contract and not as a reusable runtime execution surface.

## Explicit Deferrals

This contract explicitly defers:

- Secretary-issued behavior as a completed product UX
- automatic portfolio dispatch
- provider-backed action execution
- channel-routed handoff
- generalized runtime policy enforcement
- protocol promotion

## Later Upstream Blocker Trigger

`Management Directive` becomes a legitimate later `Cognitive_OS` blocker-intake candidate only if SoloCrew proves it needs:

- durable cross-cell runtime-backed directive state
- reusable runtime coordination semantics
- directive interpretation that can no longer stay truthful as downstream product contract only

This contract does not promote that blocker by itself.

## Contract Rule

If a future `Management Directive` field exists mainly to drive provider execution, runtime scheduling, or enterprise control, it does not belong in the minimum `v0.4` contract by default.
