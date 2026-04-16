import assert from "node:assert/strict";
import test from "node:test";

import {
  initializeSingleCellStructuralAssembly,
} from "../../projection/assembly/single-cell-initializer.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  MULTI_CELL_FOUNDATION_OVERVIEW_ROUTE,
  renderMultiCellFoundationOverviewPage,
} from "../../app/pages/multi-cell-foundation-overview-page.ts";
import {
  composeMultiCellFoundationOverviewShell,
  composeMultiCellFoundationOverviewShellFromRuntimeInputs,
} from "../../app/shell/multi-cell-foundation-overview.ts";

test("[app] multi-cell foundation overview page stays read-only and below secretary beta", () => {
  const assemblies = [
    initializeSingleCellStructuralAssembly({
      assembly_id: "multi-cell-overview-01",
      cell_id: "cell-01",
      cell_name: "Delivery Cell",
      operator_id: "operator-01",
      mission: "Run one delivery-focused cell.",
      business_scope: "solo-core",
      current_objective_id: "objective-01",
      current_objective_headline: "Ship one bounded delivery review.",
      delivery_target: "Return one bounded operator-reviewable delivery.",
      active_work_count: 3,
      blocked_work_count: 1,
    }),
    initializeSingleCellStructuralAssembly({
      assembly_id: "multi-cell-overview-02",
      cell_id: "cell-02",
      cell_name: "Review Cell",
      operator_id: "operator-01",
      mission: "Run one review-focused cell.",
      business_scope: "solo-core",
      current_objective_id: "objective-02",
      current_objective_headline: "Review one bounded release package.",
      delivery_target: "Return one operator-ready review summary.",
      active_work_count: 2,
      blocked_work_count: 0,
    }),
  ];

  const overview_shell = composeMultiCellFoundationOverviewShell(assemblies);
  const page = renderMultiCellFoundationOverviewPage(overview_shell);

  assert.equal(page.route_path, MULTI_CELL_FOUNDATION_OVERVIEW_ROUTE);
  assert.equal(page.page_kind, "multi_cell_foundation_overview_page");
  assert.equal(page.page_scope, "multi_cell_foundation_only");
  assert.equal(page.operator_surface, "multi_cell_foundation_overview");
  assert.equal(page.authority_boundary, "app_page_projection_consumer");
  assert.equal(page.phase_boundary, "bounded_multi_cell_page");
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_orchestration_available, false);

  assert.equal(page.sections.header.read_mode, "inspect_only");
  assert.equal(page.sections.cell_summary_units.total_cells, 2);
  assert.equal(page.sections.cell_summary_units.summaries.length, 2);
  assert.equal(page.sections.cell_summary_units.summaries[0].cell_summary_card.cell_name, "Delivery Cell");
  assert.equal(page.sections.cell_summary_units.summaries[1].cell_summary_card.cell_name, "Review Cell");
  assert.equal(
    page.sections.management_object_family.management_directive,
    "contract_frozen_non_executable"
  );
  assert.equal(
    page.sections.truth_boundary.summary_projection_is_runtime_law,
    false
  );

  assert.match(page.html, /Multi-Cell Foundation Overview/);
  assert.match(page.html, /Cell Summary Units/);
  assert.match(page.html, /Delivery Cell/);
  assert.match(page.html, /Review Cell/);
  assert.match(page.html, /Readiness: attention_required/);
  assert.match(page.html, /Readiness: steady/);
  assert.match(page.html, /Management directive: contract_frozen_non_executable/);
  assert.match(page.html, /Non-claim: no_secretary_behavior_truth/);
  assert.match(page.html, /Summary projection is runtime law: false/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.cell_summary_units,
    page.sections.management_object_family,
    page.sections.deferred_surfaces,
    page.sections.truth_boundary,
    ...page.sections.cell_summary_units.summaries,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[app] multi-cell foundation overview page stays bounded when consuming upstream runtime-private workforce inputs", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs([
    {
      cell_runtime_scope: {
        object_id: "cell-scope-01",
        object_type: "cell-runtime-scope",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "active",
        project_id: "project-01",
        scope_name: "Runtime Delivery Cell",
        scope_mode: "multi_scope_bounded",
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      cell_summary_runtime_record: {
        object_id: "cell-summary-01",
        object_type: "cell-summary-runtime-record",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "current",
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-01",
        summary_headline: "Ship one bounded runtime-backed review.",
        summary_delivery_posture: "attention",
        active_work_item_count: 2,
        blocked_work_item_count: 0,
        continuity_hint: "Continuity remains bounded to runtime-private summary truth.",
        summary_mode: "bounded_runtime_private",
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      management_directive_record: {
        object_id: "directive-01",
        object_type: "management-directive-record",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "active",
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-01",
        directive_summary: "Keep delivery visible and bounded.",
        directive_priority: "focus_now",
        approval_posture: "operator_required",
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
    },
    {
      cell_runtime_scope: {
        object_id: "cell-scope-02",
        object_type: "cell-runtime-scope",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "active",
        project_id: "project-01",
        scope_name: "Runtime Review Cell",
        scope_mode: "multi_scope_bounded",
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      cell_summary_runtime_record: {
        object_id: "cell-summary-02",
        object_type: "cell-summary-runtime-record",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "current",
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        summary_headline: "Review one bounded release package.",
        summary_delivery_posture: "steady",
        active_work_item_count: 1,
        blocked_work_item_count: 0,
        continuity_hint: "Review continuity is current and bounded.",
        summary_mode: "bounded_runtime_private",
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
      delivery_return_record: {
        object_id: "delivery-return-02",
        object_type: "delivery-return-record",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "ready_for_review",
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
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
        object_type: "approval-request-record",
        authority_class: "coregentis_private_runtime",
        primary_layer: "organization_runtime_layer",
        status: "pending",
        project_id: "project-01",
        cell_runtime_scope_id: "cell-scope-02",
        request_kind: "approval",
        request_summary: "Operator review requested.",
        requested_decision: "Approve bounded release.",
        urgency: "normal",
        temporal: {},
        mutation: {},
        lineage: {},
        governance: {},
      },
    },
  ]);
  const page = renderMultiCellFoundationOverviewPage(overview_shell);

  assert.equal(page.route_path, MULTI_CELL_FOUNDATION_OVERVIEW_ROUTE);
  assert.equal(page.page_scope, "multi_cell_foundation_only");
  assert.equal(page.actual_provider_actions_present, false);
  assert.equal(page.actual_channel_entry_present, false);
  assert.equal(page.portfolio_dispatch_behavior_available, false);
  assert.equal(page.secretary_behavior_available, false);
  assert.equal(page.broad_kpi_cockpit_available, false);
  assert.equal(page.runtime_complete_orchestration_available, false);
  assert.equal(page.sections.cell_summary_units.total_cells, 2);
  assert.equal(
    page.sections.management_object_family.management_directive,
    "runtime_record_present_non_executable"
  );
  assert.equal(
    page.sections.management_object_family.delivery_return,
    "runtime_record_present_non_executable"
  );
  assert.equal(
    page.sections.management_object_family.approval_request,
    "runtime_record_present_non_executable"
  );
  assert.equal(
    page.sections.cell_summary_units.summaries[0].source_mode,
    "upstream_runtime_private_records"
  );

  assert.match(page.html, /Runtime Delivery Cell/);
  assert.match(page.html, /Runtime Review Cell/);
  assert.match(page.html, /Source mode: upstream_runtime_private_records/);
  assert.match(page.html, /Management directive: runtime_record_present_non_executable/);
  assert.match(page.html, /Delivery return: runtime_record_present_non_executable/);
  assert.match(page.html, /Approval request: runtime_record_present_non_executable/);
  assert.match(page.html, /Summary projection is runtime law: false/);

  const boundary_targets = [
    page,
    page.sections.header,
    page.sections.cell_summary_units,
    page.sections.management_object_family,
    page.sections.deferred_surfaces,
    page.sections.truth_boundary,
    ...page.sections.cell_summary_units.summaries,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});
