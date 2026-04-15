import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded input-draft truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.input_drafts);
    assert.match(bootstrap.page.html, /Input Drafts/u);
    assert.match(
      bootstrap.page.html,
      /Draft boundary: draft_scaffold_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Current acceptance status:/u
    );
    assert.match(
      bootstrap.page.html,
      /Draft slot: objective_note_draft -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Draft slot: selected_action_intent_draft -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Action-intent draft option: shift_task_focus -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable input surface: Provider-backed input submission -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred input item: persistent_input_draft_history/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_input_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_input_submission"
      )
    );
    assert.equal(bootstrap.actual_provider_actions_present, false);
    assert.equal(bootstrap.actual_channel_entry_present, false);
    assert.equal(bootstrap.multi_cell_portfolio_behavior_available, false);
    assert.equal(bootstrap.secretary_behavior_available, false);
  } finally {
    bootstrap.close();
  }
});
