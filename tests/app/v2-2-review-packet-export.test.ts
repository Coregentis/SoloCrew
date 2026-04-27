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
  create_review_packet_export_from_workspace,
  load_review_packet_export,
  render_review_packet_markdown,
} from "../../app/review-packets/review-packet-exporter.ts";
import {
  export_review_packet_for_workspace,
} from "../../app/review-packets/review-packet-workflow.ts";
import { loadWorkspaceStore } from "../../app/workspaces/workspace-store.ts";
import {
  append_workspace_request_history_event,
  create_v2_2_workspace_with_cgos_consumption,
} from "../../app/workspaces/workspace-workflow.ts";
import {
  createV22PrivateAlphaReviewPacketFixture,
} from "../../projection/fixtures/v2-2-private-alpha-review-packet-fixture.ts";

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

test("[v2.2] review packet export can be created from a workspace deterministically", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-review-export-"));

  try {
    const { workspace } = create_workspace_for_export(temp_root);
    const input = {
      workspace,
      export_id: "review-packet-export-001",
      exported_at: "2026-04-28T00:20:00.000Z",
      output_directory: join(temp_root, "exports"),
    };
    const first = create_review_packet_export_from_workspace(input);
    const second = create_review_packet_export_from_workspace(input);
    const first_markdown = render_review_packet_markdown(first);
    const second_markdown = render_review_packet_markdown(second);

    assert.deepEqual(first, second);
    assert.equal(first_markdown, second_markdown);
    assert.equal(first.workspace_id, workspace.workspace_id);
    assert.equal(first.journey_id, workspace.active_journey_id);
    assert.equal(first.primary_vertical, "development_company_project_governance");
    assert.match(first.request_summary, /Prepare repo release/);
    assert.match(first.review_chain_summary, /V2\.1 review-only chain/);
    assert.match(first.secretary_routing_summary, /SecretaryRoutingProposal/);
    assert.match(first.management_directive_summary, /ManagementDirective/);
    assert.match(first.cell_ceo_assembly_summary, /CellCEOAssemblyPlanPreview/);
    assert.match(
      first.project_governance_mapping_summary,
      /ProjectGovernanceAssetFamilyMapping/
    );
    assert.equal(first.status, "exported");
    assert.equal(first.boundary_flags.non_executing, true);
    assert.equal(first.boundary_flags.runtime_private_fields_omitted, true);
    assert.ok(first_markdown.includes("## Consumed CGOS Posture"));
    assert.ok(first_markdown.includes("projection_safe_runtime_envelope_ref"));
    assert.ok(first_markdown.includes("## Next Review Action"));
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] review packet workflow writes deterministic JSON and Markdown and records workspace history", () => {
  const temp_root = mkdtempSync(join(tmpdir(), "solocrew-v2-2-review-export-"));

  try {
    const { store, workspace } = create_workspace_for_export(temp_root);
    const result = export_review_packet_for_workspace({
      store,
      workspace_id: workspace.workspace_id,
      export_id: "review-packet-export-002",
      exported_at: "2026-04-28T00:25:00.000Z",
      output_directory: join(temp_root, "exports"),
    });

    assert.equal(existsSync(result.export_packet.json_export_path), true);
    assert.equal(existsSync(result.export_packet.markdown_export_path), true);
    assert.equal(
      readFileSync(result.export_packet.markdown_export_path, "utf8"),
      result.markdown
    );

    const loaded_export = load_review_packet_export(
      result.export_packet.json_export_path
    );
    assert.deepEqual(loaded_export, result.export_packet);
    assert.equal(
      readFileSync(result.export_packet.json_export_path, "utf8"),
      `${JSON.stringify(result.export_packet, null, 2)}\n`
    );

    const updated_workspace = store.load_workspace(workspace.workspace_id);
    assert.equal(updated_workspace.latest_step, "review_packet_exported");
    assert.equal(updated_workspace.next_review_action, "review_local_packet_with_human");
    assert.equal(
      updated_workspace.history_events.at(-1)?.event_kind,
      "review_packet_exported"
    );
  } finally {
    rmSync(temp_root, { recursive: true, force: true });
  }
});

test("[v2.2] private-alpha review packet fixture is deterministic and local", () => {
  const fixture = createV22PrivateAlphaReviewPacketFixture(
    ".solocrew/review-packets"
  );

  assert.equal(fixture.primary_vertical, "development_company_project_governance");
  assert.match(fixture.request_summary, /repo release/);
  assert.match(fixture.request_summary, /architecture review/);
  assert.match(fixture.request_summary, /governance preparation/);
  assert.equal(fixture.boundary_flags.non_executing, true);
  assert.equal(fixture.status, "exported");
  assert.match(fixture.json_export_path, /\.json$/);
  assert.match(fixture.markdown_export_path, /\.md$/);
});
