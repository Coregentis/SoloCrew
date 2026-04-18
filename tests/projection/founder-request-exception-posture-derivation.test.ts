import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  derive_founder_request_exception_posture,
} from "../../projection/contracts/founder-request-exception-posture-derivation.ts";
import {
  is_founder_request_exception_posture,
} from "../../projection/contracts/founder-request-exception-packet-contract.ts";
import {
  adapt_founder_request_exception_packet,
} from "../../projection/adapters/founder-request-exception-packet-adapter.ts";

function create_summary_set() {
  return {
    continuity_projection_summary: {
      family: "continuity_projection_summary" as const,
      availability: "not_available_upstream" as const,
      summary_label: "No bounded continuity summary is currently available.",
      summary_notes: ["Continuity posture remains explicit and omission-aware."],
    },
    semantic_relation_projection_summary: {
      family: "semantic_relation_projection_summary" as const,
      availability: "not_available_upstream" as const,
      summary_label: "No bounded semantic relation summary is currently available.",
      summary_notes: ["Semantic relation posture remains explicit and bounded."],
    },
    drift_impact_projection_summary: {
      family: "drift_impact_projection_summary" as const,
      availability: "not_available_upstream" as const,
      summary_label: "No bounded drift and impact summary is currently available.",
      summary_notes: ["Impact posture remains explicit and bounded."],
    },
    activation_projection_summary: {
      family: "activation_projection_summary" as const,
      availability: "not_available_upstream" as const,
      summary_label: "No bounded activation summary is currently available.",
      summary_notes: ["Activation posture remains explicit and bounded."],
    },
    confirm_trace_decision_projection_summary: {
      family: "confirm_trace_decision_projection_summary" as const,
      availability: "not_available_upstream" as const,
      summary_label: "No bounded confirm or evidence summary is currently available.",
      summary_notes: ["Confirm posture remains explicit and bounded."],
    },
    learning_suggestion_projection_summary: {
      family: "learning_suggestion_projection_summary" as const,
      availability: "not_available_upstream" as const,
      summary_label: "No bounded learning suggestion is currently available.",
      summary_notes: ["Learning posture remains explicit and bounded."],
    },
  };
}

function create_safe_adapter_input() {
  return {
    request_ref: "founder-request-04",
    request_label: "Founder request: keep the packet contract bounded.",
    projection_summaries: {
      continuity_projection_summary: {
        availability: "available" as const,
        summary_label: "Continuation posture remains bounded and available.",
        summary_notes: ["Continuation anchor stays summary-safe."],
        continuation_label: "resume current packet context",
      },
      semantic_relation_projection_summary: {
        availability: "available" as const,
        summary_label: "Relation posture remains bounded and affected-object aware.",
        summary_notes: ["One affected packet lane remains visible."],
        affected_object_labels: ["Secretary Review Lane"],
      },
      drift_impact_projection_summary: {
        availability: "available" as const,
        summary_label: "Impact posture remains bounded for review.",
        summary_notes: ["Delta posture remains bounded and evidence-aware."],
        drift_kind_label: "delta_intent_shift",
        impact_summary_label: "The founder request changes one active review lane.",
      },
      activation_projection_summary: {
        availability: "available" as const,
        summary_label: "Activation posture remains visible for review only.",
        summary_notes: ["Activation remains bounded and non-executing."],
        activation_posture: "confirm_gate" as const,
      },
      confirm_trace_decision_projection_summary: {
        availability: "insufficient_evidence" as const,
        summary_label: "Evidence posture remains bounded and omission-aware.",
        summary_notes: ["Thin evidence remains explicit."],
        confirm_posture: "required" as const,
      },
      learning_suggestion_projection_summary: {
        availability: "stale" as const,
        summary_label: "Learning posture remains suggestion_only and stale.",
        summary_notes: ["Learning stays suggestion_only and bounded."],
        suggestion_posture: "suggestion_only" as const,
      },
    },
    bounded_action_recommendation_text:
      "Keep the next step in bounded review posture only.",
    evidence_summary_text: "Bounded evidence summary stays visible and summary-safe.",
    learning_suggestion_text: "suggestion_only continuity hint remains visible.",
    status_markers: ["omitted_by_contract" as const],
  };
}

test("[projection posture] stale marker derives stale_context", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: create_summary_set(),
    status_markers: ["stale"],
  });

  assert.equal(posture, "stale_context");
});

test("[projection posture] insufficient evidence derives evidence_insufficient", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: create_summary_set(),
    status_markers: ["insufficient_evidence"],
  });

  assert.equal(posture, "evidence_insufficient");
});

test("[projection posture] blocked activation derives activation_blocked", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: {
      ...create_summary_set(),
      activation_projection_summary: {
        ...create_summary_set().activation_projection_summary,
        availability: "available" as const,
        activation_posture: "blocked" as const,
      },
    },
    status_markers: ["available"],
  });

  assert.equal(posture, "activation_blocked");
});

