import assert from "node:assert/strict";
import test from "node:test";

import {
  create_feedback_summary,
} from "../../app/pilots/feedback-capture-workflow.ts";
import {
  createV23FeedbackCaptureFixture,
} from "../../projection/fixtures/v2-3-feedback-capture-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /public_publishing_payload/i,
  /testimonial_page_url/i,
  /crm_object_id/i,
  /email_dispatch_payload/i,
  /channel_dispatch_payload/i,
  /provider_dispatch_payload/i,
  /marketplace_install/i,
  /marketplace_resolver/i,
  /autonomous_follow_up_payload/i,
  /external_analytics_payload/i,
  /llm_execution_prompt/i,
  /model_call_payload/i,
  /agent_dispatch_payload/i,
  /(?<!no_)payment_processor/i,
  /checkout_url/i,
  /subscription_id/i,
  /paid product ready/i,
  /public beta ready/i,
  /commercial ready/i,
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

test("[v2.3] feedback fixture covers strong, incomplete, withdrawn, blocked, denied, and legal-review paths", () => {
  const fixture = createV23FeedbackCaptureFixture();

  assert.equal(
    fixture.summaries.strong_private_reference.quality_classification,
    "strong_signal"
  );
  assert.equal(
    fixture.summaries.strong_private_reference.case_study_permission?.classification,
    "private_reference_only"
  );
  assert.equal(
    fixture.summaries.strong_anonymized_quote.case_study_permission
      ?.classification,
    "anonymized_public_quote_allowed"
  );
  assert.equal(
    fixture.summaries.incomplete_feedback.quality_classification,
    "incomplete"
  );
  assert.equal(
    fixture.summaries.incomplete_feedback.case_study_permission?.classification,
    "denied"
  );
  assert.equal(
    fixture.summaries.withdrawn_feedback.quality_classification,
    "blocked_or_withdrawn"
  );
  assert.equal(
    fixture.summaries.blocked_feedback.quality_classification,
    "blocked_or_withdrawn"
  );
  assert.equal(
    fixture.summaries.blocked_feedback.case_study_permission?.classification,
    "needs_legal_review"
  );
});

test("[v2.3] serialized feedback records, permissions, summaries, and fixture avoid publishing, CRM, dispatch, analytics, LLM, agent, and payment fields", () => {
  const fixture = createV23FeedbackCaptureFixture();
  const payload = JSON.stringify({
    fixture,
    summaries: Object.values(fixture.feedback_records).map((feedback) =>
      create_feedback_summary({ feedback })
    ),
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  assert.match(payload, /no_public_publishing/);
  assert.match(payload, /no_auto_testimonial/);
  assert.match(payload, /no_crm_integration/);
  assert.match(payload, /no_email_dispatch/);
  assert.match(payload, /no_channel_dispatch/);
  assert.match(payload, /no_provider_dispatch/);
  assert.match(payload, /no_marketplace_implementation/);
  assert.match(payload, /no_autonomous_follow_up/);
  assert.match(payload, /no_external_analytics/);
  assert.match(payload, /no_llm_call/);
  assert.match(payload, /no_agent_dispatch/);
  assert.match(payload, /no_payment_processor/);
  assert.match(payload, /no_checkout/);
  assert.match(payload, /no_subscription_management/);
});
