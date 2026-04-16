# SoloCrew

SoloCrew is the product repository for a one-person-company AI team experience built downstream of the Coregentis stack.

Authority order for this repo is:

`MPLP Protocol -> Cognitive_OS -> SoloCrew`

This repository is not:

- the MPLP protocol source of truth
- the neutral mother-runtime repository
- a claim that full runtime capability already exists here

This repository is:

- the SoloCrew product repo
- the place where SoloCrew projection and app baselines are frozen
- the place where downstream product contracts are mapped over upstream mother-runtime truth

## Current Release Status

Current release status is `v0.3-single-cell-usable sealed`.

The sealed `v0.3` line extends the sealed `v0.2` and `v0.1` baselines with:

- one actual bounded single-cell operator console page
- one actual bounded single-cell bootstrap path
- visible current objective, work, delivery, continuity, deferred-surface, and truth-boundary sections
- bounded operator-facing interaction and presentation layers for correction/review, continuity, task focus, action intents, input drafts, request packaging, request preview, and readiness
- one bounded console-side correction/apply path over the sealed `v0.1` correction/writeback truth

This sealed `v0.3` line does not claim:

- multi-cell portfolio behavior
- Secretary behavior
- provider execution
- channel integrations
- broad KPI cockpit behavior
- broad business-pack execution breadth
- actual request submission
- runtime-complete workflow state
- runtime-complete product state

The sealed `v0.3` line is the first bounded single-cell usable release line for SoloCrew.

## Current Governed Foundation Line

The current governed foundation line beyond sealed `v0.3` is `v0.4-multi-cell-foundation`.

This repo now records `v0.4` as a governed multi-cell foundation line rather than a loose chain of bounded additions.

This repo contains multiple bounded `v0.4` implementation surfaces:

- one read/inspect-oriented multi-cell foundation overview page
- one bounded per-cell inspection page over the same downstream runtime-backed input path
- one bounded management-object inspection page over the same downstream detail path
- one bounded continuity inspection page over the same downstream detail path
- bounded per-cell summary projections derived from existing single-cell product truth
- bounded downstream consumption of `Cognitive_OS` runtime-private workforce surfaces for multi-cell overview summaries
- hardened separation between compile-only management directives and runtime-backed management directive inspection projections

It does not mean `v0.4` is fully implemented.
It does not mean Secretary beta, recovery workflow execution, approval workflow execution, portfolio orchestration, provider execution, or channel behavior now exist in this repo.
It does mean the repo now has explicit version-line closure, multi-cell boundary closure, and cross-repo non-promotion records for the current `v0.4` line.

## Current v0.5 Line

The current `v0.5` line is `v0.5-portfolio-secretary-beta`.

This repo has now begun bounded `v0.5` implementation with Wave 1 only.

That means `v0.5` currently includes:

- one top-level portfolio / Secretary beta shell page
- bounded Secretary view vs cell view separation
- bounded portfolio-level navigation and selection over the existing `v0.4` cell surfaces
- bounded status, queue, review, and posture shelves with non-executing framing

That also means `v0.5` is the line that may later introduce:

- a top-level portfolio / Secretary beta surface
- bounded management of multiple cells as cells
- bounded Secretary-to-cell coordination semantics
- the first beta-level management interface beyond read-only inspection

This first `v0.5` wave does not add direct approve, reject, dispatch, or execute behavior.
It does not add handoff creation yet.
It does not mean runtime authority, protocol promotion, provider execution, or full portfolio operating-platform behavior now exist here.

## Version Semantics

SoloCrew uses two different version labels for different purposes:

- repo release lines such as `v0.1`, `v0.2`, `v0.3`, and now planned `v0.4`
- the private workspace/package version in `package.json`

The release line is the authoritative product-governance label for this repo.
The current `package.json` value `0.1.0-baseline` remains a private workspace/tooling version and is not a claim that the repo release line is still only `v0.1`.

Current structural foundation under that line remains the sealed `v0.2-structural-constitution`.

The sealed `v0.2` line extends the sealed `v0.1` baseline with:

- post-`v0.1` structural constitution documents
- structural object and management contract layers
- single-cell structural assembly, console state, view-model, shell composition, and shell entry adapter scaffolds

This sealed `v0.2` line does not claim:

- a usable-product UI release
- multi-cell portfolio or Secretary behavior
- provider execution or channel integration
- business-pack execution logic
- a broad KPI cockpit
- a runtime-complete product state

The implementation line was established as `v0.1-baseline` and then closed with:

- projection assembly over bounded upstream runtime surfaces
- memory-backed and sqlite-backed runtime sessions
- executable truth tests for continuity, bounded motion, failure, recovery, and correction/writeback
- product requirement revalidation and closure documentation

The sealed `v0.1` line establishes:

- governance and reconciliation documents
- projection boundary and DTO contracts
- workflow baseline for the first five flows
- projection adapters and flow assembly helpers
- runtime session entrypoints for memory/sqlite shell loading
- executable projection and app shell truth tests

The sealed `v0.1` line does not claim:

- full SoloCrew runtime
- provider execution implementation
- Telegram or other live channel integration
- full AEL, VSL, PSG, budget runtime, or autonomous learning

## Relationship To Upstream Repos

- `MPLP-Protocol`
  - protocol constitution and upstream semantic authority
- `Cognitive_OS`
  - neutral mother-runtime foundation and consumable workforce/runtime surfaces
- `SoloCrew`
  - downstream product projection and app packaging over those surfaces

## Repository Layout

- `Files_GPT/`
  - preserved planning inputs and historical drafts
- `governance/research/`
  - reconciliation, upstream inventory, and old-plan crosswalk notes
- `governance/contracts/`
  - runtime-consumption, DTO, and workflow contracts
- `governance/baselines/`
  - frozen SoloCrew projection and structural constitution baselines
- `governance/audits/`
  - structural inventory, deferred-surface, and acceptance-gate audit packs
- `governance/releases/`
  - release notes and closure records for sealed product lines
- `projection/`
  - projection contracts, objects, adapters, mappings, and flow assembly helpers
- `app/`
  - product shell boundary, runtime session entry, bounded single-cell console bootstrap, and current bounded page surface
- `tests/`
  - executable projection and app shell truth checks for the sealed `v0.1`, `v0.2`, and `v0.3` lines

## Scope Discipline

SoloCrew may consume upstream truth from `Cognitive_OS`, but it must not write product DTO law back upward as runtime authority.
