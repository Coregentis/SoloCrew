import {
  create_review_packet_export_from_workspace,
  load_review_packet_export,
  render_review_packet_markdown,
  write_review_packet_export,
} from "./review-packet-exporter.ts";
import type {
  V2_2ReviewPacketExport,
} from "./review-packet-export-contract.ts";
import type {
  SoloCrewWorkspaceRecord,
} from "../workspaces/workspace-contract.ts";
import type {
  SoloCrewWorkspaceStore,
} from "../workspaces/workspace-store.ts";

export type ExportReviewPacketWorkflowInput = {
  store: SoloCrewWorkspaceStore;
  workspace_id: string;
  export_id: string;
  exported_at: string;
  output_directory: string;
};

export type ExportReviewPacketWorkflowResult = {
  export_packet: V2_2ReviewPacketExport;
  markdown: string;
  workspace: SoloCrewWorkspaceRecord;
  user_safe_summary: string;
};

export function export_review_packet_for_workspace(
  input: ExportReviewPacketWorkflowInput
): ExportReviewPacketWorkflowResult {
  const workspace = input.store.load_workspace(input.workspace_id);
  const export_packet = create_review_packet_export_from_workspace({
    workspace,
    export_id: input.export_id,
    exported_at: input.exported_at,
    output_directory: input.output_directory,
  });
  write_review_packet_export(export_packet);

  const history_updated_workspace = input.store.append_workspace_history_event(
    workspace.workspace_id,
    {
      event_id: `${workspace.workspace_id}:review_packet_exported:${input.export_id}`,
      workspace_id: workspace.workspace_id,
      occurred_at: input.exported_at,
      event_kind: "review_packet_exported",
      summary:
        "Deterministic local review packet export generated for human review; no execution, dispatch, or marketplace behavior started.",
      latest_step: "review_packet_exported",
      safe_evidence_refs: export_packet.safe_evidence_refs,
      omission_markers: export_packet.omission_markers,
      non_executing: true,
      runtime_private_fields_omitted: true,
    }
  );
  const saved_workspace = input.store.save_workspace({
    ...history_updated_workspace,
    next_review_action: "review_local_packet_with_human",
  });

  return {
    export_packet,
    markdown: render_review_packet_markdown(export_packet),
    workspace: saved_workspace,
    user_safe_summary:
      `Local review packet ${export_packet.export_id} is available for human review.`,
  };
}

export function load_exported_review_packet(
  json_export_path: string
): V2_2ReviewPacketExport {
  return load_review_packet_export(json_export_path);
}
