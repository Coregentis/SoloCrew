# SOLOCREW-FOUNDER-REQUEST-EXCEPTION-PACKET-LOOP-IMPLEMENTATION-PLAN-v0.1

## A. Purpose

This document is the implementation plan for the selected first bounded
business loop in SoloCrew.

It is:

- plan only
- no implementation in this wave
- no final DTO code
- no UI in this wave
- no approve/reject/dispatch/execute
- no provider/channel execution
- no Operational V1 completion claim

This plan freezes the future code-wave scope, directory lanes, contract-derived
mapping, test duties, and boundary gates before any implementation begins.

## B. Selected Loop Recap

Selected loop:

- `Founder request -> Delta intent -> Secretary handoff packet -> Review/return posture -> bounded action recommendation -> evidence summary -> learning suggestion`

### Entry Condition

- a Founder request exists
- the request can be interpreted through contracted upstream summaries as fresh
  intent or `Delta intent`
- SoloCrew consumes only bounded projection summaries rather than raw
  runtime-private objects

### Exit Condition

- a bounded Secretary handoff packet exists in downstream product space
- that packet carries a `Review/return posture` or other bounded exception
  posture
- a `bounded action recommendation` may be present but remains non-executing
- an `evidence summary` may be present
- a `learning suggestion` may be present
- the loop exits before approve/reject/dispatch/execute or any provider/channel
  behavior

### Expected Exception Postures

- `review_needed`
- `impact_detected`
- `confirm_required`
- `return_for_revision`
- `evidence_insufficient`
- `stale_context`
- `blocked_by_contract`
- `monitor`

### Forbidden Behaviors

- no approve/reject/dispatch/execute
- no provider/channel execution
- no direct runtime-private dependency
- no runtime-law invention in product space
- no protocol-law widening from downstream pressure
- no product labels implying approval, dispatch, execution, policy mutation,
  protocol certification, or autonomous completion

## C. Existing Asset Reuse Map

### 1. Secretary beta shell

- current file/dir:
  - `app/shell/portfolio-secretary-shell.ts`
  - `projection/assembly/portfolio-secretary-shell.ts`
  - `projection/contracts/portfolio-secretary-shell-contract.ts`
  - `tests/app/portfolio-secretary-page.test.ts`
  - `tests/projection/portfolio-secretary-shell.test.ts`
- current role:
  - top-level portfolio / Secretary beta lane with bounded navigation, queue,
    review, posture shelves, and explicit non-executing framing
- intended future role:
  - remain the top-level carrier for the founder-request exception packet loop
  - host entry visibility for packet-ready, review-needed, and revision-return
    posture
- reuse status:
  - extend

### 2. Handoff staging surface

