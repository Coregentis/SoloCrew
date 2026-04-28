import assert from "node:assert/strict";
import test from "node:test";

import {
  create_manual_payment_summary,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  createV23ManualPaymentStatusFixture,
} from "../../projection/fixtures/v2-3-manual-payment-status-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /processor_customer_id/i,
  /checkout_url/i,
  /subscription_id/i,
  /card_token/i,
  /bank_execution_payload/i,
  /crypto_execution_payload/i,
  /provider_dispatch_payload/i,
  /channel_dispatch_payload/i,
  /marketplace_install/i,
  /autonomous_execution_enabled/i,
  /paid product ready/i,
  /public beta ready/i,
  /commercial ready/i,
  /production-ready/i,
  /V3\.0 released/i,
  /MPLP certification/i,
  /MPLP endorsement/i,
  /raw_runtime_private_payload/i,
  /Context law/i,
  /Plan law/i,
  /Confirm law/i,
  /Trace law/i,
  /Core law/i,
  /State Sync law/i,
  /Transaction law/i,
  /Security omission law/i,
  /Observability evidence law/i,
  /Protocol Versioning posture/i,
  /Object\/export binding semantics/i,
] as const;

test("[v2.3] manual payment fixture includes the required status examples", () => {
  const fixture = createV23ManualPaymentStatusFixture();

  assert.equal(fixture.records.invoice_sent.status, "invoice_sent");
  assert.equal(fixture.records.payment_pending.status, "payment_pending");
  assert.equal(fixture.records.payment_confirmed.status, "payment_confirmed");
  assert.equal(fixture.records.payment_blocked.status, "payment_blocked");
  assert.equal(fixture.records.manual_exception.status, "manual_exception");
  assert.equal(
    fixture.v2_2_stable_baseline.tag,
    "solocrew-v2.2-stable-private-alpha-journey-20260428"
  );
});

test("[v2.3] manual payment serialized records and summaries avoid payment execution and overclaim fields", () => {
  const fixture = createV23ManualPaymentStatusFixture();
  const payload = JSON.stringify({
    fixture,
    summaries: Object.values(fixture.records).map(create_manual_payment_summary),
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  assert.match(payload, /no_payment_processor/);
  assert.match(payload, /no_checkout/);
  assert.match(payload, /no_subscription_management/);
  assert.match(payload, /no_automated_billing/);
  assert.match(payload, /no_card_storage/);
  assert.match(payload, /no_bank_execution/);
  assert.match(payload, /no_crypto_execution/);
  assert.match(payload, /no_provider_dispatch/);
  assert.match(payload, /no_channel_dispatch/);
  assert.match(payload, /no_marketplace_implementation/);
  assert.match(payload, /no_autonomous_execution/);
});
