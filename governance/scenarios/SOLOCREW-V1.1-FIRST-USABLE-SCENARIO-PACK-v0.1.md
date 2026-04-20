# SoloCrew V1.1 — First Usable Scenario Pack v0.1

This scenario pack opens the first founder-facing usable scenarios above the
sealed Operational V1 boundary at tag
`solocrew-operational-v1-rc-seal-20260420` and commit
`2dea8c96052c28cacdc89c80bb30ea35c6e62468`.

## Founder submits ambiguous request

### Scenario ID

`SCN-V1_1-FOUNDERS-01`

### User Situation

The founder submits a request that is real but underspecified, so the loop must
preserve meaning without inventing execution.

### Input Example

`Please sort out the onboarding issue for the new operator and tell me what we should do next.`

### Expected Packet Behavior

The request is captured into a bounded intake object and then derived into a
packet that surfaces ambiguity, evidence posture, and likely review-needed
interpretation.

### Expected Review Behavior

The review surface frames the ambiguity, shows what is known versus omitted,
and prepares a next-step recommendation without turning the request into a
dispatched workflow.

### Evidence Required

- visible founder request identity and text
- visible bounded evidence summary or omission marker
- visible review-readiness or bounded review-needed posture

### Forbidden Behavior

- auto-filling hidden assumptions as execution commands
- approving, dispatching, or executing the request
- presenting a founder queue execution state

### Pass Criteria

The founder can see the request captured, packetized, handed off, and prepared
for review with explicit ambiguity retained.

### Fail Criteria

The system silently converts ambiguity into action authority or hides the lack
of evidence.

## Founder request contains operational risk

### Scenario ID

`SCN-V1_1-FOUNDERS-02`

### User Situation

The founder request contains risk or uncertainty and should remain evidence-led
and bounded.

### Input Example

`We may have shipped the wrong pricing language to a customer. Check what matters and prepare the safest next step.`

### Expected Packet Behavior

The packet exposes operational risk posture, evidence sufficiency or
insufficiency markers, and bounded recommendation posture without escalating
into execution semantics.

### Expected Review Behavior

The review surface highlights risk, explains missing evidence if present, and
prepares the founder for a bounded decision rather than corrective action
execution.

### Evidence Required

- visible risk-sensitive rationale
- visible evidence summary, insufficiency marker, or stale marker as applicable
- visible non-executing recommendation notice

### Forbidden Behavior

- claiming the issue was fixed
- notifying customers
- dispatching a provider/channel message
- presenting autonomous company operation

### Pass Criteria

The review surface helps the founder understand the risk and next step while
remaining review-first and non-executing.

### Fail Criteria

The system overclaims resolution, implies execution occurred, or suppresses
risk posture.

## Founder request needs secretary handoff

### Scenario ID

`SCN-V1_1-FOUNDERS-03`

### User Situation

The founder request should visibly move from intake into Secretary handoff
space because the founder needs structured review context.

### Input Example

`Prepare a handoff packet for the retention issue in Cell 3 so I can review it before we do anything.`

### Expected Packet Behavior

The intake is converted into a bounded packet with traceable request identity,
handoff-ready posture, and staged visibility aligned with existing Secretary
assets.

### Expected Review Behavior

The founder sees the handoff staged first and then can inspect review-readiness
through the dedicated review surface without any dispatch control appearing.

### Evidence Required

- visible handoff-staged posture
- visible packet-state or review-readiness framing
- visible rationale/evidence chain reused from existing Secretary surfaces

### Forbidden Behavior

- creating a live queue dispatch
- direct cell execution
- approve/reject controls

### Pass Criteria

The founder can follow the request from intake into handoff staging and then
into review readiness as one coherent bounded loop.

### Fail Criteria

The handoff is missing, opaque, or rewritten as direct control.

## Founder request requires review before action

### Scenario ID

`SCN-V1_1-FOUNDERS-04`

### User Situation

The founder explicitly wants the system to prepare a decision surface before
any action is taken.

### Input Example

`Before we act on the partnership idea, assemble the evidence and show me the next step you recommend.`

### Expected Packet Behavior

The packet preserves the request as review-first, derives a bounded
recommendation posture, and keeps the loop below execution or approval.

### Expected Review Behavior

The review surface becomes the primary decision-preparation lane, showing
recommendation, rationale, and evidence posture while remaining non-executing.

### Evidence Required

- visible review-ready posture
- visible bounded action recommendation with non-executing notice
- visible rationale and evidence summary

### Forbidden Behavior

- acting on the partnership idea
- publishing or sending any message externally
- converting recommendation into approval workflow completion

### Pass Criteria

The founder receives a usable review/decision preparation surface with explicit
evidence-backed next-step framing.

### Fail Criteria

The founder is pushed past review into implied action or the recommendation is
not evidence-backed.

## Founder request asks for execution beyond V1.1 boundary

### Scenario ID

`SCN-V1_1-FOUNDERS-05`

### User Situation

The founder asks the system to do something that exceeds the V1.1 bounded
non-executing line.

### Input Example

`Send the apology email now, update the CRM, and queue the ops follow-up automatically.`

### Expected Packet Behavior

The request is still captured and may be packetized, but the packet must expose
that execution is outside the current boundary and keep the loop below provider,
channel, queue, and external action semantics.

### Expected Review Behavior

The review surface should explain the requested action, preserve the
non-executing boundary, and prepare the founder for a later explicit decision
outside the current V1.1 loop.

### Evidence Required

- visible boundary notice
- visible non-executing recommendation or blocked-by-boundary explanation
- visible preservation of the request text without fake execution status

### Forbidden Behavior

- sending the email
- updating the CRM
- queueing work for execution
- claiming protocol certification or autonomous operation

### Pass Criteria

The founder sees a truthful bounded review outcome that preserves the request
while refusing execution claims.

### Fail Criteria

The system implies the email was sent, the CRM was updated, or queue execution
was triggered.

## Decision

`V1_1_FIRST_USABLE_SCENARIO_PACK_OPENED`
