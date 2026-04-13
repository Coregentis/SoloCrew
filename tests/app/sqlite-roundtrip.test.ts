import test from "node:test";
import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";

import { createBaselineShell } from "../../app/shell/create-baseline-shell.ts";
import { loadBaselineShell } from "../../app/shell/load-baseline-shell.ts";
import { applyUserCorrectionAndAssemble } from "../../projection/assembly/flow-assembly.ts";

test("[app] sqlite roundtrip preserves baseline identity and persisted preference continuity", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-sqlite-roundtrip-"));
  const sqlite_path = join(temp_root, "solocrew-baseline.sqlite");

  try {
    const initial = createBaselineShell({
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    });
    initial.runtime.close();

    const first_reload = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });

    assert.equal(first_reload.shell.crew.crew_id, initial.shell.crew.crew_id);
    assert.equal(
      first_reload.shell.objective.objective_id,
      initial.shell.objective.objective_id
    );
    assert.ok(first_reload.shell.memory_summaries.length >= 1);

    const correction_result = applyUserCorrectionAndAssemble(
      first_reload.runtime,
      {
        project_id: first_reload.runtime.project_id,
        correction_source: "user",
        correction_target: "worker",
        correction_summary: "Persist concise continuity-first updates.",
        corrected_value: "concise-continuity-first",
        worker_id: first_reload.runtime.seeded_ids.worker_ids.builder,
        preference_profile_id:
          first_reload.runtime.seeded_ids.preference_profile_id,
      }
    );

    assert.equal(correction_result.writeback.disposition, "applied");
    first_reload.runtime.close();

    const second_reload = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });

    assert.equal(
      second_reload.shell.crew.crew_id,
      initial.shell.crew.crew_id
    );
    assert.equal(
      second_reload.shell.objective.objective_id,
      initial.shell.objective.objective_id
    );
    assert.ok(
      second_reload.shell.memory_summaries.some(
        (summary) =>
          summary.preference_summary ===
          correction_result.correction.correction_summary
      )
    );
    second_reload.runtime.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
