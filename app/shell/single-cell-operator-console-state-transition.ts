import type { WorkItem } from "../../projection/objects/work-item.ts";
import type {
  SingleCellCorrectionReviewInteraction,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  BaselineShellSession,
} from "./create-baseline-shell.ts";
import type {
  SingleCellOperatorConsoleShell,
} from "./single-cell-operator-console-shell-contract.ts";
import type {
  SingleCellOperatorConsoleNextStateSeedPreview,
  SingleCellOperatorConsoleStateTransitionScaffold,
  SingleCellOperatorConsoleTransitionOption,
} from "./single-cell-operator-console-state-transition-contract.ts";

function pick_current_work_item(
  work_items: readonly WorkItem[]
): WorkItem {
  return (
    work_items.find((work_item) => work_item.status === "blocked") ??
    work_items.find((work_item) => work_item.status === "active") ??
    work_items[0]
  );
}

function build_current_state_seed(input: {
  baseline_shell_session: BaselineShellSession;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
}) {
  const { baseline_shell_session, correction_review_interaction } = input;
  const current_work_item = pick_current_work_item(
    baseline_shell_session.shell.work_items
  );

  return {
    objective_focus_id: baseline_shell_session.shell.objective.objective_id,
    objective_focus_label: baseline_shell_session.shell.objective.title,
    work_item_focus_id: current_work_item.work_item_id,
    work_item_focus_label: current_work_item.title,
    correction_target_scope:
      correction_review_interaction.correction_input_seed.suggested_target_scope,
    correction_target_ref_id:
      correction_review_interaction.correction_input_seed.suggested_target_ref_id,
    review_intent:
      correction_review_interaction.review_intent_seed.default_review_intent,
  } satisfies SingleCellOperatorConsoleStateTransitionScaffold["current_state_seed"];
}

function build_objective_focus_options(
  scaffold_id: string,
  current_state_seed: SingleCellOperatorConsoleStateTransitionScaffold["current_state_seed"]
): SingleCellOperatorConsoleTransitionOption[] {
  return [
    {
      transition_kind: "objective_focus_change",
      option_id: `${scaffold_id}-objective-focus-current`,
      display_label: "Reaffirm current objective focus",
      from_value: current_state_seed.objective_focus_label,
      to_value: current_state_seed.objective_focus_label,
      support_level: "current_truth_only",
      next_state_overrides: {
        objective_focus_id: current_state_seed.objective_focus_id,
        objective_focus_label: current_state_seed.objective_focus_label,
      },
      notes: [
        "Current single-cell truth contains one active objective focus.",
        "Objective focus transition currently reseeds to the same objective without implying portfolio behavior.",
      ],
    },
  ];
}

function build_work_item_focus_options(input: {
  scaffold_id: string;
  current_state_seed: SingleCellOperatorConsoleStateTransitionScaffold["current_state_seed"];
  work_items: readonly WorkItem[];
}): SingleCellOperatorConsoleTransitionOption[] {
  const { scaffold_id, current_state_seed, work_items } = input;
  const alternative_work_items = work_items.filter(
    (work_item) => work_item.work_item_id !== current_state_seed.work_item_focus_id
  );

  if (alternative_work_items.length === 0) {
    return [
      {
        transition_kind: "work_item_focus_change",
        option_id: `${scaffold_id}-work-item-focus-current`,
        display_label: "Reaffirm current work-item focus",
        from_value: current_state_seed.work_item_focus_label,
        to_value: current_state_seed.work_item_focus_label,
        support_level: "current_truth_only",
        next_state_overrides: {
          work_item_focus_id: current_state_seed.work_item_focus_id,
          work_item_focus_label: current_state_seed.work_item_focus_label,
        },
        notes: [
          "Only one bounded work-item focus is currently available.",
          "This reseeds the current focus without claiming workflow execution.",
        ],
      },
    ];
  }

  return alternative_work_items.map((work_item, index) => ({
    transition_kind: "work_item_focus_change",
    option_id: `${scaffold_id}-work-item-focus-${index + 1}`,
    display_label: `Shift focus to ${work_item.title}`,
    from_value: current_state_seed.work_item_focus_label,
    to_value: work_item.title,
    support_level: "bounded_reseed_now",
    next_state_overrides: {
      work_item_focus_id: work_item.work_item_id,
      work_item_focus_label: work_item.title,
    },
    notes: [
      "Work-item focus transition reseeds operator-facing page state only.",
      "This does not dispatch execution, persist an event timeline, or claim runtime workflow progress.",
    ],
  }));
}

