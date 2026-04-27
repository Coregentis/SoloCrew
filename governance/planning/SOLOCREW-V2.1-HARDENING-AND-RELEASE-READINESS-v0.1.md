# SOLOCREW-V2.1-HARDENING-AND-RELEASE-READINESS-v0.1

## 1. Document Control

- doc_id: SOLOCREW-V2.1-HARDENING-AND-RELEASE-READINESS-v0.1
- status: Hardening / Release-Readiness Planning
- version_line: V2.1 review-only implementation line
- authority: SoloCrew Product Hardening Baseline
- authority_order: MPLP -> Cognitive_OS -> SoloCrew
- depends_on:
  - SOLOCREW-V2.1-SCOPE-PLANNING-v0.1
  - SOLOCREW-POST-CELL-DRIFT-ARCHITECTURE-BASELINE-v0.1
  - IMPL-01 Secretary Routing Proposal
  - IMPL-02 Management Directive
  - IMPL-03 Cell CEO Assembly Plan Preview
  - IMPL-04A Project Governance Asset-Family Mapping
- trace_tags:
  - solocrew/v2_1
  - hardening
  - release-readiness
  - boundary-grep
  - negative-tests
  - review-only-chain
  - no-release-claim

## 2. Executive Decision

decision: V2_1_HARDENING_READY_FOR_RELEASE_READINESS_REVIEW

The V2.1 review-only implementation chain exists. This document prepares a
future release-readiness review, but it does not open release execution and it
does not authorize further feature implementation.

## 3. Implemented Review-Only Chain

### IMPL-01 SecretaryRoutingProposal

Purpose:
Route founder intent to an existing Cell or propose a review-only new Cell
path.

Boundary:
Product projection only. Review is required. It does not create a Management
Directive, create a Cell, create a Cell kind, dispatch, or execute.

### IMPL-02 ManagementDirective

Purpose:
Convert an accepted existing-Cell Secretary routing proposal into a selected
Cell handoff preview.

Boundary:
Product projection only. Review is required. It does not start Cell CEO
Assembly, install assets, dispatch, approve execution, or create upstream law.

### IMPL-03 CellCEOAssemblyPlanPreview + Asset-Type Vocabulary

Purpose:
Preview how the selected Cell would review asset type categories before later
planning.

Boundary:
Product projection only. Asset types are vocabulary only. It does not run
assembly execution, resolve assets, install assets, invoke tool adapters,
dispatch, or approve work.

### IMPL-04A ProjectGovernanceAssetFamilyMapping

Purpose:
Map a Development Company Cell preview to developer project-governance
asset-family references.

Boundary:
Product projection only. Review is required. TracePilot remains only a future
optional Coregentis product integration/provider candidate. It is not a
SoloCrew Cell and not the canonical SoloCrew internal object name.

## 4. Boundary Invariants

- No V2.1 release claim invariant
- Product projection only invariant
- Review-only chain invariant
- No execution invariant
- No provider/channel dispatch invariant
- No autonomous execution invariant
- No approval/execution authority invariant
- No external business action invariant
- No marketplace invariant
- No asset installation/resolver invariant
- No tool adapter execution invariant
- No TracePilot Cell invariant
- No TracePilot integration invariant
- No project import/codebase analysis/drift detection/evidence pack generation invariant
- No new Cell kind invariant
- No MPLP/Cognitive_OS mutation invariant
- No raw Cognitive_OS runtime-private product API invariant

## 5. Current Release-Readiness Assessment

- Product chain completeness: review-only chain complete
- Execution capability: intentionally absent
- Marketplace capability: intentionally absent
- TracePilot integration: intentionally absent
- Upstream dependency: none required for current review-only scope
- Test status: local replay for this hardening wave passed after this document
  was added (`npm test`: 477 pass, 0 fail; focused V2.1 hardening test: 5 pass,
  0 fail)
- Blocking issues: none expected beyond tracked P4/P5 debt

## 6. Required Release-Readiness Gates Before Future Release

Future release review must require:

- full `npm test` PASS
- focused tests PASS
- boundary grep PASS
- README/CHANGELOG alignment
- no release claim before owner release authorization
- no forbidden positive flags
- no TracePilot canonical internal object regression
- no Cell kind drift
- no raw Cognitive_OS runtime-private product API
- remote commit/push evidence
- clean worktree

## 7. Negative Test Coverage

This hardening wave adds negative tests for:

- V2.1 no release claim
- no marketplace / asset resolver / asset installation
- no provider/channel/autonomous/approval/external execution
- no TracePilot Cell / no TracePilot integration
- no project import / codebase analysis / drift detection / evidence pack generation
- no new Cell kind drift
- no raw runtime-private Cognitive_OS product API
- review-only flags preserved across all V2.1 objects

## 8. Residual P4/P5 Debt

- P4 sealed runtime-session bridge compatibility debt remains tracked and is
  not widened by the V2.1 review-only chain.
- P5 local test replay remains the primary verification signal unless a remote
  CI/status baseline is added.
- Historical audit/governance wording may preserve old drift examples.

## 9. Release Execution Non-Authorization

This hardening wave does not authorize V2.1 release. Release execution must be
a separate owner-authorized wave.

Suggested future wave name:

- SOLOCREW-V2.1-RELEASE-READINESS-REVIEW-01
- SOLOCREW-V2.1-RC-01 only if owner explicitly authorizes release candidate

## 10. Final Recommendation

V2.1 is ready for a separate release-readiness review. More implementation is
not required before that review. Release remains blocked pending owner
authorization.
