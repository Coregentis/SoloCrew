import type {
  ArtifactWorkflowPageModel,
} from "../shell/create-artifact-workflow-page-model.ts";

export function buildArtifactWorkflowRoute(cell_id: string): string {
  return `/artifacts/${cell_id}`;
}

export interface ArtifactWorkflowPage {
  route_path: string;
  page_kind: "artifact_workflow_page";
  page_scope: "artifact_workflow_product_surface";
  operator_surface: "artifact_workflow";
  phase_boundary: "v2_0_wave5_artifact_workflow_and_persistence";
  page_title: string;
  artifact_list_summary: string;
  selected_artifact_summary: string;
  history_summary: string;
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

export function renderArtifactWorkflowPage(
  model: ArtifactWorkflowPageModel
): ArtifactWorkflowPage {
  const route_path = buildArtifactWorkflowRoute(model.cell_identity.cell_id);
  const page_title = `${model.cell_identity.cell_label} Artifact Workflow`;
  const artifact_list_summary = `${model.artifacts.length} local artifacts remain visible for ${model.cell_identity.cell_label}.`;
  const selected_artifact_summary =
    model.selected_artifact === null
      ? "No artifact is currently selected."
      : `${model.selected_artifact.title} [${model.selected_artifact.status} / ${model.selected_artifact.artifact_class}]`;
  const history_summary =
    model.selected_artifact === null
      ? "No artifact history is visible."
      : `${model.artifact_history.length} revisions remain visible for ${model.selected_artifact.artifact_id}.`;
  const boundary_summary = model.persistence_boundary_notice;

  const html = [
    "<main data-surface=\"artifact-workflow\">",
    "<section data-section=\"hero\">",
    `<h1>${escape_html(page_title)}</h1>`,
    `<p>${escape_html(artifact_list_summary)}</p>`,
    `<p>${escape_html(boundary_summary)}</p>`,
    "</section>",
    "<section data-section=\"artifact-list\">",
    "<h2>Artifacts</h2>",
    ...model.artifacts.map(
      (artifact) =>
        `<p>${escape_html(artifact.title)} [${escape_html(artifact.artifact_kind)} / ${escape_html(artifact.status)}]</p>`
    ),
    "</section>",
    "<section data-section=\"selected-artifact\">",
    "<h2>Selected Artifact</h2>",
    `<p>${escape_html(selected_artifact_summary)}</p>`,
    ...(model.selected_artifact === null
      ? []
      : [
          `<pre>${escape_html(model.selected_artifact.content)}</pre>`,
          `<p>Source fixture ref: ${escape_html(model.selected_artifact.source_fixture_ref)}</p>`,
        ]),
    "</section>",
    "<section data-section=\"history\">",
    "<h2>History</h2>",
    `<p>${escape_html(history_summary)}</p>`,
    ...model.artifact_history.map(
      (record) =>
        `<p>${escape_html(record.artifact_version_id)} [${escape_html(record.status)} / r${record.revision_index}]</p>`
    ),
    "</section>",
    "</main>",
  ].join("");

  return {
    route_path,
    page_kind: "artifact_workflow_page",
    page_scope: "artifact_workflow_product_surface",
    operator_surface: "artifact_workflow",
    phase_boundary: "v2_0_wave5_artifact_workflow_and_persistence",
    page_title,
    artifact_list_summary,
    selected_artifact_summary,
    history_summary,
    boundary_summary,
    html,
  };
}
