# SOLOCREW-MANAGEMENT-INTERFACE-BOUNDARY-v0.1

## Purpose

This document freezes the product boundary between the top-level `Secretary / Management Interface` layer and the `Cell Console` layer.

It is a product boundary document.
It does not introduce a broad management cockpit implementation.

## Boundary Position

The top-level management layer is a later structural expansion over one or more `Cell`s.

The `Cell Console` is the nearer-term working surface.

The management layer exists constitutionally now, but it must remain narrow until:

- single-cell truth is usable
- cross-cell product shape is justified
- runtime blockers, if any, are exposed honestly

## Management Interface May Do

The management layer may:

- issue or update a `Management Directive`
- select which `Cell` is currently in focus
- view a `Cell Summary Card`
- receive `Escalation / Approval Request` objects
- return a decision on approval requests
- receive a `Delivery Return`
- reorder priorities across `Cell`s once portfolio expansion opens

## Management Interface May Not Do

The management layer may not:

- masquerade as a broad KPI cockpit in the current wave
- directly micromanage runtime worker state below lawful product surfaces
- pretend it has stored event-timeline truth that the repo does not own
- bypass `Cell` constitutional boundaries by silently rewriting policy or delivery law
- act as if Secretary or portfolio management is already fully implemented

## Cell Console May Do

The `Cell Console` may:

- show the active crew state for one `Cell`
- show the current objective and work-item state
- surface blocked and active work truth
- surface memory, preference, and review continuity within current bounded truth
- accept bounded corrections and approvals relevant to the active `Cell`
- package a `Delivery Return` upward
- emit `Escalation / Approval Request` objects upward

## Cell Console May Not Do

The `Cell Console` may not:

- pretend to be a cross-cell management dashboard
- silently rewrite top-level management directives
- claim organization-wide portfolio control
- present fake metrics or cross-business reporting that does not exist

## Cross-Layer Objects

These objects are the lawful exchange objects between top-level management and a `Cell`.

### Management Directive

Top-down instruction about what the `Cell` should prioritize or deliver.

This object may include:

- priority
- delivery target
- approval posture
- constraint emphasis

It must not be confused with raw runtime task packets.

### Cell Summary Card

Management-facing summary of one `Cell`.

This object may include:

- `Cell` identity
- current objective headline
- delivery posture
- active vs blocked summary
- high-level continuity note

It is not a broad KPI cockpit.

### Escalation / Approval Request

Upward request from the `Cell` when current constraints require human approval or management intervention.

This object may include:

- reason for escalation
- affected objective or work
- requested decision
- urgency and consequence note

### Delivery Return

Upward return object from the `Cell` to management after work or a review cycle reaches a decision point.

This object may include:

- delivery status
- what was completed
- what remains blocked
- what requires approval or next directive

## Top-Level Non-Claim

The top-level management layer is not yet a broad KPI cockpit.

For the next structural waves it should be treated as:

- a directive surface
- a summary surface
- an approval surface

not as a giant analytics or enterprise command center.
