import {
  create_case_study_conversion_gate,
  create_case_study_conversion_gate_summary,
} from "../../app/commercialization/case-study-conversion-gate-workflow.ts";
import {
  createV23FeedbackCaptureFixture,
} from "./v2-3-feedback-capture-fixture.ts";
import {
  createV23PaidPilotLoopFixture,
} from "./v2-3-paid-pilot-loop-fixture.ts";
import {
  createV24CaseStudyConversionGateFixture,
} from "./v2-4-case-study-conversion-gate-fixture.ts";
import {
  createV24CommercializationReadinessDashboardFixture,
} from "./v2-4-commercialization-readiness-dashboard-fixture.ts";
import {
  createV24PilotFeedbackEvidenceFixture,
} from "./v2-4-pilot-feedback-evidence-fixture.ts";
import {
  createV24PilotOnboardingPacketFixture,
} from "./v2-4-pilot-onboarding-packet-fixture.ts";

const V2_4_LOOP_BOUNDARY_FLAGS = {
  manual_first: true,
  bounded_pilot_only: true,
  design_partner_only: true,
  local_only: true,
  review_only: true,
  non_executing: true,
  no_payment_processor: true,
  no_checkout: true,
  no_subscription_management: true,
  no_automated_billing: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace_implementation: true,
  no_crm_integration: true,
  no_email_dispatch: true,
  no_public_publishing: true,
  no_testimonial_publishing: true,
  no_public_case_study_generation: true,
  no_external_analytics: true,
  no_customer_account_provisioning: true,
  no_automatic_conversion: true,
  no_llm_call: true,
  no_model_call: true,
  no_agent_dispatch: true,
  no_tool_invocation: true,
  no_saas_sharing: true,
  no_autonomous_execution: true,
  no_public_beta_claim: true,
  no_paid_product_readiness_claim: true,
  no_commercial_readiness_claim: true,
  no_production_ready_claim: true,
  no_v3_claim: true,
  no_mplp_certification: true,
  no_mplp_endorsement: true,
  no_cognitive_os_law_redefinition: true,
  no_mplp_law_redefinition: true,
} as const;

const V2_4_LOOP_BOUNDARY_NOTICES = [
  "V2.4 commercialization readiness loop is manual_first, bounded_pilot_only, design_partner_only, local_only, review_only, and non_executing.",
  "V2.4 commercialization readiness loop composes existing local evidence only and does not create payment, dispatch, marketplace, CRM, email, publishing, testimonial, analytics, model, agent, tool, SaaS, customer-account, conversion, package, or autonomy behavior.",
  "V2.4 commercialization readiness loop preserves no_public_beta_claim, no_paid_product_readiness_claim, no_commercial_readiness_claim, no_production_ready_claim, no_v3_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
] as const;

