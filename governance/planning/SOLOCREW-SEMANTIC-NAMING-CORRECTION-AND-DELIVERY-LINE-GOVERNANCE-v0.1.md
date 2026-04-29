# SOLOCREW-SEMANTIC-NAMING-CORRECTION-AND-DELIVERY-LINE-GOVERNANCE-v0.1

## 1. Document Control

- doc_id: SOLOCREW-SEMANTIC-NAMING-CORRECTION-AND-DELIVERY-LINE-GOVERNANCE-v0.1
- task_id: SOLOCREW-SEMANTIC-NAMING-CORRECTION-AND-DELIVERY-LINE-GOVERNANCE-01
- status: governance / correction planning only
- date: 2026-04-29
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- repo: https://github.com/Coregentis/SoloCrew.git
- branch: main
- source_audit_reference: `governance/audits/SOLOCREW-GLOBAL-NAMING-VERSIONING-AND-PRODUCT-SEMANTIC-AUDIT-v0.1.md`
- starting_head: ca4c0edc7a500b7d6477e0c0f8233b2b6418b8a1
- final_head_placeholder: final commit hash is captured in the task report after this governance record is committed and pushed.

Remote truth consumed:

| Repo | Branch | Local HEAD | origin/main HEAD | Worktree | Posture |
| --- | --- | --- | --- | --- | --- |
| SoloCrew | main | ca4c0edc7a500b7d6477e0c0f8233b2b6418b8a1 | ca4c0edc7a500b7d6477e0c0f8233b2b6418b8a1 | clean before this record | primary repo |
| Cognitive_OS | main | ec681a4d77368b71c1cc76964618f3151038861b | ec681a4d77368b71c1cc76964618f3151038861b | clean | inspected only |
| MPLP-Protocol | main | 0cf0477938340a443614d03d9fb51ac764b960c7 | 0cf0477938340a443614d03d9fb51ac764b960c7 | clean | inspected only |

Release evidence preserved:

| Tag | Target | Result |
| --- | --- | --- |
| `solocrew-v2.4-stable-commercialization-readiness-loop-20260428` | 12d7ccb00506670992b798d82aa81fbc0f5578f6 | preserved |
| `solocrew-v2.4-rc-commercialization-readiness-loop-20260428` | ea882d590b1b59c5b9ce703869fdd7abe66ff77d | preserved |
| `solocrew-v2.3-stable-first-paid-pilot-loop-20260428` | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | preserved |
| `solocrew-v2.3-rc-first-paid-pilot-loop-20260428` | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | preserved |
| `solocrew-v2.2-stable-private-alpha-journey-20260428` | aaef0147290848c35e68d8eb4e84616f904454e3 | preserved |
| `solocrew-v2.2-rc-private-alpha-journey-20260428` | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | preserved |

This record creates no runtime behavior, no broad rename, no file rename, no release, no tag, no package, no public beta claim, no paid product readiness claim, no commercial readiness claim, no production-ready claim, no V3.0 release claim, no MPLP certification claim, and no MPLP endorsement claim.

## 2. Audit Consumption Summary

The authoritative audit concluded:

SOLOCREW_GLOBAL_NAMING_AUDIT_PASS_REQUIRES_SEMANTIC_CORRECTION

Consumed findings:

