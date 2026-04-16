import type {
  CellSummaryProjection,
} from "../contracts/cell-summary-projection-contract.ts";
import type {
  SecretaryHandoffPacketState,
  SecretaryHandoffPacketStateCounts,
  SecretaryHandoffStageIndicator,
} from "../contracts/secretary-handoff-packet-contract.ts";

function format_target_label(target_cell_name?: string): string {
  return target_cell_name ? ` for ${target_cell_name}` : "";
}

export function deriveSecretaryHandoffPacketState(
  selected_summary?: CellSummaryProjection
): SecretaryHandoffPacketState {
  if (!selected_summary) {
    return "draft";
  }

  if (
    selected_summary.cell_summary_card.blocked_work_count > 0 ||
    selected_summary.cell_summary_card.delivery_posture === "blocked"
  ) {
    return "returned_for_revision";
  }

  if (selected_summary.readiness_signal === "attention_required") {
    return "ready_for_cell_review";
  }

  return "staged";
}

export function buildSecretaryHandoffStageIndicators(
  packet_state: SecretaryHandoffPacketState
): SecretaryHandoffStageIndicator[] {
  return [
    {
      stage: "draft",
      label: "draft",
      active: packet_state === "draft",
      note: "Draft frames handoff intent in product space only.",
    },
    {
      stage: "staged",
      label: "staged",
      active: packet_state === "staged",
      note: "Staged means the handoff packet is visible but still non-executing.",
    },
    {
      stage: "ready_for_cell_review",
      label: "ready_for_cell_review",
      active: packet_state === "ready_for_cell_review",
      note: "Ready-for-cell-review signals bounded downstream review readiness, not dispatch or execution.",
    },
    {
      stage: "returned_for_revision",
      label: "returned_for_revision",
      active: packet_state === "returned_for_revision",
      note: "Returned-for-revision signals bounded revision posture only and does not become a workflow command.",
    },
  ];
}

export function buildSecretaryHandoffPacketStateSummary(
  packet_state: SecretaryHandoffPacketState,
  target_cell_name?: string
): string {
  const target_label = format_target_label(target_cell_name);

  switch (packet_state) {
    case "draft":
      return `The handoff packet remains in draft${target_label} and stays product-projected only.`;
    case "staged":
      return `The handoff packet is staged${target_label} as non-executing context only.`;
    case "ready_for_cell_review":
      return `The handoff packet is ready_for_cell_review${target_label} and stays bounded to downstream cell-facing review posture.`;
    case "returned_for_revision":
      return `The handoff packet is returned_for_revision${target_label} and stays bounded to revision posture only.`;
  }
}

export function buildSecretaryHandoffRevisionLoopSummary(
  packet_state: SecretaryHandoffPacketState,
  target_cell_name?: string
): string {
  const target_label = format_target_label(target_cell_name);

  switch (packet_state) {
    case "draft":
      return `No revision loop is active${target_label}; the packet is still draft and non-executing.`;
    case "staged":
      return `Revision remains available as bounded product posture${target_label}, but the packet is currently staged and non-executing.`;
    case "ready_for_cell_review":
      return `Review readiness is visible${target_label}, but any return loop remains bounded product posture rather than runtime control.`;
    case "returned_for_revision":
      return `Revision visibility is active${target_label}, but return remains a product state and not a reject, dispatch, or execution command.`;
  }
}

export function countSecretaryHandoffPacketStates(
  cell_summary_units: readonly CellSummaryProjection[]
): SecretaryHandoffPacketStateCounts {
  const counts: SecretaryHandoffPacketStateCounts = {
    draft: 0,
    staged: 0,
    ready_for_cell_review: 0,
    returned_for_revision: 0,
  };

  for (const summary of cell_summary_units) {
    counts[deriveSecretaryHandoffPacketState(summary)] += 1;
  }

  return counts;
}
