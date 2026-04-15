import type { WorkItem } from "../../projection/objects/work-item.ts";
import type { BaselineShellSession } from "./create-baseline-shell.ts";
import {
  deriveSingleCellOperatorConsoleNextStateSeed,
} from "./single-cell-operator-console-state-transition.ts";
import type {
  SingleCellOperatorConsoleStateTransitionScaffold,
  SingleCellOperatorConsoleTransitionOption,
} from "./single-cell-operator-console-state-transition-contract.ts";
import type {
  SingleCellTaskFocusAvailableTarget,
  SingleCellTaskFocusInteraction,
  SingleCellTaskFocusNextPreviewSeed,
  SingleCellTaskFocusSwitchIntentSeed,
  SingleCellTaskFocusTargetKind,
} from "./single-cell-task-focus-interaction-contract.ts";

function preview_target_kind(
  option: SingleCellOperatorConsoleTransitionOption
): SingleCellTaskFocusTargetKind {
  return option.transition_kind === "objective_focus_change"
    ? "objective"
    : "work-item";
}

function build_current_work_item_focus(
  work_items: readonly WorkItem[],
  work_item_id: string
): SingleCellTaskFocusInteraction["current_work_item_focus"] {
  const current_work_item =
    work_items.find((work_item) => work_item.work_item_id === work_item_id) ??
    work_items[0];

  return {
    work_item_id: current_work_item.work_item_id,
    work_item_label: current_work_item.title,
    work_item_status: current_work_item.status,
  };
}

function build_available_focus_targets(input: {
  baseline_shell_session: BaselineShellSession;
  scaffold: SingleCellOperatorConsoleStateTransitionScaffold;
}): SingleCellTaskFocusAvailableTarget[] {
  const { baseline_shell_session, scaffold } = input;
  const current = scaffold.current_state_seed;

  return [
    {
      target_kind: "objective",
      target_id: current.objective_focus_id,
      display_label: current.objective_focus_label,
      support_level: "current_truth_only",
      is_current: true,
      notes: [
        "Current single-cell truth exposes one active objective focus.",
        "Objective focus remains presentational and does not imply portfolio routing.",
      ],
    },
    ...baseline_shell_session.shell.work_items.map((work_item) => ({
      target_kind: "work-item" as const,
      target_id: work_item.work_item_id,
      display_label: work_item.title,
      support_level:
        work_item.work_item_id === current.work_item_focus_id
          ? "current_truth_only"
          : "bounded_reseed_now",
      is_current: work_item.work_item_id === current.work_item_focus_id,
      status_label: work_item.status,
      notes:
        work_item.work_item_id === current.work_item_focus_id
          ? [
              "This is the current bounded work-item focus.",
              "Reaffirming the same focus does not imply workflow execution.",
            ]
          : [
              "This work-item can be selected as the next operator-facing focus.",
              "Focus switching reseeds page state only and does not dispatch execution.",
            ],
    })),
  ];
}

function build_relevant_options(
  scaffold: SingleCellOperatorConsoleStateTransitionScaffold
): SingleCellOperatorConsoleTransitionOption[] {
  return scaffold.transition_options.filter(
    (option) =>
      option.transition_kind === "objective_focus_change" ||
      option.transition_kind === "work_item_focus_change"
  );
}

function build_next_focus_preview_seed(input: {
  scaffold: SingleCellOperatorConsoleStateTransitionScaffold;
  option: SingleCellOperatorConsoleTransitionOption;
}): SingleCellTaskFocusNextPreviewSeed {
  const { scaffold, option } = input;
  const preview = deriveSingleCellOperatorConsoleNextStateSeed({
    scaffold,
    option_id: option.option_id,
  });

  return {
    preview_id: preview.preview_id,
    target_kind: preview_target_kind(option),
    objective_focus_id: preview.objective_focus_id,
    objective_focus_label: preview.objective_focus_label,
    work_item_focus_id: preview.work_item_focus_id,
    work_item_focus_label: preview.work_item_focus_label,
    notes: preview.preview_notes,
  };
}

function build_focus_switch_intent_seed(input: {
  option: SingleCellOperatorConsoleTransitionOption;
  preview: SingleCellTaskFocusNextPreviewSeed;
}): SingleCellTaskFocusSwitchIntentSeed {
  const { option, preview } = input;

  return {
    intent_id: option.option_id,
    target_kind: preview.target_kind,
    target_id:
      preview.target_kind === "objective"
        ? preview.objective_focus_id
        : preview.work_item_focus_id,
    display_label: option.display_label,
    support_level: option.support_level,
    next_focus_preview_id: preview.preview_id,
    notes: option.notes,
  };
}

export interface AssembleSingleCellTaskFocusInteractionInput {
  baseline_shell_session: BaselineShellSession;
  state_transition_scaffold: SingleCellOperatorConsoleStateTransitionScaffold;
}

export function assembleSingleCellTaskFocusInteraction(
  input: AssembleSingleCellTaskFocusInteractionInput
): SingleCellTaskFocusInteraction {
  const { baseline_shell_session, state_transition_scaffold } = input;
  const current = state_transition_scaffold.current_state_seed;
  const current_work_item_focus = build_current_work_item_focus(
    baseline_shell_session.shell.work_items,
    current.work_item_focus_id
  );
  const relevant_options = build_relevant_options(state_transition_scaffold);
  const next_focus_preview_seeds = relevant_options.map((option) =>
    build_next_focus_preview_seed({
      scaffold: state_transition_scaffold,
      option,
    })
  );
  const focus_switch_intent_seeds = relevant_options.map((option, index) =>
    build_focus_switch_intent_seed({
      option,
      preview: next_focus_preview_seeds[index],
    })
  );

  return {
    interaction_id: `${baseline_shell_session.runtime.project_id}-task-focus-interaction`,
    interaction_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "task_focus_interaction_scaffold",
    execution_boundary: "interaction_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_objective_focus: {
      objective_id: current.objective_focus_id,
      objective_label: current.objective_focus_label,
    },
    current_work_item_focus,
    available_focus_targets: build_available_focus_targets({
      baseline_shell_session,
      scaffold: state_transition_scaffold,
    }),
    focus_switch_intent_seeds,
    next_focus_preview_seeds,
    deferred_items: [
      "persistent_focus_switch_timeline",
      "multi_objective_portfolio_focus_routing",
      "provider_backed_focus_actions",
    ],
    non_claims: [
      "no_task_focus_execution_dispatch",
      "no_provider_backed_focus_switch",
      "no_multi_cell_focus_routing",
      "no_secretary_task_focus_surface",
      "no_persistent_focus_timeline",
    ],
    projection_notes: [
      "Task-focus interaction derives current objective/work-item focus from the bounded operator console state-transition scaffold.",
      "Focus switching stays operator-facing and presentational, without introducing execution, portfolio routing, or secretary behavior.",
    ],
  };
}
