import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded request-package truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.request_package);
    assert.match(bootstrap.page.html, /Request Package/u);
    assert.match(
      bootstrap.page.html,
      /Package boundary: request_package_scaffold_only/u
    );
    assert.match(bootstrap.page.html, /Request package id:/u);
    assert.match(bootstrap.page.html, /Package fields present:/u);
    assert.match(
      bootstrap.page.html,
      /Selected action intent: request_review -&gt;/u
    );
    assert.match(bootstrap.page.html, /confirmed=false/u);
    assert.match(
      bootstrap.page.html,
      /Correction\/review target: objective -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Delivery acceptance status: criteria_visible_ready_for_bounded_review/u
    );
    assert.match(
      bootstrap.page.html,
      /Packaged input draft: objective_note_draft -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable request surface: Provider-backed request submission -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred request item: persistent_request_package_history/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_request_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_request_submission"
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
