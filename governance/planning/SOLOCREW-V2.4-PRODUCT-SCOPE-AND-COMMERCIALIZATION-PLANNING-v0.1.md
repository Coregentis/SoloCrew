# SOLOCREW-V2.4-PRODUCT-SCOPE-AND-COMMERCIALIZATION-PLANNING-v0.1

## A. Document Control

- doc_id: SOLOCREW-V2.4-PRODUCT-SCOPE-AND-COMMERCIALIZATION-PLANNING-v0.1
- task_id: SOLOCREW-V2.4-PRODUCT-SCOPE-AND-COMMERCIALIZATION-PLANNING-01
- status: planning-only
- date: 2026-04-28
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- repo: https://github.com/Coregentis/SoloCrew.git
- branch: main
- commit_message: `governance: open v2.4 commercialization planning`

Source baseline refs:

- `README.md`
- `CHANGELOG.md`
- `governance/releases/SOLOCREW-V2.3-POST-STABLE-VERIFICATION-MAINTENANCE-AND-V2.4-OPENING-GATE-v0.1.md`
- `governance/releases/SOLOCREW-V2.3-STABLE-PREP-SEAL-AND-CONDITIONAL-RELEASE-RECORD-v0.1.md`
- `governance/releases/SOLOCREW-V2.3-RC-POST-RELEASE-VERIFICATION-AND-STABLE-READINESS-GATE-v0.1.md`
- `governance/planning/SOLOCREW-V2.3-FIRST-PAID-PILOT-PLANNING-AND-GATE-v0.1.md`
- `app/pilots/*`
- `projection/fixtures/v2-3-*.ts`
- `tests/app/v2-3-*.test.ts`

Remote truth consumed:

| Repo | Branch | Local HEAD | origin/main HEAD | Worktree | Posture |
| --- | --- | --- | --- | --- | --- |
| SoloCrew | main | c5594ae6738190058d134991e832e10d7191ae59 | c5594ae6738190058d134991e832e10d7191ae59 | clean before this record | primary repo |
| Cognitive_OS | main | ec681a4d77368b71c1cc76964618f3151038861b | ec681a4d77368b71c1cc76964618f3151038861b | clean | inspected only |
| MPLP-Protocol | main | 0cf0477938340a443614d03d9fb51ac764b960c7 | 0cf0477938340a443614d03d9fb51ac764b960c7 | clean | inspected only |

Tag truth consumed:

| Tag | Expected target | Observed target | Result |
| --- | --- | --- | --- |
| `solocrew-v2.3-stable-first-paid-pilot-loop-20260428` | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | c111e2dd7811ec77903a1a139c33bb1a7bc0c27a | pass |
| `solocrew-v2.3-rc-first-paid-pilot-loop-20260428` | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | 2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65 | pass |
| `solocrew-v2.2-stable-private-alpha-journey-20260428` | aaef0147290848c35e68d8eb4e84616f904454e3 | aaef0147290848c35e68d8eb4e84616f904454e3 | pass |
| `solocrew-v2.2-rc-private-alpha-journey-20260428` | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | cb9ee1420181318d7198bd0bddc4896c6d3fe1d7 | pass |

## B. V2.3 Baseline Summary

V2.3 Stable is the bounded first paid pilot loop repo line. It proved:

pilot intake -> design partner qualification -> manual payment/invoice status -> V2.2 workspace/review packet/dashboard refs -> review-only next-action proposal -> local feedback capture -> permission-gated case-study path -> paid pilot loop E2E hardening.

The V2.3 baseline remains:

- manual-first
- design-partner-only
- local-only
- review-only
- non-executing
- manual payment/invoice status tracking only
- no package publish
- no payment processor, checkout, subscription, or automated billing
- no provider/channel dispatch
- no marketplace implementation
- no CRM integration or email dispatch
- no public publishing
- no LLM/model/agent/tool invocation
- no SaaS sharing
- no autonomous execution
- no paid product readiness claim
- no public beta readiness claim
- no commercial readiness claim
- no production-ready status claim
- no V3.0 claim
- no MPLP certification or endorsement

