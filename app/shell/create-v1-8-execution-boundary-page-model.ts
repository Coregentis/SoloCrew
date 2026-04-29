import type {
  SoloCrewExecutionBoundaryCardView,
  SoloCrewExecutionBoundaryPageView,
} from "../../projection/contracts/v1-8-execution-boundary-contract.ts";

export type V18ExecutionBoundaryPageModel = SoloCrewExecutionBoundaryPageView | {
  execution_boundary_card?: undefined;
  requirement_summary_panel?: undefined;
  risk_warning_panel?: undefined;
  preflight_checklist_panel?: undefined;
  acknowledgment_requirement_display?: undefined;
  transition_posture_display?: undefined;
  safe_evidence_refs?: undefined;
  runtime_private_fields_omitted?: undefined;
  display_only_posture?: undefined;
  non_executing_posture?: undefined;
  non_authoritative_posture?: undefined;
};

export function createV18ExecutionBoundaryPageModel(
  view?: SoloCrewExecutionBoundaryCardView
): V18ExecutionBoundaryPageModel {
  if (!view) {
    return {
      execution_boundary_card: undefined,
      requirement_summary_panel: undefined,
      risk_warning_panel: undefined,
      preflight_checklist_panel: undefined,
      acknowledgment_requirement_display: undefined,
      transition_posture_display: undefined,
      safe_evidence_refs: undefined,
      runtime_private_fields_omitted: undefined,
      display_only_posture: undefined,
      non_executing_posture: undefined,
      non_authoritative_posture: undefined,
    };
  }

  return {
    execution_boundary_card: view,
    requirement_summary_panel: view.requirement_summary,
    risk_warning_panel: view.risk_warning,
    preflight_checklist_panel: view.preflight_checklist,
    acknowledgment_requirement_display: {
      acknowledgment_required: view.acknowledgment_requirement.acknowledgment_required,
      acknowledgment_requirement:
        `${view.acknowledgment_requirement.acknowledgment_requirement} Display-only requirement summary and non-authoritative.`,
    },
    transition_posture_display: view.transition_posture,
    safe_evidence_refs: view.safe_evidence_refs,
    runtime_private_fields_omitted: view.runtime_private_fields_omitted,
    display_only_posture:
      `${view.display_only_posture} This slice stays human-visible and review-oriented.`,
    non_executing_posture:
      `${view.non_executing_posture} This slice remains non-dispatching, non-provider, and non-queueing.`,
    non_authoritative_posture:
      `${view.non_authoritative_posture} This slice does not capture acknowledgment and does not create transition state.`,
  };
}

export type ExecutionBoundaryPageModel = V18ExecutionBoundaryPageModel;

export const createExecutionBoundaryPageModel =
  createV18ExecutionBoundaryPageModel;
