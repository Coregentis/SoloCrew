import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellDeliveryAcceptanceScaffold,
} from "./single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorInSessionDraftStateScaffold,
} from "./single-cell-operator-in-session-draft-state-contract.ts";
import type {
  SingleCellOperatorReadinessBlocker,
  SingleCellOperatorReadinessFacetSummary,
  SingleCellOperatorReadinessLevel,
  SingleCellOperatorReadinessSummaryScaffold,
} from "./single-cell-operator-readiness-summary-contract.ts";
import type {
  SingleCellOperatorRequestPackageScaffold,
} from "./single-cell-operator-request-package-contract.ts";
import type {
  SingleCellOperatorRequestReviewSubmitPreviewScaffold,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";
import type {
  SingleCellOperatorSessionDraftControlsScaffold,
} from "./single-cell-operator-session-draft-controls-contract.ts";
import type {
  SingleCellTaskFocusInteraction,
} from "./single-cell-task-focus-interaction-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function build_current_focus_readiness(
  task_focus_interaction: SingleCellTaskFocusInteraction
): SingleCellOperatorReadinessFacetSummary {
  return {
    facet_id: "current_focus_readiness",
    display_label: "Current focus readiness",
    readiness_level:
      task_focus_interaction.current_objective_focus.objective_id &&
      task_focus_interaction.current_work_item_focus.work_item_id
        ? "ready_now"
        : "blocked_by_deferred_surfaces",
    source_surface: "task_focus",
    notes: [
      `Current objective focus is ${task_focus_interaction.current_objective_focus.objective_label}.`,
      `Current work-item focus is ${task_focus_interaction.current_work_item_focus.work_item_label}.`,
    ],
  };
}

function build_request_package_readiness(
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold,
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold
): SingleCellOperatorReadinessFacetSummary {
  const has_selected_action_intent = Boolean(
    request_package_scaffold.current_request_package.selected_action_intent
  );

  return {
    facet_id: "request_package_readiness",
    display_label: "Request-package readiness",
    readiness_level:
      has_selected_action_intent &&
      request_review_submit_preview_scaffold.review_preview_state
        .previewability_status === "preview_ready_now"
        ? request_review_submit_preview_scaffold.review_preview_state
            .incomplete_request
          ? "ready_with_known_gaps"
          : "ready_now"
        : "blocked_by_deferred_surfaces",
    source_surface: "request_package",
    notes: [
      `Current packaged fields: ${request_package_scaffold.current_request_package.package_fields_present.join(", ")}.`,
      has_selected_action_intent
        ? "A selected action intent is already packaged."
        : "Selected action intent is not yet packaged.",
    ],
  };
}

function build_review_preview_readiness(
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold
): SingleCellOperatorReadinessFacetSummary {
  const { review_preview_state } = request_review_submit_preview_scaffold;

  return {
    facet_id: "review_preview_readiness",
    display_label: "Review/preview readiness",
    readiness_level:
      review_preview_state.previewability_status === "preview_ready_now"
        ? review_preview_state.incomplete_request
          ? "ready_with_known_gaps"
          : "ready_now"
        : "blocked_by_deferred_surfaces",
    source_surface: "request_review_submit_preview",
    notes: [
      `Reviewability status is ${review_preview_state.reviewability_status}.`,
      `Previewability status is ${review_preview_state.previewability_status}.`,
    ],
  };
}

function build_delivery_acceptance_readiness(
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold
): SingleCellOperatorReadinessFacetSummary {
  return {
    facet_id: "delivery_acceptance_readiness",
    display_label: "Delivery-acceptance readiness",
    readiness_level:
      delivery_acceptance_scaffold.current_delivery_contract_summary
        .acceptance_status === "criteria_visible_ready_for_bounded_review"
        ? "ready_now"
        : "ready_with_known_gaps",
    source_surface: "delivery_acceptance",
    notes: [
      `Delivery acceptance status is ${delivery_acceptance_scaffold.current_delivery_contract_summary.acceptance_status}.`,
      `Completed acceptance signals visible: ${String(delivery_acceptance_scaffold.completed_acceptance_signals.length)}.`,
    ],
  };
}

function build_in_session_draft_readiness(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): SingleCellOperatorReadinessFacetSummary {
  return {
    facet_id: "in_session_draft_readiness",
    display_label: "In-session draft readiness",
    readiness_level:
      in_session_draft_state_scaffold.draft_completeness_state
        .draft_completeness_status === "session_drafts_have_operator_input"
        ? "ready_now"
        : "waiting_for_operator_input",
    source_surface: "in_session_draft_state",
    notes: [
      `Draft completeness status is ${in_session_draft_state_scaffold.draft_completeness_state.draft_completeness_status}.`,
      `Draft emptiness state is ${in_session_draft_state_scaffold.draft_completeness_state.draft_emptiness_state}.`,
    ],
  };
}

