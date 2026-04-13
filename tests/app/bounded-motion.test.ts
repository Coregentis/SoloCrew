import test from "node:test";
import assert from "node:assert/strict";

import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";
import { assembleBoundedMotionView } from "../../projection/assembly/flow-assembly.ts";
import type { ExecutionRequestEnvelope } from "../../runtime-imports/cognitive-runtime.ts";

test("[app] bounded motion uses local fake handler and maps execution events into projection summaries", async () => {
  const session = createBaselineShell();
  const request: ExecutionRequestEnvelope = {
    request_id: "req-bounded-motion-001",
    bridge_kind: "agent",
    request_kind: "review",
    created_at: "2026-04-14T01:00:00.000Z",
    worker_ref: {
      worker_id: session.runtime.seeded_ids.worker_ids.builder,
      group_id: session.runtime.seeded_ids.group_id,
      role_profile_id: session.runtime.seeded_ids.role_profile_ids.builder,
    },
    context_ref: {
      project_id: session.runtime.project_id,
      objective_id: session.runtime.seeded_ids.objective_id,
      work_item_id: session.runtime.seeded_ids.work_item_ids[0],
      preference_profile_id: session.runtime.seeded_ids.preference_profile_id,
    },
    instruction_set: {
      task_brief: "Review the current projection assembly state.",
      constraints: ["bounded-runtime-only", "no-provider-bridge"],
      expected_artifacts: ["summary"],
    },
    metadata: {
      motion_mode: "bounded-local-fake",
    },
  };

  const motion = await assembleBoundedMotionView(session.runtime, request);

  assert.equal(motion.outcome.handler_id, "solocrew-local-fake-motion");
  assert.equal(motion.outcome.result.status, "completed");
  assert.deepEqual(
    motion.execution_events.map((event) => event.event_type),
    ["execution_requested", "execution_started", "execution_completed"]
  );
  assert.match(
    motion.crew_member.recent_action_summary ?? "",
    /Local fake motion completed/
  );
  assert.match(
    motion.work_item.last_update_summary ?? "",
    /Local fake motion completed/
  );
  assert.ok(
    motion.review_strip.moved_items.includes(
      session.runtime.seeded_ids.work_item_ids[0]
    )
  );
  assert.ok(
    motion.review_strip.needs_decision.includes(
      session.runtime.seeded_ids.objective_id
    )
  );
});
