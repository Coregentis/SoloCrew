import type {
  CellOperationsPanelPageModel,
} from "../engagement/engagement-compatibility-aliases.ts";
import {
  buildCellDetailRoute,
} from "../shell/cell-detail-view.ts";

export function buildCellOperationsPanelRoute(cell_id: string): string {
  return `${buildCellDetailRoute(cell_id)}/operations`;
}

export interface CellOperationsPanelPage {
  route_path: string;
  page_kind: "cell_operations_panel_page";
  page_scope: "cell_operations_panel_thin_consumption_only";
  operator_surface: "cell_operations_panel_thin_consumption";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "v1_9_wave4_product_surface_thin_consumption";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_ready: false;
  sections: {
    header: {
      route_path: string;
      read_mode: "thin_consumption_only";
      source_projection_ref: string;
      boundary_notes: string[];
    };
    cell_identity: CellOperationsPanelPageModel["cell_identity"];
    panel_sections: CellOperationsPanelPageModel["panel_sections"];
    metric_summary_status: CellOperationsPanelPageModel["metric_summary_status"];
    source_evidence_refs: string[];
    deferred_items: string[];
    non_claims: string[];
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

export function renderCellOperationsPanelPage(
  model: CellOperationsPanelPageModel
): CellOperationsPanelPage {
  const route_path = buildCellOperationsPanelRoute(model.cell_identity.cell_id);
  const sections = {
    header: {
      route_path,
      read_mode: "thin_consumption_only" as const,
      source_projection_ref: model.source_projection_ref,
      boundary_notes: [...model.boundary_notes],
    },
    cell_identity: model.cell_identity,
    panel_sections: model.panel_sections,
    metric_summary_status: model.metric_summary_status,
    source_evidence_refs: [...model.source_evidence_refs],
    deferred_items: [...model.deferred_items],
    non_claims: [...model.non_claims],
  };

  const html = [
    "<main>",
    "<section data-section=\"header\">",
    "<h1>Cell Operations Panel</h1>",
    `<p>Read mode: ${sections.header.read_mode}</p>`,
    `<p>Route: ${escape_html(sections.header.route_path)}</p>`,
    `<p>Source projection ref: ${escape_html(sections.header.source_projection_ref)}</p>`,
    ...sections.header.boundary_notes.map(
      (note) => `<p>Boundary note: ${escape_html(note)}</p>`
    ),
    "</section>",
    "<section data-section=\"cell-identity\">",
    "<h2>Cell Identity</h2>",
    `<p>Cell id: ${escape_html(sections.cell_identity.cell_id)}</p>`,
    `<p>Cell label: ${escape_html(sections.cell_identity.cell_label)}</p>`,
    `<p>Status: ${escape_html(sections.cell_identity.status)}</p>`,
    `<p>Objective summary: ${escape_html(sections.cell_identity.objective_summary)}</p>`,
    "</section>",
    "<section data-section=\"tasks\">",
    "<h2>Tasks</h2>",
    ...sections.panel_sections.task_summaries.map((task) =>
      `<p>Task: ${escape_html(task.title)} [${escape_html(task.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"artifacts\">",
    "<h2>Artifacts</h2>",
    ...sections.panel_sections.artifact_summaries.map((artifact) =>
      `<p>Artifact: ${escape_html(artifact.title)} [${escape_html(artifact.artifact_class)} / ${escape_html(artifact.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"actions\">",
    "<h2>Actions</h2>",
    ...sections.panel_sections.action_summaries.map((action) =>
      `<p>Action: ${escape_html(action.title)} [${escape_html(action.action_class)} / ${escape_html(action.readiness_status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"learning\">",
    "<h2>Learning</h2>",
    ...sections.panel_sections.learning_summaries.map((summary) =>
      `<p>Learning summary: ${escape_html(summary.learning_summary_id)} active=${summary.active_candidate_count}</p>`
    ),
    "</section>",
    "<section data-section=\"drift\">",
    "<h2>Drift</h2>",
    ...sections.panel_sections.drift_summaries.map((summary) =>
      `<p>Drift: ${escape_html(summary.drift_kind)} [${escape_html(summary.recommendation)}]</p>`
    ),
    "</section>",
    "<section data-section=\"reviews\">",
    "<h2>Reviews</h2>",
    ...sections.panel_sections.review_summaries.map((review) =>
      `<p>Review: ${escape_html(review.title)} [${escape_html(review.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"history\">",
    "<h2>History</h2>",
    ...sections.panel_sections.history_summaries.map((summary) =>
      `<p>History: ${escape_html(summary.history_kind)} -> ${escape_html(summary.summary)}</p>`
    ),
    "</section>",
    "<section data-section=\"metrics\">",
    "<h2>Metrics</h2>",
    `<p>Metric summary status: ${escape_html(sections.metric_summary_status)}</p>`,
    ...sections.panel_sections.metric_summaries.map((metric) =>
      `<p>Metric: ${escape_html(metric.metric_label)} = ${metric.metric_value}</p>`
    ),
    "</section>",
    "<section data-section=\"suggested-next-actions\">",
    "<h2>Suggested Next Actions</h2>",
    ...sections.panel_sections.suggested_next_actions.map((action) =>
      `<p>Suggested next action: ${escape_html(action.title)} [${escape_html(action.action_class)} / ${escape_html(action.readiness_status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"boundary\">",
    "<h2>Boundary</h2>",
    `<p>V2.0 ready: ${model.v2_0_ready}</p>`,
    `<p>Provider execution available: ${model.provider_execution_available}</p>`,
    `<p>Channel entry available: ${model.channel_entry_available}</p>`,
    `<p>Autonomous operation available: ${model.autonomous_operation_available}</p>`,
    ...sections.source_evidence_refs.map(
      (ref) => `<p>Source evidence ref: ${escape_html(ref)}</p>`
    ),
    ...sections.deferred_items.map(
      (item) => `<p>Deferred item: ${escape_html(item)}</p>`
    ),
    ...sections.non_claims.map(
      (claim) => `<p>Non-claim: ${escape_html(claim)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path,
    page_kind: "cell_operations_panel_page",
    page_scope: "cell_operations_panel_thin_consumption_only",
    operator_surface: "cell_operations_panel_thin_consumption",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "v1_9_wave4_product_surface_thin_consumption",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_ready: false,
    sections,
    html,
  };
}
