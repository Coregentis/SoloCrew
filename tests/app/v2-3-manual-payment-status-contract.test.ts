import assert from "node:assert/strict";
import test from "node:test";

import {
  V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS,
} from "../../app/pilots/manual-payment-status-contract.ts";
import {
  create_manual_payment_record,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "../../projection/fixtures/v2-3-pilot-intake-fixture.ts";

test("[v2.3] manual payment contract creates a deterministic invoice draft", () => {
  const record = create_manual_payment_record({
    payment_record_id: "manual-payment-contract-001",
    intake: V2_3_STRONG_FIT_PILOT_INTAKE,
    invoice_id: "manual-invoice-contract-001",
    created_at: "2026-04-28T09:00:00.000Z",
    currency_code: "usd",
    amount_minor_units: 125000,
    invoice_label: "Manual design-partner pilot invoice",
    manual_payment_instruction_ref: "manual-note:contract-001",
  });

  assert.equal(record.status, "invoice_draft");
  assert.equal(record.intake_id, V2_3_STRONG_FIT_PILOT_INTAKE.intake_id);
  assert.equal(
    record.design_partner_id,
    V2_3_STRONG_FIT_PILOT_INTAKE.design_partner_id
  );
  assert.equal(record.currency_code, "USD");
  assert.equal(record.amount_minor_units, 125000);
  assert.equal(record.amount_display, "USD 1250.00");
  assert.deepEqual(record.boundary_flags, V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS);
});

test("[v2.3] manual payment contract keeps every boundary flag true", () => {
  const flags = V2_3_MANUAL_PAYMENT_BOUNDARY_FLAGS;

  assert.equal(flags.manual_only, true);
  assert.equal(flags.no_payment_processor, true);
  assert.equal(flags.no_checkout, true);
  assert.equal(flags.no_subscription_management, true);
  assert.equal(flags.no_automated_billing, true);
  assert.equal(flags.no_card_storage, true);
  assert.equal(flags.no_bank_execution, true);
  assert.equal(flags.no_crypto_execution, true);
  assert.equal(flags.no_saas_sharing, true);
  assert.equal(flags.no_provider_dispatch, true);
  assert.equal(flags.no_channel_dispatch, true);
  assert.equal(flags.no_marketplace_implementation, true);
  assert.equal(flags.no_autonomous_execution, true);
  assert.equal(flags.no_paid_product_readiness_claim, true);
  assert.equal(flags.no_public_beta_claim, true);
  assert.equal(flags.no_mplp_certification, true);
  assert.equal(flags.no_mplp_endorsement, true);
});

test("[v2.3] manual payment contract does not expose executable payment fields", () => {
  const record = create_manual_payment_record({
    payment_record_id: "manual-payment-contract-002",
    intake: V2_3_STRONG_FIT_PILOT_INTAKE,
    invoice_id: "manual-invoice-contract-002",
    created_at: "2026-04-28T09:05:00.000Z",
    method_hint: "manual_payment_link_external_note",
    currency_code: "usd",
    amount_minor_units: 75000,
    invoice_label: "Manual external-note invoice",
    manual_payment_instruction_ref: "manual-note:external-reference-only",
  });
  const serialized = JSON.stringify(record);

  assert.doesNotMatch(serialized, /processor_customer_id/i);
  assert.doesNotMatch(serialized, /checkout_url/i);
  assert.doesNotMatch(serialized, /subscription_id/i);
  assert.doesNotMatch(serialized, /card_token/i);
  assert.doesNotMatch(serialized, /bank_execution_payload/i);
  assert.doesNotMatch(serialized, /crypto_execution_payload/i);
  assert.doesNotMatch(serialized, /provider_dispatch_payload/i);
  assert.doesNotMatch(serialized, /channel_dispatch_payload/i);
  assert.doesNotMatch(serialized, /marketplace_install/i);
  assert.doesNotMatch(serialized, /raw_runtime_private_payload/i);
});
