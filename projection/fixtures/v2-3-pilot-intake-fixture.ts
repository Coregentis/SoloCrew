import {
  create_pilot_intake_record,
  qualify_pilot_intake_record,
  submit_pilot_intake_record,
} from "../../app/pilots/pilot-intake-workflow.ts";
import type {
  V2_3PilotIntakeRecord,
} from "../../app/pilots/pilot-intake-contract.ts";
import {
  V2_3_PILOT_BOUNDARY_NOTICES,
} from "../../app/pilots/pilot-intake-contract.ts";

const V2_2_STABLE_BASELINE = {
  tag: "solocrew-v2.2-stable-private-alpha-journey-20260428",
  target_commit: "aaef0147290848c35e68d8eb4e84616f904454e3",
  journey:
    "workspace/session continuity -> local review packet export -> founder dashboard continuation -> private-alpha journey E2E",
} as const;

export const V2_3_STRONG_FIT_PILOT_INTAKE = create_pilot_intake_record({
  intake_id: "v2-3-pilot-intake-strong-fit",
  design_partner_id: "design-partner-strong-fit",
  created_at: "2026-04-28T06:00:00.000Z",
  primary_use_case: "release_readiness_review",
  applicant_profile: {
    applicant_name: "Design Partner One",
    role: "solo founder",
    organization_or_project: "Protocol Tooling Studio",
    contact_ref: "manual-contact:design-partner-one",
    technical_context_summary:
      "Maintains a repo with release governance, architecture notes, and review evidence.",
    project_stage: "private_alpha_release_candidate",
    repo_or_project_ref: "repo:protocol-tooling-studio",
  },
  pain_profile: {
    governance_pain_summary:
      "Needs repeatable governance review before each repo release.",
    current_ai_workflow_pain:
      "Current AI workflow loses continuity across release-readiness sessions.",
    release_or_project_risk:
      "Release notes and architecture decisions drift without a saved review packet.",
    continuity_need:
      "Needs saved workspace continuation from prior review sessions.",
    review_packet_need:
      "Needs a local review packet to inspect before manual release decisions.",
  },
  expectation_profile: {
    desired_outcome:
      "A guided project governance packet and continuation summary for manual review.",
    urgency: "high",
    willingness_to_use_local_review_only_flow: true,
    accepts_manual_onboarding: true,
    accepts_manual_payment: true,
    understands_not_public_beta: true,
    understands_non_executing_boundary: true,
  },
  related_v2_2_workspace_id: "v2-2-private-alpha-journey-workspace",
  related_v2_2_review_packet_export_id: "v2-2-private-alpha-review-packet",
});

export const V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE =
  create_pilot_intake_record({
    intake_id: "v2-3-pilot-intake-forbidden-request",
    design_partner_id: "design-partner-forbidden-request",
    created_at: "2026-04-28T06:05:00.000Z",
    primary_use_case: "other_manual_review",
    applicant_profile: {
      applicant_name: "Blocked Candidate",
      role: "operator",
      organization_or_project: "Automation Request",
      contact_ref: "manual-contact:blocked-candidate",
      technical_context_summary:
        "Asks for provider_dispatch, marketplace installation, and autonomous_execution.",
      project_stage: "unknown",
      repo_or_project_ref: "repo:blocked-candidate",
    },
    pain_profile: {
      governance_pain_summary:
        "Wants public_beta SaaS workflow instead of local review.",
      current_ai_workflow_pain:
        "Requests production_ready autonomous_execution.",
      release_or_project_risk:
        "Requires marketplace and channel_dispatch behavior.",
      continuity_need: "No local continuation requirement stated.",
      review_packet_need: "No review packet need stated.",
    },
    expectation_profile: {
      desired_outcome:
        "Public_beta provider_dispatch with marketplace and autonomous_execution.",
      urgency: "high",
      willingness_to_use_local_review_only_flow: false,
      accepts_manual_onboarding: false,
      accepts_manual_payment: false,
      understands_not_public_beta: false,
      understands_non_executing_boundary: false,
    },
  });

export const V2_3_MANUAL_REVIEW_PILOT_INTAKE = create_pilot_intake_record({
  intake_id: "v2-3-pilot-intake-manual-review",
  design_partner_id: "design-partner-manual-review",
  created_at: "2026-04-28T06:10:00.000Z",
  primary_use_case: "architecture_governance_review",
  applicant_profile: {
    applicant_name: "Manual Review Candidate",
    role: "technical operator",
    organization_or_project: "Architecture Review Project",
    contact_ref: "manual-contact:manual-review-candidate",
    technical_context_summary:
      "Has architecture governance notes but the repo reference needs manual confirmation.",
    project_stage: "early_private_alpha",
    repo_or_project_ref: "",
  },
  pain_profile: {
    governance_pain_summary:
      "Needs architecture governance review before a private handoff.",
    current_ai_workflow_pain:
      "Current notes are scattered and hard to continue.",
    release_or_project_risk:
      "Risk is moderate because the project is not yet release-bound.",
    continuity_need:
      "Needs continuation after an initial review session.",
    review_packet_need:
      "Needs a review packet if the project qualifies.",
  },
  expectation_profile: {
    desired_outcome:
      "Determine whether the project is ready for a guided governance packet.",
    urgency: "medium",
    willingness_to_use_local_review_only_flow: true,
    accepts_manual_onboarding: true,
    accepts_manual_payment: true,
    understands_not_public_beta: true,
    understands_non_executing_boundary: true,
  },
});

export function createV23PilotIntakeFixture() {
  const intakes = [
    V2_3_STRONG_FIT_PILOT_INTAKE,
    V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
    V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  ].map((intake) =>
    qualify_pilot_intake_record({
      intake: submit_pilot_intake_record({
        intake,
        submitted_at: intake.created_at,
      }),
      qualified_at: `${intake.created_at}:qualified`,
    })
  );

  return {
    fixture_id: "v2-3-pilot-intake-fixture",
    fixture_kind: "manual_first_design_partner_pilot_intake",
    v2_2_stable_baseline: V2_2_STABLE_BASELINE,
    boundary_notices: [...V2_3_PILOT_BOUNDARY_NOTICES],
    intakes,
  } as const satisfies {
    fixture_id: string;
    fixture_kind: string;
    v2_2_stable_baseline: typeof V2_2_STABLE_BASELINE;
    boundary_notices: readonly string[];
    intakes: V2_3PilotIntakeRecord[];
  };
}
