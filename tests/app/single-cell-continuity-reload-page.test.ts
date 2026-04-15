import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  applyUserCorrectionAndAssemble,
} from "../../projection/assembly/flow-assembly.ts";
import {
  createBaselineShell,
} from "../../app/shell/create-baseline-shell.ts";
import {
  loadBaselineShell,
} from "../../app/shell/load-baseline-shell.ts";
import {
  bootstrapSingleCellOperatorConsolePage,
  composeSingleCellOperatorConsoleBootstrapFromBaselineShellSession,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";
import {
  createSingleCellContinuityReference,
} from "../../app/shell/single-cell-continuity-reload-presentation.ts";

test("[app] single-cell operator console page exposes first-load and same-session continuity truth honestly", () => {
  const first_load_bootstrap = bootstrapSingleCellOperatorConsolePage();

  try {
    assert.ok(first_load_bootstrap.page.sections.continuity_reload);
    assert.match(first_load_bootstrap.page.html, /Continuity \/ Reload/u);
    assert.match(first_load_bootstrap.page.html, /Bootstrap mode: first_load/u);
    assert.match(
      first_load_bootstrap.page.html,
      /Continuity mode: memory_first_load/u
    );
    assert.match(
      first_load_bootstrap.page.html,
      /Same-session runtime context: false/u
    );

    const reference = createSingleCellContinuityReference(
      first_load_bootstrap.baseline_shell_session
    );

    applyUserCorrectionAndAssemble(
      first_load_bootstrap.baseline_shell_session.runtime,
      {
        project_id: first_load_bootstrap.baseline_shell_session.runtime.project_id,
        correction_source: "user",
        correction_target: "worker",
        correction_summary: "Carry continuity preference into the current session.",
        corrected_value: "carry-continuity-preference",
        worker_id:
          first_load_bootstrap.baseline_shell_session.runtime.seeded_ids.worker_ids
            .builder,
        preference_profile_id:
          first_load_bootstrap.baseline_shell_session.runtime.seeded_ids
            .preference_profile_id,
      }
    );

    const continued_shell = loadBaselineShell(
      first_load_bootstrap.baseline_shell_session.runtime
    );
    const continued_bootstrap =
      composeSingleCellOperatorConsoleBootstrapFromBaselineShellSession(
        continued_shell,
        {
          continuity: {
            presentation_state: "same_session_continued",
            reference,
          },
        }
      );

    assert.match(
      continued_bootstrap.page.html,
      /Bootstrap mode: same_session_continued/u
    );
    assert.match(
      continued_bootstrap.page.html,
      /Continuity mode: same_session_continued/u
    );
    assert.match(
      continued_bootstrap.page.html,
      /Same-session runtime context: true/u
    );
    assert.match(
      continued_bootstrap.page.html,
      /Fresh runtime context: false/u
    );
    assert.match(
      continued_bootstrap.page.html,
      /Preference continuity visible: true/u
    );
    assert.match(
      continued_bootstrap.page.html,
      /Objective anchor present: true/u
    );
    assert.ok(
      continued_bootstrap.page.non_claims.includes(
        "no_runtime_complete_workflow_resume"
      )
    );
  } finally {
    first_load_bootstrap.close();
  }
});

test("[app] single-cell operator console page exposes fresh sqlite reload continuity truth honestly", () => {
  const temp_root = mkdtempSync(
    join(tmpdir(), "solocrew-continuity-page-")
  );
  const sqlite_path = join(temp_root, "continuity-page.sqlite");

  try {
    const initial = createBaselineShell({
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    });
    const reference = createSingleCellContinuityReference(initial);
    initial.runtime.close();

    const reloaded = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });
    const reloaded_bootstrap =
      composeSingleCellOperatorConsoleBootstrapFromBaselineShellSession(
        reloaded,
        {
          template: "dev_delivery_pack",
          continuity: {
            presentation_state: "fresh_reload_resumed",
            reference,
          },
        }
      );

    assert.match(
      reloaded_bootstrap.page.html,
      /Bootstrap mode: fresh_reload_resumed/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Continuity mode: fresh_reload_resumed/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Fresh runtime context: true/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Objective anchor present: false/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Deferred continuity item: event_timeline_persistence/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Non-claim: no_full_event_timeline_persistence/u
    );

    reloaded_bootstrap.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
