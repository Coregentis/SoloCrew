# SOLOCREW v0.5 Implementation Plan v0.1

## Purpose

This document translates the frozen `v0.5-portfolio-secretary-beta` scope into a bounded implementation sequence.

It is an implementation-planning document only.
It does not authorize implementation by itself.

## Governing Principle

`v0.5` implementation must follow this principle:

`visible management beta without direct control semantics`

That means `v0.5` may make Secretary and portfolio posture visible, selectable, stageable, and handoff-capable in product space without becoming:

- a direct approval surface
- a direct rejection surface
- a direct dispatch surface
- a direct execution surface
- a runtime owner
- a protocol owner

## Intended End Condition

The intended end condition of `v0.5-portfolio-secretary-beta` is:

- one bounded top-level Secretary and portfolio beta surface
- bounded portfolio-level visibility over multiple cells as cells
- bounded queue, review, and management posture visibility
- bounded Secretary-to-cell handoff creation and staging in product space
- bounded reuse of current `v0.4` overview, detail, management, and continuity lanes
- explicit product/runtime/protocol boundary coverage in tests

## Non-Goal End Condition

Even when `v0.5` is complete, it must still not become:

- a direct approve or reject control surface
- a direct dispatch control surface
- a direct execute or provider/channel control surface
- a workflow engine
- a runtime authority owner
- a protocol-promotion line
- a `v1.0` platform in disguise

## Implementation Discipline

`v0.5` should be implemented by extending the current `v0.4` foundation rather than replacing it.

Required discipline:

- reuse current `app/pages/`, `app/shell/`, `projection/contracts/`, `projection/assembly/`, and `projection/adapters/` lanes
- preserve the current `runtime-private -> adapter -> product projection -> shell/page` boundary
- keep Secretary beta handoff-first and posture-first in every wave
- keep each wave bounded enough to audit before the next wave starts

## Recommended Implementation Order

### Wave 1: Secretary Entry And Navigation Baseline

Focus:

- establish the top-level Secretary and portfolio beta shell
- define bounded navigation between portfolio view and existing cell-facing views
- keep the first wave visibly above `v0.4` without adding direct control semantics

### Wave 2: Portfolio Posture And Queue Projection

Focus:

- add bounded portfolio-level posture summaries over existing cell, management, and continuity truth
- render queue/review/management posture as product meaning only
- keep those projections explicitly non-executing

### Wave 3: Secretary-To-Cell Handoff Staging

Focus:

- add bounded product-level handoff creation and staging over selected cells
- package intent, review posture, and management posture into a downstream handoff surface
- keep handoff distinct from approval, dispatch, or runtime mutation

### Wave 4: Beta Consistency And Boundary Hardening

Focus:

- align Secretary, portfolio, detail, management, and continuity lanes into one bounded beta story
- harden tests, wording, labels, and non-claims
- close any drift that could make `v0.5` sound direct-control-first

## Recommended Wave Rule

Each wave should:

- introduce one coherent increment of visible management beta
- preserve non-executing posture semantics
- preserve explicit upstream dependency assumptions
- end with passing tests and a bounded audit/gate check before the next wave starts

## Continuation Rule

If a planned `v0.5` task requires:

- direct approve or reject execution
- direct dispatch execution
- direct provider or channel execution
- runtime-private mutation ownership inside SoloCrew
- protocol-like promotion claims

then the task does not fit this plan by default and must pause for reclassification.
