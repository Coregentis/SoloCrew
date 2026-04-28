# SOLOCREW-V2.4-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-v0.1

## A. Document Control

- doc_id: SOLOCREW-V2.4-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-v0.1
- task_id: SOLOCREW-V2.4-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-01
- status: implementation-readiness planning
- date: 2026-04-28
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- repo: https://github.com/Coregentis/SoloCrew.git
- branch: main
- commit_message: `governance: define v2.4 implementation readiness and slice order`

Consumed baseline refs:

- `governance/planning/SOLOCREW-V2.4-PRODUCT-SCOPE-AND-COMMERCIALIZATION-PLANNING-v0.1.md`
- `governance/releases/SOLOCREW-V2.3-POST-STABLE-VERIFICATION-MAINTENANCE-AND-V2.4-OPENING-GATE-v0.1.md`
- `README.md`
- `CHANGELOG.md`
- `app/pilots/*`
- `projection/fixtures/v2-3-*.ts`
- `tests/app/v2-3-*.test.ts`
- `tests/app/v2-2-*.test.ts`

Remote truth consumed:

| Repo | Branch | Local HEAD | origin/main HEAD | Worktree | Posture |
| --- | --- | --- | --- | --- | --- |
| SoloCrew | main | 45579f4eaa287b1a85c9e3dc4044dd2deb3058cc | 45579f4eaa287b1a85c9e3dc4044dd2deb3058cc | clean before this record | primary repo |
| Cognitive_OS | main | ec681a4d77368b71c1cc76964618f3151038861b | ec681a4d77368b71c1cc76964618f3151038861b | clean | inspected only |
| MPLP-Protocol | main | 0cf0477938340a443614d03d9fb51ac764b960c7 | 0cf0477938340a443614d03d9fb51ac764b960c7 | clean | inspected only |

Tag truth consumed:

| Tag | Expected target | Observed target | Result |
| --- | --- | --- | --- |
| `solocrew-v2.3-stable-first-paid-pilot-loop-20260428` | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | pass |
| `solocrew-v2.3-rc-first-paid-pilot-loop-20260428` | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | pass |
| `solocrew-v2.2-stable-private-alpha-journey-20260428` | aaef0147290848c35e68d8eb4e84616f904454e3 | aaef0147290848c35e68d8eb4e84616f904454e3 | pass |
| `solocrew-v2.2-rc-private-alpha-journey-20260428` | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | pass |

## B. V2.4 Direction Confirmation

Confirmed selected direction:

- Commercialization Readiness Planning Line, using expanded paid-pilot operations as evidence input.

This means:

- public beta is not selected
- implementation is not performed in this wave
- V2.4 remains SoloCrew product-local unless a later upstream dependency review proves otherwise
- Cognitive_OS and MPLP-Protocol remain inspected-only and unmodified
- V2.4 must preserve the V2.3 manual-first, design-partner-only, local-only, review-only, and non-executing boundary

The accepted planning baseline concluded that V2.4 should turn the V2.3 paid pilot loop into decision-quality commercial evidence before any broader availability label is considered.

## C. Slice Ordering Decision

Candidate slice order evaluated:

1. Pilot Onboarding Packet
2. Commercialization Readiness Dashboard
3. Pilot Feedback Evidence Strengthening
4. Case-Study Permission / Conversion Readiness Gate

### Slice 1: Pilot Onboarding Packet

Positive case:

- It is the smallest slice that improves user clarity before more pilot evidence is gathered.
- It converts existing V2.3 intake/payment/proposal/feedback boundaries into an explicit start-of-pilot artifact.
- It gives later dashboard and conversion scoring surfaces stable source material.
- It can be local-only, deterministic, review-only, and non-executing.

Negative case:

- It does not itself summarize commercial performance.
- It may appear like customer onboarding if wording is not bounded.
- It can become marketing copy unless tests enforce no readiness claims.

Marginal/edge case:

- Works well when framed as a local operator packet for qualified design partners.
- Becomes risky if it implies self-serve signup, public beta, paid readiness, or automated onboarding.

Synthesis:

- Select this as IMPL-01. It unlocks later evidence and dashboard work with the lowest implementation risk.

### Slice 2: Commercialization Readiness Dashboard

Positive case:

- It directly serves the V2.4 selected direction.
- It can summarize pilot health, support burden, feedback evidence, and conversion readiness.
- It creates founder-facing decision visibility.

Negative case:

- It depends on having consistent onboarding, pilot expectations, and evidence refs.
- It may overstate readiness if implemented before the input artifacts are stable.
- It risks looking like a commercial operations system if not tightly bounded.

