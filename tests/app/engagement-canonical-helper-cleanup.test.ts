import assert from "node:assert/strict";
import test from "node:test";

import {
  createPaidPilotEngagementLoopFixture,
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";
import {
  createEngagementReviewGateFixture,
  createV24CaseStudyConversionGateFixture,
} from "../../projection/fixtures/v2-4-case-study-conversion-gate-fixture.ts";
import {
  createEngagementReadinessViewFixture,
  createV24CommercializationReadinessDashboardFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-dashboard-fixture.ts";
import {
  createEngagementReadinessLoopFixture,
  createV24CommercializationReadinessLoopFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-loop-fixture.ts";
import {
  createEngagementEvidenceRecordFixture,
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";
import {
  createEngagementOnboardingPacketFixture,
  createV24PilotOnboardingPacketFixture,
} from "../../projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts";

const VERSIONED_HELPER_PATTERN = /createV[0-9]/;

test("[engagement] canonical fixture helpers are compatibility wrappers", () => {
  assert.equal(
    createPaidPilotEngagementLoopFixture,
    createV23PaidPilotLoopFixture
  );
  assert.equal(
    createEngagementOnboardingPacketFixture,
    createV24PilotOnboardingPacketFixture
  );
  assert.equal(
    createEngagementReadinessViewFixture,
    createV24CommercializationReadinessDashboardFixture
  );
  assert.equal(
    createEngagementEvidenceRecordFixture,
    createV24PilotFeedbackEvidenceFixture
  );
  assert.equal(
    createEngagementReviewGateFixture,
    createV24CaseStudyConversionGateFixture
  );
  assert.equal(
    createEngagementReadinessLoopFixture,
    createV24CommercializationReadinessLoopFixture
  );
});

test("[engagement] canonical helper names avoid versioned helper semantics", () => {
  for (
    const helper_name of [
      "createPaidPilotEngagementLoopFixture",
      "createEngagementOnboardingPacketFixture",
      "createEngagementReadinessViewFixture",
      "createEngagementEvidenceRecordFixture",
      "createEngagementReviewGateFixture",
      "createEngagementReadinessLoopFixture",
    ]
  ) {
    assert.doesNotMatch(helper_name, VERSIONED_HELPER_PATTERN);
  }
});

test("[engagement] canonical fixture helpers preserve deterministic outputs", () => {
  assert.equal(
    JSON.stringify(createPaidPilotEngagementLoopFixture()),
    JSON.stringify(createV23PaidPilotLoopFixture())
  );
  assert.equal(
    JSON.stringify(createEngagementOnboardingPacketFixture()),
    JSON.stringify(createV24PilotOnboardingPacketFixture())
  );
  assert.equal(
    JSON.stringify(createEngagementReadinessViewFixture()),
    JSON.stringify(createV24CommercializationReadinessDashboardFixture())
  );
  assert.equal(
    JSON.stringify(createEngagementEvidenceRecordFixture()),
    JSON.stringify(createV24PilotFeedbackEvidenceFixture())
  );
  assert.equal(
    JSON.stringify(createEngagementReviewGateFixture()),
    JSON.stringify(createV24CaseStudyConversionGateFixture())
  );
  assert.equal(
    JSON.stringify(createEngagementReadinessLoopFixture()),
    JSON.stringify(createV24CommercializationReadinessLoopFixture())
  );
});

test("[engagement] canonical fixture helpers expose canonical source refs", () => {
  const onboarding = createEngagementOnboardingPacketFixture()
    .packets.qualified_design_partner;
  const dashboard = createEngagementReadinessViewFixture()
    .dashboards.promising_manual_pilot;
  const evidence = createEngagementEvidenceRecordFixture()
    .evidence_records.strong_manual_feedback_evidence;
  const gate = createEngagementReviewGateFixture()
    .gates.manual_conversion_review_candidate;
  const loop = createEngagementReadinessLoopFixture();

  assert.equal(
    onboarding.source_refs.baseline_release_ref,
    onboarding.source_refs.v2_3_stable_tag
  );
  assert.equal(
    dashboard.source_refs.onboarding_packet_ref,
    dashboard.source_refs.v2_4_onboarding_packet_ref
  );
  assert.equal(
    evidence.source_refs.readiness_view_ref,
    evidence.source_refs.v2_4_dashboard_ref
  );
  assert.equal(
    gate.source_refs.evidence_record_ref,
    gate.source_refs.v2_4_feedback_evidence_ref
  );
  assert.equal(
    loop.source_chain.baseline_release_ref,
    loop.source_chain.v2_3_stable_tag
  );
});
