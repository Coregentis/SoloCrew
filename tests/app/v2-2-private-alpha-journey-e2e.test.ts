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
  export_review_packet_for_workspace,
  load_exported_review_packet,
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

test("[v2.2 e2e] private-alpha journey runs workspace to review packet to dashboard continuation", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-journey-e2e-"));
  const fixture = createV22PrivateAlphaJourneyFixture();

  try {
    const store = loadWorkspaceStore({
      storage_path: join(temp_root, "workspaces.json"),
    });
    const { workspace: created_workspace } =
      create_v2_2_workspace_with_cgos_consumption({
        store,
        workspace_id: fixture.workspace.workspace_id,
        workspace_label: fixture.workspace.workspace_label,
        storage_root: join(temp_root, "workspace-records"),
        initial_request: fixture.workspace.initial_request,
        created_at: fixture.workspace.created_at,
      });

    assert.equal(created_workspace.workspace_id, fixture.workspace.workspace_id);
    assert.equal(created_workspace.boundary_flags.non_executing, true);
    assert.deepEqual(
      [...created_workspace.cgos_consumption.required_module_posture_names].sort(),
      [...REQUIRED_V2_2_MODULE_POSTURE_NAMES].sort()
    );
    assert.deepEqual(
      [...created_workspace.cgos_consumption.required_kernel_duty_ids].sort(),
      [...REQUIRED_V2_2_KERNEL_DUTY_IDS].sort()
    );

    for (const event of fixture.history_events) {
      append_workspace_request_history_event({
        store,
        workspace_id: created_workspace.workspace_id,
        event_id: event.event_id,
        occurred_at: event.occurred_at,
        request_summary: event.request_summary,
        latest_step: event.latest_step,
      });
    }

    const continuation = restore_workspace_continuation({
      store,
      workspace_id: created_workspace.workspace_id,
    });
    assert.equal(continuation.latest_step, "private_alpha_request_saved");
    assert.equal(continuation.non_executing, true);
    assert.equal(continuation.runtime_private_fields_omitted, true);
    assert.deepEqual(
      continuation.cgos_consumption,
      store.load_workspace(created_workspace.workspace_id).cgos_consumption
    );

    const export_result = export_review_packet_for_workspace({
      store,
      workspace_id: created_workspace.workspace_id,
      export_id: fixture.review_packet_export.export_id,
      exported_at: fixture.review_packet_export.exported_at,
      output_directory: join(temp_root, "review-packets"),
    });
    assert.equal(existsSync(export_result.export_packet.json_export_path), true);
    assert.equal(
      existsSync(export_result.export_packet.markdown_export_path),
      true
    );
    assert.equal(
      readFileSync(export_result.export_packet.markdown_export_path, "utf8"),
      export_result.markdown
    );

    const loaded_export = load_exported_review_packet(
      export_result.export_packet.json_export_path
    );
    assert.deepEqual(loaded_export, export_result.export_packet);
    assert.deepEqual(
      loaded_export.cgos_consumption,
      export_result.export_packet.cgos_consumption
    );

    const exported_workspace = store.load_workspace(created_workspace.workspace_id);
    assert.equal(exported_workspace.latest_step, "review_packet_exported");
    assert.equal(
      exported_workspace.history_events.at(-1)?.event_kind,
      "review_packet_exported"
    );
    assert.equal(
      exported_workspace.history_events.at(-1)?.runtime_private_fields_omitted,
      true
    );

    const dashboard =
      create_v2_2_founder_dashboard_continuation_page_model({
        workspace: exported_workspace,
        latest_review_packet_export: loaded_export,
        generated_at: fixture.dashboard_continuation.generated_at,
      });

    assert.equal(dashboard.status, "review_packet_exported");
    assert.match(dashboard.user_facing_summary, /Saved workspace/);
    assert.equal(dashboard.boundary_flags.non_executing, true);
    assert.equal(dashboard.cgos_summary?.runtime_private_fields_omitted, true);
    assert.deepEqual(
      [...(dashboard.cgos_summary?.required_module_posture_names ?? [])].sort(),
      [...fixture.expected_required_module_posture_names].sort()
    );
    assert.deepEqual(
      [...(dashboard.cgos_summary?.required_kernel_duty_ids ?? [])].sort(),
      [...fixture.expected_required_kernel_duty_ids].sort()
    );

    const diagnostic_kinds = dashboard.diagnostic_refs.map(
      (ref) => ref.ref_kind
    );
    for (const expected_kind of [
      "workspace",
      "review_packet",
      "cgos_projection_envelope",
      "cgos_state_snapshot",
      "cgos_transaction_export",
      "cgos_error_insufficiency",
      "protocol_version",
      "binding_version",
    ]) {
      assert.ok(
        diagnostic_kinds.includes(expected_kind),
        `expected diagnostic ref ${expected_kind}`
      );
    }

    assert.strictEqual(
      dashboard.cgos_summary?.projection_safe_runtime_envelope_ref,
      exported_workspace.cgos_consumption.projection_safe_runtime_envelope_ref.ref_id
    );
    assert.equal(loaded_export.boundary_flags.non_executing, true);
    assert.equal(loaded_export.boundary_flags.runtime_private_fields_omitted, true);
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});
