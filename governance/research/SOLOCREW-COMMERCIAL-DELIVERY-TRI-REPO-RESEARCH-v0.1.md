# SOLOCREW-COMMERCIAL-DELIVERY-TRI-REPO-RESEARCH-v0.1

## 1. Document Control

- doc_id: SOLOCREW-COMMERCIAL-DELIVERY-TRI-REPO-RESEARCH-v0.1
- status: Commercial Delivery Research
- task_id: SOLOCREW-COMMERCIAL-DELIVERY-TRI-REPO-RESEARCH-01
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- repos inspected:
  - SoloCrew: https://github.com/Coregentis/SoloCrew.git
  - Cognitive_OS: https://github.com/Coregentis/Cognitive_OS.git
  - MPLP-Protocol: https://github.com/Coregentis/MPLP-Protocol.git
- heads inspected:
  - SoloCrew main: ad4446655a4ce0c793f8c70649b14815065dc884
  - Cognitive_OS main: ccb8f486d140fd06584b1feee850005430c695d6
  - MPLP-Protocol main: 0cf0477938340a443614d03d9fb51ac764b960c7
- trace_tags:
  - solocrew/commercial-delivery
  - v2_2-alpha
  - v2_3-paid-pilot
  - v2_4-public-beta
  - v3_0-commercial-ga
  - tri-repo-boundary

## 2. Executive Decision

COMMERCIAL_DELIVERY_RESEARCH_READY

SoloCrew is architecture-safe and has useful local-first scaffolds, but it is not yet a commercially usable product. The next work should be commercial delivery planning for V2.2, centered on one complete Developer Company / Project Governance journey with persistence, continuation, review packet export, and a founder-facing dashboard that requires no MPLP or Cognitive_OS understanding.

## 3. Current Product Reality

Current SoloCrew allows a user or tester to exercise local, non-executing product surfaces:

- V2.0 local-first scaffolds for starter Cells, founder dashboard, artifact draft/save/revise/archive/history/reload, learning and drift capture, bounded action-class routing, and local SQLite runtime-session continuity tests.
- V2.1 review-only chain: SecretaryRoutingProposal -> ManagementDirective -> CellCEOAssemblyPlanPreview -> ProjectGovernanceAssetFamilyMapping -> human review -> STOP.
- Product projection objects, page models, fixtures, tests, and governance records with explicit no-dispatch, no-provider, no-approval, no-autonomous-execution boundaries.

Current SoloCrew cannot yet support a real user for multiple days as a commercial product because it lacks an integrated workspace model, durable product-level history across the V2.1 journey, saved/exportable review packets, onboarding, demo flow, pricing/waitlist/payment path, structured feedback loop, public beta polish, and a paid-pilot workflow with a concrete outcome.

The commercially meaningful first usable version is V2.2. V2.1 should remain an engineering baseline / review-only chain / RC-stable candidate, not a paid-product claim.

## 4. Commercial Delivery Thresholds

| Version | Commercial threshold | Required user value |
| --- | --- | --- |
| V2.1 | Engineering baseline / review-only chain / RC-stable | Prove the safe Secretary-to-Cell planning chain without execution. |
| V2.2 | First Usable Private Alpha | User can start, save, return, continue, and export one complete Developer Company / Project Governance review packet. |
| V2.3 | First Paid Pilot | Design partner can pay manually and complete one governed project-planning workflow with next-action proposal and feedback capture. |
| V2.4 | Public Beta | Public onboarding/demo/pricing path exists; a user can complete one meaningful workflow in under 10 minutes. |
| V3.0 | Commercial GA / Killer App Candidate | Subscription-ready SaaS path, stronger persistence, multi-cell operating rhythm, outcome feedback, support, and human-confirmed execution handoff. |

## 5. SoloCrew Capability Inventory

| Capability | Classification | Evidence / finding |
| --- | --- | --- |
| workspace/session persistence | PARTIAL | `createRuntimeSession` supports memory/sqlite; product-level workspace abstraction is absent. |
| local history | PARTIAL | Artifact history, learning/drift records, action outcomes, and continuity tests exist; unified user history is absent. |
| saved review packets | PARTIAL | Review packet and pending review surfaces exist; V2.1 chain is not saved as a coherent packet. |
| exportable artifacts | PARTIAL | Local artifact records and context/plan export-status views exist; commercial review packet export is absent. |
| founder dashboard continuation | PARTIAL | Founder dashboard page models and suggested next actions exist; return-and-continue across product journey is not integrated. |
| onboarding/demo flow | ABSENT | No polished first-run or demo workspace flow found. |
| pricing/waitlist/payment | ABSENT | No pricing, waitlist, checkout, invoice, or payment path. |
| feedback capture | PARTIAL | Learning feedback capture exists for artifacts; paid-pilot/customer feedback loop is absent. |
| project governance packet | PARTIAL | V2.1 ProjectGovernanceAssetFamilyMapping exists as mapping-only; exportable governance packet is absent. |
| next-action proposal | PARTIAL | Suggested next actions and non-executing recommendations exist; not integrated into a paid pilot close loop. |
| user-facing page models | PRESENT | Many app/shell page models exist, including V2 dashboard and V2.1 previews. |
| multi-day continuation | PARTIAL | SQLite/runtime tests prove bounded continuity; multi-day product workspace is absent. |
| evidence/review trail | PARTIAL | Evidence refs and review summaries exist; product-level evidence trail/export is incomplete. |
| no-execution HITL boundary | PRESENT | V2.1 contracts and tests explicitly block execution, dispatch, approval, marketplace, resolver, and TracePilot integration. |
| saved workspaces | ABSENT | No durable workspace entity or workspace list/restore flow. |
| public landing/demo story | ABSENT | No public product story or beta funnel. |
| subscription-ready SaaS path | ABSENT | Package is private; no SaaS auth, billing, tenant, or support path. |

