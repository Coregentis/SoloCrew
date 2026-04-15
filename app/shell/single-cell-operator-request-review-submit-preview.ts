import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellOperatorRequestPackage,
  SingleCellOperatorRequestPackageField,
  SingleCellOperatorRequestPackageScaffold,
} from "./single-cell-operator-request-package-contract.ts";
import type {
  SingleCellOperatorRequestCompletenessSignal,
  SingleCellOperatorRequestMissingOrDeferredField,
  SingleCellOperatorRequestReviewSubmitPreviewScaffold,
  SingleCellOperatorRequestSubmitPreviewStatus,
  SingleCellOperatorRequestUnavailableSubmitSurface,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";

const REQUIRED_REQUEST_PACKAGE_FIELDS = [
  "current_focus",
  "selected_action_intent",
  "correction_review_target",
  "input_drafts",
  "delivery_acceptance_context",
] as const satisfies readonly SingleCellOperatorRequestPackageField[];

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function count_populated_drafts(
  request_package: SingleCellOperatorRequestPackage
): number {
  return request_package.input_drafts.filter((draft) => draft.has_text)
    .length;
}

function has_core_review_fields(
  request_package: SingleCellOperatorRequestPackage
): boolean {
  return REQUIRED_REQUEST_PACKAGE_FIELDS.every((field_name) =>
    request_package.package_fields_present.includes(field_name)
  );
}

function build_current_request_package_summary(
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold
): SingleCellOperatorRequestReviewSubmitPreviewScaffold["current_request_package_summary"] {
  const request_package = request_package_scaffold.current_request_package;

  return {
    request_package_id: request_package.request_package_id,
    packaged_fields_present: [...request_package.package_fields_present],
    objective_focus_label: request_package.current_focus.objective_focus_label,
    work_item_focus_label: request_package.current_focus.work_item_focus_label,
    selected_action_intent_kind:
      request_package.selected_action_intent?.intent_kind,
    selected_action_intent_confirmed:
      request_package.selected_action_intent?.selection_confirmed ?? false,
    correction_target_scope:
      request_package.correction_review_target.target_scope,
    review_intent: request_package.correction_review_target.review_intent,
    acceptance_status:
      request_package.delivery_acceptance_context.acceptance_status,
    packaged_draft_count: request_package.input_drafts.length,
    populated_draft_count: count_populated_drafts(request_package),
  };
}

function build_unavailable_submit_surfaces(
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold
): SingleCellOperatorRequestUnavailableSubmitSurface[] {
  return request_package_scaffold.unavailable_request_surfaces.map(
    (surface) => ({
      surface_id: surface.surface_id,
      display_label: surface.display_label,
      reason: surface.reason,
    })
  );
}

function build_completeness_signals(
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold
): SingleCellOperatorRequestCompletenessSignal[] {
  const request_package = request_package_scaffold.current_request_package;
  const populated_draft_count = count_populated_drafts(request_package);

  return [
    {
      signal_id: "request_package_summary_visible",
      display_label: "Request package summary visible",
      signal_status: "satisfied_now",
      source_surface: "request_package",
      notes: [
        "A bounded request package summary is available for operator review.",
      ],
    },
    {
      signal_id: "current_focus_packaged",
      display_label: "Current focus packaged",
      signal_status: "satisfied_now",
      source_surface: "request_package",
      notes: [
        "Objective and work-item focus are both visible in the current request package.",
      ],
    },
    {
      signal_id: "selected_action_intent_packaged",
      display_label: "Selected action intent packaged",
      signal_status: request_package.selected_action_intent
        ? "satisfied_now"
        : "missing_now",
      source_surface: "action_intents",
      notes: request_package.selected_action_intent
        ? [
            "A bounded action intent is packaged for review and preview.",
          ]
        : [
            "No selected action intent is currently packaged.",
          ],
    },
    {
      signal_id: "selected_action_intent_confirmation",
      display_label: "Selected action intent confirmed",
      signal_status: request_package.selected_action_intent
        ?.selection_confirmed
        ? "satisfied_now"
        : "missing_now",
      source_surface: "action_intents",
      notes: request_package.selected_action_intent
        ?.selection_confirmed
        ? [
            "The packaged action intent is already operator-confirmed.",
          ]
        : [
            "The packaged action intent remains a derived default and still needs explicit operator confirmation.",
          ],
    },
    {
      signal_id: "correction_review_target_present",
      display_label: "Correction/review target present",
      signal_status: "satisfied_now",
      source_surface: "request_package",
      notes: [
        "A bounded correction/review target is visible in the current request package.",
      ],
    },
    {
      signal_id: "delivery_acceptance_context_present",
      display_label: "Delivery acceptance context present",
      signal_status: "satisfied_now",
      source_surface: "delivery_acceptance",
      notes: [
        "The current request package includes bounded delivery-acceptance context.",
      ],
    },
    {
      signal_id: "input_draft_slots_visible",
      display_label: "Input draft slots visible",
      signal_status: request_package.input_drafts.length > 0
        ? "satisfied_now"
        : "missing_now",
      source_surface: "input_drafts",
      notes: request_package.input_drafts.length > 0
        ? [
            "Bounded draft slots are visible for request review and future preview.",
          ]
        : [
            "No input draft slots are currently visible in the request package.",
          ],
    },
    {
      signal_id: "operator_input_payload_present",
      display_label: "Operator-authored input payload present",
      signal_status: populated_draft_count > 0
        ? "satisfied_now"
        : "missing_now",
      source_surface: "input_drafts",
      notes: populated_draft_count > 0
        ? [
            "At least one packaged input draft already carries operator-authored content.",
          ]
        : [
            "Current packaged drafts are empty placeholders and do not yet carry operator-authored payload.",
          ],
    },
    {
      signal_id: "submit_surfaces_available",
      display_label: "Submit surfaces available",
      signal_status: "deferred",
      source_surface: "truth_boundary",
      notes: [
        "The current wave does not expose an actual submit path for request packages.",
      ],
    },
  ];
}

function build_missing_or_deferred_fields(
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold
): SingleCellOperatorRequestMissingOrDeferredField[] {
  const request_package = request_package_scaffold.current_request_package;
  const missing_or_deferred_fields:
    SingleCellOperatorRequestMissingOrDeferredField[] = [];

  if (!request_package.selected_action_intent) {
    missing_or_deferred_fields.push({
      field_id: "selected_action_intent",
      display_label: "Selected action intent",
      field_status: "missing_now",
      reason:
        "The current request package does not yet include a selected action intent.",
      notes: [
        "A bounded request preview needs one selected action intent to stay coherent.",
      ],
    });
  }

  if (
    request_package.selected_action_intent &&
    !request_package.selected_action_intent.selection_confirmed
  ) {
    missing_or_deferred_fields.push({
      field_id: "selected_action_intent_confirmation",
      display_label: "Operator confirmation of selected action intent",
      field_status: "missing_now",
      reason:
        "The packaged action intent is still an unconfirmed derived default.",
      notes: [
        "Future submit would depend on explicit operator confirmation instead of a derived default only.",
      ],
    });
  }

  if (count_populated_drafts(request_package) === 0) {
    missing_or_deferred_fields.push({
      field_id: "operator_input_payload",
      display_label: "Operator-authored input payload",
      field_status: "missing_now",
      reason:
        "No packaged input draft currently contains operator-authored content.",
      notes: [
        "Future submit would depend on at least one operator-authored payload instead of placeholders alone.",
      ],
    });
  }

  return [
    ...missing_or_deferred_fields,
    ...request_package_scaffold.unavailable_request_surfaces.map(
      (surface) => ({
        field_id: surface.surface_id,
        display_label: surface.display_label,
        field_status: "deferred" as const,
        reason: surface.reason,
        notes: [
          "Future submit-preview depends on this deferred surface becoming available in a later bounded wave.",
        ],
      })
    ),
  ];
}

function build_submit_preview_status(
  request_package: SingleCellOperatorRequestPackage
): SingleCellOperatorRequestSubmitPreviewStatus {
  return has_core_review_fields(request_package)
    ? "preview_ready_submit_unavailable"
    : "preview_blocked_missing_core_fields";
}

export interface AssembleSingleCellOperatorRequestReviewSubmitPreviewScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold;
}

