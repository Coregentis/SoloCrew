import {
  V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "./v2-3-pilot-intake-fixture.ts";
import {
  create_manual_payment_record,
  mark_invoice_sent,
  mark_manual_exception,
  mark_payment_blocked,
  mark_payment_confirmed,
  mark_payment_pending,
} from "../../app/pilots/manual-payment-status-workflow.ts";

const V2_2_STABLE_BASELINE = {
  tag: "solocrew-v2.2-stable-private-alpha-journey-20260428",
  target_commit: "aaef0147290848c35e68d8eb4e84616f904454e3",
} as const;

const DRAFT_FOR_STRONG_FIT = create_manual_payment_record({
  payment_record_id: "v2-3-manual-payment-strong-fit",
  intake: V2_3_STRONG_FIT_PILOT_INTAKE,
  invoice_id: "manual-invoice-strong-fit",
  created_at: "2026-04-28T08:00:00.000Z",
  method_hint: "manual_invoice",
  currency_code: "usd",
  amount_minor_units: 75000,
  invoice_label: "Design partner pilot manual invoice",
  manual_payment_instruction_ref: "manual-note:invoice-strong-fit",
});

const INVOICE_SENT_FOR_STRONG_FIT = mark_invoice_sent({
  record: DRAFT_FOR_STRONG_FIT,
  sent_at: "2026-04-28T08:05:00.000Z",
});

const PAYMENT_PENDING_FOR_STRONG_FIT = mark_payment_pending({
  record: INVOICE_SENT_FOR_STRONG_FIT,
  pending_at: "2026-04-28T08:10:00.000Z",
});

const PAYMENT_CONFIRMED_FOR_STRONG_FIT = mark_payment_confirmed({
  record: PAYMENT_PENDING_FOR_STRONG_FIT,
  confirmed_at: "2026-04-28T08:15:00.000Z",
  manual_confirmation_ref: "manual-confirmation:strong-fit",
});

const BLOCKED_FOR_MANUAL_REVIEW = mark_payment_blocked({
  record: mark_payment_pending({
    record: mark_invoice_sent({
      record: create_manual_payment_record({
        payment_record_id: "v2-3-manual-payment-manual-review",
        intake: V2_3_MANUAL_REVIEW_PILOT_INTAKE,
        invoice_id: "manual-invoice-manual-review",
        created_at: "2026-04-28T08:20:00.000Z",
        method_hint: "manual_invoice",
        currency_code: "usd",
        amount_minor_units: 25000,
        invoice_label: "Manual-review candidate invoice draft",
        manual_payment_instruction_ref: "manual-note:invoice-manual-review",
      }),
      sent_at: "2026-04-28T08:25:00.000Z",
    }),
    pending_at: "2026-04-28T08:30:00.000Z",
  }),
  blocked_at: "2026-04-28T08:35:00.000Z",
  manual_exception_reason: "Manual qualification must be resolved before payment.",
});

const MANUAL_EXCEPTION_FOR_BLOCKED_INTAKE = mark_manual_exception({
  record: create_manual_payment_record({
    payment_record_id: "v2-3-manual-payment-blocked-intake",
    intake: V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
    invoice_id: "manual-invoice-blocked-intake",
    created_at: "2026-04-28T08:40:00.000Z",
    method_hint: "manual_exception_only",
    currency_code: "usd",
    amount_minor_units: 0,
    invoice_label: "Blocked candidate manual exception",
    manual_payment_instruction_ref: "manual-note:blocked-candidate",
  }),
  exception_at: "2026-04-28T08:45:00.000Z",
  manual_exception_reason: "Candidate requested forbidden capabilities.",
});

export function createV23ManualPaymentStatusFixture() {
  return {
    fixture_id: "v2-3-manual-payment-status-fixture",
    fixture_kind: "manual_only_payment_status",
    v2_2_stable_baseline: V2_2_STABLE_BASELINE,
    records: {
      invoice_sent: INVOICE_SENT_FOR_STRONG_FIT,
      payment_pending: PAYMENT_PENDING_FOR_STRONG_FIT,
      payment_confirmed: PAYMENT_CONFIRMED_FOR_STRONG_FIT,
      payment_blocked: BLOCKED_FOR_MANUAL_REVIEW,
      manual_exception: MANUAL_EXCEPTION_FOR_BLOCKED_INTAKE,
    },
  } as const;
}
