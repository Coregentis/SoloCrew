import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellDeliveryAcceptanceScaffold,
} from "./single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorActionIntentScaffold,
  SingleCellOperatorActionIntentSeed,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellCorrectionReviewInteraction,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorInputDraftActionIntentOption,
  SingleCellOperatorInputDraftScaffold,
  SingleCellOperatorInputDraftSlot,
  SingleCellOperatorInputDraftUnavailableSurface,
} from "./single-cell-operator-input-draft-contract.ts";
import type {
  SingleCellTaskFocusInteraction,
} from "./single-cell-task-focus-interaction-contract.ts";

function build_current_draft_context(input: {
  task_focus_interaction: SingleCellTaskFocusInteraction;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold;
}): SingleCellOperatorInputDraftScaffold["current_draft_context"] {
  const {
    task_focus_interaction,
    correction_review_interaction,
    delivery_acceptance_scaffold,
  } = input;

  return {
    objective_focus_id:
      task_focus_interaction.current_objective_focus.objective_id,
    objective_focus_label:
      task_focus_interaction.current_objective_focus.objective_label,
    work_item_focus_id:
      task_focus_interaction.current_work_item_focus.work_item_id,
    work_item_focus_label:
      task_focus_interaction.current_work_item_focus.work_item_label,
    correction_target_scope:
      correction_review_interaction.correction_input_seed.suggested_target_scope,
    review_intent:
      correction_review_interaction.review_intent_seed.default_review_intent,
    acceptance_status:
      delivery_acceptance_scaffold.current_delivery_contract_summary.acceptance_status,
  };
}

function build_action_intent_draft_options(
  action_intent_scaffold: SingleCellOperatorActionIntentScaffold
): SingleCellOperatorInputDraftActionIntentOption[] {
  return action_intent_scaffold.available_action_intent_seeds.map(
    (seed) => ({
      option_id: `${action_intent_scaffold.scaffold_id}-${seed.intent_id}-draft-option`,
      intent_kind: seed.intent_kind,
      display_label: seed.display_label,
      support_level: seed.support_level,
      target_ref_id: seed.target_ref_id,
      target_label: seed.target_label,
      notes: [...seed.notes],
    })
  );
}

function build_draftable_input_slots(input: {
  baseline_shell_session: BaselineShellSession;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  action_intent_draft_options: SingleCellOperatorInputDraftActionIntentOption[];
  current_draft_context: SingleCellOperatorInputDraftScaffold["current_draft_context"];
}): SingleCellOperatorInputDraftSlot[] {
  const {
    baseline_shell_session,
    correction_review_interaction,
    action_intent_draft_options,
    current_draft_context,
  } = input;

  return [
    {
      draft_slot_id: `${baseline_shell_session.runtime.project_id}-objective-note-draft`,
      draft_kind: "objective_note_draft",
      display_label: "Objective note",
      draft_mode: "text_entry",
      support_level: "draftable_now",
      target_ref_id: current_draft_context.objective_focus_id,
      target_label: current_draft_context.objective_focus_label,
      target_surface: "objective_overview",
      placeholder_text:
        "Add one bounded operator note to sharpen the current objective.",
      initial_text: "",
      notes: [
        "Objective note draft is operator-facing only and does not mutate runtime objective truth directly.",
      ],
    },
    {
      draft_slot_id: `${baseline_shell_session.runtime.project_id}-work-item-note-draft`,
      draft_kind: "work_item_note_draft",
      display_label: "Work-item note",
      draft_mode: "text_entry",
      support_level: "draftable_now",
      target_ref_id: current_draft_context.work_item_focus_id,
      target_label: current_draft_context.work_item_focus_label,
      target_surface: "task_focus",
      placeholder_text:
        "Add one bounded operator note for the current work-item focus.",
      initial_text: "",
      notes: [
        "Work-item note draft stays presentational and does not imply scheduling or execution updates.",
      ],
    },
    {
      draft_slot_id: `${baseline_shell_session.runtime.project_id}-correction-text-draft`,
      draft_kind: "correction_text_draft",
      display_label: "Correction text",
      draft_mode: "text_entry",
      support_level: "draftable_now",
      target_ref_id:
        correction_review_interaction.correction_input_seed.suggested_target_ref_id,
      target_label:
        correction_review_interaction.correction_input_seed.suggested_target_scope,
      target_surface: "correction_review",
      placeholder_text: `${correction_review_interaction.correction_input_seed.summary_placeholder} Example corrected value: ${correction_review_interaction.correction_input_seed.corrected_value_placeholder}.`,
      initial_text: "",
      notes: [
        "Correction draft reuses the bounded correction scaffold and does not imply submission by itself.",
      ],
    },
    {
      draft_slot_id: `${baseline_shell_session.runtime.project_id}-review-request-draft`,
      draft_kind: "review_request_draft",
      display_label: "Review request",
      draft_mode: "text_entry",
      support_level: "draftable_now",
      target_ref_id: current_draft_context.objective_focus_id,
      target_label: current_draft_context.objective_focus_label,
      target_surface: "correction_review",
      placeholder_text: `Request one bounded review for the current objective, for example: ${current_draft_context.review_intent}.`,
      initial_text: "",
      notes: [
        "Review request draft stays operator-facing and does not create an approval queue or rerun.",
      ],
    },
    {
      draft_slot_id: `${baseline_shell_session.runtime.project_id}-selected-action-intent-draft`,
      draft_kind: "selected_action_intent_draft",
      display_label: "Selected action intent",
      draft_mode: "selection",
      support_level: "bounded_selection_only",
      target_ref_id: current_draft_context.objective_focus_id,
      target_label: current_draft_context.objective_focus_label,
      target_surface: "action_intents",
      placeholder_text:
        "Select one currently available action intent to prepare for later confirmation.",
      initial_text: "",
      notes: action_intent_draft_options.length > 0
        ? [
            `Current action-intent options visible: ${String(action_intent_draft_options.length)}.`,
            "Selection remains draft-only and does not trigger execution.",
          ]
        : [
            "No bounded action-intent options are currently visible.",
          ],
    },
  ];
}

