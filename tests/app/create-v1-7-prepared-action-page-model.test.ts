import assert from "node:assert/strict";
import test from "node:test";

import {
  createV17PreparedActionPageModel,
} from "../../app/shell/create-v1-7-prepared-action-page-model.ts";
import {
  adapt_v1_7_prepared_action_card,
} from "../../projection/adapters/v1-7-prepared-action-adapter.ts";

function create_view() {
  return adapt_v1_7_prepared_action_card({
    prepared_action_id: "prepared_action_01",
    project_id: "project-01",
    intent_summary: {
      action_label: "draft founder follow-up",
      action_summary:
        "Prepare a bounded founder-visible follow-up draft without taking action.",
      non_executing_posture:
        "Prepared action remains draft-only, projection-safe, and non-executing.",
    },
    risk_summary: {
      risk_summary: "Risk summary remains explanatory only.",
      boundary_summary:
        "Boundary summary remains below execution, approval, dispatch, provider/channel, and queue semantics.",
      non_executing_posture:
        "Prepared action remains draft-only, projection-safe, and non-executing.",
    },
    evidence_sufficiency: {
      sufficiency_state: "partial",
      sufficiency_summary:
        "Evidence sufficiency is partial and remains a bounded summary only.",
      runtime_private_fields_omitted: true,
    },
    missing_information: {
      missing_information_summary:
        "Missing information remains visible in bounded terms only.",
      missing_information_items: [
        "bounded operator clarification",
        "bounded follow-up context",
      ],
      runtime_private_fields_omitted: true,
    },
    confirmation_requirement: {
      confirmation_required: true,
      confirmation_summary:
        "Human confirmation requirement remains visible as a requirement summary only.",
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Prepared action remains draft-only, projection-safe, and non-executing.",
    },
    boundary_posture: {
      non_executing_posture:
        "Prepared action remains draft-only, projection-safe, and non-executing.",
      provider_channel_execution_available: false,
      approval_dispatch_execution_available: false,
      queue_available: false,
      runtime_private_fields_omitted: true,
    },
    safe_evidence_refs: [
      { evidence_ref: "ref-02" },
      { evidence_ref: "ref-01", evidence_label: "bounded evidence reference" },
    ],
    runtime_private_fields_omitted: true,
  });
}

test("[app] page model exposes all bounded V1.7 sections", () => {
  const model = createV17PreparedActionPageModel(create_view());

  assert.equal(model.prepared_action_card.prepared_action_id, "prepared_action_01");
  assert.equal(model.action_intent_summary.action_title, "draft founder follow-up");
  assert.equal(model.evidence_sufficiency_panel.sufficiency_state, "partial");
  assert.equal(
    model.missing_information_panel.missing_information_items.length,
    2
  );
  assert.match(
    model.risk_boundary_summary.risk_boundary_summary,
    /boundary summary/i
  );
  assert.equal(
    model.human_confirmation_requirement_display.confirmation_required,
    true
  );
});

test("[app] page model copy stays draft-only", () => {
  const model = createV17PreparedActionPageModel(create_view());

  assert.match(model.draft_only_posture ?? "", /draft-only/i);
  assert.match(model.draft_only_posture ?? "", /human-visible/i);
});

test("[app] page model copy stays non-executing", () => {
  const model = createV17PreparedActionPageModel(create_view());

  assert.match(model.non_executing_posture ?? "", /non-executing/i);
  assert.match(model.non_executing_posture ?? "", /non-approving/i);
  assert.match(model.non_executing_posture ?? "", /non-dispatching/i);
  assert.match(model.non_executing_posture ?? "", /non-provider/i);
  assert.match(model.non_executing_posture ?? "", /non-queueing/i);
});

test("[app] confirmation requirement remains display-only and non-approval-control", () => {
  const model = createV17PreparedActionPageModel(create_view());

  assert.match(
    model.human_confirmation_requirement_display.human_confirmation_requirement,
    /display-only requirement summary/i
  );
  assert.match(
    model.human_confirmation_requirement_display.human_confirmation_requirement,
    /not approval control/i
  );
});

test("[app] no dispatch or provider wording appears as available capability", () => {
  const model = createV17PreparedActionPageModel(create_view());
  const copy_surface = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /provider\/channel execution available/i);
  assert.doesNotMatch(copy_surface, /provider send available/i);
  assert.doesNotMatch(copy_surface, /channel publish available/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /execution ready/i);
});

test("[app] no founder queue or queue implementation capability wording appears", () => {
  const model = createV17PreparedActionPageModel(create_view());
  const copy_surface = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /queue implementation available/i);
  assert.doesNotMatch(copy_surface, /founder queue available/i);
  assert.doesNotMatch(copy_surface, /queue worker state/i);
});

test("[app] page model preserves safe evidence refs and omission marker", () => {
  const model = createV17PreparedActionPageModel(create_view());

  assert.deepEqual(model.safe_evidence_refs, ["ref-01", "ref-02"]);
  assert.equal(model.runtime_private_fields_omitted, true);
});
