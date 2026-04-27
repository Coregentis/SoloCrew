# SOLOCREW-POST-CELL-DRIFT-ARCHITECTURE-BASELINE-v0.1

## 1. Document Control

- `doc_id`: `SOLOCREW-POST-CELL-DRIFT-ARCHITECTURE-BASELINE-v0.1`
- `status`: `Architecture Baseline`
- `version_line`: `V2.0.x post-correction / pre-V2.1 planning`
- `authority`: `SoloCrew Product Architecture Baseline`
- `authority_order`: `MPLP -> Cognitive_OS -> SoloCrew`
- `depends_on`:
  - `SOLOCREW-CELL-CONSTITUTION-v0.1`
  - `SOLOCREW-STRUCTURAL-CONSTITUTION-v0.1`
  - `SOLOCREW-CREW-COMPILER-CONTRACT-v0.1`
  - `SOLOCREW-CELL-SEMANTIC-DRIFT-AUDIT-v0.1`
  - `SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1`
- `trace_tags`:
  - `solocrew/post-cell-drift`
  - `architecture-baseline`
  - `secretary-routing`
  - `cell-ceo-assembly`
  - `open-asset-plane`
  - `tracepilot-asset-family`
  - `v2_1-readiness-boundary`

## 2. Executive Decision

`POST_CELL_DRIFT_ARCHITECTURE_BASELINE_READY`

SoloCrew V2.0.x remains monitored stable.
The Cell semantic drift is corrected.
This baseline prepares future architecture planning.
It does not open V2.1.
It does not implement features.

Positive view:
The corrected V2.0.x line now has a clean distinction between Cell operating
unit semantics and starter blueprint / assembly fixture semantics.

Counter view:
Future planning could easily reintroduce the drift if domain labels, products,
or tool families are again named as Cell kinds before routing and asset
authority are separated.

Edge view:
The future SoloCrew asset surface may be flat for discovery, but runtime
authority cannot be flat without collapsing Secretary routing, Cell CEO
assembly, and Crew Compiler responsibilities.

Synthesis:
This baseline freezes the post-correction architecture boundary before any
future V2.1 planning or implementation wave.

## 3. Corrected Cell Semantics

`Cell` is the constitutional SoloCrew operating unit.

`Cell kind` is generic operating-unit vocabulary.
It must not encode business domains, product integrations, tool families, or
starter template names as constitutional Cell kinds.

`Starter blueprint` and `starter assembly` are product initialization or fixture
semantics.
They may package useful defaults for creating or demonstrating a Cell, but they
do not define the constitutional meaning of Cell.

Business/domain labels must not become constitutional Cell kinds.

The existing V2.0 identifiers:

- `development_company`
- `ecommerce`
- `personal_media`

remain starter blueprint IDs / fixture identities.
They are not Cell kinds.

Future domain or business labels must not become new Cell kinds by default.
If a future label is useful, it should first be classified as a starter
blueprint, starter assembly, business pack, workflow pattern, capability,
template, product projection, or other asset type before any Cell-level claim is
considered.

## 4. Secretary Responsibility Boundary

The Secretary is the founder/user intake and routing surface.

The Secretary may own:

- founder/user intake
- intent clarification entry
- existing Cell selection / routing
- new Cell proposal
- cross-Cell handoff recommendation
- Management Directive creation
- escalation to human review when routing is ambiguous

The Secretary must not:

- choose all internal Cell assets
- install Business Packs
- install Metrics Packs
- choose Crew Blueprint
- choose Capability Plugins
- decide Role Projection Templates
- override Cell Charter / Delivery Contract / Cell Policy Profile
- act as marketplace resolver
- bypass Cell CEO / Crew Compiler

Secretary answers: which Cell should own this?

Secretary does not answer: which internal assets should the Cell use?

## 5. Cell CEO / Crew Compiler Responsibility Boundary

Cell CEO / Crew Compiler is the Cell-local architecture authority.

It owns:

- interpreting Management Directive within Cell Charter
- internal asset selection
- Crew Blueprint choice
- role policy binding
- Business Pack Mount choice
- Metrics Pack Mount choice
- Role Projection Template choice
- Capability Plugin choice
- Workflow Pattern choice
- Memory Template / Learning Template choice
- Review Gate choice
- execution plan shaping
- recompile conditions

It is constrained by:

- Cell Charter
- Delivery Contract
- Cell Policy Profile
- Objective Portfolio
- Execution Ledger
- Memory & Evidence Anchor
- non-executing / review-only boundaries where applicable
- no autonomous dispatch in the current V2.0.x line