- Active app/dashboard/page/shell version-bearing files are a high-priority correction surface, not just historical evidence. Examples include `app/dashboard/v2-2-founder-dashboard-continuation-contract.ts`, `app/pages/v2-founder-dashboard-page.ts`, `app/shell/create-v1-1-intake-to-packet-page-model.ts`, `app/shell/create-v1-2-packet-revision-page-model.ts`, `app/shell/create-v1-6-session-continuity-page-model.ts`, `app/shell/create-v1-7-prepared-action-page-model.ts`, `app/shell/create-v1-8-execution-boundary-page-model.ts`, `app/shell/create-v1-9-founder-dashboard-page-model.ts`, `app/shell/create-v1-9-cell-operations-panel-page-model.ts`, `app/shell/create-v2-founder-dashboard-page-model.ts`, and `app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts`.
- Projection contracts/adapters also contain version-bearing active surfaces. `projection/contracts/v1-7-prepared-action-contract.ts` and `projection/contracts/v1-8-execution-boundary-contract.ts` mostly use stable `SoloCrew*` type names, but still expose canonical-looking `V17_*` and `V18_*` boundary constants. `projection/adapters/v1-7-prepared-action-adapter.ts` and `projection/adapters/v1-8-execution-boundary-adapter.ts` are acceptable only if treated as compatibility adapters, not canonical product adapters.
- V2.3/V2.4 domain object versioning appears in current app contracts and workflows, including `V2_3PilotIntakeRecord`, `V2_3ManualPaymentRecord`, `V2_3NextActionProposal`, `V2_3PilotFeedbackRecord`, `V2_3CaseStudyPermissionRecord`, `V2_4PilotOnboardingPacket`, `V2_4CommercializationReadinessDashboard`, `V2_4PilotFeedbackEvidenceRecord`, and `V2_4CaseStudyConversionGate`.
- Source-ref field versioning appears in fields such as `v2_3_stable_tag`, `v2_3_stable_commit`, `v2_4_dashboard_ref`, `v2_4_onboarding_packet_ref`, `v2_4_feedback_evidence_ref`, `v2_2_stable_tag`, `v2_2_stable_commit`, `related_v2_2_workspace_id`, and `related_v2_3_intake_status`.
- README reads primarily as a release-history ledger. It is accurate as evidence, but it should become product-entry-first after canonical names exist.
- `paid pilot` is currently too close to a root object identity. It should become `EngagementStage.paid_pilot` plus `CommercialMode.manual_paid_pilot`, not the permanent root system object.

Governance conclusion:

The next correction line should introduce stable canonical names and metadata shapes first, then migrate active imports and source-ref fields without erasing release trace.

## 3. Version Usage Policy

Version numbers are allowed in:

- release tags
- release records
- audit records
- governance records
- changelog entries
- migration records
- compatibility adapters
- historical fixtures and tests
- release evidence fixture names
- metadata values such as `release_line`, `source_release_ref`, `baseline_release_ref`, `migration_from`, and `migration_to`

Version numbers are forbidden in new canonical product surfaces:

- domain object names
- exported canonical types and interfaces
- workflow/helper function names
- active page model names
- active route constants
- field names
- source-ref field names
- product capability names
- canonical app contracts
- canonical projection contracts

Allowed exception:

- A versioned name may remain as a deprecated compatibility alias or historical wrapper when it preserves release trace or prevents breaking existing imports. The alias must not be the canonical export for new product code.

Required metadata alternative:

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

## 4. Canonical Product Model

Stable canonical concepts:

| Concept | Meaning |
| --- | --- |
| `Engagement` | Durable founder/customer work unit that can move through candidate, pilot, review, conversion, and archival states. |
| `EngagementParticipant` | Person or organization participating in an engagement, including founder, operator, design partner, or reviewer roles. |
| `EngagementStage` | Lifecycle stage for an engagement. |
| `CommercialMode` | Commercial posture of the engagement without implying readiness or automation. |
| `EngagementOnboardingPacket` | Stable expectation/input/support-boundary packet for an engagement. |
| `EngagementEvidenceRecord` | Stable evidence record for feedback, support burden, continuation value, and learning. |
| `EngagementReadinessView` | Founder-facing local review view of engagement evidence and operational posture. |
| `EngagementReviewGate` | Manual gate for founder review decisions. |
| `EngagementOutcomeReview` | Manual post-engagement outcome review. |
| `ReferencePermissionReview` | Manual permission review for private reference or anonymized quote posture. |
| `ConversionReview` | Manual conversion-review posture without automatic conversion. |
| `SupportBurdenReview` | Manual review of operator support load and risk. |
| `FounderReviewQueue` | Local review queue for founder/operator decisions. |

`EngagementStage` values:

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

`CommercialMode` values:

- `free_discovery`
- `manual_paid_pilot`
- `manual_service`
- `subscription_candidate`
- `enterprise_candidate`

Canonical posture:

- These concepts are SoloCrew product-local.
- They do not redefine Cognitive_OS law.
- They do not define MPLP law.
- They do not imply public beta, paid product readiness, commercial readiness, production readiness, V3.0 release, MPLP certification, or MPLP endorsement.

## 5. Current-to-Canonical Mapping

