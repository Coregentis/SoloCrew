# SoloCrew V2.0 Starter Cell Product Baseline and Fixtures v0.1

## 1. Document Control

- `doc_id`:
  - `SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1`
- `status`:
  - `Product Fixture Baseline`
- `authority_order`:
  - `MPLP -> Cognitive_OS -> Projection -> SoloCrew`
- `version_line`:
  - `V2.0`
- `wave`:
  - `V2.0 Wave 2`
- `depends_on`:
  - `V2.0 Wave 1 planning baseline`
  - `V1.9 projection contracts`
  - `V1.9 product-surface thin consumption`
- `trace_tags`:
  - `v2_0_wave2`
  - `starter_cells`
  - `development_company_cell`
  - `ecommerce_cell`
  - `personal_media_cell`
  - `product_fixtures`
  - `multi_cell_foundation`

## 2. Wave 2 Scope

- This wave defines starter-cell product baselines and fixtures.
- It does not implement UI.
- It does not implement real artifact generation.
- It does not implement provider/channel execution.
- It does not deliver V2.0.

V2.0.x semantic correction:

- The historical term "starter cell" is product shorthand for official starter
  blueprint / starter assembly fixtures projected into Cell operating units.
- `Cell` remains the constitutional SoloCrew operating unit.
- Development Company, E-commerce, and Personal Media are not constitutional
  Cell kinds.
- Business/domain defaults in this baseline belong to starter blueprint /
  starter assembly defaults, not to the definition of Cell itself.
- `cell_id` remains a stable product fixture / compatibility slug for the V2.0
  starter experiences.
- `cell_kind` must remain generic operating-unit vocabulary.
- Secretary or future routing surfaces may choose or route to a Cell, but they
  do not create new constitutional Cell kinds.
- The Cell CEO / Crew Compiler owns internal asset, crew, capability, workflow,
  memory, learning, and review organization inside Cell boundaries.

## 3. Starter Blueprint Fixture Inventory

### 1. Development Company starter blueprint / assembly

- `cell_id`: `development_company`
- `cell_label`: `Development Company Cell`
- `cell_kind`: `solo_business_operating_unit`
- `starter_blueprint_id`: `development_company`
- `starter_blueprint_label`: `Development Company Starter Blueprint`
- `starter_assembly_id`: `development_company_starter_assembly`
- `purpose`:
  - operate product, engineering, and release work for a software or agent project
- `default job-to-be-done`:
  - turn goals and changes into structured development work and reusable delivery artifacts
- `default tasks`:
  - requirement clarification
  - PRD shaping
  - issue drafting
  - task breakdown
  - implementation planning
  - release preparation
- `default artifacts`:
  - PRD
  - issue draft
  - task breakdown
  - implementation plan
  - code or file draft
  - release note
  - review packet
- `default memory fields`:
  - project objective
  - repo and codebase context
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
- `default review posture`:
  - review before using delivery artifacts
- `minimum acceptance example`:
  - open the Cell, request a feature-plan package, receive a usable PRD or task-breakdown artifact, revise it, and resume it after restart

### 2. E-commerce starter blueprint / assembly

- `cell_id`: `ecommerce`
- `cell_label`: `E-commerce Cell`
- `cell_kind`: `solo_business_operating_unit`
- `starter_blueprint_id`: `ecommerce`
- `starter_blueprint_label`: `E-commerce Starter Blueprint`
- `starter_assembly_id`: `ecommerce_starter_assembly`
- `purpose`:
  - operate product-listing, merchandising, campaign, and customer-response drafting work
- `default job-to-be-done`:
  - turn product and selling intent into usable commercial artifacts without automatic dispatch
- `default tasks`:
  - listing creation
  - copy revision
  - campaign planning
  - offer iteration
  - customer response drafting
- `default artifacts`:
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
- `default review posture`:
  - review before using listing and campaign artifacts
- `minimum acceptance example`:
  - open the Cell, request a listing package, receive usable listing artifacts, revise them, and preserve brand-tone learning inside that Cell

### 3. Personal Media starter blueprint / assembly

- `cell_id`: `personal_media`
- `cell_label`: `Personal Media Cell`
- `cell_kind`: `solo_business_operating_unit`
- `starter_blueprint_id`: `personal_media`
- `starter_blueprint_label`: `Personal Media Starter Blueprint`
- `starter_assembly_id`: `personal_media_starter_assembly`
- `purpose`:
  - operate repeatable content planning and draft-production work for personal publishing
- `default job-to-be-done`:
  - turn topics, notes, and audience intent into reusable content artifacts across sessions
- `default tasks`:
  - topic shaping
  - article drafting
  - title iteration
  - summary drafting
  - tag generation
  - content calendar suggestion
- `default artifacts`:
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
- `default review posture`:
  - review before using content packages outside the Cell
- `minimum acceptance example`:
  - open the Cell, request an article package, receive article, title, summary, tags, and calendar suggestion artifacts, and keep style learning scoped to that Cell

## 4. Development Company starter blueprint baseline

