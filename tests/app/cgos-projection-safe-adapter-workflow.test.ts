import assert from "node:assert/strict";
import test from "node:test";

import {
  create_cgos_adapter_candidate_set,
  create_cgos_projection_safe_adapter_input,
  create_solocrew_cgos_review_loop_adapter_result,
  summarize_solocrew_cgos_adapter_result,
  translate_cgos_runtime_boundary_profile,
} from "../../app/engagement/cgos-projection-safe-adapter-workflow.ts";

test("[cgos adapter] structural projection-safe input can be adapted", () => {
  const input = create_cgos_projection_safe_adapter_input();
  const result = create_solocrew_cgos_review_loop_adapter_result(input);

  assert.equal(result.status, "adapter_ready");
  assert.equal(result.cgos_result_ref, input.cgos_result_ref);
  assert.equal(
    result.projection_safe_handoff_ref,
    input.cgos_projection_handoff_ref
  );
  assert.equal(
    result.engagement_workspace_candidate.workspace_id,
    input.cgos_workspace.workspace_id
  );
  assert.equal(
    result.engagement_session_candidate.session_id,
    input.cgos_session.session_id
  );
  assert.equal(
    result.engagement_loop_state_candidate.loop_state_id,
    input.cgos_loop_state.loop_state_id
  );
  assert.equal(
    result.founder_review_packet_candidate.packet_id,
    input.cgos_review_packet.packet_id
  );
  assert.equal(
    result.engagement_session_export_package_candidate.export_kind,
    "in_memory_export_object"
  );
});

test("[cgos adapter] missing required refs produce blocked adapter result", () => {
  const result = create_solocrew_cgos_review_loop_adapter_result({
    cgos_result_ref: "",
    cgos_projection_handoff_ref: "",
    cgos_workspace: {
      workspace_id: "",
      session_refs: [],
      state_snapshot_ref: "",
      projection_envelope_ref: "",
    },
    cgos_runner: {
      runner_id: "",
      loop_state_ref: "",
      step_refs: [],
      projection_envelope_ref: "",
    },
    cgos_evidence_bundle: {
      bundle_id: "",
      ledger_ref: "",
      packet_ref: "",
      evidence_refs: [],
      summary: "",
      projection_envelope_ref: "",
    },
    cgos_omission_markers: [],
    cgos_evidence_refs: [],
  });

  assert.equal(result.status, "blocked");
  assert.match(result.adapter_summary, /blocked/u);
  assert.equal(result.engagement_session_candidate.status, "blocked");
  assert.equal(result.founder_review_packet_candidate.status, "blocked");
  assert.equal(result.engagement_history_ledger_candidate.status, "blocked");
  assert.equal(
    result.engagement_session_export_package_candidate.status,
    "blocked"
  );
});

test("[cgos adapter] blocked CGOS posture is preserved", () => {
  const result = create_solocrew_cgos_review_loop_adapter_result({
    cgos_loop_state: {
      status: "blocked",
      blocked_step_refs: ["cgos-blocked-step-01"],
    },
    cgos_runner: {
      step_refs: [
        {
          step_ref: "cgos-blocked-step-01",
          status: "blocked",
        },
      ],
    },
  });

  assert.equal(result.status, "blocked");
  assert.equal(result.engagement_loop_runner_candidate.run.status, "blocked");
  assert.equal(
    result.engagement_loop_runner_candidate.steps.some(
      (step) => step.status === "blocked"
    ),
    true
  );
});

test("[cgos adapter] boundary flags translate and unmatched CGOS flags are preserved", () => {
  const translation = translate_cgos_runtime_boundary_profile({
    local_only: true,
    manual_first: true,
    review_only: true,
    deterministic: true,
    non_executing: true,
    runtime_private_payload_omitted: true,
    projection_safe: true,
    no_external_service: true,
    no_filesystem_write: true,
    no_database_storage: true,
    no_persistence_adapter: true,
    no_file_export_path: true,
    no_cloud_sync: true,
    no_provider_dispatch: true,
    no_channel_dispatch: true,
    no_marketplace: true,
    no_crm: true,
    no_email_dispatch: true,
    no_public_publishing: true,
    no_payment: true,
    no_llm_or_tool_invocation: true,
    no_autonomy: true,
    no_package_publish: true,
    no_certification_or_endorsement: true,
    no_future_runtime_binding_promotion: true,
  });

  assert.equal(translation.translated_flags.no_file_system_write, true);
  assert.equal(
    translation.translated_flags.no_mplp_certification_or_endorsement,
    true
  );
  assert.equal(
    translation.unmatched_cgos_flags.includes(
      "no_future_runtime_binding_promotion"
    ),
    true
  );
  assert.equal(
    translation.preserved_unmatched_cgos_flags
      .no_future_runtime_binding_promotion,
    true
  );
});

test("[cgos adapter] candidate helper and summary helper are deterministic surfaces", () => {
  const input = create_cgos_projection_safe_adapter_input();
  const candidates = create_cgos_adapter_candidate_set(input);
  const summary = summarize_solocrew_cgos_adapter_result({
    status: "adapter_ready",
    cgos_result_ref: input.cgos_result_ref,
  });

  assert.equal(
    candidates.engagement_workspace_candidate.workspace_id,
    input.cgos_workspace.workspace_id
  );
  assert.match(summary, /ready/u);
});
