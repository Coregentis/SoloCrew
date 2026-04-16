# SOLOCREW Portfolio Management Contract v0.1

## Purpose

This document freezes the minimum product contract for portfolio-level management in `v0.5-portfolio-secretary-beta`.

It exists to define what the portfolio layer may mean without claiming runtime authority ownership.

## Contract Goal

The portfolio-management contract must support:

- cell list and selection semantics
- portfolio-level state summary semantics
- bounded management object visibility
- bounded queue, review, and approval posture semantics

## Cell List And Selection Semantics

At minimum, portfolio management may:

- list multiple cells as cells
- expose one selected cell at a time
- show bounded state differences across cells
- move between portfolio summary posture and selected-cell posture

This contract does not imply that portfolio selection changes runtime authority.

## Portfolio-Level State Summary Semantics

The portfolio layer may summarize:

- total cells visible
- bounded readiness or blocked posture
- bounded queue or review posture
- bounded management object visibility posture
- deferred or unavailable surfaces

These summaries are product-level summaries only.
They are not runtime-complete orchestration truth.

## Bounded Management Object Visibility

Portfolio-level management may expose:

- whether a cell currently has visible management directives
- whether a cell currently has visible delivery return posture
- whether a cell currently has visible approval or escalation posture

This visibility remains:

- non-executable by default
- product-projected
- downstream of runtime-private truth

## Queue / Review / Approval Posture Semantics

Portfolio management may carry bounded posture semantics such as:

- waiting for review
- waiting for cell follow-up
- blocked attention
- ready for bounded handoff

These are posture semantics, not workflow-engine semantics.

## Authority Boundary

Portfolio management in SoloCrew:

- is product-facing only
- may consume bounded upstream truth
- may not claim runtime authority ownership
- may not claim protocol authority ownership

## Deferred Beyond This Contract

This contract does not include:

- full dispatch engine behavior
- approval workflow execution
- enterprise organization controls
- multi-tenant runtime semantics
- broad KPI cockpit behavior
- provider/channel execution control

## Contract Rule

If a proposed portfolio-management feature mainly acts like:

- runtime orchestration
- enterprise operations administration
- direct execution routing
- full approval-engine behavior

then it exceeds this contract.

If it gives the Secretary beta layer a bounded product contract for seeing and managing multiple cells as cells, it fits this contract.
