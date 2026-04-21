# SoloCrew V1.2 Projection Revision Consumption Plan v0.1

`doc_id: SOLOCREW-V1.2-PROJECTION-REVISION-CONSUMPTION-PLAN-v0.1`

## A. Purpose

This document plans how SoloCrew V1.2 will consume upstream-neutral projection
revision and evidence insufficiency surfaces.

This wave is:

- planning only
- no implementation in this wave
- no Cognitive_OS changes
- no MPLP changes
- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue

## B. Upstream Runtime Surfaces

- `RuntimeProjectionRevisionEnvelope`
- `RuntimeEvidenceInsufficiencyDetail`
- `create_projection_revision_envelope(...)`
- `validate_projection_revision_envelope(...)`
- `create_evidence_insufficiency_detail(...)`
- `validate_evidence_insufficiency_detail(...)`
- projection-adjacent revision store methods

## C. Product Mapping

| Cognitive_OS neutral surface | SoloCrew product meaning | User-facing copy | Forbidden interpretation |
|---|---|---|---|
| projection revision envelope | packet revision candidate | revision candidate | not approval / rejection / execution |
| evidence insufficiency detail | evidence gap / stale evidence explanation | evidence gap | not proof / certification |
| safe clarification prompt | request clarification suggestion | clarification suggestion | not provider/channel send |
| previous projection reference | previous packet candidate reference | previous packet candidate | not raw runtime access |
| resulting projection reference | revised packet candidate reference | revised packet candidate | not execution completion |
| non-executing posture | review-only / not sent / not dispatched | review-only | not queue / dispatch state |

## D. Consumption Boundary

- SoloCrew maps neutral runtime outputs into product copy.
- SoloCrew must not expose raw runtime-private fields.
- SoloCrew must not treat revision as approval/rejection/execution.
- SoloCrew must not treat evidence detail as proof/certification.

## E. Decision

`SOLOCREW_V1_2_PROJECTION_REVISION_CONSUMPTION_PLAN_READY`
