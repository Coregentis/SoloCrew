# SoloCrew V1.2 Page Model UX Copy Plan v0.1

`doc_id: SOLOCREW-V1.2-PAGE-MODEL-UX-COPY-PLAN-v0.1`

## A. Purpose

This document plans how page model and UX copy should show packet revision
without overclaiming.

## B. Future User-Visible Fields

| Field | Source | User-facing label | Boundary note |
|---|---|---|---|
| previous packet candidate id | previous projection reference | previous packet candidate | not raw runtime access |
| revised packet candidate id | resulting projection reference | revised packet candidate | not execution completion |
| revision reason | revision envelope | revision reason | not approval/rejection |
| evidence gap category | evidence insufficiency detail | evidence gap category | not proof failure |
| stale context indicator | evidence insufficiency detail | stale context | not execution failure |
| safe clarification prompt | evidence insufficiency detail | clarification suggestion | not provider/channel send |
| revision status | revision envelope + product flow state | revision candidate status | non-executing only |
| non-executing boundary | existing and future page model boundary summary | review-only | not execution-ready |
| blocked-by-contract fallback | existing contract/fallback path | blocked by contract | not rejection |

## C. Copy Rules

- `revision candidate`, not `approved revision`
- `return for revision`, not `rejected`
- `evidence gap`, not `proof failure`
- `not sent`, not `dispatch blocked`
- `review-only`, not `execution ready`

## D. Page Candidates

- founder request intake page
- secretary handoff page
- secretary handoff review page
- potential revision review section

## E. Decision

`SOLOCREW_V1_2_PAGE_MODEL_UX_COPY_PLAN_READY`
