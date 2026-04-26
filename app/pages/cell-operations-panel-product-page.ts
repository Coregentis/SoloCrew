import {
  buildCellDetailRoute,
} from "../shell/cell-detail-view.ts";
import type {
  CellOperationsPanelProductPageModel,
} from "../shell/create-cell-operations-panel-product-page-model.ts";

export function buildCellOperationsPanelProductRoute(cell_id: string): string {
  return `${buildCellDetailRoute(cell_id)}/operations-product`;
}

export interface CellOperationsPanelProductPage {
  route_path: string;
  page_kind: "cell_operations_panel_product_page";
  page_scope: "cell_operations_panel_product_surface";
  operator_surface: "cell_operations_panel_productized";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "v2_0_wave4_cell_operations_panel_productization";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_delivered: false;
  v2_0_ready: false;
  ga_available: false;
  page_title: string;
  hero_summary: string;
  cell_identity_summary: string;
  objective_summary: string;
  task_summary: string;
  artifact_summary: string;
  action_readiness_summary: string;
  learning_summary: string;
  drift_summary: string;
  review_summary: string;
  history_summary: string;
  metric_summary: string;
  suggested_next_actions_summary: string;
  boundary_summary: string;
  next_allowed_wave: string;
  html: string;
}

function escape_html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderCellOperationsPanelProductPage(
  model: CellOperationsPanelProductPageModel
): CellOperationsPanelProductPage {
  const route_path = buildCellOperationsPanelProductRoute(
    model.cell_identity.cell_id
  );
  const cell_identity_summary =
    `${model.cell_identity.cell_label} (${model.cell_identity.cell_kind}) is ${model.cell_identity.status}. ${model.cell_identity.purpose_summary}`;
  const objective_summary = model.objective_section.summary;
  const task_summary = model.task_section.summary;
  const artifact_summary = model.artifact_section.summary;
  const action_readiness_summary = model.action_section.summary;
  const learning_summary = model.learning_section.summary;
  const drift_summary = model.drift_section.summary;
  const review_summary = model.review_section.summary;
  const history_summary = model.history_section.summary;
  const metric_summary = model.metric_section.summary;
  const suggested_next_actions_summary =
    model.suggested_next_action_section.summary;
  const boundary_summary = [
    ...model.boundary_notices,
    model.action_section.boundary_notice,
    model.learning_section.boundary_notice,
    model.drift_section.boundary_notice,
    model.suggested_next_action_section.boundary_notice,
  ].join(" ");

  const html = [
    "<main data-surface=\"cell-operations-panel-product\">",
    "<section data-section=\"hero\">",
    `<h1>${escape_html(model.panel_title)}</h1>`,
    `<p>${escape_html(model.panel_summary)}</p>`,
    `<p>${escape_html(cell_identity_summary)}</p>`,
    "</section>",
    "<section data-section=\"objective\">",
    "<h2>Objective</h2>",
    `<p>${escape_html(objective_summary)}</p>`,
    "</section>",
    "<section data-section=\"tasks\">",
    "<h2>Tasks</h2>",
    `<p>${escape_html(task_summary)}</p>`,
    ...(model.task_section.empty_notice
      ? [`<p>${escape_html(model.task_section.empty_notice)}</p>`]
      : model.task_section.items.map(
          (task) =>
            `<p>${escape_html(task.title)} [${escape_html(task.status)} / ${escape_html(task.task_kind ?? "task")}]</p>`
        )),
    "</section>",
    "<section data-section=\"artifacts\">",
    "<h2>Artifacts</h2>",
    `<p>${escape_html(artifact_summary)}</p>`,
    ...(model.artifact_section.empty_notice
      ? [`<p>${escape_html(model.artifact_section.empty_notice)}</p>`]
      : model.artifact_section.items.map(
          (artifact) =>
            `<p>${escape_html(artifact.title)} [${escape_html(artifact.artifact_kind)} / ${escape_html(artifact.artifact_class)} / ${escape_html(artifact.status)}]</p>`
        )),
    "</section>",
    "<section data-section=\"actions\">",
    "<h2>Actions</h2>",
    `<p>${escape_html(action_readiness_summary)}</p>`,
    ...model.action_section.items.map(
      (action) =>
        `<p>${escape_html(action.title)} [${escape_html(action.action_kind_label)} / ${escape_html(action.display_readiness)}]</p>`
    ),
    `<p>${escape_html(model.action_section.boundary_notice)}</p>`,
    "</section>",
    "<section data-section=\"learning\">",
    "<h2>Learning</h2>",
    `<p>${escape_html(learning_summary)}</p>`,
    ...model.learning_section.accepted_scope_only_learning.map(
      (item) => `<p>Accepted same-Cell learning: ${escape_html(item)}</p>`
    ),
    ...model.learning_section.global_candidate_learning.map(
      (item) => `<p>Global candidate learning: ${escape_html(item)}</p>`
    ),
    ...model.learning_section.inactive_learning.map(
      (item) => `<p>Inactive learning: ${escape_html(item)}</p>`
    ),
    ...model.learning_section.preference_summaries.map(
      (item) => `<p>Preference summary: ${escape_html(item)}</p>`
    ),
    `<p>${escape_html(model.learning_section.boundary_notice)}</p>`,
    "</section>",
    "<section data-section=\"drift\">",
    "<h2>Drift</h2>",
    `<p>${escape_html(drift_summary)}</p>`,
    ...(model.drift_section.empty_notice
      ? [`<p>${escape_html(model.drift_section.empty_notice)}</p>`]
      : model.drift_section.items.map(
          (item) =>
            `<p>${escape_html(item.drift_kind)} [${escape_html(item.recommendation)}] ${escape_html(item.impact_summary)}</p>`
        )),
    `<p>${escape_html(model.drift_section.boundary_notice)}</p>`,
    "</section>",
    "<section data-section=\"reviews\">",
    "<h2>Reviews</h2>",
    `<p>${escape_html(review_summary)}</p>`,
    ...(model.review_section.empty_notice
      ? [`<p>${escape_html(model.review_section.empty_notice)}</p>`]
      : model.review_section.items.map(
          (review) =>
            `<p>${escape_html(review.title)} [${escape_html(review.status)}]</p>`
        )),
    "</section>",
    "<section data-section=\"history\">",
    "<h2>History</h2>",
    `<p>${escape_html(history_summary)}</p>`,
    ...(model.history_section.empty_notice
      ? [`<p>${escape_html(model.history_section.empty_notice)}</p>`]
      : model.history_section.items.map(
          (history) =>
            `<p>${escape_html(history.history_kind)}: ${escape_html(history.title)} -> ${escape_html(history.summary)}</p>`
        )),
    "</section>",
    "<section data-section=\"metrics\">",
    "<h2>Metrics</h2>",
    `<p>${escape_html(metric_summary)}</p>`,
    ...model.metric_section.items.map(
      (metric) =>
        `<p>${escape_html(metric.metric_label)} = ${metric.metric_value}</p>`
    ),
    "</section>",
    "<section data-section=\"suggested-next-actions\">",
    "<h2>Suggested Next Actions</h2>",
    `<p>${escape_html(suggested_next_actions_summary)}</p>`,
    ...(model.suggested_next_action_section.empty_notice
      ? [`<p>${escape_html(model.suggested_next_action_section.empty_notice)}</p>`]
      : model.suggested_next_action_section.items.map(
          (action) =>
            `<p>${escape_html(action.title)} [${escape_html(action.action_kind_label)} / ${escape_html(action.display_readiness)}]</p>`
        )),
    `<p>${escape_html(model.suggested_next_action_section.boundary_notice)}</p>`,
    "</section>",
    "<section data-section=\"boundary\">",
    "<h2>Boundary Summary</h2>",
    `<p>${escape_html(boundary_summary)}</p>`,
    ...model.boundary_notices.map(
      (notice) => `<p>Boundary notice: ${escape_html(notice)}</p>`
    ),
    `<p>${escape_html(model.next_wave_hint)}</p>`,
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path,
    page_kind: "cell_operations_panel_product_page",
    page_scope: "cell_operations_panel_product_surface",
    operator_surface: "cell_operations_panel_productized",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "v2_0_wave4_cell_operations_panel_productization",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_delivered: false,
    v2_0_ready: false,
    ga_available: false,
    page_title: model.panel_title,
    hero_summary: model.panel_summary,
    cell_identity_summary,
    objective_summary,
    task_summary,
    artifact_summary,
    action_readiness_summary,
    learning_summary,
    drift_summary,
    review_summary,
    history_summary,
    metric_summary,
    suggested_next_actions_summary,
    boundary_summary,
    next_allowed_wave: "V2.0 Wave 5 — Artifact Workflow and Persistence",
    html,
  };
}
