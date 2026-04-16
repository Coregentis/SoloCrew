# SOLOCREW v0.5 Upstream Dependency Map v0.1

## Purpose

This document maps each planned `v0.5` wave to the upstream `Cognitive_OS` truth it depends on.

It exists to keep SoloCrew product-first in implementation sequence while remaining authority-correct in dependency handling.

## Stable Upstream Assumptions

The current `v0.5` plan assumes the following bounded upstream truth remains available and stable enough to consume:

- `cell-runtime-scope`
- `cell-summary-runtime-record`
- `management-directive-record`
- `delivery-return-record`
- `approval-request-record`
- shared `objective_id` linkage for the management-family trio
- required `management_record_kind` for the management-family trio

SoloCrew consumes these as:

- runtime-private inputs only
- adapted inputs only
- product-projection inputs only

## Local Consumption Boundary

SoloCrew may interpret upstream records into:

- portfolio posture
- queue or review posture
- handoff staging context
- management visibility

SoloCrew must not interpret upstream absence as license to invent:

- runtime queue law
- approval engine law
- dispatch engine law
- provider execution authority
- protocol authority

## Wave Dependency Map

| Wave | Required Upstream Inputs | SoloCrew Interpretation | Pause Condition |
| --- | --- | --- | --- |
| Wave 1: Secretary Entry And Navigation Baseline | `cell-runtime-scope`, `cell-summary-runtime-record` | product-level cell listing, route selection, and Secretary entry posture | if stable cell identity or summary routing context is absent |
| Wave 2: Portfolio Posture And Queue Projection | cell scope, cell summary, management-family trio | bounded queue/review/management posture visibility over multiple cells | if posture needs new runtime-owned lifecycle truth not present upstream |
| Wave 3: Secretary-To-Cell Handoff Staging | cell scope, cell summary, management-family trio, shared `objective_id`, `management_record_kind` | bounded handoff packaging and staging over selected cell context | if staging requires upstream mutation, dispatch ownership, or new runtime-private object creation |
| Wave 4: Beta Consistency And Boundary Hardening | existing upstream inputs only | consistency, wording, and hardening over already-consumed truth | if polish depends on new runtime semantics rather than product hardening |

## What Counts As An Upstream Blocker

The current plan must pause if `v0.5` work requires:

- stronger runtime-private queue identity than current upstream truth provides
- stronger approval or dispatch lifecycle truth than current upstream truth provides
- provider or channel execution state as if it were already runtime-backed
- new runtime-private management object creation owned by SoloCrew
- upstream schema or field assumptions not already present and validated

## What SoloCrew Must Not Locally Invent

If upstream truth is absent, SoloCrew must not locally invent:

- runtime queue identifiers as if they were authoritative
- runtime approval decisions
- runtime dispatch outcomes
- runtime-side provider execution state
- protocol-like delegation or acceptance law

## Consumption Rule

If a future `v0.5` wave needs stronger upstream truth than the current line provides, that need must be raised through `Cognitive_OS`.

It must not be smuggled into SoloCrew as local product convenience.
