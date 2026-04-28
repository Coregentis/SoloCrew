import assert from "node:assert/strict";
import test from "node:test";

import {
  createV24CommercializationReadinessLoopFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-loop-fixture.ts";

test("[v2.4 e2e] commercialization readiness loop carries V2.3 refs through V2.4 stages", () => {
  const loop = createV24CommercializationReadinessLoopFixture();

  assert.equal(
    loop.stage_summaries.onboarding.source_refs.intake_id,
    loop.source_chain.intake_id
  );
  assert.equal(
    loop.stage_summaries.dashboard.source_refs.payment_record_id,
    loop.source_chain.payment_record_id
  );
  assert.equal(
    loop.stage_summaries.feedback_evidence.source_refs.feedback_id,
    loop.source_chain.feedback_id
  );
  assert.equal(
    loop.stage_summaries.feedback_evidence.source_refs.case_study_permission_id,
    loop.source_chain.case_study_permission_id
  );
  assert.equal(
    loop.stage_summaries.conversion_gate.source_refs.feedback_evidence_id,
    loop.source_chain.feedback_evidence_id
  );
  assert.equal(
    loop.stage_summaries.conversion_gate.source_refs.v2_3_stable_tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
});

test("[v2.4 e2e] commercialization readiness loop produces expected manual gate decisions", () => {
  const loop = createV24CommercializationReadinessLoopFixture();

  assert.equal(
    loop.cases.promising_manual_pilot.final_gate_decision,
    "prepare_manual_conversion_review"
  );
  assert.equal(
    loop.cases.insufficient_evidence.final_gate_decision,
    "hold_for_more_evidence"
  );
  assert.equal(
    loop.cases.needs_operator_review.final_gate_decision,
    "hold_for_more_evidence"
  );
  assert.equal(
    loop.cases.legal_review.final_gate_decision,
    "require_legal_review"
  );
  assert.equal(
    loop.cases.denied_public_use.final_gate_decision,
    "deny_public_use"
  );
  assert.equal(loop.cases.blocked.final_gate_decision, "blocked");
});

test("[v2.4 e2e] commercialization readiness loop remains manual-only and non-executing", () => {
  const loop = createV24CommercializationReadinessLoopFixture();

  assert.equal(loop.final_loop_summary.final_gate_decision, "prepare_manual_conversion_review");
  assert.equal(loop.final_loop_summary.no_automatic_conversion, true);
  assert.equal(loop.final_loop_summary.manual_first, true);
  assert.equal(loop.final_loop_summary.local_only, true);
  assert.equal(loop.final_loop_summary.review_only, true);
  assert.equal(loop.final_loop_summary.non_executing, true);

  for (const loop_case of Object.values(loop.cases)) {
    assert.equal(loop_case.manual_first, true);
    assert.equal(loop_case.local_only, true);
    assert.equal(loop_case.review_only, true);
    assert.equal(loop_case.non_executing, true);
    assert.equal(loop_case.no_automatic_conversion, true);
  }
});
