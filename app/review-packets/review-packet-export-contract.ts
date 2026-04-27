import type {
  CgosProjectionSafeConsumption,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import type {
  WorkspaceHistoryEvent,
  WorkspaceId,
} from "../workspaces/workspace-contract.ts";

export type ReviewPacketExportFormat = "markdown";

export type ReviewPacketExportFileRefs = {
  markdown_path: string;
  manifest_path: string;
};

export type ReviewPacketWorkspaceSummary = {
  workspace_id: WorkspaceId;
  workspace_label: string;
  primary_vertical: "development_company_project_governance";
  active_journey_id: string;
  latest_step: string;
  next_review_action: string;
  history_event_count: number;
};

export type ReviewPacketExportManifest = {
  export_id: string;
  workspace_summary: ReviewPacketWorkspaceSummary;
  export_format: ReviewPacketExportFormat;
  exported_at: string;
  local_file_refs: ReviewPacketExportFileRefs;
  cgos_consumption: CgosProjectionSafeConsumption;
  history_events: WorkspaceHistoryEvent[];
  boundary_flags: {
    local_only: true;
    review_only: true;
    non_executing: true;
    no_provider_dispatch: true;
    no_channel_dispatch: true;
    no_marketplace_implementation: true;
    no_autonomous_execution: true;
    not_execution_packet: true;
    not_mplp_certification: true;
    not_mplp_endorsement: true;
    not_paid_product_readiness: true;
    not_v2_2_completion: true;
  };
  runtime_private_fields_omitted: true;
};

export type ReviewPacketExportResult = {
  manifest: ReviewPacketExportManifest;
  markdown: string;
};

export const REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS =
  {
    local_only: true,
    review_only: true,
    non_executing: true,
    no_provider_dispatch: true,
    no_channel_dispatch: true,
    no_marketplace_implementation: true,
    no_autonomous_execution: true,
    not_execution_packet: true,
    not_mplp_certification: true,
    not_mplp_endorsement: true,
    not_paid_product_readiness: true,
    not_v2_2_completion: true,
  } as const satisfies ReviewPacketExportManifest["boundary_flags"];
