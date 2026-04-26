import type {
  ProductArtifactCellId,
  ProductArtifactRecord,
} from "../artifacts/artifact-contract.ts";
import {
  ProductArtifactStore,
  loadArtifactStore,
  type ArtifactStoreOptions,
} from "../artifacts/artifact-store.ts";
import {
  getArtifact,
  getArtifactHistory,
  listArtifactsByCell,
} from "../artifacts/artifact-workflow.ts";
import {
  STARTER_CELL_DEFINITIONS,
  STARTER_CELL_IDS,
} from "../../projection/fixtures/starter-cell-fixtures.ts";

export interface CreateArtifactWorkflowPageModelOptions {
  cell_id: ProductArtifactCellId;
  selected_artifact_id?: string;
}

export interface ArtifactWorkflowPageModel {
  page_id: string;
  page_kind: "artifact_workflow_page_model";
  phase_boundary: "v2_0_wave5_artifact_workflow_and_persistence";
  product_line: "v2_0";
  product_surface: "artifact_workflow";
  source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts";
  storage_path: string;
  cell_identity: {
    cell_id: ProductArtifactCellId;
    cell_label: string;
    cell_kind: string;
  };
  artifacts: ProductArtifactRecord[];
  selected_artifact: ProductArtifactRecord | null;
  artifact_history: ProductArtifactRecord[];
  persistence_boundary_notice: string;
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_delivered: false;
  v2_0_ready: false;
  ga_available: false;
}

function find_definition(cell_id: ProductArtifactCellId) {
  return STARTER_CELL_DEFINITIONS.find((definition) => definition.cell_id === cell_id);
}

export function createArtifactWorkflowPageModel(
  store_or_options: ProductArtifactStore | ArtifactStoreOptions,
  options: CreateArtifactWorkflowPageModelOptions
): ArtifactWorkflowPageModel {
  const store =
    store_or_options instanceof ProductArtifactStore
      ? store_or_options
      : loadArtifactStore(store_or_options);
  const definition = find_definition(options.cell_id);
  const artifacts = listArtifactsByCell(store, options.cell_id);
  const selected_artifact =
    options.selected_artifact_id !== undefined
      ? getArtifact(store, options.selected_artifact_id)
      : artifacts[0] ?? null;
  const artifact_history =
    selected_artifact !== null
      ? getArtifactHistory(store, selected_artifact.artifact_id)
      : [];

  return {
    page_id: `${options.cell_id}-artifact-workflow-page-model`,
    page_kind: "artifact_workflow_page_model",
    phase_boundary: "v2_0_wave5_artifact_workflow_and_persistence",
    product_line: "v2_0",
    product_surface: "artifact_workflow",
    source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts",
    storage_path: store.storage_path,
    cell_identity: {
      cell_id: options.cell_id,
      cell_label: definition?.cell_label ?? options.cell_id,
      cell_kind: definition?.cell_kind ?? options.cell_id,
    },
    artifacts,
    selected_artifact,
    artifact_history,
    persistence_boundary_notice:
      "Artifacts remain local-only, persistent across restart, non-executing, and unavailable for provider or channel dispatch in this wave.",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_delivered: false,
    v2_0_ready: false,
    ga_available: false,
  };
}
