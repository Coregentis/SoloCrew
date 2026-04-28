# SOLOCREW-GLOBAL-NAMING-VERSIONING-AND-PRODUCT-SEMANTIC-AUDIT-v0.1

## Document Control

- doc_id: SOLOCREW-GLOBAL-NAMING-VERSIONING-AND-PRODUCT-SEMANTIC-AUDIT-v0.1
- task_id: SOLOCREW-GLOBAL-NAMING-VERSIONING-AND-PRODUCT-SEMANTIC-AUDIT-01
- status: research / audit only
- date: 2026-04-29
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- repo: https://github.com/Coregentis/SoloCrew.git
- branch: main
- starting_head: b7b52029f032e9290c8419de2ea668469a7d46c0
- final_head_placeholder: final commit hash is captured in the task report after this audit record is committed and pushed.

## Executive Summary

This audit finds that SoloCrew has excellent release evidence discipline but weak production naming discipline.

Top findings:

- Severity high: version numbers are valid in release evidence, historical governance, fixtures, and regression tests, but they also appear in active app contracts, workflow helper signatures, source-ref field names, routes, page models, and current product semantics.
- Severity high: current V2.3/V2.4 product concepts are modeled as release-line objects instead of stable product lifecycle objects. Examples include `V2_4PilotOnboardingPacket`, `V2_4CommercializationReadinessDashboard`, `V2_4PilotFeedbackEvidenceRecord`, `V2_4CaseStudyConversionGate`, `V2_3PilotIntakeRecord`, and `V2_3ManualPaymentRecord`.
- Severity high: field names encode historical release lines, including `v2_3_stable_tag`, `v2_3_stable_commit`, `v2_4_dashboard_ref`, `v2_4_onboarding_packet_ref`, `v2_4_feedback_evidence_ref`, `v2_2_stable_tag`, `related_v2_2_workspace_id`, and `related_v2_3_intake_status`.
- Severity medium: README currently functions more like a release-history ledger than a product entry point. It accurately preserves boundaries but leads with release-line status rather than stable SoloCrew product concepts.
- Severity medium: `paid pilot` and `commercialization readiness` are encoded as root capability names. They should become lifecycle stage/mode or review-view terminology inside a stable Engagement model.
- Severity medium: V2.5 planning should not advance into implementation until naming and delivery-line semantics are corrected.

Recommended next wave:

SOLOCREW-SEMANTIC-NAMING-CORRECTION-AND-DELIVERY-LINE-GOVERNANCE-01

This next wave should be governance-first and should define stable canonical product names, compatibility aliases, migration strategy, and true-delivery line semantics before any V2.5 or V3.0 implementation is opened.

## Remote Truth Snapshot

| Repo | Branch | Local HEAD | origin/main HEAD | Worktree |
| --- | --- | --- | --- | --- |
| SoloCrew | main | b7b52029f032e9290c8419de2ea668469a7d46c0 | b7b52029f032e9290c8419de2ea668469a7d46c0 | clean |
| Cognitive_OS | main | ec681a4d77368b71c1cc76964618f3151038861b | ec681a4d77368b71c1cc76964618f3151038861b | clean |
| MPLP-Protocol | main | 0cf0477938340a443614d03d9fb51ac764b960c7 | 0cf0477938340a443614d03d9fb51ac764b960c7 | clean |

Release tag truth:

| Tag | Expected target | Observed target | Result |
| --- | --- | --- | --- |
| `solocrew-v2.4-stable-commercialization-readiness-loop-20260428` | 12d7ccb00506670992b798d82aa81fbc0f5578f6 | 12d7ccb00506670992b798d82aa81fbc0f5578f6 | pass |
| `solocrew-v2.4-rc-commercialization-readiness-loop-20260428` | ea882d590b1b59c5b9ce703869fdd7abe66ff77d | ea882d590b1b59c5b9ce703869fdd7abe66ff77d | pass |
| `solocrew-v2.3-stable-first-paid-pilot-loop-20260428` | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | pass |
| `solocrew-v2.3-rc-first-paid-pilot-loop-20260428` | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | pass |
| `solocrew-v2.2-stable-private-alpha-journey-20260428` | aaef0147290848c35e68d8eb4e84616f904454e3 | aaef0147290848c35e68d8eb4e84616f904454e3 | pass |
| `solocrew-v2.2-rc-private-alpha-journey-20260428` | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | pass |

No Cognitive_OS or MPLP-Protocol modification was performed.

