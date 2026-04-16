# SOLOCREW v0.5 Test And Gate Plan v0.1

## Purpose

This document defines how planned `v0.5` waves will be verified before the next wave begins.

The governing rule is:

`direct control semantics remain absent`

## Test Lanes

Planned `v0.5` verification should remain concentrated in:

- `tests/app/` for page and shell behavior
- `tests/projection/` for projection, adapter, and boundary truth
- existing full-suite regression coverage through `npm test`

## Gate Families

### `GATE-V5-PLAN-*`

These gates verify the wave stays inside the planned implementation sequence.

| Gate | Condition |
| --- | --- |
| `GATE-V5-PLAN-01` | The current wave only adds the surfaces allocated to that wave in the wave-sequence plan. |
| `GATE-V5-PLAN-02` | Existing `v0.4` surfaces remain intact and continue to express their current non-claims. |
| `GATE-V5-PLAN-03` | New `v0.5` work extends existing product lanes rather than creating a parallel architecture. |

### `GATE-V5-BOUNDARY-*`

These gates verify the Secretary beta line stays handoff-first and posture-first.

| Gate | Condition |
| --- | --- |
| `GATE-V5-BOUNDARY-01` | Direct approve controls remain absent. |
| `GATE-V5-BOUNDARY-02` | Direct reject controls remain absent. |
| `GATE-V5-BOUNDARY-03` | Direct dispatch controls remain absent. |
| `GATE-V5-BOUNDARY-04` | Direct execute, provider, and channel controls remain absent. |
| `GATE-V5-BOUNDARY-05` | Handoff remains staging-only and does not become execution. |
| `GATE-V5-BOUNDARY-06` | `v0.5` surfaces remain product-projected and non-runtime-authoritative. |
| `GATE-V5-BOUNDARY-07` | `v0.5` surfaces remain non-protocol-promoting. |

### `GATE-V5-XREPO-*`

These gates verify the planned wave still aligns with upstream truth.

| Gate | Condition |
| --- | --- |
| `GATE-V5-XREPO-01` | SoloCrew assumptions about runtime-private records still match current `Cognitive_OS` truth. |
| `GATE-V5-XREPO-02` | Missing upstream truth pauses the wave instead of being invented locally. |
| `GATE-V5-XREPO-03` | SoloCrew does not treat downstream product semantics as protocol promotion evidence. |

## Per-Wave Verification

### Wave 1

Expected verification:

- app tests for Secretary entry page and navigation shell
- boundary tests proving Secretary beta remains non-executing
- regression pass for existing `v0.4` pages

Wave 1 must not exit until:

- new Secretary routing is present
- direct-control semantics remain absent
- legacy tests still pass

### Wave 2

Expected verification:

- projection tests for portfolio posture and queue/review summaries
- app tests for portfolio shelves and bounded management visibility
- boundary tests proving queue/review/approval posture is visible or staged only

Wave 2 must not exit until:

- portfolio posture projections are product-only
- management visibility remains non-executable
- no runtime-law claims appear

### Wave 3

Expected verification:

- projection tests for handoff staging payloads
- app tests for handoff creation/staging surfaces
- boundary tests proving handoff is not approval, reject, dispatch, or execute behavior

Wave 3 must not exit until:

- handoff staging is visibly bounded
- the cell remains the bounded execution locus
- no runtime mutation path appears

### Wave 4

Expected verification:

- consistency and regression tests across all `v0.5` surfaces
- targeted tests for labels, notes, and non-claims
- full `npm test`

Wave 4 must not exit until:

- the full `v0.5` beta line reads coherently
- direct-control semantics remain absent across the suite
- cross-repo and MPLP boundaries remain explicit

## Minimum Command Baseline

Every implementation wave should run at minimum:

- `npm test`

If a wave touches upstream contract assumptions, it should also perform a bounded cross-repo alignment review before continuing.
