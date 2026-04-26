import assert from "node:assert/strict";
import test from "node:test";
import fs from "node:fs";

import {
  createCellOperationsPanelProductPageModel,
} from "../../app/shell/create-cell-operations-panel-product-page-model.ts";
import {
  STARTER_CELL_IDS,
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function read_file(relative_path: string): string {
  return fs.readFileSync(
    new URL(`../../${relative_path}`, import.meta.url),
    "utf8"
  );
}

test("[app] productized Cell Operations Panel consumes canonical starter-cell fixtures", () => {
  const model = createCellOperationsPanelProductPageModel(
    createStarterCellsRuntimeStateProjection(),
    {
      target_cell_id: "development_company",
    }
  );

  assert.equal(model.page_kind, "cell_operations_panel_productized");
  assert.equal(
    model.phase_boundary,
    "v2_0_wave4_cell_operations_panel_productization"
  );
  assert.equal(model.product_line, "v2_0");
  assert.equal(model.product_surface, "cell_operations_panel");
  assert.equal(
    model.source_fixture_ref,
    "projection/fixtures/starter-cell-fixtures.ts"
  );
});

test("[app] productized Cell Operations Panel can render each starter cell with distinct content", () => {
  const runtime_state_projection = createStarterCellsRuntimeStateProjection();
  const models = STARTER_CELL_IDS.map((cell_id) =>
    createCellOperationsPanelProductPageModel(runtime_state_projection, {
      target_cell_id: cell_id,
    })
  );

  assert.deepEqual(
    models.map((model) => model.cell_identity.cell_id),
    [...STARTER_CELL_IDS]
  );
  assert.deepEqual(
    models.map((model) => model.cell_identity.cell_label),
    [
      "Development Company Cell",
      "E-commerce Cell",
      "Personal Media Cell",
    ]
  );
  assert.notEqual(models[0]?.task_section.items[0]?.title, models[1]?.task_section.items[0]?.title);
  assert.notEqual(models[1]?.artifact_section.items[0]?.title, models[2]?.artifact_section.items[0]?.title);
  assert.notEqual(
    models[0]?.learning_section.accepted_scope_only_learning[0],
    models[2]?.learning_section.accepted_scope_only_learning[0]
  );
  assert.notEqual(models[0]?.drift_section.items[0]?.impact_summary, models[1]?.drift_section.items[0]?.impact_summary);
  assert.notEqual(
    models[0]?.suggested_next_action_section.items[0]?.title,
    models[2]?.suggested_next_action_section.items[0]?.title
  );
});

test("[app] each productized Cell panel includes objective task artifact action learning drift review history metric and suggested-next-action sections", () => {
  const runtime_state_projection = createStarterCellsRuntimeStateProjection();

  for (const cell_id of STARTER_CELL_IDS) {
    const model = createCellOperationsPanelProductPageModel(
      runtime_state_projection,
      { target_cell_id: cell_id }
    );

    assert.ok(model.objective_section.summary.length > 0);
    assert.ok(model.task_section.summary.length > 0);
    assert.ok(model.artifact_section.summary.length > 0);
    assert.ok(model.action_section.summary.length > 0);
    assert.ok(model.learning_section.summary.length > 0);
    assert.ok(model.drift_section.summary.length > 0);
    assert.ok(model.review_section.summary.length > 0);
    assert.ok(model.history_section.summary.length > 0);
    assert.ok(model.metric_section.summary.length > 0);
    assert.ok(model.suggested_next_action_section.summary.length > 0);
  }
});

test("[app] action readiness is preserved in productized Cell Operations panels", () => {
  const model = createCellOperationsPanelProductPageModel();
  const actions_by_readiness = new Map(
    model.action_section.items.map((item) => [item.action_kind_label, item.display_readiness])
  );

  assert.equal(actions_by_readiness.get("Auto local"), "ready_for_local_bounded_update");
  assert.equal(actions_by_readiness.get("Reviewable local"), "needs_review");
  assert.equal(actions_by_readiness.get("External draft"), "draft_only_needs_review");
  assert.equal(actions_by_readiness.get("Limited external handoff"), "deferred_strong_confirmation");
  assert.equal(actions_by_readiness.get("Irreversible action boundary"), "blocked");

  const forbidden = model.action_section.items.find(
    (item) => item.action_kind_label === "Irreversible action boundary"
  );
  const external_draft = model.action_section.items.find(
    (item) => item.action_kind_label === "External draft"
  );

  assert.equal(forbidden?.blocked, true);
  assert.doesNotMatch(JSON.stringify(external_draft), /dispatched/i);
});

test("[app] learning and drift boundaries remain bounded in productized Cell panels", () => {
  const model = createCellOperationsPanelProductPageModel();

  assert.ok(model.learning_section.global_candidate_learning.length >= 1);
  assert.ok(model.learning_section.accepted_scope_only_learning.length >= 1);
  assert.ok(model.learning_section.boundary_notice.includes("Global candidate learning remains candidate-only."));
  assert.ok(model.learning_section.boundary_notice.includes("No cross-Cell pollution"));
  assert.ok(model.drift_section.items.length >= 1);
  assert.ok(model.drift_section.boundary_notice.includes("No interactive drift resolution"));
});

test("[app] productized Cell Operations Panel preserves bounded capability flags and omission markers", () => {
  const model = createCellOperationsPanelProductPageModel();

  assert.equal(model.non_executing, true);
  assert.equal(model.runtime_private_fields_omitted, true);
  assert.equal(model.provider_execution_available, false);
  assert.equal(model.channel_entry_available, false);
  assert.equal(model.autonomous_operation_available, false);
  assert.equal(model.v2_0_delivered, false);
  assert.equal(model.v2_0_ready, false);
  assert.equal(model.ga_available, false);
});

test("[app] productized Cell Operations Panel is deterministic and missing optional sections degrade gracefully", () => {
  const input = createStarterCellsRuntimeStateProjection();
  const first = createCellOperationsPanelProductPageModel(input, {
    target_cell_id: "development_company",
  });
  const second = createCellOperationsPanelProductPageModel(input, {
    target_cell_id: "development_company",
  });
  const degraded = createCellOperationsPanelProductPageModel(
    {
      ...input,
      operational_unit_projections: input.operational_unit_projections.map((unit) =>
        unit.scope_summary.scope_id === "development_company"
          ? {
              ...unit,
              recent_artifact_summaries: [],
              learning_summaries: [],
              drift_summaries: [],
            }
          : unit
      ),
    },
    { target_cell_id: "development_company" }
  );

  assert.deepEqual(first, second);
  assert.match(
    degraded.artifact_section.empty_notice ?? "",
    /No artifact summaries are visible/
  );
  assert.equal(degraded.learning_section.accepted_scope_only_learning.length, 0);
  assert.equal(degraded.drift_section.items.length, 0);
});

test("[app] imports use canonical starter-cell-fixtures path and not legacy v2-starter-cells path", () => {
  const shell_source = read_file(
    "app/shell/create-cell-operations-panel-product-page-model.ts"
  );

  assert.match(shell_source, /starter-cell-fixtures\.ts/);
  assert.doesNotMatch(shell_source, /v2-starter-cells/);
});
