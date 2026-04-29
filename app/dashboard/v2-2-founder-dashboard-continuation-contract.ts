import type {
  CgosRequiredKernelDutyId,
  CgosRequiredModulePostureName,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import type {
  SoloCrewWorkspaceVertical,
  WorkspaceId,
} from "../workspaces/workspace-contract.ts";
import type {
  ReviewPacketExportId,
  ReviewPacketExportStatus,
} from "../review-packets/review-packet-export-contract.ts";

export type V2_2FounderDashboardContinuationStatus =
  | "no_workspace"
  | "workspace_available"
  | "review_packet_exported"
  | "blocked";

export type V2_2FounderDashboardWorkspaceSummary = {
  workspace_id: WorkspaceId;
  workspace_label: string;
  primary_vertical: SoloCrewWorkspaceVertical;
  active_journey_id: string;
  latest_step: string;
  next_review_action: string;
  history_event_count: number;
};

export type V2_2FounderDashboardReviewPacketSummary = {
  export_id: ReviewPacketExportId;
  status: ReviewPacketExportStatus;
  json_export_path: string;
  markdown_export_path: string;
  exported_at: string;
  request_summary: string;
  next_review_action: string;
};

export type V2_2FounderDashboardCgosSummary = {
  projection_safe_runtime_envelope_ref: string;
  state_snapshot_posture_ref: string;
  transaction_export_posture_ref: string;
  error_insufficiency_posture_ref: string;
  required_module_posture_names: CgosRequiredModulePostureName[];
  required_kernel_duty_ids: CgosRequiredKernelDutyId[];
  safe_evidence_refs: string[];
  omission_markers: string[];
  protocol_version_refs: string[];
  binding_version_refs: string[];
  runtime_private_fields_omitted: true;
};

export type V2_2FounderDashboardBoundaryFlags = {
  non_executing: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_execution: true;
  no_paid_product_claim: true;
  no_completion_claim: true;
  no_v2_2_completion_claim: true;
  no_mplp_certification: true;
  no_mplp_endorsement: true;
};

export type V2_2FounderDashboardDiagnosticRef = {
  ref_kind:
    | "workspace"
    | "review_packet"
    | "cgos_projection_envelope"
    | "cgos_state_snapshot"
    | "cgos_transaction_export"
    | "cgos_error_insufficiency"
    | "protocol_version"
    | "binding_version";
  ref_id: string;
};

export type V2_2FounderDashboardContinuationPageModel = {
  page_id: string;
  page_ref: "founder_dashboard_continuation";
  generated_at: string;
  status: V2_2FounderDashboardContinuationStatus;
  workspace_summary: V2_2FounderDashboardWorkspaceSummary | null;
  review_packet_summary: V2_2FounderDashboardReviewPacketSummary | null;
  cgos_summary: V2_2FounderDashboardCgosSummary | null;
  boundary_flags: V2_2FounderDashboardBoundaryFlags;
  boundary_notices: string[];
  user_facing_summary: string;
  diagnostic_refs: V2_2FounderDashboardDiagnosticRef[];
};

export const V2_2_FOUNDER_DASHBOARD_BOUNDARY_FLAGS =
  {
    non_executing: true,
    no_provider_dispatch: true,
    no_channel_dispatch: true,
    no_marketplace_implementation: true,
    no_autonomous_execution: true,
    no_paid_product_claim: true,
    no_completion_claim: true,
    no_v2_2_completion_claim: true,
    no_mplp_certification: true,
    no_mplp_endorsement: true,
  } as const satisfies V2_2FounderDashboardBoundaryFlags;

export type FounderDashboardContinuationStatus =
  V2_2FounderDashboardContinuationStatus;
export type FounderDashboardWorkspaceSummary =
  V2_2FounderDashboardWorkspaceSummary;
export type FounderDashboardReviewPacketSummary =
  V2_2FounderDashboardReviewPacketSummary;
export type FounderDashboardCgosSummary = V2_2FounderDashboardCgosSummary;
export type FounderDashboardBoundaryFlags = V2_2FounderDashboardBoundaryFlags;
export type FounderDashboardDiagnosticRef = V2_2FounderDashboardDiagnosticRef;
export type FounderDashboardContinuationPageModel =
  V2_2FounderDashboardContinuationPageModel;

export const FOUNDER_DASHBOARD_CONTINUATION_BOUNDARY_FLAGS =
  V2_2_FOUNDER_DASHBOARD_BOUNDARY_FLAGS;
