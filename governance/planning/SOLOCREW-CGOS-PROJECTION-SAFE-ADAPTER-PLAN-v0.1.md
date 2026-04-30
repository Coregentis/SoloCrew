# SOLOCREW-CGOS-PROJECTION-SAFE-ADAPTER-PLAN-v0.1

## Document Control

- doc_id: SOLOCREW-CGOS-PROJECTION-SAFE-ADAPTER-PLAN-v0.1
- task_id: SOLOCREW-CGOS-PROJECTION-SAFE-ADAPTER-PLANNING-01
- status: adapter planning only
- date: 2026-04-30
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- source_handoff_plan: governance/planning/TRI-REPO-PROJECTION-SAFE-HANDOFF-AND-DOWNSTREAM-CONSUMPTION-PLAN-v0.1.md
- cgos_source_commit: 16d559ab89a7c3f9fffa66da7d31c6d65a6c667f
- mplp_boundary_decision: MPLP-Protocol/governance/backlog/MPLP-DOWNSTREAM-REVIEW-LOOP-EVIDENCE-NO-CHANGE-AND-CANDIDATE-DECISION-v0.1.md
- no_implementation_performed: true
- no_runtime_behavior_changed: true
- no_release_tag_package_performed: true
- no_cognitive_os_modification: true
- no_mplp_protocol_modification: true

## Executive Summary

CGOS neutral operator review loop contracts are available at the inspected
commit. SoloCrew V3.0 stable remains downstream local evidence, and its local
engagement contracts, fixture, tests, and release records are not migrated or
rewritten by this wave.

This plan defines a future additive adapter that can consume CGOS
`LocalReviewLoopResult` projection-safe output and translate it into SoloCrew
product-local object candidates. No adapter code, runtime behavior change,
schema/registry/binding change, release, tag, or package action is performed in
this planning wave.

Recommended implementation posture: additive dual-path proof first.

## Adapter Objective

The future adapter should consume a CGOS `LocalReviewLoopResult`, preserve the
projection-safe handoff envelope, and produce a SoloCrew-local adapter result or
candidate object set without replacing the existing V3.0 local path.

Objectives:

- consume CGOS neutral review-loop output as upstream projection-safe input;
- convert neutral refs, statuses, evidence refs, and boundary posture into
  SoloCrew-local engagement object candidates;
- preserve the existing SoloCrew V3.0 local path as release evidence;
- prove dual-path behavior before any deeper migration is considered;
- keep founder-facing and engagement vocabulary downstream only;
- avoid upstream semantic pollution in CGOS and avoid MPLP protocol promotion.

## Input Contract

Future adapter input should include:

| Input surface | Required content | Adapter use |
| --- | --- | --- |
| CGOS `LocalReviewLoopResult` | `result_id`, workspace, session, loop state, runner, review packet, evidence ledger, evidence bundle, projection handoff, boundary profile | primary adapter input |
| Projection-safe handoff envelope | projection envelope id, safe evidence refs, omission markers, source runtime object refs, posture refs, version refs | preserve as handoff evidence and source metadata |
| `RuntimeBoundaryProfile` | local/manual/review/deterministic/non-executing flags plus storage, service, dispatch, publishing, payment, invocation, autonomy, package, and assurance boundaries | translate to SoloCrew boundary flags and notes |
| Evidence refs | sorted safe refs from workspace, session, loop state, packet, bundle, and envelope | map to SoloCrew evidence refs and history source refs |
| Omission markers | safe-ref-only and runtime-private omission markers | record in source metadata / evidence boundary notes |
| State/snapshot posture refs | projection-safe state snapshot references from the handoff envelope | preserve as metadata refs, not payload |
| Transaction/export posture refs | deterministic in-memory summary posture references | map to export boundary notes |
| Error/insufficiency posture refs | blocked/recoverable posture references | preserve blocked semantics |
| Module/duty posture refs | neutral posture refs from CGOS handoff | preserve as upstream refs only |
| Version refs | protocol/binding/runtime version refs exposed by projection-safe envelope | preserve as source metadata refs |

Input rules:

- raw runtime-private payload must remain absent;
- missing required refs must preserve CGOS blocked posture;
- external side-effect capability must remain absent;
- product-local SoloCrew terms must not be sent upstream.