V2.3 also established the maintenance boundary for post-stable work: correction, evidence backfill, documentation alignment, test/gate repair, no-claim hardening, and deterministic fixture/test repair only.

## C. V2.4 Strategic Question

After V2.3 proved a bounded paid pilot loop, what is the smallest high-value next line that moves SoloCrew toward commercial usability without overclaiming public beta or product readiness?

V2.4 should not ask "How fast can SoloCrew become public?" It should ask "What commercial truth is still missing before any wider availability claim would be honest?"

## D. V2.4 Option Analysis

### Option 1: Expanded Paid Pilot Line

Positive case:

- Builds directly on V2.3 without widening the boundary.
- Allows more design partners while retaining manual qualification and manual payment tracking.
- Produces more feedback, support-burden, conversion, and case-study permission evidence.
- Keeps self-serve SaaS, checkout, subscription, and public beta posture out of scope.

Negative case:

- May only scale the existing manual loop without improving commercial decision quality.
- Could increase support load before SoloCrew has a clear operator dashboard for pilot health.
- Risks drifting into paid readiness language if not bounded by explicit no-claim gates.

Marginal/edge case:

- Works if the next few partners are still high-touch, technically literate, and explicitly design-partner-only.
- Fails if intake volume or support expectations imply self-serve onboarding.

Synthesis decision:

- Use expanded paid pilot activity only as the evidence source for V2.4, not as the full product direction by itself.

### Option 2: Controlled Public Beta Candidate

Positive case:

- Could widen feedback and market signal.
- Could test public-facing onboarding copy and external expectation management.
- Could reveal whether the V2.3 loop is legible to less-guided users.

Negative case:

- Current repo truth does not support public beta readiness.
- V2.3 explicitly remains design-partner-only, local-only, manual-first, and non-executing.
- Public-facing onboarding would require stronger privacy, support, disclosure, expectation, and incident-response boundaries.
- Public beta language risks implying SaaS, self-serve, or broader product maturity.

Marginal/edge case:

- A future "public beta candidate" label may be assessed later as a planning object, but only after support, privacy, onboarding, and no-claim gates are stronger.

Synthesis decision:

- Do not select public beta for V2.4. Keep it as a future gated question, not the next line.

### Option 3: Commercialization Readiness Planning Line

Positive case:

- Turns the V2.3 paid pilot loop into decision-quality commercial evidence.
- Strengthens sales assets, pilot operations SOP, support workflow, case-study permission pipeline, and conversion criteria without claiming readiness.
- Lets SoloCrew define what must be true before public beta, broader paid pilots, package publishing, or SaaS claims are considered.
- Matches the current manual-first, design-partner-only implementation state.

Negative case:

- Produces more planning and governance before new product surfaces.
- May feel less exciting than a public beta label.
- Requires disciplined evidence design so it does not become documentation without operational value.

Marginal/edge case:

- Works best if it creates an implementation-ready slice order around concrete local surfaces: onboarding packet, commercialization dashboard, evidence strengthening, and conversion readiness gate.
- Weakens if it only creates sales copy without measurable pilot evidence.

Synthesis decision:

- Select this as the V2.4 direction. It gives the highest commercial learning per unit of risk.

### Option 4: Block V2.4 Product Expansion Pending Upstream/Product Gaps

Positive case:

- Avoids any drift if upstream authority or product surfaces are insufficient.
- Preserves MPLP -> Cognitive_OS -> SoloCrew authority order.
- Forces unresolved architecture questions to surface before implementation.

Negative case:

- Current evidence does not show a blocking upstream gap for planning.
- V2.3 already proved product-local intake, manual payment status, proposal, feedback, permission, and E2E loop boundaries.
- Blocking V2.4 now would slow commercial learning without a concrete architecture reason.

Marginal/edge case:

- Some future V2.4 surfaces may need Cognitive_OS consumption patterns if they summarize posture refs, evidence refs, or state continuity.
- No current V2.4 planning task requires Cognitive_OS or MPLP modification.

Synthesis decision:

- Do not block V2.4 planning. Keep upstream changes out of scope unless a later implementation readiness review proves a specific need.

