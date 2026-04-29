import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import {
  createFounderDashboardContinuationPageModel,
  create_founder_dashboard_continuation_page_model,
} from "../../app/engagement/engagement-compatibility-aliases.ts";
import {
  FOUNDER_DASHBOARD_CONTINUATION_BOUNDARY_FLAGS,
  V2_2_FOUNDER_DASHBOARD_BOUNDARY_FLAGS,
} from "../../app/dashboard/v2-2-founder-dashboard-continuation-contract.ts";
import {
  createIntakeToPacketPageModel,
  createV11IntakeToPacketPageModel,
} from "../../app/shell/create-v1-1-intake-to-packet-page-model.ts";
import {
  createPacketRevisionPageModel,
  createV12PacketRevisionPageModel,
} from "../../app/shell/create-v1-2-packet-revision-page-model.ts";
import {
  createSessionContinuityPageModel,
  createV16SessionContinuityPageModel,
} from "../../app/shell/create-v1-6-session-continuity-page-model.ts";
import {
  createPreparedActionPageModel,
  createV17PreparedActionPageModel,
} from "../../app/shell/create-v1-7-prepared-action-page-model.ts";
import {
  createExecutionBoundaryPageModel,
  createV18ExecutionBoundaryPageModel,
} from "../../app/shell/create-v1-8-execution-boundary-page-model.ts";
import {
  createFounderDashboardShellPageModel,
  createV19FounderDashboardPageModel,
} from "../../app/shell/create-v1-9-founder-dashboard-page-model.ts";
import {
  createCellOperationsPanelPageModel,
  createV19CellOperationsPanelPageModel,
} from "../../app/shell/create-v1-9-cell-operations-panel-page-model.ts";
import {
  createFounderDashboardProductPageModel,
  createV2FounderDashboardPageModel,
} from "../../app/shell/create-v2-founder-dashboard-page-model.ts";
import {
  FOUNDER_DASHBOARD_PRODUCT_ROUTE,
  V2_FOUNDER_DASHBOARD_ROUTE,
  renderFounderDashboardProductPage,
  renderV2FounderDashboardPage,
} from "../../app/pages/v2-founder-dashboard-page.ts";

test("[engagement] shell/page stable helper wrappers preserve legacy helper identity", () => {
  assert.equal(createIntakeToPacketPageModel, createV11IntakeToPacketPageModel);
  assert.equal(createPacketRevisionPageModel, createV12PacketRevisionPageModel);
  assert.equal(createSessionContinuityPageModel, createV16SessionContinuityPageModel);
  assert.equal(createPreparedActionPageModel, createV17PreparedActionPageModel);
  assert.equal(createExecutionBoundaryPageModel, createV18ExecutionBoundaryPageModel);
  assert.equal(createFounderDashboardShellPageModel, createV19FounderDashboardPageModel);
  assert.equal(createCellOperationsPanelPageModel, createV19CellOperationsPanelPageModel);
  assert.equal(createFounderDashboardProductPageModel, createV2FounderDashboardPageModel);
  assert.equal(
    createFounderDashboardContinuationPageModel,
    create_founder_dashboard_continuation_page_model
  );
});

test("[engagement] canonical metadata fields sit beside legacy active metadata", () => {
  const runtime_state = createStarterCellsRuntimeStateProjection();
  const founder_shell = createFounderDashboardShellPageModel(runtime_state);
  const cell_panel = createCellOperationsPanelPageModel(
    runtime_state.operational_unit_projections[0]
  );
  const founder_product = createFounderDashboardProductPageModel(runtime_state);
  const continuation = createFounderDashboardContinuationPageModel();

  assert.equal(founder_shell.phase_boundary, "v1_9_wave4_product_surface_thin_consumption");
  assert.equal(founder_shell.phase_ref, "founder_dashboard_thin_consumption");
  assert.equal(founder_shell.v2_0_ready, false);
  assert.equal(founder_shell.readiness_status, false);

  assert.equal(cell_panel.phase_boundary, "v1_9_wave4_product_surface_thin_consumption");
  assert.equal(cell_panel.phase_ref, "cell_operations_panel_thin_consumption");
  assert.equal(cell_panel.v2_0_ready, false);
  assert.equal(cell_panel.readiness_status, false);

  assert.equal(founder_product.page_kind, "v2_founder_dashboard_productized");
  assert.equal(founder_product.canonical_page_kind, "founder_dashboard_productized");
  assert.equal(founder_product.product_line, "v2_0");
  assert.equal(founder_product.release_line, "v2_0");
  assert.equal(founder_product.phase_boundary, "v2_0_wave3_founder_dashboard_productization");
  assert.equal(founder_product.phase_ref, "founder_dashboard_productization");
  assert.equal(founder_product.v2_0_delivered, false);
  assert.equal(founder_product.delivery_status, false);
  assert.equal(founder_product.v2_0_ready, false);
  assert.equal(founder_product.readiness_status, false);

  assert.equal(continuation.page_id, "v2_2_founder_dashboard_continuation");
  assert.equal(continuation.page_ref, "founder_dashboard_continuation");
  assert.equal(continuation.boundary_flags.no_completion_claim, true);
  assert.equal(continuation.boundary_flags.no_v2_2_completion_claim, true);
  assert.equal(
    FOUNDER_DASHBOARD_CONTINUATION_BOUNDARY_FLAGS,
    V2_2_FOUNDER_DASHBOARD_BOUNDARY_FLAGS
  );
});

