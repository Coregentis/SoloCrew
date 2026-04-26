import assert from "node:assert/strict";
import test from "node:test";

import {
  composeMultiCellFoundationOverviewShellFromRuntimeInputs,
} from "../../app/shell/multi-cell-foundation-overview.ts";
import {
  assemblePortfolioSecretaryShellProjection,
  summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate,
  summarizeStagingFounderRequestExceptionForPortfolioAggregate,
} from "../../projection/assembly/portfolio-secretary-shell.ts";
import {
  SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS,
} from "../../projection/contracts/structural-boundary.ts";
import {
  createWorkforceCellProjectionInputs,
} from "../../projection/fixtures/workforce-envelope-fixtures.ts";

function create_review_packet_exception_enrichment(overrides = {}) {
  return {
    enrichment_scope: "founder_request_exception_packet_summary" as const,
    request_ref: "founder-request-review-01",
    request_label: "Founder review packet summary",
    derived_exception_posture: "review_needed" as const,
    review_return_posture: "review_needed" as const,
    review_return_summary: "Review visibility remains bounded.",
    marker_status: "available" as const,
    evidence_summary: {
      evidence_summary_label: "Evidence summary remains bounded.",
      evidence_status: "available" as const,
    },
    status_markers: ["available" as const],
    family_status_summaries: [
      {
        family: "continuity_projection_summary" as const,
        availability: "available" as const,
        summary_label: "continuity available",
      },
    ],
    ...overrides,
  };
}

function create_staging_exception_preview(overrides = {}) {
  return {
    preview_scope: "founder_request_exception_staging_preview" as const,
    request_ref: "founder-request-staging-01",
    request_label: "Founder staging preview summary",
    derived_exception_posture: "monitor" as const,
    review_return_posture: "monitor" as const,
    review_return_summary: "Preview remains bounded.",
    marker_status: "available" as const,
    evidence_posture_summary: {
      evidence_summary_label: "Compact evidence summary remains bounded.",
      evidence_status: "available" as const,
    },
    status_markers: ["available" as const],
    family_status_summaries: [
      {
        family: "continuity_projection_summary" as const,
        availability: "available" as const,
        summary_label: "continuity available",
      },
    ],
    ...overrides,
  };
}

