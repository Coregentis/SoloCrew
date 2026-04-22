import assert from "node:assert/strict";
import test from "node:test";

import {
  adapt_continuity_snapshot_projection,
  adapt_lifecycle_continuity_projection,
  adapt_pending_review_projection,
} from "../../projection/adapters/lifecycle-continuity-consumption-adapter.ts";
import {
  adapt_continuity_replay_steps,
  adapt_local_history_timeline,
  adapt_review_trail,
  adapt_session_continuity_panel,
} from "../../projection/adapters/session-continuity-ux-adapter.ts";

function create_lifecycle_view() {
  return adapt_lifecycle_continuity_projection({
    project_id: "project-01",
    continuity_id: "continuity-01",
    lifecycle_stage: "continuity_visible",
    lifecycle_label: "session continuity visible",
    history_summary:
      "Continuity summary remains visible across local review passes.",
    evidence_gap_summary:
      "Evidence gap: confirm the last bounded continuity context before the next review pass.",
    review_posture: "review_only",
    non_executing_posture:
      "Continuity view remains review-only and non-executing.",
    safe_evidence_refs: ["ref-02", "ref-01"],
    runtime_private_fields_omitted: true,
  });
}

function create_pending_review_view() {
  return adapt_pending_review_projection({
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
    evidence_gap_summary:
      "Evidence gap: clarify the bounded review context before the next pass.",
    review_posture: "review_only",
    non_executing_posture:
      "Pending review visibility remains non-executing and not a queue.",
    safe_evidence_refs: ["ref-05", "ref-01"],
    runtime_private_fields_omitted: true,
  });
}

function create_snapshot_view() {
  return adapt_continuity_snapshot_projection({
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
    evidence_gap_summary:
      "Evidence gap: snapshot remains bounded to safe continuity summary text.",
    review_posture: "review_only",
    non_executing_posture:
      "Continuity snapshot remains non-executing and not dispatchable.",
    safe_evidence_refs: ["ref-07"],
    runtime_private_fields_omitted: true,
  });
}

function create_input() {
  return {
    session_label: "current local continuity session",
    continuity_view: create_lifecycle_view(),
    pending_review_view: create_pending_review_view(),
    continuity_snapshot_view: create_snapshot_view(),
  };
}

test("[projection] adapts valid session continuity panel", () => {
  const result = adapt_session_continuity_panel(create_input());

  assert.equal(result.project_id, "project-01");
  assert.equal(result.continuity_id, "continuity-01");
  assert.equal(result.session_label, "current local continuity session");
  assert.match(result.continuity_summary, /session continuity summary:/i);
  assert.match(result.continuity_summary, /session continuity visible/i);
  assert.equal(result.runtime_private_fields_omitted, true);
});

test("[projection] adapts local history timeline", () => {
  const result = adapt_local_history_timeline(create_input());

  assert.equal(result.local_history_items.length, 5);
  assert.match(result.history_summary, /display-only/i);
  assert.match(result.non_executing_posture, /non-executing/i);
});

test("[projection] adapts review trail in review-only terms", () => {
  const result = adapt_review_trail(create_input());

  assert.equal(result.review_trail_items.length, 2);
  assert.equal(result.pending_review_count, 2);
  assert.match(result.history_summary, /display-only/i);
  assert.match(result.pending_review_visibility ?? "", /not a queue/i);
});

test("[projection] adapts continuity replay steps as guided display only", () => {
  const result = adapt_continuity_replay_steps(create_input());

  assert.equal(result.length, 4);
  assert.match(result[0].history_summary, /guided display step/i);
  assert.match(result[0].non_executing_posture, /not execution replay/i);
  assert.match(result[1].history_summary, /display-only/i);
});

test("[projection] preserves safe_evidence_refs", () => {
  const result = adapt_session_continuity_panel(create_input());

  assert.deepEqual(result.safe_evidence_refs, [
    "ref-01",
    "ref-02",
    "ref-03",
    "ref-04",
    "ref-05",
    "ref-06",
    "ref-07",
  ]);
});

test("[projection] requires project_id", () => {
  assert.throws(
    () =>
      adapt_session_continuity_panel({
        session_label: "current local continuity session",
      }),
    /project_id is required/
  );
});

test("[projection] requires runtime_private_fields_omitted true", () => {
  assert.throws(
    () =>
      adapt_session_continuity_panel({
        ...create_input(),
        continuity_view: {
          ...create_lifecycle_view(),
          runtime_private_fields_omitted: false,
        },
      }),
    /runtime_private_fields_omitted must be true/
  );
});

test("[projection] rejects raw runtime-private fields recursively", () => {
  assert.throws(
    () =>
      adapt_session_continuity_panel({
        ...create_input(),
        nested: {
          raw_vsl: { forbidden: true },
          raw_psg: { forbidden: true },
          raw_trace: { forbidden: true },
        },
      } as unknown as ReturnType<typeof create_input>),
    /forbidden runtime-private field: raw_vsl/
  );
});

test("[projection] rejects execution fields recursively", () => {
  assert.throws(
    () =>
      adapt_local_history_timeline({
        ...create_input(),
        nested: {
          provider_channel_result: "forbidden",
          dispatch_result: "forbidden",
          approval_result: "forbidden",
          execution_result: "forbidden",
        },
      } as unknown as ReturnType<typeof create_input>),
    /forbidden execution field: dispatch_result/
  );
});

test("[projection] rejects queue fields recursively", () => {
  assert.throws(
    () =>
      adapt_review_trail({
        ...create_input(),
        nested: {
          queue_worker_state: "forbidden",
        },
      } as unknown as ReturnType<typeof create_input>),
    /forbidden queue field: queue_worker_state/
  );
});

test("[projection] does not expose durable multi-session persistence claim", () => {
  const result = adapt_session_continuity_panel(create_input());
  const copy_surface = JSON.stringify(result);

  assert.doesNotMatch(copy_surface, /durable multi-session persistence/i);
  assert.doesNotMatch(copy_surface, /multi-session authoritative state/i);
});

test("[projection] does not expose execution approval dispatch or queue claims", () => {
  const panel = adapt_session_continuity_panel(create_input());
  const history = adapt_local_history_timeline(create_input());
  const review = adapt_review_trail(create_input());
  const replay = adapt_continuity_replay_steps(create_input());
  const copy_surface = JSON.stringify({
    panel,
    history,
    review,
    replay,
  });

  assert.doesNotMatch(copy_surface, /provider\/channel execution/i);
  assert.doesNotMatch(copy_surface, /approve/i);
  assert.doesNotMatch(copy_surface, /reject/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /execution completed/i);
  assert.doesNotMatch(copy_surface, /founder queue/i);
});
