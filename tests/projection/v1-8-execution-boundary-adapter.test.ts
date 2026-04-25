import assert from "node:assert/strict";
import test from "node:test";

import {
  adapt_v1_8_execution_boundary_card,
} from "../../projection/adapters/v1-8-execution-boundary-adapter.ts";

function create_input(overrides = {}) {
  return {
    execution_boundary_id: "execution_boundary_01",
    project_id: "project-01",
    requirement_summary: {
      requirement_summary:
        "Possible future human-confirmed transition remains display-oriented and below execution semantics.",
      non_executing_posture:
        "Execution boundary remains projection-safe and non-executing.",
    },
    risk_warning: {
      risk_warning:
        "Risk warning remains explanatory only and does not authorize side effects.",
      non_executing_posture:
        "Execution boundary remains projection-safe and non-executing.",
    },
    preflight_checklist: {
      preflight_checklist: [
        "confirm bounded operator-visible context",
        "review bounded safe evidence refs",
      ],
      runtime_private_fields_omitted: true,
    },
    acknowledgment_requirement: {
      acknowledgment_required: true,
      acknowledgment_requirement:
        "Acknowledgment requirement remains visible as a requirement summary only.",
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Execution boundary remains projection-safe and non-executing.",
    },
    transition_posture: {
      non_executing_posture:
        "Execution boundary remains projection-safe and non-executing.",
      provider_channel_execution_available: false,
      approval_dispatch_execution_available: false,
      queue_available: false,
      authoritative_transition_state_available: false,
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
    created_at: "2026-04-25T00:00:00.000Z",
    ...overrides,
  };
}

test("[projection] maps V1.8 bounded execution-boundary slice correctly", () => {
  const result = adapt_v1_8_execution_boundary_card(create_input());

  assert.equal(result.project_id, "project-01");
  assert.equal(result.execution_boundary_id, "execution_boundary_01");
  assert.match(
    result.requirement_summary.requirement_summary,
    /human-confirmed transition/i
  );
  assert.match(result.risk_warning.risk_warning, /explanatory only/i);
  assert.equal(result.preflight_checklist.preflight_checklist.length, 2);
  assert.equal(
    result.acknowledgment_requirement.acknowledgment_required,
    true
  );
  assert.equal(result.runtime_private_fields_omitted, true);
});

test("[projection] safe evidence refs stay references only", () => {
  const result = adapt_v1_8_execution_boundary_card(create_input());

  assert.deepEqual(result.safe_evidence_refs, ["ref-01", "ref-02"]);
  assert.deepEqual(
    result.safe_evidence_refs?.every((value) => typeof value === "string"),
    true
  );
});

test("[projection] display-only non-executing and non-authoritative wording is preserved", () => {
  const result = adapt_v1_8_execution_boundary_card(create_input());
  const copy_surface = JSON.stringify(result);

  assert.match(result.display_only_posture, /display-only/i);
  assert.match(result.non_executing_posture, /non-executing/i);
  assert.match(result.non_executing_posture, /non-approval-automation/i);
  assert.match(result.non_authoritative_posture, /non-authoritative/i);
  assert.doesNotMatch(copy_surface, /execution eligibility granted/i);
});

test("[projection] forbidden raw runtime-private fields are rejected", () => {
  assert.throws(
    () =>
      adapt_v1_8_execution_boundary_card({
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
      adapt_v1_8_execution_boundary_card({
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

test("[projection] forbidden authoritative fields are rejected", () => {
  assert.throws(
    () =>
      adapt_v1_8_execution_boundary_card({
        ...create_input(),
        nested: {
          authoritative_acknowledgment_state: "forbidden",
          authoritative_transition_state: "forbidden",
        },
      } as unknown as ReturnType<typeof create_input>),
    /forbidden authoritative field: authoritative_acknowledgment_state/
  );
});

test("[projection] runtime_private_fields_omitted is enforced", () => {
  assert.throws(
    () =>
      adapt_v1_8_execution_boundary_card({
        ...create_input(),
        runtime_private_fields_omitted: false,
      } as unknown as ReturnType<typeof create_input>),
    /runtime_private_fields_omitted must be true/
  );
});

test("[projection] wording does not drift into execution dispatch provider or queue claims", () => {
  assert.throws(
    () =>
      adapt_v1_8_execution_boundary_card({
        ...create_input(),
        risk_warning: {
          ...create_input().risk_warning,
          risk_warning:
            "provider/channel execution available and dispatch ready after review.",
        },
      }),
    /forbidden provider\/channel wording|forbidden execution wording/
  );
});
