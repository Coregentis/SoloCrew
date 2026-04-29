# SoloCrew

## Product Identity

SoloCrew is a local, founder-facing Engagement Operating product surface for
one-person-company operations. It sits downstream of the Coregentis authority
stack and turns bounded product/app evidence into reviewable local surfaces
for a founder or operator.

Authority order:

`MPLP Protocol -> Cognitive_OS -> SoloCrew`

SoloCrew currently provides bounded local engagement evidence and review
capabilities. It is a product repository and app/projection baseline, not the
MPLP protocol source of truth and not the neutral Cognitive_OS runtime
foundation.

## What SoloCrew Does Today

Current SoloCrew product truth is best described with stable Engagement
language rather than release-line object names.

Today the repo contains local, deterministic, review-oriented support for:

- Engagement lifecycle framing across candidate, onboarding, paid-pilot,
  post-pilot review, conversion review, and archival stages.
- A local founder review loop over app, shell, and projection-safe evidence.
- Engagement onboarding packet semantics for expectations, required inputs,
  support boundaries, source references, and no-claim posture.
- Engagement readiness view semantics for founder review of onboarding,
  feedback, support burden, and local evidence signals.
- Engagement evidence record semantics for feedback usefulness, continuation
  signals, permission posture, and support review context.
- Engagement review gate semantics for private reference review, anonymized
  quote review, legal review, hold decisions, deny-public-use decisions, and
  manual conversion review preparation.
- Active app/page/shell/projection surfaces migrating toward canonical
  Engagement aliases while retaining compatibility exports for historical
  V1.x/V2.x code.
- V2.5 semantic stabilization work that introduces canonical Engagement
  aliases, metadata contracts, and active-surface import migration without
  broad file renames or behavior changes.

These capabilities are local-only, manual-first, review-only, deterministic,
and non-executing. They do not create external execution, public publication,
automatic conversion, payment execution, package publication, or upstream
protocol/runtime authority.

## Current Stable Release

Current stable release:

- title: `SoloCrew V2.4 Stable - Commercialization Readiness Loop`
- tag: `solocrew-v2.4-stable-commercialization-readiness-loop-20260428`
- target: `12d7ccb00506670992b798d82aa81fbc0f5578f6`

V2.4 Stable is a stable repository line for the bounded local
commercialization readiness loop only. It composes V2.3 paid pilot loop
references through onboarding packet, readiness dashboard, feedback evidence,
and case-study conversion gate records for founder review.

That release is historical evidence for a verified repo line. It does not mean
the current product object model should keep encoding `V2.4` in canonical
domain names, field names, source-ref names, or active product language.
Release records and tags preserve evidence; current product semantics should
move toward stable Engagement language.

V2.4 Stable remains manual-first, design-partner-only, local-only,
review-only, and non-executing.

## Semantic Stabilization Line

V2.5 is the Product Semantic Stabilization / Engagement Canonicalization line.
It is not a cosmetic detour and it is not a shortcut into V3.0.

Completed V2.5 stabilization work:

- canonical Engagement metadata contract:
  `app/engagement/engagement-metadata-contract.ts`
- canonical Engagement alias contract:
  `app/engagement/engagement-canonical-contract.ts`
- active compatibility alias layer:
  `app/engagement/engagement-compatibility-aliases.ts`
- active app/page/shell/projection import migration toward compatibility
  aliases, covered by `tests/app/engagement-active-surface-import-migration.test.ts`
- RC readiness gate passed with remaining compatibility debt, making V2.5
  eligible for the bounded RC prep and conditional prerelease gate only.
- RC prerelease executed as semantic stabilization evidence:
  `solocrew-v2.5-rc-semantic-stabilization-20260429` ->
  `f98b29a9ab20bb02e9928f844d4fb1f761ba2031`.
- Post-RC verification passed with remaining compatibility debt, making V2.5
  eligible for the bounded stable prep and conditional release gate only.

Remaining active version-bearing runtime/product semantics are expected
compatibility debt for this line. They are preserved as compatibility aliases,
release evidence, fixture/regression evidence, or active product debt for a
later authorized cleanup, not treated as a reason to rename historical files or
remove versioned exports during RC prep.

Version numbers remain valid in release evidence, changelog entries,
governance records, migration records, compatibility adapters, and historical
fixtures/tests. They should not be the canonical shape of new domain objects,
workflow helper names, field names, source-ref names, route constants, or
current product capability names.

## Architecture / Authority Boundary

SoloCrew is the downstream product/app repository.

Cognitive_OS is the upstream runtime foundation inspected by this repo. This
repo consumes projection-safe runtime posture and bounded summaries where
authorized, but it does not redefine Cognitive_OS law or mutate Cognitive_OS.

MPLP-Protocol is the protocol authority above Cognitive_OS and SoloCrew. This
repo does not redefine MPLP law, does not publish MPLP artifacts, and does not
claim MPLP certification or MPLP endorsement.

Current SoloCrew surfaces preserve local product boundaries:

