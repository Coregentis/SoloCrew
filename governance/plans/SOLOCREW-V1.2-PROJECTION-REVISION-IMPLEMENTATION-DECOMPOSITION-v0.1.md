# SoloCrew V1.2 Projection Revision Implementation Decomposition v0.1

`doc_id: SOLOCREW-V1.2-PROJECTION-REVISION-IMPLEMENTATION-DECOMPOSITION-v0.1`

## A. Purpose

This document plans the exact implementation decomposition for the SoloCrew
V1.2 packet revision loop.

This wave is:

- planning only
- no implementation in this wave
- no Cognitive_OS changes
- no MPLP changes
- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue

## B. Implementation Workstreams

| Workstream | Future files | Scope | Non-goals |
|---|---|---|---|
| packet revision contract surface | `projection/contracts/packet-revision-contract.ts` | define product-side packet revision candidate and evidence gap shapes over upstream-neutral revision surfaces | no runtime-private import, no approval semantics |
| packet revision adapter | `projection/adapters/packet-revision-adapter.ts` plus reuse of `projection/adapters/founder-request-intake-to-packet-adapter.ts` | map upstream revision envelope and evidence insufficiency detail into SoloCrew packet revision candidate output | no provider/channel execution, no queue behavior |
| packet revision flow assembly | `projection/assembly/packet-revision-flow.ts` plus reuse of `projection/assembly/founder-request-intake-to-packet-flow.ts` | assemble revision candidate, blocked fallback, and review-only posture | no dispatch, no execution, no founder queue |
| page model extension | `app/shell/create-v1-2-packet-revision-page-model.ts` | convert flow output into revision-safe page model labels and interpretation guards | no rendering logic beyond model preparation |
| page rendering integration | updates to `app/pages/founder-request-intake-page.ts`, `app/pages/secretary-handoff-page.ts`, and `app/pages/secretary-handoff-review-page.ts` | expose revision candidate, evidence gap, and clarification guidance in existing bounded surfaces | no new control semantics, no action buttons |
| projection tests | `tests/projection/packet-revision-adapter.test.ts` and `tests/projection/packet-revision-flow.test.ts` | prove mapping, blocked fallback, and boundary-safe copy behavior | no integration with upstream runtime-private internals |
| app/page tests | `tests/app/create-v1-2-packet-revision-page-model.test.ts` plus focused page rendering tests | prove interpretation guards, copy rules, and page visibility | no live workflow or provider execution claims |
| boundary grep / overclaim checks | existing repo grep discipline plus future targeted boundary assertions | verify wording stays below approval, execution, proof, and queue semantics | no new capability claim, no release action |

## C. Implementation Order

contracts first  
-> adapter  
-> flow  
-> page model  
-> page rendering  
-> tests  
-> hardening audit  
-> readiness gate

## D. Decision

`SOLOCREW_V1_2_PROJECTION_REVISION_IMPLEMENTATION_DECOMPOSITION_READY`
