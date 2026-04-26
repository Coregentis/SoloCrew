# SoloCrew V2.0 First Runnable AIGC Operating Product Baseline v0.1

## 1. Document Control

- `doc_id`:
  - `SOLOCREW-V2.0-FIRST-RUNNABLE-AIGC-OPERATING-PRODUCT-BASELINE-v0.1`
- `status`:
  - `Planning Baseline`
- `authority_order`:
  - `MPLP -> Cognitive_OS -> Projection -> SoloCrew`
- `version_line`:
  - `V2.0`
- `depends_on`:
  - `V1.9 Runtime Readiness Closure`
  - `Cognitive_OS runtime readiness foundation`
  - `SoloCrew projection contracts`
  - `SoloCrew product-surface thin consumption`
- `trace_tags`:
  - `v2_0_planning_baseline`
  - `first_runnable_aigc_product`
  - `multi_cell_operating_product`
  - `founder_dashboard`
  - `cell_operations_panel`
  - `starter_cells`
  - `learning_persistence_drift`
  - `bounded_action_classes`

## 2. V2.0 Product Definition

SoloCrew V2.0 is defined as:

- `SoloCrew V2.0 — First Runnable AIGC Operating Product`

Meaning:

- first runnable one-person-company AIGC operating product
- not merely a governance demo
- not merely a draft generator
- not raw chat
- not full autonomous company
- not GA

V2.0 must include:

- user can create or use multiple Cells
- each Cell has an operations surface
- system can generate real AIGC artifacts
- system can persist Cell, task, artifact, history, and preference state
- system can learn within scope
- system can surface drift and change impact
- system can connect selected action classes under bounded confirmation

Product direction:

- SoloCrew should move toward the same user capability class as personal autonomous agent products such as OpenClaw and Hermes Agent
- this is product-direction guidance only, not a parity claim and not a release claim
- SoloCrew differentiation remains:
  - multi-Cell one-person-company structure
  - persistent project and Cell memory
  - stronger learning and preference continuity
  - clearer Founder and Cell operating surfaces
  - bounded action-class governance
  - `MPLP -> Cognitive_OS -> Projection -> SoloCrew` architecture discipline

## 3. Target User and Core Use Case

Target user:

- solo founder
- independent builder
- high-context operator
- multi-project AIGC worker
- one-person company operator

Core user problem:

- long-running AI work loses constraints, preferences, project state, historical decisions, user goals, and learning over time

Core V2.0 promise:

- user can operate multiple AI Cells from one Founder surface and continue real work across sessions

## 4. V2.0 Product Surface Scope

Required product surfaces:

### A. Founder Dashboard

This surface must evolve from the V1.9 thin-consumption dashboard into a product-facing dashboard.

Required sections:

- Cell overview
- active priorities
- pending reviews
- recent artifacts
- learned preferences
- drift and blocked items
- suggested next actions
- V2.0 readiness and execution-boundary notices

Current starting truth from V1.9:

- bounded cell cards already exist
- bounded pending-review, recent-artifact, learned-preference, blocked-item, and suggested-next-action sections already exist
- current surface remains non-executing and thin-consumption only

### B. Cell Operations Panel

This surface must evolve from the V1.9 thin-consumption panel into a per-Cell operating panel.

Required sections:

- objective
- tasks
- artifacts
- actions
- learning
- drift
- reviews
- history
- metrics
- suggested next actions

Current starting truth from V1.9:

- bounded task, artifact, action, learning, drift, review, history, metric, and suggested-next-action sections already exist
- current surface remains non-executing and thin-consumption only

Wave 1 boundary:

- V2.0 Wave 1 does not implement these surfaces
- it defines the baseline for later implementation

## 5. Starter Cell Pack

V2.0 starter cells:

1. Development Company Cell
2. E-commerce Cell
3. Personal Media Cell

### 1. Development Company Cell

- `purpose`:
  - operate product, engineering, and release work for a software or agent project
- `default user job-to-be-done`:
  - turn goals and changes into structured development work and reusable delivery artifacts
- `default task types`:
  - requirement clarification
  - PRD shaping
  - issue drafting
  - task breakdown
  - implementation planning
  - release preparation
