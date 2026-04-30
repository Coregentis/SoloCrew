import type {
  CommercialMode,
  EngagementStage,
} from "../../app/engagement/engagement-canonical-contract.ts";
import type {
  EngagementEntryWorkspaceResult,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  create_local_engagement_workspace_from_entry,
  load_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import type {
  EngagementLoopRunnerResult,
} from "../../app/engagement/engagement-loop-runner-contract.ts";
import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import type {
  FounderReviewPacketResult,
} from "../../app/engagement/founder-review-packet-contract.ts";
import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import type {
  EngagementSessionHistoryResult,
} from "../../app/engagement/engagement-session-history-contract.ts";
import {
  create_engagement_session_history_from_packet,
} from "../../app/engagement/engagement-session-history-workflow.ts";
import type {
  EngagementWorkspaceBundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";
import {
  create_engagement_workspace_bundle,
} from "../../app/engagement/engagement-workspace-workflow.ts";

export type DeliverableEngagementLoopFixtureInput = {
  fixture_id?: string;
  workspace_id?: string;
  session_id?: string;
  loop_state_id?: string;
  history_record_id?: string;
  engagement_ref?: string;
  participant_refs?: string[];
  operator_ref?: string;
  surface_create_id?: string;
  surface_load_id?: string;
  runner_id?: string;
  run_id?: string;
  packet_id?: string;
  ledger_id?: string;
  export_id?: string;
  started_at?: string;
  loaded_at?: string;
  reviewed_at?: string;
  history_created_at?: string;
  current_stage?: EngagementStage;
  commercial_mode?: CommercialMode;
  onboarding_packet_ref?: string;
  readiness_ref?: string;
  evidence_refs?: string[];
  review_gate_refs?: string[];
  outcome_review_ref?: string;
  support_burden_ref?: string;
  event_summary?: string;
};

export type DeliverableEngagementLoopFixture = {
  fixture_id: string;
  fixture_kind: "deliverable_engagement_loop_e2e";
  workspace_bundle: EngagementWorkspaceBundle;
  create_result: EngagementEntryWorkspaceResult;
  load_result: EngagementEntryWorkspaceResult;
  loop_result: EngagementLoopRunnerResult;
  packet_result: FounderReviewPacketResult;
  history_result: EngagementSessionHistoryResult;
  boundary_flags: EngagementSessionHistoryResult["boundary_flags"];
};

function resolve_input(input: DeliverableEngagementLoopFixtureInput) {
  return {
    fixture_id:
      input.fixture_id ?? "deliverable-engagement-loop-v3-0-fixture",
    workspace_id:
      input.workspace_id ?? "deliverable-engagement-workspace-v3-0-e2e",
    session_id: input.session_id ?? "deliverable-engagement-session-v3-0-e2e",
    loop_state_id:
      input.loop_state_id ?? "deliverable-engagement-loop-state-v3-0-e2e",
    history_record_id:
      input.history_record_id ??
      "deliverable-engagement-history-record-v3-0-e2e",
    engagement_ref:
      input.engagement_ref ?? "deliverable-engagement-v3-0-e2e",
    participant_refs: [
      ...(input.participant_refs ?? [
        "engagement-participant-founder",
        "engagement-participant-design-partner",
      ]),
    ],
    operator_ref: input.operator_ref ?? "engagement-participant-founder",
    surface_create_id:
      input.surface_create_id ??
      "deliverable-engagement-entry-surface-v3-0-create",
    surface_load_id:
      input.surface_load_id ??
      "deliverable-engagement-entry-surface-v3-0-load",
    runner_id:
      input.runner_id ?? "deliverable-engagement-loop-runner-v3-0-review",
    run_id: input.run_id ?? "deliverable-engagement-loop-run-v3-0-review",
    packet_id:
      input.packet_id ?? "deliverable-engagement-founder-packet-v3-0",
    ledger_id:
      input.ledger_id ?? "deliverable-engagement-history-ledger-v3-0",
    export_id:
      input.export_id ?? "deliverable-engagement-session-export-v3-0",
    started_at: input.started_at ?? "2026-04-30T16:10:00.000Z",
    loaded_at: input.loaded_at ?? "2026-04-30T16:15:00.000Z",
    reviewed_at: input.reviewed_at ?? "2026-04-30T16:20:00.000Z",
    history_created_at:
      input.history_created_at ?? "2026-04-30T16:30:00.000Z",
    current_stage: input.current_stage ?? "onboarding",
    commercial_mode: input.commercial_mode ?? "manual_paid_pilot",
    onboarding_packet_ref:
      input.onboarding_packet_ref ??
      "deliverable-engagement-onboarding-packet-v3-0",
    readiness_ref:
      input.readiness_ref ?? "deliverable-engagement-readiness-v3-0",
    evidence_refs: [
      ...(input.evidence_refs ?? [
        "deliverable-engagement-evidence-v3-0-feedback",
      ]),
    ],
    review_gate_refs: [
      ...(input.review_gate_refs ?? [
        "deliverable-engagement-review-gate-v3-0-manual",
      ]),
    ],
    outcome_review_ref:
      input.outcome_review_ref ??
      "deliverable-engagement-outcome-review-v3-0",
    support_burden_ref:
      input.support_burden_ref ??
      "deliverable-engagement-support-burden-v3-0",
    event_summary:
      input.event_summary ??
      "Deliverable engagement loop local workspace created for E2E review.",
  };
}

export function createDeliverableEngagementLoopFixture(
  input: DeliverableEngagementLoopFixtureInput = {}
): DeliverableEngagementLoopFixture {
  const resolved = resolve_input(input);
  const workspace_bundle = create_engagement_workspace_bundle({
    workspace_id: resolved.workspace_id,
    session_id: resolved.session_id,
    loop_state_id: resolved.loop_state_id,
    history_record_id: resolved.history_record_id,
    engagement_ref: resolved.engagement_ref,
    participant_refs: [...resolved.participant_refs],
    operator_ref: resolved.operator_ref,
    started_at: resolved.started_at,
    current_stage: resolved.current_stage,
    commercial_mode: resolved.commercial_mode,
    onboarding_packet_ref: resolved.onboarding_packet_ref,
    readiness_ref: resolved.readiness_ref,
    evidence_refs: [...resolved.evidence_refs],
    review_gate_refs: [...resolved.review_gate_refs],
    outcome_review_ref: resolved.outcome_review_ref,
    support_burden_ref: resolved.support_burden_ref,
    event_summary: resolved.event_summary,
  });
  const create_result = create_local_engagement_workspace_from_entry({
    surface_id: resolved.surface_create_id,
    workspace_id: resolved.workspace_id,
    session_id: resolved.session_id,
    loop_state_id: resolved.loop_state_id,
    history_record_id: resolved.history_record_id,
    engagement_ref: resolved.engagement_ref,
    participant_refs: [...resolved.participant_refs],
    operator_ref: resolved.operator_ref,
    started_at: resolved.started_at,
    current_stage: resolved.current_stage,
    commercial_mode: resolved.commercial_mode,
    onboarding_packet_ref: resolved.onboarding_packet_ref,
    readiness_ref: resolved.readiness_ref,
    evidence_refs: [...resolved.evidence_refs],
    review_gate_refs: [...resolved.review_gate_refs],
    outcome_review_ref: resolved.outcome_review_ref,
    support_burden_ref: resolved.support_burden_ref,
    event_summary: resolved.event_summary,
  });
  const load_result = load_local_engagement_workspace_from_entry({
    surface_id: resolved.surface_load_id,
    loaded_at: resolved.loaded_at,
    operator_ref: resolved.operator_ref,
    workspace_bundle,
  });
  const loop_result = run_local_engagement_loop_review({
    runner_id: resolved.runner_id,
    run_id: resolved.run_id,
    result_id: `${resolved.run_id}:result`,
    reviewed_at: resolved.reviewed_at,
    entry_workspace_result: load_result,
  });
  const packet_result = create_founder_review_packet_from_loop_result({
    packet_id: resolved.packet_id,
    result_id: `${resolved.packet_id}:result`,
    loop_result,
  });
  const history_result = create_engagement_session_history_from_packet({
    ledger_id: resolved.ledger_id,
    export_id: resolved.export_id,
    result_id: `${resolved.ledger_id}:result`,
    created_at: resolved.history_created_at,
    packet_result,
  });

  return {
    fixture_id: resolved.fixture_id,
    fixture_kind: "deliverable_engagement_loop_e2e",
    workspace_bundle,
    create_result,
    load_result,
    loop_result,
    packet_result,
    history_result,
    boundary_flags: history_result.boundary_flags,
  };
}

export function createV30DeliverableEngagementLoopFixture(
  input: DeliverableEngagementLoopFixtureInput = {}
) {
  return createDeliverableEngagementLoopFixture(input);
}
