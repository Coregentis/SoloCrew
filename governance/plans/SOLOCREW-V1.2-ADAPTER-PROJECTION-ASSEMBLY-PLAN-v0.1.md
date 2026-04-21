# SoloCrew V1.2 Adapter Projection Assembly Plan v0.1

`doc_id: SOLOCREW-V1.2-ADAPTER-PROJECTION-ASSEMBLY-PLAN-v0.1`

## A. Purpose

This document plans future adapter and projection assembly changes for V1.2
packet revision consumption.

## B. Candidate Future Files

| Future file / existing file | Planned role | Implementation status |
|---|---|---|
| existing `projection/adapters/founder-request-intake-to-packet-adapter.ts` | baseline packet candidate mapping | already implemented |
| existing `projection/assembly/founder-request-intake-to-packet-flow.ts` | baseline packet flow result | already implemented |
| potential `projection/adapters/packet-revision-adapter.ts` | consume neutral revision envelope and map to product revision candidate | planned only |
| potential `projection/assembly/packet-revision-flow.ts` | orchestrate packet revision flow state | planned only |
| potential page model update | expose revision-specific fields to pages | planned only |
| potential tests | assert boundary-safe consumption of upstream revision surfaces | planned only |

## C. Planned Data Flow

V1.1 packet candidate output  
+ evidence insufficiency detail  
+ revision input summary  
-> packet revision adapter  
-> projection revision envelope  
-> revised packet candidate / page model

## D. Boundary

- adapter does not execute provider/channel
- adapter does not approve/reject/dispatch/execute
- adapter does not create founder queue
- adapter consumes projection-safe summaries only
- adapter does not import runtime-private internals

## E. Decision

`SOLOCREW_V1_2_ADAPTER_PROJECTION_ASSEMBLY_PLAN_READY`
