import {
  create_default_cgos_projection_safe_consumption,
} from "../../app/cgos/cgos-projection-safe-consumption-contract.ts";
import {
  SOLOCREW_WORKSPACE_BOUNDARY_FLAGS,
  type SoloCrewWorkspaceRecord,
} from "../../app/workspaces/workspace-contract.ts";

export const V2_2_PRIVATE_ALPHA_WORKSPACE_ID =
  "workspace-v2-2-private-alpha-project-governance";

export function createV22PrivateAlphaWorkspaceFixture(
  storage_root = ".solocrew/workspaces"
): SoloCrewWorkspaceRecord {
  const cgos_consumption = create_default_cgos_projection_safe_consumption(
    V2_2_PRIVATE_ALPHA_WORKSPACE_ID
  );
  const created_at = "2026-04-28T00:00:00.000Z";

  return {
    workspace_id: V2_2_PRIVATE_ALPHA_WORKSPACE_ID,
    workspace_label: "V2.2 private alpha project governance workspace",
    primary_vertical: "development_company_project_governance",
    created_at,
    updated_at: created_at,
    storage_paths: {
      workspace_record_path: `${storage_root}/${V2_2_PRIVATE_ALPHA_WORKSPACE_ID}.json`,
      workspace_history_path: `${storage_root}/${V2_2_PRIVATE_ALPHA_WORKSPACE_ID}.history.json`,
    },
    active_journey_id:
      "v2_2_private_alpha_developer_company_project_governance",
    latest_step: "private_alpha_seed_created",
    next_review_action: "continue_review_only_project_governance_journey",
    boundary_flags: SOLOCREW_WORKSPACE_BOUNDARY_FLAGS,
    cgos_consumption,
    history_events: [
      {
        event_id: `${V2_2_PRIVATE_ALPHA_WORKSPACE_ID}:0001:seed_request`,
        workspace_id: V2_2_PRIVATE_ALPHA_WORKSPACE_ID,
        occurred_at: created_at,
        event_kind: "user_request_recorded",
        summary:
          "Prepare repo release, architecture review, and governance preparation as a non-executing private-alpha workspace.",
        latest_step: "private_alpha_seed_created",
        safe_evidence_refs: cgos_consumption.safe_evidence_refs.map(
          (entry) => entry.evidence_ref
        ),
        omission_markers: cgos_consumption.omission_markers.map(
          (entry) => entry.marker
        ),
        non_executing: true,
        runtime_private_fields_omitted: true,
      },
    ],
    review_packet_export_implemented: false,
    founder_dashboard_continuation_implemented: false,
  };
}
