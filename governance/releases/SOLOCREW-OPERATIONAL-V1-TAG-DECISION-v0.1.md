# Operational V1 Tag Decision

`SOLOCREW-OPERATIONAL-V1-TAG-DECISION-v0.1`

## A. Purpose

This document decides the recommended tag pattern and tag authorization
boundary for the current bounded Operational V1 seal candidate.

It is:

- tag decision only
- no Git tag created in this wave
- no GitHub release created in this wave
- no external release seal created in this wave
- no Operational V1 completion claim
- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue

## B. Tag Candidates Compared

### 1. `solocrew-operational-v1-rc-seal-YYYYMMDD`

- clarity:
  - high; it ties the tag to SoloCrew, Operational V1, RC, and seal-candidate
    framing
- collision risk with repo/platform `v1.0`:
  - low; it does not reuse the current repo/platform `v1.0` label as if it
    were the same thing
- whether it overclaims Operational V1 completion:
  - no; `rc` keeps the bounded-candidate reading explicit
- whether it keeps RC / bounded / seal-candidate semantics clear:
  - yes
- whether it fits current release chain:
  - yes; it aligns with the current RC and seal-record governance language

### 2. `operational-v1-rc-YYYYMMDD`

- clarity:
  - medium; it identifies Operational V1 RC but drops the repo/product prefix
- collision risk with repo/platform `v1.0`:
  - medium; the shorter name is easier to over-read as a general line rather
    than a SoloCrew-specific governed record
- whether it overclaims Operational V1 completion:
  - no, but it is less explicit than the first option
- whether it keeps RC / bounded / seal-candidate semantics clear:
  - partially; `rc` is present but `seal` and `SoloCrew` are absent
- whether it fits current release chain:
  - partially; workable, but weaker than the first option

### 3. `v1.0-operational-rc-YYYYMMDD`

- clarity:
  - low; it risks collapsing current repo/platform `v1.0` and later
    Operational V1 into one line
- collision risk with repo/platform `v1.0`:
  - high
- whether it overclaims Operational V1 completion:
  - materially at risk; `v1.0` can be over-read as full operational closure
- whether it keeps RC / bounded / seal-candidate semantics clear:
  - no; it reintroduces version-boundary ambiguity
- whether it fits current release chain:
  - no; it fights the frozen version-boundary baseline

## C. Recommended Tag Pattern

- recommended_tag_pattern:
  - `solocrew-operational-v1-rc-seal-20260420`

This is a recommended tag pattern only.
It is not a created tag.
This wave does not run `git tag`, does not push tags, and does not create a
GitHub release.

## D. Tag Target Policy

- the future tag should target the future final release authorization commit,
  not this drafting wave automatically
- the tag must not be created until a final tag authorization audit passes
- the tag message must preserve disclosed gaps and the non-executing boundary
- the tag must not imply provider/channel execution, founder queue,
  approve/reject/dispatch/execute, autonomous company operation, or protocol
  certification

## E. Stop Conditions

Tag authorization must stop if:

- release notes overclaim
- disclosed gaps are missing
- forbidden claims appear
- full regression validation fails
- seal record still contains unresolved release-blocking fields
- README / CHANGELOG imply completion before tag authorization

## F. Decision

`TAG_DECISION_READY_FOR_RELEASE_NOTE_REVIEW`

