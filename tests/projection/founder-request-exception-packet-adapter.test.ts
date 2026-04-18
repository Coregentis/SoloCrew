import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  is_founder_request_exception_packet_contract,
} from "../../projection/contracts/founder-request-exception-packet-contract.ts";
import {
  adapt_founder_request_exception_packet,
} from "../../projection/adapters/founder-request-exception-packet-adapter.ts";

function create_safe_adapter_input() {
  return {
    request_ref: "founder-request-02",
    request_label: "Founder request: tighten bounded handoff packet wording.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available" as const,
        summary_label: "Continuation posture remains bounded and available.",
        summary_notes: ["Continuation anchor stays summary-safe."],
        continuation_label: "resume current packet context",
        continuation_anchor_label: "anchor-summary-01",
        freshness_posture: "resume_ready" as const,
      },
      semantic_relation_projection_summary: {
        availability: "available" as const,
        summary_label: "Relation posture remains bounded and affected-object aware.",
        summary_notes: ["One affected packet lane remains visible."],
        affected_object_labels: ["Secretary Review Lane"],
        relation_change_summary: "One affected relation remains visible.",
      },
      drift_impact_projection_summary: {
        availability: "available" as const,
        summary_label: "Impact posture remains bounded for review.",
        summary_notes: ["Delta posture remains bounded and evidence-aware."],
        drift_kind_label: "delta_intent_shift",
        impact_summary_label: "The founder request changes one active review lane.",
        has_conflict_signal: false,
        evidence_refs: [
          {
            ref_scope: "bounded_evidence_ref" as const,
            ref_family: "drift_impact_projection_summary" as const,
            ref_label: "impact-summary-ref",
          },
        ],
      },
      activation_projection_summary: {
        availability: "available" as const,
        summary_label: "Activation posture remains visible for review only.",
        summary_notes: ["Activation remains bounded and non-executing."],
        activation_posture: "confirm_gate" as const,
        recommendation_visibility: "visible" as const,
      },
      confirm_trace_decision_projection_summary: {
        availability: "insufficient_evidence" as const,
        summary_label: "Evidence posture remains bounded and omission-aware.",
        summary_notes: ["Thin evidence remains explicit."],
        confirm_posture: "required" as const,
        evidence_summary_label: "bounded-evidence-summary",
        evidence_refs: [
          {
            ref_scope: "bounded_evidence_ref" as const,
            ref_family: "confirm_trace_decision_projection_summary" as const,
            ref_label: "confirm-summary-ref",
          },
        ],
      },
      learning_suggestion_projection_summary: {
        availability: "stale" as const,
        summary_label: "Learning posture remains suggestion_only and stale.",
        summary_notes: ["Learning stays suggestion_only and bounded."],
        suggestion_posture: "suggestion_only" as const,
        suggestion_summary_label: "suggestion_only continuity hint",
      },
    },
    bounded_action_recommendation_text:
      "Keep the next step in bounded review posture only.",
    evidence_summary_text: "Bounded evidence summary stays visible and summary-safe.",
    learning_suggestion_text: "suggestion_only continuity hint remains visible.",
    status_markers: ["omitted_by_contract" as const],
  };
}

test("[projection adapter] founder-request bounded summaries adapt into a valid contract packet", () => {
  const result = adapt_founder_request_exception_packet(create_safe_adapter_input());

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(is_founder_request_exception_packet_contract(result.packet), true);
  assert.equal(result.packet.contract_scope, "founder_request_exception_packet");
  assert.equal(result.packet.authority_boundary, "product_projection_only");
  assert.equal(result.packet.non_executing, true);
});

test("[projection adapter] adapted packet preserves exactly six projection families", () => {
  const result = adapt_founder_request_exception_packet(create_safe_adapter_input());

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  const family_keys = Object.keys(result.packet.projection_summaries).sort();

  assert.deepEqual(family_keys, [
    "activation_projection_summary",
    "confirm_trace_decision_projection_summary",
    "continuity_projection_summary",
    "drift_impact_projection_summary",
    "learning_suggestion_projection_summary",
    "semantic_relation_projection_summary",
  ]);
});

