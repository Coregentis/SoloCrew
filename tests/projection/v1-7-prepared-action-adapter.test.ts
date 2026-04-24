import assert from "node:assert/strict";
import test from "node:test";

import {
  adapt_v1_7_prepared_action_card,
} from "../../projection/adapters/v1-7-prepared-action-adapter.ts";

function create_input(overrides = {}) {
  return {
    prepared_action_id: "prepared_action_01",
    project_id: "project-01",
    intent_summary: {
      action_label: "draft growth follow-up",
      action_summary:
        "Prepare a bounded operator-visible follow-up draft without executing it.",
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
        "bounded context reference",
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
      "ref-02",
      {
        evidence_ref: "ref-01",
        evidence_label: "bounded evidence reference",
      },
      "ref-02",
    ],
    runtime_private_fields_omitted: true,
    created_at: "2026-04-24T00:00:00.000Z",
    ...overrides,
  };
}

test("[projection] maps V1.7 bounded prepared-action slice correctly", () => {
  const result = adapt_v1_7_prepared_action_card(create_input());

  assert.equal(result.project_id, "project-01");
  assert.equal(result.prepared_action_id, "prepared_action_01");
  assert.equal(result.action_title, "draft growth follow-up");
  assert.match(result.action_intent_summary, /without executing it/i);
  assert.equal(result.evidence_sufficiency.sufficiency_state, "partial");
  assert.match(result.risk_boundary_summary, /boundary summary/i);
  assert.equal(
    result.human_confirmation_requirement.confirmation_required,
    true
  );
  assert.equal(result.runtime_private_fields_omitted, true);
});

test("[projection] safe evidence refs stay references only", () => {
  const result = adapt_v1_7_prepared_action_card(create_input());

  assert.deepEqual(result.safe_evidence_refs, ["ref-01", "ref-02"]);
  assert.deepEqual(
    result.safe_evidence_refs?.every((value) => typeof value === "string"),
    true
  );
});

test("[projection] draft-only and non-executing wording is preserved", () => {
  const result = adapt_v1_7_prepared_action_card(create_input());
  const copy_surface = JSON.stringify(result);

  assert.match(result.draft_only_posture, /draft-only/i);
  assert.match(result.non_executing_posture, /non-executing/i);
  assert.match(result.non_executing_posture, /non-approving/i);
  assert.match(result.non_executing_posture, /non-provider/i);
  assert.doesNotMatch(copy_surface, /execution eligibility granted/i);
});

test("[projection] forbidden raw runtime-private fields are rejected", () => {
  assert.throws(
    () =>
      adapt_v1_7_prepared_action_card({
        ...create_input(),
        nested: {
          raw_vsl: { forbidden: true },
        },
      } as unknown as ReturnType<typeof create_input>),
    /forbidden runtime-private field: raw_vsl/
  );
});

test("[projection] forbidden execution provider approval and queue fields are rejected", () => {
  assert.throws(
    () =>
      adapt_v1_7_prepared_action_card({
        ...create_input(),
        nested: {
          execution_eligibility: "forbidden",
          dispatch_status: "forbidden",
          provider_channel_status: "forbidden",
          queue_state: "forbidden",
        },
      } as unknown as ReturnType<typeof create_input>),
    /forbidden execution field: dispatch_status/
  );
});

test("[projection] runtime_private_fields_omitted is enforced", () => {
  assert.throws(
    () =>
      adapt_v1_7_prepared_action_card({
        ...create_input(),
        runtime_private_fields_omitted: false,
      } as unknown as ReturnType<typeof create_input>),
    /runtime_private_fields_omitted must be true/
  );
});

test("[projection] product wording does not drift into execution dispatch or queue claims", () => {
  assert.throws(
    () =>
      adapt_v1_7_prepared_action_card({
        ...create_input(),
        risk_summary: {
          ...create_input().risk_summary,
          boundary_summary:
            "provider/channel execution available and dispatch ready after review.",
        },
      }),
    /forbidden provider\/channel wording|forbidden execution wording/
  );
});
