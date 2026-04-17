import {
  SOLOCREW_STRUCTURAL_CONTRACT_VERSION,
  type StructuralContractEnvelope,
} from "../contracts/structural-object-types.ts";
import type {
  SoloCrewPackMountScope,
  SoloCrewPackMountStatus,
} from "../contracts/pack-mount-model-contract.ts";

export type DeliveryReviewPosture =
  | "operator_review"
  | "bounded_review"
  | "delivery_return";

export type CellApprovalMode =
  | "operator_required"
  | "bounded_autonomy"
  | "escalate_on_stop";

export type CellRiskPosture =
  | "conservative"
  | "balanced"
  | "aggressive";

export type CrewCoordinationPattern =
  | "ceo_led"
  | "peer_assist";

export type LedgerDurableSurface =
  | "objective_state"
  | "work_item_state"
  | "worker_state";

export type MemoryContinuitySource =
  | "memory_summary"
  | "preference_state"
  | "review_continuity_note";

export type PackMountScope = SoloCrewPackMountScope;
export type PackMountStatus = SoloCrewPackMountStatus;

interface StructuralEnvelopeInput<TObjectType extends string> {
  projection_id: string;
  object_type: TObjectType;
  implementation_status: "skeleton_only" | "deferred_mount";
  phase_boundary:
    | "compile_phase_only"
    | "compile_runtime_bridge"
    | "runtime_adjacent_summary"
    | "optional_mount";
  projection_notes?: string[];
}

function create_product_structural_envelope<
  TObjectType extends string,
>(
  input: StructuralEnvelopeInput<TObjectType>
): Omit<StructuralContractEnvelope<never>, "object_type"> & {
  object_type: TObjectType;
} {
  return {
    projection_id: input.projection_id,
    object_type: input.object_type,
    contract_version: SOLOCREW_STRUCTURAL_CONTRACT_VERSION,
    implementation_status: input.implementation_status,
    authority_boundary: "product_projection_only",
    phase_boundary: input.phase_boundary,
    upward_runtime_authority: "forbidden",
    upward_protocol_authority: "forbidden",
    projection_notes: input.projection_notes
      ? [...input.projection_notes]
      : undefined,
  };
}

function with_pack_mount_projection_notes(
  mount_label: "Business Pack Mount" | "Metrics Pack Mount",
  projection_notes?: string[]
): string[] {
  return [
    `${mount_label} remains structural-only and non-executing.`,
    `${mount_label} posture does not imply provider execution, pack execution, or protocol authority.`,
    ...(projection_notes ?? []),
  ];
}

export interface CellCharter
  extends StructuralContractEnvelope<"cell-charter"> {
  charter_id: string;
  cell_id: string;
  cell_name: string;
  mission: string;
  business_scope: string;
  operator_id: string;
  operator_role: "owner_operator";
}

export interface CreateCellCharterInput {
  projection_id: string;
  charter_id: string;
  cell_id: string;
  cell_name: string;
  mission: string;
  business_scope: string;
  operator_id: string;
  projection_notes?: string[];
}

export function createCellCharter(
  input: CreateCellCharterInput
): CellCharter {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "cell-charter",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_phase_only",
      projection_notes: input.projection_notes,
    }),
    charter_id: input.charter_id,
    cell_id: input.cell_id,
    cell_name: input.cell_name,
    mission: input.mission,
    business_scope: input.business_scope,
    operator_id: input.operator_id,
    operator_role: "owner_operator",
  };
}

export interface DeliveryContract
  extends StructuralContractEnvelope<"delivery-contract"> {
  delivery_contract_id: string;
  cell_id: string;
  delivery_target: string;
  done_definition: string;
  return_shape: string;
  review_posture: DeliveryReviewPosture;
}

export interface CreateDeliveryContractInput {
  projection_id: string;
  delivery_contract_id: string;
  cell_id: string;
  delivery_target: string;
  done_definition: string;
  return_shape: string;
  review_posture: DeliveryReviewPosture;
  projection_notes?: string[];
}

export function createDeliveryContract(
  input: CreateDeliveryContractInput
): DeliveryContract {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "delivery-contract",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_phase_only",
      projection_notes: input.projection_notes,
    }),
    delivery_contract_id: input.delivery_contract_id,
    cell_id: input.cell_id,
    delivery_target: input.delivery_target,
    done_definition: input.done_definition,
    return_shape: input.return_shape,
    review_posture: input.review_posture,
  };
}

export interface CellPolicyProfile
  extends StructuralContractEnvelope<"cell-policy-profile"> {
  cell_policy_profile_id: string;
  cell_id: string;
  approval_mode: CellApprovalMode;
  risk_posture: CellRiskPosture;
  stop_conditions: string[];
  escalation_triggers: string[];
}

export interface CreateCellPolicyProfileInput {
  projection_id: string;
  cell_policy_profile_id: string;
  cell_id: string;
  approval_mode: CellApprovalMode;
  risk_posture: CellRiskPosture;
  stop_conditions?: string[];
  escalation_triggers?: string[];
  projection_notes?: string[];
}

