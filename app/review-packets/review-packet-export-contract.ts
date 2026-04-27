import type {
  CgosProjectionSafeConsumption,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import type { WorkspaceId } from "../workspaces/workspace-contract.ts";

export type ReviewPacketExportId = string;
export type ReviewPacketExportFormat = "json" | "markdown";
export type ReviewPacketExportStatus = "exported" | "blocked";

export type ReviewPacketExportFileRefs = {
  json_path: string;
  markdown_path: string;
};

export type ReviewPacketExportBoundaryFlags = {
  non_executing: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_execution: true;
  runtime_private_fields_omitted: true;
};

export type ReviewPacketExportReviewChainSummary = {
  review_chain_summary: string;
  secretary_routing_summary: string;
  management_directive_summary: string;
  cell_ceo_assembly_summary: string;
  project_governance_mapping_summary: string;
};

export type V2_2ReviewPacketExport = {
  export_id: ReviewPacketExportId;
  workspace_id: WorkspaceId;
  journey_id: string;
  primary_vertical: "development_company_project_governance";
  exported_at: string;
  request_summary: string;
  review_chain_summary: string;
  secretary_routing_summary: string;
  management_directive_summary: string;
  cell_ceo_assembly_summary: string;
  project_governance_mapping_summary: string;
  cgos_consumption: CgosProjectionSafeConsumption;
  safe_evidence_refs: string[];
  omission_markers: string[];
  protocol_version_refs: string[];
  binding_version_refs: string[];
  next_review_action: string;
  boundary_notices: string[];
  boundary_flags: ReviewPacketExportBoundaryFlags;
  json_export_path: string;
  markdown_export_path: string;
  status: ReviewPacketExportStatus;
};

export type ReviewPacketExportResult = {
  export_packet: V2_2ReviewPacketExport;
  markdown: string;
};

export const REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS =
  {
    non_executing: true,
    no_provider_dispatch: true,
    no_channel_dispatch: true,
    no_marketplace_implementation: true,
    no_autonomous_execution: true,
    runtime_private_fields_omitted: true,
  } as const satisfies ReviewPacketExportBoundaryFlags;