Marginal/edge case:

- It could come first if V2.3 evidence were already rich enough, but current V2.4 truth needs a stronger onboarding source first.

Synthesis:

- Make this IMPL-02 after the onboarding packet establishes stable expectations and refs.

### Slice 3: Pilot Feedback Evidence Strengthening

Positive case:

- It deepens the evidence behind usefulness, support burden, willingness to continue, and case-study readiness.
- It reuses V2.3 feedback capture without changing its boundary.
- It supports later conversion-readiness decisions.

Negative case:

- Without onboarding expectations, feedback may be hard to interpret.
- It may duplicate V2.3 feedback capture unless scoped to evidence strengthening.

Marginal/edge case:

- Valuable after at least one V2.4 onboarding packet fixture exists and can be referenced by feedback evidence.

Synthesis:

- Make this IMPL-03 after onboarding and dashboard shape are defined.

### Slice 4: Case-Study Permission / Conversion Readiness Gate

Positive case:

- It closes the commercialization evidence loop.
- It can decide whether a pilot has enough permission, usefulness, willingness, and support evidence for manual conversion review.
- It reinforces no automatic conversion and no public publishing boundaries.

Negative case:

- It is premature before onboarding, dashboard, and strengthened feedback evidence exist.
- It can drift into commercial readiness or public proof claims if not bounded.

Marginal/edge case:

- Works as a late V2.4 slice when all source evidence is stable and deterministic.

Synthesis:

- Make this IMPL-04.

Final slice order:

1. V2.4-IMPL-01 Pilot Onboarding Packet
2. V2.4-IMPL-02 Commercialization Readiness Dashboard
3. V2.4-IMPL-03 Pilot Feedback Evidence Strengthening
4. V2.4-IMPL-04 Case-Study Permission / Conversion Readiness Gate

## D. Selected First Implementation Slice

- slice_id: V2.4-IMPL-01
- slice_name: Pilot Onboarding Packet
- next_task_id: SOLOCREW-V2.4-IMPL-01-PILOT-ONBOARDING-PACKET-01

Purpose:

- Create a deterministic, product-local pilot onboarding packet model that clarifies design-partner expectations, required project inputs, manual support boundaries, local review-only posture, and no-claim constraints before a V2.4 pilot starts.

User value:

- The design partner gets clearer expectations and a concrete packet describing what to prepare, what the pilot will review, what will not happen automatically, and what boundaries apply.

Business value:

- SoloCrew gets a repeatable local starting artifact for each design-partner pilot, which improves support consistency and gives later readiness dashboards and conversion scoring a stable source.

Risk:

- Low if the packet remains local, manual-first, review-only, and non-executing.
- Moderate if wording implies public signup, automated onboarding, commercial readiness, or paid product readiness.

Exact non-scope:

- public signup
- customer account provisioning
- payment processor
- checkout
- subscription
- automated billing
- provider/channel dispatch
- marketplace implementation
- CRM integration
- email dispatch
- public publishing
- LLM/model/agent/tool invocation
- SaaS sharing
- autonomous execution
- public beta claim
- paid product readiness claim
- commercial readiness claim
- production-ready claim
- V3.0 claim
- MPLP certification or endorsement
- Cognitive_OS law redefinition
- MPLP law redefinition

Expected outputs:

- onboarding packet contract
- onboarding packet workflow/rules helpers
- deterministic V2.4 fixture
- contract tests
- workflow/rules tests
- boundary tests
- determinism tests
- V2.3 paid pilot loop regression

Dependency on V2.3 objects:

- may reference V2.3 pilot intake ids and design partner ids
- may reference V2.3 qualification summary
- may reference V2.3 manual payment status only as manual status context, not payment execution
- may reference V2.3 next-action proposal and feedback/case-study records only as expected later-loop context

Cognitive_OS/MPLP changes required:

- none for IMPL-01
- IMPL-01 must not redefine Cognitive_OS or MPLP law

## E. File Ownership Map

Preferred future write set for IMPL-01:

| Purpose | Future path | Ownership note |
| --- | --- | --- |
| contract | `app/commercialization/pilot-onboarding-packet-contract.ts` | new V2.4 product-local contract |
| workflow/rules | `app/commercialization/pilot-onboarding-packet-workflow.ts` | deterministic helpers only |
| fixture | `projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts` | deterministic onboarding packet examples |
| contract tests | `tests/app/v2-4-pilot-onboarding-packet-contract.test.ts` | validates shape and required fields |
| workflow/rules tests | `tests/app/v2-4-pilot-onboarding-packet-workflow.test.ts` | validates deterministic packet construction |
| boundary tests | `tests/app/v2-4-pilot-onboarding-packet-boundary.test.ts` | validates no forbidden fields or claims |
| determinism tests | `tests/app/v2-4-pilot-onboarding-packet-determinism.test.ts` | validates stable output with explicit ids/timestamps |