export function createCellPolicyProfile(
  input: CreateCellPolicyProfileInput
): CellPolicyProfile {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "cell-policy-profile",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_phase_only",
      projection_notes: input.projection_notes,
    }),
    cell_policy_profile_id: input.cell_policy_profile_id,
    cell_id: input.cell_id,
    approval_mode: input.approval_mode,
    risk_posture: input.risk_posture,
    stop_conditions: [...(input.stop_conditions ?? [])],
    escalation_triggers: [...(input.escalation_triggers ?? [])],
  };
}

export interface CEOOrchestratorContract
  extends StructuralContractEnvelope<"ceo-orchestrator-contract"> {
  ceo_orchestrator_contract_id: string;
  cell_id: string;
  compiler_role: "crew_compiler";
  compile_input_types: string[];
  compile_output_types: string[];
  recompile_conditions: string[];
}

export interface CreateCEOOrchestratorContractInput {
  projection_id: string;
  ceo_orchestrator_contract_id: string;
  cell_id: string;
  compile_input_types?: string[];
  compile_output_types?: string[];
  recompile_conditions?: string[];
  projection_notes?: string[];
}

export function createCEOOrchestratorContract(
  input: CreateCEOOrchestratorContractInput
): CEOOrchestratorContract {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "ceo-orchestrator-contract",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_phase_only",
      projection_notes: input.projection_notes,
    }),
    ceo_orchestrator_contract_id: input.ceo_orchestrator_contract_id,
    cell_id: input.cell_id,
    compiler_role: "crew_compiler",
    compile_input_types: [
      ...(input.compile_input_types ?? [
        "management-directive",
        "cell-charter",
        "delivery-contract",
        "cell-policy-profile",
        "crew-blueprint",
        "objective-portfolio",
        "memory-evidence-anchor",
      ]),
    ],
    compile_output_types: [
      ...(input.compile_output_types ?? [
        "crew-topology",
        "role-policy-bindings",
        "execution-plan",
        "summary-projection-seed",
        "recompile-conditions",
      ]),
    ],
    recompile_conditions: [
      ...(input.recompile_conditions ?? [
        "directive-change",
        "objective-change",
        "policy-change",
        "capability-change",
        "blocked-delivery-state",
      ]),
    ],
  };
}

export interface CrewBlueprint
  extends StructuralContractEnvelope<"crew-blueprint"> {
  crew_blueprint_id: string;
  cell_id: string;
  topology_mode: "native_multi_agent_crew";
  required_role_keys: string[];
  coordination_pattern: CrewCoordinationPattern;
  role_policy_binding_mode: "compile_time";
}

export interface CreateCrewBlueprintInput {
  projection_id: string;
  crew_blueprint_id: string;
  cell_id: string;
  required_role_keys?: string[];
  coordination_pattern: CrewCoordinationPattern;
  projection_notes?: string[];
}

export function createCrewBlueprint(
  input: CreateCrewBlueprintInput
): CrewBlueprint {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "crew-blueprint",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_phase_only",
      projection_notes: input.projection_notes,
    }),
    crew_blueprint_id: input.crew_blueprint_id,
    cell_id: input.cell_id,
    topology_mode: "native_multi_agent_crew",
    required_role_keys: [
      ...(input.required_role_keys ?? [
        "ceo",
        "builder",
        "researcher",
        "reviewer",
      ]),
    ],
    coordination_pattern: input.coordination_pattern,
    role_policy_binding_mode: "compile_time",
  };
}

export interface ObjectivePortfolio
  extends StructuralContractEnvelope<"objective-portfolio"> {
  objective_portfolio_id: string;
  cell_id: string;
  current_objective_id: string;
  queued_objective_ids: string[];
  portfolio_mode: "single_cell";
}

export interface CreateObjectivePortfolioInput {
  projection_id: string;
  objective_portfolio_id: string;
  cell_id: string;
  current_objective_id: string;
  queued_objective_ids?: string[];
  projection_notes?: string[];
}

export function createObjectivePortfolio(
  input: CreateObjectivePortfolioInput
): ObjectivePortfolio {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "objective-portfolio",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_runtime_bridge",
      projection_notes: input.projection_notes,
    }),
    objective_portfolio_id: input.objective_portfolio_id,
    cell_id: input.cell_id,
    current_objective_id: input.current_objective_id,
    queued_objective_ids: [...(input.queued_objective_ids ?? [])],
    portfolio_mode: "single_cell",
  };
}

export interface ExecutionLedger
  extends StructuralContractEnvelope<"execution-ledger"> {
  execution_ledger_id: string;
  cell_id: string;
  ledger_mode: "bounded_state_ledger";
  durable_surfaces: LedgerDurableSurface[];
  event_timeline_persisted: false;
}

