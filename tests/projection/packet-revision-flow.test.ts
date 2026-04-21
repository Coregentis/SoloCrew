import assert from "node:assert/strict";
import test from "node:test";

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

test("[projection] creates review-only flow result", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: create_revision_input(),
  });

  assert.equal(result.review_posture, "review_only");
  assert.equal(result.staging_posture, "not_sent");
  assert.equal(result.revision_candidate.revision_status, "ready_for_review");
});

test("[projection] return-for-revision posture does not imply rejection", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: create_revision_input({
      resulting_projection_summary_id: undefined,
      revision_reason: "insufficient_evidence",
      evidence_insufficiency: {
        ...create_revision_input().evidence_insufficiency!,
        insufficient: true,
      },
    }),
  });

  assert.equal(result.review_posture, "return_for_revision");
  assert.equal(result.revision_candidate.interpretation_guards.return_for_revision_is_rejection, false);
});

test("[projection] revised packet is not execution", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: create_revision_input(),
  });

  assert.equal(result.revision_candidate.interpretation_guards.revised_packet_is_execution, false);
  assert.equal(result.staging_posture, "not_sent");
});

test("[projection] no approve reject dispatch execute controls appear in flow output", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: create_revision_input(),
  });

  assert.match(result.boundary_summary, /No approve\/reject\/dispatch\/execute behavior\./);
  assert.doesNotMatch(result.boundary_summary, /dispatch ready/i);
});

test("[projection] no founder queue semantics appear in flow output", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: create_revision_input(),
  });

  assert.match(result.boundary_summary, /No founder queue behavior\./);
});

test("[projection] invalid revision envelope becomes blocked-by-contract fallback", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-01",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: {
      ...create_revision_input(),
      evidence_insufficiency: {
        ...create_revision_input().evidence_insufficiency!,
        safe_clarification_prompt:
          "Move this into provider/channel execution once review finishes.",
      },
    },
  });

  assert.equal(result.review_posture, "blocked_by_contract");
  assert.equal(result.staging_posture, "blocked_by_contract");
  assert.equal(result.revision_candidate.revision_status, "blocked_by_contract");
  assert.match(
    result.revision_candidate.evidence_gap?.user_visible_summary ?? "",
    /forbidden provider\/channel wording/
  );
});

test("[projection] project mismatch is blocked", () => {
  const result = createPacketRevisionFlowResult({
    project_id: "project-02",
    previous_packet_candidate_id: "packet-candidate-01",
    revision_input: create_revision_input(),
  });

  assert.equal(result.review_posture, "blocked_by_contract");
  assert.match(
    result.revision_candidate.evidence_gap?.user_visible_summary ?? "",
    /flow\.project_id must match revision_input\.project_id/
  );
});
