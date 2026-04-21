# SoloCrew V1.2 Projection Revision Consumption Test Plan v0.1

`doc_id: SOLOCREW-V1.2-PROJECTION-REVISION-CONSUMPTION-TEST-PLAN-v0.1`

## A. Purpose

This document plans future tests for V1.2 projection revision consumption.

## B. Required Future Tests

| Test | Purpose | Expected result |
|---|---|---|
| maps evidence insufficiency detail to evidence gap copy | convert neutral insufficiency detail into user-facing copy safely | evidence gap copy stays bounded |
| maps projection revision envelope to packet revision candidate | map neutral revision envelope into product revision candidate | revision candidate is visible and non-executing |
| shows previous and revised packet candidate references | preserve lineage | both references remain visible |
| shows safe clarification prompt without provider/channel send | present clarification hint safely | no provider/channel semantics |
| shows return-for-revision without rejection semantics | preserve V1.1 return posture boundary | no rejection wording |
| revision candidate is not approval | protect approval boundary | approval wording absent |
| revised packet is not execution | protect execution boundary | execution wording absent |
| evidence gap is not proof/certification | protect evidence boundary | proof/certification wording absent |
| no approve/reject/dispatch/execute controls | protect direct-control boundary | no such controls appear |
| no founder queue behavior | protect queue boundary | no queue behavior appears |
| no runtime-private internals exposed | protect runtime-private boundary | raw runtime internals absent |
| handles stale context category | map stale detail safely | stale copy remains bounded |
| handles missing required context category | map missing context detail safely | clarification remains bounded |
| handles contract_blocked revision reason | preserve blocked boundary | blocked copy remains non-executing |
| handles invalid or blocked revision envelope gracefully | fail closed on invalid upstream input | blocked fallback stays bounded |

## C. Validation Plan

- existing SoloCrew `npm test`
- targeted projection tests
- targeted app/page tests
- forbidden boundary grep

## D. Decision

`SOLOCREW_V1_2_PROJECTION_REVISION_CONSUMPTION_TEST_PLAN_READY`