- local-only
- manual-first
- review-only
- non-executing
- deterministic
- product-local unless a separately authorized upstream wave says otherwise

## What This Is Not

SoloCrew currently is not:

- public beta
- private beta
- paid product ready
- commercial ready
- production-ready
- V3.0
- SaaS
- package published
- MPLP certification
- MPLP endorsement

SoloCrew currently does not implement:

- payment processor
- checkout
- subscription
- automated billing
- CRM or email automation
- public publishing
- testimonial or public case-study publishing
- external analytics
- LLM/model/agent/tool invocation
- provider/channel dispatch
- marketplace
- customer account provisioning
- automatic conversion
- autonomous execution

## Release History and Evidence

Release history is preserved in tags, release records, audit records,
planning records, and `CHANGELOG.md`. The list below is a concise product-entry
index, not a replacement for immutable governance evidence.

Recent release evidence:

| Line | Identity | Evidence |
| --- | --- | --- |
| V2.5 stable readiness | proposed stable identity only, no stable release yet | `governance/releases/SOLOCREW-V2.5-RC-POST-RELEASE-VERIFICATION-AND-STABLE-READINESS-GATE-v0.1.md` |
| V2.5 RC | `solocrew-v2.5-rc-semantic-stabilization-20260429` -> `f98b29a9ab20bb02e9928f844d4fb1f761ba2031` | `governance/releases/SOLOCREW-V2.5-RC-PREP-SEAL-AND-CONDITIONAL-RELEASE-RECORD-v0.1.md` |
| V2.5 semantic stabilization | canonical Engagement aliases and active-surface migration | `governance/planning/SOLOCREW-SEMANTIC-NAMING-CORRECTION-AND-DELIVERY-LINE-GOVERNANCE-v0.1.md`; `CHANGELOG.md` |
| V2.4 Stable | `solocrew-v2.4-stable-commercialization-readiness-loop-20260428` -> `12d7ccb00506670992b798d82aa81fbc0f5578f6` | `governance/releases/SOLOCREW-V2.4-POST-STABLE-VERIFICATION-MAINTENANCE-GATE-v0.1.md` |
| V2.4 RC | `solocrew-v2.4-rc-commercialization-readiness-loop-20260428` -> `ea882d590b1b59c5b9ce703869fdd7abe66ff77d` | `governance/releases/SOLOCREW-V2.4-RC-POST-RELEASE-VERIFICATION-AND-STABLE-READINESS-GATE-v0.1.md` |
| V2.3 Stable | `solocrew-v2.3-stable-first-paid-pilot-loop-20260428` -> `c111e2dd7811ec77903a1a139c33bb1a7bc0c27a` | `governance/releases/SOLOCREW-V2.3-POST-STABLE-VERIFICATION-MAINTENANCE-AND-V2.4-OPENING-GATE-v0.1.md` |
| V2.3 RC | `solocrew-v2.3-rc-first-paid-pilot-loop-20260428` -> `2dbdba7b8b3824d0e332c5237ab307ae1fe1ba65` | `governance/releases/SOLOCREW-V2.3-RC-POST-RELEASE-VERIFICATION-AND-STABLE-READINESS-GATE-v0.1.md` |
| V2.2 Stable | `solocrew-v2.2-stable-private-alpha-journey-20260428` -> `aaef0147290848c35e68d8eb4e84616f904454e3` | `governance/releases/SOLOCREW-V2.2-STABLE-POST-RELEASE-VERIFICATION-AND-V2.3-ENTRY-GATE-v0.1.md` |
| V2.2 RC | `solocrew-v2.2-rc-private-alpha-journey-20260428` -> `cb9ee1420181318d7198bd0bddc4896c6d3fe1d7` | `governance/releases/SOLOCREW-V2.2-RC-POST-RELEASE-VERIFICATION-AND-STABLE-READINESS-GATE-v0.1.md` |

Earlier V1.x, V2.0, and V2.1 evidence remains available through
`CHANGELOG.md`, `governance/releases/`, `governance/release/`,
`governance/baselines/`, `governance/planning/`, and `governance/audits/`.
Those historical records should be preserved as release trace, not copied into
new canonical product object names.

## Development / Test Status

The latest full repository suite run for the V2.5 RC verification line reported:

- `npm test` -> pass, 628/628
- canonical Engagement alias and metadata tests -> pass
- active-surface import migration test -> pass
- V2.4 commercialization readiness loop regression tests -> pass
- V2.3 paid pilot loop regression tests -> pass

This repository remains private package metadata only. No package publish is
part of the current line.

## Next Line

The next allowed line after V2.5 RC post-release verification is the bounded
stable prep and conditional release gate for semantic stabilization, not V3.0
planning.

Next allowed task:

`SOLOCREW-V2.5-STABLE-PREP-GATE-AND-CONDITIONAL-RELEASE-EXECUTION-01`

V3.0 remains reserved for a future First Deliverable Engagement Operating Loop.
V3.0 planning is blocked until V2.5 semantic stabilization reaches a
maintenance or final-seal gate. No V3.0 implementation is opened by this
README structure.
