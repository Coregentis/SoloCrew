import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded correction/apply truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
    session_draft_state: {
      correction_text_draft_value:
        "Prefer one tighter objective summary before the next review cycle.",
      selected_action_intent_draft_value: "apply_correction",
    },
    correction_apply: {
      apply_now: true,
      target_scope: "objective",
    },
  });

  try {
    assert.ok(bootstrap.page.sections.correction_apply);
    assert.match(bootstrap.page.html, /Correction Apply/u);
    assert.match(
      bootstrap.page.html,
      /Apply boundary: console_apply_path_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Apply status: applied_in_session/u
    );
    assert.match(
      bootstrap.page.html,
      /Selected target scope: objective/u
    );
    assert.match(
      bootstrap.page.html,
      /Correction summary source: correction_text_draft/u
    );
    assert.match(
      bootstrap.page.html,
      /Corrected value source: selected_action_intent_draft/u
    );
    assert.match(
      bootstrap.page.html,
      /Writeback disposition: applied/u
    );
    assert.match(
      bootstrap.page.html,
      /Updated preference continuity visible: true/u
    );
    assert.match(
      bootstrap.page.html,
      /Updated recent correction visible in session: true/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable apply surface: Provider-backed correction apply -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred apply item: persistent_review_timeline/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_correction_apply_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_runtime_complete_correction_apply_workflow"
      )
    );
    assert.equal(bootstrap.actual_provider_actions_present, false);
    assert.equal(bootstrap.actual_channel_entry_present, false);
    assert.equal(
      bootstrap.multi_cell_portfolio_behavior_available,
      false
    );
    assert.equal(bootstrap.secretary_behavior_available, false);
  } finally {
    bootstrap.close();
  }
});
