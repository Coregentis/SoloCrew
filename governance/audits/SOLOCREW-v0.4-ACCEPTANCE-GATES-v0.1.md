# SOLOCREW v0.4 Acceptance Gates v0.1

## Purpose

This audit defines the PASS bar for freezing `v0.4-multi-cell-foundation` without expanding it into Secretary beta or runtime implementation.

## PASS Gates

| Gate | PASS Condition | Why It Matters |
| --- | --- | --- |
| `v0.4` exists as an independently meaningful version line | `v0.4-multi-cell-foundation` is explicitly frozen between sealed `v0.3` and future `v0.5`. | This closes the missing semantic gap in the roadmap. |
| Lawful multi-cell coexistence is frozen | The repo explicitly states that multiple `Cell`s may coexist and be listed at product level. | This creates the minimum foundation for future portfolio work without claiming portfolio behavior now. |
| A bounded cell summary projection exists | One `Cell Summary Projection` baseline is frozen as a summary unit. | Future top-level layers need a lawful summary object before Secretary beta begins. |
| Summary does not silently become runtime law | The summary baseline explicitly remains product projection and inspect-oriented only. | This protects the `MPLP -> Cognitive_OS -> SoloCrew` authority chain. |
| The minimum management object family is frozen | `Management Directive`, `Delivery Return`, and `Approval Request` are each frozen at contract level. | Future management-plane work needs lawful object boundaries before UX expansion begins. |
| Ownership and deferral logic are explicit | Each management object states purpose, authority boundary, current owning layer, and what is deferred. | This prevents product convenience from becoming silent runtime law. |
| Product-layer versus later runtime-blocker boundaries are explicit | `v0.4` docs distinguish what stays in SoloCrew now from what later may require `Cognitive_OS` blocker intake. | This keeps product/runtime separation honest. |
| `v0.4` remains clearly below Secretary beta | The docs explicitly reject Secretary interface behavior, portfolio dispatch UX, and runtime-complete multi-cell orchestration. | This keeps `v0.4` distinct from future `v0.5`. |
| Version semantics are clarified | Repo release-line semantics are distinguished from the private workspace/package version. | This prevents version-label confusion around `package.json` `0.1.0-baseline`. |
| No new mother-runtime law is invented in SoloCrew | No `v0.4` document claims new `Cognitive_OS` authority or protocol authority. | This preserves downstream boundary discipline. |

## PASS Conclusion

`v0.4-multi-cell-foundation` passes this wave if the repo can now honestly say:

- `v0.4` is a real intermediate line
- multiple `Cell`s are now lawful product-level coexistence units in governance truth
- `Cell Summary Projection` is frozen as a bounded product projection
- the minimum management object family is frozen
- Secretary beta and runtime expansion have not been silently pulled into this wave

## Failure Rule

This wave fails if it:

- skips the missing intermediate version meaning
- turns summary into silent runtime law
- treats management objects as already execution-complete
- blurs `v0.4` into `v0.5`
- invents new mother-runtime law inside SoloCrew
