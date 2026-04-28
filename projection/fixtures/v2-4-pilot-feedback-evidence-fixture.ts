import {
  V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES,
} from "../../app/commercialization/pilot-feedback-evidence-contract.ts";
import {
  block_pilot_feedback_evidence,
  create_pilot_feedback_evidence_record,
  create_pilot_feedback_evidence_summary,
} from "../../app/commercialization/pilot-feedback-evidence-workflow.ts";
import {
  createV23FeedbackCaptureFixture,
} from "./v2-3-feedback-capture-fixture.ts";
import {
  createV23PaidPilotLoopFixture,
} from "./v2-3-paid-pilot-loop-fixture.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "./v2-4-commercialization-readiness-dashboard-fixture.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "./v2-4-pilot-onboarding-packet-fixture.ts";

export function createV24PilotFeedbackEvidenceFixture() {
  const paid_pilot_loop = createV23PaidPilotLoopFixture();
  const feedback_fixture = createV23FeedbackCaptureFixture();
  const dashboard_fixture = createV24CommercializationReadinessDashboardFixture();
  const onboarding_fixture = createV24PilotOnboardingPacketFixture();

  const strong_manual_feedback_evidence =
    create_pilot_feedback_evidence_record({
      evidence_id: "v2-4-feedback-evidence-strong-manual",
      created_at: "2026-04-28T20:00:00.000Z",
      title: "V2.4 strong manual feedback evidence",
      feedback: paid_pilot_loop.main_loop.feedback,
      permission: paid_pilot_loop.main_loop.case_study_permission,
      dashboard_summary: dashboard_fixture.summaries.promising_manual_pilot,
      source_refs: {
        v2_4_dashboard_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
        v2_4_onboarding_packet_ref:
          "fixture:v2-4-pilot-onboarding-qualified",
      },
      evidence_notes: [
        "feedback accepted for local founder review",
        "private reference permission is safe for manual evidence review",
      ],
    });

  const useful_manual_feedback_evidence =
    create_pilot_feedback_evidence_record({
      evidence_id: "v2-4-feedback-evidence-useful-manual",
      created_at: "2026-04-28T20:05:00.000Z",
      title: "V2.4 useful manual feedback evidence",
      feedback: feedback_fixture.feedback_records.strong_anonymized_quote,
      permission: feedback_fixture.permission_records.anonymized_quote,
      dashboard_summary: dashboard_fixture.summaries.promising_manual_pilot,
      source_refs: {
        v2_4_dashboard_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
        v2_4_onboarding_packet_ref:
          "fixture:v2-4-pilot-onboarding-qualified",
      },
      evidence_notes: [
        "anonymized quote permission remains stored only as local evidence",
      ],
    });

  const weak_incomplete_feedback_evidence =
    create_pilot_feedback_evidence_record({
      evidence_id: "v2-4-feedback-evidence-weak-incomplete",
      created_at: "2026-04-28T20:10:00.000Z",
      title: "V2.4 weak incomplete feedback evidence",
      feedback: feedback_fixture.feedback_records.incomplete_feedback,
      permission: feedback_fixture.permission_records.denied,
      dashboard_summary: dashboard_fixture.summaries.needs_operator_review,
      usefulness_signals: ["usefulness_unclear"],
      support_signals: ["support_burden_summary_present"],
      continuation_signals: ["continuation_unclear"],
      permission_signals: ["permission_denied"],
      evidence_notes: [
        "feedback requires manual clarification before founder review",
      ],
    });

  const needs_operator_review_feedback_evidence =
    create_pilot_feedback_evidence_record({
      evidence_id: "v2-4-feedback-evidence-needs-operator-review",
      created_at: "2026-04-28T20:15:00.000Z",
      title: "V2.4 feedback evidence needing operator review",
      feedback: feedback_fixture.feedback_records.strong_anonymized_quote,
      permission: feedback_fixture.permission_records.needs_legal_review,
      dashboard_summary: dashboard_fixture.summaries.needs_operator_review,
      evidence_notes: [
        "permission scope requires manual legal review before evidence reuse",
      ],
    });

  const blocked_base = create_pilot_feedback_evidence_record({
    evidence_id: "v2-4-feedback-evidence-blocked",
    created_at: "2026-04-28T20:20:00.000Z",
    title: "V2.4 blocked feedback evidence",
    feedback: feedback_fixture.feedback_records.blocked_feedback,
    permission: feedback_fixture.permission_records.needs_legal_review,
    dashboard_summary: dashboard_fixture.summaries.blocked_dashboard,
    source_blockers: ["blocked_feedback_boundary_confusion"],
    evidence_notes: [
      "blocked feedback cannot be strengthened until boundary issue is resolved",
    ],
  });
  const blocked_feedback_evidence = block_pilot_feedback_evidence({
    evidence: blocked_base,
    blocked_at: "2026-04-28T20:25:00.000Z",
    source_blocker: "blocked_dashboard_requires_manual_boundary_review",
  });

  return {
    fixture_id: "v2-4-pilot-feedback-evidence-fixture",
    fixture_kind: "local_pilot_feedback_evidence_strengthening",
    v2_3_stable_baseline: {
      tag: strong_manual_feedback_evidence.source_refs.v2_3_stable_tag,
      target_commit:
        strong_manual_feedback_evidence.source_refs.v2_3_stable_commit,
    },
    boundary_notices: [...V2_4_FEEDBACK_EVIDENCE_BOUNDARY_NOTICES],
    evidence_records: {
      strong_manual_feedback_evidence,
      useful_manual_feedback_evidence,
      weak_incomplete_feedback_evidence,
      needs_operator_review_feedback_evidence,
      blocked_feedback_evidence,
    },
    summaries: {
      strong_manual_feedback_evidence:
        create_pilot_feedback_evidence_summary(
          strong_manual_feedback_evidence
        ),
      useful_manual_feedback_evidence:
        create_pilot_feedback_evidence_summary(
          useful_manual_feedback_evidence
        ),
      weak_incomplete_feedback_evidence:
        create_pilot_feedback_evidence_summary(
          weak_incomplete_feedback_evidence
        ),
      needs_operator_review_feedback_evidence:
        create_pilot_feedback_evidence_summary(
          needs_operator_review_feedback_evidence
        ),
      blocked_feedback_evidence:
        create_pilot_feedback_evidence_summary(blocked_feedback_evidence),
    },
    source_refs: {
      paid_pilot_loop_fixture_id: paid_pilot_loop.fixture_id,
      feedback_capture_fixture_id: feedback_fixture.fixture_id,
      dashboard_fixture_id: dashboard_fixture.fixture_id,
      onboarding_packet_fixture_id: onboarding_fixture.fixture_id,
      feedback_id: paid_pilot_loop.main_loop.feedback.feedback_id,
      case_study_permission_id:
        paid_pilot_loop.main_loop.case_study_permission.permission_id,
      dashboard_id:
        dashboard_fixture.dashboards.promising_manual_pilot.dashboard_id,
      onboarding_packet_id:
        onboarding_fixture.packets.qualified_design_partner.packet_id,
    },
  } as const;
}
