import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded correction/review interaction truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.correction_review);
    assert.match(bootstrap.page.html, /Correction \/ Review/u);
    assert.match(
      bootstrap.page.html,
      /Interaction boundary: interaction_scaffold_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Suggested target scope: objective/u
    );
    assert.match(
      bootstrap.page.html,
      /Default review intent: tighten_scope/u
    );
    assert.match(
      bootstrap.page.html,
      /Target scope hint: objective -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Target scope hint: work-item -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Supported writeback hint: Preference writeback/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred review outcome: persistent_review_timeline/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_persistent_review_timeline/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes("no_channel_review_routing")
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
