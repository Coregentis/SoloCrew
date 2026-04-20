# SoloCrew V1.1 Page Data Mapping Plan v0.1

`SOLOCREW-V1.1-PAGE-DATA-MAPPING-PLAN-v0.1`

## A. Purpose

This plan defines how intake-to-packet flow result fields map to existing page
display contracts.

## B. Mapping Table

| Flow / candidate field | Target page | Display meaning | Forbidden interpretation | Test expectation |
| --- | --- | --- | --- | --- |
| `flow_id` | intake / handoff / review pages | traceable planning-flow identity | runtime job id | visible only as internal page-model reference if surfaced at all |
| `packet_candidate.packet_candidate_id` | intake / handoff / review pages | bounded packet-candidate identity | execution ticket | packet-candidate identity stays non-executing |
| `packet_candidate.review_posture` | intake / review pages | review-needed / return-for-revision / blocked status | approval status | review posture never renders as approval |
| `packet_candidate.staging_posture` | intake / handoff pages | packet candidate / stale / insufficient / blocked staging meaning | dispatch status | staging posture never renders as dispatch |
| `packet_candidate.evidence_posture.evidence_available` | intake / handoff / review pages | evidence availability flag | proof available | evidence availability stays summary-only |
| `packet_candidate.evidence_posture.stale` | handoff / review pages | stale posture indicator | invalidated execution outcome | stale remains stale |
| `packet_candidate.evidence_posture.insufficient` | handoff / review pages | insufficiency indicator | rejection verdict | insufficiency remains insufficiency |
| `packet_candidate.evidence_posture.evidence_summary` | intake / handoff / review pages | bounded evidence explanation | proof/certification | evidence summary never renders as proof |
| `packet_candidate.recommendation.summary` | intake / review pages | non-executing next-step explanation | command to act | recommendation remains non-executing |
| `packet_candidate.recommendation.non_executing` | review page | explicit non-executing boundary | execution permit | rendered as boundary note only |
| `packet_candidate.recommendation.blocked_actions` | review page | negative boundary list | allowed actions | blocked actions render as blocked only |
| `packet_candidate.state_interpretation.transition_accepted_is_approval` | intake / review pages | approval-protection assertion | approval outcome | page copy must say accepted state != approval |
| `packet_candidate.state_interpretation.terminal_is_execution_complete` | handoff / review pages | completion-protection assertion | execution completion | page copy must say terminal != execution complete |
| `packet_candidate.boundaries.provider_channel_execution` | intake / handoff / review pages | explicit disabled boundary | external action available | always false |
| `packet_candidate.boundaries.approve_reject_dispatch_execute` | intake / handoff / review pages | explicit disabled boundary | control behavior available | always false |
| `packet_candidate.boundaries.founder_queue` | intake / handoff / review pages | explicit disabled boundary | queue exists | always false |
| `packet_candidate.boundaries.raw_runtime_private_dependency` | intake / handoff / review pages | explicit disabled boundary | runtime-private dependency allowed | always false |
| `review_ready` | intake / review pages | clean review-ready planning status | approval granted | true only for clean bounded request |
| `return_for_revision` | handoff / review pages | revision-needed planning status | rejection executed | maps to return-for-revision only |
| `blocked_by_contract` | intake / handoff / review pages | blocked fallback state | runtime failure verdict | blocked reason visible without widening behavior |
| `visible_summary.boundary_summary` | intake / handoff / review pages | compact boundary explanation lines | enabled controls | rendered as negative boundary only |

## C. Copy Rules

- use `review-ready`, not `approved`
- use `packet candidate`, not `executed`
- use `return for revision`, not `rejected`
- use `evidence summary`, not `proof`
- use `non-executing recommendation`, not `action executed`
- use `blocked by contract` when raw/runtime/execution boundary fails

## D. Decision

`SOLOCREW_V1_1_PAGE_DATA_MAPPING_READY`
