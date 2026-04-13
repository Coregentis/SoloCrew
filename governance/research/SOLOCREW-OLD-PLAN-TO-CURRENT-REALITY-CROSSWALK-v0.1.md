# SOLOCREW-OLD-PLAN-TO-CURRENT-REALITY-CROSSWALK-v0.1

## Purpose

This crosswalk translates the historical SoloCrew planning set into the current repository reality across `MPLP`, `Cognitive_OS`, and this new downstream product repo.

## Crosswalk

| Theme | Old Statement | Current Reality | Keep / Revise / Discard | Reason |
| --- | --- | --- | --- | --- |
| Cognitive still needs a major补全 before SoloCrew can start | Projection work should wait until `Cognitive_OS` builds workforce runtime foundations. | `Cognitive_OS` now already has neutral workforce schemas, worker lifecycle runtime, state stores, execution contracts, and bounded objective/correction/preference glue. | Revise | The anti-fake-runtime warning is still right, but the assumed upstream gap is smaller than the old plan thought. |
| Projection and app should be independent from mother-runtime | Product surfaces should not live inside `Cognitive_OS`. | Upstream README and governance docs now explicitly enforce that boundary. | Keep | This is now confirmed by actual repository authority, not just planning preference. |
| SoloCrew should first do a complete app | Cockpit, Telegram, and product shell could become the next major build target once planning is done. | Full app work would overstate runtime completeness and violate the contract-first boundary requested for this round. | Discard | The current task is to freeze baseline contracts and skeletons, not to ship full product behavior. |
| The correct start point is a projection baseline | Projection is where team-feel, continuity, and old-employee feel become user-visible. | Still true, but projection must now start from existing upstream workforce truth instead of inventing new runtime nouns. | Keep | This remains the right downstream entry point. |
| Current phase may directly build provider, channel, budget, and full learning | Old P1 drafts pointed at OpenClaw/Hermes, Telegram, budget runtime, and richer learning as the next waves. | Those surfaces are explicitly absent upstream and not required for this baseline round. | Discard for now | They should stay deferred or reserved, not half-implemented inside SoloCrew. |
| SoloCrew may need separate Projection and App repos immediately | Old repo split draft recommended `SoloCrew_Projection` and `SoloCrew_App`. | This task explicitly asks for one `SoloCrew` repo with internal `projection/` and `app/` layers. | Revise | Keep the boundary logic, but satisfy the requested single-repo baseline layout. |
| Crew and CrewMember should be first-class product nouns | Product naming should expose team-centric nouns instead of neutral runtime names. | Upstream crosswalk already maps `agent-group` -> `Crew` and `agent-worker` -> `CrewMember` for downstream use. | Keep | Product naming remains valid downstream so long as it does not flow back upward as runtime law. |
| SoloCrew should define new runtime truth if needed | Old drafts sometimes described missing Crew/Objective/workflow semantics as gaps to fill. | The neutral workforce family already carries authoritative mother-runtime truth for those records. | Discard | SoloCrew must consume and wrap, not redefine or replace, the mother-runtime layer. |

## Net Judgment

The old planning set remains strong on product direction and layering discipline.

What changed is the execution start point:

- not `invent missing mother-runtime truth inside SoloCrew`
- not `jump into a complete app`
- but `freeze a downstream projection baseline over the mother-runtime surfaces that now already exist`
