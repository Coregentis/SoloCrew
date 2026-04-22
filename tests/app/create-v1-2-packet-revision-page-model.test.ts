import assert from "node:assert/strict";
import test from "node:test";

import {
  createV12PacketRevisionPageModel,
} from "../../app/shell/create-v1-2-packet-revision-page-model.ts";
import {
  type CreatePacketRevisionCandidateInput,
} from "../../projection/adapters/packet-revision-adapter.ts";
import {
  adapt_continuity_snapshot_projection,
  adapt_lifecycle_continuity_projection,
  adapt_pending_review_projection,
} from "../../projection/adapters/lifecycle-continuity-consumption-adapter.ts";
import {
  createPacketRevisionFlowResult,
} from "../../projection/assembly/packet-revision-flow.ts";

function create_revision_input(
  overrides: Partial<CreatePacketRevisionCandidateInput> = {}
): CreatePacketRevisionCandidateInput {
  return {
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_id: "revision-01",
    previous_projection_summary_id: "projection-summary-01",
    resulting_projection_summary_id: "projection-summary-02",
    revision_reason: "operator_clarification",
    revision_input_summary:
      "Revise the bounded packet candidate with clearer context and no execution step.",
    evidence_insufficiency: {
      detail_id: "gap-01",
      project_id: "project-01",
      evidence_available: true,
      insufficient: false,
      stale: false,
      insufficiency_category: "other",
      omission_reason: "Clarification should sharpen the candidate summary.",
      required_evidence_class: "clarifying context",
      safe_evidence_refs: ["ref-01"],
      safe_clarification_prompt:
        "Clarify the missing bounded context before the next review pass.",
      non_executing: true,
      runtime_private_fields_omitted: true,
    },
    non_executing: true,
    runtime_private_fields_omitted: true,
    ...overrides,
  };
}

function create_model(
  overrides: Partial<CreatePacketRevisionCandidateInput> = {},
  continuity_input?: Parameters<typeof createV12PacketRevisionPageModel>[1]
) {
  return createV12PacketRevisionPageModel(
    createPacketRevisionFlowResult({
      project_id: "project-01",
      previous_packet_candidate_id: "packet-candidate-01",
      revision_input: create_revision_input(overrides),
    }),
    continuity_input
  );
}

function create_lifecycle_continuity_view() {
  return adapt_lifecycle_continuity_projection({
    project_id: "project-01",
    continuity_id: "continuity-01",
    lifecycle_stage: "continuity_visible",
    lifecycle_label: "session continuity visible",
    history_summary:
      "Continuity history remains visible as read-only lifecycle context across sessions.",
    evidence_gap_summary:
      "Evidence gap: confirm the last bounded revision context before the next review pass.",
    review_posture: "review_only",
    non_executing_posture:
      "Continuity view remains review-only, non-executing, and not dispatchable.",
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
      "Pending review visibility remains bounded and visible below queue semantics.",
    pending_review_count: 2,
    pending_review_items: [
      {
        project_id: "project-01",
        continuity_id: "continuity-01",
        lifecycle_stage: "pending_review_visible",
        lifecycle_label: "review item visibility",
        history_summary:
          "The first visible review item remains bounded and review-only.",
        evidence_gap_summary:
          "Evidence gap: clarify the bounded missing context before the next review pass.",
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
        lifecycle_label: "review item visibility",
        history_summary:
          "The second visible review item remains bounded and review-only.",
        review_posture: "review_only",
        non_executing_posture:
          "Visible review item remains non-executing and not a queue.",
        safe_evidence_refs: ["ref-04"],
        runtime_private_fields_omitted: true,
      },
    ],
    evidence_gap_summary:
      "Evidence gap: review visibility remains bounded to safe summary text.",
    review_posture: "review_only",
    non_executing_posture:
      "Pending review visibility remains non-executing and not a queue.",
    safe_evidence_refs: ["ref-05", "ref-01"],
    runtime_private_fields_omitted: true,
  });
}