test("[projection] portfolio secretary shell stays top-level product projection and non-executing", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
  });

  assert.equal(
    projection.projection_scope,
    "portfolio_secretary_beta_shell"
  );
  assert.equal(projection.authority_boundary, "product_projection_only");
  assert.equal(projection.phase_boundary, "beta_shell_navigation");
  assert.equal(projection.source_mode, "multi_cell_foundation_overview_shell");
  assert.equal(projection.secretary_behavior_available, true);
  assert.equal(projection.portfolio_dispatch_behavior_available, false);
  assert.equal(projection.direct_approve_control_available, false);
  assert.equal(projection.direct_reject_control_available, false);
  assert.equal(projection.direct_dispatch_control_available, false);
  assert.equal(projection.direct_execute_control_available, false);
  assert.equal(projection.provider_execution_available, false);
  assert.equal(projection.channel_entry_available, false);
  assert.equal(projection.workflow_engine_behavior_available, false);
  assert.equal(projection.handoff_creation_available, true);
  assert.equal(
    projection.selection.selection_mode,
    "bounded_navigation_only"
  );
  assert.equal(projection.view_separation.secretary_view_distinct_from_cell_view, true);
  assert.equal(projection.navigation_units.length, 2);
  assert.equal(projection.navigation_units[0]?.selected, true);
  assert.equal(projection.navigation_units[1]?.selected, false);
  assert.equal(projection.status_shelf.total_cells, 2);
  assert.equal(projection.status_shelf.attention_required_cells, 2);
  assert.equal(projection.status_shelf.steady_cells, 0);
  assert.equal(projection.status_shelf.packet_state_counts.draft, 0);
  assert.equal(projection.status_shelf.packet_state_counts.staged, 0);
  assert.equal(
    projection.status_shelf.packet_state_counts.ready_for_cell_review,
    1
  );
  assert.equal(
    projection.status_shelf.packet_state_counts.returned_for_revision,
    1
  );
  assert.match(
    projection.status_shelf.packet_state_summary,
    /returned_for_revision cells/
  );
  assert.equal(
    projection.queue_shelf.queue_visibility,
    "bounded_queue_posture_only"
  );
  assert.equal(projection.queue_shelf.queued_attention_cells, 2);
  assert.equal(projection.queue_shelf.staged_packet_cells, 0);
  assert.equal(projection.queue_shelf.ready_for_cell_review_cells, 1);
  assert.equal(projection.queue_shelf.returned_for_revision_cells, 1);
  assert.match(
    projection.queue_shelf.packet_queue_summary,
    /review-ready packets and 1 revision-return packets/
  );
  assert.equal(projection.review_shelf.direct_controls_available, false);
  assert.equal(
    projection.review_shelf.approval_request_visibility,
    "runtime_record_present_non_executable"
  );
  assert.equal(projection.review_shelf.ready_for_cell_review_cells, 1);
  assert.equal(projection.review_shelf.returned_for_revision_cells, 1);
  assert.match(
    projection.review_shelf.review_packet_summary,
    /ready_for_cell_review packets and 1 returned_for_revision packets/
  );
  assert.equal(
    projection.posture_shelf.secretary_posture,
    "handoff_first_review_packet_first_revision_loop_non_executing"
  );
  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture,
    undefined
  );
  assert.equal(
    projection.rationale_evidence.rationale_scope,
    "portfolio_secretary_lane_rationale"
  );
  assert.equal(projection.rationale_evidence.control_mode, "non_executing");
  assert.equal(
    projection.rationale_evidence.runtime_authority_claimed,
    false
  );
  assert.equal(
    projection.rationale_evidence.protocol_authority_claimed,
    false
  );
  assert.match(
    projection.rationale_evidence.evidence_summary,
    /Evidence remains bounded to 2 visible cell summary projections/
  );
  assert.ok(
    projection.rationale_evidence.omission_notes.includes(
      "Packet states remain SoloCrew product posture only and are not upstream workflow-truth objects."
    )
  );
  assert.equal(
    projection.summary_projections[0]?.source_mode,
    "upstream_projection_safe_envelope"
  );
  assert.ok(
    projection.truth_sources.includes("multi_cell_foundation_projection")
  );
  assert.ok(
    projection.non_claims.includes("no_direct_dispatch_control")
  );
  assert.ok(
    projection.deferred_items.includes("handoff_execution")
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 2 adds bounded handoff staging visibility only; direct control and handoff execution remain deferred."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 3 adds bounded handoff review-packet visibility only and keeps packet states product-projected and non-executing."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 4 hardens revision/return loop consistency so portfolio shelves, staging, and review packet surfaces reuse the same non-executing packet-state semantics."
    )
  );
  assert.ok(
    projection.projection_notes.includes(
      "Wave 5 adds rationale and evidence visibility hardening only and keeps explanation downstream, omission-aware, and non-executing."
    )
  );

  const boundary_targets = [
    projection,
    projection.selection,
    projection.view_separation,
    projection.status_shelf,
    projection.queue_shelf,
    projection.review_shelf,
    projection.posture_shelf,
    projection.rationale_evidence,
    ...projection.summary_projections,
  ];

  for (const target of boundary_targets) {
    for (const field_name of SOLOCREW_NO_UPWARD_LAW_LEAKAGE_FIELDS) {
      assert.equal(field_name in target, false);
    }
  }
});

test("[projection] portfolio aggregate posture derives review-needed from bounded review packet summary", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
    founder_request_exception_summaries: [
      summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate(
        create_review_packet_exception_enrichment()
      ),
    ],
  });

  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_posture,
    "portfolio_review_needed"
  );
  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.non_executing,
    true
  );
  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.summary_only,
    true
  );
  assert.match(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_summary ?? "",
    /portfolio_review_needed/
  );
});

test("[projection] portfolio aggregate posture derives evidence-insufficient from bounded summary markers", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
    founder_request_exception_summaries: [
      summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate(
        create_review_packet_exception_enrichment({
          derived_exception_posture: "monitor",
          review_return_posture: "monitor",
          marker_status: "insufficient_evidence",
          evidence_summary: {
            evidence_summary_label: "Evidence stays thin.",
            evidence_status: "insufficient_evidence",
          },
          status_markers: ["insufficient_evidence"],
        })
      ),
    ],
  });

  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_posture,
    "portfolio_evidence_insufficient"
  );
  assert.ok(
    projection.posture_shelf.founder_request_aggregate_posture?.status_markers.includes(
      "insufficient_evidence"
    )
  );
});

