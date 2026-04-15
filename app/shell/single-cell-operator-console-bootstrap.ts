import {
  assembleSingleCellContinuityReloadPresentation,
} from "./single-cell-continuity-reload-presentation.ts";
import type {
  SingleCellOperatorConsoleBootstrapContinuityOptions,
} from "./single-cell-operator-console-bootstrap-contract.ts";
import {
  applyDevDeliveryPackTemplateSeed,
  assembleDevDeliveryPackTemplateSeed,
} from "../../projection/assembly/dev-delivery-pack-template.ts";
import {
  initializeSingleCellStructuralAssembly,
  type InitializeSingleCellInput,
} from "../../projection/assembly/single-cell-initializer.ts";
import type {
  DevDeliveryPackTemplateSeed,
} from "../../projection/contracts/dev-delivery-pack-template-contract.ts";
import {
  composeSingleCellShellScaffold,
} from "../../projection/assembly/single-cell-shell-composer.ts";
import type { CrewMemberRole } from "../../projection/objects/crew-member.ts";
import type { WorkItem } from "../../projection/objects/work-item.ts";
import {
  assembleSingleCellDeliveryAcceptanceScaffold,
} from "./single-cell-delivery-acceptance.ts";
import {
  renderSingleCellOperatorConsolePage,
} from "../pages/single-cell-operator-console-page.ts";
import {
  assembleSingleCellOperatorActionIntentScaffold,
} from "./single-cell-operator-action-intent.ts";
import {
  assembleSingleCellOperatorInputDraftScaffold,
} from "./single-cell-operator-input-draft.ts";
import {
  assembleSingleCellOperatorRequestPackageScaffold,
} from "./single-cell-operator-request-package.ts";
import {
  assembleSingleCellOperatorRequestReviewSubmitPreviewScaffold,
} from "./single-cell-operator-request-review-submit-preview.ts";
import {
  assembleSingleCellCorrectionReviewInteraction,
} from "./single-cell-correction-review-interaction.ts";
import {
  assembleSingleCellOperatorConsoleStateTransitionScaffold,
} from "./single-cell-operator-console-state-transition.ts";
import {
  assembleSingleCellTaskFocusInteraction,
} from "./single-cell-task-focus-interaction.ts";
import {
  createBaselineShell,
  type BaselineShellSession,
  type CreateBaselineShellOptions,
} from "./create-baseline-shell.ts";
import {
  composeSingleCellOperatorConsoleShell,
} from "./single-cell-operator-console-shell.ts";
import {
  adaptSingleCellShellEntry,
} from "./single-cell-shell-entry-adapter.ts";
import {
  SINGLE_CELL_OPERATOR_CONSOLE_BOOTSTRAP_TRUTH_SOURCES,
  type SingleCellOperatorConsoleBootstrap,
} from "./single-cell-operator-console-bootstrap-contract.ts";

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

function count_work_items(
  work_items: readonly WorkItem[],
  status: WorkItem["status"]
): number {
  return work_items.filter((work_item) => work_item.status === status).length;
}

export interface SingleCellOperatorConsoleBootstrapStructuralOverrides {
  assembly_id?: string;
  cell_id?: string;
  operator_id?: string;
  business_scope?: string;
  delivery_target?: string;
  business_pack_mount_keys?: string[];
  metrics_pack_mount_keys?: string[];
  projection_notes?: string[];
}

export interface CreateSingleCellOperatorConsoleBootstrapOptions {
  baseline?: CreateBaselineShellOptions;
  baseline_shell_session?: BaselineShellSession;
  structural?: SingleCellOperatorConsoleBootstrapStructuralOverrides;
  template?: "dev_delivery_pack";
  continuity?: SingleCellOperatorConsoleBootstrapContinuityOptions;
}

