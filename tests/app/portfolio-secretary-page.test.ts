import assert from "node:assert/strict";
import test from "node:test";

import {
  PORTFOLIO_SECRETARY_ROUTE,
  composePortfolioSecretaryShellFromRuntimeInputs,
} from "../../app/shell/portfolio-secretary-shell.ts";
import {
  renderPortfolioSecretaryPage,
} from "../../app/pages/portfolio-secretary-page.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createWorkforceCellProjectionInputs,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";


test("[app] portfolio secretary page stays top-level navigation only and below direct-control semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(createWorkforceCellProjectionInputs());
  const page = renderPortfolioSecretaryPage(portfolio_shell);

  assert.equal(page.route_path, PORTFOLIO_SECRETARY_ROUTE);
  assert.equal(page.page_kind, "portfolio_secretary_page");
  assert.equal(page.page_scope, "portfolio_secretary_beta_shell_only");
  assert.equal(page.operator_surface, "portfolio_secretary_beta");
  assert.equal(page.navigation_mode, "top_level_product_navigation_only");
  assert.equal(page.secretary_behavior_available, true);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.direct_approve_control_available, false);
  assert.equal(page.direct_reject_control_available, false);
  assert.equal(page.direct_dispatch_control_available, false);
  assert.equal(page.direct_execute_control_available, false);
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.workflow_engine_behavior_available, false);
  assert.equal(page.handoff_creation_available, true);
  assert.equal(page.sections.header.read_mode, "non_executing");
  assert.equal(page.sections.navigation.foundation_overview_route, "/cells");
  assert.equal(page.sections.navigation.cell_links.length, 2);
  assert.equal(
    page.sections.navigation.selected_cell_routes?.detail_route,
    "/cells/cell-scope-01"
  );
  assert.equal(
    page.sections.navigation.selected_cell_routes?.management_route,
    "/cells/cell-scope-01/management"
  );
  assert.equal(
    page.sections.navigation.selected_cell_routes?.continuity_route,
    "/cells/cell-scope-01/continuity"
  );
  assert.equal(
    page.sections.navigation.selected_cell_routes?.handoff_route,
    "/portfolio/handoff/cell-scope-01"
  );
  assert.equal(
    page.sections.navigation.selected_cell_routes?.review_packet_route,
    "/portfolio/handoff/cell-scope-01/review"
  );
  assert.equal(page.sections.status_shelf.total_cells, 2);
  assert.equal(page.sections.status_shelf.attention_required_cells, 2);
  assert.equal(page.sections.status_shelf.steady_cells, 0);
  assert.equal(page.sections.status_shelf.packet_state_counts.draft, 0);
  assert.equal(page.sections.status_shelf.packet_state_counts.staged, 0);
  assert.equal(
    page.sections.status_shelf.packet_state_counts.ready_for_cell_review,
    1
  );
  assert.equal(
    page.sections.status_shelf.packet_state_counts.returned_for_revision,
    1
  );
  assert.equal(page.sections.queue_shelf.queued_attention_cells, 2);
  assert.equal(page.sections.queue_shelf.ready_for_cell_review_cells, 1);
  assert.equal(page.sections.queue_shelf.returned_for_revision_cells, 1);
  assert.equal(
    page.sections.review_shelf.approval_request_visibility,
    "runtime_record_present_non_executable"
  );
  assert.equal(page.sections.review_shelf.ready_for_cell_review_cells, 1);
  assert.equal(page.sections.review_shelf.returned_for_revision_cells, 1);
  assert.equal(
    page.sections.posture_shelf.secretary_posture,
    "handoff_first_review_packet_first_revision_loop_non_executing"
  );
  assert.equal(
    page.sections.rationale_evidence.rationale_scope,
    "portfolio_secretary_lane_rationale"
  );
  assert.equal(page.sections.truth_boundary.shell_projection_is_runtime_law, false);

  assert.match(page.html, /Portfolio Secretary Beta/);
  assert.match(page.html, /Secretary beta is handoff-first, posture-first, and review-packet-first\./);
  assert.match(page.html, /Secretary beta is also revision-loop-first and remains non-executing\./);
  assert.match(page.html, /Shell, staging, review-packet, and revision-return consistency beta only\. Direct-control semantics remain unavailable\./);
  assert.match(page.html, /Foundation overview route: \/cells/);
  assert.match(page.html, /Detail route: \/cells\/cell-scope-01/);
  assert.match(page.html, /Management route: \/cells\/cell-scope-01\/management/);
  assert.match(page.html, /Continuity route: \/cells\/cell-scope-01\/continuity/);
  assert.match(page.html, /Handoff route: \/portfolio\/handoff\/cell-scope-01/);
  assert.match(page.html, /Review packet route: \/portfolio\/handoff\/cell-scope-01\/review/);
  assert.match(page.html, /Ready-for-cell-review packet cells: 1/);
  assert.match(page.html, /Returned-for-revision packet cells: 1/);
  assert.match(page.html, /Packet state summary: .*returned_for_revision cells/);
  assert.match(page.html, /Packet queue summary: .*revision-return packets/);
  assert.match(page.html, /Review packet summary: .*returned_for_revision packets/);
  assert.match(page.html, /Rationale summary: The portfolio Secretary lane explains why bounded attention, review, and revision posture exists across cells without turning posture into control authority\./);
  assert.match(page.html, /Evidence summary: Evidence remains bounded to 2 visible cell summary projections/);
  assert.match(page.html, /Provenance summary: Provenance remains downstream/);
  assert.match(page.html, /Known fact: Selected packet state: returned_for_revision/);
  assert.match(page.html, /Omission note: Packet states remain SoloCrew product posture only and are not upstream workflow-truth objects\./);
  assert.doesNotMatch(page.html, /<button\b/);
  assert.doesNotMatch(page.html, /<form\b/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.view_separation,
    page.sections.navigation,
    page.sections.status_shelf,
    page.sections.queue_shelf,
    page.sections.review_shelf,
    page.sections.posture_shelf,
    page.sections.rationale_evidence,
    page.sections.truth_boundary,
    portfolio_shell.portfolio_secretary_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
