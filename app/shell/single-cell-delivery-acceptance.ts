import type {
  SingleCellStructuralAssemblyPackage,
} from "../../projection/contracts/single-cell-assembly-contract.ts";
import type { BaselineShellSession } from "./create-baseline-shell.ts";
import type {
  SingleCellDeliveryAcceptanceScaffold,
  SingleCellOpenAcceptanceSignal,
} from "./single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorActionIntentScaffold,
} from "./single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellOperatorConsoleShell,
} from "./single-cell-operator-console-shell-contract.ts";

function build_current_delivery_contract_summary(input: {
  structural_assembly: SingleCellStructuralAssemblyPackage;
  console_shell: SingleCellOperatorConsoleShell;
}): SingleCellDeliveryAcceptanceScaffold["current_delivery_contract_summary"] {
  const { structural_assembly, console_shell } = input;
  const delivery_contract =
    structural_assembly.constitution_state.delivery_contract;
  const open_work_visible =
    console_shell.work_item_execution_overview.active_work_count > 0 ||
    console_shell.work_item_execution_overview.blocked_work_count > 0;

  return {
    delivery_contract_id: delivery_contract.delivery_contract_id,
    delivery_target: delivery_contract.delivery_target,
    done_definition: delivery_contract.done_definition,
    return_shape: delivery_contract.return_shape,
    review_posture: delivery_contract.review_posture,
    delivery_posture: console_shell.header.delivery_posture,
    current_objective_headline:
      console_shell.objective_overview.current_objective_headline,
    acceptance_status: open_work_visible
      ? "criteria_visible_with_open_items"
      : "criteria_visible_ready_for_bounded_review",
  };
}

function build_acceptance_criteria_visibility(input: {
  summary: SingleCellDeliveryAcceptanceScaffold["current_delivery_contract_summary"];
}): SingleCellDeliveryAcceptanceScaffold["acceptance_criteria_visibility"] {
  const { summary } = input;

  return [
    {
      criterion_id: "delivery_target_visible",
      display_label: summary.delivery_target,
      visibility_status: "visible_now",
      source_surface: "delivery",
      notes: [
        "Current delivery target is visible through the operator-facing delivery surface.",
      ],
    },
    {
      criterion_id: "done_definition_visible",
      display_label: summary.done_definition,
      visibility_status: "visible_now",
      source_surface: "delivery",
      notes: [
        "Done definition is visible now as bounded product truth.",
      ],
    },
    {
      criterion_id: "return_shape_visible",
      display_label: summary.return_shape,
      visibility_status: "derived_now",
      source_surface: "delivery_acceptance",
      notes: [
        "Return shape is derived from the existing delivery contract and surfaced here without adding runtime law.",
      ],
    },
    {
      criterion_id: "review_posture_visible",
      display_label: summary.review_posture,
      visibility_status: "visible_now",
      source_surface: "correction_review",
      notes: [
        "Review posture is visible across delivery and correction/review scaffolds.",
      ],
    },
    {
      criterion_id: "objective_link_visible",
      display_label: summary.current_objective_headline,
      visibility_status: "visible_now",
      source_surface: "objective_overview",
      notes: [
        "Current objective linkage is visible for bounded delivery judgment.",
      ],
    },
    {
      criterion_id: "work_state_visibility_present",
      display_label: "Active and blocked work counts are visible",
      visibility_status: "visible_now",
      source_surface: "work_item_execution_overview",
      notes: [
        "Current work-state counts are visible without implying runtime-complete progress tracking.",
      ],
    },
  ];
}

function build_completed_acceptance_signals(input: {
  console_shell: SingleCellOperatorConsoleShell;
  action_intent_scaffold: SingleCellOperatorActionIntentScaffold;
}): SingleCellDeliveryAcceptanceScaffold["completed_acceptance_signals"] {
  const { console_shell, action_intent_scaffold } = input;
  const signals: SingleCellDeliveryAcceptanceScaffold["completed_acceptance_signals"] =
    [
      {
        signal_id: "delivery_contract_summary_visible",
        display_label:
          "Current delivery contract summary is visible to the operator.",
        support_level: "bounded_summary_only",
        source_surface: "delivery_acceptance",
        notes: [
          "Delivery contract summary is presented from current structural and projection truth.",
        ],
      },
      {
        signal_id: "acceptance_criteria_visible",
        display_label:
          "Acceptance criteria are visible from the current single-cell console truth.",
        support_level: "visible_now",
        source_surface: "delivery_acceptance",
        notes: [
          "Visibility does not imply automated acceptance verification or workflow completion.",
        ],
      },
      {
        signal_id: "current_objective_and_work_state_visible",
        display_label:
          "Current objective and work-state counts are visible for bounded acceptance judgment.",
        support_level: "visible_now",
        source_surface: "work_item_execution_overview",
        notes: [
          `Active work count: ${String(
            console_shell.work_item_execution_overview.active_work_count
          )}.`,
          `Blocked work count: ${String(
            console_shell.work_item_execution_overview.blocked_work_count
          )}.`,
        ],
      },
    ];

  const request_review_available =
    action_intent_scaffold.available_action_intent_seeds.some(
      (seed) => seed.intent_kind === "request_review"
    );
  const apply_correction_available =
    action_intent_scaffold.available_action_intent_seeds.some(
      (seed) => seed.intent_kind === "apply_correction"
    );

  if (request_review_available && apply_correction_available) {
    signals.push({
      signal_id: "bounded_review_and_correction_available",
      display_label:
        "Bounded review and correction next steps are available from current operator-facing truth.",
      support_level: "bounded_summary_only",
      source_surface: "action_intents",
      notes: [
        "These are operator-facing intent seeds only and not automated acceptance execution.",
      ],
    });
  }

  return signals;
}

