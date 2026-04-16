# SOLOCREW v0.5 Portfolio Secretary Beta Scope v0.1

## Purpose

This document freezes `v0.5-portfolio-secretary-beta` as the next planned line after the governed `v0.4-multi-cell-foundation` line.

`v0.5` is a scope-freeze and governance line first.
It is not yet an implementation claim.

## Why v0.5 Starts Now

The current three-repo line is now sufficiently closed:

- SoloCrew `v0.1` through `v0.4` boundaries are governed
- `Cognitive_OS` `v0.4` runtime-private workforce line is governed
- current SoloCrew <-> `Cognitive_OS` integration is validated
- MPLP remains frozen core plus candidate-only governance

So the next correct move is to freeze what `portfolio-secretary-beta` means before any implementation begins.

## v0.5 Goal

The goal of `v0.5-portfolio-secretary-beta` is to introduce the first bounded top-level portfolio and Secretary beta layer over the already governed `v0.4` multi-cell foundation.

`v0.5` is where SoloCrew may first add:

- a top-level portfolio / Secretary beta surface
- bounded management of multiple `Cell`s as `Cell`s
- bounded Secretary-to-cell coordination semantics
- the first beta-level management interface beyond read-only inspection

## Must Be Included

`v0.5-portfolio-secretary-beta` must include:

- one bounded top-level portfolio entry surface
- one bounded Secretary beta view that stays distinct from per-cell views
- cell list, selection, queue, and status-shelf semantics at product level
- bounded Secretary visibility into:
  - cell summary posture
  - queue or review posture
  - bounded management object visibility
- one bounded Secretary-to-cell handoff contract for product intent and inspection context
- explicit statements of:
  - what SoloCrew may initiate at product level
  - what still remains downstream handoff only
  - what still remains owned by `Cognitive_OS`
  - what remains outside MPLP law

## First Lawful Beta Shape

The lawful `v0.5` beta shape is intentionally bounded:

- the Secretary may see a portfolio-level product projection of multiple cells
- the Secretary may initiate bounded management or review posture changes in product space
- the Secretary may hand off bounded context into a selected cell
- the Secretary does not become runtime authority
- the Secretary does not become protocol authority
- the portfolio layer remains beta-level and bounded, not a full operating platform

## Beyond v0.4

`v0.5` goes beyond `v0.4-multi-cell-foundation` by adding:

- a top-level portfolio / Secretary beta interface rather than read/inspect-only multi-cell surfaces
- bounded portfolio-level management posture rather than only coexistence and inspection posture
- bounded Secretary-to-cell coordination semantics rather than only cell-local inspection surfaces
- the first product-level management interface that may initiate bounded handoff rather than only display product projections

## Upstream Assumptions Required

`v0.5` assumes but does not own:

- `Cognitive_OS` remains the mother-runtime provider of runtime-private truth
- current runtime-private workforce family remains bounded and non-protocol
- current normalized management-family shape remains available as bounded upstream input
- MPLP remains frozen core plus candidate-only governance and does not adopt SoloCrew product semantics by convenience

If future `v0.5` implementation needs stronger runtime guarantees than the current upstream line provides, that need must be raised through `Cognitive_OS`, not silently claimed inside SoloCrew.

## Explicit Non-Claims

`v0.5-portfolio-secretary-beta` explicitly does not claim:

- full portfolio runtime
- enterprise, team, or multi-tenant product behavior
- full workflow engine behavior
- provider or channel execution breadth
- broad KPI cockpit behavior
- full autonomous company operation
- runtime authority ownership inside SoloCrew
- protocol promotion
- `v1.0` platform completion

## Cross-Repo Boundary Rule

The governing order remains:

`MPLP Protocol -> Cognitive_OS -> SoloCrew`

That means:

- SoloCrew remains the product layer
- `Cognitive_OS` remains the mother-runtime provider of runtime-private truth
- MPLP remains frozen protocol core plus candidate-only governance
- `v0.5` may not use beta-level product convenience to imply runtime or protocol promotion

## Scope Judgment Rule

If a proposed `v0.5` implementation mainly serves:

- enterprise permissions
- multi-tenant runtime
- broad provider or channel execution
- generalized workflow automation
- broad KPI cockpit behavior
- autonomous company operation
- protocol-law promotion

then it is not a valid `v0.5` change by default.

If a proposed `v0.5` implementation makes the first bounded Secretary and portfolio beta layer real while preserving product/runtime/protocol ownership boundaries, it fits this scope.
