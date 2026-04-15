import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded state transition truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.state_transition);
    assert.match(bootstrap.page.html, /State Transition/u);
    assert.match(
      bootstrap.page.html,
      /Transition boundary: state_transition_scaffold_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Current objective focus:/u
    );
    assert.match(
      bootstrap.page.html,
      /Current work-item focus:/u
    );
    assert.match(
      bootstrap.page.html,
      /Transition option: work_item_focus_change -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Transition option: correction_target_scope_change -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Next-state preview: work_item_focus_change -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred transition item: state_transition_event_timeline_persistence/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_persistent_transition_timeline/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_transition_action"
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
