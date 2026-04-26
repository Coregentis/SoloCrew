import assert from "node:assert/strict";
import test from "node:test";

import {
  createV2FounderDashboardPageModel,
} from "../../app/shell/create-v2-founder-dashboard-page-model.ts";
import {
  V2_STARTER_CELL_IDS,
  createV2StarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/v2-starter-cells.ts";

test("[app] V2 Founder Dashboard page model consumes V2 starter-cell fixtures", () => {
  const model = createV2FounderDashboardPageModel(
    createV2StarterCellsRuntimeStateProjection()
  );

  assert.equal(model.page_kind, "v2_founder_dashboard_productized");
  assert.equal(
    model.phase_boundary,
    "v2_0_wave3_founder_dashboard_productization"
  );
  assert.equal(model.product_line, "v2_0");
  assert.equal(model.product_surface, "founder_dashboard");
  assert.equal(model.source_fixture_ref.includes("v2-starter-cells.ts"), true);
});

test("[app] V2 Founder Dashboard page model includes exactly three starter cells with the required labels", () => {
  const model = createV2FounderDashboardPageModel();

  assert.equal(model.cells_overview.length, 3);
  assert.deepEqual(
    model.cells_overview.map((item) => item.cell_id),
    [...V2_STARTER_CELL_IDS]
  );
  assert.deepEqual(
    model.cells_overview.map((item) => item.cell_label),
    [
      "Development Company Cell",
      "E-commerce Cell",
      "Personal Media Cell",
    ]
  );
});

test("[app] each V2 Founder Dashboard card exposes status priority pending review recent artifact learned preference drift and suggested next action", () => {
  const model = createV2FounderDashboardPageModel();

  for (const card of model.cells_overview) {
    assert.ok(card.status.length > 0);
    assert.ok(card.current_priority_summary.length > 0);
    assert.ok(card.pending_review_summary.length > 0);
    assert.ok(card.recent_artifact_summary.length > 0);
    assert.ok(card.learned_preference_summary.length > 0);
    assert.ok(card.drift_summary.length > 0);
    assert.ok(card.suggested_next_action_summary.length > 0);
    assert.ok(card.source_evidence_refs.length > 0);
    assert.equal(card.non_executing, true);
  }
});

test("[app] V2 Founder Dashboard includes active priorities pending reviews recent artifacts learned preferences drift blocked items and suggested next actions", () => {
  const model = createV2FounderDashboardPageModel();

  assert.equal(model.active_priorities.length, 3);
  assert.equal(model.pending_reviews.length, 3);
  assert.ok(model.recent_artifacts.length >= 3);
  assert.ok(model.learned_preferences.length >= 3);
  assert.equal(model.drift_and_blocked_items.length, 3);
  assert.ok(model.suggested_next_actions.length >= 3);
});

test("[app] V2 Founder Dashboard preserves non-executing runtime omission and bounded capability flags", () => {
  const model = createV2FounderDashboardPageModel();

  assert.equal(model.non_executing, true);
  assert.equal(model.runtime_private_fields_omitted, true);
  assert.equal(model.provider_execution_available, false);
  assert.equal(model.channel_entry_available, false);
  assert.equal(model.autonomous_operation_available, false);
  assert.equal(model.v2_0_delivered, false);
  assert.equal(model.v2_0_ready, false);
  assert.equal(model.ga_available, false);
});

test("[app] V2 Founder Dashboard has productized copy and avoids forbidden positive execution words", () => {
  const model = createV2FounderDashboardPageModel();
  const serialized = JSON.stringify(model);

  assert.match(serialized, /V2\.0 Founder Dashboard productization/);
  assert.match(serialized, /starter-cell fixtures/i);
  assert.match(serialized, /non-executing/i);
  assert.match(serialized, /not V2\.0 delivery/i);
  assert.match(serialized, /No provider\/channel execution\./);
  assert.match(serialized, /Next wave: Cell Operations Panel Productization\./);

  assert.doesNotMatch(
    serialized,
    /\bapproved\b|\bdispatched\b|\bexecuted\b|\bprovider_ready\b|\bchannel_ready\b|\bautonomous_ready\b/i
  );
  assert.doesNotMatch(serialized, /V2\.0 ready/i);
  assert.doesNotMatch(serialized, /V2\.0 delivered/i);
});

test("[app] V2 Founder Dashboard output is deterministic across repeated construction", () => {
  const input = createV2StarterCellsRuntimeStateProjection();
  const first = createV2FounderDashboardPageModel(input);
  const second = createV2FounderDashboardPageModel(input);

  assert.deepEqual(first, second);
});

test("[app] V2 Founder Dashboard missing optional artifact or learning sections degrade gracefully", () => {
  const runtime_state_projection = createV2StarterCellsRuntimeStateProjection();
  const model = createV2FounderDashboardPageModel({
    ...runtime_state_projection,
    operational_unit_projections: runtime_state_projection.operational_unit_projections.map(
      (unit, index) =>
        index === 0
          ? {
              ...unit,
              recent_artifact_summaries: [],
              learning_summaries: [],
            }
          : unit
    ),
  });
  const development_card = model.cells_overview.find(
    (item) => item.cell_id === "development_company"
  );

  assert.ok(development_card !== undefined);
  assert.match(
    development_card.recent_artifact_summary,
    /No recent artifact summary is visible/
  );
  assert.match(
    development_card.learned_preference_summary,
    /No learned preference summary is visible/
  );
});
