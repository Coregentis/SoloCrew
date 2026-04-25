import assert from "node:assert/strict";
import test from "node:test";

import {
  createV18ExecutionBoundaryPageModel,
} from "../../app/shell/create-v1-8-execution-boundary-page-model.ts";
import {
  adapt_v1_8_execution_boundary_card,
} from "../../projection/adapters/v1-8-execution-boundary-adapter.ts";

function create_view() {
  return adapt_v1_8_execution_boundary_card({
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
      { evidence_ref: "ref-02" },
      { evidence_ref: "ref-01", evidence_label: "bounded evidence reference" },
    ],
    runtime_private_fields_omitted: true,
  });
}

test("[app] page model exposes all bounded V1.8 sections", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());

  assert.equal(model.execution_boundary_card.execution_boundary_id, "execution_boundary_01");
  assert.match(
    model.requirement_summary_panel.requirement_summary,
    /human-confirmed transition/i
  );
  assert.match(model.risk_warning_panel.risk_warning, /explanatory only/i);
  assert.equal(model.preflight_checklist_panel.preflight_checklist.length, 2);
  assert.equal(
    model.acknowledgment_requirement_display.acknowledgment_required,
    true
  );
  assert.match(
    model.transition_posture_display.transition_posture,
    /non-executing/i
  );
});

test("[app] page model copy stays display-only", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());

  assert.match(model.display_only_posture ?? "", /display-only/i);
  assert.match(model.display_only_posture ?? "", /human-visible/i);
});

test("[app] page model copy stays non-executing", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());

  assert.match(model.non_executing_posture ?? "", /non-executing/i);
  assert.match(model.non_executing_posture ?? "", /non-approval-automation/i);
  assert.match(model.non_executing_posture ?? "", /non-dispatching/i);
  assert.match(model.non_executing_posture ?? "", /non-provider/i);
  assert.match(model.non_executing_posture ?? "", /non-queueing/i);
});

test("[app] acknowledgment requirement remains display-only and non-authoritative", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());

  assert.match(
    model.acknowledgment_requirement_display.acknowledgment_requirement,
    /display-only requirement summary/i
  );
  assert.match(
    model.acknowledgment_requirement_display.acknowledgment_requirement,
    /non-authoritative/i
  );
});

test("[app] no dispatch or provider wording appears as available capability", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());
  const copy_surface = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /provider\/channel execution available/i);
  assert.doesNotMatch(copy_surface, /provider send available/i);
  assert.doesNotMatch(copy_surface, /channel publish available/i);
  assert.doesNotMatch(copy_surface, /dispatch-ready/i);
  assert.doesNotMatch(copy_surface, /execution ready/i);
});

test("[app] no founder queue or queue implementation capability wording appears", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());
  const copy_surface = JSON.stringify(model);

  assert.doesNotMatch(copy_surface, /queue implementation available/i);
  assert.doesNotMatch(copy_surface, /founder queue available/i);
  assert.doesNotMatch(copy_surface, /queue worker state/i);
});

test("[app] no authoritative transition-state language appears", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());
  const copy_surface = JSON.stringify(model);

  assert.match(model.non_authoritative_posture ?? "", /non-authoritative/i);
  assert.doesNotMatch(copy_surface, /authoritative transition state/i);
  assert.doesNotMatch(copy_surface, /authoritative acknowledgment/i);
});

test("[app] page model preserves safe evidence refs and omission marker", () => {
  const model = createV18ExecutionBoundaryPageModel(create_view());

  assert.deepEqual(model.safe_evidence_refs, ["ref-01", "ref-02"]);
  assert.equal(model.runtime_private_fields_omitted, true);
});
