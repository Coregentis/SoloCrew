# SoloCrew V1.2 User Scenario Pack v0.1

`doc_id: SOLOCREW-V1.2-USER-SCENARIO-PACK-v0.1`

## A. Purpose

This pack defines the first V1.2 user scenarios against the released V1.1 RC
baseline.

## B. Scenarios

| Scenario | User input | Expected V1.2 behavior | Non-executing boundary | Success signal |
|---|---|---|---|---|
| founder revises a packet after insufficient evidence | “Use the same request, but revise the packet so missing evidence is explicitly handled.” | user can revise the bounded packet candidate without restarting the whole flow | revision remains below execution and queue semantics | revised packet candidate is clearer and still non-executing |
| founder compares two packet options | “Show me two bounded packet options so I can compare them before deciding.” | user sees an option set for comparison only | option comparison does not dispatch or execute anything | user can inspect tradeoffs without leaving bounded review space |
| founder clarifies ambiguous request before packet generation | “I’m not sure whether this is a product update or a customer follow-up; help me clarify it first.” | system surfaces bounded clarification posture before packet generation | clarification remains non-executing and advisory | ambiguity is reduced before packet generation |
| founder carries a bounded preference into next packet | “Prefer concise packet framing next time.” | system carries a bounded preference summary into the next packet candidate | preference carryover remains summary-only and below runtime-private dependency | next packet reflects the bounded preference without overclaiming memory authority |

## C. Chosen Primary Scenario

Chosen primary scenario:

- founder revises a packet after insufficient evidence

Why:

- it is the cleanest extension of the V1.1 RC line
- it directly builds on existing insufficiency / stale posture and
  return-for-revision semantics
- it creates a visible user benefit without crossing into execution behavior

## D. Scenario Exclusion Rules

- no provider/channel execution
- no approve/reject/dispatch/execute
- no founder queue
- no live external workflow
- no external business action execution

Evidence / stale / insufficient treatment:

- insufficiency must remain explicit
- stale context must remain explicit
- revised packet candidates must stay below proof semantics
- recommendation remains non-executing

## E. Decision

`SOLOCREW_V1_2_SCENARIO_PACK_READY`