function build_unmet_or_deferred_acceptance_signals(input: {
  console_shell: SingleCellOperatorConsoleShell;
}): SingleCellOpenAcceptanceSignal[] {
  const { console_shell } = input;
  const signals: SingleCellOpenAcceptanceSignal[] = [];

  if (console_shell.work_item_execution_overview.active_work_count > 0) {
    signals.push({
      signal_id: "active_work_remains_visible",
      display_label:
        "Active work remains visible, so delivery acceptance stays open.",
      signal_status: "unmet_now",
      source_surface: "work_item_execution_overview",
      notes: [
        `Active work count is ${String(
          console_shell.work_item_execution_overview.active_work_count
        )}.`,
        "Visible active work means delivery acceptance is not claimed as complete here.",
      ],
    });
  }

  if (console_shell.work_item_execution_overview.blocked_work_count > 0) {
    signals.push({
      signal_id: "blocked_work_visible",
      display_label:
        "Blocked work is visible and keeps acceptance judgment open.",
      signal_status: "unmet_now",
      source_surface: "work_item_execution_overview",
      notes: [
        `Blocked work count is ${String(
          console_shell.work_item_execution_overview.blocked_work_count
        )}.`,
        "This scaffold shows the blocker honestly and does not imply autonomous recovery.",
      ],
    });
  }

  signals.push(
    ...console_shell.delivery.deferred_surfaces.map((surface) => ({
      signal_id: surface,
      display_label: surface,
      signal_status: "deferred" as const,
      source_surface: "delivery" as const,
      notes: [
        "This acceptance surface is explicitly deferred in current product truth.",
      ],
    }))
  );

  return signals;
}

function build_unavailable_acceptance_surfaces(): SingleCellDeliveryAcceptanceScaffold["unavailable_acceptance_surfaces"] {
  return [
    {
      surface_id: "provider_acceptance_verification",
      display_label: "Provider-backed acceptance verification",
      reason:
        "The current single-cell delivery acceptance scaffold does not verify acceptance through provider execution.",
    },
    {
      surface_id: "channel_routed_delivery_handoff",
      display_label: "Channel-routed delivery handoff",
      reason:
        "No channel entry or channel-side delivery acceptance handoff is available in this wave.",
    },
    {
      surface_id: "multi_cell_delivery_coordination",
      display_label: "Multi-cell delivery coordination",
      reason:
        "Delivery acceptance remains single-cell only and does not route across a portfolio.",
    },
    {
      surface_id: "secretary_managed_acceptance_queue",
      display_label: "Secretary-managed acceptance queue",
      reason:
        "No secretary layer participates in acceptance handling in the single-cell usable line.",
    },
    {
      surface_id: "persistent_acceptance_timeline",
      display_label: "Persistent acceptance timeline",
      reason:
        "The current repo truth does not provide a persisted delivery acceptance timeline across sessions.",
    },
  ];
}

export interface AssembleSingleCellDeliveryAcceptanceScaffoldInput {
  baseline_shell_session: BaselineShellSession;
  structural_assembly: SingleCellStructuralAssemblyPackage;
  console_shell: SingleCellOperatorConsoleShell;
  action_intent_scaffold: SingleCellOperatorActionIntentScaffold;
}

export function assembleSingleCellDeliveryAcceptanceScaffold(
  input: AssembleSingleCellDeliveryAcceptanceScaffoldInput
): SingleCellDeliveryAcceptanceScaffold {
  const {
    baseline_shell_session,
    structural_assembly,
    console_shell,
    action_intent_scaffold,
  } = input;
  const current_delivery_contract_summary =
    build_current_delivery_contract_summary({
      structural_assembly,
      console_shell,
    });

  return {
    scaffold_id: `${baseline_shell_session.runtime.project_id}-delivery-acceptance`,
    scaffold_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_shell_projection_consumer",
    phase_boundary: "delivery_acceptance_scaffold",
    execution_boundary: "acceptance_scaffold_only",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    runtime_mode: baseline_shell_session.runtime.mode,
    current_delivery_contract_summary,
    acceptance_criteria_visibility: build_acceptance_criteria_visibility({
      summary: current_delivery_contract_summary,
    }),
    completed_acceptance_signals: build_completed_acceptance_signals({
      console_shell,
      action_intent_scaffold,
    }),
    unmet_or_deferred_acceptance_signals:
      build_unmet_or_deferred_acceptance_signals({
        console_shell,
      }),
    unavailable_acceptance_surfaces:
      build_unavailable_acceptance_surfaces(),
    deferred_items: [
      ...console_shell.delivery.deferred_surfaces,
      "provider_acceptance_verification",
      "channel_routed_delivery_handoff",
      "persistent_acceptance_timeline",
    ],
    non_claims: [
      "no_provider_backed_acceptance_verification",
      "no_channel_delivery_handoff",
      "no_multi_cell_delivery_acceptance_routing",
      "no_secretary_acceptance_queue",
      "no_persistent_acceptance_timeline",
      "no_runtime_complete_acceptance_workflow",
    ],
    projection_notes: [
      "Delivery acceptance scaffold derives current acceptance truth from the existing delivery contract, objective/work-state visibility, and deferred delivery surfaces.",
      "Acceptance remains operator-facing only and does not introduce provider verification, channel routing, multi-cell coordination, or runtime-complete workflow execution.",
    ],
  };
}
