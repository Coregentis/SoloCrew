# SOLOCREW-V2.1-SCOPE-PLANNING-v0.1

## 1. Document Control

- `doc_id`: `SOLOCREW-V2.1-SCOPE-PLANNING-v0.1`
- `status`: `Scope Planning Baseline`
- `version_line`: `V2.1 planning only`
- `authority`: `SoloCrew Product Scope Planning`
- `authority_order`: `MPLP -> Cognitive_OS -> SoloCrew`
- `depends_on`:
  - `SOLOCREW-POST-CELL-DRIFT-ARCHITECTURE-BASELINE-v0.1`
  - `SOLOCREW-CELL-CONSTITUTION-v0.1`
  - `SOLOCREW-CREW-COMPILER-CONTRACT-v0.1`
  - `SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1`
- `trace_tags`:
  - `solocrew/v2_1`
  - `scope-planning`
  - `secretary-routing`
  - `management-directive`
  - `cell-ceo-assembly`
  - `open-asset-plane-boundary`
  - `tracepilot-asset-family`
  - `implementation-not-opened`

## 2. Executive Decision

`V2_1_SCOPE_PLANNING_READY`

V2.1 planning is opened by owner authorization.
V2.1 implementation is not opened.
V2.1 release is not opened.
This document defines candidate scope and recommended sequence only.

Positive view:
SoloCrew now has enough stable V2.0.x truth to plan a coherent next line:
Cell remains the operating unit, starter blueprints are no longer Cell kinds,
and the Secretary / Cell CEO authority split is explicit.

Counter view:
The tempting next step is to implement marketplace, plugins, provider
connections, or a broad asset registry. That would turn V2.1 into an
over-wide V2.5 and risk reintroducing product/runtime authority drift.

Edge view:
The product needs visible user value, not just architecture vocabulary. A
planning-only V2.1 can still define a useful first experience if it focuses on
where work belongs and how the selected Cell should review it.

Synthesis:
V2.1 should be a bounded routing-and-planning line: Secretary proposes the
right Cell, a product-level Management Directive carries the handoff, and Cell
CEO / Crew Compiler returns a review-only assembly plan preview.

## 3. Current Baseline

SoloCrew V2.0.x is monitored stable.

The tri-repo authority drift correction is closed.
The workforce projection boundary is corrected.
The runtime-session compatibility bridge is narrowed, with P4 bridge debt
tracked rather than treated as a release blocker.

Cell semantic drift is corrected:

- Cell remains the constitutional operating unit.
- `cell_kind` remains generic operating-unit vocabulary.
- starter blueprint / starter assembly remains non-Cell-kind semantics.
- `development_company`, `ecommerce`, and `personal_media` remain starter
  blueprint IDs / fixture identities.

The post-cell-drift architecture baseline is accepted:

- Secretary routes to Cell.
- Cell CEO / Crew Compiler handles Cell-local assembly.
- Open Asset Plane is concept only.
- TracePilot is non-Cell.

V2.1 implementation remains unopened.

## 4. V2.1 Product Objective

V2.1 should make SoloCrew feel less like static starter fixtures and more like
a routed operating workspace where founder intent can be directed into the
right Cell through a Secretary proposal, while keeping execution bounded,
reviewable, and non-autonomous.

Recommended user-facing objective:

Introduce the first visible Secretary-to-Cell routing layer and Management
Directive planning surface without implementing marketplace, third-party
assets, provider/channel dispatch, or autonomous execution.

The user should feel that SoloCrew can answer:

- which Cell should own this work
- why that Cell is appropriate
- when a new Cell might be needed
- what the selected Cell CEO would evaluate next
- what remains review-only and not executed

## 5. Scope Candidates Evaluated

### A. Secretary Routing Proposal Surface

- `user_value`: high
- `architecture_value`: high
- `risk`: medium
- `implementation_complexity`: medium
- `dependency_on_Cognitive_OS`: no immediate dependency
- `dependency_on_MPLP`: none
- `scope_fit`: V2.1

The surface should map founder/user intent to a recommended existing Cell or a
new Cell proposal, with human-readable rationale, ambiguity handling, and
review-before-activation.

Risk:
Secretary could become a global asset resolver or direct-control system.

Boundary:
Secretary answers which Cell should own this. It does not choose all internal
Cell assets.

### B. Management Directive DTO / Product Object

- `user_value`: high
- `architecture_value`: high
- `risk`: medium
- `implementation_complexity`: medium
- `dependency_on_Cognitive_OS`: no immediate dependency
- `dependency_on_MPLP`: none
- `scope_fit`: V2.1

The Management Directive should be a structured handoff from Secretary to Cell.
It is a product projection object, not Cognitive_OS runtime law and not an MPLP
object.

