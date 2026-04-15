import type {
  CellApprovalMode,
  CellConstitutionState,
  CellRiskPosture,
  CrewCoordinationPattern,
  DeliveryReviewPosture,
} from "../objects/cell-constitution.ts";
import {
  createBusinessPackMount,
  createCEOOrchestratorContract,
  createCellCharter,
  createCellPolicyProfile,
  createCrewBlueprint,
  createDeliveryContract,
  createExecutionLedger,
  createMemoryEvidenceAnchor,
  createMetricsPackMount,
  createObjectivePortfolio,
} from "../objects/cell-constitution.ts";
import type {
  CellDeliveryPosture,
  ManagementApprovalPosture,
  ManagementPriority,
} from "../objects/management-interface.ts";
import {
  createCellSummaryCard,
  createManagementDirective,
} from "../objects/management-interface.ts";
import type {
  SingleCellCompileInputSeed,
  SingleCellStructuralAssemblyPackage,
  SingleCellSummarySeed,
} from "../contracts/single-cell-assembly-contract.ts";
import {
  SOLOCREW_CREW_COMPILER_INPUT_FAMILIES,
} from "../contracts/single-cell-assembly-contract.ts";

const DEFAULT_DEFERRED_ITEMS = [
  "provider_execution",
  "channel_integrations",
  "multi_cell_portfolio_behavior",
  "broad_kpi_cockpit",
  "business_pack_execution_logic",
  "metrics_pack_execution_logic",
  "runtime_complete_summary_projection",
];

const DEFAULT_RUNTIME_NON_CLAIMS = [
  "no_live_provider_execution",
  "no_channel_entry_runtime",
  "no_budget_runtime",
  "no_full_psg_ael_vsl",
  "no_runtime_event_timeline_claim",
];

const DEFAULT_PRODUCT_BOUNDARY_RULES = [
  "single_cell_only",
  "management_is_not_broad_kpi_cockpit",
  "optional_mounts_remain_deferred",
  "no_upward_runtime_or_protocol_law_leakage",
];

export interface InitializeSingleCellInput {
  assembly_id: string;
  cell_id: string;
  cell_name: string;
  operator_id: string;
  mission: string;
  business_scope: string;
  current_objective_id: string;
  current_objective_headline: string;
  delivery_target: string;
  done_definition?: string;
  return_shape?: string;
  review_posture?: DeliveryReviewPosture;
  approval_mode?: CellApprovalMode;
  approval_posture?: ManagementApprovalPosture;
  risk_posture?: CellRiskPosture;
  priority?: ManagementPriority;
  coordination_pattern?: CrewCoordinationPattern;
  required_role_keys?: string[];
  queued_objective_ids?: string[];
  stop_conditions?: string[];
  escalation_triggers?: string[];
  constraint_emphasis?: string[];
  active_work_count?: number;
  blocked_work_count?: number;
  delivery_posture?: CellDeliveryPosture;
  continuity_note?: string;
  business_pack_mount_keys?: string[];
  metrics_pack_mount_keys?: string[];
  projection_notes?: string[];
}

function object_projection_id(
  assembly_id: string,
  object_key: string
): string {
  return `${assembly_id}-${object_key}-projection`;
}

function object_id(assembly_id: string, object_key: string): string {
  return `${assembly_id}-${object_key}`;
}