- current file/dir:
  - `app/shell/secretary-handoff-staging.ts`
  - `projection/assembly/secretary-handoff-staging.ts`
  - `projection/contracts/secretary-handoff-staging-contract.ts`
  - `tests/app/secretary-handoff-page.test.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
- current role:
  - bounded Secretary-to-cell staging surface with selected-cell context,
    packet-state posture, rationale, evidence, and revision visibility
- intended future role:
  - become the first downstream carrier for founder-request-derived packet
    context once projection summaries are mapped contract-safely
- reuse status:
  - extend

### 3. Handoff review packet surface

- current file/dir:
  - `app/shell/secretary-handoff-review-packet.ts`
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/contracts/secretary-handoff-review-packet-contract.ts`
  - `tests/app/secretary-handoff-review-page.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
- current role:
  - bounded review-only packet surface with review-readiness, packet state,
    rationale/evidence, and explicit non-claims
- intended future role:
  - carry the Review/return posture, bounded action recommendation, evidence
    summary, omission/insufficiency markers, and learning suggestion summary
- reuse status:
  - extend

### 4. Rationale / evidence / provenance visibility

- current file/dir:
  - `projection/assembly/secretary-handoff-rationale.ts`
  - `projection/contracts/secretary-handoff-rationale-contract.ts`
  - rationale/evidence sections embedded in current shell/page tests
- current role:
  - explain why a packet exists, what evidence is visible, what remains omitted,
    and why provenance stays downstream/non-authoritative
- intended future role:
  - become the bounded evidence / omission / insufficiency / stale rendering
    substrate for the founder-request loop
- reuse status:
  - extend

### 5. Revision / return consistency

- current file/dir:
  - `projection/assembly/secretary-handoff-packet-state.ts`
  - current staging/review packet assemblies and tests
- current role:
  - keep packet-state vocabulary aligned across shell, staging, and review
    packet surfaces
- intended future role:
  - anchor `return_for_revision` posture without drifting into reject,
    dispatch, or execution semantics
- reuse status:
  - reuse as-is for baseline packet-state semantics; extend only if new
    exception postures require explicit bounded mapping

### 6. Portfolio queue / review / posture shelves

- current file/dir:
  - `projection/assembly/portfolio-secretary-shell.ts`
  - `app/pages/portfolio-secretary-page.ts`
  - `tests/app/portfolio-secretary-page.test.ts`
- current role:
  - show bounded queue, review, and posture summaries across the portfolio lane
- intended future role:
  - surface founder-request exception packet visibility and packet counts
    without becoming a founder queue implementation
- reuse status:
  - extend carefully

### 7. Existing request package assets

- current file/dir:
  - `app/shell/single-cell-operator-request-package.ts`
  - `app/shell/single-cell-operator-request-package-contract.ts`
  - related request-package tests under `tests/app/`
- current role:
  - package bounded single-cell request context in the sealed `v0.3` line
- intended future role:
  - provide language and field-class reference for founder-request input
    packaging only
- reuse status:
  - reference only; must remain untouched in the first founder-request loop
    waves unless a later bounded extension is explicitly justified

### 8. Existing delivery acceptance assets

- current file/dir:
  - `app/shell/single-cell-delivery-acceptance.ts`
  - `app/shell/single-cell-delivery-acceptance-contract.ts`
  - related delivery-acceptance tests under `tests/app/`
- current role:
  - expose bounded acceptance context for the single-cell line
- intended future role:
  - provide reusable evidence/acceptance wording patterns only
- reuse status:
  - reference only; must remain untouched unless a later evidence-hardening wave
    proves a bounded shared helper is necessary

### 9. Projection / adapter / shell directories

- current file/dir:
  - `projection/contracts/`
  - `projection/assembly/`
  - `projection/adapters/`
  - `app/shell/`
  - `app/pages/`
- current role:
  - existing repo lanes for product contracts, assembly, bounded upstream
    adaptation, shell composition, and page rendering
- intended future role:
  - remain the only lawful implementation lanes for this loop
- reuse status:
  - reuse

### 10. Existing tests that can be extended

- current file/dir:
  - `tests/projection/portfolio-secretary-shell.test.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/app/portfolio-secretary-page.test.ts`
  - `tests/app/secretary-handoff-page.test.ts`
  - `tests/app/secretary-handoff-review-page.test.ts`
  - full regression suite via `npm test`
- current role:
  - prove current Secretary shell, staging, review packet, and non-executing
    boundaries
- intended future role:
  - become the primary extension points for founder-request loop coverage
- reuse status:
  - extend

### Directories That Must Remain Untouched At First

- `projection/objects/`
- `Files_GPT/`
- existing `v0.3` single-cell request-package and delivery-acceptance code
  paths
- any runtime-import or direct upstream service path

## D. Contract-Derived Input Mapping

The future implementation may consume only these six projection families.

### 1. `continuity_projection_summary`

- future handoff packet field class:
  - continuation context class
  - continuation-anchor summary class
  - freshness / resumption posture class
- exception posture influence:
  - `monitor`
  - `stale_context`
  - `evidence_insufficient`
- evidence posture:
  - summary-only by default
  - evidence refs optional and bounded if later lawfully present
- omission / insufficiency handling:
  - omitted continuity detail must remain `omitted_by_contract`
  - weak continuity truth must remain `insufficient_evidence`
- stale handling:
  - stale continuity must surface explicit stale posture and must not be treated
    as fresh packet context
- forbidden raw fields:
  - raw VSL store layout
  - raw anchor internals
  - raw snapshot structure

### 2. `semantic_relation_projection_summary`

- future handoff packet field class:
  - affected-object summary class
  - changed-relation summary class
  - relation-aware packet framing class
- exception posture influence:
  - `impact_detected`
  - `review_needed`
  - `evidence_insufficient`
- evidence posture:
  - relation-linked evidence refs may surface only as bounded summary-safe refs
- omission / insufficiency handling:
  - hidden relation detail stays `omitted_by_contract`
  - weak relation support stays `insufficient_evidence`
- stale handling:
  - stale relation posture must not silently support fresh downstream framing
- forbidden raw fields:
  - raw PSG graph state
  - raw node records
  - raw relation edges

### 3. `drift_impact_projection_summary`

- future handoff packet field class:
  - drift kind class
  - affected/baseline summary class
  - impact summary class
  - revision-return justification class
- exception posture influence:
  - `impact_detected`
  - `review_needed`
  - `return_for_revision`
  - `evidence_insufficient`
- evidence posture:
  - supporting evidence refs required when impact is asserted
- omission / insufficiency handling:
  - hidden impact detail stays explicit
  - missing comparison confidence remains `insufficient_evidence`
- stale handling:
  - stale drift/impact must surface as stale and block confident posture
- forbidden raw fields:
  - raw `drift-record`
  - raw `conflict-case`
  - raw reconcile snapshot internals

### 4. `activation_projection_summary`

- future handoff packet field class:
  - bounded action recommendation class
  - confirm-required class
  - suppression/escalation summary class
- exception posture influence:
  - `confirm_required`
  - `review_needed`
  - `activation_blocked`
  - `blocked_by_contract`
- evidence posture:
  - bounded activation evidence may surface only as summary-safe support
- omission / insufficiency handling:
  - hidden activation detail stays `omitted_by_contract`
  - unresolved activation support stays `insufficient_evidence` or
    `not_available_upstream`
- stale handling:
  - stale activation context must not be rendered as current recommendation
- forbidden raw fields:
  - raw `activation-signal`
  - raw `action-unit`
  - raw rule-match internals

### 5. `confirm_trace_decision_projection_summary`

- future handoff packet field class:
  - evidence summary class
  - confirm/decision posture class
  - omission-reason class
  - bounded confidence posture class
- exception posture influence:
  - `confirm_required`
  - `review_needed`
  - `evidence_insufficient`
  - `blocked_by_contract`
- evidence posture:
  - evidence refs preserved where allowed
  - evidence summary remains bounded and is not a raw trace dump
- omission / insufficiency handling:
  - omitted confirm/trace/decision detail remains explicit
  - thin evidence remains `insufficient_evidence`
- stale handling:
  - stale evidence must not read as fresh decision support
- forbidden raw fields:
  - raw trace dumps
  - raw decision-record internals
  - raw protocol reconstruction internals

### 6. `learning_suggestion_projection_summary`

- future handoff packet field class:
  - learning suggestion summary class
  - suggestion kind class
  - future-export-eligibility posture class
- exception posture influence:
  - `monitor`
  - `review_needed`
  - `evidence_insufficient`
- evidence posture:
  - bounded source refs may surface only where contract allows them
- omission / insufficiency handling:
  - hidden learning source detail remains `omitted_by_contract`
  - low-confidence suggestion remains `insufficient_evidence`
- stale handling:
  - stale learning posture may be shown only as stale suggestion, not current
    truth
- forbidden raw fields:
  - raw `learning-candidate`
  - raw consolidation internals
  - any policy-mutation signal

## E. Future Surface Scope

### Allowed Minimal Future Surface Scope

The following may appear inside existing Secretary / handoff / review packet
surfaces only:

- founder-request summary framing
- delta-intent-aware packet context
- bounded affected-object and impact summaries
- bounded action recommendation posture
- confirm-required or blocked-by-contract posture
- evidence summary and evidence refs where contract allows them
- omission / insufficiency / stale markers
- learning suggestion summary as suggestion-only posture

### Must Stay Hidden

- raw runtime store layout
- raw runtime-private identities treated as product nouns
- raw PSG graph internals
- raw VSL internals
- raw drift-record / conflict-case / learning-candidate / action-unit records
- raw trace dumps
- raw protocol reconstruction details

### Must Be Shown Explicitly When Present

- `omitted_by_contract`
- `not_available_upstream`
- `insufficient_evidence`
- `stale`
- `not_applicable`

### Must Never Be Shown

- approval semantics
- dispatch semantics
- execution semantics
- provider/channel result semantics
- policy mutation semantics
- protocol certification semantics
- autonomous completion semantics

## F. Proposed Implementation Waves

### Wave 1: Contract-Derived DTO Skeleton / Type Guards

- scope:
  - freeze TypeScript-side contract skeletons and type guards for the selected
    loop using only the six projection families and the existing omission /
    insufficiency vocabulary
- files likely touched:
  - `projection/contracts/`
  - `app/shell/` contract files only if shell-facing shape needs a bounded
    contract companion
  - `tests/projection/`
- tests required:
  - contract/type-guard tests
  - negative tests for forbidden labels and forbidden raw-field dependency
  - full `npm test`
- explicit non-goals:
  - no page changes
  - no shell behavior changes
  - no assembly logic changes
  - no UI
- rollback condition:
  - pause if skeleton design requires raw runtime imports or final DTO law

### Wave 2: Projection Adapter Over Bounded Summaries

- scope:
  - add the bounded adapter layer that converts future contract-safe upstream
    summaries into downstream projection-ready packet inputs
- files likely touched:
  - `projection/adapters/`
  - `projection/contracts/`
  - `tests/projection/`
- tests required:
  - adapter mapping tests for omission / insufficiency / stale preservation
  - negative tests proving no raw runtime-private dependency
  - full `npm test`
- explicit non-goals:
  - no page rendering
  - no state-machine implementation
  - no direct runtime import path
- rollback condition:
  - pause if existing adapter boundary is insufficient and would require a
    second runtime-import system

### Wave 3: Exception Posture Derivation Function

- scope:
  - derive bounded exception posture from the six contract families using the
    already frozen exception-state-machine baseline
- files likely touched:
  - `projection/assembly/`
  - `projection/contracts/`
  - `tests/projection/`
- tests required:
  - posture derivation tests
  - forbidden transition negative tests
  - omission / insufficiency / stale tests
- explicit non-goals:
  - no state-machine code engine
  - no direct-control transitions
  - no founder queue implementation
- rollback condition:
  - pause if a required posture cannot be derived without redefining runtime or
    protocol semantics

### Wave 4: Handoff Packet Enrichment Using Existing Surfaces

- scope:
  - enrich current staging/review packet assemblies and shell-facing contracts
    with founder-request exception packet context while preserving existing
    non-executing product surfaces
- files likely touched:
  - `projection/assembly/secretary-handoff-staging.ts`
  - `projection/assembly/secretary-handoff-review-packet.ts`
  - `projection/contracts/secretary-handoff-staging-contract.ts`
  - `projection/contracts/secretary-handoff-review-packet-contract.ts`
  - `app/shell/secretary-handoff-staging.ts`
  - `app/shell/secretary-handoff-review-packet.ts`
  - `tests/projection/secretary-handoff-staging.test.ts`
  - `tests/projection/secretary-handoff-review-packet.test.ts`
  - `tests/app/secretary-handoff-page.test.ts`
  - `tests/app/secretary-handoff-review-page.test.ts`
- tests required:
  - enriched packet tests
  - no-direct-control assertions
  - no-provider/channel assertions
  - full `npm test`
- explicit non-goals:
  - no new top-level page family
  - no approval workflow
  - no dispatch/execution behavior
- rollback condition:
  - pause if enrichment would force raw runtime object exposure or final UI
    redesign

### Wave 5: Evidence / Omission / Stale Display Hardening

- scope:
  - harden current rationale/evidence surfaces so evidence summary,
    insufficiency, omission, and stale posture remain explicit and aligned
- files likely touched:
  - `projection/assembly/secretary-handoff-rationale.ts`
  - `projection/contracts/secretary-handoff-rationale-contract.ts`
  - affected shell/page renderers only if wording surfaces need bounded updates
  - app/projection tests around rationale/evidence visibility
- tests required:
  - evidence ref preservation tests
  - omission and stale visibility tests
  - forbidden-label negative tests
  - full `npm test`
- explicit non-goals:
  - no raw trace viewer
  - no confidence theater
  - no protocol-certified wording
- rollback condition:
  - pause if evidence hardening would require exposing raw Confirm/Trace export
    artifacts

### Wave 6: Tests / Gates / Closure Audit

- scope:
  - freeze the first founder-request loop implementation gate, closure audit,
    and repo-truth wording after the above waves land
- files likely touched:
  - `governance/audits/`
  - `CHANGELOG.md`
  - tests only if final gate coverage is missing
- tests required:
  - full `npm test`
  - bounded grep/self-check for forbidden labels and dependency classes
  - explicit changed-file audit
- explicit non-goals:
  - no new product behavior
  - no new upstream contract assumptions
- rollback condition:
  - pause if the landed implementation still reads as execution-bearing or
    authority-bearing

## G. Required Tests And Gates

Future implementation must satisfy all of the following:

- no raw runtime imports
- no forbidden labels
- no forbidden transitions
- no approve/reject/dispatch/execute
- no provider/channel execution
- no runtime-private direct dependency
- omission semantics covered
- insufficiency semantics covered
- stale-state semantics covered
- evidence refs preserved where allowed
- learning suggestion remains suggestion-only
- bounded action recommendation remains non-executing

Recommended gate families for this loop:

- `GATE-FRLP-BOUNDARY-01`
  - raw runtime-private dependency absent
- `GATE-FRLP-BOUNDARY-02`
  - forbidden labels absent
- `GATE-FRLP-BOUNDARY-03`
  - forbidden transitions absent
- `GATE-FRLP-BOUNDARY-04`
  - bounded action recommendation remains non-executing
- `GATE-FRLP-BOUNDARY-05`
  - learning suggestion remains suggestion-only
- `GATE-FRLP-BOUNDARY-06`
  - omission / insufficiency / stale markers remain explicit
- `GATE-FRLP-XREPO-01`
  - only contracted projection families are consumed
- `GATE-FRLP-XREPO-02`
  - missing upstream truth pauses the wave instead of being invented locally

## H. DoD For First Implementation Wave

Selected first code wave after this plan:

- `Contract-derived DTO skeleton / type guards`

That first wave is done only when:

- one bounded contract lane exists for the founder-request exception packet loop
  using only the six projection families
- omission / insufficiency / stale vocabulary is represented in the type guard
  boundary
- forbidden raw fields are explicitly excluded in contract comments/tests
- no app/page behavior changes exist
- no assembly logic changes exist
- no adapter logic changes exist
- no runtime imports exist
- no provider/channel semantics appear
- no approve/reject/dispatch/execute semantics appear
- targeted contract tests pass
- full `npm test` passes

## I. Boundary Conclusion

Selected readiness value:

- `IMPLEMENTATION_PLAN_READY_FOR_DTO_SKELETON`

Why this is the correct read:

- the selected loop is already frozen
- the projection contract and exception-state-machine baseline are already
  frozen
- the current repo has reusable shell, staging, review packet, rationale, and
  test assets
- the next smallest lawful move is to freeze contract-derived DTO skeletons and
  type guards before any adapter, assembly, or UI change

Why this is not a stronger claim:

- it does not authorize implementation beyond the first bounded code wave
- it does not authorize final DTO law
- it does not authorize UI work
- it does not authorize direct-control behavior
