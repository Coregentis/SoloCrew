# SOLOCREW Approval Request Contract v0.1

## Purpose

This contract freezes the minimum `Approval Request` object for `v0.4-multi-cell-foundation`.

`Approval Request` is the bounded upward management object that a `Cell` may later emit when it needs a decision before continuing.

## Current Purpose

Today `Approval Request` exists to carry bounded decision-seeking truth such as:

- what needs approval
- why approval is needed now
- what is affected
- what happens if the decision is delayed

## Minimum Contract Shape

The minimum contract should include:

- `approval_request_id`
- `source_cell_ref`
- `scope_ref`
- `request_headline`
- `requested_decision`
- `reason_for_request`
- `delivery_impact`
- `delay_consequence_note`
- `urgency_signal`
- `requested_at`
- `status`

## Authority Boundary

`Approval Request` is:

- a SoloCrew cell-to-management product escalation object
- a bounded request for decision

`Approval Request` is not:

- an enterprise approval workflow engine
- a runtime-native escalation law
- a channel-based approval queue
- a protocol-level escalation envelope

The object may ask for a management decision.
It may not silently become a multi-step approval system or a runtime authority rewrite.

## Current Owning Layer

Today this object is owned by:

- SoloCrew product layer

It remains product-owned while it stays a bounded product escalation and approval contract.

## Explicit Deferrals

This contract explicitly defers:

- multi-step approval chains
- Secretary queue behavior
- provider-backed rerun or execution after approval
- channel-routed approval handoff
- enterprise governance workflow
- protocol promotion

## Later Upstream Blocker Trigger

`Approval Request` becomes a legitimate later `Cognitive_OS` blocker-intake candidate only if SoloCrew proves it needs:

- durable runtime-backed approval state
- reusable runtime escalation semantics across multiple `Cell`s
- approval coordination that can no longer stay truthful as downstream product contract only

This contract does not promote that blocker by itself.

## Contract Rule

If a future `Approval Request` field mainly exists to simulate a full approval engine, enterprise control plane, or runtime-native queue, it does not belong in the minimum `v0.4` contract by default.
