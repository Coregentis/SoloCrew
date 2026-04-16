# SOLOCREW Cross-Repo Consumption And Non-Promotion v0.1

## Purpose

This document freezes the current cross-repo boundary for SoloCrew after `v0.4` hardening.

It clarifies:

- what SoloCrew consumes from `Cognitive_OS`
- what remains `Cognitive_OS`-private runtime truth
- what remains only MPLP candidate material
- what SoloCrew must not promote upward by usage alone

## Authority Order

SoloCrew remains downstream of:

`MPLP Protocol -> Cognitive_OS -> SoloCrew`

This order is not advisory.
It is the governing boundary for the current repo.

## 1. What SoloCrew Currently Consumes From `Cognitive_OS`

SoloCrew currently consumes bounded upstream truth in runtime-private form, including:

- runtime-private workforce/runtime records surfaced through `runtime-imports/`
- bounded runtime-backed cell scope and cell summary inputs
- bounded runtime-backed management-object-family inputs
- bounded persistence/session/runtime entry surfaces already frozen in earlier lines

Current `v0.4` consumption examples include:

- `cell-runtime-scope`
- `cell-summary-runtime-record`
- `management-directive-record`
- `delivery-return-record`
- `approval-request-record`

SoloCrew consumes these as:

- downstream inputs only
- adapted inputs only
- product-projection inputs only

It does not consume them as license to redefine upstream runtime authority.

## 2. What Remains `Cognitive_OS`-Private Runtime Truth

The following remain `Cognitive_OS`-private runtime truth even when SoloCrew reads them:

- runtime-private object identity
- authority classification
- layer classification
- registry and binding/export classification
- runtime-side policy and persistence semantics
- runtime-private machine-readable schema truth

SoloCrew may project over this truth.
SoloCrew may not claim ownership of it.

## 3. What Remains Only MPLP Candidate-Backlog Material

The following categories may be pressured by downstream usage but remain candidate-only unless MPLP separately promotes them:

- delegation-envelope-like abstractions
- delivery/acceptance-envelope-like abstractions
- constraint/stop-condition/escalation-envelope-like abstractions

Using bounded product concepts that resemble those families inside SoloCrew does not imply MPLP adoption.

## 4. What Is Explicitly Not Promoted Into MPLP Law

The following are not MPLP law because SoloCrew uses or documents them:

- `Cell`
- multi-cell coexistence surfaces
- cell summary projections
- management directive product contracts
- delivery return product contracts
- approval request product contracts
- runtime-backed management projection taxonomy
- product inspection DTOs

These may remain:

- SoloCrew product semantics
- `Cognitive_OS` runtime-private semantics
- MPLP candidate-backlog material

without becoming protocol law.

## Non-Promotion Rule

The following statements are required and true:

- SoloCrew does not define runtime law
- SoloCrew does not define protocol law
- repeated use of an abstraction in SoloCrew does not promote it upward by volume alone
- downstream convenience is not promotion evidence

Promotion would require separate upstream judgment in the correct repository.

## Current Practical Classification

| Category | Current Location Of Truth | SoloCrew Role |
| --- | --- | --- |
| product inspection surfaces | SoloCrew | author and freeze bounded product-projection semantics |
| runtime-private workforce/runtime records | `Cognitive_OS` | consume as bounded upstream inputs |
| protocol-envelope candidates | MPLP candidate backlog only | do not promote; at most reference as candidate pressure |
| compile-only management directives | SoloCrew product constitutional/management layer | keep distinct from runtime-backed inspection projections |
| runtime-backed management projection family | SoloCrew downstream projection taxonomy | keep explicitly downstream and non-executable |

## Continuation Rule

If a future SoloCrew change requires:

- new runtime ownership claims
- new protocol-law claims
- cross-repo semantic promotion by implication

then that change must pause and be reclassified before continuing.
