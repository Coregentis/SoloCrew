import assert from "node:assert/strict";
import test from "node:test";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

import type {
  ProductArtifactCellId,
} from "../../app/artifacts/artifact-contract.ts";
import {
  loadArtifactStore,
  restoreArtifactStore,
} from "../../app/artifacts/artifact-store.ts";
import {
  archiveArtifact,
  createArtifactDraft,
  getArtifact,
  getArtifactHistory,
  listArtifactsByCell,
  reviseArtifact,
  saveArtifact,
} from "../../app/artifacts/artifact-workflow.ts";
import {
  createCellOperationsPanelProductPageModel,
} from "../../app/shell/create-cell-operations-panel-product-page-model.ts";
import {
  STARTER_CELL_IDS,
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

function create_temp_store() {
  const root = mkdtempSync(join(tmpdir(), "solocrew-artifact-workflow-"));
  const storage_path = join(root, "artifacts.json");
  return {
    root,
    storage_path,
    cleanup() {
      rmSync(root, { recursive: true, force: true });
    },
  };
}

function create_and_save_artifact(
  cell_id: ProductArtifactCellId,
  storage_path: string
) {
  const store = loadArtifactStore({ storage_path });
  const draft = createArtifactDraft({ cell_id });
  const saved = saveArtifact(store, draft);
  return { store, draft, saved };
}

test("[app] Development Company Cell can create and save a local artifact draft", () => {
  const temp_store = create_temp_store();

  try {
    const { saved } = create_and_save_artifact(
      "development_company",
      temp_store.storage_path
    );

    assert.equal(saved.cell_id, "development_company");
    assert.equal(saved.artifact_kind, "implementation_plan");
    assert.equal(saved.artifact_class, "local_generated");
    assert.equal(saved.status, "draft");
    assert.ok(saved.content.length > 40);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] E-commerce Cell can create and save a local artifact draft", () => {
  const temp_store = create_temp_store();

  try {
    const { saved } = create_and_save_artifact("ecommerce", temp_store.storage_path);

    assert.equal(saved.cell_id, "ecommerce");
    assert.equal(saved.artifact_kind, "listing_copy");
    assert.equal(saved.artifact_class, "external_draft");
    assert.equal(saved.status, "draft");
    assert.ok(saved.content.length > 40);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] Personal Media Cell can create and save a local artifact draft", () => {
  const temp_store = create_temp_store();

  try {
    const { saved } = create_and_save_artifact(
      "personal_media",
      temp_store.storage_path
    );

    assert.equal(saved.cell_id, "personal_media");
    assert.equal(saved.artifact_kind, "article_draft");
    assert.equal(saved.artifact_class, "external_draft");
    assert.equal(saved.status, "draft");
    assert.ok(saved.content.length > 40);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] listArtifactsByCell returns only artifacts for that Cell and getArtifact retrieves saved artifact", () => {
  const temp_store = create_temp_store();

  try {
    const store = loadArtifactStore({ storage_path: temp_store.storage_path });
    const development = saveArtifact(
      store,
      createArtifactDraft({ cell_id: "development_company" })
    );
    const ecommerce = saveArtifact(
      store,
      createArtifactDraft({ cell_id: "ecommerce" })
    );

    const development_list = listArtifactsByCell(store, "development_company");
    const ecommerce_list = listArtifactsByCell(store, "ecommerce");

    assert.deepEqual(
      development_list.map((artifact) => artifact.artifact_id),
      [development.artifact_id]
    );
    assert.deepEqual(
      ecommerce_list.map((artifact) => artifact.artifact_id),
      [ecommerce.artifact_id]
    );

    const loaded = getArtifact(store, development.artifact_id);
    assert.ok(loaded !== null);
    assert.equal(loaded?.artifact_version_id, development.artifact_version_id);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] reviseArtifact creates new version and preserves history while archiveArtifact keeps history intact", () => {
  const temp_store = create_temp_store();

  try {
    const store = loadArtifactStore({ storage_path: temp_store.storage_path });
    const saved = saveArtifact(
      store,
      createArtifactDraft({ cell_id: "development_company" })
    );
    const revised = reviseArtifact(store, {
      artifact_id: saved.artifact_id,
      content: `${saved.content}\n\nRevision note: tighten scope summary.`,
    });
    const archived = archiveArtifact(store, {
      artifact_id: saved.artifact_id,
    });
    const history = getArtifactHistory(store, saved.artifact_id);

    assert.ok(revised !== null);
    assert.ok(archived !== null);
    assert.equal(revised?.revision_index, 1);
    assert.equal(revised?.status, "revised");
    assert.equal(archived?.revision_index, 2);
    assert.equal(archived?.status, "archived");
    assert.equal(archived?.artifact_class, "archived");
    assert.equal(history.length, 3);
    assert.equal(history[0]?.status, "draft");
    assert.equal(history[1]?.status, "revised");
    assert.equal(history[2]?.status, "archived");
  } finally {
    temp_store.cleanup();
  }
});

test("[app] persisted artifacts and history survive store reload and restart", () => {
  const temp_store = create_temp_store();

  try {
    const first_store = loadArtifactStore({ storage_path: temp_store.storage_path });
    const saved = saveArtifact(
      first_store,
      createArtifactDraft({ cell_id: "personal_media" })
    );
    reviseArtifact(first_store, {
      artifact_id: saved.artifact_id,
      content: `${saved.content}\n\nRevision note: update the summary paragraph.`,
    });
    first_store.close();

    const reloaded_store = restoreArtifactStore({
      storage_path: temp_store.storage_path,
    });
    const current = getArtifact(reloaded_store, saved.artifact_id);
    const history = getArtifactHistory(reloaded_store, saved.artifact_id);

    assert.ok(current !== null);
    assert.equal(current?.revision_index, 1);
    assert.equal(history.length, 2);
    assert.equal(history[0]?.revision_index, 0);
    assert.equal(history[1]?.revision_index, 1);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] artifact records remain bounded, draft-only when external, and unknown retrieval fails safely", () => {
  const temp_store = create_temp_store();

  try {
    const { store, saved } = create_and_save_artifact(
      "ecommerce",
      temp_store.storage_path
    );

    assert.equal(saved.non_executing, true);
    assert.equal(saved.provider_execution_available, false);
    assert.equal(saved.channel_entry_available, false);
    assert.equal(saved.external_dispatch_available, false);
    assert.equal(saved.runtime_private_fields_omitted, true);
    assert.ok(saved.related_task_refs.length >= 1);
    assert.ok(saved.source_evidence_refs.length >= 1);
    assert.equal(saved.status, "draft");
    assert.equal(getArtifact(store, "unknown-artifact"), null);
  } finally {
    temp_store.cleanup();
  }
});

test("[app] artifact workflow output is deterministic across repeated runs with the same input", () => {
  const first = createArtifactDraft({ cell_id: "development_company" });
  const second = createArtifactDraft({ cell_id: "development_company" });

  assert.deepEqual(first, second);
});

test("[app] Cell Operations Panel can consume persisted artifact summaries when provided and still preserve starter-cell boundaries", () => {
  const temp_store = create_temp_store();

  try {
    const { store, saved } = create_and_save_artifact(
      "development_company",
      temp_store.storage_path
    );
    const revised = reviseArtifact(store, {
      artifact_id: saved.artifact_id,
      content: `${saved.content}\n\nRevision note: emphasize task sequencing.`,
    });
    const persisted_artifacts = listArtifactsByCell(store, "development_company");
    const artifact_history = getArtifactHistory(store, saved.artifact_id);
    const runtime_state_projection = createStarterCellsRuntimeStateProjection();
    const panel = createCellOperationsPanelProductPageModel(
      runtime_state_projection,
      {
        target_cell_id: "development_company",
        persisted_artifacts,
        persisted_artifact_history: artifact_history,
      }
    );

    assert.ok(revised !== null);
    assert.equal(panel.artifact_section.items[0]?.artifact_id, saved.artifact_id);
    assert.equal(panel.artifact_section.items[0]?.status, "revised");
    assert.ok(
      panel.history_section.items.some(
        (item) => item.source_ref_id === saved.artifact_id
      )
    );
    assert.equal(panel.provider_execution_available, false);
    assert.equal(panel.non_executing, true);
  } finally {
    temp_store.cleanup();
  }
});
