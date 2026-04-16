# SOLOCREW v0.5 Reopening Rules v0.1

## Purpose

This document defines what counts as a lawful reopening of the paused
`v0.5-portfolio-secretary-beta` line.

Its job is to stop silent feature accumulation and make reopening conditions
explicit before the current beta lane grows again.

## Current Starting Point

The current starting point is:

- Wave 1 through Wave 4 implemented
- bounded non-executing beta lane accepted
- feature expansion paused
- reopening required before any next `v0.5` wave

## Lawful Reopening Triggers

The current line may reopen only when at least one explicit trigger exists and
that trigger is named in governance and implementation framing before code work
begins.

Lawful reopening triggers are:

- explicit approved new scope for one bounded wave
- explicit identified blocker that requires a bounded fix or bounded forward
  move
- explicit cross-repo dependency reason tied to current `Cognitive_OS` or MPLP
  boundary conditions
- explicit new gate requirement that the current paused line does not yet
  satisfy

## Invalid Reopening Reasons

The following are not valid reasons to reopen the line:

- convenience
- "it would be nice"
- repeated downstream usage by itself
- accidental UI pressure
- vague desire to add approve, reject, dispatch, or execute behavior
- local naming dissatisfaction without bounded correctness impact
- implied momentum from already having a Secretary beta shell

## Required Reopening Preconditions

Before any reopening is considered valid, the following must be completed
explicitly for the proposed next step:

- local SoloCrew regression against the current paused line
- adjacent `Cognitive_OS` regression for relevant runtime-private assumptions
- MPLP third-leg regression whenever the proposed semantics could be over-read
  as protocol pressure or protocol promotion
- explicit statement of what remains out of scope for the next wave
- explicit statement that direct-control behavior is still absent unless a
  separate scope/governance action says otherwise

## Required Reopening Questions

Any reopening proposal must answer:

- what exact bounded wave is being reopened
- what problem is being solved now
- why the change belongs in SoloCrew rather than upstream
- what cross-repo assumptions it depends on
- what tests and gates must pass before the reopened wave can be accepted
- whether the proposal risks over-reading packet posture as workflow authority

## Reopening Failure Conditions

Reopening must be rejected if the proposal:

- silently widens the current beta lane
- treats current packet states as runtime authority
- implies direct approve, reject, dispatch, or execute behavior without a
  separate explicit scope/governance action
- implies provider or channel execution by convenience
- makes SoloCrew sound like owner of runtime-private truth
- makes downstream product surfaces sound like MPLP law

## Direct-Control Boundary Rule

The paused state must not be used to smuggle in direct-control behavior by
relabeling it as review, posture, handoff, or packet polish.

That means reopening does not automatically authorize:

- direct approve control
- direct reject control
- direct dispatch control
- direct execute control
- workflow-engine behavior
- runtime-authoritative state transitions

Any such move would require a separate explicit governance decision rather than
an ordinary reopening request.

## Net Reopening Rule

The correct reopening rule is:

- no reopening by default
- no reopening by convenience
- reopening only by named bounded scope plus explicit regression and gate work
- keep `MPLP -> Cognitive_OS -> SoloCrew` authority order intact before,
  during, and after any future reopening
