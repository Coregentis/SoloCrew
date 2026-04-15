# SOLOCREW v0.4 Non-Goals v0.1

## Purpose

This audit freezes what `v0.4-multi-cell-foundation` does not include.

It exists to keep the new intermediate version meaningful instead of letting it collapse into premature Secretary beta or runtime expansion.

## Non-Goals

| Non-Goal | Why It Is Out Of Scope For `v0.4` | Current Boundary |
| --- | --- | --- |
| Secretary interface behavior | `v0.4` is a foundation line, not a Secretary beta line. | Deferred to future `v0.5-portfolio-secretary-beta`. |
| Portfolio-level dispatch UX | `v0.4` freezes coexistence and summary semantics, not dispatch operations. | Explicitly deferred. |
| Growth or BD pack runtime execution | `v0.4` does not broaden business-pack execution. | Deferred beyond this line. |
| Provider execution | `v0.4` does not introduce live provider-backed orchestration. | Explicitly absent. |
| Channel entry or handoff | `v0.4` does not introduce Telegram or other channel behavior. | Explicitly absent. |
| Broad KPI cockpit | `v0.4` is not a broad analytics or executive dashboard line. | Explicitly absent. |
| Runtime-complete multi-cell orchestration | `v0.4` does not claim full portfolio runtime or orchestration behavior. | Explicitly absent. |
| Enterprise, team, or multi-tenant behavior | SoloCrew remains a solo-operator product line here. | Explicitly absent. |
| Silent promotion of management objects into runtime authority | `v0.4` only freezes product contracts. | Must remain blocked unless later runtime intake justifies change. |
| Protocol promotion of SoloCrew objects | `v0.4` is not a protocol-expansion wave. | Must remain outside SoloCrew docs-only freeze. |

## Non-Goal Rule

If a proposed `v0.4` change mainly serves:

- Secretary UX
- portfolio dispatch
- live execution
- channel behavior
- broad analytics
- enterprise governance
- runtime-law promotion

then it is not a `v0.4` change by default.