## Version-Bearing Name Inventory

Search scope: full repository excluding generated dependency/build output.

| Search term | Match count | File count | Representative files |
| --- | ---: | ---: | --- |
| `V1` | 2532 | 226 | `README.md`; `CHANGELOG.md`; `projection/adapters/v1-7-prepared-action-adapter.ts` |
| `V1.` | 1624 | 164 | `projection/contracts/cell-operations-panel-projection-contract.ts`; `README.md`; `CHANGELOG.md` |
| `V1_` | 292 | 132 | `governance/baselines/SOLOCREW-V1.4-PLANNING-BASELINE-v0.1.md`; `governance/audits/SOLOCREW-V1.1-BOUNDARY-AND-RISK-REVIEW-v0.1.md` |
| `v1` | 797 | 173 | `Files_GPT/...`; `projection/adapters/cell-operations-runtime-adapter.ts`; `app/shell/create-v1-1-intake-to-packet-page-model.ts` |
| `v1-` | 296 | 87 | `projection/adapters/v1-7-prepared-action-adapter.ts`; `projection/adapters/v1-8-execution-boundary-adapter.ts` |
| `V2` | 2971 | 167 | `projection/fixtures/v2-starter-cells.ts`; V2.3/V2.4 fixtures; README |
| `V2.` | 1778 | 82 | V2.2/V2.3/V2.4 fixtures; README; CHANGELOG |
| `V2_` | 783 | 117 | V2.2/V2.3/V2.4 fixtures and app contracts |
| `v2` | 1410 | 161 | V2 fixtures, tests, app shell page models |
| `v2-` | 752 | 100 | V2.2/V2.3/V2.4 fixtures and tests |
| `V2.2` | 495 | 33 | `projection/fixtures/v2-2-private-alpha-workspace-fixture.ts`; README; CHANGELOG |
| `V2.3` | 363 | 30 | V2.3 paid pilot fixtures; V2.4 loop fixtures; README |
| `V2.4` | 326 | 29 | V2.4 commercialization fixtures; README; CHANGELOG |
| `V2.5` | 13 | 4 | V2.1 historical planning; V2.4 release records |
| `V3.0` | 127 | 26 | README; CHANGELOG; V2.3/V2.4 governance plans |
| `v2-2` | 230 | 36 | V2.2 fixtures; V2.3 fixture refs |
| `v2-3` | 173 | 46 | V2.3 fixtures; V2.4 fixtures and tests |
| `v2-4` | 262 | 32 | V2.4 fixtures and tests |
| `v2_2` | 93 | 38 | V2.2 workspace/dashboard app code; V2.3 refs |
| `v2_3` | 55 | 23 | V2.4 source refs and tests |
| `v2_4` | 27 | 11 | V2.4 source refs and governance research |
| `V24` | 96 | 23 | `createV24*` fixtures and tests |
| `V2_4` | 154 | 28 | V2.4 app contracts/workflows/fixtures/tests |
| `V23` | 70 | 24 | `createV23*` fixtures and tests |
| `V2_3` | 325 | 37 | V2.3 app contracts/workflows/fixtures/tests |
| `createV` | 323 | 74 | versioned fixture/page-model factories |

Summary by file family:

| File family | Version-bearing file count | Audit interpretation |
| --- | ---: | --- |
| `governance/**` | 194 | Mostly valid release/audit/history evidence. |
| `tests/**` | 59 | Mostly valid release/regression evidence; suspicious only if tests force future canonical names to remain versioned. |
| `projection/fixtures/**` | 15 | Valid as historical release fixtures, but should not be the only source of current product truth. |
| `app/**` | 11 | Suspicious because active product/runtime semantics contain versioned names. |
| `projection/adapters/**` and `projection/contracts/**` | 4 | Potentially allowed compatibility markers, but should be isolated as legacy adapters. |

Additional targeted counts:

- Current V2.4 commercialization versioned symbol matches in app/fixtures/tests: 414.
- Current V2.3 pilot versioned symbol matches in app/fixtures/tests: 539.
- Versioned source-ref or field-name matches in app/projection/tests: 161.

## Allowed vs Suspicious Version Usage

