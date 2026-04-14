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

Current release status is `v0.1 sealed`.

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
  - frozen SoloCrew projection baseline
- `governance/releases/`
  - release notes and closure records for sealed product lines
- `projection/`
  - projection contracts, objects, adapters, mappings, and flow assembly helpers
- `app/`
  - product shell boundary, runtime session entry, and page placeholders
- `tests/`
  - executable projection and app shell truth checks for the sealed `v0.1` line

## Scope Discipline

SoloCrew may consume upstream truth from `Cognitive_OS`, but it must not write product DTO law back upward as runtime authority.