function build_unavailable_input_surfaces(): SingleCellOperatorInputDraftUnavailableSurface[] {
  return [
    {
      surface_id: "provider_backed_input_submission",
      display_label: "Provider-backed input submission",
      reason:
        "Current drafts do not submit into provider-backed execution or model runtime paths.",
    },
    {
      surface_id: "channel_routed_input_submission",
      display_label: "Channel-routed input submission",
      reason:
        "No channel entry or channel-side submission path is available for operator drafts in this wave.",
    },
    {
      surface_id: "multi_cell_input_routing",
      display_label: "Multi-cell input routing",
      reason:
        "Drafts remain single-cell only and do not target a portfolio or cross-cell workflow.",
    },
    {
      surface_id: "secretary_managed_input_inbox",
      display_label: "Secretary-managed input inbox",
      reason:
        "No secretary layer receives or triages operator input drafts in the single-cell usable line.",
    },
    {
      surface_id: "persistent_input_draft_history",
      display_label: "Persistent input draft history",
      reason:
        "The current repo truth does not provide persisted draft history across sessions.",
    },
  ];
}

export interface AssembleSingleCellOperatorInputDraftScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  task_focus_interaction: SingleCellTaskFocusInteraction;
  action_intent_scaffold: SingleCellOperatorActionIntentScaffold;
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold;
}

export function assembleSingleCellOperatorInputDraftScaffold(
  input: AssembleSingleCellOperatorInputDraftScaffoldInput
): SingleCellOperatorInputDraftScaffold {
  const {
    baseline_shell_session,
    correction_review_interaction,
    task_focus_interaction,
    action_intent_scaffold,
    delivery_acceptance_scaffold,
  } = input;
  const current_draft_context = build_current_draft_context({
    task_focus_interaction,
    correction_review_interaction,
    delivery_acceptance_scaffold,
  });
  const action_intent_draft_options =
    build_action_intent_draft_options(action_intent_scaffold);

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-input-draft`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_input_draft_scaffold",
    execution_boundary: "draft_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_draft_context,
    draftable_input_slots: build_draftable_input_slots({
      baseline_shell_session,
      correction_review_interaction,
      action_intent_draft_options,
      current_draft_context,
    }),
    action_intent_draft_options,
    unavailable_input_surfaces: build_unavailable_input_surfaces(),
    deferred_items: [
      "provider_backed_input_submission",
      "channel_routed_input_submission",
      "persistent_input_draft_history",
      "multi_cell_input_routing",
      "secretary_managed_input_inbox",
    ],
    non_claims: [
      "no_provider_backed_input_submission",
      "no_channel_input_routing",
      "no_multi_cell_input_routing",
      "no_secretary_input_inbox",
      "no_persistent_input_draft_history",
      "no_runtime_complete_input_workflow",
    ],
    projection_notes: [
      "Operator input-draft scaffold derives current draft slots from existing task-focus, correction/review, action-intent, and delivery-acceptance truth.",
      "Drafts remain operator-facing only and do not become provider execution, channel submission, secretary routing, or runtime-complete workflow handling.",
    ],
  };
}
