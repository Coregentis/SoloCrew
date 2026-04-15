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
