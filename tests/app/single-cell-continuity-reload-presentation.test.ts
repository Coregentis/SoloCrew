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
  assembleSingleCellContinuityReloadPresentation,
  createSingleCellContinuityReference,
} from "../../app/shell/single-cell-continuity-reload-presentation.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";

test("[app] single-cell continuity/reload presentation scaffold distinguishes first-load, same-session, and fresh-reload truth", () => {
  const first_load_session = createBaselineShell();
  const first_load_reference =
    createSingleCellContinuityReference(first_load_session);

  try {
    const first_load = assembleSingleCellContinuityReloadPresentation({
      baseline_shell_session: first_load_session,
      presentation_state: "first_load",
    });

    assert.equal(first_load.presentation_scope, "single_cell_only");
    assert.equal(first_load.operator_surface, "single_cell_console");
    assert.equal(
      first_load.execution_boundary,
      "presentation_scaffold_only"
    );
    assert.equal(first_load.bootstrap_mode, "first_load");
    assert.equal(first_load.continuity_mode, "memory_first_load");
    assert.equal(
      first_load.session_reload_distinction.is_first_load,
      true
    );
    assert.equal(
      first_load.session_reload_distinction.same_session_runtime_context,
      false
    );
    assert.equal(
      first_load.persisted_identity_continuity.previous_reference_available,
      false
    );

    applyUserCorrectionAndAssemble(first_load_session.runtime, {
      project_id: first_load_session.runtime.project_id,
      correction_source: "user",
      correction_target: "worker",
      correction_summary: "Keep continuity notes concise and visible.",
      corrected_value: "concise-visible-continuity",
      worker_id: first_load_session.runtime.seeded_ids.worker_ids.builder,
      preference_profile_id:
        first_load_session.runtime.seeded_ids.preference_profile_id,
    });

    const same_session_shell = loadBaselineShell(first_load_session.runtime);
    const same_session = assembleSingleCellContinuityReloadPresentation({
      baseline_shell_session: same_session_shell,
      presentation_state: "same_session_continued",
      reference: first_load_reference,
    });

    assert.equal(same_session.bootstrap_mode, "same_session_continued");
    assert.equal(same_session.continuity_mode, "same_session_continued");
    assert.equal(
      same_session.session_reload_distinction.same_session_runtime_context,
      true
    );
    assert.equal(
      same_session.session_reload_distinction.fresh_runtime_context,
      false
    );
    assert.equal(
      same_session.persisted_identity_continuity.crew_id_stable,
      true
    );
    assert.equal(
      same_session.persisted_work_objective_continuity.work_item_identity_stable,
      true
    );
    assert.equal(
      same_session.persisted_work_objective_continuity.objective_anchor_compare_available,
      true
    );
    assert.equal(
      same_session.persisted_work_objective_continuity.objective_anchor_present,
      true
    );
    assert.equal(
      same_session.persisted_work_objective_continuity.preference_continuity_visible,
      true
    );
    assert.ok(
      same_session.non_claims.includes("no_full_event_timeline_persistence")
    );

    const boundary_targets = [
      first_load,
      first_load.persisted_identity_continuity,
      first_load.persisted_work_objective_continuity,
      first_load.session_reload_distinction,
      same_session,
      same_session.persisted_identity_continuity,
      same_session.persisted_work_objective_continuity,
      same_session.session_reload_distinction,
    ];

    for (const target of boundary_targets) {
      for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
        assert.equal(field_name in target, false);
      }
    }
  } finally {
    first_load_session.runtime.close();
  }
});

test("[app] single-cell continuity/reload presentation scaffold keeps fresh sqlite reload truth honest", () => {
  const temp_root = mkdtempSync(
    join(tmpdir(), "solocrew-continuity-reload-")
  );
  const sqlite_path = join(temp_root, "continuity-reload.sqlite");

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
    const fresh_reload = assembleSingleCellContinuityReloadPresentation({
      baseline_shell_session: reloaded,
      presentation_state: "fresh_reload_resumed",
      reference,
    });

    assert.equal(fresh_reload.bootstrap_mode, "fresh_reload_resumed");
    assert.equal(fresh_reload.continuity_mode, "fresh_reload_resumed");
    assert.equal(
      fresh_reload.session_reload_distinction.fresh_runtime_context,
      true
    );
    assert.equal(
      fresh_reload.session_reload_distinction.same_session_runtime_context,
      false
    );
    assert.equal(
      fresh_reload.persisted_identity_continuity.crew_id_stable,
      true
    );
    assert.equal(
      fresh_reload.persisted_work_objective_continuity.work_item_identity_stable,
      true
    );
    assert.equal(
      fresh_reload.persisted_work_objective_continuity.objective_anchor_compare_available,
      true
    );
    assert.equal(
      fresh_reload.persisted_work_objective_continuity.objective_anchor_present,
      false
    );
    assert.ok(
      fresh_reload.persisted_work_objective_continuity.notes.some((note) =>
        /no anchor/u.test(note)
      )
    );
    assert.ok(
      fresh_reload.deferred_items.includes("event_timeline_persistence")
    );

    reloaded.runtime.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
