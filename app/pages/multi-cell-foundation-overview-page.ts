import type {
  CellSummaryProjection,
} from "../../projection/contracts/cell-summary-projection-contract.ts";
import type {
  MultiCellFoundationOverviewShell,
} from "../shell/multi-cell-foundation-overview-contract.ts";

export const MULTI_CELL_FOUNDATION_OVERVIEW_ROUTE = "/cells";

export interface MultiCellFoundationOverviewPage {
  page_kind: "multi_cell_foundation_overview_page";
  route_path: string;
  page_scope: "multi_cell_foundation_only";
  operator_surface: "multi_cell_foundation_overview";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_multi_cell_page";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  sections: {
    header: {
      total_cells: number;
      read_mode: "inspect_only";
      projection_notes: string[];
    };
    cell_summary_units: {
      total_cells: number;
      summaries: CellSummaryProjection[];
    };
    management_object_family: MultiCellFoundationOverviewShell["management_object_family_status"];
    deferred_surfaces: {
      deferred_items: string[];
    };
    truth_boundary: MultiCellFoundationOverviewShell["truth_boundary"];
  };
  html: string;
}

function escape_html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function render_summary_card(summary: CellSummaryProjection): string {
  return [
    `<article data-cell-id="${escape_html(summary.cell_summary_card.cell_id)}">`,
    `<h3>${escape_html(summary.cell_summary_card.cell_name)}</h3>`,
    `<p>Source mode: ${escape_html(summary.source_mode)}</p>`,
    `<p>Objective: ${escape_html(summary.cell_summary_card.current_objective_headline)}</p>`,
    `<p>Delivery posture: ${escape_html(summary.cell_summary_card.delivery_posture)}</p>`,
    `<p>Readiness: ${escape_html(summary.readiness_signal)}</p>`,
    `<p>Continuity: ${escape_html(summary.continuity_hint)}</p>`,
    `<p>Status summary: ${escape_html(summary.objective_status_summary)}</p>`,
    `<p>Non-claim: ${escape_html(summary.non_claims[0] ?? "none")}</p>`,
    "</article>",
  ].join("");
}

export function renderMultiCellFoundationOverviewPage(
  overview_shell: MultiCellFoundationOverviewShell
): MultiCellFoundationOverviewPage {
  const sections = {
    header: {
      total_cells: overview_shell.cell_summary_units.length,
      read_mode: "inspect_only" as const,
      projection_notes: [...overview_shell.projection_notes],
    },
    cell_summary_units: {
      total_cells: overview_shell.cell_summary_units.length,
      summaries: [...overview_shell.cell_summary_units],
    },
    management_object_family: overview_shell.management_object_family_status,
    deferred_surfaces: {
      deferred_items: [...overview_shell.deferred_items],
    },
    truth_boundary: overview_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Multi-Cell Foundation Overview</h1>",
    "<p>Read mode: inspect_only</p>",
    `<p>Total cells: ${sections.header.total_cells}</p>`,
    ...sections.header.projection_notes.map(
      (note) => `<p>Projection note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "<section data-section=\"cell-summary-units\">",
    "<h2>Cell Summary Units</h2>",
    ...sections.cell_summary_units.summaries.map(render_summary_card),
    "</section>",
    "<section data-section=\"management-object-family\">",
    "<h2>Management Object Family</h2>",
    `<p>Management directive: ${escape_html(sections.management_object_family.management_directive)}</p>`,
    `<p>Delivery return: ${escape_html(sections.management_object_family.delivery_return)}</p>`,
    `<p>Approval request: ${escape_html(sections.management_object_family.approval_request)}</p>`,
    "</section>",
    "<section data-section=\"deferred-surfaces\">",
    "<h2>Deferred Surfaces</h2>",
    ...sections.deferred_surfaces.deferred_items.map(
      (item) => `<p>Deferred item: ${escape_html(item)}</p>`
    ),
    "</section>",
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product projection only: ${sections.truth_boundary.product_projection_only}</p>`,
    `<p>Summary projection is runtime law: ${sections.truth_boundary.summary_projection_is_runtime_law}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    page_kind: "multi_cell_foundation_overview_page",
    route_path: MULTI_CELL_FOUNDATION_OVERVIEW_ROUTE,
    page_scope: "multi_cell_foundation_only",
    operator_surface: "multi_cell_foundation_overview",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_multi_cell_page",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    sections,
    html,
  };
}
