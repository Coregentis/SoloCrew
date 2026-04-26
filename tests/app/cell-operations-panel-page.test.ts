import assert from "node:assert/strict";
import test from "node:test";

import type {
  OperationalUnitRuntimeProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  createV19CellOperationsPanelPageModel,
} from "../../app/shell/create-v1-9-cell-operations-panel-page-model.ts";
import {
  buildCellOperationsPanelRoute,
  renderCellOperationsPanelPage,
} from "../../app/pages/cell-operations-panel-page.ts";

function createOperationalUnitProjection(
  overrides: Partial<OperationalUnitRuntimeProjection> = {}
): OperationalUnitRuntimeProjection {
  return {
    operational_unit_id: "unit-a",
    project_id: "project-01",
    scope_summary: {
      scope_id: "cell-a",
      scope_kind: "operational_unit",
      status: "active",
      title: "Cell A",
      summary: "Cell A scope summary",
      evidence_refs: ["scope-evidence"],
      runtime_private_fields_omitted: true,
    },
    status: "active",
    priority_summaries: [],
    pending_review_summaries: [],
    recent_artifact_summaries: [],
    task_summaries: [],
    action_summaries: [],
    learning_summaries: [],
    drift_summaries: [],
    suggested_next_actions: [],
    evidence_refs: ["unit-evidence"],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: "2026-04-26T00:00:00.000Z",
    ...overrides,
  };
}

test("[app] Cell Operations Panel page renders bounded thin consumption surface", () => {
  const page = renderCellOperationsPanelPage(
    createV19CellOperationsPanelPageModel(createOperationalUnitProjection(), {
      source_runtime_projection_ref: "runtime-state-01",
    })
  );

  assert.equal(page.route_path, buildCellOperationsPanelRoute("cell-a"));
  assert.equal(page.page_kind, "cell_operations_panel_page");
  assert.equal(page.page_scope, "cell_operations_panel_thin_consumption_only");
  assert.equal(page.operator_surface, "cell_operations_panel_thin_consumption");
  assert.equal(page.non_executing, true);
  assert.equal(page.runtime_private_fields_omitted, true);
  assert.equal(page.provider_execution_available, false);
  assert.equal(page.channel_entry_available, false);
  assert.equal(page.autonomous_operation_available, false);
  assert.equal(page.v2_0_ready, false);
  assert.match(page.html, /Cell Operations Panel/);
  assert.match(page.html, /Boundary note: This is V1\.9 Wave 4\./);
  assert.match(page.html, /Metric summary status:/);
});
