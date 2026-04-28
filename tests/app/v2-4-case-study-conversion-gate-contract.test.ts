import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS,
} from "../../app/commercialization/case-study-conversion-gate-contract.ts";
import {
  create_case_study_conversion_gate,
} from "../../app/commercialization/case-study-conversion-gate-workflow.ts";
import {
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";
import {
  createV24CaseStudyConversionGateFixture,
} from "../../projection/fixtures/v2-4-case-study-conversion-gate-fixture.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";

const PERMISSION_READINESS_BANDS = [
  "permission_absent",
  "private_reference_only",
  "anonymized_quote_candidate",
  "needs_legal_review",
  "denied",
  "blocked",
] as const;

const MANUAL_CONVERSION_READINESS_BANDS = [
  "insufficient_evidence",
  "weak_manual_signal",
  "useful_manual_signal",
  "strong_manual_signal",
  "needs_operator_review",
  "blocked",
] as const;

const DECISION_VALUES = [
  "hold_for_more_evidence",
  "prepare_private_reference_review",
  "prepare_anonymized_quote_review",
  "prepare_manual_conversion_review",
  "require_legal_review",
  "deny_public_use",
  "blocked",
] as const;

const FORBIDDEN_VALUES = [
  "commercial_ready",
  "public_beta_ready",
  "paid_product_ready",
  "production_ready",
  "conversion_ready",
  "auto_convert",
  "publish_case_study",
  "publish_testimonial",
] as const;

const FORBIDDEN_FIELD_NAMES = [
  "crm_object_id",
  "email_dispatch_payload",
  "public_publishing_payload",
  "testimonial_page_url",
  "public_case_study_url",
  "case_study_publish_payload",
  "external_analytics_payload",
  "customer_account_id",
  "automatic_conversion_payload",
  "auto_convert",
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

test("[v2.4] case-study conversion gate contract creates a valid local gate", () => {
  const paid_pilot_loop = createV23PaidPilotLoopFixture();
  const evidence_fixture = createV24PilotFeedbackEvidenceFixture();
  const gate = create_case_study_conversion_gate({
    gate_id: "v2-4-case-study-conversion-contract-test",
    created_at: "2026-04-28T23:00:00.000Z",
    permission: paid_pilot_loop.main_loop.case_study_permission,
    feedback_evidence_summary:
      evidence_fixture.summaries.strong_manual_feedback_evidence,
  });

  assert.equal(gate.gate_id, "v2-4-case-study-conversion-contract-test");
  assert.equal(gate.status, "draft");
  assert.equal(gate.permission_readiness_band, "private_reference_only");
  assert.equal(gate.manual_conversion_readiness_band, "strong_manual_signal");
  assert.equal(gate.decision, "prepare_manual_conversion_review");
  assert.equal(
    gate.source_refs.feedback_evidence_id,
    "v2-4-feedback-evidence-strong-manual"
  );
  assert.equal(
    gate.source_refs.case_study_permission_id,
    "v2-3-paid-pilot-loop-case-study-permission"
  );
  assert.equal(
    gate.source_refs.v2_3_stable_tag,
    "solocrew-v2.3-stable-first-paid-pilot-loop-20260428"
  );
});

test("[v2.4] case-study conversion gate labels avoid forbidden readiness and publishing values", () => {
  for (const value of [
    ...PERMISSION_READINESS_BANDS,
    ...MANUAL_CONVERSION_READINESS_BANDS,
    ...DECISION_VALUES,
  ]) {
    for (const forbidden of FORBIDDEN_VALUES) {
      assert.notEqual(value, forbidden);
    }
  }
});

test("[v2.4] case-study conversion gate boundary flags are all true", () => {
  const gate =
    createV24CaseStudyConversionGateFixture().gates
      .manual_conversion_review_candidate;

  assert.deepEqual(gate.boundary_flags, V2_4_CASE_STUDY_CONVERSION_BOUNDARY_FLAGS);

  for (const value of Object.values(gate.boundary_flags)) {
    assert.equal(value, true);
  }
});

test("[v2.4] case-study conversion gate contract excludes forbidden implementation fields", () => {
  const payload = JSON.stringify(
    createV24CaseStudyConversionGateFixture().gates
  );

  for (const field_name of FORBIDDEN_FIELD_NAMES) {
    assert.doesNotMatch(payload, new RegExp(field_name, "i"));
  }
});