export interface CreateExecutionLedgerInput {
  projection_id: string;
  execution_ledger_id: string;
  cell_id: string;
  durable_surfaces?: LedgerDurableSurface[];
  projection_notes?: string[];
}

export function createExecutionLedger(
  input: CreateExecutionLedgerInput
): ExecutionLedger {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "execution-ledger",
      implementation_status: "skeleton_only",
      phase_boundary: "runtime_adjacent_summary",
      projection_notes: input.projection_notes,
    }),
    execution_ledger_id: input.execution_ledger_id,
    cell_id: input.cell_id,
    ledger_mode: "bounded_state_ledger",
    durable_surfaces: [
      ...(input.durable_surfaces ?? [
        "objective_state",
        "work_item_state",
        "worker_state",
      ]),
    ],
    event_timeline_persisted: false,
  };
}

export interface MemoryEvidenceAnchor
  extends StructuralContractEnvelope<"memory-evidence-anchor"> {
  memory_evidence_anchor_id: string;
  cell_id: string;
  continuity_sources: MemoryContinuitySource[];
  evidence_mode: "bounded_continuity_only";
  full_evidence_graph_available: false;
}

export interface CreateMemoryEvidenceAnchorInput {
  projection_id: string;
  memory_evidence_anchor_id: string;
  cell_id: string;
  continuity_sources?: MemoryContinuitySource[];
  projection_notes?: string[];
}

export function createMemoryEvidenceAnchor(
  input: CreateMemoryEvidenceAnchorInput
): MemoryEvidenceAnchor {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "memory-evidence-anchor",
      implementation_status: "skeleton_only",
      phase_boundary: "compile_runtime_bridge",
      projection_notes: input.projection_notes,
    }),
    memory_evidence_anchor_id: input.memory_evidence_anchor_id,
    cell_id: input.cell_id,
    continuity_sources: [
      ...(input.continuity_sources ?? [
        "memory_summary",
        "preference_state",
        "review_continuity_note",
      ]),
    ],
    evidence_mode: "bounded_continuity_only",
    full_evidence_graph_available: false,
  };
}

export interface BusinessPackMount
  extends StructuralContractEnvelope<"business-pack-mount"> {
  business_pack_mount_id: string;
  cell_id: string;
  mount_key: string;
  mount_scope: PackMountScope;
  mount_status: PackMountStatus;
}

export interface CreateBusinessPackMountInput {
  projection_id: string;
  business_pack_mount_id: string;
  cell_id: string;
  mount_key: string;
  mount_scope: PackMountScope;
  mount_status?: PackMountStatus;
  projection_notes?: string[];
}

export function createBusinessPackMount(
  input: CreateBusinessPackMountInput
): BusinessPackMount {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "business-pack-mount",
      implementation_status: "deferred_mount",
      phase_boundary: "optional_mount",
      projection_notes: with_pack_mount_projection_notes(
        "Business Pack Mount",
        input.projection_notes
      ),
    }),
    business_pack_mount_id: input.business_pack_mount_id,
    cell_id: input.cell_id,
    mount_key: input.mount_key,
    mount_scope: input.mount_scope,
    mount_status: input.mount_status ?? "unmounted",
  };
}

export interface MetricsPackMount
  extends StructuralContractEnvelope<"metrics-pack-mount"> {
  metrics_pack_mount_id: string;
  cell_id: string;
  mount_key: string;
  mount_scope: PackMountScope;
  mount_status: PackMountStatus;
}

export interface CreateMetricsPackMountInput {
  projection_id: string;
  metrics_pack_mount_id: string;
  cell_id: string;
  mount_key: string;
  mount_scope: PackMountScope;
  mount_status?: PackMountStatus;
  projection_notes?: string[];
}

export function createMetricsPackMount(
  input: CreateMetricsPackMountInput
): MetricsPackMount {
  return {
    ...create_product_structural_envelope({
      projection_id: input.projection_id,
      object_type: "metrics-pack-mount",
      implementation_status: "deferred_mount",
      phase_boundary: "optional_mount",
      projection_notes: with_pack_mount_projection_notes(
        "Metrics Pack Mount",
        input.projection_notes
      ),
    }),
    metrics_pack_mount_id: input.metrics_pack_mount_id,
    cell_id: input.cell_id,
    mount_key: input.mount_key,
    mount_scope: input.mount_scope,
    mount_status: input.mount_status ?? "unmounted",
  };
}

export interface CellConstitutionState {
  cell_charter: CellCharter;
  delivery_contract: DeliveryContract;
  cell_policy_profile: CellPolicyProfile;
  ceo_orchestrator_contract: CEOOrchestratorContract;
  crew_blueprint: CrewBlueprint;
  objective_portfolio: ObjectivePortfolio;
  execution_ledger: ExecutionLedger;
  memory_evidence_anchor: MemoryEvidenceAnchor;
  business_pack_mounts: BusinessPackMount[];
  metrics_pack_mounts: MetricsPackMount[];
}
