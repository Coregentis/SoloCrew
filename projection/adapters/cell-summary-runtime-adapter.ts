import type {
  ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";
import type {
  CellSummaryProjection,
  CellSummaryProjectionReadiness,
} from "../contracts/cell-summary-projection-contract.ts";
import {
  createCellSummaryCard,
  type CellDeliveryPosture,
} from "../objects/management-interface.ts";
import type {
  WorkforceApprovalRequestProjectionInput,
  WorkforceCellProjectionInput,
  WorkforceDeliveryReturnProjectionInput,
  WorkforceEnvelopeDeliveryPosture,
  WorkforceManagementDirectiveProjectionInput,
  WorkforceProjectionSafeEnvelope,
} from "./upstream-record-types.ts";

const RUNTIME_PRIVATE_CELL_SUMMARY_NON_CLAIMS = [
  "no_secretary_behavior_truth",
  "no_portfolio_dispatch_truth",
  "no_provider_execution_truth",
  "no_channel_entry_truth",
  "no_broad_kpi_projection",
  "no_runtime_complete_orchestration",
  "no_shared_object_identity_with_runtime_private_record",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function map_delivery_posture(
  posture: WorkforceEnvelopeDeliveryPosture
): CellDeliveryPosture {
  switch (posture) {
    case "steady":
      return "on_track";
    case "attention":
      return "attention";
    case "blocked":
      return "blocked";
    case "unknown":
      return "attention";
  }
}

function derive_readiness_signal(
  input: WorkforceCellProjectionInput
): CellSummaryProjectionReadiness {
  if (
    input.workforce_envelope.delivery_posture === "blocked" ||
    (input.blocked_work_item_count ?? 0) > 0 ||
    input.approval_request?.request_status === "pending"
  ) {
    return "attention_required";
  }

  return "steady";
}

function create_upstream_refs(input: RuntimePrivateCellSummaryAdapterInput): ProjectionUpstreamRef[] {
  return [
    {
      source_repo: "Cognitive_OS",
      upstream_object_type: input.workforce_envelope.envelope_kind,
      upstream_object_id: input.workforce_envelope.scope_ref,
      notes: [
        "projection_safe_envelope",
        "runtime_private_fields_omitted",
        "cell_scope_source",
      ],
    },
    ...(input.management_directive
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: "workforce-management-directive-projection",
            upstream_object_id: input.management_directive.directive_ref,
            notes: ["projection_safe_product_dto", "non_executable_status_hint_only"],
          },
        ]
      : []),
    ...(input.delivery_return
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: "workforce-delivery-return-projection",
            upstream_object_id: input.delivery_return.delivery_return_ref,
            notes: ["projection_safe_product_dto", "non_executable_status_hint_only"],
          },
        ]
      : []),
    ...(input.approval_request
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: "workforce-approval-request-projection",
            upstream_object_id: input.approval_request.approval_request_ref,
            notes: ["projection_safe_product_dto", "non_executable_status_hint_only"],
          },
        ]
      : []),
  ];
}

export type RuntimePrivateCellSummaryAdapterInput = WorkforceCellProjectionInput;

export type ProjectionSafeCellSummaryAdapterInput = WorkforceCellProjectionInput;

type LegacyRuntimePrivateCellSummaryAdapterInput = Record<string, unknown> & {
  cell_runtime_scope?: Record<string, unknown>;
  cell_summary_runtime_record?: Record<string, unknown>;
  management_directive_record?: Record<string, unknown>;
  delivery_return_record?: Record<string, unknown>;
  approval_request_record?: Record<string, unknown>;
};

