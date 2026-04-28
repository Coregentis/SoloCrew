import type {
  DesignPartnerQualificationSummary,
  V2_3PilotIntakeRecord,
} from "./pilot-intake-contract.ts";
import type {
  ManualPaymentSummary,
  V2_3ManualPaymentRecord,
} from "./manual-payment-status-contract.ts";
import type {
  V2_2ReviewPacketExport,
} from "../review-packets/review-packet-export-contract.ts";
import type {
  V2_2FounderDashboardContinuationPageModel,
} from "../dashboard/v2-2-founder-dashboard-continuation-contract.ts";
import type {
  NextActionPriority,
  NextActionProposalKind,
  NextActionSourceRefs,
} from "./next-action-proposal-contract.ts";
import {
  V2_2_STABLE_SOURCE_REFS,
  V2_3_NEXT_ACTION_BOUNDARY_NOTICES,
} from "./next-action-proposal-contract.ts";

export type NextActionPilotStateInput = {
  intake: V2_3PilotIntakeRecord;
  qualification_summary: DesignPartnerQualificationSummary;
  manual_payment_record?: V2_3ManualPaymentRecord;
  manual_payment_summary?: ManualPaymentSummary;
  review_packet_export?: V2_2ReviewPacketExport;
  dashboard_page_model?: V2_2FounderDashboardContinuationPageModel;
};

export type NextActionRuleResult = {
  kind: NextActionProposalKind;
  priority: NextActionPriority;
  title: string;
  rationale: string;
  manual_next_step: string;
  required_manual_inputs: string[];
  blocking_reasons: string[];
  source_refs: NextActionSourceRefs;
  boundary_notices: string[];
};

function build_source_refs(input: NextActionPilotStateInput): NextActionSourceRefs {
  return {
    intake_id: input.intake.intake_id,
    design_partner_id: input.intake.design_partner_id,
    payment_record_id: input.manual_payment_record?.payment_record_id,
    invoice_id: input.manual_payment_record?.invoice_id,
    workspace_id:
      input.review_packet_export?.workspace_id ??
      input.dashboard_page_model?.workspace_summary?.workspace_id,
    review_packet_export_id: input.review_packet_export?.export_id,
    dashboard_page_id: input.dashboard_page_model?.page_id,
    ...V2_2_STABLE_SOURCE_REFS,
  };
}

export function classify_next_action_priority(
  kind: NextActionProposalKind
): NextActionPriority {
  const priority_by_kind: Record<NextActionProposalKind, NextActionPriority> = {
    schedule_manual_design_partner_review: "high",
    request_manual_clarification: "medium",
    prepare_manual_invoice: "high",
    wait_for_manual_payment_signal: "medium",
    confirm_payment_manually: "high",
    prepare_pilot_workspace_review: "high",
    generate_or_review_packet_manually: "medium",
    review_dashboard_continuation_manually: "medium",
    prepare_feedback_request: "medium",
    request_case_study_permission: "low",
    decline_or_hold_candidate: "blocked",
    resolve_manual_exception: "blocked",
  };

  return priority_by_kind[kind];
}

export function explain_next_action_rationale(input: {
  kind: NextActionProposalKind;
  state: NextActionPilotStateInput;
}): string {
  const rationale_by_kind: Record<NextActionProposalKind, string> = {
    schedule_manual_design_partner_review:
      "Candidate is qualified and ready for a manual design-partner review.",
    request_manual_clarification:
      "Candidate needs manual review before a pilot decision can be made.",
    prepare_manual_invoice:
      "Candidate is qualified and no manual payment status record is attached.",
    wait_for_manual_payment_signal:
      "Manual invoice has been sent and the next step is to wait for a manual payment signal.",
    confirm_payment_manually:
      "Manual payment is pending and must be confirmed manually before pilot start.",
    prepare_pilot_workspace_review:
      "Manual payment is confirmed and no V2.2 review/dashboard refs are attached yet.",
    generate_or_review_packet_manually:
      "Manual payment is confirmed and the review packet must be generated or reviewed manually.",
    review_dashboard_continuation_manually:
      "Review packet exists and the dashboard continuation needs manual review.",
    prepare_feedback_request:
      "Manual payment is confirmed and V2.2 review packet/dashboard refs are available for pilot continuation.",
    request_case_study_permission:
      "Future manual case-study permission can be requested after feedback, but feedback capture is not implemented here.",
    decline_or_hold_candidate:
      "Candidate is blocked, disqualified, or not qualified for the bounded V2.3 pilot.",
    resolve_manual_exception:
      "Manual payment status is blocked or in manual exception and needs operator resolution.",
  };

  return rationale_by_kind[input.kind];
}

