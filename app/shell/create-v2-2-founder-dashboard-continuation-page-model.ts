import {
  assert_cgos_projection_safe_consumption,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import {
  FOUNDER_DASHBOARD_CONTINUATION_BOUNDARY_FLAGS,
  type FounderDashboardCgosSummary,
  type FounderDashboardContinuationPageModel,
  type FounderDashboardContinuationStatus,
  type FounderDashboardDiagnosticRef,
  type FounderDashboardReviewPacketSummary,
  type FounderDashboardWorkspaceSummary,
} from "../dashboard/v2-2-founder-dashboard-continuation-contract.ts";
import type {
  V2_2ReviewPacketExport,
} from "../review-packets/review-packet-export-contract.ts";
import type {
  SoloCrewWorkspaceRecord,
} from "../workspaces/workspace-contract.ts";
import type {
  SoloCrewWorkspaceStore,
} from "../workspaces/workspace-store.ts";

export type CreateV2_2FounderDashboardContinuationInput = {
  workspace?: SoloCrewWorkspaceRecord | null;
  store?: SoloCrewWorkspaceStore;
  workspace_id?: string;
  latest_review_packet_export?: V2_2ReviewPacketExport | null;
  generated_at?: string;
};

function resolve_workspace(
  input: CreateV2_2FounderDashboardContinuationInput
): SoloCrewWorkspaceRecord | null {
  if (input.workspace !== undefined) {
    return input.workspace;
  }

  if (input.store && input.workspace_id) {
    try {
      return input.store.load_workspace(input.workspace_id);
    } catch {
      return null;
    }
  }

  return null;
}

function build_workspace_summary(
  workspace: SoloCrewWorkspaceRecord
): FounderDashboardWorkspaceSummary {
  return {
    workspace_id: workspace.workspace_id,
    workspace_label: workspace.workspace_label,
    primary_vertical: workspace.primary_vertical,
    active_journey_id: workspace.active_journey_id,
    latest_step: workspace.latest_step,
    next_review_action: workspace.next_review_action,
    history_event_count: workspace.history_events.length,
  };
}

function build_review_packet_summary(
  export_packet: V2_2ReviewPacketExport | null | undefined
): FounderDashboardReviewPacketSummary | null {
  if (!export_packet) {
    return null;
  }

  return {
    export_id: export_packet.export_id,
    status: export_packet.status,
    json_export_path: export_packet.json_export_path,
    markdown_export_path: export_packet.markdown_export_path,
    exported_at: export_packet.exported_at,
    request_summary: export_packet.request_summary,
    next_review_action: export_packet.next_review_action,
  };
}

function build_cgos_summary(
  workspace: SoloCrewWorkspaceRecord
): FounderDashboardCgosSummary {
  const cgos = workspace.cgos_consumption;
  assert_cgos_projection_safe_consumption(cgos);

  return {
    projection_safe_runtime_envelope_ref:
      cgos.projection_safe_runtime_envelope_ref.ref_id,
    state_snapshot_posture_ref: cgos.state_snapshot_posture_ref.ref_id,
    transaction_export_posture_ref: cgos.transaction_export_posture_ref.ref_id,
    error_insufficiency_posture_ref: cgos.error_insufficiency_posture_ref.ref_id,
    required_module_posture_names: [...cgos.required_module_posture_names],
    required_kernel_duty_ids: [...cgos.required_kernel_duty_ids],
    safe_evidence_refs: cgos.safe_evidence_refs
      .map((entry) => entry.evidence_ref)
      .sort(),
    omission_markers: cgos.omission_markers
      .map((entry) => entry.marker)
      .sort(),
    protocol_version_refs: cgos.protocol_version_refs
      .map((entry) => `${entry.ref_kind}:${entry.ref_id}:${entry.ref_version}`)
      .sort(),
    binding_version_refs: cgos.binding_version_refs
      .map((entry) => `${entry.ref_kind}:${entry.ref_id}:${entry.ref_version}`)
      .sort(),
    runtime_private_fields_omitted: true,
  };
}

function build_status(
  workspace: SoloCrewWorkspaceRecord | null,
  review_packet_summary: FounderDashboardReviewPacketSummary | null
): FounderDashboardContinuationStatus {
  if (!workspace) {
    return "no_workspace";
  }

  if (review_packet_summary?.status === "exported") {
    return "review_packet_exported";
  }

  return "workspace_available";
}

function build_user_facing_summary(input: {
  workspace_summary: FounderDashboardWorkspaceSummary | null;
  review_packet_summary: FounderDashboardReviewPacketSummary | null;
  status: FounderDashboardContinuationStatus;
}): string {
  if (!input.workspace_summary) {
    return "No saved V2.2 workspace is available yet.";
  }

  if (input.review_packet_summary) {
    return `Saved workspace ${input.workspace_summary.workspace_label} is ready for human review with a local review packet available.`;
  }

  return `Saved workspace ${input.workspace_summary.workspace_label} is available at step ${input.workspace_summary.latest_step}.`;
}

function build_diagnostic_refs(input: {
  workspace: SoloCrewWorkspaceRecord | null;
  review_packet_summary: FounderDashboardReviewPacketSummary | null;
  cgos_summary: FounderDashboardCgosSummary | null;
}): FounderDashboardDiagnosticRef[] {
  const refs: FounderDashboardDiagnosticRef[] = [];

  if (input.workspace) {
    refs.push({
      ref_kind: "workspace",
      ref_id: input.workspace.workspace_id,
    });
  }

  if (input.review_packet_summary) {
    refs.push({
      ref_kind: "review_packet",
      ref_id: input.review_packet_summary.export_id,
    });
  }

  if (input.cgos_summary) {
    refs.push(
      {
        ref_kind: "cgos_projection_envelope",
        ref_id: input.cgos_summary.projection_safe_runtime_envelope_ref,
      },
      {
        ref_kind: "cgos_state_snapshot",
        ref_id: input.cgos_summary.state_snapshot_posture_ref,
      },
      {
        ref_kind: "cgos_transaction_export",
        ref_id: input.cgos_summary.transaction_export_posture_ref,
      },
      {
        ref_kind: "cgos_error_insufficiency",
        ref_id: input.cgos_summary.error_insufficiency_posture_ref,
      },
      ...input.cgos_summary.protocol_version_refs.map((ref_id) => ({
        ref_kind: "protocol_version" as const,
        ref_id,
      })),
      ...input.cgos_summary.binding_version_refs.map((ref_id) => ({
        ref_kind: "binding_version" as const,
        ref_id,
      }))
    );
  }

  return refs.sort((left, right) =>
    `${left.ref_kind}:${left.ref_id}`.localeCompare(
      `${right.ref_kind}:${right.ref_id}`
    )
  );
}

export function create_v2_2_founder_dashboard_continuation_page_model(
  input: CreateV2_2FounderDashboardContinuationInput = {}
): FounderDashboardContinuationPageModel {
  const workspace = resolve_workspace(input);
  const workspace_summary =
    workspace === null ? null : build_workspace_summary(workspace);
  const review_packet_summary = build_review_packet_summary(
    input.latest_review_packet_export
  );
  const cgos_summary = workspace === null ? null : build_cgos_summary(workspace);
  const status = build_status(workspace, review_packet_summary);

  return {
    page_id: "v2_2_founder_dashboard_continuation",
    page_ref: "founder_dashboard_continuation",
    generated_at: input.generated_at ?? new Date(0).toISOString(),
    status,
    workspace_summary,
    review_packet_summary,
    cgos_summary,
    boundary_flags: FOUNDER_DASHBOARD_CONTINUATION_BOUNDARY_FLAGS,
    boundary_notices: [
      "Dashboard continuation is local, review-only, and non-executing.",
      "The main summary hides protocol/runtime complexity; diagnostic refs preserve auditability.",
      "No provider dispatch, channel dispatch, marketplace behavior, autonomous execution, release, certification, endorsement, or paid readiness claim is available here.",
    ],
    user_facing_summary: build_user_facing_summary({
      workspace_summary,
      review_packet_summary,
      status,
    }),
    diagnostic_refs: build_diagnostic_refs({
      workspace,
      review_packet_summary,
      cgos_summary,
    }),
  };
}

export type CreateFounderDashboardContinuationInput =
  CreateV2_2FounderDashboardContinuationInput;

export const createFounderDashboardContinuationPageModel =
  create_v2_2_founder_dashboard_continuation_page_model;
