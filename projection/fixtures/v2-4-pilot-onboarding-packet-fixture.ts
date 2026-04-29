import {
  V2_4_ONBOARDING_BOUNDARY_NOTICES,
} from "../../app/commercialization/pilot-onboarding-packet-contract.ts";
import {
  create_pilot_onboarding_packet,
  create_pilot_onboarding_packet_summary,
  mark_pilot_onboarding_packet_acknowledged_manually,
  mark_pilot_onboarding_packet_ready_for_manual_review,
} from "../../app/commercialization/pilot-onboarding-packet-workflow.ts";
import {
  createV23PaidPilotLoopFixture,
} from "./v2-3-paid-pilot-loop-fixture.ts";

const REQUIRED_INPUTS = [
  {
    input_id: "project_context_summary",
    label: "Project context summary",
    description:
      "Manual summary of the repo, project governance state, and current review need.",
    required: true,
    source_ref_hint: "intake.technical_context_summary",
  },
  {
    input_id: "current_governance_risk",
    label: "Current governance risk",
    description:
      "Manual description of the release, architecture, or continuation risk to review.",
    required: true,
    source_ref_hint: "intake.pain_profile.release_or_project_risk",
  },
  {
    input_id: "desired_pilot_outcome",
    label: "Desired pilot outcome",
    description:
      "Manual statement of what the design partner wants to learn from the pilot.",
    required: true,
    source_ref_hint: "intake.expectation_profile.desired_outcome",
  },
  {
    input_id: "local_review_artifact_refs",
    label: "Local review artifact refs",
    description:
      "Optional local refs to workspace, review packet, dashboard, or feedback artifacts.",
    required: false,
    source_ref_hint: "v2_3_paid_pilot_loop.source_refs",
  },
] as const;

const SUPPORT_BOUNDARIES = [
  {
    boundary_id: "manual_support_window",
    summary: "Pilot support is manually coordinated and bounded to guided review.",
    operator_responsibility:
      "Prepare the local review packet and guide the design-partner review.",
    design_partner_responsibility:
      "Provide project context and manually acknowledge the packet before start.",
    escalation_path: "manual_operator_review",
    non_scope: [
      "autonomous_execution",
      "crm_integration",
      "email_dispatch",
      "payment_execution",
      "public_publishing",
      "saas_sharing",
    ],
  },
  {
    boundary_id: "local_review_boundary",
    summary: "Pilot artifacts stay local, review-only, and non-executing.",
    operator_responsibility:
      "Keep source refs bounded to V2.3 pilot artifacts and local review outputs.",
    design_partner_responsibility:
      "Use the packet for manual review preparation, not automated execution.",
    escalation_path: "manual_boundary_review",
    non_scope: [
      "agent_dispatch",
      "channel_dispatch",
      "llm_call",
      "marketplace_implementation",
      "model_call",
      "provider_dispatch",
      "tool_invocation",
    ],
  },
] as const;

function create_expectation_profile() {
  return {
    pilot_goal:
      "Clarify the manual starting context for a bounded design-partner pilot.",
    desired_business_learning:
      "Learn whether the V2.3 paid pilot loop can produce useful local review evidence.",
    expected_operator_support:
      "Manual review preparation, boundary clarification, and local artifact walkthrough.",
    expected_design_partner_action:
      "Provide project context, review the packet, and acknowledge the boundaries manually.",
    acknowledged_manual_first: true,
    acknowledged_bounded_pilot_only: true,
    acknowledged_local_review_only: true,
    acknowledged_non_executing: true,
    acknowledged_no_public_beta: true,
    acknowledged_no_readiness_claims: true,
  };
}

function create_source_refs_from_loop() {
  const loop = createV23PaidPilotLoopFixture();
  const payment_confirmed =
    loop.main_loop.manual_payment_path[
      loop.main_loop.manual_payment_path.length - 1
    ];

  return {
    loop,
    source_refs: {
      intake_id: loop.main_loop.intake.intake_id,
      design_partner_id: loop.main_loop.intake.design_partner_id,
      qualification_classification:
        loop.main_loop.qualification_summary.classification,
      manual_payment_status: payment_confirmed.status,
      payment_record_id: payment_confirmed.payment_record_id,
      next_action_proposal_id: loop.main_loop.next_action_proposal.proposal_id,
      feedback_id: loop.main_loop.feedback.feedback_id,
      case_study_permission_id:
        loop.main_loop.case_study_permission.permission_id,
    },
  } as const;
}