Optional future read-only dependencies:

- `app/pilots/pilot-intake-contract.ts`
- `app/pilots/design-partner-qualification.ts`
- `app/pilots/manual-payment-status-contract.ts`
- `app/pilots/next-action-proposal-contract.ts`
- `app/pilots/feedback-capture-contract.ts`
- `projection/fixtures/v2-3-paid-pilot-loop-fixture.ts`

Files not owned by IMPL-01:

- Cognitive_OS repo files
- MPLP-Protocol repo files
- release/tag/package metadata
- payment, provider, channel, marketplace, CRM, email, LLM/model/agent/tool, SaaS, or autonomy integrations

## F. Contract / Workflow / Fixture / Test Plan

Contract file:

- `app/commercialization/pilot-onboarding-packet-contract.ts`

Expected contract concepts:

- `PilotOnboardingPacketId`
- `PilotOnboardingSectionId`
- `PilotOnboardingPacketStatus`
- `PilotOnboardingAudience`
- `PilotOnboardingExpectationProfile`
- `PilotOnboardingRequiredInput`
- `PilotOnboardingSupportBoundary`
- `PilotOnboardingBoundaryFlags`
- `V2_4PilotOnboardingPacket`
- `PilotOnboardingPacketSummary`

Workflow/rules file:

- `app/commercialization/pilot-onboarding-packet-workflow.ts`

Expected deterministic helpers:

- `create_pilot_onboarding_packet(...)`
- `create_pilot_onboarding_packet_summary(...)`
- `mark_pilot_onboarding_packet_ready_for_manual_review(...)`
- `mark_pilot_onboarding_packet_acknowledged_manually(...)`
- `cancel_pilot_onboarding_packet(...)`

Fixture file:

- `projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts`

Expected fixture cases:

- qualified design partner onboarding packet
- manual-review design partner onboarding packet
- blocked candidate onboarding hold packet
- packet with V2.3 paid pilot loop source refs
- packet with explicit boundary notices

Tests:

- `tests/app/v2-4-pilot-onboarding-packet-contract.test.ts`
- `tests/app/v2-4-pilot-onboarding-packet-workflow.test.ts`
- `tests/app/v2-4-pilot-onboarding-packet-boundary.test.ts`
- `tests/app/v2-4-pilot-onboarding-packet-determinism.test.ts`

E2E impact:

- IMPL-01 does not need a full V2.4 E2E loop yet.
- It must preserve V2.3 paid pilot loop E2E regression.
- A later V2.4 hardening wave may compose onboarding packet -> V2.3 paid pilot loop -> dashboard/evidence/conversion surfaces.

## G. Boundary Flag Requirements

Required V2.4 boundary flags for IMPL-01 and later V2.4 slices:

- manual_first: true
- bounded_pilot_only: true
- design_partner_only: true
- local_only: true
- review_only: true
- non_executing: true
- no_payment_processor: true
- no_checkout: true
- no_subscription_management: true
- no_automated_billing: true
- no_provider_dispatch: true
- no_channel_dispatch: true
- no_marketplace_implementation: true
- no_crm_integration: true
- no_email_dispatch: true
- no_public_publishing: true
- no_llm_call: true
- no_model_call: true
- no_agent_dispatch: true
- no_tool_invocation: true
- no_saas_sharing: true
- no_autonomous_execution: true
- no_public_beta_claim: true
- no_paid_product_readiness_claim: true
- no_commercial_readiness_claim: true
- no_production_ready_claim: true
- no_v3_claim: true
- no_mplp_certification: true
- no_mplp_endorsement: true
- no_cognitive_os_law_redefinition: true
- no_mplp_law_redefinition: true

## H. Test Matrix

Expected future tests:

| Test area | Required coverage |
| --- | --- |
| contract tests | packet can be created with required ids, sections, expectations, required inputs, support boundaries, source refs, and boundary flags |
| workflow/rules tests | deterministic create, summary, manual-review-ready, manual-acknowledged, and cancel transitions |
| boundary tests | serialized records contain no payment, checkout, subscription, dispatch, marketplace, CRM/email, public publishing, LLM/model/agent/tool, SaaS, autonomy, package, readiness, V3.0, certification, endorsement, or raw private payload fields |
| determinism tests | same inputs and explicit timestamps produce identical packet and summary JSON |
| V2.3 regression | V2.3 paid pilot loop E2E, boundary, and determinism tests continue passing |
| V2.2 regression | workspace/review/dashboard regressions run if IMPL-01 consumes V2.2 refs indirectly through V2.3 source refs |
| no-claim grep | V2.4 implementation grep set has no blocking positive claim |

