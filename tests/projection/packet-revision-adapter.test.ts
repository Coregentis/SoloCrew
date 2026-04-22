import assert from "node:assert/strict";
import test from "node:test";

import {
  createPacketRevisionCandidate,
  type CreatePacketRevisionCandidateInput,
} from "../../projection/adapters/packet-revision-adapter.ts";

function create_input(
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
      "Tighten the bounded packet candidate after clarification without sending anything.",
    evidence_insufficiency: {
      detail_id: "gap-01",
      project_id: "project-01",
      evidence_available: true,
      insufficient: false,
      stale: false,
      insufficiency_category: "other",
      omission_reason: "Clarification should sharpen the bounded packet wording.",
      required_evidence_class: "clarifying context",
      safe_evidence_refs: ["ref-02", "ref-01"],
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

test("[projection] creates packet revision candidate from projection revision envelope", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.revision_candidate_id, "revision-01");
  assert.equal(result.project_id, "project-01");
  assert.equal(result.previous_packet_candidate_id, "packet-candidate-01");
  assert.equal(result.revised_packet_candidate_id, "projection-summary-02");
  assert.equal(result.revision_status, "ready_for_review");
});

test("[projection] maps evidence insufficiency to evidence gap", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.evidence_gap?.gap_id, "gap-01");
  assert.equal(result.evidence_gap?.project_id, "project-01");
  assert.equal(result.evidence_gap?.gap_category, "other");
  assert.equal(result.evidence_gap?.not_proof, true);
  assert.equal(
    result.evidence_gap_summary,
    result.evidence_gap?.user_visible_summary
  );
});

test("[projection] derives lifecycle clarity fields for review-ready packet revision", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.lifecycle_stage, "review_posture");
  assert.match(result.lifecycle_label, /review-only posture/i);
  assert.equal(result.review_posture, "review_only");
  assert.match(result.revision_relationship.relationship_label, /packet-candidate-01/);
  assert.match(result.revision_relationship.relationship_label, /projection-summary-02/);
  assert.match(result.non_executing_posture, /review-only/i);
  assert.match(result.non_executing_posture, /not sent/i);
  assert.match(result.non_executing_posture, /non-executing/i);
});

test("[projection] maps safe clarification prompt to copy only", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(
    result.safe_clarification_prompt,
    "Clarify the missing bounded context before the next review pass."
  );
  assert.equal(
    result.interpretation_guards.safe_clarification_prompt_is_provider_channel_send,
    false
  );
});

test("[projection] preserves previous packet candidate reference", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.previous_packet_candidate_id, "packet-candidate-01");
});

test("[projection] maps resulting projection reference to revised packet candidate id", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.revised_packet_candidate_id, "projection-summary-02");
});

test("[projection] rejects empty bounded id and summary fields deterministically", () => {
  const cases = [
    ["project_id", { project_id: "" }],
    ["previous_packet_candidate_id", { previous_packet_candidate_id: "" }],
    ["revision_id", { revision_id: "" }],
    ["previous_projection_summary_id", { previous_projection_summary_id: "" }],
    ["revision_input_summary", { revision_input_summary: "" }],
  ] as const;

  for (const [field_name, override] of cases) {
    assert.throws(
      () => createPacketRevisionCandidate(create_input(override)),
      new RegExp(`input\\.${field_name} must remain a non-empty bounded field\\.`)
    );
  }
});

test("[projection] rejects empty resulting projection summary id when provided", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          resulting_projection_summary_id: "",
        })
      ),
    /input\.resulting_projection_summary_id must remain a non-empty bounded field\./
  );
});

test("[projection] handles insufficient evidence with needs_clarification posture", () => {
  const result = createPacketRevisionCandidate(
    create_input({
      resulting_projection_summary_id: undefined,
      revision_reason: "insufficient_evidence",
      evidence_insufficiency: {
        ...create_input().evidence_insufficiency!,
        insufficient: true,
        safe_clarification_prompt: undefined,
      },
    })
  );

  assert.equal(result.revision_status, "needs_clarification");
  assert.equal(result.evidence_gap?.insufficient, true);
  assert.equal(result.lifecycle_stage, "evidence_gap");
  assert.match(result.lifecycle_label, /evidence gap/i);
  assert.equal(result.review_posture, "return_for_revision");
  assert.match(result.non_executing_posture, /not dispatchable/i);
});

test("[projection] handles stale context as return_for_revision", () => {
  const result = createPacketRevisionCandidate(
    create_input({
      resulting_projection_summary_id: undefined,
      revision_reason: "stale_context",
      evidence_insufficiency: {
        ...create_input().evidence_insufficiency!,
        insufficient: false,
        stale: true,
        omission_reason: undefined,
      },
    })
  );

  assert.equal(result.revision_status, "return_for_revision");
  assert.equal(result.evidence_gap?.stale, true);
  assert.match(result.evidence_gap?.user_visible_summary ?? "", /stale context/i);
});

