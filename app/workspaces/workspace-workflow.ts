import { join } from "node:path";

import {
  create_default_cgos_projection_safe_consumption,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import {
  SOLOCREW_WORKSPACE_BOUNDARY_FLAGS,
  type SoloCrewWorkspaceRecord,
  type WorkspaceContinuation,
  type WorkspaceHistoryEvent,
} from "./workspace-contract.ts";
import {
  type SoloCrewWorkspaceStore,
  loadWorkspaceStore,
} from "./workspace-store.ts";

export type CreateWorkspaceWorkflowInput = {
  store: SoloCrewWorkspaceStore;
  workspace_id: string;
  workspace_label: string;
  storage_root: string;
  initial_request: string;
  created_at?: string;
};

export type WorkspaceWorkflowResult = {
  workspace: SoloCrewWorkspaceRecord;
  continuation: WorkspaceContinuation;
};

export function create_v2_2_workspace_with_cgos_consumption(
  input: CreateWorkspaceWorkflowInput
): WorkspaceWorkflowResult {
  const created_at = input.created_at ?? new Date(0).toISOString();
  const cgos_consumption = create_default_cgos_projection_safe_consumption(
    input.workspace_id
  );

  const initial_event: WorkspaceHistoryEvent = {
    event_id: `${input.workspace_id}:0001:workspace_created`,
    workspace_id: input.workspace_id,
    occurred_at: created_at,
    event_kind: "workspace_created",
    summary: input.initial_request,
    latest_step: "workspace_created",
    safe_evidence_refs: cgos_consumption.safe_evidence_refs.map(
      (entry) => entry.evidence_ref
    ),
    omission_markers: cgos_consumption.omission_markers.map(
      (entry) => entry.marker
    ),
    non_executing: true,
    runtime_private_fields_omitted: true,
  };

  const review_chain_placeholder: WorkspaceHistoryEvent = {
    event_id: `${input.workspace_id}:0002:v2_1_review_chain_placeholder`,
    workspace_id: input.workspace_id,
    occurred_at: created_at,
    event_kind: "v2_1_review_chain_placeholder_recorded",
    summary:
      "V2.1 review-only projection chain may be referenced by this workspace; no export or execution is started.",
    latest_step: "v2_1_review_chain_placeholder_recorded",
    safe_evidence_refs: cgos_consumption.safe_evidence_refs.map(
      (entry) => entry.evidence_ref
    ),
    omission_markers: cgos_consumption.omission_markers.map(
      (entry) => entry.marker
    ),
    non_executing: true,
    runtime_private_fields_omitted: true,
  };

  const workspace: SoloCrewWorkspaceRecord = {
    workspace_id: input.workspace_id,
    workspace_label: input.workspace_label,
    primary_vertical: "development_company_project_governance",
    created_at,
    updated_at: created_at,
    storage_paths: {
      workspace_record_path: join(input.storage_root, `${input.workspace_id}.json`),
      workspace_history_path: join(
        input.storage_root,
        `${input.workspace_id}.history.json`
      ),
    },
    active_journey_id: `${input.workspace_id}:developer_company_project_governance`,
    latest_step: "workspace_created",
    next_review_action: "continue_review_only_project_governance_journey",
    boundary_flags: SOLOCREW_WORKSPACE_BOUNDARY_FLAGS,
    cgos_consumption,
    history_events: [initial_event, review_chain_placeholder],
    review_packet_export_implemented: false,
    founder_dashboard_continuation_implemented: false,
  };

  const saved_workspace = input.store.create_workspace(workspace);
  return {
    workspace: saved_workspace,
    continuation: input.store.restore_latest_workspace_continuation(
      saved_workspace.workspace_id
    ),
  };
}

export function append_workspace_request_history_event(input: {
  store: SoloCrewWorkspaceStore;
  workspace_id: string;
  event_id: string;
  occurred_at: string;
  request_summary: string;
  latest_step: string;
}): SoloCrewWorkspaceRecord {
  const workspace = input.store.load_workspace(input.workspace_id);

  return input.store.append_workspace_history_event(input.workspace_id, {
    event_id: input.event_id,
    workspace_id: input.workspace_id,
    occurred_at: input.occurred_at,
    event_kind: "user_request_recorded",
    summary: input.request_summary,
    latest_step: input.latest_step,
    safe_evidence_refs: workspace.cgos_consumption.safe_evidence_refs.map(
      (entry) => entry.evidence_ref
    ),
    omission_markers: workspace.cgos_consumption.omission_markers.map(
      (entry) => entry.marker
    ),
    non_executing: true,
    runtime_private_fields_omitted: true,
  });
}

export function restore_workspace_continuation(input: {
  store: SoloCrewWorkspaceStore;
  workspace_id: string;
}): WorkspaceContinuation {
  return input.store.restore_latest_workspace_continuation(input.workspace_id);
}

export function create_file_backed_workspace_store(storage_path: string) {
  return loadWorkspaceStore({ storage_path });
}
