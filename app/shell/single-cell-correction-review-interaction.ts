import type {
  SingleCellStructuralAssemblyPackage,
} from "../../projection/contracts/single-cell-assembly-contract.ts";
import type { WorkItem } from "../../projection/objects/work-item.ts";
import type {
  BaselineShellSession,
} from "./create-baseline-shell.ts";
import type {
  SingleCellOperatorConsoleShell,
} from "./single-cell-operator-console-shell-contract.ts";
import type {
  SingleCellCorrectionReviewInteraction,
  SingleCellCorrectionReviewTargetScopeHint,
  SingleCellReviewIntent,
} from "./single-cell-correction-review-interaction-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function pick_primary_work_item(work_items: readonly WorkItem[]): WorkItem {
  return (
    work_items.find((work_item) => work_item.status === "blocked") ??
    work_items.find((work_item) => work_item.status === "active") ??
    work_items[0]
  );
}

function build_target_scope_hints(input: {
  baseline_shell_session: BaselineShellSession;
  console_shell: SingleCellOperatorConsoleShell;
}): SingleCellCorrectionReviewTargetScopeHint[] {
  const { baseline_shell_session, console_shell } = input;
  const primary_work_item = pick_primary_work_item(
    baseline_shell_session.shell.work_items
  );

  return [
    {
      target_scope: "objective",
      display_label: baseline_shell_session.shell.objective.title,
      target_ref_id: baseline_shell_session.shell.objective.objective_id,
      support_level: "bounded_now",
      runtime_mapping_target: "objective",
      notes: [
        "Objective correction is supported through bounded correction capture.",
        "Preference writeback may update review-facing summaries after reassembly.",
      ],
    },
    {
      target_scope: "work-item",
      display_label: primary_work_item.title,
      target_ref_id: primary_work_item.work_item_id,
      support_level: "bounded_mapping_only",
      runtime_mapping_target: "execution",
      notes: [
        "Work-item correction currently maps to a bounded execution-style target reference.",
        "This does not claim a full work-item review workflow or persistent review timeline.",
      ],
    },
    {
      target_scope: "crew",
      display_label: baseline_shell_session.shell.crew.display_name,
      target_ref_id: baseline_shell_session.shell.crew.crew_id,
      support_level: "bounded_mapping_only",
      runtime_mapping_target: "preference",
      notes: [
        "Crew-level correction currently narrows to shared preference writeback hints.",
        "This does not mutate crew topology or create a multi-actor review queue.",
      ],
    },
    {
      target_scope: "continuity-note",
      display_label: console_shell.memory_continuity_overview.continuity_note,
      target_ref_id: console_shell.memory_continuity_overview.anchor_ref_id,
      support_level: "bounded_mapping_only",
      runtime_mapping_target: "preference",
      notes: [
        "Continuity-note feedback currently maps to bounded preference context.",
        "This does not create a persistent review timeline or full evidence graph edit path.",
      ],
    },
  ];
}

function build_supported_writeback_hints(
  session_mode: BaselineShellSession["runtime"]["mode"]
): string[] {
  const persistence_hint =
    session_mode === "sqlite"
      ? "Preference writeback can be reloaded where sqlite-backed state truth persists."
      : "Preference writeback remains scoped to the current in-memory runtime session.";

  return [
    persistence_hint,
    "Bounded correction capture can be recorded against one current target reference.",
    "Preference writeback can update the current preference profile.",
    "Memory summaries can reflect the latest bounded correction after reassembly.",
    "Review strip can surface changed preference signals after writeback.",
  ];
}

function build_default_review_intent(
  console_shell: SingleCellOperatorConsoleShell
): SingleCellReviewIntent {
  if (console_shell.objective_overview.blocked_work_count > 0) {
    return "flag_blocker";
  }

  return "tighten_scope";
}

export interface AssembleSingleCellCorrectionReviewInteractionInput {
  baseline_shell_session: BaselineShellSession;
  structural_assembly: SingleCellStructuralAssemblyPackage;
  console_shell: SingleCellOperatorConsoleShell;
}

export function assembleSingleCellCorrectionReviewInteraction(
  input: AssembleSingleCellCorrectionReviewInteractionInput
): SingleCellCorrectionReviewInteraction {
  const { baseline_shell_session, structural_assembly, console_shell } = input;
  const target_scope_hints = build_target_scope_hints({
    baseline_shell_session,
    console_shell,
  });
  const default_review_intent = build_default_review_intent(console_shell);
  const deferred_items = [
    "persistent_review_timeline",
    "provider_backed_rerun_after_correction",
    "channel_routed_review_handoff",
    "multi_step_approval_workflow",
  ];
  const non_claims = [
    "no_execution_complete_correction_workflow",
    "no_persistent_review_timeline",
    "no_provider_backed_rerun",
    "no_channel_review_routing",
    "no_multi_cell_review_queue",
    "no_secretary_review_inbox",
  ];

  return {
    interaction_id: `${structural_assembly.assembly_id}-correction-review-interaction`,
    interaction_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "correction_review_scaffold",
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
    correction_input_seed: {
      supported_capture_source: "user",
      summary_placeholder:
        "Tighten the current delivery or review signal in one bounded sentence.",
      corrected_value_placeholder:
        "smaller-reviewable-delivery-shape",
      suggested_target_scope: "objective",
      suggested_runtime_target: "objective",
      suggested_target_ref_id:
        baseline_shell_session.shell.objective.objective_id,
      preference_profile_id:
        baseline_shell_session.runtime.seeded_ids.preference_profile_id,
    },
    review_intent_seed: {
      review_posture:
        structural_assembly.constitution_state.delivery_contract.review_posture,
      supported_review_intents: [
        "tighten_scope",
        "flag_blocker",
        "clarify_preference",
        "request_recheck",
      ],
      default_review_intent,
      notes: [
        "Review intent is operator-facing only in this scaffold.",
        "Intent selection does not yet trigger automated reruns or approval workflows.",
      ],
    },
    target_scope_hints,
    expected_outcome_hints: {
      supported_writeback_hints: build_supported_writeback_hints(
        baseline_shell_session.runtime.mode
      ),
      deferred_outcome_hints: [...deferred_items],
    },
    deferred_items: [...deferred_items],
    non_claims: [...non_claims],
    projection_notes: [
      "Single-cell correction/review interaction remains a bounded scaffold only.",
      "Current interaction truth reuses bounded correction capture and preference writeback surfaces without claiming a full review engine.",
      "Interaction stays operator-facing only and does not introduce provider or channel execution behavior.",
    ],
  };
}
