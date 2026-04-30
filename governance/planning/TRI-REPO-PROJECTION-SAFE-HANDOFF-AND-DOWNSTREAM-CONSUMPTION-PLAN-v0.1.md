# TRI-REPO-PROJECTION-SAFE-HANDOFF-AND-DOWNSTREAM-CONSUMPTION-PLAN-v0.1

## Document Control

- doc_id: TRI-REPO-PROJECTION-SAFE-HANDOFF-AND-DOWNSTREAM-CONSUMPTION-PLAN-v0.1
- task_id: TRI-REPO-PROJECTION-SAFE-HANDOFF-AND-DOWNSTREAM-CONSUMPTION-PLAN-01
- status: handoff / consumption planning only
- date: 2026-04-30
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- source_correction_plan: governance/planning/TRI-REPO-ARCHITECTURE-DRIFT-CORRECTION-PLAN-v0.1.md
- cgos_source_commit: 16d559ab89a7c3f9fffa66da7d31c6d65a6c667f
- mplp_boundary_decision: MPLP-Protocol/governance/backlog/MPLP-DOWNSTREAM-REVIEW-LOOP-EVIDENCE-NO-CHANGE-AND-CANDIDATE-DECISION-v0.1.md
- no_implementation_performed: true
- no_adapter_code_created: true
- no_runtime_source_migration_performed: true
- no_schema_registry_binding_change: true
- no_release_tag_package_performed: true

## Executive Summary

Cognitive_OS now has neutral operator review loop contracts and a
projection-safe handoff fixture. SoloCrew V3.0 remains downstream evidence and
maintenance-only. This plan defines the future projection-safe handoff and the
future downstream adapter / consumption migration path.

No implementation is performed in this wave. SoloCrew V3.0 stable artifacts are
not replaced, rewritten, or re-characterized. Cognitive_OS runtime files are
not modified. MPLP remains no-change / candidate backlog only.

Recommended migration posture: Option B, additive adapter first.

## Cognitive_OS Neutral Surface Inventory

Authoritative Cognitive_OS implementation inspected at
16d559ab89a7c3f9fffa66da7d31c6d65a6c667f:

| Cognitive_OS surface | Available fields / behavior | Safe downstream exposure |
| --- | --- | --- |
| OperatorWorkspace | `workspace_id`, `status`, `session_refs`, `state_snapshot_ref`, `evidence_refs`, `boundary_profile`, `projection_envelope_ref` | workspace/session references and boundary posture |
| OperatorSession | `session_id`, `status`, `workspace_ref`, `review_loop_ref`, `evidence_refs`, `boundary_profile`, `projection_envelope_ref` | session linkage and blocked/review status |
| ReviewLoopState | `loop_state_id`, `status`, `workspace_ref`, `session_ref`, `reviewed_step_refs`, `blocked_step_refs`, `evidence_refs`, `boundary_profile`, `projection_envelope_ref` | review state and step refs only |
| OperatorEntrySurface | `entry_surface_id`, `status`, `workspace_ref`, `session_ref`, `allowed_manual_actions`, `boundary_profile`, `projection_envelope_ref` | neutral manual action posture only |
| ReviewLoopRunner | `runner_id`, `status`, `loop_state_ref`, `step_refs`, `boundary_profile`, `projection_envelope_ref` | non-executing review step posture |
| OperatorReviewPacket | `packet_id`, `status`, `loop_state_ref`, `reviewed_step_refs`, `blocked_step_refs`, `manual_decision_options`, `evidence_refs`, `boundary_profile`, `projection_envelope_ref` | neutral review packet summary |
| SessionEvidenceLedger | `ledger_id`, `status`, `session_ref`, `entry_refs`, `latest_packet_ref`, `latest_bundle_ref`, `boundary_profile`, `projection_envelope_ref` | ledger refs and latest packet / bundle refs |
| DeterministicEvidenceBundle | `bundle_id`, `bundle_kind`, `status`, `ledger_ref`, `packet_ref`, `evidence_refs`, `summary`, `boundary_profile`, `projection_envelope_ref` | deterministic in-memory evidence summary |
| RuntimeBoundaryProfile | local/manual/review/determinism/non-execution flags plus external-service, storage, dispatch, publishing, payment, invocation, autonomy, and package boundaries | direct downstream no-claim and boundary posture |
| LocalReviewLoopResult | full composed neutral result with workspace, session, loop state, runner, packet, ledger, bundle, handoff, and boundary profile | future adapter input |

Observed implementation guarantees:

