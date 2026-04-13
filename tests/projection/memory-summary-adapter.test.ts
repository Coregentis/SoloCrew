import test from "node:test";
import assert from "node:assert/strict";

import { adaptMemorySummary } from "../../projection/adapters/memory-summary-adapter.ts";
import { seedBaselineState } from "../../projection/assembly/seed-baseline.ts";

test("[projection] memory-profile and preference-profile adapt to MemorySummary with bounded correction signal", () => {
  const runtime = seedBaselineState();
  const memory_profile = runtime.memory_store.list(runtime.project_id)[0];

  assert.ok(memory_profile);

  const correction = runtime.correction_capture.capture({
    project_id: runtime.project_id,
    correction_source: "user",
    correction_target: "worker",
    correction_summary: "Prefer shorter builder updates with explicit blockers.",
    corrected_value: "shorter-builder-updates",
    worker_id: runtime.seeded_ids.worker_ids.builder,
    preference_profile_id: runtime.seeded_ids.preference_profile_id,
  });

  const writeback = runtime.preference_writeback.writeback({
    correction,
  });
  const preference_profile = runtime.preference_store.load(
    runtime.seeded_ids.preference_profile_id
  );

  assert.equal(writeback.disposition, "applied");
  assert.ok(preference_profile);

  const summary = adaptMemorySummary({
    memory_profile,
    preference_profile,
    corrections: [correction],
  });

  assert.equal(summary.object_type, "memory-summary");
  assert.equal(
    summary.recent_correction_summary,
    correction.correction_summary
  );
  assert.equal(
    summary.preference_summary,
    preference_profile.preference_summary
  );
  assert.equal(
    "autonomous_learning_status" in summary,
    false
  );
  assert.ok(
    summary.upstream_refs.some(
      (ref) => ref.upstream_object_type === "correction-capture"
    )
  );
});
