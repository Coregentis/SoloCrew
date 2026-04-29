import assert from "node:assert/strict";
import test from "node:test";

import {
  createFounderReviewPacketPageModel,
} from "../../app/shell/create-founder-review-packet-page-model.ts";
import {
  create_founder_review_packet_from_loop_result,
} from "../../app/engagement/founder-review-packet-workflow.ts";
import {
  createEngagementLoopRunnerFixture,
} from "../../projection/fixtures/v3-0-engagement-loop-runner-fixture.ts";
import {
  createFounderReviewPacketFixture,
  createV30FounderReviewPacketFixture,
} from "../../projection/fixtures/v3-0-founder-review-packet-fixture.ts";

test("[v3.0] founder review packet output is deterministic", () => {
  const loop_fixture = createEngagementLoopRunnerFixture();
  const input = {
    packet_id: "founder-review-packet-deterministic",
    result_id: "founder-review-packet-result-deterministic",
    loop_result: loop_fixture.loop_result,
  };
  const first = create_founder_review_packet_from_loop_result(input);
  const second = create_founder_review_packet_from_loop_result(input);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(
    first.packet.sections.map((section) => section.section_id),
    [
      "engagement_context",
      "workspace_summary",
      "loop_review_summary",
      "reviewed_steps",
      "blocked_items",
      "pending_items",
      "founder_decision_options",
      "boundary_notice",
    ]
  );
});

test("[v3.0] founder review packet does not mutate loop result input", () => {
  const loop_fixture = createEngagementLoopRunnerFixture();
  const before = JSON.stringify(loop_fixture.loop_result);

  create_founder_review_packet_from_loop_result({
    packet_id: "founder-review-packet-no-mutation",
    loop_result: loop_fixture.loop_result,
  });

  assert.equal(JSON.stringify(loop_fixture.loop_result), before);
});

test("[v3.0] founder review packet fixture is deterministic", () => {
  const first = createFounderReviewPacketFixture();
  const second = createFounderReviewPacketFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
});

test("[v3.0] V3.0 founder review packet fixture wrapper preserves canonical fixture shape", () => {
  const canonical = createFounderReviewPacketFixture();
  const release_wrapper = createV30FounderReviewPacketFixture();

  assert.deepEqual(Object.keys(release_wrapper).sort(), Object.keys(canonical).sort());
  assert.equal(release_wrapper.packet_result.result_id, canonical.packet_result.result_id);
  assert.equal(release_wrapper.packet.packet_id, canonical.packet.packet_id);
});

test("[v3.0] founder review packet page model is deterministic and has no route field", () => {
  const fixture = createFounderReviewPacketFixture();
  const first = createFounderReviewPacketPageModel({
    result: fixture.packet_result,
    generated_at: "2026-04-30T14:55:00.000Z",
  });
  const second = createFounderReviewPacketPageModel({
    result: fixture.packet_result,
    generated_at: "2026-04-30T14:55:00.000Z",
  });

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(Object.hasOwn(first, "route_url"), false);
  assert.equal(Object.hasOwn(first, "file_export_path"), false);
});