| Category | Classification | Representative examples | Audit result |
| --- | --- | --- | --- |
| A | Allowed release evidence | release tags; `governance/releases/SOLOCREW-V2.4-STABLE-PREP-SEAL-AND-CONDITIONAL-RELEASE-RECORD-v0.1.md`; `governance/releases/SOLOCREW-V2.4-POST-STABLE-VERIFICATION-MAINTENANCE-GATE-v0.1.md` | Preserve as immutable evidence. |
| A | Allowed audit / governance evidence | `governance/audits/SOLOCREW-V2.4-RC-READINESS-AUDIT-v0.1.md`; V1.x/V2.x planning and gate docs | Preserve; do not rename retroactively. |
| A | Allowed changelog entries | `CHANGELOG.md` V2.2/V2.3/V2.4 history | Preserve release trace. |
| B | Allowed test / fixture evidence | `tests/app/v2-4-commercialization-readiness-loop-e2e.test.ts`; `projection/fixtures/v2-4-commercialization-readiness-loop-fixture.ts` | Allowed as release-line evidence; should eventually wrap stable product aliases. |
| B | Allowed regression evidence | `tests/app/v2-3-paid-pilot-loop-e2e.test.ts`; V2.2 private-alpha tests | Preserve for historical regression coverage. |
| C | Potential migration / compatibility marker | `projection/adapters/v1-7-prepared-action-adapter.ts`; `projection/adapters/v1-8-execution-boundary-adapter.ts`; `app/shell/runtime-session-facade.ts` bridge scope | Allowed only when explicitly compatibility-scoped. |
| D | Suspicious runtime/domain naming | `V2_4PilotOnboardingPacket`; `V2_4CommercializationReadinessDashboard`; `V2_3PilotIntakeRecord`; `create_v2_2_workspace_with_cgos_consumption` | Should migrate to stable canonical product names. |
| E | Suspicious field/source-ref naming | `v2_3_stable_tag`; `v2_4_dashboard_ref`; `v2_4_feedback_evidence_ref`; `related_v2_2_workspace_id`; `related_v2_3_intake_status` | Should move to version metadata fields. |
| F | Suspicious current product docs / README semantics | README sections titled by V2.2/V2.3/V2.4 stable status | Accurate but reads as release ledger rather than product entry point. |
| G | Historical-only legacy content | V1.x plans, Q5 gate docs, old operational V1 audits | Preserve under archive/history posture; do not drive current product semantics. |

## Domain Object Naming Audit

Stable product concepts found:

- `PilotOnboardingPacketId`
- `PilotOnboardingSectionId`
- `PilotOnboardingPacketStatus`
- `PilotOnboardingAudience`
- `PilotOnboardingExpectationProfile`
- `CommercializationReadinessDashboardId`
- `CommercializationReadinessDashboardStatus`
- `CommercializationReadinessScoreBand`
- `PilotFeedbackEvidenceId`
- `PilotFeedbackEvidenceStrengthBand`
- `CaseStudyConversionGateId`
- `CaseStudyPermissionReadinessBand`
- `ManualConversionReadinessBand`
- `CaseStudyConversionGateDecision`

Suspicious version-scoped domain names found:

- `V2_4PilotOnboardingPacket`
- `V2_4CommercializationReadinessDashboard`
- `V2_4PilotFeedbackEvidenceRecord`
- `V2_4CaseStudyConversionGate`
- `V2_3PilotIntakeRecord`
- `V2_3ManualPaymentRecord`
- `V2_3NextActionProposal`
- `V2_3PilotFeedbackRecord`
- `V2_3CaseStudyPermissionRecord`
- `V2_2ReviewPacketExport`
- `V2_2FounderDashboardContinuationPageModel`
- `V2FounderDashboardReadinessState`
- `V17PreparedActionPageModel`
- `V18ExecutionBoundaryPageModel`
- `V19FounderDashboardPageModel`
- `V19CellOperationsPanelPageModel`

Suspicious versioned helper names found:

- `createV24PilotOnboardingPacketFixture`
- `createV24CommercializationReadinessDashboardFixture`
- `createV24PilotFeedbackEvidenceFixture`
- `createV24CaseStudyConversionGateFixture`
- `createV24CommercializationReadinessLoopFixture`
- `createV23PaidPilotLoopFixture`
- `createV23FeedbackCaptureFixture`
- `createV23ManualPaymentStatusFixture`
- `createV22PrivateAlphaWorkspaceFixture`
- `create_v2_2_workspace_with_cgos_consumption`
- `create_v2_2_founder_dashboard_continuation_page_model`
- `createV2FounderDashboardPageModel`

Audit conclusion:

The product has enough stable domain vocabulary to support a future canonical model, but current exported record types still carry release-line prefixes. This is manageable if corrected through aliases and phased migration, but it should stop before additional product lines deepen the pattern.

## Field / Source Ref Naming Audit

Suspicious field/source-ref examples:

- `v2_3_stable_tag`
- `v2_3_stable_commit`
- `v2_2_stable_tag`
- `v2_2_stable_commit`
- `v2_4_onboarding_packet_ref`
- `v2_4_dashboard_ref`
- `v2_4_feedback_evidence_ref`
- `related_v2_2_workspace_id`
- `related_v2_2_review_packet_export_id`
- `related_v2_3_intake_status`
- `no_v2_2_completion_claim`
- `v2_0_ready`
- `v2_0_delivered`
- `v2_1_implementation_scope`
- `product_line: "v2_0"`
- `phase_boundary: "v2_0_wave..."`

Audit conclusion:

Release lineage belongs in metadata, not in source-ref field names. A stable source-ref shape should use:

- `source_release_ref`
- `source_commit_ref`
- `baseline_release_ref`
- `baseline_commit_ref`
- `contract_version`
- `schema_version`
- `release_line`
- `compatibility_profile`
- `migration_from`
- `migration_to`

This preserves trace without hardcoding V2.2/V2.3/V2.4 into product-domain fields.

## File and Directory Naming Audit

Allowed version-bearing file families:

- `governance/releases/**`
- `governance/audits/**`
- `governance/planning/**`
- `governance/baselines/**`
- `tests/app/v2-*.test.ts` as historical release/regression evidence
- `projection/fixtures/v2-*.ts` as deterministic release fixtures
- explicit compatibility adapters such as `projection/adapters/v1-7-prepared-action-adapter.ts`

Suspicious current product file names:

- `app/pages/v2-founder-dashboard-page.ts`
- `app/shell/create-v2-founder-dashboard-page-model.ts`
- `app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts`
- `app/dashboard/v2-2-founder-dashboard-continuation-contract.ts`

Current V2.4 files under `app/commercialization/` are not versioned by filename, which is good, but their exported record types and constants are versioned.

Audit conclusion:

File-name versioning is mostly contained to governance, tests, fixtures, and older app shell surfaces. The priority should be exported symbols and source-ref fields before any broad file rename.

## Product Semantics Audit

Question A: What is the current product system called in repository truth?

- The product is SoloCrew. README describes it as the product repository for a one-person-company AI team experience downstream of MPLP Protocol and Cognitive_OS.

Question B: Is it presented as SoloCrew the product, or as a sequence of V2.2/V2.3/V2.4 baselines?

- Both, but the current README presents the active state mainly as V2.2/V2.3/V2.4 release lines. That is accurate for evidence but weak as a production product entry point.

Question C: Does README read like a product entry point or a release-history ledger?

- It reads more like a release-history ledger. The first current sections are release-line status blocks, not stable product capability, operator workflow, or production entry-point guidance.

Question D: Does current code read like stable domain model or release-specific implementation slices?

- Current app/commercialization filenames suggest stable product modules, but exported types and fixtures read like release-specific implementation slices. V2.4 names are still embedded in canonical record types and boundary constants.

Question E: Are current objects reusable after paid pilot ends?

- Partly. The data shapes can represent review, feedback evidence, and conversion review, but names like `PilotOnboarding`, `paid_pilot_loop`, and `CommercializationReadiness` imply a temporary validation phase instead of a durable engagement lifecycle.

Question F: Are trial/pilot/paid-pilot/commercialization-readiness encoded as lifecycle states or as permanent object names?

- They are currently encoded as permanent object names and fixture identities. They should become lifecycle stage/mode values.

Question G: Is there an Engagement / Participant / Review / Outcome lifecycle abstraction already present?

- Not as a current canonical product model. There are local review, outcome, workspace, feedback, and action concepts, but no stable `Engagement`, `EngagementParticipant`, `EngagementStage`, `EngagementReviewGate`, or `EngagementOutcomeReview` abstraction tying V2.3/V2.4 together.

Question H: If not present, what stable product abstractions should replace version-scoped names?

- Use `Engagement`
- Use `EngagementParticipant`
- Use `EngagementStage`
- Use `CommercialMode`
- Use `EngagementOnboardingPacket`
- Use `EngagementEvidenceRecord`
- Use `EngagementReadinessView`
- Use `EngagementReviewGate`
- Use `EngagementOutcomeReview`
- Use `ReferencePermissionReview`
- Use `ConversionReview`
- Use `SupportBurdenReview`
- Use `FounderReviewQueue`

