import type {
  OperationalUnitRuntimeProjection,
  RuntimeStateProjection,
} from "../../runtime-imports/cognitive-runtime.ts";
import {
  assembleCellOperationsPanelProjection,
} from "../../projection/assembly/cell-operations-panel-projection.ts";
import type {
  CellOperationsPanelProjection,
  CellOperationsPanelSuggestedNextActionView,
} from "../../projection/contracts/cell-operations-panel-projection-contract.ts";
import {
  STARTER_CELL_DEFINITIONS,
  STARTER_CELL_IDS,
  V2_STARTER_CELL_KIND,
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import type {
  ProductArtifactRecord,
} from "../artifacts/artifact-contract.ts";
import type {
  ProductActionOutcomeRecord,
  ProductActionRequestRecord,
  ProductReviewProposalRecord,
} from "../actions/action-contract.ts";
import type {
  ProductDriftImpactRecord,
  ProductLearningCandidateRecord,
} from "../learning/learning-drift-contract.ts";
import {
  summarizeLearningForCell,
} from "../learning/learning-workflow.ts";
import {
  assert_valid,
  collect_forbidden_field_errors,
  collect_forbidden_positive_claim_errors,
  ensure_runtime_private_fields_omitted,
  stable_sort_by_key,
  unique_strings,
} from "../../projection/adapters/runtime-readiness-adapter-helpers.ts";

export const CELL_OPERATIONS_PANEL_PRODUCT_SOURCE_FIXTURE_REF =
  "projection/fixtures/starter-cell-fixtures.ts";

export type CellOperationsPanelProductTargetCellId =
  (typeof STARTER_CELL_IDS)[number];

export type CellOperationsPanelProductPageModelInput =
  | CellOperationsPanelProjection
  | OperationalUnitRuntimeProjection
  | RuntimeStateProjection;

export interface CreateCellOperationsPanelProductPageModelOptions {
  target_cell_id?: CellOperationsPanelProductTargetCellId;
  source_runtime_projection_ref?: string;
  persisted_artifacts?: ProductArtifactRecord[];
  persisted_artifact_history?: ProductArtifactRecord[];
  persisted_action_requests?: ProductActionRequestRecord[];
  persisted_action_outcomes?: ProductActionOutcomeRecord[];
  persisted_review_proposals?: ProductReviewProposalRecord[];
  persisted_learning_candidates?: ProductLearningCandidateRecord[];
  persisted_drift_impacts?: ProductDriftImpactRecord[];
}

export type ProductActionReadinessState =
  | "ready_for_local_bounded_update"
  | "needs_review"
  | "draft_only_needs_review"
  | "deferred_strong_confirmation"
  | "blocked";

export interface CellOperationsPanelProductTaskItem {
  task_id: string;
  title: string;
  status: string;
  task_kind?: string;
  related_artifact_refs: string[];
  source_evidence_refs: string[];
  non_executing: true;
}

export interface CellOperationsPanelProductArtifactItem {
  artifact_id: string;
  title: string;
  artifact_kind: string;
  artifact_class: string;
  status: string;
  related_task_refs: string[];
  source_refs: string[];
  source_evidence_refs: string[];
  review_posture: string;
  non_executing: true;
}

export interface CellOperationsPanelProductActionItem {
  action_id: string;
  title: string;
  action_kind_label: string;
  display_readiness: ProductActionReadinessState;
  status?: string;
  readiness_summary: string;
  requires_confirmation: boolean;
  blocked: boolean;
  reason: string;
  related_task_refs: string[];
  related_artifact_refs: string[];
  risk_notes: string[];
  source_evidence_refs: string[];
  non_executing: true;
}

export interface CellOperationsPanelProductDriftItem {
  drift_summary_id: string;
  drift_kind: string;
  impact_summary: string;
  recommendation: string;
  status?: string;
  confidence_posture?: string;
  affected_scope_refs: string[];
  affected_artifact_refs: string[];
  source_evidence_refs: string[];
  non_executing: true;
}

export interface CellOperationsPanelProductReviewItem {
  review_id: string;
  title: string;
  status: string;
  review_kind?: string;
  review_summary?: string;
  evidence_gap_summary?: string;
  review_posture: string;
  source_evidence_refs: string[];
  non_executing: true;
}

export interface CellOperationsPanelProductHistoryItem {
  history_id: string;
  history_kind: string;
  title: string;
  summary: string;
  source_ref_id: string;
  source_evidence_refs: string[];
  non_executing: true;
}

function build_persisted_artifact_items(args: {
  records: ProductArtifactRecord[];
  review_posture: string;
}): CellOperationsPanelProductArtifactItem[] {
  return stable_sort_by_key(
    args.records.map((record) => ({
      artifact_id: record.artifact_id,
      title: record.title,
      artifact_kind: record.artifact_kind,
      artifact_class: record.artifact_class,
      status: record.status,
      related_task_refs: [...record.related_task_refs],
      source_refs: [record.source_fixture_ref],
      source_evidence_refs: [...record.source_evidence_refs],
      review_posture: args.review_posture,
      non_executing: true as const,
    })),
    "artifact_id"
  );
}

function build_persisted_history_items(
  records: ProductArtifactRecord[]
): CellOperationsPanelProductHistoryItem[] {
  return stable_sort_by_key(
    records.map((record) => ({
      history_id: `${record.artifact_id}:${record.artifact_version_id}`,
      history_kind: "artifact",
      title: record.title,
      summary: `${record.status} revision ${record.revision_index} remains persisted locally.`,
      source_ref_id: record.artifact_id,
      source_evidence_refs: [...record.source_evidence_refs],
      non_executing: true as const,
    })),
    "history_id"
  );
}

function build_persisted_drift_items(
  records: ProductDriftImpactRecord[]
): CellOperationsPanelProductDriftItem[] {
  return stable_sort_by_key(
    records.map((record) => ({
      drift_summary_id: record.drift_impact_id,
      drift_kind: record.source_drift_signal_id.split(":")[1] ?? "drift_signal",
      impact_summary: record.impact_summary,
      recommendation: record.recommendation,
      status: record.status,
      affected_scope_refs: [record.cell_id],
      affected_artifact_refs: [...record.affected_artifact_refs],
      source_evidence_refs: [...record.source_evidence_refs],
      non_executing: true as const,
    })),
    "drift_summary_id"
  );
}

function build_persisted_action_items(args: {
  requests: ProductActionRequestRecord[];
  outcomes: ProductActionOutcomeRecord[];
  review_proposals: ProductReviewProposalRecord[];
}): CellOperationsPanelProductActionItem[] {
  const outcome_by_request_id = new Map(
    args.outcomes.map((outcome) => [outcome.action_request_id, outcome])
  );
  const review_by_request_id = new Map(
    args.review_proposals.map((proposal) => [proposal.action_request_id, proposal])
  );

  return stable_sort_by_key(
    args.requests.map((request) => {
      const outcome = outcome_by_request_id.get(request.action_request_id);
      const review_proposal = review_by_request_id.get(request.action_request_id);
      const status_summary =
        request.status === "completed_local"
          ? "A local-only outcome has been recorded."
          : request.status === "review_required"
            ? "A local review proposal remains required before any later application."
            : request.status === "draft_created"
              ? "A draft-only local artifact exists and no dispatch occurred."
              : request.status === "deferred_strong_confirmation"
                ? "This action remains deferred and requires stronger confirmation in a later wave."
                : request.status === "blocked"
                  ? "This action remains blocked by the irreversible boundary."
                  : request.status === "rejected"
                    ? "This action was rejected inside the bounded local workflow."
                    : "This action request remains visible and local-only.";
      const related_artifact_refs = unique_strings([
        ...request.related_artifact_refs,
        ...(outcome?.produced_artifact_refs ?? []),
      ]);
      const source_evidence_refs = unique_strings([
        ...request.source_evidence_refs,
        ...(outcome?.produced_evidence_refs ?? []),
        ...(review_proposal?.source_evidence_refs ?? []),
      ]);
      const risk_notes = unique_strings([
        outcome?.outcome_summary ?? "",
        review_proposal?.proposal_summary ?? "",
      ]);

      return {
        action_id: request.action_request_id,
        title: request.title,
        action_kind_label: create_action_kind_label(request.action_class),
        display_readiness: create_action_display_readiness(request.action_class),
        status: request.status,
        readiness_summary: [
          status_summary,
          outcome?.outcome_summary,
          review_proposal?.proposal_summary,
        ]
          .filter((value): value is string => value !== undefined)
          .join(" "),
        requires_confirmation:
          request.action_class !== "auto_local" &&
          request.action_class !== "forbidden_irreversible",
        blocked: request.status === "blocked",
        reason: status_summary,
        related_task_refs: [...request.related_task_refs],
        related_artifact_refs,
        risk_notes,
        source_evidence_refs,
        non_executing: true as const,
      };
    }),
    "action_id"
  );
}

function build_persisted_review_items(
  review_proposals: ProductReviewProposalRecord[]
): CellOperationsPanelProductReviewItem[] {
  return stable_sort_by_key(
    review_proposals.map((proposal) => ({
      review_id: proposal.review_proposal_id,
      title: proposal.proposal_title,
      status: proposal.status,
      review_kind: "local_action_review_proposal",
      review_summary: proposal.proposal_summary,
      review_posture:
        "Local review remains required before any later application of the proposed change.",
      source_evidence_refs: [...proposal.source_evidence_refs],
      non_executing: true as const,
    })),
    "review_id"
  );
}

function build_persisted_action_history_items(args: {
  requests: ProductActionRequestRecord[];
  outcomes: ProductActionOutcomeRecord[];
}): CellOperationsPanelProductHistoryItem[] {
  const request_by_id = new Map(
    args.requests.map((request) => [request.action_request_id, request])
  );

  return stable_sort_by_key(
    args.outcomes.map((outcome) => {
      const request = request_by_id.get(outcome.action_request_id);
      return {
        history_id: outcome.action_outcome_id,
        history_kind: "action_outcome",
        title: request?.title ?? outcome.outcome_kind,
        summary: outcome.outcome_summary,
        source_ref_id: outcome.action_request_id,
        source_evidence_refs: [...outcome.produced_evidence_refs],
        non_executing: true as const,
      };
    }),
    "history_id"
  );
}

export interface CellOperationsPanelProductMetricItem {
  metric_id: string;
  metric_label: string;
  metric_value: number;
  metric_summary: string;
  non_executing: true;
}

export interface CellOperationsPanelProductPageModel {
  page_id: string;
  page_kind: "cell_operations_panel_productized";
  phase_boundary: "v2_0_wave4_cell_operations_panel_productization";
  product_line: "v2_0";
  product_surface: "cell_operations_panel";
  source_fixture_ref: "projection/fixtures/starter-cell-fixtures.ts";
  source_projection_ref: string;
  source_evidence_refs: string[];
  non_executing: true;
  runtime_private_fields_omitted: true;
  provider_execution_available: false;
  channel_entry_available: false;
  autonomous_operation_available: false;
  v2_0_delivered: false;
  v2_0_ready: false;
  ga_available: false;
  panel_title: string;
  panel_summary: string;
  cell_identity: {
    cell_id: string;
    cell_label: string;
    cell_kind: string;
    status: string;
    purpose_summary: string;
  };
  objective_section: {
    title: string;
    summary: string;
    source_evidence_refs: string[];
    non_executing: true;
  };
  task_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductTaskItem[];
    empty_notice?: string;
    non_executing: true;
  };
  artifact_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductArtifactItem[];
    review_posture: string;
    empty_notice?: string;
    non_executing: true;
  };
  action_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductActionItem[];
    boundary_notice: string;
    non_executing: true;
  };
  learning_section: {
    title: string;
    summary: string;
    accepted_scope_only_learning: string[];
    global_candidate_learning: string[];
    inactive_learning: string[];
    preference_summaries: string[];
    boundary_notice: string;
    source_evidence_refs: string[];
    non_executing: true;
  };
  drift_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductDriftItem[];
    boundary_notice: string;
    empty_notice?: string;
    non_executing: true;
  };
  review_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductReviewItem[];
    empty_notice?: string;
    non_executing: true;
  };
  history_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductHistoryItem[];
    empty_notice?: string;
    non_executing: true;
  };
  metric_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductMetricItem[];
    non_executing: true;
  };
  suggested_next_action_section: {
    title: string;
    summary: string;
    items: CellOperationsPanelProductActionItem[];
    boundary_notice: string;
    empty_notice?: string;
    non_executing: true;
  };
  boundary_notices: string[];
  next_wave_hint: string;
}

