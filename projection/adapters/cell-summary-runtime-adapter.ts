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
  ApprovalRequestRuntimeRecord,
  CellRuntimeScopeRecord,
  CellSummaryRuntimeRecord,
  DeliveryReturnRuntimeRecord,
  ManagementDirectiveRuntimeRecord,
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
  posture: CellSummaryRuntimeRecord["summary_delivery_posture"]
): CellDeliveryPosture {
  switch (posture) {
    case "steady":
      return "on_track";
    case "attention":
      return "attention";
    case "blocked":
      return "blocked";
  }
}

function derive_readiness_signal(
  cell_summary_runtime_record: CellSummaryRuntimeRecord | undefined,
  approval_request_record: ApprovalRequestRuntimeRecord | undefined
): CellSummaryProjectionReadiness {
  if (
    cell_summary_runtime_record?.summary_delivery_posture === "blocked" ||
    (cell_summary_runtime_record?.blocked_work_item_count ?? 0) > 0 ||
    approval_request_record?.status === "pending"
  ) {
    return "attention_required";
  }

  return "steady";
}

function create_upstream_refs(input: RuntimePrivateCellSummaryAdapterInput): ProjectionUpstreamRef[] {
  return [
    {
      source_repo: "Cognitive_OS",
      upstream_object_type: input.cell_runtime_scope.object_type,
      upstream_object_id: input.cell_runtime_scope.object_id,
      notes: ["runtime_private_input", "cell_scope_source"],
    },
    ...(input.cell_summary_runtime_record
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: input.cell_summary_runtime_record.object_type,
            upstream_object_id: input.cell_summary_runtime_record.object_id,
            notes: ["runtime_private_input", "summary_record_source"],
          },
        ]
      : []),
    ...(input.management_directive_record
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: input.management_directive_record.object_type,
            upstream_object_id: input.management_directive_record.object_id,
            notes: ["runtime_private_input", "non_executable_status_hint_only"],
          },
        ]
      : []),
    ...(input.delivery_return_record
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: input.delivery_return_record.object_type,
            upstream_object_id: input.delivery_return_record.object_id,
            notes: ["runtime_private_input", "non_executable_status_hint_only"],
          },
        ]
      : []),
    ...(input.approval_request_record
      ? [
          {
            source_repo: "Cognitive_OS" as const,
            upstream_object_type: input.approval_request_record.object_type,
            upstream_object_id: input.approval_request_record.object_id,
            notes: ["runtime_private_input", "non_executable_status_hint_only"],
          },
        ]
      : []),
  ];
}

export interface RuntimePrivateCellSummaryAdapterInput {
  cell_runtime_scope: CellRuntimeScopeRecord;
  cell_summary_runtime_record?: CellSummaryRuntimeRecord;
  management_directive_record?: ManagementDirectiveRuntimeRecord;
  delivery_return_record?: DeliveryReturnRuntimeRecord;
  approval_request_record?: ApprovalRequestRuntimeRecord;
}

export function adaptRuntimePrivateCellSummaryToProjection(
  input: RuntimePrivateCellSummaryAdapterInput
): CellSummaryProjection {
  const summary_record = input.cell_summary_runtime_record;
  const cell_summary_card = createCellSummaryCard({
    projection_id: `cell-summary-card:${input.cell_runtime_scope.object_id}`,
    cell_summary_card_id: `${input.cell_runtime_scope.object_id}:cell-summary-card`,
    cell_id: input.cell_runtime_scope.object_id,
    cell_name: input.cell_runtime_scope.scope_name,
    current_objective_headline:
      summary_record?.summary_headline ??
      input.management_directive_record?.directive_summary ??
      input.cell_runtime_scope.scope_summary ??
      "Bounded runtime-private cell scope summary only.",
    delivery_posture: map_delivery_posture(
      summary_record?.summary_delivery_posture ?? "attention"
    ),
    active_work_count: summary_record?.active_work_item_count ?? 0,
    blocked_work_count: summary_record?.blocked_work_item_count ?? 0,
    continuity_note:
      summary_record?.continuity_hint ??
      "Continuity remains bounded to upstream runtime-private summary truth.",
    projection_notes: [
      "Cell summary card is projected downstream from runtime-private workforce inputs.",
      "Projected cell summary card does not become shared runtime law.",
    ],
  });

  return {
    summary_projection_id:
      `${input.cell_runtime_scope.object_id}-runtime-private-cell-summary-projection`,
    summary_scope: "cell_summary_projection",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_summary",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    multi_cell_foundation_scope: "read_inspect_only",
    source_mode: "upstream_runtime_private_records",
    summary_projection_is_runtime_law: false,
    secretary_behavior_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    truth_sources: [
      "upstream_runtime_private_truth",
      "non_claim",
    ],
    upstream_refs: create_upstream_refs(input),
    cell_summary_card,
    objective_status_summary:
      `${cell_summary_card.current_objective_headline} (${cell_summary_card.active_work_count} active / ${cell_summary_card.blocked_work_count} blocked)`,
    readiness_signal: derive_readiness_signal(
      summary_record,
      input.approval_request_record
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
      "Cell summary projection is downstream product projection over runtime-private workforce records.",
      "Runtime-private inputs remain upstream truth sources and are not rendered as shared runtime object identity.",
    ],
  };
}
