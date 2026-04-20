# SoloCrew V1.1 Projection Consumption Plan v0.1

`SOLOCREW-V1.1-PROJECTION-CONSUMPTION-PLAN-v0.1`

## A. Purpose

This plan defines how SoloCrew V1.1 will consume Cognitive_OS
projection-safe summaries after implementation.

## B. Allowed Upstream Contract Surfaces

Allowed future upstream inputs:

- `RuntimeProjectionSafeStateExposure`
- `RuntimeEvidencePostureSummary`
- `RuntimeNonExecutingRecommendationEnvelope`
- `RuntimeProjectionSummaryEnvelope`

## C. Consumption Boundary

- SoloCrew may consume projection summaries
- SoloCrew must not import raw VSL / PSG / AEL / trace / drift / learning
  internals
- SoloCrew must not treat `transition_accepted` as approval
- SoloCrew must not treat `terminal` as execution complete
- SoloCrew must not treat evidence summary as proof/certification
- SoloCrew must not dispatch/execute recommendation envelope

## D. Mapping Plan

| Upstream summary field | SoloCrew product use | Interpretation rule | Forbidden interpretation |
| --- | --- | --- | --- |
| `state_summary.transition_accepted` | founder-facing and review-facing state explanation | state evaluation accepted, not approval | approval granted |
| `state_summary.terminal` | state-line closure explanation | state line terminal, not execution complete | work executed or closed externally |
| `state_summary.blocked_reason` | blocked transition explanation on packet/review surfaces | blocked state transition reason only | task failure verdict or rejection verdict |
| `evidence_available` | whether evidence posture can be shown as present | presence flag for bounded explanation | proof of correctness |
| `stale` | stale posture badge and wording | stale remains distinct from insufficiency | closed invalidation verdict |
| `insufficient` | insufficiency badge and wording | insufficiency remains distinct from stale | proof that request is wrong |
| `evidence_summary` | bounded rationale/evidence explanation text | summary only | proof/certification |
| `recommendation_summary` | non-executing next-step explanation | review-first recommendation | dispatch, approval, or execution command |
| `blocked_actions` | explicit negative boundary on review and staging surfaces | blocked action family remains visible | partial permission to execute |
| `runtime_private_fields_omitted` | safe-consumption assertion | downstream is consuming summary-only data | raw runtime exposure is acceptable |

## E. Missing Implementation Preconditions

Actual SoloCrew implementation remains blocked until:

- implementation plan exists
- adapter design exists
- tests are defined
- no direct runtime-private imports are present
- projection contract compatibility is verified against current `Cognitive_OS`
  commit `782f84304a5625855e8912c310d47821c23f47bc`

## F. Decision

`SOLOCREW_V1_1_PROJECTION_CONSUMPTION_PLAN_READY`
