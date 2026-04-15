import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellOperatorInSessionDraftStateScaffold,
} from "./single-cell-operator-in-session-draft-state-contract.ts";
import type {
  SingleCellOperatorRequestReviewSubmitPreviewScaffold,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";
import type {
  SingleCellOperatorSessionDraftControlHint,
  SingleCellOperatorSessionDraftControlUnavailableSurface,
  SingleCellOperatorSessionDraftControlsScaffold,
} from "./single-cell-operator-session-draft-controls-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function has_any_draft_value_present(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): boolean {
  return (
    in_session_draft_state_scaffold.draft_completeness_state
      .present_draft_value_count > 0
  );
}

function has_operator_authored_draft_present(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): boolean {
  const { current_session_draft_values } = in_session_draft_state_scaffold;

  return [
    current_session_draft_values.objective_note_draft_value,
    current_session_draft_values.work_item_note_draft_value,
    current_session_draft_values.correction_text_draft_value,
    current_session_draft_values.review_request_draft_value,
    current_session_draft_values.selected_action_intent_draft_value,
  ].some((draft_value) => draft_value.is_operator_authored);
}

function build_keep_draft_hint(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): SingleCellOperatorSessionDraftControlHint {
  return has_any_draft_value_present(in_session_draft_state_scaffold)
    ? {
        control_id: "keep_draft_hint",
        display_label: "Keep current session drafts",
        availability_status: "available_now",
        source_surface: "in_session_draft_state",
        notes: [
          "Current in-session draft values can be kept in the active session as bounded operator-facing state.",
          "This hint does not imply persistence across a fresh reload.",
        ],
      }
    : {
        control_id: "keep_draft_hint",
        display_label: "Keep current session drafts",
        availability_status: "not_needed_now",
        source_surface: "in_session_draft_state",
        notes: [
          "No in-session draft values are currently present, so there is nothing meaningful to keep right now.",
        ],
      };
}

function build_clear_draft_hint(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): SingleCellOperatorSessionDraftControlHint {
  return has_any_draft_value_present(in_session_draft_state_scaffold)
    ? {
        control_id: "clear_draft_hint",
        display_label: "Clear current session drafts",
        availability_status: "available_now",
        source_surface: "in_session_draft_state",
        notes: [
          "Current session draft values are present and could be cleared in a later bounded interaction wave.",
          "This hint does not execute a clear operation in the current wave.",
        ],
      }
    : {
        control_id: "clear_draft_hint",
        display_label: "Clear current session drafts",
        availability_status: "not_needed_now",
        source_surface: "in_session_draft_state",
        notes: [
          "Current session draft values are already empty, so clear is not needed now.",
        ],
      };
}

function build_promote_to_request_preview_hint(input: {
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
}): SingleCellOperatorSessionDraftControlHint {
  const {
    in_session_draft_state_scaffold,
    request_review_submit_preview_scaffold,
  } = input;

  return has_operator_authored_draft_present(in_session_draft_state_scaffold)
    ? {
        control_id: "promote_to_request_preview_hint",
        display_label: "Promote session drafts into preview-ready request seeds",
        availability_status: "available_as_seed_hint",
        source_surface: "request_review_submit_preview",
        notes: [
          "Operator-authored in-session draft values are present, so a later bounded wave could promote them into preview-ready request seeds.",
          `Current preview status remains ${request_review_submit_preview_scaffold.submit_preview_status} until such seed-promotion support exists.`,
          "This hint does not automatically rewrite the current request preview in this wave.",
        ],
      }
    : {
        control_id: "promote_to_request_preview_hint",
        display_label: "Promote session drafts into preview-ready request seeds",
        availability_status: "blocked_missing_operator_input",
        source_surface: "request_review_submit_preview",
        notes: [
          "No operator-authored in-session draft values are present yet, so preview-seed promotion remains blocked.",
          "Derived defaults alone do not count as operator-authored promotion input.",
        ],
      };
}