## Output Contract Candidate

Future adapter output candidate:

```ts
type SoloCrewCgosReviewLoopAdapterResult = {
  adapter_result_id: string;
  cgos_result_ref: string;
  engagement_workspace_candidate: unknown;
  engagement_session_candidate: unknown;
  engagement_loop_state_candidate: unknown;
  engagement_loop_runner_candidate: unknown;
  founder_review_packet_candidate: unknown;
  engagement_history_ledger_candidate: unknown;
  engagement_session_export_package_candidate: unknown;
  boundary_flags: unknown;
  source_metadata: unknown;
  projection_safe_handoff_ref: string;
  adapter_summary: string;
};
```

This is a planning-only candidate shape. It does not create a runtime contract
in this wave.

Output requirements for a future implementation:

- preserve existing SoloCrew V3.0 object semantics as product-local;
- mark candidates as adapter-derived until dual-path proof passes;
- preserve CGOS projection envelope reference and omission posture;
- preserve all compatible boundary flags and retain unmatched CGOS flags in
  adapter boundary notes;
- never expose raw runtime-private payload;
- never imply external execution, persistence, cloud sync, dispatch, payment,
  analytics, account provisioning, conversion automation, marketplace behavior,
  or autonomy.

## Field Mapping Matrix

| CGOS field/object | SoloCrew target | Mapping rule | Product-local transformation | Risk |
| --- | --- | --- | --- | --- |
| `LocalReviewLoopResult.result_id` | `SoloCrewCgosReviewLoopAdapterResult.cgos_result_ref` | preserve exact CGOS result id as reference | store as adapter source metadata, not local release identity | low |
| `OperatorWorkspace.workspace_id` | `EngagementWorkspace.workspace_id` / `engagement_ref` mapping | use as candidate workspace id or source ref; derive product `engagement_ref` downstream | adapter must add SoloCrew engagement identity locally | medium |
| `OperatorWorkspace.session_refs` | `EngagementWorkspace.history_refs` / session linkage | map session refs into local linkage and metadata notes | product history record ids remain SoloCrew-generated | medium |
| `OperatorWorkspace.state_snapshot_ref` | `source_metadata` / evidence boundary notes | preserve as projection-safe ref | do not materialize snapshot payload | low |
| `OperatorWorkspace.evidence_refs` | `EngagementLoopState.evidence_refs` | copy safe refs after deterministic sorting | product evidence labels remain downstream | low |
| `OperatorSession.session_id` | `EngagementSession.session_id` | preserve when safe or map through adapter id policy | add operator ref and stage locally | medium |
| `OperatorSession.workspace_ref` | `EngagementSession.workspace_ref` | direct ref mapping | verify ref matches workspace candidate | low |
| `OperatorSession.review_loop_ref` | `EngagementSession.source_metadata` / loop linkage | preserve as loop source ref | local `loop_state_ref` may use SoloCrew naming | medium |
| `ReviewLoopState.loop_state_id` | `EngagementLoopState.loop_state_id` | direct candidate mapping | add product stage and readiness/onboarding/review-gate refs locally | medium |
| `ReviewLoopState.reviewed_step_refs` | `EngagementLoopRun.step_refs` and packet sections | map to reviewed local step refs | create product step kinds only downstream | medium |
| `ReviewLoopState.blocked_step_refs` | blocked loop steps and packet sections | preserve blocked refs and statuses | map to blocked items in founder-facing packet | medium |
| `ReviewLoopRunner.runner_id` | `EngagementLoopRun.runner_id` | direct candidate mapping | local run id may remain SoloCrew-generated | medium |
| `ReviewLoopRunner.step_refs` | engagement loop step refs | map each `step_ref` and `status` to local review step candidate | translate only in SoloCrew adapter layer | medium |
| `OperatorReviewPacket.packet_id` | `FounderReviewPacket.packet_id` | map neutral packet id to candidate packet ref | founder-facing section ids and decision copy remain SoloCrew-only | high |
| `OperatorReviewPacket.manual_decision_options` | `FounderReviewPacket.decision_options` | map neutral options to compatible local decision options | product copy and labels are downstream-only | high |
| `OperatorReviewPacket.evidence_refs` | packet source refs and evidence notes | preserve safe refs | do not add payload fields | low |
| `SessionEvidenceLedger.ledger_id` | `EngagementHistoryLedger.ledger_id` | direct candidate mapping | product history entry kinds remain local | medium |
| `SessionEvidenceLedger.entry_refs` | `EngagementHistoryLedger.entry_refs` | map entry refs deterministically | add product event summaries locally | medium |
| `SessionEvidenceLedger.latest_packet_ref` | `EngagementHistoryLedger.latest_packet_ref` | direct ref mapping | verify packet candidate coherence | low |
| `SessionEvidenceLedger.latest_bundle_ref` | `EngagementSessionExportPackage.source_refs` | preserve as source metadata and export linkage | local export id remains SoloCrew-generated if needed | medium |
| `DeterministicEvidenceBundle.bundle_id` | `EngagementSessionExportPackage.export_id` / source refs | map to export candidate or source ref | preserve local export package identity policy | medium |
| `DeterministicEvidenceBundle.bundle_kind` | `EngagementSessionExportPackage.export_kind` | translate `in_memory_evidence_bundle` to `in_memory_export_object`; translate deterministic and audit kinds to local equivalent candidates | preserve in-memory object only, no file path | medium |
| `DeterministicEvidenceBundle.summary` | `EngagementSessionExportPackage.export_summary` | copy or compose deterministic summary | ensure no readiness overclaim appears | low |
| `RuntimeBoundaryProfile` | `boundary_flags` | translate matching flags directly; preserve unmatched flags in boundary notes | SoloCrew-specific no-claim flags remain local additions | low |
| `ProjectionSafeEnvelope` | `projection_safe_handoff_ref` / `source_metadata` | preserve envelope id and posture refs | expose refs only, never raw payload | low |
| Handoff omission markers | `source_metadata` / evidence boundary notes | preserve marker ids and reasons as metadata refs or summaries | do not convert omissions into payload fields | low |
| Handoff safe evidence refs | evidence refs and history source refs | copy refs deterministically | evidence content remains outside adapter | low |

