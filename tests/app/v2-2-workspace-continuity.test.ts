import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  REQUIRED_V2_2_KERNEL_DUTY_IDS,
  REQUIRED_V2_2_MODULE_POSTURE_NAMES,
} from "../../app/cgos/cgos-projection-safe-consumption-contract.ts";
import {
  append_workspace_request_history_event,
  create_v2_2_workspace_with_cgos_consumption,
  restore_workspace_continuation,
} from "../../app/workspaces/workspace-workflow.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  createV22PrivateAlphaWorkspaceFixture,
  V2_2_PRIVATE_ALPHA_WORKSPACE_ID,
} from "../../projection/fixtures/v2-2-private-alpha-workspace-fixture.ts";

test("[v2.2] workspace can be created, saved, listed, loaded, and restored", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-workspace-"));
  const store_path = join(temp_root, "workspaces.json");

  try {
    const store = loadWorkspaceStore({ storage_path: store_path });
    const result = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: "workspace-continuity-001",
      workspace_label: "Continuity workspace",
      storage_root: temp_root,
      initial_request:
        "Prepare architecture review and governance continuation.",
      created_at: "2026-04-28T00:00:00.000Z",
    });

    assert.equal(result.workspace.workspace_id, "workspace-continuity-001");
    assert.equal(result.workspace.primary_vertical, "development_company_project_governance");
    assert.equal(result.workspace.boundary_flags.non_executing, true);
    assert.equal(result.workspace.review_packet_export_implemented, false);
    assert.equal(
      result.workspace.founder_dashboard_continuation_implemented,
      false
    );

    append_workspace_request_history_event({
      store,
      workspace_id: result.workspace.workspace_id,
      event_id: "workspace-continuity-001:0003:user_request",
      occurred_at: "2026-04-28T00:05:00.000Z",
      request_summary: "Continue with saved workspace history only.",
      latest_step: "workspace_history_saved",
    });

    const listed = store.list_workspaces();
    assert.equal(listed.length, 1);
    assert.equal(listed[0]?.workspace_id, result.workspace.workspace_id);

    const loaded = store.load_workspace(result.workspace.workspace_id);
    assert.equal(loaded.history_events.length, 3);
    assert.deepEqual(
      loaded.history_events.map((event) => event.event_id),
      [
        "workspace-continuity-001:0001:workspace_created",
        "workspace-continuity-001:0002:v2_1_review_chain_placeholder",
        "workspace-continuity-001:0003:user_request",
      ]
    );

    const continuation = restore_workspace_continuation({
      store,
      workspace_id: result.workspace.workspace_id,
    });
    assert.equal(continuation.latest_step, "workspace_history_saved");
    assert.equal(continuation.non_executing, true);
    assert.equal(continuation.runtime_private_fields_omitted, true);

    assert.deepEqual(
      [...loaded.cgos_consumption.required_module_posture_names].sort(),
      [...REQUIRED_V2_2_MODULE_POSTURE_NAMES].sort()
    );
    assert.deepEqual(
      [...loaded.cgos_consumption.required_kernel_duty_ids].sort(),
      [...REQUIRED_V2_2_KERNEL_DUTY_IDS].sort()
    );
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] private-alpha workspace fixture can be loaded and restored", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-fixture-"));
  const store_path = join(temp_root, "workspaces.json");

  try {
    const store = loadWorkspaceStore({ storage_path: store_path });
    const fixture = createV22PrivateAlphaWorkspaceFixture(temp_root);
    store.create_workspace(fixture);

    const loaded = store.load_workspace(V2_2_PRIVATE_ALPHA_WORKSPACE_ID);
    assert.equal(loaded.workspace_id, V2_2_PRIVATE_ALPHA_WORKSPACE_ID);
    assert.equal(loaded.boundary_flags.no_autonomous_execution, true);
    assert.equal(loaded.boundary_flags.no_provider_dispatch, true);
    assert.equal(loaded.boundary_flags.no_channel_dispatch, true);
    assert.equal(loaded.boundary_flags.no_marketplace_implementation, true);
    assert.equal(loaded.review_packet_export_implemented, false);

    const continuation = store.restore_latest_workspace_continuation(
      V2_2_PRIVATE_ALPHA_WORKSPACE_ID
    );
    assert.equal(continuation.active_journey_id, loaded.active_journey_id);
    assert.equal(continuation.non_executing, true);
    assert.equal(continuation.runtime_private_fields_omitted, true);
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
