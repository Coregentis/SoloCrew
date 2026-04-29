# SOLOCREW-V3.0-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-v0.1

## Document Control

- doc_id: SOLOCREW-V3.0-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-v0.1
- task_id: SOLOCREW-V3.0-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-01
- status: implementation readiness / planning only
- date: 2026-04-30
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- repo: https://github.com/Coregentis/SoloCrew.git
- branch: main
- starting_head: 1f183fd496a809eed761e8d042c66df60c2cc443
- source_baseline_refs:
  - `governance/planning/SOLOCREW-V3.0-DELIVERABLE-ENGAGEMENT-OPERATING-LOOP-PLANNING-v0.1.md`
  - `governance/releases/SOLOCREW-V2.5-POST-STABLE-VERIFICATION-MAINTENANCE-GATE-v0.1.md`
  - `governance/releases/SOLOCREW-V2.5-STABLE-PREP-SEAL-AND-CONDITIONAL-RELEASE-RECORD-v0.1.md`
  - `governance/audits/SOLOCREW-V2.5-SEMANTIC-STABILIZATION-CLOSURE-AUDIT-v0.1.md`
  - `README.md`
  - `CHANGELOG.md`
  - `app/engagement/*`
  - `tests/app/engagement-*.test.ts`

Remote truth consumed before this implementation-readiness record:

| Item | Expected / observed | Result |
| --- | --- | --- |
| SoloCrew local HEAD | 1f183fd496a809eed761e8d042c66df60c2cc443 | pass |
| SoloCrew origin/main | 1f183fd496a809eed761e8d042c66df60c2cc443 | pass |
| SoloCrew worktree | clean before this record | pass |
| V2.5 stable tag | solocrew-v2.5-stable-semantic-stabilization-20260429 -> 4061f0df0cf6e5f151563c11ac94e27dabbd23b8 | preserved |
| V2.5 RC tag | solocrew-v2.5-rc-semantic-stabilization-20260429 -> f98b29a9ab20bb02e9928f844d4fb1f761ba2031 | preserved |
| V2.4 stable tag | solocrew-v2.4-stable-commercialization-readiness-loop-20260428 -> 12d7ccb00506670992b798d82aa81fbc0f5578f6 | preserved |
| V2.4 RC tag | solocrew-v2.4-rc-commercialization-readiness-loop-20260428 -> ea882d590b1b59c5b9ce703869fdd7abe66ff77d | preserved |
| V2.3 stable tag | solocrew-v2.3-stable-first-paid-pilot-loop-20260428 -> c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | preserved |
| Cognitive_OS inspected HEAD | ec681a4d77368b71c1cc76964618f3151038861b | inspected only |
| MPLP-Protocol inspected HEAD | 0cf0477938340a443614d03d9fb51ac764b960c7 | inspected only |

This record creates no runtime behavior, source behavior, test behavior,
release, tag, package, package asset, public/private beta claim,
paid/commercial/production readiness claim, V3.0 release claim, MPLP
certification claim, or MPLP endorsement claim.

## Executive Summary

V3.0 implementation readiness is prepared after the V2.5 stable closure and
the accepted V3.0 Deliverable Engagement Operating Loop planning record. This
readiness record converts the planning thesis into a bounded implementation
entry condition, a final slice order, and a detailed IMPL-01 scope.

This is not implementation. It is not a V3.0 release, release candidate, tag,
package, package publish, public beta, private beta, paid product readiness,
commercial readiness, or production-ready line. It does not modify
Cognitive_OS or MPLP-Protocol. It does not add payment, checkout,
subscription, automated billing, CRM/email automation, public publishing,
testimonial/public-case-study publishing, external analytics,
LLM/model/agent/tool invocation, SaaS sharing, customer account provisioning,
automatic conversion, provider/channel dispatch, marketplace, or autonomous
execution.

## V3.0 Planning Baseline Consumed

The accepted V3.0 planning baseline defines V3.0 as the First Deliverable
Engagement Operating Loop:

