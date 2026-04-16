import type {
  CellDetailViewShell,
} from "../shell/cell-detail-view-contract.ts";

export interface CellDetailPage {
  route_path: string;
  page_kind: "cell_detail_page";
  page_scope: "multi_cell_foundation_cell_detail_only";
  operator_surface: "multi_cell_foundation_cell_detail_inspection";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_cell_detail_page";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_management_actions_present: false;
  sections: {
    header: {
      cell_name: string;
      read_mode: "inspect_only";
      route_path: string;
      overview_route: "/cells";
    };
    cell_identity: CellDetailViewShell["cell_detail_projection"]["cell_identity"];
    objective_and_work_status:
      CellDetailViewShell["cell_detail_projection"]["objective_and_work_status"];
    continuity_and_recency:
      CellDetailViewShell["cell_detail_projection"]["continuity_and_recency"];
    management_object_family:
      CellDetailViewShell["cell_detail_projection"]["management_object_family"];
    truth_boundary: CellDetailViewShell["truth_boundary"];
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

export function renderCellDetailPage(
  detail_shell: CellDetailViewShell
): CellDetailPage {
  const detail_projection = detail_shell.cell_detail_projection;
  const sections = {
    header: {
      cell_name: detail_projection.cell_identity.cell_name,
      read_mode: "inspect_only" as const,
      route_path: detail_shell.navigation.detail_route,
      overview_route: detail_shell.navigation.overview_route,
    },
    cell_identity: detail_projection.cell_identity,
    objective_and_work_status: detail_projection.objective_and_work_status,
    continuity_and_recency: detail_projection.continuity_and_recency,
    management_object_family: detail_projection.management_object_family,
    truth_boundary: detail_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Cell Detail Inspection</h1>",
    `<p>Cell: ${escape_html(sections.header.cell_name)}</p>`,
    `<p>Read mode: ${sections.header.read_mode}</p>`,
    `<p>Overview route: ${escape_html(sections.header.overview_route)}</p>`,
    `<p>Detail route: ${escape_html(sections.header.route_path)}</p>`,
    "</section>",
    "<section data-section=\"cell-identity\">",
    "<h2>Cell Identity</h2>",
    `<p>Cell id: ${escape_html(sections.cell_identity.cell_id)}</p>`,
    `<p>Scope status: ${escape_html(sections.cell_identity.scope_status)}</p>`,
    `<p>Scope mode: ${escape_html(sections.cell_identity.scope_mode)}</p>`,
    `<p>Scope summary: ${escape_html(sections.cell_identity.scope_summary)}</p>`,
    "</section>",
    "<section data-section=\"objective-and-work-status\">",
    "<h2>Objective and Work Status</h2>",
    `<p>Objective: ${escape_html(sections.objective_and_work_status.current_objective_headline)}</p>`,
    `<p>Active work items: ${sections.objective_and_work_status.active_work_item_count}</p>`,
    `<p>Blocked work items: ${sections.objective_and_work_status.blocked_work_item_count}</p>`,
    `<p>Readiness: ${escape_html(sections.objective_and_work_status.readiness_signal)}</p>`,
    `<p>Blocked signal: ${escape_html(sections.objective_and_work_status.blocked_signal)}</p>`,
    "</section>",
    "<section data-section=\"continuity-and-recency\">",
    "<h2>Continuity and Recency</h2>",
    `<p>Continuity status: ${escape_html(sections.continuity_and_recency.continuity_status)}</p>`,
    `<p>Continuity hint: ${escape_html(sections.continuity_and_recency.continuity_hint)}</p>`,
    `<p>Recency hint: ${escape_html(sections.continuity_and_recency.recency_hint)}</p>`,
    "</section>",
    "<section data-section=\"management-object-family\">",
    "<h2>Management Object Family</h2>",
    `<p>Management directive status: ${escape_html(sections.management_object_family.management_directive_status)}</p>`,
    `<p>Delivery return status: ${escape_html(sections.management_object_family.delivery_return_status)}</p>`,
    `<p>Approval request status: ${escape_html(sections.management_object_family.approval_request_status)}</p>`,
    ...(sections.management_object_family.management_directive
      ? [
          `<p>Directive summary: ${escape_html(sections.management_object_family.management_directive.delivery_target)}</p>`,
          `<p>Directive approval posture: ${escape_html(sections.management_object_family.management_directive.approval_posture)}</p>`,
        ]
      : []),
    ...(sections.management_object_family.delivery_return
      ? [
          `<p>Delivery return status detail: ${escape_html(sections.management_object_family.delivery_return.delivery_status)}</p>`,
          `<p>Completed summary: ${escape_html(sections.management_object_family.delivery_return.completed_summary)}</p>`,
          `<p>Blocked summary: ${escape_html(sections.management_object_family.delivery_return.blocked_summary)}</p>`,
        ]
      : []),
    ...(sections.management_object_family.approval_request
      ? [
          `<p>Approval request kind: ${escape_html(sections.management_object_family.approval_request.request_kind)}</p>`,
          `<p>Approval request reason: ${escape_html(sections.management_object_family.approval_request.reason)}</p>`,
          `<p>Requested decision: ${escape_html(sections.management_object_family.approval_request.requested_decision)}</p>`,
        ]
      : []),
    "<p>Management object family remains inspection-only and non-executable.</p>",
    "</section>",
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product projection only: ${sections.truth_boundary.product_projection_only}</p>`,
    `<p>Detail projection is runtime law: ${sections.truth_boundary.detail_projection_is_runtime_law}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: detail_shell.navigation.detail_route,
    page_kind: "cell_detail_page",
    page_scope: "multi_cell_foundation_cell_detail_only",
    operator_surface: "multi_cell_foundation_cell_detail_inspection",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_cell_detail_page",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_management_actions_present: false,
    sections,
    html,
  };
}
