# SOLOCREW-V2.2-FIRST-USABLE-PRIVATE-ALPHA-PLAN-v0.1

## 1. Document Control

- doc_id: SOLOCREW-V2.2-FIRST-USABLE-PRIVATE-ALPHA-PLAN-v0.1
- task_id: SOLOCREW-V2.2-FIRST-USABLE-PRIVATE-ALPHA-SCOPE-AND-IMPL-PLAN-01
- status: Scope and Implementation Plan
- version_line: V2.2 First Usable Private Alpha
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- source_research: governance/research/SOLOCREW-COMMERCIAL-DELIVERY-TRI-REPO-RESEARCH-v0.1.md
- starting_head: 72db2e78a703079dad74d4a6d49f7968f9eb3e8e
- v2_1_release_state: V2.1 RC exists; V2.1 stable is not present and is not created by this plan.

## 2. Executive Decision

V2_2_FIRST_USABLE_PRIVATE_ALPHA_SCOPE_READY

V2.2 is the next actual SoloCrew development version. V3.0 remains the strategic Commercial GA / Killer App Candidate destination, but versions must proceed sequentially: V2.2 -> V2.3 -> V2.4 -> V3.0.

This plan opens no implementation. It defines the V2.2 scope and future implementation map only.

## 3. V2.2 Product Goal

Make SoloCrew usable by a private-alpha founder for one complete Developer Company / Project Governance journey without requiring the user to understand MPLP, Cognitive_OS, runtime projections, or internal governance objects.

The user should be able to:

1. start or restore a workspace;
2. submit a developer/project-governance request;
3. receive the V2.1 review-only chain as a coherent journey;
4. save and return later;
5. see continuation and next review step on the founder dashboard;
6. export a review packet for human use;
7. remain inside no-execution, no-dispatch, no-marketplace boundaries.

## 4. Acceptance Criteria

| Gate | Acceptance criterion |
| --- | --- |
| V2.2-AC-01 | A private-alpha demo workspace can be created, saved, listed, restored, and resumed. |
| V2.2-AC-02 | Workspace history records the key journey steps and review packet exports in order. |
| V2.2-AC-03 | Developer Company / Project Governance journey composes SecretaryRoutingProposal -> ManagementDirective -> CellCEOAssemblyPlanPreview -> ProjectGovernanceAssetFamilyMapping -> ReviewPacketExport. |
| V2.2-AC-04 | Founder dashboard continuation shows last saved step, pending review packet, evidence refs, and next review action. |
| V2.2-AC-05 | Review packet export is local, deterministic, human-readable, and non-executing. |
| V2.2-AC-06 | User-facing copy does not require MPLP/Cognitive_OS literacy. |
| V2.2-AC-07 | Tests cover create/save/restore/continue/export and boundary flags. |
| V2.2-AC-08 | No provider/channel dispatch, marketplace implementation, autonomous execution, TracePilot Cell, MPLP endorsement, paid-product claim, release, tag, or package publication. |

## 5. Exact User Journey

The V2.2 private-alpha journey is Developer Company / Project Governance only:

1. User opens a private-alpha workspace or creates a demo workspace.
2. User enters a request such as: "Help me prepare governance for a repo release and architecture review."
3. SoloCrew stores the request in the workspace history.
4. SecretaryRoutingProposal recommends the Development Company Cell.
5. User reviews and accepts the route.
6. ManagementDirective creates a review-only selected Cell handoff.
7. CellCEOAssemblyPlanPreview lists review-only asset categories.
8. ProjectGovernanceAssetFamilyMapping maps the preview to developer project-governance asset family references.
9. SoloCrew creates a local ReviewPacketExport containing request, route, directive, assembly preview, project-governance mapping, evidence refs, boundary notices, and next review step.
10. User leaves and returns later.
11. Founder dashboard continuation surfaces the workspace, latest journey step, packet export status, and next review action.

## 6. Workspace And History Model

V2.2 should add a SoloCrew product-local workspace layer, not new Cognitive_OS runtime law.

Minimum workspace fields:

- workspace_id
- workspace_label
- primary_vertical: development_company_project_governance
- created_at / updated_at
- storage_paths for runtime sqlite, artifacts, actions, learning/drift, V2.2 workspace history, and review packet exports
- active_journey_id
- latest_step
- next_review_action
- non_executing and boundary flags

Minimum history event fields:

