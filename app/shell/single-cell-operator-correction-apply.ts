import {
  applyUserCorrectionAndAssemble,
} from "../../projection/assembly/flow-assembly.ts";
import type { BaselineShellSession } from "./create-baseline-shell.ts";
import { loadBaselineShell } from "./load-baseline-shell.ts";
import type {
  SingleCellCorrectionReviewInteraction,
  SingleCellCorrectionReviewTargetScopeHint,
} from "./single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorCorrectionApplyCurrentTruth,
  SingleCellOperatorCorrectionApplyInput,
  SingleCellOperatorCorrectionApplyRequest,
  SingleCellOperatorCorrectionApplyScaffold,
  SingleCellOperatorCorrectionApplySummarySource,
  SingleCellOperatorCorrectionApplyTarget,
  SingleCellOperatorCorrectionApplyUnavailableSurface,
  SingleCellOperatorCorrectionApplyUpdatedTruth,
} from "./single-cell-operator-correction-apply-contract.ts";
import type {
  SingleCellOperatorInSessionDraftStateScaffold,
} from "./single-cell-operator-in-session-draft-state-contract.ts";
import type {
  SingleCellOperatorRequestPackageScaffold,
} from "./single-cell-operator-request-package-contract.ts";
import type {
  SingleCellOperatorRequestReviewSubmitPreviewScaffold,
} from "./single-cell-operator-request-review-submit-preview-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function pick_target_scope_hint(input: {
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  request?: SingleCellOperatorCorrectionApplyRequest;
}): SingleCellCorrectionReviewTargetScopeHint {
  const {
    correction_review_interaction,
    request,
  } = input;

  return (
    correction_review_interaction.target_scope_hints.find(
      (hint) => hint.target_scope === request?.target_scope
    ) ??
    correction_review_interaction.target_scope_hints.find(
      (hint) =>
        hint.target_scope ===
        correction_review_interaction.correction_input_seed
          .suggested_target_scope
    ) ??
    correction_review_interaction.target_scope_hints[0]
  );
}

function build_current_apply_target(
  target_scope_hint: SingleCellCorrectionReviewTargetScopeHint
): SingleCellOperatorCorrectionApplyTarget {
  return {
    target_scope: target_scope_hint.target_scope,
    display_label: target_scope_hint.display_label,
    target_ref_id: target_scope_hint.target_ref_id,
    support_level: target_scope_hint.support_level,
    runtime_mapping_target: target_scope_hint.runtime_mapping_target,
    notes: [...target_scope_hint.notes],
  };
}

function derive_correction_summary(
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold
): {
  correction_summary?: string;
  correction_summary_source: SingleCellOperatorCorrectionApplySummarySource;
  operator_input_ready: boolean;
  notes: string[];
} {
  const { current_session_draft_values } = in_session_draft_state_scaffold;
  const correction_text =
    current_session_draft_values.correction_text_draft_value;
  const review_request =
    current_session_draft_values.review_request_draft_value;

  if (
    correction_text.is_operator_authored &&
    correction_text.value_presence === "present_in_session"
  ) {
    return {
      correction_summary: correction_text.current_value,
      correction_summary_source: "correction_text_draft",
      operator_input_ready: true,
      notes: [...correction_text.notes],
    };
  }

  if (
    review_request.is_operator_authored &&
    review_request.value_presence === "present_in_session"
  ) {
    return {
      correction_summary: review_request.current_value,
      correction_summary_source: "review_request_draft",
      operator_input_ready: true,
      notes: [...review_request.notes],
    };
  }

  return {
    correction_summary_source: "absent",
    operator_input_ready: false,
    notes: [
      "No operator-authored correction or review-request draft is currently present in session state.",
    ],
  };
}

function derive_corrected_value(input: {
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold;
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
}): {
  corrected_value: string;
  corrected_value_source:
    SingleCellOperatorCorrectionApplyInput["corrected_value_source"];
  selected_action_intent_kind?: SingleCellOperatorCorrectionApplyInput["selected_action_intent_kind"];
  notes: string[];
} {
  const {
    in_session_draft_state_scaffold,
    request_package_scaffold,
    correction_review_interaction,
  } = input;
  const selected_action_intent_draft =
    in_session_draft_state_scaffold.current_session_draft_values
      .selected_action_intent_draft_value;
  const request_package_action_intent =
    request_package_scaffold.current_request_package.selected_action_intent;

  if (
    selected_action_intent_draft.is_operator_authored &&
    selected_action_intent_draft.value_presence === "present_in_session" &&
    selected_action_intent_draft.current_value
  ) {
    return {
      corrected_value: selected_action_intent_draft.current_value,
      corrected_value_source: "selected_action_intent_draft",
      selected_action_intent_kind:
        selected_action_intent_draft.current_value,
      notes: [...selected_action_intent_draft.notes],
    };
  }

  if (request_package_action_intent) {
    return {
      corrected_value: request_package_action_intent.intent_kind,
      corrected_value_source: "request_package_selected_action_intent",
      selected_action_intent_kind:
        request_package_action_intent.intent_kind,
      notes: [...request_package_action_intent.notes],
    };
  }

  return {
    corrected_value:
      correction_review_interaction.review_intent_seed.default_review_intent,
    corrected_value_source: "review_intent_default",
    notes: [
      "No action-intent draft or packaged action intent is available, so corrected value falls back to the current default review intent.",
    ],
  };
}

