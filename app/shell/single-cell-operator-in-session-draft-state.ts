import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellOperatorActionIntentKind,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellOperatorInputDraftScaffold,
  SingleCellOperatorInputDraftSlot,
} from "./single-cell-operator-input-draft-contract.ts";
import type {
  SingleCellOperatorInSessionActionIntentDraftValue,
  SingleCellOperatorInSessionDraftStateScaffold,
  SingleCellOperatorInSessionDraftStateSeedValues,
  SingleCellOperatorInSessionTextDraftValue,
  SingleCellOperatorInSessionDraftUnavailableSurface,
  SingleCellOperatorInSessionDraftValueSource,
} from "./single-cell-operator-in-session-draft-state-contract.ts";
import type {
  SingleCellOperatorRequestReviewSubmitPreviewScaffold,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function find_draft_slot(
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold,
  draft_kind: SingleCellOperatorInputDraftSlot["draft_kind"]
): SingleCellOperatorInputDraftSlot {
  const draft_slot = input_draft_scaffold.draftable_input_slots.find(
    (slot) => slot.draft_kind === draft_kind
  );

  if (!draft_slot) {
    throw new Error(`Expected draft slot for ${draft_kind}.`);
  }

  return draft_slot;
}

function build_text_draft_value(input: {
  draft_slot: SingleCellOperatorInputDraftSlot;
  seed_value?: string;
}): SingleCellOperatorInSessionTextDraftValue {
  const { draft_slot, seed_value } = input;
  const has_seed_value = typeof seed_value === "string";
  const current_value = has_seed_value ? seed_value : draft_slot.initial_text;
  const has_current_value = current_value.trim().length > 0;
  const value_source: SingleCellOperatorInSessionDraftValueSource =
    has_seed_value
      ? "bootstrap_session_override"
      : has_current_value
        ? "slot_initial_text"
        : "empty_session_state";

  return {
    current_value,
    value_presence: has_current_value
      ? "present_in_session"
      : "empty_in_session",
    value_source,
    is_operator_authored: has_seed_value || draft_slot.initial_text.trim().length > 0,
    notes: has_seed_value
      ? [
          "Current in-session draft value comes from a bounded bootstrap session override.",
          "This remains session-state only and does not imply persistence or submission.",
        ]
      : has_current_value
        ? [
            "Current in-session draft value comes from the current draft slot initial text.",
          ]
        : [
            "Current in-session draft value is empty in this session.",
          ],
  };
}

function humanize_action_intent_label(
  intent_kind: SingleCellOperatorActionIntentKind
): string {
  return intent_kind.replaceAll("_", " ");
}

function build_action_intent_draft_value(input: {
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
  seed_value?: SingleCellOperatorActionIntentKind;
}): SingleCellOperatorInSessionActionIntentDraftValue {
  const {
    input_draft_scaffold,
    request_review_submit_preview_scaffold,
    seed_value,
  } = input;
  const derived_kind =
    request_review_submit_preview_scaffold.current_request_package_summary
      .selected_action_intent_kind;
  const current_value = seed_value ?? derived_kind;
  const matched_option = current_value
    ? input_draft_scaffold.action_intent_draft_options.find(
        (option) => option.intent_kind === current_value
      )
    : undefined;

  if (!current_value) {
    return {
      current_value: undefined,
      display_label: undefined,
      value_presence: "empty_in_session",
      value_source: "empty_session_state",
      is_operator_authored: false,
      notes: [
        "No selected action-intent draft value is currently held in this session.",
      ],
    };
  }

  return {
    current_value,
    display_label:
      matched_option?.display_label ?? humanize_action_intent_label(current_value),
    value_presence: "present_in_session",
    value_source: seed_value
      ? "bootstrap_session_override"
      : "request_package_derived_default",
    is_operator_authored: Boolean(seed_value),
    notes: seed_value
      ? [
          "Selected action-intent draft value comes from a bounded bootstrap session override.",
          "This remains session-state only and does not confirm or submit the action intent.",
        ]
      : [
          "Selected action-intent draft value is derived from the current request-package default.",
          "This remains unconfirmed and does not imply operator submission or execution.",
        ],
  };
}

function count_present_draft_values(
  current_session_draft_values:
    SingleCellOperatorInSessionDraftStateScaffold["current_session_draft_values"]
): number {
  return [
    current_session_draft_values.objective_note_draft_value.value_presence,
    current_session_draft_values.work_item_note_draft_value.value_presence,
    current_session_draft_values.correction_text_draft_value.value_presence,
    current_session_draft_values.review_request_draft_value.value_presence,
    current_session_draft_values.selected_action_intent_draft_value
      .value_presence,
  ].filter((value_presence) => value_presence === "present_in_session")
    .length;
}

function build_unavailable_draft_surfaces(
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold
): SingleCellOperatorInSessionDraftUnavailableSurface[] {
  return [
    ...input_draft_scaffold.unavailable_input_surfaces.map((surface) => ({
      surface_id: surface.surface_id,
      display_label: surface.display_label,
      reason: surface.reason,
    })),
    {
      surface_id: "fresh_reload_session_draft_restore",
      display_label: "Fresh-reload session draft restore",
      reason:
        "Current in-session draft values do not persist across a fresh session reload in this wave.",
    },
  ];
}

export interface AssembleSingleCellOperatorInSessionDraftStateScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
  seed_values?: SingleCellOperatorInSessionDraftStateSeedValues;
}