- founder-usable local Engagement Operating Loop over real local engagement
  records.
- not merely tests, fixtures, or governance prose.
- local-only, manual-first, review-only, deterministic, and non-executing.
- no SaaS, public/private beta, autonomous execution, payment, CRM,
  publishing, analytics, LLM/model/agent/tool invocation, dispatch,
  marketplace, customer account, or automatic conversion scope.
- no paid product readiness, commercial readiness, production-ready status,
  MPLP certification, or MPLP endorsement claim.

True delivery criteria consumed:

- founder-usable entry point.
- create/load engagement records path for non-fixture local records.
- local engagement loop runs end-to-end in review-only mode.
- founder review packet is generated.
- session/history is preserved or exported as repeatable local state.
- clear operator runbook.
- no hidden dependence on test fixtures.
- no mandatory developer-only workflow.
- no-claim boundaries and V2.5 maintenance boundary preserved.

Six-slice implementation order consumed:

1. V3.0 IMPL-01 Engagement Record and Local Workspace Contract.
2. V3.0 IMPL-02 Founder-Usable Entry / Load / Create Surface.
3. V3.0 IMPL-03 Local Engagement Loop Runner, Review-Only.
4. V3.0 IMPL-04 Founder Review Packet Output.
5. V3.0 IMPL-05 Local Session / History Persistence or Export.
6. V3.0 E2E Deliverable Loop Hardening and RC Readiness Audit.

Architecture posture consumed:

- V3.0 remains SoloCrew-local by default.
- No Cognitive_OS change is authorized now.
- No MPLP-Protocol change is authorized now.
- Any future upstream need must be separately justified as neutral runtime or
  projection capability, not as a SoloCrew product shortcut.

## Implementation Readiness Decision

SOLOCREW_V3_0_IMPLEMENTATION_READINESS_PASS_WITH_SCOPE_GUARDS

Rationale:

- V2.5 is stable closed and maintenance-only.
- V2.5 compatibility aliases and remaining compatibility debt are accepted and
  bounded.
- V3.0 planning has passed and gives a coherent local product delivery line.
- The repo is ready to begin V3.0 IMPL-01 only within the scope guards in this
  record.
- V3.0 implementation is not performed by this readiness record.
- Cognitive_OS and MPLP-Protocol changes remain unauthorized.

Scope guards:

- IMPL-01 may add product-local contracts, deterministic constructors, focused
  fixtures, and tests only.
- IMPL-01 must not add routes, release metadata, package assets, package
  publish steps, external services, persistence infrastructure beyond
  in-memory or deterministic object construction, or any executing automation.
- IMPL-01 must preserve V2.5 canonical Engagement terms and compatibility
  aliases.

## Slice Ordering Decision

Final ordered slices:

1. V3.0 IMPL-01 Engagement Record and Local Workspace Contract.
2. V3.0 IMPL-02 Founder-Usable Entry / Load / Create Surface.
3. V3.0 IMPL-03 Local Engagement Loop Runner, Review-Only.
4. V3.0 IMPL-04 Founder Review Packet Output.
5. V3.0 IMPL-05 Local Session / History Persistence or Export.
6. V3.0 E2E Deliverable Loop Hardening and RC Readiness Audit.

### 1. V3.0 IMPL-01 Engagement Record and Local Workspace Contract

- purpose: define product-local contracts and deterministic constructors for
  `EngagementWorkspace`, `EngagementSession`, `EngagementLoopState`, and
  `EngagementHistoryRecord` using V2.5 canonical Engagement terms.
- expected file families: `app/engagement/engagement-workspace-contract.ts`,
  `app/engagement/engagement-workspace-workflow.ts`,
  `projection/fixtures/v3-0-engagement-workspace-fixture.ts`, and focused
  `tests/app/v3-0-engagement-workspace-*.test.ts`.