- event_id
- workspace_id
- journey_id
- event_kind
- event_summary
- source_refs
- safe_evidence_refs
- created_at
- runtime_private_fields_omitted: true

Reuse the existing `createRuntimeSession` sqlite mode and existing file-backed product stores. Do not move product workspace law into Cognitive_OS.

## 7. Review Packet Export Boundary

ReviewPacketExport is a SoloCrew product artifact for human review only.

It may include:

- founder request summary
- Secretary routing proposal summary
- Management Directive summary
- Cell CEO Assembly Plan Preview summary
- Project Governance Asset-Family Mapping summary
- safe evidence refs
- boundary notices
- next review action
- exported_at

It must not include:

- raw Cognitive_OS runtime-private records
- provider/channel dispatch payloads
- executable instructions
- marketplace/resolver outputs
- TracePilot integration objects
- MPLP certification or endorsement language
- paid-product readiness claims

Recommended formats for V2.2 implementation: deterministic JSON plus Markdown rendering. PDF, SaaS sharing, and public packet templates can wait for later versions.

## 8. Founder Dashboard Continuation

V2.2 should extend the existing V2 founder dashboard surface with workspace continuation state:

- visible saved workspace list or selected workspace summary
- active Developer Company / Project Governance journey status
- latest saved step
- pending review packet summary
- last export timestamp/path
- next review action
- boundary notices

The dashboard remains product-facing and non-executing. It should hide MPLP/Cognitive_OS terms from the private-alpha user unless shown in diagnostic/source fields.

## 9. Private-Alpha Demo Fixture

V2.2 requires one demo workspace fixture:

- vertical: Developer Company / Project Governance
- starter Cell: development_company
- request: repo release / architecture review / governance packet
- populated route/directive/assembly/mapping chain
- one review packet export
- one saved continuation point

The fixture is a product demo and test seed only. It is not a TracePilot integration, project import, codebase analysis, drift detection run, evidence pack generation, or paid-product claim.

## 10. Reuse-First Implementation Map

Existing files likely to be reused:

