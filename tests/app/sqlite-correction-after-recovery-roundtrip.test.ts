import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";
import { loadBaselineShell } from "../../app/shell/load-baseline-shell.ts";
import {
  applyUserCorrectionAndAssemble,
  assembleBoundedMotionView,
} from "../../projection/assembly/flow-assembly.ts";
import { load_work_item } from "../../projection/assembly/seed-baseline.ts";
import type { ExecutionRequestEnvelope } from "../../runtime-imports/cognitive-runtime.ts";

test("[app] sqlite correction-after-recovery roundtrip freezes fresh-session truth", async () => {
  const temp_root = mkdtempSync(
    join(tmpdir(), "solocrew-sqlite-correction-after-recovery-")
  );
  const sqlite_path = join(
    temp_root,
    "solocrew-correction-after-recovery.sqlite"
  );

  try {
    const initial = createBaselineShell({
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    });

    const failure_request: ExecutionRequestEnvelope = {
      request_id: "req-sqlite-correction-recovery-failure-001",
      bridge_kind: "agent",
      request_kind: "review",
      created_at: "2026-04-14T05:00:00.000Z",
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
        task_brief: "Force one failure before retry and correction.",
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

    assert.equal(blocked_worker?.status, "blocked");
    assert.equal(blocked_work_item?.status, "blocked");

    const recovery_request: ExecutionRequestEnvelope = {
      request_id: "req-sqlite-correction-recovery-success-001",
      bridge_kind: "agent",
      request_kind: "review",
      created_at: "2026-04-14T05:10:00.000Z",
      worker_ref: {
        worker_id: blocked_reload.runtime.seeded_ids.worker_ids.builder,
        group_id: blocked_reload.runtime.seeded_ids.group_id,
        role_profile_id: blocked_reload.runtime.seeded_ids.role_profile_ids.builder,
      },
      context_ref: {
        project_id: blocked_reload.runtime.project_id,
        objective_id: blocked_reload.runtime.seeded_ids.objective_id,
        work_item_id: blocked_reload.runtime.seeded_ids.work_item_ids[0],
        preference_profile_id:
          blocked_reload.runtime.seeded_ids.preference_profile_id,
      },
      instruction_set: {
        task_brief: "Retry bounded motion before user correction.",
        constraints: ["bounded-runtime-only", "no-provider-bridge"],
        expected_artifacts: ["summary"],
      },
    };

    const recovered_motion = await assembleBoundedMotionView(
      blocked_reload.runtime,
      recovery_request
    );
    assert.equal(recovered_motion.outcome.disposition, "success");

    const correction_result = applyUserCorrectionAndAssemble(
      blocked_reload.runtime,
      {
        project_id: blocked_reload.runtime.project_id,
        correction_source: "user",
        correction_target: "worker",
        correction_summary:
          "Prefer concise post-recovery builder updates with explicit blockers.",
        corrected_value: "concise-post-recovery-builder-updates",
        worker_id: blocked_reload.runtime.seeded_ids.worker_ids.builder,
        preference_profile_id:
          blocked_reload.runtime.seeded_ids.preference_profile_id,
      }
    );

    assert.equal(correction_result.writeback.disposition, "applied");
    assert.ok(
      correction_result.review_strip.changed_preferences.length > 0
    );
    assert.ok(
      correction_result.memory_summaries.some(
        (summary) =>
          summary.recent_correction_summary ===
          correction_result.correction.correction_summary
      )
    );

    blocked_reload.runtime.close();

    const final_reload = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });
    const final_worker = final_reload.runtime.worker_store.load(
      final_reload.runtime.seeded_ids.worker_ids.builder
    );
    const final_objective = final_reload.runtime.objective_store.load(
      final_reload.runtime.seeded_ids.objective_id
    );
    const final_work_item = load_work_item(
      final_reload.runtime.state_store,
      final_reload.runtime.seeded_ids.work_item_ids[0]
    );
    const final_preference_profile = final_reload.runtime.preference_store.load(
      final_reload.runtime.seeded_ids.preference_profile_id
    );
    const final_projection_member = final_reload.shell.crew_members.find(
      (member) =>
        member.crew_member_id ===
        final_reload.runtime.seeded_ids.worker_ids.builder
    );
    const final_projection_work_item = final_reload.shell.work_items.find(
      (work_item) =>
        work_item.work_item_id ===
        final_reload.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(final_reload.shell.crew.crew_id, initial.shell.crew.crew_id);
    assert.equal(
      final_reload.shell.objective.objective_id,
      initial.shell.objective.objective_id
    );
    assert.equal(
      final_projection_work_item?.work_item_id,
      initial.runtime.seeded_ids.work_item_ids[0]
    );

    assert.equal(final_worker?.status, "active");
    assert.equal(final_work_item?.status, "active");
    assert.ok(
      typeof final_objective?.mutation?.current_revision === "number"
    );
    assert.equal(
      final_preference_profile?.preference_summary,
      correction_result.correction.correction_summary
    );
    assert.ok(
      final_preference_profile?.preference_signals?.includes(
        correction_result.correction.corrected_value
      )
    );
    assert.ok(
      final_reload.shell.memory_summaries.some(
        (summary) =>
          summary.preference_summary ===
          correction_result.correction.correction_summary
      )
    );

    assert.equal(
      final_reload.shell.memory_summaries.some(
        (summary) =>
          summary.recent_correction_summary ===
          correction_result.correction.correction_summary
      ),
      false
    );
    assert.equal(final_projection_member?.recent_action_summary, undefined);
    assert.equal(final_projection_work_item?.last_update_summary, undefined);
    assert.deepEqual(final_reload.shell.review_strip.moved_items, []);
    assert.deepEqual(final_reload.shell.review_strip.needs_decision, []);
    assert.deepEqual(final_reload.shell.review_strip.changed_preferences, []);
    assert.equal(
      final_reload.shell.continuity.objective_anchor_compare.anchor_present,
      false
    );
    assert.ok(
      final_reload.shell.continuity.notes.includes(
        "Objective anchor was not captured in this runtime context."
      )
    );

    final_reload.runtime.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
