# SoloCrew V1.2 Packet Revision Contract Plan v0.1

`doc_id: SOLOCREW-V1.2-PACKET-REVISION-CONTRACT-PLAN-v0.1`

## A. Purpose

This document plans the product-side contract shapes for SoloCrew packet
revision.

## B. Proposed Product-Side Types

```ts
type PacketRevisionCandidate = {
  revision_candidate_id: string;
  project_id: string;
  previous_packet_candidate_id: string;
  revised_packet_candidate_id?: string;
  revision_reason:
    | "insufficient_evidence"
    | "stale_context"
    | "operator_clarification"
    | "contract_blocked"
    | "other";
  revision_input_summary: string;
  evidence_gap?: PacketEvidenceGap;
  safe_clarification_prompt?: string;
  review_only: true;
  non_executing: true;
};

type PacketEvidenceGap = {
  gap_id: string;
  project_id: string;
  evidence_available: boolean;
  insufficient: boolean;
  stale: boolean;
  gap_category?:
    | "missing_required_context"
    | "stale_context"
    | "conflicting_evidence"
    | "runtime_private_omitted"
    | "other";
  user_visible_summary: string;
  safe_evidence_refs?: string[];
  not_proof: true;
};
```

## C. Mapping From Cognitive_OS

| Cognitive_OS field | SoloCrew product field | User-visible meaning | Boundary |
|---|---|---|---|
| `revision_id` | `revision_candidate_id` | revision candidate identifier | not approval, rejection, or execution |
| `project_id` | `project_id` | project-scoped revision line | no cross-project mixing |
| `previous_projection_summary_id` | `previous_packet_candidate_id` | previous packet candidate reference | not raw runtime access |
| `resulting_projection_summary_id` | `revised_packet_candidate_id` | revised packet candidate reference | not execution completion |
| `revision_reason` | `revision_reason` | why revision exists | not rejection semantics |
| `revision_input_summary` | `revision_input_summary` | bounded revision input summary | not external action instruction |
| `detail_id` | `gap_id` | evidence gap identifier | not proof id |
| `insufficiency_category` | `gap_category` | evidence gap category | not verdict/certification |
| `safe_evidence_refs` | `safe_evidence_refs` | bounded evidence refs | no runtime-private exposure |
| `safe_clarification_prompt` | `safe_clarification_prompt` | clarification suggestion | not provider/channel send |
| `non_executing` | `review_only` and `non_executing` | review-only posture | not dispatch or queue state |

## D. Forbidden Semantics

- revision candidate is not approval
- return-for-revision is not rejection
- revised packet is not execution
- evidence gap is not proof/certification
- safe clarification prompt is not provider/channel send
- no founder queue

## E. Decision

`SOLOCREW_V1_2_PACKET_REVISION_CONTRACT_PLAN_READY`
