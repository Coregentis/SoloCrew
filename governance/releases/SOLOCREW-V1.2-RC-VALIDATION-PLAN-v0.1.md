# SoloCrew V1.2 RC Validation Plan v0.1

`doc_id: SOLOCREW-V1.2-RC-VALIDATION-PLAN-v0.1`

## A. Purpose

Define validation required before V1.2 RC seal / tag / GitHub prerelease.

## B. Required Commands

- `git diff --check`
- `npm test`
- `node --experimental-strip-types --test tests/projection/packet-revision-adapter.test.ts`
- `node --experimental-strip-types --test tests/projection/packet-revision-flow.test.ts`
- `node --experimental-strip-types --test tests/app/create-v1-2-packet-revision-page-model.test.ts`
- `git tag --list "solocrew-v1.1-rc-non-executing-founder-loop-20260420"`
- `gh release view solocrew-v1.1-rc-non-executing-founder-loop-20260420 --repo Coregentis/SoloCrew`

## C. Forbidden Boundary Grep

Run:

```sh
rg -n "provider/channel execution|approve/reject/dispatch/execute|founder queue|external business action execution|autonomous company operation|protocol certification|raw Cognitive_OS runtime internals|direct runtime-private dependency|summary-as-proof|proof/certification|approval granted|execution completed|dispatch-ready|approved revision|proof failure|execution ready|dispatch blocked|rejected" README.md app projection tests governance CHANGELOG.md
```

This grep must hold the following phrases only as negative boundary,
explicit exclusion, forbidden-claim, audit-risk, or test-only contexts:

- provider/channel execution
- approve/reject/dispatch/execute
- founder queue
- external business action execution
- autonomous company operation
- protocol certification
- raw Cognitive_OS runtime internals
- direct runtime-private dependency
- summary-as-proof
- proof/certification
- approval granted
- execution completed
- dispatch-ready
- approved revision
- proof failure
- execution ready
- dispatch blocked
- rejected

## D. Blocking Conditions

Block RC seal if:

- any test fails
- forbidden grep finds positive capability claim
- release notes imply execution / approval / rejection / proof / dispatch readiness
- code imports runtime-private internals
- new tag or release is created in planning wave
- Cognitive_OS / MPLP files changed

## E. Decision

`SOLOCREW_V1_2_RC_VALIDATION_PLAN_READY`
