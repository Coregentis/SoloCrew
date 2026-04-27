# SOLOCREW-CGOS-UPSTREAM-CONSUMPTION-DRIFT-AUDIT-v0.1

## 1. Document Control

- doc_id: SOLOCREW-CGOS-UPSTREAM-CONSUMPTION-DRIFT-AUDIT-v0.1
- task_id: SOLOCREW-CGOS-UPSTREAM-CONSUMPTION-DRIFT-AUDIT-01
- status: CGOS Upstream Consumption Drift Audit
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- primary_repo: SoloCrew
- supporting_repos_inspected_only:
  - Cognitive_OS
  - MPLP-Protocol
- audit_posture: audit-only; no V2.2 implementation, release, tag, package, Cognitive_OS change, or MPLP change
- trace_tags:
  - solocrew/v2_2-paused
  - cgos-consumption
  - upstream-drift
  - projection-safe
  - tri-repo-boundary

## 2. Remote Truth Snapshot

| Repo | URL | Branch | Local HEAD | origin/main HEAD | Worktree | Relevant tags |
| --- | --- | --- | --- | --- | --- | --- |
| SoloCrew | https://github.com/Coregentis/SoloCrew.git | main | 72a9f79054051527b9a28aa7c4435bf80d148d94 | 72a9f79054051527b9a28aa7c4435bf80d148d94 | clean before audit edits | solocrew-v2.1-rc-review-only-chain-20260427; solocrew-v2.0-stable-first-runnable-aigc-20260426 |
| Cognitive_OS | https://github.com/Coregentis/Cognitive_OS.git | main | ec681a4d77368b71c1cc76964618f3151038861b | ec681a4d77368b71c1cc76964618f3151038861b | clean | cgos-projection-revision-runtime-rc-20260421 |
| MPLP-Protocol | https://github.com/Coregentis/MPLP-Protocol.git | main | 0cf0477938340a443614d03d9fb51ac764b960c7 | 0cf0477938340a443614d03d9fb51ac764b960c7 | clean | protocol-v1.0.0; v1.0.0 |

Authoritative Cognitive_OS inputs inspected:

- `governance/baselines/CGOS-CURRENT-ARCHITECTURE-BASELINE-v0.1.md`
- `governance/handoffs/CGOS-SOLOCREW-V2.2-CONSUMPTION-HANDOFF-v0.1.md`
- `handoffs/solocrew-v2.2-cgos-consumption-handoff.v0.yaml`
- runtime posture, envelope, state/snapshot, transaction/export, error/insufficiency, binding-consumption, default posture, downstream handoff fixture, and strict E2E test files

## 3. Executive Verdict

Existing SoloCrew does not appear to be in direct conflict with the latest Cognitive_OS baseline. The V2.1 review-only chain is mostly product-local and explicitly marks itself as non-executing, product projection only, not MPLP object truth, and not Cognitive_OS runtime law.

However, SoloCrew is not yet ready to start `SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY-WITH-CGOS-CONSUMPTION` without a remap. The V2.2 plan and runtime-session bridge still describe older sealed V2.0 compatibility surfaces and do not yet incorporate the latest Cognitive_OS current architecture baseline, strict E2E convergence, projection-safe runtime envelope, module/duty posture, state/snapshot posture, transaction/export posture, error/insufficiency posture, or downstream handoff fixture as the required IMPL-01 consumption frame.

Final audit decision:

SOLOCREW_CGOS_CONSUMPTION_AUDIT_PASS_WITH_REMAP_REQUIRED_BEFORE_IMPL_01

IMPL-01 can start only after the implementation task scope is remapped to the latest CGOS consumption baseline. The remap can happen inside the IMPL-01 task opening criteria; no Cognitive_OS or MPLP change is required.

## 4. Scope and Non-Goals

In scope:

- Existing SoloCrew upstream consumption assumptions.
- Runtime session bridge compatibility posture.
- V2.1 projection assembly chain boundary posture.
- V2.2 plan drift against the latest Cognitive_OS current architecture baseline and handoff.
- Conflict search for local redefinition of CGOS-owned law.
- Remapping requirements for IMPL-01.

