# SOLOCREW-HISTORICAL-PLAN-VS-CURRENT-REPO-REALITY-MATRIX-v0.1

## Purpose

This matrix compares historical SoloCrew planning assumptions with the current downstream repository truth after `v0.1-baseline` closure.

## Matrix

| Historical Plan Theme | Historical Expectation | Current Repo Reality | Revalidated Product Judgment |
| --- | --- | --- | --- |
| Product noun | SoloCrew should feel like a real digital crew, not a bot shell. | Current repo already centers `crew`, `crew-member`, `objective`, `work-item`, `memory-summary`, and `review-strip`. | Keep. This is still the right product noun and should remain the first visible shape. |
| Main wow | First wow should be “I have a team,” then continuity, then old-employee feel. | Current shell and tests support first-crew view, continuity reload, blocked recovery truth, and bounded correction/writeback truth. | Keep, but frame it around honest bounded behavior instead of autonomy theater. |
| Need to finish Cognitive first | Old plans assumed large upstream补全 before product work could begin. | SoloCrew already consumes enough bounded upstream truth to assemble a product shell honestly. | Drop as a blocker. Do not reopen mother-runtime work unless a real downstream blocker appears. |
| Full cockpit early | Older planning drafts pointed toward a cockpit/product shell quickly. | Repo truth is stronger in shell assembly and behavioral truth tests than in UI implementation. | Drop for next step. Product revalidation should precede any broad UI build. |
| Objective-driven operation | Product should be organized around objectives, not prompt threads. | Current repo truth already assembles objective-centered shell state and reload continuity. | Keep. This should anchor first usable version scope. |
| Team memory and correction | Product should visibly remember corrections and preferences. | Preference writeback persists; memory-summary continuity is reconstructable; raw correction capture itself is session-local. | Keep, but message precisely: persisted preference truth survives, raw correction signal detail does not. |
| Work continuity | Product should survive leave/return and cross-session reload. | Crew/objective/work-item identity and state survive sqlite reload; anchor presence does not survive fresh session reload. | Keep, with explicit continuity honesty. |
| Motion visibility | Product should show that the team is “doing work.” | In-session bounded motion is visible; fresh reload does not preserve transient event summaries or review-strip motion signals. | Revise. First usable product can show in-session motion, but cannot market fresh-reload event history yet. |
| Failure and recovery | Product should tolerate drift/blocking and continue. | Current repo supports blocked state persistence and a legitimate retry via the existing bounded success path. | Keep. This is a real usable-version strength and should be surfaced carefully. |
| External channel/provider/budget | Old plans treated these as natural near-term additions. | All remain deferred or absent in current legal/runtime truth. | Defer. None should shape first usable version. |
| Product scale | Plans sometimes implied a broad operating system surface. | Current truthful surface is narrow but increasingly stable around one crew, one objective, one bounded continuity path. | Revise toward a narrower first usable product. |

## Matrix Reading

The biggest shift is not the core product idea.

The biggest shift is the implementation truth:

- the product idea remains stable
- the repository now supports a narrower but honest usable product shape
- the next decision should be product-form discipline, not feature accumulation