export function createV24PilotOnboardingPacketFixture() {
  const { loop, source_refs } = create_source_refs_from_loop();

  const qualified_draft = create_pilot_onboarding_packet({
    packet_id: "v2-4-pilot-onboarding-qualified",
    created_at: "2026-04-28T16:00:00.000Z",
    audience: "design_partner",
    title: "V2.4 pilot onboarding packet for qualified design partner",
    expectation_profile: create_expectation_profile(),
    required_inputs: [...REQUIRED_INPUTS],
    support_boundaries: [...SUPPORT_BOUNDARIES],
    source_refs,
  });
  const qualified_ready = mark_pilot_onboarding_packet_ready_for_manual_review({
    packet: qualified_draft,
    reviewed_at: "2026-04-28T16:05:00.000Z",
  });
  const qualified_acknowledged =
    mark_pilot_onboarding_packet_acknowledged_manually({
      packet: qualified_ready,
      acknowledged_at: "2026-04-28T16:10:00.000Z",
      manual_acknowledgement_ref:
        "manual-ack:v2-4-pilot-onboarding-qualified",
    });

  const manual_review_packet = create_pilot_onboarding_packet({
    packet_id: "v2-4-pilot-onboarding-manual-review",
    created_at: "2026-04-28T16:15:00.000Z",
    audience: "operator",
    title: "V2.4 pilot onboarding packet for manual review candidate",
    status: "ready_for_manual_review",
    expectation_profile: create_expectation_profile(),
    required_inputs: [...REQUIRED_INPUTS],
    support_boundaries: [...SUPPORT_BOUNDARIES],
    source_refs: {
      intake_id: loop.branches.manual_review.intake.intake_id,
      design_partner_id: loop.branches.manual_review.intake.design_partner_id,
      qualification_classification:
        loop.branches.manual_review.qualification_summary.classification,
      manual_payment_status: loop.branches.manual_review.payment_record.status,
      payment_record_id:
        loop.branches.manual_review.payment_record.payment_record_id,
      next_action_proposal_id:
        loop.branches.manual_review.next_action_proposal.proposal_id,
    },
  });

  const blocked_candidate_hold_packet = create_pilot_onboarding_packet({
    packet_id: "v2-4-pilot-onboarding-blocked-hold",
    created_at: "2026-04-28T16:20:00.000Z",
    audience: "operator",
    title: "V2.4 pilot onboarding hold packet for blocked candidate",
    status: "blocked",
    expectation_profile: create_expectation_profile(),
    required_inputs: [...REQUIRED_INPUTS],
    support_boundaries: [...SUPPORT_BOUNDARIES],
    source_refs: {
      intake_id: loop.branches.blocked_or_disqualified.intake.intake_id,
      design_partner_id:
        loop.branches.blocked_or_disqualified.intake.design_partner_id,
      qualification_classification:
        loop.branches.blocked_or_disqualified.qualification_summary
          .classification,
      next_action_proposal_id:
        loop.branches.blocked_or_disqualified.next_action_proposal.proposal_id,
    },
    blocking_reasons: [
      "candidate_requested_forbidden_capabilities",
      "manual_operator_review_required_before_any_pilot_start",
    ],
  });

  const paid_pilot_loop_source_refs_packet = create_pilot_onboarding_packet({
    packet_id: "v2-4-pilot-onboarding-v2-3-loop-refs",
    created_at: "2026-04-28T16:25:00.000Z",
    audience: "operator",
    title: "V2.4 pilot onboarding packet with V2.3 paid pilot loop refs",
    expectation_profile: create_expectation_profile(),
    required_inputs: [...REQUIRED_INPUTS],
    support_boundaries: [...SUPPORT_BOUNDARIES],
    source_refs,
  });

  return {
    fixture_id: "v2-4-pilot-onboarding-packet-fixture",
    fixture_kind: "commercialization_readiness_onboarding_packet",
    v2_3_stable_baseline: {
      tag: qualified_acknowledged.source_refs.v2_3_stable_tag,
      target_commit: qualified_acknowledged.source_refs.v2_3_stable_commit,
    },
    boundary_notices: [...V2_4_ONBOARDING_BOUNDARY_NOTICES],
    packets: {
      qualified_design_partner: qualified_acknowledged,
      manual_review: manual_review_packet,
      blocked_candidate_hold: blocked_candidate_hold_packet,
      paid_pilot_loop_source_refs: paid_pilot_loop_source_refs_packet,
    },
    summaries: {
      qualified_design_partner:
        create_pilot_onboarding_packet_summary(qualified_acknowledged),
      manual_review:
        create_pilot_onboarding_packet_summary(manual_review_packet),
      blocked_candidate_hold:
        create_pilot_onboarding_packet_summary(blocked_candidate_hold_packet),
      paid_pilot_loop_source_refs:
        create_pilot_onboarding_packet_summary(
          paid_pilot_loop_source_refs_packet
        ),
    },
    source_loop_summary: loop.final_loop_summary,
  } as const;
}

export const createEngagementOnboardingPacketFixture =
  createV24PilotOnboardingPacketFixture;
