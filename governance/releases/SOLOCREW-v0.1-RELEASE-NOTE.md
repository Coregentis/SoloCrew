# SOLOCREW v0.1 Release Note

## Release Status

SoloCrew `v0.1` is sealed as a truthful downstream product baseline.

This release does not introduce a full product UI or live provider execution.
It seals the first honest product line that SoloCrew can stand behind using only:

- historical product intent from `Files_GPT/`
- current SoloCrew repository truth
- legally consumed bounded runtime surfaces from `Cognitive_OS`

## What v0.1 Delivers

### Product Baseline

- SoloCrew is frozen as a crew-first downstream product repo, not a protocol repo and not a mother-runtime repo
- product identity, projection boundary, DTO boundary, workflow boundary, and upstream consumption rules are documented under `governance/`
- the first five product flows are frozen as bounded baseline workflows

### Projection Assembly

- upstream workforce/state records are adapted into SoloCrew projection objects:
  - `crew`
  - `crew-member`
  - `objective`
  - `work-item`
  - `memory-summary`
  - `review-strip`
- shell assembly can produce a usable crew/objective/work-item view over seeded baseline state

### Runtime Entry

- SoloCrew consumes bounded runtime surfaces only through `runtime-imports/cognitive-runtime.ts`
- shell runtime sessions support:
  - `memory`
  - `sqlite`
- baseline shell creation and reload use session-layer wiring instead of scattered runtime assembly

### Truthful Continuity

- sqlite-backed fresh-session reload preserves stable crew/objective/work-item identity
- persisted worker/work-item state survives reload where current authorized runtime surfaces actually store it
- preference writeback effects survive reload where current authorized runtime surfaces actually store them
- the repo explicitly does not claim persistence for transient event timelines, transient bounded-motion summaries, or fresh-session anchor state when those are not stored

### Executable Verification

The sealed `v0.1` line includes executable tests for:

- projection mapping truth
- baseline shell creation
- return-and-continue continuity
- runtime boundary discipline
- sqlite roundtrip continuity
- bounded motion success persistence truth
- bounded motion failure persistence truth
- blocked recovery persistence truth
- correction/writeback persistence truth after recovery

## What v0.1 Does Not Claim

SoloCrew `v0.1` does not claim:

- provider-specific execution bridges
- Telegram or any other live channel runtime
- budget runtime
- full PSG / AEL / VSL
- autonomous learning
- a broad React cockpit or full product UI
- persisted execution-event history beyond currently authorized stored truth

## Product Shape Locked By This Release

The truthful first product shape remains:

- a narrow crew console
- centered on one current objective
- with explicit work-item state
- visible correction/writeback
- and continuity/reload as the trust anchor

## Next-Step Boundary

This release closes `v0.1`.

Any next wave belongs to `v0.2` planning and should build on this sealed baseline rather than reopening runtime authority or inventing persistence that the current stack does not own.
