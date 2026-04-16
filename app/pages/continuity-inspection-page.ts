import type {
  ContinuityInspectionViewShell,
} from "../shell/continuity-inspection-view-contract.ts";

export interface ContinuityInspectionPage {
  route_path: string;
  page_kind: "continuity_inspection_page";
  page_scope: "multi_cell_foundation_continuity_inspection_only";
  operator_surface: "multi_cell_foundation_continuity_inspection";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_continuity_inspection_page";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  portfolio_dispatch_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_orchestration_available: false;
  executable_continuity_actions_present: false;
  sections: {
    header: {
      cell_name: string;
      read_mode: "inspect_only";
      overview_route: "/cells";
      detail_route: string;
      inspection_route: string;
    };
    continuity_snapshot:
      ContinuityInspectionViewShell["continuity_inspection_projection"]["continuity_snapshot"];
    bounded_knowledge:
      ContinuityInspectionViewShell["continuity_inspection_projection"]["bounded_knowledge"];
    truth_boundary: ContinuityInspectionViewShell["truth_boundary"];
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

export function renderContinuityInspectionPage(
  inspection_shell: ContinuityInspectionViewShell
): ContinuityInspectionPage {
  const continuity_projection = inspection_shell.continuity_inspection_projection;
  const sections = {
    header: {
      cell_name: continuity_projection.cell_context.cell_name,
      read_mode: "inspect_only" as const,
      overview_route: inspection_shell.navigation.overview_route,
      detail_route: inspection_shell.navigation.detail_route,
      inspection_route: inspection_shell.navigation.inspection_route,
    },
    continuity_snapshot: continuity_projection.continuity_snapshot,
    bounded_knowledge: continuity_projection.bounded_knowledge,
    truth_boundary: inspection_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Continuity Inspection</h1>",
    `<p>Cell: ${escape_html(sections.header.cell_name)}</p>`,
    `<p>Read mode: ${sections.header.read_mode}</p>`,
    `<p>Overview route: ${escape_html(sections.header.overview_route)}</p>`,
    `<p>Detail route: ${escape_html(sections.header.detail_route)}</p>`,
    `<p>Inspection route: ${escape_html(sections.header.inspection_route)}</p>`,
    "</section>",
    "<section data-section=\"continuity-snapshot\">",
    "<h2>Continuity Snapshot</h2>",
    `<p>Continuity status: ${escape_html(sections.continuity_snapshot.continuity_status)}</p>`,
    `<p>Continuity state: ${escape_html(sections.continuity_snapshot.continuity_state)}</p>`,
    `<p>Continuity visibility: ${escape_html(sections.continuity_snapshot.continuity_visibility)}</p>`,
    `<p>Continuity hint: ${escape_html(sections.continuity_snapshot.continuity_hint)}</p>`,
    `<p>Recency hint: ${escape_html(sections.continuity_snapshot.recency_hint)}</p>`,
    `<p>Readiness signal: ${escape_html(sections.continuity_snapshot.readiness_signal)}</p>`,
    `<p>Blocked signal: ${escape_html(sections.continuity_snapshot.blocked_signal)}</p>`,
    `<p>Active work items: ${sections.continuity_snapshot.active_work_item_count}</p>`,
    `<p>Blocked work items: ${sections.continuity_snapshot.blocked_work_item_count}</p>`,
    "<p>Continuity inspection remains read-only and non-executable.</p>",
    "</section>",
    "<section data-section=\"bounded-knowledge\">",
    "<h2>Bounded Knowledge</h2>",
    ...sections.bounded_knowledge.known_inputs.map(
      (known) => `<p>Known input: ${escape_html(known)}</p>`
    ),
    ...sections.bounded_knowledge.unknown_inputs.map(
      (unknown) => `<p>Unknown input: ${escape_html(unknown)}</p>`
    ),
    "</section>",
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product projection only: ${sections.truth_boundary.product_projection_only}</p>`,
    `<p>Continuity projection is runtime law: ${sections.truth_boundary.continuity_projection_is_runtime_law}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: inspection_shell.navigation.inspection_route,
    page_kind: "continuity_inspection_page",
    page_scope: "multi_cell_foundation_continuity_inspection_only",
    operator_surface: "multi_cell_foundation_continuity_inspection",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_continuity_inspection_page",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    portfolio_dispatch_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_continuity_actions_present: false,
    sections,
    html,
  };
}