Non-goals:

- No workspace/session continuity implementation.
- No review packet export implementation.
- No dashboard continuation implementation.
- No Cognitive_OS modification.
- No MPLP-Protocol modification.
- No provider dispatch, channel dispatch, marketplace, autonomous execution, release, tag, package, V2.2 completion claim, paid-product readiness claim, MPLP certification, or MPLP endorsement.

## 5. Current SoloCrew Upstream Consumption Inventory

| File or surface | Current upstream consumption posture | Classification | Blocking | Required action |
| --- | --- | --- | --- | --- |
| `runtime-imports/cognitive-runtime.ts` | Imports older bounded CGOS lifecycle/state/store/projection-types/learning/action-dispatcher surfaces; comments identify this as sealed V2.0 runtime-session compatibility and not a product projection API | stale_but_non_blocking | no | Preserve as legacy bridge; do not extend for V2.2 posture handoff |
| `app/shell/runtime-session-facade.ts` | Lists sealed V2.0 compatibility surfaces and boundary flags; says projection API false and product DTO source false | stale_and_requires_remap_before_IMPL_01 | yes | IMPL-01 needs a new CGOS consumption adapter beside it, not a rewrite of this bridge |
| `app/shell/create-runtime-session.ts` / `load-runtime-session.ts` | Creates memory/sqlite sessions using legacy imported CGOS stores and glue | stale_but_non_blocking | no | Keep for compatibility and sqlite continuity; workspace layer should store CGOS posture refs separately |
| `tests/app/sqlite-roundtrip.test.ts` | Verifies legacy sqlite runtime continuity and preference persistence | current_and_compatible | no | Keep as regression test; add V2.2 workspace history/posture tests later |
| `tests/app/return-and-continue.test.ts` | Verifies baseline shell reload/continuity over old session object | current_and_compatible | no | Keep as legacy return-and-continue test; do not treat as CGOS handoff proof |
| `projection/fixtures/starter-cell-fixtures.ts` | Imports CGOS projection types for product fixture projections and labels them compatibility fixtures, not constitutional Cell kinds | product_local_and_allowed | no | Reuse product labels; V2.2 fixture must add CGOS posture refs without redefining module/duty law |
| `app/shell/create-v2-founder-dashboard-page-model.ts` | Product dashboard page model over runtime readiness projections; uses omission/non-execution flags | product_local_and_allowed | no | Later dashboard continuation must consume CGOS state/snapshot and envelope refs |
| V2.1 SecretaryRoutingProposal | Product routing proposal; no runtime/protocol authority; no management directive created | product_local_and_allowed | no | Later workspace journey can reference it as product artifact |
| V2.1 ManagementDirective | Product projection handoff preview; explicitly non-executing and `cognitive_os_runtime_law: false` | product_local_and_allowed | no | Later review packet/export should add CGOS posture refs |
| V2.1 CellCEOAssemblyPlanPreview | Review-only asset category preview; no workers, queues, runtime execution, provider/channel invocation | product_local_and_allowed | no | Later packet should preserve boundary flags and consume CGOS evidence/omission refs |
| V2.1 ProjectGovernanceAssetFamilyMapping | Product asset-family mapping only; no project import, code analysis, drift detection, architecture review execution, release governance, or evidence pack generation | product_local_and_allowed | no | Later V2.2 journey may wrap it but must not turn member mapping into CGOS binding semantics |
| `projection/assembly/secretary-handoff-review-packet.ts` | Review packet projection with upward runtime/protocol authority forbidden and non-claims | current_and_compatible | no | Future V2.2 export must consume CGOS object/export binding, evidence, omission, version, state, transaction, and error posture |
| `projection/contracts/projection-object-types.ts` | Generic `ProjectionUpstreamRef` with `source_repo: "Cognitive_OS"`; does not define CGOS law | current_and_compatible | no | Can remain generic; V2.2 adapter should use latest handoff shape for posture refs |
| artifact/action/learning stores | Product-local file stores with deterministic sorting/temp rename and omission/non-execution flags | product_local_and_allowed | no | Workspace store can reuse patterns; must add CGOS posture refs and snapshot consistency |
| `governance/planning/SOLOCREW-V2.2-FIRST-USABLE-PRIVATE-ALPHA-PLAN-v0.1.md` | Accurate V2.2 product direction, but upstream dependency section predates latest CGOS baseline and names the first slice without CGOS consumption suffix | stale_and_requires_remap_before_IMPL_01 | yes | Treat this audit as the remap/superseding constraint for IMPL-01 |
| `governance/research/TRI-REPO-KERNEL-DUTY-COVERAGE-AUDIT-FOR-SOLOCREW-V2.2-v0.1.md` | Correctly requires explicit KD mapping; predates CGOS strict E2E convergence | stale_but_non_blocking | no | Keep as historical audit; IMPL-01 should use latest CGOS handoff plus this audit |
| `governance/contracts/SOLOCREW-RUNTIME-CONSUMPTION-CONTRACT-v0.1.md` | Older consumption contract lists pre-posture runtime surfaces and absent full VSL/AEL/PSG | stale_but_non_blocking | no | Do not use as current V2.2 posture SSOT; current SSOT is CGOS handoff/current baseline |