- deterministic constructors sort refs and do not mutate caller input;
- missing required refs produce `blocked` posture, not execution;
- projection handoff uses `ProjectionSafeEnvelope`;
- handoff includes safe evidence refs, omission markers, module/duty posture,
  protocol/binding/runtime version refs, state/snapshot posture refs,
  transaction/export posture refs, and error/insufficiency posture refs;
- raw runtime-private payload is omitted;
- `createOperatorReviewLoopHandoffFixture` delegates to
  `createLocalReviewLoopResult`;
- tests prove boundary flags, determinism, blocked paths, fixture composition,
  forbidden field absence, and projection-safe envelope presence.

Runtime-private / omitted posture:

- source runtime object refs are references only;
- raw payload fields remain omitted;
- storage, route, dispatch, publishing, payment, account, invocation, autonomy,
  package, and assurance claims remain boundary-only or absent;
- module/duty posture text is neutralized before handoff exposure.

## SoloCrew Current Local Surface Inventory

SoloCrew V3.0 local surface inspected at
41a3ef8e1c4f74da716908828f023bf0ebbfebf9:

| SoloCrew surface | Current role | Product-local fields that must stay downstream |
| --- | --- | --- |
| EngagementWorkspace | local workspace/session/loop/history root | `engagement_ref`, participant refs, stage, commercial mode, V3.0 metadata |
| EngagementSession | local session object | operator ref, stage, source metadata, product boundary flags |
| EngagementLoopState | product loop state refs | readiness, onboarding, review gate, outcome, support burden refs |
| EngagementEntrySurface | create/load/review local entry model | create/load modes, product action copy, workspace bundle shape |
| EngagementLoopRunner | review-only local runner | product step kinds, run result, workspace bundle linkage |
| FounderReviewPacket | founder-facing packet | founder-facing section ids, decision option labels, product-local copy |
| EngagementHistoryLedger | local session history ledger | product history entry kinds and latest loop/packet refs |
| EngagementSessionExportPackage | deterministic in-memory export object | product export kind, product summary, source metadata |
| V3.0 deliverable loop fixture | E2E release evidence | V3.0 fixture IDs and release-evidence semantics |

Maintenance posture:

- V3.0 stable artifacts remain release evidence;
- no V3.1 planning is opened by this plan;
- no SoloCrew app/engagement behavior changes in this wave;
- any future adapter must be additive until dual-path evidence proves safety.

## Mapping Matrix

| Cognitive_OS neutral object | SoloCrew local object | Handoff direction | Future adapter responsibility | Migration risk |
| --- | --- | --- | --- | --- |
| OperatorWorkspace | EngagementWorkspace | CGOS -> SoloCrew adapter | map neutral workspace refs into product workspace | medium |
| OperatorSession | EngagementSession | CGOS -> SoloCrew adapter | map session refs/status | medium |
| ReviewLoopState | EngagementLoopState | CGOS -> SoloCrew adapter | map loop state and step refs | medium |
| OperatorEntrySurface | EngagementEntrySurface | optional | likely product-local surface keeps UI semantics | low |
| ReviewLoopRunner | EngagementLoopRunner | CGOS -> SoloCrew adapter | consume review loop posture | medium |
| OperatorReviewPacket | FounderReviewPacket | CGOS -> SoloCrew adapter | map neutral packet into founder-facing packet | high product semantic boundary |
| SessionEvidenceLedger | EngagementHistoryLedger | CGOS -> SoloCrew adapter | map ledger refs | medium |
| DeterministicEvidenceBundle | EngagementSessionExportPackage | CGOS -> SoloCrew adapter | map in-memory evidence bundle | medium |
| RuntimeBoundaryProfile | boundary_flags | direct consumption | preserve no-claim envelope | low |
| LocalReviewLoopResult | deliverable loop result | projection-safe handoff input | compose downstream evidence | medium |

Mapping principles:

- Cognitive_OS terms stay neutral and upstream.
- SoloCrew product vocabulary stays downstream in adapter code only.
- Product-local release metadata remains SoloCrew-local.
- Boundary flags should be consumed directly where compatible, with adapter
  translation only for naming differences such as publishing and filesystem
  spellings.
- Founder-facing packet semantics must not leak upstream.

## Projection-Safe Handoff Contract Target

Future target:

`Cognitive_OS LocalReviewLoopResult -> projection-safe envelope -> SoloCrew additive adapter -> SoloCrew product-local engagement objects`

Required handoff payload:

