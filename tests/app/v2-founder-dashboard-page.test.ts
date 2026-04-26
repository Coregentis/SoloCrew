import assert from "node:assert/strict";
import test from "node:test";

import {
  renderV2FounderDashboardPage,
  V2_FOUNDER_DASHBOARD_ROUTE,
} from "../../app/pages/v2-founder-dashboard-page.ts";
import {
  createV2FounderDashboardPageModel,
} from "../../app/shell/create-v2-founder-dashboard-page-model.ts";

test("[app] V2 Founder Dashboard renderer exposes product-facing sections and boundary notices", () => {
  const page = renderV2FounderDashboardPage(createV2FounderDashboardPageModel());

  assert.equal(page.route_path, V2_FOUNDER_DASHBOARD_ROUTE);
  assert.equal(page.page_kind, "v2_founder_dashboard_page");
  assert.equal(page.page_scope, "founder_dashboard_product_surface");
  assert.equal(page.operator_surface, "v2_founder_dashboard_productized");
  assert.equal(page.non_executing, true);
  assert.equal(page.runtime_private_fields_omitted, true);
  assert.equal(page.provider_execution_available, false);
  assert.equal(page.channel_entry_available, false);
  assert.equal(page.autonomous_operation_available, false);
  assert.equal(page.v2_0_delivered, false);
  assert.equal(page.v2_0_ready, false);
  assert.equal(page.ga_available, false);
  assert.equal(page.starter_cell_cards.length, 3);
  assert.match(page.page_title, /V2\.0 Founder Dashboard productization/);
  assert.match(page.hero_summary, /starter-cell fixtures/i);
  assert.match(page.review_queue_summary, /pending review items/);
  assert.match(page.artifact_activity_summary, /recent artifacts/);
  assert.match(page.learning_summary, /learned preference summaries/);
  assert.match(page.drift_summary, /drift or bounded attention summaries/);
  assert.match(page.suggested_next_actions_summary, /suggested next actions/);
  assert.match(page.boundary_summary, /non-executing/i);
  assert.equal(
    page.next_allowed_wave,
    "Next wave: Cell Operations Panel Productization."
  );
});

test("[app] V2 Founder Dashboard renderer shows all three starter cells and productized sections without forbidden positive execution words", () => {
  const page = renderV2FounderDashboardPage(createV2FounderDashboardPageModel());

  assert.match(page.html, /Development Company Cell/);
  assert.match(page.html, /E-commerce Cell/);
  assert.match(page.html, /Personal Media Cell/);
  assert.match(page.html, /Starter Cells/);
  assert.match(page.html, /Review Queue/);
  assert.match(page.html, /Artifact Activity/);
  assert.match(page.html, /Learning Continuity/);
  assert.match(page.html, /Drift And Blocked Items/);
  assert.match(page.html, /Suggested Next Actions/);
  assert.match(page.html, /Boundary Summary/);
  assert.match(page.html, /No provider\/channel execution\./);
  assert.match(page.html, /Next wave: Cell Operations Panel Productization\./);

  assert.doesNotMatch(
    page.html,
    /\bapproved\b|\bdispatched\b|\bexecuted\b|\bprovider_ready\b|\bchannel_ready\b|\bautonomous_ready\b/i
  );
  assert.doesNotMatch(page.html, /V2\.0 ready/i);
  assert.doesNotMatch(page.html, /V2\.0 delivered/i);
});
