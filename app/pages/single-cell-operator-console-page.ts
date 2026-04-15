import type {
  DevDeliveryPackTemplateSeed,
} from "../../projection/contracts/dev-delivery-pack-template-contract.ts";
import type {
  SingleCellContinuityReloadPresentation,
} from "../shell/single-cell-continuity-reload-presentation-contract.ts";
import type {
  SingleCellCorrectionReviewInteraction,
} from "../shell/single-cell-correction-review-interaction-contract.ts";
import type {
  SingleCellOperatorConsoleStateTransitionScaffold,
} from "../shell/single-cell-operator-console-state-transition-contract.ts";
import type {
  SingleCellOperatorConsoleShell,
} from "../shell/single-cell-operator-console-shell-contract.ts";
import type {
  SingleCellOperatorActionIntentScaffold,
} from "../shell/single-cell-operator-action-intent-contract.ts";
import type {
  SingleCellDeliveryAcceptanceScaffold,
} from "../shell/single-cell-delivery-acceptance-contract.ts";
import type {
  SingleCellOperatorInputDraftScaffold,
} from "../shell/single-cell-operator-input-draft-contract.ts";
import type {
  SingleCellOperatorInSessionDraftStateScaffold,
} from "../shell/single-cell-operator-in-session-draft-state-contract.ts";
import type {
  SingleCellOperatorRequestPackageScaffold,
} from "../shell/single-cell-operator-request-package-contract.ts";
import type {
  SingleCellOperatorRequestReviewSubmitPreviewScaffold,
} from "../shell/single-cell-operator-request-review-submit-preview-contract.ts";
import type {
  SingleCellTaskFocusInteraction,
} from "../shell/single-cell-task-focus-interaction-contract.ts";

export const SINGLE_CELL_OPERATOR_CONSOLE_ROUTE = "/cell" as const;

export type SingleCellOperatorConsolePagePhaseBoundary =
  "bounded_operator_page";
export type SingleCellOperatorConsolePageAuthorityBoundary =
  "app_page_projection_consumer";

export type SingleCellOperatorConsolePageSectionKey =
  | "header"
  | "delivery"
  | "delivery_acceptance"
  | "crew_overview"
  | "objective_overview"
  | "task_focus"
  | "action_intents"
  | "input_drafts"
  | "in_session_draft_state"
  | "request_package"
  | "request_review_submit_preview"
  | "work_item_execution_overview"
  | "correction_review"
  | "state_transition"
  | "continuity_reload"
  | "memory_continuity_overview"
  | "deferred_surfaces"
  | "truth_boundary";

export interface SingleCellOperatorConsolePageSection {
  section_key: SingleCellOperatorConsolePageSectionKey;
  heading: string;
  body_lines: string[];
}

export interface SingleCellOperatorConsolePage {
  route_path: typeof SINGLE_CELL_OPERATOR_CONSOLE_ROUTE;
  page_kind: "single_cell_operator_console_page";
  page_scope: "single_cell_only";
  operator_surface: "single_cell_console";
  authority_boundary: SingleCellOperatorConsolePageAuthorityBoundary;
  phase_boundary: SingleCellOperatorConsolePagePhaseBoundary;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  actual_provider_actions_present: false;
  actual_channel_entry_present: false;
  multi_cell_portfolio_behavior_available: false;
  secretary_behavior_available: false;
  broad_kpi_cockpit_available: false;
  runtime_complete_product_state_available: false;
  console_shell: SingleCellOperatorConsoleShell;
  sections: {
    header: SingleCellOperatorConsolePageSection;
    delivery: SingleCellOperatorConsolePageSection;
    delivery_acceptance: SingleCellOperatorConsolePageSection;
    crew_overview: SingleCellOperatorConsolePageSection;
    objective_overview: SingleCellOperatorConsolePageSection;
    task_focus: SingleCellOperatorConsolePageSection;
    action_intents: SingleCellOperatorConsolePageSection;
    input_drafts: SingleCellOperatorConsolePageSection;
    in_session_draft_state: SingleCellOperatorConsolePageSection;
    request_package: SingleCellOperatorConsolePageSection;
    request_review_submit_preview: SingleCellOperatorConsolePageSection;
    work_item_execution_overview: SingleCellOperatorConsolePageSection;
    correction_review: SingleCellOperatorConsolePageSection;
    state_transition: SingleCellOperatorConsolePageSection;
    continuity_reload: SingleCellOperatorConsolePageSection;
    memory_continuity_overview: SingleCellOperatorConsolePageSection;
    deferred_surfaces: SingleCellOperatorConsolePageSection;
    truth_boundary: SingleCellOperatorConsolePageSection;
  };
  non_claims: string[];
  html: string;
}

