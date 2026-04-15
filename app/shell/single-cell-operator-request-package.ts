import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellDeliveryAcceptanceScaffold,
} from "./single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorActionIntentScaffold,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellCorrectionReviewInteraction,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorInputDraftScaffold,
} from "./single-cell-operator-input-draft-contract.ts";
import type {
  SingleCellOperatorRequestPackage,
  SingleCellOperatorRequestPackageField,
  SingleCellOperatorRequestPackageScaffold,
  SingleCellOperatorRequestPackageSelectedActionIntent,
  SingleCellOperatorRequestPackageUnavailableSurface,
} from "./single-cell-operator-request-package-contract.ts";
import type {
  SingleCellTaskFocusInteraction,
} from "./single-cell-task-focus-interaction-contract.ts";

function build_current_focus(
  task_focus_interaction: SingleCellTaskFocusInteraction
): SingleCellOperatorRequestPackage["current_focus"] {
  return {
    objective_focus_id:
      task_focus_interaction.current_objective_focus.objective_id,
    objective_focus_label:
      task_focus_interaction.current_objective_focus.objective_label,
    work_item_focus_id:
      task_focus_interaction.current_work_item_focus.work_item_id,
    work_item_focus_label:
      task_focus_interaction.current_work_item_focus.work_item_label,
  };
}

function preferred_action_intent_order(
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold
) {
  if (
    delivery_acceptance_scaffold.current_delivery_contract_summary
      .acceptance_status === "criteria_visible_ready_for_bounded_review"
  ) {
    return [
      "request_review",
      "apply_correction",
      "refine_objective",
      "shift_task_focus",
      "reprioritize_work_item",
      "resume_or_defer_hint",
    ] as const;
  }

  return [
    "shift_task_focus",
    "reprioritize_work_item",
    "apply_correction",
    "refine_objective",
    "request_review",
    "resume_or_defer_hint",
  ] as const;
}

function build_selected_action_intent(input: {
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold;
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold;
}): SingleCellOperatorRequestPackageSelectedActionIntent | undefined {
  const { input_draft_scaffold, delivery_acceptance_scaffold } = input;
  const preferred_order = preferred_action_intent_order(
    delivery_acceptance_scaffold
  );
  const selected_option =
    preferred_order
      .map((intent_kind) =>
        input_draft_scaffold.action_intent_draft_options.find(
          (option) => option.intent_kind === intent_kind
        )
      )
      .find((option) => option) ??
    input_draft_scaffold.action_intent_draft_options[0];

  if (!selected_option) {
    return undefined;
  }

  return {
    selection_basis: "derived_default_from_current_truth",
    selection_confirmed: false,
    intent_kind: selected_option.intent_kind,
    display_label: selected_option.display_label,
    support_level: selected_option.support_level,
    target_ref_id: selected_option.target_ref_id,
    target_label: selected_option.target_label,
    notes: [
      "Selected action intent is a derived default package choice only.",
      "This remains unconfirmed and does not trigger execution or submission.",
      ...selected_option.notes,
    ],
  };
}

function build_correction_review_target(
  correction_review_interaction: SingleCellCorrectionReviewInteraction
): SingleCellOperatorRequestPackage["correction_review_target"] {
  return {
    target_scope:
      correction_review_interaction.correction_input_seed.suggested_target_scope,
    target_ref_id:
      correction_review_interaction.correction_input_seed.suggested_target_ref_id,
    review_intent:
      correction_review_interaction.review_intent_seed.default_review_intent,
    source_surface: "correction_review",
    notes: [
      "Correction/review target is packaged from the current bounded correction scaffold.",
      "Packaging this target does not imply capture submission or rerun.",
    ],
  };
}

function build_input_drafts(
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold
): SingleCellOperatorRequestPackage["input_drafts"] {
  return input_draft_scaffold.draftable_input_slots.map((slot) => ({
    draft_kind: slot.draft_kind,
    draft_mode: slot.draft_mode,
    support_level: slot.support_level,
    target_ref_id: slot.target_ref_id,
    target_label: slot.target_label,
    target_surface: slot.target_surface,
    current_text: slot.initial_text,
    has_text: slot.initial_text.trim().length > 0,
    placeholder_text: slot.placeholder_text,
    notes: [...slot.notes],
  }));
}