function build_readiness_blockers(input: {
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
  session_draft_controls_scaffold:
    SingleCellOperatorSessionDraftControlsScaffold;
}): SingleCellOperatorReadinessBlocker[] {
  const {
    request_review_submit_preview_scaffold,
    session_draft_controls_scaffold,
  } = input;

  const blockers: SingleCellOperatorReadinessBlocker[] = [
    ...request_review_submit_preview_scaffold.missing_or_deferred_fields.map(
      (field) => ({
        blocker_id: field.field_id,
        display_label: field.display_label,
        blocker_kind: field.field_status === "missing_now"
          ? "missing_input"
          : "deferred_surface",
        source_surface: "request_review_submit_preview" as const,
        notes: [...field.notes, field.reason],
      })
    ),
    ...request_review_submit_preview_scaffold.unavailable_submit_surfaces.map(
      (surface) => ({
        blocker_id: surface.surface_id,
        display_label: surface.display_label,
        blocker_kind: "unavailable_surface" as const,
        source_surface: "request_review_submit_preview" as const,
        notes: [surface.reason],
      })
    ),
    ...session_draft_controls_scaffold.unavailable_control_surfaces.map(
      (surface) => ({
        blocker_id: surface.surface_id,
        display_label: surface.display_label,
        blocker_kind: "unavailable_surface" as const,
        source_surface: "session_draft_controls" as const,
        notes: [surface.reason],
      })
    ),
  ];

  const deduped = new Map<string, SingleCellOperatorReadinessBlocker>();

  for (const blocker of blockers) {
    if (!deduped.has(blocker.blocker_id)) {
      deduped.set(blocker.blocker_id, blocker);
    }
  }

  return [...deduped.values()];
}

function compute_overall_readiness_level(
  facets: readonly SingleCellOperatorReadinessFacetSummary[]
): SingleCellOperatorReadinessLevel {
  if (facets.some((facet) => facet.readiness_level === "blocked_by_deferred_surfaces")) {
    return "blocked_by_deferred_surfaces";
  }

  if (facets.some((facet) => facet.readiness_level !== "ready_now")) {
    return "ready_with_known_gaps";
  }

  return "ready_now";
}

export interface AssembleSingleCellOperatorReadinessSummaryScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  task_focus_interaction: SingleCellTaskFocusInteraction;
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold;
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold;
  session_draft_controls_scaffold:
    SingleCellOperatorSessionDraftControlsScaffold;
}

export function assembleSingleCellOperatorReadinessSummaryScaffold(
  input: AssembleSingleCellOperatorReadinessSummaryScaffoldInput
): SingleCellOperatorReadinessSummaryScaffold {
  const {
    baseline_shell_session,
    task_focus_interaction,
    request_package_scaffold,
    request_review_submit_preview_scaffold,
    delivery_acceptance_scaffold,
    in_session_draft_state_scaffold,
    session_draft_controls_scaffold,
  } = input;

  const current_focus_readiness =
    build_current_focus_readiness(task_focus_interaction);
  const request_package_readiness = build_request_package_readiness(
    request_package_scaffold,
    request_review_submit_preview_scaffold
  );
  const review_preview_readiness = build_review_preview_readiness(
    request_review_submit_preview_scaffold
  );
  const delivery_acceptance_readiness =
    build_delivery_acceptance_readiness(delivery_acceptance_scaffold);
  const in_session_draft_readiness = build_in_session_draft_readiness(
    in_session_draft_state_scaffold
  );
  const facets = [
    current_focus_readiness,
    request_package_readiness,
    review_preview_readiness,
    delivery_acceptance_readiness,
    in_session_draft_readiness,
  ] as const;
  const deferred_or_unavailable_readiness_blockers =
    build_readiness_blockers({
      request_review_submit_preview_scaffold,
      session_draft_controls_scaffold,
    });
  const ready_facet_count = facets.filter(
    (facet) => facet.readiness_level === "ready_now"
  ).length;

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-readiness-summary`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_readiness_summary_scaffold",
    execution_boundary: "summary_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    overall_readiness_level: compute_overall_readiness_level(facets),
    ready_facet_count,
    incomplete_or_blocked_facet_count: facets.length - ready_facet_count,
    current_focus_readiness,
    request_package_readiness,
    review_preview_readiness,
    delivery_acceptance_readiness,
    in_session_draft_readiness,
    deferred_or_unavailable_readiness_blockers,
    deferred_items: unique_items([
      ...request_review_submit_preview_scaffold.deferred_items,
      ...session_draft_controls_scaffold.deferred_items,
    ]),
    non_claims: unique_items([
      "no_actual_readiness_execution",
      ...request_review_submit_preview_scaffold.non_claims,
      ...session_draft_controls_scaffold.non_claims,
      "no_runtime_complete_readiness_summary",
    ]),
    projection_notes: [
      "Readiness summary scaffold derives one bounded operator-facing readiness view from existing focus, request, preview, delivery-acceptance, in-session draft, and draft-control truth.",
      "Readiness summary remains product-facing only and does not imply actual submission, execution, provider routing, channel routing, secretary behavior, or runtime-complete workflow state.",
    ],
  };
}
