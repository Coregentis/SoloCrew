import type {
  DesignPartnerId,
  PilotIntakeId,
} from "./pilot-intake-contract.ts";
import type {
  ManualInvoiceId,
  ManualPaymentRecordId,
} from "./manual-payment-status-contract.ts";
import type {
  ReviewPacketExportId,
} from "../review-packets/review-packet-export-contract.ts";
import type {
  WorkspaceId,
} from "../workspaces/workspace-contract.ts";

export type NextActionProposalId = string;

export type NextActionProposalStatus =
  | "draft"
  | "proposed"
  | "needs_manual_review"
  | "blocked"
  | "completed_manually"
  | "cancelled";

export type NextActionProposalKind =
  | "schedule_manual_design_partner_review"
  | "request_manual_clarification"
  | "prepare_manual_invoice"
  | "wait_for_manual_payment_signal"
  | "confirm_payment_manually"
  | "prepare_pilot_workspace_review"
  | "generate_or_review_packet_manually"
  | "review_dashboard_continuation_manually"
  | "prepare_feedback_request"
  | "request_case_study_permission"
  | "decline_or_hold_candidate"
  | "resolve_manual_exception";

export type NextActionPriority = "low" | "medium" | "high" | "blocked";

export type NextActionSourceRefs = {
  intake_id?: PilotIntakeId;
  design_partner_id?: DesignPartnerId;
  payment_record_id?: ManualPaymentRecordId;
  invoice_id?: ManualInvoiceId;
  workspace_id?: WorkspaceId;
  review_packet_export_id?: ReviewPacketExportId;
  dashboard_page_id?: string;
  baseline_release_ref?: string;
  baseline_commit_ref?: string;
  v2_2_stable_tag: string;
  v2_2_stable_commit: string;
};

export type NextActionBoundaryFlags = {
  review_only: true;
  non_executing: true;
  manual_approval_required: true;
  no_provider_dispatch: true;
  no_channel_dispatch: true;
  no_marketplace_implementation: true;
  no_autonomous_execution: true;
  no_task_runner: true;
  no_tool_runner: true;
  no_llm_call: true;
  no_agent_dispatch: true;
  no_payment_processor: true;
  no_checkout: true;
  no_subscription_management: true;
  no_saas_sharing: true;
  no_paid_product_readiness_claim: true;
  no_public_beta_claim: true;
  no_mplp_certification: true;
  no_mplp_endorsement: true;
};

export type V2_3NextActionProposal = {
  proposal_id: NextActionProposalId;
  created_at: string;
  updated_at: string;
  status: NextActionProposalStatus;
  kind: NextActionProposalKind;
  priority: NextActionPriority;
  title: string;
  rationale: string;
  manual_next_step: string;
  source_refs: NextActionSourceRefs;
  required_manual_inputs: string[];
  blocking_reasons: string[];
  boundary_flags: NextActionBoundaryFlags;
  boundary_notices: string[];
};

export type NextActionProposalSummary = {
  proposal_id: NextActionProposalId;
  status: NextActionProposalStatus;
  kind: NextActionProposalKind;
  priority: NextActionPriority;
  manual_next_step: string;
  source_refs: NextActionSourceRefs;
  boundary_notices: string[];
  review_only: true;
  non_executing: true;
};

export const V2_3_NEXT_ACTION_BOUNDARY_FLAGS = {
  review_only: true,
  non_executing: true,
  manual_approval_required: true,
  no_provider_dispatch: true,
  no_channel_dispatch: true,
  no_marketplace_implementation: true,
  no_autonomous_execution: true,
  no_task_runner: true,
  no_tool_runner: true,
  no_llm_call: true,
  no_agent_dispatch: true,
  no_payment_processor: true,
  no_checkout: true,
  no_subscription_management: true,
  no_saas_sharing: true,
  no_paid_product_readiness_claim: true,
  no_public_beta_claim: true,
  no_mplp_certification: true,
  no_mplp_endorsement: true,
} as const satisfies NextActionBoundaryFlags;

export const V2_3_NEXT_ACTION_BOUNDARY_NOTICES = [
  "V2.3 next-action proposals are review-only and non-executing.",
  "V2.3 next-action proposals require manual approval outside product runtime.",
  "V2.3 next-action proposals keep no_provider_dispatch, no_channel_dispatch, no_marketplace_implementation, and no_autonomous_execution boundaries.",
  "V2.3 next-action proposals keep no_task_runner, no_tool_runner, no_llm_call, and no_agent_dispatch boundaries.",
  "V2.3 next-action proposals keep no_payment_processor, no_checkout, no_subscription_management, and no_saas_sharing boundaries.",
  "V2.3 next-action proposals keep no_paid_product_readiness_claim, no_public_beta_claim, no_mplp_certification, and no_mplp_endorsement boundaries.",
] as const;

export const V2_2_STABLE_SOURCE_REFS = {
  baseline_release_ref: "solocrew-v2.2-stable-private-alpha-journey-20260428",
  baseline_commit_ref: "aaef0147290848c35e68d8eb4e84616f904454e3",
  v2_2_stable_tag: "solocrew-v2.2-stable-private-alpha-journey-20260428",
  v2_2_stable_commit: "aaef0147290848c35e68d8eb4e84616f904454e3",
} as const;