function is_cell_operations_panel_projection(
  value: CellOperationsPanelProductPageModelInput
): value is CellOperationsPanelProjection {
  return (
    "projection_scope" in value &&
    value.projection_scope === "cell_operations_panel_projection"
  );
}

function is_runtime_state_projection(
  value: CellOperationsPanelProductPageModelInput
): value is RuntimeStateProjection {
  return "state_projection_id" in value;
}

function find_starter_cell_definition(cell_id: string) {
  return STARTER_CELL_DEFINITIONS.find((definition) => definition.cell_id === cell_id);
}

function create_action_kind_label(action_class: string): string {
  switch (action_class) {
    case "auto_local":
      return "Auto local";
    case "reviewable_local":
      return "Reviewable local";
    case "external_draft":
      return "External draft";
    case "limited_external_dispatch":
      return "Limited external handoff";
    case "forbidden_irreversible":
      return "Irreversible action boundary";
    default:
      return action_class.replaceAll("_", " ");
  }
}

function create_action_display_readiness(
  action_class: string
): ProductActionReadinessState {
  switch (action_class) {
    case "auto_local":
      return "ready_for_local_bounded_update";
    case "reviewable_local":
      return "needs_review";
    case "external_draft":
      return "draft_only_needs_review";
    case "limited_external_dispatch":
      return "deferred_strong_confirmation";
    case "forbidden_irreversible":
      return "blocked";
    default:
      return "needs_review";
  }
}

