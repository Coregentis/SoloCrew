import {
  create_engagement_session_history_from_packet,
} from "../../app/engagement/engagement-session-history-workflow.ts";
import {
  createEngagementSessionHistoryPageModel,
} from "../../app/shell/create-engagement-session-history-page-model.ts";
import {
  createFounderReviewPacketFixture,
} from "./v3-0-founder-review-packet-fixture.ts";

export function createEngagementSessionHistoryFixture() {
  const founder_packet_fixture = createFounderReviewPacketFixture();
  const history_result = create_engagement_session_history_from_packet({
    ledger_id: "engagement-history-ledger-v3-0-local",
    export_id: "engagement-session-export-v3-0-local",
    result_id: "engagement-session-history-result-v3-0-local",
    created_at: "2026-04-30T15:00:00.000Z",
    packet_result: founder_packet_fixture.packet_result,
  });
  const page_model = createEngagementSessionHistoryPageModel({
    result: history_result,
    generated_at: "2026-04-30T15:05:00.000Z",
  });

  return {
    fixture_id: "engagement-session-history-v3-0-fixture",
    fixture_kind: "engagement_session_history_in_memory_export",
    founder_review_packet_fixture_id: founder_packet_fixture.fixture_id,
    history_result,
    ledger: history_result.ledger,
    entries: history_result.entries,
    export_package: history_result.export_package,
    page_model,
    boundary_flags: history_result.boundary_flags,
  } as const;
}

export function createV30EngagementSessionHistoryFixture() {
  return createEngagementSessionHistoryFixture();
}