function build_correction_target_scope_options(input: {
  scaffold_id: string;
  current_state_seed: SingleCellOperatorConsoleStateTransitionScaffold["current_state_seed"];
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
}): SingleCellOperatorConsoleTransitionOption[] {
  const {
    scaffold_id,
    current_state_seed,
    correction_review_interaction,
  } = input;

  return correction_review_interaction.target_scope_hints
    .filter(
      (hint) =>
        hint.target_scope !== current_state_seed.correction_target_scope ||
        hint.target_ref_id !== current_state_seed.correction_target_ref_id
    )
    .map((hint, index) => ({
      transition_kind: "correction_target_scope_change",
      option_id: `${scaffold_id}-correction-target-${index + 1}`,
      display_label: `Retarget correction to ${hint.target_scope}`,
      from_value: current_state_seed.correction_target_scope,
      to_value: hint.target_scope,
      support_level: "bounded_reseed_now",
      next_state_overrides: {
        correction_target_scope: hint.target_scope,
        correction_target_ref_id: hint.target_ref_id,
      },
      notes: [
        `Retargets correction input toward ${hint.display_label}.`,
        ...hint.notes,
      ],
    }));
}

function build_review_intent_options(input: {
  scaffold_id: string;
  current_state_seed: SingleCellOperatorConsoleStateTransitionScaffold["current_state_seed"];
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
}): SingleCellOperatorConsoleTransitionOption[] {
  const {
    scaffold_id,
    current_state_seed,
    correction_review_interaction,
  } = input;

  return correction_review_interaction.review_intent_seed.supported_review_intents
    .filter((intent) => intent !== current_state_seed.review_intent)
    .map((intent, index) => ({
      transition_kind: "review_intent_change",
      option_id: `${scaffold_id}-review-intent-${index + 1}`,
      display_label: `Change review intent to ${intent}`,
      from_value: current_state_seed.review_intent,
      to_value: intent,
      support_level: "bounded_reseed_now",
      next_state_overrides: {
        review_intent: intent,
      },
      notes: [
        "Review intent transition reseeds the operator-facing review posture only.",
        "This does not trigger automated reruns, provider actions, or approval queues.",
      ],
    }));
}

export interface DeriveSingleCellOperatorConsoleNextStateSeedInput {
  scaffold: SingleCellOperatorConsoleStateTransitionScaffold;
  option_id: string;
}

export function deriveSingleCellOperatorConsoleNextStateSeed(
  input: DeriveSingleCellOperatorConsoleNextStateSeedInput
): SingleCellOperatorConsoleNextStateSeedPreview {
  const option = input.scaffold.transition_options.find(
    (candidate) => candidate.option_id === input.option_id
  );

  if (!option) {
    throw new Error(
      `Unknown single-cell operator console transition option: ${input.option_id}`
    );
  }

  const current = input.scaffold.current_state_seed;

  return {
    preview_id: `${input.scaffold.transition_scaffold_id}-${option.option_id}-preview`,
    transition_kind: option.transition_kind,
    option_id: option.option_id,
    support_level: option.support_level,
    objective_focus_id:
      option.next_state_overrides.objective_focus_id ?? current.objective_focus_id,
    objective_focus_label:
      option.next_state_overrides.objective_focus_label ??
      current.objective_focus_label,
    work_item_focus_id:
      option.next_state_overrides.work_item_focus_id ?? current.work_item_focus_id,
    work_item_focus_label:
      option.next_state_overrides.work_item_focus_label ??
      current.work_item_focus_label,
    correction_target_scope:
      option.next_state_overrides.correction_target_scope ??
      current.correction_target_scope,
    correction_target_ref_id:
      option.next_state_overrides.correction_target_ref_id ??
      current.correction_target_ref_id,
    review_intent:
      option.next_state_overrides.review_intent ?? current.review_intent,
    preview_notes: [
      `Transition preview reseeds ${option.transition_kind}.`,
      ...option.notes,
    ],
  };
}

