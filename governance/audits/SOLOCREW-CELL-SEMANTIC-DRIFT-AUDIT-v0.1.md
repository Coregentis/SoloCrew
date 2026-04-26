# SOLOCREW-CELL-SEMANTIC-DRIFT-AUDIT-v0.1

## 1. Document Control

- `doc_id`: `SOLOCREW-CELL-SEMANTIC-DRIFT-AUDIT-v0.1`
- `status`: `Read-Only Semantic Drift Audit`
- `version_line`: `V2.0.x monitoring / correction research`
- `authority_order`: `MPLP -> Cognitive_OS -> SoloCrew`
- `trace_tags`:
  - `solocrew/cell-semantic-drift`
  - `v2_0x_monitoring`
  - `cell-constitution`
  - `starter-cell-fixtures`
  - `projection-boundary`

## 2. Executive Decision

`CELL_SEMANTIC_DRIFT_CONFIRMED_CORRECTION_PLANNING_REQUIRED`

Positive view:
The V2.0 starter-cell baseline and fixture code are clearly bounded as product
fixtures, projection-compatible, runtime-private-omitting, and non-executing.
They do not reopen V2.0, do not open V2.1, and do not modify upstream runtime or
protocol law.

Counter view:
The same files encode `development_company`, `ecommerce`, and `personal_media`
as stable `cell_id` values and as `cell_kind` values. That creates a second
meaning of `Cell`: not only the constitutional operating unit, but also a
business-domain starter kind. This conflicts with the Cell Constitution, where
the `Cell` is the first valid SoloCrew operating unit and optional business or
metrics packs expand the Cell rather than constitute it.

Edge view:
The problem is not that the starter examples exist. The problem is that
domain-specific defaults for tasks, artifacts, memory, learning, drift, actions,
and review posture are currently grouped under Cell kind semantics instead of a
more precise starter blueprint / business pack / template / fixture vocabulary.

Synthesis:
This is a SoloCrew product semantic drift, currently best classified as P3. It
does not invalidate V2.0 Stable, but it can distort future architecture if left
uncorrected before the next product-planning line. The minimum next step is a
bounded correction plan, not immediate feature work.

## 3. Canonical Cell Definition Evidence

Canonical Cell authority is operating-unit first:

- `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md:12`
  states that a `Cell` is the first valid SoloCrew operating unit for a solo
  operator.
- `governance/baselines/SOLOCREW-STRUCTURAL-CONSTITUTION-v0.1.md:25`
  states that the `Cell` is the smallest valid SoloCrew operating unit.
- `governance/baselines/SOLOCREW-STRUCTURAL-CONSTITUTION-v0.1.md:27-34`
  defines the Cell as the structural container binding one operator, one
  business scope, one CEO Orchestrator, one native multi-agent crew, one current
  objective context, one execution surface, and one memory/evidence continuity
  surface.
- `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md:30-47`
  lists required constitutional objects: Cell Charter, Delivery Contract, Cell
  Policy Profile, CEO Orchestrator Contract, Crew Blueprint, Objective
  Portfolio, Execution Ledger, and Memory & Evidence Anchor.
- `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md:49-51`
  defines Business Pack Mount and Metrics Pack Mount as optional mounts.
- `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md:75-78`
  defines Crew Blueprint as a structural design object.
- `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md:92-97`
  states that optional mounts expand the Cell; they do not constitute it.
- `governance/baselines/SOLOCREW-SINGLE-CELL-INIT-BASELINE-v0.1.md:14-20`
  freezes initialization as one operator, one Cell, one CEO Orchestrator, one
  native multi-agent crew, one current objective, and one Cell Console.
- `governance/contracts/SOLOCREW-CREW-COMPILER-CONTRACT-v0.1.md:9-18`
  defines the CEO Orchestrator as Crew Compiler for a valid Cell constitutional
  state.

Code and tests reinforce the same boundary:

- `projection/objects/cell-constitution.ts:278-321` defines Crew Blueprint as a
  structural object with role/topology fields, not an industry template.
- `projection/objects/cell-constitution.ts:445-525` defines Business Pack Mount
  and Metrics Pack Mount as optional deferred mounts.
