import assert from "node:assert/strict";
import test from "node:test";

import {
  create_cgos_projection_safe_adapter_input,
  create_solocrew_cgos_review_loop_adapter_result,
} from "../../app/engagement/cgos-projection-safe-adapter-workflow.ts";
import {
  createDeliverableEngagementLoopFixture,
} from "../../projection/fixtures/v3-0-deliverable-engagement-loop-fixture.ts";

test("[cgos adapter] repeated adapter construction is deterministic", () => {
  const input = create_cgos_projection_safe_adapter_input({
    cgos_workspace: {
      evidence_refs: ["z-ref", "a-ref", "a-ref"],
    },
    cgos_evidence_refs: ["z-ref", "a-ref", "a-ref"],
  });
  const first = create_solocrew_cgos_review_loop_adapter_result(input);
  const second = create_solocrew_cgos_review_loop_adapter_result(input);

  assert.deepEqual(first, second);
  assert.deepEqual(first.engagement_loop_state_candidate.evidence_refs, [
    "a-ref",
    "z-ref",
  ]);
});

test("[cgos adapter] adapter helpers do not mutate caller input", () => {
  const input = create_cgos_projection_safe_adapter_input({
    cgos_runner: {
      step_refs: [
        { step_ref: "step-b", status: "reviewed" },
        { step_ref: "step-a", status: "pending" },
      ],
    },
    cgos_evidence_refs: ["evidence-b", "evidence-a"],
  });
  const before = JSON.parse(JSON.stringify(input));

  create_solocrew_cgos_review_loop_adapter_result(input);

  assert.deepEqual(input, before);
});

test("[cgos adapter] existing V3.0 local fixture remains unchanged", () => {
  const before = createDeliverableEngagementLoopFixture();

  create_solocrew_cgos_review_loop_adapter_result();

  const after = createDeliverableEngagementLoopFixture();

  assert.deepEqual(after, before);
  assert.equal(after.history_result.export_package.export_kind, "in_memory_export_object");
  assert.equal(after.history_result.export_package.status, "ready_for_local_review");
});
