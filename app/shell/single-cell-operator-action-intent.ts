import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellContinuityReloadPresentation,
} from "./single-cell-continuity-reload-presentation-contract.ts";
import type {
  SingleCellCorrectionReviewInteraction,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorActionIntentConstraintHint,
  SingleCellOperatorActionIntentScaffold,
  SingleCellOperatorActionIntentSeed,
  SingleCellOperatorActionIntentUnavailableSurface,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellTaskFocusInteraction,
} from "./single-cell-task-focus-interaction-contract.ts";

function build_current_action_context(input: {
  baseline_shell_session: BaselineShellSession;
  continuity_reload_presentation: SingleCellContinuityReloadPresentation;
  task_focus_interaction: SingleCellTaskFocusInteraction;
}): SingleCellOperatorActionIntentScaffold["current_action_context"] {
  const {
    baseline_shell_session,
    continuity_reload_presentation,
    task_focus_interaction,
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
    continuity_mode: continuity_reload_presentation.continuity_mode,
    blocked_work_count: baseline_shell_session.shell.work_items.filter(
      (work_item) => work_item.status === "blocked"
    ).length,
  };
}

function build_available_action_intent_seeds(input: {
  baseline_shell_session: BaselineShellSession;
  continuity_reload_presentation: SingleCellContinuityReloadPresentation;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  task_focus_interaction: SingleCellTaskFocusInteraction;
  current_action_context: SingleCellOperatorActionIntentScaffold["current_action_context"];
}): SingleCellOperatorActionIntentSeed[] {
  const {
    baseline_shell_session,
    continuity_reload_presentation,
    correction_review_interaction,
    task_focus_interaction,
    current_action_context,
  } = input;
  const focus_switch_available =
    task_focus_interaction.focus_switch_intent_seeds.some(
      (seed) => seed.target_kind === "work-item"
    );
  const reprioritize_support =
    baseline_shell_session.shell.work_items.length > 1
      ? "bounded_mapping_only"
      : "current_truth_only";
  const resume_or_defer_label =
    current_action_context.blocked_work_count > 0
      ? "Resume blocked work or defer with an operator note"
      : "Resume current work or defer intentionally";

  return [
    {
      intent_id: `${baseline_shell_session.runtime.project_id}-intent-refine-objective`,
      intent_kind: "refine_objective",
      display_label: "Refine objective scope",
      support_level: "bounded_mapping_only",
      suggested_surface: "correction_review",
      target_ref_id: baseline_shell_session.shell.objective.objective_id,
      target_label: baseline_shell_session.shell.objective.title,
      notes: [
        "Objective refinement currently routes through bounded correction/review wording rather than a dedicated objective editor.",
        `Default review intent is ${correction_review_interaction.review_intent_seed.default_review_intent}.`,
      ],
    },
    {
      intent_id: `${baseline_shell_session.runtime.project_id}-intent-reprioritize-work-item`,
      intent_kind: "reprioritize_work_item",
      display_label: "Reprioritize current work item",
      support_level: reprioritize_support,
      suggested_surface: "work_item_execution_overview",
      target_ref_id: task_focus_interaction.current_work_item_focus.work_item_id,
      target_label:
        task_focus_interaction.current_work_item_focus.work_item_label,
      notes: [
        "Work-item reprioritization remains a bounded hint derived from current work-item truth.",
        "This does not persist ordering changes or create a runtime scheduling engine.",
      ],
    },
    {
      intent_id: `${baseline_shell_session.runtime.project_id}-intent-shift-task-focus`,
      intent_kind: "shift_task_focus",
      display_label: "Shift task focus",
      support_level: focus_switch_available
        ? "scaffold_ready_now"
        : "current_truth_only",
      suggested_surface: "task_focus",
      target_ref_id: task_focus_interaction.current_work_item_focus.work_item_id,
      target_label:
        task_focus_interaction.current_work_item_focus.work_item_label,
      notes: [
        "Task focus can be reseeded through the bounded task-focus scaffold.",
        "Focus shifting stays presentational and does not dispatch execution.",
      ],
    },
    {
      intent_id: `${baseline_shell_session.runtime.project_id}-intent-request-review`,
      intent_kind: "request_review",
      display_label: "Request bounded review",
      support_level: "scaffold_ready_now",
      suggested_surface: "correction_review",
      target_ref_id: baseline_shell_session.shell.objective.objective_id,
      target_label:
        correction_review_interaction.review_intent_seed.default_review_intent,
      notes: [
        "Request review is supported as an operator-facing intent seed only.",
        "Review remains bounded and does not imply approval queues or provider reruns.",
      ],
    },
    {
      intent_id: `${baseline_shell_session.runtime.project_id}-intent-apply-correction`,
      intent_kind: "apply_correction",
      display_label: "Apply bounded correction",
      support_level: "scaffold_ready_now",
      suggested_surface: "correction_review",
      target_ref_id:
        correction_review_interaction.correction_input_seed.suggested_target_ref_id,
      target_label:
        correction_review_interaction.correction_input_seed.suggested_target_scope,
      notes: [
        "Correction can be captured against one current target reference through the existing bounded correction scaffold.",
        "Writeback effects remain limited to current authorized preference and summary truth.",
      ],
    },
    {
      intent_id: `${baseline_shell_session.runtime.project_id}-intent-resume-or-defer`,
      intent_kind: "resume_or_defer_hint",
      display_label: resume_or_defer_label,
      support_level: "current_truth_only",
      suggested_surface: "continuity_reload",
      target_ref_id: task_focus_interaction.current_work_item_focus.work_item_id,
      target_label:
        continuity_reload_presentation.continuity_mode,
      notes: [
        `Current continuity mode is ${continuity_reload_presentation.continuity_mode}.`,
        "Resume/defer remains an operator-facing hint and not a persisted workflow command.",
      ],
    },
  ];
}

