import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded action-intent truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.action_intents);
    assert.match(bootstrap.page.html, /Action Intents/u);
    assert.match(
      bootstrap.page.html,
      /Interaction boundary: interaction_scaffold_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Current continuity mode:/u
    );
    assert.match(
      bootstrap.page.html,
      /Available action intent: shift_task_focus -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Available action intent: apply_correction -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Current constraint: Provider-backed action execution is unavailable\./u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable action surface: Provider-backed execution -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred action item: provider_backed_action_execution/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_action_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_action_intent_execution"
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
