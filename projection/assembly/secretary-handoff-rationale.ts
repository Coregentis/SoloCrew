import type {
  ProjectionUpstreamRef,
} from "../contracts/projection-object-types.ts";
import type {
  SecretaryHandoffRationaleEvidenceProjection,
  SecretaryHandoffRationaleScope,
} from "../contracts/secretary-handoff-rationale-contract.ts";
import type {
  SecretaryHandoffPacketState,
} from "../contracts/secretary-handoff-packet-contract.ts";

interface PacketStateRationaleInput {
  scope:
    | "secretary_handoff_staging_rationale"
    | "secretary_handoff_review_packet_rationale";
  packet_state: SecretaryHandoffPacketState;
  target_cell_name?: string;
  target_readiness_signal?: string;
  target_delivery_posture?: string;
  target_active_work_count?: number;
  target_blocked_work_count?: number;
  target_objective_status_summary?: string;
  truth_sources: readonly string[];
  upstream_refs: readonly ProjectionUpstreamRef[];
  rationale_summary: string;
  evidence_summary: string;
  provenance_summary: string;
}

interface PortfolioRationaleInput {
  total_cells: number;
  attention_required_cells: number;
  ready_for_cell_review_cells: number;
  returned_for_revision_cells: number;
  selected_cell_name?: string;
  selected_packet_state?: SecretaryHandoffPacketState;
  truth_sources: readonly string[];
  upstream_refs: readonly ProjectionUpstreamRef[];
}