function build_current_apply_input(input: {
  in_session_draft_state_scaffold: SingleCellOperatorInSessionDraftStateScaffold;
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
}): SingleCellOperatorCorrectionApplyInput {
  const {
    in_session_draft_state_scaffold,
    request_package_scaffold,
    request_review_submit_preview_scaffold,
    correction_review_interaction,
  } = input;
  const correction_summary = derive_correction_summary(
    in_session_draft_state_scaffold
  );
  const corrected_value = derive_corrected_value({
    in_session_draft_state_scaffold,
    request_package_scaffold,
    correction_review_interaction,
  });

  return {
    correction_summary: correction_summary.correction_summary,
    correction_summary_source:
      correction_summary.correction_summary_source,
    corrected_value: corrected_value.corrected_value,
    corrected_value_source:
      corrected_value.corrected_value_source,
    operator_input_ready: correction_summary.operator_input_ready,
    current_review_intent:
      request_package_scaffold.current_request_package
        .correction_review_target.review_intent,
    request_submit_preview_status:
      request_review_submit_preview_scaffold.submit_preview_status,
    selected_action_intent_kind:
      corrected_value.selected_action_intent_kind,
    notes: [
      ...correction_summary.notes,
      ...corrected_value.notes,
      `Current request submit-preview status is ${request_review_submit_preview_scaffold.submit_preview_status}.`,
    ],
  };
}

function build_current_visible_truth(
  baseline_shell_session: BaselineShellSession
): SingleCellOperatorCorrectionApplyCurrentTruth {
  const { shell } = baseline_shell_session;

  return {
    current_memory_summary_count: shell.memory_summaries.length,
    current_preference_continuity_visible: shell.memory_summaries.some(
      (summary) => typeof summary.preference_summary === "string"
    ),
    current_recent_correction_visible: shell.memory_summaries.some(
      (summary) => typeof summary.recent_correction_summary === "string"
    ),
    current_review_strip_changed_preferences_count:
      shell.review_strip.changed_preferences.length,
    current_review_strip_needs_decision_count:
      shell.review_strip.needs_decision.length,
    current_continuity_notes: [...shell.continuity.notes],
  };
}

function build_unavailable_apply_surfaces():
  SingleCellOperatorCorrectionApplyUnavailableSurface[] {
  return [
    {
      surface_id: "provider_backed_correction_apply",
      display_label: "Provider-backed correction apply",
      reason:
        "Console-side correction apply does not trigger provider execution or rerun behavior in this wave.",
    },
    {
      surface_id: "channel_routed_correction_handoff",
      display_label: "Channel-routed correction handoff",
      reason:
        "Console-side correction apply does not hand corrections into channel routing in this wave.",
    },
    {
      surface_id: "multi_cell_correction_routing",
      display_label: "Multi-cell correction routing",
      reason:
        "The correction/apply path remains single-cell only and does not route across a portfolio.",
    },
    {
      surface_id: "secretary_correction_routing",
      display_label: "Secretary correction routing",
      reason:
        "No secretary layer receives or triages console-side correction/apply requests.",
    },
    {
      surface_id: "persistent_correction_apply_timeline",
      display_label: "Persistent correction/apply timeline",
      reason:
        "Current repo truth does not provide a persisted correction/apply timeline across sessions.",
    },
  ];
}

