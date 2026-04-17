# SOLOCREW v0.5 Reopening Decision Audit v0.1

## Purpose

This audit decides whether the current paused
`v0.5-portfolio-secretary-beta` line may now reopen from the accepted Wave 1
through Wave 4 baseline.

This is a reopening decision only.
It does not implement Wave 5.
It does not widen the current beta lane by convenience.

## Starting Point

Current SoloCrew truth before this decision:

- Wave 1 through Wave 4 implemented
- bounded non-executing beta lane accepted
- paused for feature expansion
- reopening required before any next `v0.5` wave

Current cross-repo truth now also includes:

- `Cognitive_OS` Phase 4 formally sealed on remote `main`
- bounded MPLP `Confirm` / `Trace` export present upstream
- lawful upstream `Context` / `Plan` omission explicitly recorded
- upstream non-adoption of SoloCrew packet states explicitly recorded
- MPLP still candidate-only / non-promoted

## Reopening Decision

`REOPENING_APPROVED_WITH_LIMITS`

## Why Reopening Is Now Lawful

Reopening is now lawful because the prior reopening blocker has been resolved.

That blocker was:

- upstream engineering truth had advanced, but formal upstream closure had not
  yet been sealed on remote `main`

That condition is now satisfied.

The current upstream line is explicit enough to support one further bounded
SoloCrew wave because:

- the mother-runtime baseline is now formally closed as a bounded minimal loop
- bounded protocol-facing `Confirm` / `Trace` reconstruction/export exists
- unsupported `Context` / `Plan` export is explicitly omitted rather than
  hidden
- upstream still clearly refuses to treat SoloCrew packet states as workflow
  authority
- MPLP still clearly refuses silent promotion from downstream usage

## Why Reopening Is Still Limited

Reopening is limited because the highest remaining risk has not disappeared.

That risk is:

- downstream packet-state posture could still be over-read as workflow
  authority if the next wave moves from explanation into control

So reopening is approved only for a smallest lawful next wave that remains:

- downstream
- product-projected
- non-executing
- explanation-first rather than control-first

## Current Boundary Risk

The current packet-state posture still carries workflow-authority over-read risk.

That includes:

- `draft`
- `staged`
- `ready_for_cell_review`
- `returned_for_revision`

These remain acceptable only because:

- they are currently bounded SoloCrew product posture
- current surfaces remain non-executing
- current upstream explicitly does not adopt them as workflow truth

## What Reopening Must Not Do

Even after reopening, the next wave must not introduce:

- direct approve control
- direct reject control
- direct dispatch control
- direct execute control
- provider/channel execution
- workflow-engine semantics
- runtime authority ownership
- protocol authority ownership
- imitation of an upstream workflow-state family that does not exist

## Smallest Lawful Next-Wave Direction

The smallest lawful next-wave direction is:

- rationale / evidence visibility hardening across the existing portfolio shell,
  handoff staging, and handoff review packet lane

Why this is the safest next move:

- it uses upstream readiness without overstating it
- it can consume bounded `Confirm` / `Trace` evidence posture without
  requiring canonical `Context` / `Plan`
- it improves legibility instead of smuggling in direct-control semantics
- it remains clearly downstream and explanatory

## Net Audit Judgment

The correct current reading is:

- SoloCrew may now reopen from the paused `v0.5` line
- that reopening is approved only with explicit limits
- the next wave must remain non-executing and downstream-only
- the reopened line must not be treated as authorization for direct-control or
  workflow-engine semantics
