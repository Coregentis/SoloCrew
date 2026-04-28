import assert from "node:assert/strict";
import test from "node:test";

import {
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";

function assert_all_boundary_flags_true(record: {
  boundary_flags?: Record<string, unknown>;
}) {
  if (!record.boundary_flags) {
    return;
  }

  for (const value of Object.values(record.boundary_flags)) {
    assert.equal(value, true);
  }
}

test("[v2.3 e2e] paid pilot loop composes intake to feedback and permission path", () => {
  const fixture = createV23PaidPilotLoopFixture();
  const loop = fixture.main_loop;

  assert.equal(loop.intake.status, "qualified");
  assert.equal(loop.qualification_summary.classification, "strong_fit");
  assert.deepEqual(
    loop.manual_payment_path.map((record) => record.status),
    ["invoice_draft", "invoice_sent", "payment_pending", "payment_confirmed"]
  );
  assert.equal(loop.next_action_proposal.kind, "prepare_feedback_request");
  assert.equal(loop.feedback.status, "accepted_for_learning");
  assert.equal(loop.feedback_summary.quality_classification, "strong_signal");
  assert.equal(
    loop.feedback_summary.case_study_permission?.classification,
    "private_reference_only"
  );
  assert.equal(
    loop.case_study_permission.status,
    "granted_private_reference_only"
  );

  assert_all_boundary_flags_true(loop.intake);
  for (const payment_record of loop.manual_payment_path) {
    assert_all_boundary_flags_true(payment_record);
  }
  assert_all_boundary_flags_true(loop.next_action_proposal);
  assert_all_boundary_flags_true(loop.feedback);
  assert_all_boundary_flags_true(loop.case_study_permission);

  const source_refs = fixture.final_loop_summary.source_refs;
  assert.equal(source_refs.intake_id, loop.intake.intake_id);
  assert.equal(source_refs.design_partner_id, loop.intake.design_partner_id);
  assert.equal(
    source_refs.payment_record_id,
    loop.manual_payment_path.at(-1)?.payment_record_id
  );
  assert.equal(source_refs.invoice_id, loop.manual_payment_path.at(-1)?.invoice_id);
  assert.equal(source_refs.proposal_id, loop.next_action_proposal.proposal_id);
  assert.equal(
    source_refs.workspace_id,
    loop.next_action_proposal.source_refs.workspace_id
  );
  assert.equal(
    source_refs.review_packet_export_id,
    loop.next_action_proposal.source_refs.review_packet_export_id
  );
  assert.equal(
    source_refs.dashboard_page_id,
    loop.next_action_proposal.source_refs.dashboard_page_id
  );
  assert.equal(
    source_refs.v2_2_stable_tag,
    "solocrew-v2.2-stable-private-alpha-journey-20260428"
  );
  assert.equal(
    source_refs.v2_2_stable_commit,
    "aaef0147290848c35e68d8eb4e84616f904454e3"
  );
});

test("[v2.3 e2e] paid pilot loop includes blocked, manual-review, incomplete feedback, and denied permission branches", () => {
  const branches = createV23PaidPilotLoopFixture().branches;

  assert.equal(branches.blocked_or_disqualified.intake.status, "blocked");
  assert.equal(
    branches.blocked_or_disqualified.next_action_proposal.kind,
    "decline_or_hold_candidate"
  );
  assert.equal(branches.manual_review.intake.status, "needs_manual_review");
  assert.equal(
    branches.manual_review.next_action_proposal.kind,
    "resolve_manual_exception"
  );
  assert.equal(branches.incomplete_feedback.feedback.status, "incomplete");
  assert.equal(
    branches.incomplete_feedback.summary.quality_classification,
    "incomplete"
  );
  assert.equal(branches.denied_case_study_permission.permission.status, "denied");
  assert.equal(
    branches.denied_case_study_permission.summary.case_study_permission
      ?.classification,
    "denied"
  );
});
