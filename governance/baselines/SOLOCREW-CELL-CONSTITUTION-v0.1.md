# SOLOCREW-CELL-CONSTITUTION-v0.1

## Purpose

This document freezes the minimum constitutional object set for a valid SoloCrew `Cell`.

The objects in this document are product-constitutional objects.
They do not automatically imply existing mother-runtime schemas or persistence surfaces.

## Cell Definition

A `Cell` is the first valid SoloCrew operating unit for a solo operator.

A valid `Cell` must be able to answer:

- what this unit exists to do
- what delivery standard it operates under
- what policies constrain it
- who compiles and coordinates the crew
- how the crew is shaped
- which objectives it currently holds
- how execution state is tracked
- how memory and evidence continuity is anchored

## Constitutional Object Classes

### Required Constitutional Objects

These objects are required for a valid `Cell`.
Some may initially be bootstrapped from defaults or narrow setup flows, but they must exist constitutionally.

| Object | Required | Purpose | Day-one expectation |
| --- | --- | --- | --- |
| `Cell Charter` | Yes | Defines identity, mission, business scope, operator authority, and the reason this `Cell` exists. | Must exist at initialization, even if captured as a thin starter charter. |
| `Delivery Contract` | Yes | Defines the delivery promise, done definition, review expectation, and return shape for this `Cell`. | Must exist, even if initially simple and operator-authored. |
| `Cell Policy Profile` | Yes | Defines guardrails, approval boundaries, risk posture, and operational constraints. | Must exist in a narrow initial form. |
| `CEO Orchestrator Contract` | Yes | Defines the compile-and-coordinate role of the CEO layer for this `Cell`. | Must exist as a bounded product contract before broader runtime work. |
| `Crew Blueprint` | Yes | Defines the intended crew topology, role structure, and staffing pattern for the `Cell`. | Must exist as the basis for a native multi-agent crew. |
| `Objective Portfolio` | Yes | Defines the ordered objective set for the `Cell`, including the current active objective. | Day one may start with one current objective and a minimal backlog. |
| `Execution Ledger` | Yes | Defines the durable execution-facing state the `Cell` treats as its source of work progress truth. | Day one may map this narrowly to objective/work-item state already supported by current repo truth. |
| `Memory & Evidence Anchor` | Yes | Defines what continuity, memory, preference, and evidence references the `Cell` treats as decision-relevant. | Day one is bounded by current memory/preference continuity and honest non-claims. |

### Optional Mounts

These mounts are optional.
They may be absent at initialization without invalidating the `Cell`.

| Mount | Required | Purpose | Day-one expectation |
| --- | --- | --- | --- |
| `Business Pack Mount` | No | Mount point for domain-specific operating packs, templates, or business behaviors. | Deferred by default. |
| `Metrics Pack Mount` | No | Mount point for metrics definitions, reporting views, or evaluation overlays. | Deferred by default. |

## Object Notes

### Cell Charter

The `Cell Charter` is not a runtime worker record.
It is the top-level constitutional statement of the `Cell`.

### Delivery Contract

The `Delivery Contract` must not be confused with transient execution events.
It defines expected delivery behavior, not every runtime action taken during delivery.

### Cell Policy Profile

The `Cell Policy Profile` is where approval boundaries and operator risk posture belong.
It is not a provider policy engine.

### CEO Orchestrator Contract

The `CEO Orchestrator Contract` is the product-level definition of how the `Cell` compiles and governs its crew.
It is not proof that a full orchestrator runtime already exists.

### Crew Blueprint

The `Crew Blueprint` is a structural design object.
It may later map to runtime worker/topology state, but it begins as product constitutional intent.

### Objective Portfolio

The `Objective Portfolio` may be narrow at first.
Single-cell initialization only requires one current objective to be active.

### Execution Ledger

The `Execution Ledger` should be read as the `Cell`'s durable execution truth requirement.
Day one it should stay honest and narrow:

- objective state
- work-item state
- blocked vs active progress truth

It does not imply a stored event timeline that current repo truth does not own.

### Memory & Evidence Anchor

The `Memory & Evidence Anchor` should remain bounded by currently reconstructable memory, preference, and evidence continuity.
It must not claim a full evidence graph or full long-horizon learning system at this stage.

## Constitutional Rule

A SoloCrew `Cell` is structurally valid only when all required constitutional objects exist.

Optional mounts may be absent.
They expand the `Cell`; they do not constitute it.