## 6. Runtime Session Bridge Audit

Files inspected:

- `runtime-imports/cognitive-runtime.ts`
- `app/shell/runtime-session-facade.ts`
- `app/shell/create-runtime-session.ts`
- `app/shell/load-runtime-session.ts`
- `tests/app/sqlite-roundtrip.test.ts`
- `tests/app/return-and-continue.test.ts`

Findings:

- The runtime session facade still points to old sealed V2.0 compatibility surfaces. This is explicit: `SOLOCREW_RUNTIME_SESSION_FACADE_BOUNDARY.bridge_scope` is `sealed_v2_0_runtime_session_compatibility`, while `projection_api` and `product_dto_source` are false.
- The bridge does not conflict with latest CGOS posture because it does not claim to be a projection-safe runtime envelope, module posture, Kernel Duty posture, state/snapshot posture, transaction/export posture, error/insufficiency posture, or product DTO source.
- The bridge can remain as a legacy compatibility layer for existing baseline shell and sqlite tests.
- IMPL-01 should introduce a new narrow SoloCrew CGOS consumption adapter beside the legacy bridge. The adapter should consume serialized CGOS-compatible handoff data and posture refs/summaries, not copy or rebuild CGOS builders.
- Old names/comments do not need to be rewritten in this audit, but future IMPL-01 should clearly label the bridge as legacy compatibility and the new adapter as the V2.2 CGOS posture consumption path.

Runtime bridge decision: stale_but_non_blocking for current tests; stale_and_requires_remap_before_IMPL_01 for V2.2 implementation scope.

## 7. Projection Assembly Audit

Files inspected:

- `projection/assembly/secretary-routing-proposal.ts`
- `projection/assembly/management-directive.ts`
- `projection/assembly/cell-ceo-assembly-plan-preview.ts`
- `projection/assembly/project-governance-asset-family-mapping.ts`
- `projection/assembly/secretary-handoff-review-packet.ts`
- related contracts and page model tests

Findings:

- These surfaces do not define upstream runtime/protocol law. The V2.1 chain repeatedly marks outputs as product projection only, review-only, non-executing, no dispatch, no autonomous execution, marketplace not involved, and runtime-private fields omitted.
- These surfaces do not define object/export binding semantics. Asset-family mapping is SoloCrew vocabulary and planning-use mapping, not CGOS object binding or MPLP protocol binding.
- These surfaces do not define module posture or Kernel Duty posture. They use local product flags and notes but do not claim to own Context, Plan, Confirm, Trace, Core, State Sync, Transaction, Security omission, Observability evidence, or Protocol Versioning posture.
- The chain is pure SoloCrew product projection and can be reused for V2.2 Developer Company / Project Governance journey.
- Later V2.2 outputs must consume CGOS posture refs:
  - SecretaryRoutingProposal: safe evidence refs and module/duty summary refs if stored in workspace history.
  - ManagementDirective: Confirm/Plan/Trace/Core posture refs and KD-02/KD-05/KD-08/KD-09/KD-11 refs when packet/export preparation begins.
  - CellCEOAssemblyPlanPreview: omission markers and no-dispatch/no-marketplace continuation posture.
  - ProjectGovernanceAssetFamilyMapping: object/export binding posture refs must come from CGOS, not from member-to-asset mapping.
  - Secretary handoff review packet: future review packet export should include CGOS projection-safe envelope refs, state/snapshot posture refs, transaction/export posture refs, error/insufficiency posture refs, safe evidence refs, omission markers, and version refs.

Projection assembly decision: current_and_compatible / product_local_and_allowed.

## 8. V2.2 Plan Drift Audit

The V2.2 plan remains valid as a product scope document, but it is stale as an upstream consumption implementation map.

Drift findings:

| Plan area | Current text / assumption | Drift against latest CGOS | Required adjustment |
| --- | --- | --- | --- |
| `Cognitive_OS changes required now: none` | Still materially true for upstream code changes | Incomplete because latest CGOS handoff/E2E baseline now must be consumed explicitly | Keep "no CGOS code change required", but add "CGOS posture consumption adapter required in SoloCrew" |
| sealed runtime-session bridge | Plan says existing projection-safe surfaces are available through sealed runtime-session bridge | Latest CGOS posture stack is not exposed by this bridge | Do not use sealed bridge as V2.2 posture source; add new `app/cgos/*` adapter |
| workspace/history model | Product-local workspace fields are sound | Missing latest CGOS required posture refs: envelope, state/snapshot, transaction/export, error/insufficiency, module/duty, object/export binding, version refs | IMPL-01 workspace contract must include these consumed refs/summaries |
| review packet export boundary | Boundary is correct | Must now consume CGOS object/export binding, evidence, omission, protocol/binding version, transaction/export, and error posture | Defer implementation but update IMPL-02 acceptance |
| founder dashboard continuation | Product-local dashboard remains allowed | Must consume state/snapshot and error/insufficiency posture rather than inventing continuity law | Defer implementation but preserve required posture refs in workspace model |
| first implementation slice | Names `SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY` | Latest authorized task name includes `WITH-CGOS-CONSUMPTION` | Use `SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY-WITH-CGOS-CONSUMPTION` |

Plan note decision:

- No direct plan rewrite is required in this audit.
- This audit supersedes the stale implementation constraints in the V2.2 plan.
- Future IMPL-01 must cite this audit plus the CGOS current architecture baseline and handoff manifest.

## 9. Conflict Audit

