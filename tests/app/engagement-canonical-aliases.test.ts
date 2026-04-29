import assert from "node:assert/strict";
import test from "node:test";

import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_SOURCE_REF_FIELD_NAMES,
  ENGAGEMENT_STAGE_VALUES,
} from "../../app/engagement/engagement-canonical-contract.ts";
import type {
  EngagementEvidenceRecord,
  EngagementOnboardingPacket,
  EngagementReadinessView,
  EngagementReviewGate,
} from "../../app/engagement/engagement-canonical-contract.ts";
import {
  createV24CaseStudyConversionGateFixture,
} from "../../projection/fixtures/v2-4-case-study-conversion-gate-fixture.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-dashboard-fixture.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "../../projection/fixtures/v2-4-pilot-feedback-evidence-fixture.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "../../projection/fixtures/v2-4-pilot-onboarding-packet-fixture.ts";

const VERSIONED_FIELD_PATTERN = /(^|_)v[0-9]|(^|_)V[0-9]/;

test("[engagement] canonical stage and commercial mode values are stable", () => {
  assert.deepEqual(ENGAGEMENT_STAGE_VALUES, [
    "candidate",
    "qualified",
    "onboarding",
    "paid_pilot",
    "active_pilot",
    "post_pilot_review",
    "conversion_review",
    "closed_won",
    "closed_lost",
    "archived",
  ]);
  assert.deepEqual(COMMERCIAL_MODE_VALUES, [
    "free_discovery",
    "manual_paid_pilot",
    "manual_service",
    "subscription_candidate",
    "enterprise_candidate",
  ]);
});

test("[engagement] canonical source refs avoid versioned field names", () => {
  assert.deepEqual(ENGAGEMENT_SOURCE_REF_FIELD_NAMES, [
    "baseline_release_ref",
    "baseline_commit_ref",
    "source_release_ref",
    "source_commit_ref",
    "onboarding_packet_ref",
    "readiness_view_ref",
    "evidence_record_ref",
    "review_gate_ref",
    "participant_ref",
    "engagement_ref",
  ]);

  for (const field_name of ENGAGEMENT_SOURCE_REF_FIELD_NAMES) {
    assert.doesNotMatch(field_name, VERSIONED_FIELD_PATTERN);
  }
});

test("[engagement] canonical aliases accept existing V2.4 object shapes", () => {
  const onboarding_fixture = createV24PilotOnboardingPacketFixture();
  const dashboard_fixture = createV24CommercializationReadinessDashboardFixture();
  const evidence_fixture = createV24PilotFeedbackEvidenceFixture();
  const gate_fixture = createV24CaseStudyConversionGateFixture();

  const onboarding_packet: EngagementOnboardingPacket =
    onboarding_fixture.packets.qualified_design_partner;
  const readiness_view: EngagementReadinessView =
    dashboard_fixture.dashboards.promising_manual_pilot;
  const evidence_record: EngagementEvidenceRecord =
    evidence_fixture.evidence_records.strong_manual_feedback_evidence;
  const review_gate: EngagementReviewGate =
    gate_fixture.gates.manual_conversion_review_candidate;

  assert.equal(onboarding_packet.packet_id, "v2-4-pilot-onboarding-qualified");
  assert.equal(readiness_view.dashboard_id, "v2-4-dashboard-promising-manual-pilot");
  assert.equal(evidence_record.evidence_id, "v2-4-feedback-evidence-strong-manual");
  assert.equal(review_gate.gate_id, "v2-4-conversion-gate-manual-conversion-review");

  for (const flags of [
    onboarding_packet.boundary_flags,
    readiness_view.boundary_flags,
    evidence_record.boundary_flags,
    review_gate.boundary_flags,
  ]) {
    assert.equal(flags.local_only, true);
    assert.equal(flags.review_only, true);
    assert.equal(flags.non_executing, true);
  }
});
