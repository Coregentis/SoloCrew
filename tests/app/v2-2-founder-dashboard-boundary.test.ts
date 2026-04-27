import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

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

function create_dashboard_model(temp_root: string) {
  const store = loadWorkspaceStore({
    storage_path: join(temp_root, "workspaces.json"),
  });
  const { workspace } = create_v2_2_workspace_with_cgos_consumption({
    store,
    workspace_id: "workspace-dashboard-boundary-001",
    workspace_label: "Dashboard boundary workspace",
    storage_root: temp_root,
    initial_request: "Render a safe local continuation dashboard.",
    created_at: "2026-04-28T00:00:00.000Z",
  });
  const export_packet = create_review_packet_export_from_workspace({
    workspace,
    export_id: "dashboard-boundary-review-packet-001",
    exported_at: "2026-04-28T01:05:00.000Z",
    output_directory: join(temp_root, "exports"),
  });

  return create_v2_2_founder_dashboard_continuation_page_model({
    workspace,
    latest_review_packet_export: export_packet,
    generated_at: "2026-04-28T01:10:00.000Z",
  });
}

test("[v2.2] founder dashboard continuation preserves review-only non-executing boundaries", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-dashboard-boundary-"));

  try {
    const model = create_dashboard_model(temp_root);

    assert.equal(model.boundary_flags.non_executing, true);
    assert.equal(model.boundary_flags.no_provider_dispatch, true);
    assert.equal(model.boundary_flags.no_channel_dispatch, true);
    assert.equal(model.boundary_flags.no_marketplace_implementation, true);
    assert.equal(model.boundary_flags.no_autonomous_execution, true);
    assert.equal(model.boundary_flags.no_paid_product_claim, true);
    assert.equal(model.boundary_flags.no_v2_2_completion_claim, true);
    assert.equal(model.boundary_flags.no_mplp_certification, true);
    assert.equal(model.boundary_flags.no_mplp_endorsement, true);
    assert.equal(model.cgos_summary?.runtime_private_fields_omitted, true);
    assert.equal(model.status, "review_packet_exported");
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] founder dashboard continuation exposes no raw private payload or forbidden claim", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-dashboard-boundary-"));

  try {
    const model = create_dashboard_model(temp_root);
    const serialized = JSON.stringify(model);

    assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
    assert.doesNotMatch(serialized, /raw Cognitive_OS runtime-private payload/i);
    assert.doesNotMatch(serialized, /provider_dispatch_payload/i);
    assert.doesNotMatch(serialized, /channel_dispatch_payload/i);
    assert.doesNotMatch(serialized, /marketplace implemented/i);
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