function build_constitution_state(
  input: InitializeSingleCellInput
): CellConstitutionState {
  const cell_charter = createCellCharter({
    projection_id: object_projection_id(input.assembly_id, "cell-charter"),
    charter_id: object_id(input.assembly_id, "cell-charter"),
    cell_id: input.cell_id,
    cell_name: input.cell_name,
    mission: input.mission,
    business_scope: input.business_scope,
    operator_id: input.operator_id,
    projection_notes: input.projection_notes,
  });

  const delivery_contract = createDeliveryContract({
    projection_id: object_projection_id(input.assembly_id, "delivery-contract"),
    delivery_contract_id: object_id(input.assembly_id, "delivery-contract"),
    cell_id: input.cell_id,
    delivery_target: input.delivery_target,
    done_definition:
      input.done_definition ??
      "Return one bounded operator-reviewable delivery outcome.",
    return_shape: input.return_shape ?? "delivery-return",
    review_posture: input.review_posture ?? "operator_review",
    projection_notes: input.projection_notes,
  });

  const cell_policy_profile = createCellPolicyProfile({
    projection_id: object_projection_id(input.assembly_id, "cell-policy-profile"),
    cell_policy_profile_id: object_id(input.assembly_id, "cell-policy-profile"),
    cell_id: input.cell_id,
    approval_mode: input.approval_mode ?? "operator_required",
    risk_posture: input.risk_posture ?? "balanced",
    stop_conditions: [
      ...(input.stop_conditions ?? [
        "approval_required",
        "runtime_boundary_reached",
      ]),
    ],
    escalation_triggers: [
      ...(input.escalation_triggers ?? [
        "policy_conflict",
        "delivery_blocked",
      ]),
    ],
    projection_notes: input.projection_notes,
  });

  const objective_portfolio = createObjectivePortfolio({
    projection_id: object_projection_id(input.assembly_id, "objective-portfolio"),
    objective_portfolio_id: object_id(input.assembly_id, "objective-portfolio"),
    cell_id: input.cell_id,
    current_objective_id: input.current_objective_id,
    queued_objective_ids: [...(input.queued_objective_ids ?? [])],
    projection_notes: input.projection_notes,
  });

  const memory_evidence_anchor = createMemoryEvidenceAnchor({
    projection_id: object_projection_id(input.assembly_id, "memory-evidence-anchor"),
    memory_evidence_anchor_id: object_id(
      input.assembly_id,
      "memory-evidence-anchor"
    ),
    cell_id: input.cell_id,
    projection_notes: input.projection_notes,
  });

  return {
    cell_charter,
    delivery_contract,
    cell_policy_profile,
    ceo_orchestrator_contract: createCEOOrchestratorContract({
      projection_id: object_projection_id(
        input.assembly_id,
        "ceo-orchestrator-contract"
      ),
      ceo_orchestrator_contract_id: object_id(
        input.assembly_id,
        "ceo-orchestrator-contract"
      ),
      cell_id: input.cell_id,
      projection_notes: input.projection_notes,
    }),
    crew_blueprint: createCrewBlueprint({
      projection_id: object_projection_id(input.assembly_id, "crew-blueprint"),
      crew_blueprint_id: object_id(input.assembly_id, "crew-blueprint"),
      cell_id: input.cell_id,
      coordination_pattern: input.coordination_pattern ?? "ceo_led",
      required_role_keys: [
        ...(input.required_role_keys ?? ["ceo", "builder", "reviewer"]),
      ],
      projection_notes: input.projection_notes,
    }),
    objective_portfolio,
    execution_ledger: createExecutionLedger({
      projection_id: object_projection_id(input.assembly_id, "execution-ledger"),
      execution_ledger_id: object_id(input.assembly_id, "execution-ledger"),
      cell_id: input.cell_id,
      projection_notes: input.projection_notes,
    }),
    memory_evidence_anchor,
    business_pack_mounts: (input.business_pack_mount_keys ?? []).map(
      (mount_key, index) =>
        createBusinessPackMount({
          projection_id: object_projection_id(
            input.assembly_id,
            `business-pack-mount-${index + 1}`
          ),
          business_pack_mount_id: object_id(
            input.assembly_id,
            `business-pack-mount-${index + 1}`
          ),
          cell_id: input.cell_id,
          mount_key,
          mount_scope: "cell",
          mount_status: "unmounted",
          projection_notes: input.projection_notes,
        })
    ),
    metrics_pack_mounts: (input.metrics_pack_mount_keys ?? []).map(
      (mount_key, index) =>
        createMetricsPackMount({
          projection_id: object_projection_id(
            input.assembly_id,
            `metrics-pack-mount-${index + 1}`
          ),
          metrics_pack_mount_id: object_id(
            input.assembly_id,
            `metrics-pack-mount-${index + 1}`
          ),
          cell_id: input.cell_id,
          mount_key,
          mount_scope: "cell",
          mount_status: "unmounted",
          projection_notes: input.projection_notes,
        })
    ),
  };
}