test("[projection] handles operator clarification without overclaim", () => {
  const result = createPacketRevisionCandidate(
    create_input({
      resulting_projection_summary_id: undefined,
      evidence_insufficiency: undefined,
    })
  );

  assert.equal(result.revision_status, "revision_candidate_created");
  assert.equal(result.revision_reason, "operator_clarification");
});

test("[projection] handles contract blocked", () => {
  const result = createPacketRevisionCandidate(
    create_input({
      revision_reason: "contract_blocked",
      resulting_projection_summary_id: undefined,
      evidence_insufficiency: undefined,
    })
  );

  assert.equal(result.revision_status, "blocked_by_contract");
  assert.equal(result.lifecycle_stage, "contract_blocked");
  assert.equal(result.review_posture, "blocked_by_contract");
  assert.match(result.revision_relationship.relationship_label, /visible anchor/i);
  assert.match(result.non_executing_posture, /blocked by contract/i);
  assert.match(result.non_executing_posture, /non-executing/i);
});

test("[projection] rejects runtime-private leakage", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate({
        ...create_input(),
        runtime_private_payload: "forbidden",
      } as CreatePacketRevisionCandidateInput),
    /forbidden raw runtime-like key/
  );
});

test("[projection] rejects safe evidence refs when not array", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            safe_evidence_refs: "ref-01" as unknown as string[],
          },
        })
      ),
    /evidence_insufficiency\.safe_evidence_refs must be an array/
  );
});

test("[projection] rejects safe evidence refs with non-string value", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            safe_evidence_refs: ["ref-01", 7 as unknown as string],
          },
        })
      ),
    /evidence_insufficiency\.safe_evidence_refs\[1\] must be a string/
  );
});

test("[projection] rejects safe evidence refs with empty string", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            safe_evidence_refs: ["ref-01", "  "],
          },
        })
      ),
    /evidence_insufficiency\.safe_evidence_refs\[1\] must remain a non-empty bounded field\./
  );
});

test("[projection] rejects provider/channel positive wording", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            safe_clarification_prompt:
              "Route this through provider/channel execution after review.",
          },
        })
      ),
    /forbidden provider\/channel wording/
  );
});

test("[projection] rejects proof/certification wording", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            omission_reason: "This is proof/certification that review is complete.",
          },
        })
      ),
    /forbidden proof\/certification wording/
  );
});

test("[projection] rejects approve reject dispatch and execute positive labels", () => {
  for (const label of ["approve", "reject", "dispatch", "execute"] as const) {
    assert.throws(
      () =>
        createPacketRevisionCandidate(
          create_input({
            revision_input_summary: label,
          })
        ),
      new RegExp(`forbidden action label at input\\.revision_input_summary: ${label}`)
    );
  }
});

test("[projection] rejects founder queue positive wording", () => {
  assert.throws(
    () =>
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            omission_reason: "Move this into the founder queue after revision.",
          },
        })
      ),
    /forbidden founder queue wording/
  );
});

test("[projection] preserves sorted unique safe evidence refs", () => {
  const result = createPacketRevisionCandidate(
    create_input({
      evidence_insufficiency: {
        ...create_input().evidence_insufficiency!,
        safe_evidence_refs: ["ref-02", "ref-01", "ref-02", " ref-03 "],
      },
    })
  );

  assert.deepEqual(result.evidence_gap?.safe_evidence_refs, [
    "ref-01",
    "ref-02",
    "ref-03",
  ]);
});

test("[projection] evidence insufficiency project mismatch fails deterministically", () => {
  function capture_error(): Error {
    try {
      createPacketRevisionCandidate(
        create_input({
          evidence_insufficiency: {
            ...create_input().evidence_insufficiency!,
            project_id: "project-02",
          },
        })
      );
    } catch (error) {
      return error as Error;
    }

    throw new Error("expected project mismatch error");
  }

  const first_error = capture_error();
  const second_error = capture_error();

  assert.equal(
    first_error.message,
    second_error.message
  );
  assert.match(
    first_error.message,
    /evidence_insufficiency\.project_id must match input\.project_id/
  );
});

test("[projection] revision candidate is not approval", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.interpretation_guards.revision_candidate_is_approval, false);
  assert.equal(
    result.interpretation_guards.return_for_revision_is_rejection,
    false
  );
  assert.equal(result.interpretation_guards.revised_packet_is_execution, false);
});

test("[projection] evidence gap is not proof or certification", () => {
  const result = createPacketRevisionCandidate(create_input());

  assert.equal(result.evidence_gap?.not_proof, true);
  assert.equal(result.interpretation_guards.evidence_gap_is_proof, false);
});
