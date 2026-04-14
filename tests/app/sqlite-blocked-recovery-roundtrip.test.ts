import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";
import { loadBaselineShell } from "../../app/shell/load-baseline-shell.ts";
import { assembleBoundedMotionView } from "../../projection/assembly/flow-assembly.ts";
import { load_work_item } from "../../projection/assembly/seed-baseline.ts";
import type { ExecutionRequestEnvelope } from "../../runtime-imports/cognitive-runtime.ts";

test("[app] sqlite blocked recovery roundtrip freezes fresh-session truth", async () => {
  const temp_root = mkdtempSync(
    join(tmpdir(), "solocrew-sqlite-blocked-recovery-")
  );
  const sqlite_path = join(temp_root, "solocrew-blocked-recovery.sqlite");

  try {
    const initial = createBaselineShell({
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    });

    const failure_request: ExecutionRequestEnvelope = {
      request_id: "req-sqlite-blocked-recovery-failure-001",
      bridge_kind: "agent",
      request_kind: "review",
      created_at: "2026-04-14T04:00:00.000Z",
      worker_ref: {
        worker_id: initial.runtime.seeded_ids.worker_ids.builder,
        group_id: initial.runtime.seeded_ids.group_id,
        role_profile_id: initial.runtime.seeded_ids.role_profile_ids.builder,
      },
      context_ref: {
        project_id: initial.runtime.project_id,
        objective_id: initial.runtime.seeded_ids.objective_id,
        work_item_id: initial.runtime.seeded_ids.work_item_ids[0],
        preference_profile_id: initial.runtime.seeded_ids.preference_profile_id,
      },
      instruction_set: {
        task_brief: "Force one bounded motion failure before recovery.",
        constraints: ["bounded-runtime-only", "no-provider-bridge"],
        expected_artifacts: ["failure-surface"],
      },
      metadata: {
        force_failure: true,
      },
    };

    const failed_motion = await assembleBoundedMotionView(
      initial.runtime,
      failure_request
    );

    assert.equal(failed_motion.outcome.disposition, "failure");
    assert.equal(failed_motion.outcome.result.status, "failed");
    initial.runtime.close();

    const blocked_reload = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });
    const blocked_worker = blocked_reload.runtime.worker_store.load(
      blocked_reload.runtime.seeded_ids.worker_ids.builder
    );
    const blocked_work_item = load_work_item(
      blocked_reload.runtime.state_store,
      blocked_reload.runtime.seeded_ids.work_item_ids[0]
    );
    const blocked_projection_member = blocked_reload.shell.crew_members.find(
      (member) =>
        member.crew_member_id ===
        blocked_reload.runtime.seeded_ids.worker_ids.builder
    );
    const blocked_projection_work_item = blocked_reload.shell.work_items.find(
      (work_item) =>
        work_item.work_item_id ===
        blocked_reload.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(blocked_reload.shell.crew.crew_id, initial.shell.crew.crew_id);
    assert.equal(
      blocked_reload.shell.objective.objective_id,
      initial.shell.objective.objective_id
    );
    assert.equal(blocked_work_item?.status, "blocked");
    assert.equal(blocked_worker?.status, "blocked");
    assert.equal(blocked_projection_member?.status, "blocked");
    assert.equal(blocked_projection_member?.recent_action_summary, undefined);
    assert.equal(
      blocked_projection_work_item?.last_update_summary,
      undefined
    );
    assert.deepEqual(blocked_reload.shell.review_strip.moved_items, []);
    assert.deepEqual(blocked_reload.shell.review_strip.needs_decision, []);
    assert.equal(
      blocked_reload.shell.continuity.objective_anchor_compare.anchor_present,
      false
    );

    const recovery_request: ExecutionRequestEnvelope = {
      request_id: "req-sqlite-blocked-recovery-success-001",
      bridge_kind: "agent",
      request_kind: "review",
      created_at: "2026-04-14T04:10:00.000Z",
      worker_ref: {
        worker_id: blocked_reload.runtime.seeded_ids.worker_ids.builder,
        group_id: blocked_reload.runtime.seeded_ids.group_id,
        role_profile_id: blocked_reload.runtime.seeded_ids.role_profile_ids.builder,
      },
      context_ref: {
        project_id: blocked_reload.runtime.project_id,
        objective_id: blocked_reload.runtime.seeded_ids.objective_id,
        work_item_id: blocked_reload.runtime.seeded_ids.work_item_ids[0],
        preference_profile_id: blocked_reload.runtime.seeded_ids.preference_profile_id,
      },
      instruction_set: {
        task_brief: "Retry bounded motion using the existing success path.",
        constraints: ["bounded-runtime-only", "no-provider-bridge"],
        expected_artifacts: ["summary"],
      },
    };

    const recovered_motion = await assembleBoundedMotionView(
      blocked_reload.runtime,
      recovery_request
    );
    const recovered_worker_in_session = blocked_reload.runtime.worker_store.load(
      blocked_reload.runtime.seeded_ids.worker_ids.builder
    );
    const recovered_work_item_in_session = load_work_item(
      blocked_reload.runtime.state_store,
      blocked_reload.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(recovered_motion.outcome.disposition, "success");
    assert.equal(recovered_motion.outcome.result.status, "completed");
    assert.equal(recovered_worker_in_session?.status, "active");
    assert.equal(recovered_work_item_in_session?.status, "active");
    assert.match(
      recovered_motion.crew_member.recent_action_summary ?? "",
      /Local fake motion completed/
    );
    assert.match(
      recovered_motion.work_item.last_update_summary ?? "",
      /Local fake motion completed/
    );

    blocked_reload.runtime.close();

    const recovered_reload = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });
    const recovered_worker = recovered_reload.runtime.worker_store.load(
      recovered_reload.runtime.seeded_ids.worker_ids.builder
    );
    const recovered_objective = recovered_reload.runtime.objective_store.load(
      recovered_reload.runtime.seeded_ids.objective_id
    );
    const recovered_work_item = load_work_item(
      recovered_reload.runtime.state_store,
      recovered_reload.runtime.seeded_ids.work_item_ids[0]
    );
    const recovered_projection_member = recovered_reload.shell.crew_members.find(
      (member) =>
        member.crew_member_id ===
        recovered_reload.runtime.seeded_ids.worker_ids.builder
    );
    const recovered_projection_work_item = recovered_reload.shell.work_items.find(
      (work_item) =>
        work_item.work_item_id ===
        recovered_reload.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(
      recovered_reload.shell.crew.crew_id,
      initial.shell.crew.crew_id
    );
    assert.equal(
      recovered_reload.shell.objective.objective_id,
      initial.shell.objective.objective_id
    );
    assert.equal(recovered_work_item?.status, "active");
    assert.equal(recovered_worker?.status, "active");
    assert.equal(recovered_projection_member?.status, "active");
    assert.ok(
      typeof recovered_objective?.mutation?.current_revision === "number"
    );

    assert.equal(recovered_projection_member?.recent_action_summary, undefined);
    assert.equal(
      recovered_projection_work_item?.last_update_summary,
      undefined
    );
    assert.deepEqual(recovered_reload.shell.review_strip.moved_items, []);
    assert.deepEqual(recovered_reload.shell.review_strip.needs_decision, []);
    assert.equal(
      recovered_reload.shell.continuity.objective_anchor_compare.anchor_present,
      false
    );
    assert.ok(
      recovered_reload.shell.continuity.notes.includes(
        "Objective anchor was not captured in this runtime context."
      )
    );

    recovered_reload.runtime.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