test("[engagement] route values and rendered product page output remain unchanged", () => {
  const model = createFounderDashboardProductPageModel(
    createStarterCellsRuntimeStateProjection()
  );

  assert.equal(FOUNDER_DASHBOARD_PRODUCT_ROUTE, V2_FOUNDER_DASHBOARD_ROUTE);
  assert.equal(FOUNDER_DASHBOARD_PRODUCT_ROUTE, "/portfolio/v2/founder-dashboard");
  assert.equal(renderFounderDashboardProductPage, renderV2FounderDashboardPage);
  assert.deepEqual(
    renderFounderDashboardProductPage(model),
    renderV2FounderDashboardPage(model)
  );

  const page = renderFounderDashboardProductPage(model);
  assert.equal(page.route_path, "/portfolio/v2/founder-dashboard");
  assert.equal(page.page_kind, "v2_founder_dashboard_page");
  assert.equal(page.canonical_page_kind, "founder_dashboard_product_page");
  assert.equal(page.operator_surface, "v2_founder_dashboard_productized");
  assert.equal(page.canonical_operator_surface, "founder_dashboard_productized");
  assert.equal(page.phase_boundary, "v2_0_wave3_founder_dashboard_productization");
  assert.equal(page.phase_ref, "founder_dashboard_productization");
  assert.equal(page.v2_0_delivered, false);
  assert.equal(page.delivery_status, false);
  assert.equal(page.v2_0_ready, false);
  assert.equal(page.readiness_status, false);
});

test("[engagement] stable wrappers preserve representative shell outputs", () => {
  const runtime_state = createStarterCellsRuntimeStateProjection();

  assert.deepEqual(
    createFounderDashboardShellPageModel(runtime_state),
    createV19FounderDashboardPageModel(runtime_state)
  );
  assert.deepEqual(
    createCellOperationsPanelPageModel(
      runtime_state.operational_unit_projections[0]
    ),
    createV19CellOperationsPanelPageModel(
      runtime_state.operational_unit_projections[0]
    )
  );
  assert.deepEqual(
    createFounderDashboardProductPageModel(runtime_state),
    createV2FounderDashboardPageModel(runtime_state)
  );
});

test("[engagement] canonicalization wave introduced no V2.5 runtime symbols", () => {
  const inspected_files = [
    "app/shell/create-v1-1-intake-to-packet-page-model.ts",
    "app/shell/create-v1-2-packet-revision-page-model.ts",
    "app/shell/create-v1-6-session-continuity-page-model.ts",
    "app/shell/create-v1-7-prepared-action-page-model.ts",
    "app/shell/create-v1-8-execution-boundary-page-model.ts",
    "app/shell/create-v1-9-founder-dashboard-page-model.ts",
    "app/shell/create-v1-9-cell-operations-panel-page-model.ts",
    "app/shell/create-v2-founder-dashboard-page-model.ts",
    "app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts",
    "app/dashboard/v2-2-founder-dashboard-continuation-contract.ts",
    "app/pages/v2-founder-dashboard-page.ts",
  ];

  for (const file_path of inspected_files) {
    assert.doesNotMatch(readFileSync(file_path, "utf8"), /V2_5|V25|createV25/);
  }
});
