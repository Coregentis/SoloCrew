# SOLOCREW v0.5 Acceptance Gates v0.1

## Purpose

This audit defines the PASS bar for beginning valid `v0.5-portfolio-secretary-beta` implementation after scope freeze.

## PASS Gates

| Gate | PASS Condition | Why It Matters |
| --- | --- | --- |
| `v0.5` is clearly differentiated from `v0.4` | The repo explicitly states that `v0.5` introduces bounded Secretary and portfolio beta semantics beyond read/inspect-only `v0.4`. | This prevents `v0.5` from being confused with continued foundation-only work. |
| Secretary beta boundary is lawful | The scope pack defines the Secretary beta surface as bounded product behavior rather than runtime ownership. | This keeps the first Secretary line honest and bounded. |
| Portfolio/cell role separation is explicit | The scope pack clearly distinguishes top-level portfolio / Secretary view from per-cell view and per-cell responsibility. | This prevents top-level management convenience from erasing cell-level meaning. |
| Secretary-to-cell handoff is explicit | One bounded handoff contract exists for passing context into a selected cell without collapsing identities. | This gives `v0.5` a lawful coordination boundary instead of vague expansion. |
| Portfolio management semantics are explicit | Cell list, selection, queue/review posture, and bounded management visibility are defined at product level. | This makes `v0.5` implementation targetable without inventing runtime law. |
| No hidden `v0.5 -> v1.0` overclaim exists | The docs explicitly reject enterprise scope, autonomous company behavior, broad KPI cockpit behavior, and full platform behavior. | This keeps beta-level ambition below `v1.0`. |
| No runtime-authority collapse occurs | The scope pack explicitly preserves `Cognitive_OS` as the mother-runtime provider of runtime-private truth. | This protects the product/runtime boundary. |
| No protocol-law collapse occurs | The scope pack explicitly preserves MPLP as frozen core plus candidate-only governance. | This protects the runtime/protocol boundary. |
| Upstream consumption assumptions are explicit | `v0.5` names the current upstream assumptions it relies on without claiming ownership of them. | This keeps cross-repo dependency honest before implementation starts. |
| Explicit non-goals are preserved | `v0.5` non-goals are recorded for provider/channel breadth, enterprise semantics, and runtime-complete workflow breadth. | This limits scope creep before code work begins. |
| `v0.5` is scope-frozen only | The repo explicitly states that `v0.5` is frozen in governance but not yet implemented in product code. | This keeps README/roadmap truth aligned with repo reality. |

## PASS Conclusion

`v0.5-portfolio-secretary-beta` passes this scope-freeze wave if the repo can now honestly say:

- `v0.5` is a real next line distinct from `v0.4`
- Secretary beta meaning is explicit but bounded
- portfolio meaning is explicit but bounded
- cross-repo assumptions are named without collapsing ownership
- no one can reasonably confuse this scope freeze with actual `v0.5` implementation

## Failure Rule

This wave fails if it:

- treats `v0.5` as already implemented
- makes Secretary beta sound like runtime ownership
- makes portfolio beta sound like full portfolio runtime
- implies protocol promotion from downstream product usage
- silently smuggles `v1.0` behavior into the beta scope
