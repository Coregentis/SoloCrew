# SoloCrew V1.1 RC Validation Plan v0.1

`SOLOCREW-V1.1-RC-VALIDATION-PLAN-v0.1`

## A. Purpose

This plan defines validation required before any actual RC seal/tag step.

## B. Required Commands

- `node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-adapter.test.ts`
- `node --experimental-strip-types --test tests/projection/founder-request-intake-to-packet-flow.test.ts`
- `node --experimental-strip-types --test tests/app/create-v1-1-intake-to-packet-page-model.test.ts`
- `node --experimental-strip-types --test tests/app/founder-request-intake-page.test.ts`
- `node --experimental-strip-types --test tests/app/secretary-handoff-page.test.ts`
- `node --experimental-strip-types --test tests/app/secretary-handoff-review-page.test.ts`
- `npm test`
- `git diff --check`

## C. Required Grep Gates

- forbidden overclaim grep
- decision grep

## D. Blocking Conditions

Block RC seal if:

- any test fails
- forbidden grep finds positive overclaim
- app copy implies approval/execution/proof
- provider/channel or queue appears as capability
- direct runtime-private dependency appears
- release notes imply certification

## E. Decision

`SOLOCREW_V1_1_RC_VALIDATION_PLAN_READY`
