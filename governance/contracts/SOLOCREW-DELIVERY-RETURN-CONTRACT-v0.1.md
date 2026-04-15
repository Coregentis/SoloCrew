# SOLOCREW Delivery Return Contract v0.1

## Purpose

This contract freezes the minimum `Delivery Return` object for `v0.4-multi-cell-foundation`.

`Delivery Return` is the bounded upward product object that a `Cell` may later emit when work reaches a review, delivery, or next-decision point.

## Current Purpose

Today `Delivery Return` exists to carry bounded delivery-facing truth such as:

- current delivery posture
- what is complete
- what remains blocked or deferred
- whether follow-up direction or approval is needed

## Minimum Contract Shape

The minimum contract should include:

- `delivery_return_id`
- `source_cell_ref`
- `source_summary_ref`
- `delivery_headline`
- `delivery_status`
- `completed_signal`
- `blocked_or_deferred_signal`
- `requested_next_step`
- `continuity_note`
- `returned_at`

## Authority Boundary

`Delivery Return` is:

- a SoloCrew cell-to-management product return object
- a bounded summary of delivery posture

`Delivery Return` is not:

- a full workflow timeline
- a runtime event transcript
- a provider execution report
- a protocol-level delivery envelope

The object may summarize delivery posture upward.
It may not pretend to be a full persisted execution history.

## Current Owning Layer

Today this object is owned by:

- SoloCrew product layer

It remains product-owned while it stays a bounded management-facing product return surface.

## Explicit Deferrals

This contract explicitly defers:

- automated acceptance routing
- broad delivery analytics
- provider-backed completion verification
- channel-routed delivery handoff
- runtime-complete delivery state
- protocol promotion

## Later Upstream Blocker Trigger

`Delivery Return` becomes a legitimate later `Cognitive_OS` blocker-intake candidate only if SoloCrew proves it needs:

- durable runtime-backed delivery-return state
- reusable runtime-level delivery semantics across many `Cell`s
- a return surface that can no longer stay truthful as downstream product projection

This contract does not promote that blocker by itself.

## Contract Rule

If a future `Delivery Return` field mainly exists to simulate a full execution log, broad approval engine, or enterprise analytics posture, it does not belong in the minimum `v0.4` contract by default.
