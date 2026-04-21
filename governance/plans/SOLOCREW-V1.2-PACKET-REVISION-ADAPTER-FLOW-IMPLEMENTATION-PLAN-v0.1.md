# SoloCrew V1.2 Packet Revision Adapter Flow Implementation Plan v0.1

`doc_id: SOLOCREW-V1.2-PACKET-REVISION-ADAPTER-FLOW-IMPLEMENTATION-PLAN-v0.1`

## A. Purpose

This document plans the future adapter and flow implementation for SoloCrew
V1.2 packet revision.

## B. Future Files

| File | Create/update | Purpose |
|---|---|---|
| `projection/contracts/packet-revision-contract.ts` | create | define `PacketRevisionCandidate` and `PacketEvidenceGap` runtime-safe product types |
| `projection/adapters/packet-revision-adapter.ts` | create | map upstream-neutral revision envelope and evidence insufficiency detail into SoloCrew packet revision candidate output |
| `projection/assembly/packet-revision-flow.ts` | create | combine previous packet candidate context, revision input summary, and adapter output into bounded flow result |
| `projection/adapters/founder-request-intake-to-packet-adapter.ts` | reuse as input source | preserve V1.1 packet candidate mapping conventions and blocked fallback posture |
| `projection/assembly/founder-request-intake-to-packet-flow.ts` | reuse as input source | preserve V1.1 review-ready, return-for-revision, and blocked-by-contract flow semantics |
| `tests/projection/packet-revision-adapter.test.ts` | create | assert adapter boundary-safe mapping behavior |
| `tests/projection/packet-revision-flow.test.ts` | create | assert flow posture, fallback, and review-only behavior |

## C. Adapter Behavior

`RuntimeProjectionRevisionEnvelope`  
+ `RuntimeEvidenceInsufficiencyDetail`  
+ previous packet candidate context  
-> `PacketRevisionCandidate`

Planned adapter responsibilities:

- accept only projection-safe upstream surfaces
- normalize revision reason into SoloCrew revision candidate fields
- derive evidence gap summary and safe clarification prompt
- preserve previous and revised packet candidate references
- fail closed when revision input violates bounded product semantics

## D. Flow Behavior

previous packet candidate  
-> evidence gap / stale context  
-> revision candidate  
-> review-only posture  
-> page model consumption

Planned flow responsibilities:

- surface `revision_candidate_created` and `return_for_revision` without
  rejection semantics
- preserve `blocked_by_contract` fallback for invalid or unsafe upstream input
- expose boundary summary and interpretation guards to page-model consumers
- keep all flow outputs non-executing and review-only

## E. Boundary

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no direct runtime-private import
- no evidence-as-proof

## F. Decision

`SOLOCREW_V1_2_PACKET_REVISION_ADAPTER_FLOW_IMPLEMENTATION_PLAN_READY`
