import {
  qualify_design_partner_intake,
} from "./design-partner-qualification.ts";
import type {
  DesignPartnerQualificationSummary,
  PilotApplicantProfile,
  PilotExpectationProfile,
  PilotPainProfile,
  PilotPrimaryUseCase,
  V2_3PilotIntakeRecord,
} from "./pilot-intake-contract.ts";
import {
  V2_3_PILOT_BOUNDARY_FLAGS,
} from "./pilot-intake-contract.ts";

export type CreatePilotIntakeInput = {
  intake_id: string;
  design_partner_id: string;
  created_at?: string;
  primary_use_case: PilotPrimaryUseCase;
  applicant_profile: PilotApplicantProfile;
  pain_profile: PilotPainProfile;
  expectation_profile: PilotExpectationProfile;
  workspace_ref?: string;
  review_packet_export_ref?: string;
  related_v2_2_workspace_id?: string;
  related_v2_2_review_packet_export_id?: string;
};

const DEFAULT_CREATED_AT = "2026-04-28T00:00:00.000Z";

function clone_intake(record: V2_3PilotIntakeRecord): V2_3PilotIntakeRecord {
  return JSON.parse(JSON.stringify(record)) as V2_3PilotIntakeRecord;
}

export function create_pilot_intake_record(
  input: CreatePilotIntakeInput
): V2_3PilotIntakeRecord {
  const created_at = input.created_at ?? DEFAULT_CREATED_AT;
  return {
    intake_id: input.intake_id,
    design_partner_id: input.design_partner_id,
    created_at,
    updated_at: created_at,
    status: "draft",
    primary_use_case: input.primary_use_case,
    applicant_profile: { ...input.applicant_profile },
    pain_profile: { ...input.pain_profile },
    expectation_profile: { ...input.expectation_profile },
    qualification_summary: "Qualification has not been run.",
    qualification_score: 0,
    qualification_reasons: [],
    disqualification_reasons: [],
    recommended_next_manual_step: "submit_intake_for_manual_first_qualification",
    workspace_ref: input.workspace_ref ?? input.related_v2_2_workspace_id,
    review_packet_export_ref:
      input.review_packet_export_ref ??
      input.related_v2_2_review_packet_export_id,
    related_v2_2_workspace_id:
      input.related_v2_2_workspace_id ?? input.workspace_ref,
    related_v2_2_review_packet_export_id:
      input.related_v2_2_review_packet_export_id ??
      input.review_packet_export_ref,
    boundary_flags: V2_3_PILOT_BOUNDARY_FLAGS,
  };
}

export function submit_pilot_intake_record(input: {
  intake: V2_3PilotIntakeRecord;
  submitted_at?: string;
}): V2_3PilotIntakeRecord {
  return {
    ...clone_intake(input.intake),
    updated_at: input.submitted_at ?? input.intake.updated_at,
    status: "submitted",
    recommended_next_manual_step: "run_design_partner_qualification",
  };
}

export function create_design_partner_qualification_summary(
  intake: V2_3PilotIntakeRecord
): DesignPartnerQualificationSummary {
  return qualify_design_partner_intake(intake);
}

export function qualify_pilot_intake_record(input: {
  intake: V2_3PilotIntakeRecord;
  qualified_at?: string;
}): V2_3PilotIntakeRecord {
  const summary = create_design_partner_qualification_summary(input.intake);
  return {
    ...clone_intake(input.intake),
    updated_at: input.qualified_at ?? input.intake.updated_at,
    status: summary.status,
    qualification_summary: `Design partner classification: ${summary.classification}`,
    qualification_score: summary.qualification_score,
    qualification_reasons: [...summary.qualification_reasons],
    disqualification_reasons: [...summary.disqualification_reasons],
    recommended_next_manual_step: summary.recommended_next_manual_step,
  };
}
