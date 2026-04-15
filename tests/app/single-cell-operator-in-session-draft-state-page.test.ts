import assert from "node:assert/strict";
import test from "node:test";

import {
  bootstrapSingleCellOperatorConsolePage,
} from "../../app/shell/single-cell-operator-console-bootstrap.ts";

test("[app] single-cell operator console page exposes bounded in-session draft-state truth honestly", () => {
  const bootstrap = bootstrapSingleCellOperatorConsolePage({
    template: "dev_delivery_pack",
    session_draft_state: {
      objective_note_draft_value: "Keep the operator note short and specific.",
      selected_action_intent_draft_value: "request_review",
    },
  });

  try {
    assert.ok(bootstrap.page.sections.in_session_draft_state);
    assert.match(bootstrap.page.html, /In-Session Draft State/u);
    assert.match(
      bootstrap.page.html,
      /Session-draft boundary: session_state_only/u
    );
    assert.match(
      bootstrap.page.html,
      /Draft completeness status: session_drafts_have_operator_input/u
    );
    assert.match(
      bootstrap.page.html,
      /Draft emptiness state: some_operator_input_present/u
    );
    assert.match(
      bootstrap.page.html,
      /Objective note draft value: present_in_session via bootstrap_session_override value=Keep the operator note short and specific\./u
    );
    assert.match(
      bootstrap.page.html,
      /Selected action intent draft value: present_in_session via bootstrap_session_override value=request_review/u
    );
    assert.match(
      bootstrap.page.html,
      /Current submit dependency: Operator confirmation of selected action intent/u
    );
    assert.match(
      bootstrap.page.html,
      /Unavailable session draft surface: Fresh-reload session draft restore -&gt;/u
    );
    assert.match(
      bootstrap.page.html,
      /Deferred session draft item: fresh_reload_session_draft_restore/u
    );
    assert.match(
      bootstrap.page.html,
      /Non-claim: no_runtime_complete_session_draft_workflow/u
    );
    assert.ok(
      bootstrap.page.non_claims.includes(
        "no_fresh_reload_session_draft_restore"
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