It may later map to upstream projection-safe concepts if repeated downstream
evidence proves the need.

Risk:
Management Directive could be mistaken for runtime law or execution authority.

Boundary:
It must remain reviewable, local, and below approval/execution semantics.

### C. Cell CEO Assembly Plan Preview

- `user_value`: high
- `architecture_value`: high
- `risk`: medium
- `implementation_complexity`: medium
- `dependency_on_Cognitive_OS`: no immediate dependency
- `dependency_on_MPLP`: none
- `scope_fit`: V2.1

Cell CEO receives a Management Directive and proposes a Cell-local plan shape.
It may list likely internal asset categories, crew topology considerations,
role projections, workflow posture, evidence needs, and review gates.

It must not install assets.
It must not execute work.
It must remain review-only.

Risk:
Cell CEO could become an unbounded super-agent if the preview is worded as live
execution or autonomous orchestration.

### D. Official Asset-Type Vocabulary

- `user_value`: medium
- `architecture_value`: high
- `risk`: medium
- `implementation_complexity`: low
- `dependency_on_Cognitive_OS`: none for product vocabulary
- `dependency_on_MPLP`: none
- `scope_fit`: V2.1 as vocabulary only

The vocabulary may include:

- Cell Blueprint
- Starter Assembly
- Business Pack Mount
- Metrics Pack Mount
- Crew Blueprint
- Role Projection Template
- Capability Plugin
- Workflow Pattern
- Memory Template
- Learning Template
- Review Gate
- Evidence Template
- Tool Adapter

This is vocabulary only.
It does not implement marketplace, registry, resolver, plugin lifecycle, or
tool adapter execution.

Risk:
The vocabulary could be interpreted as a live plugin ecosystem.

### E. TracePilot Asset-Family Mapping

- `user_value`: medium
- `architecture_value`: medium
- `risk`: medium
- `implementation_complexity`: low for planning
- `dependency_on_Cognitive_OS`: no immediate dependency
- `dependency_on_MPLP`: none
- `scope_fit`: V2.1 as planning vocabulary or mapping only

TracePilot should be positioned as a future Developer / Project Governance
asset family, not as `tracepilot_cell`.

Possible future mappings include:

- Project Import Capability
- Drift Detection Capability
- Architecture Review Workflow
- Release Governance Pack
- Evidence Template family
- DeveloperOps Role Projection Templates

This candidate does not implement TracePilot integration.

### F. Compatibility Cleanup

- `user_value`: low to medium
- `architecture_value`: medium
- `risk`: low
- `implementation_complexity`: low to medium
- `dependency_on_Cognitive_OS`: none
- `dependency_on_MPLP`: none
- `scope_fit`: backlog or opportunistic V2.1 hardening

This candidate reduces remaining "starter cell" wording where safe while
preserving fixture and route compatibility.

It should not be the primary V2.1 product scope unless the cleanup directly
supports Secretary routing and Management Directive clarity.

### G. Runtime-Session Bridge Cleanup

- `user_value`: low
- `architecture_value`: medium
- `risk`: low to medium
- `implementation_complexity`: medium
- `dependency_on_Cognitive_OS`: possible future optional abstraction
- `dependency_on_MPLP`: none
- `scope_fit`: backlog unless it blocks V2.1 implementation

The narrowed bridge remains P4 compatibility debt.
It should not dominate V2.1 unless V2.1 surfaces would otherwise broaden
Cognitive_OS imports or normalize runtime-private dependency.

Boundary:
Do not broaden Cognitive_OS imports.
Do not move raw runtime-private structures into product DTOs.

## 6. Recommended V2.1 Scope

Minimum coherent V2.1 scope:

1. Secretary Routing Proposal Surface
2. Management Directive DTO / product projection object
3. Cell CEO Assembly Plan Preview
4. Official Asset-Type Vocabulary as product constants/types only
5. TracePilot Asset-Family Mapping as planning artifact or projection
   vocabulary only

Explicitly excluded from V2.1 scope:

- marketplace implementation
- third-party assets
- real asset installation
- tool adapter execution
- provider/channel dispatch
- autonomous execution
- approval execution
- external business action execution
- new domain Cell kinds
- TracePilot Cell
- MPLP schema/protocol changes
- Cognitive_OS runtime-law changes

This scope is large enough to create one coherent user-visible route:
founder/user intent can be routed to a Cell and converted into a review-only
Cell-local planning preview.

It is small enough to avoid turning V2.1 into V2.5.

## 7. Deferred Scope

The following must be deferred:

- Open Asset Marketplace implementation
- third-party asset publishing
- plugin lifecycle
- actual Tool Adapter execution
- provider/channel dispatch
- autonomous operations
- TracePilot product integration implementation
- new starter domains
- full asset registry / resolver
- multi-tenant collaboration
- enterprise governance
- payment, trading, purchase, or legal action surfaces

Deferred scope may be revisited only through a later owner-authorized planning
or implementation wave.

## 8. Upstream Dependency Judgment

MPLP changes: no action required.

MPLP rationale:
The V2.1 candidate scope is product routing, product handoff, and product
planning vocabulary. It does not define protocol lifecycle semantics and does
not require MPLP schema/protocol changes.

Cognitive_OS runtime-law changes: no action required.

Cognitive_OS rationale:
The V2.1 candidate DTOs can remain SoloCrew product-projected objects. They
must not claim to be Cognitive_OS runtime law or direct runtime-private
records.

Cognitive_OS projection-safe contract changes: not an immediate blocker.

Future optional upstream abstraction:
If Management Directive or routing proposal semantics recur across multiple
Coregentis products, a future Cognitive_OS projection-safe abstraction may be
proposed. That is not required for V2.1 planning or initial product DTO work.

## 9. V2.1 Architecture Model

Planned flow:

```text
Founder input
-> Secretary Routing Proposal
-> human review / confirmation
-> Management Directive
-> selected Cell
-> Cell CEO Assembly Plan Preview
-> human review
-> bounded local planning surface
```

Clarifications:

- No autonomous execution.
- No dispatch.
- No marketplace.
- No third-party plugin system.
- No direct runtime-private Cognitive_OS consumption.
- No new Cell kind is created by a domain or product label.
- No TracePilot Cell is created.

## 10. Object / DTO Planning Boundary

These are product-level DTO candidates only.
They are not full schemas in this wave.
They are not MPLP objects.
They are not Cognitive_OS runtime law.
They may later be mapped to projection-safe upstream concepts if evidence
requires it.

### SecretaryRoutingProposal

Planning purpose:
Represent Secretary's recommended owner Cell, ambiguity posture, and routing
rationale for a founder/user request.

### CellRoutingTarget

Planning purpose:
Represent an existing Cell candidate or a proposed new Cell target without
creating a new Cell kind by default.

### NewCellProposal

Planning purpose:
Represent a review-only proposal that a new Cell may be needed.
It must not create the Cell automatically.

### ManagementDirective

Planning purpose:
Represent the reviewed handoff from Secretary to selected Cell.
It carries intent, priority, constraints, and review posture as product
projection truth.

### CellCEOAssemblyPlanPreview

Planning purpose:
Represent the selected Cell CEO / Crew Compiler's review-only plan preview for
crew shape, asset categories, workflow posture, memory/evidence needs, and
review gates.

### AssetTypeReference

Planning purpose:
Represent a vocabulary reference to asset type families such as Business Pack
Mount, Crew Blueprint, Workflow Pattern, Review Gate, Evidence Template, or Tool
Adapter.

### TracePilotAssetFamilyReference

Planning purpose:
Represent TracePilot as a Developer / Project Governance asset-family mapping
candidate, not as a Cell kind.

## 11. User-Facing First Value

First V2.1 improvement:

The user gives a founder request.
Secretary proposes:

- which Cell should own it
- why that Cell is a fit
- whether a new Cell might be needed
- what ambiguity or evidence gaps remain
- what the selected Cell CEO will evaluate next

Then Cell CEO returns a review-only assembly plan preview.

The user should feel:

- SoloCrew understands where work belongs.
- SoloCrew does not force every request into one static starter.
- SoloCrew does not silently execute.
- SoloCrew keeps founder control.
- SoloCrew makes Cell-local planning visible before work proceeds.

## 12. Non-Goals

- no V2.1 implementation in this wave
- no release opening
- no marketplace implementation
- no third-party plugin system
- no provider/channel dispatch
- no autonomous execution
- no approval execution
- no external business action
- no new starter domains
- no TracePilot Cell
- no MPLP schema/protocol change
- no Cognitive_OS runtime-law widening
- no product claim that V2.1 is delivered

## 13. Implementation Sequence Proposal

This section proposes future implementation waves only.
It does not authorize implementation.

### V2.1-IMPL-01 - Secretary Routing Proposal DTO + page-model/projection tests

- `expected_changed_areas`:
  - `projection/contracts`
  - `projection/assembly`
  - `app/shell`
  - focused projection/app tests
- `forbidden`:
  - no automatic routing activation
  - no asset installation
  - no provider/channel dispatch
  - no autonomous execution
- `test_expectations`:
  - recommended existing Cell route
  - new Cell proposal remains proposal-only
  - ambiguity requires human review
  - no new Cell kind drift
