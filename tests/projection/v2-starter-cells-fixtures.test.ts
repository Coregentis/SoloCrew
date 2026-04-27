import assert from "node:assert/strict";
import test from "node:test";

import {
  createV19CellOperationsPanelPageModel,
} from "../../app/shell/create-v1-9-cell-operations-panel-page-model.ts";
import {
  createV19FounderDashboardPageModel,
} from "../../app/shell/create-v1-9-founder-dashboard-page-model.ts";
import {
  assembleCellOperationsPanelProjection,
  assembleCellOperationsPanelProjections,
} from "../../projection/assembly/cell-operations-panel-projection.ts";
import {
  assembleFounderDashboardProjection,
} from "../../projection/assembly/founder-dashboard-projection.ts";
import {
  STARTER_CELL_DEFINITIONS,
  STARTER_CELL_IDS,
  createStarterCellOperationalUnitProjections,
  createStarterCellsRuntimeStateProjection,
  V2_OFFICIAL_STARTER_BLUEPRINT_IDS,
  V2_STARTER_CELL_DEFINITIONS,
  V2_STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
  createV2StarterCellOperationalUnitProjections,
  createV2StarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import * as legacyStarterCellFixtures from "../../projection/fixtures/v2-starter-cells.ts";

function assert_unique_serialized_sets(
  values: readonly unknown[],
  label: string
): void {
  const unique = new Set(values.map((value) => JSON.stringify(value)));
  assert.equal(
    unique.size,
    values.length,
    `${label} should remain distinct across starter cells`
  );
}

test("[projection fixtures] exports exactly three stable starter cells", () => {
  assert.equal(STARTER_CELL_IDS.length, 3);
  assert.deepEqual(STARTER_CELL_IDS, [
    "development_company",
    "ecommerce",
    "personal_media",
  ]);
  assert.equal(new Set(STARTER_CELL_IDS).size, 3);

  const ids = STARTER_CELL_DEFINITIONS.map((definition) => definition.cell_id);
  assert.deepEqual(ids, [...STARTER_CELL_IDS]);
});

test("[projection fixtures] starter blueprint ids are not Cell kinds", () => {
  assert.deepEqual(V2_OFFICIAL_STARTER_BLUEPRINT_IDS, [
    "development_company",
    "ecommerce",
    "personal_media",
  ]);
  assert.deepEqual(V2_OFFICIAL_STARTER_BLUEPRINT_IDS, STARTER_CELL_IDS);

  for (const definition of STARTER_CELL_DEFINITIONS) {
    assert.equal(definition.cell_kind, V2_STARTER_CELL_KIND);
    assert.notEqual(definition.cell_kind, definition.cell_id);
    assert.notEqual(definition.cell_kind, definition.starter_blueprint_id);
    assert.equal(definition.cell_id, definition.starter_blueprint_id);
    assert.match(definition.starter_blueprint_label, /Starter Blueprint$/);
    assert.match(definition.starter_assembly_id, /_starter_assembly$/);
    assert.ok(definition.default_tasks.length > 0);
    assert.ok(definition.default_artifacts.length > 0);
    assert.ok(definition.default_memory_fields.length > 0);
    assert.ok(definition.default_learning_fields.length > 0);
    assert.ok(definition.default_drift_risks.length > 0);
    assert.ok(definition.default_action_classes.length > 0);
    assert.ok(definition.default_review_posture.length > 0);
  }
});

test("[projection fixtures] canonical aliases and legacy compatibility re-export stay behavior-equal", () => {
  assert.deepEqual(STARTER_CELL_IDS, V2_STARTER_CELL_IDS);
  assert.deepEqual(STARTER_CELL_DEFINITIONS, V2_STARTER_CELL_DEFINITIONS);
  assert.deepEqual(
    createStarterCellsRuntimeStateProjection(),
    createV2StarterCellsRuntimeStateProjection()
  );
  assert.deepEqual(
    createStarterCellOperationalUnitProjections(),
    createV2StarterCellOperationalUnitProjections()
  );
  assert.deepEqual(
    createStarterCellsRuntimeStateProjection(),
    legacyStarterCellFixtures.createV2StarterCellsRuntimeStateProjection()
  );
  assert.deepEqual(
    createStarterCellOperationalUnitProjections(),
    legacyStarterCellFixtures.createV2StarterCellOperationalUnitProjections()
  );
});

test("[projection fixtures] starter cell definitions stay distinct across tasks artifacts memory learning and drift", () => {
  assert_unique_serialized_sets(
    STARTER_CELL_DEFINITIONS.map((definition) => definition.default_tasks),
    "default_tasks"
  );
  assert_unique_serialized_sets(
    STARTER_CELL_DEFINITIONS.map((definition) => definition.default_artifacts),
    "default_artifacts"
  );
  assert_unique_serialized_sets(
    STARTER_CELL_DEFINITIONS.map(
      (definition) => definition.default_memory_fields
    ),
    "default_memory_fields"
  );
  assert_unique_serialized_sets(
    STARTER_CELL_DEFINITIONS.map(
      (definition) => definition.default_learning_fields
    ),
    "default_learning_fields"
  );
  assert_unique_serialized_sets(
    STARTER_CELL_DEFINITIONS.map(
      (definition) => definition.default_drift_risks
    ),
    "default_drift_risks"
  );
});

test("[projection fixtures] runtime state projection includes one bounded operational unit per starter cell", () => {
  const runtime_state_projection = createStarterCellsRuntimeStateProjection();
  const operational_units = runtime_state_projection.operational_unit_projections;

  assert.equal(operational_units.length, 3);
  assert.equal(runtime_state_projection.runtime_private_fields_omitted, true);
  assert.equal(runtime_state_projection.non_executing, true);
  assert.deepEqual(
    operational_units.map((unit) => unit.scope_summary.scope_id),
    [...STARTER_CELL_IDS]
  );

  for (const unit of operational_units) {
    assert.equal(unit.runtime_private_fields_omitted, true);
    assert.equal(unit.non_executing, true);
    assert.equal(unit.scope_summary.runtime_private_fields_omitted, true);
  }
});

test("[projection fixtures] founder dashboard and v1.9 founder page model consume the starter cell runtime state projection", () => {
  const runtime_state_projection = createStarterCellsRuntimeStateProjection();
  const dashboard_projection =
    assembleFounderDashboardProjection(runtime_state_projection);
  const founder_page_model =
    createV19FounderDashboardPageModel(runtime_state_projection);

  assert.equal(dashboard_projection.cell_cards.length, 3);
  assert.equal(founder_page_model.dashboard_surface.cell_cards.length, 3);
  assert.deepEqual(
    dashboard_projection.cell_cards.map((card) => card.cell_id),
    [...STARTER_CELL_IDS]
  );
  assert.equal(dashboard_projection.non_executing, true);
  assert.equal(dashboard_projection.runtime_private_fields_omitted, true);
  assert.equal(founder_page_model.v2_0_ready, false);
});

test("[projection fixtures] cell operations assembly and v1.9 cell page model consume every starter cell", () => {
  const runtime_state_projection = createStarterCellsRuntimeStateProjection();
  const panel_projections =
    assembleCellOperationsPanelProjections(runtime_state_projection);

  assert.equal(panel_projections.length, 3);

  for (const operational_unit_projection of createStarterCellOperationalUnitProjections()) {
    const panel_projection = assembleCellOperationsPanelProjection(
      runtime_state_projection.state_projection_id,
      operational_unit_projection
    );
    const page_model = createV19CellOperationsPanelPageModel(
      operational_unit_projection,
      {
        source_runtime_projection_ref: runtime_state_projection.state_projection_id,
      }
    );

    assert.equal(
      panel_projection.cell_id,
      operational_unit_projection.scope_summary.scope_id
    );
    assert.equal(page_model.cell_identity.cell_id, panel_projection.cell_id);
    assert.equal(panel_projection.non_executing, true);
    assert.equal(panel_projection.runtime_private_fields_omitted, true);
    assert.equal(page_model.v2_0_ready, false);
  }
});

test("[projection fixtures] each starter cell includes artifact learning drift and suggested-next-action coverage", () => {
  const operational_units = createStarterCellOperationalUnitProjections();

  for (const unit of operational_units) {
    assert.ok(unit.recent_artifact_summaries.length >= 1);
    assert.ok(
      unit.recent_artifact_summaries.some(
        (artifact) => artifact.artifact_class === "external_draft"
      )
    );
    assert.ok(unit.learning_summaries.length >= 1);
    assert.ok(
      unit.learning_summaries.some((summary) =>
        summary.active_candidates.some(
          (candidate) =>
            candidate.application_scope === "scope_only" &&
            candidate.status === "accepted"
        )
      )
    );
    assert.ok(
      unit.learning_summaries.some((summary) =>
        summary.global_candidate_summaries.some(
          (candidate) =>
            candidate.application_scope === "global_candidate" &&
            candidate.status === "candidate"
        )
      )
    );
    assert.ok(unit.drift_summaries.length >= 1);
    assert.ok(unit.suggested_next_actions.length >= 1);
  }
});

test("[projection fixtures] action readiness stays bounded and forbidden irreversible actions never become executable", () => {
  const operational_units = createStarterCellOperationalUnitProjections();

  for (const unit of operational_units) {
    const auto_local = unit.action_summaries.find(
      (action) => action.action_class === "auto_local"
    );
    const reviewable_local = unit.action_summaries.find(
      (action) => action.action_class === "reviewable_local"
    );
    const external_draft = unit.action_summaries.find(
      (action) => action.action_class === "external_draft"
    );
    const limited_external_dispatch = unit.action_summaries.find(
      (action) => action.action_class === "limited_external_dispatch"
    );
    const forbidden_irreversible = unit.action_summaries.find(
      (action) => action.action_class === "forbidden_irreversible"
    );

    assert.equal(auto_local?.readiness_status, "ready");
    assert.equal(reviewable_local?.readiness_status, "needs_review");
    assert.equal(external_draft?.readiness_status, "needs_review");
    assert.equal(
      limited_external_dispatch?.readiness_status,
      "deferred"
    );
    assert.equal(forbidden_irreversible?.readiness_status, "blocked");
    assert.equal(forbidden_irreversible?.blocked, true);

    const forbidden_suggested_next_action = unit.suggested_next_actions.filter(
      (action) => action.action_class === "forbidden_irreversible"
    );
    assert.equal(forbidden_suggested_next_action.length, 0);
  }
});

test("[projection fixtures] global candidate learning remains candidate-only in projection consumption", () => {
  const unit = createStarterCellOperationalUnitProjections()[0];
  const panel_projection = assembleCellOperationsPanelProjection(
    "starter-runtime-state",
    unit
  );
  const learning_summary = panel_projection.learning_summaries[0];

  assert.ok(learning_summary !== undefined);
  assert.ok(learning_summary.global_candidate_summaries.length >= 1);
  assert.doesNotMatch(
    JSON.stringify(learning_summary.global_candidate_summaries),
    /accepted/i
  );
});

test("[projection fixtures] fixture construction and projection output remain deterministic and free of positive execution claims", () => {
  const first_runtime_state = createStarterCellsRuntimeStateProjection();
  const second_runtime_state = createStarterCellsRuntimeStateProjection();
  const first_dashboard = assembleFounderDashboardProjection(first_runtime_state);
  const second_dashboard = assembleFounderDashboardProjection(second_runtime_state);
  const first_panels = assembleCellOperationsPanelProjections(first_runtime_state);
  const second_panels = assembleCellOperationsPanelProjections(second_runtime_state);

  assert.deepEqual(first_runtime_state, second_runtime_state);
  assert.deepEqual(first_dashboard, second_dashboard);
  assert.deepEqual(first_panels, second_panels);

  const serialized = JSON.stringify({
    runtime_state: first_runtime_state,
    dashboard: first_dashboard,
    panels: first_panels,
  });

  assert.doesNotMatch(
    serialized,
    /provider\/channel execution is available|provider execution is available|channel execution is available/i
  );
  assert.doesNotMatch(
    serialized,
    /autonomous company operation is available|autonomous operation is available/i
  );
  assert.doesNotMatch(serialized, /V2_0_ALLOWED/i);
});