- `purpose`:
  - operate product, engineering, and release work for a software or agent project
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
- `memory fields`:
  - project objective
  - repo and codebase context
  - architecture notes
  - delivery constraints
  - accepted decisions
  - release history summary
- `learning fields`:
  - code style preferences
  - task decomposition preferences
  - review depth preference
  - release note format preference
  - failure-pattern reminders
- `drift risks`:
  - changed product requirements
  - stale implementation plan
  - dependency mismatch
  - release-scope drift
  - conflicting issue priority
- `allowed action classes`:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
- `forbidden`:
  - provider or channel dispatch
  - irreversible financial or legal actions

## 5. E-commerce starter blueprint baseline

- `purpose`:
  - operate product-listing, merchandising, campaign, and customer-response drafting work
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
- `memory fields`:
  - product catalog context
  - brand tone
  - offer constraints
  - channel formatting notes
  - customer objection patterns
- `learning fields`:
  - brand voice preference
  - preferred listing structure
  - campaign tone
  - objection-handling style
  - artifact feedback patterns
- `drift risks`:
  - changed pricing or product facts
  - stale inventory assumptions
  - changed brand guidance
  - conflicting campaign goal
  - cross-channel formatting mismatch
- `allowed action classes`:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
- `forbidden`:
  - uncontrolled external dispatch
  - irreversible financial or legal actions

## 6. Personal Media starter blueprint baseline

- `purpose`:
  - operate repeatable content planning and draft-production work for personal publishing
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
- `memory fields`:
  - voice and tone notes
  - audience focus
  - recurring themes
  - publishing cadence
  - content backlog context
- `learning fields`:
  - style preference learning
  - preferred structure
  - title preference
  - summary preference
  - feedback-derived revision patterns
- `drift risks`:
  - changed audience target
  - stale topic framing
  - conflicting content goal
  - preference drift across channels
  - schedule or cadence change
- `allowed action classes`:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
- `forbidden`:
  - uncontrolled external dispatch
  - irreversible financial or legal actions

## 7. Fixture Design

Minimum fixture fields:

- `project_id`
- `runtime_state_projection_id`
- operational units for all three starter blueprint-backed Cell fixtures
- each operational unit has:
  - scope summary
  - priorities
  - pending reviews
  - recent artifacts
  - task summaries
  - action summaries
  - learning summaries
  - drift summaries
  - suggested next actions
  - evidence refs
  - `runtime_private_fields_omitted: true`
  - `non_executing: true`

Fixture implementation:

- canonical fixture surface:
  - `projection/fixtures/starter-cell-fixtures.ts`
- legacy compatibility re-export:
  - `projection/fixtures/v2-starter-cells.ts`
- exports:
  - `V2_OFFICIAL_STARTER_BLUEPRINT_IDS`
  - `V2_STARTER_CELL_KIND`
  - `V2_STARTER_CELL_IDS`
  - `V2_STARTER_CELL_DEFINITIONS`
  - `createV2StarterCellsRuntimeStateProjection()`
  - `createV2StarterCellOperationalUnitProjections()`

Fixture requirements:

- all three starter blueprint-backed Cell fixtures are present
- each starter blueprint has distinct purpose, tasks, artifacts, memory, learning, and drift risks
- each cell includes at least one `external_draft` artifact
- each cell includes at least one accepted `scope_only` learning candidate
- each cell includes at least one `global_candidate` learning candidate
- each cell includes at least one drift summary
- each cell includes at least one suggested next action
- action classes include:
  - `auto_local`
  - `reviewable_local`
  - `external_draft`
  - `forbidden_irreversible`
- `limited_external_dispatch` may appear only as deferred and never executable
- `forbidden_irreversible` must be blocked
- no fixture claims provider/channel execution
- no fixture claims autonomous operation

## 8. Projection Consumption Readiness

These fixtures must be usable by:

- FounderDashboardProjection assembly
- CellOperationsPanelProjection assembly
- V1.9 Wave 4 thin product-surface page models

This wave does not implement new UI.

## 9. Acceptance Gates for Wave 2

- three starter blueprint-backed Cell fixtures defined
- fixture data exists
- fixtures are projection-compatible
- fixtures can feed FounderDashboardProjection
- fixtures can feed CellOperationsPanelProjection
- fixtures preserve runtime-private omission
- fixtures preserve non-executing boundary
- fixtures preserve action-class readiness
- fixtures prove starter blueprint distinction without making business domains Cell kinds
- fixtures prove scoped learning distinction
- fixtures do not claim V2.0 delivery or readiness

## 10. Explicit Non-Goals

- no V2.0 delivery
- no app UI implementation
- no real artifact generation
- no external dispatch
- no provider/channel execution
- no autonomous company operation
- no GA
- no MPLP certification
- no payment, trading, purchase, or legal actions
- no Cognitive_OS or MPLP changes

## 11. Final Decision

- `V2_0_WAVE2_STARTER_CELL_BASELINE_AND_FIXTURES_PASS`
- `next_allowed_wave`:
  - `V2.0 Wave 3 — Founder Dashboard Productization`
