import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellContinuityReference,
  SingleCellContinuityReloadMode,
  SingleCellContinuityReloadPresentation,
  SingleCellContinuityReloadPresentationState,
} from "./single-cell-continuity-reload-presentation-contract.ts";

function sort_items(values: readonly string[]): string[] {
  return [...values].sort();
}

function equal_string_lists(
  left: readonly string[],
  right: readonly string[]
): boolean {
  const sorted_left = sort_items(left);
  const sorted_right = sort_items(right);

  if (sorted_left.length !== sorted_right.length) {
    return false;
  }

  return sorted_left.every((value, index) => value === sorted_right[index]);
}

function derive_continuity_mode(input: {
  presentation_state: SingleCellContinuityReloadPresentationState;
  runtime_mode: BaselineShellSession["runtime"]["mode"];
}): SingleCellContinuityReloadMode {
  if (input.presentation_state === "same_session_continued") {
    return "same_session_continued";
  }

  if (input.presentation_state === "fresh_reload_resumed") {
    return "fresh_reload_resumed";
  }

  return input.runtime_mode === "sqlite"
    ? "sqlite_first_load"
    : "memory_first_load";
}

function build_identity_notes(input: {
  reference?: SingleCellContinuityReference;
  shell_session: BaselineShellSession;
}): string[] {
  const { reference, shell_session } = input;

  if (!reference) {
    return [
      "No previous continuity reference is present for identity comparison.",
      "Current single-cell identity is presented as the initial bounded load.",
    ];
  }

  return [
    reference.crew_id === shell_session.shell.crew.crew_id
      ? "Crew identity remains stable against the previous bounded reference."
      : "Crew identity differs from the previous bounded reference.",
    reference.objective_id === shell_session.shell.objective.objective_id
      ? "Objective identity remains stable against the previous bounded reference."
      : "Objective identity differs from the previous bounded reference.",
  ];
}

function build_work_continuity_notes(input: {
  reference?: SingleCellContinuityReference;
  shell_session: BaselineShellSession;
}): string[] {
  const { reference, shell_session } = input;
  const objective_anchor_compare =
    shell_session.shell.continuity.objective_anchor_compare;

  return [
    ...shell_session.shell.continuity.notes,
    !reference
      ? "No previous continuity reference is present for work-item identity comparison."
      : equal_string_lists(
            reference.work_item_ids,
            shell_session.shell.work_items.map((work_item) => work_item.work_item_id)
          )
        ? "Work-item identity remains stable against the previous bounded reference."
        : "Work-item identity differs from the previous bounded reference.",
    objective_anchor_compare
      ? objective_anchor_compare.anchor_present
        ? "Objective anchor compare is available in the current runtime context."
        : "Objective anchor compare is available but reports no anchor in the current runtime context."
      : "Objective anchor compare is not available on this presentation.",
  ];
}

function build_reload_notes(input: {
  presentation_state: SingleCellContinuityReloadPresentationState;
  runtime_mode: BaselineShellSession["runtime"]["mode"];
}): string[] {
  const { presentation_state, runtime_mode } = input;

  if (presentation_state === "first_load") {
    return [
      `Current operator console view is the initial ${runtime_mode} bootstrap presentation.`,
    ];
  }

  if (presentation_state === "same_session_continued") {
    return [
      "Current operator console view continues inside the same runtime context.",
      "Same-session continuity does not imply fresh-process reload or durable event timelines.",
    ];
  }

  return [
    "Current operator console view is presented from a fresh runtime context reload.",
    "Fresh reload presentation does not imply that every in-session continuity signal persisted.",
  ];
}

export interface AssembleSingleCellContinuityReloadPresentationInput {
  baseline_shell_session: BaselineShellSession;
  presentation_state?: SingleCellContinuityReloadPresentationState;
  reference?: SingleCellContinuityReference;
}

export function createSingleCellContinuityReference(
  shell_session: BaselineShellSession
): SingleCellContinuityReference {
  return {
    project_id: shell_session.shell.project_id,
    crew_id: shell_session.shell.crew.crew_id,
    objective_id: shell_session.shell.objective.objective_id,
    work_item_ids: shell_session.shell.work_items.map(
      (work_item) => work_item.work_item_id
    ),
  };
}