function build_updated_truth(input: {
  baseline_shell_session: BaselineShellSession;
  current_apply_target: SingleCellOperatorCorrectionApplyTarget;
  current_apply_input: SingleCellOperatorCorrectionApplyInput;
}): SingleCellOperatorCorrectionApplyUpdatedTruth {
  const {
    baseline_shell_session,
    current_apply_target,
    current_apply_input,
  } = input;
  const correction_result = applyUserCorrectionAndAssemble(
    baseline_shell_session.runtime,
    {
      project_id: baseline_shell_session.runtime.project_id,
      correction_source:
        "user",
      correction_target: current_apply_target.runtime_mapping_target,
      correction_summary:
        current_apply_input.correction_summary ?? "",
      corrected_value: current_apply_input.corrected_value,
      objective_id:
        current_apply_target.runtime_mapping_target === "objective" ||
          current_apply_target.runtime_mapping_target === "execution"
          ? baseline_shell_session.runtime.seeded_ids.objective_id
          : undefined,
      preference_profile_id:
        current_apply_target.runtime_mapping_target === "preference"
          ? baseline_shell_session.runtime.seeded_ids.preference_profile_id
          : baseline_shell_session.runtime.seeded_ids.preference_profile_id,
      target_ref_id: current_apply_target.target_ref_id,
      metadata: {
        current_review_intent: current_apply_input.current_review_intent,
        request_submit_preview_status:
          current_apply_input.request_submit_preview_status,
        correction_summary_source:
          current_apply_input.correction_summary_source,
        corrected_value_source:
          current_apply_input.corrected_value_source,
        selected_action_intent_kind:
          current_apply_input.selected_action_intent_kind,
        console_apply_path: true,
      },
    }
  );
  const updated_shell = loadBaselineShell(
    baseline_shell_session.runtime
  ).shell;
  const updated_preference_summary = correction_result.memory_summaries.find(
    (summary) => typeof summary.preference_summary === "string"
  )?.preference_summary;
  const updated_recent_correction_summary =
    correction_result.memory_summaries.find(
      (summary) =>
        summary.recent_correction_summary ===
        correction_result.correction.correction_summary
    )?.recent_correction_summary;

  return {
    correction_id: correction_result.correction.correction_id,
    correction_target: current_apply_target.runtime_mapping_target,
    correction_summary: correction_result.correction.correction_summary,
    corrected_value: correction_result.correction.corrected_value,
    writeback_disposition: correction_result.writeback.disposition,
    updated_memory_summary_count:
      correction_result.memory_summaries.length,
    updated_preference_continuity_visible:
      updated_shell.memory_summaries.some(
        (summary) => typeof summary.preference_summary === "string"
      ),
    updated_recent_correction_visible_in_session:
      correction_result.memory_summaries.some(
        (summary) =>
          summary.recent_correction_summary ===
          correction_result.correction.correction_summary
      ),
    updated_review_strip_changed_preferences_count:
      correction_result.review_strip.changed_preferences.length,
    updated_review_strip_needs_decision_count:
      correction_result.review_strip.needs_decision.length,
    updated_preference_summary,
    updated_recent_correction_summary,
    updated_anchor_present:
      updated_shell.continuity.objective_anchor_compare.anchor_present,
    updated_continuity_notes: [...updated_shell.continuity.notes],
  };
}

export interface AssembleSingleCellOperatorCorrectionApplyScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  correction_review_interaction: SingleCellCorrectionReviewInteraction;
  in_session_draft_state_scaffold:
    SingleCellOperatorInSessionDraftStateScaffold;
  request_package_scaffold: SingleCellOperatorRequestPackageScaffold;
  request_review_submit_preview_scaffold:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
  request?: SingleCellOperatorCorrectionApplyRequest;
}

export function assembleSingleCellOperatorCorrectionApplyScaffold(
  input: AssembleSingleCellOperatorCorrectionApplyScaffoldInput
): SingleCellOperatorCorrectionApplyScaffold {
  const {
    baseline_shell_session,
    correction_review_interaction,
    in_session_draft_state_scaffold,
    request_package_scaffold,
    request_review_submit_preview_scaffold,
    request,
  } = input;
  const current_apply_target = build_current_apply_target(
    pick_target_scope_hint({
      correction_review_interaction,
      request,
    })
  );
  const current_apply_input = build_current_apply_input({
    in_session_draft_state_scaffold,
    request_package_scaffold,
    request_review_submit_preview_scaffold,
    correction_review_interaction,
  });
  const current_visible_truth = build_current_visible_truth(
    baseline_shell_session
  );
  const unavailable_apply_surfaces = build_unavailable_apply_surfaces();
  const applied_update_result =
    request?.apply_now && current_apply_input.operator_input_ready
      ? build_updated_truth({
          baseline_shell_session,
          current_apply_target,
          current_apply_input,
        })
      : undefined;

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-operator-correction-apply`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_correction_apply_path",
    execution_boundary: "console_apply_path_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_apply_status: applied_update_result
      ? "applied_in_session"
      : current_apply_input.operator_input_ready
        ? "available_now"
        : "blocked_missing_operator_input",
    current_apply_target,
    current_apply_input,
    current_visible_truth,
    applied_update_result,
    unavailable_apply_surfaces,
    deferred_items: unique_items([
      ...correction_review_interaction.deferred_items,
      "fresh_reload_session_draft_restore",
    ]),
    non_claims: unique_items([
      "no_provider_backed_correction_apply",
      "no_channel_correction_apply_handoff",
      "no_multi_cell_correction_apply_routing",
      "no_secretary_correction_apply_routing",
      "no_persistent_correction_apply_timeline",
      "no_runtime_complete_correction_apply_workflow",
      ...correction_review_interaction.non_claims,
    ]),
    projection_notes: [
      "Console-side correction/apply reuses the sealed v0.1 bounded correction capture and preference writeback helper path.",
      "The apply path consumes current correction/review, draft, and request-package truth without inventing a parallel mutation engine.",
      "Apply remains single-cell only, operator-facing only, and does not introduce provider execution, channel routing, secretary behavior, portfolio behavior, or runtime-complete workflow state.",
      ...(request?.apply_now && !current_apply_input.operator_input_ready
        ? [
            "An apply attempt was requested, but current session truth did not include operator-authored correction input.",
          ]
        : []),
    ],
  };
}
