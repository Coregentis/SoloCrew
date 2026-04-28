import {
  qualify_design_partner_intake,
} from "../../app/pilots/design-partner-qualification.ts";
import {
  create_manual_payment_summary,
} from "../../app/pilots/manual-payment-status-workflow.ts";
import {
  create_next_action_proposal,
} from "../../app/pilots/next-action-proposal-workflow.ts";
import {
  V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
  V2_3_MANUAL_REVIEW_PILOT_INTAKE,
  V2_3_STRONG_FIT_PILOT_INTAKE,
} from "./v2-3-pilot-intake-fixture.ts";
import {
  createV23ManualPaymentStatusFixture,
} from "./v2-3-manual-payment-status-fixture.ts";
import {
  createV22PrivateAlphaReviewPacketFixture,
} from "./v2-2-private-alpha-review-packet-fixture.ts";
import {
  createV22FounderDashboardContinuationFixture,
} from "./v2-2-founder-dashboard-continuation-fixture.ts";
import {
  V2_2_STABLE_SOURCE_REFS,
} from "../../app/pilots/next-action-proposal-contract.ts";

const payment_fixture = createV23ManualPaymentStatusFixture();
const review_packet = createV22PrivateAlphaReviewPacketFixture();
const dashboard = createV22FounderDashboardContinuationFixture();

export function createV23NextActionProposalFixture() {
  return {
    fixture_id: "v2-3-next-action-proposal-fixture",
    fixture_kind: "review_only_next_action_proposals",
    v2_2_stable_baseline: V2_2_STABLE_SOURCE_REFS,
    proposals: {
      blocked_or_disqualified: create_next_action_proposal({
        proposal_id: "v2-3-next-action-blocked-candidate",
        created_at: "2026-04-28T10:00:00.000Z",
        intake: V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE,
        qualification_summary: qualify_design_partner_intake(
          V2_3_FORBIDDEN_CAPABILITY_PILOT_INTAKE
        ),
      }),
      manual_review: create_next_action_proposal({
        proposal_id: "v2-3-next-action-manual-review",
        created_at: "2026-04-28T10:05:00.000Z",
        intake: {
          ...V2_3_MANUAL_REVIEW_PILOT_INTAKE,
          status: "needs_manual_review",
        },
        qualification_summary: qualify_design_partner_intake(
          V2_3_MANUAL_REVIEW_PILOT_INTAKE
        ),
      }),
      qualified_without_payment: create_next_action_proposal({
        proposal_id: "v2-3-next-action-prepare-manual-invoice",
        created_at: "2026-04-28T10:10:00.000Z",
        intake: {
          ...V2_3_STRONG_FIT_PILOT_INTAKE,
          status: "qualified",
        },
        qualification_summary: qualify_design_partner_intake(
          V2_3_STRONG_FIT_PILOT_INTAKE
        ),
      }),
      invoice_sent: create_next_action_proposal({
        proposal_id: "v2-3-next-action-wait-payment-signal",
        created_at: "2026-04-28T10:15:00.000Z",
        intake: {
          ...V2_3_STRONG_FIT_PILOT_INTAKE,
          status: "qualified",
        },
        qualification_summary: qualify_design_partner_intake(
          V2_3_STRONG_FIT_PILOT_INTAKE
        ),
        manual_payment_record: payment_fixture.records.invoice_sent,
        manual_payment_summary: create_manual_payment_summary(
          payment_fixture.records.invoice_sent
        ),
      }),
      payment_pending: create_next_action_proposal({
        proposal_id: "v2-3-next-action-confirm-payment",
        created_at: "2026-04-28T10:20:00.000Z",
        intake: {
          ...V2_3_STRONG_FIT_PILOT_INTAKE,
          status: "qualified",
        },
        qualification_summary: qualify_design_partner_intake(
          V2_3_STRONG_FIT_PILOT_INTAKE
        ),
        manual_payment_record: payment_fixture.records.payment_pending,
        manual_payment_summary: create_manual_payment_summary(
          payment_fixture.records.payment_pending
        ),
      }),
      manual_exception: create_next_action_proposal({
        proposal_id: "v2-3-next-action-resolve-manual-exception",
        created_at: "2026-04-28T10:25:00.000Z",
        intake: {
          ...V2_3_MANUAL_REVIEW_PILOT_INTAKE,
          status: "needs_manual_review",
        },
        qualification_summary: qualify_design_partner_intake(
          V2_3_MANUAL_REVIEW_PILOT_INTAKE
        ),
        manual_payment_record: payment_fixture.records.payment_blocked,
        manual_payment_summary: create_manual_payment_summary(
          payment_fixture.records.payment_blocked
        ),
      }),
      payment_confirmed_with_v2_2_refs: create_next_action_proposal({
        proposal_id: "v2-3-next-action-prepare-feedback",
        created_at: "2026-04-28T10:30:00.000Z",
        intake: {
          ...V2_3_STRONG_FIT_PILOT_INTAKE,
          status: "qualified",
        },
        qualification_summary: qualify_design_partner_intake(
          V2_3_STRONG_FIT_PILOT_INTAKE
        ),
        manual_payment_record: payment_fixture.records.payment_confirmed,
        manual_payment_summary: create_manual_payment_summary(
          payment_fixture.records.payment_confirmed
        ),
        review_packet_export: review_packet,
        dashboard_page_model: dashboard,
      }),
    },
  } as const;
}