| Current name | Canonical target | Migration note |
| --- | --- | --- |
| `V2_4PilotOnboardingPacket` | `EngagementOnboardingPacket` | Keep `V2_4PilotOnboardingPacket` as deprecated compatibility alias during transition. |
| `V2_4CommercializationReadinessDashboard` | `EngagementReadinessView` | Use readiness view language; avoid commercial-ready implication. |
| `V2_4PilotFeedbackEvidenceRecord` | `EngagementEvidenceRecord` | Preserve pilot feedback as evidence category, not root identity. |
| `V2_4CaseStudyConversionGate` | `EngagementReviewGate` / `ConversionReview` / `ReferencePermissionReview` | Split case-study permission and conversion review semantics under manual review gates. |
| `V2_3PilotIntakeRecord` | `EngagementCandidateIntake` | Treat pilot intake as candidate intake for an engagement. |
| `V2_3ManualPaymentRecord` | `EngagementCommercialRecord` or `ManualPaymentStatusRecord` | Keep payment as manual status tracking only. |
| `paid_pilot_loop` | `EngagementLoop` with stage/mode metadata | Use `EngagementStage.paid_pilot` and `CommercialMode.manual_paid_pilot`. |
| `v2_3_stable_tag` | `baseline_release_ref` | Store release identity as metadata value. |
| `v2_3_stable_commit` | `baseline_commit_ref` | Store commit identity as metadata value. |
| `v2_4_dashboard_ref` | `readiness_view_ref` | Remove version from source-ref field name. |
| `v2_4_onboarding_packet_ref` | `onboarding_packet_ref` | Remove version from source-ref field name. |
| `v2_4_feedback_evidence_ref` | `evidence_record_ref` | Remove version from source-ref field name. |
| `V2FounderDashboardPageModel` | `FounderDashboardPageModel` | Keep V2 helper as compatibility wrapper. |
| `V11IntakeToPacketPageModel` | `IntakeToPacketPageModel` | Keep V11 helper as compatibility wrapper. |
| `V17PreparedActionPageModel` | `PreparedActionPageModel` | Canonicalize active shell/page usage. |
| `V18ExecutionBoundaryPageModel` | `ExecutionBoundaryPageModel` | Canonicalize active shell/page usage. |
| `V17_PREPARED_ACTION_BOUNDARY_LINES` | `PREPARED_ACTION_BOUNDARY_LINES` | Keep V17 const as deprecated alias. |
| `V18_EXECUTION_BOUNDARY_LINES` | `EXECUTION_BOUNDARY_LINES` | Keep V18 const as deprecated alias. |

Additional active-surface mappings:

| Current surface | Canonical target |
| --- | --- |
| `V2_FOUNDER_DASHBOARD_ROUTE` | `FOUNDER_DASHBOARD_ROUTE` |
| `/portfolio/v2/founder-dashboard` | stable founder dashboard route plus optional compatibility/archive route |
| `page_kind: "v2_founder_dashboard_page"` | stable founder dashboard page kind |
| `operator_surface: "v2_founder_dashboard_productized"` | stable founder dashboard operator surface |
| `product_line: "v2_0"` | `release_line` metadata value |
| `v2_0_ready` / `v2_0_delivered` | stable no-claim/readiness metadata fields |
| `CreateV2_2FounderDashboardContinuationInput` | `CreateFounderDashboardContinuationInput` |
| `create_v2_2_founder_dashboard_continuation_page_model` | `create_founder_dashboard_continuation_page_model` |

## 6. Compatibility Alias Strategy

Rules:

- Canonical exports become stable names.
- Versioned exports remain as deprecated compatibility aliases.
- New product code must import canonical names.
- Historical release files are not renamed.
- Tests may keep versioned evidence fixtures.
- Existing versioned helpers may remain as thin wrappers where needed.
- Compatibility aliases must not introduce new behavior.
- Compatibility wrappers must preserve deterministic behavior and current tests.
- Compatibility alias comments should be short and factual.

Alias migration pattern:

1. Add canonical type/function/constant export in the same module or in a stable module.
2. Re-export old versioned name as alias to canonical name.
3. Migrate active app/projection imports to canonical names.
4. Keep historical tests/fixtures versioned until stable evidence wrappers exist.
5. Remove or quarantine versioned aliases only after a separate owner-authorized cleanup wave.

Forbidden alias behavior:

