# SOLOCREW-FILES-GPT-RECONCILIATION-v0.1

## Purpose

This note reconciles the existing `Files_GPT/` planning set with the current mother-runtime reality already present in `Cognitive_OS`.

## Inputs Reviewed

- `Files_GPT/SoloCrew v0.1 产品需求与 Wow Moment 定义稿.md`
- `Files_GPT/SoloCrew v0.1 体验成立所需的 Cognitive 最小补全与 Projection 首批范围.md`
- `Files_GPT/P1 执行清单：Cognitive 补全项 × Projection 首批对象 × Flow 实现顺序.md`
- `Files_GPT/Prethink.md`
- `Files_GPT/ App 四类任务.md`
- `Files_GPT/先后顺序）.md`

## Reconciliation Table

| Theme | Still Valid | Outdated Because Cognitive Advanced | Updated SoloCrew Start Point |
| --- | --- | --- | --- |
| Product identity | SoloCrew is a one-person-company product, not a generic agent tool. | None. | Keep the product noun as a persistent digital crew for solo operators. |
| Wow hierarchy | Main wow is team-feel first, then return-and-continue, then old-employee feel. | None. | Freeze this hierarchy as the downstream projection baseline. |
| First projection family | `crew`, `crew-member`, `objective`, `work-item`, memory/review/budget/channel surfaces still define the correct product object family. | Old drafts sometimes treated these as if they required new upstream product-named schemas first. | Map them downstream over neutral `agent-group`, `agent-worker`, `objective`, `work-item`, `memory-profile`, `preference-profile`, and `review-cycle` truth. |
| Projection and app belong downstream | Correct. Product projection and app workflow do not belong in `Cognitive_OS`. | None. This is now explicitly reinforced by the upstream README and governance notes. | Keep projection and app ownership inside SoloCrew and do not backwrite product DTO law upward. |
| Need for large P0-A runtime creation before any SoloCrew start | Still directionally correct that SoloCrew cannot fake runtime law. | The assumption that P0-A still needed to be built from scratch is outdated. `Cognitive_OS` already has workforce schemas, lifecycle runtime, persistence ports, execution contracts, and bounded P0-B glue. | Start from a downstream projection baseline that consumes the already-landed mother-runtime surface. |
| Need for full app before baseline freeze | Old drafts correctly warned against skipping straight to a full app. | Any suggestion that Telegram, full cockpit implementation, or a large UI should be built now is outdated for this round. | Freeze contracts and skeletons first; keep app shell intentionally minimal. |
| Budget, channel, provider, and learning scope | Correctly deferred to later waves. | Old drafts sometimes framed them as immediate next implementation tracks once Projection started. | Preserve them as explicit deferred or reserved surfaces in SoloCrew baseline docs and code. |
| Separate projection and app repo split | The boundary logic is valid. | The old recommendation for separate `SoloCrew_Projection` and `SoloCrew_App` repos is outdated for this task because the requested baseline is a single `SoloCrew` product repo. | Use one repo with layered `projection/` and `app/` directories while preserving the same authority boundary internally. |

## Updated SoloCrew Start Point

The correct SoloCrew starting point is now:

1. treat `Cognitive_OS` workforce schemas, registry, binding, lifecycle, persistence, execution contracts, and bounded P0-B glue as existing upstream consumable truth
2. freeze SoloCrew projection, DTO, and workflow boundaries downstream
3. stand up a minimal product repository skeleton without inventing new runtime truth
4. defer provider, channel, budget, full PSG, and full learning implementation until the corresponding upstream or downstream implementation phase is explicitly opened
