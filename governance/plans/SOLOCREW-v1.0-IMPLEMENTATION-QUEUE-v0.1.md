# SOLOCREW v1.0 Implementation Queue v0.1

## Purpose

This queue translates the current readiness gap into an ordered implementation
path from the current bounded `v0.5` state toward eventual
`v1.0-solo-operator-platform` delivery.

It is a planning sequence only.
It does not authorize immediate implementation.

## Queue Rule

The queue must remain:

- authority-correct
- delivery-readiness-first
- non-executing by default
- downstream of current `Cognitive_OS` truth
- below MPLP promotion pressure

## Current Queue State

Current queue state after the landed Q3 platform summary and delivery-readiness
layer pass is:

- `Q1. Mount Model Coherence Pass` is now landed, accepted, and closed on
  `main`
- `Q2. Cross-Plane Platform Coherence Pass` is now landed, accepted, and closed
  on `main`
- `Q3. Platform Summary And Delivery-Readiness Layer` is now landed, accepted,
  and closed on `main`
- the next correct queued item is now
  `Q4. Runtime-Dependent Downstream Truth Hardening`

## Ordered Queue

| Queue item | Objective | Why it matters to `v1.0` | Class | Key blockers or dependencies | New reopening or gate required before implementation |
| --- | --- | --- | --- | --- | --- |
| `Q1. Mount Model Coherence Pass` | Turn existing `business-pack-mount` and `metrics-pack-mount` structural truth into one lawful downstream product mount model with explicit non-executing semantics. | The roadmap names a lawful business-pack and metrics-pack mount model as a mandatory `v1.0` baseline, and Q1 closes that model gap in bounded downstream form. | `structural` | Already landed through the separately gated Q1 pass. | `NO` |
| `Q2. Cross-Plane Platform Coherence Pass` | Align management, organization, execution, and memory/evidence surfaces so they read as one solo-operator platform instead of separate bounded lines. | `v1.0` requires coherent platform structure, not only strong isolated lanes. | `structural`, `explanatory` | Landed through the separately gated Q2 pass and now acts as the bounded plane-alignment baseline for later platform-read shaping. | `NO` |
| `Q3. Platform Summary And Delivery-Readiness Layer` | Build a bounded top-level platform summary/readiness layer that truthfully explains current operator state, mount posture, plane posture, and omissions without adding execution authority. | `v1.0` needs a delivery-grade product read, not only a beta-lane read. | `explanatory` | Landed through the separately gated Q3 pass and now acts as the bounded top-level platform-read baseline for later readiness work. | `NO` |
| `Q4. Runtime-Dependent Downstream Truth Hardening` | Harden downstream product interpretation only where current `Cognitive_OS` Phase 4 truth already supports stronger confirm/trace/evidence-linked visibility without inventing upstream workflow law. | Reduces ambiguity and strengthens delivery truth while preserving authority boundaries. | `runtime-dependent`, `explanatory` | Depends on current `Cognitive_OS` closure staying stable and on explicit adjacent regression if stronger upstream consumption is introduced. | `YES` |
| `Q5. v1.0 Delivery Gate And Closure Pack` | Audit the post-queue state against the formal `v1.0-solo-operator-platform` baseline and decide whether formal delivery can be claimed. | `v1.0` should be a governed delivery line, not a naming convenience. | `governance-dependent` | Depends on the earlier queue items landing coherently and on cross-repo authority checks staying green. | `YES` |

## Implementation Notes By Queue Item

### `Q1. Mount Model Coherence Pass`

Smallest truthful read:

- current repo truth already has mounts
- current mounts are still optional and deferred
- this queue item should make them coherent, not executable

Must not become:

- pack execution logic
- provider behavior
- business-runtime breadth

### `Q2. Cross-Plane Platform Coherence Pass`

Smallest truthful read:

- current planes exist
- they do not yet read as one delivery-grade platform

Must not become:

- runtime-authority capture by SoloCrew
- a fake workflow engine

### `Q3. Platform Summary And Delivery-Readiness Layer`

Smallest truthful read:

- current repo needs a platform-level explanatory surface before it can claim
  `v1.0`
- that surface must stay explanatory and omission-aware

Must not become:

- a direct-control cockpit
- an execution-bearing portfolio surface

### `Q4. Runtime-Dependent Downstream Truth Hardening`

Smallest truthful read:

- this item is optional until current upstream truth can support it lawfully
- it must remain downstream interpretation, not upstream invention

Must not become:

- local adoption of workflow-truth states that `Cognitive_OS` still rejects
- protocol-facing reinterpretation inside SoloCrew

### `Q5. v1.0 Delivery Gate And Closure Pack`

Smallest truthful read:

- `v1.0` should only be claimed after the repo can honestly read as a coherent
  solo-operator platform

Must not become:

- a paper closure over unresolved structural gaps

## Smallest Lawful Next Development Class

The smallest lawful next development class after current Q3 closure is:

- `Q4. Runtime-Dependent Downstream Truth Hardening`

That is now the smallest next class because Q3 materially reduced the previous
top blocker around platform-summary/readiness shaping and the next remaining
gap now sits at runtime-dependent downstream truth hardening that still needs
its own gate.

## Queue Judgment

The correct path from current `v0.5` to eventual `v1.0` is:

- planning-first
- mount-model-first
- plane-coherence second
- platform-summary and readiness shaping third
- runtime-dependent hardening fourth only where upstream truth supports it
- formal `v1.0` gate last
