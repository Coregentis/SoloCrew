import assert from "node:assert/strict";
import test from "node:test";

import {
  createEngagementSessionHistoryPageModel,
} from "../../app/shell/create-engagement-session-history-page-model.ts";
import {
  create_local_engagement_workspace_from_entry,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  run_local_engagement_loop_review,
} from "../../app/engagement/engagement-loop-runner-workflow.ts";
import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  create_engagement_history_entry,
  create_engagement_session_export_package,
  create_engagement_session_history_from_packet,
} from "../../app/engagement/engagement-session-history-workflow.ts";
import {
  createFounderReviewPacketFixture,
} from "../../projection/fixtures/v3-0-founder-review-packet-fixture.ts";
import {
  createEngagementSessionHistoryFixture,
} from "../../projection/fixtures/v3-0-engagement-session-history-fixture.ts";

function create_packet_result() {
  const entry_result = create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-history-workflow",
    workspace_id: "engagement-workspace-history-workflow",
    session_id: "engagement-session-history-workflow",
    loop_state_id: "engagement-loop-state-history-workflow",
    history_record_id: "engagement-history-record-history-workflow",
    engagement_ref: "engagement-history-workflow",
    participant_refs: ["participant-founder", "participant-reviewer"],
    operator_ref: "participant-founder",
    started_at: "2026-04-30T15:10:00.000Z",
    current_stage: "onboarding",
    commercial_mode: "manual_paid_pilot",
    onboarding_packet_ref: "engagement-onboarding-history-workflow",
    readiness_ref: "engagement-readiness-history-workflow",
    evidence_refs: ["engagement-evidence-history-workflow"],
    review_gate_refs: ["engagement-review-gate-history-workflow"],
    outcome_review_ref: "engagement-outcome-review-history-workflow",
    support_burden_ref: "engagement-support-burden-history-workflow",
  });
  const loop_result = run_local_engagement_loop_review({
    runner_id: "engagement-loop-runner-history-workflow",
    run_id: "engagement-loop-run-history-workflow",
    reviewed_at: "2026-04-30T15:15:00.000Z",
    entry_workspace_result: entry_result,
  });

  return create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-history-workflow",
    loop_result,
  });
}

test("[v3.0] session history creates deterministic local export from non-fixture packet result", () => {
  const packet_result = create_packet_result();
  const result = create_engagement_session_history_from_packet({
    ledger_id: "engagement-history-ledger-workflow",
    export_id: "engagement-session-export-workflow",
    created_at: "2026-04-30T15:20:00.000Z",
    packet_result,
  });

  assert.equal(result.ledger.status, "export_ready");
  assert.equal(result.export_package.status, "ready_for_local_review");
  assert.equal(result.export_package.export_kind, "in_memory_export_object");
  assert.equal(result.ledger.workspace_ref, packet_result.packet.workspace_ref);
  assert.equal(result.ledger.session_ref, packet_result.packet.session_ref);
  assert.equal(result.ledger.latest_packet_ref, packet_result.packet.packet_id);
  assert.deepEqual(
    result.entries.map((entry) => entry.entry_kind),
    [
      "workspace_created",
      "entry_surface_created",
      "loop_run_completed",
      "founder_review_packet_created",
      "export_package_created",
    ]
  );
  assert.deepEqual(result.ledger.entry_refs, result.export_package.history_entry_refs);
});

test("[v3.0] session history fixture uses the same workflow helper shape", () => {
  const packet_fixture = createFounderReviewPacketFixture();
  const fixture = createEngagementSessionHistoryFixture();
  const direct = create_engagement_session_history_from_packet({
    ledger_id: fixture.ledger.ledger_id,
    export_id: fixture.export_package.export_id,
    result_id: fixture.history_result.result_id,
    created_at: "2026-04-30T15:00:00.000Z",
    packet_result: packet_fixture.packet_result,
  });

  assert.deepEqual(direct.ledger, fixture.ledger);
  assert.deepEqual(direct.entries, fixture.entries);
  assert.deepEqual(direct.export_package, fixture.export_package);
});

test("[v3.0] session history blocks missing required refs", () => {
  const packet_result = create_packet_result();
  const missing_ref_packet_result = JSON.parse(JSON.stringify(packet_result));
  missing_ref_packet_result.packet.workspace_ref = null;

  const result = create_engagement_session_history_from_packet({
    ledger_id: "engagement-history-ledger-blocked",
    export_id: "engagement-session-export-blocked",
    created_at: "2026-04-30T15:25:00.000Z",
    packet_result: missing_ref_packet_result,
  });

  assert.equal(result.ledger.status, "blocked");
  assert.equal(result.export_package.status, "blocked");
  assert.equal(result.entries.at(-1)?.entry_kind, "blocked");
  assert.match(result.result_summary, /blocked/);
});

test("[v3.0] session history rejects invalid entry and export values", () => {
  assert.throws(
    () =>
      create_engagement_history_entry({
        entry_id: "invalid-history-entry",
        entry_kind: "cloud_sync_started",
        event_summary: "Invalid entry.",
        created_at: "2026-04-30T15:30:00.000Z",
      }),
    /Unsupported engagement session history entry kind/
  );
  assert.throws(
    () =>
      create_engagement_session_export_package({
        export_id: "invalid-session-export",
        export_kind: "filesystem_export",
        status: "ready_for_local_review",
        ledger_ref: "engagement-history-ledger-invalid",
        export_summary: "Invalid export kind.",
      }),
    /Unsupported engagement session export kind/
  );
});

test("[v3.0] session history page model is pure and local", () => {
  const result = create_engagement_session_history_from_packet({
    ledger_id: "engagement-history-ledger-page",
    export_id: "engagement-session-export-page",
    created_at: "2026-04-30T15:35:00.000Z",
    packet_result: create_packet_result(),
  });
  const page_model = createEngagementSessionHistoryPageModel({
    result,
    generated_at: "2026-04-30T15:40:00.000Z",
  });

  assert.equal(page_model.page_kind, "engagement_session_history");
  assert.equal(page_model.ledger_ref, result.ledger.ledger_id);
  assert.equal(page_model.export_ref, result.export_package.export_id);
  assert.equal(Object.hasOwn(page_model, "route_url"), false);
  assert.equal(Object.hasOwn(page_model, "file_export_path"), false);
  assert.equal(Object.hasOwn(page_model, "persistence_adapter"), false);
});