- `default artifact types`:
  - PRD
  - issue draft
  - task breakdown
  - implementation plan
  - code or file draft
  - release note
  - review packet
- `default memory fields`:
  - project objective
  - repo or codebase context
  - architecture notes
  - delivery constraints
  - accepted decisions
  - release history summary
- `default learning fields`:
  - code style preferences
  - task decomposition preferences
  - review depth preference
  - release note format preference
  - failure-pattern reminders
- `default drift risks`:
  - changed product requirements
  - stale implementation plan
  - dependency mismatch
  - release-scope drift
  - conflicting issue priority
- `default action classes`:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
- `V2.0 minimum acceptance example`:
  - user opens Development Company Cell, requests a feature plan, receives a usable PRD or task-breakdown artifact, saves it, revises it, and resumes it after restart

### 2. E-commerce Cell

- `purpose`:
  - operate product-listing, merchandising, campaign, and customer-response drafting work
- `default user job-to-be-done`:
  - turn product and selling intent into usable commercial artifacts without dispatching them automatically
- `default task types`:
  - listing creation
  - copy revision
  - campaign planning
  - offer iteration
  - customer response drafting
- `default artifact types`:
  - product title
  - listing copy
  - selling points
  - campaign plan
  - customer response draft
  - review packet
- `default memory fields`:
  - product catalog context
  - brand tone
  - offer constraints
  - channel formatting notes
  - customer objection patterns
- `default learning fields`:
  - brand voice preference
  - preferred listing structure
  - campaign tone
  - objection-handling style
  - artifact feedback patterns
- `default drift risks`:
  - changed pricing or product facts
  - stale inventory assumptions
  - changed brand guidance
  - conflicting campaign goal
  - cross-channel formatting mismatch
- `default action classes`:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
- `V2.0 minimum acceptance example`:
  - user opens E-commerce Cell, requests a new listing package, receives usable listing artifacts, saves them, revises them, and preserves brand-tone learning within that Cell only

### 3. Personal Media Cell

- `purpose`:
  - operate repeatable content planning and draft-production work for personal publishing
- `default user job-to-be-done`:
  - turn topics, notes, and audience intent into reusable content artifacts across sessions
- `default task types`:
  - topic shaping
  - article drafting
  - title iteration
  - summary drafting
  - tag generation
  - content calendar suggestion
- `default artifact types`:
  - article draft
  - title
  - summary
  - tags
  - content calendar suggestion
  - review packet
- `default memory fields`:
  - voice and tone notes
  - audience focus
  - recurring themes
  - publishing cadence
  - content backlog context
- `default learning fields`:
  - style preference learning
  - preferred structure
  - title preference
  - summary preference
  - feedback-derived revision patterns
- `default drift risks`:
  - changed audience target
  - stale topic framing
  - conflicting content goal
  - preference drift across channels
  - schedule or cadence change
- `default action classes`:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
- `V2.0 minimum acceptance example`:
  - user opens Personal Media Cell, requests a draft article package, receives article, title, summary, tags, and calendar suggestion artifacts, and sees style preference reuse only in that Cell

## 6. Real AIGC Artifact Workflow Scope

V2.0 real AIGC artifact definition:

- not just a packet
- not just mock output
- usable work product that can be reviewed, saved, resumed, revised, and exported

Required artifact classes:

- `local_generated`
- `external_draft`
- `imported`
- `archived`

V2.0 minimum artifact workflows:

- create artifact
- save artifact
- list recent artifacts
- view artifact history
- revise artifact
- connect artifact to task, Cell, and evidence
- preserve artifact after restart

Out of scope for initial V2.0:

- uncontrolled external dispatch
- payment, trading, purchase, or legal actions
- full provider marketplace

## 7. Persistence / Learning / Drift Scope

### Persistence

- Cell state survives restart
- task history survives restart
- artifact history survives restart
- review state survives restart
- preference and learning candidates survive restart
- user can resume prior work

### Learning

- Cell-scoped preference learning
- artifact feedback learning
- failure-pattern learning
- global preference candidate, but not automatic global truth
- cross-Cell non-pollution

### Drift