- tests: contract shape, constructor determinism, input immutability, V2.5
  canonical type compatibility, boundary flags, forbidden field exclusion, and
  fixture helper determinism.
- boundary flags: local-only, manual-first, review-only, deterministic,
  non-executing, no external service, no route change, no release/tag/package,
  no package publish.
- no-claim gates: no public/private beta, paid/commercial/production readiness,
  V3.0 release, MPLP certification/endorsement, payment, CRM/email,
  publishing, analytics, LLM/tool, SaaS, dispatch, marketplace, or autonomy
  claim.
- upstream dependency posture: SoloCrew-local; no Cognitive_OS or MPLP-Protocol
  change.
- explicit stop conditions: stop if IMPL-01 requires route changes, external
  services, persistence infrastructure beyond deterministic local object
  construction, V2.5 alias removal, upstream repo modification, release/tag/
  package work, or any forbidden positive claim.

### 2. V3.0 IMPL-02 Founder-Usable Entry / Load / Create Surface

- purpose: add a founder/operator surface that creates or loads local
  engagement records without relying only on fixtures.
- expected file families: local page, shell, or CLI/operator modules; page
  model or renderer tests; no file rename; no existing route URL change.
- tests: create path, load path, empty state, existing local record state,
  boundary copy, deterministic render/output, and non-fixture local record
  coverage.
- boundary flags: local-only, manual-first, review-only, deterministic,
  non-executing, no external accounts, no public sharing, no provider/channel
  dispatch.
- no-claim gates: no beta, readiness, SaaS, payment, CRM/email, publishing,
  analytics, LLM/tool invocation, or autonomy implication.
- upstream dependency posture: SoloCrew-local; no Cognitive_OS or MPLP-Protocol
  change.
- explicit stop conditions: stop if a create/load surface requires account
  provisioning, external storage, dispatch, publishing, payment, route URL
  mutation, or overclaiming.

### 3. V3.0 IMPL-03 Local Engagement Loop Runner, Review-Only

- purpose: coordinate onboarding, evidence attachment, readiness review, and
  conversion/reference gate review as a deterministic local loop.
- expected file families: loop runner/workflow modules under `app/engagement/`
  and E2E/focused tests under `tests/app/`.
- tests: end-to-end review-only loop, invalid transition handling,
  deterministic summaries, no execution/dispatch fields, no fixture-only
  dependency, and V2.5 compatibility regression coverage.
- boundary flags: local-only, manual-first, review-only, deterministic,
  non-executing, no provider/channel dispatch, no automatic conversion.
- no-claim gates: no automatic conversion, provider/channel dispatch,
  marketplace, autonomous execution, LLM/model/agent/tool invocation, or
  production-ready implication.
- upstream dependency posture: SoloCrew-local unless a later separately
  authorized review proves a neutral runtime gap.
- explicit stop conditions: stop if the loop executes actions, calls external
  services, invokes models/tools/agents, dispatches channels, or mutates V2.5
  compatibility aliases.

### 4. V3.0 IMPL-04 Founder Review Packet Output

- purpose: generate a founder review packet from local engagement loop state
  with source refs, omitted-private-data posture, and manual next-step review.
- expected file families: review packet contract, renderer/export helper, local
  fixture or example data, and packet serialization tests.
- tests: packet generation, deterministic serialization, source-ref
  normalization, boundary copy, no public/testimonial publishing fields, and
  no raw private payload leakage.
- boundary flags: local-only, review-only, deterministic, non-executing,
  export-only where local export is explicitly implemented, no public
  publishing.
- no-claim gates: no public publishing, testimonial/public-case-study
  publishing, external analytics, CRM/email automation, provider dispatch,
  MPLP certification, or MPLP endorsement.
- upstream dependency posture: SoloCrew-local; possible future Cognitive_OS
  candidate only if a neutral review packet export primitive is separately
  justified.
- explicit stop conditions: stop if packet output becomes public publishing,
  testimonial publication, automated outreach, analytics, or certification/
  endorsement evidence.

