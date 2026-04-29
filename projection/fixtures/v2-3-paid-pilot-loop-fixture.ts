import {
  qualify_design_partner_intake,
} from "../../app/pilots/design-partner-qualification.ts";
import {
  accept_feedback_for_learning,
  create_case_study_permission_record,
  create_feedback_summary,
  create_pilot_feedback_record,
  grant_private_reference_permission,
  submit_pilot_feedback_record,
} from "../../app/pilots/feedback-capture-workflow.ts";
import {
  create_manual_payment_record,
  create_manual_payment_summary,
  mark_invoice_sent,
  mark_payment_confirmed,
  mark_payment_pending,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  create_next_action_proposal,
  create_next_action_proposal_summary,
} from "../../app/pilots/next-action-proposal-workflow.ts";
import {
  V2_2_STABLE_SOURCE_REFS,
} from "../../app/pilots/next-action-proposal-contract.ts";
import {
  qualify_pilot_intake_record,
  submit_pilot_intake_record,
} from "../../app/pilots/pilot-intake-workflow.ts";
import {
  createV22FounderDashboardContinuationFixture,
} from "./v2-2-founder-dashboard-continuation-fixture.ts";
import {
  createV22PrivateAlphaReviewPacketFixture,
} from "./v2-2-private-alpha-review-packet-fixture.ts";
import {
  createV23FeedbackCaptureFixture,
} from "./v2-3-feedback-capture-fixture.ts";
import {
  createV23ManualPaymentStatusFixture,
} from "./v2-3-manual-payment-status-fixture.ts";
import {
  createV23NextActionProposalFixture,
} from "./v2-3-next-action-proposal-fixture.ts";
import {
  V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "./v2-3-pilot-intake-fixture.ts";

const V2_3_LOOP_BOUNDARY_NOTICES = [
  "V2.3 paid pilot loop is manual-first, design-partner-only, local, review-only, and non-executing.",
  "V2.3 paid pilot loop tracks manual payment status only and does not implement a payment processor, checkout, subscription, or automated billing.",
  "V2.3 paid pilot loop does not dispatch providers or channels, install marketplace assets, publish testimonials, integrate CRM, send email, invoke models, or run agents.",
  "V2.3 paid pilot loop keeps no_paid_product_readiness_claim, no_public_beta_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
] as const;

function create_qualified_strong_intake() {
  return qualify_pilot_intake_record({
    intake: submit_pilot_intake_record({
      intake: V2_3_STRONG_FIT_PILOT_INTAKE,
      submitted_at: "2026-04-28T14:00:00.000Z",
    }),
    qualified_at: "2026-04-28T14:05:00.000Z",
  });
}

function create_blocked_intake() {
  return qualify_pilot_intake_record({
    intake: submit_pilot_intake_record({
      intake: V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
      submitted_at: "2026-04-28T14:10:00.000Z",
    }),
    qualified_at: "2026-04-28T14:15:00.000Z",
  });
}

function create_manual_review_intake() {
  return qualify_pilot_intake_record({
    intake: submit_pilot_intake_record({
      intake: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
      submitted_at: "2026-04-28T14:20:00.000Z",
    }),
    qualified_at: "2026-04-28T14:25:00.000Z",
  });
}

export function createV23PaidPilotLoopFixture() {
  const intake = create_qualified_strong_intake();
  const qualification_summary = qualify_design_partner_intake(intake);

  const invoice_draft = create_manual_payment_record({
    payment_record_id: "v2-3-paid-pilot-loop-manual-payment",
    intake,
    invoice_id: "v2-3-paid-pilot-loop-manual-invoice",
    created_at: "2026-04-28T14:30:00.000Z",
    method_hint: "manual_invoice",
    currency_code: "usd",
    amount_minor_units: 75000,
    invoice_label: "V2.3 design partner pilot manual invoice",
    manual_payment_instruction_ref: "manual-note:v2-3-paid-pilot-loop-invoice",
  });
  const invoice_sent = mark_invoice_sent({
    record: invoice_draft,
    sent_at: "2026-04-28T14:35:00.000Z",
  });
  const payment_pending = mark_payment_pending({
    record: invoice_sent,
    pending_at: "2026-04-28T14:40:00.000Z",
  });
  const payment_confirmed = mark_payment_confirmed({
    record: payment_pending,
    confirmed_at: "2026-04-28T14:45:00.000Z",
    manual_confirmation_ref: "manual-confirmation:v2-3-paid-pilot-loop",
  });

  const review_packet = createV22PrivateAlphaReviewPacketFixture();
  const dashboard = createV22FounderDashboardContinuationFixture();
  const next_action_proposal = create_next_action_proposal({
    proposal_id: "v2-3-paid-pilot-loop-next-action",
    created_at: "2026-04-28T14:50:00.000Z",
    intake,
    qualification_summary,
    manual_payment_record: payment_confirmed,
    manual_payment_summary: create_manual_payment_summary(payment_confirmed),
    review_packet_export: review_packet,
    dashboard_page_model: dashboard,
  });

  const feedback = accept_feedback_for_learning({
    feedback: submit_pilot_feedback_record({
      feedback: create_pilot_feedback_record({
        feedback_id: "v2-3-paid-pilot-loop-feedback",
        intake,
        payment_record: payment_confirmed,
        proposal: next_action_proposal,
        created_at: "2026-04-28T14:55:00.000Z",
        rating: 5,
        signals: [
          "would_pay_again",
          "useful",
          "continuation_value",
          "time_saving",
        ],
        usefulness_summary:
          "The manual paid pilot loop produced a useful local governance review packet.",
        artifact_quality_summary:
          "The review packet and dashboard continuation were clear enough for manual inspection.",
        continuation_value_summary:
          "Saved workspace and dashboard refs made the follow-up review faster.",
        confusion_or_risk_summary:
          "The pilot stayed clearly local, review-only, and non-executing.",
        support_burden_summary:
          "Manual support stayed bounded to one guided review session.",
        willingness_to_continue: true,
        willingness_to_pay_again: true,
        operator_notes:
          "Strong signal for RC readiness audit, without paid-product readiness claim.",
      }),
      submitted_at: "2026-04-28T15:00:00.000Z",
    }),
    accepted_at: "2026-04-28T15:05:00.000Z",
  });

  const case_study_permission = grant_private_reference_permission({
    permission: create_case_study_permission_record({
      permission_id: "v2-3-paid-pilot-loop-case-study-permission",
      feedback,
      created_at: "2026-04-28T15:10:00.000Z",
    }),
    granted_at: "2026-04-28T15:15:00.000Z",
    allowed_quote_refs: ["feedback:v2-3-paid-pilot-loop-feedback"],
  });

  const blocked_intake = create_blocked_intake();
  const manual_review_intake = create_manual_review_intake();
  const payment_fixture = createV23ManualPaymentStatusFixture();
  const proposal_fixture = createV23NextActionProposalFixture();
  const feedback_fixture = createV23FeedbackCaptureFixture();
  const blocked_proposal = create_next_action_proposal({
    proposal_id: "v2-3-paid-pilot-loop-blocked-branch-proposal",
    created_at: "2026-04-28T15:20:00.000Z",
    intake: blocked_intake,
    qualification_summary: qualify_design_partner_intake(blocked_intake),
  });
  const manual_review_proposal = create_next_action_proposal({
    proposal_id: "v2-3-paid-pilot-loop-manual-review-branch-proposal",
    created_at: "2026-04-28T15:25:00.000Z",
    intake: manual_review_intake,
    qualification_summary: qualify_design_partner_intake(manual_review_intake),
    manual_payment_record: payment_fixture.records.payment_blocked,
    manual_payment_summary: create_manual_payment_summary(
      payment_fixture.records.payment_blocked
    ),
  });

  const source_refs = {
    intake_id: intake.intake_id,
    design_partner_id: intake.design_partner_id,
    payment_record_id: payment_confirmed.payment_record_id,
    invoice_id: payment_confirmed.invoice_id,
    proposal_id: next_action_proposal.proposal_id,
    workspace_id: next_action_proposal.source_refs.workspace_id,
    review_packet_export_id:
      next_action_proposal.source_refs.review_packet_export_id,
    dashboard_page_id: next_action_proposal.source_refs.dashboard_page_id,
    v2_2_stable_tag: V2_2_STABLE_SOURCE_REFS.v2_2_stable_tag,
    v2_2_stable_commit: V2_2_STABLE_SOURCE_REFS.v2_2_stable_commit,
  };

  return {
    fixture_id: "v2-3-paid-pilot-loop-fixture",
    fixture_kind: "manual_first_paid_pilot_loop_e2e",
    v2_2_stable_baseline: {
      tag: V2_2_STABLE_SOURCE_REFS.v2_2_stable_tag,
      target_commit: V2_2_STABLE_SOURCE_REFS.v2_2_stable_commit,
    },
    boundary_notices: [...V2_3_LOOP_BOUNDARY_NOTICES],
    main_loop: {
      intake,
      qualification_summary,
      manual_payment_path: [
        invoice_draft,
        invoice_sent,
        payment_pending,
        payment_confirmed,
      ],
      payment_summary: create_manual_payment_summary(payment_confirmed),
      review_packet,
      dashboard,
      next_action_proposal,
      next_action_summary:
        create_next_action_proposal_summary(next_action_proposal),
      feedback,
      case_study_permission,
      feedback_summary: create_feedback_summary({
        feedback,
        permission: case_study_permission,
      }),
    },
    branches: {
      blocked_or_disqualified: {
        intake: blocked_intake,
        qualification_summary: qualify_design_partner_intake(blocked_intake),
        next_action_proposal: blocked_proposal,
        next_action_summary: create_next_action_proposal_summary(
          blocked_proposal
        ),
      },
      manual_review: {
        intake: manual_review_intake,
        qualification_summary: qualify_design_partner_intake(
          manual_review_intake
        ),
        payment_record: payment_fixture.records.payment_blocked,
        next_action_proposal: manual_review_proposal,
        next_action_summary: create_next_action_proposal_summary(
          manual_review_proposal
        ),
      },
      incomplete_feedback: {
        feedback: feedback_fixture.feedback_records.incomplete_feedback,
        summary: feedback_fixture.summaries.incomplete_feedback,
      },
      denied_case_study_permission: {
        feedback: feedback_fixture.feedback_records.incomplete_feedback,
        permission: feedback_fixture.permission_records.denied,
        summary: feedback_fixture.summaries.incomplete_feedback,
      },
    },
    final_loop_summary: {
      status: "rc_readiness_audit_candidate",
      loop_path:
        "pilot intake -> qualification -> manual payment status -> V2.2 refs -> review-only next-action proposal -> local feedback -> permission-gated case-study path",
      source_refs,
      next_manual_step: "open_v2_3_rc_readiness_audit",
      manual_first: true,
      design_partner_only: true,
      local_only: true,
      review_only: true,
      non_executing: true,
      no_public_beta_claim: true,
      no_paid_product_readiness_claim: true,
      no_provider_dispatch: true,
      no_channel_dispatch: true,
      no_marketplace_implementation: true,
      no_autonomous_execution: true,
      no_saas_sharing: true,
      no_payment_processor: true,
      no_checkout: true,
      no_subscription_management: true,
      no_crm_integration: true,
      no_email_dispatch: true,
      no_public_publishing: true,
      no_llm_call: true,
      no_agent_dispatch: true,
      no_mplp_certification: true,
      no_mplp_endorsement: true,
    },
  } as const;
}

export const createPaidPilotEngagementLoopFixture =
  createV23PaidPilotLoopFixture;
