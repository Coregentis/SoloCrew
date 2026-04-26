import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import {
  createArtifactDraft,
  reviseArtifact,
  saveArtifact,
} from "../../app/artifacts/artifact-workflow.ts";
import {
  loadArtifactStore,
} from "../../app/artifacts/artifact-store.ts";
import {
  createArtifactWorkflowPageModel,
} from "../../app/shell/create-artifact-workflow-page-model.ts";
import {
  buildArtifactWorkflowRoute,
  renderArtifactWorkflowPage,
} from "../../app/pages/artifact-workflow-page.ts";

function create_temp_store() {
  const root = mkdtempSync(join(tmpdir(), "solocrew-artifact-page-"));
  const storage_path = join(root, "artifacts.json");
  return {
    root,
    storage_path,
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

test("[app] artifact workflow page model and renderer expose persisted list selected artifact history and persistence boundary", () => {
  const temp_store = create_temp_store();

  try {
    const store = loadArtifactStore({ storage_path: temp_store.storage_path });
    const saved = saveArtifact(
      store,
      createArtifactDraft({ cell_id: "development_company" })
    );
    reviseArtifact(store, {
      artifact_id: saved.artifact_id,
      content: `${saved.content}\n\nRevision note: keep the plan scoped.`,
    });

    const model = createArtifactWorkflowPageModel(store, {
      cell_id: "development_company",
      selected_artifact_id: saved.artifact_id,
    });
    const page = renderArtifactWorkflowPage(model);

    assert.equal(
      page.route_path,
      buildArtifactWorkflowRoute("development_company")
    );
    assert.match(page.page_title, /Artifact Workflow/);
    assert.match(page.artifact_list_summary, /local artifacts remain visible/i);
    assert.match(page.selected_artifact_summary, /revised/i);
    assert.match(page.history_summary, /revisions remain visible/i);
    assert.match(page.boundary_summary, /local-only, persistent across restart, non-executing/i);
    assert.match(page.html, /Selected Artifact/);
    assert.match(page.html, /History/);
    assert.match(page.html, /Source fixture ref: projection\/fixtures\/starter-cell-fixtures\.ts/);
  } finally {
    temp_store.cleanup();
  }
});
