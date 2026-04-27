import {
  REQUIRED_V2_2_KERNEL_DUTY_IDS,
  REQUIRED_V2_2_MODULE_POSTURE_NAMES,
} from "../../app/cgos/cgos-projection-safe-consumption-contract.ts";
import {
  SOLOCREW_WORKSPACE_BOUNDARY_FLAGS,
} from "../../app/workspaces/workspace-contract.ts";
import {
  REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS,
} from "../../app/review-packets/review-packet-export-contract.ts";
import {
  V2_2_FOUNDER_DASHBOARD_BOUNDARY_FLAGS,
} from "../../app/dashboard/v2-2-founder-dashboard-continuation-contract.ts";

export const V2_2_PRIVATE_ALPHA_JOURNEY_FIXTURE = {
  workspace: {
    workspace_id: "v2-2-private-alpha-journey-workspace",
    workspace_label: "V2.2 Private Alpha Journey Workspace",
    storage_root: ".solocrew/v2-2/private-alpha/workspaces",
    initial_request:
      "Prepare repo release, architecture review, and governance preparation.",
    created_at: "2026-04-28T02:00:00.000Z",
  },
  history_events: [
    {
      event_id:
        "v2-2-private-alpha-journey-workspace:0003:user_request",
      occurred_at: "2026-04-28T02:05:00.000Z",
      request_summary:
        "Continue the private-alpha Developer Company project governance journey.",
      latest_step: "private_alpha_request_saved",
    },
  ],
  review_packet_export: {
    export_id: "v2-2-private-alpha-review-packet",
    exported_at: "2026-04-28T02:10:00.000Z",
    output_directory: ".solocrew/v2-2/private-alpha/review-packets",
  },
  dashboard_continuation: {
    generated_at: "2026-04-28T02:15:00.000Z",
  },
  expected_required_module_posture_names: [
    ...REQUIRED_V2_2_MODULE_POSTURE_NAMES,
  ],
  expected_required_kernel_duty_ids: [
    ...REQUIRED_V2_2_KERNEL_DUTY_IDS,
  ],
  expected_boundaries: {
    workspace: SOLOCREW_WORKSPACE_BOUNDARY_FLAGS,
    review_packet_export: REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS,
    founder_dashboard_continuation: V2_2_FOUNDER_DASHBOARD_BOUNDARY_FLAGS,
    no_provider_dispatch: true,
    no_channel_dispatch: true,
    no_marketplace_implementation: true,
    no_autonomous_execution: true,
  },
} as const;

export function createV22PrivateAlphaJourneyFixture() {
  return V2_2_PRIVATE_ALPHA_JOURNEY_FIXTURE;
}
