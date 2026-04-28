import assert from "node:assert/strict";
import test from "node:test";

import {
  calculate_readiness_score_band,
  create_commercialization_readiness_dashboard_summary,
} from "../../app/commercialization/commercialization-readiness-dashboard-workflow.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-dashboard-fixture.ts";

test("[v2.4] commercialization readiness dashboard fixture is deterministic", () => {
  const first = createV24CommercializationReadinessDashboardFixture();
  const second = createV24CommercializationReadinessDashboardFixture();

  assert.equal(JSON.stringify(first), JSON.stringify(second));
  assert.deepEqual(
    first.dashboards.promising_manual_pilot.evidence_signals,
    [
      "case_study_permission_present",
      "feedback_evidence_present",
      "manual_payment_confirmed",
      "onboarding_acknowledged",
      "onboarding_packet_present",
      "v2_3_paid_pilot_loop_refs_present",
    ]
  );
  assert.deepEqual(
    first.dashboards.promising_manual_pilot.support_burden_signals,
    ["bounded_manual_support", "low_manual_support_burden"]
  );
  assert.equal(
    first.v2_3_stable_baseline.target_commit,
    "c111e2dd7811ec77903a1a139c33bb1a7bc0c27a"
  );
});

test("[v2.4] commercialization readiness dashboard summaries and score bands are stable", () => {
  const fixture = createV24CommercializationReadinessDashboardFixture();
  const first = Object.values(fixture.dashboards).map(
    create_commercialization_readiness_dashboard_summary
  );
  const second = Object.values(fixture.dashboards).map(
    create_commercialization_readiness_dashboard_summary
  );

  assert.deepEqual(first, second);
  assert.deepEqual(
    first.map((summary) => summary.score_band),
    [
      "promising_manual_pilot",
      "insufficient_evidence",
      "needs_operator_review",
      "blocked",
    ]
  );
  assert.equal(
    calculate_readiness_score_band({
      source_refs: fixture.dashboards.promising_manual_pilot.source_refs,
      evidence_signals:
        fixture.dashboards.promising_manual_pilot.evidence_signals,
      support_burden_signals:
        fixture.dashboards.promising_manual_pilot.support_burden_signals,
      feedback_signals:
        fixture.dashboards.promising_manual_pilot.feedback_signals,
      case_study_signals:
        fixture.dashboards.promising_manual_pilot.case_study_signals,
      boundary_posture:
        fixture.dashboards.promising_manual_pilot.boundary_posture,
    }),
    "promising_manual_pilot"
  );
});