## Paid Pilot Lifecycle Audit

Current model answer: after a paid pilot completes, the current V2.4 loop can produce feedback evidence and manual conversion review decisions, but it does not express a durable post-pilot lifecycle. It can say `prepare_manual_conversion_review`, `deny_public_use`, `require_legal_review`, or `hold_for_more_evidence`, but it does not have stable lifecycle states like `post_pilot_review`, `conversion_review`, `closed_won`, `closed_lost`, or `archived`.

Objects partly reusable after paid pilot:

- Case-study permission records can support private/reference or anonymized quote review.
- Feedback evidence records can support post-pilot learning.
- Commercialization dashboard records can support founder review.
- Conversion gate records can support manual conversion assessment.

Objects that imply temporary pilot-only semantics:

- `PilotOnboardingPacket`
- `PilotFeedbackEvidenceRecord`
- `paid_pilot_loop`
- `manual_paid_pilot`
- `CommercializationReadinessDashboard`
- `CaseStudyConversionGate`

Recommended lifecycle model:

`EngagementStage`:

- `candidate`
- `qualified`
- `onboarding`
- `paid_pilot`
- `active_pilot`
- `post_pilot_review`
- `conversion_review`
- `closed_won`
- `closed_lost`
- `archived`

`CommercialMode`:

- `free_discovery`
- `manual_paid_pilot`
- `manual_service`
- `subscription_candidate`
- `enterprise_candidate`

Mapping recommendation:

| Current naming | Stable interpretation |
| --- | --- |
| paid pilot | `EngagementStage.paid_pilot` plus `CommercialMode.manual_paid_pilot` |
| pilot intake | engagement candidate intake |
| design partner | engagement participant role |
| pilot onboarding packet | engagement onboarding packet |
| commercialization readiness dashboard | engagement readiness view |
| pilot feedback evidence | engagement evidence record |
| case-study conversion gate | engagement review gate with reference/conversion decisions |

Do not implement this model in this wave.

## Version Planning Audit

Current version-line assessment:

- V2.4 Stable is complete and verified.
- V2.4.x should be limited to maintenance, evidence correction, no-claim hardening, and semantic correction.
- V2.5 should not open as another feature-slice line until stable production product semantics are accepted.
- V3.0 should not open merely because V2.4 closed.

Recommended owner decision:

- Put a semantic correction and delivery-line governance wave before any V2.5 product implementation.
- Retain V2.5 only if it has a clear product goal that strengthens a stable product model instead of adding another version-scoped layer.
- Reserve V3.0 for a delivery meaning such as first truly founder-usable product line, not a mechanical next number.

If V2.5 is retained:

- It should focus on stable Engagement abstractions, operator entry points, persistence/history, and migration-compatible product naming.
- It should not add more `V2_5*` domain object names.

If V2.5 is rejected:

- Replace it with a named semantic correction line or delivery-line governance wave.
- Open V3.0 only after the owner defines true delivery scope and acceptance gates.

If V3.0 is the first true delivery line:

- `true delivery` must mean a founder-usable product path, not merely release evidence or deterministic fixtures.

## True Delivery Criteria

Minimum true delivery should include:

- founder-usable entry point
- ability to create and load engagement records
- ability to run the local engagement loop end-to-end
- founder review packet output
- persistence or repeatable local session/history path
- clear operator runbook
- no hidden dependence on test fixtures
- no mandatory developer-only workflow
- maintained no-claim boundaries
- no public beta, payment processor, CRM, SaaS, autonomous execution, package publish, MPLP certification, or MPLP endorsement unless separately authorized

Recommended placement:

- Do not assign this to V2.5 automatically.
- Use the next governance wave to decide whether true delivery is a V2.5 objective, a V3.0 objective, or a named product-readiness line.
- If the owner wants the next line to be first true delivery, V3.0 is plausible only if it is explicitly defined as a founder-usable local product delivery line with the criteria above.

## Proposed Naming Governance Policy

### Version Numbers Allowed In

- release tags
- release/audit/governance evidence docs
- changelog entries
- test fixtures explicitly tied to historical release evidence
- regression tests for a specific release line
- migration records
- compatibility adapters
- source release metadata values

### Version Numbers Disallowed In

- domain object names
- interface/type names
- workflow/helper function names
- field names
- source-ref field names
- active product capability names
- active product directories unless explicitly evidence/test/history
- user-facing route names unless the route is an archival or compatibility path