| Keyword / semantic area | Positive hit context | Classification | Blocking | Required action |
| --- | --- | --- | --- | --- |
| `Cognitive_OS` / `CGOS` | README, CHANGELOG, governance, runtime imports, tests, historical planning | mostly boundary/context references | no | Use latest CGOS baseline/handoff as IMPL-01 SSOT |
| `projection-safe` | adapters, docs, tests, handoffs | compatible safety posture references | no | Continue; V2.2 must use latest envelope/handoff shape |
| `module posture` / `kernel duty posture` | mostly absent in product code; new CGOS docs mention required posture | missing required V2.2 consumption | yes for IMPL-01 scope | Add adapter/workspace contract acceptance checks in IMPL-01 |
| `Context law`, `Plan law`, `Confirm law`, `Trace law`, `Core law` | CGOS handoff/governance terms, not product code law | no conflict | no | Negative leakage checks required in IMPL-01 |
| `State Sync law`, `Transaction law`, `Security omission law`, `Observability evidence law`, `Protocol versioning posture` | governance/handoff terms; existing stores imply local persistence only | stale/remap needed | yes for IMPL-01 scope | Store only CGOS posture refs/summaries; no local law definitions |
| `Object/export binding semantics` | CGOS handoff/governance terms, not SoloCrew binding implementation | no conflict now | no | IMPL-01/02 must consume CGOS binding posture, not asset-family mappings |
| `runtime_private_fields_omitted` | widespread product safety flag in code/tests/docs | current_and_compatible | no | Keep; later pair with CGOS omission markers |
| `non_executing` | widespread boundary marker | current_and_compatible | no | Keep; validate in workspace and history |
| `provider dispatch` / `channel dispatch` | mostly negative boundary text and tests | non-blocking | no | Keep grep/test checks |
| `marketplace implemented` | forbidden phrase in tests/governance | non-blocking | no | Keep negative checks |
| `autonomous execution` | negative boundary text/tests | non-blocking | no | Keep negative checks |
| `review packet export` | V2.2 plan promises later export; current V2.1 review packet projection exists | partial and future scoped | no for IMPL-01 | Do not implement in IMPL-01; preserve future CGOS posture requirements |
| `paid product ready`, `V2.2 complete`, `V3.0 released` | negative/forbidden contexts or absent | no conflict | no | Continue no-claim checks |
| `MPLP certification` / `MPLP endorsement` | release and boundary documents as exclusions | no conflict | no | Continue no-claim checks |

Conflict conclusion:

No product code currently redefines CGOS-owned runtime/protocol law. The blocking issue is scope drift: V2.2 implementation must be remapped to the latest CGOS consumption posture before coding starts.

## 10. Remapping Table For IMPL-01

| SoloCrew surface | Current behavior | Latest CGOS-owned source of truth | Allowed SoloCrew responsibility | Required remap | Blocking before IMPL-01 |
| --- | --- | --- | --- | --- | --- |
| runtime-session-facade | Legacy sealed V2.0 compatibility list and boundary flags | CGOS current architecture baseline and handoff for V2.2 posture | Keep legacy sqlite/session compatibility | Do not extend as posture adapter; label as legacy in implementation comments/tests if touched | yes |
| runtime session create/load | Creates memory/sqlite runtime sessions from older imported stores | CGOS state/snapshot and projection-safe envelope posture for V2.2 continuation | Use sqlite session as one storage backing only | Workspace must store consumed CGOS refs/summaries separately | yes |
| workspace contract planned | Not implemented | `projection-safe-envelope.ts`, module/duty posture, state/snapshot, transaction/export, error/insufficiency, handoff manifest | Product workspace id, label, vertical, storage paths, active journey, latest step, next action | Add `cgos_consumption` shape with required module names and KD ids | yes |
| workspace store planned | Not implemented | CGOS omission/version/evidence posture rules | Deterministic file-backed product persistence | Store safe refs/summaries only; atomic write; no raw runtime-private payload | yes |
| workspace workflow planned | Not implemented | CGOS downstream handoff fixture and posture refs | Product-local create/list/load/save/restore flow | Attach CGOS consumption posture and user-safe continuation summary | yes |
| workspace history planned | Product plan only | CGOS evidence refs, omission markers, KD-05/KD-10/KD-11 posture | Product-local ordered history display | History events must include safe refs, omission markers, non-executing, runtime-private omitted, version refs when relevant | yes |
| review packet export later | V2.1 review packet projection exists; V2.2 export not implemented | CGOS object/export binding, Trace/Confirm/Plan/Core posture, KD-02/KD-05/KD-08/KD-09/KD-11 | Human-readable packet rendering | Defer; require CGOS posture refs and deterministic snapshot boundary in IMPL-02 | no for IMPL-01 |
| founder dashboard continuation later | V2 dashboard exists without V2.2 workspace continuation | CGOS state/snapshot and error/insufficiency posture | Product dashboard layout/copy | Defer; workspace model should preserve continuation refs for later dashboard | no for IMPL-01 |
| V2.1 projection assembly chain | Review-only product projections | CGOS posture is upstream and separate | Product journey artifacts | Reuse chain; wrap outputs with CGOS posture refs in workspace history later | no |
| artifact/action/learning stores | Product-local stores with deterministic writes and safety flags | CGOS projection-safe posture only when displayed/exported | Product-local artifact/action/learning continuity | Reuse store patterns; do not turn them into State Sync/Transaction law | no |

