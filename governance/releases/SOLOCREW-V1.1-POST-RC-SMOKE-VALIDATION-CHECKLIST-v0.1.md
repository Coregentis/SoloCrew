# SoloCrew V1.1 Post-RC Smoke Validation Checklist v0.1

`doc_id: SOLOCREW-V1.1-POST-RC-SMOKE-VALIDATION-CHECKLIST-v0.1`

## A. Purpose

This checklist defines smoke checks for the published SoloCrew V1.1 RC line.

## B. Smoke Checks

| Smoke check | Command / surface | Expected result |
|---|---|---|
| tag exists | `git tag --list "solocrew-v1.1-rc-non-executing-founder-loop-20260420"` | expected RC tag is visible |
| GitHub Release exists | `gh release view solocrew-v1.1-rc-non-executing-founder-loop-20260420 --repo Coregentis/SoloCrew` | RC prerelease is visible |
| GitHub Release prerelease status | GitHub release metadata | `prerelease: true` |
| release notes explicit non-capabilities | GitHub release notes body | exclusions remain explicit |
| npm test | `npm test` | full suite passes |
| readability gate | `node scripts/governance/check-v1-1-governance-readability.mjs` | readability gate passes |
| founder intake page tests | `node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts` | tests pass |
| handoff page tests | `node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts` | tests pass |
| review page tests | `node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts` | tests pass |
| projection adapter/flow tests | targeted projection test commands | tests pass |
| forbidden boundary grep | repo boundary grep | matches remain negative-boundary / exclusion / risk / test-only |

## C. Decision

`SOLOCREW_V1_1_POST_RC_SMOKE_VALIDATION_CHECKLIST_READY`
