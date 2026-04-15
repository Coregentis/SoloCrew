import type {
  SingleCellOperatorConsoleShell,
} from "../shell/single-cell-operator-console-shell-contract.ts";

export const SINGLE_CELL_OPERATOR_CONSOLE_ROUTE = "/cell" as const;

export type SingleCellOperatorConsolePagePhaseBoundary =
  "bounded_operator_page";
export type SingleCellOperatorConsolePageAuthorityBoundary =
  "app_page_projection_consumer";

export type SingleCellOperatorConsolePageSectionKey =
  | "header"
  | "delivery"
  | "crew_overview"
  | "objective_overview"
  | "work_item_execution_overview"
  | "memory_continuity_overview"
  | "deferred_surfaces"
  | "truth_boundary";

export interface SingleCellOperatorConsolePageSection {
  section_key: SingleCellOperatorConsolePageSectionKey;
  heading: string;
  body_lines: string[];
}

export interface SingleCellOperatorConsolePage {
  route_path: typeof SINGLE_CELL_OPERATOR_CONSOLE_ROUTE;
  page_kind: "single_cell_operator_console_page";
  page_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorConsolePageAuthorityBoundary;
  phase_boundary: SingleCellOperatorConsolePagePhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  console_shell: SingleCellOperatorConsoleShell;
  sections: {
    header: SingleCellOperatorConsolePageSection;
    delivery: SingleCellOperatorConsolePageSection;
    crew_overview: SingleCellOperatorConsolePageSection;
    objective_overview: SingleCellOperatorConsolePageSection;
    work_item_execution_overview: SingleCellOperatorConsolePageSection;
    memory_continuity_overview: SingleCellOperatorConsolePageSection;
    deferred_surfaces: SingleCellOperatorConsolePageSection;
    truth_boundary: SingleCellOperatorConsolePageSection;
  };
  non_claims: string[];
  html: string;
}

function escape_html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function render_section(section: SingleCellOperatorConsolePageSection): string {
  const body_lines = section.body_lines
    .map((line) => `<li>${escape_html(line)}</li>`)
    .join("");

  return [
    `<section data-section="${section.section_key}">`,
    `<h2>${escape_html(section.heading)}</h2>`,
    `<ul>${body_lines}</ul>`,
    `</section>`,
  ].join("");
}

