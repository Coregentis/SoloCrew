import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  createFounderReviewPacketPageModel,
} from "../../app/shell/create-founder-review-packet-page-model.ts";
import {
  createEngagementLoopRunnerFixture,
} from "./v3-0-engagement-loop-runner-fixture.ts";

export function createFounderReviewPacketFixture() {
  const loop_runner_fixture = createEngagementLoopRunnerFixture();
  const packet_result = create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-v3-0-local",
    result_id: "founder-review-packet-result-v3-0-local",
    loop_result: loop_runner_fixture.loop_result,
  });
  const page_model = createFounderReviewPacketPageModel({
    result: packet_result,
    generated_at: "2026-04-30T14:30:00.000Z",
  });

  return {
    fixture_id: "founder-review-packet-v3-0-fixture",
    fixture_kind: "founder_review_packet_output",
    loop_runner_fixture_id: loop_runner_fixture.fixture_id,
    packet_result,
    packet: packet_result.packet,
    page_model,
    boundary_flags: packet_result.boundary_flags,
  } as const;
}

export function createV30FounderReviewPacketFixture() {
  return createFounderReviewPacketFixture();
}