## E. V2.4 Selected Direction

selected_direction: Commercialization Readiness Planning Line, using expanded paid-pilot operations as the evidence source.

Why this direction:

- It is the smallest high-value next line after V2.3 Stable.
- It turns local paid-pilot mechanics into commercial decision evidence.
- It advances user value through clearer onboarding, support, feedback, conversion, and case-study readiness.
- It advances business value through measurable pilot health, willingness-to-continue signals, support burden visibility, and conversion criteria.
- It preserves no-claim boundaries while moving toward commercial usability.

Why not the others:

- Expanded Paid Pilot Line alone is useful but under-specified without commercialization readiness gates.
- Controlled Public Beta Candidate is premature because repo truth does not yet prove public onboarding, support, privacy, or self-serve readiness.
- Blocking V2.4 is unnecessary because no current upstream or product gap blocks planning.

User value:

- The design partner gets a more legible guided pilot path, clearer expectations, better review artifacts, stronger feedback capture, and more explicit next steps.

Business value:

- SoloCrew gets better evidence for who should use the product, why they would pay, how much manual support is required, and what must be true before broader availability.

Risk profile:

- Low to moderate if V2.4 stays planning-first and non-executing.
- High if V2.4 drifts into public beta, automated payment, SaaS sharing, CRM automation, dispatch, or readiness claims.

Implementation readiness level:

- Planning is open.
- Implementation is not yet authorized.
- Next work should order slices and define implementation gates before any V2.4 product/runtime files are created.

## F. V2.4 Product Scope

Allowed V2.4 planning scope:

- stronger design partner intake segmentation
- pilot onboarding packet
- pilot session workspace continuation
- feedback evidence strengthening
- local commercialization dashboard
- case-study permission readiness
- pilot conversion readiness scoring
- manual operator checklist
- support burden tracking
- founder-facing commercialization cockpit, if bounded and non-executing
- pilot operations SOP
- design-partner qualification refinements
- manual support/handoff expectations
- no-claim release and documentation gates

The preferred V2.4 product shape is a local commercialization readiness layer that helps the founder understand whether the paid pilot loop is ready for broader paid-pilot expansion or future public beta assessment.

## G. V2.4 Non-Scope

V2.4 planning and any later implementation gates must explicitly exclude:

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
- public beta claim unless a later planning task selects it only as a gated candidate label
- paid product readiness
- commercial readiness
- production-ready status
- V3.0
- package publish
- MPLP certification
- MPLP endorsement
- Cognitive_OS modification unless separately planned and authorized
- MPLP-Protocol modification unless separately planned and authorized

## H. Upstream Dependency Assessment

What V2.4 can do in SoloCrew only:

- product-local onboarding packet model
- product-local commercialization dashboard model
- product-local pilot conversion readiness scoring
- product-local support burden tracking
- product-local case-study permission readiness summary
- product-local operator checklist
- product-local documentation and release gates

What would require Cognitive_OS support later:

- new neutral runtime posture abstractions
- generalized evidence-envelope builders
- runtime-owned state or transaction semantics
- reusable upstream posture refs not already covered by current CGOS consumption patterns

What would be future MPLP candidate/backlog only:

- protocol-level commercialization semantics
- new protocol duties or module posture law
- standardized object/export binding changes
- certification or endorsement language

Current upstream decision:

- No Cognitive_OS modification is required now.
- No MPLP-Protocol modification is required now.
- V2.4 planning remains SoloCrew product-local.
- Future implementation must continue consuming Cognitive_OS posture refs and bounded summaries instead of redefining upstream law.

## I. Version Semantics

- V2.4 is a planning line only in this wave.
- V2.4 is not V3.0.
- V2.4 is not public beta.
- V2.4 is not a paid product readiness claim.
- V2.4 is not a commercial readiness claim.
- V2.4 is not production-ready.
- V2.4 does not imply package publishing.
- V2.4 does not imply SaaS or public signup.
- V2.4 release-line semantics must be defined before any V2.4 RC or stable execution.
- Stable, readiness, public beta, and commercialization labels must remain explicit and gated.