- `rollback_risk`: low to medium

### V2.1-IMPL-02 - Management Directive product object + selected Cell handoff preview

- `expected_changed_areas`:
  - product DTO / contract files
  - Secretary-to-Cell projection assembly
  - focused app tests
- `forbidden`:
  - no Cognitive_OS runtime-law claim
  - no MPLP object claim
  - no approval execution
  - no external business action
- `test_expectations`:
  - directive is product-projected
  - selected Cell receives review-only handoff preview
  - directive does not expose runtime-private fields
- `rollback_risk`: medium

### V2.1-IMPL-03 - Cell CEO Assembly Plan Preview + asset-type vocabulary constants

- `expected_changed_areas`:
  - projection contracts / assembly
  - app shell page model
  - product vocabulary constants
  - focused tests for asset-type references
- `forbidden`:
  - no marketplace
  - no plugin lifecycle
  - no asset resolver
  - no tool adapter execution
- `test_expectations`:
  - preview lists asset categories only
  - plan remains review-only
  - Cell CEO / Crew Compiler does not claim autonomous execution
- `rollback_risk`: medium

### V2.1-IMPL-04 - TracePilot Asset-Family Mapping as non-executing planning surface

- `expected_changed_areas`:
  - planning/projection vocabulary only
  - optional app display model if separately authorized
- `forbidden`:
  - no TracePilot Cell
  - no TracePilot product integration implementation
  - no external tool execution
- `test_expectations`:
  - TracePilot maps to Developer / Project Governance asset family
  - no `tracepilot_cell` positive claim
  - no provider/channel dispatch
- `rollback_risk`: low to medium

### V2.1-HARDENING-01 - Boundary grep, negative tests, README/CHANGELOG alignment, full npm test

- `expected_changed_areas`:
  - focused negative tests
  - README/CHANGELOG status alignment
  - boundary grep documentation or scripts if justified
- `forbidden`:
  - no release claim unless separately authorized
  - no feature expansion
- `test_expectations`:
  - full `npm test`
  - focused Secretary routing tests
  - focused Cell CEO assembly tests
  - forbidden-term grep gates
- `rollback_risk`: low

## 14. Acceptance Gates for Future V2.1 Implementation

Future V2.1 implementation must satisfy:

- no V2.1 release claim until owner approves release
- no Cognitive_OS raw runtime-private consumption
- no new Cell kind drift
- no TracePilot Cell
- no marketplace implementation
- no provider/channel/autonomous execution
- no approval execution
- no external business action execution
- full `npm test` pass
- focused tests for Secretary routing
- focused tests for Cell CEO assembly
- grep gates for forbidden terms
- README/CHANGELOG alignment
- remote-truth-first commit/push evidence

## 15. Risk / Death Paths

### Secretary becomes global asset resolver

Mitigation:
Keep Secretary responsible for Cell routing and Management Directive creation
only. Cell-local asset choice belongs to Cell CEO / Crew Compiler.

### Cell CEO becomes unbounded super-agent

Mitigation:
Keep V2.1 Cell CEO output as review-only assembly plan preview. No autonomous
execution, dispatch, or provider/channel capability.

### Open Asset Plane becomes accidental marketplace

Mitigation:
Limit V2.1 to vocabulary and planning references. No registry, resolver,
publishing, installation, marketplace UI, or third-party asset lifecycle.

### TracePilot becomes Cell

Mitigation:
Treat TracePilot as Developer / Project Governance asset-family mapping or
product projection integration path. Do not create `tracepilot_cell`.

### Management Directive becomes pretend runtime law

Mitigation:
Keep ManagementDirective product-projected, reviewable, and below Cognitive_OS
runtime law and MPLP protocol law.

### V2.1 scope grows into V2.5

Mitigation:
Limit V2.1 to routing, directive, assembly preview, vocabulary, and TracePilot
mapping. Defer marketplace, plugins, execution, and asset registry.

### User-visible value is too abstract

Mitigation:
Make first value concrete: user intent -> Secretary route proposal -> selected
Cell -> Cell CEO plan preview.

### Documentation grows without implementation path

Mitigation:
Use this single planning baseline, then require a separate owner-authorized
implementation wave with focused file scope and tests.

## 16. Final Recommendation

V2.1 scope planning is ready.

Implementation should not begin automatically from this document.
V2.1 implementation requires separate owner authorization.

Recommended next action after this wave:
If the owner authorizes implementation, start `V2.1-IMPL-01` for Secretary
Routing Proposal DTO plus page-model/projection tests.

If implementation is not authorized, return to V2.0.x monitoring with this
planning baseline recorded.
