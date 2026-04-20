# SoloCrew V1.1 App/Page Integration Scope v0.1

`SOLOCREW-V1.1-APP-PAGE-INTEGRATION-SCOPE-v0.1`

## A. Purpose

This plan defines how V1.1 app/page surfaces should integrate the existing
intake-to-packet flow in a later implementation wave.

It is:

- planning only
- no app/page implementation in this wave
- no UI behavior change
- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no Cognitive_OS change
- no MPLP change
- no direct runtime-private dependency

## B. Pages Under Consideration

### 1. `app/pages/founder-request-intake-page.ts`

- current role:
  - bounded founder request capture and current intake-state explanation
- V1.1 integration role:
  - first visible packet-candidate planning surface tied to the request
- expected new visible data:
  - packet candidate posture
  - review posture
  - evidence posture summary
  - non-executing recommendation summary
  - blocked fallback reason if flow is contract-blocked
- forbidden visible interpretation:
  - approval
  - execution start
  - queue entry
- implementation change allowed in next wave:
  - yes

### 2. `app/pages/secretary-handoff-page.ts`

- current role:
  - staged-only handoff posture and compact preview surface
- V1.1 integration role:
  - staging-facing display of packet candidate and compact evidence posture
- expected new visible data:
  - staging posture
  - packet candidate visibility
  - evidence/stale/insufficient posture
  - blocked fallback reason if present
- forbidden visible interpretation:
  - dispatch-ready handoff
  - queue execution
  - provider/channel action
- implementation change allowed in next wave:
  - yes

### 3. `app/pages/secretary-handoff-review-page.ts`

- current role:
  - review-only packet explanation with bounded evidence and recommendation
- V1.1 integration role:
  - primary review-ready explanation lane for intake-to-packet flow result
- expected new visible data:
  - review posture
  - evidence posture
  - non-executing recommendation
  - blocked fallback reason
  - boundary summary
- forbidden visible interpretation:
  - approval granted
  - execution completed
  - proof/certification
- implementation change allowed in next wave:
  - yes

## C. Integration Goal

A founder request can flow into a packet-candidate review/staging explanation
visible across existing intake, handoff, and review surfaces without executing
external actions or implying approval.

## D. Included Scope For Next Implementation Wave

- call existing `buildFounderRequestIntakeToPacketFlow` from a product-side
  assembly/helper
- surface `packet_candidate.review_posture`
- surface `packet_candidate.staging_posture`
- surface `visible_summary.packet_posture`
- surface `visible_summary.evidence_posture`
- surface `visible_summary.recommendation_summary`
- surface `visible_summary.boundary_summary`
- surface blocked fallback reason when `blocked_by_contract`

## E. Explicit Excluded Scope

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no external business action execution
- no autonomous company operation
- no protocol certification
- no raw Cognitive_OS runtime internals
- no direct runtime-private dependency
- no summary-as-proof claim

## F. Decision

`SOLOCREW_V1_1_APP_PAGE_INTEGRATION_SCOPE_READY`
