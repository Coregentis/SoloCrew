import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

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

test("[app] fresh sqlite reload after console-side correction/apply stays honest", () => {
  const temp_root = mkdtempSync(
    join(tmpdir(), "solocrew-console-correction-apply-")
  );
  const sqlite_path = join(
    temp_root,
    "solocrew-console-correction-apply.sqlite"
  );

  try {
    const initial = createBaselineShell({
      session: {
        mode: "sqlite",
        sqlite_path,
      },
    });
    const bootstrap = bootstrapSingleCellOperatorConsolePage({
      baseline_shell_session: initial,
      session_draft_state: {
        correction_text_draft_value:
          "Prefer bounded objective corrections that persist as preference truth.",
        selected_action_intent_draft_value: "apply_correction",
      },
      correction_apply: {
        apply_now: true,
        target_scope: "objective",
      },
    });
    const reference = createSingleCellContinuityReference(
      bootstrap.baseline_shell_session
    );

    assert.equal(
      bootstrap.correction_apply_scaffold.current_apply_status,
      "applied_in_session"
    );

    bootstrap.close();

    const reloaded = loadBaselineShell({
      mode: "sqlite",
      sqlite_path,
    });
    const reloaded_bootstrap =
      composeSingleCellOperatorConsoleBootstrapFromBaselineShellSession(
        reloaded,
        {
          continuity: {
            presentation_state: "fresh_reload_resumed",
            reference,
          },
        }
      );

    assert.equal(
      reloaded_bootstrap.correction_apply_scaffold.current_apply_status,
      "blocked_missing_operator_input"
    );
    assert.equal(
      reloaded_bootstrap.correction_apply_scaffold.current_visible_truth.current_preference_continuity_visible,
      true
    );
    assert.equal(
      reloaded_bootstrap.correction_apply_scaffold.current_visible_truth.current_recent_correction_visible,
      false
    );
    assert.equal(
      reloaded_bootstrap.correction_apply_scaffold.current_visible_truth.current_review_strip_changed_preferences_count,
      0
    );
    assert.equal(
      reloaded_bootstrap.correction_apply_scaffold.applied_update_result,
      undefined
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Apply status: blocked_missing_operator_input/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Current preference continuity visible: true/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Current recent correction visible: false/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Deferred apply item: fresh_reload_session_draft_restore/u
    );
    assert.match(
      reloaded_bootstrap.page.html,
      /Non-claim: no_persistent_correction_apply_timeline/u
    );
    assert.equal(
      reloaded_bootstrap.actual_provider_actions_present,
      false
    );
    assert.equal(
      reloaded_bootstrap.actual_channel_entry_present,
      false
    );
    assert.equal(
      reloaded_bootstrap.multi_cell_portfolio_behavior_available,
      false
    );
    assert.equal(
      reloaded_bootstrap.secretary_behavior_available,
      false
    );

    reloaded_bootstrap.close();
  } finally {
    rmSync(temp_root, {
      recursive: true,
      force: true,
    });
  }
});
