import assert from "node:assert/strict";
import test from "node:test";

import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_STAGE_VALUES,
} from "../../app/engagement/engagement-canonical-contract.ts";
import type {
  CommercialMode,
  Engagement,
  EngagementStage,
} from "../../app/engagement/engagement-canonical-contract.ts";
import {
  ENGAGEMENT_HISTORY_EVENT_KIND_VALUES,
  ENGAGEMENT_HISTORY_RECORD_FIELD_NAMES,
  ENGAGEMENT_LOOP_STATE_FIELD_NAMES,
  ENGAGEMENT_SESSION_FIELD_NAMES,
  ENGAGEMENT_SESSION_STATUS_VALUES,
  ENGAGEMENT_WORKSPACE_BOUNDARY_FLAG_NAMES,
  ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS,
  ENGAGEMENT_WORKSPACE_FIELD_NAMES,
  V3_0_WORKSPACE_SOURCE_METADATA,
} from "../../app/engagement/engagement-workspace-contract.ts";
import {
  create_engagement_workspace,
} from "../../app/engagement/engagement-workspace-workflow.ts";

test("[v3.0] engagement workspace contract exports stable field sets", () => {
  assert.deepEqual(ENGAGEMENT_WORKSPACE_FIELD_NAMES, [
    "workspace_id",
    "engagement_ref",
    "participant_refs",
    "current_stage",
    "commercial_mode",
    "loop_state_ref",
    "history_refs",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_SESSION_FIELD_NAMES, [
    "session_id",
    "workspace_ref",
    "operator_ref",
    "started_at",
    "status",
    "current_stage",
    "source_metadata",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_LOOP_STATE_FIELD_NAMES, [
    "loop_state_id",
    "engagement_ref",
    "stage",
    "readiness_ref",
    "onboarding_packet_ref",
    "evidence_refs",
    "review_gate_refs",
    "outcome_review_ref",
    "support_burden_ref",
    "boundary_flags",
  ]);
  assert.deepEqual(ENGAGEMENT_HISTORY_RECORD_FIELD_NAMES, [
    "history_record_id",
    "workspace_ref",
    "session_ref",
    "event_kind",
    "event_summary",
    "source_refs",
    "created_at",
    "boundary_flags",
  ]);
});

test("[v3.0] engagement workspace contract exposes required statuses and event kinds", () => {
  assert.deepEqual(ENGAGEMENT_SESSION_STATUS_VALUES, [
    "draft",
    "active",
    "review_ready",
    "closed",
    "blocked",
  ]);
  assert.deepEqual(ENGAGEMENT_HISTORY_EVENT_KIND_VALUES, [
    "workspace_created",
    "session_started",
    "stage_changed",
    "onboarding_attached",
    "evidence_attached",
    "readiness_view_attached",
    "review_gate_attached",
    "outcome_review_attached",
    "support_burden_attached",
    "founder_review_requested",
    "session_closed",
    "blocked",
  ]);
});

test("[v3.0] engagement workspace contract preserves required boundary flags", () => {
  assert.deepEqual(ENGAGEMENT_WORKSPACE_BOUNDARY_FLAG_NAMES, [
    "local_only",
    "manual_first",
    "review_only",
    "deterministic",
    "non_executing",
    "no_external_service",
    "no_payment",
    "no_crm",
    "no_publishing",
    "no_llm_or_tool_invocation",
    "no_autonomy",
    "no_package_publish",
    "no_public_beta",
    "no_commercial_readiness_claim",
    "no_production_readiness_claim",
    "no_mplp_certification_or_endorsement",
  ]);

  for (const flag of ENGAGEMENT_WORKSPACE_BOUNDARY_FLAG_NAMES) {
    assert.equal(ENGAGEMENT_WORKSPACE_BOUNDARY_FLAGS[flag], true);
  }
});

test("[v3.0] engagement workspace contract composes V2.5 canonical types", () => {
  const stage: EngagementStage = ENGAGEMENT_STAGE_VALUES[2];
  const commercial_mode: CommercialMode = COMMERCIAL_MODE_VALUES[1];
  const engagement: Engagement = {
    engagement_id: "engagement-v3-0-contract-canonical",
    stage,
    commercial_mode,
    participant_ids: ["participant-founder", "participant-reviewer"],
    metadata: V3_0_WORKSPACE_SOURCE_METADATA,
  };

  const workspace = create_engagement_workspace({
    workspace_id: "workspace-v3-0-contract-canonical",
    engagement,
    loop_state_ref: "loop-state-v3-0-contract-canonical",
  });

  assert.equal(workspace.engagement_ref, engagement.engagement_id);
  assert.equal(workspace.current_stage, "onboarding");
  assert.equal(workspace.commercial_mode, "manual_paid_pilot");
  assert.deepEqual(workspace.participant_refs, [
    "participant-founder",
    "participant-reviewer",
  ]);
  assert.equal(
    workspace.source_metadata.baseline_release_ref,
    "solocrew-v2.5-stable-semantic-stabilization-20260429"
  );
});
