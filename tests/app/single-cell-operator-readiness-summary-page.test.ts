import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded readiness summary truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
    session_draft_state: {
      objective_note_draft_value: "Keep this proof tightly scoped to the current objective.",
      selected_action_intent_draft_value: "request_review",
    },
  });

  try {
    assert.ok(bootstrap.page.sections.readiness_summary);
    assert.match(bootstrap.page.html, /Readiness Summary/u);
    assert.match(
      bootstrap.page.html,
      /Readiness boundary: summary_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Overall readiness level: ready_with_known_gaps/u
    );
    assert.match(
      bootstrap.page.html,
      /Current focus readiness: ready_now via task_focus/u
    );
    assert.match(
      bootstrap.page.html,
      /Request-package readiness: ready_with_known_gaps via request_package/u
    );
    assert.match(
      bootstrap.page.html,
      /Review\/preview readiness: ready_with_known_gaps via request_review_submit_preview/u
    );
    assert.match(
      bootstrap.page.html,
      /Delivery-acceptance readiness: ready_now via delivery_acceptance/u
    );
    assert.match(
      bootstrap.page.html,
      /In-session draft readiness: ready_now via in_session_draft_state/u
    );
    assert.match(
      bootstrap.page.html,
      /Readiness blocker: selected_action_intent_confirmation -&gt; missing_input \(Operator confirmation of selected action intent\) via request_review_submit_preview/u
    );
    assert.match(
      bootstrap.page.html,
      /Readiness blocker: one_click_request_preview_promotion -&gt; unavailable_surface \(One-click request preview promotion\) via session_draft_controls/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred readiness item: one_click_request_preview_promotion/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_readiness_summary/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes("no_actual_readiness_execution")
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
