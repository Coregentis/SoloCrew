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

test("[app] sqlite bounded motion roundtrip freezes fresh-session persistence truth", async () => {
  const temp_root = mkdtempSync(
    join(tmpdir(), "solocrew-sqlite-bounded-motion-")
  );
  const sqlite_path = join(temp_root, "solocrew-bounded-motion.sqlite");

  try {
    const initial = createBaselineShell({
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    });

    const request: ExecutionRequestEnvelope = {
      request_id: "req-sqlite-bounded-motion-001",
      bridge_kind: "agent",
      request_kind: "review",
      created_at: "2026-04-14T02:00:00.000Z",
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
        task_brief: "Persist one bounded motion result into sqlite-backed state.",
        constraints: ["bounded-runtime-only", "no-provider-bridge"],
        expected_artifacts: ["summary"],
      },
    };

    const in_session_motion = await assembleBoundedMotionView(
      initial.runtime,
      request
    );
    const in_session_objective = initial.runtime.objective_store.load(
      initial.runtime.seeded_ids.objective_id
    );
    const in_session_work_item = load_work_item(
      initial.runtime.state_store,
      initial.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(in_session_motion.outcome.result.status, "completed");
    assert.ok(in_session_objective);
    assert.ok(in_session_work_item);
    assert.equal(in_session_work_item?.status, "active");
    assert.equal(
      typeof in_session_objective?.mutation?.current_revision,
      "number"
    );
    initial.runtime.close();

    const fresh_reload = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });
    const reloaded_objective = fresh_reload.runtime.objective_store.load(
      fresh_reload.runtime.seeded_ids.objective_id
    );
    const reloaded_work_item = load_work_item(
      fresh_reload.runtime.state_store,
      fresh_reload.runtime.seeded_ids.work_item_ids[0]
    );
    const reloaded_builder = fresh_reload.shell.crew_members.find(
      (member) =>
        member.crew_member_id === fresh_reload.runtime.seeded_ids.worker_ids.builder
    );
    const reloaded_projection_work_item = fresh_reload.shell.work_items.find(
      (work_item) =>
        work_item.work_item_id === fresh_reload.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(
      fresh_reload.shell.crew.crew_id,
      initial.shell.crew.crew_id
    );
    assert.equal(
      fresh_reload.shell.objective.objective_id,
      initial.shell.objective.objective_id
    );
    assert.equal(
      reloaded_projection_work_item?.work_item_id,
      initial.runtime.seeded_ids.work_item_ids[0]
    );

    assert.ok(reloaded_work_item);
    assert.equal(reloaded_work_item?.status, "active");
    assert.ok(reloaded_objective);
    assert.equal(
      reloaded_objective?.mutation?.current_revision,
      in_session_objective?.mutation?.current_revision
    );
    assert.equal(
      reloaded_objective?.temporal?.event_time,
      in_session_objective?.temporal?.event_time
    );

    assert.equal(
      fresh_reload.shell.continuity.objective_anchor_compare.anchor_present,
      false
    );
    assert.equal(reloaded_builder?.recent_action_summary, undefined);
    assert.equal(
      reloaded_projection_work_item?.last_update_summary,
      undefined
    );
    assert.deepEqual(fresh_reload.shell.review_strip.moved_items, []);
    assert.deepEqual(fresh_reload.shell.review_strip.needs_decision, []);
    assert.ok(
      fresh_reload.shell.continuity.notes.includes(
        "Objective anchor was not captured in this runtime context."
      )
    );

    fresh_reload.runtime.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
