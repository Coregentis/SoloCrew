# SOLOCREW v0.3 Non-Goals v0.1

## Purpose

This audit freezes what `v0.3-single-cell-usable` does not include.

It exists to stop scope drift before usable-product implementation begins.

## Non-Goals

| Non-Goal | Why It Is Out Of Scope For v0.3 | Current Boundary |
| --- | --- | --- |
| Multi-cell portfolio behavior | `v0.3` is a single-cell usable release, not a portfolio release. | Deferred to later portfolio/Secretary work. |
| Secretary behavior | Secretary is a later management-plane expansion. | Explicitly absent from `v0.3`. |
| Provider execution | `v0.3` does not require live provider orchestration to be usable. | Remains outside current usable boundary. |
| Channel integrations | `v0.3` does not require Telegram or other live channel entry. | Remains deferred. |
| Broad KPI cockpit | `v0.3` is a focused operator console, not a top-level analytics cockpit. | Explicitly absent. |
| Runtime-complete product state | `v0.3` must stay honest about bounded truth and missing truth. | Explicitly absent. |
| Broad business-pack execution breadth | Optional mounts do not become broad execution-bearing packs in this release. | Deferred beyond `v0.3`. |

## Non-Goal Rule

If a proposed feature mainly serves portfolio breadth, Secretary breadth, cockpit breadth, provider breadth, channel breadth, or broad business-pack breadth, it is not a `v0.3` feature by default.
