# SoloCrew V1.2 Packet Revision Implementation Test Plan v0.1

`doc_id: SOLOCREW-V1.2-PACKET-REVISION-IMPLEMENTATION-TEST-PLAN-v0.1`

## A. Purpose

This document plans the future implementation tests for SoloCrew V1.2 packet
revision.

## B. Test Matrix

| Test | Target file | Purpose | Expected result |
|---|---|---|---|
| creates packet revision candidate from projection revision envelope | `tests/projection/packet-revision-adapter.test.ts` | prove neutral upstream revision envelope maps into product candidate | revision candidate is created and remains review-only |
| maps evidence insufficiency to evidence gap | `tests/projection/packet-revision-adapter.test.ts` | prove insufficiency detail becomes bounded evidence gap | evidence gap summary stays non-proof and user-visible |
| maps safe clarification prompt to copy only | `tests/projection/packet-revision-adapter.test.ts` | prove clarification prompt stays advisory | no provider/channel send semantics |
| preserves previous packet candidate reference | `tests/projection/packet-revision-adapter.test.ts` | keep lineage to prior packet candidate | previous reference remains visible |
| maps resulting projection reference to revised packet candidate id | `tests/projection/packet-revision-adapter.test.ts` | keep lineage to revised candidate | revised packet candidate id is visible |
| handles insufficient evidence | `tests/projection/packet-revision-flow.test.ts` | prove insufficient-evidence posture maps to revision flow state | flow returns revision posture without rejection |
| handles stale context | `tests/projection/packet-revision-flow.test.ts` | prove stale context remains distinct | stale copy stays bounded and review-only |
| handles operator clarification | `tests/projection/packet-revision-flow.test.ts` | prove clarification-led revision remains safe | clarification posture remains non-executing |
| handles contract blocked | `tests/projection/packet-revision-flow.test.ts` | prove blocked fallback remains available | blocked-by-contract fallback is visible |
| rejects runtime-private leakage | `tests/projection/packet-revision-adapter.test.ts` | prevent raw runtime-private fields from entering SoloCrew output | adapter fails closed |
| rejects provider/channel positive wording | `tests/projection/packet-revision-adapter.test.ts` | prevent overclaiming execution semantics | adapter fails closed or blocks safely |
| rejects proof/certification wording | `tests/projection/packet-revision-adapter.test.ts` | keep evidence gap below proof semantics | evidence gap does not become proof/certification |
| revision candidate is not approval | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | preserve interpretation guard | approval wording is absent and guard is false |
| return-for-revision is not rejection | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | preserve revision semantics | rejection wording is absent and guard is false |
| revised packet is not execution | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | preserve execution boundary | execution wording is absent and guard is false |
| no approve/reject/dispatch/execute controls | focused app/page tests | prevent control-surface drift | controls do not appear |
| no founder queue | focused app/page tests | prevent queue-surface drift | queue behavior does not appear |
| page model shows interpretation guards | `tests/app/create-v1-2-packet-revision-page-model.test.ts` | keep guards explicit | interpretation guards render as false |
| invalid revision envelope becomes blocked-by-contract fallback | `tests/projection/packet-revision-flow.test.ts` | keep fail-closed behavior stable | blocked fallback stays bounded |
| full npm test passes | existing repo validation | preserve repo-wide stability | full regression suite passes |

## C. Validation Plan

- `npm test`
- `node --experimental-strip-types --test tests/projection/packet-revision-adapter.test.ts`
- `node --experimental-strip-types --test tests/projection/packet-revision-flow.test.ts`
- `node --experimental-strip-types --test tests/app/create-v1-2-packet-revision-page-model.test.ts`

## D. Decision

`SOLOCREW_V1_2_PACKET_REVISION_IMPLEMENTATION_TEST_PLAN_READY`