function build_current_constraint_hints(input: {
  current_action_context: SingleCellOperatorActionIntentScaffold["current_action_context"];
}): SingleCellOperatorActionIntentConstraintHint[] {
  const { current_action_context } = input;
  const hints: SingleCellOperatorActionIntentConstraintHint[] = [
    {
      constraint_id: "single-cell-only-scope",
      display_label: "Action intents stay inside one single-cell operator surface.",
      source_surface: "truth_boundary",
      notes: [
        "No portfolio routing or cross-cell action coordination is available in this scaffold.",
      ],
    },
    {
      constraint_id: "no-provider-backed-execution",
      display_label: "Provider-backed action execution is unavailable.",
      source_surface: "truth_boundary",
      notes: [
        "Current intents describe next moves without dispatching provider or runtime-complete actions.",
      ],
    },
    {
      constraint_id: "no-persistent-action-timeline",
      display_label: "Action-intent timelines are not persisted.",
      source_surface: "continuity_reload",
      notes: [
        "Fresh reload can preserve bounded identities and some persisted state, but not a full action timeline.",
      ],
    },
  ];

  if (current_action_context.blocked_work_count > 0) {
    hints.push({
      constraint_id: "blocked-work-visible",
      display_label: "Blocked work is visible and constrains next-action posture.",
      source_surface: "work_item_execution_overview",
      notes: [
        "Blocked work can inform next operator intent selection without implying autonomous recovery execution.",
      ],
    });
  }

  if (current_action_context.continuity_mode === "fresh_reload_resumed") {
    hints.push({
      constraint_id: "fresh-reload-runtime-context",
      display_label:
        "Fresh reload resumes bounded persisted truth without same-session runtime context.",
      source_surface: "continuity_reload",
      notes: [
        "Action-intent suggestions remain honest about missing same-session event history after reload.",
      ],
    });
  }

  return hints;
}

function build_unavailable_action_surfaces(): SingleCellOperatorActionIntentUnavailableSurface[] {
  return [
    {
      surface_id: "provider-execution",
      display_label: "Provider-backed execution",
      reason:
        "Action intents do not trigger provider bridges or autonomous execution in this wave.",
    },
    {
      surface_id: "channel-entry",
      display_label: "Channel-routed actions",
      reason:
        "No channel entry or channel-side action routing is available in the single-cell console scaffold.",
    },
    {
      surface_id: "portfolio-secretary-routing",
      display_label: "Portfolio or secretary action routing",
      reason:
        "Action intents remain single-cell only and do not surface secretary or multi-cell coordination.",
    },
    {
      surface_id: "persistent-action-timeline",
      display_label: "Persistent action timeline",
      reason:
        "The current repo truth does not provide a persisted operator action-intent timeline across sessions.",
    },
  ];
}

export interface AssembleSingleCellOperatorActionIntentScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  continuity_reload_presentation: SingleCellContinuityReloadPresentation;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  task_focus_interaction: SingleCellTaskFocusInteraction;
}

export function assembleSingleCellOperatorActionIntentScaffold(
  input: AssembleSingleCellOperatorActionIntentScaffoldInput
): SingleCellOperatorActionIntentScaffold {
  const {
    baseline_shell_session,
    continuity_reload_presentation,
    correction_review_interaction,
    task_focus_interaction,
  } = input;
  const current_action_context = build_current_action_context({
    baseline_shell_session,
    continuity_reload_presentation,
    task_focus_interaction,
  });

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-action-intent`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_action_intent_scaffold",
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
    current_action_context,
    available_action_intent_seeds: build_available_action_intent_seeds({
      baseline_shell_session,
      continuity_reload_presentation,
      correction_review_interaction,
      task_focus_interaction,
      current_action_context,
    }),
    current_constraint_hints: build_current_constraint_hints({
      current_action_context,
    }),
    unavailable_action_surfaces: build_unavailable_action_surfaces(),
    deferred_items: [
      "provider_backed_action_execution",
      "channel_routed_action_handoff",
      "persistent_action_intent_timeline",
      "multi_cell_action_routing",
      "secretary_managed_action_queue",
    ],
    non_claims: [
      "no_provider_backed_action_intent_execution",
      "no_channel_action_routing",
      "no_multi_cell_action_routing",
      "no_secretary_action_queue",
      "no_persistent_action_timeline",
      "no_runtime_complete_action_workflow",
    ],
    projection_notes: [
      "Operator action-intent scaffold derives next-step suggestions from existing task-focus, correction/review, and continuity truth.",
      "Action intents stay operator-facing only and do not become provider execution, channel routing, or runtime-complete workflow handling.",
    ],
  };
}
