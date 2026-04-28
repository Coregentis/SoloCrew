import {
  V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES,
} from "../../app/commercialization/case-study-conversion-gate-contract.ts";
import {
  block_case_study_conversion_gate,
  create_case_study_conversion_gate,
  create_case_study_conversion_gate_summary,
} from "../../app/commercialization/case-study-conversion-gate-workflow.ts";
import {
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
  createV24PilotFeedbackEvidenceFixture,
} from "./v2-4-pilot-feedback-evidence-fixture.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "./v2-4-pilot-onboarding-packet-fixture.ts";

export function createV24CaseStudyConversionGateFixture() {
  const feedback_evidence_fixture = createV24PilotFeedbackEvidenceFixture();
  const feedback_fixture = createV23FeedbackCaptureFixture();
  const paid_pilot_loop = createV23PaidPilotLoopFixture();
  const dashboard_fixture = createV24CommercializationReadinessDashboardFixture();
  const onboarding_fixture = createV24PilotOnboardingPacketFixture();

  const useful_private_reference_evidence =
    create_pilot_feedback_evidence_record({
      evidence_id: "v2-4-feedback-evidence-useful-private-reference",
      created_at: "2026-04-28T22:00:00.000Z",
      title: "V2.4 useful private-reference feedback evidence",
      feedback: feedback_fixture.feedback_records.strong_private_reference,
      permission: feedback_fixture.permission_records.private_reference,
      dashboard_summary: dashboard_fixture.summaries.promising_manual_pilot,
      continuation_signals: [
        "continuation_value_present",
        "willingness_to_continue",
      ],
      source_refs: {
        v2_4_dashboard_ref: "fixture:v2-4-dashboard-promising-manual-pilot",
        v2_4_onboarding_packet_ref:
          "fixture:v2-4-pilot-onboarding-qualified",
      },
      evidence_notes: [
        "private reference candidate stays below manual conversion review",
      ],
    });
  const useful_private_reference_summary =
    create_pilot_feedback_evidence_summary(useful_private_reference_evidence);

  const private_reference_review_candidate = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-private-reference-review",
    created_at: "2026-04-28T22:05:00.000Z",
    title: "V2.4 private reference review gate",
    permission: feedback_fixture.permission_records.private_reference,
    feedback_evidence_summary: useful_private_reference_summary,
    manual_review_notes: [
      "Private reference evidence may be reviewed manually by the founder.",
    ],
  });

  const anonymized_quote_review_candidate = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-anonymized-quote-review",
    created_at: "2026-04-28T22:10:00.000Z",
    title: "V2.4 anonymized quote review gate",
    permission: feedback_fixture.permission_records.anonymized_quote,
    feedback_evidence_summary:
      feedback_evidence_fixture.summaries.useful_manual_feedback_evidence,
    manual_review_notes: [
      "Anonymized quote evidence may be reviewed manually but is not published.",
    ],
  });

  const manual_conversion_review_candidate =
    create_case_study_conversion_gate({
      gate_id: "v2-4-conversion-gate-manual-conversion-review",
      created_at: "2026-04-28T22:15:00.000Z",
      title: "V2.4 manual conversion review gate",
      permission: paid_pilot_loop.main_loop.case_study_permission,
      feedback_evidence_summary:
        feedback_evidence_fixture.summaries.strong_manual_feedback_evidence,
      manual_review_notes: [
        "Strong manual evidence may be reviewed for a manual conversion conversation only.",
      ],
    });

  const legal_review_required = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-legal-review-required",
    created_at: "2026-04-28T22:20:00.000Z",
    title: "V2.4 legal review required gate",
    permission: feedback_fixture.permission_records.needs_legal_review,
    feedback_evidence_summary:
      feedback_evidence_fixture.summaries.needs_operator_review_feedback_evidence,
    manual_review_notes: [
      "Permission scope requires manual legal review before any further review.",
    ],
  });

  const denied_public_use = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-denied-public-use",
    created_at: "2026-04-28T22:25:00.000Z",
    title: "V2.4 denied public-use gate",
    permission: feedback_fixture.permission_records.denied,
    feedback_evidence_summary:
      feedback_evidence_fixture.summaries.weak_incomplete_feedback_evidence,
    manual_review_notes: [
      "Denied permission means evidence remains private for internal learning review.",
    ],
  });

  const insufficient_evidence_hold = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-insufficient-evidence-hold",
    created_at: "2026-04-28T22:30:00.000Z",
    title: "V2.4 insufficient evidence hold gate",
    manual_review_notes: [
      "No permission or strengthened feedback evidence is present yet.",
    ],
  });

  const blocked_base = create_case_study_conversion_gate({
    gate_id: "v2-4-conversion-gate-blocked",
    created_at: "2026-04-28T22:35:00.000Z",
    title: "V2.4 blocked conversion gate",
    permission: feedback_fixture.permission_records.needs_legal_review,
    feedback_evidence_summary:
      feedback_evidence_fixture.summaries.blocked_feedback_evidence,
    source_blockers: ["blocked_feedback_evidence_requires_manual_boundary_review"],
    manual_review_notes: [
      "Blocked evidence cannot enter a conversion review gate.",
    ],
  });
  const blocked_gate = block_case_study_conversion_gate({
    gate: blocked_base,
    blocked_at: "2026-04-28T22:40:00.000Z",
    source_blocker: "blocked_case_study_permission_requires_manual_review",
  });

  return {
    fixture_id: "v2-4-case-study-conversion-gate-fixture",
    fixture_kind: "manual_case_study_permission_and_conversion_readiness_gate",
    v2_3_stable_baseline: {
      tag: manual_conversion_review_candidate.source_refs.v2_3_stable_tag,
      target_commit:
        manual_conversion_review_candidate.source_refs.v2_3_stable_commit,
    },
    boundary_notices: [...V2_4_CASE_STUDY_CONVERSION_BOUNDARY_NOTICES],
    gates: {
      private_reference_review_candidate,
      anonymized_quote_review_candidate,
      manual_conversion_review_candidate,
      legal_review_required,
      denied_public_use,
      insufficient_evidence_hold,
      blocked_gate,
    },
    summaries: {
      private_reference_review_candidate:
        create_case_study_conversion_gate_summary(
          private_reference_review_candidate
        ),
      anonymized_quote_review_candidate:
        create_case_study_conversion_gate_summary(
          anonymized_quote_review_candidate
        ),
      manual_conversion_review_candidate:
        create_case_study_conversion_gate_summary(
          manual_conversion_review_candidate
        ),
      legal_review_required:
        create_case_study_conversion_gate_summary(legal_review_required),
      denied_public_use:
        create_case_study_conversion_gate_summary(denied_public_use),
      insufficient_evidence_hold:
        create_case_study_conversion_gate_summary(insufficient_evidence_hold),
      blocked_gate: create_case_study_conversion_gate_summary(blocked_gate),
    },
    source_refs: {
      feedback_evidence_fixture_id: feedback_evidence_fixture.fixture_id,
      feedback_capture_fixture_id: feedback_fixture.fixture_id,
      paid_pilot_loop_fixture_id: paid_pilot_loop.fixture_id,
      dashboard_fixture_id: dashboard_fixture.fixture_id,
      onboarding_packet_fixture_id: onboarding_fixture.fixture_id,
      feedback_evidence_id:
        feedback_evidence_fixture.source_refs.feedback_id,
      case_study_permission_id:
        feedback_evidence_fixture.source_refs.case_study_permission_id,
      dashboard_id:
        dashboard_fixture.dashboards.promising_manual_pilot.dashboard_id,
      onboarding_packet_id:
        onboarding_fixture.packets.qualified_design_partner.packet_id,
    },
  } as const;
}
