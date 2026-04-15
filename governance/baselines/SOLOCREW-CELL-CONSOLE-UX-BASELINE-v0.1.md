# SOLOCREW Cell Console UX Baseline v0.1

## Purpose

This document freezes the minimum future `Cell Console` sections for `v0.3-single-cell-usable`.

It is an operator-facing baseline only.
It does not define a Secretary surface, a multi-cell portfolio surface, or a broad KPI cockpit.

## UX Position

The `Cell Console` is the first real usable SoloCrew product surface.

It should let one operator:

- understand where the `Cell` stands
- understand the current objective and work
- review bounded continuity truth
- make bounded corrections and decisions

## Minimum Console Sections

### 1. Header Section

The console must show:

- `Cell` name
- current objective headline
- current delivery posture
- continuity note

### 2. Delivery Section

The console must show:

- delivery target
- done definition
- review posture
- any clearly deferred delivery surfaces

### 3. Crew Overview Section

The console must show:

- current crew framing
- required roles
- current management priority
- bounded compile/readiness posture

It must not pretend live provider orchestration exists if it does not.

### 4. Objective Section

The console must show:

- one current objective
- queued objectives only if they are still clearly single-cell scoped
- active vs blocked work posture

### 5. Work Section

The console must show:

- work-item or workstream truth
- active count
- blocked count
- explicit absence of timeline/event-history truth where not available

### 6. Memory And Continuity Section

The console must show:

- bounded memory/continuity truth
- what continuity is based on
- what continuity is missing

### 7. Review / Correction Section

The console must expose:

- bounded correction path
- bounded review posture
- honest writeback/continuity implications

### 8. Deferred Surfaces Section

The console must show:

- what remains deferred
- what is not implemented
- what the operator should not infer from the current product surface

## Explicit UX Non-Claims

The `Cell Console` must not become:

- a Secretary surface
- a multi-cell management dashboard
- a broad KPI cockpit
- a fake runtime timeline viewer

## Baseline Rule

If a candidate console surface cannot help one operator operate one `Cell` honestly, it is not a valid `v0.3` console baseline.
