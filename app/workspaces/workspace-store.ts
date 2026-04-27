import {
  existsSync,
  mkdirSync,
  readFileSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname } from "node:path";

import {
  assert_cgos_projection_safe_consumption,
  assert_no_forbidden_cgos_payload_keys,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import type {
  SoloCrewWorkspaceRecord,
  WorkspaceContinuation,
  WorkspaceHistoryEvent,
  WorkspaceId,
  WorkspaceStoreSnapshot,
} from "./workspace-contract.ts";

export type WorkspaceStoreOptions = {
  storage_path: string;
};

function create_empty_snapshot(): WorkspaceStoreSnapshot {
  return {
    store_kind: "solocrew_v2_2_workspace_store",
    schema_version: 1,
    workspaces: [],
  };
}

function clone_snapshot(snapshot: WorkspaceStoreSnapshot): WorkspaceStoreSnapshot {
  return JSON.parse(JSON.stringify(snapshot)) as WorkspaceStoreSnapshot;
}

function sort_workspace(workspace: SoloCrewWorkspaceRecord): SoloCrewWorkspaceRecord {
  return {
    ...workspace,
    history_events: [...workspace.history_events].sort((left, right) =>
      left.event_id.localeCompare(right.event_id)
    ),
  };
}

function sort_snapshot(snapshot: WorkspaceStoreSnapshot): WorkspaceStoreSnapshot {
  return {
    ...snapshot,
    workspaces: [...snapshot.workspaces]
      .map(sort_workspace)
      .sort((left, right) => left.workspace_id.localeCompare(right.workspace_id)),
  };
}

function assert_workspace_safe(workspace: SoloCrewWorkspaceRecord): void {
  assert_cgos_projection_safe_consumption(workspace.cgos_consumption);
  assert_no_forbidden_cgos_payload_keys(workspace);

  if (workspace.boundary_flags.non_executing !== true) {
    throw new Error("Workspace must remain non-executing.");
  }

  if (workspace.review_packet_export_implemented !== false) {
    throw new Error("Workspace continuity must not implement review packet export.");
  }

  if (workspace.founder_dashboard_continuation_implemented !== false) {
    throw new Error(
      "Workspace continuity must not implement dashboard continuation."
    );
  }
}

export class SoloCrewWorkspaceStore {
  readonly storage_path: string;

  constructor(options: WorkspaceStoreOptions) {
    this.storage_path = options.storage_path;
  }

  load_snapshot(): WorkspaceStoreSnapshot {
    if (!existsSync(this.storage_path)) {
      return create_empty_snapshot();
    }

    const parsed = JSON.parse(
      readFileSync(this.storage_path, "utf8")
    ) as WorkspaceStoreSnapshot;

    return sort_snapshot(clone_snapshot(parsed));
  }

  save_snapshot(snapshot: WorkspaceStoreSnapshot): void {
    for (const workspace of snapshot.workspaces) {
      assert_workspace_safe(workspace);
    }

    const parent_directory = dirname(this.storage_path);
    mkdirSync(parent_directory, { recursive: true });

    const temp_path = `${this.storage_path}.tmp`;
    writeFileSync(
      temp_path,
      JSON.stringify(sort_snapshot(snapshot), null, 2),
      "utf8"
    );
    renameSync(temp_path, this.storage_path);
  }

  create_workspace(workspace: SoloCrewWorkspaceRecord): SoloCrewWorkspaceRecord {
    const snapshot = this.load_snapshot();

    if (
      snapshot.workspaces.some(
        (entry) => entry.workspace_id === workspace.workspace_id
      )
    ) {
      throw new Error(`Workspace already exists: ${workspace.workspace_id}`);
    }

    this.save_snapshot({
      ...snapshot,
      workspaces: [...snapshot.workspaces, workspace],
    });

    return this.load_workspace(workspace.workspace_id);
  }

  list_workspaces(): SoloCrewWorkspaceRecord[] {
    return this.load_snapshot().workspaces;
  }

  load_workspace(workspace_id: WorkspaceId): SoloCrewWorkspaceRecord {
    const workspace = this.load_snapshot().workspaces.find(
      (entry) => entry.workspace_id === workspace_id
    );

    if (!workspace) {
      throw new Error(`Workspace not found: ${workspace_id}`);
    }

    return workspace;
  }

  save_workspace(workspace: SoloCrewWorkspaceRecord): SoloCrewWorkspaceRecord {
    const snapshot = this.load_snapshot();
    const without_workspace = snapshot.workspaces.filter(
      (entry) => entry.workspace_id !== workspace.workspace_id
    );

    this.save_snapshot({
      ...snapshot,
      workspaces: [...without_workspace, workspace],
    });

    return this.load_workspace(workspace.workspace_id);
  }

  append_workspace_history_event(
    workspace_id: WorkspaceId,
    event: WorkspaceHistoryEvent
  ): SoloCrewWorkspaceRecord {
    const workspace = this.load_workspace(workspace_id);
    const updated_workspace: SoloCrewWorkspaceRecord = {
      ...workspace,
      updated_at: event.occurred_at,
      latest_step: event.latest_step,
      history_events: [...workspace.history_events, event],
    };

    return this.save_workspace(updated_workspace);
  }

  restore_latest_workspace_continuation(
    workspace_id: WorkspaceId
  ): WorkspaceContinuation {
    const workspace = this.load_workspace(workspace_id);
    const latest_event =
      [...workspace.history_events].sort((left, right) =>
        right.event_id.localeCompare(left.event_id)
      )[0] ?? null;

    return {
      workspace_id: workspace.workspace_id,
      active_journey_id: workspace.active_journey_id,
      latest_step: workspace.latest_step,
      next_review_action: workspace.next_review_action,
      latest_history_event_id: latest_event?.event_id ?? null,
      user_safe_summary:
        latest_event?.summary ??
        "Workspace continuation is available as a bounded product summary.",
      cgos_consumption: workspace.cgos_consumption,
      non_executing: true,
      runtime_private_fields_omitted: true,
    };
  }
}

export function loadWorkspaceStore(
  options: WorkspaceStoreOptions
): SoloCrewWorkspaceStore {
  return new SoloCrewWorkspaceStore(options);
}

export function restoreWorkspaceStore(
  options: WorkspaceStoreOptions
): SoloCrewWorkspaceStore {
  return loadWorkspaceStore(options);
}