Usable product surfaces today: founder dashboard page models, artifact workflow, learning/drift workflow, bounded action workflow, SecretaryRoutingProposal, ManagementDirective, CellCEOAssemblyPlanPreview, and ProjectGovernanceAssetFamilyMapping.

Internal architecture/projection objects today: asset-type vocabulary, runtime-private compatibility bridge, projection boundary helpers, V2.1 boundary flags, fixture-driven runtime projections, sealed Cognitive_OS compatibility imports, and mapping-only asset-family references.

## 6. Cognitive_OS Dependency Findings

Cognitive_OS already exposes neutral projection-safe contracts SoloCrew can use:

- session/continuity: RuntimeLifecycleContinuityProjection, RuntimePendingReviewProjection, RuntimeContinuitySnapshotProjection, runtime VSL continuity state, and in-memory projection store continuity methods.
- review/evidence: RuntimeProjectionSummaryEnvelope, RuntimeEvidencePostureSummary, RuntimeProjectionRevisionEnvelope, RuntimeEvidenceInsufficiencyDetail.
- workspace memory signals: RuntimeStateProjection, OperationalUnitRuntimeProjection, WorkforceProjectionSafeEnvelope, runtime memory/preference stores.
- action-preparation boundary: PreparedActionProjection and ExecutionBoundaryProjection, both non-executing and projection-safe.

Needed V2.2 work does not require product-specific Cognitive_OS law. SoloCrew can proceed using current neutral surfaces plus product-local persistence. A separate Cognitive_OS planning wave is useful only if SoloCrew needs durable neutral envelopes beyond the current in-memory projection store, for example WorkspaceContinuationEnvelope, ReviewPacketEnvelope, OutcomeFeedbackEnvelope, or ProductProjectionPersistenceEnvelope.

V2.3 paid pilot can start without Cognitive_OS protocol/law changes if payment, onboarding, review packet export, and feedback remain SoloCrew product features. Upstream work becomes important if multiple downstream products need the same durable review packet, outcome feedback, or product projection persistence envelopes.

## 7. MPLP Boundary Findings

No immediate MPLP schema or protocol change is required for commercial delivery.

The inspected MPLP repository is protocol_version 1.0.0 frozen, vendor-neutral, and explicit that downstream candidate tracking is non-normative unless MPGC promotes it. SoloCrew commercial needs are product/runtime implementation details: workspace persistence, review packet export, onboarding, pricing, feedback, and bounded human-confirmed handoff. These must not be represented as MPLP endorsement of SoloCrew, Cognitive_OS, TracePilot, or Coregentis runtime behavior.

Possible future candidate/backlog topics after V2.2/V2.3 evidence: lifecycle governance guide/profile candidates, evidence vocabulary candidates, stop/escalation/revision posture candidates, and continuity/review packet patterns. Any such note should remain candidate-only, not schema change, no runtime endorsement, no product endorsement.

## 8. First Paid Vertical Recommendation

| Vertical | Current readiness | Pain strength | Complexity | Cognitive_OS dependency | Monetization | Market story | Risk |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Developer Company / Project Governance | Highest; V2.1 mapping explicitly targets it | High for solo builders managing repo/release/governance decisions | Medium | Low to medium; current neutral continuity/review surfaces help | High for paid pilot | Strong: "one-person dev company governance co-pilot" | Could become too abstract without packet/export outcome |
| E-commerce | Fixture and artifact support exist | Medium-high | High due catalog/channel/payment realities | Medium | Medium-high | Understandable | Execution/channel temptation too early |
| Personal Media | Fixture and artifact support exist | Medium | Medium | Low | Medium | Clear but crowded | Weak paid trigger unless tied to publishing outcomes |
| General one-person company workspace | Broad but diffuse | Medium | High | Medium | Unclear | Ambitious | Too abstract and hard to sell first |

Recommended first paid vertical: Developer Company / Project Governance.

## 9. Recommended Commercial Roadmap

V2.1:

- Keep as engineering baseline / review-only chain / RC-stable candidate.
- No paid-product claim.
- No marketplace, execution, provider dispatch, or protocol change.

