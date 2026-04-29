import {
  V2_4_DASHBOARD_BOUNDARY_NOTICES,
} from "../../app/commercialization/commercialization-readiness-dashboard-contract.ts";
import {
  block_commercialization_dashboard,
  create_commercialization_readiness_dashboard,
  create_commercialization_readiness_dashboard_summary,
} from "../../app/commercialization/commercialization-readiness-dashboard-workflow.ts";
import {
  createV23PaidPilotLoopFixture,
} from "./v2-3-paid-pilot-loop-fixture.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "./v2-4-pilot-onboarding-packet-fixture.ts";

export function createV24CommercializationReadinessDashboardFixture() {
  const onboarding_fixture = createV24PilotOnboardingPacketFixture();
  const paid_pilot_loop = createV23PaidPilotLoopFixture();
  const payment_confirmed =
    paid_pilot_loop.main_loop.manual_payment_path[
      paid_pilot_loop.main_loop.manual_payment_path.length - 1
    ];

  const promising_manual_pilot =
    create_commercialization_readiness_dashboard({
      dashboard_id: "v2-4-dashboard-promising-manual-pilot",
      created_at: "2026-04-28T18:10:00.000Z",
      title: "V2.4 commercialization readiness dashboard for promising manual pilot",
      onboarding_packet_summary:
        onboarding_fixture.summaries.qualified_design_partner,
      source_refs: {
        manual_payment_status: payment_confirmed.status,
        payment_record_id: payment_confirmed.payment_record_id,
        next_action_proposal_id:
          paid_pilot_loop.main_loop.next_action_proposal.proposal_id,
        feedback_id: paid_pilot_loop.main_loop.feedback.feedback_id,
        case_study_permission_id:
          paid_pilot_loop.main_loop.case_study_permission.permission_id,
        v2_4_onboarding_packet_ref:
          "fixture:v2-4-pilot-onboarding-qualified",
      },
      evidence_signals: [
        "case_study_permission_present",
        "feedback_evidence_present",
        "manual_payment_confirmed",
        "onboarding_acknowledged",
        "onboarding_packet_present",
        "v2_3_paid_pilot_loop_refs_present",
      ],
      support_burden_signals: [
        "bounded_manual_support",
        "low_manual_support_burden",
      ],
      feedback_signals: [
        "feedback_accepted_for_learning",
        "willingness_to_continue",
        "willingness_to_pay_again",
      ],
      case_study_signals: ["private_reference_permission"],
      manual_review_notes: [
        "Manual pilot evidence is promising enough for founder review.",
      ],
    });

  const insufficient_evidence = create_commercialization_readiness_dashboard({
    dashboard_id: "v2-4-dashboard-insufficient-evidence",
    created_at: "2026-04-28T18:15:00.000Z",
    title: "V2.4 commercialization readiness dashboard with missing evidence",
    source_refs: {
      v2_4_onboarding_packet_ref: "fixture:missing-onboarding-packet",
    },
    evidence_signals: [],
    support_burden_signals: ["support_burden_unclear"],
    feedback_signals: ["feedback_absent"],
    case_study_signals: ["case_study_absent"],
  });

  const needs_operator_review = create_commercialization_readiness_dashboard({
    dashboard_id: "v2-4-dashboard-needs-operator-review",
    created_at: "2026-04-28T18:20:00.000Z",
    title: "V2.4 commercialization readiness dashboard for manual review",
    onboarding_packet_summary: onboarding_fixture.summaries.manual_review,
    source_refs: {
      manual_payment_status:
        onboarding_fixture.packets.manual_review.source_refs
          .manual_payment_status,
      payment_record_id:
        onboarding_fixture.packets.manual_review.source_refs.payment_record_id,
      next_action_proposal_id:
        onboarding_fixture.packets.manual_review.source_refs
          .next_action_proposal_id,
      feedback_id:
        paid_pilot_loop.branches.incomplete_feedback.feedback.feedback_id,
      case_study_permission_id:
        paid_pilot_loop.branches.denied_case_study_permission.permission
          .permission_id,
      v2_4_onboarding_packet_ref:
        "fixture:v2-4-pilot-onboarding-manual-review",
    },
    evidence_signals: [
      "feedback_evidence_present",
      "onboarding_packet_present",
      "v2_3_paid_pilot_loop_refs_present",
    ],
    support_burden_signals: ["needs_operator_review"],
    feedback_signals: ["feedback_incomplete"],
    case_study_signals: ["needs_legal_review"],
  });

  const blocked_base = create_commercialization_readiness_dashboard({
    dashboard_id: "v2-4-dashboard-blocked",
    created_at: "2026-04-28T18:25:00.000Z",
    title: "V2.4 commercialization readiness dashboard for blocked candidate",
    onboarding_packet_summary:
      onboarding_fixture.summaries.blocked_candidate_hold,
    source_refs: {
      next_action_proposal_id:
        onboarding_fixture.packets.blocked_candidate_hold.source_refs
          .next_action_proposal_id,
      v2_4_onboarding_packet_ref:
        "fixture:v2-4-pilot-onboarding-blocked-hold",
    },
    evidence_signals: ["onboarding_packet_present"],
    support_burden_signals: ["support_burden_blocked"],
    feedback_signals: ["feedback_absent"],
    case_study_signals: ["case_study_absent"],
  });
  const blocked_dashboard = block_commercialization_dashboard({
    dashboard: blocked_base,
    blocked_at: "2026-04-28T18:30:00.000Z",
    source_blocker: "blocked_onboarding_packet_requires_manual_boundary_review",
  });

  return {
    fixture_id: "v2-4-commercialization-readiness-dashboard-fixture",
    fixture_kind: "local_commercialization_readiness_dashboard",
    v2_3_stable_baseline: {
      tag: promising_manual_pilot.source_refs.v2_3_stable_tag,
      target_commit: promising_manual_pilot.source_refs.v2_3_stable_commit,
    },
    boundary_notices: [...V2_4_DASHBOARD_BOUNDARY_NOTICES],
    dashboards: {
      promising_manual_pilot,
      insufficient_evidence,
      needs_operator_review,
      blocked_dashboard,
    },
    summaries: {
      promising_manual_pilot:
        create_commercialization_readiness_dashboard_summary(
          promising_manual_pilot
        ),
      insufficient_evidence:
        create_commercialization_readiness_dashboard_summary(
          insufficient_evidence
        ),
      needs_operator_review:
        create_commercialization_readiness_dashboard_summary(
          needs_operator_review
        ),
      blocked_dashboard:
        create_commercialization_readiness_dashboard_summary(blocked_dashboard),
    },
    source_refs: {
      onboarding_packet_fixture_id: onboarding_fixture.fixture_id,
      paid_pilot_loop_fixture_id: paid_pilot_loop.fixture_id,
      intake_id: paid_pilot_loop.main_loop.intake.intake_id,
      design_partner_id: paid_pilot_loop.main_loop.intake.design_partner_id,
      payment_record_id: payment_confirmed.payment_record_id,
      feedback_id: paid_pilot_loop.main_loop.feedback.feedback_id,
      case_study_permission_id:
        paid_pilot_loop.main_loop.case_study_permission.permission_id,
    },
  } as const;
}

export const createEngagementReadinessViewFixture =
  createV24CommercializationReadinessDashboardFixture;
