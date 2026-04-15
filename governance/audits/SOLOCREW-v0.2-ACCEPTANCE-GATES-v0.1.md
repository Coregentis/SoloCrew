# SOLOCREW v0.2 Acceptance Gates v0.1

## Purpose

This document freezes the acceptance gates that justify moving from `v0.2-structural-constitution` to `v0.3-single-cell-usable`.

## Already Satisfied At v0.2 Closure

- structural constitution documents are frozen
- the minimum `Cell` constitutional object set exists in code
- the management contract layer exists in code
- a single-cell structural assembly scaffold exists
- a single-cell console state scaffold exists
- a single-cell view-model scaffold exists
- a single-cell shell composition scaffold exists
- a bounded app-shell-facing shell entry adapter exists
- executable tests verify structural alignment and boundary non-claims

## Must Be Added For v0.3 Single-Cell Usable

- one actual single-cell entry surface that uses the current shell entry adapter
- one actual single-cell console page or equivalent usable product surface
- coherent presentation of:
  - cell identity
  - current objective
  - work-item or workstream truth
  - memory/continuity truth
  - deferred-surface truth
- an operator-usable path for bounded review/correction over the already sealed `v0.1` runtime truths
- an operator-usable continuity/reload experience from the actual entry surface
- test coverage that verifies the single-cell usable path as product behavior rather than only as structural scaffolding

## Explicitly Not Part Of v0.3 Yet

- multi-cell portfolio behavior
- Secretary behavior
- broad KPI cockpit behavior
- provider execution implementation
- channel integrations
- business-pack execution logic
- runtime-complete product state
- silent promotion of product structure into runtime or protocol authority

## Gate Judgment Rule

`v0.3-single-cell-usable` should be accepted only when the product can honestly say:

- one operator can enter one `Cell`
- one operator can understand current objective and work truth
- one operator can act through a bounded single-cell console
- continuity and deferred-surface truth remain explicit

If those conditions are not met, the repo has not crossed from structural constitution into usable-product form.
