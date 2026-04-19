import type {
  CellSummaryProjection,
} from "../contracts/cell-summary-projection-contract.ts";
import type {
  FounderRequestProjectionSummaryAvailability,
} from "../contracts/founder-request-exception-packet-contract.ts";
import type {
  SecretaryHandoffFounderRequestExceptionEnrichment,
} from "../contracts/secretary-handoff-review-packet-contract.ts";
import type {
  SecretaryHandoffFounderRequestExceptionPreview,
} from "../contracts/secretary-handoff-staging-contract.ts";
import type {
  PortfolioFounderRequestAggregatePosture,
  PortfolioFounderRequestAggregateSourceSummary,
  PortfolioSecretaryManagementObjectStatus,
  PortfolioSecretaryShellProjection,
} from "../contracts/portfolio-secretary-shell-contract.ts";
import {
  countSecretaryHandoffPacketStates,
  deriveSecretaryHandoffPacketState,
} from "./secretary-handoff-packet-state.ts";
import {
  assemblePortfolioSecretaryRationaleEvidence,
} from "./secretary-handoff-rationale.ts";

export interface PortfolioSecretaryShellAssemblyInput {
  source_overview_shell_id: string;
  cell_summary_units: CellSummaryProjection[];
  management_object_family_status: {
    management_directive: PortfolioSecretaryManagementObjectStatus;
    delivery_return: PortfolioSecretaryManagementObjectStatus;
    approval_request: PortfolioSecretaryManagementObjectStatus;
  };
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
  founder_request_exception_summaries?: PortfolioFounderRequestAggregateSourceSummary[];
}

const PORTFOLIO_SECRETARY_NON_CLAIMS = [
  "no_direct_approve_control",
  "no_direct_reject_control",
  "no_direct_dispatch_control",
  "no_direct_execute_control",
  "no_provider_or_channel_control",
  "no_workflow_engine_ownership",
  "no_upward_runtime_or_protocol_authority",
] as const;

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function count_attention_required(
  cell_summary_units: readonly CellSummaryProjection[]
): number {
  return cell_summary_units.filter(
    (summary) => summary.readiness_signal === "attention_required"
  ).length;
}

function collect_unique_marker_statuses(
  founder_request_exception_summaries: readonly PortfolioFounderRequestAggregateSourceSummary[]
): FounderRequestProjectionSummaryAvailability[] {
  return [
    ...new Set(
      founder_request_exception_summaries.flatMap((summary) => [
        summary.marker_status,
        summary.evidence_status,
        ...summary.status_markers,
        ...summary.family_status_summaries.map(
          (family_status) => family_status.availability
        ),
      ])
    ),
  ];
}

function has_marker_status(
  founder_request_exception_summaries: readonly PortfolioFounderRequestAggregateSourceSummary[],
  marker_status: FounderRequestProjectionSummaryAvailability
): boolean {
  return founder_request_exception_summaries.some(
    (summary) =>
      summary.marker_status === marker_status ||
      summary.evidence_status === marker_status ||
      summary.status_markers.includes(marker_status) ||
      summary.family_status_summaries.some(
        (family_status) => family_status.availability === marker_status
      )
  );
}

function has_posture(
  founder_request_exception_summaries: readonly PortfolioFounderRequestAggregateSourceSummary[],
  posture: string
): boolean {
  return founder_request_exception_summaries.some(
    (summary) =>
      summary.derived_exception_posture === posture ||
      summary.review_return_posture === posture
  );
}