## I. No-Claim Grep Terms

Exact V2.4 implementation grep terms:

- V2.4
- public beta
- paid product ready
- commercial ready
- production-ready
- payment processor
- checkout
- subscription
- automated billing
- card token
- bank execution
- crypto execution
- provider dispatch
- channel dispatch
- marketplace
- CRM
- email dispatch
- public publishing
- LLM call
- model call
- agent dispatch
- tool invocation
- SaaS sharing
- autonomous execution
- package publish
- npm publish
- V3.0
- MPLP certification
- MPLP endorsement
- Cognitive_OS
- CGOS
- MPLP
- raw_runtime_private_payload

Allowed contexts:

- boundary flags
- no-claim gates
- negative tests
- historical planning and release records
- future task names
- authority-order references
- CGOS consumption references

Blocking contexts:

- positive public beta claim
- positive paid/commercial/production readiness claim
- payment, checkout, subscription, billing, provider, channel, marketplace, CRM, email, public publishing, LLM/model/agent/tool, SaaS, package, or autonomous implementation
- V3.0 claim
- MPLP certification or endorsement claim
- Cognitive_OS or MPLP law redefinition
- raw runtime-private payload exposure

## J. README / CHANGELOG Strategy

README:

- Should not change for IMPL-01 unless implementation materially changes current release/status truth.
- Must not claim V2.4 release, public beta, paid readiness, commercial readiness, production readiness, package publish, SaaS, V3.0, MPLP certification, or MPLP endorsement.

CHANGELOG:

- May receive one concise entry for this readiness wave.
- May receive one concise implementation entry after IMPL-01 lands.
- Must use neutral language: prepared, added, hardened, audited.
- Must not use release, stable, public beta, paid-ready, commercial-ready, production-ready, V3.0, certified, or endorsed language unless separately authorized and factually true.

This wave records a concise readiness entry in CHANGELOG and does not update README.

## K. Release-Line Semantics

- V2.4 implementation line is not public beta.
- V2.4 implementation line is not stable until RC/stable gates pass.
- V2.4 may later become an RC candidate only after implementation, tests, no-claim grep, and boundary gates pass.
- V2.4 does not imply V3.0.
- V2.4 does not imply paid product readiness.
- V2.4 does not imply commercial readiness.
- V2.4 does not imply production-ready status.
- V2.4 does not imply package publishing.
- V2.4 release identity must be proposed in a later RC readiness or prep wave, not during IMPL-01.

## L. First Implementation Prompt Draft

Task ID:

SOLOCREW-V2.4-IMPL-01-PILOT-ONBOARDING-PACKET-01

Repo:

https://github.com/Coregentis/SoloCrew.git

Branch:

main

Expected starting HEAD:

`<HEAD after governance: define v2.4 implementation readiness and slice order>`

Authoritative baseline:

- `governance/planning/SOLOCREW-V2.4-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-v0.1.md`
- `governance/planning/SOLOCREW-V2.4-PRODUCT-SCOPE-AND-COMMERCIALIZATION-PLANNING-v0.1.md`
- `governance/releases/SOLOCREW-V2.3-POST-STABLE-VERIFICATION-MAINTENANCE-AND-V2.4-OPENING-GATE-v0.1.md`
- V2.3 pilot contracts, workflows, fixtures, and tests under `app/pilots/`, `projection/fixtures/v2-3-*.ts`, and `tests/app/v2-3-*.test.ts`

Owner authorization:

The owner authorizes only:

SOLOCREW-V2.4-IMPL-01-PILOT-ONBOARDING-PACKET-01

Primary objective:

Implement a SoloCrew product-local V2.4 pilot onboarding packet model that clarifies design-partner expectations, required project inputs, manual support boundaries, local review-only posture, source refs, and no-claim constraints before a paid pilot starts.

Hard boundaries:

- Do not modify Cognitive_OS.
- Do not modify MPLP-Protocol.
- Do not create release/tag/package.
- Do not publish packages.
- Do not implement payment processor, checkout, subscription, automated billing, card token, bank execution, or crypto execution.
- Do not implement provider/channel dispatch.
- Do not implement marketplace.
- Do not implement CRM/email automation.
- Do not implement public publishing.
- Do not invoke LLM/model/agent/tool.
- Do not implement SaaS sharing.
- Do not implement autonomous execution.
- Do not claim public beta, paid product readiness, commercial readiness, production-ready status, V3.0, MPLP certification, or MPLP endorsement.

