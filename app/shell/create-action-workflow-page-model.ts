import type {
  ProductArtifactCellId,
  ProductArtifactRecord,
} from "../artifacts/artifact-contract.ts";
import type {
  ArtifactStoreOptions,
  ProductArtifactStore,
} from "../artifacts/artifact-store.ts";
import {
  loadArtifactStore,
} from "../artifacts/artifact-store.ts";
import {
  getArtifact,
} from "../artifacts/artifact-workflow.ts";
import {
  STARTER_CELL_DEFINITIONS,
  V2_STARTER_CELL_KIND,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import type {
  ProductActionOutcomeRecord,
  ProductActionPolicyDecision,
  ProductActionRequestRecord,
  ProductReviewProposalRecord,
} from "../actions/action-contract.ts";
import type {
  ActionStoreOptions,
  ProductActionStore,
} from "../actions/action-store.ts";
import {
  loadActionStore,
} from "../actions/action-store.ts";
import {
  evaluateActionRequest,
  listActionOutcomesByCell,
  listActionRequestsByCell,
  listReviewProposalsByCell,
} from "../actions/action-workflow.ts";

export interface CreateActionWorkflowPageModelOptions {
  cell_id: ProductArtifactCellId;
  artifact_store_or_options?: ProductArtifactStore | ArtifactStoreOptions;
}

export interface ActionWorkflowPageModel {
  page_id: string;
  page_kind: "action_workflow_page_model";
  phase_boundary: "v2_0_wave7_bounded_action_class_connection";
  product_line: "v2_0";
  product_surface: "action_workflow";
  source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts";
  storage_path: string;
  cell_identity: {
    cell_id: ProductArtifactCellId;
    cell_label: string;
    cell_kind: string;
  };
  action_requests: ProductActionRequestRecord[];
  policy_decisions: Array<{
    action_request_id: string;
    decision: ProductActionPolicyDecision["decision"];
    rationale: string;
    confirmation_required: boolean;
  }>;
  action_outcomes: ProductActionOutcomeRecord[];
  review_proposals: ProductReviewProposalRecord[];
  produced_local_artifacts: ProductArtifactRecord[];
  deferred_items: ProductActionOutcomeRecord[];
  blocked_items: ProductActionOutcomeRecord[];
  boundary_notices: string[];
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  external_dispatch_available: false;
  v2_0_delivered: false;
  v2_0_ready: false;
  ga_available: false;
}

function find_definition(cell_id: ProductArtifactCellId) {
  return STARTER_CELL_DEFINITIONS.find((definition) => definition.cell_id === cell_id);
}

function resolve_artifact_store(
  store_or_options?: ProductArtifactStore | ArtifactStoreOptions
): ProductArtifactStore | null {
  if (!store_or_options) {
    return null;
  }

  return store_or_options instanceof Object &&
      "load_snapshot" in store_or_options &&
      "storage_path" in store_or_options
    ? (store_or_options as ProductArtifactStore)
    : loadArtifactStore(store_or_options as ArtifactStoreOptions);
}

function unique_strings(values: string[]): string[] {
  return [...new Set(values.filter((value) => value.trim().length > 0))].sort(
    (left, right) => left.localeCompare(right)
  );
}

export function createActionWorkflowPageModel(
  store_or_options: ProductActionStore | ActionStoreOptions,
  options: CreateActionWorkflowPageModelOptions
): ActionWorkflowPageModel {
  const action_store =
    store_or_options instanceof Object &&
      "load_snapshot" in store_or_options &&
      "storage_path" in store_or_options
      ? (store_or_options as ProductActionStore)
      : loadActionStore(store_or_options as ActionStoreOptions);
  const artifact_store = resolve_artifact_store(options.artifact_store_or_options);
  const definition = find_definition(options.cell_id);
  const action_requests = listActionRequestsByCell(action_store, options.cell_id);
  const action_outcomes = listActionOutcomesByCell(action_store, options.cell_id);
  const review_proposals = listReviewProposalsByCell(action_store, options.cell_id);
  const produced_local_artifacts =
    artifact_store === null
      ? []
      : unique_strings(
          action_outcomes.flatMap((outcome) => outcome.produced_artifact_refs)
        )
          .map((artifact_id) => getArtifact(artifact_store, artifact_id))
          .filter((artifact): artifact is ProductArtifactRecord => artifact !== null);

  return {
    page_id: `${options.cell_id}-action-workflow-page-model`,
    page_kind: "action_workflow_page_model",
    phase_boundary: "v2_0_wave7_bounded_action_class_connection",
    product_line: "v2_0",
    product_surface: "action_workflow",
    source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts",
    storage_path: action_store.storage_path,
    cell_identity: {
      cell_id: options.cell_id,
      cell_label: definition?.cell_label ?? options.cell_id,
      cell_kind: definition?.cell_kind ?? V2_STARTER_CELL_KIND,
    },
    action_requests,
    policy_decisions: action_requests.map((request) => {
      const decision = evaluateActionRequest(request);
      return {
        action_request_id: request.action_request_id,
        decision: decision.decision,
        rationale: decision.rationale,
        confirmation_required: decision.confirmation_required,
      };
    }),
    action_outcomes,
    review_proposals,
    produced_local_artifacts,
    deferred_items: action_outcomes.filter(
      (outcome) => outcome.outcome_kind === "strong_confirmation_required"
    ),
    blocked_items: action_outcomes.filter(
      (outcome) => outcome.outcome_kind === "irreversible_blocked"
    ),
    boundary_notices: [
      "Bounded action-class connection remains product-local, non-executing, and provider-neutral in this wave.",
      "A0 remains local-only, A1 remains review-required, A2 remains draft-only, A3 remains deferred, and A4 remains blocked.",
      "No provider/channel execution, no external dispatch, and no autonomous operation occur here.",
    ],
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    external_dispatch_available: false,
    v2_0_delivered: false,
    v2_0_ready: false,
    ga_available: false,
  };
}