function derive_portfolio_founder_request_aggregate_posture(
  founder_request_exception_summaries: readonly PortfolioFounderRequestAggregateSourceSummary[]
): PortfolioFounderRequestAggregatePosture {
  if (
    has_posture(
      founder_request_exception_summaries,
      "blocked_by_contract"
    ) ||
    has_marker_status(
      founder_request_exception_summaries,
      "omitted_by_contract"
    ) ||
    has_marker_status(
      founder_request_exception_summaries,
      "not_available_upstream"
    )
  ) {
    return "portfolio_contract_blocked";
  }

  if (
    has_posture(
      founder_request_exception_summaries,
      "escalation_required"
    )
  ) {
    return "portfolio_escalation_required";
  }

  if (
    has_posture(
      founder_request_exception_summaries,
      "activation_blocked"
    )
  ) {
    return "portfolio_activation_blocked";
  }

  if (
    has_posture(founder_request_exception_summaries, "stale_context") ||
    has_marker_status(founder_request_exception_summaries, "stale")
  ) {
    return "portfolio_stale_context";
  }

  if (
    has_posture(
      founder_request_exception_summaries,
      "evidence_insufficient"
    ) ||
    has_marker_status(
      founder_request_exception_summaries,
      "insufficient_evidence"
    )
  ) {
    return "portfolio_evidence_insufficient";
  }

  if (
    has_posture(
      founder_request_exception_summaries,
      "confirm_required"
    )
  ) {
    return "portfolio_confirm_required";
  }

  if (
    has_posture(
      founder_request_exception_summaries,
      "return_for_revision"
    )
  ) {
    return "portfolio_revision_needed";
  }

  if (
    has_posture(founder_request_exception_summaries, "impact_detected")
  ) {
    return "portfolio_impact_detected";
  }

  if (
    has_posture(founder_request_exception_summaries, "review_needed")
  ) {
    return "portfolio_review_needed";
  }

  if (
    has_posture(founder_request_exception_summaries, "monitor")
  ) {
    return "portfolio_monitor";
  }

  return "portfolio_clear";
}

function build_portfolio_founder_request_aggregate_summary(
  founder_request_exception_summaries: readonly PortfolioFounderRequestAggregateSourceSummary[]
): PortfolioSecretaryShellProjection["posture_shelf"]["founder_request_aggregate_posture"] {
  if (founder_request_exception_summaries.length === 0) {
    return undefined;
  }

  const aggregate_posture =
    derive_portfolio_founder_request_aggregate_posture(
      founder_request_exception_summaries
    );
  const review_packet_summary_count =
    founder_request_exception_summaries.filter(
      (summary) =>
        summary.source_summary_scope ===
        "review_packet_exception_summary"
    ).length;
  const staging_preview_summary_count =
    founder_request_exception_summaries.filter(
      (summary) =>
        summary.source_summary_scope ===
        "staging_exception_preview_summary"
    ).length;
  const learning_signal_count =
    founder_request_exception_summaries.filter(
      (summary) => summary.learning_signal_visible
    ).length;

  return {
    summary_scope: "founder_request_exception_portfolio_aggregate",
    aggregate_posture,
    aggregate_summary:
      `Aggregate posture stays ${aggregate_posture} across ${founder_request_exception_summaries.length} bounded founder-request summaries and remains non-executing, summary-only, omission-aware, insufficiency-aware, and stale-aware.`,
    source_summary_count: founder_request_exception_summaries.length,
    review_packet_summary_count,
    staging_preview_summary_count,
    learning_signal_count,
    status_markers: collect_unique_marker_statuses(
      founder_request_exception_summaries
    ),
    non_executing: true,
    summary_only: true,
    omission_aware: true,
    insufficiency_aware: true,
    stale_aware: true,
  };
}

export function summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate(
  founder_request_exception_enrichment: SecretaryHandoffFounderRequestExceptionEnrichment
): PortfolioFounderRequestAggregateSourceSummary {
  return {
    source_summary_scope: "review_packet_exception_summary",
    request_ref: founder_request_exception_enrichment.request_ref,
    request_label: founder_request_exception_enrichment.request_label,
    derived_exception_posture:
      founder_request_exception_enrichment.derived_exception_posture,
    review_return_posture:
      founder_request_exception_enrichment.review_return_posture,
    marker_status: founder_request_exception_enrichment.marker_status,
    evidence_status:
      founder_request_exception_enrichment.evidence_summary.evidence_status,
    learning_signal_visible:
      founder_request_exception_enrichment.learning_suggestion_summary !==
      undefined,
    status_markers: [
      ...founder_request_exception_enrichment.status_markers,
    ],
    family_status_summaries:
      founder_request_exception_enrichment.family_status_summaries.map(
        (family_status) => ({
          family: family_status.family,
          availability: family_status.availability,
          summary_label: family_status.summary_label,
        })
      ),
  };
}

