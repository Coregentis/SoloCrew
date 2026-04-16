# SOLOCREW v0.5 Wave Sequence v0.1

## Purpose

This document defines the bounded implementation waves for `v0.5-portfolio-secretary-beta`.

Each wave is valid only if it remains:

- handoff-first
- posture-first
- non-executing
- non-runtime-authoritative
- non-protocol-promoting

## Common Forbidden Behaviors

Every `v0.5` wave must explicitly preserve:

- no direct approve controls
- no direct reject controls
- no direct dispatch controls
- no direct execute controls
- no direct provider or channel controls
- no workflow-engine behavior
- no runtime authority ownership

## Wave 1: Secretary Entry And Navigation Baseline

### Objective

Establish the first bounded Secretary and portfolio beta surface above the current `v0.4` inspection surfaces.

### Allowed Surface Additions

- one top-level Secretary and portfolio page
- one bounded Secretary shell/view contract
- bounded navigation between portfolio view and existing cell/detail/inspection routes
- route- and shell-level truth-boundary sections that restate non-executing limits

### Forbidden Behaviors

- no queue mutation
- no management-object mutation
- no direct handoff execution
- no direct approve or reject controls
- no direct dispatch or execute controls

### Upstream Dependency Assumptions

- stable cell identity and summary inputs remain available through current adapters
- no new upstream runtime object family is required for the navigation baseline

### Expected Tests

- app page tests for Secretary route, shell, and navigation
- boundary tests proving Secretary beta remains non-executing and non-authoritative

### Exit Criteria

- Secretary beta surface exists as a bounded top-level product entry
- existing `v0.4` views remain intact and reachable
- no direct-control semantics appear in page or shell truth

## Wave 2: Portfolio Posture And Queue Projection

### Objective

Project bounded portfolio-level posture over the existing runtime-backed multi-cell foundation.

### Allowed Surface Additions

- portfolio-level projection contracts
- assembly logic for queue, review, management, and continuity posture shelves
- shell/page rendering for bounded multi-cell portfolio posture summaries

### Forbidden Behaviors

- no queue ownership as runtime truth
- no approval execution semantics
- no dispatch execution semantics
- no workflow-engine semantics
- no direct provider or channel entry

### Upstream Dependency Assumptions

- `cell-runtime-scope`
- `cell-summary-runtime-record`
- `management-directive-record`
- `delivery-return-record`
- `approval-request-record`

These remain bounded upstream inputs only.

### Expected Tests

- projection tests for portfolio posture summaries
- app tests for queue/review/management posture visibility
- boundary tests proving posture remains visible/staged product meaning only

### Exit Criteria

- portfolio-level posture shelves exist as product projections only
- queue/review semantics remain non-executing
- no upstream object identity is collapsed into product identity

## Wave 3: Secretary-To-Cell Handoff Staging

### Objective

Add the first bounded handoff creation and staging surface inside the Secretary beta line.

### Allowed Surface Additions

- handoff staging projection contract
- handoff assembly logic over selected cell and posture context
- staging shell/page that packages bounded intent, review context, and management context for one selected cell

### Forbidden Behaviors

- no direct approval execution
- no direct rejection execution
- no direct dispatch execution
- no direct runtime mutation
- no provider/channel execution

### Upstream Dependency Assumptions

- existing cell and management-family inputs remain enough to stage handoff context
- `objective_id` and `management_record_kind` remain stable where management-family linkage is needed
- no new upstream schema is presumed for local handoff packaging

### Expected Tests

- projection tests proving handoff payload is product-projected
- app tests proving handoff is staging-only and non-executing
- boundary tests proving the cell remains the bounded execution locus

### Exit Criteria

- one bounded handoff staging surface exists
- handoff remains visibly distinct from approval, dispatch, and execute behavior
- cross-repo boundaries remain explicit in tests and page truth

## Wave 4: Beta Consistency And Boundary Hardening

### Objective

Polish and harden the `v0.5` beta line so its surfaces read as one coherent bounded product layer.

### Allowed Surface Additions

- consistency work across Secretary, portfolio, detail, management, and continuity lanes
- label, note, route, and test hardening
- bounded presentation polish for acceptance/evidence/review consistency

### Forbidden Behaviors

- no new execution semantics
- no workflow-engine behavior
- no runtime authority takeover
- no hidden `v1.0` pull-forward

### Upstream Dependency Assumptions

- no new upstream schema should be required for polish or hardening
- if stronger upstream truth is needed, the wave pauses rather than inventing it locally

### Expected Tests

- full `npm test`
- cross-lane boundary tests for Secretary and portfolio semantics
- targeted regression tests for direct-control absence

### Exit Criteria

- `v0.5` reads as one bounded beta line rather than a loose set of additions
- direct-control semantics remain absent across all `v0.5` surfaces
- the line is ready for bounded release-line audit
