import type {
  PilotIntakeStatus,
  V2_3PilotIntakeRecord,
} from "./pilot-intake-contract.ts";
import type {
  ManualPaymentMethodHint,
  ManualPaymentStatus,
  ManualPaymentSummary,
  V2_3ManualPaymentRecord,
} from "./manual-payment-status-contract.ts";
import {
  V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS,
  V2_3_MANUAL_PAYMENT_BOUNDARY_NOTICES,
  V2_3_MANUAL_PAYMENT_FINAL_STATUSES,
} from "./manual-payment-status-contract.ts";

export type CreateManualPaymentInput = {
  payment_record_id: string;
  intake: V2_3PilotIntakeRecord;
  invoice_id: string;
  created_at?: string;
  method_hint?: ManualPaymentMethodHint;
  currency_code: string;
  amount_minor_units: number;
  invoice_label: string;
  manual_payment_instruction_ref: string;
};

const DEFAULT_CREATED_AT = "2026-04-28T00:00:00.000Z";

function clone_payment(
  record: V2_3ManualPaymentRecord
): V2_3ManualPaymentRecord {
  return JSON.parse(JSON.stringify(record)) as V2_3ManualPaymentRecord;
}

function format_amount(currency_code: string, amount_minor_units: number): string {
  const major = (amount_minor_units / 100).toFixed(2);
  return `${currency_code.toUpperCase()} ${major}`;
}

function is_final_status(status: ManualPaymentStatus): boolean {
  return V2_3_MANUAL_PAYMENT_FINAL_STATUSES.includes(
    status as (typeof V2_3_MANUAL_PAYMENT_FINAL_STATUSES)[number]
  );
}

function transition_payment(input: {
  record: V2_3ManualPaymentRecord;
  next_status: ManualPaymentStatus;
  allowed_from: ManualPaymentStatus[];
  updated_at?: string;
  manual_confirmation_ref?: string;
  manual_exception_reason?: string;
}): V2_3ManualPaymentRecord {
  const record = clone_payment(input.record);

  if (is_final_status(record.status)) {
    return record;
  }

  if (!input.allowed_from.includes(record.status)) {
    return record;
  }

  return {
    ...record,
    updated_at: input.updated_at ?? record.updated_at,
    status: input.next_status,
    manual_confirmation_ref:
      input.manual_confirmation_ref ?? record.manual_confirmation_ref,
    manual_exception_reason:
      input.manual_exception_reason ?? record.manual_exception_reason,
    boundary_flags: V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS,
    boundary_notices: [...V2_3_MANUAL_PAYMENT_BOUNDARY_NOTICES],
  };
}

export function create_manual_payment_record(
  input: CreateManualPaymentInput
): V2_3ManualPaymentRecord {
  const created_at = input.created_at ?? DEFAULT_CREATED_AT;
  return {
    payment_record_id: input.payment_record_id,
    intake_id: input.intake.intake_id,
    design_partner_id: input.intake.design_partner_id,
    invoice_id: input.invoice_id,
    created_at,
    updated_at: created_at,
    status: "invoice_draft",
    method_hint: input.method_hint ?? "manual_invoice",
    currency_code: input.currency_code.toUpperCase(),
    amount_minor_units: input.amount_minor_units,
    amount_display: format_amount(input.currency_code, input.amount_minor_units),
    invoice_label: input.invoice_label,
    manual_payment_instruction_ref: input.manual_payment_instruction_ref,
    related_v2_3_intake_status: input.intake.status,
    boundary_flags: V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS,
    boundary_notices: [...V2_3_MANUAL_PAYMENT_BOUNDARY_NOTICES],
  };
}

export function mark_invoice_sent(input: {
  record: V2_3ManualPaymentRecord;
  sent_at?: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "invoice_sent",
    allowed_from: ["invoice_draft"],
    updated_at: input.sent_at,
  });
}

export function mark_payment_pending(input: {
  record: V2_3ManualPaymentRecord;
  pending_at?: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "payment_pending",
    allowed_from: ["invoice_sent"],
    updated_at: input.pending_at,
  });
}

export function mark_payment_confirmed(input: {
  record: V2_3ManualPaymentRecord;
  confirmed_at?: string;
  manual_confirmation_ref: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "payment_confirmed",
    allowed_from: ["payment_pending"],
    updated_at: input.confirmed_at,
    manual_confirmation_ref: input.manual_confirmation_ref,
  });
}

export function mark_payment_blocked(input: {
  record: V2_3ManualPaymentRecord;
  blocked_at?: string;
  manual_exception_reason: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "payment_blocked",
    allowed_from: ["payment_pending"],
    updated_at: input.blocked_at,
    manual_exception_reason: input.manual_exception_reason,
  });
}

export function mark_payment_refunded(input: {
  record: V2_3ManualPaymentRecord;
  refunded_at?: string;
  manual_confirmation_ref: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "refunded",
    allowed_from: ["payment_pending"],
    updated_at: input.refunded_at,
    manual_confirmation_ref: input.manual_confirmation_ref,
  });
}

export function mark_manual_exception(input: {
  record: V2_3ManualPaymentRecord;
  exception_at?: string;
  manual_exception_reason: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "manual_exception",
    allowed_from: [
      "not_requested",
      "invoice_draft",
      "invoice_sent",
      "payment_pending",
      "payment_blocked",
      "manual_exception",
    ],
    updated_at: input.exception_at,
    manual_exception_reason: input.manual_exception_reason,
  });
}

export function cancel_manual_payment_record(input: {
  record: V2_3ManualPaymentRecord;
  cancelled_at?: string;
}): V2_3ManualPaymentRecord {
  return transition_payment({
    record: input.record,
    next_status: "cancelled",
    allowed_from: [
      "not_requested",
      "invoice_draft",
      "invoice_sent",
      "payment_pending",
      "payment_blocked",
      "manual_exception",
    ],
    updated_at: input.cancelled_at,
  });
}

export function create_manual_payment_summary(
  record: V2_3ManualPaymentRecord
): ManualPaymentSummary {
  const recommended_manual_step_by_status: Record<
    ManualPaymentStatus,
    string
  > = {
    not_requested: "decide_whether_to_prepare_manual_invoice",
    invoice_draft: "review_manual_invoice_before_sending",
    invoice_sent: "wait_for_manual_payment_signal",
    payment_pending: "confirm_payment_manually_before_pilot_start",
    payment_confirmed: "manual_payment_confirmed_prepare_pilot_start",
    payment_blocked: "resolve_blocker_or_move_to_manual_exception",
    refunded: "record_manual_refund_completion",
    manual_exception: "resolve_manual_exception_outside_product_runtime",
    cancelled: "manual_payment_record_cancelled",
  };

  return {
    payment_record_id: record.payment_record_id,
    intake_id: record.intake_id,
    design_partner_id: record.design_partner_id,
    invoice_id: record.invoice_id,
    status: record.status,
    amount_display: record.amount_display,
    method_hint: record.method_hint,
    recommended_manual_step: recommended_manual_step_by_status[record.status],
    boundary_notices: [...record.boundary_notices],
    manual_only: true,
    non_executing: true,
  };
}

export function update_related_intake_status(input: {
  record: V2_3ManualPaymentRecord;
  related_v2_3_intake_status: PilotIntakeStatus;
}): V2_3ManualPaymentRecord {
  return {
    ...clone_payment(input.record),
    related_v2_3_intake_status: input.related_v2_3_intake_status,
    boundary_flags: V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS,
  };
}
