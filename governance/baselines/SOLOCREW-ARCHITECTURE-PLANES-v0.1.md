# SOLOCREW-ARCHITECTURE-PLANES-v0.1

## Purpose

This document freezes the four main product architecture planes for SoloCrew.

These are product architecture planes.
They help organize downstream product surfaces and do not replace runtime layering in `Cognitive_OS`.

## Plane Set

SoloCrew is organized into four planes:

1. `Management Plane`
2. `Organization Plane`
3. `Execution Plane`
4. `Memory & Evidence Plane`

## Plane Map

| Plane | Purpose | Main SoloCrew Objects / Surfaces | Current status after `v0.1` closure |
| --- | --- | --- | --- |
| `Management Plane` | Top-level direction, approval, and return surface above an individual `Cell`. | `Management Directive`, `Cell Summary Card`, `Escalation / Approval Request`, `Delivery Return` | Constitution-only. Not yet a broad cockpit and not yet a full implementation surface. |
| `Organization Plane` | Defines how a `Cell` is constituted and how a crew is shaped. | `Cell Charter`, `Delivery Contract`, `Cell Policy Profile`, `CEO Orchestrator Contract`, `Crew Blueprint`, `Objective Portfolio`, `Crew Topology`, `Role Policy Bindings` | Constitution-only for new structural objects; existing repo already has crew/objective projection truth. |
| `Execution Plane` | Shows and coordinates active work state inside the `Cell`. | `crew`, `crew-member`, `objective`, `work-item`, `review-strip`, `Execution Plan`, `Cell Console` | Partially implemented through projection assembly, runtime sessions, and bounded motion truth. |
| `Memory & Evidence Plane` | Carries continuity, preference, correction, and evidence-relevant state. | `memory-summary`, `Memory & Evidence Anchor`, bounded preference state, correction/writeback surface, continuity notes | Partially implemented through current bounded memory/preference/correction surfaces; full evidence graph is absent. |

## Plane Rules

### Management Plane

This plane may summarize and direct.
It must not pretend to own raw runtime truth or become a fake KPI universe.

### Organization Plane

This plane defines constitutional structure and crew compilation posture.
It must not be mistaken for a live runtime topology engine.

### Execution Plane

This plane is the closest current repo truth to usable product behavior.
It should remain grounded in:

- bounded motion
- objective/work-item state
- blocked/recovery truth

### Memory & Evidence Plane

This plane must remain honest about what continuity exists and what does not.
It may not claim full long-horizon evidence or learning surfaces that are absent upstream.

## Cross-Plane Discipline

- `Management Plane` should not micromanage `Execution Plane` state directly.
- `Organization Plane` should shape `Execution Plane`, not impersonate it.
- `Memory & Evidence Plane` should inform the other planes without pretending it already contains a full persistent cognition graph.
- Any future runtime blocker exposed by these planes must be recorded before it is pushed to `Cognitive_OS`.
