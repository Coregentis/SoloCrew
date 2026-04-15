import type { SoloCrewManagementObjectType } from "./structural-object-types.ts";

export interface SoloCrewManagementInterfaceContract {
  broad_kpi_cockpit_available: false;
  management_allowed_actions: readonly string[];
  management_forbidden_actions: readonly string[];
  cell_console_allowed_actions: readonly string[];
  cell_console_forbidden_actions: readonly string[];
  cross_layer_object_types: readonly SoloCrewManagementObjectType[];
}

export const SOLOCREW_MANAGEMENT_INTERFACE_CONTRACT: SoloCrewManagementInterfaceContract =
  {
    broad_kpi_cockpit_available: false,
    management_allowed_actions: [
      "issue_management_directive",
      "select_focused_cell",
      "view_cell_summary_card",
      "receive_escalation_or_approval_request",
      "return_approval_decision",
      "receive_delivery_return",
      "reorder_priorities_once_portfolio_opens",
    ],
    management_forbidden_actions: [
      "act_as_broad_kpi_cockpit",
      "micromanage_runtime_worker_state",
      "claim_stored_event_timeline_truth",
      "rewrite_cell_policy_or_delivery_law",
      "pretend_secretary_or_portfolio_is_fully_implemented",
    ],
    cell_console_allowed_actions: [
      "show_active_crew_state",
      "show_current_objective_and_work",
      "surface_blocked_and_active_truth",
      "surface_bounded_memory_and_review_continuity",
      "accept_bounded_corrections_and_approvals",
      "package_delivery_return",
      "emit_escalation_or_approval_request",
    ],
    cell_console_forbidden_actions: [
      "pretend_to_be_cross_cell_dashboard",
      "rewrite_top_level_management_directives",
      "claim_organization_wide_portfolio_control",
      "present_fake_cross_business_metrics",
    ],
    cross_layer_object_types: [
      "management-directive",
      "cell-summary-card",
      "escalation-approval-request",
      "delivery-return",
    ],
  } as const;
