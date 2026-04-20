# SoloCrew V1.1 — Usable Founder Loop Scope Baseline v0.1

## A. Document Control

- document_id:
  - `SOLOCREW-V1.1-USABLE-FOUNDER-LOOP-SCOPE-v0.1`
- repository:
  - `https://github.com/Coregentis/SoloCrew`
- branch:
  - `main`
- opening_date:
  - `2026-04-20`
- baseline_class:
  - `scope_opening_record`
- seal_anchor_tag:
  - `solocrew-operational-v1-rc-seal-20260420`
- seal_anchor_commit:
  - `2dea8c96052c28cacdc89c80bb30ea35c6e62468`
- upstream_authority_order:
  - `MPLP Protocol -> Cognitive_OS -> SoloCrew`

## B. Authority Chain

V1.1 remains downstream of:

- `MPLP Protocol` for protocol law
- `Cognitive_OS` for runtime law and runtime authority
- `SoloCrew` for downstream founder-facing product projection, shell, and governance

V1.1 does not reopen protocol law, runtime law, or cross-repo authority.

## C. V1.1 Purpose

V1.1 opens the first founder-facing usable loop after the sealed Operational V1
baseline.

That loop is:

- Founder Request Intake
- Founder Request Exception Packet
- Secretary Handoff
- Review / Decision Preparation Surface
- Evidence-backed next-step recommendation

This is an opening wave only.
It improves usability, coherence, and testability across the loop without
claiming loop execution, founder-queue execution, or operational autonomy.

## D. What V1.1 Builds On From Operational V1

V1.1 builds on the sealed Operational V1 boundary anchored by:

- `governance/releases/SOLOCREW-OPERATIONAL-V1-SEAL-RECORD-v0.1.md`
- `governance/releases/SOLOCREW-OPERATIONAL-V1-FINAL-CLOSURE-RECORD-v0.1.md`
- `governance/audits/SOLOCREW-FOUNDER-FACING-REQUEST-INTAKE-CLOSURE-AUDIT-v0.1.md`
- `governance/audits/SOLOCREW-END-TO-END-BUSINESS-LOOP-CLOSURE-AUDIT-v0.1.md`
- `governance/audits/SOLOCREW-APP-PAGE-STATE-RENDERING-CLOSURE-AUDIT-v0.1.md`
- `governance/baselines/SOLOCREW-REPO-V1-VS-OPERATIONAL-V1-BOUNDARY-v0.1.md`

Operational V1 already sealed:

- bounded founder-facing intake
- bounded exception packet adaptation and posture derivation
- bounded secretary handoff staging and review packet surfaces
- bounded evidence, omission, insufficiency, and stale visibility
- bounded reducer-backed state evaluation and page rendering
- bounded non-executing posture below provider/channel and dispatch semantics

V1.1 therefore extends a sealed baseline rather than replacing it.

## E. V1.1 Product Thesis

The first usable founder loop should feel coherent to a founder before it is
ever executable.

The product thesis for V1.1 is:

- one founder-visible request can be captured clearly
- that request can be understood as a bounded packet rather than a loose note
- the packet can be staged into Secretary review space without becoming a queue job
- the review surface can prepare a founder decision without performing it
- evidence-backed next-step recommendation can be shown without dispatch, execution, or authority inflation

## F. In Scope

- opening a V1.1 scope baseline on top of the Operational V1 seal
- auditing existing asset reuse before any V1.1 expansion claim
- freezing a founder-loop flow contract for intake-to-review usability
- freezing first usable founder scenarios
- freezing V1.1 open gates for reuse, flow, packet, handoff, review, boundary, claim-scan, and README/CHANGELOG alignment
- aligning repo-facing language so V1.1 reads as an opened improvement line rather than a completed release

## G. Out of Scope

- provider/channel execution
- approve/reject/dispatch/execute behavior
- founder queue execution
- external business action execution
- autonomous company operation
- protocol certification
- closed live founder scenario validation
- runtime-law creation in SoloCrew
- replacement of the sealed Operational V1 exception-state machine

## H. User-Visible Loop

The intended V1.1 founder-visible loop is:

1. founder enters a bounded request
2. the request is preserved as a bounded intake object
3. the request is derivable into a bounded exception packet
4. the packet is staged into Secretary handoff space
5. the founder can inspect review-readiness and evidence posture
6. the founder receives an evidence-backed next-step recommendation for decision preparation only

The loop ends before action approval, dispatch, execution, or external effect.

## I. Runtime / Projection Boundary

V1.1 remains projection-first and downstream-only.

That means:

- intake, packet, staging, and review remain product-projected surfaces
- V1.1 may reuse current `Cognitive_OS`-consumed summaries only through existing SoloCrew contracts and adapters
- V1.1 may not introduce direct runtime-private imports or new runtime-law claims
- V1.1 flow labels are governance-layer usability labels unless and until a later bounded implementation wave proves a safe code mapping

## J. Non-Execution Boundary

SoloCrew V1.1 remains a bounded, non-executing founder-loop improvement line. It improves intake-to-packet-to-review usability, but does not execute provider/channel actions, approve/reject/dispatch/execute behavior, founder queue execution, external business actions, autonomous company operation, protocol certification, or closed live founder scenario validation.

## K. Success Criteria

V1.1 opening succeeds only if all of the following are true:

- the new V1.1 artifacts are explicitly traceable to the Operational V1 seal tag and commit
- the founder loop is defined as one coherent intake-to-packet-to-review contract set rather than isolated documents
- existing founder intake, packet, handoff, review, and governance assets are reused rather than rewritten
- README and CHANGELOG language stay below execution, autonomy, and certification claims
- existing relevant tests remain green
- `git diff --check` passes

## L. Blocking Failure Conditions

V1.1 opening must be treated as blocked if any of the following occur:

- local or remote `main` drifts below the sealed commit boundary
- a V1.1 artifact claims execution, dispatch, queue execution, autonomy, or certification
- a V1.1 artifact invents runtime or protocol authority inside SoloCrew
- existing Operational V1 reuse assets are bypassed by duplicate replacement governance
- required validation or forbidden-claim scan fails

## M. Traceability To Operational V1 Seal

This scope opening is traceable to:

- repo:
  - `https://github.com/Coregentis/SoloCrew`
- branch:
  - `main`
- sealed tag:
  - `solocrew-operational-v1-rc-seal-20260420`
- sealed commit:
  - `2dea8c96052c28cacdc89c80bb30ea35c6e62468`
- seal boundary artifacts:
  - `governance/releases/SOLOCREW-OPERATIONAL-V1-SEAL-RECORD-v0.1.md`
  - `governance/releases/SOLOCREW-OPERATIONAL-V1-FINAL-CLOSURE-RECORD-v0.1.md`
  - `governance/releases/SOLOCREW-OPERATIONAL-V1-RELEASE-NOTES-v0.1.md`
  - `governance/audits/SOLOCREW-OPERATIONAL-V1-FINAL-SEAL-AUDIT-v0.1.md`

V1.1 is opened only as the next bounded line above that sealed baseline.

## N. Decision

`V1_1_SCOPE_BASELINE_OPENED_FOR_USABLE_FOUNDER_LOOP`
