import assert from "node:assert/strict";
import test from "node:test";

import {
  create_manual_payment_record,
  create_manual_payment_summary,
  mark_invoice_sent,
  mark_manual_exception,
  mark_payment_blocked,
  mark_payment_confirmed,
  mark_payment_pending,
  cancel_manual_payment_record,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS,
} from "../../app/pilots/manual-payment-status-contract.ts";
import {
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

function create_record() {
  return create_manual_payment_record({
    payment_record_id: "manual-payment-workflow-001",
    intake: V2_3_STRONG_FIT_PILOT_INTAKE,
    invoice_id: "manual-invoice-workflow-001",
    created_at: "2026-04-28T09:10:00.000Z",
    currency_code: "usd",
    amount_minor_units: 75000,
    invoice_label: "Workflow manual invoice",
    manual_payment_instruction_ref: "manual-note:workflow-001",
  });
}

test("[v2.3] manual payment workflow reaches payment_confirmed deterministically", () => {
  const draft = create_record();
  const sent = mark_invoice_sent({
    record: draft,
    sent_at: "2026-04-28T09:15:00.000Z",
  });
  const pending = mark_payment_pending({
    record: sent,
    pending_at: "2026-04-28T09:20:00.000Z",
  });
  const confirmed = mark_payment_confirmed({
    record: pending,
    confirmed_at: "2026-04-28T09:25:00.000Z",
    manual_confirmation_ref: "manual-confirmation:workflow-001",
  });
  const summary = create_manual_payment_summary(confirmed);

  assert.equal(draft.status, "invoice_draft");
  assert.equal(sent.status, "invoice_sent");
  assert.equal(pending.status, "payment_pending");
  assert.equal(confirmed.status, "payment_confirmed");
  assert.equal(confirmed.manual_confirmation_ref, "manual-confirmation:workflow-001");
  assert.equal(summary.recommended_manual_step, "manual_payment_confirmed_prepare_pilot_start");
  assert.deepEqual(confirmed.boundary_flags, V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS);
});

test("[v2.3] manual payment workflow handles blocked and manual exception states", () => {
  const pending = mark_payment_pending({
    record: mark_invoice_sent({ record: create_record() }),
  });
  const blocked = mark_payment_blocked({
    record: pending,
    blocked_at: "2026-04-28T09:30:00.000Z",
    manual_exception_reason: "Manual payment evidence is insufficient.",
  });
  const exception = mark_manual_exception({
    record: blocked,
    exception_at: "2026-04-28T09:35:00.000Z",
    manual_exception_reason: "Manual operator review required.",
  });

  assert.equal(blocked.status, "payment_blocked");
  assert.equal(exception.status, "manual_exception");
  assert.equal(exception.manual_exception_reason, "Manual operator review required.");
  assert.deepEqual(exception.boundary_flags, V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS);
});

test("[v2.3] manual payment workflow can cancel non-final records and preserves final records", () => {
  const cancelled = cancel_manual_payment_record({
    record: mark_invoice_sent({ record: create_record() }),
    cancelled_at: "2026-04-28T09:40:00.000Z",
  });
  const after_cancel = mark_payment_pending({ record: cancelled });
  const confirmed = mark_payment_confirmed({
    record: mark_payment_pending({
      record: mark_invoice_sent({ record: create_record() }),
    }),
    manual_confirmation_ref: "manual-confirmation:final",
  });
  const after_confirmed = cancel_manual_payment_record({ record: confirmed });

  assert.equal(cancelled.status, "cancelled");
  assert.equal(after_cancel.status, "cancelled");
  assert.equal(confirmed.status, "payment_confirmed");
  assert.equal(after_confirmed.status, "payment_confirmed");
  assert.equal(after_confirmed.manual_confirmation_ref, "manual-confirmation:final");
  assert.equal(after_confirmed.payment_record_id, confirmed.payment_record_id);
});

test("[v2.3] manual payment summary output is deterministic", () => {
  const record = mark_invoice_sent({ record: create_record() });
  const first = create_manual_payment_summary(record);
  const second = create_manual_payment_summary(record);

  assert.deepEqual(first, second);
  assert.equal(first.manual_only, true);
  assert.equal(first.non_executing, true);
});
