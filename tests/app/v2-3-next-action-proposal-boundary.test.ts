import assert from "node:assert/strict";
import test from "node:test";

import {
  create_next_action_proposal_summary,
} from "../../app/pilots/next-action-proposal-workflow.ts";
import {
  createV23NextActionProposalFixture,
} from "../../projection/fixtures/v2-3-next-action-proposal-fixture.ts";

const FORBIDDEN_POSITIVE_PATTERNS = [
  /executable_action_instruction/i,
  /provider_dispatch_payload/i,
  /channel_dispatch_payload/i,
  /marketplace_install/i,
  /marketplace_resolver/i,
  /task_runner_payload/i,
  /tool_runner_payload/i,
  /llm_execution_prompt/i,
  /agent_dispatch_payload/i,
  /autonomous_execution_enabled/i,
  /(?<!no_)payment_processor/i,
  /checkout_url/i,
  /subscription_id/i,
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

test("[v2.3] next-action proposal fixture covers deterministic review-only scenarios", () => {
  const fixture = createV23NextActionProposalFixture();
  const proposals = fixture.proposals;

  assert.equal(proposals.blocked_or_disqualified.kind, "decline_or_hold_candidate");
  assert.equal(proposals.manual_review.kind, "request_manual_clarification");
  assert.equal(proposals.qualified_without_payment.kind, "prepare_manual_invoice");
  assert.equal(proposals.invoice_sent.kind, "wait_for_manual_payment_signal");
  assert.equal(proposals.payment_pending.kind, "confirm_payment_manually");
  assert.equal(proposals.manual_exception.kind, "resolve_manual_exception");
  assert.equal(
    proposals.payment_confirmed_with_v2_2_refs.kind,
    "prepare_feedback_request"
  );
});

test("[v2.3] serialized next-action proposals and summaries avoid execution, dispatch, runner, LLM, agent, and payment fields", () => {
  const fixture = createV23NextActionProposalFixture();
  const payload = JSON.stringify({
    fixture,
    summaries: Object.values(fixture.proposals).map(
      create_next_action_proposal_summary
    ),
  });

  for (const pattern of FORBIDDEN_POSITIVE_PATTERNS) {
    assert.doesNotMatch(payload, pattern);
  }

  assert.match(payload, /no_task_runner/);
  assert.match(payload, /no_tool_runner/);
  assert.match(payload, /no_llm_call/);
  assert.match(payload, /no_agent_dispatch/);
  assert.match(payload, /no_provider_dispatch/);
  assert.match(payload, /no_channel_dispatch/);
  assert.match(payload, /no_marketplace_implementation/);
  assert.match(payload, /no_autonomous_execution/);
  assert.match(payload, /no_payment_processor/);
  assert.match(payload, /no_checkout/);
  assert.match(payload, /no_subscription_management/);
});
