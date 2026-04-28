import assert from "node:assert/strict";
import test from "node:test";

import {
  create_pilot_onboarding_packet_summary,
} from "../../app/commercialization/pilot-onboarding-packet-workflow.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "../../projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts";

test("[v2.4] pilot onboarding packet fixture is deterministic", () => {
  const first = createV24PilotOnboardingPacketFixture();
  const second = createV24PilotOnboardingPacketFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(
    first.packets.qualified_design_partner.required_inputs.map(
      (input) => input.input_id
    ),
    [
      "current_governance_risk",
      "desired_pilot_outcome",
      "local_review_artifact_refs",
      "project_context_summary",
    ]
  );
  assert.deepEqual(
    first.packets.qualified_design_partner.support_boundaries.map(
      (boundary) => boundary.boundary_id
    ),
    ["local_review_boundary", "manual_support_window"]
  );
  assert.equal(
    first.packets.qualified_design_partner.updated_at,
    "2026-04-28T16:10:00.000Z"
  );
});

test("[v2.4] pilot onboarding packet summaries remain stable", () => {
  const fixture = createV24PilotOnboardingPacketFixture();
  const first = Object.values(fixture.packets).map(
    create_pilot_onboarding_packet_summary
  );
  const second = Object.values(fixture.packets).map(
    create_pilot_onboarding_packet_summary
  );

  assert.deepEqual(first, second);
  assert.equal(first[0]?.required_input_count, 4);
  assert.equal(first[0]?.support_boundary_count, 2);
  assert.equal(
    first[0]?.source_refs.v2_3_stable_commit,
    "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a"
  );
});