Exact files to create:

- `app/commercialization/pilot-onboarding-packet-contract.ts`
- `app/commercialization/pilot-onboarding-packet-workflow.ts`
- `projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts`
- `tests/app/v2-4-pilot-onboarding-packet-contract.test.ts`
- `tests/app/v2-4-pilot-onboarding-packet-workflow.test.ts`
- `tests/app/v2-4-pilot-onboarding-packet-boundary.test.ts`
- `tests/app/v2-4-pilot-onboarding-packet-determinism.test.ts`

Exact files to modify:

- `CHANGELOG.md` only if repo convention calls for one concise implementation entry.

Contract requirements:

- Define ids, statuses, audience, expectation profile, required inputs, support boundaries, source refs, boundary flags, packet record, and packet summary.
- Source refs may include V2.3 intake id, design partner id, qualification classification, manual payment status ref, next-action proposal id, feedback id, and V2.3 stable tag/commit.
- Include required boundary flags listed in this readiness document.
- Do not include customer account, signup, payment execution, dispatch, marketplace, CRM/email, public publishing, LLM/model/agent/tool, SaaS, package, autonomy, certification, endorsement, or raw private payload fields.

Workflow requirements:

- Provide deterministic pure helpers:
  - `create_pilot_onboarding_packet(...)`
  - `create_pilot_onboarding_packet_summary(...)`
  - `mark_pilot_onboarding_packet_ready_for_manual_review(...)`
  - `mark_pilot_onboarding_packet_acknowledged_manually(...)`
  - `cancel_pilot_onboarding_packet(...)`
- No external calls.
- No persistence required.
- No payment, dispatch, CRM/email, LLM/model/agent/tool, SaaS, or autonomous behavior.

Fixture requirements:

- Include a qualified design partner onboarding packet.
- Include a manual-review onboarding packet.
- Include a blocked candidate onboarding hold packet.
- Reference V2.3 paid pilot loop fixtures where useful.
- Preserve deterministic timestamps and ids.
- Preserve all boundary notices.

Tests to add:

- Contract tests:
  - valid packet can be created
  - required sections and source refs exist
  - all boundary flags are true
  - no forbidden fields exist
- Workflow tests:
  - create -> ready_for_manual_review -> acknowledged_manually works
  - cancel works for non-final packet
  - summaries are deterministic
  - transitions preserve boundary flags
- Boundary tests:
  - serialized packet, summary, and fixture do not contain forbidden implementation fields or readiness claims
  - required boundary flags/notices are present
- Determinism tests:
  - repeated fixture construction with explicit ids/timestamps yields identical JSON

Required validation commands:

- `git diff --check`
- `git diff --cached --check`
- `node --test tests/app/v2-4-pilot-onboarding-packet-contract.test.ts`
- `node --test tests/app/v2-4-pilot-onboarding-packet-workflow.test.ts`
- `node --test tests/app/v2-4-pilot-onboarding-packet-boundary.test.ts`
- `node --test tests/app/v2-4-pilot-onboarding-packet-determinism.test.ts`
- `node --test tests/app/v2-3-paid-pilot-loop-e2e.test.ts tests/app/v2-3-paid-pilot-loop-boundary-e2e.test.ts tests/app/v2-3-paid-pilot-loop-determinism.test.ts`
- `npm test`

Required grep classification:

Run grep for the V2.4 implementation terms listed in this readiness document. For each term report count, representative files, positive claim found yes/no, and blocking yes/no.

Commit message:

`runtime: add v2.4 pilot onboarding packet`

Final report format:

- Remote Truth
- Changed Files
- Implementation Summary
- File Ownership
- Tests
- No-Claim Grep Classification
- Boundary Confirmation
- Final Decision
- Next Allowed Task
- Explicit statements that no release/tag/package was created, no payment/dispatch/CRM/email/LLM/model/agent/tool/SaaS/autonomy was implemented, Cognitive_OS was not modified, and MPLP-Protocol was not modified.

## M. Final Decision

SOLOCREW_V2_4_IMPLEMENTATION_READINESS_PASS_FIRST_SLICE_ORDERED

V2.4 IMPL-01 is selected as Pilot Onboarding Packet. No V2.4 implementation was performed in this wave.

## N. Next Allowed Task

SOLOCREW-V2.4-IMPL-01-PILOT-ONBOARDING-PACKET-01

This task requires separate owner authorization before implementation begins.
