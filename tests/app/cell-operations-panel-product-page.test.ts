import assert from "node:assert/strict";
import test from "node:test";

import {
  buildCellOperationsPanelProductRoute,
  renderCellOperationsPanelProductPage,
} from "../../app/pages/cell-operations-panel-product-page.ts";
import {
  createCellOperationsPanelProductPageModel,
} from "../../app/shell/create-cell-operations-panel-product-page-model.ts";

test("[app] productized Cell Operations Panel renderer exposes product-facing sections and boundary notices", () => {
  const page = renderCellOperationsPanelProductPage(
    createCellOperationsPanelProductPageModel()
  );

  assert.equal(
    page.route_path,
    buildCellOperationsPanelProductRoute("development_company")
  );
  assert.equal(page.page_kind, "cell_operations_panel_product_page");
  assert.equal(page.page_scope, "cell_operations_panel_product_surface");
  assert.equal(page.operator_surface, "cell_operations_panel_productized");
  assert.equal(page.non_executing, true);
  assert.equal(page.runtime_private_fields_omitted, true);
  assert.equal(page.provider_execution_available, false);
  assert.equal(page.channel_entry_available, false);
  assert.equal(page.autonomous_operation_available, false);
  assert.equal(page.v2_0_delivered, false);
  assert.equal(page.v2_0_ready, false);
  assert.equal(page.ga_available, false);
  assert.match(page.page_title, /Cell Operations Panel/);
  assert.match(page.hero_summary, /canonical starter-cell fixtures/i);
  assert.match(page.cell_identity_summary, /Development Company Cell/);
  assert.match(page.objective_summary, /bounded feature scope|implementation plan/i);
  assert.match(page.task_summary, /task summaries remain visible/i);
  assert.match(page.artifact_summary, /artifact summaries remain visible/i);
  assert.match(page.action_readiness_summary, /action summaries remain visible/i);
  assert.match(page.learning_summary, /learning signals remain visible/i);
  assert.match(page.drift_summary, /drift summaries remain visible/i);
  assert.match(page.review_summary, /review summaries remain visible/i);
  assert.match(page.history_summary, /history items remain visible/i);
  assert.match(page.metric_summary, /bounded metrics remain visible/i);
  assert.match(page.suggested_next_actions_summary, /suggested next actions remain visible/i);
  assert.match(page.boundary_summary, /non-executing/i);
  assert.equal(
    page.next_allowed_wave,
    "V2.0 Wave 5 — Artifact Workflow and Persistence"
  );
});

test("[app] productized Cell Operations Panel renderer shows all product-facing sections without forbidden positive execution words", () => {
  const page = renderCellOperationsPanelProductPage(
    createCellOperationsPanelProductPageModel(undefined, {
      target_cell_id: "personal_media",
    })
  );

  assert.match(page.html, /Objective/);
  assert.match(page.html, /Tasks/);
  assert.match(page.html, /Artifacts/);
  assert.match(page.html, /Actions/);
  assert.match(page.html, /Learning/);
  assert.match(page.html, /Drift/);
  assert.match(page.html, /Reviews/);
  assert.match(page.html, /History/);
  assert.match(page.html, /Metrics/);
  assert.match(page.html, /Suggested Next Actions/);
  assert.match(page.html, /Boundary Summary/);
  assert.match(page.html, /provider\/channel execution/i);
  assert.match(page.html, /Next wave: Artifact Workflow and Persistence\./);

  assert.doesNotMatch(
    page.html,
    /\bapproved\b|\bdispatched\b|\bexecuted\b|\bprovider_ready\b|\bchannel_ready\b|\bautonomous_ready\b/i
  );
  assert.doesNotMatch(page.html, /V2\.0 ready/i);
  assert.doesNotMatch(page.html, /V2\.0 delivered/i);
});
