import type {
  Engagement,
  EngagementParticipant,
} from "../../app/engagement/engagement-canonical-contract.ts";
import {
  V3_0_WORKSPACE_SOURCE_METADATA,
} from "../../app/engagement/engagement-workspace-contract.ts";
import {
  create_engagement_workspace_bundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";

const PARTICIPANTS: EngagementParticipant[] = [
  {
    participant_id: "engagement-participant-founder",
    display_name: "Founder Operator",
    role: "founder",
  },
  {
    participant_id: "engagement-participant-design-partner",
    display_name: "Design Partner",
    role: "design_partner",
  },
] as const;

const ENGAGEMENT: Engagement = {
  engagement_id: "engagement-v3-0-local-workspace",
  stage: "onboarding",
  commercial_mode: "manual_paid_pilot",
  participant_ids: PARTICIPANTS.map((participant) => participant.participant_id),
  metadata: V3_0_WORKSPACE_SOURCE_METADATA,
};

export function createEngagementWorkspaceFixture() {
  const bundle = create_engagement_workspace_bundle({
    workspace_id: "engagement-workspace-v3-0-local",
    session_id: "engagement-session-v3-0-local",
    loop_state_id: "engagement-loop-state-v3-0-local",
    history_record_id: "engagement-history-v3-0-workspace-created",
    engagement: ENGAGEMENT,
    operator_ref: "engagement-participant-founder",
    started_at: "2026-04-30T09:00:00.000Z",
    onboarding_packet_ref: "engagement-onboarding-packet-v3-0-local",
    readiness_ref: "engagement-readiness-view-v3-0-local",
    evidence_refs: ["engagement-evidence-v3-0-local-feedback"],
    review_gate_refs: ["engagement-review-gate-v3-0-local-manual"],
    outcome_review_ref: "engagement-outcome-review-v3-0-local",
    support_burden_ref: "engagement-support-burden-v3-0-local",
    event_summary:
      "Deterministic local workspace fixture created through product constructors.",
  });

  return {
    fixture_id: "engagement-workspace-v3-0-fixture",
    fixture_kind: "engagement_workspace_contract",
    v2_5_stable_baseline: {
      tag: V3_0_WORKSPACE_SOURCE_METADATA.baseline_release_ref,
      target_commit: V3_0_WORKSPACE_SOURCE_METADATA.baseline_commit_ref,
    },
    participants: PARTICIPANTS.map((participant) => ({ ...participant })),
    engagement: {
      ...ENGAGEMENT,
      participant_ids: [...ENGAGEMENT.participant_ids],
      metadata: { ...ENGAGEMENT.metadata },
    },
    workspace: bundle.workspace,
    session: bundle.session,
    loop_state: bundle.loop_state,
    history_records: bundle.history_records,
    boundary_flags: bundle.workspace.boundary_flags,
  } as const;
}

export function createV30EngagementWorkspaceFixture() {
  return createEngagementWorkspaceFixture();
}
