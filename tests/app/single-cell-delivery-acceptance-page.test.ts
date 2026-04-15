import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded delivery acceptance truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.delivery_acceptance);
    assert.match(bootstrap.page.html, /Delivery Acceptance/u);
    assert.match(
      bootstrap.page.html,
      /Acceptance boundary: acceptance_scaffold_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Delivery acceptance status:/u
    );
    assert.match(
      bootstrap.page.html,
      /Acceptance criterion: delivery_target_visible -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Completed acceptance signal: delivery_contract_summary_visible -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Delivery acceptance status: criteria_visible_ready_for_bounded_review/u
    );
    assert.match(
      bootstrap.page.html,
      /Open acceptance signal: delivery_acceptance_workflow_runtime -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable acceptance surface: Provider-backed acceptance verification -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred acceptance item: delivery_acceptance_workflow_runtime/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_acceptance_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_provider_backed_acceptance_verification"
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
