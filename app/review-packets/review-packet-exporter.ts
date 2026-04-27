import {
  mkdirSync,
  renameSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";

import {
  assert_cgos_projection_safe_consumption,
  assert_no_forbidden_cgos_payload_keys,
} from "../cgos/cgos-projection-safe-consumption-contract.ts";
import type {
  SoloCrewWorkspaceRecord,
  WorkspaceHistoryEvent,
} from "../workspaces/workspace-contract.ts";
import type {
  SoloCrewWorkspaceStore,
} from "../workspaces/workspace-store.ts";
import {
  REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS,
  type ReviewPacketExportFileRefs,
  type ReviewPacketExportManifest,
  type ReviewPacketExportResult,
} from "./review-packet-export-contract.ts";

export type CreateReviewPacketExportInput = {
  workspace: SoloCrewWorkspaceRecord;
  export_id: string;
  exported_at: string;
  output_directory: string;
};

export type ExportReviewPacketToLocalFilesInput =
  CreateReviewPacketExportInput & {
    store?: SoloCrewWorkspaceStore;
  };

function stable_json(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function file_refs_for_export(
  output_directory: string,
  export_id: string
): ReviewPacketExportFileRefs {
  return {
    markdown_path: join(output_directory, `${export_id}.md`),
    manifest_path: join(output_directory, `${export_id}.manifest.json`),
  };
}

function write_atomic(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  const temp_path = `${path}.tmp`;
  writeFileSync(temp_path, content, "utf8");
  renameSync(temp_path, path);
}

function sorted_history_events(
  workspace: SoloCrewWorkspaceRecord
): WorkspaceHistoryEvent[] {
  return [...workspace.history_events].sort((left, right) =>
    left.event_id.localeCompare(right.event_id)
  );
}

function create_review_packet_manifest(
  input: CreateReviewPacketExportInput
): ReviewPacketExportManifest {
  assert_cgos_projection_safe_consumption(input.workspace.cgos_consumption);
  assert_no_forbidden_cgos_payload_keys(input.workspace);

  return {
    export_id: input.export_id,
    workspace_summary: {
      workspace_id: input.workspace.workspace_id,
      workspace_label: input.workspace.workspace_label,
      primary_vertical: input.workspace.primary_vertical,
      active_journey_id: input.workspace.active_journey_id,
      latest_step: input.workspace.latest_step,
      next_review_action: input.workspace.next_review_action,
      history_event_count: input.workspace.history_events.length,
    },
    export_format: "markdown",
    exported_at: input.exported_at,
    local_file_refs: file_refs_for_export(
      input.output_directory,
      input.export_id
    ),
    cgos_consumption: input.workspace.cgos_consumption,
    history_events: sorted_history_events(input.workspace),
    boundary_flags: REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS,
    runtime_private_fields_omitted: true,
  };
}

export function render_review_packet_markdown(
  manifest: ReviewPacketExportManifest
): string {
  const module_names = manifest.cgos_consumption.required_module_posture_names
    .join(", ");
  const duty_ids = manifest.cgos_consumption.required_kernel_duty_ids.join(", ");
  const evidence_refs = manifest.cgos_consumption.safe_evidence_refs
    .map((entry) => `- ${entry.evidence_ref}: ${entry.summary}`)
    .join("\n");
  const omission_markers = manifest.cgos_consumption.omission_markers
    .map((entry) => `- ${entry.marker}: ${entry.reason}`)
    .join("\n");
  const history = manifest.history_events
    .map(
      (entry) =>
        `- ${entry.event_id} | ${entry.event_kind} | ${entry.latest_step} | ${entry.summary}`
    )
    .join("\n");

  return [
    `# SoloCrew V2.2 Local Review Packet`,
    ``,
    `export_id: ${manifest.export_id}`,
    `workspace_id: ${manifest.workspace_summary.workspace_id}`,
    `workspace_label: ${manifest.workspace_summary.workspace_label}`,
    `primary_vertical: ${manifest.workspace_summary.primary_vertical}`,
    `exported_at: ${manifest.exported_at}`,
    ``,
    `## Boundary`,
    ``,
    `- local_only: true`,
    `- review_only: true`,
    `- non_executing: true`,
    `- provider_dispatch: unavailable`,
    `- channel_dispatch: unavailable`,
    `- marketplace_implementation: unavailable`,
    `- autonomous_execution: unavailable`,
    `- execution_packet: false`,
    `- certification_or_endorsement: false`,
    `- paid_readiness_claim: false`,
    `- v2_2_completion_claim: false`,
    ``,
    `## Workspace`,
    ``,
    `- active_journey_id: ${manifest.workspace_summary.active_journey_id}`,
    `- latest_step: ${manifest.workspace_summary.latest_step}`,
    `- next_review_action: ${manifest.workspace_summary.next_review_action}`,
    `- history_event_count: ${manifest.workspace_summary.history_event_count}`,
    ``,
    `## Consumed CGOS Posture`,
    ``,
    `- source_of_truth: ${manifest.cgos_consumption.source_of_truth}`,
    `- projection_safe_runtime_envelope_ref: ${manifest.cgos_consumption.projection_safe_runtime_envelope_ref.ref_id}`,
    `- state_snapshot_posture_ref: ${manifest.cgos_consumption.state_snapshot_posture_ref.ref_id}`,
    `- transaction_export_posture_ref: ${manifest.cgos_consumption.transaction_export_posture_ref.ref_id}`,
    `- error_insufficiency_posture_ref: ${manifest.cgos_consumption.error_insufficiency_posture_ref.ref_id}`,
    `- required_module_posture_names: ${module_names}`,
    `- required_kernel_duty_ids: ${duty_ids}`,
    ``,
    `## Safe Evidence Refs`,
    ``,
    evidence_refs,
    ``,
    `## Omission Markers`,
    ``,
    omission_markers,
    ``,
    `## Workspace History`,
    ``,
    history,
    ``,
  ].join("\n");
}

export function create_review_packet_export(
  input: CreateReviewPacketExportInput
): ReviewPacketExportResult {
  const manifest = create_review_packet_manifest(input);
  const markdown = render_review_packet_markdown(manifest);
  assert_no_forbidden_cgos_payload_keys(manifest);

  return {
    manifest,
    markdown,
  };
}

export function export_review_packet_to_local_files(
  input: ExportReviewPacketToLocalFilesInput
): ReviewPacketExportResult {
  const result = create_review_packet_export(input);

  write_atomic(result.manifest.local_file_refs.markdown_path, result.markdown);
  write_atomic(
    result.manifest.local_file_refs.manifest_path,
    stable_json(result.manifest)
  );

  if (input.store) {
    input.store.append_workspace_history_event(input.workspace.workspace_id, {
      event_id: `${input.workspace.workspace_id}:review_packet_export:${input.export_id}`,
      workspace_id: input.workspace.workspace_id,
      occurred_at: input.exported_at,
      event_kind: "review_packet_exported",
      summary:
        "Local review packet export generated for human review; no execution or dispatch started.",
      latest_step: "review_packet_exported",
      safe_evidence_refs: input.workspace.cgos_consumption.safe_evidence_refs.map(
        (entry) => entry.evidence_ref
      ),
      omission_markers: input.workspace.cgos_consumption.omission_markers.map(
        (entry) => entry.marker
      ),
      non_executing: true,
      runtime_private_fields_omitted: true,
    });
  }

  return result;
}
