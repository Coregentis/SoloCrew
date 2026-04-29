import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import type {
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  EXECUTION_BOUNDARY_SUMMARY,
  FOUNDER_DASHBOARD_ROUTE as COMPAT_FOUNDER_DASHBOARD_ROUTE,
  PREPARED_ACTION_BOUNDARY_SUMMARY,
  V17_PREPARED_ACTION_BOUNDARY_SUMMARY,
  V18_EXECUTION_BOUNDARY_SUMMARY,
  createCellOperationsPanelPageModel,
  createExecutionBoundaryPageModel,
  createFounderDashboardShellPageModel,
  createPreparedActionPageModel,
  createSessionContinuityPageModel,
} from "../../app/engagement/engagement-compatibility-aliases.ts";
import {
  buildCellOperationsPanelRoute,
  renderCellOperationsPanelPage,
} from "../../app/pages/cell-operations-panel-page.ts";
import {
  FOUNDER_DASHBOARD_ROUTE as ACTIVE_FOUNDER_DASHBOARD_ROUTE,
  renderFounderDashboardPage,
} from "../../app/pages/founder-dashboard-page.ts";
import {
  V2_FOUNDER_DASHBOARD_ROUTE,
} from "../../app/pages/v2-founder-dashboard-page.ts";
import {
  createV16SessionContinuityPageModel,
} from "../../app/shell/create-v1-6-session-continuity-page-model.ts";
import {
  createV17PreparedActionPageModel,
} from "../../app/shell/create-v1-7-prepared-action-page-model.ts";
import {
  createV18ExecutionBoundaryPageModel,
} from "../../app/shell/create-v1-8-execution-boundary-page-model.ts";
import {
  createV19CellOperationsPanelPageModel,
} from "../../app/shell/create-v1-9-cell-operations-panel-page-model.ts";
import {
  createV19FounderDashboardPageModel,
} from "../../app/shell/create-v1-9-founder-dashboard-page-model.ts";

function createOperationalUnitProjection(
  operational_unit_id = "unit-a",
  scope_id = "cell-a",
  title = "Cell A"
): OperationalUnitRuntimeProjection {
  return {
    operational_unit_id,
    project_id: "project-01",
    scope_summary: {
      scope_id,
      scope_kind: "operational_unit",
      status: "active",
      title,
      summary: `${title} scope summary`,
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

test("[engagement] stable shell helper aliases preserve representative outputs", () => {
  assert.deepEqual(
    createSessionContinuityPageModel(),
    createV16SessionContinuityPageModel()
  );
  assert.deepEqual(
    createPreparedActionPageModel(),
    createV17PreparedActionPageModel()
  );
  assert.deepEqual(
    createExecutionBoundaryPageModel(),
    createV18ExecutionBoundaryPageModel()
  );

  assert.deepEqual(
    createFounderDashboardShellPageModel(createRuntimeStateProjection()),
    createV19FounderDashboardPageModel(createRuntimeStateProjection())
  );

  assert.deepEqual(
    createCellOperationsPanelPageModel(createOperationalUnitProjection(), {
      source_runtime_projection_ref: "runtime-state-01",
    }),
    createV19CellOperationsPanelPageModel(createOperationalUnitProjection(), {
      source_runtime_projection_ref: "runtime-state-01",
    })
  );
});

test("[engagement] stable route and boundary aliases preserve legacy values", () => {
  assert.equal(COMPAT_FOUNDER_DASHBOARD_ROUTE, V2_FOUNDER_DASHBOARD_ROUTE);
  assert.equal(COMPAT_FOUNDER_DASHBOARD_ROUTE, "/portfolio/v2/founder-dashboard");
  assert.equal(
    PREPARED_ACTION_BOUNDARY_SUMMARY,
    V17_PREPARED_ACTION_BOUNDARY_SUMMARY
  );
  assert.equal(EXECUTION_BOUNDARY_SUMMARY, V18_EXECUTION_BOUNDARY_SUMMARY);
});

test("[engagement] migrated active pages render expected bounded content", () => {
  const founder_page = renderFounderDashboardPage(
    createFounderDashboardShellPageModel(createRuntimeStateProjection())
  );
  assert.equal(founder_page.route_path, ACTIVE_FOUNDER_DASHBOARD_ROUTE);
  assert.match(founder_page.html, /Founder Dashboard/);
  assert.match(founder_page.html, /Cell Cards/);
  assert.match(founder_page.html, /Boundary note: This is V1\.9 Wave 4\./);

  const cell_page = renderCellOperationsPanelPage(
    createCellOperationsPanelPageModel(createOperationalUnitProjection(), {
      source_runtime_projection_ref: "runtime-state-01",
    })
  );
  assert.equal(cell_page.route_path, buildCellOperationsPanelRoute("cell-a"));
  assert.match(cell_page.html, /Cell Operations Panel/);
  assert.match(cell_page.html, /Metric summary status:/);
  assert.match(cell_page.html, /Boundary note: This is V1\.9 Wave 4\./);
});

test("[engagement] active pages and adapters consume canonical alias surfaces", () => {
  const migrated_page_files = [
    "app/pages/founder-request-intake-page.ts",
    "app/pages/secretary-handoff-page.ts",
    "app/pages/secretary-handoff-review-page.ts",
    "app/pages/founder-dashboard-page.ts",
    "app/pages/cell-operations-panel-page.ts",
  ];

  for (const file_path of migrated_page_files) {
    const source = readFileSync(file_path, "utf8");
    assert.match(source, /engagement-compatibility-aliases\.ts/);
  }

  assert.doesNotMatch(
    readFileSync("app/pages/founder-request-intake-page.ts", "utf8"),
    /create-v1-1-intake-to-packet-page-model\.ts/
  );
  assert.doesNotMatch(
    readFileSync("app/pages/secretary-handoff-page.ts", "utf8"),
    /create-v1-1-intake-to-packet-page-model\.ts/
  );
  assert.doesNotMatch(
    readFileSync("app/pages/secretary-handoff-review-page.ts", "utf8"),
    /create-v1-1-intake-to-packet-page-model\.ts/
  );
  assert.doesNotMatch(
    readFileSync("app/pages/founder-dashboard-page.ts", "utf8"),
    /create-v1-9-founder-dashboard-page-model\.ts/
  );
  assert.doesNotMatch(
    readFileSync("app/pages/cell-operations-panel-page.ts", "utf8"),
    /create-v1-9-cell-operations-panel-page-model\.ts/
  );

  assert.doesNotMatch(
    readFileSync("projection/adapters/v1-7-prepared-action-adapter.ts", "utf8"),
    /V17_PREPARED_ACTION_BOUNDARY_SUMMARY/
  );
  assert.doesNotMatch(
    readFileSync("projection/adapters/v1-8-execution-boundary-adapter.ts", "utf8"),
    /V18_EXECUTION_BOUNDARY_SUMMARY/
  );
});
