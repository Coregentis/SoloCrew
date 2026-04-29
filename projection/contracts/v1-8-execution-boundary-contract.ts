export type SoloCrewExecutionBoundaryRequirementSummaryView = {
  requirement_summary: string;
};

export type SoloCrewExecutionBoundaryRiskWarningView = {
  risk_warning: string;
};

export type SoloCrewExecutionBoundaryPreflightChecklistView = {
  preflight_checklist: string[];
};

export type SoloCrewExecutionBoundaryAcknowledgmentRequirementView = {
  acknowledgment_required: boolean;
  acknowledgment_requirement: string;
};

export type SoloCrewExecutionBoundaryTransitionPostureView = {
  transition_posture: string;
};

export type SoloCrewExecutionBoundaryCardView = {
  project_id: string;
  execution_boundary_id: string;
  requirement_summary: SoloCrewExecutionBoundaryRequirementSummaryView;
  risk_warning: SoloCrewExecutionBoundaryRiskWarningView;
  preflight_checklist: SoloCrewExecutionBoundaryPreflightChecklistView;
  acknowledgment_requirement: SoloCrewExecutionBoundaryAcknowledgmentRequirementView;
  transition_posture: SoloCrewExecutionBoundaryTransitionPostureView;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  display_only_posture: string;
  non_executing_posture: string;
  non_authoritative_posture: string;
};

export type SoloCrewExecutionBoundaryPageView = {
  execution_boundary_card: SoloCrewExecutionBoundaryCardView;
  requirement_summary_panel: SoloCrewExecutionBoundaryRequirementSummaryView;
  risk_warning_panel: SoloCrewExecutionBoundaryRiskWarningView;
  preflight_checklist_panel: SoloCrewExecutionBoundaryPreflightChecklistView;
  acknowledgment_requirement_display: SoloCrewExecutionBoundaryAcknowledgmentRequirementView;
  transition_posture_display: SoloCrewExecutionBoundaryTransitionPostureView;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted: true;
  display_only_posture: string;
  non_executing_posture: string;
  non_authoritative_posture: string;
};

export const V18_EXECUTION_BOUNDARY_LINES = [
  "Execution boundary remains display-only.",
  "Execution boundary remains non-executing.",
  "Execution boundary remains non-approval-automation.",
  "Execution boundary remains non-dispatching.",
  "Execution boundary remains non-provider.",
  "Execution boundary remains non-queueing.",
  "Execution boundary remains non-authoritative.",
  "Runtime-private fields remain omitted.",
] as const;

export const V18_EXECUTION_BOUNDARY_SUMMARY =
  V18_EXECUTION_BOUNDARY_LINES.join(" ");

export const EXECUTION_BOUNDARY_LINES =
  V18_EXECUTION_BOUNDARY_LINES;

export const EXECUTION_BOUNDARY_SUMMARY =
  V18_EXECUTION_BOUNDARY_SUMMARY;
