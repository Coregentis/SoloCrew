# SoloCrew V1.1 Capability Inventory v0.1

`doc_id: SOLOCREW-V1.1-CAPABILITY-INVENTORY-v0.1`

`readability_status: audit_ready_multiline_markdown`
`readability_gate: scripts/governance/check-v1-1-governance-readability.mjs`

## A. Purpose

This document inventories what SoloCrew V1.1 now actually provides after the
founder-loop closure and app/page integration waves.

## B. Capability Table

| Capability | Implemented? | Source files | Tests | User-visible? | Execution boundary |
|---|---|---|---|---|---|
| founder request intake remains available | `YES` | `app/shell/founder-request-intake-contract.ts`, `app/shell/founder-request-intake.ts`, `app/pages/founder-request-intake-page.ts` | `tests/app/founder-request-intake-page.test.ts` | `YES` | non-executing intake only |
| projection-safe packet candidate generation | `YES` | `projection/adapters/founder-request-intake-to-packet-adapter.ts` | `tests/projection/founder-request-intake-to-packet-adapter.test.ts` | `INDIRECT` | non-executing adapter only |
| review/staging flow result | `YES` | `projection/assembly/founder-request-intake-to-packet-flow.ts` | `tests/projection/founder-request-intake-to-packet-flow.test.ts` | `INDIRECT` | non-executing flow only |
| page model generation | `YES` | `app/shell/create-v1-1-intake-to-packet-page-model.ts` | `tests/app/create-v1-1-intake-to-packet-page-model.test.ts` | `INDIRECT` | product-side deterministic model only |
| founder intake page packet candidate visibility | `YES` | `app/pages/founder-request-intake-page.ts` | `tests/app/founder-request-intake-page.test.ts` | `YES` | display-only, non-executing |
| handoff page staging visibility | `YES` | `app/pages/secretary-handoff-page.ts` | `tests/app/secretary-handoff-page.test.ts` | `YES` | display-only, non-executing |
| review page review visibility | `YES` | `app/pages/secretary-handoff-review-page.ts` | `tests/app/secretary-handoff-review-page.test.ts` | `YES` | display-only, non-executing |
| evidence/stale/insufficient posture visibility | `YES` | adapter, flow, page model, intake/handoff/review pages | targeted projection/app tests and `npm test` | `YES` | summary-only posture |
| non-executing recommendation visibility | `YES` | adapter, flow, page model, intake/review pages | targeted projection/app tests and `npm test` | `YES` | recommendation only, not action |
| blocked-by-contract fallback visibility | `YES` | flow, page model, intake/handoff/review pages | targeted projection/app tests | `YES` | blocked boundary only |
| boundary summary visibility | `YES` | flow, page model, intake/handoff/review pages | helper/app tests | `YES` | negative-boundary only |
| interpretation guards visibility | `YES` | page model, intake/review pages | helper/app tests | `YES` | anti-overclaim guard only |
| raw-key rejection | `YES` | `projection/adapters/founder-request-intake-to-packet-adapter.ts` | adapter and flow tests | `NO` | fail-closed |
| forbidden-label rejection | `YES` | `projection/adapters/founder-request-intake-to-packet-adapter.ts` | adapter and flow tests | `NO` | fail-closed |
| project mismatch rejection | `YES` | `projection/adapters/founder-request-intake-to-packet-adapter.ts` | adapter tests | `NO` | fail-closed |
| full app/projection regression tests | `YES` | repository test tree | `npm test` | `NO` | regression evidence only |

## C. Explicit Non-Capabilities

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no external action execution
- no autonomous company operation
- no protocol certification
- no live external workflow

## D. Decision

`SOLOCREW_V1_1_CAPABILITY_INVENTORY_READY`
