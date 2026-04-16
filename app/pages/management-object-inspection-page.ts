import type {
  ManagementObjectInspectionViewShell,
} from "../shell/management-object-inspection-view-contract.ts";

export interface ManagementObjectInspectionPage {
  route_path: string;
  page_kind: "management_object_inspection_page";
  page_scope: "multi_cell_foundation_management_object_inspection_only";
  operator_surface: "multi_cell_foundation_management_object_inspection";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "bounded_management_object_inspection_page";
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
      overview_route: "/cells";
      detail_route: string;
      inspection_route: string;
    };
    inspection_units:
      ManagementObjectInspectionViewShell["management_object_inspection_projection"]["inspection_units"];
    truth_boundary: ManagementObjectInspectionViewShell["truth_boundary"];
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

function render_inspection_unit(
  inspection_unit: ManagementObjectInspectionViewShell["management_object_inspection_projection"]["inspection_units"][number]
): string {
  return [
    `<article data-object-kind="${escape_html(inspection_unit.object_kind)}">`,
    `<h3>${escape_html(inspection_unit.object_kind)}</h3>`,
    `<p>Status: ${escape_html(inspection_unit.inspection_status)}</p>`,
    `<p>Summary label: ${escape_html(inspection_unit.summary_label)}</p>`,
    `<p>Summary value: ${escape_html(inspection_unit.summary_value)}</p>`,
    `<p>Recency hint: ${escape_html(inspection_unit.recency_hint)}</p>`,
    `<p>Executable actions available: ${inspection_unit.executable_actions_available}</p>`,
    `<p>Upstream refs: ${inspection_unit.upstream_refs.length}</p>`,
    ...inspection_unit.projection_notes.map(
      (note) => `<p>Projection note: ${escape_html(note)}</p>`
    ),
    "</article>",
  ].join("");
}

export function renderManagementObjectInspectionPage(
  inspection_shell: ManagementObjectInspectionViewShell
): ManagementObjectInspectionPage {
  const inspection_projection =
    inspection_shell.management_object_inspection_projection;
  const sections = {
    header: {
      cell_name: inspection_projection.cell_context.cell_name,
      read_mode: "inspect_only" as const,
      overview_route: inspection_shell.navigation.overview_route,
      detail_route: inspection_shell.navigation.detail_route,
      inspection_route: inspection_shell.navigation.inspection_route,
    },
    inspection_units: inspection_projection.inspection_units,
    truth_boundary: inspection_shell.truth_boundary,
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Management Object Inspection</h1>",
    `<p>Cell: ${escape_html(sections.header.cell_name)}</p>`,
    `<p>Read mode: ${sections.header.read_mode}</p>`,
    `<p>Overview route: ${escape_html(sections.header.overview_route)}</p>`,
    `<p>Detail route: ${escape_html(sections.header.detail_route)}</p>`,
    `<p>Inspection route: ${escape_html(sections.header.inspection_route)}</p>`,
    "</section>",
    "<section data-section=\"inspection-units\">",
    "<h2>Inspection Units</h2>",
    ...sections.inspection_units.map(render_inspection_unit),
    "<p>Management-object inspection remains read-only and non-executable.</p>",
    "</section>",
    "<section data-section=\"truth-boundary\">",
    "<h2>Truth Boundary</h2>",
    `<p>Product projection only: ${sections.truth_boundary.product_projection_only}</p>`,
    `<p>Inspection projection is runtime law: ${sections.truth_boundary.inspection_projection_is_runtime_law}</p>`,
    ...sections.truth_boundary.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path: inspection_shell.navigation.inspection_route,
    page_kind: "management_object_inspection_page",
    page_scope: "multi_cell_foundation_management_object_inspection_only",
    operator_surface: "multi_cell_foundation_management_object_inspection",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_management_object_inspection_page",
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
