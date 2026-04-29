import type {
  FounderReviewPacketResult,
} from "../engagement/founder-review-packet-contract.ts";
import {
  create_founder_review_packet_summary,
} from "../engagement/founder-review-packet-workflow.ts";

export type FounderReviewPacketPageModel = {
  page_id: string;
  page_kind: "founder_review_packet";
  generated_at: string;
  title: string;
  summary: string;
  packet_ref: string;
  packet_status: FounderReviewPacketResult["packet"]["status"];
  section_refs: string[];
  decision_options: FounderReviewPacketResult["packet"]["decision_options"];
  packet_summary: ReturnType<typeof create_founder_review_packet_summary>;
  boundary_notices: string[];
  non_executing: true;
};

export function createFounderReviewPacketPageModel(input: {
  result: FounderReviewPacketResult;
  generated_at: string;
  page_id?: string;
}): FounderReviewPacketPageModel {
  return {
    page_id: input.page_id ?? `${input.result.packet.packet_id}:page`,
    page_kind: "founder_review_packet",
    generated_at: input.generated_at,
    title: "Founder review packet",
    summary:
      "Review a deterministic local founder packet created from the review-only engagement loop.",
    packet_ref: input.result.packet.packet_id,
    packet_status: input.result.packet.status,
    section_refs: input.result.packet.sections.map((section) => section.section_id),
    decision_options: [...input.result.packet.decision_options],
    packet_summary: create_founder_review_packet_summary(input.result.packet),
    boundary_notices: [
      "Local in-memory packet object only; no route registration or route URL change.",
      "Manual-first and review-only; no execution, dispatch, publish, or autonomy.",
      "No file output, database storage, email, CRM, analytics, model, agent, or tool call.",
    ],
    non_executing: true,
  };
}