export function assembleSingleCellOperatorInSessionDraftStateScaffold(
  input: AssembleSingleCellOperatorInSessionDraftStateScaffoldInput
): SingleCellOperatorInSessionDraftStateScaffold {
  const {
    baseline_shell_session,
    input_draft_scaffold,
    request_review_submit_preview_scaffold,
    seed_values,
  } = input;

  const current_session_draft_values = {
    objective_note_draft_value: build_text_draft_value({
      draft_slot: find_draft_slot(
        input_draft_scaffold,
        "objective_note_draft"
      ),
      seed_value: seed_values?.objective_note_draft_value,
    }),
    work_item_note_draft_value: build_text_draft_value({
      draft_slot: find_draft_slot(
        input_draft_scaffold,
        "work_item_note_draft"
      ),
      seed_value: seed_values?.work_item_note_draft_value,
    }),
    correction_text_draft_value: build_text_draft_value({
      draft_slot: find_draft_slot(
        input_draft_scaffold,
        "correction_text_draft"
      ),
      seed_value: seed_values?.correction_text_draft_value,
    }),
    review_request_draft_value: build_text_draft_value({
      draft_slot: find_draft_slot(
        input_draft_scaffold,
        "review_request_draft"
      ),
      seed_value: seed_values?.review_request_draft_value,
    }),
    selected_action_intent_draft_value: build_action_intent_draft_value({
      input_draft_scaffold,
      request_review_submit_preview_scaffold,
      seed_value: seed_values?.selected_action_intent_draft_value,
    }),
  };

  const present_draft_value_count = count_present_draft_values(
    current_session_draft_values
  );
  const empty_draft_value_count = 5 - present_draft_value_count;
  const has_operator_authored_value = [
    current_session_draft_values.objective_note_draft_value,
    current_session_draft_values.work_item_note_draft_value,
    current_session_draft_values.correction_text_draft_value,
    current_session_draft_values.review_request_draft_value,
    current_session_draft_values.selected_action_intent_draft_value,
  ].some((draft_value) => draft_value.is_operator_authored);
  const only_derived_selection_present =
    !has_operator_authored_value &&
    current_session_draft_values.selected_action_intent_draft_value
      .value_source === "request_package_derived_default" &&
    present_draft_value_count === 1;
  const unavailable_draft_surfaces = build_unavailable_draft_surfaces(
    input_draft_scaffold
  );

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-in-session-draft-state`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_in_session_draft_state_scaffold",
    execution_boundary: "session_state_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_session_draft_values,
    draft_completeness_state: {
      draft_emptiness_state: present_draft_value_count === 0
        ? "all_empty"
        : only_derived_selection_present
          ? "all_empty_except_derived_selection"
          : "some_operator_input_present",
      draft_completeness_status: has_operator_authored_value
        ? "session_drafts_have_operator_input"
        : "session_drafts_incomplete",
      present_draft_value_count,
      empty_draft_value_count,
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
        "In-session draft-state reflects current session values only.",
        "Request review / submit-preview truth remains separately bounded and does not automatically consume session-only draft changes in this wave.",
      ],
    },
    unavailable_draft_surfaces,
    deferred_items: unique_items([
      ...input_draft_scaffold.deferred_items,
      "fresh_reload_session_draft_restore",
    ]),
    non_claims: unique_items([
      "no_actual_session_draft_submission",
      "no_fresh_reload_session_draft_restore",
      ...input_draft_scaffold.non_claims,
      "no_runtime_complete_session_draft_workflow",
    ]),
    projection_notes: [
      "In-session draft-state scaffold holds current draft values from bounded session overrides, draft slot initial text, and request-package-derived selection defaults.",
      "In-session draft values remain session-state only and do not imply provider execution, submission, cross-session persistence, or runtime-complete workflow handling.",
    ],
  };
}
