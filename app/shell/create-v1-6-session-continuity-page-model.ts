import type {
  SoloCrewContinuityReplayStep,
  SoloCrewLocalHistoryTimelineItem,
  SoloCrewReviewTrailItem,
  SoloCrewSessionContinuityPanelView,
} from "../../projection/contracts/session-continuity-ux-contract.ts";

export type V16SessionContinuityPageModel = {
  session_continuity_summary?: string;
  session_label?: string;
  local_history_timeline?: {
    summary: string;
    items: SoloCrewLocalHistoryTimelineItem[];
  };
  review_trail_summary?: string;
  review_trail_items?: SoloCrewReviewTrailItem[];
  continuity_replay_steps?: SoloCrewContinuityReplayStep[];
  pending_review_visibility?: string;
  continuity_snapshot_summary?: string;
  safe_evidence_refs?: string[];
  runtime_private_fields_omitted?: true;
  non_executing_posture?: string;
};

function build_continuity_replay_steps(
  view: SoloCrewSessionContinuityPanelView
): SoloCrewContinuityReplayStep[] {
  return [
    {
      project_id: view.project_id,
      continuity_id: view.continuity_id,
      session_label: view.session_label,
      lifecycle_label: view.lifecycle_label,
      history_summary:
        "Guided viewing step: start from the bounded session continuity summary.",
      safe_evidence_refs: view.safe_evidence_refs,
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Guided viewing only. This is not execution replay.",
    },
    {
      project_id: view.project_id,
      continuity_id: view.continuity_id,
      session_label: view.session_label,
      lifecycle_label: "local history timeline",
      history_summary:
        `${view.local_history_items.length} local history items remain display-only.`,
      safe_evidence_refs: view.safe_evidence_refs,
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Guided viewing only. Local history remains display-only.",
    },
    {
      project_id: view.project_id,
      continuity_id: view.continuity_id,
      session_label: view.session_label,
      lifecycle_label: "review trail display",
      history_summary:
        `${view.review_trail_items.length} review trail items remain review-only and below queue semantics.`,
      safe_evidence_refs: view.safe_evidence_refs,
      runtime_private_fields_omitted: true,
      non_executing_posture:
        "Guided viewing only. Review trail remains display-only.",
    },
    ...(view.continuity_snapshot_summary
      ? [{
          project_id: view.project_id,
          continuity_id: view.continuity_id,
          session_label: view.session_label,
          lifecycle_label: "continuity snapshot display",
          history_summary:
            "Guided viewing step: the continuity snapshot remains bounded and non-executing.",
          safe_evidence_refs: view.safe_evidence_refs,
          runtime_private_fields_omitted: true as const,
          non_executing_posture:
            "Guided viewing only. Continuity snapshot is not execution replay.",
        }]
      : []),
  ];
}

export function createV16SessionContinuityPageModel(
  view?: SoloCrewSessionContinuityPanelView
): V16SessionContinuityPageModel {
  if (!view) {
    return {
      session_continuity_summary: undefined,
      session_label: undefined,
      local_history_timeline: undefined,
      review_trail_summary: undefined,
      review_trail_items: undefined,
      continuity_replay_steps: undefined,
      pending_review_visibility: undefined,
      continuity_snapshot_summary: undefined,
      safe_evidence_refs: undefined,
      runtime_private_fields_omitted: undefined,
      non_executing_posture: undefined,
    };
  }

  return {
    session_continuity_summary: view.continuity_summary,
    session_label: view.session_label,
    local_history_timeline: {
      summary: "Local history is display-only over existing safe continuity summaries.",
      items: view.local_history_items,
    },
    review_trail_summary:
      "Review trail remains display-only, review-only, and below queue semantics.",
    review_trail_items: view.review_trail_items,
    continuity_replay_steps: build_continuity_replay_steps(view),
    pending_review_visibility: view.pending_review_visibility,
    continuity_snapshot_summary: view.continuity_snapshot_summary,
    safe_evidence_refs: view.safe_evidence_refs,
    runtime_private_fields_omitted: view.runtime_private_fields_omitted,
    non_executing_posture:
      `${view.non_executing_posture} Continuity replay remains guided viewing only and not execution replay.`,
  };
}
