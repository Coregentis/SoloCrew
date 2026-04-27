import {
  mkdirSync,
  readFileSync,
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
import {
  REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS,
  type ReviewPacketExportFileRefs,
  type ReviewPacketExportResult,
  type ReviewPacketExportReviewChainSummary,
  type V2_2ReviewPacketExport,
} from "./review-packet-export-contract.ts";

export type CreateReviewPacketExportFromWorkspaceInput = {
  workspace: SoloCrewWorkspaceRecord;
  export_id: string;
  exported_at: string;
  output_directory: string;
};

function stable_json(value: unknown): string {
  return `${JSON.stringify(value, null, 2)}\n`;
}

function write_atomic(path: string, content: string): void {
  mkdirSync(dirname(path), { recursive: true });
  const temp_path = `${path}.tmp`;
  writeFileSync(temp_path, content, "utf8");
  renameSync(temp_path, path);
}

function file_refs_for_export(
  output_directory: string,
  export_id: string
): ReviewPacketExportFileRefs {
  return {
    json_path: join(output_directory, `${export_id}.json`),
    markdown_path: join(output_directory, `${export_id}.md`),
  };
}

function sorted_history_events(
  workspace: SoloCrewWorkspaceRecord
): WorkspaceHistoryEvent[] {
  return [...workspace.history_events].sort((left, right) =>
    left.event_id.localeCompare(right.event_id)
  );
}

function derive_request_summary(workspace: SoloCrewWorkspaceRecord): string {
  return (
    sorted_history_events(workspace).find(
      (event) =>
        event.event_kind === "user_request_recorded" ||
        event.event_kind === "workspace_created"
    )?.summary ?? "No request summary is available for this workspace."
  );
}

function derive_review_chain_summary(
  workspace: SoloCrewWorkspaceRecord
): ReviewPacketExportReviewChainSummary {
  const placeholder_present = workspace.history_events.some(
    (event) => event.event_kind === "v2_1_review_chain_placeholder_recorded"
  );
  const placeholder_status = placeholder_present
    ? "referenced by workspace history"
    : "not yet referenced by workspace history";

  return {
    review_chain_summary:
      `V2.1 review-only chain is ${placeholder_status}; packet export remains local and human-reviewable.`,
    secretary_routing_summary:
      "SecretaryRoutingProposal remains a product-local routing proposal and does not dispatch.",
    management_directive_summary:
      "ManagementDirective remains a review-only product projection and does not execute.",
    cell_ceo_assembly_summary:
      "CellCEOAssemblyPlanPreview remains an assembly preview and does not create runtime workers.",
    project_governance_mapping_summary:
      "ProjectGovernanceAssetFamilyMapping remains a product-local mapping summary and only references CGOS binding posture.",
  };
}

function assert_review_packet_export_safe(
  export_packet: V2_2ReviewPacketExport
): void {
  assert_cgos_projection_safe_consumption(export_packet.cgos_consumption);
  assert_no_forbidden_cgos_payload_keys(export_packet);

  if (!export_packet.boundary_flags.non_executing) {
    throw new Error("Review packet export must remain non-executing.");
  }

  if (!export_packet.boundary_flags.runtime_private_fields_omitted) {
    throw new Error("Review packet export must omit runtime-private fields.");
  }
}

export function create_review_packet_export_from_workspace(
  input: CreateReviewPacketExportFromWorkspaceInput
): V2_2ReviewPacketExport {
  assert_cgos_projection_safe_consumption(input.workspace.cgos_consumption);
  assert_no_forbidden_cgos_payload_keys(input.workspace);

  const file_refs = file_refs_for_export(
    input.output_directory,
    input.export_id
  );
  const review_chain = derive_review_chain_summary(input.workspace);
  const export_packet: V2_2ReviewPacketExport = {
    export_id: input.export_id,
    workspace_id: input.workspace.workspace_id,
    journey_id: input.workspace.active_journey_id,
    primary_vertical: input.workspace.primary_vertical,
    exported_at: input.exported_at,
    request_summary: derive_request_summary(input.workspace),
    review_chain_summary: review_chain.review_chain_summary,
    secretary_routing_summary: review_chain.secretary_routing_summary,
    management_directive_summary: review_chain.management_directive_summary,
    cell_ceo_assembly_summary: review_chain.cell_ceo_assembly_summary,
    project_governance_mapping_summary:
      review_chain.project_governance_mapping_summary,
    cgos_consumption: input.workspace.cgos_consumption,
    safe_evidence_refs: input.workspace.cgos_consumption.safe_evidence_refs
      .map((entry) => entry.evidence_ref)
      .sort(),
    omission_markers: input.workspace.cgos_consumption.omission_markers
      .map((entry) => entry.marker)
      .sort(),
    protocol_version_refs: input.workspace.cgos_consumption.protocol_version_refs
      .map((entry) => `${entry.ref_kind}:${entry.ref_id}:${entry.ref_version}`)
      .sort(),
    binding_version_refs: input.workspace.cgos_consumption.binding_version_refs
      .map((entry) => `${entry.ref_kind}:${entry.ref_id}:${entry.ref_version}`)
      .sort(),
    next_review_action: input.workspace.next_review_action,
    boundary_notices: [
      "This is a deterministic local review packet for human review.",
      "This packet consumes Cognitive_OS posture references and bounded summaries without defining upstream runtime or protocol semantics.",
      "This packet is not an execution packet, dispatch payload, marketplace artifact, paid-product readiness claim, release claim, certification, or endorsement.",
    ],
    boundary_flags: REVIEW_PACKET_EXPORT_BOUNDARY_FLAGS,
    json_export_path: file_refs.json_path,
    markdown_export_path: file_refs.markdown_path,
    status: "exported",
  };

  assert_review_packet_export_safe(export_packet);
  return export_packet;
}

export function render_review_packet_markdown(
  export_packet: V2_2ReviewPacketExport
): string {
  assert_review_packet_export_safe(export_packet);

  return [
    "# SoloCrew V2.2 Local Review Packet",
    "",
    `export_id: ${export_packet.export_id}`,
    `workspace_id: ${export_packet.workspace_id}`,
    `journey_id: ${export_packet.journey_id}`,
    `primary_vertical: ${export_packet.primary_vertical}`,
    `exported_at: ${export_packet.exported_at}`,
    `status: ${export_packet.status}`,
    "",
    "## Request",
    "",
    export_packet.request_summary,
    "",
    "## V2.1 Review-Only Chain",
    "",
    `- review_chain_summary: ${export_packet.review_chain_summary}`,
    `- secretary_routing_summary: ${export_packet.secretary_routing_summary}`,
    `- management_directive_summary: ${export_packet.management_directive_summary}`,
    `- cell_ceo_assembly_summary: ${export_packet.cell_ceo_assembly_summary}`,
    `- project_governance_mapping_summary: ${export_packet.project_governance_mapping_summary}`,
    "",
    "## Consumed CGOS Posture",
    "",
    `- projection_safe_runtime_envelope_ref: ${export_packet.cgos_consumption.projection_safe_runtime_envelope_ref.ref_id}`,
    `- state_snapshot_posture_ref: ${export_packet.cgos_consumption.state_snapshot_posture_ref.ref_id}`,
    `- transaction_export_posture_ref: ${export_packet.cgos_consumption.transaction_export_posture_ref.ref_id}`,
    `- error_insufficiency_posture_ref: ${export_packet.cgos_consumption.error_insufficiency_posture_ref.ref_id}`,
    `- required_module_posture_names: ${export_packet.cgos_consumption.required_module_posture_names.join(", ")}`,
    `- required_kernel_duty_ids: ${export_packet.cgos_consumption.required_kernel_duty_ids.join(", ")}`,
    `- protocol_version_refs: ${export_packet.protocol_version_refs.join(", ")}`,
    `- binding_version_refs: ${export_packet.binding_version_refs.join(", ")}`,
    "",
    "## Safe Evidence Refs",
    "",
    ...export_packet.safe_evidence_refs.map((ref) => `- ${ref}`),
    "",
    "## Omission Markers",
    "",
    ...export_packet.omission_markers.map((marker) => `- ${marker}`),
    "",
    "## Boundary Notices",
    "",
    ...export_packet.boundary_notices.map((notice) => `- ${notice}`),
    "",
    "## Next Review Action",
    "",
    export_packet.next_review_action,
    "",
  ].join("\n");
}

export function create_review_packet_export(
  input: CreateReviewPacketExportFromWorkspaceInput
): ReviewPacketExportResult {
  const export_packet = create_review_packet_export_from_workspace(input);
  return {
    export_packet,
    markdown: render_review_packet_markdown(export_packet),
  };
}

export function write_review_packet_export(
  export_packet: V2_2ReviewPacketExport
): void {
  assert_review_packet_export_safe(export_packet);
  write_atomic(export_packet.json_export_path, stable_json(export_packet));
  write_atomic(
    export_packet.markdown_export_path,
    render_review_packet_markdown(export_packet)
  );
}

export function load_review_packet_export(
  json_export_path: string
): V2_2ReviewPacketExport {
  const parsed = JSON.parse(
    readFileSync(json_export_path, "utf8")
  ) as V2_2ReviewPacketExport;
  assert_review_packet_export_safe(parsed);
  return parsed;
}

export function export_review_packet_to_local_files(
  input: CreateReviewPacketExportFromWorkspaceInput
): ReviewPacketExportResult {
  const result = create_review_packet_export(input);
  write_review_packet_export(result.export_packet);
  return result;
}