- CGOS `LocalReviewLoopResult`;
- projection-safe envelope;
- runtime boundary profile;
- safe evidence refs;
- omission markers;
- state/snapshot posture refs;
- transaction/export posture refs;
- error/insufficiency posture refs;
- module/duty posture refs;
- protocol/binding/runtime version refs;
- no raw runtime-private payload.

Safe downstream consumption rules:

- consume refs and summaries only;
- preserve `non_executing` and `runtime_private_fields_omitted`;
- preserve blocked posture when required refs are missing;
- do not infer provider dispatch, channel dispatch, persistence, storage,
  publishing, payment, account, invocation, autonomy, or package readiness;
- do not treat module/duty posture as MPLP schema or protocol law.

## Downstream Adapter Strategy

The future SoloCrew adapter should be additive first:

- keep existing SoloCrew V3.0 stable artifacts unchanged;
- keep existing local V3.0 constructors as release evidence;
- create a later adapter plan before any code;
- map CGOS neutral result to SoloCrew product-local objects in a downstream
  adapter layer;
- preserve both local V3.0 path and CGOS-backed projection-safe path during
  proof;
- prevent founder, Engagement, release-line, or other product terms from
  appearing in Cognitive_OS canonical names;
- avoid MPLP changes.

Adapter responsibilities:

- translate neutral refs to SoloCrew refs;
- translate CGOS `RuntimeBoundaryProfile` to SoloCrew `boundary_flags`;
- map `OperatorReviewPacket` into founder-facing packet sections only inside
  SoloCrew;
- map `DeterministicEvidenceBundle` into the existing in-memory export object
  shape;
- preserve deterministic ordering and no-input-mutation behavior;
- preserve blocked behavior for missing refs;
- surface source metadata as SoloCrew-local metadata, not CGOS metadata.

## Migration Options

| Option | Description | Pros | Cons | Recommendation |
| --- | --- | --- | --- | --- |
| A | no migration; keep V3.0 as downstream evidence only | lowest risk; preserves release evidence | does not prove consumption of the upstream neutral surface | not first active correction step |
| B | additive adapter consuming CGOS neutral fixture while preserving existing V3.0 local contracts | proves handoff safely; avoids rewriting stable artifacts; supports dual-path tests | requires careful mapping and boundary tests | recommended first |
| C | gradual replacement of SoloCrew local constructors behind stable adapter | can reduce duplicate substrate over time | higher regression risk; requires broad E2E coverage | later only after Option B proof |
| D | full migration to CGOS contracts | maximizes upstream consumption | highest risk; may obscure V3.0 evidence and product-local semantics | not recommended now |

Selected recommendation:

`Option B: additive adapter consuming CGOS neutral fixture while preserving existing V3.0 local contracts.`

## Required Future Implementation Slices

If Option B is owner-authorized:

1. SoloCrew adapter contract planning.
2. SoloCrew additive projection adapter implementation.
3. E2E dual-path proof: local V3.0 path and CGOS-backed projection-safe path.
4. Tri-repo closure audit.
5. Decide whether deeper migration is needed only after dual-path evidence.

Future adapter tests should prove:

- local V3.0 fixture remains unchanged;
- CGOS-backed adapter output is deterministic;
- boundary flags remain true;
- missing refs remain blocked;
- no raw runtime-private payload appears;
- no upstream product-semantic leakage appears;
- no MPLP schema/spec/core-law change is implied.

## MPLP Boundary Recheck

The MPLP no-change / candidate backlog decision remains adequate after the
Cognitive_OS implementation.

Confirmed posture:

- no schema change;
- no spec change;
- no core-law change;
- no formal certification or endorsement claim;
- downstream evidence remains non-normative;
- candidate backlog remains sufficient for future guidance questions;
- no SoloCrew product semantics should become MPLP canonical semantics.

No MPLP document change is required in this wave.

## Stop Conditions

Stop later planning or implementation if:

- Cognitive_OS changed files contain downstream product terms;
- SoloCrew adapter requires upstream product semantics;
- MPLP normative change becomes necessary;
- raw runtime-private payload appears;
- existing V3.0 release evidence breaks;
- adapter implies commercial/product readiness;
- beta posture or production readiness is implied;
- tests fail;
- release, tag, package, or package asset work becomes necessary.

## Final Decision

`TRI_REPO_HANDOFF_PLAN_READY_FOR_ADDITIVE_SOLOCREW_ADAPTER_PLANNING`

## Next Allowed Task

`SOLOCREW-CGOS-PROJECTION-SAFE-ADAPTER-PLANNING-01`
