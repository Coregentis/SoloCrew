# SOLOCREW-EXCEPTION-PLANE-PREPARATION-AUDIT-v0.1

## A. Purpose

This document evaluates whether SoloCrew may begin exception-plane projection
preparation after `Cognitive_OS` first-pass closure.

It is a preparation audit only.
It is not implementation.
It does not authorize exception-plane behavior.
It does not authorize direct control.
It does not authorize provider or channel behavior.

## B. Upstream Readiness Basis

Current upstream readiness basis from `Cognitive_OS` is:

- `READY_FOR_SOLOCREW_EXCEPTION_PLANE_PREPARATION`

That upstream readiness means:

- SoloCrew may begin a downstream preparation audit for exception-plane
  projection
- SoloCrew may identify candidate projection inputs from current runtime outputs
- SoloCrew may begin later projection contract drafting

That upstream readiness does not mean:

- SoloCrew may consume raw runtime internals directly
- SoloCrew may treat runtime-private types as product DTOs
- SoloCrew may implement direct control
- SoloCrew may claim operational closure

## C. Current SoloCrew State

Current SoloCrew repo truth remains:

- `v1.0-solo-operator-platform delivered and closed`
- current `v0.5` line remains `v0.5-portfolio-secretary-beta`
- current lane remains downstream, product-projected, non-executing, and below
  direct-control semantics

Current SoloCrew also remains explicitly below:

- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime authority
- no protocol authority

Current repo/platform `v1.0` therefore remains lawful without being read as:

- exception-plane implementation
- direct-control readiness
- Operational V1.0 completion

## D. Exception-Plane Preparation Target

For this repo, `exception-plane preparation` means only:

- projection readiness
- candidate upstream input family mapping
- field-boundary identification
- omission and insufficiency boundary preparation
- later audit and contract setup

It is not implementation.
It is not direct control.
It is not execution.
It is not provider integration.
It is not operational closure.

## E. Current Reusable SoloCrew Assets

The current repo already has reusable downstream assets that may later support
exception-plane preparation:

- Secretary beta shell
  - top-level portfolio / Secretary shell is present and test-backed
- handoff staging surface
  - bounded Secretary-to-cell staging posture is present and test-backed
- handoff review packet surface
  - review-only packet framing is present and test-backed
- rationale / evidence / provenance visibility
  - current `v0.5` line already explains rationale, evidence, provenance, and
    omission posture
- revision / return state consistency
  - packet-state and revision-return wording are already shared across shell,
    staging, and review packet surfaces
- portfolio status / queue / review / posture shelves
  - current Secretary shell already has bounded status, queue, review, and
    posture shelves
- existing contracts / adapters / projection objects
  - runtime-consumption, projection DTO, handoff, management-interface, and
    product-projection contracts already exist

Current reusable test-backed surfaces include:

- `tests/projection/portfolio-secretary-shell.test.ts`
- `tests/projection/secretary-handoff-staging.test.ts`
- `tests/projection/secretary-handoff-review-packet.test.ts`

These assets are useful because they already preserve:

- product-projection-only posture
- non-executing framing
- packet-state visibility
- rationale / evidence / provenance visibility
- explicit non-claims against direct control

## F. Gaps Before Implementation

The current repo still has clear gaps before any actual exception-plane
implementation would be lawful:

- no CGOS projection consumption contract specialized for exception-plane work
- no exception state machine contract
- no projection-safe field subset
- no omission semantics for future exception summaries
- no confidence / insufficiency semantics for future exception summaries
- no evidence summary contract
- no founder-facing review queue contract
- no approve/reject/dispatch/execute authorization boundary
- no real business-loop selection

The current repo also still lacks:

- final candidate-input-to-product-label mapping
- forbidden label rules for user-facing exception terminology
- stale-state/update behavior rules for runtime-derived exception projections
- downstream test gates for future exception-plane contracts

## G. Readiness Decision

Selected readiness value:

- `READY_FOR_EXCEPTION_PLANE_CONTRACT_DRAFTING`

Why this is the correct read:

- upstream `Cognitive_OS` has already frozen
  `READY_FOR_SOLOCREW_EXCEPTION_PLANE_PREPARATION`
- SoloCrew already has bounded Secretary shell, handoff staging, handoff review
  packet, rationale/evidence/provenance visibility, and revision/return
  consistency assets
- SoloCrew already has product-projection contracts and non-promotion rules
- the next lawful blocker is contract definition, not new UI or behavior

Why this is not a stronger readiness claim:

- it does not authorize implementation
- it does not authorize direct approve/reject/dispatch/execute
- it does not authorize provider/channel execution
- it does not authorize runtime-private direct dependency

## H. Next Wave Recommendation

Recommended next wave:

- `SoloCrew projection contract draft`

Reason:

- the current upstream and downstream baselines now support contract drafting
  for candidate input families, omission semantics, evidence posture, and
  forbidden dependency rules
- a state-machine or business-loop wave would be premature before the projection
  contract is frozen
