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
import {
  create_v2_2_founder_dashboard_continuation_page_model,
} from "../../app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";

test("[v2.2] founder dashboard consumes workspace CGOS posture refs and bounded summaries", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-dashboard-cgos-"));

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace } = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: "workspace-dashboard-cgos-001",
      workspace_label: "Dashboard CGOS workspace",
      storage_root: temp_root,
      initial_request: "Continue from consumed CGOS posture refs.",
      created_at: "2026-04-28T00:00:00.000Z",
    });
    const export_packet = create_review_packet_export_from_workspace({
      workspace,
      export_id: "dashboard-cgos-review-packet-001",
      exported_at: "2026-04-28T00:50:00.000Z",
      output_directory: join(temp_root, "exports"),
    });
    const model = create_v2_2_founder_dashboard_continuation_page_model({
      workspace,
      latest_review_packet_export: export_packet,
      generated_at: "2026-04-28T00:55:00.000Z",
    });
    const cgos = workspace.cgos_consumption;

    assert.equal(
      model.cgos_summary?.projection_safe_runtime_envelope_ref,
      cgos.projection_safe_runtime_envelope_ref.ref_id
    );
    assert.equal(
      model.cgos_summary?.state_snapshot_posture_ref,
      cgos.state_snapshot_posture_ref.ref_id
    );
    assert.equal(
      model.cgos_summary?.transaction_export_posture_ref,
      cgos.transaction_export_posture_ref.ref_id
    );
    assert.equal(
      model.cgos_summary?.error_insufficiency_posture_ref,
      cgos.error_insufficiency_posture_ref.ref_id
    );
    assert.deepEqual(
      [...(model.cgos_summary?.required_module_posture_names ?? [])].sort(),
      [...REQUIRED_V2_2_MODULE_POSTURE_NAMES].sort()
    );
    assert.deepEqual(
      [...(model.cgos_summary?.required_kernel_duty_ids ?? [])].sort(),
      [...REQUIRED_V2_2_KERNEL_DUTY_IDS].sort()
    );
    assert.deepEqual(
      model.cgos_summary?.safe_evidence_refs,
      cgos.safe_evidence_refs.map((entry) => entry.evidence_ref).sort()
    );
    assert.deepEqual(
      model.cgos_summary?.omission_markers,
      cgos.omission_markers.map((entry) => entry.marker).sort()
    );
    assert.ok((model.cgos_summary?.protocol_version_refs.length ?? 0) >= 1);
    assert.ok((model.cgos_summary?.binding_version_refs.length ?? 0) >= 1);
    assert.equal(model.cgos_summary?.runtime_private_fields_omitted, true);

    assert.ok(
      model.diagnostic_refs.some(
        (ref) =>
          ref.ref_kind === "cgos_projection_envelope" &&
          ref.ref_id === cgos.projection_safe_runtime_envelope_ref.ref_id
      )
    );
    assert.ok(
      model.diagnostic_refs.some((ref) => ref.ref_kind === "protocol_version")
    );
    assert.ok(
      model.diagnostic_refs.some((ref) => ref.ref_kind === "binding_version")
    );
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] founder dashboard does not redefine upstream CGOS or MPLP law", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-dashboard-cgos-"));

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace } = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: "workspace-dashboard-cgos-002",
      workspace_label: "Dashboard CGOS law boundary workspace",
      storage_root: temp_root,
      initial_request: "Keep dashboard posture consumption bounded.",
      created_at: "2026-04-28T00:00:00.000Z",
    });
    const model = create_v2_2_founder_dashboard_continuation_page_model({
      workspace,
      generated_at: "2026-04-28T01:00:00.000Z",
    });
    const serialized = JSON.stringify(model);

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