function build_suggested_next_state_previews(
  scaffold: SingleCellOperatorConsoleStateTransitionScaffold
): SingleCellOperatorConsoleNextStateSeedPreview[] {
  const previews: SingleCellOperatorConsoleNextStateSeedPreview[] = [];
  const preferred_kinds = new Set([
    "objective_focus_change",
    "work_item_focus_change",
    "correction_target_scope_change",
    "review_intent_change",
  ] as const);

  for (const transition_kind of preferred_kinds) {
    const option = scaffold.transition_options.find(
      (candidate) => candidate.transition_kind === transition_kind
    );

    if (!option) {
      continue;
    }

    previews.push(
      deriveSingleCellOperatorConsoleNextStateSeed({
        scaffold,
        option_id: option.option_id,
      })
    );
  }

  return previews;
}

export interface AssembleSingleCellOperatorConsoleStateTransitionScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  console_shell: SingleCellOperatorConsoleShell;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
}

export function assembleSingleCellOperatorConsoleStateTransitionScaffold(
  input: AssembleSingleCellOperatorConsoleStateTransitionScaffoldInput
): SingleCellOperatorConsoleStateTransitionScaffold {
  const { baseline_shell_session, console_shell, correction_review_interaction } =
    input;
  const scaffold_id = `${baseline_shell_session.runtime.project_id}-operator-console-state-transition`;
  const current_state_seed = build_current_state_seed({
    baseline_shell_session,
    correction_review_interaction,
  });

  const transition_options = [
    ...build_objective_focus_options(scaffold_id, current_state_seed),
    ...build_work_item_focus_options({
      scaffold_id,
      current_state_seed,
      work_items: baseline_shell_session.shell.work_items,
    }),
    ...build_correction_target_scope_options({
      scaffold_id,
      current_state_seed,
      correction_review_interaction,
    }),
    ...build_review_intent_options({
      scaffold_id,
      current_state_seed,
      correction_review_interaction,
    }),
  ];

  const deferred_items = [
    "state_transition_event_timeline_persistence",
    "provider_backed_transition_execution",
    "channel_routed_transition_controls",
    "multi_cell_transition_orchestration",
  ];
  const non_claims = [
    "no_execution_complete_state_transition",
    "no_persistent_transition_timeline",
    "no_provider_backed_transition_action",
    "no_channel_transition_controls",
    "no_multi_cell_transition_orchestration",
    "no_secretary_transition_surface",
  ];

  const scaffold: SingleCellOperatorConsoleStateTransitionScaffold = {
    transition_scaffold_id: scaffold_id,
    transition_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_console_state_transition",
    execution_boundary: "state_transition_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    current_state_seed,
    transition_options,
    suggested_next_state_previews: [],
    deferred_items: [...deferred_items],
    non_claims: [...non_claims],
    projection_notes: [
      "Single-cell operator console state transition remains a bounded reseed scaffold only.",
      "Transition previews derive next-state seeds from current page/bootstrap truth without mutating runtime or dispatching execution.",
      "State transition scaffold stays operator-facing only and does not introduce provider, channel, secretary, or multi-cell behavior.",
    ],
  };

  scaffold.suggested_next_state_previews =
    build_suggested_next_state_previews(scaffold);

  return scaffold;
}