- No broad rename in the first alias wave.
- No runtime behavior changes.
- No release evidence rewrite.
- No new readiness claims.
- No auto-conversion, dispatch, payment, CRM, email, publishing, LLM/model/agent/tool, SaaS, or autonomous execution behavior.

## 7. Active Surface Correction Strategy

Phase 1: canonical aliases and metadata fields

- Add stable canonical aliases and metadata shapes in product-local app/projection modules.
- Introduce `baseline_release_ref`, `baseline_commit_ref`, `source_release_ref`, `source_commit_ref`, `release_line`, `contract_version`, `schema_version`, and `compatibility_profile` shapes.
- Add stable boundary constants such as `PREPARED_ACTION_BOUNDARY_LINES` and `EXECUTION_BOUNDARY_LINES`.
- Keep all versioned exports working.

Phase 2: migrate active imports and page models

- Migrate `app/commercialization` imports to canonical engagement names.
- Migrate `app/dashboard` from V2.2 dashboard continuation names to stable dashboard continuation names.
- Migrate `app/pages` away from V1.x/V2.x model imports, route constants, page kinds, and rendered section names where feasible without route breakage.
- Migrate `app/shell` helper imports and canonical helper names from `createV*` to stable helper names.
- Migrate `projection/contracts` and `projection/adapters` to stable canonical constants and helper names while keeping compatibility aliases.

Phase 3: source-ref field migration

- Replace versioned source-ref fields in canonical contracts with metadata-backed stable fields.
- Preserve old source-ref fields only through compatibility summaries or explicit migration wrappers.
- Keep release evidence fields as values, not field names.

Phase 4: README product-entry rewrite

- Make README describe SoloCrew first as an engagement workflow product and local founder review system.
- Move V2.2/V2.3/V2.4 details into concise release history and governance references.
- Preserve all no-claim boundaries.
- Do not claim public beta, paid product readiness, commercial readiness, production readiness, V3.0 release, MPLP certification, or MPLP endorsement.

Phase 5: optional file rename only after tests stabilize

- Do not rename files until canonical exports/imports are stable.
- If file renames are later authorized, rename in small batches with compatibility redirects or barrel exports where the repo pattern supports it.
- Preserve release evidence file names in governance, historical fixtures, and historical tests.

Surface-specific posture:

| Surface | Correction posture |
| --- | --- |
| `app/commercialization` | Canonical engagement aliases first; retain V2.4 aliases. |
| `app/dashboard` | Stable founder dashboard continuation contract first; V2.2 alias retained. |
| `app/pages` | Stable routes/page models first; versioned routes only as compatibility/archive if still needed. |
| `app/shell` | Stable helper names first; `createV*` helpers become thin wrappers. |
| `projection/contracts` | Stable constants and canonical contract exports first. |
| `projection/adapters` | Quarantine versioned adapters as compatibility, then add stable adapter names. |
| `projection/fixtures` | Preserve versioned release evidence; add stable fixtures only when current product code needs them. |
| `tests/app` | Preserve release regression tests; add canonical import tests in alias/migration waves. |
| `README` | Rewrite product-first after canonical names exist. |
| `CHANGELOG` | Preserve release ledger and add concise governance entries only. |

## 8. Delivery-Line Governance

Corrected version plan:

- V2.4 Stable is complete.
- V2.4.x is maintenance, hotfix, evidence-backfill, no-claim hardening, and semantic correction only.
- V2.5, if retained, is the Product Semantic Stabilization / Engagement Canonicalization Line, not a new feature line.
- V2.6 is not predeclared.
- V3.0 is reserved for the First Deliverable Engagement Operating Loop.
- V3.0 must meet true delivery criteria before being called true delivery.

V2.5 allowed scope:

- canonical aliases
- stable metadata contracts
- active import migration
- source-ref migration
- README product-entry restructuring
- no-claim grep hardening
- compatibility wrapper tests
- deterministic regression coverage

V2.5 non-scope:

- new product runtime behavior
- public beta
- paid product readiness
- commercial readiness
- production-ready status
- V3.0 implementation
- payment processor
- checkout
- subscription
- CRM integration
- email dispatch
- public publishing
- testimonial publishing
- external analytics
- LLM call
- tool invocation
- SaaS sharing
- autonomous execution
- Cognitive_OS modification
- MPLP-Protocol modification
- MPLP certification or endorsement

