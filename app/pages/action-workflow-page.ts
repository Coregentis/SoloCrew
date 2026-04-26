import type {
  ActionWorkflowPageModel,
} from "../shell/create-action-workflow-page-model.ts";

export function buildActionWorkflowRoute(cell_id: string): string {
  return `/actions/${cell_id}`;
}

export interface ActionWorkflowPage {
  route_path: string;
  page_kind: "action_workflow_page";
  page_scope: "action_workflow_product_surface";
  operator_surface: "action_workflow";
  phase_boundary: "v2_0_wave7_bounded_action_class_connection";
  page_title: string;
  request_summary: string;
  outcome_summary: string;
  review_summary: string;
  produced_artifact_summary: string;
  deferred_summary: string;
  blocked_summary: string;
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

export function renderActionWorkflowPage(
  model: ActionWorkflowPageModel
): ActionWorkflowPage {
  const route_path = buildActionWorkflowRoute(model.cell_identity.cell_id);
  const page_title = `${model.cell_identity.cell_label} Action Workflow`;
  const request_summary =
    `${model.action_requests.length} action requests remain visible for ${model.cell_identity.cell_label}.`;
  const outcome_summary =
    `${model.action_outcomes.length} local action outcomes remain visible with bounded class decisions.`;
  const review_summary =
    `${model.review_proposals.length} local review proposals remain visible without auto-application.`;
  const produced_artifact_summary =
    `${model.produced_local_artifacts.length} produced local artifacts remain visible from bounded action outcomes.`;
  const deferred_summary =
    `${model.deferred_items.length} deferred strong-confirmation items remain visible and non-dispatching.`;
  const blocked_summary =
    `${model.blocked_items.length} blocked irreversible items remain visible as evidence-only outcomes.`;
  const boundary_summary = model.boundary_notices.join(" ");

  const html = [
    "<main data-surface=\"action-workflow\">",
    "<section data-section=\"hero\">",
    `<h1>${escape_html(page_title)}</h1>`,
    `<p>${escape_html(request_summary)}</p>`,
    `<p>${escape_html(outcome_summary)}</p>`,
    `<p>${escape_html(boundary_summary)}</p>`,
    "</section>",
    "<section data-section=\"requests\">",
    "<h2>Action Requests</h2>",
    ...model.action_requests.map(
      (request) =>
        `<p>${escape_html(request.title)} [${escape_html(request.action_class)} / ${escape_html(request.action_kind)} / ${escape_html(request.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"policy-decisions\">",
    "<h2>Policy Decisions</h2>",
    ...model.policy_decisions.map(
      (decision) =>
        `<p>${escape_html(decision.action_request_id)} [${escape_html(decision.decision)}] ${escape_html(decision.rationale)}</p>`
    ),
    "</section>",
    "<section data-section=\"outcomes\">",
    "<h2>Outcomes</h2>",
    ...model.action_outcomes.map(
      (outcome) =>
        `<p>${escape_html(outcome.action_outcome_id)} [${escape_html(outcome.outcome_kind)}] ${escape_html(outcome.outcome_summary)}</p>`
    ),
    "</section>",
    "<section data-section=\"review-proposals\">",
    "<h2>Review Proposals</h2>",
    `<p>${escape_html(review_summary)}</p>`,
    ...model.review_proposals.map(
      (proposal) =>
        `<p>${escape_html(proposal.proposal_title)} [${escape_html(proposal.status)}] ${escape_html(proposal.proposal_summary)}</p>`
    ),
    "</section>",
    "<section data-section=\"produced-artifacts\">",
    "<h2>Produced Local Artifacts</h2>",
    `<p>${escape_html(produced_artifact_summary)}</p>`,
    ...model.produced_local_artifacts.map(
      (artifact) =>
        `<p>${escape_html(artifact.title)} [${escape_html(artifact.artifact_kind)} / ${escape_html(artifact.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"deferred-items\">",
    "<h2>Deferred Strong-Confirmation Items</h2>",
    `<p>${escape_html(deferred_summary)}</p>`,
    ...model.deferred_items.map(
      (outcome) =>
        `<p>${escape_html(outcome.action_outcome_id)} ${escape_html(outcome.outcome_summary)}</p>`
    ),
    "</section>",
    "<section data-section=\"blocked-items\">",
    "<h2>Blocked Irreversible Items</h2>",
    `<p>${escape_html(blocked_summary)}</p>`,
    ...model.blocked_items.map(
      (outcome) =>
        `<p>${escape_html(outcome.action_outcome_id)} ${escape_html(outcome.outcome_summary)}</p>`
    ),
    "</section>",
    "<section data-section=\"boundary\">",
    "<h2>Boundary Summary</h2>",
    `<p>${escape_html(boundary_summary)}</p>`,
    ...model.boundary_notices.map(
      (notice) => `<p>Boundary notice: ${escape_html(notice)}</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path,
    page_kind: "action_workflow_page",
    page_scope: "action_workflow_product_surface",
    operator_surface: "action_workflow",
    phase_boundary: "v2_0_wave7_bounded_action_class_connection",
    page_title,
    request_summary,
    outcome_summary,
    review_summary,
    produced_artifact_summary,
    deferred_summary,
    blocked_summary,
    boundary_summary,
    html,
  };
}