function build_draft_completeness_hint(input: {
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
}): SingleCellOperatorSessionDraftControlsScaffold["draft_completeness_hint"] {
  const {
    in_session_draft_state_scaffold,
    request_review_submit_preview_scaffold,
  } = input;
  const operator_authored_draft_present =
    has_operator_authored_draft_present(in_session_draft_state_scaffold);

  return {
    draft_emptiness_state:
      in_session_draft_state_scaffold.draft_completeness_state
        .draft_emptiness_state,
    draft_completeness_status:
      in_session_draft_state_scaffold.draft_completeness_state
        .draft_completeness_status,
    any_draft_value_present:
      has_any_draft_value_present(in_session_draft_state_scaffold),
    operator_authored_draft_present,
    request_reviewability_status:
      request_review_submit_preview_scaffold.review_preview_state
        .reviewability_status,
    request_previewability_status:
      request_review_submit_preview_scaffold.review_preview_state
        .previewability_status,
    future_submit_dependency_count:
      request_review_submit_preview_scaffold.future_submit_dependencies
        .length,
    future_submit_dependencies: [
      ...request_review_submit_preview_scaffold.future_submit_dependencies,
    ],
    notes: [
      "Draft completeness hint reuses current in-session draft-state truth and current request review / submit-preview truth.",
      operator_authored_draft_present
        ? "Operator-authored draft input is present in the current session."
        : "Operator-authored draft input is still absent in the current session.",
    ],
  };
}

function build_unavailable_control_surfaces(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): SingleCellOperatorSessionDraftControlUnavailableSurface[] {
  return [
    ...in_session_draft_state_scaffold.unavailable_draft_surfaces.map(
      (surface) => ({
        surface_id: surface.surface_id,
        display_label: surface.display_label,
        reason: surface.reason,
      })
    ),
    {
      surface_id: "one_click_request_preview_promotion",
      display_label: "One-click request preview promotion",
      reason:
        "Current session-draft controls do not automatically promote session-only draft values into rebuilt request-preview truth.",
    },
  ];
}

export interface AssembleSingleCellOperatorSessionDraftControlsScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
}

export function assembleSingleCellOperatorSessionDraftControlsScaffold(
  input: AssembleSingleCellOperatorSessionDraftControlsScaffoldInput
): SingleCellOperatorSessionDraftControlsScaffold {
  const {
    baseline_shell_session,
    in_session_draft_state_scaffold,
    request_review_submit_preview_scaffold,
  } = input;
  const unavailable_control_surfaces = build_unavailable_control_surfaces(
    in_session_draft_state_scaffold
  );

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-session-draft-controls`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_session_draft_controls_scaffold",
    execution_boundary: "control_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    keep_draft_hint: build_keep_draft_hint(in_session_draft_state_scaffold),
    clear_draft_hint: build_clear_draft_hint(
      in_session_draft_state_scaffold
    ),
    promote_to_request_preview_hint:
      build_promote_to_request_preview_hint({
        in_session_draft_state_scaffold,
        request_review_submit_preview_scaffold,
      }),
    draft_completeness_hint: build_draft_completeness_hint({
      in_session_draft_state_scaffold,
      request_review_submit_preview_scaffold,
    }),
    unavailable_control_surfaces,
    deferred_items: unique_items([
      ...in_session_draft_state_scaffold.deferred_items,
      "one_click_request_preview_promotion",
    ]),
    non_claims: unique_items([
      "no_actual_draft_keep_execution",
      "no_actual_draft_clear_execution",
      "no_actual_request_preview_seed_promotion",
      ...in_session_draft_state_scaffold.non_claims,
      "no_runtime_complete_session_draft_control_workflow",
    ]),
    projection_notes: [
      "Session-draft controls scaffold derives bounded keep, clear, and promote-to-preview hints from existing in-session draft-state and request preview truth.",
      "Control hints remain operator-facing only and do not execute draft mutation, request preview rebuild, provider execution, channel routing, or runtime-complete workflow handling.",
    ],
  };
}
