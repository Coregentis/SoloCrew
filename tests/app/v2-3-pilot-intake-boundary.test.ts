import assert from "node:assert/strict";
import test from "node:test";

import {
  qualify_design_partner_intake,
} from "../../app/pilots/design-partner-qualification.ts";
import {
  createV23PilotIntakeFixture,
  V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /checkout_url/i,
  /subscription_id/i,
  /provider_dispatch_payload/i,
  /channel_dispatch_payload/i,
  /marketplace_install/i,
  /autonomous_execution_enabled/i,
  /paid product ready/i,
  /public beta ready/i,
  /production-ready/i,
  /V3\.0 released/i,
  /MPLP certification/i,
  /MPLP endorsement/i,
  /raw_runtime_private_payload/i,
  /Context law/i,
  /Plan law/i,
  /Confirm law/i,
  /Trace law/i,
  /Core law/i,
  /State Sync law/i,
  /Transaction law/i,
  /Security omission law/i,
  /Observability evidence law/i,
  /Protocol Versioning posture/i,
  /Object\/export binding semantics/i,
] as const;

test("[v2.3] pilot intake fixture covers strong, blocked, and manual-review candidates", () => {
  const fixture = createV23PilotIntakeFixture();
  const statuses = fixture.intakes.map((entry) => entry.status);

  assert.deepEqual(statuses, [
    "qualified",
    "blocked",
    "needs_manual_review",
  ]);
  assert.equal(
    fixture.v2_2_stable_baseline.tag,
    "solocrew-v2.2-stable-private-alpha-journey-20260428"
  );
});

test("[v2.3] serialized intake records and qualification summaries avoid forbidden positive fields and claims", () => {
  const payload = JSON.stringify({
    strong: V2_3_STRONG_FIT_PILOT_INTAKE,
    blocked: V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
    manual_review: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
    strong_summary: qualify_design_partner_intake(
      V2_3_STRONG_FIT_PILOT_INTAKE
    ),
    blocked_summary: qualify_design_partner_intake(
      V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE
    ),
    manual_review_summary: qualify_design_partner_intake(
      V2_3_MANUAL_REVIEW_PILOT_INTAKE
    ),
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  assert.match(payload, /no_payment_processor/);
  assert.match(payload, /no_checkout/);
  assert.match(payload, /no_subscription_management/);
  assert.match(payload, /no_provider_dispatch/);
  assert.match(payload, /no_channel_dispatch/);
  assert.match(payload, /no_marketplace_implementation/);
  assert.match(payload, /no_autonomous_execution/);
});

test("[v2.3] pilot intake does not create CGOS or MPLP law ownership", () => {
  const payload = JSON.stringify(createV23PilotIntakeFixture());

  assert.doesNotMatch(payload, /SoloCrew owns Context/i);
  assert.doesNotMatch(payload, /SoloCrew owns State Sync/i);
  assert.doesNotMatch(payload, /SoloCrew owns Transaction/i);
  assert.doesNotMatch(payload, /Cognitive_OS law change/i);
  assert.doesNotMatch(payload, /MPLP schema\/protocol change/i);
});
