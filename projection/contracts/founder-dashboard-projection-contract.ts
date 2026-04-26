import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  RuntimeActionClass,
  RuntimeActionReadinessStatus,
  RuntimeArtifactClass,
  RuntimeLearningApplicationScope,
  RuntimeScopedLearningStatus,
} from "../../runtime-imports/cognitive-runtime.ts";

export type FounderDashboardProjectionScope =
  "founder_dashboard_projection";
export type FounderDashboardProjectionAuthorityBoundary =
  "product_projection_only";
export type FounderDashboardProjectionPhaseBoundary =
  "v1_9_wave3_projection_contract";

export interface FounderDashboardPendingReviewSummary {
  review_id: string;
  cell_id: string;
  cell_label: string;
  title: string;
  status: string;
  review_kind?: string;
  review_summary?: string;
  evidence_gap_summary?: string;
  source_scope_ref: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface FounderDashboardRecentArtifactSummary {
  artifact_id: string;
  cell_id: string;
  cell_label: string;
  title: string;
  artifact_kind: string;
  artifact_class: RuntimeArtifactClass;
  status: string;
  source_scope_ref: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface FounderDashboardLearnedPreferenceSummary {
  preference_id: string;
  cell_id: string;
  cell_label: string;
  summary: string;
  application_scope: RuntimeLearningApplicationScope;
  status: RuntimeScopedLearningStatus;
  source_scope_ref: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface FounderDashboardSuggestedNextActionSummary {
  action_id: string;
  cell_id: string;
  cell_label: string;
  title: string;
  rationale: string;
  action_class: RuntimeActionClass;
  readiness_status: RuntimeActionReadinessStatus;
  source_scope_ref: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface FounderDashboardBlockedItemSummary {
  blocked_item_id: string;
  cell_id: string;
  cell_label: string;
  blocked_item_kind: "task" | "action" | "drift" | "review";
  title: string;
  blocked_reason: string;
  source_scope_ref: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface FounderDashboardCellCard {
  cell_id: string;
  cell_label: string;
  status: string;
  objective_summary: string;
  current_priority_summary: string;
  pending_review_count: number;
  recent_artifact_count: number;
  active_learning_count: number;
  blocked_item_count: number;
  next_action_summary?: string;
  source_scope_ref: string;
  source_evidence_refs: string[];
  runtime_private_fields_omitted: true;
}

export interface FounderDashboardProjection {
  dashboard_id: string;
  projection_scope: FounderDashboardProjectionScope;
  authority_boundary: FounderDashboardProjectionAuthorityBoundary;
  phase_boundary: FounderDashboardProjectionPhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  project_id: string;
  generated_at: string;
  cell_cards: FounderDashboardCellCard[];
  pending_reviews: FounderDashboardPendingReviewSummary[];
  recent_artifacts: FounderDashboardRecentArtifactSummary[];
  learned_preferences: FounderDashboardLearnedPreferenceSummary[];
  suggested_next_actions: FounderDashboardSuggestedNextActionSummary[];
  blocked_items: FounderDashboardBlockedItemSummary[];
  source_runtime_projection_ref: string;
  source_evidence_refs: string[];
  upstream_refs: ProjectionUpstreamRef[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}

export const FOUNDER_DASHBOARD_BOUNDARY_LINES = [
  "This is V1.9 Wave 3.",
  "This is a projection-contract wave.",
  "Founder Dashboard remains projection-only in this wave.",
  "This wave does not make SoloCrew V2.0 ready by itself.",
  "This wave does not implement product UI.",
  "This wave does not implement external provider/channel execution.",
  "Runtime-private fields remain omitted.",
] as const;

export const FOUNDER_DASHBOARD_BOUNDARY_SUMMARY =
  FOUNDER_DASHBOARD_BOUNDARY_LINES.join(" ");