### 5. V3.0 IMPL-05 Local Session / History Persistence or Export

- purpose: preserve repeatable local state through deterministic local session
  history, local export, or a bounded local store.
- expected file families: local persistence/export module, fixture-free sample
  local data, roundtrip tests, and failure-mode tests.
- tests: save/load or export/import roundtrip, deterministic history ordering,
  corruption-safe failure mode, source-ref preservation, no external database,
  and no customer account fields.
- boundary flags: local-only, deterministic, review-only, non-executing, no
  customer account provisioning, no SaaS sharing, no external analytics.
- no-claim gates: no SaaS sharing, account provisioning, external analytics,
  automated billing, autonomous execution, or production-ready implication.
- upstream dependency posture: SoloCrew-local by default; any future neutral
  Cognitive_OS runtime candidate requires separate authorization.
- explicit stop conditions: stop if persistence requires external accounts,
  cloud storage, SaaS sharing, analytics, billing, or upstream repo changes.

### 6. V3.0 E2E Deliverable Loop Hardening and RC Readiness Audit

- purpose: prove the full founder-usable local Engagement Operating Loop is
  deliverable before any RC is considered.
- expected file families: E2E tests, readiness/audit governance record if
  separately authorized, README/product docs alignment after implementation,
  and release-readiness evidence only after all slices land.
- tests: full non-fixture-only local loop, V2.5 compatibility regression,
  no-claim grep, package publish exclusion, upstream non-modification, and
  full suite.
- boundary flags: local-only, manual-first, review-only, deterministic,
  non-executing, no package publish, no unauthorized release/tag/package.
- no-claim gates: no V3.0 released claim before an owner-authorized tag/release,
  no beta/readiness overclaim, no package publish, and no upstream authority
  claim.
- upstream dependency posture: SoloCrew-local unless earlier slices create a
  separately authorized and proven upstream blocker.
- explicit stop conditions: stop if E2E proof is fixture-only, if V2.5
  compatibility breaks, if forbidden claims appear, if package publication is
  required, or if upstream repos must change without separate authorization.

## IMPL-01 Detailed Scope

IMPL-01 task id:

SOLOCREW-V3.0-IMPL-01-ENGAGEMENT-RECORD-AND-LOCAL-WORKSPACE-CONTRACT-01

Purpose:

Create product-local contracts and deterministic constructors for:

- `EngagementWorkspace`
- `EngagementSession`
- `EngagementLoopState`
- `EngagementHistoryRecord`

Required characteristics:

- local-only.
- manual-first.
- review-only.
- deterministic.
- non-executing.
- no external services.
- no persistence implementation yet unless strictly in-memory or deterministic
  object construction.
- no route change.
- no package publish.
- no V3.0 release claim.

Expected files:

| Purpose | Expected path | Scope note |
| --- | --- | --- |
| workspace/session/loop/history contracts | `app/engagement/engagement-workspace-contract.ts` | product-local type contracts and constants |
| deterministic constructors/workflow helpers | `app/engagement/engagement-workspace-workflow.ts` | no external services, no persistence infrastructure |
| deterministic fixture helper | `projection/fixtures/v3-0-engagement-workspace-fixture.ts` | test helper only; not the only supported data path |
| contract tests | `tests/app/v3-0-engagement-workspace-contract.test.ts` | shape, required fields, V2.5 canonical compatibility |
| workflow tests | `tests/app/v3-0-engagement-workspace-workflow.test.ts` | deterministic constructors and validation |
| boundary tests | `tests/app/v3-0-engagement-workspace-boundary.test.ts` | no forbidden fields or claims |
| determinism tests | `tests/app/v3-0-engagement-workspace-determinism.test.ts` | stable output and fixture helper determinism |

If implementation finds a better existing local path, it may use that path
only if the implementation record justifies the choice, preserves V2.5
compatibility, and stays inside SoloCrew-local `app/engagement`, fixtures, and
focused test file families.

## IMPL-01 Data Model Requirements