test("[projection] portfolio aggregate posture derives stale-context from bounded preview markers", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
    founder_request_exception_summaries: [
      summarizeStagingFounderRequestExceptionForPortfolioAggregate(
        create_staging_exception_preview({
          derived_exception_posture: "stale_context",
          review_return_posture: "monitor",
          marker_status: "stale",
          evidence_posture_summary: {
            evidence_summary_label: "Compact evidence is stale.",
            evidence_status: "stale",
          },
          status_markers: ["stale"],
        })
      ),
    ],
  });

  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_posture,
    "portfolio_stale_context"
  );
  assert.ok(
    projection.posture_shelf.founder_request_aggregate_posture?.status_markers.includes(
      "stale"
    )
  );
});

test("[projection] portfolio aggregate posture derives contract-blocked when blocked posture dominates", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
    founder_request_exception_summaries: [
      summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate(
        create_review_packet_exception_enrichment({
          derived_exception_posture: "blocked_by_contract",
          review_return_posture: "review_needed",
          marker_status: "omitted_by_contract",
          evidence_summary: {
            evidence_summary_label: "Evidence remains omitted by contract.",
            evidence_status: "omitted_by_contract",
          },
          status_markers: ["omitted_by_contract"],
        })
      ),
    ],
  });

  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_posture,
    "portfolio_contract_blocked"
  );
});

test("[projection] portfolio aggregate posture uses deterministic mixed priority ordering", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
    founder_request_exception_summaries: [
      summarizeStagingFounderRequestExceptionForPortfolioAggregate(
        create_staging_exception_preview({
          derived_exception_posture: "review_needed",
          review_return_posture: "review_needed",
        })
      ),
      summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate(
        create_review_packet_exception_enrichment({
          derived_exception_posture: "stale_context",
          review_return_posture: "return_for_revision",
          marker_status: "stale",
          evidence_summary: {
            evidence_summary_label: "Evidence is stale.",
            evidence_status: "stale",
          },
          status_markers: ["stale"],
        })
      ),
      summarizeReviewPacketFounderRequestExceptionForPortfolioAggregate(
        create_review_packet_exception_enrichment({
          request_ref: "founder-request-review-02",
          request_label: "Founder escalation summary",
          derived_exception_posture: "escalation_required",
          review_return_posture: "review_needed",
        })
      ),
    ],
  });

  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_posture,
    "portfolio_escalation_required"
  );
});

test("[projection] portfolio aggregate posture becomes clear only when no stronger posture exists", () => {
  const overview_shell = composeMultiCellFoundationOverviewShellFromRuntimeInputs(
    createWorkforceCellProjectionInputs()
  );
  const projection = assemblePortfolioSecretaryShellProjection({
    source_overview_shell_id: overview_shell.overview_shell_id,
    cell_summary_units: overview_shell.cell_summary_units,
    management_object_family_status:
      overview_shell.management_object_family_status,
    deferred_items: overview_shell.deferred_items,
    non_claims: overview_shell.truth_boundary.non_claims,
    projection_notes: overview_shell.projection_notes,
    founder_request_exception_summaries: [
      summarizeStagingFounderRequestExceptionForPortfolioAggregate(
        create_staging_exception_preview({
          derived_exception_posture: "no_exception",
          review_return_posture: "no_exception",
          marker_status: "available",
          evidence_posture_summary: {
            evidence_summary_label: "Compact evidence remains available.",
            evidence_status: "available",
          },
          status_markers: ["available"],
        })
      ),
    ],
  });

  assert.equal(
    projection.posture_shelf.founder_request_aggregate_posture
      ?.aggregate_posture,
    "portfolio_clear"
  );
  assert.doesNotMatch(
    JSON.stringify(
      projection.posture_shelf.founder_request_aggregate_posture
    ),
    /approve|reject|dispatch|execute|provider|channel|policy_mutated|protocol_certified/
  );
});
