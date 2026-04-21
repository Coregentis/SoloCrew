# SoloCrew V1.2 Packet Revision Page Model Implementation Plan v0.1

`doc_id: SOLOCREW-V1.2-PACKET-REVISION-PAGE-MODEL-IMPLEMENTATION-PLAN-v0.1`

## A. Purpose

This document plans future page model changes for SoloCrew V1.2 packet
revision.

## B. Future Page Model Shape

```ts
type V12PacketRevisionPageModel = {
  revision_candidate_id: string;
  previous_packet_candidate_id: string;
  revised_packet_candidate_id?: string;
  revision_reason_label: string;
  evidence_gap_summary?: string;
  safe_clarification_prompt?: string;
  revision_status:
    | "needs_clarification"
    | "revision_candidate_created"
    | "ready_for_review"
    | "return_for_revision";
  boundary_summary: string;
  interpretation_guards: {
    revision_is_approval: false;
    return_for_revision_is_rejection: false;
    revised_packet_is_execution: false;
    evidence_gap_is_proof: false;
  };
};
```

## C. Page Integration Candidates

- founder request intake page
- secretary handoff page
- secretary handoff review page
- potential revision review section

Planned integration posture:

- founder request intake page can show prior packet lineage and clarification
  guidance
- secretary handoff page can show compact revision status and evidence gap
  posture
- secretary handoff review page can show detailed revision candidate lineage,
  evidence gap summary, and interpretation guards
- any dedicated revision review section must remain review-only and
  non-executing

## D. Copy Rules

- `revision candidate`, not `approved revision`
- `return for revision`, not `rejected`
- `evidence gap`, not `proof failure`
- `review-only`, not `execution ready`
- `not sent`, not `dispatch blocked`

## E. Decision

`SOLOCREW_V1_2_PACKET_REVISION_PAGE_MODEL_IMPLEMENTATION_PLAN_READY`
