import type {
  LearningDriftPageModel,
} from "../shell/create-learning-drift-page-model.ts";

export function buildLearningDriftRoute(cell_id: string): string {
  return `/learning-drift/${cell_id}`;
}

export interface LearningDriftPage {
  route_path: string;
  page_kind: "learning_drift_page";
  page_scope: "learning_drift_product_surface";
  operator_surface: "learning_drift";
  phase_boundary: "v2_0_wave6_learning_and_drift_productization";
  page_title: string;
  feedback_summary: string;
  learning_summary: string;
  drift_summary: string;
  boundary_summary: string;
  html: string;
}

function escape_html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

export function renderLearningDriftPage(
  model: LearningDriftPageModel
): LearningDriftPage {
  const route_path = buildLearningDriftRoute(model.cell_identity.cell_id);
  const page_title = `${model.cell_identity.cell_label} Learning And Drift`;
  const feedback_summary = `${model.feedback_records.length} feedback records remain visible for ${model.cell_identity.cell_label}.`;
  const learning_summary =
    `${model.learning_candidates.length} learning candidates remain visible, including ${model.accepted_scope_only_learning.length} accepted same-Cell preferences and ${model.global_candidate_learning.length} global candidates.`;
  const drift_summary =
    `${model.drift_impacts.length} drift impacts and ${model.drift_signals.length} drift signals remain visible for this Cell.`;
  const boundary_summary = model.boundary_notices.join(" ");

  const html = [
    "<main data-surface=\"learning-drift\">",
    "<section data-section=\"hero\">",
    `<h1>${escape_html(page_title)}</h1>`,
    `<p>${escape_html(feedback_summary)}</p>`,
    `<p>${escape_html(learning_summary)}</p>`,
    `<p>${escape_html(drift_summary)}</p>`,
    `<p>${escape_html(boundary_summary)}</p>`,
    "</section>",
    "<section data-section=\"feedback\">",
    "<h2>Feedback</h2>",
    ...model.feedback_records.map(
      (feedback) =>
        `<p>${escape_html(feedback.feedback_kind)}: ${escape_html(feedback.feedback_text)}</p>`
    ),
    "</section>",
    "<section data-section=\"learning\">",
    "<h2>Learning</h2>",
    ...model.accepted_scope_only_learning.map(
      (item) => `<p>Accepted same-Cell learning: ${escape_html(item)}</p>`
    ),
    ...model.global_candidate_learning.map(
      (item) => `<p>Global candidate learning: ${escape_html(item)}</p>`
    ),
    ...model.inactive_learning.map(
      (item) => `<p>Inactive learning: ${escape_html(item)}</p>`
    ),
    "</section>",
    "<section data-section=\"drift\">",
    "<h2>Drift</h2>",
    ...model.drift_signals.map(
      (signal) =>
        `<p>${escape_html(signal.drift_kind)}: ${escape_html(signal.change_summary)}</p>`
    ),
    ...model.drift_impacts.map(
      (impact) =>
        `<p>${escape_html(impact.drift_impact_id)} [${escape_html(impact.recommendation)} / ${escape_html(impact.status)}]</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path,
    page_kind: "learning_drift_page",
    page_scope: "learning_drift_product_surface",
    operator_surface: "learning_drift",
    phase_boundary: "v2_0_wave6_learning_and_drift_productization",
    page_title,
    feedback_summary,
    learning_summary,
    drift_summary,
    boundary_summary,
    html,
  };
}