function required_inputs_for_kind(kind: NextActionProposalKind): string[] {
  const inputs_by_kind: Record<NextActionProposalKind, string[]> = {
    schedule_manual_design_partner_review: [
      "manual_calendar_slot",
      "candidate_scope_confirmation",
    ],
    request_manual_clarification: [
      "clarifying_question",
      "candidate_reply",
    ],
    prepare_manual_invoice: [
      "manual_invoice_amount",
      "manual_invoice_recipient",
    ],
    wait_for_manual_payment_signal: [
      "manual_payment_signal",
    ],
    confirm_payment_manually: [
      "manual_payment_evidence_ref",
      "operator_confirmation",
    ],
    prepare_pilot_workspace_review: [
      "v2_2_workspace_ref",
      "manual_pilot_scope_confirmation",
    ],
    generate_or_review_packet_manually: [
      "review_packet_ref",
      "operator_review_notes",
    ],
    review_dashboard_continuation_manually: [
      "dashboard_page_ref",
      "operator_review_notes",
    ],
    prepare_feedback_request: [
      "manual_feedback_questions",
      "pilot_session_summary",
    ],
    request_case_study_permission: [
      "manual_case_study_scope",
      "explicit_permission_record",
    ],
    decline_or_hold_candidate: [
      "manual_decline_or_hold_reason",
    ],
    resolve_manual_exception: [
      "manual_exception_resolution_note",
    ],
  };

  return [...inputs_by_kind[kind]].sort();
}

export function propose_next_action_from_pilot_state(
  state: NextActionPilotStateInput
): NextActionRuleResult {
  const payment_status = state.manual_payment_record?.status;
  let kind: NextActionProposalKind;
  const blocking_reasons: string[] = [];

  if (
    state.intake.status === "blocked" ||
    state.intake.status === "not_qualified" ||
    state.qualification_summary.classification === "disqualified"
  ) {
    kind = "decline_or_hold_candidate";
    blocking_reasons.push("candidate_not_qualified_for_bounded_pilot");
  } else if (
    payment_status === "payment_blocked" ||
    payment_status === "manual_exception"
  ) {
    kind = "resolve_manual_exception";
    blocking_reasons.push("manual_payment_status_requires_resolution");
  } else if (state.intake.status === "needs_manual_review") {
    kind = "request_manual_clarification";
  } else if (!state.manual_payment_record) {
    kind = "prepare_manual_invoice";
  } else if (payment_status === "invoice_sent") {
    kind = "wait_for_manual_payment_signal";
  } else if (payment_status === "payment_pending") {
    kind = "confirm_payment_manually";
  } else if (
    payment_status === "payment_confirmed" &&
    !state.review_packet_export &&
    !state.dashboard_page_model
  ) {
    kind = "prepare_pilot_workspace_review";
  } else if (
    payment_status === "payment_confirmed" &&
    state.review_packet_export &&
    !state.dashboard_page_model
  ) {
    kind = "review_dashboard_continuation_manually";
  } else if (
    payment_status === "payment_confirmed" &&
    state.dashboard_page_model
  ) {
    kind = "prepare_feedback_request";
  } else {
    kind = "request_manual_clarification";
  }

  const priority = classify_next_action_priority(kind);
  const rationale = explain_next_action_rationale({ kind, state });

  return {
    kind,
    priority,
    title: kind.replaceAll("_", " "),
    rationale,
    manual_next_step: kind,
    required_manual_inputs: required_inputs_for_kind(kind),
    blocking_reasons: blocking_reasons.sort(),
    source_refs: build_source_refs(state),
    boundary_notices: [...V2_3_NEXT_ACTION_BOUNDARY_NOTICES],
  };
}