export function createV24CommercializationReadinessLoopFixture() {
  const paid_pilot_loop = createV23PaidPilotLoopFixture();
  const feedback_capture_fixture = createV23FeedbackCaptureFixture();
  const onboarding_fixture = createV24PilotOnboardingPacketFixture();
  const dashboard_fixture = createV24CommercializationReadinessDashboardFixture();
  const feedback_evidence_fixture = createV24PilotFeedbackEvidenceFixture();
  const conversion_gate_fixture = createV24CaseStudyConversionGateFixture();

  const needs_operator_review_gate = create_case_study_conversion_gate({
    gate_id: "v2-4-loop-conversion-gate-needs-operator-review",
    created_at: "2026-04-28T23:55:00.000Z",
    title: "V2.4 loop needs-operator-review gate",
    permission: feedback_capture_fixture.permission_records.private_reference,
    feedback_evidence_summary:
      feedback_evidence_fixture.summaries.needs_operator_review_feedback_evidence,
    manual_review_notes: [
      "Mixed feedback evidence must be resolved manually before any conversion review.",
    ],
  });
  const needs_operator_review_gate_summary =
    create_case_study_conversion_gate_summary(needs_operator_review_gate);

  const source_chain = {
    intake_id: paid_pilot_loop.main_loop.intake.intake_id,
    design_partner_id: paid_pilot_loop.main_loop.intake.design_partner_id,
    payment_record_id:
      paid_pilot_loop.main_loop.payment_summary.payment_record_id,
    invoice_id: paid_pilot_loop.main_loop.payment_summary.invoice_id,
    next_action_proposal_id:
      paid_pilot_loop.main_loop.next_action_proposal.proposal_id,
    workspace_id:
      paid_pilot_loop.main_loop.next_action_proposal.source_refs.workspace_id,
    review_packet_export_id:
      paid_pilot_loop.main_loop.next_action_proposal.source_refs
        .review_packet_export_id,
    dashboard_page_id:
      paid_pilot_loop.main_loop.next_action_proposal.source_refs
        .dashboard_page_id,
    feedback_id: paid_pilot_loop.main_loop.feedback.feedback_id,
    case_study_permission_id:
      paid_pilot_loop.main_loop.case_study_permission.permission_id,
    onboarding_packet_id:
      onboarding_fixture.packets.qualified_design_partner.packet_id,
    commercialization_dashboard_id:
      dashboard_fixture.dashboards.promising_manual_pilot.dashboard_id,
    feedback_evidence_id:
      feedback_evidence_fixture.evidence_records.strong_manual_feedback_evidence
        .evidence_id,
    conversion_gate_id:
      conversion_gate_fixture.gates.manual_conversion_review_candidate.gate_id,
    v2_3_stable_tag:
      conversion_gate_fixture.gates.manual_conversion_review_candidate
        .source_refs.v2_3_stable_tag,
    v2_3_stable_commit:
      conversion_gate_fixture.gates.manual_conversion_review_candidate
        .source_refs.v2_3_stable_commit,
  } as const;

  return {
    loop_id: "v2-4-commercialization-readiness-loop",
    fixture_id: "v2-4-commercialization-readiness-loop-fixture",
    fixture_kind: "commercialization_readiness_loop_e2e",
    created_at: "2026-04-28T23:59:00.000Z",
    v2_3_stable_baseline: {
      tag: source_chain.v2_3_stable_tag,
      target_commit: source_chain.v2_3_stable_commit,
    },
    source_chain,
    boundary_flags: V2_4_LOOP_BOUNDARY_FLAGS,
    boundary_notices: [...V2_4_LOOP_BOUNDARY_NOTICES],
    composed_fixture_refs: {
      paid_pilot_loop_fixture_id: paid_pilot_loop.fixture_id,
      onboarding_packet_fixture_id: onboarding_fixture.fixture_id,
      dashboard_fixture_id: dashboard_fixture.fixture_id,
      feedback_evidence_fixture_id: feedback_evidence_fixture.fixture_id,
      conversion_gate_fixture_id: conversion_gate_fixture.fixture_id,
    },
    stage_summaries: {
      paid_pilot_loop: paid_pilot_loop.final_loop_summary,
      onboarding: onboarding_fixture.summaries.qualified_design_partner,
      dashboard: dashboard_fixture.summaries.promising_manual_pilot,
      feedback_evidence:
        feedback_evidence_fixture.summaries.strong_manual_feedback_evidence,
      conversion_gate:
        conversion_gate_fixture.summaries.manual_conversion_review_candidate,
    },
    cases: {
      promising_manual_pilot: {
        case_id: "v2-4-loop-case-promising-manual-pilot",
        stage_summaries: {
          onboarding: onboarding_fixture.summaries.qualified_design_partner,
          dashboard: dashboard_fixture.summaries.promising_manual_pilot,
          feedback_evidence:
            feedback_evidence_fixture.summaries.strong_manual_feedback_evidence,
          conversion_gate:
            conversion_gate_fixture.summaries.manual_conversion_review_candidate,
        },
        final_gate_decision: "prepare_manual_conversion_review",
        manual_first: true,
        local_only: true,
        review_only: true,
        non_executing: true,
        no_automatic_conversion: true,
      },
      insufficient_evidence: {
        case_id: "v2-4-loop-case-insufficient-evidence",
        stage_summaries: {
          onboarding: onboarding_fixture.summaries.paid_pilot_loop_source_refs,
          dashboard: dashboard_fixture.summaries.insufficient_evidence,
          feedback_evidence:
            feedback_evidence_fixture.summaries.weak_incomplete_feedback_evidence,
          conversion_gate:
            conversion_gate_fixture.summaries.insufficient_evidence_hold,
        },
        final_gate_decision: "hold_for_more_evidence",
        manual_first: true,
        local_only: true,
        review_only: true,
        non_executing: true,
        no_automatic_conversion: true,
      },
      needs_operator_review: {
        case_id: "v2-4-loop-case-needs-operator-review",
        stage_summaries: {
          onboarding: onboarding_fixture.summaries.manual_review,
          dashboard: dashboard_fixture.summaries.needs_operator_review,
          feedback_evidence:
            feedback_evidence_fixture.summaries
              .needs_operator_review_feedback_evidence,
          conversion_gate: needs_operator_review_gate_summary,
        },
        final_gate_decision: "hold_for_more_evidence",
        manual_first: true,
        local_only: true,
        review_only: true,
        non_executing: true,
        no_automatic_conversion: true,
      },
      legal_review: {
        case_id: "v2-4-loop-case-legal-review",
        stage_summaries: {
          onboarding: onboarding_fixture.summaries.manual_review,
          dashboard: dashboard_fixture.summaries.needs_operator_review,
          feedback_evidence:
            feedback_evidence_fixture.summaries
              .needs_operator_review_feedback_evidence,
          conversion_gate: conversion_gate_fixture.summaries.legal_review_required,
        },
        final_gate_decision: "require_legal_review",
        manual_first: true,
        local_only: true,
        review_only: true,
        non_executing: true,
        no_automatic_conversion: true,
      },
      denied_public_use: {
        case_id: "v2-4-loop-case-denied-public-use",
        stage_summaries: {
          onboarding: onboarding_fixture.summaries.manual_review,
          dashboard: dashboard_fixture.summaries.needs_operator_review,
          feedback_evidence:
            feedback_evidence_fixture.summaries.weak_incomplete_feedback_evidence,
          conversion_gate: conversion_gate_fixture.summaries.denied_public_use,
        },
        final_gate_decision: "deny_public_use",
        manual_first: true,
        local_only: true,
        review_only: true,
        non_executing: true,
        no_automatic_conversion: true,
      },
      blocked: {
        case_id: "v2-4-loop-case-blocked",
        stage_summaries: {
          onboarding: onboarding_fixture.summaries.blocked_candidate_hold,
          dashboard: dashboard_fixture.summaries.blocked_dashboard,
          feedback_evidence:
            feedback_evidence_fixture.summaries.blocked_feedback_evidence,
          conversion_gate: conversion_gate_fixture.summaries.blocked_gate,
        },
        final_gate_decision: "blocked",
        manual_first: true,
        local_only: true,
        review_only: true,
        non_executing: true,
        no_automatic_conversion: true,
      },
    },
    final_loop_summary: {
      status: "rc_readiness_audit_candidate",
      loop_path:
        "V2.3 paid pilot loop -> V2.4 onboarding packet -> commercialization readiness dashboard -> feedback evidence -> case-study conversion gate",
      final_gate_decision:
        conversion_gate_fixture.summaries.manual_conversion_review_candidate
          .decision,
      next_manual_step: "open_v2_4_rc_readiness_audit",
      source_chain,
      manual_first: true,
      bounded_pilot_only: true,
      design_partner_only: true,
      local_only: true,
      review_only: true,
      non_executing: true,
      no_payment_processor: true,
      no_checkout: true,
      no_subscription_management: true,
      no_automated_billing: true,
      no_provider_dispatch: true,
      no_channel_dispatch: true,
      no_marketplace_implementation: true,
      no_crm_integration: true,
      no_email_dispatch: true,
      no_public_publishing: true,
      no_testimonial_publishing: true,
      no_public_case_study_generation: true,
      no_external_analytics: true,
      no_customer_account_provisioning: true,
      no_automatic_conversion: true,
      no_llm_call: true,
      no_model_call: true,
      no_agent_dispatch: true,
      no_tool_invocation: true,
      no_saas_sharing: true,
      no_autonomous_execution: true,
      no_public_beta_claim: true,
      no_paid_product_readiness_claim: true,
      no_commercial_readiness_claim: true,
      no_production_ready_claim: true,
      no_v3_claim: true,
      no_mplp_certification: true,
      no_mplp_endorsement: true,
    },
  } as const;
}
