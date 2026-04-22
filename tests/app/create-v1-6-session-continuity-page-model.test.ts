import assert from "node:assert/strict";
import test from "node:test";

import {
  createV16SessionContinuityPageModel,
} from "../../app/shell/create-v1-6-session-continuity-page-model.ts";
import {
  adapt_continuity_snapshot_projection,
  adapt_lifecycle_continuity_projection,
  adapt_pending_review_projection,
} from "../../projection/adapters/lifecycle-continuity-consumption-adapter.ts";
import {
  adapt_session_continuity_panel,
} from "../../projection/adapters/session-continuity-ux-adapter.ts";

function create_panel_view() {
  return adapt_session_continuity_panel({
    session_label: "current local continuity session",
    continuity_view: adapt_lifecycle_continuity_projection({
      project_id: "project-01",
      continuity_id: "continuity-01",
      lifecycle_stage: "continuity_visible",
      lifecycle_label: "session continuity visible",
      history_summary:
        "Continuity summary remains visible across local review passes.",
      review_posture: "review_only",
      non_executing_posture:
        "Continuity view remains review-only and non-executing.",
      safe_evidence_refs: ["ref-02", "ref-01"],
      runtime_private_fields_omitted: true,
    }),
    pending_review_view: adapt_pending_review_projection({
      project_id: "project-01",
      continuity_id: "continuity-01",
      lifecycle_stage: "pending_review_visible",
      lifecycle_label: "pending review visibility",
      history_summary:
        "Pending review visibility remains readable and below queue semantics.",
      pending_review_count: 2,
      pending_review_items: [
        {
          project_id: "project-01",
          continuity_id: "continuity-01",
          lifecycle_stage: "pending_review_visible",
          lifecycle_label: "review trail item visible",
          history_summary:
            "The first review trail item remains visible and review-only.",
          review_posture: "review_only",
          non_executing_posture:
            "Visible review item remains non-executing and not a queue.",
          safe_evidence_refs: ["ref-03"],
          runtime_private_fields_omitted: true,
        },
        {
          project_id: "project-01",
          continuity_id: "continuity-01",
          lifecycle_stage: "pending_review_visible",
          lifecycle_label: "review trail item visible",
          history_summary:
            "The second review trail item remains visible and review-only.",
          review_posture: "review_only",
          non_executing_posture:
            "Visible review item remains non-executing and not a queue.",
          safe_evidence_refs: ["ref-04"],
          runtime_private_fields_omitted: true,
        },
      ],
      review_posture: "review_only",
      non_executing_posture:
        "Pending review visibility remains non-executing and not a queue.",
      safe_evidence_refs: ["ref-05", "ref-01"],
      runtime_private_fields_omitted: true,
    }),
    continuity_snapshot_view: adapt_continuity_snapshot_projection({
      project_id: "project-01",
      continuity_id: "continuity-01",
      lifecycle_stage: "snapshot_visible",
      lifecycle_label: "continuity snapshot visible",
      history_summary:
        "Continuity snapshot remains bounded to projection-safe local display.",
      pending_review_count: 1,
      pending_review_items: [
        {
          project_id: "project-01",
          continuity_id: "continuity-01",
          lifecycle_stage: "pending_review_visible",
          lifecycle_label: "snapshot review visibility",
          history_summary:
            "Snapshot review visibility remains visible in read-only form.",
          review_posture: "review_only",
          non_executing_posture:
            "Snapshot review visibility remains non-executing and not a queue.",
          safe_evidence_refs: ["ref-06"],
          runtime_private_fields_omitted: true,
        },
      ],
      review_posture: "review_only",
      non_executing_posture:
        "Continuity snapshot remains non-executing and not dispatchable.",
      safe_evidence_refs: ["ref-07"],
      runtime_private_fields_omitted: true,
    }),
  });
}

test("[app] creates V1.6 session continuity page model", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.equal(model.session_label, "current local continuity session");
  assert.equal(model.runtime_private_fields_omitted, true);
});

test("[app] exposes session_continuity_summary", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.match(model.session_continuity_summary ?? "", /session continuity summary:/i);
});

test("[app] exposes local_history_timeline", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.match(model.local_history_timeline?.summary ?? "", /display-only/i);
  assert.equal(model.local_history_timeline?.items.length, 5);
});

test("[app] exposes review_trail_summary and review_trail_items", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.match(model.review_trail_summary ?? "", /review-only/i);
  assert.equal(model.review_trail_items?.length, 2);
});

test("[app] exposes continuity_replay_steps as display-only", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.equal(model.continuity_replay_steps?.length, 4);
  assert.match(model.continuity_replay_steps?.[0].non_executing_posture ?? "", /not execution replay/i);
});

test("[app] exposes pending_review_visibility", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.match(model.pending_review_visibility ?? "", /display-only/i);
  assert.match(model.pending_review_visibility ?? "", /not a queue/i);
});

test("[app] exposes continuity_snapshot_summary", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.match(model.continuity_snapshot_summary ?? "", /projection-safe local display/i);
});

test("[app] exposes safe_evidence_refs", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.deepEqual(model.safe_evidence_refs, [
    "ref-01",
    "ref-02",
    "ref-03",
    "ref-04",
    "ref-05",
    "ref-06",
    "ref-07",
  ]);
});

test("[app] exposes runtime_private_fields_omitted", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.equal(model.runtime_private_fields_omitted, true);
});

test("[app] exposes non_executing_posture", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.match(model.non_executing_posture ?? "", /non-executing/i);
  assert.match(model.non_executing_posture ?? "", /not execution replay/i);
});

test("[app] does not expose provider/channel execution claim", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());
  const copy_surface = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /provider\/channel execution available/i);
  assert.doesNotMatch(copy_surface, /provider sent/i);
});

test("[app] does not expose approve reject dispatch execute claim", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());
  const copy_surface = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /approved/i);
  assert.doesNotMatch(copy_surface, /approval granted/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /execution completed/i);
});

test("[app] does not expose founder queue claim", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.doesNotMatch(JSON.stringify(model), /founder queue/i);
});

test("[app] does not expose durable multi-session persistence claim", () => {
  const model = createV16SessionContinuityPageModel(create_panel_view());

  assert.doesNotMatch(JSON.stringify(model), /durable multi-session persistence/i);
  assert.doesNotMatch(JSON.stringify(model), /multi-session authoritative state/i);
});