Planned `EngagementWorkspace` fields:

- `workspace_id`
- `engagement_ref`
- `participant_refs`
- `current_stage`
- `commercial_mode`
- `loop_state_ref`
- `history_refs`
- `source_metadata`
- `boundary_flags`

Planned `EngagementSession` fields:

- `session_id`
- `workspace_ref`
- `operator_ref`
- `started_at`
- `status`
- `current_stage`
- `source_metadata`
- `boundary_flags`

Planned `EngagementLoopState` fields:

- `loop_state_id`
- `engagement_ref`
- `stage`
- `readiness_ref`
- `onboarding_packet_ref`
- `evidence_refs`
- `review_gate_refs`
- `outcome_review_ref`
- `support_burden_ref`
- `boundary_flags`

Planned `EngagementHistoryRecord` fields:

- `history_record_id`
- `workspace_ref`
- `session_ref`
- `event_kind`
- `event_summary`
- `source_refs`
- `created_at`
- `boundary_flags`

Required `boundary_flags`:

- `local_only`
- `manual_first`
- `review_only`
- `deterministic`
- `non_executing`
- `no_external_service`
- `no_payment`
- `no_crm`
- `no_publishing`
- `no_llm_or_tool_invocation`
- `no_autonomy`
- `no_package_publish`
- `no_public_beta`
- `no_commercial_readiness_claim`
- `no_production_readiness_claim`
- `no_mplp_certification_or_endorsement`

Model constraints:

- `current_stage` and `stage` must use or safely map to V2.5 canonical
  `EngagementStage`.
- `commercial_mode` must use or safely map to V2.5 canonical
  `CommercialMode`.
- source metadata must preserve normalized source refs without exposing runtime
  private payloads.
- constructors must not mutate input objects.
- contracts must not include external service, payment, CRM, publishing, LLM,
  tool, SaaS, autonomy, dispatch, marketplace, or customer account fields.

## IMPL-01 Test Plan

IMPL-01 must add focused tests proving:

- deterministic constructors.
- valid workspace/session/loop/history shapes.
- no mutation of inputs.
- compatibility with V2.5 canonical Engagement types.
- every required boundary flag is present and true.
- invalid stage or mode is rejected or safely classified.
- no external service fields exist.
- no payment/CRM/publishing/LLM/tool/SaaS/autonomy fields exist.
- fixture helper deterministic output.
- fixture helper is optional and not the only supported data path.
- V2.5 focused tests remain passing.
- `npm test` remains passing.

Recommended focused command set for IMPL-01:

- `node --test tests/app/v3-0-engagement-workspace-contract.test.ts`
- `node --test tests/app/v3-0-engagement-workspace-workflow.test.ts`
- `node --test tests/app/v3-0-engagement-workspace-boundary.test.ts`
- `node --test tests/app/v3-0-engagement-workspace-determinism.test.ts`
- `node --test tests/app/engagement-semantic-stabilization-e2e.test.ts`
- `node --test tests/app/engagement-active-shell-page-model-canonicalization.test.ts`
- `node --test tests/app/engagement-source-ref-normalizer.test.ts`
- `node --test tests/app/engagement-canonical-helper-cleanup.test.ts`
- `node --test tests/app/engagement-canonical-aliases.test.ts`
- `node --test tests/app/engagement-metadata-contract.test.ts`
- `node --test tests/app/engagement-compatibility-aliases.test.ts`
- `node --test tests/app/engagement-active-surface-import-migration.test.ts`
- `npm test`

## Non-Fixture Dependency Strategy

IMPL-01 may include fixture helpers for deterministic tests, but the contract
must support non-fixture local records from the start.

Required strategy:

- Constructors accept explicit local inputs for workspace, session, loop state,
  and history records.
- Fixtures may call the same constructors, not a separate privileged path.
- Tests must prove at least one non-fixture input path.
- Later V3.0 IMPL-02 must add the founder-usable create/load surface.
- IMPL-01 must not hardcode all valid records through a fixture-only path.

