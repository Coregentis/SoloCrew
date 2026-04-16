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

function create_runtime_inputs() {
  return [
    {
      cell_runtime_scope: {
        object_id: "cell-scope-01",
        object_type: "cell-runtime-scope" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "active" as const,
        project_id: "project-01",
        scope_name: "Runtime Delivery Cell",
        scope_mode: "multi_scope_bounded" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      cell_summary_runtime_record: {
        object_id: "cell-summary-01",
        object_type: "cell-summary-runtime-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "current" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-01",
        summary_headline: "Ship one bounded runtime-backed review.",
        summary_delivery_posture: "attention" as const,
        active_work_item_count: 2,
        blocked_work_item_count: 1,
        continuity_hint: "Continuity remains bounded to runtime-private summary truth.",
        summary_mode: "bounded_runtime_private" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      management_directive_record: {
        object_id: "directive-01",
        object_type: "management-directive-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "active" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-01",
        objective_id: "objective-01",
        management_record_kind: "directive" as const,
        directive_summary: "Keep delivery visible and bounded.",
        directive_priority: "focus_now" as const,
        approval_posture: "operator_required" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
    },
    {
      cell_runtime_scope: {
        object_id: "cell-scope-02",
        object_type: "cell-runtime-scope" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "active" as const,
        project_id: "project-01",
        scope_name: "Runtime Review Cell",
        scope_mode: "multi_scope_bounded" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      cell_summary_runtime_record: {
        object_id: "cell-summary-02",
        object_type: "cell-summary-runtime-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "current" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        summary_headline: "Review one bounded release package.",
        summary_delivery_posture: "steady" as const,
        active_work_item_count: 1,
        blocked_work_item_count: 0,
        continuity_hint: "Review continuity is current and bounded.",
        summary_mode: "bounded_runtime_private" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      delivery_return_record: {
        object_id: "delivery-return-02",
        object_type: "delivery-return-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "ready_for_review" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        objective_id: "objective-02",
        management_record_kind: "delivery_return" as const,
        completed_summary: "Review summary ready.",
        blocked_summary: "",
        next_directive_needed: false,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      approval_request_record: {
        object_id: "approval-request-02",
        object_type: "approval-request-record" as const,
        authority_class: "coregentis_private_runtime" as const,
        primary_layer: "organization_runtime_layer" as const,
        status: "pending" as const,
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        objective_id: "objective-02",
        management_record_kind: "approval_request" as const,
        request_kind: "approval" as const,
        request_summary: "Operator review requested.",
        requested_decision: "Approve bounded release.",
        urgency: "normal" as const,
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
    },
  ];
}

test("[app] portfolio secretary page stays top-level navigation only and below direct-control semantics", () => {
  const portfolio_shell =
    composePortfolioSecretaryShellFromRuntimeInputs(create_runtime_inputs());
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
  assert.equal(page.sections.queue_shelf.queued_attention_cells, 2);
  assert.equal(
    page.sections.review_shelf.approval_request_visibility,
    "runtime_record_present_non_executable"
  );
  assert.equal(
    page.sections.posture_shelf.secretary_posture,
    "handoff_first_review_packet_first_non_executing"
  );
  assert.equal(page.sections.truth_boundary.shell_projection_is_runtime_law, false);

  assert.match(page.html, /Portfolio Secretary Beta/);
  assert.match(page.html, /Secretary beta is handoff-first, posture-first, and review-packet-first\./);
  assert.match(page.html, /Shell, staging, and review-packet beta only\. Direct-control semantics remain unavailable\./);
  assert.match(page.html, /Foundation overview route: \/cells/);
  assert.match(page.html, /Detail route: \/cells\/cell-scope-01/);
  assert.match(page.html, /Management route: \/cells\/cell-scope-01\/management/);
  assert.match(page.html, /Continuity route: \/cells\/cell-scope-01\/continuity/);
  assert.match(page.html, /Handoff route: \/portfolio\/handoff\/cell-scope-01/);
  assert.match(page.html, /Review packet route: \/portfolio\/handoff\/cell-scope-01\/review/);
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
    page.sections.truth_boundary,
    portfolio_shell.portfolio_secretary_projection,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
