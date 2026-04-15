import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded task-focus interaction truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.task_focus);
    assert.match(bootstrap.page.html, /Task Focus/u);
    assert.match(
      bootstrap.page.html,
      /Interaction boundary: interaction_scaffold_only/u
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
      /Available focus target: work-item -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Focus-switch intent: work-item -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Next-focus preview: work-item -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred focus item: persistent_focus_switch_timeline/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_persistent_focus_timeline/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_focus_switch"
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
