import type {
  ProjectionUpstreamRef,
} from "./projection-object-types.ts";
import type {
  PortfolioSecretaryManagementObjectStatus,
  PortfolioSecretaryShellProjection,
  PortfolioSecretaryTruthSource,
} from "./portfolio-secretary-shell-contract.ts";

export type SecretaryHandoffStagingScope = "secretary_handoff_staging";
export type SecretaryHandoffStagingAuthorityBoundary =
  "product_projection_only";
export type SecretaryHandoffStagingPhaseBoundary = "beta_handoff_staging";
export type SecretaryHandoffStagingSourceMode =
  "portfolio_secretary_shell_projection";
export type SecretaryHandoffStagingStatus =
  | "draft"
  | "staged"
  | "ready_for_cell_review";
export type SecretaryHandoffStagingTruthSource =
  | PortfolioSecretaryTruthSource
  | "portfolio_secretary_shell_projection";

export interface SecretaryHandoffStageIndicator {
  stage: SecretaryHandoffStagingStatus;
  label: string;
  active: boolean;
  note: string;
}

export interface SecretaryHandoffTargetSelection {
  selection_mode: "selected_cell_from_portfolio_shell";
  target_cell_id?: string;
  target_cell_name?: string;
  target_summary_projection_id?: string;
  target_readiness_signal?:
    PortfolioSecretaryShellProjection["summary_projections"][number]["readiness_signal"];
  target_source_mode?:
    PortfolioSecretaryShellProjection["summary_projections"][number]["source_mode"];
}

export interface SecretaryHandoffManagementPosture {
  management_directive_visibility: PortfolioSecretaryManagementObjectStatus;
  delivery_return_visibility: PortfolioSecretaryManagementObjectStatus;
  approval_request_visibility: PortfolioSecretaryManagementObjectStatus;
  management_posture_framing: string;
  review_posture_framing: string;
}

export interface SecretaryHandoffStagingProjection {
  secretary_handoff_staging_id: string;
  source_portfolio_secretary_projection_id: string;
  projection_scope: SecretaryHandoffStagingScope;
  authority_boundary: SecretaryHandoffStagingAuthorityBoundary;
  phase_boundary: SecretaryHandoffStagingPhaseBoundary;
  source_mode: SecretaryHandoffStagingSourceMode;
  upward_runtime_authority: "forbidden";
  upward_protocol_authority: "forbidden";
  secretary_behavior_available: true;
  portfolio_dispatch_behavior_available: false;
  direct_approve_control_available: false;
  direct_reject_control_available: false;
  direct_dispatch_control_available: false;
  direct_execute_control_available: false;
  provider_execution_available: false;
  channel_entry_available: false;
  workflow_engine_behavior_available: false;
  runtime_complete_orchestration_available: false;
  handoff_creation_available: true;
  handoff_payload_kind: "product_staging_only";
  handoff_staging_is_runtime_law: false;
  staging_status: SecretaryHandoffStagingStatus;
  staging_states: SecretaryHandoffStageIndicator[];
  target_selection: SecretaryHandoffTargetSelection;
  handoff_summary: string;
  handoff_intent_framing: string;
  management_and_review_posture: SecretaryHandoffManagementPosture;
  non_executing_notice: string;
  truth_sources: SecretaryHandoffStagingTruthSource[];
  upstream_refs: ProjectionUpstreamRef[];
  deferred_items: string[];
  non_claims: string[];
  projection_notes: string[];
}
