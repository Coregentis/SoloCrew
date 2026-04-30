# TRI-REPO-ARCHITECTURE-DRIFT-CORRECTION-PLAN-v0.1

## Document Control

- doc_id: TRI-REPO-ARCHITECTURE-DRIFT-CORRECTION-PLAN-v0.1
- task_id: TRI-REPO-ARCHITECTURE-DRIFT-CORRECTION-PLAN-01
- status: correction planning only
- date: 2026-04-30
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- source_audit: governance/audits/TRI-REPO-SOLOCREW-CGOS-MPLP-ARCHITECTURE-DRIFT-ORIGIN-AUDIT-v0.1.md
- repo_heads:
  - SoloCrew: 5333b6cca6ce4e7bdabc201db9ee6ff0bda193e9
  - Cognitive_OS: ec681a4d77368b71c1cc76964618f3151038861b
  - MPLP-Protocol: 0cf0477938340a443614d03d9fb51ac764b960c7
- no_implementation_performed: true
- no_runtime_source_schema_registry_change: true
- no_release_tag_package_performed: true

## Executive Summary

The tri-repo architecture drift origin audit is accepted as the correction
planning source. Its final audit decision is:

`TRI_REPO_DRIFT_ORIGIN_GRADUAL_WITH_FIRST_CRITICAL_ESCALATION_AT_V3_0_PLANNING`

The first critical escalation is V3.0 planning. V3.0 stable release evidence is
preserved as downstream evidence and must not be rewritten, deleted, or
re-characterized as upstream runtime or protocol law. Correction requires a
Cognitive_OS neutral runtime/projection abstraction plan and an MPLP no-change /
candidate decision. This wave performs no code correction, runtime change, schema
change, registry change, binding change, release, tag, or package work.

## Accepted Audit Findings

- The drift pattern was gradual, with earlier runtime/projection pressure already
  visible before V2.3.
- V2.2 was a remediated path because SoloCrew consumed an explicit Cognitive_OS
  projection-safe handoff.
- V2.3, V2.4, and V2.5 contain bounded product-local or semantic debt rather
  than the first confirmed critical escalation.
- V3.0 planning classified workspace, session, review loop, packet, ledger, and
  export substrate as SoloCrew-local by default.
- V3.0 IMPL-01 through IMPL-05 expanded that local substrate into product code
  and fixtures.
- Release discipline remained strong, but it masked the missing upstream
  abstraction gate, projection-safe handoff refresh, and MPLP no-change /
  candidate decision.

## Correction Objectives

- Freeze SoloCrew feature expansion.
- Preserve V3.0 stable release evidence.
- Classify V3.0 objects as downstream evidence and candidate mapping sources.
- Backfill a Cognitive_OS neutral operator review loop surface.
- Backfill an MPLP no-change / candidate decision.
- Define a projection-safe handoff target.
- Decide future SoloCrew migration posture in a later owner-authorized wave.

## SoloCrew Disposition

| SoloCrew V3.0 object | Disposition | Future action |
| --- | --- | --- |
| EngagementWorkspace | downstream evidence / candidate mapping source | map to CGOS neutral OperatorWorkspace candidate |
| EngagementSession | downstream evidence / candidate mapping source | map to OperatorSession candidate |
| EngagementLoopState | downstream evidence | map to ReviewLoopState candidate |
| EngagementEntrySurface | downstream app/product surface | map to OperatorEntrySurface only if neutral |
| EngagementLoopRunner | downstream proof of review loop | map to ReviewLoopRunner candidate |
| FounderReviewPacket | product-local name; neutral equivalent needed | map to OperatorReviewPacket candidate |
| EngagementHistoryLedger | downstream proof of evidence ledger | map to SessionEvidenceLedger candidate |
| EngagementSessionExportPackage | downstream proof of deterministic evidence bundle | map to DeterministicEvidenceBundle candidate |
| Deliverable E2E fixture | downstream evidence pack | use as proof fixture only |

## SoloCrew Freeze / Maintenance Boundary

SoloCrew remains inside the V3.0 maintenance boundary:

- no V3.1 planning;
- no commercial readiness or production readiness claim;
- no new SoloCrew app or engagement feature;
- no release, tag, package, package publish, or package asset;
- only maintenance, evidence backfill, compatibility repair, tests, and docs;
- future migration to upstream contracts requires separate owner authorization.

## Required Cognitive_OS Correction

Companion document:

`Cognitive_OS/governance/planning/CGOS-NEUTRAL-OPERATOR-REVIEW-LOOP-SURFACE-PLAN-v0.1.md`

Required neutral capabilities:

- OperatorWorkspace
- OperatorSession
- ReviewLoopState
- OperatorEntrySurface
- ReviewLoopRunner
- OperatorReviewPacket
- SessionEvidenceLedger
- DeterministicEvidenceBundle
- RuntimeBoundaryProfile
- LocalReviewLoopResult
- ProjectionSafeHandoffEnvelope

If Cognitive_OS chooses better neutral names in the future implementation wave,
those names should replace this candidate list only if they remain product
neutral and projection-safe.

## Required MPLP Correction

Companion decision document:

`MPLP-Protocol/governance/backlog/MPLP-DOWNSTREAM-REVIEW-LOOP-EVIDENCE-NO-CHANGE-AND-CANDIDATE-DECISION-v0.1.md`

Required posture:

- no schema change;
- no protocol law change;
- no certification or endorsement;
- no downstream product semantics promoted into MPLP canonical terms;
- no-change plus candidate/backlog decision;
- possible future guide/profile notes only after more evidence.

## Projection / Handoff Correction

Target handoff:

`Cognitive_OS neutral runtime/projection surface -> projection-safe contract / envelope -> SoloCrew adapter -> product-local Engagement / founder vocabulary`

The target handoff must include:

- state/snapshot posture refs;
- transaction/export posture refs;
- error/insufficiency refs;
- object/export binding refs;
- module/duty posture refs;
- safe evidence refs;
- omission markers;
- version refs;
- boundary profile;
- no raw runtime-private payload.

## Correction Phases

| Phase | Purpose | Implementation allowed now |
| --- | --- | --- |
| Phase 0 | this correction plan | no |
| Phase 1 | Cognitive_OS neutral surface planning / implementation decision | no |
| Phase 2 | MPLP no-change / candidate decision | no |
| Phase 3 | Cognitive_OS neutral contract implementation if authorized | later only |
| Phase 4 | projection-safe handoff fixture | later only |
| Phase 5 | SoloCrew adapter / consumption migration plan | later only |
| Phase 6 | SoloCrew implementation migration only if authorized | later only |
| Phase 7 | tri-repo closure audit | later only |

## Stop Conditions

Stop correction planning or later correction execution if:

- Cognitive_OS naming leaks SoloCrew, founder, or Engagement product semantics
  into canonical neutral names;
- MPLP change becomes normative without owner approval;
- SoloCrew new feature work starts before correction closure;
- projection-safe boundary cannot be defined;
- tests fail;
- no-change / candidate decision is ambiguous.

## Final Decision

`TRI_REPO_CORRECTION_PLAN_READY_FOR_UPSTREAM_ABSTRACTION_AND_MPLP_DECISION`

## Next Allowed Task

`TRI-REPO-CGOS-ABSTRACTION-AND-MPLP-DECISION-BACKFILL-01`