function create_structural_seed_from_baseline_truth(
  options: CreateSingleCellOperatorConsoleBootstrapOptions
): {
  baseline_shell_session: ReturnType<typeof createBaselineShell>;
  structural_input: InitializeSingleCellInput;
  template_seed?: DevDeliveryPackTemplateSeed;
} {
  const baseline_shell_session =
    options.baseline_shell_session ?? createBaselineShell(options.baseline);
  const { structural } = options;
  const { shell } = baseline_shell_session;
  const active_work_count = count_work_items(shell.work_items, "active");
  const blocked_work_count = count_work_items(shell.work_items, "blocked");
  const required_role_keys = unique_items(
    shell.crew_members.map((crew_member) => crew_member.role)
  ) as CrewMemberRole[];
  const continuity_note = shell.continuity.notes.join(" ");
  const default_projection_notes = [
    "Single-cell operator console bootstrap derives bounded product structure from baseline shell runtime truth.",
    "Derived bootstrap structure remains product-owned and does not become upstream runtime law.",
    "Cell scope is projected from current single-project baseline truth for bounded operator-console bootstrapping only.",
  ];
  const template_seed =
    options.template === "dev_delivery_pack"
      ? assembleDevDeliveryPackTemplateSeed()
      : undefined;

  const structural_input: InitializeSingleCellInput = {
    assembly_id:
      structural?.assembly_id ??
      `${shell.project_id}-single-cell-operator-console-bootstrap`,
    cell_id: structural?.cell_id ?? shell.project_id,
    cell_name: shell.crew.display_name,
    operator_id:
      structural?.operator_id ?? `${shell.project_id}-operator`,
    mission: shell.crew.mission,
    business_scope: structural?.business_scope ?? shell.project_id,
    current_objective_id: shell.objective.objective_id,
    current_objective_headline: shell.objective.title,
    delivery_target:
      structural?.delivery_target ?? shell.objective.title,
    active_work_count,
    blocked_work_count,
    required_role_keys,
    continuity_note,
    business_pack_mount_keys: [
      ...(structural?.business_pack_mount_keys ?? []),
    ],
    metrics_pack_mount_keys: [
      ...(structural?.metrics_pack_mount_keys ?? []),
    ],
    projection_notes: [
      ...default_projection_notes,
      ...(structural?.projection_notes ?? []),
    ],
  };

  return {
    baseline_shell_session,
    structural_input: template_seed
      ? applyDevDeliveryPackTemplateSeed(structural_input, template_seed)
      : structural_input,
    template_seed,
  };
}

export function bootstrapSingleCellOperatorConsolePage(
  options: CreateSingleCellOperatorConsoleBootstrapOptions = {}
): SingleCellOperatorConsoleBootstrap {
  return composeSingleCellOperatorConsoleBootstrapFromBaselineShellSession(
    options.baseline_shell_session ?? createBaselineShell(options.baseline),
    options
  );
}

