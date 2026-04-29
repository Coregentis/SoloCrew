import assert from "node:assert/strict";
import test from "node:test";

import {
  ENGAGEMENT_NORMALIZED_SOURCE_REF_FIELD_NAMES,
  normalize_engagement_baseline_refs,
  normalize_engagement_evidence_refs,
  normalize_engagement_operational_refs,
  normalize_engagement_readiness_refs,
  normalize_engagement_release_metadata,
  normalize_engagement_source_refs,
} from "../../app/engagement/engagement-source-ref-normalizer.ts";

const VERSIONED_FIELD_PATTERN = /(^|_)v[0-9]|(^|_)V[0-9]/;

test("[engagement] normalized source-ref field names are canonical", () => {
  assert.deepEqual(ENGAGEMENT_NORMALIZED_SOURCE_REF_FIELD_NAMES, [
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
    "workspace_ref",
    "review_packet_export_ref",
    "related_intake_status",
    "no_completion_claim",
    "readiness_status",
    "delivery_status",
    "release_line",
    "phase_ref",
  ]);

  for (const field_name of ENGAGEMENT_NORMALIZED_SOURCE_REF_FIELD_NAMES) {
    assert.doesNotMatch(field_name, VERSIONED_FIELD_PATTERN);
  }
});

test("[engagement] legacy release refs normalize to baseline refs", () => {
  const legacy_refs = {
    v2_3_stable_tag: "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    v2_3_stable_commit: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
  };

  assert.deepEqual(normalize_engagement_baseline_refs(legacy_refs), {
    baseline_release_ref:
      "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    baseline_commit_ref: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
  });
});

test("[engagement] legacy V2.4 evidence refs normalize to canonical refs", () => {
  const legacy_refs = {
    v2_3_stable_tag: "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    v2_3_stable_commit: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
    v2_4_onboarding_packet_ref: "fixture:v2-4-pilot-onboarding-qualified",
    v2_4_dashboard_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
    v2_4_feedback_evidence_ref: "fixture:v2-4-feedback-evidence-strong-manual",
  };
  const before = JSON.stringify(legacy_refs);

  assert.deepEqual(normalize_engagement_evidence_refs(legacy_refs), {
    baseline_release_ref:
      "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    baseline_commit_ref: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
    onboarding_packet_ref: "fixture:v2-4-pilot-onboarding-qualified",
    readiness_view_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
    evidence_record_ref: "fixture:v2-4-feedback-evidence-strong-manual",
  });
  assert.deepEqual(normalize_engagement_readiness_refs(legacy_refs), {
    baseline_release_ref:
      "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    baseline_commit_ref: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
    onboarding_packet_ref: "fixture:v2-4-pilot-onboarding-qualified",
    readiness_view_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
    evidence_record_ref: "fixture:v2-4-feedback-evidence-strong-manual",
  });
  assert.equal(JSON.stringify(legacy_refs), before);
});

test("[engagement] legacy operational refs normalize without mutation", () => {
  const legacy_refs = {
    intake_id: "v2-3-pilot-intake-strong-fit",
    design_partner_id: "design-partner-strong-fit",
    related_v2_2_workspace_id: "v2-2-private-alpha-journey-workspace",
    related_v2_2_review_packet_export_id: "v2-2-private-alpha-review-packet",
    related_v2_3_intake_status: "qualified",
    no_v2_2_completion_claim: true,
    v2_0_ready: false,
    v2_0_delivered: false,
    product_line: "v2_0",
    phase_boundary: "v2_0_wave3_founder_dashboard_productization",
  };
  const before = JSON.stringify(legacy_refs);

  assert.deepEqual(normalize_engagement_source_refs(legacy_refs), {
    participant_ref: "design-partner-strong-fit",
    engagement_ref: "v2-3-pilot-intake-strong-fit",
  });
  assert.deepEqual(normalize_engagement_operational_refs(legacy_refs), {
    workspace_ref: "v2-2-private-alpha-journey-workspace",
    review_packet_export_ref: "v2-2-private-alpha-review-packet",
    related_intake_status: "qualified",
    no_completion_claim: true,
    readiness_status: false,
    delivery_status: false,
    release_line: "v2_0",
    phase_ref: "v2_0_wave3_founder_dashboard_productization",
  });
  assert.equal(JSON.stringify(legacy_refs), before);
});

test("[engagement] release metadata normalization is deterministic", () => {
  const legacy_refs = {
    v2_2_stable_tag: "solocrew-v2.2-stable-private-alpha-journey-20260428",
    v2_2_stable_commit: "aaef0147290848c35e68d8eb4e84616f904454e3",
    product_line: "v2_0",
  };

  const first = normalize_engagement_release_metadata(legacy_refs);
  const second = normalize_engagement_release_metadata(legacy_refs);

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.equal(first.release_line, "v2_0");
  assert.equal(
    first.baseline_release_ref,
    "solocrew-v2.2-stable-private-alpha-journey-20260428"
  );
  assert.equal(
    first.baseline_commit_ref,
    "aaef0147290848c35e68d8eb4e84616f904454e3"
  );
});
