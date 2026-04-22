import assert from "node:assert/strict";
import test from "node:test";

import {
  adapt_continuity_snapshot_projection,
  adapt_lifecycle_continuity_projection,
  adapt_pending_review_projection,
} from "../../projection/adapters/lifecycle-continuity-consumption-adapter.ts";

function create_pending_review_item(
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    project_id: "project-01",
    continuity_id: "continuity-01",
    lifecycle_stage: "pending_review_visible",
    lifecycle_label: "pending review visibility",
    history_summary:
      "Review visibility remains bounded and ready for human review only.",
    evidence_gap_summary: "Evidence gap: clarify the bounded missing context.",
    review_posture: "review_only",
    non_executing_posture:
      "Pending review visibility remains non-executing and not a queue.",
    safe_evidence_refs: ["ref-02", "ref-01"],
    runtime_private_fields_omitted: true,
    ...overrides,
  };
}

function create_lifecycle_projection(
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    project_id: "project-01",
    continuity_id: "continuity-01",
    lifecycle_stage: "continuity_visible",
    lifecycle_label: "session continuity visible",
    history_summary:
      "Continuity history is visible as read-only lifecycle context across sessions.",
    evidence_gap_summary: "Evidence gap: confirm the last bounded revision context.",
    review_posture: "review_only",
    non_executing_posture:
      "Continuity view remains non-executing and below dispatch semantics.",
    safe_evidence_refs: ["ref-02", "ref-01", "ref-01"],
    runtime_private_fields_omitted: true,
    ...overrides,
  };
}

function create_pending_review_projection(
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    ...create_lifecycle_projection({
      lifecycle_stage: "pending_review_visible",
      lifecycle_label: "pending review visibility",
      history_summary:
        "Pending review visibility remains bounded, readable, and below queue semantics.",
      non_executing_posture:
        "Pending review visibility remains non-executing and not a queue.",
    }),
    pending_review_count: 2,
    pending_review_items: [
      create_pending_review_item(),
      create_pending_review_item({
        lifecycle_label: "review item visibility",
        safe_evidence_refs: ["ref-03"],
      }),
    ],
    ...overrides,
  };
}

function create_snapshot_projection(
  overrides: Record<string, unknown> = {}
): Record<string, unknown> {
  return {
    ...create_pending_review_projection({
      lifecycle_stage: "snapshot_visible",
      lifecycle_label: "continuity snapshot visible",
      history_summary:
        "Continuity snapshot stays bounded to projection-safe read-only export.",
      non_executing_posture:
        "Continuity snapshot remains non-executing and not dispatchable.",
      pending_review_count: 1,
      pending_review_items: [create_pending_review_item()],
    }),
    ...overrides,
  };
}

test("[projection] adapts valid lifecycle continuity projection", () => {
  const result = adapt_lifecycle_continuity_projection(
    create_lifecycle_projection()
  );

  assert.equal(result.project_id, "project-01");
  assert.equal(result.continuity_id, "continuity-01");
  assert.equal(result.lifecycle_stage, "continuity_visible");
  assert.equal(result.runtime_private_fields_omitted, true);
});

test("[projection] adapts valid pending review projection below queue semantics", () => {
  const result = adapt_pending_review_projection(
    create_pending_review_projection()
  );

  assert.equal(result.pending_review_count, 2);
  assert.equal(result.pending_review_items.length, 2);
  assert.match(result.non_executing_posture, /non-executing/i);
  assert.match(result.non_executing_posture, /not a queue/i);
});

test("[projection] adapts valid continuity snapshot projection", () => {
  const result = adapt_continuity_snapshot_projection(
    create_snapshot_projection()
  );

  assert.equal(result.lifecycle_stage, "snapshot_visible");
  assert.equal(result.pending_review_count, 1);
  assert.equal(result.pending_review_items[0].continuity_id, "continuity-01");
});

test("[projection] rejects missing project_id", () => {
  assert.throws(
    () =>
      adapt_lifecycle_continuity_projection(
        create_lifecycle_projection({ project_id: "" })
      ),
    /project_id is required/
  );
});

test("[projection] rejects missing continuity_id where relevant", () => {
  assert.throws(
    () =>
      adapt_pending_review_projection(
        create_pending_review_projection({ continuity_id: "" })
      ),
    /continuity_id is required/
  );
});

test("[projection] requires runtime_private_fields_omitted true", () => {
  assert.throws(
    () =>
      adapt_continuity_snapshot_projection(
        create_snapshot_projection({ runtime_private_fields_omitted: false })
      ),
    /runtime_private_fields_omitted must be true/
  );
});

test("[projection] rejects raw runtime-private fields recursively", () => {
  assert.throws(
    () =>
      adapt_lifecycle_continuity_projection({
        ...create_lifecycle_projection(),
        nested: {
          raw_vsl: { forbidden: true },
          raw_psg: { forbidden: true },
          raw_trace: { forbidden: true },
        },
      }),
    /forbidden runtime-private field: raw_vsl/
  );
});

test("[projection] rejects execution fields recursively", () => {
  assert.throws(
    () =>
      adapt_pending_review_projection({
        ...create_pending_review_projection(),
        nested: {
          provider_channel_result: "forbidden",
          dispatch_result: "forbidden",
          approval_result: "forbidden",
          execution_result: "forbidden",
        },
      }),
    /forbidden execution field: dispatch_result/
  );
});

test("[projection] rejects queue fields recursively", () => {
  assert.throws(
    () =>
      adapt_continuity_snapshot_projection({
        ...create_snapshot_projection(),
        nested: {
          queue_worker_state: "forbidden",
        },
      }),
    /forbidden queue field: queue_worker_state/
  );
});

test("[projection] rejects pending review item project_id mismatch", () => {
  assert.throws(
    () =>
      adapt_pending_review_projection(
        create_pending_review_projection({
          pending_review_items: [
            create_pending_review_item({ project_id: "project-02" }),
          ],
        })
      ),
    /pending_review_items\.project_id must match projection project_id/
  );
});

test("[projection] preserves safe evidence refs", () => {
  const result = adapt_lifecycle_continuity_projection(
    create_lifecycle_projection()
  );

  assert.deepEqual(result.safe_evidence_refs, ["ref-01", "ref-02"]);
});

test("[projection] does not expose approve reject dispatch execute founder queue claims", () => {
  const result = adapt_pending_review_projection(
    create_pending_review_projection()
  );
  const copy_surface = [
    result.lifecycle_label,
    result.history_summary,
    result.review_posture,
    result.non_executing_posture,
    ...result.pending_review_items.flatMap((item) => [
      item.lifecycle_label,
      item.history_summary,
      item.review_posture,
      item.non_executing_posture,
    ]),
  ].join(" ");

  assert.doesNotMatch(copy_surface, /approved revision/i);
  assert.doesNotMatch(copy_surface, /approval granted/i);
  assert.doesNotMatch(copy_surface, /execution completed/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /founder queue/i);
});
