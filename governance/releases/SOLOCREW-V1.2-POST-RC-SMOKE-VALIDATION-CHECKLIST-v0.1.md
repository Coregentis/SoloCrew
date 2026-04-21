# SoloCrew V1.2 Post-RC Smoke Validation Checklist v0.1

`doc_id: SOLOCREW-V1.2-POST-RC-SMOKE-VALIDATION-CHECKLIST-v0.1`

## A. Purpose

Define smoke checks for the published V1.2 RC line.

## B. Smoke Checks

| Smoke check | Command / surface | Expected result |
|---|---|---|
| V1.2 tag exists | `git tag --list "solocrew-v1.2-rc-packet-revision-loop-20260421"` | expected V1.2 RC tag is visible |
| V1.2 GitHub prerelease exists | `gh release view solocrew-v1.2-rc-packet-revision-loop-20260421 --repo Coregentis/SoloCrew` | V1.2 GitHub prerelease is visible |
| V1.2 GitHub prerelease status is true | GitHub release metadata | `isPrerelease = true` |
| tag target equals seal commit | `git rev-list -n 1 solocrew-v1.2-rc-packet-revision-loop-20260421` | tag target = `51706f14bcc4de1e4827332173bf02166ac35468` |
| release notes include explicit non-capabilities | published release notes body and `governance/releases/SOLOCREW-V1.2-RC-GITHUB-RELEASE-NOTES-v0.1.md` | exclusions remain explicit |
| npm test | `npm test` | full suite passes |
| adapter targeted test | `node --experimental-strip-types --test tests/projection/packet-revision-adapter.test.ts` | tests pass |
| flow targeted test | `node --experimental-strip-types --test tests/projection/packet-revision-flow.test.ts` | tests pass |
| page model targeted test | `node --experimental-strip-types --test tests/app/create-v1-2-packet-revision-page-model.test.ts` | tests pass |
| forbidden boundary grep | repo boundary grep | matches remain negative-boundary / explicit exclusion / audit-risk / test-only |
| README V1.2 section does not overclaim | `README.md` V1.2 RC section | wording stays bounded, non-executing, and non-GA |
| no new tag/release created during smoke validation | Git tag / GitHub release surface after smoke validation | no additional tag or release appears |

## C. Decision

`SOLOCREW_V1_2_POST_RC_SMOKE_VALIDATION_CHECKLIST_READY`