function build_delivery_acceptance_context(
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold
): SingleCellOperatorRequestPackage["delivery_acceptance_context"] {
  return {
    delivery_contract_id:
      delivery_acceptance_scaffold.current_delivery_contract_summary
        .delivery_contract_id,
    acceptance_status:
      delivery_acceptance_scaffold.current_delivery_contract_summary
        .acceptance_status,
    delivery_target:
      delivery_acceptance_scaffold.current_delivery_contract_summary
        .delivery_target,
    review_posture:
      delivery_acceptance_scaffold.current_delivery_contract_summary
        .review_posture,
    completed_signal_count:
      delivery_acceptance_scaffold.completed_acceptance_signals.length,
    open_signal_count:
      delivery_acceptance_scaffold.unmet_or_deferred_acceptance_signals.length,
    notes: [
      "Delivery acceptance context packages the current bounded acceptance view only.",
      "Counts reflect visible acceptance signals and not runtime-complete acceptance state.",
    ],
  };
}

function build_package_fields_present(input: {
  selected_action_intent?: SingleCellOperatorRequestPackageSelectedActionIntent;
}): SingleCellOperatorRequestPackageField[] {
  const fields: SingleCellOperatorRequestPackageField[] = [
    "current_focus",
    "correction_review_target",
    "input_drafts",
    "delivery_acceptance_context",
  ];

  if (input.selected_action_intent) {
    fields.push("selected_action_intent");
  }

  return fields;
}

function build_unavailable_request_surfaces(): SingleCellOperatorRequestPackageUnavailableSurface[] {
  return [
    {
      surface_id: "provider_backed_request_submission",
      display_label: "Provider-backed request submission",
      reason:
        "Current request packages do not submit into provider-backed execution or model runtime paths.",
    },
    {
      surface_id: "channel_routed_request_handoff",
      display_label: "Channel-routed request handoff",
      reason:
        "No channel entry or channel-side handoff path is available for operator request packages in this wave.",
    },
    {
      surface_id: "multi_cell_request_routing",
      display_label: "Multi-cell request routing",
      reason:
        "Request packages remain single-cell only and do not route across a portfolio.",
    },
    {
      surface_id: "secretary_managed_request_queue",
      display_label: "Secretary-managed request queue",
      reason:
        "No secretary layer receives or triages operator request packages in the single-cell usable line.",
    },
    {
      surface_id: "persistent_request_package_history",
      display_label: "Persistent request package history",
      reason:
        "The current repo truth does not provide persisted request-package history across sessions.",
    },
  ];
}

export interface AssembleSingleCellOperatorRequestPackageScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  task_focus_interaction: SingleCellTaskFocusInteraction;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  action_intent_scaffold: SingleCellOperatorActionIntentScaffold;
  delivery_acceptance_scaffold: SingleCellDeliveryAcceptanceScaffold;
  input_draft_scaffold: SingleCellOperatorInputDraftScaffold;
}

export function assembleSingleCellOperatorRequestPackageScaffold(
  input: AssembleSingleCellOperatorRequestPackageScaffoldInput
): SingleCellOperatorRequestPackageScaffold {
  const {
    baseline_shell_session,
    task_focus_interaction,
    correction_review_interaction,
    action_intent_scaffold,
    delivery_acceptance_scaffold,
    input_draft_scaffold,
  } = input;
  const current_focus = build_current_focus(task_focus_interaction);
  const selected_action_intent = build_selected_action_intent({
    input_draft_scaffold,
    delivery_acceptance_scaffold,
  });
  const current_request_package: SingleCellOperatorRequestPackage = {
    request_package_id: `${baseline_shell_session.runtime.project_id}-operator-request-package`,
    package_fields_present: build_package_fields_present({
      selected_action_intent,
    }),
    current_focus,
    selected_action_intent,
    correction_review_target: build_correction_review_target(
      correction_review_interaction
    ),
    input_drafts: build_input_drafts(input_draft_scaffold),
    delivery_acceptance_context: build_delivery_acceptance_context(
      delivery_acceptance_scaffold
    ),
  };

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-request-package-scaffold`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_request_package_scaffold",
    execution_boundary: "request_package_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_request_package,
    unavailable_request_surfaces: build_unavailable_request_surfaces(),
    deferred_items: [
      "provider_backed_request_submission",
      "channel_routed_request_handoff",
      "persistent_request_package_history",
      "multi_cell_request_routing",
      "secretary_managed_request_queue",
    ],
    non_claims: [
      "no_provider_backed_request_submission",
      "no_channel_request_handoff",
      "no_multi_cell_request_routing",
      "no_secretary_request_queue",
      "no_persistent_request_package_history",
      "no_runtime_complete_request_workflow",
    ],
    projection_notes: [
      "Operator request-package scaffold combines current focus, derived action intent, correction/review targeting, input drafts, and delivery acceptance context from existing bounded operator truth.",
      "Request packages remain operator-facing only and do not become provider execution, channel routing, secretary queues, or runtime-complete workflow handling.",
      `Current action-intent options considered for packaging: ${String(
        action_intent_scaffold.available_action_intent_seeds.length
      )}.`,
    ],
  };
}
