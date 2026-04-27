import type {
  ProductArtifactCellId,
} from "../artifacts/artifact-contract.ts";
import {
  STARTER_CELL_DEFINITIONS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import {
  ProductLearningDriftStore,
  loadLearningDriftStore,
  type LearningDriftStoreOptions,
} from "../learning/learning-drift-store.ts";
import {
  listFeedbackByCell,
  listGlobalLearningCandidates,
  listLearningCandidatesByCell,
  summarizeLearningForCell,
} from "../learning/learning-workflow.ts";
import {
  listDriftImpactsByCell,
  listDriftSignalsByCell,
} from "../learning/drift-workflow.ts";

export interface CreateLearningDriftPageModelOptions {
  cell_id: ProductArtifactCellId;
}

export interface LearningDriftPageModel {
  page_id: string;
  page_kind: "learning_drift_page_model";
  phase_boundary: "v2_0_wave6_learning_and_drift_productization";
  product_line: "v2_0";
  product_surface: "learning_drift";
  source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts";
  storage_path: string;
  cell_identity: {
    cell_id: ProductArtifactCellId;
    cell_label: string;
    cell_kind: string;
  };
  feedback_records: ReturnType<typeof listFeedbackByCell>;
  learning_candidates: ReturnType<typeof listLearningCandidatesByCell>;
  accepted_scope_only_learning: string[];
  global_candidate_learning: string[];
  inactive_learning: string[];
  drift_signals: ReturnType<typeof listDriftSignalsByCell>;
  drift_impacts: ReturnType<typeof listDriftImpactsByCell>;
  recommendations: string[];
  boundary_notices: string[];
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

export function createLearningDriftPageModel(
  store_or_options: ProductLearningDriftStore | LearningDriftStoreOptions,
  options: CreateLearningDriftPageModelOptions
): LearningDriftPageModel {
  const store =
    store_or_options instanceof ProductLearningDriftStore
      ? store_or_options
      : loadLearningDriftStore(store_or_options);
  const definition = find_definition(options.cell_id);
  const feedback_records = listFeedbackByCell(store, options.cell_id);
  const learning_candidates = listLearningCandidatesByCell(store, options.cell_id);
  const learning_summary = summarizeLearningForCell(
    learning_candidates,
    options.cell_id
  );
  const drift_signals = listDriftSignalsByCell(store, options.cell_id);
  const drift_impacts = listDriftImpactsByCell(store, options.cell_id);

  return {
    page_id: `${options.cell_id}-learning-drift-page-model`,
    page_kind: "learning_drift_page_model",
    phase_boundary: "v2_0_wave6_learning_and_drift_productization",
    product_line: "v2_0",
    product_surface: "learning_drift",
    source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts",
    storage_path: store.storage_path,
    cell_identity: {
      cell_id: options.cell_id,
      cell_label: definition?.cell_label ?? options.cell_id,
      cell_kind: definition?.cell_kind ?? V2_STARTER_CELL_KIND,
    },
    feedback_records,
    learning_candidates,
    accepted_scope_only_learning:
      learning_summary.accepted_scope_only_learning,
    global_candidate_learning: learning_summary.global_candidate_learning,
    inactive_learning: learning_summary.inactive_learning,
    drift_signals,
    drift_impacts,
    recommendations: drift_impacts.map(
      (impact) => `${impact.drift_impact_id}: ${impact.recommendation}`
    ),
    boundary_notices: [
      "Learning and drift remain product-local, non-executing, and provider-neutral in this wave.",
      "Global candidate learning remains candidate-only until a later policy decision.",
      "No model training or autonomous global learning mutation is performed here.",
      "Drift recommendations do not mutate artifacts or dispatch external work automatically.",
    ],
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