export function composeSingleCellOperatorConsoleBootstrapFromBaselineShellSession(
  baseline_shell_session: BaselineShellSession,
  options: Omit<
    CreateSingleCellOperatorConsoleBootstrapOptions,
    "baseline" | "baseline_shell_session"
  > = {}
): SingleCellOperatorConsoleBootstrap {
  const {
    structural_input,
    template_seed,
  } = create_structural_seed_from_baseline_truth({
    ...options,
    baseline_shell_session,
  });
  const structural_assembly =
    initializeSingleCellStructuralAssembly(structural_input);
  const shell_composition =
    composeSingleCellShellScaffold(structural_assembly);
  const shell_entry_package =
    adaptSingleCellShellEntry(shell_composition);
  const console_shell =
    composeSingleCellOperatorConsoleShell(shell_entry_package);
  const continuity_reload_presentation =
    assembleSingleCellContinuityReloadPresentation({
      baseline_shell_session,
      presentation_state: options.continuity?.presentation_state,
      reference: options.continuity?.reference,
    });
  const correction_review_interaction =
    assembleSingleCellCorrectionReviewInteraction({
      baseline_shell_session,
      structural_assembly,
      console_shell,
    });
  const state_transition_scaffold =
    assembleSingleCellOperatorConsoleStateTransitionScaffold({
      baseline_shell_session,
      console_shell,
      correction_review_interaction,
    });
  const task_focus_interaction =
    assembleSingleCellTaskFocusInteraction({
      baseline_shell_session,
      state_transition_scaffold,
    });
  const action_intent_scaffold =
    assembleSingleCellOperatorActionIntentScaffold({
      baseline_shell_session,
      continuity_reload_presentation,
      correction_review_interaction,
      task_focus_interaction,
    });
  const delivery_acceptance_scaffold =
    assembleSingleCellDeliveryAcceptanceScaffold({
      baseline_shell_session,
      structural_assembly,
      console_shell,
      action_intent_scaffold,
    });
  const input_draft_scaffold =
    assembleSingleCellOperatorInputDraftScaffold({
      baseline_shell_session,
      correction_review_interaction,
      task_focus_interaction,
      action_intent_scaffold,
      delivery_acceptance_scaffold,
    });
  const request_package_scaffold =
    assembleSingleCellOperatorRequestPackageScaffold({
      baseline_shell_session,
      task_focus_interaction,
      correction_review_interaction,
      action_intent_scaffold,
      delivery_acceptance_scaffold,
      input_draft_scaffold,
    });
  const request_review_submit_preview_scaffold =
    assembleSingleCellOperatorRequestReviewSubmitPreviewScaffold({
      baseline_shell_session,
      request_package_scaffold,
    });
  const page = renderSingleCellOperatorConsolePage(console_shell, {
    template_seed,
    continuity_reload_presentation,
    correction_review_interaction,
    state_transition_scaffold,
    task_focus_interaction,
    action_intent_scaffold,
    delivery_acceptance_scaffold,
    input_draft_scaffold,
    request_package_scaffold,
    request_review_submit_preview_scaffold,
  });
  const deferred_items = unique_items([
    ...structural_assembly.deferred_items,
    ...shell_entry_package.deferred_items,
    ...console_shell.deferred_items,
    ...continuity_reload_presentation.deferred_items,
    ...correction_review_interaction.deferred_items,
    ...state_transition_scaffold.deferred_items,
    ...task_focus_interaction.deferred_items,
    ...action_intent_scaffold.deferred_items,
    ...delivery_acceptance_scaffold.deferred_items,
    ...input_draft_scaffold.deferred_items,
    ...request_package_scaffold.deferred_items,
    ...request_review_submit_preview_scaffold.deferred_items,
    ...(template_seed?.deferred_surfaces ?? []),
  ]);
  const projection_notes = unique_items([
    ...structural_assembly.projection_notes,
    ...shell_entry_package.projection_notes,
    ...console_shell.projection_notes,
    ...continuity_reload_presentation.projection_notes,
    ...correction_review_interaction.projection_notes,
    ...state_transition_scaffold.projection_notes,
    ...task_focus_interaction.projection_notes,
    ...action_intent_scaffold.projection_notes,
    ...delivery_acceptance_scaffold.projection_notes,
    ...input_draft_scaffold.projection_notes,
    ...request_package_scaffold.projection_notes,
    ...request_review_submit_preview_scaffold.projection_notes,
    ...(template_seed?.projection_notes ?? []),
    "Single-cell operator console bootstrap reuses the existing baseline shell/runtime path and app-shell projection chain.",
    "Bootstrap remains operator-facing only and does not introduce multi-cell, secretary, provider, or channel behavior.",
  ]);

  return {
    bootstrap_id: `${structural_assembly.assembly_id}-page-bootstrap`,
    bootstrap_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    truth_sources: SINGLE_CELL_OPERATOR_CONSOLE_BOOTSTRAP_TRUTH_SOURCES,
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "operator_console_bootstrap",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    template_seed,
    baseline_shell_session,
    structural_assembly,
    shell_entry_package,
    console_shell,
    continuity_reload_presentation,
    correction_review_interaction,
    state_transition_scaffold,
    task_focus_interaction,
    action_intent_scaffold,
    delivery_acceptance_scaffold,
    input_draft_scaffold,
    request_package_scaffold,
    request_review_submit_preview_scaffold,
    page,
    projection_notes,
    deferred_items,
    close() {
      baseline_shell_session.runtime.close();
    },
  };
}