## 11. Required Adjustments Before IMPL-01

1. IMPL-01 task opening must use the exact task name:

   `SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY-WITH-CGOS-CONSUMPTION`

2. IMPL-01 must add a narrow SoloCrew CGOS consumption adapter, likely:

   `app/cgos/cgos-projection-safe-consumption-contract.ts`

   The adapter may mirror the minimum serialized handoff shape, but must name Cognitive_OS as the source of truth and must not reimplement CGOS builders, binding rules, module semantics, Kernel Duty semantics, state-sync law, transaction law, security omission law, observability evidence law, or protocol versioning posture.

3. IMPL-01 workspace contract must include:

   - `projection_safe_runtime_envelope_ref`
   - `module_posture_summary`
   - `kernel_duty_posture_summary`
   - `object_export_binding_posture_refs`
   - `safe_evidence_refs`
   - `omission_markers`
   - `protocol_version_refs`
   - `binding_version_refs`
   - `state_snapshot_posture_ref`
   - `transaction_export_posture_ref`
   - `error_insufficiency_posture_ref`
   - `runtime_private_fields_omitted: true`
   - `non_executing: true`

4. IMPL-01 acceptance tests must require module postures:

   - Context
   - Core
   - Trace
   - Plan
   - Confirm

5. IMPL-01 acceptance tests must require Kernel Duties:

   - KD-02
   - KD-05
   - KD-08
   - KD-09
   - KD-10
   - KD-11

6. IMPL-01 must preserve review packet export and dashboard continuation as later slices, except for minimal data hooks needed to prove workspace continuity.

7. IMPL-01 must include negative checks for:

   - no Context/Plan/Confirm/Trace/Core law in SoloCrew;
   - no State Sync/Transaction/Security omission/Observability evidence/Protocol Versioning law in SoloCrew;
   - no object/export binding semantics in SoloCrew;
   - no provider dispatch, channel dispatch, marketplace implementation, autonomous execution, MPLP certification, MPLP endorsement, paid-product readiness, V2.2 completion, or V3.0 release claim.

## 12. Explicit No Cognitive_OS Change Statement

This audit recommends no Cognitive_OS code or governance change before SoloCrew IMPL-01. Cognitive_OS already provides the current architecture baseline, posture contracts, projection-safe envelope, posture helpers, downstream handoff fixture, SoloCrew handoff manifest, and strict E2E convergence needed for SoloCrew to consume.

SoloCrew must consume those upstream surfaces instead of redefining them.

## 13. Explicit No MPLP Change Statement

This audit recommends no MPLP schema, taxonomy, protocol, release, guide, certification, or endorsement change.

MPLP remains the upstream protocol authority. SoloCrew must not promote product behavior, workspace continuity, review packet export, or dashboard continuation into MPLP law.

## 14. Explicit No Implementation Statement

This audit did not implement SoloCrew V2.2 workspace/session continuity, review packet export, founder dashboard continuation, provider dispatch, channel dispatch, marketplace, autonomous execution, release, tag, package, paid-product readiness, or V2.2 completion.

Only this audit document is added.

## 15. Final Decision

SOLOCREW_CGOS_CONSUMPTION_AUDIT_PASS_WITH_REMAP_REQUIRED_BEFORE_IMPL_01

IMPL-01 may start after its scope is remapped to the latest Cognitive_OS consumption baseline and owner authorization opens implementation. The expected next implementation wave remains:

`SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY-WITH-CGOS-CONSUMPTION`

The required remap is in SoloCrew only. Cognitive_OS and MPLP are not blockers.
