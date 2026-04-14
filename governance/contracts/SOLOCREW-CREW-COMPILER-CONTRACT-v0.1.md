# SOLOCREW-CREW-COMPILER-CONTRACT-v0.1

## Purpose

This document freezes the product contract for the `CEO Orchestrator` as `Crew Compiler`.

This is a downstream product contract.
It does not claim that full compile/runtime machinery already exists in `Cognitive_OS`.

## Compiler Role

The `CEO Orchestrator` is the product layer that compiles a valid `Cell` constitutional state into a usable crew operating shape.

As `Crew Compiler`, it is responsible for:

- interpreting management intent
- shaping the crew topology for the active `Cell`
- binding role policies and constraints
- producing an execution plan shape
- determining when recompilation is required

It is not responsible for pretending compile outputs are already live provider/runtime execution.

## Compile Phase vs Runtime Phase

### Compile Phase

Compile phase is the structural planning phase.
It produces bounded product-owned outputs that shape how a `Cell` should operate.

Compile phase may:

- read management intent
- read `Cell` constitutional state
- read objective context and continuity state
- derive crew shape and plan structure
- produce summary seeds for projection surfaces

Compile phase may not:

- claim live provider dispatch
- claim persistent event history
- claim autonomous runtime behavior beyond current authorized surfaces

### Runtime Phase

Runtime phase begins after compile outputs are handed into lawful downstream assembly and authorized runtime surfaces.

Runtime phase may use:

- bounded lifecycle truth
- bounded state stores
- bounded action dispatch
- bounded correction/writeback glue

Runtime phase does not inherit new authority merely because compile outputs exist.

## Input Contract

The `Crew Compiler` consumes six bounded input classes.

### 1. Management Directive

Defines what top-level management is asking this `Cell` to do now.

Minimum contents:

- operator intent
- current priority statement
- approval posture
- delivery emphasis

### 2. Cell Constitutional State

Defines the active constitutional objects of the `Cell`.

Minimum contents:

- `Cell Charter`
- `Delivery Contract`
- `Cell Policy Profile`
- `CEO Orchestrator Contract`
- `Crew Blueprint`
- `Objective Portfolio`

### 3. Objective Context

Defines the currently active objective context and relevant work focus.

Minimum contents:

- current objective
- related work state
- blocked/active posture
- near-term execution pressure

### 4. Memory & Evidence State

Defines the continuity state the compiler is allowed to treat as relevant.

Minimum contents:

- memory summaries
- bounded preference state
- evidence anchors or references the product legitimately has
- continuity notes about what is absent

### 5. Capability Supply

Defines which capabilities the current `Cell` can actually rely on.

Minimum contents:

- available crew roles
- available runtime surfaces
- available product mounts
- explicitly absent capabilities

### 6. Constraint Set

Defines the hard boundaries the compiler must obey.

Minimum contents:

- policy constraints
- operator approval boundaries
- runtime non-claims
- product boundary rules

## Output Contract

The `Crew Compiler` produces five bounded output classes.

### 1. Crew Topology

Defines the compiled crew shape for the active `Cell`.

Minimum contents:

- required roles
- role relationships
- coordination pattern
- ownership split

### 2. Role Policy Bindings

Defines how constitutional and policy constraints bind onto the compiled roles.

Minimum contents:

- role-specific constraints
- escalation triggers
- approval requirements
- non-delegable boundaries

### 3. Execution Plan

Defines the current structured execution shape for the `Cell`.

Minimum contents:

- current objective focus
- work partitioning
- active priorities
- success/failure handling posture

### 4. Summary Projection Seed

Defines the seed information needed for downstream summary surfaces.

Minimum contents:

- `Cell` summary inputs
- crew summary inputs
- objective summary inputs
- review/continuity summary inputs

This output is for downstream projection assembly.
It is not a raw runtime event stream.

### 5. Recompile Conditions

Defines when the existing compiled state is no longer trustworthy and should be recompiled.

Minimum contents:

- directive changes
- objective changes
- policy changes
- capability changes
- blocked-state or delivery-state changes that invalidate the current compile

## Non-Claims

This contract does not claim:

- a full runtime compiler implementation already exists
- the compiler owns provider execution
- the compiler owns the full state substrate
- the compiler may silently redefine protocol or runtime law