export function assembleSingleCellContinuityReloadPresentation(
  input: AssembleSingleCellContinuityReloadPresentationInput
): SingleCellContinuityReloadPresentation {
  const presentation_state = input.presentation_state ?? "first_load";
  const runtime_mode = input.baseline_shell_session.runtime.mode;
  const continuity_mode = derive_continuity_mode({
    presentation_state,
    runtime_mode,
  });
  const reference = input.reference;
  const current_work_item_ids = input.baseline_shell_session.shell.work_items.map(
    (work_item) => work_item.work_item_id
  );
  const objective_anchor_compare =
    input.baseline_shell_session.shell.continuity.objective_anchor_compare;
  const presentation_id = `${input.baseline_shell_session.shell.project_id}-continuity-reload-presentation`;
  const deferred_items = [
    "event_timeline_persistence",
    "process_resume_lineage",
    "channel_session_reentry",
    "secretary_or_portfolio_resume_handoff",
  ];
  const non_claims = [
    "no_full_event_timeline_persistence",
    "no_provider_or_channel_resume_behavior",
    "no_secretary_resume_surface",
    "no_multi_cell_portfolio_resume_state",
    "no_runtime_complete_workflow_resume",
  ];

  return {
    presentation_id,
    presentation_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "continuity_reload_presentation",
    execution_boundary: "presentation_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    bootstrap_mode: presentation_state,
    continuity_mode,
    persisted_identity_continuity: {
      previous_reference_available: Boolean(reference),
      current_project_id: input.baseline_shell_session.shell.project_id,
      current_crew_id: input.baseline_shell_session.shell.crew.crew_id,
      current_objective_id: input.baseline_shell_session.shell.objective.objective_id,
      project_id_stable: reference
        ? reference.project_id === input.baseline_shell_session.shell.project_id
        : true,
      crew_id_stable: reference
        ? reference.crew_id === input.baseline_shell_session.shell.crew.crew_id
        : true,
      objective_id_stable: reference
        ? reference.objective_id ===
          input.baseline_shell_session.shell.objective.objective_id
        : true,
      notes: build_identity_notes({
        reference,
        shell_session: input.baseline_shell_session,
      }),
    },
    persisted_work_objective_continuity: {
      previous_reference_available: Boolean(reference),
      current_objective_id:
        input.baseline_shell_session.shell.objective.objective_id,
      current_work_item_ids,
      objective_id_stable: reference
        ? reference.objective_id ===
          input.baseline_shell_session.shell.objective.objective_id
        : true,
      work_item_identity_stable: reference
        ? equal_string_lists(reference.work_item_ids, current_work_item_ids)
        : true,
      memory_summary_count:
        input.baseline_shell_session.shell.memory_summaries.length,
      preference_continuity_visible:
        input.baseline_shell_session.shell.memory_summaries.some(
          (summary) =>
            typeof summary.preference_summary === "string" ||
            typeof summary.recent_correction_summary === "string"
        ),
      objective_anchor_compare_available:
        typeof objective_anchor_compare !== "undefined",
      objective_anchor_present:
        objective_anchor_compare?.anchor_present ?? false,
      notes: build_work_continuity_notes({
        reference,
        shell_session: input.baseline_shell_session,
      }),
    },
    session_reload_distinction: {
      is_first_load: presentation_state === "first_load",
      is_same_session_continued:
        presentation_state === "same_session_continued",
      is_fresh_reload_resumed:
        presentation_state === "fresh_reload_resumed",
      runtime_mode,
      same_session_runtime_context:
        presentation_state === "same_session_continued",
      fresh_runtime_context:
        presentation_state === "fresh_reload_resumed",
      notes: build_reload_notes({
        presentation_state,
        runtime_mode,
      }),
    },
    deferred_items: [...deferred_items],
    non_claims: [...non_claims],
    projection_notes: [
      "Single-cell continuity/reload presentation remains a bounded operator-facing presentation scaffold only.",
      "Continuity presentation reuses current shell/runtime truth without claiming runtime-complete resume semantics.",
      "Presentation distinguishes first load, same-session continuation, and fresh reload truth without introducing provider, channel, secretary, or portfolio behavior.",
    ],
  };
}