Cell CEO answers: how should this Cell do the work?

It answers that question inside bounded Cell policy and current runtime truth.

## 6. Open Asset Plane Concept

The Open Asset Plane is a future architecture concept only.

Same-level future asset types include:

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

These are same-level discoverable asset types in the future architecture.

They are not implemented in this wave.
They do not define MPLP protocol law.
They do not define Cognitive_OS runtime law.
They are SoloCrew product architecture concepts unless later abstracted upstream
through a governed process.

This baseline does not imply that a marketplace exists.
It does not imply that a plugin ecosystem exists.
It does not imply that third-party asset publishing exists.

## 7. Asset Resolution Authority Model

Future discovery may show assets side by side, but runtime resolution authority
is layered.

### Stage A - Secretary Routing

- founder input -> routing decision
- existing Cell or proposed new Cell
- Management Directive
- possible cross-Cell handoff

### Stage B - Cell CEO Assembly

- Management Directive -> Cell-local asset choices
- Cell-local crew topology
- Cell-local role projections
- Cell-local execution/review plan

Marketplace/asset discovery may be flat in the future, but runtime resolution
authority is layered.

Asset market equality does not imply runtime authority equality.

## 8. Starter Blueprint / Assembly Boundary

The existing V2.0 starters are official starter blueprint / assembly fixtures.

They are:

- product initialization shortcuts
- fixture identities for the three V2.0 starter experiences
- bounded, non-executing projection inputs

They are not:

- new Cell kinds
- marketplace listings
- provider/channel integrations
- autonomous business agents
- MPLP protocol objects
- Cognitive_OS runtime-law objects

Compatibility names may remain where explicitly labeled.
Future starter domains must follow the same rule: domain label first maps to a
starter blueprint / assembly or another asset type, not to a constitutional Cell
kind.

## 9. TracePilot Boundary

TracePilot must not be modeled as `tracepilot_cell`.

TracePilot may later integrate as:

- Developer / Project Governance asset family
- Project Import Capability
- Drift Detection Capability
- Architecture Review Workflow
- Release Governance Pack
- Evidence Template family
- DeveloperOps Role Projection Templates

TracePilot also remains a product projection path.
It should not be collapsed into SoloCrew Cell law.

Any TracePilot/SoloCrew integration must preserve the Coregentis
projection-safe boundary.

## 10. V2.1 Readiness Implications

V2.1 planning, if separately authorized later, should start from this baseline.

V2.1 must not begin by adding new domain Cell kinds.

Possible V2.1 planning candidates may include, without implementing now:

- Secretary routing proposal surface
- Management Directive DTO
- Cell CEO assembly planning surface
- official asset-type vocabulary
- limited official asset inventory
- TracePilot asset-family mapping
- compatibility cleanup of starter-cell wording

This document does not authorize or implement any of these candidates.

## 11. Non-Goals

- no V2.1 opening
- no feature implementation
- no marketplace implementation
- no third-party plugin support
- no new starter domains
- no TracePilot Cell
- no provider/channel dispatch
- no autonomous execution
- no approval execution
- no external business action execution
- no MPLP schema/protocol change
- no Cognitive_OS runtime-law widening
- no new product release claim

## 12. Architecture Invariants

### Cell Operating Unit Invariant

Cell remains the constitutional SoloCrew operating unit.

### Starter Blueprint Non-Cell-Kind Invariant

Starter blueprints and starter assemblies may initialize or demonstrate Cells,
but they must not become Cell kinds.

### Secretary Routing Boundary Invariant

Secretary owns intake, clarification, and Cell routing.
Secretary does not own Cell-local asset assembly.

### Cell CEO Assembly Boundary Invariant

Cell CEO / Crew Compiler owns Cell-local asset selection and execution/review
shaping inside Cell policy.

### Asset Plane Non-Implementation Invariant

Open Asset Plane is an architecture concept only in this baseline.
No marketplace, registry, resolver, plugin system, or tool adapter layer is
implemented here.

### TracePilot Non-Cell Invariant

TracePilot must not become `tracepilot_cell` or any equivalent constitutional
Cell kind.

### Product Projection Non-Authority Invariant

SoloCrew product projection semantics must not redefine Cognitive_OS runtime
law or MPLP protocol law.

### V2.1 Authorization Invariant

V2.1 remains blocked unless separately owner-authorized.

## 13. Recommended Next Step

Return to V2.0.x monitoring after this baseline.

Future V2.1 planning requires explicit owner authorization.
If authorized later, run a separate V2.1 scope planning wave before any
implementation work.
