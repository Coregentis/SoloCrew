# SoloCrew V1.1 Scenario and Fixture Plan v0.1

`SOLOCREW-V1.1-SCENARIO-AND-FIXTURE-PLAN-v0.1`

## A. Purpose

This plan defines first usable scenario fixtures for V1.1 planning.

## B. Scenario Candidates

### 1. Product update planning request

- founder request text:
  - `Help me turn the upcoming product update into a review-ready packet before we do anything externally.`
- expected bounded request posture:
  - bounded planning request with review-first intent
- expected packet posture:
  - packet candidate ready for review/staging explanation
- expected evidence posture:
  - bounded evidence summary with omission/stale/insufficiency shown if present
- expected non-executing recommendation:
  - prepare review and identify the next safe planning step
- explicit exclusions:
  - no publish action
  - no send action
  - no execution claim

### 2. Content publishing preparation request

- founder request text:
  - `Prepare a packet for the next content publishing step so I can review it first.`
- expected bounded request posture:
  - bounded content-preparation request, not a publication command
- expected packet posture:
  - staged packet with review-first readiness
- expected evidence posture:
  - evidence summary plus visible omissions if source support is incomplete
- expected non-executing recommendation:
  - recommend review or revision preparation only
- explicit exclusions:
  - no provider/channel publish
  - no dispatch
  - no external posting

### 3. Customer follow-up preparation request

- founder request text:
  - `Prepare the customer follow-up request into a packet so I can review the safest next step.`
- expected bounded request posture:
  - bounded follow-up planning request with risk-aware posture
- expected packet posture:
  - review/staging packet with evidence-sensitive framing
- expected evidence posture:
  - insufficiency/stale distinction stays visible if support is incomplete
- expected non-executing recommendation:
  - recommend review or revision only
- explicit exclusions:
  - no outbound message
  - no queue entry
  - no customer action claim

## C. Chosen First Scenario

Chosen first scenario:

- `product update planning request`

Reason:

- it is the clearest fit for request-to-packet planning without forcing
  customer data, external publication, or edge-case risk wording too early

## D. Fixture Boundaries

Fixtures must not include:

- provider/channel execution
- approve/reject/dispatch/execute
- real customer data
- external action claims
- protocol certification claims

## E. Decision

`SOLOCREW_V1_1_SCENARIO_PLAN_READY`