V3.0 true delivery criteria:

- founder-usable entry point
- create/load engagement records
- run local engagement loop end-to-end
- founder review packet output
- persistence or repeatable local session/history
- operator runbook
- no hidden test fixture dependency
- no developer-only mandatory workflow
- no-claim boundaries preserved

V3.0 may not be opened as implementation until V2.5 semantic stabilization gates pass or the owner explicitly rejects V2.5 and authorizes a direct delivery-line plan.

## 9. Next Implementation Waves

### A. SOLOCREW-V2.5-CANONICAL-ENGAGEMENT-ALIASES-AND-METADATA-CONTRACTS-01

Purpose:

Introduce stable canonical aliases and metadata shapes without breaking existing imports.

Expected outputs:

- stable engagement alias contracts
- source/baseline release metadata shapes
- stable boundary constants for prepared action and execution boundary
- compatibility aliases for existing V2.3/V2.4/V1.x/V2.x exports
- tests proving aliases are no-op and deterministic

### B. SOLOCREW-V2.5-ACTIVE-SURFACE-CANONICAL-IMPORT-MIGRATION-01

Purpose:

Migrate active app/page/shell/projection imports to canonical names while preserving compatibility exports.

Expected outputs:

- active imports use stable canonical names
- page/shell models expose stable canonical helpers
- versioned helpers remain wrappers
- regression tests confirm no behavior change

### C. SOLOCREW-V2.5-README-PRODUCT-ENTRY-AND-RELEASE-HISTORY-RESTRUCTURE-01

Purpose:

Make README product-first and move release line details into concise history/governance references.

Expected outputs:

- product-first README entry point
- compact release history section
- preserved no-claim boundaries
- no release/tag/package/public/commercial readiness claim

### D. SOLOCREW-V3.0-DELIVERABLE-ENGAGEMENT-OPERATING-LOOP-PLANNING-01

Purpose:

Open true delivery planning only after V2.5 semantic stabilization gates pass.

Expected outputs:

- owner-authorized V3.0 planning only
- true delivery acceptance gates
- founder-usable entry point plan
- persistence/session-history plan
- no public/commercial/production readiness claim unless separately authorized

## 10. Risk Matrix

| Risk | Severity | Mitigation |
| --- | --- | --- |
| Breaking tests | high | Add aliases before import migration; run existing V2.3/V2.4 and app/page/projection regressions. |
| Losing release trace | high | Preserve release tags, governance docs, changelog entries, and historical fixture/test names. |
| Over-renaming | high | Do not rename files in early waves; migrate exports/imports first. |
| Compatibility alias sprawl | medium | Mark aliases as transitional and track removal only in a later owner-authorized cleanup. |
| Hidden active import breakage | high | Use `rg` inventory and targeted import tests before each migration batch. |
| Confusing product users | medium | Rewrite README only after canonical names are present. |
| Delaying delivery | medium | Treat semantic stabilization as a delivery prerequisite, not cosmetic cleanup. |
| Public/commercial readiness overclaim | high | Keep no-claim grep gates mandatory through every wave. |
| Upstream boundary pollution | high | Keep Cognitive_OS and MPLP as upstream authorities; do not redefine their law in SoloCrew. |

## 11. Final Decision

SOLOCREW_SEMANTIC_NAMING_GOVERNANCE_PASS_READY_FOR_CANONICAL_ALIAS_WAVE

Rationale:

- The audit identified real active-surface versioning in app/dashboard/pages/shell/projection, not just historical test or fixture evidence.
- Canonical product concepts can be introduced safely as aliases before any broad rename.
- V2.5 has a coherent purpose if limited to Product Semantic Stabilization / Engagement Canonicalization.
- V3.0 should be reserved for true deliverable engagement operation after semantic stabilization gates pass.

This governance wave performs no runtime behavior change, no broad code rename, no file rename, no release, no tag, no package, no V2.5 implementation, no V3.0 implementation, no Cognitive_OS modification, and no MPLP-Protocol modification.

## 12. Next Allowed Task

SOLOCREW-V2.5-CANONICAL-ENGAGEMENT-ALIASES-AND-METADATA-CONTRACTS-01

This next task requires separate owner authorization and should introduce stable canonical aliases plus metadata contracts without breaking existing imports or changing runtime behavior.
