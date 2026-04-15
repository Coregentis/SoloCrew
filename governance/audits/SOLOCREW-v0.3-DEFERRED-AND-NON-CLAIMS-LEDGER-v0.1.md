# SOLOCREW v0.3 Deferred And Non-Claims Ledger v0.1

## Purpose

This ledger freezes what is still explicitly deferred or unavailable in the current `v0.3-single-cell-usable` line.

It exists to prevent the repo from overstating current product truth.

## Product-Line Deferred Scope

The following remain explicitly deferred at the product boundary:

- multi-cell portfolio behavior
- Secretary behavior
- provider execution
- channel integrations
- broad KPI cockpit behavior
- broad business-pack execution breadth
- runtime-complete product state

Primary evidence:

- `governance/baselines/SOLOCREW-v0.3-SINGLE-CELL-USABLE-SCOPE-v0.1.md`
- `governance/audits/SOLOCREW-v0.3-NON-GOALS-v0.1.md`
- operator-page and scaffold boundaries under `app/shell/` and `app/pages/`

## Console Interaction And Submission Deferrals

| Deferred / Unavailable Surface | Primary Repo Evidence | Current Truth |
| --- | --- | --- |
| Provider-backed action execution | `app/shell/single-cell-operator-action-intent.ts` | Action intents do not dispatch provider execution. |
| Channel-routed action handoff | `app/shell/single-cell-operator-action-intent.ts` | No channel-side action routing exists. |
| Provider-backed input submission | `app/shell/single-cell-operator-input-draft.ts` | Drafts do not submit into provider-backed runtime paths. |
| Channel-routed input submission | `app/shell/single-cell-operator-input-draft.ts` | No channel entry exists for operator drafts. |
| Provider-backed request submission | `app/shell/single-cell-operator-request-package.ts` | Request packages stop at bounded packaging and preview. |
| Channel-routed request handoff | `app/shell/single-cell-operator-request-package.ts` | No channel handoff exists for packaged requests. |
| Actual request submission | `app/shell/single-cell-operator-request-review-submit-preview.ts` | Current status is `preview_ready_submit_unavailable`, not a real submit path. |
| One-click request preview promotion | `app/shell/single-cell-operator-session-draft-controls.ts` | Session-only drafts do not auto-promote into rebuilt request-preview truth. |

## Persistence And Timeline Deferrals

| Deferred / Unavailable Surface | Primary Repo Evidence | Current Truth |
| --- | --- | --- |
| Persistent action-intent timeline | `app/shell/single-cell-operator-action-intent.ts` | No persisted action timeline exists across sessions. |
| Persistent input-draft history | `app/shell/single-cell-operator-input-draft.ts` | No persisted operator input-draft history exists. |
| Persistent request-package history | `app/shell/single-cell-operator-request-package.ts` | No persisted request-package history exists. |
| Persistent review timeline | `app/shell/single-cell-correction-review-interaction.ts` | Review/correction does not become a persistent review timeline in the current console line. |
| Event timeline persistence | `app/shell/single-cell-continuity-reload-presentation.ts` | Continuity is honest about not having a full persisted event timeline. |
| Process resume lineage | `app/shell/single-cell-continuity-reload-presentation.ts` | Fresh reload does not restore a runtime-complete process lineage. |
| Fresh-reload session draft restore | `app/shell/single-cell-operator-in-session-draft-state.ts` | Session-only draft values do not persist across a fresh reload. |

## Portfolio / Secretary / Cross-Cell Deferrals

| Deferred / Unavailable Surface | Primary Repo Evidence | Current Truth |
| --- | --- | --- |
| Multi-cell action routing | `app/shell/single-cell-operator-action-intent.ts` | Action intents remain single-cell only. |
| Multi-cell input routing | `app/shell/single-cell-operator-input-draft.ts` | Input drafts remain single-cell only. |
| Multi-cell request routing | `app/shell/single-cell-operator-request-package.ts` | Request packaging remains single-cell only. |
| Secretary-managed action queue | `app/shell/single-cell-operator-action-intent.ts` | No secretary queue or secretary action triage exists. |
| Secretary-managed input inbox | `app/shell/single-cell-operator-input-draft.ts` | No secretary inbox exists for operator inputs. |
| Secretary-managed request queue | `app/shell/single-cell-operator-request-package.ts` | No secretary queue exists for request packages. |
| Secretary or portfolio resume handoff | `app/shell/single-cell-continuity-reload-presentation.ts` | Continuity does not hand off into a secretary or portfolio layer. |

## Correction / Review And Approval Deferrals

| Deferred / Unavailable Surface | Primary Repo Evidence | Current Truth |
| --- | --- | --- |
| Provider-backed rerun after correction | `app/shell/single-cell-correction-review-interaction.ts` | Correction does not trigger a provider-backed rerun path. |
| Channel-routed review handoff | `app/shell/single-cell-correction-review-interaction.ts` | No channel review routing exists. |
| Multi-step approval workflow | `app/shell/single-cell-correction-review-interaction.ts` | No approval engine or multi-step review chain exists. |

## Explicit Non-Claims That Must Stay Frozen

The current `v0.3` line must continue to make these explicit non-claims:

- no actual provider-backed request/action/input submission
- no channel-routed action, input, request, or review routing
- no persistent action/request/review timeline
- no fresh-reload restore of session-only draft state
- no Secretary behavior
- no multi-cell portfolio behavior
- no runtime-complete workflow resume
- no runtime-complete request-submit workflow
- no silent elevation of product-side scaffolds into runtime or protocol authority

## Ledger Conclusion

The current repo truth supports:

- bounded operator visibility
- bounded preview/readiness packaging
- honest continuity and deferred-surface messaging

It does not support:

- real submission
- real provider execution
- real channel routing
- real secretary or portfolio behavior
- real persistent operator workflow history

That boundary must remain explicit until a later bounded wave actually changes repo truth.

