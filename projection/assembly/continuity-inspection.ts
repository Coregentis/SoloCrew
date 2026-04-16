import type {
  CellDetailProjection,
} from "../contracts/cell-detail-projection-contract.ts";
import type {
  ContinuityInspectionProjection,
  ContinuityInspectionState,
  ContinuityInspectionVisibility,
} from "../contracts/continuity-inspection-contract.ts";
import type {
  ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";

const CONTINUITY_INSPECTION_NON_CLAIMS = [
  "no_secretary_behavior_truth",
  "no_portfolio_dispatch_truth",
  "no_provider_execution_truth",
  "no_channel_entry_truth",
  "no_runtime_complete_orchestration",
  "no_shared_object_identity_with_runtime_private_record",
];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function filter_continuity_refs(
  refs: readonly ProjectionUpstreamRef[]
): ProjectionUpstreamRef[] {
  return refs.filter(
    (ref) =>
      ref.upstream_object_type === "cell-runtime-scope" ||
      ref.upstream_object_type === "cell-summary-runtime-record"
  );
}

function derive_continuity_visibility(
  detail_projection: CellDetailProjection
): ContinuityInspectionVisibility {
  return detail_projection.source_mode === "upstream_runtime_private_records"
    ? "runtime_backed_visible"
    : "bounded_scope_visible";
}

function derive_continuity_state(
  detail_projection: CellDetailProjection
): ContinuityInspectionState {
  if (detail_projection.objective_and_work_status.blocked_signal === "blocked_attention_visible") {
    return "blocked_visible";
  }

  if (detail_projection.objective_and_work_status.readiness_signal === "attention_required") {
    return "attention_visible";
  }

  if (detail_projection.source_mode === "single_cell_shell_composition") {
    return "bounded_scope_only";
  }

  return "steady_visible";
}

function derive_known_inputs(
  detail_projection: CellDetailProjection
): string[] {
  const known_inputs = [
    "cell_identity_scope_status",
    "continuity_hint",
    "recency_hint",
    "objective_and_work_rollup",
  ];

  if (
    detail_projection.upstream_refs.some(
      (ref) => ref.upstream_object_type === "cell-summary-runtime-record"
    )
  ) {
    known_inputs.push("runtime_private_summary_record_presence");
  }

  return known_inputs;
}

function derive_unknown_inputs(
  detail_projection: CellDetailProjection
): string[] {
  const unknown_inputs = [
    "full_event_timeline_persistence",
    "recovery_workflow_execution",
    "provider_backed_resume_path",
  ];

  if (
    !detail_projection.upstream_refs.some(
      (ref) => ref.upstream_object_type === "cell-summary-runtime-record"
    )
  ) {
    unknown_inputs.push("runtime_private_summary_record_absent");
  }

  return unknown_inputs;
}

export function assembleContinuityInspectionProjection(
  detail_projection: CellDetailProjection
): ContinuityInspectionProjection {
  return {
    continuity_inspection_id:
      `${detail_projection.cell_identity.cell_id}-continuity-inspection`,
    inspection_scope: "continuity_inspection",
    authority_boundary: "product_projection_only",
    phase_boundary: "runtime_adjacent_detail",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    multi_cell_foundation_scope: "read_inspect_only",
    source_detail_projection_id: detail_projection.detail_projection_id,
    source_mode: detail_projection.source_mode,
    continuity_projection_is_runtime_law: false,
    secretary_behavior_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_orchestration_available: false,
    executable_continuity_actions_available: false,
    truth_sources: [...detail_projection.truth_sources],
    upstream_refs: filter_continuity_refs(detail_projection.upstream_refs),
    cell_context: {
      cell_id: detail_projection.cell_identity.cell_id,
      cell_name: detail_projection.cell_identity.cell_name,
      scope_status: detail_projection.cell_identity.scope_status,
    },
    continuity_snapshot: {
      continuity_status: detail_projection.continuity_and_recency.continuity_status,
      continuity_hint: detail_projection.continuity_and_recency.continuity_hint,
      recency_hint: detail_projection.continuity_and_recency.recency_hint,
      readiness_signal: detail_projection.objective_and_work_status.readiness_signal,
      blocked_signal: detail_projection.objective_and_work_status.blocked_signal,
      active_work_item_count:
        detail_projection.objective_and_work_status.active_work_item_count,
      blocked_work_item_count:
        detail_projection.objective_and_work_status.blocked_work_item_count,
      continuity_state: derive_continuity_state(detail_projection),
      continuity_visibility: derive_continuity_visibility(detail_projection),
    },
    bounded_knowledge: {
      known_inputs: derive_known_inputs(detail_projection),
      unknown_inputs: derive_unknown_inputs(detail_projection),
    },
    deferred_items: unique_items([
      ...detail_projection.deferred_items,
      "restore_action_execution",
      "retry_action_execution",
      "recovery_workflow_execution",
    ]),
    non_claims: unique_items([
      ...detail_projection.non_claims,
      ...CONTINUITY_INSPECTION_NON_CLAIMS,
    ]),
    projection_notes: [
      "Continuity inspection is a dedicated downstream product projection over the existing cell-detail projection path.",
      "Continuity visibility remains read-only and does not become recovery workflow authority.",
    ],
  };
}
