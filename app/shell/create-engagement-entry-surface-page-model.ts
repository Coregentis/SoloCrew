import type {
  EngagementEntrySurfaceModel,
  EngagementEntrySurfaceResult,
} from "../engagement/engagement-entry-surface-contract.ts";

export type EngagementEntrySurfacePageModel = {
  page_id: string;
  page_kind: "engagement_entry_surface";
  generated_at: string;
  title: string;
  summary: string;
  surface_model: EngagementEntrySurfaceModel;
  result_status: EngagementEntrySurfaceResult["status"];
  workspace_ref: string | null;
  session_ref: string | null;
  available_actions: EngagementEntrySurfaceModel["available_actions"];
  boundary_notices: string[];
  non_executing: true;
};

export function createEngagementEntrySurfacePageModel(input: {
  result: EngagementEntrySurfaceResult;
  generated_at: string;
  page_id?: string;
}): EngagementEntrySurfacePageModel {
  return {
    page_id: input.page_id ?? `${input.result.surface_model.surface_id}:page`,
    page_kind: "engagement_entry_surface",
    generated_at: input.generated_at,
    title: "Local engagement entry surface",
    summary:
      "Create, load, or review a local engagement workspace for manual founder/operator review.",
    surface_model: input.result.surface_model,
    result_status: input.result.status,
    workspace_ref: input.result.workspace_ref,
    session_ref: input.result.session_ref,
    available_actions: [...input.result.surface_model.available_actions],
    boundary_notices: [
      "Local-only engagement entry; no route registration or route URL change.",
      "Manual-first and review-only; no execution, dispatch, or autonomy.",
      "In-memory create/load shape only; no file or database persistence.",
    ],
    non_executing: true,
  };
}
