import assert from "node:assert/strict";
import test from "node:test";

import type {
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  createV19FounderDashboardPageModel,
} from "../../app/shell/create-v1-9-founder-dashboard-page-model.ts";
import {
  FOUNDER_DASHBOARD_ROUTE,
  renderFounderDashboardPage,
} from "../../app/pages/founder-dashboard-page.ts";

function createOperationalUnitProjection(
  operational_unit_id: string,
  scope_id: string,
  title: string
): OperationalUnitRuntimeProjection {
  return {
    operational_unit_id,
    project_id: "project-01",
    scope_summary: {
      scope_id,
      scope_kind: "operational_unit",
      status: "active",
      title,
      summary: `${title} summary`,
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
  };
}

function createRuntimeStateProjection(): RuntimeStateProjection {
  return {
    state_projection_id: "runtime-state-projection-01",
    project_id: "project-01",
    operational_unit_projections: [
      createOperationalUnitProjection("unit-a", "cell-a", "Cell A"),
      createOperationalUnitProjection("unit-b", "cell-b", "Cell B"),
    ],
    evidence_refs: ["state-evidence-01"],
    runtime_private_fields_omitted: true,
    non_executing: true,
    created_at: "2026-04-26T00:00:00.000Z",
  };
}

test("[app] Founder Dashboard page renders bounded thin consumption surface", () => {
  const page = renderFounderDashboardPage(
    createV19FounderDashboardPageModel(createRuntimeStateProjection())
  );

  assert.equal(page.route_path, FOUNDER_DASHBOARD_ROUTE);
  assert.equal(page.page_kind, "founder_dashboard_page");
  assert.equal(page.page_scope, "founder_dashboard_thin_consumption_only");
  assert.equal(page.operator_surface, "founder_dashboard_thin_consumption");
  assert.equal(page.non_executing, true);
  assert.equal(page.runtime_private_fields_omitted, true);
  assert.equal(page.provider_execution_available, false);
  assert.equal(page.channel_entry_available, false);
  assert.equal(page.autonomous_operation_available, false);
  assert.equal(page.v2_0_ready, false);
  assert.match(page.html, /Founder Dashboard/);
  assert.match(page.html, /Cell Cards/);
  assert.match(page.html, /Boundary note: This is V1\.9 Wave 4\./);
});