function create_action_readiness_summary(
  action_class: string,
  reason: string
): string {
  switch (action_class) {
    case "auto_local":
      return `Ready for local bounded update. ${reason}`;
    case "reviewable_local":
      return `Needs review before local use. ${reason}`;
    case "external_draft":
      return `Draft-only and needs review before any later use. ${reason}`;
    case "limited_external_dispatch":
      return `Deferred and requires stronger confirmation in a later wave. ${reason}`;
    case "forbidden_irreversible":
      return `Blocked by irreversible-action boundary. ${reason}`;
    default:
      return reason;
  }
}

function create_action_product_item(args: {
  action: CellOperationsPanelProjection["action_summaries"][number] | CellOperationsPanelSuggestedNextActionView;
  blocked?: boolean;
  requires_confirmation?: boolean;
  reason?: string;
  risk_notes?: string[];
}): CellOperationsPanelProductActionItem {
  const action_class = args.action.action_class;
  return {
    action_id: args.action.action_id,
    title: args.action.title,
    action_kind_label: create_action_kind_label(action_class),
    display_readiness: create_action_display_readiness(action_class),
    readiness_summary: create_action_readiness_summary(
      action_class,
      args.reason ?? args.action.rationale ?? "Bounded action posture remains visible."
    ),
    requires_confirmation: args.requires_confirmation ?? false,
    blocked: args.blocked ?? false,
    reason: args.reason ?? args.action.rationale ?? "Bounded action posture remains visible.",
    related_task_refs: [...args.action.related_task_refs],
    related_artifact_refs: [...args.action.related_artifact_refs],
    risk_notes: [...(args.risk_notes ?? [])],
    source_evidence_refs: [...args.action.source_evidence_refs],
    non_executing: true,
  };
}