## Architecture Boundary

IMPL-01 remains SoloCrew-local.

What belongs in SoloCrew for IMPL-01:

- Engagement workspace/session/loop/history product contracts.
- Deterministic constructors.
- Product-local boundary flags.
- Focused fixtures and tests.
- V2.5 canonical Engagement compatibility references.

What does not belong upstream now:

- Cognitive_OS runtime changes.
- MPLP-Protocol law, certification, or endorsement changes.
- Neutral runtime abstractions not proven by multiple downstream products.

Future upstream dependency posture:

- No Cognitive_OS change is required for IMPL-01.
- No MPLP-Protocol change is required for IMPL-01.
- Any future upstream request must be separately justified as a neutral
  runtime/projection capability and must not be introduced by IMPL-01.

## README / CHANGELOG Strategy

- README should not be rewritten in IMPL-01 unless required to avoid a factual
  contradiction after implementation.
- CHANGELOG should receive one concise IMPL-01 entry after implementation.
- No V3.0 release claim is allowed before a later owner-authorized release/tag
  wave.
- No public/private beta claim is allowed.
- No paid product readiness, commercial readiness, or production-ready claim is
  allowed.
- No Cognitive_OS or MPLP-Protocol change claim is allowed.

## Acceptance Gates for IMPL-01

IMPL-01 must pass all applicable gates before it can be considered complete:

- git diff hygiene through `git diff --check`.
- focused IMPL-01 tests pass.
- V2.5 engagement focused tests pass.
- V2.4/V2.3 regressions pass if touched or if shared compatibility surfaces
  are modified.
- `npm test` passes.
- no-claim grep finds no blocking positive claim.
- no unauthorized Cognitive_OS or MPLP-Protocol changes.
- no route URL changes.
- no file renames.
- no V2.5 compatibility alias removal.
- no release, tag, package, package asset, package publish, or npm publish.
- no external service, payment, CRM, publishing, LLM/tool, SaaS, autonomy,
  dispatch, marketplace, customer account, automatic conversion, or automated
  billing field or behavior.

## Risk Matrix

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Over-scoping into persistence too early | high | IMPL-01 allows only in-memory or deterministic object construction; persistence/export waits for later slices. |
| Creating developer-only contracts without future UI path | medium | Keep IMPL-02 as the immediate next founder-usable entry/load/create surface. |
| Hidden fixture dependency | high | Require non-fixture local input path tests and make fixtures call the same constructors. |
| Breaking V2.5 canonical aliases | high | Run V2.5 focused tests and avoid removing versioned exports or compatibility aliases. |
| Accidental execution/autonomy semantics | high | Require boundary flags and forbidden field tests for non-executing, manual-first behavior. |
| Upstream boundary pollution | high | Keep IMPL-01 SoloCrew-local; require separate authorization for any neutral Cognitive_OS or MPLP need. |
| V3.0 release/readiness overclaim | high | Keep no-claim grep in the gate and prohibit release/tag/package work. |

## Final Decision

SOLOCREW_V3_0_IMPLEMENTATION_READINESS_PASS_WITH_SCOPE_GUARDS

Rationale:

- The V3.0 planning baseline passed and defines a concrete deliverable local
  Engagement Operating Loop.
- The final slice order is coherent and starts with the lowest-risk product
  contract foundation.
- IMPL-01 has a clear write scope, test plan, no-claim boundary, and upstream
  dependency posture.
- Implementation remains separately authorized by the next task and is not
  performed here.

## Next Allowed Task

SOLOCREW-V3.0-IMPL-01-ENGAGEMENT-RECORD-AND-LOCAL-WORKSPACE-CONTRACT-01

The next task may begin IMPL-01 only if the owner explicitly authorizes it and
it preserves the scope guards, no-claim gates, V2.5 compatibility boundary,
and MPLP -> Cognitive_OS -> SoloCrew authority order defined here.