V2.2:

- Build First Usable Private Alpha.
- Must have: workspace/session continuity, saved workspace history, founder dashboard continuation, review packet export, one complete Developer Company / Project Governance journey, return-and-continue, no MPLP/Cognitive_OS user literacy requirement.
- Expected SoloCrew changes: product workspace model, saved V2.1 journey state, review packet exporter, dashboard continuation page, demo/private-alpha fixture, evidence trail.
- Expected Cognitive_OS dependency: consume existing neutral continuity/review projection surfaces; no product-specific runtime law.
- MPLP action: none.

V2.3:

- Build First Paid Pilot.
- Must have: one paid-pilot workflow, design partner onboarding, exportable project governance packet, clear next-action proposal, feedback capture, manual invoice/payment path, first case-study path.
- Expected SoloCrew changes: pilot onboarding, packet template, feedback records, partner success checklist, manual payment/invoice documentation or product path.
- Expected Cognitive_OS dependency: optional neutral outcome/review packet persistence research if repeated beyond SoloCrew.
- MPLP action: none; candidate-only after evidence.

V2.4:

- Build Public Beta / market recognition.
- Must have: polished onboarding, demo workspace, pricing/waitlist path, public landing/demo story, saved workspaces, one meaningful workflow under 10 minutes.
- Expected repo changes: frontend-ready product shell, demo workspace fixtures, public beta copy/assets, pricing/waitlist integration, persistence hardening.
- MPLP action: none.

V3.0:

- Build Commercial GA / Killer App Candidate.
- Must have: subscription-ready SaaS path, bounded action-preparation, human-confirmed execution handoff, stronger persistence, multi-cell operating rhythm, outcome feedback, onboarding/support.
- Execution boundary approach: keep action preparation and handoff human-confirmed; do not introduce autonomous execution or provider/channel dispatch without separate authorization and boundary review.
- Expected repo changes: SaaS tenancy/auth/billing/support, durable workspace storage, multi-cell cadence, outcome feedback analytics, support/admin operations.

## 10. Proposed Next Waves

1. SOLOCREW-V2.2-FIRST-USABLE-ALPHA-SCOPE-PLANNING-01
2. SOLOCREW-V2.2-IMPL-01-WORKSPACE-SESSION-CONTINUITY
3. SOLOCREW-V2.2-IMPL-02-REVIEW-PACKET-EXPORT
4. SOLOCREW-V2.2-IMPL-03-FOUNDER-DASHBOARD-CONTINUATION
5. SOLOCREW-V2.2-IMPL-04-DEVELOPER-COMPANY-PROJECT-GOVERNANCE-JOURNEY
6. SOLOCREW-V2.2-HARDENING-01-PRIVATE-ALPHA-BOUNDARY-AND-USABILITY
7. SOLOCREW-V2.3-PAID-PILOT-SCOPE-PLANNING-01
8. CGOS-COMMERCIAL-CONTINUATION-PROJECTION-RESEARCH-01, only if V2.2 planning proves durable neutral upstream envelopes are required

## 11. Risk Register

| Risk | Severity | Mitigation | Repo/action owner |
| --- | --- | --- | --- |
| product too abstract | High | Anchor V2.2/V2.3 to Developer Company / Project Governance packet outcome. | SoloCrew |
| no continuous usage | High | Add saved workspace, return-and-continue, next-action dashboard. | SoloCrew |
| no paid trigger | High | Define paid pilot around exportable project governance packet and design partner outcome. | SoloCrew |
| over-engineering architecture | High | Ship one product journey before new protocol/runtime layers. | SoloCrew |
| marketplace too early | High | Keep asset family mapping review-only until post-paid evidence. | SoloCrew |
| execution too early | High | Preserve HITL; use prepared-action/execution-boundary projections only. | SoloCrew / Cognitive_OS |
| TracePilot/SoloCrew boundary confusion | Medium | Keep TracePilot as future optional product integration/provider candidate, not Cell/internal object. | SoloCrew |
| Cognitive_OS dependency hidden | Medium | Explicitly consume neutral envelopes or document product-local fallback. | SoloCrew / Cognitive_OS |
| MPLP overclaim | High | No schema/protocol change; no product endorsement language. | MPLP / SoloCrew |
| no onboarding | High | V2.4 requires polished onboarding; V2.2 requires private-alpha guided flow. | SoloCrew |
| no pricing path | Medium | V2.3 manual invoice acceptable; V2.4 public pricing/waitlist. | SoloCrew |
| no user feedback loop | High | Add paid-pilot feedback capture and outcome feedback records. | SoloCrew |

## 12. Final Recommendation

Immediate next owner-authorized wave:

SOLOCREW-V2.2-FIRST-USABLE-ALPHA-SCOPE-PLANNING-01

Do not open V2.2 implementation until that scope planning wave defines the exact Developer Company / Project Governance private-alpha journey, persistence model, review packet export boundary, user-facing dashboard continuation, and neutral upstream consumption posture.
