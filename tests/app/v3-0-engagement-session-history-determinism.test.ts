import assert from "node:assert/strict";
import test from "node:test";

import {
  createEngagementSessionHistoryPageModel,
} from "../../app/shell/create-engagement-session-history-page-model.ts";
import {
  create_engagement_session_history_from_packet,
} from "../../app/engagement/engagement-session-history-workflow.ts";
import {
  createFounderReviewPacketFixture,
} from "../../projection/fixtures/v3-0-founder-review-packet-fixture.ts";
import {
  createEngagementSessionHistoryFixture,
  createV30EngagementSessionHistoryFixture,
} from "../../projection/fixtures/v3-0-engagement-session-history-fixture.ts";

test("[v3.0] engagement session history output is deterministic", () => {
  const packet_fixture = createFounderReviewPacketFixture();
  const input = {
    ledger_id: "engagement-history-ledger-deterministic",
    export_id: "engagement-session-export-deterministic",
    result_id: "engagement-session-history-result-deterministic",
    created_at: "2026-04-30T15:55:00.000Z",
    packet_result: packet_fixture.packet_result,
  };
  const first = create_engagement_session_history_from_packet(input);
  const second = create_engagement_session_history_from_packet(input);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(
    first.entries.map((entry) => entry.entry_id),
    first.ledger.entry_refs
  );
  assert.deepEqual(first.ledger.entry_refs, first.export_package.history_entry_refs);
});

test("[v3.0] engagement session history does not mutate packet result input", () => {
  const packet_fixture = createFounderReviewPacketFixture();
  const before = JSON.stringify(packet_fixture.packet_result);

  create_engagement_session_history_from_packet({
    ledger_id: "engagement-history-ledger-no-mutation",
    export_id: "engagement-session-export-no-mutation",
    created_at: "2026-04-30T16:00:00.000Z",
    packet_result: packet_fixture.packet_result,
  });

  assert.equal(JSON.stringify(packet_fixture.packet_result), before);
});

test("[v3.0] engagement session history fixture is deterministic", () => {
  const first = createEngagementSessionHistoryFixture();
  const second = createEngagementSessionHistoryFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("[v3.0] V3.0 session history fixture wrapper preserves canonical fixture shape", () => {
  const canonical = createEngagementSessionHistoryFixture();
  const release_wrapper = createV30EngagementSessionHistoryFixture();

  assert.deepEqual(Object.keys(release_wrapper).sort(), Object.keys(canonical).sort());
  assert.equal(release_wrapper.history_result.result_id, canonical.history_result.result_id);
  assert.equal(release_wrapper.export_package.export_id, canonical.export_package.export_id);
});

test("[v3.0] engagement session history page model is deterministic and has no storage fields", () => {
  const fixture = createEngagementSessionHistoryFixture();
  const first = createEngagementSessionHistoryPageModel({
    result: fixture.history_result,
    generated_at: "2026-04-30T16:05:00.000Z",
  });
  const second = createEngagementSessionHistoryPageModel({
    result: fixture.history_result,
    generated_at: "2026-04-30T16:05:00.000Z",
  });

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(Object.hasOwn(first, "route_url"), false);
  assert.equal(Object.hasOwn(first, "file_export_path"), false);
  assert.equal(Object.hasOwn(first, "database_ref"), false);
  assert.equal(Object.hasOwn(first, "persistence_adapter"), false);
});
