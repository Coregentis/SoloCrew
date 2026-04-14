# SOLOCREW-PRODUCT-TRUTH-SNAPSHOT-v0.1

## Purpose

This note revalidates SoloCrew product requirements after `v0.1-baseline` closure by reconciling:

1. historical planning inputs in `Files_GPT/`
2. current SoloCrew repository truth
3. the bounded upstream runtime surfaces SoloCrew already consumes legally

It is not a new product invention pass.
It is a truth-tightening pass before any `v0.2` product-form implementation begins.

## SoloCrew Product Truth Snapshot

SoloCrew is still best understood as:

- a product for solo founders, independent developers, and one-person operators
- a persistent digital crew rather than a single chat assistant
- a goal-and-continuity product rather than a prompt-and-response product
- a downstream projection/app surface over `Cognitive_OS`, not a runtime authority repo

What is now actually true in the repo:

- SoloCrew has bounded projection assembly over real upstream workforce/state/lifecycle surfaces
- SoloCrew can assemble a crew shell, objective shell, bounded motion path, correction/writeback path, and return-and-continue path
- SoloCrew can run in both memory-backed and sqlite-backed runtime sessions
- SoloCrew has explicit tests for continuity, sqlite roundtrip, bounded motion success/failure, blocked recovery, and correction-after-recovery truth

What is still not true in the repo:

- no provider-backed execution
- no channel runtime
- no budget runtime
- no full PSG/AEL/VSL
- no full product UI
- no autonomous learning

## Must Keep / Should Drop / Defer

### Must Keep

- `crew-first` product framing instead of chat-first framing
- objective-driven workflow instead of prompt-thread sprawl
- continuity as a first-order feature, not a later enhancement
- correction/writeback as a visible product surface
- truth discipline around what persists and what stays session-local
- explicit distinction between bounded runtime truth and downstream product packaging

### Should Drop

- any framing that suggests SoloCrew is already a full autonomous team
- any assumption that v0.2 must begin with React cockpit breadth
- any implication that Telegram/channel/provider/budget work is required for the first usable version
- any feature list that depends on unstored execution-event history or fake persistent summaries
- any product promise that relies on full shared-graph behavior already existing

### Defer

- external channels
- provider/model routing
- budget visibility beyond deferred placeholders
- deeper learning/review loops beyond bounded correction writeback
- enterprise/multi-crew/multi-tenant surfaces
- richer dashboard analytics based on event persistence that does not yet exist

## User Job To Be Done

For the first real usable version, the core user job is:

> Help a solo operator open one place, see a real crew organized around one current objective, track active and blocked work, correct the crew when it drifts, leave, come back later, and trust that the important persisted state is still there.

This job is narrower than “run my whole company automatically.”

It specifically requires:

- one clear crew shell
- one current objective
- visible work items with state
- visible worker state
- correction and preference persistence
- honest reload continuity

It does not require:

- live model execution backends
- full autonomous planning
- multi-channel orchestration
- budget optimization

## Product Shape Decision Draft

### Dashboard

Decision:

- keep the first usable dashboard narrow
- make it a `status and continuity surface`, not a broad analytics board

What belongs there:

- current crew identity
- current objective headline
- active vs blocked work-item count
- crew-member state cards
- one concise review strip

What does not belong there yet:

- token/budget analytics
- channel inbox
- historical event timeline
- enterprise controls

### Crew Console

Decision:

- crew console should be the primary product shape, because current repo truth already assembles crew/member/objective/work-item state coherently

What belongs there:

- four default role cards or equivalent compact list
- current focus per member
- worker status
- memory summary presence
- current objective linkage

What does not belong there yet:

- real-time stream UI
- provider execution controls
- simulated autonomy beyond bounded motion truth

### Task Tracking

Decision:

- task tracking should be work-item-first, not kanban-system-first

What belongs there:

- active work items
- blocked work items
- owner member
- objective linkage
- persisted state after reload

What does not belong there yet:

- elaborate timeline/history UI based on unstored execution events
- speculative backlog planning system

### Correction / Review Surface

Decision:

- correction/review should be treated as a core usable-version surface, not a secondary admin panel

What belongs there:

- correction submission
- visible preference/writeback effect
- memory-summary continuity
- current review strip with honest persisted-vs-session-local semantics

What does not belong there yet:

- full learning analytics
- fake persistent correction timeline if it is not stored

### Continuity / Reload Experience

Decision:

- continuity must be a top-level product experience because it is the clearest differentiator already supported by repo truth

What belongs there:

- same crew id after reload
- same objective id after reload
- same work-item identity/state after reload
- same preference writeback effect after reload
- explicit honesty when anchor or event history is not persisted

What does not belong there yet:

- implied persistence of in-session execution summaries
- implied persistence of event timelines
- implied persistence of correction capture records outside current stored surfaces

## Version Boundary Draft

### First Usable Version

Belongs here:

- memory/sqlite runtime session entry
- one crew shell
- one current objective
- work-item tracking
- blocked/recovered state truth
- correction/writeback path
- reload continuity with honest non-claims

Does not need to wait for:

- provider execution
- channel integration
- budget runtime
- full UI breadth

### Later External-Test Version

Belongs here:

- thin product UI over the existing shell/assembly truth
- user-facing correction and review surface
- clearer in-session vs persisted-state messaging
- first external-user usability loop

May begin to explore:

- one bounded external execution backend once upstream/downstream boundaries are explicitly reopened
- one external entry surface only after channel/runtime authority is resolved

### Full Version

Belongs here:

- broader dashboarding
- richer review/history surfaces
- external channels
- provider/runtime integrations
- budget visibility
- deeper long-horizon learning surfaces

Must still preserve:

- `MPLP Protocol -> Cognitive_OS -> SoloCrew`
- product truth must not overwrite runtime truth

## Net Product Judgment

The first real usable SoloCrew product should not be designed as “a large AI workspace.”

It should be designed as:

- a narrow crew console
- centered on one current objective
- with explicit task state
- explicit correction/review
- and reload continuity as the trust anchor

That shape is the closest match to:

- historical SoloCrew product intent
- current repository truth
- and current bounded upstream runtime legality