export function renderSingleCellOperatorConsolePage(
  console_shell: SingleCellOperatorConsoleShell
): SingleCellOperatorConsolePage {
  const sections = {
    header: {
      section_key: "header",
      heading: "Header",
      body_lines: [
        `Cell: ${console_shell.header.cell_name}`,
        `Objective: ${console_shell.header.current_objective_headline}`,
        `Delivery posture: ${console_shell.header.delivery_posture}`,
        `Continuity note: ${console_shell.header.continuity_note}`,
      ],
    },
    delivery: {
      section_key: "delivery",
      heading: "Delivery",
      body_lines: [
        `Delivery target: ${console_shell.delivery.delivery_target}`,
        `Done definition: ${console_shell.delivery.done_definition}`,
        `Review posture: ${console_shell.delivery.review_posture}`,
        ...console_shell.delivery.deferred_surfaces.map(
          (surface) => `Deferred delivery surface: ${surface}`
        ),
      ],
    },
    crew_overview: {
      section_key: "crew_overview",
      heading: "Crew Overview",
      body_lines: [
        `Compiler role: ${console_shell.crew_overview.compiler_role}`,
        `Required roles: ${console_shell.crew_overview.required_role_keys.join(", ")}`,
        `Management priority: ${console_shell.crew_overview.management_priority}`,
        `Compile seed status: ${console_shell.crew_overview.compile_seed_status}`,
        `Runtime worker state available: ${String(
          console_shell.crew_overview.runtime_worker_state_available
        )}`,
      ],
    },
    objective_overview: {
      section_key: "objective_overview",
      heading: "Objective Overview",
      body_lines: [
        `Current objective id: ${console_shell.objective_overview.current_objective_id}`,
        `Current objective headline: ${console_shell.objective_overview.current_objective_headline}`,
        `Active work count: ${String(console_shell.objective_overview.active_work_count)}`,
        `Blocked work count: ${String(console_shell.objective_overview.blocked_work_count)}`,
        `Near-term execution pressure: ${console_shell.objective_overview.near_term_execution_pressure}`,
      ],
    },
    work_item_execution_overview: {
      section_key: "work_item_execution_overview",
      heading: "Work Item / Execution Overview",
      body_lines: [
        `Workstream mode: ${console_shell.work_item_execution_overview.workstream_mode}`,
        `Active work count: ${String(
          console_shell.work_item_execution_overview.active_work_count
        )}`,
        `Blocked work count: ${String(
          console_shell.work_item_execution_overview.blocked_work_count
        )}`,
        `Runtime work-item projection available: ${String(
          console_shell.work_item_execution_overview.actual_runtime_work_item_projection_available
        )}`,
        `Work-item timeline available: ${String(
          console_shell.work_item_execution_overview.work_item_timeline_available
        )}`,
        ...console_shell.work_item_execution_overview.non_claims.map(
          (claim) => `Non-claim: ${claim}`
        ),
      ],
    },
    memory_continuity_overview: {
      section_key: "memory_continuity_overview",
      heading: "Memory / Continuity Overview",
      body_lines: [
        `Anchor ref: ${console_shell.memory_continuity_overview.anchor_ref_id}`,
        `Continuity sources: ${console_shell.memory_continuity_overview.continuity_sources.join(", ")}`,
        `Continuity status: ${console_shell.memory_continuity_overview.continuity_status}`,
        `Continuity note: ${console_shell.memory_continuity_overview.continuity_note}`,
        ...console_shell.memory_continuity_overview.known_absences.map(
          (absence) => `Known absence: ${absence}`
        ),
      ],
    },
    deferred_surfaces: {
      section_key: "deferred_surfaces",
      heading: "Deferred Surfaces",
      body_lines: [
        `Optional mounts present: ${String(console_shell.deferred_surfaces.optional_mounts_present)}`,
        `All mounts deferred: ${String(console_shell.deferred_surfaces.all_mounts_deferred)}`,
        ...console_shell.deferred_surfaces.business_pack_mount_keys.map(
          (mount_key) => `Business pack mount: ${mount_key}`
        ),
        ...console_shell.deferred_surfaces.metrics_pack_mount_keys.map(
          (mount_key) => `Metrics pack mount: ${mount_key}`
        ),
        ...console_shell.deferred_surfaces.deferred_items.map(
          (item) => `Deferred item: ${item}`
        ),
      ],
    },
    truth_boundary: {
      section_key: "truth_boundary",
      heading: "Truth Boundary",
      body_lines: [
        ...console_shell.truth_boundary.persisted_structural_truth_sections.map(
          (section_name) => `Persisted structural truth section: ${section_name}`
        ),
        ...console_shell.truth_boundary.seeded_summary_truth_sections.map(
          (section_name) => `Seeded summary truth section: ${section_name}`
        ),
        ...console_shell.truth_boundary.deferred_items.map(
          (item) => `Deferred boundary item: ${item}`
        ),
        ...console_shell.truth_boundary.non_claims.map(
          (claim) => `Non-claim: ${claim}`
        ),
      ],
    },
  } satisfies SingleCellOperatorConsolePage["sections"];

  const non_claims = [...console_shell.truth_boundary.non_claims];
  const html = [
    `<main data-route="${SINGLE_CELL_OPERATOR_CONSOLE_ROUTE}">`,
    `<header>`,
    `<p>Single-cell operator console</p>`,
    `<h1>${escape_html(console_shell.header.cell_name)}</h1>`,
    `<p>${escape_html(console_shell.header.current_objective_headline)}</p>`,
    `</header>`,
    render_section(sections.header),
    render_section(sections.delivery),
    render_section(sections.crew_overview),
    render_section(sections.objective_overview),
    render_section(sections.work_item_execution_overview),
    render_section(sections.memory_continuity_overview),
    render_section(sections.deferred_surfaces),
    render_section(sections.truth_boundary),
    `</main>`,
  ].join("");

  return {
    route_path: SINGLE_CELL_OPERATOR_CONSOLE_ROUTE,
    page_kind: "single_cell_operator_console_page",
    page_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_operator_page",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    console_shell,
    sections,
    non_claims,
    html,
  };
}
