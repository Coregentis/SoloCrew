import assert from "node:assert/strict";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import test from "node:test";

import {
  export_review_packet_for_workspace,
} from "../../app/review-packets/review-packet-workflow.ts";
import {
  create_v2_2_founder_dashboard_continuation_page_model,
} from "../../app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  append_workspace_request_history_event,
  create_v2_2_workspace_with_cgos_consumption,
  restore_workspace_continuation,
} from "../../app/workspaces/workspace-workflow.ts";
import {
  createV22PrivateAlphaJourneyFixture,
} from "../../projection/fixtures/v2-2-private-alpha-journey-fixture.ts";

test("[v2.2 e2e] private-alpha journey serialized output preserves hard boundaries", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-boundary-e2e-"));
  const fixture = createV22PrivateAlphaJourneyFixture();

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace } = create_v2_2_workspace_with_cgos_consumption({
      store,
      workspace_id: fixture.workspace.workspace_id,
      workspace_label: fixture.workspace.workspace_label,
      storage_root: join(temp_root, "workspace-records"),
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

    const continuation = restore_workspace_continuation({
      store,
      workspace_id: workspace.workspace_id,
    });
    const export_result = export_review_packet_for_workspace({
      store,
      workspace_id: workspace.workspace_id,
      export_id: fixture.review_packet_export.export_id,
      exported_at: fixture.review_packet_export.exported_at,
      output_directory: join(temp_root, "review-packets"),
    });
    const exported_workspace = store.load_workspace(workspace.workspace_id);
    const dashboard =
      create_v2_2_founder_dashboard_continuation_page_model({
        workspace: exported_workspace,
        latest_review_packet_export: export_result.export_packet,
        generated_at: fixture.dashboard_continuation.generated_at,
      });

    const full_journey_output = [
      JSON.stringify(exported_workspace),
      JSON.stringify(continuation),
      JSON.stringify(export_result.export_packet),
      export_result.markdown,
      JSON.stringify(dashboard),
      JSON.stringify(fixture),
    ].join("\n---\n");

    assert.doesNotMatch(full_journey_output, /raw_runtime_private_payload/i);
    assert.doesNotMatch(full_journey_output, /raw_state_store_payload/i);
    assert.doesNotMatch(full_journey_output, /raw_transaction_store_payload/i);
    assert.doesNotMatch(full_journey_output, /raw_error_payload/i);
    assert.doesNotMatch(full_journey_output, /provider_dispatch_payload/i);
    assert.doesNotMatch(full_journey_output, /channel_dispatch_payload/i);
    assert.doesNotMatch(full_journey_output, /marketplace resolver/i);
    assert.doesNotMatch(full_journey_output, /marketplace install/i);
    assert.doesNotMatch(full_journey_output, /executable action instruction/i);
    assert.doesNotMatch(full_journey_output, /autonomous execution enabled/i);
    assert.doesNotMatch(full_journey_output, /paid product ready/i);
    assert.doesNotMatch(full_journey_output, /V2\.2 complete/i);
    assert.doesNotMatch(full_journey_output, /V3\.0 released/i);
    assert.doesNotMatch(full_journey_output, /MPLP certification/i);
    assert.doesNotMatch(full_journey_output, /MPLP endorsement/i);
    assert.doesNotMatch(full_journey_output, /PDF export/i);
    assert.doesNotMatch(full_journey_output, /SaaS sharing/i);
    assert.doesNotMatch(full_journey_output, /Context law/i);
    assert.doesNotMatch(full_journey_output, /Plan law/i);
    assert.doesNotMatch(full_journey_output, /Confirm law/i);
    assert.doesNotMatch(full_journey_output, /Trace law/i);
    assert.doesNotMatch(full_journey_output, /Core law/i);
    assert.doesNotMatch(full_journey_output, /State Sync law/i);
    assert.doesNotMatch(full_journey_output, /Transaction law/i);
    assert.doesNotMatch(full_journey_output, /Security omission law/i);
    assert.doesNotMatch(full_journey_output, /Observability evidence law/i);
    assert.doesNotMatch(full_journey_output, /Protocol Versioning posture/i);
    assert.doesNotMatch(full_journey_output, /Object\/export binding semantics/i);

    assert.equal(exported_workspace.boundary_flags.no_provider_dispatch, true);
    assert.equal(exported_workspace.boundary_flags.no_channel_dispatch, true);
    assert.equal(
      exported_workspace.boundary_flags.no_marketplace_implementation,
      true
    );
    assert.equal(exported_workspace.boundary_flags.no_autonomous_execution, true);
    assert.equal(export_result.export_packet.boundary_flags.non_executing, true);
    assert.equal(dashboard.boundary_flags.non_executing, true);
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