- `projection/contracts/structural-boundary.ts:120-128` classifies Crew
  Blueprint as required product-projection structural truth.
- `projection/contracts/structural-boundary.ts:160-177` classifies Business Pack
  Mount and Metrics Pack Mount as optional product-side mount points.
- `tests/projection/structural-constitution.test.ts:24-129` asserts required
  Cell constitutional objects and optional mount boundaries.
- `tests/projection/pack-mount-model.test.ts:12-88` asserts pack mounts remain
  structural-only and non-executing.

## 4. Starter Cell Drift Evidence

The V2.0 baseline introduces industry/domain labels as starter cells:

- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:30`
  says the wave defines starter-cell product baselines and fixtures.
- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:39-43`
  defines Development Company Cell with `cell_id: development_company` and
  `cell_kind: development_company`.
- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:91-95`
  defines E-commerce Cell with `cell_id: ecommerce` and `cell_kind: ecommerce`.
- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:140-144`
  defines Personal Media Cell with `cell_id: personal_media` and
  `cell_kind: personal_media`.
- The same baseline assigns default tasks, artifacts, memory fields, learning
  fields, drift risks, action classes, and review posture to each named Cell.

The baseline later frames the data as fixtures:

- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:322-373`
  defines fixture design and non-execution requirements.
- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:384-396`
  uses acceptance gates requiring three starter cells, fixture distinction, and
  scoped learning distinction.
- `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md:398-409`
  explicitly excludes V2.0 delivery, app UI implementation, real artifact
  generation, external dispatch, provider/channel execution, autonomous company
  operation, GA, MPLP certification, and Cognitive_OS/MPLP changes.

This proves the starter baseline is bounded, but also proves the semantic
compression: business-domain fixture examples are encoded as Cell identities and
Cell kinds.

## 5. Fixture Code Evidence

The canonical fixture code encodes business/domain starter IDs as Cell identity
and kind:

- `projection/fixtures/starter-cell-fixtures.ts:15-21` defines
  `V2_STARTER_CELL_IDS` as `development_company`, `ecommerce`, and
  `personal_media`.
- `projection/fixtures/starter-cell-fixtures.ts:23-37` defines
  `V2StarterCellDefinition`, where `cell_kind` is typed as `V2StarterCellId`.
- `projection/fixtures/starter-cell-fixtures.ts:43-219` creates three starter
  definitions where `cell_id` and `cell_kind` are equal to the same business
  domain labels.
- `projection/fixtures/starter-cell-fixtures.ts:763-985` turns each starter
  Cell into an `OperationalUnitRuntimeProjection` and then a runtime state
  projection while preserving omission and non-execution markers.
- `projection/fixtures/starter-cell-fixtures.ts:988-993` exports canonical
  aliases that preserve the starter-cell vocabulary.
- `projection/fixtures/v2-starter-cells.ts:1-6` keeps a deprecated
  compatibility re-export to the canonical starter fixture file.

The tests make the starter Cell set stable:

- `tests/projection/v2-starter-cells-fixtures.test.ts:41-52` asserts exactly
  three stable starter cells with IDs `development_company`, `ecommerce`, and
  `personal_media`.
- `tests/projection/v2-starter-cells-fixtures.test.ts:75-102` asserts distinct
  default tasks, artifacts, memory fields, learning fields, and drift risks
  across starter cells.
- `tests/projection/v2-starter-cells-fixtures.test.ts:104-121` asserts one
  bounded operational unit per starter cell.

The app layer also consumes these labels as product cell IDs:

- `app/artifacts/artifact-contract.ts:1-4` defines `ProductArtifactCellId` as
  the same three business/domain IDs.
- `app/actions/action-workflow.ts:44-60` maps those Cell IDs directly to
  default artifact kinds.

## 6. Grep Inventory and Classification

Commands run:

```bash
git grep -n "Development Company Cell\|E-commerce Cell\|Personal Media Cell\|starter cell\|starter-cell\|Starter Cell" -- .
```

- Count: 179
- Classification: starter blueprint / starter assembly intent, industry Cell
  wording, fixture-only wording, test expectation, historical governance context.
- Important paths: `README.md`, `CHANGELOG.md`,
  `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md`,
  `projection/fixtures/starter-cell-fixtures.ts`,
  `projection/fixtures/v2-starter-cells.ts`,
  `tests/projection/v2-starter-cells-fixtures.test.ts`, app workflow and page
  model tests.

