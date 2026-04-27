import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  create_v2_2_founder_dashboard_continuation_page_model,
} from "../../app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts";
import {
  create_review_packet_export_from_workspace,
} from "../../app/review-packets/review-packet-exporter.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  append_workspace_request_history_event,
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";
import {
  createV22FounderDashboardContinuationFixture,
} from "../../projection/fixtures/v2-2-founder-dashboard-continuation-fixture.ts";

function create_dashboard_workspace(temp_root: string) {
  const store = loadWorkspaceStore({
    storage_path: join(temp_root, "workspaces.json"),
  });
  const { workspace } = create_v2_2_workspace_with_cgos_consumption({
    store,
    workspace_id: "workspace-dashboard-001",
    workspace_label: "Dashboard continuation workspace",
    storage_root: temp_root,
    initial_request:
      "Prepare repo release, architecture review, and governance preparation.",
    created_at: "2026-04-28T00:00:00.000Z",
  });

  append_workspace_request_history_event({
    store,
    workspace_id: workspace.workspace_id,
    event_id: "workspace-dashboard-001:0003:dashboard_context",
    occurred_at: "2026-04-28T00:12:00.000Z",
    request_summary: "Save dashboard continuation context.",
    latest_step: "dashboard_context_saved",
  });

  return {
    store,
    workspace: store.load_workspace(workspace.workspace_id),
  };
}

test("[v2.2] founder dashboard continuation page model can summarize a saved workspace", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-dashboard-"));

  try {
    const { store, workspace } = create_dashboard_workspace(temp_root);
    const model = create_v2_2_founder_dashboard_continuation_page_model({
      store,
      workspace_id: workspace.workspace_id,
      generated_at: "2026-04-28T00:30:00.000Z",
    });

    assert.equal(model.page_id, "v2_2_founder_dashboard_continuation");
    assert.equal(model.generated_at, "2026-04-28T00:30:00.000Z");
    assert.equal(model.status, "workspace_available");
    assert.equal(model.workspace_summary?.workspace_id, workspace.workspace_id);
    assert.equal(
      model.workspace_summary?.workspace_label,
      "Dashboard continuation workspace"
    );
    assert.equal(
      model.workspace_summary?.primary_vertical,
      "development_company_project_governance"
    );
    assert.equal(model.workspace_summary?.active_journey_id, workspace.active_journey_id);
    assert.equal(model.workspace_summary?.latest_step, "dashboard_context_saved");
    assert.equal(model.workspace_summary?.next_review_action, workspace.next_review_action);
    assert.equal(model.workspace_summary?.history_event_count, 3);
    assert.equal(model.review_packet_summary, null);
    assert.match(model.user_facing_summary, /Saved workspace/);
    assert.match(model.user_facing_summary, /dashboard_context_saved/);
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] founder dashboard continuation page model includes latest local review packet status", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-dashboard-"));

  try {
    const { workspace } = create_dashboard_workspace(temp_root);
    const export_packet = create_review_packet_export_from_workspace({
      workspace,
      export_id: "dashboard-review-packet-001",
      exported_at: "2026-04-28T00:35:00.000Z",
      output_directory: join(temp_root, "exports"),
    });
    const model = create_v2_2_founder_dashboard_continuation_page_model({
      workspace,
      latest_review_packet_export: export_packet,
      generated_at: "2026-04-28T00:40:00.000Z",
    });

    assert.equal(model.status, "review_packet_exported");
    assert.equal(model.review_packet_summary?.export_id, export_packet.export_id);
    assert.equal(model.review_packet_summary?.status, "exported");
    assert.equal(
      model.review_packet_summary?.json_export_path,
      export_packet.json_export_path
    );
    assert.equal(
      model.review_packet_summary?.markdown_export_path,
      export_packet.markdown_export_path
    );
    assert.equal(model.review_packet_summary?.exported_at, export_packet.exported_at);
    assert.equal(
      model.review_packet_summary?.request_summary,
      export_packet.request_summary
    );
    assert.equal(
      model.review_packet_summary?.next_review_action,
      export_packet.next_review_action
    );
    assert.match(model.user_facing_summary, /local review packet available/);
    assert.ok(
      model.diagnostic_refs.some(
        (ref) =>
          ref.ref_kind === "review_packet" &&
          ref.ref_id === export_packet.export_id
      )
    );
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] founder dashboard continuation handles no-workspace and fixture cases deterministically", () => {
  const no_workspace = create_v2_2_founder_dashboard_continuation_page_model({
    generated_at: "2026-04-28T00:45:00.000Z",
  });
  assert.equal(no_workspace.status, "no_workspace");
  assert.equal(no_workspace.workspace_summary, null);
  assert.equal(no_workspace.review_packet_summary, null);
  assert.equal(no_workspace.cgos_summary, null);
  assert.equal(no_workspace.diagnostic_refs.length, 0);

  const first_fixture = createV22FounderDashboardContinuationFixture();
  const second_fixture = createV22FounderDashboardContinuationFixture();
  assert.deepEqual(first_fixture, second_fixture);
  assert.equal(first_fixture.status, "review_packet_exported");
  assert.equal(first_fixture.boundary_flags.non_executing, true);
  assert.equal(
    first_fixture.workspace_summary?.primary_vertical,
    "development_company_project_governance"
  );
});
