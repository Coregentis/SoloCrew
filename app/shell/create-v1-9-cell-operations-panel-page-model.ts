import type {
  OperationalUnitRuntimeProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  assembleCellOperationsPanelProjection,
} from "../../projection/assembly/cell-operations-panel-projection.ts";
import type {
  CellOperationsPanelProjection,
} from "../../projection/contracts/cell-operations-panel-projection-contract.ts";
import {
  assert_valid,
  collect_forbidden_field_errors,
  collect_forbidden_positive_claim_errors,
  ensure_runtime_private_fields_omitted,
  stable_sort_by_key,
  unique_strings,
} from "../../projection/adapters/runtime-readiness-adapter-helpers.ts";
import {
  normalize_engagement_operational_refs,
} from "../engagement/engagement-source-ref-normalizer.ts";

export type V19CellOperationsPanelPageModelInput =
  CellOperationsPanelProjection | OperationalUnitRuntimeProjection;

export interface CreateV19CellOperationsPanelPageModelOptions {
  source_runtime_projection_ref?: string;
}

export interface V19CellOperationsPanelPageModel {
  page_id: string;
  page_kind: "cell_operations_panel_thin_consumption";
  phase_boundary: "v1_9_wave4_product_surface_thin_consumption";
  phase_ref: "cell_operations_panel_thin_consumption";
  projection_scope: "cell_operations_panel_projection";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  readiness_status: false;
  v2_0_ready: false;
  project_id: string;
  cell_identity: {
    cell_id: string;
    cell_label: string;
    status: string;
    objective_summary: string;
  };
  panel_sections: {
    task_summaries: CellOperationsPanelProjection["task_summaries"];
    artifact_summaries: CellOperationsPanelProjection["artifact_summaries"];
    action_summaries: CellOperationsPanelProjection["action_summaries"];
    learning_summaries: CellOperationsPanelProjection["learning_summaries"];
    drift_summaries: CellOperationsPanelProjection["drift_summaries"];
    review_summaries: CellOperationsPanelProjection["review_summaries"];
    history_summaries: CellOperationsPanelProjection["history_summaries"];
    metric_summaries: CellOperationsPanelProjection["metric_summaries"];
    suggested_next_actions:
      CellOperationsPanelProjection["suggested_next_actions"];
  };
  metric_summary_status: CellOperationsPanelProjection["metric_summary_status"];
  source_projection_ref: string;
  source_evidence_refs: string[];
  deferred_items: string[];
  non_claims: string[];
  boundary_notes: string[];
}

function is_cell_operations_panel_projection(
  value: V19CellOperationsPanelPageModelInput
): value is CellOperationsPanelProjection {
  return (
    "projection_scope" in value &&
    value.projection_scope === "cell_operations_panel_projection"
  );
}

function normalize_cell_operations_panel_projection(
  input: V19CellOperationsPanelPageModelInput,
  options: CreateV19CellOperationsPanelPageModelOptions
): CellOperationsPanelProjection {
  if (is_cell_operations_panel_projection(input)) {
    return input;
  }

  return assembleCellOperationsPanelProjection(
    options.source_runtime_projection_ref ??
      `${input.operational_unit_id}-runtime-state-projection`,
    input
  );
}

const CELL_OPERATIONS_PANEL_METADATA =
  normalize_engagement_operational_refs({
    phase_ref: "cell_operations_panel_thin_consumption",
    phase_boundary: "v1_9_wave4_product_surface_thin_consumption",
    readiness_status: false,
    v2_0_ready: false,
  });

export function createV19CellOperationsPanelPageModel(
  input: V19CellOperationsPanelPageModelInput,
  options: CreateV19CellOperationsPanelPageModelOptions = {}
): V19CellOperationsPanelPageModel {
  const projection = normalize_cell_operations_panel_projection(input, options);
  const errors = [
    ...collect_forbidden_field_errors(projection),
    ...collect_forbidden_positive_claim_errors(projection),
  ];

  if (projection.non_executing !== true) {
    errors.push("CellOperationsPanelProjection.non_executing must be true");
  }

  ensure_runtime_private_fields_omitted(
    projection.runtime_private_fields_omitted,
    errors,
    "CellOperationsPanelProjection.runtime_private_fields_omitted"
  );

  assert_valid(errors);

  return {
    page_id: `${projection.panel_id}-page-model`,
    page_kind: "cell_operations_panel_thin_consumption",
    phase_boundary: "v1_9_wave4_product_surface_thin_consumption",
    phase_ref:
      CELL_OPERATIONS_PANEL_METADATA.phase_ref as
        "cell_operations_panel_thin_consumption",
    projection_scope: "cell_operations_panel_projection",
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    readiness_status: CELL_OPERATIONS_PANEL_METADATA.readiness_status as false,
    v2_0_ready: false,
    project_id: projection.project_id,
    cell_identity: {
      cell_id: projection.cell_id,
      cell_label: projection.cell_label,
      status: projection.status,
      objective_summary: projection.objective_summary,
    },
    panel_sections: {
      task_summaries: stable_sort_by_key(
        [...projection.task_summaries],
        "task_id"
      ),
      artifact_summaries: stable_sort_by_key(
        [...projection.artifact_summaries],
        "artifact_id"
      ),
      action_summaries: stable_sort_by_key(
        [...projection.action_summaries],
        "action_id"
      ),
      learning_summaries: stable_sort_by_key(
        [...projection.learning_summaries],
        "learning_summary_id"
      ),
      drift_summaries: stable_sort_by_key(
        [...projection.drift_summaries],
        "drift_summary_id"
      ),
      review_summaries: stable_sort_by_key(
        [...projection.review_summaries],
        "review_id"
      ),
      history_summaries: stable_sort_by_key(
        [...projection.history_summaries],
        "history_id"
      ),
      metric_summaries: stable_sort_by_key(
        [...projection.metric_summaries],
        "metric_id"
      ),
      suggested_next_actions: stable_sort_by_key(
        [...projection.suggested_next_actions],
        "action_id"
      ),
    },
    metric_summary_status: projection.metric_summary_status,
    source_projection_ref: projection.panel_id,
    source_evidence_refs: unique_strings(projection.source_evidence_refs),
    deferred_items: [...projection.deferred_items],
    non_claims: [...projection.non_claims],
    boundary_notes: [
      "This is V1.9 Wave 4.",
      "This is product-surface thin consumption.",
      "It consumes V1.9 Wave 3 projection contracts.",
      "It does not make SoloCrew V2.0 ready by itself.",
      "It does not implement full product UI.",
      "It does not implement external provider/channel execution.",
      "It prepares the final V1.9 closure wave.",
      ...projection.projection_notes,
    ],
  };
}

export type CellOperationsPanelPageModelInput =
  V19CellOperationsPanelPageModelInput;
export type CreateCellOperationsPanelPageModelOptions =
  CreateV19CellOperationsPanelPageModelOptions;
export type CellOperationsPanelPageModel = V19CellOperationsPanelPageModel;

export const createCellOperationsPanelPageModel =
  createV19CellOperationsPanelPageModel;