- app/shell/create-runtime-session.ts
- app/shell/load-runtime-session.ts
- app/shell/runtime-session-facade.ts
- app/shell/create-v2-founder-dashboard-page-model.ts
- app/shell/create-secretary-routing-proposal-page-model.ts
- app/shell/create-management-directive-preview-page-model.ts
- app/shell/create-cell-ceo-assembly-plan-preview-page-model.ts
- app/shell/create-project-governance-asset-family-mapping-page-model.ts
- app/artifacts/artifact-store.ts
- app/artifacts/artifact-workflow.ts
- app/actions/action-store.ts
- app/actions/action-workflow.ts
- app/learning/learning-drift-store.ts
- app/learning/learning-workflow.ts
- app/learning/drift-workflow.ts
- projection/assembly/secretary-routing-proposal.ts
- projection/assembly/management-directive.ts
- projection/assembly/cell-ceo-assembly-plan-preview.ts
- projection/assembly/project-governance-asset-family-mapping.ts
- projection/assembly/secretary-handoff-review-packet.ts
- projection/contracts/secretary-handoff-review-packet-contract.ts
- projection/fixtures/starter-cell-fixtures.ts
- tests/app/sqlite-roundtrip.test.ts
- tests/app/return-and-continue.test.ts
- tests/app/v2-founder-dashboard-page.test.ts
- tests/app/*secretary-routing-proposal*
- tests/app/*management-directive*
- tests/app/*cell-ceo-assembly-plan-preview*
- tests/app/*project-governance-asset-family-mapping*
- tests/projection/v2.1-hardening-boundary.test.ts

Files likely to be added in future V2.2 implementation waves:

- app/workspaces/workspace-contract.ts
- app/workspaces/workspace-store.ts
- app/workspaces/workspace-workflow.ts
- app/review-packets/review-packet-export-contract.ts
- app/review-packets/review-packet-exporter.ts
- app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts
- app/shell/create-v2-2-project-governance-journey-page-model.ts
- projection/fixtures/v2-2-private-alpha-workspace-fixture.ts
- tests/app/v2-2-workspace-continuity.test.ts
- tests/app/v2-2-review-packet-export.test.ts
- tests/app/v2-2-founder-dashboard-continuation.test.ts
- tests/app/v2-2-project-governance-journey.test.ts
- tests/projection/v2-2-boundary.test.ts

Existing files likely to be modified in future V2.2 implementation waves:

- app/shell/create-v2-founder-dashboard-page-model.ts, only if extension is cleaner than a new V2.2 page model
- projection/fixtures/starter-cell-fixtures.ts, only to reference the V2.2 demo fixture without changing Cell kind semantics
- README.md and CHANGELOG.md, only after implementation and without release claims

## 11. First Implementation Slice Recommendation

Recommended first implementation slice:

SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY

Scope:

- add product-local workspace contract/store/workflow;
- wire workspace storage paths to existing sqlite runtime session and JSON product stores;
- support create/list/load/save history/restore latest continuation;
- include the private-alpha demo workspace seed;
- test roundtrip and boundary flags.

Reason:

Review packet export and dashboard continuation both depend on stable workspace identity, storage paths, and ordered history. Starting with workspace/session continuity keeps V2.2 practical instead of producing another static projection surface.

## 12. Test Plan

Required future V2.2 tests:

- workspace create/list/load/restore roundtrip;
- sqlite runtime session path preserved under workspace;
- history events append deterministically;
- Developer Company / Project Governance journey composes the full V2.1 chain;
- review packet export contains required summaries and excludes forbidden runtime/private/execution/provider/marketplace fields;
- founder dashboard continuation surfaces last step, pending packet, next review action, and boundary notices;
- private-alpha demo fixture can be loaded without MPLP/Cognitive_OS user-facing literacy;
- boundary grep and V2.1 hardening tests remain passing.

Existing tests to keep in the validation loop:

- npm test
- tests/app/sqlite-roundtrip.test.ts
- tests/app/return-and-continue.test.ts
- tests/app/v2-founder-dashboard-page.test.ts
- tests/app/secretary-routing-proposal-page-model.test.ts
- tests/app/management-directive-preview-page-model.test.ts
- tests/app/cell-ceo-assembly-plan-preview-page-model.test.ts
- tests/app/project-governance-asset-family-mapping-page-model.test.ts
- tests/projection/secretary-routing-proposal.test.ts
- tests/projection/management-directive.test.ts
- tests/projection/cell-ceo-assembly-plan-preview.test.ts
- tests/projection/project-governance-asset-family-mapping.test.ts
- tests/projection/v2.1-hardening-boundary.test.ts

## 13. Upstream Dependency Decision

Cognitive_OS changes required now: none.

Reason:

V2.2 can use SoloCrew product-local workspace persistence plus existing Cognitive_OS neutral projection-safe surfaces already available through the sealed runtime-session bridge and projection-safe contracts. No SoloCrew/founder/Secretary/product-specific runtime law is required.

Possible later neutral Cognitive_OS research, only if V2.2 implementation proves repeated cross-product need:

- WorkspaceContinuationEnvelope
- ReviewPacketEnvelope
- OutcomeFeedbackEnvelope
- ProductProjectionPersistenceEnvelope

MPLP changes required now: none.

Reason:

V2.2 needs product workflow, local persistence, and export packaging. It does not require protocol/schema change, protocol certification, product endorsement, runtime endorsement, or MPGC promotion. Any future MPLP note must be candidate/backlog-only after V2.2/V2.3 evidence.

## 14. Explicit Non-Goals

V2.2 does not include:

- V3.0 release, tag, package, or claim;
- V2.3 paid pilot, invoice/payment flow, case-study flow, or paid-product readiness claim;
- V2.4 public beta, public landing/demo story, pricing/waitlist, or public onboarding;
- autonomous execution;
- provider dispatch or channel dispatch;
- marketplace implementation, asset resolver, or asset installation;
- TracePilot Cell, TracePilot internal object naming, project import, codebase analysis, drift detection execution, or evidence pack generation;
- MPLP schema/protocol change, MPLP endorsement, or protocol certification;
- Cognitive_OS product-specific runtime law;
- release/tag/package publication.

## 15. Version Sequencing

V2.2 is not an internal gate of V3.0. It is the next actual version.

Sequence:

- V2.2: First Usable Private Alpha.
- V2.3: First Paid Pilot.
- V2.4: Public Beta.
- V3.0: Commercial GA / Killer App Candidate.

Do not skip V2.2, V2.3, or V2.4. Do not rename these versions as V3.0 gates. V3.0 remains the destination only after the earlier versions land in order.

## 16. Final Recommendation

Next owner-authorized implementation wave should be:

SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY

This wave should be opened only after owner authorization and should remain bounded to V2.2 private-alpha usability, not V2.3 paid pilot, V2.4 public beta, or V3.0 GA.
