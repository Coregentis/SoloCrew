import type {
  FounderDashboardProductPageModel,
} from "../shell/create-v2-founder-dashboard-page-model.ts";

export const V2_FOUNDER_DASHBOARD_ROUTE = "/portfolio/v2/founder-dashboard";
export const FOUNDER_DASHBOARD_PRODUCT_ROUTE = V2_FOUNDER_DASHBOARD_ROUTE;

export interface V2FounderDashboardPage {
  route_path: string;
  page_kind: "v2_founder_dashboard_page";
  canonical_page_kind: "founder_dashboard_product_page";
  page_scope: "founder_dashboard_product_surface";
  operator_surface: "v2_founder_dashboard_productized";
  canonical_operator_surface: "founder_dashboard_productized";
  authority_boundary: "app_page_projection_consumer";
  phase_boundary: "v2_0_wave3_founder_dashboard_productization";
  phase_ref: "founder_dashboard_productization";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_delivered: false;
  delivery_status: false;
  v2_0_ready: false;
  readiness_status: false;
  ga_available: false;
  page_title: string;
  hero_summary: string;
  starter_cell_cards: FounderDashboardProductPageModel["cells_overview"];
  review_queue_summary: string;
  artifact_activity_summary: string;
  learning_summary: string;
  drift_summary: string;
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

function summarize_review_queue(
  model: FounderDashboardProductPageModel
): string {
  return `${model.pending_reviews.length} pending review items remain visible across the starter-cell dashboard.`;
}

function summarize_artifact_activity(
  model: FounderDashboardProductPageModel
): string {
  return `${model.recent_artifacts.length} recent artifacts are surfaced from the starter-cell fixtures.`;
}

function summarize_learning(
  model: FounderDashboardProductPageModel
): string {
  return `${model.learned_preferences.length} learned preference summaries remain visible across the starter-cell fixtures.`;
}

function summarize_drift(
  model: FounderDashboardProductPageModel
): string {
  return `${model.drift_and_blocked_items.length} starter-cell drift or bounded attention summaries remain visible in the founder overview.`;
}

function summarize_suggested_actions(
  model: FounderDashboardProductPageModel
): string {
  return `${model.suggested_next_actions.length} suggested next actions remain visible without widening execution scope.`;
}

export function renderV2FounderDashboardPage(
  model: FounderDashboardProductPageModel
): V2FounderDashboardPage {
  const review_queue_summary = summarize_review_queue(model);
  const artifact_activity_summary = summarize_artifact_activity(model);
  const learning_summary = summarize_learning(model);
  const drift_summary = summarize_drift(model);
  const suggested_next_actions_summary = summarize_suggested_actions(model);
  const boundary_summary = [...model.readiness_notices, ...model.boundary_notices].join(
    " "
  );

  const html = [
    "<main data-surface=\"v2-founder-dashboard\">",
    "<section data-section=\"hero\">",
    `<h1>${escape_html(model.dashboard_title)}</h1>`,
    `<p>${escape_html(model.dashboard_summary)}</p>`,
    ...model.readiness_notices.map(
      (notice) => `<p>Readiness notice: ${escape_html(notice)}</p>`
    ),
    "</section>",
    "<section data-section=\"starter-cells\">",
    "<h2>Starter Cells</h2>",
    ...model.cells_overview.map((card) =>
      [
        `<article data-cell-id="${escape_html(card.cell_id)}">`,
        `<h3>${escape_html(card.cell_label)}</h3>`,
        `<p>Cell kind: ${escape_html(card.cell_kind)}</p>`,
        `<p>Status: ${escape_html(card.status)}</p>`,
        `<p>Purpose: ${escape_html(card.purpose_summary)}</p>`,
        `<p>Current priority: ${escape_html(card.current_priority_summary)}</p>`,
        `<p>Pending review summary: ${escape_html(card.pending_review_summary)}</p>`,
        `<p>Recent artifact summary: ${escape_html(card.recent_artifact_summary)}</p>`,
        `<p>Learned preference summary: ${escape_html(card.learned_preference_summary)}</p>`,
        `<p>Drift summary: ${escape_html(card.drift_summary)}</p>`,
        `<p>Suggested next action summary: ${escape_html(card.suggested_next_action_summary)}</p>`,
        `<p>Readiness state: ${escape_html(card.readiness_state)}</p>`,
        "</article>",
      ].join("")
    ),
    "</section>",
    "<section data-section=\"active-priorities\">",
    "<h2>Active Priorities</h2>",
    `<p>${escape_html(model.dashboard_summary)}</p>`,
    ...model.active_priorities.map(
      (priority) =>
        `<p>${escape_html(priority.cell_label)}: ${escape_html(priority.summary)} [${escape_html(priority.readiness_state)}]</p>`
    ),
    "</section>",
    "<section data-section=\"review-queue\">",
    "<h2>Review Queue</h2>",
    `<p>${escape_html(review_queue_summary)}</p>`,
    ...model.pending_reviews.map(
      (review) =>
        `<p>${escape_html(review.cell_label)} -> ${escape_html(review.title)} [${escape_html(review.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"artifact-activity\">",
    "<h2>Artifact Activity</h2>",
    `<p>${escape_html(artifact_activity_summary)}</p>`,
    ...model.recent_artifacts.map(
      (artifact) =>
        `<p>${escape_html(artifact.cell_label)} -> ${escape_html(artifact.title)} [${escape_html(artifact.artifact_class)}]</p>`
    ),
    "</section>",
    "<section data-section=\"learning\">",
    "<h2>Learning Continuity</h2>",
    `<p>${escape_html(learning_summary)}</p>`,
    ...model.learned_preferences.map(
      (preference) =>
        `<p>${escape_html(preference.cell_label)} -> ${escape_html(preference.summary)} [${escape_html(preference.application_scope)} / ${escape_html(preference.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"drift-and-blocked-items\">",
    "<h2>Drift And Blocked Items</h2>",
    `<p>${escape_html(drift_summary)}</p>`,
    ...model.drift_and_blocked_items.map(
      (item) =>
        `<p>${escape_html(item.cell_label)} -> ${escape_html(item.drift_summary)} :: ${escape_html(item.blocked_item_summary)} [${escape_html(item.readiness_state)}]</p>`
    ),
    "</section>",
    "<section data-section=\"suggested-next-actions\">",
    "<h2>Suggested Next Actions</h2>",
    `<p>${escape_html(suggested_next_actions_summary)}</p>`,
    ...model.suggested_next_actions.map(
      (action) =>
        `<p>${escape_html(action.cell_label)} -> ${escape_html(action.title)} [${escape_html(action.action_class)} / ${escape_html(action.readiness_status)}]</p>`
    ),
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
    route_path: V2_FOUNDER_DASHBOARD_ROUTE,
    page_kind: "v2_founder_dashboard_page",
    canonical_page_kind: "founder_dashboard_product_page",
    page_scope: "founder_dashboard_product_surface",
    operator_surface: "v2_founder_dashboard_productized",
    canonical_operator_surface: "founder_dashboard_productized",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "v2_0_wave3_founder_dashboard_productization",
    phase_ref: "founder_dashboard_productization",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_delivered: false,
    delivery_status: false,
    v2_0_ready: false,
    readiness_status: false,
    ga_available: false,
    page_title: model.dashboard_title,
    hero_summary: model.dashboard_summary,
    starter_cell_cards: model.cells_overview,
    review_queue_summary,
    artifact_activity_summary,
    learning_summary,
    drift_summary,
    suggested_next_actions_summary,
    boundary_summary,
    next_allowed_wave: model.next_wave_hint,
    html,
  };
}

export type FounderDashboardProductPage = V2FounderDashboardPage;

export const renderFounderDashboardProductPage =
  renderV2FounderDashboardPage;
