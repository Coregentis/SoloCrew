import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  create_review_packet_export_from_workspace,
} from "../../app/review-packets/review-packet-exporter.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";

test("[v2.2] review packet export remains local review-only and avoids forbidden capability claims", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-review-boundary-"));

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace } = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: "workspace-review-boundary-001",
      workspace_label: "Review boundary workspace",
      storage_root: temp_root,
      initial_request: "Generate a local review-only packet.",
      created_at: "2026-04-28T00:00:00.000Z",
    });
    const export_packet = create_review_packet_export_from_workspace({
      workspace,
      export_id: "review-packet-boundary-001",
      exported_at: "2026-04-28T00:30:00.000Z",
      output_directory: join(temp_root, "exports"),
    });
    const serialized = JSON.stringify(export_packet);

    assert.equal(export_packet.boundary_flags.non_executing, true);
    assert.equal(export_packet.boundary_flags.no_provider_dispatch, true);
    assert.equal(export_packet.boundary_flags.no_channel_dispatch, true);
    assert.equal(export_packet.boundary_flags.no_marketplace_implementation, true);
    assert.equal(export_packet.boundary_flags.no_autonomous_execution, true);
    assert.equal(export_packet.boundary_flags.runtime_private_fields_omitted, true);

    assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
    assert.doesNotMatch(serialized, /raw_state_store_payload/i);
    assert.doesNotMatch(serialized, /raw_transaction_store_payload/i);
    assert.doesNotMatch(serialized, /raw_error_payload/i);
    assert.doesNotMatch(serialized, /provider_dispatch_payload/i);
    assert.doesNotMatch(serialized, /channel_dispatch_payload/i);
    assert.doesNotMatch(serialized, /marketplace resolver/i);
    assert.doesNotMatch(serialized, /marketplace install/i);
    assert.doesNotMatch(serialized, /executable action instruction/i);
    assert.doesNotMatch(serialized, /MPLP certification/i);
    assert.doesNotMatch(serialized, /MPLP endorsement/i);
    assert.doesNotMatch(serialized, /paid product ready/i);
    assert.doesNotMatch(serialized, /V2\.2 complete/i);
    assert.doesNotMatch(serialized, /V3\.0 released/i);
    assert.doesNotMatch(serialized, /PDF export/i);
    assert.doesNotMatch(serialized, /SaaS sharing/i);
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