function normalize_panel_projection(
  input?: CellOperationsPanelProductPageModelInput,
  options: CreateCellOperationsPanelProductPageModelOptions = {}
): CellOperationsPanelProjection {
  if (!input) {
    return normalize_panel_projection(
      createStarterCellsRuntimeStateProjection(),
      options
    );
  }

  if (is_cell_operations_panel_projection(input)) {
    return input;
  }

  if (is_runtime_state_projection(input)) {
    const target_cell_id = options.target_cell_id ?? STARTER_CELL_IDS[0];
    const operational_unit_projection =
      input.operational_unit_projections.find(
        (unit) => unit.scope_summary.scope_id === target_cell_id
      );
    const errors: string[] = [];

    if (!operational_unit_projection) {
      errors.push(`starter cell ${target_cell_id} must exist in RuntimeStateProjection`);
    }

    assert_valid(errors);

    return assembleCellOperationsPanelProjection(
      input.state_projection_id,
      operational_unit_projection
    );
  }

  return assembleCellOperationsPanelProjection(
    options.source_runtime_projection_ref ??
      `${input.operational_unit_id}-runtime-state-projection`,
    input
  );
}

export function createCellOperationsPanelProductPageModel(
  input?: CellOperationsPanelProductPageModelInput,
  options: CreateCellOperationsPanelProductPageModelOptions = {}
): CellOperationsPanelProductPageModel {
  const projection = normalize_panel_projection(input, options);
  const definition = find_starter_cell_definition(projection.cell_id);
  const errors = [
    ...collect_forbidden_field_errors(projection),
    ...collect_forbidden_positive_claim_errors(projection),
  ];

  ensure_runtime_private_fields_omitted(
    projection.runtime_private_fields_omitted,
    errors,
    "CellOperationsPanelProjection.runtime_private_fields_omitted"
  );

  if (projection.non_executing !== true) {
    errors.push("CellOperationsPanelProjection.non_executing must be true");
  }

  assert_valid(errors);

  const purpose_summary =
    definition?.purpose ??
    "Starter-cell purpose is not available for this productized panel.";
  const review_posture =
    definition?.default_review_posture ??
    "Review remains required before using fixture-backed artifacts outside the Cell.";
  const persisted_artifact_records = (options.persisted_artifacts ?? []).filter(
    (record) => record.cell_id === projection.cell_id
  );
  const persisted_artifact_history = (
    options.persisted_artifact_history ?? []
  ).filter((record) => record.cell_id === projection.cell_id);
  const persisted_action_requests = (
    options.persisted_action_requests ?? []
  ).filter((record) => record.cell_id === projection.cell_id);
  const persisted_action_outcomes = (
    options.persisted_action_outcomes ?? []
  ).filter((record) => record.cell_id === projection.cell_id);
  const persisted_review_proposals = (
    options.persisted_review_proposals ?? []
  ).filter((record) => record.cell_id === projection.cell_id);
  const persisted_learning_candidates = (
    options.persisted_learning_candidates ?? []
  ).filter((record) => record.cell_id === projection.cell_id);
  const persisted_learning_summary = summarizeLearningForCell(
    persisted_learning_candidates,
    projection.cell_id as typeof persisted_learning_candidates[number]["cell_id"]
  );
  const persisted_drift_impacts = (
    options.persisted_drift_impacts ?? []
  ).filter((record) => record.cell_id === projection.cell_id);

  const task_items = stable_sort_by_key(
    projection.task_summaries.map((task) => ({
      task_id: task.task_id,
      title: task.title,
      status: task.status,
      task_kind: task.task_kind,
      related_artifact_refs: [...task.related_artifact_refs],
      source_evidence_refs: [...task.source_evidence_refs],
      non_executing: true as const,
    })),
    "task_id"
  );
  const fixture_artifact_items = stable_sort_by_key(
    projection.artifact_summaries.map((artifact) => ({
      artifact_id: artifact.artifact_id,
      title: artifact.title,
      artifact_kind: artifact.artifact_kind,
      artifact_class: artifact.artifact_class,
      status: artifact.status,
      related_task_refs: projection.task_summaries
        .filter((task) => task.related_artifact_refs.includes(artifact.artifact_id))
        .map((task) => task.task_id),
      source_refs: [...artifact.source_refs],
      source_evidence_refs: [...artifact.source_evidence_refs],
      review_posture,
      non_executing: true as const,
    })),
    "artifact_id"
  );
  const artifact_items =
    persisted_artifact_records.length > 0
      ? build_persisted_artifact_items({
          records: persisted_artifact_records,
          review_posture,
        })
      : fixture_artifact_items;
  const action_items = stable_sort_by_key(
    (
      persisted_action_requests.length > 0
        ? build_persisted_action_items({
            requests: persisted_action_requests,
            outcomes: persisted_action_outcomes,
            review_proposals: persisted_review_proposals,
          })
        : projection.action_summaries.map((action) =>
            create_action_product_item({
              action,
              blocked: action.blocked,
              requires_confirmation: action.requires_confirmation,
              reason: action.reason,
              risk_notes: action.risk_notes,
            })
          )
    ),
    "action_id"
  );
  const fixture_learning_source_evidence_refs = unique_strings(
    projection.learning_summaries.flatMap((summary) => summary.source_evidence_refs)
  );
  const fixture_accepted_scope_only_learning = projection.learning_summaries.flatMap(
    (summary) => summary.preference_summaries
      .filter(
        (preference) =>
          preference.application_scope === "scope_only" &&
          preference.status === "accepted"
      )
      .map((preference) => preference.summary)
      .concat(summary.active_candidate_summaries)
  );
  const fixture_global_candidate_learning = projection.learning_summaries.flatMap(
    (summary) => summary.global_candidate_summaries
  );
  const fixture_inactive_learning = projection.learning_summaries.flatMap((summary) =>
    summary.inactive_candidate_summaries
  );
  const fixture_preference_summaries = projection.learning_summaries.flatMap((summary) =>
    summary.preference_summaries.map(
      (preference) =>
        `${preference.summary} (${preference.application_scope} / ${preference.status})`
    )
  );
  const learning_source_evidence_refs =
    persisted_learning_candidates.length > 0
      ? unique_strings(
          persisted_learning_candidates.flatMap(
            (candidate) => candidate.source_evidence_refs
          )
        )
      : fixture_learning_source_evidence_refs;
  const accepted_scope_only_learning =
    persisted_learning_candidates.length > 0
      ? persisted_learning_summary.accepted_scope_only_learning
      : fixture_accepted_scope_only_learning;
  const global_candidate_learning =
    persisted_learning_candidates.length > 0
      ? persisted_learning_summary.global_candidate_learning
      : fixture_global_candidate_learning;
  const inactive_learning =
    persisted_learning_candidates.length > 0
      ? persisted_learning_summary.inactive_learning
      : fixture_inactive_learning;
  const preference_summaries =
    persisted_learning_candidates.length > 0
      ? persisted_learning_candidates.map(
          (candidate) =>
            `${candidate.summary} (${candidate.application_scope} / ${candidate.status})`
        )
      : fixture_preference_summaries;
  const fixture_drift_items = stable_sort_by_key(
    projection.drift_summaries.map((drift) => ({
      drift_summary_id: drift.drift_summary_id,
      drift_kind: drift.drift_kind,
      impact_summary: drift.impact_summary,
      recommendation: drift.recommendation,
      confidence_posture: drift.confidence_posture,
      affected_scope_refs: [...drift.affected_scope_refs],
      affected_artifact_refs: [...drift.affected_artifact_refs],
      source_evidence_refs: [...drift.source_evidence_refs],
      non_executing: true as const,
    })),
    "drift_summary_id"
  );
  const drift_items =
    persisted_drift_impacts.length > 0
      ? build_persisted_drift_items(persisted_drift_impacts)
      : fixture_drift_items;
  const review_items = stable_sort_by_key(
    [
      ...projection.review_summaries.map((review) => ({
        review_id: review.review_id,
        title: review.title,
        status: review.status,
        review_kind: review.review_kind,
        review_summary: review.review_summary,
        evidence_gap_summary: review.evidence_gap_summary,
        review_posture,
        source_evidence_refs: [...review.source_evidence_refs],
        non_executing: true as const,
      })),
      ...build_persisted_review_items(persisted_review_proposals),
    ],
    "review_id"
  );
  const fixture_history_items = stable_sort_by_key(
    projection.history_summaries.map((history) => ({
      history_id: history.history_id,
      history_kind: history.history_kind,
      title: history.title,
      summary: history.summary,
      source_ref_id: history.source_ref_id,
      source_evidence_refs: [...history.source_evidence_refs],
      non_executing: true as const,
    })),
    "history_id"
  );
  const persisted_history_items =
    persisted_artifact_history.length > 0
      ? build_persisted_history_items(persisted_artifact_history)
      : [];
  const persisted_action_history_items =
    persisted_action_outcomes.length > 0
      ? build_persisted_action_history_items({
          requests: persisted_action_requests,
          outcomes: persisted_action_outcomes,
        })
      : [];
  const history_items = stable_sort_by_key(
    [
      ...fixture_history_items,
      ...persisted_history_items,
      ...persisted_action_history_items,
    ],
    "history_id"
  );
  const metric_items = stable_sort_by_key(
    projection.metric_summaries.map((metric) => ({
      metric_id: metric.metric_id,
      metric_label: metric.metric_label,
      metric_value: metric.metric_value,
      metric_summary: metric.metric_summary,
      non_executing: true as const,
    })),
    "metric_id"
  );
  const suggested_next_action_items = stable_sort_by_key(
    projection.suggested_next_actions.map((action) =>
      create_action_product_item({
        action,
        blocked: action.action_class === "forbidden_irreversible" ||
          action.readiness_status === "blocked",
        requires_confirmation:
          action.action_class !== "auto_local" &&
          action.action_class !== "forbidden_irreversible",
      })
    ),
    "action_id"
  );

  const source_evidence_refs = unique_strings([
    ...projection.source_evidence_refs,
    ...task_items.flatMap((item) => item.source_evidence_refs),
    ...artifact_items.flatMap((item) => item.source_evidence_refs),
    ...action_items.flatMap((item) => item.source_evidence_refs),
    ...learning_source_evidence_refs,
    ...drift_items.flatMap((item) => item.source_evidence_refs),
    ...review_items.flatMap((item) => item.source_evidence_refs),
    ...history_items.flatMap((item) => item.source_evidence_refs),
    ...suggested_next_action_items.flatMap((item) => item.source_evidence_refs),
  ]);

  return {
    page_id: `${projection.panel_id}-product-page-model`,
    page_kind: "cell_operations_panel_productized",
    phase_boundary: "v2_0_wave4_cell_operations_panel_productization",
    product_line: "v2_0",
    product_surface: "cell_operations_panel",
    source_fixture_ref: CELL_OPERATIONS_PANEL_PRODUCT_SOURCE_FIXTURE_REF,
    source_projection_ref: projection.panel_id,
    source_evidence_refs,
    non_executing: true,
    runtime_private_fields_omitted: true,
    provider_execution_available: false,
    channel_entry_available: false,
    autonomous_operation_available: false,
    v2_0_delivered: false,
    v2_0_ready: false,
    ga_available: false,
    panel_title: `${projection.cell_label} Cell Operations Panel`,
    panel_summary:
      `${purpose_summary} This productized panel surfaces bounded objective, task, artifact, action, learning, drift, review, history, metric, and next-action state from canonical starter-cell fixtures.`,
    cell_identity: {
      cell_id: projection.cell_id,
      cell_label: projection.cell_label,
      cell_kind: definition?.cell_kind ?? V2_STARTER_CELL_KIND,
      status: projection.status,
      purpose_summary,
    },
    objective_section: {
      title: "Objective",
      summary: projection.objective_summary,
      source_evidence_refs: [...source_evidence_refs],
      non_executing: true,
    },
    task_section: {
      title: "Tasks",
      summary: `${task_items.length} task summaries remain visible for ${projection.cell_label}.`,
      items: task_items,
      empty_notice:
        task_items.length === 0
          ? "No task summaries are visible in this fixture."
          : undefined,
      non_executing: true,
    },
    artifact_section: {
      title: "Artifacts",
      summary: `${artifact_items.length} artifact summaries remain visible and review-bounded for ${projection.cell_label}.`,
      items: artifact_items,
      review_posture,
      empty_notice:
        artifact_items.length === 0
          ? "No artifact summaries are visible in this fixture."
          : undefined,
      non_executing: true,
    },
    action_section: {
      title: "Actions",
      summary:
        persisted_action_requests.length > 0
          ? `${action_items.length} persisted action requests remain visible with local-only bounded outcomes.`
          : `${action_items.length} action summaries remain visible with bounded readiness and no execution in this wave.`,
      items: action_items,
      boundary_notice:
        "Action readiness is display-only here. Auto-local work remains local-only, reviewable-local work remains review-gated, external drafts remain draft-only, deferred handoff remains deferred, and irreversible actions remain blocked.",
      non_executing: true,
    },
    learning_section: {
      title: "Learning",
      summary: `${accepted_scope_only_learning.length} accepted same-Cell learning signals, ${global_candidate_learning.length} global candidate signals, and ${inactive_learning.length} inactive learning signals remain visible.`,
      accepted_scope_only_learning,
      global_candidate_learning,
      inactive_learning,
      preference_summaries,
      boundary_notice:
        "Accepted scope-only learning remains within this Cell. Global candidate learning remains candidate-only. No cross-Cell pollution or autonomous learning mutation is claimed.",
      source_evidence_refs: learning_source_evidence_refs,
      non_executing: true,
    },
    drift_section: {
      title: "Drift",
      summary: `${drift_items.length} drift summaries remain visible with bounded continuation recommendations.`,
      items: drift_items,
      boundary_notice:
        "Drift recommendations are visible only in this wave. No interactive drift resolution is implemented here.",
      empty_notice:
        drift_items.length === 0
          ? "No drift summaries are visible in this fixture."
          : undefined,
      non_executing: true,
    },
    review_section: {
      title: "Reviews",
      summary: `${review_items.length} review summaries remain visible for ${projection.cell_label}.`,
      items: review_items,
      empty_notice:
        review_items.length === 0
          ? "No review summaries are visible in this fixture."
          : undefined,
      non_executing: true,
    },
    history_section: {
      title: "History",
      summary: `${history_items.length} fixture-backed history items remain visible across actions, artifacts, drift, and reviews.`,
      items: history_items,
      empty_notice:
        history_items.length === 0
          ? "No history summaries are visible in this fixture."
          : undefined,
      non_executing: true,
    },
    metric_section: {
      title: "Metrics",
      summary: `${metric_items.length} bounded metrics remain visible with ${projection.metric_summary_status}.`,
      items: metric_items,
      non_executing: true,
    },
    suggested_next_action_section: {
      title: "Suggested Next Actions",
      summary: `${suggested_next_action_items.length} suggested next actions remain visible without widening execution scope.`,
      items: suggested_next_action_items,
      boundary_notice:
        "Suggested next actions remain recommendation-only in this wave. No external handoff or execution occurs here.",
      empty_notice:
        suggested_next_action_items.length === 0
          ? "No suggested next actions are visible in this fixture."
          : undefined,
      non_executing: true,
    },
    boundary_notices: [
      "The Cell Operations Panel product surface is backed by canonical starter-cell fixtures and may consume local artifact, learning, drift, and action records.",
      "This panel is non-executing and projection-safe.",
      "It does not deliver V2.0.",
      "It does not implement provider/channel execution or external dispatch.",
      "It does not implement autonomous operation.",
    ],
    next_wave_hint: "Next wave: RC / Stable Release Readiness.",
  };
}