### Required Metadata Alternative

Use stable field names:

- `contract_version`
- `schema_version`
- `release_line`
- `source_release_ref`
- `source_commit_ref`
- `baseline_release_ref`
- `baseline_commit_ref`
- `compatibility_profile`
- `migration_from`
- `migration_to`

Do not use field names like `v2_3_stable_tag`, `v2_4_dashboard_ref`, or `related_v2_2_workspace_id` in canonical product contracts.

### Product Lifecycle Language

Use stable domain terms:

- `Engagement`
- `EngagementParticipant`
- `EngagementStage`
- `CommercialMode`
- `EngagementOnboardingPacket`
- `EngagementEvidenceRecord`
- `EngagementReadinessView`
- `EngagementReviewGate`
- `EngagementOutcomeReview`
- `ReferencePermissionReview`
- `ConversionReview`
- `SupportBurdenReview`
- `FounderReviewQueue`

Do not hardcode `paid_pilot` as the root system object. Use `paid_pilot` as a stage/mode.

## Recommended Migration Strategy

Phase 0: freeze further versioned semantic names

- Do not add new exported domain types named `V2_5*`, `V3_0*`, or similar.
- Do not add new source-ref fields named after release lines.
- Allow version names only for evidence docs, release fixtures, and compatibility tests.

Phase 1: introduce stable naming aliases / canonical names

- Add stable aliases such as `EngagementOnboardingPacket` over `V2_4PilotOnboardingPacket`.
- Add stable aliases for V2.3 paid-pilot records as engagement intake/payment/feedback source concepts.
- Add canonical metadata wrappers for source release and commit references.

Phase 2: migrate domain types/functions/fields

- Replace versioned exported record names with stable canonical names.
- Keep deprecated aliases during transition.
- Replace `v2_3_stable_tag` and similar fields with `baseline_release_ref` and `baseline_commit_ref`.
- Replace `v2_4_*_ref` fields with stable source refs such as `readiness_view_ref`, `onboarding_packet_ref`, and `evidence_record_ref`.

Phase 3: update tests/fixtures without losing release evidence

- Preserve V2.2/V2.3/V2.4 fixtures as immutable regression evidence.
- Add stable fixture builders for current product usage.
- Retain historical `createV24*` helpers as compatibility wrappers until migration is complete.

Phase 4: update README/product docs

- Make README a product entry point first.
- Move release-line details into a compact history section or governance references.
- Describe current SoloCrew as an engagement workflow product, not as a chain of V2.2/V2.3/V2.4 objects.

Phase 5: open correct next product delivery line

- Decide whether the next line is V2.5 semantic/product coherence, V2.5 true delivery, or V3.0 true delivery.
- Only then open implementation.

## Risk Matrix

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Breaking tests during rename | high | Use compatibility aliases and staged migration. |
| Losing release trace | high | Preserve governance docs, release tags, changelog entries, and historical fixtures. |
| Over-renaming | high | Avoid broad file renames first; migrate exported symbols and field names carefully. |
| Confusing historical evidence | medium | Mark historical fixtures/docs as evidence-only and add stable current fixtures. |
| Product delivery delay | medium | Treat semantic correction as delivery-enabling, not cosmetic. |
| Upstream boundary pollution | high | Keep Cognitive_OS/MPLP concepts referenced as upstream truth only; do not redefine law. |
| Public/commercial readiness overclaim | high | Preserve no-claim gates through all naming and delivery-line changes. |

## Final Recommendation

SOLOCREW_GLOBAL_NAMING_AUDIT_PASS_REQUIRES_SEMANTIC_CORRECTION

Rationale:

- The repository has valid historical release trace, but active app/domain/source-ref semantics are too version-scoped for a production product.
- V2.5 planning should not become another version-scoped implementation line.
- The next owner-authorized wave should define stable canonical names, metadata replacement rules, compatibility alias strategy, and delivery-line semantics before any further product expansion.

This audit makes no runtime changes, no renames, no schema changes, no release, no tag, no package, no V2.5 implementation, no V3.0 implementation, no Cognitive_OS change, and no MPLP-Protocol change.

## Next Allowed Task

SOLOCREW-SEMANTIC-NAMING-CORRECTION-AND-DELIVERY-LINE-GOVERNANCE-01

This next task should require separate owner authorization and should remain governance/planning first unless explicitly authorized to perform a scoped compatibility implementation.
