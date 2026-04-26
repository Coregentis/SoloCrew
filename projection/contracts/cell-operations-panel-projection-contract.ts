import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
  RuntimeArtifactClass,
  RuntimeContinuationRecommendation,
  RuntimeLearningApplicationScope,
  RuntimeScopedLearningStatus,
} from "../../runtime-imports/cognitive-runtime.ts";

export type CellOperationsPanelProjectionScope =
  "cell_operations_panel_projection";
export type CellOperationsPanelProjectionAuthorityBoundary =
  "product_projection_only";
export type CellOperationsPanelProjectionPhaseBoundary =
  "v1_9_wave3_projection_contract";

export interface CellTaskSummaryView {
  task_id: string;
  title: string;
  status: string;
  task_kind?: string;
  related_artifact_refs: string[];
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellArtifactSummaryView {
  artifact_id: string;
  title: string;
  artifact_kind: string;
  artifact_class: RuntimeArtifactClass;
  status: string;
  source_refs: string[];
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellActionSummaryView {
  action_id: string;
  title: string;
  action_class: RuntimeActionClass;
  readiness_status: RuntimeActionReadinessStatus;
  requires_confirmation: boolean;
  blocked: boolean;
  reason: string;
  related_task_refs: string[];
  related_artifact_refs: string[];
  risk_notes: string[];
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellLearningSummaryView {
  learning_summary_id: string;
  scope_kind: string;
  active_candidate_count: number;
  active_candidate_summaries: string[];
  global_candidate_summaries: string[];
  inactive_candidate_summaries: string[];
  preference_summaries: Array<{
    preference_id: string;
    summary: string;
    application_scope: RuntimeLearningApplicationScope;
    status: RuntimeScopedLearningStatus;
  }>;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellDriftSummaryView {
  drift_summary_id: string;
  drift_kind: string;
  impact_summary: string;
  recommendation: RuntimeContinuationRecommendation;
  confidence_posture?: "bounded" | "insufficient" | "stale";
  affected_scope_refs: string[];
  affected_artifact_refs: string[];
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellReviewSummaryView {
  review_id: string;
  title: string;
  status: string;
  review_kind?: string;
  review_summary?: string;
  evidence_gap_summary?: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellHistorySummaryView {
  history_id: string;
  history_kind: "review" | "artifact" | "drift" | "action";
  title: string;
  summary: string;
  source_ref_id: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellMetricSummaryView {
  metric_id: string;
  metric_label: string;
  metric_value: number;
  metric_summary: string;
  runtime_private_fields_omitted: true;
}

export interface CellOperationsPanelSuggestedNextActionView {
  action_id: string;
  title: string;
  rationale: string;
  action_class: RuntimeActionClass;
  readiness_status: RuntimeActionReadinessStatus;
  source_evidence_refs: string[];
  related_task_refs: string[];
  related_artifact_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface CellOperationsPanelProjection {
  panel_id: string;
  projection_scope: CellOperationsPanelProjectionScope;
  authority_boundary: CellOperationsPanelProjectionAuthorityBoundary;
  phase_boundary: CellOperationsPanelProjectionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  project_id: string;
  cell_id: string;
  cell_label: string;
  status: string;
  objective_summary: string;
  task_summaries: CellTaskSummaryView[];
  artifact_summaries: CellArtifactSummaryView[];
  action_summaries: CellActionSummaryView[];
  learning_summaries: CellLearningSummaryView[];
  drift_summaries: CellDriftSummaryView[];
  review_summaries: CellReviewSummaryView[];
  history_summaries: CellHistorySummaryView[];
  metric_summaries: CellMetricSummaryView[];
  metric_summary_status:
    | "derived_bounded_counts"
    | "deferred_upstream_absence";
  suggested_next_actions: CellOperationsPanelSuggestedNextActionView[];
  source_operational_unit_ref: string;
  source_runtime_projection_ref: string;
  source_evidence_refs: string[];
  upstream_refs: ProjectionUpstreamRef[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}

export const CELL_OPERATIONS_PANEL_BOUNDARY_LINES = [
  "This is V1.9 Wave 3.",
  "This is a projection-contract wave.",
  "Cell Operations Panel remains projection-only in this wave.",
  "This wave does not make SoloCrew V2.0 ready by itself.",
  "This wave does not implement product UI.",
  "This wave does not implement external provider/channel execution.",
  "This wave does not implement autonomous operation.",
  "Runtime-private fields remain omitted.",
] as const;

export const CELL_OPERATIONS_PANEL_BOUNDARY_SUMMARY =
  CELL_OPERATIONS_PANEL_BOUNDARY_LINES.join(" ");
