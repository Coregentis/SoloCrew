# SOLOCREW v0.5 Wave 5 Gates v0.1

## Purpose

This gate pack defines the PASS bar for the landed
`v0.5-portfolio-secretary-beta` Wave 5 explanatory hardening line.

These gates do not authorize Wave 6.
They define the boundary conditions for accepting Wave 5 as a bounded
closure-refresh over the existing non-executing beta lane.

## PASS Gates

| Gate | PASS Condition | Why It Matters |
| --- | --- | --- |
| `GATE-V5-W5-01` repo truth aligned | Current checkout matches `origin/main`. | The audit must freeze against remote truth, not a local-only interpretation. |
| `GATE-V5-W5-02` full suite green | `npm test` passes on the audited line. | This confirms Wave 5 did not break the existing lane while hardening explanation. |
| `GATE-V5-W5-03` rationale contract stays explanatory only | The rationale/evidence projection fixes `visibility_mode` to `rationale_and_evidence_only` and `control_mode` to `non_executing`. | This keeps Wave 5 from drifting into action semantics. |
| `GATE-V5-W5-04` no direct approve control | No direct approve control appears in contracts, assembly, pages, or tests. | This preserves the approved reopening limit. |
| `GATE-V5-W5-05` no direct reject control | No direct reject control appears in contracts, assembly, pages, or tests. | This prevents rationale from being misread as rejection authority. |
| `GATE-V5-W5-06` no direct dispatch control | No direct dispatch control appears in contracts, assembly, pages, or tests. | This keeps the lane handoff-first instead of control-first. |
| `GATE-V5-W5-07` no direct execute/provider control | No execute, provider, channel, or runtime-mutation control appears in the landed line. | This keeps the line below operational authority. |
| `GATE-V5-W5-08` no workflow-engine behavior | No page or projection reads as a workflow engine or runtime operator. | This preserves the product/runtime boundary. |
| `GATE-V5-W5-09` no runtime-authority collapse | Wave 5 continues to mark itself as `product_projection_only` and `runtime_authority_claimed: false`. | This keeps SoloCrew downstream of `Cognitive_OS`. |
| `GATE-V5-W5-10` no protocol-authority collapse | Wave 5 continues to mark itself as `protocol_authority_claimed: false` and omission-aware around MPLP artifacts. | This keeps MPLP non-promotion intact. |
| `GATE-V5-W5-11` omission-aware narration remains downstream only | Omission notes explicitly state that packet states remain product posture only and canonical MPLP `Context` / `Plan` are not claimed locally. | This stops narrative hardening from being over-read as authority promotion. |
| `GATE-V5-W5-12` provenance remains downstream-facing | Provenance summaries and source hints explain adapted upstream inputs without claiming upstream ownership. | This keeps evidence visibility from collapsing into runtime truth ownership. |
| `GATE-V5-W5-13` packet-state explanation remains posture only | `draft`, `staged`, `ready_for_cell_review`, and `returned_for_revision` are explained as posture/state semantics rather than commands. | This preserves the central downstream-only packet-state rule. |
| `GATE-V5-W5-14` shell, staging, and review packet stay aligned | All three surfaces expose the same rationale/evidence shape and preserve shared non-claims. | This keeps Wave 5 as one coherent hardening wave instead of three unrelated additions. |
| `GATE-V5-W5-15` cross-repo sanity preserved | Current `Cognitive_OS` and MPLP boundary docs still support downstream-only interpretation. | This confirms Wave 5 did not silently exceed three-repo authority order. |

## PASS Conclusion

Wave 5 passes only if the repo can honestly say:

- rationale/evidence visibility remains explanatory only
- the current `v0.5` lane remains non-executing
- provenance remains downstream/product-facing only
- omission-aware narration remains explicit
- no direct-control semantics appear anywhere in the landed line

## Failure Rule

This gate pack fails if the current line:

- introduces approve, reject, dispatch, execute, provider, or channel controls
- turns rationale/evidence narration into execution authority
- treats packet states as upstream workflow truth
- makes SoloCrew sound runtime-authoritative or protocol-authoritative
- drops omission-aware language around partial upstream truth

## Continuation Rule

Passing this gate pack means:

- Wave 5 is accepted as a bounded explanatory hardening wave
- the current `v0.5` line may be treated as a refreshed bounded beta closure

Passing this gate pack does not mean:

- Wave 6 is authorized
- direct-control semantics are now available
- runtime or protocol ownership may move downstream
