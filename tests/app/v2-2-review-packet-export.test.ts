import assert from "node:assert/strict";
import {
  existsSync,
  mkdtempSync,
  readFileSync,
  rmSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  REQUIRED_V2_2_KERNEL_DUTY_IDS,
  REQUIRED_V2_2_MODULE_POSTURE_NAMES,
} from "../../app/cgos/cgos-projection-safe-consumption-contract.ts";
import {
  create_review_packet_export,
  export_review_packet_to_local_files,
} from "../../app/review-packets/review-packet-exporter.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  append_workspace_request_history_event,
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";

function create_workspace_for_export(temp_root: string) {
  const store = loadWorkspaceStore({
    storage_path: join(temp_root, "workspaces.json"),
  });
  const { workspace } = create_v2_2_workspace_with_cgos_consumption({
    store,
    workspace_id: "workspace-review-export-001",
    workspace_label: "Review export workspace",
    storage_root: temp_root,
    initial_request:
      "Prepare repo release, architecture review, and governance preparation.",
    created_at: "2026-04-28T00:00:00.000Z",
  });

  append_workspace_request_history_event({
    store,
    workspace_id: workspace.workspace_id,
    event_id: "workspace-review-export-001:0003:review_context",
    occurred_at: "2026-04-28T00:10:00.000Z",
    request_summary: "Add project governance review context for local packet.",
    latest_step: "review_context_saved",
  });

  return {
    store,
    workspace: store.load_workspace(workspace.workspace_id),
  };
}

test("[v2.2] local review packet export is deterministic and consumes workspace CGOS posture", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-review-export-"));

  try {
    const { workspace } = create_workspace_for_export(temp_root);
    const input = {
      workspace,
      export_id: "review-packet-export-001",
      exported_at: "2026-04-28T00:20:00.000Z",
      output_directory: join(temp_root, "exports"),
    };

    const first = create_review_packet_export(input);
    const second = create_review_packet_export(input);

    assert.deepEqual(first, second);
    assert.equal(first.manifest.boundary_flags.local_only, true);
    assert.equal(first.manifest.boundary_flags.review_only, true);
    assert.equal(first.manifest.boundary_flags.non_executing, true);
    assert.equal(first.manifest.boundary_flags.no_provider_dispatch, true);
    assert.equal(first.manifest.boundary_flags.no_channel_dispatch, true);
    assert.equal(first.manifest.boundary_flags.no_marketplace_implementation, true);
    assert.equal(first.manifest.boundary_flags.no_autonomous_execution, true);
    assert.equal(first.manifest.boundary_flags.not_execution_packet, true);
    assert.equal(first.manifest.runtime_private_fields_omitted, true);

    assert.deepEqual(
      [...first.manifest.cgos_consumption.required_module_posture_names].sort(),
      [...REQUIRED_V2_2_MODULE_POSTURE_NAMES].sort()
    );
    assert.deepEqual(
      [...first.manifest.cgos_consumption.required_kernel_duty_ids].sort(),
      [...REQUIRED_V2_2_KERNEL_DUTY_IDS].sort()
    );
    assert.ok(first.markdown.includes("projection_safe_runtime_envelope_ref"));
    assert.ok(first.markdown.includes("state_snapshot_posture_ref"));
    assert.ok(first.markdown.includes("transaction_export_posture_ref"));
    assert.ok(first.markdown.includes("error_insufficiency_posture_ref"));
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
test("[v2.2] local review packet export writes markdown and manifest and appends safe history event", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-review-export-"));

  try {
    const { store, workspace } = create_workspace_for_export(temp_root);
    const result = export_review_packet_to_local_files({
      store,
      workspace,
      export_id: "review-packet-export-002",
      exported_at: "2026-04-28T00:25:00.000Z",
      output_directory: join(temp_root, "exports"),
    });

    assert.equal(existsSync(result.manifest.local_file_refs.markdown_path), true);
    assert.equal(existsSync(result.manifest.local_file_refs.manifest_path), true);

    const markdown = readFileSync(
      result.manifest.local_file_refs.markdown_path,
      "utf8"
    );
    const manifest = JSON.parse(
      readFileSync(result.manifest.local_file_refs.manifest_path, "utf8")
    );

    assert.equal(markdown, result.markdown);
    assert.equal(manifest.export_id, result.manifest.export_id);
    assert.equal(manifest.boundary_flags.non_executing, true);
    assert.equal(manifest.boundary_flags.not_execution_packet, true);

    const updated_workspace = store.load_workspace(workspace.workspace_id);
    assert.equal(
      updated_workspace.history_events.at(-1)?.event_kind,
      "review_packet_exported"
    );
    assert.equal(updated_workspace.latest_step, "review_packet_exported");
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