## J. Implementation Readiness Gates

V2.4 implementation may not start until all of these gates are accepted:

- product scope accepted
- non-scope accepted
- selected direction accepted
- test plan accepted
- no-claim grep terms updated
- README/CHANGELOG update strategy decided
- upstream dependency status decided
- release identity strategy decided
- implementation slice order decided
- V2.3 stable regression baseline selected
- product-local vs upstream-owned surfaces mapped
- owner authorizes the specific implementation task

Minimum test and gate expectations for later implementation:

- V2.4 contract tests for each new product-local surface
- V2.4 boundary tests for no payment, no dispatch, no CRM/email automation, no public publishing, no LLM/model/agent/tool invocation, no SaaS sharing, no autonomy, and no readiness overclaim
- V2.4 determinism tests for scoring, ordering, and summaries
- V2.3 paid pilot loop regression tests
- V2.2 workspace/review/dashboard regression tests if V2.4 consumes their refs
- no-claim grep covering V2.4, public beta, payment, SaaS, package, dispatch, CRM, LLM/model/agent/tool invocation, MPLP, and upstream-law terms

## K. Candidate Implementation Slices

These are candidate slices only. They are not implemented or authorized by this planning wave.

### V2.4-IMPL-01 Pilot Onboarding Packet

Goal:

- Define a local onboarding packet that explains manual pilot expectations, required project inputs, review-only posture, support expectations, and no-claim boundaries.

Allowed files/directories:

- future `app/commercialization/*` or `app/pilots/*` extension, if approved
- future `projection/fixtures/v2-4-*`
- future `tests/app/v2-4-*`

Forbidden:

- public signup
- CRM integration
- email dispatch
- checkout/subscription
- payment processor
- provider/channel dispatch
- autonomous execution

### V2.4-IMPL-02 Commercialization Readiness Dashboard

Goal:

- Summarize pilot health, conversion readiness, support burden, feedback evidence, and boundary posture for founder review.

Allowed posture:

- local-only
- review-only
- non-executing
- no automated external action

Forbidden:

- SaaS dashboard claim
- public beta claim
- commercial readiness claim
- production-ready claim
- package publish

### V2.4-IMPL-03 Pilot Feedback Evidence Strengthening

Goal:

- Improve local evidence summaries across feedback completeness, usefulness, support burden, willingness to continue, and case-study permission readiness.

Allowed posture:

- deterministic summaries
- local fixture/test coverage
- no public publishing

Forbidden:

- testimonial publishing
- external analytics
- LLM/model calls
- agent/tool execution

### V2.4-IMPL-04 Case-Study Permission / Conversion Readiness Gate

Goal:

- Determine whether a pilot has sufficient permission, usefulness, willingness, support, and boundary evidence to become a conversion candidate.

Allowed posture:

- manual checklist
- review-only score
- no automatic conversion

Forbidden:

- payment automation
- customer account provisioning
- CRM automation
- public case-study generation

## L. Next Allowed Task

SOLOCREW-V2.4-IMPLEMENTATION-READINESS-AND-SLICE-ORDERING-01

This next task is still planning/governance. It should decide exact V2.4 slice order, tests, file ownership, no-claim grep terms, and release-line semantics before any V2.4 implementation begins. It requires separate owner authorization.

## Final Decision

SOLOCREW_V2_4_COMMERCIALIZATION_PLANNING_DIRECTION_SELECTED_IMPLEMENTATION_NOT_AUTHORIZED

Selected direction:

- Commercialization Readiness Planning Line

Execution posture:

- Expanded paid-pilot operations may be used as evidence input.
- Controlled public beta is not selected for V2.4.
- Product expansion is not blocked for planning, but implementation remains blocked pending a separate readiness and slice-ordering task.

This wave creates no product/runtime behavior, release, tag, package, public beta, SaaS, payment processor, provider/channel dispatch, marketplace, CRM/email automation, LLM/model/agent/tool invocation, autonomous execution, paid product readiness claim, commercial readiness claim, production-ready claim, V3.0 claim, MPLP certification claim, or MPLP endorsement claim.
