import assert from "node:assert/strict";
import test from "node:test";

import {
  EXECUTION_BOUNDARY_LINES,
  EXECUTION_BOUNDARY_SUMMARY,
  FOUNDER_DASHBOARD_ROUTE,
  PREPARED_ACTION_BOUNDARY_LINES,
  PREPARED_ACTION_BOUNDARY_SUMMARY,
  V17_PREPARED_ACTION_BOUNDARY_LINES,
  V17_PREPARED_ACTION_BOUNDARY_SUMMARY,
  V18_EXECUTION_BOUNDARY_LINES,
  V18_EXECUTION_BOUNDARY_SUMMARY,
  createExecutionBoundaryPageModel,
  createFounderDashboardPageModel,
  createFounderDashboardShellPageModel,
  createIntakeToPacketPageModel,
  createPacketRevisionPageModel,
  createPreparedActionPageModel,
  createSessionContinuityPageModel,
} from "../../app/engagement/engagement-compatibility-aliases.ts";
import {
  V2_FOUNDER_DASHBOARD_ROUTE,
} from "../../app/pages/v2-founder-dashboard-page.ts";
import {
  createV11IntakeToPacketPageModel,
} from "../../app/shell/create-v1-1-intake-to-packet-page-model.ts";
import {
  createV12PacketRevisionPageModel,
} from "../../app/shell/create-v1-2-packet-revision-page-model.ts";
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
  createV19FounderDashboardPageModel,
} from "../../app/shell/create-v1-9-founder-dashboard-page-model.ts";
import {
  createV2FounderDashboardPageModel,
} from "../../app/shell/create-v2-founder-dashboard-page-model.ts";
import {
  PREPARED_ACTION_BOUNDARY_LINES as DIRECT_PREPARED_ACTION_BOUNDARY_LINES,
  PREPARED_ACTION_BOUNDARY_SUMMARY as DIRECT_PREPARED_ACTION_BOUNDARY_SUMMARY,
} from "../../projection/contracts/v1-7-prepared-action-contract.ts";
import {
  EXECUTION_BOUNDARY_LINES as DIRECT_EXECUTION_BOUNDARY_LINES,
  EXECUTION_BOUNDARY_SUMMARY as DIRECT_EXECUTION_BOUNDARY_SUMMARY,
} from "../../projection/contracts/v1-8-execution-boundary-contract.ts";

test("[engagement] active surface compatibility function aliases are thin wrappers", () => {
  assert.equal(createIntakeToPacketPageModel, createV11IntakeToPacketPageModel);
  assert.equal(createPacketRevisionPageModel, createV12PacketRevisionPageModel);
  assert.equal(createSessionContinuityPageModel, createV16SessionContinuityPageModel);
  assert.equal(createPreparedActionPageModel, createV17PreparedActionPageModel);
  assert.equal(createExecutionBoundaryPageModel, createV18ExecutionBoundaryPageModel);
  assert.equal(createFounderDashboardShellPageModel, createV19FounderDashboardPageModel);
  assert.equal(createFounderDashboardPageModel, createV2FounderDashboardPageModel);
});

test("[engagement] route compatibility alias preserves existing route value", () => {
  assert.equal(FOUNDER_DASHBOARD_ROUTE, V2_FOUNDER_DASHBOARD_ROUTE);
  assert.equal(FOUNDER_DASHBOARD_ROUTE, "/portfolio/v2/founder-dashboard");
});

test("[engagement] projection boundary aliases preserve legacy constants", () => {
  assert.equal(PREPARED_ACTION_BOUNDARY_LINES, V17_PREPARED_ACTION_BOUNDARY_LINES);
  assert.equal(PREPARED_ACTION_BOUNDARY_SUMMARY, V17_PREPARED_ACTION_BOUNDARY_SUMMARY);
  assert.equal(PREPARED_ACTION_BOUNDARY_LINES, DIRECT_PREPARED_ACTION_BOUNDARY_LINES);
  assert.equal(PREPARED_ACTION_BOUNDARY_SUMMARY, DIRECT_PREPARED_ACTION_BOUNDARY_SUMMARY);

  assert.equal(EXECUTION_BOUNDARY_LINES, V18_EXECUTION_BOUNDARY_LINES);
  assert.equal(EXECUTION_BOUNDARY_SUMMARY, V18_EXECUTION_BOUNDARY_SUMMARY);
  assert.equal(EXECUTION_BOUNDARY_LINES, DIRECT_EXECUTION_BOUNDARY_LINES);
  assert.equal(EXECUTION_BOUNDARY_SUMMARY, DIRECT_EXECUTION_BOUNDARY_SUMMARY);
});
