import {
  create_v2_2_founder_dashboard_continuation_page_model,
} from "../../app/shell/create-v2-2-founder-dashboard-continuation-page-model.ts";
import type {
  V2_2FounderDashboardContinuationPageModel,
} from "../../app/dashboard/v2-2-founder-dashboard-continuation-contract.ts";
import {
  createV22PrivateAlphaReviewPacketFixture,
} from "./v2-2-private-alpha-review-packet-fixture.ts";
import {
  createV22PrivateAlphaWorkspaceFixture,
} from "./v2-2-private-alpha-workspace-fixture.ts";

export function createV22FounderDashboardContinuationFixture(): V2_2FounderDashboardContinuationPageModel {
  const workspace = createV22PrivateAlphaWorkspaceFixture();
  const review_packet = createV22PrivateAlphaReviewPacketFixture();

  return create_v2_2_founder_dashboard_continuation_page_model({
    workspace,
    latest_review_packet_export: review_packet,
    generated_at: "2026-04-28T00:40:00.000Z",
  });
}
