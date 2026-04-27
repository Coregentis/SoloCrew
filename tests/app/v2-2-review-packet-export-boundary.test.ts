import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  create_review_packet_export,
} from "../../app/review-packets/review-packet-exporter.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";

test("[v2.2] local review packet export stays review-only and does not claim forbidden capabilities", () => {
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
    const result = create_review_packet_export({
      workspace,
      export_id: "review-packet-boundary-001",
      exported_at: "2026-04-28T00:30:00.000Z",
      output_directory: join(temp_root, "exports"),
    });
    const serialized = JSON.stringify(result);

    assert.equal(result.manifest.boundary_flags.not_mplp_certification, true);
    assert.equal(result.manifest.boundary_flags.not_mplp_endorsement, true);
    assert.equal(result.manifest.boundary_flags.not_paid_product_readiness, true);
    assert.equal(result.manifest.boundary_flags.not_v2_2_completion, true);

    assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
    assert.doesNotMatch(serialized, /raw_state_store_payload/i);
    assert.doesNotMatch(serialized, /raw_transaction_store_payload/i);
    assert.doesNotMatch(serialized, /raw_error_payload/i);
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