export function summarizeStagingFounderRequestExceptionForPortfolioAggregate(
  founder_request_exception_preview: SecretaryHandoffFounderRequestExceptionPreview
): PortfolioFounderRequestAggregateSourceSummary {
  return {
    source_summary_scope: "staging_exception_preview_summary",
    request_ref: founder_request_exception_preview.request_ref,
    request_label: founder_request_exception_preview.request_label,
    derived_exception_posture:
      founder_request_exception_preview.derived_exception_posture,
    review_return_posture:
      founder_request_exception_preview.review_return_posture,
    marker_status: founder_request_exception_preview.marker_status,
    evidence_status:
      founder_request_exception_preview.evidence_posture_summary.evidence_status,
    learning_signal_visible:
      founder_request_exception_preview.learning_suggestion_hint !==
      undefined,
    status_markers: [...founder_request_exception_preview.status_markers],
    family_status_summaries:
      founder_request_exception_preview.family_status_summaries.map(
        (family_status) => ({
          family: family_status.family,
          availability: family_status.availability,
          summary_label: family_status.summary_label,
        })
      ),
  };
}

export function assemblePortfolioSecretaryShellProjection(
  input: PortfolioSecretaryShellAssemblyInput
): PortfolioSecretaryShellProjection {
  const selected_summary = input.cell_summary_units[0];
  const attention_required_cells = count_attention_required(
    input.cell_summary_units
  );
  const steady_cells =
    input.cell_summary_units.length - attention_required_cells;
  const packet_state_counts = countSecretaryHandoffPacketStates(
    input.cell_summary_units
  );
  const selected_packet_state = selected_summary
    ? deriveSecretaryHandoffPacketState(selected_summary)
    : undefined;
  const aggregated_upstream_refs = unique_items(
    input.cell_summary_units.flatMap((summary) =>
      summary.upstream_refs.map(
        (ref) => `${ref.upstream_object_type}:${ref.upstream_object_id ?? ""}`
      )
    )
  ).map((key) => {
    const [upstream_object_type, upstream_object_id] = key.split(":");

    return {
      source_repo: "Cognitive_OS" as const,
      upstream_object_type,
      ...(upstream_object_id ? { upstream_object_id } : {}),
    };
  });
  const founder_request_aggregate_posture =
    build_portfolio_founder_request_aggregate_summary(
      input.founder_request_exception_summaries ?? []
    );

  return {
    portfolio_secretary_projection_id:
      `${input.source_overview_shell_id}-portfolio-secretary-projection`,
    source_overview_shell_id: input.source_overview_shell_id,
    projection_scope: "portfolio_secretary_beta_shell",
    authority_boundary: "product_projection_only",
    phase_boundary: "beta_shell_navigation",
    source_mode: "multi_cell_foundation_overview_shell",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    secretary_behavior_available: true,
    portfolio_dispatch_behavior_available: false,
    direct_approve_control_available: false,
    direct_reject_control_available: false,
    direct_dispatch_control_available: false,
    direct_execute_control_available: false,
    provider_execution_available: false,
    channel_entry_available: false,
    workflow_engine_behavior_available: false,
    runtime_complete_orchestration_available: false,
    handoff_creation_available: true,
    selection: {
      selection_mode: "bounded_navigation_only",
      selected_cell_id: selected_summary?.cell_summary_card.cell_id,
      selected_cell_name: selected_summary?.cell_summary_card.cell_name,
      selected_summary_projection_id: selected_summary?.summary_projection_id,
    },
    view_separation: {
      secretary_view: "portfolio_level_beta_shell",
      cell_view: "existing_v0_4_cell_surfaces",
      secretary_view_distinct_from_cell_view: true,
    },
    navigation_units: input.cell_summary_units.map((summary, index) => ({
      cell_id: summary.cell_summary_card.cell_id,
      cell_name: summary.cell_summary_card.cell_name,
      summary_projection_id: summary.summary_projection_id,
      readiness_signal: summary.readiness_signal,
      source_mode: summary.source_mode,
      selected: index === 0,
    })),
    summary_projections: [...input.cell_summary_units],
    status_shelf: {
      shelf_scope: "bounded_status_shelf",
      total_cells: input.cell_summary_units.length,
      attention_required_cells,
      steady_cells,
      packet_state_counts,
      packet_state_summary:
        `Packet states remain product-level posture only across ${packet_state_counts.staged} staged, ${packet_state_counts.ready_for_cell_review} ready_for_cell_review, and ${packet_state_counts.returned_for_revision} returned_for_revision cells.`,
      direct_controls_available: false,
    },
    queue_shelf: {
      shelf_scope: "bounded_queue_shelf",
      queue_visibility: "bounded_queue_posture_only",
      queued_attention_cells: attention_required_cells,
      staged_packet_cells: packet_state_counts.staged,
      ready_for_cell_review_cells: packet_state_counts.ready_for_cell_review,
      returned_for_revision_cells: packet_state_counts.returned_for_revision,
      packet_queue_summary:
        `Queue visibility stays non-executing across ${packet_state_counts.ready_for_cell_review} review-ready packets and ${packet_state_counts.returned_for_revision} revision-return packets.`,
      direct_controls_available: false,
      shelf_note:
        "Queue shelf is derived from bounded readiness and revision posture only and remains non-executing.",
    },
    review_shelf: {
      shelf_scope: "bounded_review_shelf",
      review_visibility: "bounded_review_posture_only",
      approval_request_visibility:
        input.management_object_family_status.approval_request,
      delivery_return_visibility:
        input.management_object_family_status.delivery_return,
      ready_for_cell_review_cells: packet_state_counts.ready_for_cell_review,
      returned_for_revision_cells: packet_state_counts.returned_for_revision,
      review_packet_summary:
        `Review visibility stays packet-first and non-executing across ${packet_state_counts.ready_for_cell_review} ready_for_cell_review packets and ${packet_state_counts.returned_for_revision} returned_for_revision packets.`,
      direct_controls_available: false,
      shelf_note:
        "Review shelf reflects bounded visibility, review-packet posture, staging posture, and revision-return posture only.",
    },
    posture_shelf: {
      shelf_scope: "bounded_posture_shelf",
      management_directive_visibility:
        input.management_object_family_status.management_directive,
      delivery_return_visibility:
        input.management_object_family_status.delivery_return,
      approval_request_visibility:
        input.management_object_family_status.approval_request,
      secretary_posture:
        "handoff_first_review_packet_first_revision_loop_non_executing",
      direct_controls_available: false,
      founder_request_aggregate_posture,
    },
    rationale_evidence: assemblePortfolioSecretaryRationaleEvidence({
      total_cells: input.cell_summary_units.length,
      attention_required_cells,
      ready_for_cell_review_cells:
        packet_state_counts.ready_for_cell_review,
      returned_for_revision_cells:
        packet_state_counts.returned_for_revision,
      selected_cell_name: selected_summary?.cell_summary_card.cell_name,
      selected_packet_state,
      truth_sources: unique_items([
        "multi_cell_foundation_projection",
        ...input.cell_summary_units.flatMap((summary) => summary.truth_sources),
      ]),
      upstream_refs: aggregated_upstream_refs,
    }),
    truth_sources: unique_items([
      "multi_cell_foundation_projection",
      ...input.cell_summary_units.flatMap((summary) => summary.truth_sources),
    ]),
    deferred_items: unique_items([
      ...input.deferred_items,
      "handoff_execution",
      "direct_control_semantics",
      "provider_execution",
      "channel_entry",
    ]),
    non_claims: unique_items([
      ...input.non_claims,
      ...PORTFOLIO_SECRETARY_NON_CLAIMS,
    ]),
    projection_notes: [
      "Portfolio Secretary shell projection wraps the existing v0.4 multi-cell foundation rather than replacing it.",
      "Secretary beta remains handoff-first, posture-first, review-packet-first, and non-executing in this wave.",
      "Wave 2 adds bounded handoff staging visibility only; direct control and handoff execution remain deferred.",
      "Wave 3 adds bounded handoff review-packet visibility only and keeps packet states product-projected and non-executing.",
      "Wave 4 hardens revision/return loop consistency so portfolio shelves, staging, and review packet surfaces reuse the same non-executing packet-state semantics.",
      "Wave 5 adds rationale and evidence visibility hardening only and keeps explanation downstream, omission-aware, and non-executing.",
      ...(founder_request_aggregate_posture
        ? [
            `Aggregate founder-request posture remains ${founder_request_aggregate_posture.aggregate_posture} in bounded portfolio posture space only.`,
          ]
        : []),
      ...input.projection_notes,
    ],
  };
}