- user changes goal or requirement
- system generates impact summary
- system recommends `continue`, `clarify`, `revise`, `branch`, or `block`

Acceptance examples:

- Personal Media style preference is learned and reused only in that Cell
- E-commerce brand tone does not pollute Development Company Cell
- release-task failure pattern becomes future workflow suggestion after user confirmation
- changed user goal creates a drift impact summary with a continuation recommendation

## 8. Action-Class Connection Scope

V2.0 uses the V1.9 action-class taxonomy.

Allowed to productize in V2.0:

- `auto_local`
  - create artifact
  - update task state
  - update local memory
- `reviewable_local`
  - create local file, task, or update candidate
  - requires review
- `external_draft`
  - email, social, or product-listing draft
  - draft only, no dispatch
- `limited_external_dispatch`
  - optional, deferred, or strongly confirmed
  - not required in initial V2.0 unless explicitly selected later
- `forbidden_irreversible`
  - payment, trading, purchase, legal, or irreversible financial actions
  - blocked

Initial V2.0 minimum:

- support `A0` / `auto_local`
- support `A1` / `reviewable_local`
- support `A2` / `external_draft`
- `A3` / `limited_external_dispatch` may be deferred or tightly limited
- `A4` / `forbidden_irreversible` must be blocked

## 9. V2.0 Wave Plan

### V2.0 Wave 2 — Starter Cell Product Baseline and Fixtures

- define three starter Cells in product terms
- create fixture data for Development Company, E-commerce, and Personal Media Cells
- no real execution yet

### V2.0 Wave 3 — Founder Dashboard Productization

- expand thin dashboard into a product-facing surface
- consume real starter-Cell projection data
- no provider dispatch

### V2.0 Wave 4 — Cell Operations Panel Productization

- expand per-Cell panel into a product-facing surface
- add stronger task, artifact, action, learning, drift, review, and history presentation
- no external dispatch

### V2.0 Wave 5 — Artifact Workflow and Persistence

- create, save, list, and revise artifact
- persist artifact, task, Cell, and history state
- prove restart and resume

### V2.0 Wave 6 — Learning and Drift Productization

- scoped learning
- feedback capture
- drift impact and recommendation
- non-pollution tests

### V2.0 Wave 7 — Bounded Action-Class Connection

- connect `A0`, `A1`, and `A2` to product flows
- decide whether any `A3` path is admitted
- keep `A4` blocked

### V2.0 Wave 8 — RC / Stable Release

- run acceptance gates
- release only if all required gates pass

## 10. V2.0 Acceptance Gates

### A. Product Usability Gate

- user can operate Founder Dashboard
- user can open each starter Cell
- user can submit or continue a task
- user can get a real AIGC artifact

### B. Multi-Cell Gate

- Development Company, E-commerce, and Personal Media starter Cells exist
- each has distinct tasks, artifacts, memory, and learning fields

### C. Persistence Gate

- restart and resume works
- Cell, task, artifact, history, and preference state survives

### D. Learning Gate

- scoped learning works
- global candidate does not become global truth automatically
- rejected learning remains inactive
- cross-Cell non-pollution is proven

### E. Drift Gate

- changed intent produces impact summary
- continuation recommendation is produced
- contradictory change requires `clarify` or `block`

### F. Action-Class Gate

- `A0` works
- `A1` works with review
- `A2` works as draft-only
- `A3` is deferred or strongly confirmed
- `A4` is blocked

### G. Boundary Gate

- no provider/channel execution overclaim
- no autonomous company claim
- no GA claim
- no MPLP certification claim
- no bypass of Cognitive_OS / Projection boundary

## 11. Explicit Non-Goals

- V2.0 Wave 1 does not implement V2.0
- no product UI implementation
- no starter-Cell implementation
- no real artifact-generation implementation
- no provider/channel execution
- no external dispatch
- no autonomous company operation
- no payment, trading, purchase, or legal action
- no GA
- no MPLP certification
- no Cognitive_OS or MPLP changes

## 12. Final Decision

- `V2_0_WAVE1_PLANNING_BASELINE_PASS`
- `next_allowed_wave`:
  - `V2.0 Wave 2 — Starter Cell Product Baseline and Fixtures`
