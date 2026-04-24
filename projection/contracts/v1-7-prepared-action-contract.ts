export type SoloCrewPreparedActionEvidenceSufficiencyState =
  | "insufficient"
  | "partial"
  | "sufficient";

export type SoloCrewPreparedActionIntentSummaryView = {
  action_title: string;
  action_intent_summary: string;
};

export type SoloCrewPreparedActionEvidenceSufficiencyView = {
  sufficiency_state: SoloCrewPreparedActionEvidenceSufficiencyState;
  evidence_sufficiency: string;
};

export type SoloCrewPreparedActionMissingInformationView = {
  missing_information: string;
  missing_information_items: string[];
};

export type SoloCrewPreparedActionRiskBoundaryView = {
  risk_boundary_summary: string;
};

export type SoloCrewPreparedActionConfirmationRequirementView = {
  confirmation_required: boolean;
  human_confirmation_requirement: string;
};

export type SoloCrewPreparedActionCardView = {
  project_id: string;
  prepared_action_id: string;
  action_title: string;
  action_intent_summary: string;
  evidence_sufficiency: SoloCrewPreparedActionEvidenceSufficiencyView;
  missing_information: SoloCrewPreparedActionMissingInformationView;
  risk_boundary_summary: string;
  human_confirmation_requirement: SoloCrewPreparedActionConfirmationRequirementView;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  draft_only_posture: string;
  non_executing_posture: string;
};

export type SoloCrewPreparedActionPageView = {
  prepared_action_card: SoloCrewPreparedActionCardView;
  action_intent_summary: SoloCrewPreparedActionIntentSummaryView;
  evidence_sufficiency_panel: SoloCrewPreparedActionEvidenceSufficiencyView;
  missing_information_panel: SoloCrewPreparedActionMissingInformationView;
  risk_boundary_summary: SoloCrewPreparedActionRiskBoundaryView;
  human_confirmation_requirement_display: SoloCrewPreparedActionConfirmationRequirementView;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  draft_only_posture: string;
  non_executing_posture: string;
};

export const V17_PREPARED_ACTION_BOUNDARY_LINES = [
  "Prepared action remains draft-only.",
  "Prepared action remains non-executing.",
  "Human confirmation requirement is display-only and not approval control.",
  "No provider/channel execution.",
  "No approve/reject/dispatch/execute behavior.",
  "No founder queue or queue implementation.",
  "Runtime-private fields remain omitted.",
] as const;

export const V17_PREPARED_ACTION_BOUNDARY_SUMMARY =
  V17_PREPARED_ACTION_BOUNDARY_LINES.join(" ");