## Boundary Flag Translation

Exact translation rules for a future adapter:

| CGOS flag | SoloCrew target | Rule |
| --- | --- | --- |
| `local_only` | `local_only` | direct true-to-true mapping |
| `manual_first` | `manual_first` | direct true-to-true mapping |
| `review_only` | `review_only` | direct true-to-true mapping |
| `deterministic` | `deterministic` | direct true-to-true mapping |
| `non_executing` | `non_executing` | direct true-to-true mapping |
| `runtime_private_payload_omitted` | `runtime_private_fields_omitted` / source metadata note | preserve omission posture even where local boundary type lacks this exact key |
| `projection_safe` | projection-safe source flag / handoff ref | preserve as adapter-level source flag |
| `no_external_service` | `no_external_service` | direct true-to-true mapping |
| `no_filesystem_write` | `no_file_system_write` where available; boundary note elsewhere | spelling translation only |
| `no_database_storage` | `no_database_storage` | direct where available; boundary note elsewhere |
| `no_persistence_adapter` | `no_persistence_adapter` / `no_persistence_infrastructure` | preserve stricter local boundary |
| `no_file_export_path` | `no_file_export_path` / `no_file_export` | map to local export-path/file-export boundary without creating a path |
| `no_cloud_sync` | `no_cloud_sync` | direct where available; boundary note elsewhere |
| `no_provider_dispatch` | boundary note | preserve as unmatched CGOS no-dispatch boundary |
| `no_channel_dispatch` | boundary note | preserve as unmatched CGOS no-dispatch boundary |
| `no_marketplace` | boundary note | preserve as unmatched CGOS marketplace boundary |
| `no_crm` | `no_crm` | direct true-to-true mapping |
| `no_email_dispatch` | `no_email_dispatch` | direct where available; boundary note elsewhere |
| `no_public_publishing` | `no_public_publishing` / `no_publishing` | map to the stricter available local flag |
| `no_payment` | `no_payment` | direct true-to-true mapping |
| `no_llm_or_tool_invocation` | `no_llm_or_tool_invocation` | direct true-to-true mapping |
| `no_autonomy` | `no_autonomy` | direct true-to-true mapping |
| `no_package_publish` | `no_package_publish` | direct true-to-true mapping |
| `no_certification_or_endorsement` | `no_mplp_certification_or_endorsement` | local no-claim translation only |

