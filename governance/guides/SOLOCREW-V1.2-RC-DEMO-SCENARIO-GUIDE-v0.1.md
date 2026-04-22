# SoloCrew V1.2 RC Demo Scenario Guide v0.1

`doc_id: SOLOCREW-V1.2-RC-DEMO-SCENARIO-GUIDE-v0.1`

## A. Purpose

Describe safe demo scenarios for V1.2 RC.

## B. Demo Scenarios

| Scenario | Input posture | Expected visible output | Boundary |
|---|---|---|---|
| insufficient evidence revision | evidence remains insufficient and revision input is incomplete | evidence gap copy, safe clarification prompt, and return-for-revision posture | no approval or execution claim |
| stale context revision | stale evidence or stale context dominates | stale-context reason, evidence gap summary, and return-for-revision posture | no dispatch or send behavior |
| operator clarification revision | clarification improves wording without widening behavior | revision candidate, review-only posture, and not-sent staging posture | no provider/channel action |
| contract-blocked revision | contract safety blocks the revision path | blocked-by-contract fallback, boundary summary, and explicit interpretation guards | no rejection or execution semantics |
| safe clarification prompt copy-only | clarification prompt is present | prompt appears as copy in the review surface | prompt is not provider/channel send |
| blocked-by-contract fallback | invalid or unsafe bounded input appears | blocked revision candidate with deterministic bounded fallback wording | no queue or external workflow behavior |

## C. Demo Non-Goals

- no provider/channel send
- no approval/rejection
- no dispatch/execution
- no founder queue
- no proof/certification
- no autonomous operation

## D. Decision

`SOLOCREW_V1_2_RC_DEMO_SCENARIO_GUIDE_READY`

## E. V1.3 RC Demo Path

Show lifecycle clarity fields:

- `lifecycle_stage`
- `lifecycle_label`
- `evidence_gap_summary`
- `revision_relationship`
- `review_posture`
- `non_executing_posture`

Keep the demo review-only and non-executing.

## F. V1.4 RC Demo Path

Show continuity page-model fields:

- `continuity_summary`
- `continuity_lifecycle_label`
- `continuity_history_summary`
- `pending_review_visibility`
- `pending_review_count`
- `pending_review_items_summary`
- `continuity_review_posture`
- `continuity_non_executing_posture`
- `continuity_safe_evidence_refs`
- `runtime_private_fields_omitted`

Keep the demo review-only and non-executing.