function create_continuity_snapshot_view() {
  return adapt_continuity_snapshot_projection({
    project_id: "project-01",
    continuity_id: "continuity-01",
    lifecycle_stage: "snapshot_visible",
    lifecycle_label: "continuity snapshot visible",
    history_summary:
      "Continuity snapshot remains bounded to projection-safe read-only export.",
    pending_review_count: 1,
    pending_review_items: [
      {
        project_id: "project-01",
        continuity_id: "continuity-01",
        lifecycle_stage: "pending_review_visible",
        lifecycle_label: "snapshot review visibility",
        history_summary:
          "Snapshot review visibility remains bounded and read-only.",
        review_posture: "review_only",
        non_executing_posture:
          "Snapshot review visibility remains non-executing and not a queue.",
        safe_evidence_refs: ["ref-06"],
        runtime_private_fields_omitted: true,
      },
    ],
    evidence_gap_summary:
      "Evidence gap: snapshot remains bounded to safe continuity summary.",
    review_posture: "review_only",
    non_executing_posture:
      "Continuity snapshot remains non-executing and not dispatchable.",
    safe_evidence_refs: ["ref-07"],
    runtime_private_fields_omitted: true,
  });
}

test("[app] existing page model still works without continuity input", () => {
  const model = create_model();

  assert.equal(model.revision_candidate_id, "revision-01");
  assert.equal(model.continuity_summary, undefined);
  assert.equal(model.pending_review_visibility, undefined);
  assert.equal(model.runtime_private_fields_omitted, undefined);
});

test("[app] page model shows previous and revised packet references", () => {
  const model = create_model();

  assert.equal(model.previous_packet_candidate_id, "packet-candidate-01");
  assert.equal(model.revised_packet_candidate_id, "projection-summary-02");
  assert.match(model.revision_relationship_label, /packet-candidate-01/);
  assert.match(model.revision_relationship_label, /projection-summary-02/);
});

test("[app] page model shows lifecycle clarity fields", () => {
  const model = create_model();

  assert.equal(model.lifecycle_stage, "review_posture");
  assert.match(model.lifecycle_label, /review-only posture/i);
  assert.match(model.packet_lifecycle_summary, /revised packet candidate/i);
  assert.equal(model.review_posture_label, "review-only posture");
  assert.equal(model.staging_posture_label, "not-sent staging posture");
  assert.match(model.non_executing_posture, /non-executing/i);
});

test("[app] page model shows evidence gap summary", () => {
  const model = create_model();

  assert.match(model.evidence_gap_summary ?? "", /evidence gap:/i);
});

test("[app] page model shows safe clarification prompt without provider/channel send", () => {
  const model = create_model();

  assert.equal(
    model.safe_clarification_prompt,
    "Clarify the missing bounded context before the next review pass."
  );
  assert.equal(
    model.interpretation_guards.safe_clarification_prompt_is_provider_channel_send,
    false
  );
});

test("[app] safe clarification prompt remains copy only", () => {
  const model = create_model();

  assert.equal(model.safe_clarification_prompt?.includes("provider/channel"), false);
  assert.equal(model.review_posture, "review_only");
  assert.equal(model.staging_posture, "not_sent");
  assert.match(model.non_executing_posture, /not sent/i);
});

test("[app] page model shows interpretation guards", () => {
  const model = create_model();

  assert.deepEqual(model.interpretation_guards, {
    revision_is_approval: false,
    return_for_revision_is_rejection: false,
    revised_packet_is_execution: false,
    evidence_gap_is_proof: false,
    safe_clarification_prompt_is_provider_channel_send: false,
  });
});