export function createSingleCellCompileInputSeed(
  input: InitializeSingleCellInput,
  constitution_state: CellConstitutionState,
  management_directive: ReturnType<typeof createManagementDirective>
): SingleCellCompileInputSeed {
  return {
    phase_boundary: "compile_phase_only",
    compiler_role: "crew_compiler",
    input_families: SOLOCREW_CREW_COMPILER_INPUT_FAMILIES,
    management_directive,
    cell_constitutional_state: constitution_state,
    objective_context: {
      current_objective_id: constitution_state.objective_portfolio.current_objective_id,
      current_objective_headline: input.current_objective_headline,
      queued_objective_ids: [
        ...constitution_state.objective_portfolio.queued_objective_ids,
      ],
      active_work_count: input.active_work_count ?? 0,
      blocked_work_count: input.blocked_work_count ?? 0,
      near_term_execution_pressure:
        (input.blocked_work_count ?? 0) > 0
          ? "stabilize_and_review"
          : "focus_current_objective",
    },
    memory_evidence_state: {
      anchor_ref_id:
        constitution_state.memory_evidence_anchor.memory_evidence_anchor_id,
      continuity_sources: [
        ...constitution_state.memory_evidence_anchor.continuity_sources,
      ],
      evidence_mode: constitution_state.memory_evidence_anchor.evidence_mode,
      known_absences: [
        "full_evidence_graph",
        "autonomous_learning_timeline",
        "runtime_complete_anchor_persistence",
      ],
    },
    capability_supply: {
      available_crew_roles: [
        ...constitution_state.crew_blueprint.required_role_keys,
      ],
      available_runtime_surfaces: [
        "bounded_lifecycle_truth",
        "bounded_state_store_truth",
        "bounded_action_dispatch_contract",
        "bounded_correction_writeback_glue",
      ],
      available_product_mounts: [
        ...constitution_state.business_pack_mounts.map((mount) => mount.mount_key),
        ...constitution_state.metrics_pack_mounts.map((mount) => mount.mount_key),
      ],
      explicitly_absent_capabilities: [
        "provider_execution",
        "channel_integrations",
        "multi_cell_portfolio_behavior",
        "business_pack_execution_logic",
        "metrics_pack_execution_logic",
      ],
    },
    constraint_set: {
      operator_approval_mode: constitution_state.cell_policy_profile.approval_mode,
      risk_posture: constitution_state.cell_policy_profile.risk_posture,
      delivery_review_posture: constitution_state.delivery_contract.review_posture,
      stop_conditions: [
        ...constitution_state.cell_policy_profile.stop_conditions,
      ],
      escalation_triggers: [
        ...constitution_state.cell_policy_profile.escalation_triggers,
      ],
      runtime_non_claims: [...DEFAULT_RUNTIME_NON_CLAIMS],
      product_boundary_rules: [...DEFAULT_PRODUCT_BOUNDARY_RULES],
    },
  };
}

export function createSingleCellSummarySeed(
  input: InitializeSingleCellInput,
  constitution_state: CellConstitutionState
): SingleCellSummarySeed {
  return {
    phase_boundary: "runtime_adjacent_summary",
    management_surface_scope: "single_cell_only",
    broad_kpi_cockpit_available: false,
    runtime_summary_claim: "bounded_seed_only",
    cell_summary_card: createCellSummaryCard({
      projection_id: object_projection_id(input.assembly_id, "cell-summary-card"),
      cell_summary_card_id: object_id(input.assembly_id, "cell-summary-card"),
      cell_id: input.cell_id,
      cell_name: input.cell_name,
      current_objective_headline: input.current_objective_headline,
      delivery_posture:
        input.delivery_posture ??
        ((input.blocked_work_count ?? 0) > 0 ? "attention" : "on_track"),
      active_work_count: input.active_work_count ?? 0,
      blocked_work_count: input.blocked_work_count ?? 0,
      continuity_note:
        input.continuity_note ??
        "Single-cell continuity is bounded to seeded structural truth.",
      projection_notes: input.projection_notes,
    }),
    deferred_items: [...DEFAULT_DEFERRED_ITEMS],
  };
}

export function initializeSingleCellStructuralAssembly(
  input: InitializeSingleCellInput
): SingleCellStructuralAssemblyPackage {
  const constitution_state = build_constitution_state(input);
  const initial_management_directive_seed = createManagementDirective({
    projection_id: object_projection_id(input.assembly_id, "management-directive"),
    management_directive_id: object_id(input.assembly_id, "management-directive"),
    cell_id: input.cell_id,
    priority: input.priority ?? "focus_now",
    delivery_target: input.delivery_target,
    approval_posture: input.approval_posture ?? "operator_required",
    constraint_emphasis: [
      ...(input.constraint_emphasis ?? [
        "single_cell_focus",
        "bounded_delivery_truth",
      ]),
    ],
    projection_notes: input.projection_notes,
  });
  const initial_cell_summary_seed = createSingleCellSummarySeed(
    input,
    constitution_state
  );
  const compile_input_seed = createSingleCellCompileInputSeed(
    input,
    constitution_state,
    initial_management_directive_seed
  );

  return {
    assembly_id: input.assembly_id,
    assembly_scope: "single_cell_only",
    constitution_state,
    initial_management_directive_seed,
    initial_cell_summary_seed,
    compile_input_seed,
    projection_notes: [
      ...(input.projection_notes ?? []),
      "Single-cell initialization scaffold only.",
      "Compile input seed is structural packaging, not real compilation.",
      "Summary seed is management-facing seed truth, not a runtime-complete summary projection.",
    ],
    deferred_items: [...DEFAULT_DEFERRED_ITEMS],
  };
}