Unmatched CGOS flags must be preserved in adapter boundary notes. They must not
be dropped, inverted, or converted into positive capability fields.

SoloCrew-local no-claim flags, including beta, commercial-readiness, and
production-readiness boundaries, remain local additions on adapter output.

## Product Semantic Boundary

Founder-facing names remain SoloCrew-only. Engagement names remain SoloCrew-only.
CGOS must never receive SoloCrew product names, release-line names, persona
terms, or product-specific lifecycle labels. MPLP must not receive SoloCrew
product names as canonical protocol semantics.

The future adapter is the only allowed translation layer:

- upstream input: neutral CGOS operator review loop terms;
- adapter boundary: deterministic mapping and no-claim preservation;
- downstream output: SoloCrew product-local engagement and founder-facing terms;
- protocol posture: MPLP no-change / candidate backlog remains non-normative.

## Dual-Path Proof Requirement

Future implementation must prove:

- existing SoloCrew V3.0 local path still passes unchanged;
- CGOS-backed adapter path produces deterministic equivalent or compatible
  object graph;
- both paths preserve no-claim and no-execution boundaries;
- missing refs remain blocked;
- no raw runtime-private payload appears;
- no MPLP schema/spec/core-law change is implied;
- no CGOS source change is needed during adapter implementation;
- local fixture and release evidence remain intact;
- adapter output remains local-only, manual-first, review-only, deterministic,
  non-executing, and in-memory only.

Suggested proof assertions:

- local V3.0 fixture deep equality remains unchanged before and after adapter
  construction;
- repeated CGOS-backed adapter construction is deterministic;
- CGOS input is not mutated;
- all translated boundary flags are true;
- unmatched CGOS flags appear in boundary notes;
- blocked CGOS input produces blocked SoloCrew candidates;
- forbidden positive capability fields are absent.

## Implementation Scope Proposal

Future implementation should be split into separate owner-authorized slices:

1. Adapter contract implementation:
   - `app/engagement/cgos-projection-safe-adapter-contract.ts`
   - `app/engagement/cgos-projection-safe-adapter-workflow.ts`
   - `tests/app/cgos-projection-safe-adapter-*.test.ts`
2. Fixture bridge:
   - `projection/fixtures/cgos-backed-engagement-loop-fixture.ts`
3. Dual-path E2E:
   - `tests/app/cgos-backed-engagement-loop-dual-path-e2e.test.ts`
4. Tri-repo closure audit:
   - `governance/audits/TRI-REPO-CGOS-HANDOFF-CONSUMPTION-CLOSURE-AUDIT-v0.1.md`

No implementation is performed now.

Future code slice boundaries:

- keep CGOS and MPLP unchanged unless a later owner-authorized task says
  otherwise;
- keep adapter code additive;
- do not rename existing V3.0 local files;
- do not change routes, schemas, registry entries, release tags, or package
  posture;
- do not introduce filesystem/database/persistence/export-path behavior,
  external service behavior, cloud sync, publishing/email/CRM/payment/analytics,
  LLM/tool/agent invocation, dispatch/marketplace behavior, customer accounts,
  conversion automation, or autonomy.

## Stop Conditions

Future implementation must stop if:

- adapter requires CGOS product terms;
- adapter requires MPLP schema/spec/core-law change;
- adapter breaks existing SoloCrew V3.0 local E2E path;
- adapter drops boundary flags;
- adapter exposes raw runtime-private payload;
- adapter introduces execution or autonomy;
- adapter introduces persistence, database storage, filesystem write, or file
  export path behavior;
- adapter implies beta posture, commercial readiness, production readiness,
  protocol certification, or protocol endorsement;
- tests fail.

## Final Decision

`SOLOCREW_CGOS_ADDITIVE_ADAPTER_PLAN_READY_FOR_IMPLEMENTATION`

## Next Allowed Task

`SOLOCREW-CGOS-PROJECTION-SAFE-ADDITIVE-ADAPTER-IMPLEMENTATION-01`