test("[app] page model keeps copy free of approval rejection execution proof and dispatch-ready wording", () => {
  const model = create_model();
  const copy_surface = [
    model.revision_reason_label,
    model.evidence_gap_summary,
    model.safe_clarification_prompt,
    model.boundary_summary,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ");

  assert.doesNotMatch(copy_surface, /approved revision/i);
  assert.doesNotMatch(copy_surface, /\brejected\b/i);
  assert.doesNotMatch(copy_surface, /execution ready/i);
  assert.doesNotMatch(copy_surface, /proof failure/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /dispatch blocked/i);
});

test("[app] blocked-by-contract page model stays review-only and not dispatchable by boundary copy", () => {
  const model = create_model({
    evidence_insufficiency: {
      ...create_revision_input().evidence_insufficiency!,
      safe_clarification_prompt:
        "Route this through provider/channel execution once review finishes.",
    },
  });

  assert.equal(model.review_posture, "blocked_by_contract");
  assert.equal(model.staging_posture, "blocked_by_contract");
  assert.equal(model.review_posture_label, "blocked-by-contract posture");
  assert.equal(model.staging_posture_label, "blocked-by-contract staging posture");
  assert.match(model.packet_lifecycle_summary, /contract blocked/i);
  assert.match(model.non_executing_posture, /blocked by contract/i);
  assert.match(model.boundary_summary, /review-only/i);
  assert.match(model.boundary_summary, /non-executing/i);
});

test("[app] page model displays continuity summary when provided", () => {
  const model = create_model({}, {
    continuity_view: create_lifecycle_continuity_view(),
    pending_review_view: create_pending_review_view(),
  });

  assert.match(model.continuity_summary ?? "", /continuity summary:/i);
  assert.match(model.continuity_summary ?? "", /session continuity visible/i);
  assert.match(model.continuity_summary ?? "", /pending review visibility shows 2 visible review items/i);
  assert.equal(model.continuity_lifecycle_label, "session continuity visible");
  assert.equal(model.continuity_review_posture, "review_only");
  assert.match(model.continuity_non_executing_posture ?? "", /non-executing/i);
});

test("[app] page model displays lifecycle history summary", () => {
  const model = create_model({}, {
    continuity_view: create_lifecycle_continuity_view(),
  });

  assert.match(
    model.continuity_history_summary ?? "",
    /read-only lifecycle context across sessions/i
  );
});

test("[app] page model displays pending review visibility below queue semantics", () => {
  const model = create_model({}, {
    continuity_view: create_lifecycle_continuity_view(),
    pending_review_view: create_pending_review_view(),
  });

  assert.equal(model.pending_review_count, 2);
  assert.match(model.pending_review_visibility ?? "", /visibility-only/i);
  assert.match(model.pending_review_visibility ?? "", /not a queue/i);
  assert.match(model.pending_review_items_summary ?? "", /visible review items:/i);
});

test("[app] page model displays continuity snapshot summary if available", () => {
  const model = create_model({}, {
    continuity_snapshot_view: create_continuity_snapshot_view(),
  });

  assert.match(model.continuity_summary ?? "", /continuity snapshot visible/i);
  assert.match(
    model.continuity_history_summary ?? "",
    /projection-safe read-only export/i
  );
});

test("[app] page model preserves continuity safe evidence refs", () => {
  const model = create_model({}, {
    continuity_view: create_lifecycle_continuity_view(),
    pending_review_view: create_pending_review_view(),
    continuity_snapshot_view: create_continuity_snapshot_view(),
  });

  assert.deepEqual(model.continuity_safe_evidence_refs, [
    "ref-01",
    "ref-02",
    "ref-03",
    "ref-04",
    "ref-05",
    "ref-06",
    "ref-07",
  ]);
});

test("[app] page model exposes runtime_private_fields_omitted marker for continuity input", () => {
  const model = create_model({}, {
    continuity_view: create_lifecycle_continuity_view(),
  });

  assert.equal(model.runtime_private_fields_omitted, true);
});

test("[app] continuity page-model output stays free of provider channel execution approve reject dispatch execute founder queue and runtime-private fields", () => {
  const model = create_model({}, {
    continuity_view: create_lifecycle_continuity_view(),
    pending_review_view: create_pending_review_view(),
    continuity_snapshot_view: create_continuity_snapshot_view(),
  });

  const copy_surface = [
    model.continuity_summary,
    model.continuity_lifecycle_label,
    model.continuity_history_summary,
    model.pending_review_visibility,
    model.pending_review_items_summary,
    model.continuity_review_posture,
    model.continuity_non_executing_posture,
  ]
    .filter((value): value is string => typeof value === "string")
    .join(" ");
  const serialized = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /provider\/channel send/i);
  assert.doesNotMatch(copy_surface, /approved revision/i);
  assert.doesNotMatch(copy_surface, /approval granted/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /execution ready/i);
  assert.doesNotMatch(copy_surface, /founder queue/i);
  assert.doesNotMatch(serialized, /raw_vsl/i);
  assert.doesNotMatch(serialized, /raw_psg/i);
  assert.doesNotMatch(serialized, /raw_trace/i);
  assert.doesNotMatch(serialized, /runtime_private_payload/i);
});
