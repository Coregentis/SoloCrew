import type {
  SoloCrewCgosReviewLoopAdapterInput,
  SoloCrewCgosReviewLoopAdapterResult,
} from "../../app/engagement/cgos-projection-safe-adapter-contract.ts";
import {
  create_cgos_projection_safe_adapter_input,
  create_solocrew_cgos_review_loop_adapter_result,
} from "../../app/engagement/cgos-projection-safe-adapter-workflow.ts";

export type CgosBackedEngagementLoopFixture = {
  fixture_id: string;
  fixture_kind: "cgos_backed_engagement_loop_adapter";
  cgos_adapter_input: SoloCrewCgosReviewLoopAdapterInput;
  adapter_result: SoloCrewCgosReviewLoopAdapterResult;
};

export function createCgosBackedEngagementLoopFixture():
  CgosBackedEngagementLoopFixture {
  const cgos_adapter_input = create_cgos_projection_safe_adapter_input({
    cgos_result_ref: "cgos-local-review-loop-result-fixture-01",
    cgos_projection_handoff_ref: "cgos-operator-review-loop-handoff-fixture-01",
    cgos_boundary_profile: {
      no_future_runtime_binding_promotion: true,
    },
    cgos_workspace: {
      workspace_id: "cgos-operator-workspace-fixture-01",
      session_refs: ["cgos-operator-session-fixture-01"],
      state_snapshot_ref: "cgos-state-snapshot-ref-fixture-01",
      evidence_refs: ["cgos-safe-evidence-ref-fixture-01"],
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_session: {
      session_id: "cgos-operator-session-fixture-01",
      workspace_ref: "cgos-operator-workspace-fixture-01",
      review_loop_ref: "cgos-review-loop-state-fixture-01",
      evidence_refs: ["cgos-safe-evidence-ref-fixture-01"],
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_loop_state: {
      loop_state_id: "cgos-review-loop-state-fixture-01",
      workspace_ref: "cgos-operator-workspace-fixture-01",
      session_ref: "cgos-operator-session-fixture-01",
      reviewed_step_refs: ["cgos-review-step-fixture-01"],
      blocked_step_refs: [],
      evidence_refs: ["cgos-safe-evidence-ref-fixture-01"],
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_runner: {
      runner_id: "cgos-review-loop-runner-fixture-01",
      loop_state_ref: "cgos-review-loop-state-fixture-01",
      step_refs: [
        {
          step_ref: "cgos-review-step-fixture-01",
          status: "reviewed",
        },
      ],
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_review_packet: {
      packet_id: "cgos-operator-review-packet-fixture-01",
      loop_state_ref: "cgos-review-loop-state-fixture-01",
      reviewed_step_refs: ["cgos-review-step-fixture-01"],
      blocked_step_refs: [],
      manual_decision_options: [
        "continue_review",
        "mark_blocked",
        "request_more_context",
      ],
      evidence_refs: ["cgos-safe-evidence-ref-fixture-01"],
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_evidence_ledger: {
      ledger_id: "cgos-session-evidence-ledger-fixture-01",
      session_ref: "cgos-operator-session-fixture-01",
      entry_refs: ["cgos-operator-entry-surface-fixture-01"],
      latest_packet_ref: "cgos-operator-review-packet-fixture-01",
      latest_bundle_ref: "cgos-deterministic-evidence-bundle-fixture-01",
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_evidence_bundle: {
      bundle_id: "cgos-deterministic-evidence-bundle-fixture-01",
      bundle_kind: "in_memory_evidence_bundle",
      ledger_ref: "cgos-session-evidence-ledger-fixture-01",
      packet_ref: "cgos-operator-review-packet-fixture-01",
      evidence_refs: ["cgos-safe-evidence-ref-fixture-01"],
      summary:
        "Projection-safe fixture evidence bundle summary for local adapter review.",
      projection_envelope_ref: "cgos-operator-review-loop-handoff-fixture-01",
    },
    cgos_omission_markers: [
      {
        marker: "cgos_fixture_uses_safe_refs_only",
        reason: "Fixture input preserves projection-safe omission posture.",
      },
    ],
    cgos_evidence_refs: ["cgos-safe-evidence-ref-fixture-01"],
    cgos_version_refs: {
      runtime_version_ref: "cgos-operator-review-loop-contract-16d559a",
    },
  });
  const adapter_result = create_solocrew_cgos_review_loop_adapter_result(
    cgos_adapter_input
  );

  return {
    fixture_id: "cgos-backed-engagement-loop-fixture-01",
    fixture_kind: "cgos_backed_engagement_loop_adapter",
    cgos_adapter_input,
    adapter_result,
  };
}