export interface RenderSingleCellOperatorConsolePageOptions {
  template_seed?: DevDeliveryPackTemplateSeed;
  continuity_reload_presentation?: SingleCellContinuityReloadPresentation;
  correction_review_interaction?: SingleCellCorrectionReviewInteraction;
  state_transition_scaffold?: SingleCellOperatorConsoleStateTransitionScaffold;
  task_focus_interaction?: SingleCellTaskFocusInteraction;
  action_intent_scaffold?: SingleCellOperatorActionIntentScaffold;
  delivery_acceptance_scaffold?: SingleCellDeliveryAcceptanceScaffold;
  input_draft_scaffold?: SingleCellOperatorInputDraftScaffold;
  in_session_draft_state_scaffold?:
    SingleCellOperatorInSessionDraftStateScaffold;
  request_package_scaffold?: SingleCellOperatorRequestPackageScaffold;
  request_review_submit_preview_scaffold?:
    SingleCellOperatorRequestReviewSubmitPreviewScaffold;
}

function escape_html(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function render_section(section: SingleCellOperatorConsolePageSection): string {
  const body_lines = section.body_lines
    .map((line) => `<li>${escape_html(line)}</li>`)
    .join("");

  return [
    `<section data-section="${section.section_key}">`,
    `<h2>${escape_html(section.heading)}</h2>`,
    `<ul>${body_lines}</ul>`,
    `</section>`,
  ].join("");
}

function unique_items(values: readonly string[]): string[] {
  return [...new Set(values)];
}

export function renderSingleCellOperatorConsolePage(
  console_shell: SingleCellOperatorConsoleShell,
  options: RenderSingleCellOperatorConsolePageOptions = {}
): SingleCellOperatorConsolePage {
  const template_seed = options.template_seed;
  const continuity_reload_presentation =
    options.continuity_reload_presentation;
  const correction_review_interaction =
    options.correction_review_interaction;
  const state_transition_scaffold = options.state_transition_scaffold;
  const task_focus_interaction = options.task_focus_interaction;
  const action_intent_scaffold = options.action_intent_scaffold;
  const delivery_acceptance_scaffold = options.delivery_acceptance_scaffold;
  const input_draft_scaffold = options.input_draft_scaffold;
  const in_session_draft_state_scaffold =
    options.in_session_draft_state_scaffold;
  const request_package_scaffold = options.request_package_scaffold;
  const request_review_submit_preview_scaffold =
    options.request_review_submit_preview_scaffold;
  const sections = {
    header: {
      section_key: "header",
      heading: "Header",
      body_lines: [
        `Cell: ${console_shell.header.cell_name}`,
        `Objective: ${console_shell.header.current_objective_headline}`,
        `Delivery posture: ${console_shell.header.delivery_posture}`,
        `Continuity note: ${console_shell.header.continuity_note}`,
        ...(template_seed
          ? [`Template seed: ${template_seed.template_label}`]
          : []),
      ],
    },
    delivery: {
      section_key: "delivery",
      heading: "Delivery",
      body_lines: [
        `Delivery target: ${console_shell.delivery.delivery_target}`,
        `Done definition: ${console_shell.delivery.done_definition}`,
        `Review posture: ${console_shell.delivery.review_posture}`,
        ...(template_seed
          ? [
              `Template objective framing: ${template_seed.default_objective_framing}`,
            ]
          : []),
        ...console_shell.delivery.deferred_surfaces.map(
          (surface) => `Deferred delivery surface: ${surface}`
        ),
      ],
    },
    delivery_acceptance: {
      section_key: "delivery_acceptance",
      heading: "Delivery Acceptance",
      body_lines: delivery_acceptance_scaffold
        ? [
            `Acceptance boundary: ${delivery_acceptance_scaffold.execution_boundary}`,
            `Delivery contract id: ${delivery_acceptance_scaffold.current_delivery_contract_summary.delivery_contract_id}`,
            `Delivery acceptance status: ${delivery_acceptance_scaffold.current_delivery_contract_summary.acceptance_status}`,
            `Delivery target: ${delivery_acceptance_scaffold.current_delivery_contract_summary.delivery_target}`,
            `Done definition: ${delivery_acceptance_scaffold.current_delivery_contract_summary.done_definition}`,
            `Return shape: ${delivery_acceptance_scaffold.current_delivery_contract_summary.return_shape}`,
            `Review posture: ${delivery_acceptance_scaffold.current_delivery_contract_summary.review_posture}`,
            ...delivery_acceptance_scaffold.acceptance_criteria_visibility.map(
              (criterion) =>
                `Acceptance criterion: ${criterion.criterion_id} -> ${criterion.display_label} [${criterion.visibility_status}] via ${criterion.source_surface}`
            ),
            ...delivery_acceptance_scaffold.completed_acceptance_signals.map(
              (signal) =>
                `Completed acceptance signal: ${signal.signal_id} -> ${signal.display_label} [${signal.support_level}] via ${signal.source_surface}`
            ),
            ...delivery_acceptance_scaffold.unmet_or_deferred_acceptance_signals.map(
              (signal) =>
                `Open acceptance signal: ${signal.signal_id} -> ${signal.display_label} [${signal.signal_status}] via ${signal.source_surface}`
            ),
            ...delivery_acceptance_scaffold.unavailable_acceptance_surfaces.map(
              (surface) =>
                `Unavailable acceptance surface: ${surface.display_label} -> ${surface.reason}`
            ),
            ...delivery_acceptance_scaffold.deferred_items.map(
              (item) => `Deferred acceptance item: ${item}`
            ),
            ...delivery_acceptance_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Delivery acceptance scaffold is not assembled for this page.",
          ],
    },
    crew_overview: {
      section_key: "crew_overview",
      heading: "Crew Overview",
      body_lines: [
        `Compiler role: ${console_shell.crew_overview.compiler_role}`,
        `Required roles: ${console_shell.crew_overview.required_role_keys.join(", ")}`,
        `Management priority: ${console_shell.crew_overview.management_priority}`,
        `Compile seed status: ${console_shell.crew_overview.compile_seed_status}`,
        `Runtime worker state available: ${String(
          console_shell.crew_overview.runtime_worker_state_available
        )}`,
        ...(template_seed
          ? [
              `Template crew-role hints: ${template_seed.default_crew_role_hints.join(", ")}`,
            ]
          : []),
      ],
    },
    objective_overview: {
      section_key: "objective_overview",
      heading: "Objective Overview",
      body_lines: [
        `Current objective id: ${console_shell.objective_overview.current_objective_id}`,
        `Current objective headline: ${console_shell.objective_overview.current_objective_headline}`,
        `Active work count: ${String(console_shell.objective_overview.active_work_count)}`,
        `Blocked work count: ${String(console_shell.objective_overview.blocked_work_count)}`,
        `Near-term execution pressure: ${console_shell.objective_overview.near_term_execution_pressure}`,
      ],
    },
    task_focus: {
      section_key: "task_focus",
      heading: "Task Focus",
      body_lines: task_focus_interaction
        ? [
            `Interaction boundary: ${task_focus_interaction.execution_boundary}`,
            `Current objective focus: ${task_focus_interaction.current_objective_focus.objective_label}`,
            `Current work-item focus: ${task_focus_interaction.current_work_item_focus.work_item_label}`,
            `Current work-item status: ${task_focus_interaction.current_work_item_focus.work_item_status}`,
            ...task_focus_interaction.available_focus_targets.map(
              (target) =>
                `Available focus target: ${target.target_kind} -> ${target.display_label} [${target.support_level}] current=${String(target.is_current)}${target.status_label ? ` status=${target.status_label}` : ""}`
            ),
            ...task_focus_interaction.focus_switch_intent_seeds.map(
              (seed) =>
                `Focus-switch intent: ${seed.target_kind} -> ${seed.display_label} [${seed.support_level}]`
            ),
            ...task_focus_interaction.next_focus_preview_seeds.map(
              (preview) =>
                `Next-focus preview: ${preview.target_kind} -> objective=${preview.objective_focus_label}; work-item=${preview.work_item_focus_label}`
            ),
            ...task_focus_interaction.deferred_items.map(
              (item) => `Deferred focus item: ${item}`
            ),
            ...task_focus_interaction.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Task-focus interaction scaffold is not assembled for this page.",
          ],
    },
    action_intents: {
      section_key: "action_intents",
      heading: "Action Intents",
      body_lines: action_intent_scaffold
        ? [
            `Interaction boundary: ${action_intent_scaffold.execution_boundary}`,
            `Current objective focus: ${action_intent_scaffold.current_action_context.objective_focus_label}`,
            `Current work-item focus: ${action_intent_scaffold.current_action_context.work_item_focus_label}`,
            `Current continuity mode: ${action_intent_scaffold.current_action_context.continuity_mode}`,
            `Current blocked work count: ${String(action_intent_scaffold.current_action_context.blocked_work_count)}`,
            ...action_intent_scaffold.available_action_intent_seeds.map(
              (seed) =>
                `Available action intent: ${seed.intent_kind} -> ${seed.display_label} [${seed.support_level}] via ${seed.suggested_surface}`
            ),
            ...action_intent_scaffold.current_constraint_hints.map(
              (hint) =>
                `Current constraint: ${hint.display_label} via ${hint.source_surface}`
            ),
            ...action_intent_scaffold.unavailable_action_surfaces.map(
              (surface) =>
                `Unavailable action surface: ${surface.display_label} -> ${surface.reason}`
            ),
            ...action_intent_scaffold.deferred_items.map(
              (item) => `Deferred action item: ${item}`
            ),
            ...action_intent_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Operator action-intent scaffold is not assembled for this page.",
          ],
    },
    input_drafts: {
      section_key: "input_drafts",
      heading: "Input Drafts",
      body_lines: input_draft_scaffold
        ? [
            `Draft boundary: ${input_draft_scaffold.execution_boundary}`,
            `Current objective focus: ${input_draft_scaffold.current_draft_context.objective_focus_label}`,
            `Current work-item focus: ${input_draft_scaffold.current_draft_context.work_item_focus_label}`,
            `Current correction target scope: ${input_draft_scaffold.current_draft_context.correction_target_scope}`,
            `Current review intent: ${input_draft_scaffold.current_draft_context.review_intent}`,
            `Current acceptance status: ${input_draft_scaffold.current_draft_context.acceptance_status}`,
            ...input_draft_scaffold.draftable_input_slots.map(
              (slot) =>
                `Draft slot: ${slot.draft_kind} -> ${slot.display_label} [${slot.support_level}] ${slot.draft_mode} target=${slot.target_label} via ${slot.target_surface}`
            ),
            ...input_draft_scaffold.action_intent_draft_options.map(
              (option) =>
                `Action-intent draft option: ${option.intent_kind} -> ${option.display_label} [${option.support_level}]`
            ),
            ...input_draft_scaffold.unavailable_input_surfaces.map(
              (surface) =>
                `Unavailable input surface: ${surface.display_label} -> ${surface.reason}`
            ),
            ...input_draft_scaffold.deferred_items.map(
              (item) => `Deferred input item: ${item}`
            ),
            ...input_draft_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Operator input-draft scaffold is not assembled for this page.",
          ],
    },
    in_session_draft_state: {
      section_key: "in_session_draft_state",
      heading: "In-Session Draft State",
      body_lines: in_session_draft_state_scaffold
        ? [
            `Session-draft boundary: ${in_session_draft_state_scaffold.execution_boundary}`,
            `Draft completeness status: ${in_session_draft_state_scaffold.draft_completeness_state.draft_completeness_status}`,
            `Draft emptiness state: ${in_session_draft_state_scaffold.draft_completeness_state.draft_emptiness_state}`,
            `Present draft values: ${String(in_session_draft_state_scaffold.draft_completeness_state.present_draft_value_count)}`,
            `Empty draft values: ${String(in_session_draft_state_scaffold.draft_completeness_state.empty_draft_value_count)}`,
            `Request reviewability status: ${in_session_draft_state_scaffold.draft_completeness_state.request_reviewability_status}`,
            `Request previewability status: ${in_session_draft_state_scaffold.draft_completeness_state.request_previewability_status}`,
            `Future submit dependency count: ${String(in_session_draft_state_scaffold.draft_completeness_state.future_submit_dependency_count)}`,
            `Objective note draft value: ${in_session_draft_state_scaffold.current_session_draft_values.objective_note_draft_value.value_presence} via ${in_session_draft_state_scaffold.current_session_draft_values.objective_note_draft_value.value_source} value=${in_session_draft_state_scaffold.current_session_draft_values.objective_note_draft_value.current_value || "(empty)"}`,
            `Work-item note draft value: ${in_session_draft_state_scaffold.current_session_draft_values.work_item_note_draft_value.value_presence} via ${in_session_draft_state_scaffold.current_session_draft_values.work_item_note_draft_value.value_source} value=${in_session_draft_state_scaffold.current_session_draft_values.work_item_note_draft_value.current_value || "(empty)"}`,
            `Correction text draft value: ${in_session_draft_state_scaffold.current_session_draft_values.correction_text_draft_value.value_presence} via ${in_session_draft_state_scaffold.current_session_draft_values.correction_text_draft_value.value_source} value=${in_session_draft_state_scaffold.current_session_draft_values.correction_text_draft_value.current_value || "(empty)"}`,
            `Review request draft value: ${in_session_draft_state_scaffold.current_session_draft_values.review_request_draft_value.value_presence} via ${in_session_draft_state_scaffold.current_session_draft_values.review_request_draft_value.value_source} value=${in_session_draft_state_scaffold.current_session_draft_values.review_request_draft_value.current_value || "(empty)"}`,
            `Selected action intent draft value: ${in_session_draft_state_scaffold.current_session_draft_values.selected_action_intent_draft_value.value_presence} via ${in_session_draft_state_scaffold.current_session_draft_values.selected_action_intent_draft_value.value_source} value=${in_session_draft_state_scaffold.current_session_draft_values.selected_action_intent_draft_value.current_value ?? "none"}`,
            ...in_session_draft_state_scaffold.draft_completeness_state.future_submit_dependencies.map(
              (dependency) =>
                `Current submit dependency: ${dependency}`
            ),
            ...in_session_draft_state_scaffold.unavailable_draft_surfaces.map(
              (surface) =>
                `Unavailable session draft surface: ${surface.display_label} -> ${surface.reason}`
            ),
            ...in_session_draft_state_scaffold.deferred_items.map(
              (item) => `Deferred session draft item: ${item}`
            ),
            ...in_session_draft_state_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Operator in-session draft-state scaffold is not assembled for this page.",
          ],
    },
    request_package: {
      section_key: "request_package",
      heading: "Request Package",
      body_lines: request_package_scaffold
        ? [
            `Package boundary: ${request_package_scaffold.execution_boundary}`,
            `Request package id: ${request_package_scaffold.current_request_package.request_package_id}`,
            `Package fields present: ${request_package_scaffold.current_request_package.package_fields_present.join(", ")}`,
            `Packaged objective focus: ${request_package_scaffold.current_request_package.current_focus.objective_focus_label}`,
            `Packaged work-item focus: ${request_package_scaffold.current_request_package.current_focus.work_item_focus_label}`,
            ...(request_package_scaffold.current_request_package.selected_action_intent
              ? [
                  `Selected action intent: ${request_package_scaffold.current_request_package.selected_action_intent.intent_kind} -> ${request_package_scaffold.current_request_package.selected_action_intent.display_label} [${request_package_scaffold.current_request_package.selected_action_intent.support_level}] confirmed=${String(request_package_scaffold.current_request_package.selected_action_intent.selection_confirmed)} via ${request_package_scaffold.current_request_package.selected_action_intent.selection_basis}`,
                ]
              : [
                  "Selected action intent: none currently packaged.",
                ]),
            `Correction/review target: ${request_package_scaffold.current_request_package.correction_review_target.target_scope} -> ${request_package_scaffold.current_request_package.correction_review_target.target_ref_id}`,
            `Review intent: ${request_package_scaffold.current_request_package.correction_review_target.review_intent}`,
            `Delivery acceptance status: ${request_package_scaffold.current_request_package.delivery_acceptance_context.acceptance_status}`,
            `Completed acceptance signals: ${String(request_package_scaffold.current_request_package.delivery_acceptance_context.completed_signal_count)}`,
            `Open acceptance signals: ${String(request_package_scaffold.current_request_package.delivery_acceptance_context.open_signal_count)}`,
            ...request_package_scaffold.current_request_package.input_drafts.map(
              (draft) =>
                `Packaged input draft: ${draft.draft_kind} -> ${draft.target_label} [${draft.support_level}] has_text=${String(draft.has_text)} via ${draft.target_surface}`
            ),
            ...request_package_scaffold.unavailable_request_surfaces.map(
              (surface) =>
                `Unavailable request surface: ${surface.display_label} -> ${surface.reason}`
            ),
            ...request_package_scaffold.deferred_items.map(
              (item) => `Deferred request item: ${item}`
            ),
            ...request_package_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Operator request-package scaffold is not assembled for this page.",
          ],
    },
    request_review_submit_preview: {
      section_key: "request_review_submit_preview",
      heading: "Request Review / Submit Preview",
      body_lines: request_review_submit_preview_scaffold
        ? [
            `Preview boundary: ${request_review_submit_preview_scaffold.execution_boundary}`,
            `Request package id: ${request_review_submit_preview_scaffold.current_request_package_summary.request_package_id}`,
            `Reviewability status: ${request_review_submit_preview_scaffold.review_preview_state.reviewability_status}`,
            `Previewability status: ${request_review_submit_preview_scaffold.review_preview_state.previewability_status}`,
            `Incomplete request: ${String(request_review_submit_preview_scaffold.review_preview_state.incomplete_request)}`,
            `Submit-preview status: ${request_review_submit_preview_scaffold.submit_preview_status}`,
            `Packaged fields present: ${request_review_submit_preview_scaffold.current_request_package_summary.packaged_fields_present.join(", ")}`,
            `Selected action intent kind: ${request_review_submit_preview_scaffold.current_request_package_summary.selected_action_intent_kind ?? "none"}`,
            `Selected action intent confirmed: ${String(request_review_submit_preview_scaffold.current_request_package_summary.selected_action_intent_confirmed)}`,
            `Acceptance status: ${request_review_submit_preview_scaffold.current_request_package_summary.acceptance_status}`,
            `Populated drafts: ${String(request_review_submit_preview_scaffold.current_request_package_summary.populated_draft_count)} / ${String(request_review_submit_preview_scaffold.current_request_package_summary.packaged_draft_count)}`,
            ...request_review_submit_preview_scaffold.completeness_signals.map(
              (signal) =>
                `Completeness signal: ${signal.signal_id} -> ${signal.signal_status} via ${signal.source_surface}`
            ),
            ...request_review_submit_preview_scaffold.missing_or_deferred_fields.map(
              (field) =>
                `Missing/deferred request field: ${field.field_id} -> ${field.field_status} (${field.display_label})`
            ),
            ...request_review_submit_preview_scaffold.future_submit_dependencies.map(
              (dependency) =>
                `Future submit dependency: ${dependency}`
            ),
            ...request_review_submit_preview_scaffold.unavailable_submit_surfaces.map(
              (surface) =>
                `Unavailable submit surface: ${surface.display_label} -> ${surface.reason}`
            ),
            ...request_review_submit_preview_scaffold.deferred_items.map(
              (item) => `Deferred submit-preview item: ${item}`
            ),
            ...request_review_submit_preview_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Operator request review / submit-preview scaffold is not assembled for this page.",
          ],
    },
    work_item_execution_overview: {
      section_key: "work_item_execution_overview",
      heading: "Work Item / Execution Overview",
      body_lines: [
        `Workstream mode: ${console_shell.work_item_execution_overview.workstream_mode}`,
        `Active work count: ${String(
          console_shell.work_item_execution_overview.active_work_count
        )}`,
        `Blocked work count: ${String(
          console_shell.work_item_execution_overview.blocked_work_count
        )}`,
        `Runtime work-item projection available: ${String(
          console_shell.work_item_execution_overview.actual_runtime_work_item_projection_available
        )}`,
        `Work-item timeline available: ${String(
          console_shell.work_item_execution_overview.work_item_timeline_available
        )}`,
        ...(template_seed
          ? template_seed.default_workstream_hints.map(
              (hint) => `Template workstream hint: ${hint}`
            )
          : []),
        ...(template_seed
          ? template_seed.default_work_item_seed_hints.map(
              (hint) => `Template work-item seed hint: ${hint}`
            )
          : []),
        ...console_shell.work_item_execution_overview.non_claims.map(
          (claim) => `Non-claim: ${claim}`
        ),
      ],
    },
    correction_review: {
      section_key: "correction_review",
      heading: "Correction / Review",
      body_lines: correction_review_interaction
        ? [
            `Interaction boundary: ${correction_review_interaction.execution_boundary}`,
            `Runtime mode: ${correction_review_interaction.runtime_mode}`,
            `Suggested target scope: ${correction_review_interaction.correction_input_seed.suggested_target_scope}`,
            `Suggested runtime target: ${correction_review_interaction.correction_input_seed.suggested_runtime_target}`,
            `Suggested target ref: ${correction_review_interaction.correction_input_seed.suggested_target_ref_id}`,
            `Review posture: ${correction_review_interaction.review_intent_seed.review_posture}`,
            `Default review intent: ${correction_review_interaction.review_intent_seed.default_review_intent}`,
            ...correction_review_interaction.review_intent_seed.supported_review_intents.map(
              (intent) => `Supported review intent: ${intent}`
            ),
            ...correction_review_interaction.target_scope_hints.map(
              (hint) =>
                `Target scope hint: ${hint.target_scope} -> ${hint.display_label} [${hint.support_level}] via ${hint.runtime_mapping_target}`
            ),
            ...correction_review_interaction.expected_outcome_hints.supported_writeback_hints.map(
              (hint) => `Supported writeback hint: ${hint}`
            ),
            ...correction_review_interaction.expected_outcome_hints.deferred_outcome_hints.map(
              (hint) => `Deferred review outcome: ${hint}`
            ),
            ...correction_review_interaction.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Correction/review interaction scaffold is not assembled for this page.",
          ],
    },
    state_transition: {
      section_key: "state_transition",
      heading: "State Transition",
      body_lines: state_transition_scaffold
        ? [
            `Transition boundary: ${state_transition_scaffold.execution_boundary}`,
            `Current objective focus: ${state_transition_scaffold.current_state_seed.objective_focus_label}`,
            `Current work-item focus: ${state_transition_scaffold.current_state_seed.work_item_focus_label}`,
            `Current correction target scope: ${state_transition_scaffold.current_state_seed.correction_target_scope}`,
            `Current review intent: ${state_transition_scaffold.current_state_seed.review_intent}`,
            ...state_transition_scaffold.transition_options.map(
              (option) =>
                `Transition option: ${option.transition_kind} -> ${option.display_label} [${option.support_level}]`
            ),
            ...state_transition_scaffold.suggested_next_state_previews.map(
              (preview) =>
                `Next-state preview: ${preview.transition_kind} -> objective=${preview.objective_focus_label}; work-item=${preview.work_item_focus_label}; correction=${preview.correction_target_scope}; review=${preview.review_intent}`
            ),
            ...state_transition_scaffold.deferred_items.map(
              (item) => `Deferred transition item: ${item}`
            ),
            ...state_transition_scaffold.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "State transition scaffold is not assembled for this page.",
          ],
    },
    continuity_reload: {
      section_key: "continuity_reload",
      heading: "Continuity / Reload",
      body_lines: continuity_reload_presentation
        ? [
            `Bootstrap mode: ${continuity_reload_presentation.bootstrap_mode}`,
            `Continuity mode: ${continuity_reload_presentation.continuity_mode}`,
            `Previous reference available: ${String(
              continuity_reload_presentation.persisted_identity_continuity.previous_reference_available
            )}`,
            `Project id stable: ${String(
              continuity_reload_presentation.persisted_identity_continuity.project_id_stable
            )}`,
            `Crew id stable: ${String(
              continuity_reload_presentation.persisted_identity_continuity.crew_id_stable
            )}`,
            `Objective id stable: ${String(
              continuity_reload_presentation.persisted_identity_continuity.objective_id_stable
            )}`,
            `Work-item identity stable: ${String(
              continuity_reload_presentation.persisted_work_objective_continuity.work_item_identity_stable
            )}`,
            `Preference continuity visible: ${String(
              continuity_reload_presentation.persisted_work_objective_continuity.preference_continuity_visible
            )}`,
            `Objective anchor compare available: ${String(
              continuity_reload_presentation.persisted_work_objective_continuity.objective_anchor_compare_available
            )}`,
            `Objective anchor present: ${String(
              continuity_reload_presentation.persisted_work_objective_continuity.objective_anchor_present
            )}`,
            `Same-session runtime context: ${String(
              continuity_reload_presentation.session_reload_distinction.same_session_runtime_context
            )}`,
            `Fresh runtime context: ${String(
              continuity_reload_presentation.session_reload_distinction.fresh_runtime_context
            )}`,
            ...continuity_reload_presentation.persisted_identity_continuity.notes.map(
              (note) => `Identity continuity note: ${note}`
            ),
            ...continuity_reload_presentation.persisted_work_objective_continuity.notes.map(
              (note) => `Work continuity note: ${note}`
            ),
            ...continuity_reload_presentation.session_reload_distinction.notes.map(
              (note) => `Reload distinction note: ${note}`
            ),
            ...continuity_reload_presentation.deferred_items.map(
              (item) => `Deferred continuity item: ${item}`
            ),
            ...continuity_reload_presentation.non_claims.map(
              (claim) => `Non-claim: ${claim}`
            ),
          ]
        : [
            "Continuity/reload presentation scaffold is not assembled for this page.",
          ],
    },
    memory_continuity_overview: {
      section_key: "memory_continuity_overview",
      heading: "Memory / Continuity Overview",
      body_lines: [
        `Anchor ref: ${console_shell.memory_continuity_overview.anchor_ref_id}`,
        `Continuity sources: ${console_shell.memory_continuity_overview.continuity_sources.join(", ")}`,
        `Continuity status: ${console_shell.memory_continuity_overview.continuity_status}`,
        `Continuity note: ${console_shell.memory_continuity_overview.continuity_note}`,
        ...console_shell.memory_continuity_overview.known_absences.map(
          (absence) => `Known absence: ${absence}`
        ),
      ],
    },
    deferred_surfaces: {
      section_key: "deferred_surfaces",
      heading: "Deferred Surfaces",
      body_lines: [
        `Optional mounts present: ${String(console_shell.deferred_surfaces.optional_mounts_present)}`,
        `All mounts deferred: ${String(console_shell.deferred_surfaces.all_mounts_deferred)}`,
        ...console_shell.deferred_surfaces.business_pack_mount_keys.map(
          (mount_key) => `Business pack mount: ${mount_key}`
        ),
        ...console_shell.deferred_surfaces.metrics_pack_mount_keys.map(
          (mount_key) => `Metrics pack mount: ${mount_key}`
        ),
        ...(template_seed
          ? template_seed.deferred_surfaces.map(
              (surface) => `Template deferred surface: ${surface}`
            )
          : []),
        ...console_shell.deferred_surfaces.deferred_items.map(
          (item) => `Deferred item: ${item}`
        ),
      ],
    },
    truth_boundary: {
      section_key: "truth_boundary",
      heading: "Truth Boundary",
      body_lines: [
        ...console_shell.truth_boundary.persisted_structural_truth_sections.map(
          (section_name) => `Persisted structural truth section: ${section_name}`
        ),
        ...console_shell.truth_boundary.seeded_summary_truth_sections.map(
          (section_name) => `Seeded summary truth section: ${section_name}`
        ),
        ...console_shell.truth_boundary.deferred_items.map(
          (item) => `Deferred boundary item: ${item}`
        ),
        ...unique_items([
          ...console_shell.truth_boundary.non_claims,
          ...(template_seed?.non_claims ?? []),
        ]).map(
          (claim) => `Non-claim: ${claim}`
        ),
      ],
    },
  } satisfies SingleCellOperatorConsolePage["sections"];

  const non_claims = unique_items([
    ...console_shell.truth_boundary.non_claims,
    ...(template_seed?.non_claims ?? []),
    ...(continuity_reload_presentation?.non_claims ?? []),
    ...(correction_review_interaction?.non_claims ?? []),
    ...(state_transition_scaffold?.non_claims ?? []),
    ...(task_focus_interaction?.non_claims ?? []),
    ...(action_intent_scaffold?.non_claims ?? []),
    ...(delivery_acceptance_scaffold?.non_claims ?? []),
    ...(input_draft_scaffold?.non_claims ?? []),
    ...(in_session_draft_state_scaffold?.non_claims ?? []),
    ...(request_package_scaffold?.non_claims ?? []),
    ...(request_review_submit_preview_scaffold?.non_claims ?? []),
  ]);
  const html = [
    `<main data-route="${SINGLE_CELL_OPERATOR_CONSOLE_ROUTE}">`,
    `<header>`,
    `<p>Single-cell operator console</p>`,
    `<h1>${escape_html(console_shell.header.cell_name)}</h1>`,
    `<p>${escape_html(console_shell.header.current_objective_headline)}</p>`,
    `</header>`,
    render_section(sections.header),
    render_section(sections.delivery),
    render_section(sections.delivery_acceptance),
    render_section(sections.crew_overview),
    render_section(sections.objective_overview),
    render_section(sections.task_focus),
    render_section(sections.action_intents),
    render_section(sections.input_drafts),
    render_section(sections.in_session_draft_state),
    render_section(sections.request_package),
    render_section(sections.request_review_submit_preview),
    render_section(sections.work_item_execution_overview),
    render_section(sections.correction_review),
    render_section(sections.state_transition),
    render_section(sections.continuity_reload),
    render_section(sections.memory_continuity_overview),
    render_section(sections.deferred_surfaces),
    render_section(sections.truth_boundary),
    `</main>`,
  ].join("");

  return {
    route_path: SINGLE_CELL_OPERATOR_CONSOLE_ROUTE,
    page_kind: "single_cell_operator_console_page",
    page_scope: "single_cell_only",
    operator_surface: "single_cell_console",
    authority_boundary: "app_page_projection_consumer",
    phase_boundary: "bounded_operator_page",
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    actual_provider_actions_present: false,
    actual_channel_entry_present: false,
    multi_cell_portfolio_behavior_available: false,
    secretary_behavior_available: false,
    broad_kpi_cockpit_available: false,
    runtime_complete_product_state_available: false,
    console_shell,
    sections,
    non_claims,
    html,
  };
}
