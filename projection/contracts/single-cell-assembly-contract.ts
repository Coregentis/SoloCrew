import type { CellSummaryCard, ManagementDirective } from "../objects/management-interface.ts";
import type { CellConstitutionState } from "../objects/cell-constitution.ts";

export const SOLOCREW_CREW_COMPILER_INPUT_FAMILIES = [
  "management_directive",
  "cell_constitutional_state",
  "objective_context",
  "memory_evidence_state",
  "capability_supply",
  "constraint_set",
] as const;

export type SoloCrewCrewCompilerInputFamily =
  (typeof SOLOCREW_CREW_COMPILER_INPUT_FAMILIES)[number];

export type SingleCellAssemblyScope = "single_cell_only";
export type SingleCellSummaryClaim = "bounded_seed_only";
export type NearTermExecutionPressure =
  | "focus_current_objective"
  | "stabilize_and_review";

export interface SingleCellObjectiveContextSeed {
  current_objective_id: string;
  current_objective_headline: string;
  queued_objective_ids: string[];
  active_work_count: number;
  blocked_work_count: number;
  near_term_execution_pressure: NearTermExecutionPressure;
}

export interface SingleCellMemoryEvidenceStateSeed {
  anchor_ref_id: string;
  continuity_sources: string[];
  evidence_mode: "bounded_continuity_only";
  known_absences: string[];
}

export interface SingleCellCapabilitySupplySeed {
  available_crew_roles: string[];
  available_runtime_surfaces: string[];
  available_product_mounts: string[];
  explicitly_absent_capabilities: string[];
}

export interface SingleCellConstraintSetSeed {
  operator_approval_mode: string;
  risk_posture: string;
  delivery_review_posture: string;
  stop_conditions: string[];
  escalation_triggers: string[];
  runtime_non_claims: string[];
  product_boundary_rules: string[];
}

export interface SingleCellCompileInputSeed {
  phase_boundary: "compile_phase_only";
  compiler_role: "crew_compiler";
  input_families: readonly SoloCrewCrewCompilerInputFamily[];
  management_directive: ManagementDirective;
  cell_constitutional_state: CellConstitutionState;
  objective_context: SingleCellObjectiveContextSeed;
  memory_evidence_state: SingleCellMemoryEvidenceStateSeed;
  capability_supply: SingleCellCapabilitySupplySeed;
  constraint_set: SingleCellConstraintSetSeed;
}

export interface SingleCellSummarySeed {
  phase_boundary: "runtime_adjacent_summary";
  management_surface_scope: SingleCellAssemblyScope;
  broad_kpi_cockpit_available: false;
  runtime_summary_claim: SingleCellSummaryClaim;
  cell_summary_card: CellSummaryCard;
  deferred_items: string[];
}

export interface SingleCellStructuralAssemblyPackage {
  assembly_id: string;
  assembly_scope: SingleCellAssemblyScope;
  constitution_state: CellConstitutionState;
  initial_management_directive_seed: ManagementDirective;
  initial_cell_summary_seed: SingleCellSummarySeed;
  compile_input_seed: SingleCellCompileInputSeed;
  projection_notes: string[];
  deferred_items: string[];
}