```bash
git grep -n "V2_STARTER_CELL_IDS\|cell_kind\|cell_id\|cell_label" -- projection tests app governance README.md CHANGELOG.md
```

- Count: 658
- Classification: mixed product DTO usage, fixture identity usage, test
  expectation, canonical Cell identity fields, ambiguous/drift-risk wording.
- Important paths: `projection/fixtures/starter-cell-fixtures.ts`,
  `app/artifacts/artifact-contract.ts`, `app/actions/action-workflow.ts`,
  `app/shell/create-artifact-workflow-page-model.ts`, V2 dashboard and Cell
  Operations tests.

```bash
git grep -n "Business Pack Mount\|Metrics Pack Mount\|Crew Blueprint\|Role Projection\|Capability Plugin\|optional mount" -- governance projection app tests README.md CHANGELOG.md
```

- Count: 29
- Classification: canonical Cell constitutional truth, optional mount truth,
  historical governance context.
- Important paths: `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md`,
  `governance/baselines/SOLOCREW-STRUCTURAL-CONSTITUTION-v0.1.md`,
  `projection/objects/cell-constitution.ts`,
  `projection/contracts/structural-boundary.ts`,
  `tests/projection/structural-constitution.test.ts`,
  `tests/projection/pack-mount-model.test.ts`.

```bash
git grep -n "development_company\|ecommerce\|personal_media" -- .
```

- Count: 148
- Classification: industry Cell wording, fixture-only wording, app workflow
  product IDs, test expectations.
- Important paths: `projection/fixtures/starter-cell-fixtures.ts`,
  `app/artifacts/artifact-contract.ts`, `app/actions/action-workflow.ts`,
  artifact/action/learning tests.

```bash
git grep -n "Cell Constitution\|smallest valid SoloCrew operating unit\|first valid SoloCrew operating unit\|operating unit" -- governance README.md CHANGELOG.md
```

- Count: 5
- Classification: canonical Cell constitutional truth.
- Important paths:
  `governance/baselines/SOLOCREW-CELL-CONSTITUTION-v0.1.md`,
  `governance/baselines/SOLOCREW-STRUCTURAL-CONSTITUTION-v0.1.md`,
  `governance/baselines/SOLOCREW-SINGLE-CELL-INIT-BASELINE-v0.1.md`,
  `governance/contracts/SOLOCREW-CREW-COMPILER-CONTRACT-v0.1.md`.

## 7. Drift Scope

Answers:

1. The repo currently has two competing meanings of Cell:
   - Meaning A: Cell as operating unit / constitutional container.
   - Meaning B: Cell as industry starter kind / business template.
2. The V2.0 starter-cell baseline duplicates responsibilities that likely
   belong to more precise assets:
   - default tasks: Workflow Pattern defaults or Cell Blueprint defaults
   - default artifacts: Business Pack Mount defaults or fixture example data
   - default memory fields: Memory Template defaults
   - default learning fields: Learning Template defaults
   - default drift risks: Risk / Review Gate defaults
   - default action classes: Capability Plugin defaults or workflow defaults
   - default review posture: Cell Policy Profile / Risk Review Gate defaults
3. `cell_kind` currently equals business/domain labels:
   `development_company`, `ecommerce`, and `personal_media`.
4. This creates a future risk that a product such as TracePilot could be
   incorrectly modeled as `tracepilot_cell` rather than as a developer/project
   governance asset family, business pack, capability mount, or product
   projection.
5. The drift currently affects SoloCrew product projection semantics only. The
   audit found no evidence that it leaks into Cognitive_OS runtime law or MPLP
   protocol law.
6. No MPLP or Cognitive_OS change is required by this audit.
7. The minimum correction path is a SoloCrew-only semantic correction plan that
   clarifies starter cells as starter blueprint fixtures or starter assemblies,
   then optionally introduces compatibility-preserving fields such as
   `starter_blueprint_id` or `starter_assembly_id`.

## 8. Non-Affected Authority Layers

MPLP is unaffected:

- No MPLP repository file was inspected as an edit target.
- No MPLP schema/protocol change is required.
- No MPGC/RFC action is required for the current finding.

