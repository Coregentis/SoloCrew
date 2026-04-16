# SOLOCREW v0.5 Beta Lane Gates v0.1

## Purpose

This audit defines the gate pack for the currently implemented `v0.5-portfolio-secretary-beta` Wave 1 through Wave 4 lane.

These gates do not authorize broader `v0.5` expansion by default.
They define the PASS bar for treating the current line as a bounded non-executing beta lane.

## PASS Gates

| Gate | PASS Condition | Why It Matters |
| --- | --- | --- |
| `GATE-V5-BETA-01` repo truth aligned | Current checkout matches `origin/main`. | The gate must be frozen against real repo truth, not a local forked interpretation. |
| `GATE-V5-BETA-02` full suite green | `npm test` passes on the audited line. | This confirms the current lane remains internally coherent and regressions are not hidden. |
| `GATE-V5-BETA-03` shell remains non-executing | The portfolio shell exposes navigation, selection, shelves, and posture only. | This keeps Wave 1 from drifting into operator control. |
| `GATE-V5-BETA-04` staging remains non-executing | The handoff staging surface remains packet framing only. | This keeps Wave 2 from turning into dispatch or execution. |
| `GATE-V5-BETA-05` review packet remains non-executing | The review packet remains review-only and handoff-only. | This keeps Wave 3 from turning into approval or rejection control. |
| `GATE-V5-BETA-06` no direct approve control | No direct approve control appears in contracts, pages, shells, or tests. | This preserves the Secretary beta control boundary. |
| `GATE-V5-BETA-07` no direct reject control | No direct reject control appears in contracts, pages, shells, or tests. | This prevents review semantics from collapsing into execution semantics. |
| `GATE-V5-BETA-08` no direct dispatch control | No direct dispatch control appears in contracts, pages, shells, or tests. | This keeps the line handoff-first instead of control-first. |
| `GATE-V5-BETA-09` no direct execute/provider/channel control | No direct execute, provider, or channel control appears in the current line. | This keeps the beta lane below workflow execution and external operation. |
| `GATE-V5-BETA-10` no workflow-engine behavior | No current surface reads as a workflow engine or runtime operator. | This preserves the product/runtime boundary. |
| `GATE-V5-BETA-11` no runtime-authority collapse | Current surfaces remain `product_projection_only` and explicitly forbid upward runtime authority. | This keeps SoloCrew downstream of `Cognitive_OS`. |
| `GATE-V5-BETA-12` no protocol-authority collapse | Current surfaces explicitly forbid upward protocol authority and do not imply MPLP promotion. | This keeps the protocol boundary intact. |
| `GATE-V5-BETA-13` packet-state consistency preserved | `draft`, `staged`, `ready_for_cell_review`, and `returned_for_revision` are shared across shell, staging, and review packet surfaces. | This is the core Wave 4 consistency requirement. |
| `GATE-V5-BETA-14` revision-return remains posture only | `returned_for_revision` is framed as a product posture/state rather than a reject, dispatch, or execution command. | This prevents the revision loop from being over-read as workflow authority. |
| `GATE-V5-BETA-15` shell/staging/review semantics aligned | Shelf summaries, handoff framing, review framing, and non-claims describe one coherent lane. | This keeps the whole beta line legible instead of as a chain of unrelated surfaces. |
| `GATE-V5-BETA-16` cross-repo sanity preserved | The current line still reads as downstream of runtime-private `Cognitive_OS` truth. | This keeps the beta lane bounded and ownership-correct. |

## PASS Conclusion

The current line passes this gate pack only if the repo can honestly say:

- the Wave 1 through Wave 4 line is one coherent bounded beta lane
- the lane is non-executing
- the lane is product-projected only
- direct-control semantics remain absent
- packet-state and revision-return semantics remain aligned
- SoloCrew still reads as downstream of `Cognitive_OS`

## Failure Rule

The gate fails if the current line:

- introduces direct approve, reject, dispatch, execute, provider, or channel controls
- makes packet states sound executable or runtime-authoritative
- lets shell, staging, and review packet surfaces drift into conflicting state semantics
- makes SoloCrew sound like the owner of runtime-private truth
- implies protocol promotion by convenience

## Continuation Rule

Passing this gate pack means:

- the current line is acceptable as a bounded non-executing beta lane
- the next wave must reopen explicitly rather than grow silently

Passing this gate pack does not mean:

- `v0.5` is feature-complete
- direct-control behavior is now authorized
- runtime or protocol ownership may move downstream
