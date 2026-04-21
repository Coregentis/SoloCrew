# SoloCrew V1.1 Post-RC Product Hardening Plan v0.1

`doc_id: SOLOCREW-V1.1-POST-RC-PRODUCT-HARDENING-PLAN-v0.1`

## A. Purpose

This plan defines what product hardening is allowed after the SoloCrew V1.1 RC
release.

## B. Allowed Hardening

- README alignment
- walkthrough / known limitations
- smoke validation
- copy hardening
- test assertions for no overclaim
- demo scenario fixture clarity
- release surface consistency check

## C. Disallowed Hardening

- no new execution capability
- no provider/channel
- no approve/reject/dispatch/execute
- no founder queue
- no Cognitive_OS change
- no MPLP change
- no schema change
- no new tag/release in this wave

## D. Hardening Acceptance Criteria

| Criterion | Required evidence |
|---|---|
| npm test passes | `npm test` returns passing suite |
| readability gate passes | direct node run and npm alias pass |
| forbidden boundary grep passes | grep remains negative-boundary / exclusion / risk / test-only |
| README does not overclaim | README V1.1 RC section remains bounded and non-executing |
| no app/projection source change unless explicitly justified | changed files remain docs/governance only in this wave |
| no release surface drift | tag, prerelease, seal record, and release notes remain aligned |

## E. Decision

`SOLOCREW_V1_1_POST_RC_PRODUCT_HARDENING_PLAN_READY`
