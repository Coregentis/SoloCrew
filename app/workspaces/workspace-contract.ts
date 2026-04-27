import type {
  CgosProjectionSafeConsumption,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";

export type WorkspaceId = string;
export type WorkspaceLabel = string;

export type SoloCrewWorkspaceVertical =
  "development_company_project_governance";

export type WorkspaceStoragePaths = {
  workspace_record_path: string;
  workspace_history_path: string;
};

export type WorkspaceBoundaryFlags = {
  non_executing: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_execution: true;
};

export type WorkspaceHistoryEvent = {
  event_id: string;
  workspace_id: WorkspaceId;
  occurred_at: string;
  event_kind:
    | "workspace_created"
    | "user_request_recorded"
    | "v2_1_review_chain_placeholder_recorded"
    | "review_packet_exported"
    | "workspace_saved"
    | "continuation_restored";
  summary: string;
  latest_step: string;
  safe_evidence_refs: string[];
  omission_markers: string[];
  non_executing: true;
  runtime_private_fields_omitted: true;
};

export type WorkspaceContinuation = {
  workspace_id: WorkspaceId;
  active_journey_id: string;
  latest_step: string;
  next_review_action: string;
  latest_history_event_id: string | null;
  user_safe_summary: string;
  cgos_consumption: CgosProjectionSafeConsumption;
  non_executing: true;
  runtime_private_fields_omitted: true;
};

export type SoloCrewWorkspaceRecord = {
  workspace_id: WorkspaceId;
  workspace_label: WorkspaceLabel;
  primary_vertical: SoloCrewWorkspaceVertical;
  created_at: string;
  updated_at: string;
  storage_paths: WorkspaceStoragePaths;
  active_journey_id: string;
  latest_step: string;
  next_review_action: string;
  boundary_flags: WorkspaceBoundaryFlags;
  cgos_consumption: CgosProjectionSafeConsumption;
  history_events: WorkspaceHistoryEvent[];
  review_packet_export_implemented: false;
  founder_dashboard_continuation_implemented: false;
};

export type WorkspaceStoreSnapshot = {
  store_kind: "solocrew_v2_2_workspace_store";
  schema_version: 1;
  workspaces: SoloCrewWorkspaceRecord[];
};

export const SOLOCREW_WORKSPACE_BOUNDARY_FLAGS: WorkspaceBoundaryFlags = {
  non_executing: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace_implementation: true,
  no_autonomous_execution: true,
};
