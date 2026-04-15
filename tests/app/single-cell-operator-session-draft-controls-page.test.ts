import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded session-draft controls truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
    session_draft_state: {
      objective_note_draft_value: "Keep this draft focused on the current delivery proof.",
      selected_action_intent_draft_value: "request_review",
    },
  });

  try {
    assert.ok(bootstrap.page.sections.session_draft_controls);
    assert.match(bootstrap.page.html, /Session Draft Controls/u);
    assert.match(
      bootstrap.page.html,
      /Control boundary: control_scaffold_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Keep draft hint: available_now via in_session_draft_state/u
    );
    assert.match(
      bootstrap.page.html,
      /Clear draft hint: available_now via in_session_draft_state/u
    );
    assert.match(
      bootstrap.page.html,
      /Promote-to-request-preview hint: available_as_seed_hint via request_review_submit_preview/u
    );
    assert.match(
      bootstrap.page.html,
      /Draft completeness hint: session_drafts_have_operator_input/u
    );
    assert.match(
      bootstrap.page.html,
      /Operator-authored draft present: true/u
    );
    assert.match(
      bootstrap.page.html,
      /Control dependency: Operator confirmation of selected action intent/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable draft control surface: One-click request preview promotion -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred draft control item: one_click_request_preview_promotion/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_session_draft_control_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_actual_request_preview_seed_promotion"
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