Cognitive_OS is unaffected:

- No Cognitive_OS repository file was inspected as an edit target.
- No Cognitive_OS runtime-law widening is required.
- The drift is in SoloCrew's product vocabulary and fixture/test semantics.

SoloCrew V2.0 release integrity is not reopened:

- The starter fixtures remain bounded, non-executing, and product-projected.
- V2.0.x maintenance/correction research is sufficient.
- V2.1 remains blocked unless separately owner-authorized.

## 9. Severity and Risk

Severity: `P3_PRODUCT_SEMANTIC_DRIFT`

Why P3:

- The drift is encoded in canonical fixture code and tests, not only in prose.
- It can distort future architecture by making business domains look like
  Cell kinds.
- It can hide the more precise asset taxonomy needed for Cell Blueprint,
  Business Pack Mount, Metrics Pack Mount, Crew Blueprint, Role Projection
  Template, Capability Plugin, workflow defaults, memory templates, learning
  templates, and review gates.

Why not P0/P1/P2:

- No release/tag/status contradiction was found.
- No MPLP protocol law is changed or widened.
- No Cognitive_OS runtime law is changed or widened.
- No provider/channel dispatch, autonomous execution, approval execution, or
  external business action is introduced.
- Current behavior is bounded product fixture behavior.

## 10. Recommended Correction Path

Option 1 - minimal wording correction:

- Likely files changed:
  - `governance/baselines/SOLOCREW-V2.0-STARTER-CELL-PRODUCT-BASELINE-AND-FIXTURES-v0.1.md`
  - possibly README/CHANGELOG wording only if discoverability requires it
- Expected test impact: none or documentation-only.
- Risk: low implementation risk, but leaves `cell_kind` drift in code.
- V2.0.x compatibility: allowed as documentation correction.
- V2.1 opening: false.

Option 2 - bounded semantic correction:

- Likely files changed:
  - `projection/fixtures/starter-cell-fixtures.ts`
  - app DTO/contracts that currently use the three domain IDs as product Cell
    kind truth
  - tests for starter fixtures, artifact workflow, action workflow, Founder
    Dashboard, and Cell Operations Panel
  - compatibility re-export or compatibility aliases if needed
- Expected test impact: focused projection/app tests plus full `npm test`.
- Risk: moderate, because it touches canonical fixtures and product DTOs.
- V2.0.x compatibility: allowed if framed as semantic boundary correction with
  compatibility preservation and no feature expansion.
- V2.1 opening: false.
- This is the recommended path.

Option 3 - deeper asset registry preparation:

- Likely files changed:
  - new or updated asset taxonomy for Cell Blueprint, Business Pack Mount,
    Metrics Pack Mount, Crew Blueprint, Role Projection Template, Capability
    Plugin, Workflow Pattern, Memory Template, Learning Template, and Risk /
    Review Gate defaults
- Expected test impact: broad.
- Risk: high for V2.0.x because it can become product expansion.
- V2.0.x compatibility: not recommended unless owner explicitly authorizes a
  narrowly scoped correction.
- V2.1 opening: false unless separately authorized, but the scope would be close
  to future-line planning.

## 11. Explicit Non-Goals

- no V2.1 opening
- no feature expansion
- no MPLP schema/protocol change
- no Cognitive_OS runtime-law widening
- no provider/channel dispatch
- no autonomous operation
- no approval execution
- no external business action
- no product code or fixture correction in this audit wave
- no test correction in this audit wave
- no README/CHANGELOG correction in this audit wave

## 12. Final Recommendation

Proceed to:

`SOLOCREW-CELL-SEMANTIC-DRIFT-CORRECTION-01`

Recommended correction scope:

- Keep V2.0 Stable closed.
- Keep V2.1 blocked.
- Treat the current Development Company, E-commerce, and Personal Media assets
  as starter blueprint fixtures or starter assemblies, not constitutional Cell
  kinds.
- Preserve compatibility for existing product routes and tests where feasible.
- Avoid Cognitive_OS and MPLP changes.
- Add or update tests that prove `Cell` remains the operating unit while
  business/domain presets live under blueprint, mount, template, workflow, or
  fixture semantics.
