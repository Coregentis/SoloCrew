import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS,
} from "../../app/commercialization/pilot-feedback-evidence-contract.ts";
import {
  create_pilot_feedback_evidence_record,
} from "../../app/commercialization/pilot-feedback-evidence-workflow.ts";
import {
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-dashboard-fixture.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";

const ALLOWED_STRENGTH_BANDS = [
  "insufficient_evidence",
  "weak_signal",
  "useful_manual_signal",
  "strong_manual_signal",
  "needs_operator_review",
  "blocked",
] as const;

const FORBIDDEN_FIELD_NAMES = [
  "crm_object_id",
  "email_dispatch_payload",
  "public_publishing_payload",
  "testimonial_page_url",
  "external_analytics_payload",
  "llm_execution_prompt",
  "model_call_payload",
  "agent_dispatch_payload",
  "tool_invocation_payload",
  "payment_processor_id",
  "checkout_url",
  "subscription_id",
  "package_asset",
  "raw_runtime_private_payload",
] as const;

test("[v2.4] pilot feedback evidence contract creates a valid record", () => {
  const paid_pilot_loop = createV23PaidPilotLoopFixture();
  const dashboard_fixture = createV24CommercializationReadinessDashboardFixture();
  const evidence = create_pilot_feedback_evidence_record({
    evidence_id: "v2-4-feedback-evidence-contract-test",
    created_at: "2026-04-28T21:00:00.000Z",
    feedback: paid_pilot_loop.main_loop.feedback,
    permission: paid_pilot_loop.main_loop.case_study_permission,
    dashboard_summary: dashboard_fixture.summaries.promising_manual_pilot,
  });

  assert.equal(evidence.evidence_id, "v2-4-feedback-evidence-contract-test");
  assert.equal(evidence.status, "draft");
  assert.equal(evidence.strength_band, "strong_manual_signal");
  assert.equal(evidence.source_refs.feedback_id, "v2-3-paid-pilot-loop-feedback");
  assert.equal(
    evidence.source_refs.case_study_permission_id,
    "v2-3-paid-pilot-loop-case-study-permission"
  );
  assert.equal(
    evidence.source_refs.dashboard_id,
    "v2-4-dashboard-promising-manual-pilot"
  );
  assert.equal(
    evidence.source_refs.onboarding_packet_id,
    "v2-4-pilot-onboarding-qualified"
  );
  assert.equal(evidence.source_refs.manual_payment_status, "payment_confirmed");
  assert.equal(
    evidence.source_refs.v2_3_stable_tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
  assert.equal(
    evidence.source_refs.v2_3_stable_commit,
    "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a"
  );
});

test("[v2.4] pilot feedback evidence strength bands avoid readiness labels", () => {
  for (const band of ALLOWED_STRENGTH_BANDS) {
    assert.doesNotMatch(band, /ready/i);
    assert.doesNotMatch(band, /commercial/i);
    assert.doesNotMatch(band, /public_beta/i);
    assert.doesNotMatch(band, /paid_product/i);
    assert.doesNotMatch(band, /production/i);
  }
});

test("[v2.4] pilot feedback evidence boundary flags are all true", () => {
  const evidence =
    createV24PilotFeedbackEvidenceFixture().evidence_records
      .strong_manual_feedback_evidence;

  assert.deepEqual(
    evidence.boundary_flags,
    V2_4_FEEDBACK_EVIDENCE_BOUNDARY_FLAGS
  );

  for (const value of Object.values(evidence.boundary_flags)) {
    assert.equal(value, true);
  }
});

test("[v2.4] pilot feedback evidence contract excludes forbidden fields", () => {
  const payload = JSON.stringify(
    createV24PilotFeedbackEvidenceFixture().evidence_records
  );

  for (const field_name of FORBIDDEN_FIELD_NAMES) {
    assert.doesNotMatch(payload, new RegExp(field_name, "i"));
  }
});
