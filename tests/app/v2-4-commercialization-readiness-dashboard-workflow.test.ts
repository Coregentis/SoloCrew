import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_4_DASHBOARD_BOUNDARY_FLAGS,
} from "../../app/commercialization/commercialization-readiness-dashboard-contract.ts";
import {
  block_commercialization_dashboard,
  calculate_readiness_score_band,
  create_commercialization_readiness_dashboard,
  create_commercialization_readiness_dashboard_summary,
  mark_commercialization_dashboard_ready_for_manual_review,
  mark_commercialization_dashboard_reviewed_manually,
} from "../../app/commercialization/commercialization-readiness-dashboard-workflow.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "../../projection/fixtures/v2-4-commercialization-readiness-dashboard-fixture.ts";

const clear_boundary = {
  posture_id: "test-clear-boundary",
  boundary_clear: true,
  source_blockers: [],
  notes: ["test_boundary_clear"],
};

test("[v2.4] commercialization readiness scoring covers expected evidence states", () => {
  const fixture = createV24CommercializationReadinessDashboardFixture();

  assert.equal(
    fixture.dashboards.promising_manual_pilot.score_band,
    "promising_manual_pilot"
  );
  assert.equal(
    fixture.dashboards.insufficient_evidence.score_band,
    "insufficient_evidence"
  );
  assert.equal(
    fixture.dashboards.needs_operator_review.score_band,
    "needs_operator_review"
  );
  assert.equal(fixture.dashboards.blocked_dashboard.score_band, "blocked");

  assert.equal(
    calculate_readiness_score_band({
      source_refs: {
        onboarding_packet_id: "packet",
        onboarding_packet_status: "acknowledged_manually",
        intake_id: "intake",
        design_partner_id: "design-partner",
        manual_payment_status: "invoice_sent",
      },
      evidence_signals: ["onboarding_packet_present"],
      support_burden_signals: ["bounded_manual_support"],
      feedback_signals: ["feedback_accepted_for_learning"],
      case_study_signals: ["private_reference_permission"],
      boundary_posture: clear_boundary,
    }),
    "early_signal"
  );
});

test("[v2.4] commercialization readiness dashboard workflow reaches manual review", () => {
  const dashboard =
    createV24CommercializationReadinessDashboardFixture().dashboards
      .promising_manual_pilot;
  const ready = mark_commercialization_dashboard_ready_for_manual_review({
    dashboard,
    reviewed_at: "2026-04-28T19:10:00.000Z",
  });
  const reviewed = mark_commercialization_dashboard_reviewed_manually({
    dashboard: ready,
    reviewed_at: "2026-04-28T19:15:00.000Z",
    manual_review_note: "Founder reviewed local evidence summary manually.",
  });

  assert.equal(ready.status, "ready_for_manual_review");
  assert.equal(reviewed.status, "reviewed_manually");
  assert.equal(reviewed.updated_at, "2026-04-28T19:15:00.000Z");
  assert.equal(
    reviewed.manual_review_notes[0],
    "Founder reviewed local evidence summary manually."
  );
  assert.deepEqual(reviewed.boundary_flags, V2_4_DASHBOARD_BOUNDARY_FLAGS);
});

test("[v2.4] commercialization readiness dashboard block transition is deterministic", () => {
  const dashboard = create_commercialization_readiness_dashboard({
    dashboard_id: "v2-4-dashboard-block-workflow",
    created_at: "2026-04-28T19:20:00.000Z",
    source_refs: {
      onboarding_packet_id: "packet",
      onboarding_packet_status: "ready_for_manual_review",
      intake_id: "intake",
      design_partner_id: "design-partner",
    },
    evidence_signals: ["onboarding_packet_present"],
    support_burden_signals: ["needs_operator_review"],
    feedback_signals: ["feedback_incomplete"],
    case_study_signals: ["needs_legal_review"],
  });
  const blocked = block_commercialization_dashboard({
    dashboard,
    blocked_at: "2026-04-28T19:25:00.000Z",
    source_blocker: "manual_boundary_evidence_missing",
  });
  const after_blocked = mark_commercialization_dashboard_ready_for_manual_review({
    dashboard: blocked,
    reviewed_at: "2026-04-28T19:30:00.000Z",
  });

  assert.equal(blocked.status, "blocked");
  assert.equal(blocked.score_band, "blocked");
  assert.equal(blocked.boundary_posture.boundary_clear, false);
  assert.deepEqual(blocked.boundary_posture.source_blockers, [
    "manual_boundary_evidence_missing",
  ]);
  assert.equal(after_blocked.status, "blocked");
});

test("[v2.4] commercialization readiness dashboard summaries are deterministic", () => {
  const dashboard =
    createV24CommercializationReadinessDashboardFixture().dashboards
      .needs_operator_review;
  const first = create_commercialization_readiness_dashboard_summary(dashboard);
  const second = create_commercialization_readiness_dashboard_summary(dashboard);

  assert.deepEqual(first, second);
  assert.equal(first.score_band, "needs_operator_review");
  assert.equal(first.recommended_manual_step, "resolve_ambiguous_manual_evidence");
  assert.equal(first.manual_first, true);
  assert.equal(first.local_only, true);
  assert.equal(first.review_only, true);
  assert.equal(first.non_executing, true);
});
