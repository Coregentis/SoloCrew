# SoloCrew V1.2 Product Scope Draft v0.1

`doc_id: SOLOCREW-V1.2-PRODUCT-SCOPE-DRAFT-v0.1`

## A. Purpose

This document defines the initial product scope for SoloCrew V1.2.

This wave is:

- planning only
- no implementation
- no release/seal
- no new tag
- no Cognitive_OS change
- no MPLP change

## B. V1.1 Baseline

SoloCrew V1.1 RC is a bounded, non-executing founder request-to-packet review
loop.

## C. V1.2 Product Question

What is the next user-visible capability that makes SoloCrew feel more useful
without prematurely crossing into provider/channel execution,
approve/reject/dispatch/execute, or founder queue behavior?

## D. Candidate Product Directions

| Candidate | User value | Required upstream abstraction? | Risk | V1.2 fit |
|---|---|---|---|---|
| richer request intake clarification | helps founders disambiguate intent earlier | maybe, if clarification posture should become generic upstream input | low | strong |
| multi-packet comparison / option set | lets founders compare alternatives before acting | likely yes, for generic option-set projection summary | medium | moderate |
| packet revision loop | lets founders revise after insufficiency/stale feedback without restarting | likely yes, for generic revision envelope and insufficiency detail | medium | strongest |
| lightweight founder memory / preference carryover | reduces repetitive setup and improves continuity | likely yes, for bounded preference summary | medium | strong |
| smoke-demo scenario runner | improves demos and onboarding | probably not required upstream | low | useful but secondary |
| review-to-next-step planning without execution | makes the product feel clearer after review posture is reached | likely yes, for generic non-executing next-step posture | medium | strong |
| bounded workspace / project context summary | gives founders more context around the current packet candidate | maybe, for generic workspace context summary later | low | moderate |

## E. Recommended V1.2 Direction

Primary direction:

- packet revision loop

Secondary direction:

- richer request intake clarification

Why:

- V1.1 already exposes insufficiency, stale posture, blocked-by-contract
  fallback, and non-executing recommendation
- the most natural next user-visible gain is to let a founder revise safely
  instead of restarting from zero
- richer clarification pairs well with revision because it helps reduce
  ambiguity before and after packet generation

## F. Explicit Non-Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no external business action execution
- no autonomous company operation
- no protocol certification
- no Cognitive_OS runtime-private dependency
- no MPLP schema/protocol change

## G. Decision

`SOLOCREW_V1_2_PRODUCT_SCOPE_DRAFT_READY`
