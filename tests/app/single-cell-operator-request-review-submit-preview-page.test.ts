import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded request review / submit-preview truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
  });

  try {
    assert.ok(bootstrap.page.sections.request_review_submit_preview);
    assert.match(
      bootstrap.page.html,
      /Request Review \/ Submit Preview/u
    );
    assert.match(
      bootstrap.page.html,
      /Preview boundary: submit_preview_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Reviewability status: review_ready_now/u
    );
    assert.match(
      bootstrap.page.html,
      /Previewability status: preview_ready_now/u
    );
    assert.match(bootstrap.page.html, /Incomplete request: true/u);
    assert.match(
      bootstrap.page.html,
      /Submit-preview status: preview_ready_submit_unavailable/u
    );
    assert.match(
      bootstrap.page.html,
      /Completeness signal: selected_action_intent_confirmation -&gt; missing_now/u
    );
    assert.match(
      bootstrap.page.html,
      /Missing\/deferred request field: operator_input_payload -&gt; missing_now/u
    );
    assert.match(
      bootstrap.page.html,
      /Future submit dependency: Operator confirmation of selected action intent/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable submit surface: Provider-backed request submission -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred submit-preview item: persistent_request_package_history/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_request_submit_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes("no_actual_request_submission")
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
