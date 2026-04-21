# SoloCrew V1.2 Post-RC Product Hardening Plan v0.1

`doc_id: SOLOCREW-V1.2-POST-RC-PRODUCT-HARDENING-PLAN-v0.1`

## A. Purpose

Define what product hardening is allowed after V1.2 RC.

## B. Allowed Hardening

- README alignment
- walkthrough / known limitations
- smoke validation checklist
- demo scenario guide
- copy boundary checks
- release surface consistency checks
- targeted test maintenance
- future UX explanation improvements

## C. Disallowed Hardening

- no new execution capability
- no provider/channel
- no approve/reject/dispatch/execute
- no founder queue
- no Cognitive_OS change
- no MPLP change
- no schema change
- no new tag/release in this wave
- no GA/stable claim

## D. Acceptance Criteria

| Criterion | Required evidence |
|---|---|
| npm test passes | `npm test` returns a passing suite |
| targeted tests pass | adapter, flow, and page-model targeted test commands all pass |
| forbidden grep passes | grep remains negative-boundary / explicit exclusion / audit-risk / test-only |
| release surface still visible | V1.2 RC tag and GitHub prerelease remain visible |
| README does not overclaim | README V1.2 RC section remains bounded and non-executing |
| no app/projection source behavior change | changed files remain README / governance only unless an optional boundary-copy test is explicitly justified |
| no upstream change | no Cognitive_OS or MPLP files change |

## E. Decision

`SOLOCREW_V1_2_POST_RC_PRODUCT_HARDENING_PLAN_READY`
