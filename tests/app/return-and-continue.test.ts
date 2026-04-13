import test from "node:test";
import assert from "node:assert/strict";

import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";
import { loadBaselineShell } from "../../app/shell/load-baseline-shell.ts";
import { applyUserCorrectionAndAssemble } from "../../projection/assembly/flow-assembly.ts";

test("[app] return-and-continue reloads the same state and surfaces anchor comparison", () => {
  const session = createBaselineShell();
  const correction_result = applyUserCorrectionAndAssemble(session.runtime, {
    project_id: session.runtime.project_id,
    correction_source: "user",
    correction_target: "worker",
    correction_summary: "Keep builder updates concise and continuity-first.",
    corrected_value: "concise-continuity-first",
    worker_id: session.runtime.seeded_ids.worker_ids.builder,
    preference_profile_id: session.runtime.seeded_ids.preference_profile_id,
  });

  const loaded = loadBaselineShell(session.runtime);
  const preference_profile = session.runtime.preference_store.load(
    session.runtime.seeded_ids.preference_profile_id
  );

  assert.equal(loaded.crew.crew_id, session.shell.crew.crew_id);
  assert.equal(
    loaded.objective.objective_id,
    session.shell.objective.objective_id
  );
  assert.equal(loaded.continuity.objective_anchor_compare?.anchor_present, true);
  assert.equal(
    preference_profile?.preference_summary,
    correction_result.correction.correction_summary
  );
  assert.ok(
    loaded.memory_summaries.some(
      (summary) =>
        summary.recent_correction_summary ===
        correction_result.correction.correction_summary
    )
  );
});