test("[projection adapter] omission, insufficiency, and stale markers remain explicit", () => {
  const result = adapt_founder_request_exception_packet(create_safe_adapter_input());

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(
    result.packet.projection_summaries.confirm_trace_decision_projection_summary.availability,
    "insufficient_evidence"
  );
  assert.equal(
    result.packet.projection_summaries.learning_suggestion_projection_summary.availability,
    "stale"
  );
  assert.ok(result.packet.status_markers.includes("omitted_by_contract"));
  assert.ok(result.packet.status_markers.includes("insufficient_evidence"));
  assert.ok(result.packet.status_markers.includes("stale"));
  assert.equal(result.packet.derived_exception_posture, "stale_context");
});

test("[projection adapter] missing optional summary input defaults to explicit upstream-unavailable posture", () => {
  const result = adapt_founder_request_exception_packet({
    request_ref: "founder-request-03",
    request_label: "Founder request: start with default bounded packet state.",
  });

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(
    result.packet.projection_summaries.continuity_projection_summary.availability,
    "not_available_upstream"
  );
  assert.equal(
    result.packet.projection_summaries.activation_projection_summary.availability,
    "not_available_upstream"
  );
  assert.equal(result.packet.derived_exception_posture, "blocked_by_contract");
  assert.ok(result.packet.status_markers.includes("not_available_upstream"));
});

test("[projection adapter] blocks forbidden raw runtime-like keys", () => {
  const invalid_input = {
    ...create_safe_adapter_input(),
    projection_summaries: {
      ...create_safe_adapter_input().projection_summaries,
      continuity_projection_summary: {
        ...create_safe_adapter_input().projection_summaries.continuity_projection_summary,
        // forbidden-label negative fixture: runtime-like raw field
        raw_vsl: "should-not-pass",
      },
    },
  };

  const result = adapt_founder_request_exception_packet(invalid_input);

  assert.deepEqual(result, {
    ok: false,
    reason: "forbidden_input",
    notes: ["Forbidden raw runtime-like input was provided."],
  });
});

test("[projection adapter] blocks forbidden authority wording", () => {
  const invalid_input = {
    ...create_safe_adapter_input(),
    // forbidden-label negative fixture
    request_label: "approved",
  };
  const result = adapt_founder_request_exception_packet(invalid_input);

  assert.deepEqual(result, {
    ok: false,
    reason: "forbidden_input",
    notes: ["Forbidden authority-like input wording was provided."],
  });
});

test("[projection adapter] blocks external delivery markers", () => {
  const invalid_input = {
    ...create_safe_adapter_input(),
    // forbidden-label negative fixture
    evidence_summary_text: "provider_sent",
  };
  const result = adapt_founder_request_exception_packet(invalid_input);

  assert.deepEqual(result, {
    ok: false,
    reason: "forbidden_input",
    notes: ["Forbidden authority-like input wording was provided."],
  });
});

test("[projection adapter] bounded action recommendation remains non-executing", () => {
  const result = adapt_founder_request_exception_packet({
    ...create_safe_adapter_input(),
    derived_exception_posture_hint: "confirm_required",
  });

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(
    result.packet.bounded_action_recommendation?.recommendation_kind,
    "bounded_action_recommendation"
  );
  assert.equal(result.packet.bounded_action_recommendation?.non_executing, true);
  assert.equal(
    result.packet.bounded_action_recommendation?.recommendation_posture,
    "hold_for_confirmation"
  );
});

test("[projection adapter] learning posture remains suggestion_only", () => {
  const result = adapt_founder_request_exception_packet(create_safe_adapter_input());

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(
    result.packet.learning_suggestion_summary?.suggestion_posture,
    "suggestion_only"
  );
});

test("[projection adapter] source stays inside contract and adapter lanes only", () => {
  const source = readFileSync(
    new URL(
      "../../projection/adapters/founder-request-exception-packet-adapter.ts",
      import.meta.url
    ),
    "utf8"
  );

  assert.equal(source.includes(["runtime", "/core"].join("")), false);
  assert.equal(source.includes(["runtime", "/in-memory"].join("")), false);
  assert.equal(source.includes(["Cognitive", "_OS"].join("")), false);
  assert.equal(
    source.includes(["Minimal", "Loop", "Run", "Result"].join("")),
    false
  );
  assert.equal(source.includes(["projection", "/assembly"].join("")), false);
  assert.equal(source.includes(["app", "/pages"].join("")), false);
});
