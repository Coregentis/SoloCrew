import {
  createEngagementEntrySurfacePageModel,
} from "../../app/shell/create-engagement-entry-surface-page-model.ts";
import {
  create_local_engagement_workspace_from_entry,
  load_local_engagement_workspace_from_entry,
  create_engagement_entry_surface_model,
} from "../../app/engagement/engagement-entry-surface-workflow.ts";
import {
  ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
} from "../../app/engagement/engagement-workspace-contract.ts";

export function createEngagementEntrySurfaceFixture() {
  const create_result = create_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-v3-0-create",
    workspace_id: "engagement-workspace-v3-0-entry-created",
    session_id: "engagement-session-v3-0-entry-created",
    loop_state_id: "engagement-loop-state-v3-0-entry-created",
    history_record_id: "engagement-history-v3-0-entry-created",
    engagement_ref: "engagement-v3-0-entry-created",
    participant_refs: [
      "engagement-participant-founder",
      "engagement-participant-design-partner",
    ],
    operator_ref: "engagement-participant-founder",
    started_at: "2026-04-30T11:00:00.000Z",
    current_stage: "candidate",
    commercial_mode: "free_discovery",
    source_metadata: ENGAGEMENT_WORKSPACE_SOURCE_METADATA,
  });
  const load_result = load_local_engagement_workspace_from_entry({
    surface_id: "engagement-entry-surface-v3-0-load",
    loaded_at: "2026-04-30T11:05:00.000Z",
    operator_ref: "engagement-participant-founder",
    workspace_bundle: create_result.workspace_bundle!,
  });
  const review_model = create_engagement_entry_surface_model({
    surface_id: "engagement-entry-surface-v3-0-review",
    mode: "review_existing_workspace",
    status: "loaded",
    workspace_ref: load_result.workspace_ref,
    session_ref: load_result.session_ref,
    current_stage: load_result.surface_model.current_stage,
    commercial_mode: load_result.surface_model.commercial_mode,
    source_metadata: load_result.surface_model.source_metadata,
  });
  const page_model = createEngagementEntrySurfacePageModel({
    result: create_result,
    generated_at: "2026-04-30T11:10:00.000Z",
  });

  return {
    fixture_id: "engagement-entry-surface-v3-0-fixture",
    fixture_kind: "engagement_entry_surface",
    create_result,
    load_result,
    review_model,
    page_model,
    boundary_flags: create_result.boundary_flags,
  } as const;
}

export function createV30EngagementEntrySurfaceFixture() {
  return createEngagementEntrySurfaceFixture();
}
