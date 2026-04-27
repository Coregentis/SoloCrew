import assert from "node:assert/strict";
import test from "node:test";

import { create_v2_2_workspace_with_cgos_consumption } from "../../app/workspaces/workspace-workflow.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("[v2.2] workspace continuity preserves non-executing boundary and avoids upstream semantic ownership", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-boundary-"));

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace } = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: "workspace-boundary-001",
      workspace_label: "Boundary workspace",
      storage_root: temp_root,
      initial_request: "Save continuity without execution.",
      created_at: "2026-04-28T00:00:00.000Z",
    });
    const serialized = JSON.stringify(workspace);

    assert.equal(workspace.boundary_flags.non_executing, true);
    assert.equal(workspace.boundary_flags.no_provider_dispatch, true);
    assert.equal(workspace.boundary_flags.no_channel_dispatch, true);
    assert.equal(workspace.boundary_flags.no_marketplace_implementation, true);
    assert.equal(workspace.boundary_flags.no_autonomous_execution, true);
    assert.equal(workspace.cgos_consumption.runtime_private_fields_omitted, true);
    assert.equal(workspace.cgos_consumption.non_executing, true);
    assert.equal(workspace.review_packet_export_implemented, false);
    assert.equal(workspace.founder_dashboard_continuation_implemented, false);

    assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
    assert.doesNotMatch(serialized, /raw Cognitive_OS runtime-private payload/i);
    assert.doesNotMatch(serialized, /MPLP certification/i);
    assert.doesNotMatch(serialized, /MPLP endorsement/i);
    assert.doesNotMatch(serialized, /paid product ready/i);
    assert.doesNotMatch(serialized, /V2\.2 complete/i);
    assert.doesNotMatch(serialized, /V3\.0 released/i);

    assert.doesNotMatch(serialized, /Context law/i);
    assert.doesNotMatch(serialized, /Plan law/i);
    assert.doesNotMatch(serialized, /Confirm law/i);
    assert.doesNotMatch(serialized, /Trace law/i);
    assert.doesNotMatch(serialized, /Core law/i);
    assert.doesNotMatch(serialized, /State Sync law/i);
    assert.doesNotMatch(serialized, /Transaction law/i);
    assert.doesNotMatch(serialized, /Security omission law/i);
    assert.doesNotMatch(serialized, /Observability evidence law/i);
    assert.doesNotMatch(serialized, /Protocol Versioning posture/i);
    assert.doesNotMatch(serialized, /Object\/export binding semantics/i);
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