export function asProjectionSafeWorkforceCellInput(
  input: ProjectionSafeCellSummaryAdapterInput | LegacyRuntimePrivateCellSummaryAdapterInput
): ProjectionSafeCellSummaryAdapterInput {
  if ("workforce_envelope" in input) {
    return input as ProjectionSafeCellSummaryAdapterInput;
  }

  const legacy = input as LegacyRuntimePrivateCellSummaryAdapterInput;
  const scope = legacy.cell_runtime_scope ?? {};
  const summary = legacy.cell_summary_runtime_record ?? {};
  const directive = legacy.management_directive_record;
  const delivery = legacy.delivery_return_record;
  const approval = legacy.approval_request_record;
  const scope_ref = String(scope.object_id ?? "");
  const envelope: WorkforceProjectionSafeEnvelope = {
    envelope_version: "0.1",
    envelope_kind: "workforce_projection_safe_envelope",
    source_runtime_family: "workforce",
    project_id: String(scope.project_id ?? summary.project_id ?? ""),
    scope_ref,
    scope_label: String(scope.scope_name ?? scope_ref),
    scope_status: (scope.status ?? "active") as WorkforceProjectionSafeEnvelope["scope_status"],
    scope_mode: (scope.scope_mode ?? "multi_scope_bounded") as WorkforceProjectionSafeEnvelope["scope_mode"],
    summary_headline:
      typeof summary.summary_headline === "string"
        ? summary.summary_headline
        : typeof scope.scope_summary === "string"
          ? scope.scope_summary
          : undefined,
    delivery_posture:
      (summary.summary_delivery_posture ??
        "unknown") as WorkforceProjectionSafeEnvelope["delivery_posture"],
    safe_evidence_refs: [],
    projection_notes: [
      "Compatibility-only conversion from historical runtime-private test input.",
      "Canonical SoloCrew consumption must use WorkforceProjectionSafeEnvelope.",
    ],
    runtime_private_fields_omitted: true,
    non_executing: true,
  };

  return {
    workforce_envelope: envelope,
    active_work_item_count:
      typeof summary.active_work_item_count === "number"
        ? summary.active_work_item_count
        : undefined,
    blocked_work_item_count:
      typeof summary.blocked_work_item_count === "number"
        ? summary.blocked_work_item_count
        : undefined,
    continuity_hint:
      typeof summary.continuity_hint === "string"
        ? summary.continuity_hint
        : undefined,
    management_directive: directive
      ? {
          directive_ref: String(directive.object_id ?? ""),
          objective_ref:
            typeof directive.objective_id === "string"
              ? directive.objective_id
              : undefined,
          directive_summary: String(directive.directive_summary ?? ""),
          directive_priority:
            (directive.directive_priority ??
              "review_first") as WorkforceManagementDirectiveProjectionInput["directive_priority"],
          approval_posture:
            (directive.approval_posture ??
              "operator_required") as WorkforceManagementDirectiveProjectionInput["approval_posture"],
          constraint_tags: Array.isArray(directive.constraint_tags)
            ? directive.constraint_tags.filter(
                (tag): tag is string => typeof tag === "string"
              )
            : undefined,
        }
      : undefined,
    delivery_return: delivery
      ? {
          delivery_return_ref: String(delivery.object_id ?? ""),
          objective_ref:
            typeof delivery.objective_id === "string"
              ? delivery.objective_id
              : undefined,
          delivery_status:
            (delivery.status ??
              "in_progress") as WorkforceDeliveryReturnProjectionInput["delivery_status"],
          completed_summary: String(delivery.completed_summary ?? ""),
          blocked_summary: String(delivery.blocked_summary ?? ""),
          next_directive_needed: Boolean(delivery.next_directive_needed),
          requested_follow_up:
            typeof delivery.requested_follow_up === "string"
              ? delivery.requested_follow_up
              : undefined,
        }
      : undefined,
    approval_request: approval
      ? {
          approval_request_ref: String(approval.object_id ?? ""),
          objective_ref:
            typeof approval.objective_id === "string"
              ? approval.objective_id
              : undefined,
          request_kind:
            (approval.request_kind ??
              "approval") as WorkforceApprovalRequestProjectionInput["request_kind"],
          request_status:
            (approval.status ??
              "pending") as WorkforceApprovalRequestProjectionInput["request_status"],
          request_summary: String(approval.request_summary ?? ""),
          requested_decision: String(approval.requested_decision ?? ""),
          urgency:
            (approval.urgency ??
              "normal") as WorkforceApprovalRequestProjectionInput["urgency"],
        }
      : undefined,
  };
}

export function adaptRuntimePrivateCellSummaryToProjection(
  input: RuntimePrivateCellSummaryAdapterInput | LegacyRuntimePrivateCellSummaryAdapterInput
): CellSummaryProjection {
  return adaptProjectionSafeWorkforceEnvelopeToCellSummary(
    asProjectionSafeWorkforceCellInput(input)
  );
}

export function adaptProjectionSafeWorkforceEnvelopeToCellSummary(
  input: ProjectionSafeCellSummaryAdapterInput
): CellSummaryProjection {
  const envelope = input.workforce_envelope;
  const management_directive: WorkforceManagementDirectiveProjectionInput | undefined =
    input.management_directive;
  const delivery_return: WorkforceDeliveryReturnProjectionInput | undefined =
    input.delivery_return;
  const approval_request: WorkforceApprovalRequestProjectionInput | undefined =
    input.approval_request;
  const cell_summary_card = createCellSummaryCard({
    projection_id: `cell-summary-card:${envelope.scope_ref}`,
    cell_summary_card_id: `${envelope.scope_ref}:cell-summary-card`,
    cell_id: envelope.scope_ref,
    cell_name: envelope.scope_label,
    current_objective_headline:
      envelope.summary_headline ??
      management_directive?.directive_summary ??
      "Bounded projection-safe workforce summary only.",
    delivery_posture: map_delivery_posture(
      envelope.delivery_posture ?? "unknown"
    ),
    active_work_count: input.active_work_item_count ?? 0,
    blocked_work_count: input.blocked_work_item_count ?? 0,
    continuity_note:
      input.continuity_hint ??
      "Continuity remains bounded to upstream projection-safe workforce truth.",
    projection_notes: [
      "Cell summary card is projected downstream from a projection-safe workforce envelope.",
      "Projected cell summary card does not become shared runtime law.",
    ],
  });

  return {
    summary_projection_id:
      `${envelope.scope_ref}-projection-safe-cell-summary-projection`,
    summary_scope: "cell_summary_projection",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_summary",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    multi_cell_foundation_scope: "read_inspect_only",
    source_mode: "upstream_projection_safe_envelope",
    summary_projection_is_runtime_law: false,
    secretary_behavior_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    truth_sources: [
      "upstream_projection_safe_envelope",
      "non_claim",
    ],
    upstream_refs: create_upstream_refs(input),
    cell_summary_card,
    objective_status_summary:
      `${cell_summary_card.current_objective_headline} (${cell_summary_card.active_work_count} active / ${cell_summary_card.blocked_work_count} blocked)`,
    readiness_signal: derive_readiness_signal(
      input
    ),
    continuity_status: "bounded_and_honest",
    continuity_hint: cell_summary_card.continuity_note,
    deferred_items: unique_items([
      "secretary_behavior",
      "portfolio_dispatch_behavior",
      "provider_execution",
      "channel_entry",
      "broad_kpi_cockpit",
      "runtime_complete_orchestration",
    ]),
    non_claims: [...RUNTIME_PRIVATE_CELL_SUMMARY_NON_CLAIMS],
    projection_notes: [
      "Cell summary projection is downstream product projection over a projection-safe workforce envelope.",
      "Raw runtime-private workforce records are not consumed as canonical SoloCrew inputs.",
    ],
  };
}
