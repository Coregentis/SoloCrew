import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  create_review_packet_export_from_workspace,
  render_review_packet_markdown,
} from "../../app/review-packets/review-packet-exporter.ts";
import {
  create_v2_2_founder_dashboard_continuation_page_model,
} from "../../app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  append_workspace_request_history_event,
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";
import {
  createV22PrivateAlphaJourneyFixture,
} from "../../projection/fixtures/v2-2-private-alpha-journey-fixture.ts";

function run_logical_private_alpha_journey(temp_root: string) {
  const fixture = createV22PrivateAlphaJourneyFixture();
  const store = loadWorkspaceStore({
    storage_path: join(temp_root, "workspaces.json"),
  });
  const { workspace } = create_v2_2_workspace_with_cgos_consumption({
    store,
    workspace_id: fixture.workspace.workspace_id,
    workspace_label: fixture.workspace.workspace_label,
    storage_root: fixture.workspace.storage_root,
    initial_request: fixture.workspace.initial_request,
    created_at: fixture.workspace.created_at,
  });

  for (const event of fixture.history_events) {
    append_workspace_request_history_event({
      store,
      workspace_id: workspace.workspace_id,
      event_id: event.event_id,
      occurred_at: event.occurred_at,
      request_summary: event.request_summary,
      latest_step: event.latest_step,
    });
  }

  const updated_workspace = store.load_workspace(workspace.workspace_id);
  const review_packet = create_review_packet_export_from_workspace({
    workspace: updated_workspace,
    export_id: fixture.review_packet_export.export_id,
    exported_at: fixture.review_packet_export.exported_at,
    output_directory: fixture.review_packet_export.output_directory,
  });
  const markdown = render_review_packet_markdown(review_packet);
  const dashboard = create_v2_2_founder_dashboard_continuation_page_model({
    workspace: updated_workspace,
    latest_review_packet_export: review_packet,
    generated_at: fixture.dashboard_continuation.generated_at,
  });

  return {
    workspace: updated_workspace,
    history_event_ids: updated_workspace.history_events.map(
      (event) => event.event_id
    ),
    review_packet_json: JSON.stringify(review_packet, null, 2),
    review_packet_markdown: markdown,
    dashboard,
    dashboard_diagnostic_refs: dashboard.diagnostic_refs.map(
      (ref) => `${ref.ref_kind}:${ref.ref_id}`
    ),
    module_refs: dashboard.cgos_summary?.required_module_posture_names ?? [],
    duty_refs: dashboard.cgos_summary?.required_kernel_duty_ids ?? [],
  };
}

test("[v2.2 e2e] private-alpha journey is deterministic with explicit ids and timestamps", () => {
  const first_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-determinism-a-"));
  const second_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-determinism-b-"));

  try {
    const first = run_logical_private_alpha_journey(first_root);
    const second = run_logical_private_alpha_journey(second_root);

    assert.equal(first.review_packet_json, second.review_packet_json);
    assert.equal(first.review_packet_markdown, second.review_packet_markdown);
    assert.deepEqual(first.dashboard, second.dashboard);
    assert.deepEqual(first.history_event_ids, second.history_event_ids);
    assert.deepEqual(
      first.history_event_ids,
      [...first.history_event_ids].sort()
    );
    assert.deepEqual(first.dashboard_diagnostic_refs, second.dashboard_diagnostic_refs);
    assert.deepEqual(
      first.dashboard_diagnostic_refs,
      [...first.dashboard_diagnostic_refs].sort()
    );
    assert.deepEqual(first.module_refs, second.module_refs);
    assert.deepEqual(first.duty_refs, second.duty_refs);
    assert.deepEqual(first.module_refs, ["Context", "Core", "Trace", "Plan", "Confirm"]);
    assert.deepEqual(first.duty_refs, ["KD-02", "KD-05", "KD-08", "KD-09", "KD-10", "KD-11"]);
    assert.equal(first.workspace.created_at, "2026-04-28T02:00:00.000Z");
    assert.equal(first.workspace.updated_at, "2026-04-28T02:05:00.000Z");
    assert.equal(first.dashboard.generated_at, "2026-04-28T02:15:00.000Z");
  } finally {
    rmSync(first_root, { recursive: true, force: true });
    rmSync(second_root, { recursive: true, force: true });
  }
});
