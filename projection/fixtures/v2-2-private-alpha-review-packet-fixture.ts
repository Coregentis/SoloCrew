import {
  create_review_packet_export_from_workspace,
} from "../../app/review-packets/review-packet-exporter.ts";
import type {
  V2_2ReviewPacketExport,
} from "../../app/review-packets/review-packet-export-contract.ts";
import {
  createV22PrivateAlphaWorkspaceFixture,
} from "./v2-2-private-alpha-workspace-fixture.ts";

export const V2_2_PRIVATE_ALPHA_REVIEW_PACKET_EXPORT_ID =
  "review-packet-v2-2-private-alpha-project-governance";

export function createV22PrivateAlphaReviewPacketFixture(
  output_directory = ".solocrew/review-packets"
): V2_2ReviewPacketExport {
  return create_review_packet_export_from_workspace({
    workspace: createV22PrivateAlphaWorkspaceFixture(),
    export_id: V2_2_PRIVATE_ALPHA_REVIEW_PACKET_EXPORT_ID,
    exported_at: "2026-04-28T00:30:00.000Z",
    output_directory,
  });
}
