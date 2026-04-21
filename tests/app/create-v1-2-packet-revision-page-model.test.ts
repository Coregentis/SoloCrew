import assert from "node:assert/strict";
import test from "node:test";

import {
  createV12PacketRevisionPageModel,
} from "../../app/shell/create-v1-2-packet-revision-page-model.ts";
import {
  type CreatePacketRevisionCandidateInput,
} from "../../projection/adapters/packet-revision-adapter.ts";
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
  overrides: Partial<CreatePacketRevisionCandidateInput> = {}
) {
  return createV12PacketRevisionPageModel(
    createPacketRevisionFlowResult({
      project_id: "project-01",
      previous_packet_candidate_id: "packet-candidate-01",
      revision_input: create_revision_input(overrides),
    })
  );
}

test("[app] page model shows previous and revised packet references", () => {
  const model = create_model();

  assert.equal(model.previous_packet_candidate_id, "packet-candidate-01");
  assert.equal(model.revised_packet_candidate_id, "projection-summary-02");
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
  assert.match(model.boundary_summary, /review-only/i);
  assert.match(model.boundary_summary, /not dispatchable/i);
});
