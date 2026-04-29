import type {
  SoloCrewPreparedActionCardView,
  SoloCrewPreparedActionPageView,
} from "../../projection/contracts/v1-7-prepared-action-contract.ts";

export type V17PreparedActionPageModel = SoloCrewPreparedActionPageView | {
  prepared_action_card?: undefined;
  action_intent_summary?: undefined;
  evidence_sufficiency_panel?: undefined;
  missing_information_panel?: undefined;
  risk_boundary_summary?: undefined;
  human_confirmation_requirement_display?: undefined;
  safe_evidence_refs?: undefined;
  runtime_private_fields_omitted?: undefined;
  draft_only_posture?: undefined;
  non_executing_posture?: undefined;
};

export function createV17PreparedActionPageModel(
  view?: SoloCrewPreparedActionCardView
): V17PreparedActionPageModel {
  if (!view) {
    return {
      prepared_action_card: undefined,
      action_intent_summary: undefined,
      evidence_sufficiency_panel: undefined,
      missing_information_panel: undefined,
      risk_boundary_summary: undefined,
      human_confirmation_requirement_display: undefined,
      safe_evidence_refs: undefined,
      runtime_private_fields_omitted: undefined,
      draft_only_posture: undefined,
      non_executing_posture: undefined,
    };
  }

  return {
    prepared_action_card: view,
    action_intent_summary: {
      action_title: view.action_title,
      action_intent_summary: view.action_intent_summary,
    },
    evidence_sufficiency_panel: view.evidence_sufficiency,
    missing_information_panel: view.missing_information,
    risk_boundary_summary: {
      risk_boundary_summary: view.risk_boundary_summary,
    },
    human_confirmation_requirement_display: {
      confirmation_required:
        view.human_confirmation_requirement.confirmation_required,
      human_confirmation_requirement:
        `${view.human_confirmation_requirement.human_confirmation_requirement} Display-only requirement summary and not approval control.`,
    },
    safe_evidence_refs: view.safe_evidence_refs,
    runtime_private_fields_omitted: view.runtime_private_fields_omitted,
    draft_only_posture:
      `${view.draft_only_posture} This slice stays human-visible and not executable.`,
    non_executing_posture:
      `${view.non_executing_posture} This slice remains non-approving, non-dispatching, non-provider, and non-queueing.`,
  };
}

export type PreparedActionPageModel = V17PreparedActionPageModel;

export const createPreparedActionPageModel =
  createV17PreparedActionPageModel;