const COMMON_OMISSION_NOTES = [
  "Packet states remain SoloCrew product posture only and are not upstream workflow-truth objects.",
  "Canonical MPLP Context and Plan artifacts are not claimed or reconstructed by this product explanation surface.",
  "No approve, reject, dispatch, execute, provider, or channel control is exposed here.",
  "SoloCrew explains bounded runtime-derived inputs downstream and does not own runtime or protocol authority.",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function build_source_hints(
  truth_sources: readonly string[],
  upstream_refs: readonly ProjectionUpstreamRef[]
): string[] {
  return unique_items([
    ...truth_sources.map((source) => `truth_source:${source}`),
    ...upstream_refs.map(
      (ref) => `upstream_ref:${ref.upstream_object_type}${ref.upstream_object_id ? `#${ref.upstream_object_id}` : ""}`
    ),
  ]);
}

function build_packet_state_reason_summary(
  packet_state: SecretaryHandoffPacketState,
  target_cell_name?: string
): string {
  const target_name = target_cell_name ?? "the selected cell";

  switch (packet_state) {
    case "draft":
      return `The packet stays draft because ${target_name} has not yet been framed for bounded downstream review posture.`;
    case "staged":
      return `The packet is staged because ${target_name} now has bounded context assembled in product space, but no executable review or dispatch authority is implied.`;
    case "ready_for_cell_review":
      return `The packet is ready_for_cell_review because ${target_name} now has bounded review posture visibility, while review remains downstream and non-executing.`;
    case "returned_for_revision":
      return `The packet is returned_for_revision because ${target_name} currently needs bounded revision visibility, not rejection, dispatch, or execution authority.`;
  }
}

function build_packet_known_facts(
  input: PacketStateRationaleInput
): string[] {
  const facts = [
    `Packet state: ${input.packet_state}`,
    input.target_cell_name
      ? `Target cell: ${input.target_cell_name}`
      : undefined,
    input.target_readiness_signal
      ? `Target readiness signal: ${input.target_readiness_signal}`
      : undefined,
    input.target_delivery_posture
      ? `Target delivery posture: ${input.target_delivery_posture}`
      : undefined,
    typeof input.target_active_work_count === "number"
      ? `Target active work count: ${input.target_active_work_count}`
      : undefined,
    typeof input.target_blocked_work_count === "number"
      ? `Target blocked work count: ${input.target_blocked_work_count}`
      : undefined,
    input.target_objective_status_summary
      ? `Objective status summary: ${input.target_objective_status_summary}`
      : undefined,
  ];

  return facts.filter((value): value is string => Boolean(value));
}

function build_scope_specific_omissions(
  scope: SecretaryHandoffRationaleScope
): string[] {
  if (scope === "portfolio_secretary_lane_rationale") {
    return [
      "Portfolio-level evidence remains a bounded downstream summary and does not become runtime-complete portfolio control.",
    ];
  }

  if (scope === "secretary_handoff_staging_rationale") {
    return [
      "Handoff staging explains bounded intent and evidence only; it does not submit, send, or execute the handoff.",
    ];
  }

  return [
    "Review packet framing explains bounded review posture only and does not become approval, rejection, or dispatch workflow authority.",
  ];
}

export function assemblePortfolioSecretaryRationaleEvidence(
  input: PortfolioRationaleInput
): SecretaryHandoffRationaleEvidenceProjection {
  const selected_scope_note =
    input.selected_cell_name && input.selected_packet_state
      ? build_packet_state_reason_summary(
          input.selected_packet_state,
          input.selected_cell_name
        )
      : "The current lane rationale is derived from cross-cell posture visibility only.";

  return {
    rationale_scope: "portfolio_secretary_lane_rationale",
    authority_boundary: "product_projection_only",
    visibility_mode: "rationale_and_evidence_only",
    control_mode: "non_executing",
    packet_state: input.selected_packet_state,
    rationale_summary:
      "The portfolio Secretary lane explains why bounded attention, review, and revision posture exists across cells without turning posture into control authority.",
    state_reason_summary: selected_scope_note,
    evidence_summary:
      `Evidence remains bounded to ${input.total_cells} visible cell summary projections, management-object visibility, and packet-state counts already adapted into product space.`,
    provenance_summary:
      "Provenance remains downstream: runtime-private summaries and management records are consumed through existing SoloCrew projections, while omitted protocol-facing artifacts are not backfilled locally.",
    known_facts: unique_items([
      `Total visible cells: ${input.total_cells}`,
      `Attention-required cells: ${input.attention_required_cells}`,
      `Ready-for-cell-review packets: ${input.ready_for_cell_review_cells}`,
      `Returned-for-revision packets: ${input.returned_for_revision_cells}`,
      ...(input.selected_cell_name
        ? [`Selected cell: ${input.selected_cell_name}`]
        : []),
      ...(input.selected_packet_state
        ? [`Selected packet state: ${input.selected_packet_state}`]
        : []),
    ]),
    omission_notes: unique_items([
      ...COMMON_OMISSION_NOTES,
      ...build_scope_specific_omissions("portfolio_secretary_lane_rationale"),
    ]),
    source_hints: build_source_hints(input.truth_sources, input.upstream_refs),
    upstream_refs: [...input.upstream_refs],
    direct_controls_available: false,
    runtime_authority_claimed: false,
    protocol_authority_claimed: false,
  };
}

export function assembleSecretaryHandoffRationaleEvidence(
  input: PacketStateRationaleInput
): SecretaryHandoffRationaleEvidenceProjection {
  return {
    rationale_scope: input.scope,
    authority_boundary: "product_projection_only",
    visibility_mode: "rationale_and_evidence_only",
    control_mode: "non_executing",
    packet_state: input.packet_state,
    rationale_summary: input.rationale_summary,
    state_reason_summary: build_packet_state_reason_summary(
      input.packet_state,
      input.target_cell_name
    ),
    evidence_summary: input.evidence_summary,
    provenance_summary: input.provenance_summary,
    known_facts: build_packet_known_facts(input),
    omission_notes: unique_items([
      ...COMMON_OMISSION_NOTES,
      ...build_scope_specific_omissions(input.scope),
    ]),
    source_hints: build_source_hints(input.truth_sources, input.upstream_refs),
    upstream_refs: [...input.upstream_refs],
    direct_controls_available: false,
    runtime_authority_claimed: false,
    protocol_authority_claimed: false,
  };
}
