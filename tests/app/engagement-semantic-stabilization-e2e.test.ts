import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import test from "node:test";

import {
  COMMERCIAL_MODE_VALUES,
  ENGAGEMENT_SOURCE_REF_FIELD_NAMES,
  ENGAGEMENT_STAGE_VALUES,
} from "../../app/engagement/engagement-canonical-contract.ts";
import {
  createExecutionBoundaryPageModel,
  createFounderDashboardContinuationPageModel,
  createFounderDashboardProductPageModel,
  createIntakeToPacketPageModel,
  createPreparedActionPageModel,
  EXECUTION_BOUNDARY_LINES,
  FOUNDER_DASHBOARD_PRODUCT_ROUTE,
  PREPARED_ACTION_BOUNDARY_LINES,
  renderFounderDashboardProductPage,
  V18_EXECUTION_BOUNDARY_LINES,
  V17_PREPARED_ACTION_BOUNDARY_LINES,
} from "../../app/engagement/engagement-compatibility-aliases.ts";
import {
  ENGAGEMENT_METADATA_FIELD_NAMES,
} from "../../app/engagement/engagement-metadata-contract.ts";
import {
  ENGAGEMENT_NORMALIZED_SOURCE_REF_FIELD_NAMES,
  normalize_engagement_baseline_refs,
  normalize_engagement_evidence_refs,
  normalize_engagement_operational_refs,
} from "../../app/engagement/engagement-source-ref-normalizer.ts";
import {
  createV11IntakeToPacketPageModel,
} from "../../app/shell/create-v1-1-intake-to-packet-page-model.ts";
import {
  createV17PreparedActionPageModel,
} from "../../app/shell/create-v1-7-prepared-action-page-model.ts";
import {
  createV18ExecutionBoundaryPageModel,
} from "../../app/shell/create-v1-8-execution-boundary-page-model.ts";
import {
  createV2FounderDashboardPageModel,
} from "../../app/shell/create-v2-founder-dashboard-page-model.ts";
import {
  create_v2_2_founder_dashboard_continuation_page_model,
} from "../../app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts";
import {
  createStarterCellsRuntimeStateProjection,
} from "../../projection/fixtures/starter-cell-fixtures.ts";
import {
  createPaidPilotEngagementLoopFixture,
  createV23PaidPilotLoopFixture,
} from "../../projection/fixtures/v2-3-paid-pilot-loop-fixture.ts";
import {
  createEngagementReviewGateFixture,
  createV24CaseStudyConversionGateFixture,
} from "../../projection/fixtures/v2-4-case-study-conversion-gate-fixture.ts";
import {
  createEngagementReadinessLoopFixture,
  createV24CommercializationReadinessLoopFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-loop-fixture.ts";

const VERSIONED_FIELD_PATTERN = /(^|_)v[0-9]|(^|_)V[0-9]/;

function assert_no_versioned_field_names(field_names: readonly string[]): void {
  for (const field_name of field_names) {
    assert.doesNotMatch(field_name, VERSIONED_FIELD_PATTERN);
  }
}

test("[engagement e2e] canonical lifecycle and metadata surfaces are stable", () => {
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

  assert_no_versioned_field_names(ENGAGEMENT_METADATA_FIELD_NAMES);
  assert_no_versioned_field_names(ENGAGEMENT_SOURCE_REF_FIELD_NAMES);
  assert_no_versioned_field_names(
    ENGAGEMENT_NORMALIZED_SOURCE_REF_FIELD_NAMES
  );
});

test("[engagement e2e] legacy source refs normalize into canonical refs", () => {
  const legacy_refs = {
    v2_3_stable_tag: "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    v2_3_stable_commit: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
    v2_4_onboarding_packet_ref: "fixture:v2-4-pilot-onboarding-qualified",
    v2_4_dashboard_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
    v2_4_feedback_evidence_ref: "fixture:v2-4-feedback-evidence-strong-manual",
    product_line: "v2_0",
    phase_boundary: "v2_0_wave3_founder_dashboard_productization",
    v2_0_ready: false,
    v2_0_delivered: false,
  };
  const before = JSON.stringify(legacy_refs);

  assert.deepEqual(normalize_engagement_baseline_refs(legacy_refs), {
    baseline_release_ref:
      "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    baseline_commit_ref: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
  });
  assert.deepEqual(normalize_engagement_evidence_refs(legacy_refs), {
    baseline_release_ref:
      "solocrew-v2.3-stable-first-paid-pilot-loop-20260428",
    baseline_commit_ref: "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a",
    onboarding_packet_ref: "fixture:v2-4-pilot-onboarding-qualified",
    readiness_view_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
    evidence_record_ref: "fixture:v2-4-feedback-evidence-strong-manual",
  });
  assert.deepEqual(normalize_engagement_operational_refs(legacy_refs), {
    readiness_status: false,
    delivery_status: false,
    release_line: "v2_0",
    phase_ref: "v2_0_wave3_founder_dashboard_productization",
  });
  assert.equal(JSON.stringify(legacy_refs), before);
});

test("[engagement e2e] canonical helper wrappers preserve legacy fixtures", () => {
  assert.equal(
    createPaidPilotEngagementLoopFixture,
    createV23PaidPilotLoopFixture
  );
  assert.equal(
    createEngagementReviewGateFixture,
    createV24CaseStudyConversionGateFixture
  );
  assert.equal(
    createEngagementReadinessLoopFixture,
    createV24CommercializationReadinessLoopFixture
  );

  assert.equal(
    JSON.stringify(createPaidPilotEngagementLoopFixture()),
    JSON.stringify(createV23PaidPilotLoopFixture())
  );
  assert.equal(
    JSON.stringify(createEngagementReadinessLoopFixture()),
    JSON.stringify(createV24CommercializationReadinessLoopFixture())
  );
});

test("[engagement e2e] active compatibility aliases preserve shell/page behavior", () => {
  assert.equal(createIntakeToPacketPageModel, createV11IntakeToPacketPageModel);
  assert.equal(createPreparedActionPageModel, createV17PreparedActionPageModel);
  assert.equal(
    createExecutionBoundaryPageModel,
    createV18ExecutionBoundaryPageModel
  );
  assert.equal(
    createFounderDashboardProductPageModel,
    createV2FounderDashboardPageModel
  );
  assert.equal(
    createFounderDashboardContinuationPageModel,
    create_v2_2_founder_dashboard_continuation_page_model
  );
  assert.equal(
    PREPARED_ACTION_BOUNDARY_LINES,
    V17_PREPARED_ACTION_BOUNDARY_LINES
  );
  assert.equal(EXECUTION_BOUNDARY_LINES, V18_EXECUTION_BOUNDARY_LINES);

  const model = createFounderDashboardProductPageModel(
    createStarterCellsRuntimeStateProjection()
  );
  const page = renderFounderDashboardProductPage(model);

  assert.equal(FOUNDER_DASHBOARD_PRODUCT_ROUTE, "/portfolio/v2/founder-dashboard");
  assert.equal(page.route_path, "/portfolio/v2/founder-dashboard");
  assert.equal(page.canonical_page_kind, "founder_dashboard_product_page");
  assert.equal(page.canonical_operator_surface, "founder_dashboard_productized");
  assert.equal(page.phase_ref, "founder_dashboard_productization");
  assert.equal(page.delivery_status, false);
  assert.equal(page.readiness_status, false);
  assert.match(page.html, /data-section="starter-cells"/);
  assert.match(page.html, /Starter Cells/);
  assert.match(page.html, /Boundary Summary/);
});

test("[engagement e2e] README is product-entry-first and keeps V3.0 bounded", () => {
  const readme = readFileSync("README.md", "utf8");
  const ordered_sections = [
    "## Product Identity",
    "## What SoloCrew Does Today",
    "## Current Stable Release",
    "## V3.0 Stable Scope",
    "## Semantic Stabilization Line",
    "## Architecture / Authority Boundary",
    "## What This Is Not",
    "## Release History and Evidence",
    "## Development / Test Status",
    "## Next Line",
  ];

  let last_index = -1;
  for (const section of ordered_sections) {
    const index = readme.indexOf(section);
    assert.notEqual(index, -1, `README missing ${section}`);
    assert.ok(index > last_index, `${section} must remain product-entry ordered`);
    last_index = index;
  }

  assert.match(
    readme,
    /V2\.5 is the Product Semantic Stabilization \/ Engagement Canonicalization line\./
  );
  assert.match(
    readme,
    /V3\.0 became stable-prep eligible after the bounded post-RC stable readiness/
  );
  assert.match(readme, /limited local scope only/);
  assert.match(readme, /in-memory export object only/);
  assert.doesNotMatch(readme, /V3\.0 released/);

  assert.match(
    readme,
    /solocrew-v2\.4-stable-commercialization-readiness-loop-20260428/
  );
  assert.match(readme, /solocrew-v2\.3-stable-first-paid-pilot-loop-20260428/);
  assert.match(
    readme,
    /not copied into\s+new canonical product object names\./
  );
  assert.match(readme, /stable Engagement language/);
});
