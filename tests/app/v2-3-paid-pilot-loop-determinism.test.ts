import assert from "node:assert/strict";
import test from "node:test";

import {
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";

test("[v2.3 e2e] paid pilot loop fixture is deterministic across repeated construction", () => {
  const first = createV23PaidPilotLoopFixture();
  const second = createV23PaidPilotLoopFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(first.main_loop.feedback.signals, [
    "continuation_value",
    "time_saving",
    "useful",
    "would_pay_again",
  ]);
  assert.deepEqual(first.main_loop.case_study_permission.allowed_quote_refs, [
    "feedback:v2-3-paid-pilot-loop-feedback",
  ]);
  assert.deepEqual(first.main_loop.next_action_proposal.required_manual_inputs, [
    "manual_feedback_questions",
    "pilot_session_summary",
  ]);
  assert.deepEqual(first.final_loop_summary.source_refs, second.final_loop_summary.source_refs);
  assert.equal(
    first.v2_2_stable_baseline.tag,
    "solocrew-v2.2-stable-private-alpha-journey-20260428"
  );
  assert.equal(
    first.v2_2_stable_baseline.target_commit,
    "aaef0147290848c35e68d8eb4e84616f904454e3"
  );
  assert.equal(
    first.main_loop.intake.updated_at,
    "2026-04-28T14:05:00.000Z"
  );
  assert.equal(
    first.main_loop.manual_payment_path.at(-1)?.updated_at,
    "2026-04-28T14:45:00.000Z"
  );
  assert.equal(
    first.main_loop.feedback.updated_at,
    "2026-04-28T15:05:00.000Z"
  );
});
