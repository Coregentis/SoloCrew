# SOLOCREW v0.5 Directory Task Map v0.1

## Purpose

This document translates the `v0.5` wave sequence into likely repo directories and file lanes.

It is planning only.
It does not authorize edits outside the frozen `v0.5` scope.

## Directory Change Order

The expected first-change order for `v0.5` implementation is:

1. `app/shell/`
2. `app/pages/`
3. `projection/contracts/`
4. `projection/assembly/`
5. `tests/app/`
6. `tests/projection/`
7. `projection/adapters/` only if existing upstream-to-product mapping needs a bounded extension

This order keeps the work product-first in surface planning while still respecting dependency boundaries.

## Planned Directory Map

| Directory | First Likely Wave | Planned Role | Guardrail |
| --- | --- | --- | --- |
| `app/pages/` | Wave 1 | Secretary entry page and later bounded beta routes | Do not create a sprawl of unrelated pages before the Secretary shell boundary is stable. |
| `app/shell/` | Wave 1 | Secretary shell/view contracts, portfolio shell composition, navigation truth | Keep shell truth explicit about non-executing and non-authoritative boundaries. |
| `projection/contracts/` | Wave 1 or Wave 2 | Portfolio posture contracts and later handoff staging contracts | Reuse current projection boundary patterns instead of inventing a new product-law layer. |
| `projection/assembly/` | Wave 2 | Portfolio posture assembly and later handoff staging assembly | Preserve `runtime-private -> adapter -> product projection` layering. |
| `projection/adapters/` | Wave 2 | Bounded adapter extension for Secretary/portfolio needs if existing adapters are insufficient | Do not create a second runtime-import system. |
| `tests/app/` | Wave 1 | Secretary page/shell tests and later handoff staging tests | Every new surface must land with explicit no-direct-control assertions. |
| `tests/projection/` | Wave 2 | Portfolio posture, handoff staging, and boundary tests | Keep cross-repo and authority-boundary assertions close to projections. |

## Directories Expected To Stay Mostly Untouched At First

The following should remain untouched unless a later wave justifies them:

- `runtime-imports/`
- `projection/objects/`
- existing `v0.4` governance baselines and scope-freeze docs
- `Files_GPT/`

These lanes should move only if:

- an upstream contract assumption changes
- a shared downstream projection object is clearly needed
- a later hardening wave proves the change is necessary

## Existing v0.4 Base To Reuse

`v0.5` planning should extend the current base rather than replace it:

- `app/pages/multi-cell-foundation-overview-page.ts`
- `app/pages/cell-detail-page.ts`
- `app/pages/management-object-inspection-page.ts`
- `app/pages/continuity-inspection-page.ts`
- `app/shell/multi-cell-foundation-overview.ts`
- `projection/adapters/cell-summary-runtime-adapter.ts`
- `projection/assembly/cell-detail-projection.ts`
- `projection/assembly/management-object-inspection.ts`
- `projection/assembly/continuity-inspection.ts`

## Drift-Avoidance Rule

To avoid parallel or ad hoc implementation drift:

- only one `v0.5` wave should be active at a time
- page and shell work should land with paired test coverage in the same wave
- projection and adapter changes should remain bounded to the active wave objective
- no local runtime-law invention should appear in `projection/adapters/` or `projection/assembly/`
- if a wave needs broader architectural change than planned here, that wave should pause for reclassification
