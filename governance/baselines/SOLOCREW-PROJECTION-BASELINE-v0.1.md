# SOLOCREW-PROJECTION-BASELINE-v0.1

## SoloCrew Product Identity

SoloCrew is the downstream product expression of a one-person-company AI team.

The product promise is:

- a persistent crew rather than a single chat bot
- work organized around objectives rather than isolated prompts
- a return-and-continue experience rather than daily reset
- a bounded old-employee feel rather than raw context accumulation

## Wow Moment Hierarchy

1. Main wow
   - the user opens SoloCrew and sees a crew already organized around work
2. Second wow
   - the user returns later and the same crew state still exists
3. Third wow
   - a correction changes later behavior in a visible, bounded way

## Product Class

SoloCrew is:

- a product repo
- a projection and app packaging surface
- a downstream consumer of mother-runtime truth

SoloCrew is not:

- a protocol repo
- a mother-runtime repo
- the place where runtime constitutional law is authored

## Projection Boundary

Projection in SoloCrew is allowed to:

- rename neutral upstream workforce objects into product-facing nouns
- compose read models over upstream runtime records
- aggregate bounded runtime signals into product objects
- define user-visible flows over those product objects

Projection in SoloCrew is not allowed to:

- redefine upstream schemas as if SoloCrew were authoritative
- invent provider execution behavior and call it runtime truth
- backwrite product workflow state into `Cognitive_OS`

## Why SoloCrew Does Not Write Back Runtime Law

The authority chain remains:

`MPLP Protocol -> Cognitive_OS -> SoloCrew`

That means:

- MPLP owns protocol constitution
- `Cognitive_OS` owns mother-runtime truth
- SoloCrew owns product projection and app packaging only

If SoloCrew were to define runtime law upstream, it would collapse runtime, projection, and app into one layer and destroy reuse discipline.

## First Projection Object Family

The first SoloCrew projection object family is:

- `crew`
- `crew-member`
- `objective`
- `work-item`
- `memory-summary`
- `review-strip`
- `budget-snapshot`
- `channel-thread`
  - reserved until upstream channel runtime and downstream channel implementation are opened

Current implementation intent for `v0.1-baseline`:

- implement contract-first skeletons for `crew`, `crew-member`, `objective`, `work-item`, `memory-summary`, `review-strip`, and `budget-snapshot`
- freeze `channel-thread` as reserved
- keep all objects mapped back to real upstream source surfaces or explicit deferred absence