export function assembleSingleCellOperatorRequestReviewSubmitPreviewScaffold(
  input: AssembleSingleCellOperatorRequestReviewSubmitPreviewScaffoldInput
): SingleCellOperatorRequestReviewSubmitPreviewScaffold {
  const { baseline_shell_session, request_package_scaffold } = input;
  const request_package = request_package_scaffold.current_request_package;
  const has_core_fields = has_core_review_fields(request_package);
  const current_request_package_summary =
    build_current_request_package_summary(request_package_scaffold);
  const unavailable_submit_surfaces =
    build_unavailable_submit_surfaces(request_package_scaffold);
  const completeness_signals =
    build_completeness_signals(request_package_scaffold);
  const missing_or_deferred_fields =
    build_missing_or_deferred_fields(request_package_scaffold);
  const incomplete_request = missing_or_deferred_fields.length > 0;

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-request-review-submit-preview`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_request_review_submit_preview_scaffold",
    execution_boundary: "submit_preview_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_request_package_summary,
    review_preview_state: {
      reviewability_status: has_core_fields
        ? "review_ready_now"
        : "review_blocked_missing_core_fields",
      previewability_status: has_core_fields
        ? "preview_ready_now"
        : "preview_blocked_missing_core_fields",
      incomplete_request,
      notes: has_core_fields
        ? [
            "Current request package is reviewable and previewable from bounded product truth.",
            ...(incomplete_request
              ? [
                  "Current request remains incomplete because confirmation, payload, or submit surfaces are still missing or deferred.",
                ]
              : [
                  "No missing or deferred request fields are currently visible.",
                ]),
          ]
        : [
            "Current request package is missing one or more core packaged fields needed for bounded review/preview.",
          ],
    },
    completeness_signals,
    missing_or_deferred_fields,
    future_submit_dependencies: unique_items(
      missing_or_deferred_fields.map((field) => field.display_label)
    ),
    submit_preview_status: build_submit_preview_status(request_package),
    unavailable_submit_surfaces,
    deferred_items: [...request_package_scaffold.deferred_items],
    non_claims: unique_items([
      "no_actual_request_submission",
      ...request_package_scaffold.non_claims,
      "no_runtime_complete_request_submit_workflow",
    ]),
    projection_notes: [
      "Request review / submit-preview scaffold derives bounded reviewability, previewability, and incompleteness truth from the existing request-package scaffold.",
      "Submit-preview remains operator-facing only and does not introduce actual submission, provider execution, channel routing, secretary behavior, or runtime-complete workflow handling.",
      `Current request-package fields visible for review: ${request_package.package_fields_present.join(", ")}.`,
    ],
  };
}
