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
  create_review_packet_export_from_workspace,
} from "../../app/review-packets/review-packet-exporter.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";

test("[v2.2] review packet export consumes workspace CGOS posture refs without redefining them", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-review-cgos-"));

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace } = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: "workspace-review-cgos-001",
      workspace_label: "Review CGOS workspace",
      storage_root: temp_root,
      initial_request: "Prepare review packet with consumed CGOS posture.",
      created_at: "2026-04-28T00:00:00.000Z",
    });
    const export_packet = create_review_packet_export_from_workspace({
      workspace,
      export_id: "review-packet-cgos-001",
      exported_at: "2026-04-28T00:35:00.000Z",
      output_directory: join(temp_root, "exports"),
    });

    assert.strictEqual(
      export_packet.cgos_consumption,
      workspace.cgos_consumption
    );
    assert.deepEqual(
      [...export_packet.cgos_consumption.required_module_posture_names].sort(),
      [...REQUIRED_V2_2_MODULE_POSTURE_NAMES].sort()
    );
    assert.deepEqual(
      [...export_packet.cgos_consumption.required_kernel_duty_ids].sort(),
      [...REQUIRED_V2_2_KERNEL_DUTY_IDS].sort()
    );
    assert.deepEqual(
      export_packet.safe_evidence_refs,
      workspace.cgos_consumption.safe_evidence_refs
        .map((entry) => entry.evidence_ref)
        .sort()
    );
    assert.deepEqual(
      export_packet.omission_markers,
      workspace.cgos_consumption.omission_markers
        .map((entry) => entry.marker)
        .sort()
    );
    assert.ok(export_packet.protocol_version_refs.length >= 1);
    assert.ok(export_packet.binding_version_refs.length >= 1);

    const serialized = JSON.stringify(export_packet);
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
