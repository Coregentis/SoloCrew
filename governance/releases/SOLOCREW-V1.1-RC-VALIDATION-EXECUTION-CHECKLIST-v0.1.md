# SoloCrew V1.1 RC Validation Execution Checklist v0.1

`doc_id: SOLOCREW-V1.1-RC-VALIDATION-EXECUTION-CHECKLIST-v0.1`

## A. Purpose

This checklist defines what a later validation-execution wave must record
before any seal authorization or tag/release step.

## B. Command Checklist

| Command | Required | Expected result | Recorded in this wave? |
|---|---|---|---|
| `node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-adapter.test.ts` | `YES` | targeted adapter tests pass | `NO` |
| `node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-flow.test.ts` | `YES` | targeted flow tests pass | `NO` |
| `node --experimental-strip-types --test tests/app/create-v1-1-intake-to-packet-page-model.test.ts` | `YES` | page-model helper tests pass | `NO` |
| `node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts` | `YES` | founder intake page tests pass | `NO` |
| `node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts` | `YES` | handoff page tests pass | `NO` |
| `node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts` | `YES` | review page tests pass | `NO` |
| `npm test` | `YES` | full regression suite passes | `NO` |
| `git diff --check` | `YES` | no whitespace or patch-format issues | `NO` |
| forbidden overclaim grep | `YES` | positive overclaim does not appear | `NO` |
| decision grep | `YES` | required governance decisions remain present | `NO` |
| source-change check | `YES` | no unexpected app/projection changes in a seal-prep-only wave | `NO` |

## C. Evidence Recording Requirements

A later seal wave must record:

- command
- pass/fail
- test count
- HEAD SHA
- changed files
- tag decision
- release decision
- boundary confirmation

## D. Decision

`SOLOCREW_V1_1_RC_VALIDATION_EXECUTION_CHECKLIST_READY`