test("[projection posture] escalation gate derives escalation_required", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: {
      ...create_summary_set(),
      activation_projection_summary: {
        ...create_summary_set().activation_projection_summary,
        availability: "available" as const,
        activation_posture: "escalation_gate" as const,
      },
    },
    status_markers: ["available"],
  });

  assert.equal(posture, "escalation_required");
});

test("[projection posture] confirm posture derives confirm_required", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: {
      ...create_summary_set(),
      confirm_trace_decision_projection_summary: {
        ...create_summary_set().confirm_trace_decision_projection_summary,
        availability: "available" as const,
        confirm_posture: "required" as const,
      },
    },
    status_markers: ["available"],
  });

  assert.equal(posture, "confirm_required");
});

test("[projection posture] omission boundary derives blocked_by_contract", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: create_summary_set(),
    status_markers: ["omitted_by_contract"],
  });

  assert.equal(posture, "blocked_by_contract");
});

test("[projection posture] impact or conflict signal derives impact_detected", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: {
      ...create_summary_set(),
      drift_impact_projection_summary: {
        ...create_summary_set().drift_impact_projection_summary,
        availability: "available" as const,
        has_conflict_signal: true,
      },
    },
    status_markers: ["available"],
  });

  assert.equal(posture, "impact_detected");
});

test("[projection posture] available continuity, relation, or learning support derives review_needed", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: {
      ...create_summary_set(),
      continuity_projection_summary: {
        ...create_summary_set().continuity_projection_summary,
        availability: "available" as const,
      },
    },
    status_markers: ["available"],
  });

  assert.equal(posture, "review_needed");
});

test("[projection posture] non-signal input falls back to monitor", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: {
      ...create_summary_set(),
      continuity_projection_summary: {
        ...create_summary_set().continuity_projection_summary,
        availability: "not_applicable" as const,
      },
      semantic_relation_projection_summary: {
        ...create_summary_set().semantic_relation_projection_summary,
        availability: "not_applicable" as const,
      },
      drift_impact_projection_summary: {
        ...create_summary_set().drift_impact_projection_summary,
        availability: "not_applicable" as const,
      },
      activation_projection_summary: {
        ...create_summary_set().activation_projection_summary,
        availability: "not_applicable" as const,
      },
      confirm_trace_decision_projection_summary: {
        ...create_summary_set().confirm_trace_decision_projection_summary,
        availability: "not_applicable" as const,
      },
      learning_suggestion_projection_summary: {
        ...create_summary_set().learning_suggestion_projection_summary,
        availability: "not_applicable" as const,
      },
    },
    status_markers: ["not_applicable"],
  });

  assert.equal(posture, "monitor");
});

test("[projection posture] explicit valid posture hint is respected when contract-safe", () => {
  const posture = derive_founder_request_exception_posture({
    projection_summaries: create_summary_set(),
    posture_hint: "return_for_revision",
    status_markers: ["stale", "insufficient_evidence"],
  });

  assert.equal(posture, "return_for_revision");
});

test("[projection posture] results stay inside the frozen bounded posture vocabulary", () => {
  const postures = [
    derive_founder_request_exception_posture({
      projection_summaries: create_summary_set(),
      status_markers: ["stale"],
    }),
    derive_founder_request_exception_posture({
      projection_summaries: create_summary_set(),
      status_markers: ["insufficient_evidence"],
    }),
    derive_founder_request_exception_posture({
      projection_summaries: create_summary_set(),
      status_markers: ["not_applicable"],
    }),
  ];

  for (const posture of postures) {
    assert.equal(is_founder_request_exception_posture(posture), true);
  }
});

test("[projection posture] adapter output stays aligned for representative bounded input", () => {
  const result = adapt_founder_request_exception_packet(create_safe_adapter_input());

  assert.equal(result.ok, true);

  if (!result.ok) {
    return;
  }

  assert.equal(result.packet.derived_exception_posture, "stale_context");
  assert.equal(result.packet.review_return_posture.posture, "stale_context");
});

test("[projection posture] source stays inside local contract and projection lanes only", () => {
  const source = readFileSync(
    new URL(
      "../../projection/contracts/founder-request-exception-posture-derivation.ts",
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
  assert.equal(source.includes(["appro", "ve"].join("")), false);
  assert.equal(source.includes(["re", "ject"].join("")), false);
  assert.equal(source.includes(["dis", "patch"].join("")), false);
  assert.equal(source.includes(["exe", "cute"].join("")), false);
  assert.equal(source.includes(["pro", "vider"].join("")), false);
  assert.equal(source.includes(["chan", "nel"].join("")), false);
  assert.equal(source.includes(["policy", "_mutated"].join("")), false);
  assert.equal(source.includes(["protocol", "_certified"].join("")), false);
});
