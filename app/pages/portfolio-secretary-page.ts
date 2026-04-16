import type {
  PortfolioSecretaryShell,
} from "../shell/portfolio-secretary-shell-contract.ts";
import {
  PORTFOLIO_SECRETARY_ROUTE,
} from "../shell/portfolio-secretary-shell.ts";

export interface PortfolioSecretaryPage {
  route_path: string;
  page_kind: "portfolio_secretary_page";
  page_scope: "portfolio_secretary_beta_shell_only";
  operator_surface: "portfolio_secretary_beta";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_portfolio_secretary_page";
  navigation_mode: "top_level_product_navigation_only";
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  workflow_engine_behavior_available: false;
  handoff_creation_available: false;
  sections: {
    header: {
      read_mode: "non_executing";
      portfolio_route: "/portfolio";
      foundation_overview_route: "/cells";
      projection_notes: string[];
    };
    view_separation: PortfolioSecretaryShell["portfolio_secretary_projection"]["view_separation"];
    navigation: PortfolioSecretaryShell["navigation"];
    status_shelf: PortfolioSecretaryShell["portfolio_secretary_projection"]["status_shelf"];
    queue_shelf: PortfolioSecretaryShell["portfolio_secretary_projection"]["queue_shelf"];
    review_shelf: PortfolioSecretaryShell["portfolio_secretary_projection"]["review_shelf"];
    posture_shelf: PortfolioSecretaryShell["portfolio_secretary_projection"]["posture_shelf"];
    truth_boundary: PortfolioSecretaryShell["truth_boundary"];
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

function render_navigation_link(
  link: PortfolioSecretaryShell["navigation"]["cell_links"][number]
): string {
  return [
    `<article data-cell-id="${escape_html(link.cell_id)}">`,
    `<h3>${escape_html(link.cell_name)}</h3>`,
    `<p>Selected: ${link.selected}</p>`,
    `<p>Detail route: ${escape_html(link.detail_route)}</p>`,
    `<p>Management route: ${escape_html(link.management_route)}</p>`,
    `<p>Continuity route: ${escape_html(link.continuity_route)}</p>`,
    "</article>",
  ].join("");
}

export function renderPortfolioSecretaryPage(
  portfolio_shell: PortfolioSecretaryShell
): PortfolioSecretaryPage {
  const sections = {
    header: {
      read_mode: portfolio_shell.navigation.read_mode,
      portfolio_route: portfolio_shell.navigation.portfolio_route,
      foundation_overview_route: portfolio_shell.navigation.foundation_overview_route,
      projection_notes: [
        ...portfolio_shell.projection_notes,
        ...portfolio_shell.portfolio_secretary_projection.projection_notes,
      ],
    },
    view_separation:
      portfolio_shell.portfolio_secretary_projection.view_separation,
    navigation: portfolio_shell.navigation,
    status_shelf: portfolio_shell.portfolio_secretary_projection.status_shelf,
    queue_shelf: portfolio_shell.portfolio_secretary_projection.queue_shelf,
    review_shelf: portfolio_shell.portfolio_secretary_projection.review_shelf,
    posture_shelf:
      portfolio_shell.portfolio_secretary_projection.posture_shelf,
    truth_boundary: portfolio_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Portfolio Secretary Beta</h1>",
    `<p>Read mode: ${escape_html(sections.header.read_mode)}</p>`,
    `<p>Portfolio route: ${escape_html(sections.header.portfolio_route)}</p>`,
    `<p>Foundation overview route: ${escape_html(
      sections.header.foundation_overview_route
    )}</p>`,
    "<p>Secretary beta is handoff-first and posture-first.</p>",
    "<p>Shell-first beta only. Direct-control semantics remain unavailable.</p>",
    ...sections.header.projection_notes.map(
      (note) => `<p>Projection note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "<section data-section=\"view-separation\">",
    "<h2>Secretary View vs Cell View</h2>",
    `<p>Secretary view: ${escape_html(sections.view_separation.secretary_view)}</p>`,
    `<p>Cell view: ${escape_html(sections.view_separation.cell_view)}</p>`,
    `<p>Distinct views: ${sections.view_separation.secretary_view_distinct_from_cell_view}</p>`,
    "</section>",
    "<section data-section=\"navigation\">",
    "<h2>Portfolio Navigation</h2>",
    ...sections.navigation.cell_links.map(render_navigation_link),
    ...(sections.navigation.selected_cell_routes
      ? [
          `<p>Selected detail route: ${escape_html(
            sections.navigation.selected_cell_routes.detail_route
          )}</p>`,
          `<p>Selected management route: ${escape_html(
            sections.navigation.selected_cell_routes.management_route
          )}</p>`,
          `<p>Selected continuity route: ${escape_html(
            sections.navigation.selected_cell_routes.continuity_route
          )}</p>`,
        ]
      : []),
    "</section>",
    "<section data-section=\"status-shelf\">",
    "<h2>Status Shelf</h2>",
    `<p>Total cells: ${sections.status_shelf.total_cells}</p>`,
    `<p>Attention required cells: ${sections.status_shelf.attention_required_cells}</p>`,
    `<p>Steady cells: ${sections.status_shelf.steady_cells}</p>`,
    "</section>",
    "<section data-section=\"queue-shelf\">",
    "<h2>Queue Shelf</h2>",
    `<p>Queue visibility: ${escape_html(sections.queue_shelf.queue_visibility)}</p>`,
    `<p>Queued attention cells: ${sections.queue_shelf.queued_attention_cells}</p>`,
    `<p>Queue note: ${escape_html(sections.queue_shelf.shelf_note)}</p>`,
    "</section>",
    "<section data-section=\"review-shelf\">",
    "<h2>Review Shelf</h2>",
    `<p>Review visibility: ${escape_html(sections.review_shelf.review_visibility)}</p>`,
    `<p>Approval request visibility: ${escape_html(
      sections.review_shelf.approval_request_visibility
    )}</p>`,
    `<p>Delivery return visibility: ${escape_html(
      sections.review_shelf.delivery_return_visibility
    )}</p>`,
    `<p>Review note: ${escape_html(sections.review_shelf.shelf_note)}</p>`,
    "</section>",
    "<section data-section=\"posture-shelf\">",
    "<h2>Posture Shelf</h2>",
    `<p>Management directive visibility: ${escape_html(
      sections.posture_shelf.management_directive_visibility
    )}</p>`,
    `<p>Delivery return visibility: ${escape_html(
      sections.posture_shelf.delivery_return_visibility
    )}</p>`,
    `<p>Approval request visibility: ${escape_html(
      sections.posture_shelf.approval_request_visibility
    )}</p>`,
    `<p>Secretary posture: ${escape_html(
      sections.posture_shelf.secretary_posture
    )}</p>`,
    "</section>",
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product projection only: ${sections.truth_boundary.product_projection_only}</p>`,
    `<p>Shell projection is runtime law: ${sections.truth_boundary.shell_projection_is_runtime_law}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: PORTFOLIO_SECRETARY_ROUTE,
    page_kind: "portfolio_secretary_page",
    page_scope: "portfolio_secretary_beta_shell_only",
    operator_surface: "portfolio_secretary_beta",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_portfolio_secretary_page",
    navigation_mode: "top_level_product_navigation_only",
    secretary_behavior_available: true,
    portfolio_dispatch_behavior_available: false,
    direct_approve_control_available: false,
    direct_reject_control_available: false,
    direct_dispatch_control_available: false,
    direct_execute_control_available: false,
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    workflow_engine_behavior_available: false,
    handoff_creation_available: false,
    sections,
    html,
  };
}
