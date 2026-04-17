import type {
  SingleCellAssemblyScope,
} from "./single-cell-assembly-contract.ts";

export type SoloCrewRuntimeDependentDownstreamTruthAuthorityBoundary =
  "product_projection_only";
export type SoloCrewRuntimeDependentDownstreamTruthMode =
  "runtime_dependent_downstream_truth_hardening";
export type SoloCrewRuntimeDependentDownstreamTruthExecutionBoundary =
  "non_executing";
export type SoloCrewRuntimeDependentDownstreamTruthStatus =
  "bounded_upstream_supported_interpretation";
export type SoloCrewRuntimeDependentVisibilityStatus =
  "supported_in_current_upstream_truth";
export type SoloCrewRuntimeDependentEvidenceStatus =
  "bounded_and_omission_aware";
export type SoloCrewRuntimeDependentUnavailableTruthStatus =
  "explicitly_unavailable_in_current_upstream_truth";
export type SoloCrewRuntimeDependentUpstreamWorkflowTruthStatus =
  "not_adopted_upstream";

export interface SoloCrewRuntimeDependentDownstreamTruthState {
  truth_state_id: string;
  truth_scope: SingleCellAssemblyScope;
  authority_boundary:
    SoloCrewRuntimeDependentDownstreamTruthAuthorityBoundary;
  interpretation_mode: SoloCrewRuntimeDependentDownstreamTruthMode;
  execution_boundary:
    SoloCrewRuntimeDependentDownstreamTruthExecutionBoundary;
  truth_status: SoloCrewRuntimeDependentDownstreamTruthStatus;
  confirm_visibility_status: SoloCrewRuntimeDependentVisibilityStatus;
  trace_visibility_status: SoloCrewRuntimeDependentVisibilityStatus;
  evidence_visibility_status: SoloCrewRuntimeDependentEvidenceStatus;
  context_export_status:
    SoloCrewRuntimeDependentUnavailableTruthStatus;
  plan_export_status:
    SoloCrewRuntimeDependentUnavailableTruthStatus;
  upstream_workflow_truth_status:
    SoloCrewRuntimeDependentUpstreamWorkflowTruthStatus;
  summary_text: string;
  confirm_linked_summary: string;
  trace_linked_summary: string;
  evidence_linked_summary: string;
  delivery_interpretation_summary: string;
  supported_upstream_truths: string[];
  bounded_truths: string[];
  unavailable_truths: string[];
  omission_notes: string[];
  non_claims: string[];
}
